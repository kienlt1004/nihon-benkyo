import "dotenv/config";
import express from "express";
import http from "http";
import path from "path";
import fs from "fs";
import { WebSocketServer, WebSocket } from "ws";
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { createServer as createViteServer } from "vite";

import {
  initCronSync,
  getCronSyncStatus,
  executeServerSync,
  setCronSchedule,
  toggleCronActive,
} from "./src/lib/serverSync";

let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing.");
    }
    genAIClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIClient;
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: "100mb" }));
  app.use(express.urlencoded({ extended: true, limit: "100mb" }));

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // Automated Cronjob & Firebase Sync API endpoints
  app.get("/api/sync/cron-status", (_req, res) => {
    res.json(getCronSyncStatus());
  });

  app.post("/api/sync/cron-schedule", (req, res) => {
    try {
      const { schedule, description } = req.body;
      if (!schedule) {
        return res.status(400).json({ error: "Tham số schedule là bắt buộc." });
      }
      const updated = setCronSchedule(schedule, description);
      res.json(updated);
    } catch (err: any) {
      res.status(400).json({ error: err.message || "Không thể cập nhật lịch cron." });
    }
  });

  app.post("/api/sync/cron-toggle", (req, res) => {
    try {
      const { active } = req.body;
      const updated = toggleCronActive(active);
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Không thể bật/tắt cronjob." });
    }
  });

  app.post("/api/sync/trigger", async (_req, res) => {
    try {
      const result = await executeServerSync("manual");
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err?.message || "Sync failed" });
    }
  });

  app.post("/api/sync/kanji", async (_req, res) => {
    try {
      const result = await executeServerSync("kanji_manual");
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err?.message || "Kanji Sync failed" });
    }
  });

  // Persistent Original Audio File Storage (MP3/WAV/M4A)
  const UPLOADS_AUDIO_DIR = path.join(process.cwd(), "uploads", "audio");
  if (!fs.existsSync(UPLOADS_AUDIO_DIR)) {
    fs.mkdirSync(UPLOADS_AUDIO_DIR, { recursive: true });
  }

  // Static route with byte-range support for HTML5 audio seeking and looping
  app.use(
    "/audio",
    express.static(UPLOADS_AUDIO_DIR, {
      setHeaders: (res) => {
        res.setHeader("Accept-Ranges", "bytes");
      },
    })
  );

  // Upload & persist original audio file permanently on server
  app.post("/api/audio/upload", async (req, res) => {
    try {
      const { fileName, audioBase64, mimeType, examPreset } = req.body;
      if (!audioBase64 || !fileName) {
        return res.status(400).json({ error: "fileName và audioBase64 là bắt buộc." });
      }

      // Safe clean filename
      const safeName = (examPreset ? `${examPreset}_` : "") + fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
      const filePath = path.join(UPLOADS_AUDIO_DIR, safeName);

      const buffer = Buffer.from(audioBase64, "base64");
      fs.writeFileSync(filePath, buffer);

      console.log(
        `[Audio Storage] Đã lưu file giọng đọc gốc: ${safeName} (${(buffer.length / (1024 * 1024)).toFixed(2)} MB)`
      );

      res.json({
        success: true,
        fileName: safeName,
        originalName: fileName,
        audioUrl: `/audio/${encodeURIComponent(safeName)}`,
        sizeBytes: buffer.length,
        mimeType: mimeType || "audio/mp3",
        examPreset: examPreset || null,
        savedAt: new Date().toISOString(),
      });
    } catch (err: any) {
      console.error("[Audio Storage] Lỗi lưu audio:", err);
      res.status(500).json({ error: err.message || "Không thể lưu trữ file âm thanh gốc." });
    }
  });

  // Check saved audio file for an exam preset (e.g., 'cda', 'jlpt2021')
  app.get("/api/audio/preset/:preset", (req, res) => {
    try {
      const { preset } = req.params;
      if (!fs.existsSync(UPLOADS_AUDIO_DIR)) {
        return res.json({ found: false });
      }
      const files = fs.readdirSync(UPLOADS_AUDIO_DIR);
      const matchingFile = files.find(
        (f) =>
          f.toLowerCase().startsWith(`${preset.toLowerCase()}_`) ||
          f.toLowerCase().includes(preset.toLowerCase())
      );
      if (matchingFile) {
        const stat = fs.statSync(path.join(UPLOADS_AUDIO_DIR, matchingFile));
        return res.json({
          found: true,
          fileName: matchingFile,
          audioUrl: `/audio/${encodeURIComponent(matchingFile)}`,
          sizeBytes: stat.size,
          updatedAt: stat.mtime.toISOString(),
        });
      }
      return res.json({ found: false });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // List all stored original audio files
  app.get("/api/audio/list", (_req, res) => {
    try {
      if (!fs.existsSync(UPLOADS_AUDIO_DIR)) {
        return res.json({ files: [] });
      }
      const files = fs.readdirSync(UPLOADS_AUDIO_DIR).map((f) => {
        const stat = fs.statSync(path.join(UPLOADS_AUDIO_DIR, f));
        return {
          fileName: f,
          audioUrl: `/audio/${encodeURIComponent(f)}`,
          sizeBytes: stat.size,
          updatedAt: stat.mtime.toISOString(),
        };
      });
      res.json({ files });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Helper: Resilient AI generation with automatic model fallback & exponential retry on 503/429
  async function generateWithFallback({
    ai,
    candidateModels,
    contents,
    config,
    maxRetriesPerModel = 1,
  }: {
    ai: any;
    candidateModels: string[];
    contents: any;
    config?: any;
    maxRetriesPerModel?: number;
  }) {
    let lastError: any = null;

    for (const model of candidateModels) {
      for (let attempt = 0; attempt <= maxRetriesPerModel; attempt++) {
        try {
          console.log(`[Gemini AI] Trying model "${model}" (attempt ${attempt + 1}/${maxRetriesPerModel + 1})...`);
          const response = await ai.models.generateContent({
            model,
            contents,
            config,
          });

          if (response && response.text) {
            console.log(`[Gemini AI] Success with model "${model}"!`);
            return { text: response.text, modelUsed: model };
          }
        } catch (err: any) {
          lastError = err;
          const msg = err?.message || String(err);
          const isRetryable =
            msg.includes("503") ||
            msg.includes("high demand") ||
            msg.includes("UNAVAILABLE") ||
            msg.includes("429") ||
            msg.includes("RESOURCE_EXHAUSTED") ||
            msg.includes("overloaded");

          console.warn(`[Gemini AI] Model "${model}" failed (attempt ${attempt + 1}): ${msg}`);
          if (isRetryable && attempt < maxRetriesPerModel) {
            // Wait with backoff before retry on same model
            await new Promise((res) => setTimeout(res, 1200 * (attempt + 1)));
            continue;
          }
          // Move to next candidate model in chain
          break;
        }
      }
    }
    throw lastError;
  }

  // Helper: Extract valid JSON from response even if enclosed in markdown code fences or commentary
  function cleanAndParseJson(rawText: string) {
    if (!rawText) return {};
    let text = rawText.trim();
    if (text.startsWith("```")) {
      text = text.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();
    }
    try {
      return JSON.parse(text);
    } catch {
      // Find first outer JSON object or array
      const match = text.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
      if (match) {
        return JSON.parse(match[0]);
      }
      throw new Error("Không thể phân tích dữ liệu JSON trả về từ AI.");
    }
  }

  // AI Endpoint: Transcribe uploaded audio and generate structured JLPT listening exam
  app.post("/api/ai/transcribe-listening", async (req, res) => {
    try {
      const { audioBase64, mimeType, fileName } = req.body;
      if (!audioBase64) {
        return res.status(400).json({ error: "Tham số audioBase64 là bắt buộc." });
      }

      const promptText = `Bạn là chuyên gia thẩm định và biên tập đề thi JLPT N4 chính thức.
Hãy nghe kỹ toàn bộ đoạn âm thanh bài thi nghe tiếng Nhật ("${fileName || "Bài nghe JLPT"}").
Nhiệm vụ của bạn là nhận diện chính xác toàn bộ lời thoại TỪ ĐẦU ĐẾN CUỐI (bắt đầu từ giây 00:00), phân chia thành:
1. "sections": TẤT CẢ các đoạn mở đầu bài thi (exam_intro) và lời dẫn cấu trúc từng Mondai (mondai_intro) từ 00:00 (chuông nhạc mở đầu, giới thiệu kỳ thi JLPT N4, hướng dẫn thi, câu ví dụ Rei 例, lời chuyển Mondai...), kèm mốc thời gian (timeStart, timeEnd tính theo giây) và từng câu thoại có dịch nghĩa tiếng Việt.
2. "questions": Danh sách TẤT CẢ các câu hỏi nghe (mỗi câu gồm mondai số 1, 2, 3, hoặc 4; questionNumber; timeStart, timeEnd tính theo giây; tiêu đề; tình huống tiếng Nhật & Việt; các câu thoại chi tiết của từng nhân vật kèm giới tính/vai; câu hỏi cuối bài; 4 lựa chọn trả lời và đáp án đúng 1-4 kèm giải thích).

QUY TẮC BẮT BUỘC:
- Trích xuất ĐẦY ĐỦ TỪ ĐẦU (bắt đầu từ 00:00 với lời giới thiệu kỳ thi / hướng dẫn bài thi), KHÔNG ĐƯỢC BỎ QUA bất kỳ phần mở đầu hay câu thoại nào.
- Trả về JSON thuần túy, TUYỆT ĐỐI không bọc thêm bất kỳ markdown nào ngoài cấu trúc JSON.
- Mọi câu thoại tiếng Nhật phải chuẩn xác chữ Hán Kanji, hiragana tự nhiên.
- Dịch nghĩa tiếng Việt phải mượt mà, sát nghĩa sư phạm.
- Nếu audio chỉ là một phần hoặc đoạn ngắn, hãy chia theo đúng các câu hỏi có trong đoạn audio đó.

Cấu trúc JSON yêu cầu:
{
  "examTitle": "${fileName ? fileName.replace(/\\.[^/.]+$/, "") : "Đề thi nghe JLPT"}",
  "sections": [
    {
      "id": "intro-exam",
      "type": "exam_intro",
      "mondai": 1,
      "title": "Mở đầu đề thi & Hướng dẫn làm bài",
      "titleJapanese": "試験案内・注意事項",
      "timeStart": 0,
      "timeEnd": 45,
      "description": "Nhạc dạo và lời thông báo mở đầu bài thi nghe JLPT",
      "descriptionVietnamese": "Lời giới thiệu kỳ thi và hướng dẫn thí sinh",
      "dialogue": [
        {
          "speaker": "announcer",
          "japanese": "日本語能力試験...",
          "vietnamese": "Kỳ thi năng lực tiếng Nhật..."
        }
      ]
    }
  ],
  "questions": [
    {
      "id": "q-1",
      "mondai": 1,
      "mondaiTitle": "Mondai 1: Trả lời câu hỏi có tranh",
      "questionNumber": 1,
      "timeStart": 45,
      "timeEnd": 110,
      "title": "Tóm tắt tình huống",
      "situationJapanese": "男の人と女の人が話しています...",
      "situationVietnamese": "Người đàn ông và người phụ nữ đang nói chuyện...",
      "dialogue": [
        {
          "speaker": "female",
          "speakerName": "Người phụ nữ",
          "japanese": "すみません、...",
          "vietnamese": "Xin lỗi, ..."
        }
      ],
      "questionTextJapanese": "男の人はこの後、何をしますか。",
      "questionTextVietnamese": "Người đàn ông sau đây sẽ làm gì?",
      "options": ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"],
      "correctAnswer": 1,
      "explanation": "Giải thích chi tiết ngữ cảnh và lý do chọn đáp án"
    }
  ]
}`;

      const ai = getGenAI();

      // Audio multimodal candidate models with automatic fallback against 503 high demand
      const audioModels = [
        "gemini-2.5-flash",
        "gemini-3.8-flash",
        "gemini-flash-latest",
        "gemini-2.5-pro",
        "gemini-3.1-pro-preview",
      ];

      const result = await generateWithFallback({
        ai,
        candidateModels: audioModels,
        maxRetriesPerModel: 2,
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: mimeType || "audio/mp3",
                data: audioBase64,
              },
            },
            {
              text: promptText,
            },
          ],
        },
        config: {
          responseMimeType: "application/json",
          systemInstruction:
            "Bạn là chuyên gia chuyển hóa âm thanh luyện nghe tiếng Nhật thành kịch bản học tập chi tiết chuẩn xác cho học viên người Việt. Nhận diện trọn vẹn từ giây 00:00, chữ Hán Kanji chuẩn kèm dịch nghĩa tiếng Việt. Luôn trả về định dạng JSON hợp lệ đầy đủ từ đầu bài đến hết.",
        },
      });

      const parsedData = cleanAndParseJson(result.text);

      // Auto-preserve uploaded audio file on server so voice is kept permanently
      let audioUrl: string | null = null;
      try {
        const safeName = (fileName || `transcribed_${Date.now()}.mp3`).replace(/[^a-zA-Z0-9._-]/g, "_");
        const filePath = path.join(UPLOADS_AUDIO_DIR, safeName);
        const buffer = Buffer.from(audioBase64, "base64");
        fs.writeFileSync(filePath, buffer);
        audioUrl = `/audio/${encodeURIComponent(safeName)}`;
        console.log(`[Audio Storage] Tự động lưu trữ file audio gốc được phiên âm: ${safeName}`);
      } catch (saveErr) {
        console.warn("[Audio Storage] Không thể lưu bản sao file audio:", saveErr);
      }

      res.json({
        ...parsedData,
        audioUrl: audioUrl || parsedData.audioUrl || null,
      });
    } catch (error: any) {
      console.error("Lỗi AI Transcribe Listening:", error);
      res.status(500).json({
        error: error?.message || "Không thể phiên âm và phân tích audio qua AI.",
      });
    }
  });

  // AI Endpoint: Parse raw script text or subtitles into structured JLPT questions
  app.post("/api/ai/parse-script-text", async (req, res) => {
    try {
      const { text, title } = req.body;
      if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "Nội dung văn bản text là bắt buộc." });
      }

      const promptText = `Bạn là chuyên gia chuyển đổi kịch bản luyện nghe tiếng Nhật JLPT.
Dưới đây là nội dung văn bản kịch bản hoặc phụ đề/ghi chú bài nghe do học viên cung cấp (${title || "Kịch bản tùy chỉnh"}):

---
${text.slice(0, 30000)}
---

Hãy phân tích và chuyển đổi thành cấu trúc JSON chuẩn cho ứng dụng luyện nghe JLPT (Bao gồm CẢ PHẦN MỞ ĐẦU NẾU CÓ và toàn bộ câu hỏi):
{
  "examTitle": "${title || "Đề thi nghe JLPT tùy chỉnh"}",
  "sections": [
    {
      "id": "intro-exam",
      "type": "exam_intro",
      "mondai": 1,
      "title": "Mở đầu đề thi",
      "titleJapanese": "試験案内",
      "timeStart": 0,
      "timeEnd": 30,
      "dialogue": [
        {
          "speaker": "announcer",
          "japanese": "...",
          "vietnamese": "..."
        }
      ]
    }
  ],
  "questions": [
    {
      "id": "q-1",
      "mondai": 1,
      "mondaiTitle": "Mondai 1",
      "questionNumber": 1,
      "timeStart": 0,
      "timeEnd": 60,
      "title": "Tóm tắt",
      "situationJapanese": "...",
      "situationVietnamese": "...",
      "dialogue": [
        {
          "speaker": "male",
          "speakerName": "Người đàn ông",
          "japanese": "...",
          "vietnamese": "..."
        }
      ],
      "questionTextJapanese": "...",
      "questionTextVietnamese": "...",
      "options": ["1", "2", "3", "4"],
      "correctAnswer": 1,
      "explanation": "..."
    }
  ]
}
Chỉ trả về JSON thuần túy, mọi câu thoại tiếng Nhật phải giữ nguyên hoặc bổ sung bản dịch tiếng Việt tương ứng.`;

      const ai = getGenAI();

      // Text candidate models with automatic fallback
      const textModels = [
        "gemini-2.5-flash",
        "gemini-flash-latest",
        "gemini-3.8-flash",
      ];

      const result = await generateWithFallback({
        ai,
        candidateModels: textModels,
        contents: promptText,
        config: {
          responseMimeType: "application/json",
        },
      });

      const parsedData = cleanAndParseJson(result.text);
      res.json(parsedData);
    } catch (error: any) {
      console.error("Lỗi AI Parse Script Text:", error);
      res.status(500).json({
        error: error?.message || "Không thể phân tích kịch bản văn bản qua AI.",
      });
    }
  });

  // AI Endpoint: High-quality Japanese Text-To-Speech with multiple practice personas
  app.post("/api/ai/tts", async (req, res) => {
    try {
      const { text, voiceName = "Kore" } = req.body;
      if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "Tham số text là bắt buộc." });
      }

      // Voice options: 'Kore' (Nữ dịu dàng), 'Puck' (Nam trẻ trung), 'Charon' (Nam trầm/giám thị), 'Fenrir' (Nam phát thanh viên), 'Zephyr' (Nữ phát thanh viên)
      const allowedVoices = ["Kore", "Puck", "Charon", "Fenrir", "Zephyr"];
      const selectedVoice = allowedVoices.includes(voiceName) ? voiceName : "Kore";

      const ai = getGenAI();
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash-lite-tts",
        contents: text.slice(0, 500),
        config: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: selectedVoice },
            },
          },
        },
      });

      const base64Audio =
        response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) {
        throw new Error("Không nhận được dữ liệu âm thanh từ AI TTS.");
      }

      res.json({
        audioBase64: base64Audio,
        mimeType: "audio/wav",
        voiceName: selectedVoice,
      });
    } catch (error: any) {
      console.error("Lỗi AI TTS:", error);
      res.status(500).json({
        error: error?.message || "Không thể phát âm bằng AI Voice.",
      });
    }
  });

  // Google Search Grounding with gemini-3.5-flash
  app.post("/api/ai/search-lookup", async (req, res) => {
    try {
      const { query, word, context } = req.body;
      if (!query && !word) {
        return res.status(400).json({ error: "Tham số tìm kiếm query hoặc word là bắt buộc." });
      }

      const promptText = query
        ? query
        : `Tra cứu thông tin chính xác và cập nhật nhất về từ vựng / ngữ pháp tiếng Nhật N4: "${word}".
Hãy giải thích:
1. Ý nghĩa chính xác, âm Hán Việt (nếu có), và cách phát âm/Furigana.
2. Các ví dụ câu thực tế chuẩn người bản xứ Nhật Bản hiện đại.
3. Cách phân biệt với các từ/mẫu câu gần nghĩa hay dễ nhầm lẫn trong kỳ thi JLPT N4.
4. Lưu ý văn hóa hoặc sắc thái khi giao tiếp đời thường.
${context ? `Ngữ cảnh bổ sung: ${context}` : ""}`;

      const ai = getGenAI();
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: promptText,
        config: {
          systemInstruction:
            "Bạn là Sensei tiếng Nhật N4 chuyên nghiệp, tận tâm và uyên bác. Bạn sử dụng công cụ Google Search để đảm bảo mọi kiến thức, ví dụ câu và phân tích ngữ nghĩa đều chân thực, chuẩn xác theo tiếng Nhật đời sống hiện đại. Trình bày rõ ràng, dễ hiểu bằng tiếng Việt và tiếng Nhật.",
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text || "";
      const rawChunks =
        response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const sources: { title: string; uri: string }[] = [];

      for (const chunk of rawChunks) {
        if (chunk.web?.uri) {
          sources.push({
            title: chunk.web.title || chunk.web.uri,
            uri: chunk.web.uri,
          });
        }
      }

      // Filter duplicate source URLs
      const uniqueSources = sources.filter(
        (item, index, self) =>
          index === self.findIndex((s) => s.uri === item.uri),
      );

      res.json({
        answer: text,
        sources: uniqueSources,
      });
    } catch (error: any) {
      console.error("Lỗi Google Search Grounding:", error);
      res.status(500).json({
        error: error?.message || "Không thể thực hiện tra cứu với Google Search.",
      });
    }
  });

  // Create HTTP server for Express and WebSockets
  const server = http.createServer(app);

  // Setup WebSocket server for Gemini Live API real-time voice conversation
  const wss = new WebSocketServer({ noServer: true });

  server.on("upgrade", (request, socket, head) => {
    const url = new URL(request.url || "", `http://${request.headers.host}`);
    if (url.pathname === "/api/live-voice") {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
      });
    }
  });

  wss.on("connection", async (clientWs: WebSocket) => {
    let session: any = null;
    let isClosed = false;

    try {
      const ai = getGenAI();
      session = await ai.live.connect({
        model: "gemini-3.8-live",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: "Kore" },
            },
          },
          systemInstruction:
            "Bạn là Sakura-sensei, một giáo viên người Nhật bản xứ dạy kaiwa (đàm thoại) JLPT N4. Bạn rất thân thiện, kiên nhẫn và luôn khuyến khích học viên nói. Nói tiếng Nhật tốc độ vừa phải, ngữ điệu tự nhiên, từ vựng và ngữ pháp trình độ N4. Nếu học viên nói sai hoặc lúng túng, hãy gợi ý hoặc chỉnh sửa nhẹ nhàng bằng tiếng Nhật hoặc tiếng Việt ngắn gọn. Mở đầu bằng một câu chào tiếng Nhật niềm nở.",
        },
        callbacks: {
          onmessage: (message: LiveServerMessage) => {
            if (isClosed || clientWs.readyState !== WebSocket.OPEN) return;
            const audio =
              message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (audio) {
              clientWs.send(JSON.stringify({ audio }));
            }
            if (message.serverContent?.interrupted) {
              clientWs.send(JSON.stringify({ interrupted: true }));
            }
          },
          onclose: () => {
            if (!isClosed && clientWs.readyState === WebSocket.OPEN) {
              clientWs.send(JSON.stringify({ type: "session_closed" }));
            }
          },
          onerror: (err: any) => {
            console.error("Gemini Live session error:", err);
            if (!isClosed && clientWs.readyState === WebSocket.OPEN) {
              clientWs.send(
                JSON.stringify({
                  error: err?.message || "Lỗi phiên đàm thoại Gemini Live",
                }),
              );
            }
          },
        },
      });

      // Send initial ready signal to client
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.send(JSON.stringify({ type: "ready" }));
      }

      clientWs.on("message", (raw) => {
        if (!session || isClosed) return;
        try {
          const payload = JSON.parse(raw.toString());
          if (payload.audio) {
            session.sendRealtimeInput({
              audio: {
                data: payload.audio,
                mimeType: "audio/pcm;rate=16000",
              },
            });
          } else if (payload.text) {
            session.sendRealtimeInput({
              text: payload.text,
            });
          }
        } catch (e) {
          console.error("Error processing client live input:", e);
        }
      });

      clientWs.on("close", () => {
        isClosed = true;
        if (session) {
          try {
            session.close();
          } catch {
            // ignore
          }
        }
      });
    } catch (err: any) {
      console.error("Failed to connect Gemini Live API:", err);
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.send(
          JSON.stringify({
            error:
              err?.message ||
              "Không thể khởi tạo phiên đàm thoại Gemini 3.8 Live.",
          }),
        );
        clientWs.close();
      }
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
    // Start automated background cronjob sync for Firebase
    initCronSync();
  });
}

startServer().catch((err) => {
  console.error("Critical server startup error:", err);
  process.exit(1);
});
