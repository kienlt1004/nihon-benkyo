import { ListeningQuestion, ExamSection, ScriptLine } from "../data/listeningN4_2021";

export interface ParsedExamData {
  examTitle: string;
  sections: ExamSection[];
  questions: ListeningQuestion[];
}

export function formatTimeDisplay(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export function timeStringToSeconds(timeStr: string | number): number {
  if (typeof timeStr === "number") return timeStr;
  if (!timeStr) return 0;
  const cleaned = timeStr.trim().replace(",", ".");
  const parts = cleaned.split(":");
  if (parts.length === 3) {
    const hours = parseFloat(parts[0]) || 0;
    const minutes = parseFloat(parts[1]) || 0;
    const seconds = parseFloat(parts[2]) || 0;
    return hours * 3600 + minutes * 60 + seconds;
  } else if (parts.length === 2) {
    const minutes = parseFloat(parts[0]) || 0;
    const seconds = parseFloat(parts[1]) || 0;
    return minutes * 60 + seconds;
  }
  const numeric = parseFloat(cleaned);
  return isNaN(numeric) ? 0 : numeric;
}

export function detectSpeakerType(speakerName: string): "male" | "female" | "announcer" | "teacher" | "other" {
  const lower = speakerName.toLowerCase();
  if (
    lower.includes("nam") ||
    lower.includes("đàn ông") ||
    lower.includes("boy") ||
    lower.includes("man") ||
    lower.includes("男")
  ) {
    return "male";
  }
  if (
    lower.includes("nữ") ||
    lower.includes("phụ nữ") ||
    lower.includes("girl") ||
    lower.includes("woman") ||
    lower.includes("女")
  ) {
    return "female";
  }
  if (
    lower.includes("phát thanh") ||
    lower.includes("giám thị") ||
    lower.includes("dẫn") ||
    lower.includes("announcer") ||
    lower.includes("案内") ||
    lower.includes("アナウンス")
  ) {
    return "announcer";
  }
  if (lower.includes("thầy") || lower.includes("cô") || lower.includes("giáo viên") || lower.includes("先生")) {
    return "teacher";
  }
  return "other";
}

function normalizeScriptLines(rawLines: any[]): ScriptLine[] {
  if (!Array.isArray(rawLines)) return [];
  return rawLines.map((l) => {
    const speakerText = l.speaker || l.speakerName || "Người nói";
    const speakerType = l.speakerType || detectSpeakerType(speakerText);
    return {
      speaker: speakerText,
      speakerType,
      text: l.text || l.japanese || "",
      furiganaText: l.furiganaText || l.furigana || undefined,
      vietnamese: l.vietnamese || l.translation || "",
    };
  });
}

function normalizeOptions(rawOptions: any[]): { number: number; text: string; vietnamese: string }[] {
  if (!Array.isArray(rawOptions) || rawOptions.length === 0) {
    return [
      { number: 1, text: "Lựa chọn 1", vietnamese: "Lựa chọn 1" },
      { number: 2, text: "Lựa chọn 2", vietnamese: "Lựa chọn 2" },
      { number: 3, text: "Lựa chọn 3", vietnamese: "Lựa chọn 3" },
      { number: 4, text: "Lựa chọn 4", vietnamese: "Lựa chọn 4" },
    ];
  }
  return rawOptions.map((opt, idx) => {
    if (typeof opt === "string") {
      return {
        number: idx + 1,
        text: opt,
        vietnamese: "",
      };
    }
    return {
      number: opt.number || idx + 1,
      text: opt.text || opt.japanese || `Lựa chọn ${idx + 1}`,
      vietnamese: opt.vietnamese || "",
    };
  });
}

// Parse JSON exam format
export function parseJsonExam(jsonContent: string, fileName: string): ParsedExamData {
  const data = JSON.parse(jsonContent);

  const examTitle = data.examTitle || data.title || fileName.replace(/\.[^/.]+$/, "");
  const rawSections = Array.isArray(data.sections) ? data.sections : [];
  const rawQuestions = Array.isArray(data.questions)
    ? data.questions
    : Array.isArray(data)
    ? data
    : [];

  const sections: ExamSection[] = rawSections.map((s: any, idx: number) => {
    const timeStart = timeStringToSeconds(s.timeStart ?? 0);
    const timeEnd = timeStringToSeconds(s.timeEnd ?? 30);
    return {
      id: s.id || `custom-intro-${idx + 1}`,
      type: s.type || "exam_intro",
      mondai: s.mondai,
      title: s.title || `Hướng dẫn phần ${idx + 1}`,
      titleJapanese: s.titleJapanese || "",
      timeStart,
      timeEnd,
      timestampDisplay: s.timestampDisplay || formatTimeDisplay(timeStart),
      description: s.description || "",
      descriptionVietnamese: s.descriptionVietnamese || "",
      script: normalizeScriptLines(s.script || s.dialogue || []),
    };
  });

  const questions: ListeningQuestion[] = rawQuestions.map((q: any, idx: number) => {
    const mondaiNum = (q.mondai === 1 || q.mondai === 2 || q.mondai === 3 || q.mondai === 4) ? q.mondai : 1;
    const timeStart = timeStringToSeconds(q.timeStart ?? idx * 60);
    const timeEnd = timeStringToSeconds(q.timeEnd ?? (timeStart + 60));
    return {
      id: q.id || `custom-q-${idx + 1}`,
      mondai: mondaiNum,
      mondaiTitle: q.mondaiTitle || `Mondai ${mondaiNum}`,
      questionNumber: q.questionNumber || idx + 1,
      isExample: Boolean(q.isExample),
      timeStart,
      timeEnd,
      timestampDisplay: q.timestampDisplay || formatTimeDisplay(timeStart),
      title: q.title || `Câu hỏi ${q.questionNumber || idx + 1}`,
      situation: q.situation || q.situationJapanese || "",
      situationVietnamese: q.situationVietnamese || "",
      questionText: q.questionText || q.questionTextJapanese || q.title || "",
      questionVietnamese: q.questionVietnamese || q.questionTextVietnamese || "",
      options: normalizeOptions(q.options),
      correctAnswer: typeof q.correctAnswer === "number" ? q.correctAnswer : 1,
      script: normalizeScriptLines(q.script || q.dialogue || []),
      explanation: q.explanation || "",
      keyVocabulary: Array.isArray(q.keyVocabulary) ? q.keyVocabulary : [],
    };
  });

  if (questions.length === 0 && sections.length > 0) {
    const allScriptLines = sections.flatMap((s) => s.script);
    if (allScriptLines.length > 0) {
      questions.push({
        id: "q-1",
        mondai: 1,
        mondaiTitle: "Mondai 1: Toàn văn kịch bản",
        questionNumber: 1,
        isExample: false,
        timeStart: sections[0].timeStart,
        timeEnd: sections[sections.length - 1].timeEnd,
        timestampDisplay: sections[0].timestampDisplay,
        title: examTitle || "Kịch bản bài nghe",
        situation: "Đoạn hội thoại / bài phát thanh tiếng Nhật",
        situationVietnamese: "Nội dung bài nghe đã được phiên âm đầy đủ",
        questionText: "Nội dung cuộc trò chuyện là gì?",
        questionVietnamese: "Nội dung chính của bài nghe",
        options: [
          { number: 1, text: "Đã trích xuất toàn bộ kịch bản", vietnamese: "Bấm xem kịch bản thoại bên dưới" },
          { number: 2, text: "Luyện nghe và đối chiếu câu", vietnamese: "Bấm loa để nghe từng câu" },
        ],
        correctAnswer: 1,
        script: allScriptLines,
        explanation: "Toàn bộ kịch bản lời thoại từ file âm thanh đã được nhận diện và dịch nghĩa song ngữ.",
        keyVocabulary: [],
      });
    }
  }

  // Fallback: Check if root object has dialogue, transcript, lines, or script array
  const rootDialogueLines = normalizeScriptLines(
    Array.isArray(data.dialogue)
      ? data.dialogue
      : Array.isArray(data.transcript)
      ? data.transcript
      : Array.isArray(data.lines)
      ? data.lines
      : Array.isArray(data.script)
      ? data.script
      : []
  );

  if (questions.length === 0 && sections.length === 0 && rootDialogueLines.length > 0) {
    sections.push({
      id: "intro-transcript",
      type: "exam_intro",
      mondai: 1,
      title: "Toàn văn kịch bản bài nghe",
      titleJapanese: "全体スクリプト",
      timeStart: 0,
      timeEnd: 120,
      timestampDisplay: "00:00",
      description: "Lời thoại được AI nhận diện từ file âm thanh",
      descriptionVietnamese: "Kịch bản bài nghe song ngữ Nhật - Việt",
      script: rootDialogueLines,
    });
    questions.push({
      id: "q-1",
      mondai: 1,
      mondaiTitle: "Mondai 1: Kịch bản âm thanh",
      questionNumber: 1,
      isExample: false,
      timeStart: 0,
      timeEnd: 120,
      timestampDisplay: "00:00",
      title: examTitle || "Kịch bản bài nghe",
      situation: "Hội thoại tiếng Nhật đã trích xuất",
      situationVietnamese: "Toàn bộ nội dung bài nghe đã được phiên âm và dịch nghĩa",
      questionText: "Nội dung bài nghe tiếng Nhật",
      questionVietnamese: "Bạn có thể đọc toàn bộ kịch bản và bấm loa để nghe từng câu thoại.",
      options: [
        { number: 1, text: "Đã trích xuất xong toàn bộ kịch bản", vietnamese: "Xem kịch bản bên dưới" },
        { number: 2, text: "Bấm nút loa để nghe từng câu", vietnamese: "Luyện phát âm câu thoại" },
      ],
      correctAnswer: 1,
      script: rootDialogueLines,
      explanation: "Kịch bản âm thanh đã sẵn sàng để bạn theo dõi và đọc.",
      keyVocabulary: [],
    });
  }

  return { examTitle, sections, questions };
}

// Parse SRT or WebVTT Subtitle files into questions & dialogues
export function parseSrtOrVttExam(subtitleText: string, fileName: string): ParsedExamData {
  const blocks = subtitleText
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split(/\n\s*\n/);

  interface SubtitleCue {
    timeStart: number;
    timeEnd: number;
    lines: string[];
  }

  const cues: SubtitleCue[] = [];
  const timeRegex = /(\d{1,2}:\d{2}(?::\d{2})?(?:[.,]\d+)?)\s*-->\s*(\d{1,2}:\d{2}(?::\d{2})?(?:[.,]\d+)?)/;

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed || trimmed === "WEBVTT") continue;
    const lines = trimmed.split("\n").map((l) => l.trim()).filter(Boolean);
    const timeLine = lines.find((l) => timeRegex.test(l));
    if (!timeLine) continue;

    const match = timeLine.match(timeRegex);
    if (!match) continue;

    const timeStart = timeStringToSeconds(match[1]);
    const timeEnd = timeStringToSeconds(match[2]);

    const timeIndex = lines.indexOf(timeLine);
    const textLines = lines.slice(timeIndex + 1);

    if (textLines.length > 0) {
      cues.push({ timeStart, timeEnd, lines: textLines });
    }
  }

  if (cues.length === 0) {
    throw new Error("Không tìm thấy dòng mốc thời gian phụ đề hợp lệ (dạng 00:00:00 --> 00:00:00).");
  }

  const questions: ListeningQuestion[] = [];
  let currentDialogue: ScriptLine[] = [];
  let questionIndex = 1;
  let qStart = cues[0].timeStart;
  let qEnd = cues[0].timeEnd;

  for (let i = 0; i < cues.length; i++) {
    const cue = cues[i];
    qEnd = Math.max(qEnd, cue.timeEnd);

    for (const rawLine of cue.lines) {
      const speakerMatch = rawLine.match(/^([^:：]{1,15})[:：]\s*(.*)$/);
      let speakerType: "male" | "female" | "announcer" | "teacher" | "other" = "other";
      let speakerText = "Người nói";
      let text = rawLine;

      if (speakerMatch) {
        speakerText = speakerMatch[1].trim();
        speakerType = detectSpeakerType(speakerText);
        text = speakerMatch[2].trim();
      }

      currentDialogue.push({
        speaker: speakerText,
        speakerType,
        text,
        vietnamese: "",
      });
    }

    const nextCue = cues[i + 1];
    const isGap = nextCue && nextCue.timeStart - cue.timeEnd > 6;
    const isBigChunk = currentDialogue.length >= 6;
    const isLast = i === cues.length - 1;

    if (isGap || isBigChunk || isLast) {
      const mondaiNum = (questionIndex <= 8 ? 1 : questionIndex <= 15 ? 2 : questionIndex <= 20 ? 3 : 4) as 1 | 2 | 3 | 4;
      const startSec = Math.floor(qStart);
      const endSec = Math.ceil(qEnd);

      questions.push({
        id: `sub-q-${questionIndex}`,
        mondai: mondaiNum,
        mondaiTitle: `Mondai ${mondaiNum}`,
        questionNumber: questionIndex,
        timeStart: startSec,
        timeEnd: endSec,
        timestampDisplay: formatTimeDisplay(startSec),
        title: `Đoạn nghe ${questionIndex} (${formatTimeDisplay(startSec)} - ${formatTimeDisplay(endSec)})`,
        situation: `Đoạn hội thoại phần thi số ${questionIndex}`,
        situationVietnamese: `Đoạn hội thoại phần thi số ${questionIndex}`,
        questionText: "Nội dung câu hỏi luyện nghe",
        questionVietnamese: "Chọn câu trả lời đúng dựa trên hội thoại vừa nghe",
        script: [...currentDialogue],
        options: [
          { number: 1, text: "1", vietnamese: "Lựa chọn 1" },
          { number: 2, text: "2", vietnamese: "Lựa chọn 2" },
          { number: 3, text: "3", vietnamese: "Lựa chọn 3" },
          { number: 4, text: "4", vietnamese: "Lựa chọn 4" },
        ],
        correctAnswer: 1,
        explanation: `Đoạn hội thoại từ ${formatTimeDisplay(startSec)} đến ${formatTimeDisplay(endSec)}`,
        keyVocabulary: [],
      });

      questionIndex++;
      currentDialogue = [];
      if (nextCue) {
        qStart = nextCue.timeStart;
        qEnd = nextCue.timeEnd;
      }
    }
  }

  return {
    examTitle: fileName.replace(/\.[^/.]+$/, ""),
    sections: [],
    questions,
  };
}

// Parse Plain Text file
export function parsePlainTextExam(text: string, fileName: string): ParsedExamData {
  const lines = text
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const questions: ListeningQuestion[] = [];
  const sections: ExamSection[] = [];
  let currentMondai: 1 | 2 | 3 | 4 = 1;
  let currentQuestion: Partial<ListeningQuestion> | null = null;
  let currentIntroLines: ScriptLine[] = [];
  let currentIntroTitle = "Mở đầu đề thi & Hướng dẫn làm bài";
  let qCount = 0;
  let currentTimeMarker = 0;
  let hasStartedQuestions = false;

  const pushCurrentIntroSection = (type: "exam_intro" | "mondai_intro", mondai?: 1 | 2 | 3 | 4) => {
    if (currentIntroLines.length > 0) {
      const start = currentTimeMarker;
      const end = start + Math.max(30, currentIntroLines.length * 6);
      sections.push({
        id: `txt-intro-${sections.length + 1}`,
        type,
        mondai,
        title: currentIntroTitle,
        titleJapanese: type === "exam_intro" ? "試験案内・注意事項 (Từ 00:00)" : `問題案内 (Mondai ${mondai || 1})`,
        timeStart: start,
        timeEnd: end,
        timestampDisplay: formatTimeDisplay(start),
        description: `Lời thoại hướng dẫn từ ${formatTimeDisplay(start)}`,
        descriptionVietnamese: `Lời thoại mở đầu và hướng dẫn cấu trúc bài thi`,
        script: [...currentIntroLines],
      });
      currentTimeMarker = end;
      currentIntroLines = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check Mondai header
    const mondaiMatch = line.match(/(?:mondai|vấn đề|phần|問題)\s*([1-4])/i);
    if (mondaiMatch) {
      const newMondai = parseInt(mondaiMatch[1]) as 1 | 2 | 3 | 4;
      if (!hasStartedQuestions && currentIntroLines.length > 0) {
        pushCurrentIntroSection("exam_intro");
      } else if (currentIntroLines.length > 0) {
        pushCurrentIntroSection("mondai_intro", currentMondai);
      }
      currentMondai = newMondai;
      currentIntroTitle = `Hướng dẫn & Giới thiệu Mondai ${currentMondai}`;
      continue;
    }

    // Check explicit Intro header: "Mở đầu", "Giới thiệu", "試験案内", "Hướng dẫn"
    const introHeaderMatch = line.match(/(?:mở đầu|giới thiệu|hướng dẫn|thông báo|chú ý|注意事項|試験案内|案内)/i);
    if (!hasStartedQuestions && introHeaderMatch) {
      currentIntroTitle = line;
      continue;
    }

    // Check Question header: "Câu 1", "1番", "第1問", "Q1:", "1."
    const qMatch = line.match(/^(?:câu|bài|q|第|問)\s*(\d+|[a-z]|例)/i) || line.match(/^(\d+)[\.\)]\s*(.*)$/);
    if (qMatch) {
      hasStartedQuestions = true;
      if (currentIntroLines.length > 0) {
        pushCurrentIntroSection(sections.length === 0 ? "exam_intro" : "mondai_intro", currentMondai);
      }
      if (currentQuestion && currentQuestion.script && currentQuestion.script.length > 0) {
        questions.push(finalizeQuestion(currentQuestion, qCount));
      }

      qCount++;
      const qNum = qMatch[1] || qCount;
      currentQuestion = {
        id: `txt-m${currentMondai}-${qNum}`,
        mondai: currentMondai,
        mondaiTitle: `Mondai ${currentMondai}`,
        questionNumber: qNum,
        timeStart: currentTimeMarker,
        timeEnd: currentTimeMarker + 60,
        timestampDisplay: formatTimeDisplay(currentTimeMarker),
        title: line,
        situation: line,
        situationVietnamese: "",
        questionText: line,
        questionVietnamese: "",
        script: [],
        options: [
          { number: 1, text: "1", vietnamese: "" },
          { number: 2, text: "2", vietnamese: "" },
          { number: 3, text: "3", vietnamese: "" },
          { number: 4, text: "4", vietnamese: "" },
        ],
        correctAnswer: 1,
      };
      currentTimeMarker += 60;
      continue;
    }

    // If we have not reached any question yet, collect into intro section!
    if (!hasStartedQuestions) {
      const speakerMatch = line.match(/^([^:：]{1,15})[:：]\s*(.*)$/);
      if (speakerMatch) {
        const speakerText = speakerMatch[1].trim();
        const speakerType = detectSpeakerType(speakerText);
        const content = speakerMatch[2].trim();
        currentIntroLines.push({
          speaker: speakerText,
          speakerType,
          text: content,
          vietnamese: "",
        });
      } else {
        currentIntroLines.push({
          speaker: "Phát thanh viên",
          speakerType: "announcer",
          text: line,
          vietnamese: "",
        });
      }
      continue;
    }

    if (!currentQuestion) {
      qCount++;
      currentQuestion = {
        id: `txt-q-${qCount}`,
        mondai: currentMondai,
        mondaiTitle: `Mondai ${currentMondai}`,
        questionNumber: qCount,
        timeStart: currentTimeMarker,
        timeEnd: currentTimeMarker + 60,
        timestampDisplay: formatTimeDisplay(currentTimeMarker),
        title: `Câu hỏi ${qCount}`,
        situation: `Tình huống câu hỏi ${qCount}`,
        situationVietnamese: "",
        questionText: `Câu hỏi ${qCount}`,
        questionVietnamese: "",
        script: [],
        options: [
          { number: 1, text: "1", vietnamese: "" },
          { number: 2, text: "2", vietnamese: "" },
          { number: 3, text: "3", vietnamese: "" },
          { number: 4, text: "4", vietnamese: "" },
        ],
        correctAnswer: 1,
      };
      currentTimeMarker += 60;
    }

    // Check options: "1. ...", "2. ..."
    const optionMatch = line.match(/^([1-4])[\.\:\)]\s*(.*)$/);
    if (optionMatch) {
      const optIdx = parseInt(optionMatch[1]) - 1;
      if (!currentQuestion.options) {
        currentQuestion.options = [
          { number: 1, text: "1", vietnamese: "" },
          { number: 2, text: "2", vietnamese: "" },
          { number: 3, text: "3", vietnamese: "" },
          { number: 4, text: "4", vietnamese: "" },
        ];
      }
      currentQuestion.options[optIdx] = {
        number: optIdx + 1,
        text: optionMatch[2],
        vietnamese: "",
      };
      continue;
    }

    // Check correct answer: "Đáp án: 2", "Key: 3", "正解: 1"
    const ansMatch = line.match(/(?:đáp án|câu trả lời|key|answer|正解)[:：]\s*([1-4])/i);
    if (ansMatch) {
      currentQuestion.correctAnswer = parseInt(ansMatch[1]);
      continue;
    }

    // Dialogue line with speaker prefix
    const speakerMatch = line.match(/^([^:：]{1,12})[:：]\s*(.*)$/);
    if (speakerMatch) {
      const speakerText = speakerMatch[1].trim();
      const speakerType = detectSpeakerType(speakerText);
      const content = speakerMatch[2].trim();
      currentQuestion.script?.push({
        speaker: speakerText,
        speakerType,
        text: content,
        vietnamese: "",
      });
    } else {
      currentQuestion.script?.push({
        speaker: "Người nói",
        speakerType: "other",
        text: line,
        vietnamese: "",
      });
    }
  }

  // Push any remaining intro lines
  if (currentIntroLines.length > 0) {
    pushCurrentIntroSection(sections.length === 0 ? "exam_intro" : "mondai_intro", currentMondai);
  }

  if (currentQuestion && currentQuestion.script && currentQuestion.script.length > 0) {
    questions.push(finalizeQuestion(currentQuestion, qCount));
  }

  return {
    examTitle: fileName.replace(/\.[^/.]+$/, ""),
    sections,
    questions,
  };
}

function finalizeQuestion(raw: Partial<ListeningQuestion>, count: number): ListeningQuestion {
  const startSec = raw.timeStart || 0;
  return {
    id: raw.id || `q-${count}`,
    mondai: raw.mondai || 1,
    mondaiTitle: raw.mondaiTitle || "Mondai 1",
    questionNumber: raw.questionNumber || count,
    isExample: raw.isExample,
    timeStart: startSec,
    timeEnd: raw.timeEnd || startSec + 60,
    timestampDisplay: raw.timestampDisplay || formatTimeDisplay(startSec),
    title: raw.title || `Câu hỏi ${count}`,
    situation: raw.situation || "",
    situationVietnamese: raw.situationVietnamese || "",
    questionText: raw.questionText || "",
    questionVietnamese: raw.questionVietnamese || "",
    options: raw.options && raw.options.length === 4 ? raw.options : [
      { number: 1, text: "1", vietnamese: "" },
      { number: 2, text: "2", vietnamese: "" },
      { number: 3, text: "3", vietnamese: "" },
      { number: 4, text: "4", vietnamese: "" },
    ],
    correctAnswer: raw.correctAnswer || 1,
    script: raw.script || [],
    explanation: raw.explanation || "",
    keyVocabulary: raw.keyVocabulary || [],
  };
}
