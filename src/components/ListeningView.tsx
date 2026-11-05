import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Headphones,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Upload,
  Eye,
  EyeOff,
  Languages,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Repeat,
  FastForward,
  Rewind,
  BookOpen,
  Filter,
  Check,
  ChevronDown,
  Info,
  Radio,
  Clock,
  ListRestart,
  Volume1,
  FileAudio,
  Bot,
  ArrowRight,
  Search,
  FileText,
  Download,
  Copy,
  ExternalLink,
  X,
  RefreshCw,
  FileUp,
  Edit3,
  AlertCircle,
  Loader2,
  FileCode,
  Flame,
  Sliders,
  Cloud,
} from "lucide-react";
import {
  jlpt2021N4ListeningExam,
  examIntroSections,
  ListeningQuestion,
  ExamSection,
  ScriptLine,
} from "../data/listeningN4_2021";
import {
  parseJsonExam,
  parseSrtOrVttExam,
  parsePlainTextExam,
  formatTimeDisplay,
  ParsedExamData,
} from "../lib/scriptParser";
import { ListeningNotesModal } from "./ListeningNotesModal";
import { ListeningNotesSection } from "./ListeningNotesSection";
import { cdaQuestions, cdaExamIntroSections } from "../data/listeningN4_CDA";
import { FirestoreSyncModal } from "./FirestoreSyncModal";
import { AudioStorageModal } from "./AudioStorageModal";
import {
  saveAudioToCache,
  getAudioFromCache,
  uploadAudioToServer,
  removeAudioFromCache,
} from "../lib/audioStorage";

export function ListeningView() {
  // Top-level View Tab: 'exam' (Audio, Questions, Scripts) | 'notes' (87 Bí Kíp & Voice Studio)
  const [mainListeningTab, setMainListeningTab] = useState<"exam" | "notes">("exam");
  const [showFileMenu, setShowFileMenu] = useState<boolean>(false);
  const fileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (fileMenuRef.current && !fileMenuRef.current.contains(e.target as Node)) {
        setShowFileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  // Playback mode: 'tts' (AI Voice, works out-of-the-box without any file) | 'file' (Native MP3 file)
  const [playbackMode, setPlaybackMode] = useState<"tts" | "file">("tts");

  // Native Audio state
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioFileName, setAudioFileName] = useState<string>("");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(2376); // ~39m36s default duration
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [loopActiveQuestion, setLoopActiveQuestion] = useState(false);

  // Dynamic Exam state (default JLPT N4 07/2021 or custom uploaded audio/script)
  const [questions, setQuestions] = useState<ListeningQuestion[]>(jlpt2021N4ListeningExam);
  const [examSections, setExamSections] = useState<ExamSection[]>(examIntroSections);
  const [examTitle, setExamTitle] = useState<string>("Đề thi JLPT N4 07/2021 (Đề chuẩn)");
  const [isCustomExam, setIsCustomExam] = useState<boolean>(false);
  const [examSourceFileName, setExamSourceFileName] = useState<string>("");

  // Uploaded audio file reference and AI transcription state
  const uploadedAudioFileRef = useRef<File | null>(null);
  const audioFileInputRef = useRef<HTMLInputElement | null>(null);
  const scriptFileInputRef = useRef<HTMLInputElement | null>(null);
  const [showUpdateScriptPrompt, setShowUpdateScriptPrompt] = useState(false);
  const [isAiTranscribing, setIsAiTranscribing] = useState(false);
  const [aiTranscribeStatus, setAiTranscribeStatus] = useState("");
  const [scanStep, setScanStep] = useState<number>(1);
  const [autoScanOnUpload, setAutoScanOnUpload] = useState<boolean>(true);
  const transcribeAbortRef = useRef(false);
  const [showPasteScriptModal, setShowPasteScriptModal] = useState(false);
  const [showFirestoreModal, setShowFirestoreModal] = useState(false);
  const [showAudioStorageModal, setShowAudioStorageModal] = useState(false);
  const [activePresetKey, setActivePresetKey] = useState<string>("jlpt2021");
  const [audioStorageStatus, setAudioStorageStatus] = useState<"server" | "indexeddb" | "memory" | "none">("none");
  const [pasteScriptText, setPasteScriptText] = useState("");
  const [toastMessage, setToastMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  // Restore original native audio file from IndexedDB or Server for an exam preset
  const loadAudioForPreset = useCallback(
    async (presetKey: string) => {
      try {
        // 1. Check local IndexedDB cache first
        const cached = await getAudioFromCache(presetKey);
        if (cached) {
          setAudioUrl(cached.url);
          setAudioFileName(cached.name);
          setPlaybackMode("file");
          setAudioStorageStatus("indexeddb");
          return true;
        }

        // 2. Check Server storage
        const res = await fetch(`/api/audio/preset/${presetKey}`);
        if (res.ok) {
          const data = await res.json();
          if (data.found && data.audioUrl) {
            setAudioUrl(data.audioUrl);
            setAudioFileName(data.fileName);
            setPlaybackMode("file");
            setAudioStorageStatus("server");
            return true;
          }
        }
      } catch (err) {
        console.warn("Lỗi kiểm tra audio preset:", err);
      }
      return false;
    },
    []
  );

  // Auto-load audio on initial mount for default preset
  useEffect(() => {
    loadAudioForPreset("jlpt2021");
  }, [loadAudioForPreset]);

  // Switch between presets: JLPT 2021 standard vs 実力アップ! N4 CD A
  const handleSelectExamPreset = async (preset: "jlpt2021" | "cda") => {
    stopTts();
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlayingAudio(false);
    setCurrentTime(0);
    setActivePresetKey(preset);

    if (preset === "cda") {
      setQuestions(cdaQuestions);
      setExamSections(cdaExamIntroSections);
      setExamTitle("実力アップ! N4 聞く 聴解 (CD A)");
      setIsCustomExam(true);
      setExamSourceFileName("CD_A_Jitsuryoku_Up.mp3");
      setUserAnswers({});
      setSelectedQuestionId("cda-q1");

      const hasAudio = await loadAudioForPreset("cda");
      if (hasAudio) {
        showToast("🎧 Đã nạp đề '実力アップ! N4 CD A' kèm file giọng đọc gốc chuẩn (MP3)!", "success");
      } else {
        setAudioUrl(null);
        setAudioFileName("");
        setAudioStorageStatus("none");
        setPlaybackMode("tts");
        showToast("🎧 Đã nạp đề CD A (40 câu hỏi). Bấm nút 'Giữ Giọng Gốc' để gắn file MP3 nếu muốn nghe giọng thực!", "info");
      }
    } else {
      setQuestions(jlpt2021N4ListeningExam);
      setExamSections(examIntroSections);
      setExamTitle("Đề thi JLPT N4 07/2021 (Đề chuẩn)");
      setIsCustomExam(false);
      setExamSourceFileName("");
      setUserAnswers({});
      setSelectedQuestionId("m1-1");

      const hasAudio = await loadAudioForPreset("jlpt2021");
      if (hasAudio) {
        showToast("🎧 Đã nạp đề JLPT N4 07/2021 kèm file âm thanh gốc!", "success");
      } else {
        setAudioUrl(null);
        setAudioFileName("");
        setAudioStorageStatus("none");
        setPlaybackMode("tts");
        showToast("Đã chuyển về đề chuẩn JLPT N4 07/2021.", "info");
      }
    }
  };

  // View & Practice state
  const [selectedMondai, setSelectedMondai] = useState<number | "all" | "intro">("all");
  const [showAllScripts, setShowAllScripts] = useState(true);
  const [showFullScriptModal, setShowFullScriptModal] = useState(false);
  const [fullScriptModalMondai, setFullScriptModalMondai] = useState<number | "all" | "intro">("all");
  const [copiedFullScript, setCopiedFullScript] = useState(false);
  const [revealedScriptIds, setRevealedScriptIds] = useState<Record<string, boolean>>({});
  const [showVietnamese, setShowVietnamese] = useState(true);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>("m1-1");
  const [searchQuery, setSearchQuery] = useState("");

  // 87 Listening Notes Modal & Multi-Voice Studio state
  const [showListeningNotesModal, setShowListeningNotesModal] = useState<boolean>(false);
  const [selectedAiVoice, setSelectedAiVoice] = useState<string>("Kore");
  const [voiceEngine, setVoiceEngine] = useState<"ai" | "browser">("ai");
  const [selectedBrowserVoiceIndex, setSelectedBrowserVoiceIndex] = useState<number>(0);
  const audioCacheRef = useRef<Record<string, string>>({});
  const ttsAudioElementRef = useRef<HTMLAudioElement | null>(null);

  // Toast notification helper
  const showToast = useCallback((text: string, type: "success" | "error" | "info" = "info") => {
    setToastMessage({ type, text });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  }, []);

  // Helper to convert File to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // Apply new parsed exam data and update state
  const applyNewExamData = useCallback(
    (data: ParsedExamData, sourceName: string) => {
      if (!data.questions || data.questions.length === 0) {
        showToast("Không tìm thấy câu hỏi hoặc lời thoại hợp lệ trong nội dung kịch bản.", "error");
        return;
      }
      setQuestions(data.questions);
      setExamSections(data.sections || []);
      setExamTitle(data.examTitle || sourceName);
      setIsCustomExam(true);
      setExamSourceFileName(sourceName);
      setSelectedQuestionId(data.questions[0]?.id || "q-1");
      setSelectedMondai("all");
      setUserAnswers({});
      setRevealedScriptIds({});
      setShowUpdateScriptPrompt(false);
      setShowPasteScriptModal(false);
      showToast(
        `🎉 Đã cập nhật Script thành công từ "${sourceName}" (${data.questions.length} câu hỏi, ${
          data.sections?.length || 0
        } phần mở đầu)!`,
        "success"
      );
    },
    [showToast]
  );

  // Restore default JLPT 2021 N4 exam
  const handleResetToDefaultExam = useCallback(() => {
    setQuestions(jlpt2021N4ListeningExam);
    setExamSections(examIntroSections);
    setExamTitle("Đề thi JLPT N4 07/2021 (Đề chuẩn)");
    setIsCustomExam(false);
    setExamSourceFileName("");
    setSelectedQuestionId("m1-1");
    setSelectedMondai("all");
    setUserAnswers({});
    setShowUpdateScriptPrompt(false);
    showToast("Đã khôi phục bộ Script đề thi gốc JLPT N4 07/2021.", "info");
  }, [showToast]);

  // Handle uploaded script file (.json, .srt, .vtt, .txt)
  const handleScriptFileUpload = async (file: File) => {
    try {
      const text = await file.text();
      const ext = file.name.split(".").pop()?.toLowerCase();
      let parsed: ParsedExamData;

      if (ext === "json") {
        parsed = parseJsonExam(text, file.name);
      } else if (ext === "srt" || ext === "vtt") {
        parsed = parseSrtOrVttExam(text, file.name);
      } else {
        parsed = parsePlainTextExam(text, file.name);
      }

      applyNewExamData(parsed, file.name);
    } catch (err: any) {
      console.warn("Client script parse error, trying server AI parser:", err);
      try {
        const text = await file.text();
        const res = await fetch("/api/ai/parse-script-text", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, title: file.name }),
        });
        if (!res.ok) throw new Error("AI không thể phân tích file script này.");
        const data = await res.json();
        const parsed = parseJsonExam(JSON.stringify(data), file.name);
        applyNewExamData(parsed, file.name);
      } catch (aiErr: any) {
        showToast("Lỗi khi đọc file script: " + (aiErr.message || err.message), "error");
      }
    }
  };

  // Run AI Transcribe & Speech-to-Text on the uploaded audio file via Gemini
  const handleRunAiAudioTranscribe = async (targetFile?: File) => {
    const file = targetFile || uploadedAudioFileRef.current;
    if (!file) {
      showToast("Chưa có file âm thanh để phân tích. Vui lòng tải file audio trước.", "error");
      return;
    }

    uploadedAudioFileRef.current = file;
    transcribeAbortRef.current = false;
    setIsAiTranscribing(true);
    setScanStep(1);
    setAiTranscribeStatus(`Đang đọc và mã hóa dữ liệu âm thanh (${(file.size / (1024 * 1024)).toFixed(1)} MB)...`);

    try {
      const base64Audio = await fileToBase64(file);
      if (transcribeAbortRef.current) return;

      setScanStep(2);
      setAiTranscribeStatus("Gemini AI đang quét sóng âm, nhận diện giọng nói tiếng Nhật và căn mốc thời gian...");

      const res = await fetch("/api/ai/transcribe-listening", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          audioBase64: base64Audio,
          mimeType: file.type || "audio/mp3",
          fileName: file.name,
        }),
      });

      if (transcribeAbortRef.current) return;

      setScanStep(3);
      setAiTranscribeStatus("Đang trích xuất toàn văn kịch bản Kanji/Hiragana, phân vai người nói và dịch nghĩa tiếng Việt...");

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || "Không thể phiên âm audio từ AI.");
      }

      const examData = await res.json();
      if (transcribeAbortRef.current) return;

      setScanStep(4);
      setAiTranscribeStatus("Đồng bộ hoàn tất! Đang mở toàn bộ kịch bản để bạn đọc...");

      const parsed = parseJsonExam(JSON.stringify(examData), file.name);
      applyNewExamData(parsed, `AI: ${file.name}`);

      // Ensure main view tab is 'exam'
      setMainListeningTab("exam");

      // Auto-open Full Script view so user can read the script immediately as requested
      setTimeout(() => {
        setShowAllScripts(true);
        setShowFullScriptModal(true);
      }, 400);

      showToast(
        `🎉 Đã quét & trích xuất thành công kịch bản từ "${file.name}"! Kịch bản đã sẵn sàng để bạn đọc.`,
        "success"
      );
    } catch (err: any) {
      if (transcribeAbortRef.current) return;
      console.error("Lỗi AI Transcribe:", err);
      showToast(
        "Không thể trích xuất script qua AI: " + (err.message || "Vui lòng thử lại hoặc nạp file script."),
        "error"
      );
      setShowUpdateScriptPrompt(true);
    } finally {
      setIsAiTranscribing(false);
      setAiTranscribeStatus("");
      setScanStep(1);
    }
  };

  // Process any incoming file (Audio or Script)
  const processIncomingFile = async (file: File) => {
    const isAudio =
      file.type.startsWith("audio/") ||
      /\.(mp3|m4a|wav|aac|ogg)$/i.test(file.name);
    const isScript = /\.(json|txt|srt|vtt)$/i.test(file.name);

    if (isScript) {
      await handleScriptFileUpload(file);
      return;
    }

    if (isAudio) {
      if (audioUrl && audioUrl.startsWith("blob:")) {
        URL.revokeObjectURL(audioUrl);
      }
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      setAudioFileName(file.name);
      uploadedAudioFileRef.current = file;
      setPlaybackMode("file");
      stopTts();
      setIsPlayingAudio(false);
      setCurrentTime(0);

      // Save to IndexedDB and Server to retain original voice permanently
      saveAudioToCache(activePresetKey, file, {
        name: file.name,
        size: file.size,
        mimeType: file.type || "audio/mp3",
      }).catch((e) => console.warn("Lỗi cache audio:", e));

      uploadAudioToServer(file, file.name, activePresetKey)
        .then((res) => {
          if (res.audioUrl) {
            setAudioUrl(res.audioUrl);
            setAudioStorageStatus("server");
          }
        })
        .catch((e) => console.warn("Lỗi upload audio server:", e));

      // Ensure user is on the exam tab
      setMainListeningTab("exam");

      // If already on CD A with complete 40 questions, notify user that original voice is retained
      if (activePresetKey === "cda" && questions.length === 40) {
        showToast(
          `🎉 Đã lưu giữ file giọng đọc gốc "${file.name}" cho CD A! 40 câu hỏi chuẩn sẽ phát bằng giọng gốc này.`,
          "success"
        );
      } else {
        showToast(
          `🔍 Đã lưu file âm thanh "${file.name}". Đang quét phân tích kịch bản bằng AI Gemini (Speech-to-Text)...`,
          "info"
        );
        await handleRunAiAudioTranscribe(file);
      }
    }
  };

  // TTS Engine state
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [ttsState, setTtsState] = useState<{
    isPlaying: boolean;
    questionId: string | null;
    lineIndex: number; // -1 = situation prompt, 0..N = dialogue lines
    isSpeakingSingle: boolean;
  }>({
    isPlaying: false,
    questionId: null,
    lineIndex: -1,
    isSpeakingSingle: false,
  });

  // Reference to track active TTS sequence
  const ttsAbortRef = useRef(false);

  // Initialize SpeechSynthesis voices
  useEffect(() => {
    const updateVoices = () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        const available = window.speechSynthesis.getVoices();
        if (available && available.length > 0) {
          setVoices(available);
        }
      }
    };

    updateVoices();
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // File upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processIncomingFile(file);
      e.target.value = "";
    }
  };

  const handleDropFile = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processIncomingFile(file);
    }
  };

  // Time formatting helper (e.g. 125 -> "02:05")
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Find active question based on audio currentTime or selected question
  const currentActiveQuestion =
    questions.find(
      (q) => currentTime >= q.timeStart && currentTime <= q.timeEnd
    ) ||
    questions.find((q) => q.id === (ttsState.questionId || selectedQuestionId)) ||
    questions[0] ||
    jlpt2021N4ListeningExam[0];

  // Stop TTS safely
  const stopTts = useCallback(() => {
    ttsAbortRef.current = true;
    if (ttsAudioElementRef.current) {
      ttsAudioElementRef.current.pause();
      ttsAudioElementRef.current = null;
    }
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setTtsState({
      isPlaying: false,
      questionId: null,
      lineIndex: -1,
      isSpeakingSingle: false,
    });
  }, []);

  // Speak single text snippet with appropriate Japanese voice and pitch
  const speakUtterance = useCallback(
    async (text: string, speakerType: string = "other"): Promise<void> => {
      // 1. Try Gemini AI Native Voice if enabled
      if (voiceEngine === "ai") {
        try {
          // Map speakerType to distinct personas for realistic multi-speaker listening exam
          let targetPersona = selectedAiVoice;
          if (speakerType === "male") {
            targetPersona = "Puck";
          } else if (speakerType === "female") {
            targetPersona = "Kore";
          } else if (speakerType === "announcer") {
            targetPersona = "Fenrir";
          }

          const cacheKey = `${targetPersona}_${text}`;
          let base64 = audioCacheRef.current[cacheKey];

          if (!base64) {
            const res = await fetch("/api/ai/tts", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                text,
                voiceName: targetPersona,
              }),
            });

            if (res.ok) {
              const data = await res.json();
              base64 = data.audioBase64;
              audioCacheRef.current[cacheKey] = base64;
            }
          }

          if (base64) {
            const audio = new Audio(`data:audio/wav;base64,${base64}`);
            audio.playbackRate = playbackRate;
            ttsAudioElementRef.current = audio;

            await new Promise<void>((resolve) => {
              audio.onended = () => resolve();
              audio.onerror = () => resolve();
              audio.play().catch(() => resolve());
            });
            return;
          }
        } catch (err) {
          console.warn("AI TTS playback fallback to browser:", err);
        }
      }

      // 2. Fallback to Browser Web Speech API
      return new Promise((resolve) => {
        if (typeof window === "undefined" || !window.speechSynthesis) {
          resolve();
          return;
        }

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "ja-JP";
        utterance.rate = playbackRate;

        // Choose Japanese voice if available
        const currentVoices = voices.length > 0 ? voices : window.speechSynthesis.getVoices();
        const jaVoices = currentVoices.filter(
          (v) => v.lang.startsWith("ja") || v.lang.includes("JP")
        );

        if (jaVoices.length > 0) {
          if (speakerType === "male") {
            const mVoice = jaVoices.find(
              (v) =>
                v.name.toLowerCase().includes("male") ||
                v.name.toLowerCase().includes("otoya") ||
                v.name.toLowerCase().includes("ichiro") ||
                v.name.toLowerCase().includes("keita")
            );
            utterance.voice = mVoice || jaVoices[0];
          } else if (speakerType === "female") {
            const fVoice = jaVoices.find(
              (v) =>
                v.name.toLowerCase().includes("female") ||
                v.name.toLowerCase().includes("kyoko") ||
                v.name.toLowerCase().includes("nanami") ||
                v.name.toLowerCase().includes("ayumi")
            );
            utterance.voice = fVoice || jaVoices[0];
          } else {
            const defaultVoice =
              jaVoices[selectedBrowserVoiceIndex < jaVoices.length ? selectedBrowserVoiceIndex : 0];
            utterance.voice = defaultVoice || jaVoices[0];
          }
        }

        // Speaker pitch modulation for realism
        if (speakerType === "male") {
          utterance.pitch = 0.82;
        } else if (speakerType === "female") {
          utterance.pitch = 1.25;
        } else if (speakerType === "announcer") {
          utterance.pitch = 1.05;
          utterance.rate = playbackRate * 0.95;
        } else {
          utterance.pitch = 1.0;
        }

        utterance.onend = () => resolve();
        utterance.onerror = (e) => {
          console.warn("TTS utterance completed or interrupted:", e);
          resolve();
        };

        window.speechSynthesis.speak(utterance);
      });
    },
    [voiceEngine, selectedAiVoice, playbackRate, voices, selectedBrowserVoiceIndex]
  );

  // Play dialogue lines of a question sequentially
  const playQuestionDialogueTts = useCallback(
    async (question: ListeningQuestion, startIndex: number = 0) => {
      if (isPlayingAudio && audioRef.current) {
        audioRef.current.pause();
        setIsPlayingAudio(false);
      }

      stopTts();
      ttsAbortRef.current = false;
      setSelectedQuestionId(question.id);

      setTtsState({
        isPlaying: true,
        questionId: question.id,
        lineIndex: startIndex,
        isSpeakingSingle: false,
      });

      // If startIndex is 0, first read the situation context if desired
      for (let i = startIndex; i < question.script.length; i++) {
        if (ttsAbortRef.current) break;

        const line = question.script[i];
        setTtsState({
          isPlaying: true,
          questionId: question.id,
          lineIndex: i,
          isSpeakingSingle: false,
        });

        await speakUtterance(line.text, line.speakerType);

        if (ttsAbortRef.current) break;

        // Brief natural pause between dialogue turns
        await new Promise((r) => setTimeout(r, 600));
      }

      if (!ttsAbortRef.current) {
        // Dialogue finished
        if (loopActiveQuestion) {
          // Loop dialogue if repeat mode enabled
          playQuestionDialogueTts(question, 0);
        } else {
          setTtsState({
            isPlaying: false,
            questionId: question.id,
            lineIndex: -1,
            isSpeakingSingle: false,
          });
        }
      }
    },
    [isPlayingAudio, stopTts, speakUtterance, loopActiveQuestion]
  );

  // Play single line on click
  const playSingleLineTts = useCallback(
    async (qId: string, lineIndex: number, text: string, speakerType: string) => {
      stopTts();
      ttsAbortRef.current = false;
      setSelectedQuestionId(qId);
      setTtsState({
        isPlaying: true,
        questionId: qId,
        lineIndex: lineIndex,
        isSpeakingSingle: true,
      });

      await speakUtterance(text, speakerType);

      setTtsState({
        isPlaying: false,
        questionId: null,
        lineIndex: -1,
        isSpeakingSingle: false,
      });
    },
    [stopTts, speakUtterance]
  );

  // Handle Native Audio Loop
  useEffect(() => {
    if (loopActiveQuestion && currentActiveQuestion && audioRef.current && isPlayingAudio) {
      if (currentTime >= currentActiveQuestion.timeEnd) {
        audioRef.current.currentTime = currentActiveQuestion.timeStart;
      }
    }
  }, [currentTime, loopActiveQuestion, currentActiveQuestion, isPlayingAudio]);

  // Audio element events
  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 2376);
    }
  };

  // Toggle playback in unified player
  const togglePlay = () => {
    if (playbackMode === "file" && audioUrl && audioRef.current) {
      if (isPlayingAudio) {
        audioRef.current.pause();
        setIsPlayingAudio(false);
      } else {
        stopTts();
        audioRef.current
          .play()
          .then(() => setIsPlayingAudio(true))
          .catch((err) => {
            console.warn("Audio play prevented:", err);
          });
      }
    } else {
      // TTS Mode or Fallback Mode
      if (ttsState.isPlaying) {
        stopTts();
      } else {
        const targetQ = currentActiveQuestion || jlpt2021N4ListeningExam[0];
        playQuestionDialogueTts(targetQ, ttsState.lineIndex >= 0 ? ttsState.lineIndex : 0);
      }
    }
  };

  const seekTo = (seconds: number) => {
    if (audioRef.current && audioUrl) {
      audioRef.current.currentTime = Math.max(0, Math.min(seconds, duration));
      setCurrentTime(audioRef.current.currentTime);
      if (!isPlayingAudio) {
        stopTts();
        audioRef.current.play().then(() => setIsPlayingAudio(true)).catch(() => {});
      }
    } else {
      setCurrentTime(seconds);
    }
  };

  // Jump to specific question
  const jumpToQuestion = (q: ListeningQuestion) => {
    setSelectedQuestionId(q.id);

    if (playbackMode === "file" && audioUrl && audioRef.current) {
      seekTo(q.timeStart);
    } else {
      // Auto play via TTS
      setCurrentTime(q.timeStart);
      playQuestionDialogueTts(q, 0);
    }

    // Scroll smoothly to question
    const el = document.getElementById(`q-${q.id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Jump to specific introduction section
  const jumpToSection = (sec: ExamSection) => {
    setSelectedQuestionId(sec.id);

    if (playbackMode === "file" && audioUrl && audioRef.current) {
      seekTo(sec.timeStart);
    } else {
      setCurrentTime(sec.timeStart);
      playSectionDialogueTts(sec);
    }

    const el = document.getElementById(`sec-${sec.id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Play dialogue lines for intro section via TTS
  const playSectionDialogueTts = useCallback(
    async (sec: ExamSection) => {
      stopTts();
      if (isPlayingAudio && audioRef.current) {
        audioRef.current.pause();
        setIsPlayingAudio(false);
      }

      ttsAbortRef.current = false;
      setSelectedQuestionId(sec.id);
      setTtsState({
        isPlaying: true,
        questionId: sec.id,
        lineIndex: 0,
        isSpeakingSingle: false,
      });

      for (let i = 0; i < sec.script.length; i++) {
        if (ttsAbortRef.current) break;

        const line = sec.script[i];
        setTtsState({
          isPlaying: true,
          questionId: sec.id,
          lineIndex: i,
          isSpeakingSingle: false,
        });

        await speakUtterance(line.text, line.speakerType);

        if (ttsAbortRef.current) break;
        await new Promise((r) => setTimeout(r, 600));
      }

      if (!ttsAbortRef.current) {
        setTtsState({
          isPlaying: false,
          questionId: sec.id,
          lineIndex: -1,
          isSpeakingSingle: false,
        });
      }
    },
    [isPlayingAudio, stopTts, speakUtterance]
  );

  const changeSpeed = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  // Answer selection
  const handleSelectAnswer = (qId: string, optionNumber: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [qId]: optionNumber,
    }));
  };

  const toggleRevealScript = (qId: string) => {
    setRevealedScriptIds((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  // Generate plain text of full exam script for copying or downloading
  const generateFullScriptText = useCallback(
    (targetMondai: number | "all" | "intro" = "all") => {
      let output = `========================================================\n`;
      output += `${examTitle} - FULL SCRIPT & LỜI THOẠI\n`;
      output += `Bao gồm: Lời mở đầu, Hướng dẫn từng Mondai, ${questions.length} câu hỏi & Đáp án\n`;
      output += `========================================================\n\n`;

      // 1. Phân đoạn mở đầu & Lời dẫn các Mondai
      if ((targetMondai === "all" || targetMondai === "intro") && examSections.length > 0) {
        output += `========================================================\n`;
        output += `【PHẦN MỞ ĐẦU & LỜI DẪN CÁC MONDAI CỦA BĂNG THI】\n`;
        output += `========================================================\n\n`;

        examSections.forEach((intro) => {
          output += `--------------------------------------------------------\n`;
          output += `[${intro.titleJapanese}] ${intro.title} (Mốc audio: ${intro.timestampDisplay})\n`;
          if (intro.descriptionVietnamese) {
            output += `Mô tả: ${intro.descriptionVietnamese}\n`;
          }
          output += `\n【KỊCH BẢN LỜI THOẠI CHI TIẾT】:\n`;
          intro.script.forEach((line) => {
            output += `  ${line.speaker}: ${line.text}\n`;
            output += `   -> Dịch TV: ${line.vietnamese}\n`;
          });
          output += `\n\n`;
        });
      }

      // 2. Các câu hỏi
      if (targetMondai !== "intro") {
        const list = questions.filter(
          (q) => targetMondai === "all" || q.mondai === targetMondai
        );

        output += `========================================================\n`;
        output += `【CÁC CÂU HỎI THI CHI TIẾT (TỔNG ${list.length} CÂU)】\n`;
        output += `========================================================\n\n`;

        list.forEach((q) => {
          output += `--------------------------------------------------------\n`;
          output += `[${q.mondaiTitle}] ${q.isExample ? "VÍ DỤ (例)" : `CÂU ${q.questionNumber}`} (Mốc audio: ${q.timestampDisplay})\n`;
          output += `Tiêu đề: ${q.title}\n`;
          if (q.situation) output += `Tình huống: ${q.situation}\n`;
          if (q.situationVietnamese) output += `Dịch TV: ${q.situationVietnamese}\n`;
          if (q.questionText && q.questionText !== q.situation) {
            output += `Câu hỏi: ${q.questionText} (${q.questionVietnamese})\n`;
          }
          output += `\n【KỊCH BẢN HỘI THOẠI CHI TIẾT】:\n`;
          q.script.forEach((line) => {
            output += `  ${line.speaker}: ${line.text}\n`;
            output += `   -> Dịch TV: ${line.vietnamese}\n`;
          });
          output += `\n【CÁC LỰA CHỌN ĐÁP ÁN】:\n`;
          q.options.forEach((opt) => {
            output += `  ${opt.number}. ${opt.text} ${opt.vietnamese ? `(${opt.vietnamese})` : ""}\n`;
          });
          output += `\n>>> ĐÁP ÁN ĐÚNG: [ ${q.correctAnswer} ]\n`;
          if (q.explanation) output += `>>> GIẢI THÍCH: ${q.explanation}\n`;
          if (q.keyVocabulary && q.keyVocabulary.length > 0) {
            output += `>>> TỪ KHÓA: ${q.keyVocabulary.join(" | ")}\n`;
          }
          output += `\n\n`;
        });
      }

      return output;
    },
    [examTitle, examSections, questions]
  );

  const handleCopyFullScript = (targetMondai: number | "all" | "intro" = "all") => {
    const text = generateFullScriptText(targetMondai);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedFullScript(true);
      setTimeout(() => setCopiedFullScript(false), 2500);
    }
  };

  const handleDownloadFullScript = (targetMondai: number | "all" | "intro" = "all") => {
    const text = generateFullScriptText(targetMondai);
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const cleanName = examTitle.replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1E00-\u1EFF]/g, "_");
    a.download = `${cleanName}${targetMondai === "all" ? "_Full" : targetMondai === "intro" ? "_Huong_Dan_Mo_Dau" : `_Mondai_${targetMondai}`}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Filtered questions
  const filteredQuestions = questions.filter((q) => {
    if (selectedMondai !== "all" && q.mondai !== selectedMondai) {
      return false;
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const inTitle = q.title.toLowerCase().includes(query);
      const inSituation = (q.situation || "").toLowerCase().includes(query);
      const inVietnamese = (q.situationVietnamese || "").toLowerCase().includes(query);
      const inScript = q.script.some(
        (s) => s.text.toLowerCase().includes(query) || s.vietnamese.toLowerCase().includes(query)
      );
      return inTitle || inSituation || inVietnamese || inScript;
    }
    return true;
  });

  // Calculate stats
  const totalQuestions = questions.filter((q) => !q.isExample).length;
  const answeredCount = Object.keys(userAnswers).filter(
    (id) => !questions.find((q) => q.id === id)?.isExample
  ).length;
  const correctCount = Object.entries(userAnswers).filter(([id, ans]) => {
    const q = questions.find((item) => item.id === id);
    return q && !q.isExample && q.correctAnswer === ans;
  }).length;

  const isCurrentActivePlaying =
    (playbackMode === "file" && isPlayingAudio) || (playbackMode === "tts" && ttsState.isPlaying);

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDropFile}
      className="space-y-6 pb-24"
    >
      {/* Hidden Native Audio Element */}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoadedMetadata}
          onEnded={() => setIsPlayingAudio(false)}
        />
      )}

      {/* PRIMARY SECTION TABS: EXAM VS 87 NOTES */}
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-200/90 rounded-2xl w-fit shadow-xs">
        <button
          onClick={() => setMainListeningTab("exam")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            mainListeningTab === "exam"
              ? "bg-white text-indigo-950 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Headphones size={16} className={mainListeningTab === "exam" ? "text-indigo-600" : "text-slate-400"} />
          <span>Đề Thi Nghe N4 ({questions.length} câu)</span>
        </button>
        <button
          onClick={() => setMainListeningTab("notes")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all cursor-pointer ${
            mainListeningTab === "notes"
              ? "bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Flame size={16} className={mainListeningTab === "notes" ? "fill-slate-950 text-slate-950" : "text-amber-500"} />
          <span>87 Lưu Ý Vàng & Phòng Luyện Voice</span>
        </button>
      </div>

      {mainListeningTab === "notes" ? (
        <ListeningNotesSection
          selectedAiVoice={selectedAiVoice}
          setSelectedAiVoice={setSelectedAiVoice}
          playbackSpeed={playbackRate}
          setPlaybackSpeed={setPlaybackRate}
          voiceEngine={voiceEngine}
          setVoiceEngine={setVoiceEngine}
          browserVoices={voices}
          selectedBrowserVoiceIndex={selectedBrowserVoiceIndex}
          setSelectedBrowserVoiceIndex={setSelectedBrowserVoiceIndex}
        />
      ) : (
        <>
          {/* Hero Header Banner */}
          <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-indigo-900/40">
            <div className="absolute right-0 top-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Preset Quick Switcher */}
                  <div className="flex items-center gap-1 p-1 bg-black/40 rounded-2xl border border-white/10 w-fit text-xs font-bold">
                    <button
                      onClick={() => handleSelectExamPreset("jlpt2021")}
                      className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                        examTitle.includes("2021") && !isCustomExam
                          ? "bg-indigo-600 text-white shadow-xs"
                          : "text-indigo-200 hover:text-white"
                      }`}
                    >
                      <Headphones size={13} />
                      <span>Đề 2021 Chuẩn (32 câu)</span>
                    </button>
                    <button
                      onClick={() => handleSelectExamPreset("cda")}
                      className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                        examTitle.includes("CD A")
                          ? "bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black shadow-xs"
                          : "text-amber-200 hover:text-white"
                      }`}
                    >
                      <Sparkles size={13} className={examTitle.includes("CD A") ? "text-slate-950" : "text-amber-400"} />
                      <span>実力アップ! CD A (40 câu)</span>
                    </button>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white border border-white/10 backdrop-blur-xs">
                    {examTitle}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-indigo-200">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-emerald-400" />
                    Đúng: <strong className="text-white">{correctCount}/{answeredCount}</strong>
                  </span>
                  <span>•</span>
                  <span>Tiến độ: <strong className="text-white">{answeredCount}/{totalQuestions} câu</strong></span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
                Luyện Nghe JLPT N4 Kèm Script & Đối Chiếu Dịch
              </h2>
              <p className="text-sm text-indigo-100/90 max-w-2xl leading-relaxed">
                Luyện nghe đề thi JLPT N4 với kịch bản thoại chi tiết, dịch nghĩa tiếng Việt từng câu.
                Hỗ trợ cả <strong>Giọng đọc AI tự động từng câu</strong> và <strong>File âm thanh gốc .mp3</strong> đồng bộ mốc thời gian.
              </p>

              {/* Dual Playback Selector & Action Controls Bar */}
              <div className="mt-5 p-3.5 sm:p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      playbackMode === "tts"
                        ? "bg-purple-500/30 text-purple-300 border border-purple-400/30"
                        : "bg-emerald-500/30 text-emerald-300 border border-emerald-400/30"
                    }`}
                  >
                    {playbackMode === "tts" ? <Bot size={20} /> : <FileAudio size={20} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-1 bg-black/30 p-1 rounded-xl border border-white/10 w-fit">
                      <button
                        onClick={() => {
                          setPlaybackMode("tts");
                          if (audioRef.current) {
                            audioRef.current.pause();
                            setIsPlayingAudio(false);
                          }
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          playbackMode === "tts"
                            ? "bg-purple-600 text-white shadow-xs"
                            : "text-slate-300 hover:text-white"
                        }`}
                      >
                        <Bot size={13} />
                        <span>Giọng Đọc AI</span>
                      </button>
                      <button
                        onClick={() => setPlaybackMode("file")}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          playbackMode === "file"
                            ? "bg-emerald-600 text-white shadow-xs"
                            : "text-slate-300 hover:text-white"
                        }`}
                      >
                        <FileAudio size={13} />
                        <span>File MP3 Gốc</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-indigo-200 mt-1">
                      {playbackMode === "tts"
                        ? "Nghe từng câu bằng AI Studio (TTS) • Bấm 'Giữ Giọng Gốc' để nạp file MP3 phát thanh viên thật"
                        : audioFileName
                        ? `🟢 Đang phát Giọng đọc gốc: ${audioFileName} (${audioStorageStatus === "server" ? "Lưu Server" : "Lưu Trình duyệt"})`
                        : "Chưa gắn file MP3 gốc (bấm 'Giữ Giọng Gốc' để nạp)"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap shrink-0">
                  {/* Keep Original Voice / Audio Storage Manager */}
                  <button
                    onClick={() => setShowAudioStorageModal(true)}
                    className="px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer transition-all shadow-sm bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 border border-emerald-300/60"
                    title="Quản lý & Lưu giữ file giọng đọc gốc MP3 trên Server và Trình duyệt"
                  >
                    <FileAudio size={14} className="text-slate-950 stroke-[2.5]" />
                    <span>Giữ Giọng Gốc</span>
                    {audioUrl && <span className="w-2 h-2 rounded-full bg-emerald-950 animate-pulse" />}
                  </button>

                  {/* Full Script Modal Button */}
                  <button
                    onClick={() => {
                      setFullScriptModalMondai(selectedMondai);
                      setShowFullScriptModal(true);
                    }}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-sm bg-indigo-500 hover:bg-indigo-400 text-white border border-indigo-400/40"
                    title="Mở toàn bộ kịch bản lời thoại của bài thi để đọc và đối chiếu"
                  >
                    <FileText size={14} />
                    <span>Xem Full Script</span>
                  </button>

                  {/* Dedicated MP3 Upload & Automatic AI Speech-to-Text Button */}
                  <button
                    onClick={() => audioFileInputRef.current?.click()}
                    className="px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer transition-all shadow-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 border border-emerald-400/50"
                    title="Tải lên file MP3 - Hệ thống tự động quét phân tích sóng âm & Speech-to-Text để bạn đọc kịch bản ngay"
                  >
                    <Upload size={14} className="text-slate-950 stroke-[2.5]" />
                    <span>Tải File MP3</span>
                  </button>

                  {/* 87 Notes Switcher Button */}
                  <button
                    onClick={() => setMainListeningTab("notes")}
                    className="px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer transition-all shadow-sm bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950"
                    title="Xem 87 lưu ý khi thi nghe & phòng luyện Voice"
                  >
                    <Flame size={14} className="fill-slate-950 text-slate-950" />
                    <span>87 Lưu Ý Thi Nghe</span>
                  </button>

                  {/* Cloud Sync Button */}
                  <button
                    onClick={() => setShowFirestoreModal(true)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-sm bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40"
                    title="Đẩy toàn bộ data phần nghe lên Firebase & xem trạng thái Cronjob tự động"
                  >
                    <Cloud size={14} className="text-amber-300" />
                    <span>Sync Firebase & Cron</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </button>

                  {/* File & Script Management Dropdown Menu */}
                  <div className="relative" ref={fileMenuRef}>
                    <button
                      onClick={() => setShowFileMenu(!showFileMenu)}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-sm bg-white/10 hover:bg-white/20 text-white border border-white/15"
                      title="Tải audio, nạp script, AI tạo script, khôi phục đề"
                    >
                      <Sliders size={14} />
                      <span>Quản lý & Đổi Đề</span>
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 ${showFileMenu ? "rotate-180" : ""}`}
                      />
                    </button>

                    {showFileMenu && (
                      <div className="absolute right-0 top-full mt-2 w-72 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-2 z-50 text-xs text-white animate-in fade-in zoom-in-95 duration-150 space-y-1">
                        {/* Preset options */}
                        <div className="p-1 pb-1.5 border-b border-slate-800 space-y-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">
                            Chọn bộ đề nghe:
                          </span>
                          <button
                            onClick={() => {
                              handleSelectExamPreset("cda");
                              setShowFileMenu(false);
                            }}
                            className="w-full px-3 py-2 rounded-xl flex items-center gap-2 hover:bg-slate-800 cursor-pointer text-amber-300 hover:text-amber-200 transition-colors text-left font-bold"
                          >
                            <Sparkles size={14} className="text-yellow-400" />
                            <span>実力アップ! CD A (40 câu)</span>
                          </button>
                          <button
                            onClick={() => {
                              handleSelectExamPreset("jlpt2021");
                              setShowFileMenu(false);
                            }}
                            className="w-full px-3 py-2 rounded-xl flex items-center gap-2 hover:bg-slate-800 cursor-pointer text-indigo-300 hover:text-indigo-200 transition-colors text-left font-bold"
                          >
                            <Headphones size={14} className="text-indigo-400" />
                            <span>JLPT N4 07/2021 (32 câu)</span>
                          </button>
                        </div>

                        {/* Firebase Sync */}
                        <button
                          onClick={() => {
                            setShowFirestoreModal(true);
                            setShowFileMenu(false);
                          }}
                          className="w-full px-3 py-2 rounded-xl flex items-center gap-2 hover:bg-slate-800 cursor-pointer text-amber-300 hover:text-amber-200 transition-colors text-left font-bold"
                        >
                          <Cloud size={14} className="text-amber-400" />
                          <span>Đẩy data phần nghe lên Firebase</span>
                        </button>

                        <button
                          onClick={() => {
                            audioFileInputRef.current?.click();
                            setShowFileMenu(false);
                          }}
                          className="w-full px-3 py-2 rounded-xl flex items-center gap-2 hover:bg-slate-800 cursor-pointer text-slate-200 hover:text-white transition-colors text-left"
                          title="Tải file âm thanh MP3 từ máy tính (Tự động quét & Speech-to-Text)"
                        >
                          <Upload size={14} className="text-emerald-400" />
                          <div>
                            <p className="font-bold">{audioFileName ? "Đổi file MP3 khác" : "Tải lên file MP3"}</p>
                            <p className="text-[10px] text-slate-400">Tự động quét & Speech-to-Text</p>
                          </div>
                        </button>

                        {audioFileName && (
                          <button
                            onClick={() => {
                              setShowFileMenu(false);
                              handleRunAiAudioTranscribe();
                            }}
                            className="w-full px-3 py-2 rounded-xl flex items-center gap-2 hover:bg-purple-900/40 cursor-pointer text-purple-200 hover:text-purple-100 transition-colors text-left font-bold"
                            title="Chạy lại phân tích và Speech-to-Text file MP3 hiện tại"
                          >
                            <Sparkles size={14} className="text-yellow-400" />
                            <span>Quét lại file MP3 bằng AI</span>
                          </button>
                        )}

                        <button
                          onClick={() => {
                            scriptFileInputRef.current?.click();
                            setShowFileMenu(false);
                          }}
                          className="w-full px-3 py-2 rounded-xl flex items-center gap-2 hover:bg-slate-800 cursor-pointer text-slate-200 hover:text-white transition-colors text-left"
                          title="Nạp file kịch bản (.json, .txt, .srt)"
                        >
                          <FileUp size={14} className="text-cyan-400" />
                          <span>Nạp file Script (.txt, .srt, .json)</span>
                        </button>

                        <button
                          onClick={() => {
                            setShowFileMenu(false);
                            setShowPasteScriptModal(true);
                          }}
                          className="w-full px-3 py-2 rounded-xl flex items-center gap-2 hover:bg-slate-800 cursor-pointer text-slate-200 hover:text-white transition-colors text-left"
                          title="Dán văn bản kịch bản thủ công"
                        >
                          <Edit3 size={14} className="text-amber-400" />
                          <span>Dán văn bản Script</span>
                        </button>

                        {isCustomExam && (
                          <div className="pt-1 border-t border-slate-800">
                            <button
                              onClick={() => {
                                setShowFileMenu(false);
                                handleResetToDefaultExam();
                              }}
                              className="w-full px-3 py-2 rounded-xl flex items-center gap-2 hover:bg-rose-950/40 text-rose-300 hover:text-rose-200 transition-colors text-left font-bold"
                              title="Khôi phục lại bộ Script đề thi gốc JLPT N4 07/2021"
                            >
                              <RefreshCw size={14} className="text-rose-400" />
                              <span>Khôi phục đề gốc 2021</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Hidden file inputs */}
              <input
                ref={audioFileInputRef}
                type="file"
                accept="audio/*,.mp3,.m4a,.wav,.aac,.ogg"
                onChange={handleFileUpload}
                className="hidden"
              />
              <input
                ref={scriptFileInputRef}
                type="file"
                accept=".json,.txt,.srt,.vtt,text/*"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) processIncomingFile(f);
                  e.target.value = "";
                }}
                className="hidden"
              />

              {/* Active Exam Notice */}
              <div className="mt-3 px-3 py-2 rounded-xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-indigo-100">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-white/90">
                    📚 Đang dùng: <strong className="text-yellow-300">{examTitle}</strong> ({questions.length} câu hỏi{examSections.length > 0 ? `, ${examSections.length} phần mở đầu` : ""})
                  </span>
                </div>

                {audioFileName && !isCustomExam && !audioFileName.includes("2021") && (
                  <div className="flex items-center gap-2 text-amber-300 bg-amber-500/20 px-2.5 py-1 rounded-lg border border-amber-400/30 text-[11px]">
                    <AlertCircle size={13} className="shrink-0 text-amber-300" />
                    <span>File mới đã nạp nhưng script vẫn là đề cũ 2021.</span>
                    <button
                      onClick={() => setShowUpdateScriptPrompt(true)}
                      className="underline font-bold hover:text-white cursor-pointer"
                    >
                      Cập nhật Script ngay
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Floating / Sticky Universal Player Controls */}
          <div className="sticky top-16 z-20 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-lg p-3.5 sm:p-4 transition-all">
            <div className="flex flex-col gap-2.5">
              {/* Active Question Banner inside Player */}
              <div className="flex items-center justify-between gap-3 text-xs pb-1.5 border-b border-slate-100">
                <div className="flex items-center gap-2 text-indigo-950 font-bold truncate">
                  <Radio
                    size={14}
                    className={isCurrentActivePlaying ? "text-indigo-600 animate-pulse" : "text-slate-400"}
                  />
                  <span className="text-slate-400 font-medium">Đang chọn:</span>
                  <span className="truncate">
                    {currentActiveQuestion.mondaiTitle} • {currentActiveQuestion.questionNumber}: {currentActiveQuestion.title}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                    Mốc: {currentActiveQuestion.timestampDisplay}
                  </span>
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                      playbackMode === "file" && audioUrl
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {playbackMode === "file" && audioUrl ? "File MP3" : "Giọng đọc AI"}
                  </span>
                </div>
              </div>

              {/* Timeline and Scrubber */}
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-mono font-bold text-slate-600 min-w-[38px]">
                  {formatTime(currentTime)}
                </span>
                <div className="relative flex-1 group">
                  <input
                    type="range"
                    min="0"
                    max={duration}
                    step="1"
                    value={currentTime}
                    onChange={(e) => seekTo(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-hidden"
                  />
                </div>
                <span className="text-xs font-mono text-slate-400 min-w-[38px] text-right">
                  {formatTime(duration)}
                </span>
              </div>

              {/* Unified Controls Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100 text-xs">
                {/* Playback action group */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    onClick={() => seekTo(currentTime - 5)}
                    className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
                    title="Lùi lại 5 giây"
                  >
                    <Rewind size={16} />
                  </button>

                  <button
                    onClick={togglePlay}
                    className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ${
                      isCurrentActivePlaying
                        ? "bg-amber-500 hover:bg-amber-600 text-white"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white"
                    }`}
                  >
                    {isCurrentActivePlaying ? (
                      <>
                        <Pause size={15} />
                        <span>Tạm dừng</span>
                      </>
                    ) : (
                      <>
                        <Play size={15} fill="currentColor" />
                        <span>{playbackMode === "tts" ? "Phát AI" : "Phát MP3"}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => seekTo(currentTime + 5)}
                    className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
                    title="Tua tới 5 giây"
                  >
                    <FastForward size={16} />
                  </button>

                  {/* Loop Active Question (Shadowing Loop) */}
                  <button
                    onClick={() => setLoopActiveQuestion(!loopActiveQuestion)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                      loopActiveQuestion
                        ? "bg-purple-100 text-purple-800 border border-purple-300 font-bold"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                    }`}
                    title="Lặp lại câu/đoạn hội thoại đang nghe để luyện nhại (Shadowing)"
                  >
                    <Repeat size={13} />
                    <span className="hidden sm:inline">Lặp đoạn</span>
                  </button>

                  {/* Multi-Voice Selector for TTS */}
                  <div className="flex items-center gap-1 bg-purple-50 p-1 rounded-xl border border-purple-200">
                    <span className="font-bold text-purple-900 pl-1 text-[11px] hidden sm:inline">Giọng:</span>
                    <select
                      value={voiceEngine === "ai" ? selectedAiVoice : "browser"}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === "browser") {
                          setVoiceEngine("browser");
                        } else {
                          setVoiceEngine("ai");
                          setSelectedAiVoice(val);
                        }
                      }}
                      className="bg-white px-2 py-0.5 rounded-lg border border-purple-200 text-xs font-extrabold text-purple-950 focus:outline-hidden cursor-pointer"
                      title="Chọn Persona giọng đọc tiếng Nhật"
                    >
                      <optgroup label="✨ Gemini AI Natural Voices">
                        <option value="Kore">🌸 Kore (Nữ)</option>
                        <option value="Puck">👦 Puck (Nam)</option>
                        <option value="Charon">🎙 Charon (Trầm)</option>
                        <option value="Fenrir">📻 Fenrir (Phát thanh)</option>
                        <option value="Zephyr">👩 Zephyr (Nữ PT)</option>
                      </optgroup>
                      <optgroup label="🌐 Giọng Trình Duyệt">
                        <option value="browser">🌐 Web Speech</option>
                      </optgroup>
                    </select>

                    <button
                      onClick={() => speakUtterance("日本語の聴解練習を始めましょう！", "female")}
                      className="px-1.5 py-0.5 rounded-lg text-[11px] font-bold text-purple-700 hover:bg-purple-100 flex items-center gap-1 transition-colors cursor-pointer"
                      title="Nghe thử giọng vừa chọn"
                    >
                      <Volume1 size={13} />
                    </button>
                  </div>
                </div>

                {/* Speed & Audio controls */}
                <div className="flex items-center gap-2">
                  {/* Speed switcher */}
                  <div className="flex items-center bg-slate-100 rounded-xl p-0.5">
                    {[0.8, 1.0, 1.2].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => changeSpeed(rate)}
                        className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                          playbackRate === rate
                            ? "bg-white text-indigo-700 shadow-2xs"
                            : "text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>

                  {/* Mute button for native audio */}
                  {audioUrl && (
                    <button
                      onClick={() => {
                        if (audioRef.current) {
                          audioRef.current.muted = !isMuted;
                          setIsMuted(!isMuted);
                        }
                      }}
                      className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                    >
                      {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Global Toolbar: Filters, Search & View Toggles */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Mondai Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <button
                onClick={() => setSelectedMondai("all")}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedMondai === "all"
                    ? "bg-indigo-600 text-white shadow-2xs"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                Tất cả ({questions.length + examSections.length})
              </button>
              {examSections.length > 0 && (
                <button
                  onClick={() => setSelectedMondai("intro")}
                  className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1 ${
                    selectedMondai === "intro"
                      ? "bg-amber-600 text-white shadow-2xs"
                      : "bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200"
                  }`}
                >
                  <span>🎙 Mở đầu & Lời dẫn ({examSections.length})</span>
                </button>
              )}
              {[1, 2, 3, 4].map((mNum) => {
                const count = questions.filter((q) => q.mondai === mNum).length;
                if (count === 0 && isCustomExam) return null;
                return (
                  <button
                    key={mNum}
                    onClick={() => setSelectedMondai(mNum as 1 | 2 | 3 | 4)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                      selectedMondai === mNum
                        ? "bg-indigo-600 text-white shadow-2xs"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    Mondai {mNum} ({count} câu)
                  </button>
                );
              })}
            </div>

            {/* View Switches & Search */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Quick Search */}
              <div className="relative">
                <Search size={14} className="absolute left-3 top-2.5 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Tìm từ khóa, tình huống..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-400 w-44"
                />
              </div>

              {/* Toggle All Scripts */}
              <button
                onClick={() => setShowAllScripts(!showAllScripts)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  showAllScripts
                    ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
                title="Bật/Tắt chế độ xem kịch bản lời thoại trên từng thẻ câu hỏi"
              >
                {showAllScripts ? <Eye size={14} /> : <EyeOff size={14} />}
                <span>{showAllScripts ? "Hiện Script thẻ" : "Ẩn Script thẻ"}</span>
              </button>

              {/* Toggle Vietnamese translation */}
              <button
                onClick={() => setShowVietnamese(!showVietnamese)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  showVietnamese
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
                title="Bật/Tắt bản dịch tiếng Việt chi tiết"
              >
                <Languages size={14} />
                <span>{showVietnamese ? "Hiện dịch TV" : "Tắt dịch TV"}</span>
              </button>

              {/* Reset answers */}
              {answeredCount > 0 && (
                <button
                  onClick={() => setUserAnswers({})}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors flex items-center gap-1 cursor-pointer"
                  title="Làm lại tất cả câu hỏi"
                >
                  <ListRestart size={14} />
                  <span>Làm lại ({answeredCount})</span>
                </button>
              )}
            </div>
          </div>

      {/* Main List of Questions with Interactive Scripts & Practice Cards */}
      <div className="space-y-6">
        {/* ACTION BANNER WHEN NEW AUDIO FILE IS LOADED WITHOUT UPDATED SCRIPT */}
        {audioFileName && !isCustomExam && !audioFileName.includes("2021") && (
          <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border-2 border-dashed border-amber-400 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm animate-fade-in">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-amber-950 font-black flex items-center justify-center shrink-0 shadow-sm">
                <AlertCircle size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-extrabold text-amber-950">
                    Bạn vừa nạp file âm thanh: "{audioFileName}"
                  </h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900 border border-amber-300">
                    Script hiện tại vẫn là đề cũ
                  </span>
                </div>
                <p className="text-xs text-amber-900 mt-1">
                  Hãy bấm cập nhật để AI trích xuất toàn bộ kịch bản từ 00:00 hoặc nạp file script tương ứng với file nghe này:
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap shrink-0">
              <button
                onClick={() => handleRunAiAudioTranscribe()}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                title="Dùng Gemini AI trích xuất toàn bộ kịch bản và câu hỏi"
              >
                <Sparkles size={14} className="text-yellow-300" />
                <span>✨ AI Tạo Script</span>
              </button>
              <button
                onClick={() => scriptFileInputRef.current?.click()}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-cyan-700 hover:bg-cyan-600 text-white flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                title="Tải lên file script (.txt, .json, .srt, .vtt)"
              >
                <FileUp size={14} />
                <span>📂 Nạp file Script</span>
              </button>
              <button
                onClick={() => setShowPasteScriptModal(true)}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                title="Dán văn bản kịch bản"
              >
                <Edit3 size={14} />
                <span>✏️ Dán Script</span>
              </button>
            </div>
          </div>
        )}

        {/* SECTION: LỜI MỞ ĐẦU & LỜI DẪN CÁC MONDAI */}
        {(selectedMondai === "all" || selectedMondai === "intro") && examSections.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 px-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                  Phần Mở Đầu & Hướng Dẫn Kỳ Thi (Lời Dẫn Băng Thu Âm)
                </h3>
              </div>
              <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                {examSections.length} phần hướng dẫn (Từ 00:00)
              </span>
            </div>

            {examSections.map((sec) => {
              const isSectionActive =
                (playbackMode === "file" && currentTime >= sec.timeStart && currentTime <= sec.timeEnd) ||
                (playbackMode === "tts" && ttsState.questionId === sec.id);

              const isSectionPlaying =
                (playbackMode === "file" && isPlayingAudio && currentTime >= sec.timeStart && currentTime <= sec.timeEnd) ||
                (playbackMode === "tts" && ttsState.isPlaying && ttsState.questionId === sec.id);

              const isSectionScriptVisible = showAllScripts || revealedScriptIds[sec.id];

              return (
                <div
                  key={sec.id}
                  id={`sec-${sec.id}`}
                  className={`bg-white rounded-3xl border transition-all duration-200 overflow-hidden shadow-xs ${
                    isSectionActive
                      ? "border-amber-500 ring-2 ring-amber-500/20 shadow-md bg-amber-50/10"
                      : "border-amber-200/90 hover:border-amber-300"
                  }`}
                >
                  {/* Section Top Header */}
                  <div className="p-4 sm:p-5 border-b border-amber-100 bg-gradient-to-r from-amber-50/60 to-orange-50/30 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="px-3 py-1 rounded-xl text-xs font-black bg-amber-600 text-white shadow-2xs">
                        {sec.type === "exam_intro" ? "🎙 Mở đầu đề thi" : `📖 Lời dẫn Mondai ${sec.mondai}`}
                      </span>
                      <span className="text-xs font-bold text-amber-900 font-mono">
                        {sec.titleJapanese}
                      </span>
                      <span className="text-slate-300 hidden sm:inline">•</span>
                      <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                        {sec.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Jump to audio timestamp */}
                      <button
                        onClick={() => jumpToSection(sec)}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300/80 flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Tua đến đoạn audio này"
                      >
                        <Clock size={13} className="text-amber-700" />
                        <span>Mốc {sec.timestampDisplay}</span>
                      </button>

                      {/* Play via TTS button */}
                      <button
                        onClick={() => {
                          if (isSectionPlaying) {
                            stopTts();
                          } else {
                            playSectionDialogueTts(sec);
                          }
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
                          isSectionPlaying
                            ? "bg-rose-500 hover:bg-rose-600 text-white"
                            : "bg-amber-600 hover:bg-amber-700 text-white"
                        }`}
                        title="Đọc toàn bộ lời dẫn này bằng giọng nói AI"
                      >
                        {isSectionPlaying ? <Pause size={13} /> : <Play size={13} />}
                        <span>{isSectionPlaying ? "Dừng đọc" : "Đọc giọng AI"}</span>
                      </button>

                      {/* Toggle script visibility */}
                      <button
                        onClick={() => toggleRevealScript(sec.id)}
                        className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-amber-100/60 transition-colors cursor-pointer"
                        title="Hiện/Ẩn kịch bản thoại"
                      >
                        {isSectionScriptVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Section Description */}
                  <div className="px-5 py-3 bg-amber-50/40 text-xs text-amber-950 flex items-start gap-2 border-b border-amber-100/60">
                    <Info size={15} className="text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">{sec.description}</p>
                      {showVietnamese && (
                        <p className="text-slate-600 mt-0.5 italic">{sec.descriptionVietnamese}</p>
                      )}
                    </div>
                  </div>

                  {/* Dialogue script lines */}
                  {isSectionScriptVisible && (
                    <div className="p-4 sm:p-5 bg-white space-y-2.5">
                      <div className="flex items-center justify-between pb-1">
                        <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                          Kịch bản lời thoại từ đầu băng:
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500">
                          {sec.script.length} câu thoại
                        </span>
                      </div>

                      <div className="space-y-2">
                        {sec.script.map((line, lIdx) => {
                          const isLineSpeaking =
                            ttsState.questionId === sec.id && ttsState.lineIndex === lIdx;

                          return (
                            <div
                              key={lIdx}
                              className={`p-3 rounded-2xl border transition-all ${
                                isLineSpeaking
                                  ? "bg-amber-50/80 border-amber-300 ring-2 ring-amber-400/30"
                                  : "bg-slate-50/60 hover:bg-slate-50 border-slate-200/80"
                              }`}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-2.5">
                                  <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 shrink-0 mt-0.5">
                                    {line.speaker}
                                  </span>
                                  <div>
                                    <p className="text-sm font-semibold text-slate-900 leading-relaxed font-sans">
                                      {line.text}
                                    </p>
                                    {showVietnamese && (
                                      <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">
                                        👉 {line.vietnamese}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <button
                                  onClick={() =>
                                    playSingleLineTts(sec.id, lIdx, line.text, line.speakerType)
                                  }
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-amber-700 hover:bg-amber-100/60 transition-colors shrink-0 cursor-pointer"
                                  title="Nghe riêng câu này"
                                >
                                  <Volume2 size={15} />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* CÁC CÂU HỎI MONDAI ĐỀ THI (32 CÂU) */}
        {selectedMondai !== "intro" && filteredQuestions.map((q) => {
          const isCurrentQuestionActive =
            (playbackMode === "file" && currentTime >= q.timeStart && currentTime <= q.timeEnd) ||
            (playbackMode === "tts" && ttsState.questionId === q.id);

          const isCurrentQuestionPlaying =
            (playbackMode === "file" && isPlayingAudio && currentTime >= q.timeStart && currentTime <= q.timeEnd) ||
            (playbackMode === "tts" && ttsState.isPlaying && ttsState.questionId === q.id);

          const isScriptVisible = showAllScripts || revealedScriptIds[q.id];
          const selectedAns = userAnswers[q.id];
          const hasAnswered = selectedAns !== undefined;
          const isCorrect = selectedAns === q.correctAnswer;

          return (
            <div
              key={q.id}
              id={`q-${q.id}`}
              className={`bg-white rounded-3xl border transition-all duration-200 overflow-hidden shadow-xs ${
                isCurrentQuestionActive
                  ? "border-indigo-500 ring-2 ring-indigo-500/20 shadow-md"
                  : "border-slate-200/90 hover:border-slate-300"
              }`}
            >
              {/* Question Header Card */}
              <div className="p-5 sm:p-6 bg-slate-50/70 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center gap-3">
                  {/* Question Number Badge */}
                  <span
                    className={`px-3 py-1.5 rounded-xl font-extrabold text-xs shrink-0 ${
                      q.isExample
                        ? "bg-amber-100 text-amber-900 border border-amber-200"
                        : "bg-indigo-600 text-white shadow-2xs"
                    }`}
                  >
                    {q.isExample ? "Ví dụ mẫu" : `Câu ${q.questionNumber}`}
                  </span>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {q.mondaiTitle}
                      </span>
                      <span className="text-xs text-slate-300">•</span>
                      <h3 className="text-base font-extrabold text-slate-900">
                        {q.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {q.situationVietnamese}
                    </p>
                  </div>
                </div>

                {/* Question Audio Controls (Both AI Voice and MP3 Seek) */}
                <div className="flex items-center gap-2 shrink-0 flex-wrap">
                  {/* Direct AI Dialogue Reader */}
                  <button
                    onClick={() => {
                      if (ttsState.isPlaying && ttsState.questionId === q.id) {
                        stopTts();
                      } else {
                        playQuestionDialogueTts(q, 0);
                      }
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
                      ttsState.isPlaying && ttsState.questionId === q.id
                        ? "bg-purple-600 text-white animate-pulse"
                        : "bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200"
                    }`}
                    title="Đọc toàn bộ hội thoại câu này bằng giọng đọc AI"
                  >
                    {ttsState.isPlaying && ttsState.questionId === q.id ? (
                      <Pause size={13} />
                    ) : (
                      <Bot size={13} />
                    )}
                    <span>
                      {ttsState.isPlaying && ttsState.questionId === q.id
                        ? "Dừng đọc"
                        : "Phát giọng AI"}
                    </span>
                  </button>

                  {/* Jump to time button */}
                  <button
                    onClick={() => jumpToQuestion(q)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
                      isCurrentQuestionPlaying
                        ? "bg-amber-500 hover:bg-amber-600 text-white"
                        : "bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200"
                    }`}
                    title={
                      playbackMode === "file" && audioUrl
                        ? `Nghe từ phút ${q.timestampDisplay}`
                        : "Nghe câu này"
                    }
                  >
                    {isCurrentQuestionPlaying ? (
                      <Pause size={13} />
                    ) : (
                      <Play size={13} fill="currentColor" />
                    )}
                    <span>{q.timestampDisplay}</span>
                  </button>

                  {/* Script visibility toggle */}
                  <button
                    onClick={() => toggleRevealScript(q.id)}
                    className="px-3 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    {isScriptVisible ? <EyeOff size={13} /> : <Eye size={13} />}
                    <span>{isScriptVisible ? "Ẩn kịch bản" : "Xem Script"}</span>
                  </button>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-5 sm:p-6 space-y-6">
                {/* Situation & Question Prompt */}
                <div className="bg-indigo-50/50 rounded-2xl p-4 border border-indigo-100/80">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold">
                      <Info size={14} />
                      <span>Tình huống & Câu hỏi:</span>
                    </div>
                    {/* Read situation aloud */}
                    <button
                      onClick={() => speakUtterance(q.situation, "announcer")}
                      className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-semibold cursor-pointer"
                      title="Đọc to tình huống"
                    >
                      <Volume2 size={13} />
                      <span className="text-[11px]">Nghe đề</span>
                    </button>
                  </div>

                  <p className="text-sm font-bold text-slate-900 leading-relaxed">
                    {q.situation}
                  </p>
                  {showVietnamese && (
                    <p className="text-xs text-slate-600 mt-1 italic">
                      Dịch: {q.situationVietnamese}
                    </p>
                  )}
                  {q.questionText !== q.situation && (
                    <div className="mt-2.5 pt-2.5 border-t border-indigo-100 flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-extrabold text-indigo-950">
                          ❓ {q.questionText}
                        </p>
                        {showVietnamese && (
                          <p className="text-xs text-slate-600 italic mt-0.5">
                            ({q.questionVietnamese})
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => speakUtterance(q.questionText, "announcer")}
                        className="text-indigo-600 hover:text-indigo-800 p-1 shrink-0 cursor-pointer"
                        title="Nghe câu hỏi"
                      >
                        <Volume2 size={13} />
                      </button>
                    </div>
                  )}
                </div>

                {/* SCRIPT SECTION (Foldable / Visible) */}
                {isScriptVisible ? (
                  <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                        <BookOpen size={14} className="text-indigo-600" />
                        Kịch bản hội thoại (Dialogue Script)
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-400 hidden sm:inline">
                          Bấm loa để nghe từng câu
                        </span>
                        <button
                          onClick={() => playQuestionDialogueTts(q, 0)}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Play size={11} fill="currentColor" />
                          <span>Đọc cả bài</span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      {q.script.map((line, idx) => {
                        const isSpeakingThisLine =
                          ttsState.isPlaying &&
                          ttsState.questionId === q.id &&
                          ttsState.lineIndex === idx;

                        return (
                          <div
                            key={idx}
                            className={`p-3 rounded-xl transition-all flex items-start gap-3 ${
                              isSpeakingThisLine
                                ? "bg-amber-100/90 border border-amber-400 ring-2 ring-amber-300/40 shadow-xs"
                                : "bg-white border border-slate-100 hover:border-slate-200"
                            }`}
                          >
                            {/* Speaker Badge */}
                            <span
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 mt-0.5 ${
                                line.speakerType === "male"
                                  ? "bg-blue-100 text-blue-800"
                                  : line.speakerType === "female"
                                  ? "bg-rose-100 text-rose-800"
                                  : line.speakerType === "teacher"
                                  ? "bg-amber-100 text-amber-900"
                                  : "bg-slate-200 text-slate-800"
                              }`}
                            >
                              {line.speaker}
                            </span>

                            {/* Dialogue line text */}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-slate-900 leading-snug">
                                {line.text}
                              </p>
                              {showVietnamese && (
                                <p className="text-xs text-slate-500 mt-1">
                                  {line.vietnamese}
                                </p>
                              )}
                            </div>

                            {/* TTS Line Speaker */}
                            <button
                              onClick={() =>
                                playSingleLineTts(q.id, idx, line.text, line.speakerType)
                              }
                              className={`p-1.5 rounded-lg transition-colors shrink-0 cursor-pointer ${
                                isSpeakingThisLine
                                  ? "bg-amber-300 text-amber-950 font-bold"
                                  : "text-slate-400 hover:text-indigo-600 hover:bg-slate-100"
                              }`}
                              title="Nghe câu thoại này (Giọng đọc chuẩn)"
                            >
                              <Volume2 size={16} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 text-xs text-amber-900">
                      <HelpCircle size={16} className="text-amber-600 shrink-0" />
                      <span>
                        Kịch bản hội thoại đang được ẩn để bạn luyện phản xạ nghe như trong phòng thi.
                      </span>
                    </div>
                    <button
                      onClick={() => toggleRevealScript(q.id)}
                      className="px-3 py-1.5 rounded-xl bg-amber-200 hover:bg-amber-300 text-amber-950 font-bold text-xs shrink-0 transition-colors cursor-pointer"
                    >
                      Mở xem Script
                    </button>
                  </div>
                )}

                {/* Multiple Choice Options */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Chọn đáp án đúng (1 - {q.options.length}):
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      Bấm vào lựa chọn để chấm điểm ngay
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt) => {
                      const isChosen = selectedAns === opt.number;
                      const isRealCorrect = opt.number === q.correctAnswer;

                      let btnStyle = "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200";

                      if (hasAnswered) {
                        if (isRealCorrect) {
                          btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/20";
                        } else if (isChosen && !isCorrect) {
                          btnStyle = "bg-rose-50 border-rose-500 text-rose-950 line-through ring-2 ring-rose-500/20";
                        } else {
                          btnStyle = "bg-slate-50 opacity-60 text-slate-500 border-slate-200";
                        }
                      }

                      return (
                        <button
                          key={opt.number}
                          onClick={() => handleSelectAnswer(q.id, opt.number)}
                          className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                        >
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                              hasAnswered && isRealCorrect
                                ? "bg-emerald-600 text-white"
                                : hasAnswered && isChosen && !isCorrect
                                ? "bg-rose-600 text-white"
                                : "bg-slate-200 text-slate-700"
                            }`}
                          >
                            {opt.number}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm font-bold leading-snug">
                              {opt.text}
                            </p>
                            {showVietnamese && (
                              <p className="text-[11px] text-slate-500 mt-0.5">
                                {opt.vietnamese}
                              </p>
                            )}
                          </div>
                          {hasAnswered && isRealCorrect && (
                            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                          )}
                          {hasAnswered && isChosen && !isCorrect && (
                            <XCircle size={16} className="text-rose-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Explanation Card (shows once answered or in examples) */}
                {(hasAnswered || q.isExample) && (
                  <div
                    className={`rounded-2xl p-4 border transition-all ${
                      isCorrect || q.isExample
                        ? "bg-emerald-50/70 border-emerald-200 text-emerald-950"
                        : "bg-rose-50/70 border-rose-200 text-rose-950"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      {isCorrect || q.isExample ? (
                        <CheckCircle2 size={16} className="text-emerald-600" />
                      ) : (
                        <XCircle size={16} className="text-rose-600" />
                      )}
                      <span className="text-xs font-black uppercase tracking-wider">
                        {isCorrect || q.isExample
                          ? `Chính xác! Đáp án đúng: [ ${q.correctAnswer} ]`
                          : `Chưa đúng. Đáp án chính xác là: [ ${q.correctAnswer} ]`}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm leading-relaxed text-slate-700">
                      {q.explanation}
                    </p>

                    {/* Key vocabulary tags */}
                    {q.keyVocabulary && q.keyVocabulary.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-200/80 flex items-center gap-1.5 flex-wrap">
                        <span className="text-[11px] font-bold text-slate-500">
                          Từ khóa then chốt:
                        </span>
                        {q.keyVocabulary.map((kw, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-800 shadow-2xs"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      </>
      )}

      {/* FULL SCRIPT OVERLAY MODAL */}
      {showFullScriptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/30 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
                  <FileText size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                      Toàn Bộ Kịch Bản Thoại (Full Script Đề Thi)
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-amber-950 max-w-[280px] truncate">
                      {examTitle} ({questions.length} câu{examSections.length > 0 ? `, ${examSections.length} mở đầu` : ""})
                    </span>
                  </div>
                  <p className="text-xs text-indigo-200 mt-0.5">
                    Đầy đủ 100% lời thoại tiếng Nhật, phân vai người nói, dịch nghĩa tiếng Việt & đáp án.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Download text file */}
                <button
                  onClick={() => handleDownloadFullScript(fullScriptModalMondai)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
                  title="Tải toàn bộ script về máy (.txt)"
                >
                  <Download size={14} />
                  <span className="hidden sm:inline">Tải file .TXT</span>
                </button>

                {/* Copy full script */}
                <button
                  onClick={() => handleCopyFullScript(fullScriptModalMondai)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    copiedFullScript
                      ? "bg-emerald-500 text-white"
                      : "bg-indigo-500 hover:bg-indigo-400 text-white"
                  }`}
                  title="Sao chép kịch bản vào bộ nhớ tạm"
                >
                  {copiedFullScript ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedFullScript ? "Đã chép!" : "Copy"}</span>
                </button>

                {/* Close modal */}
                <button
                  onClick={() => setShowFullScriptModal(false)}
                  className="p-2 rounded-xl text-indigo-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer ml-1"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Filter Tabs */}
            <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-3 shrink-0 flex-wrap">
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
                <button
                  onClick={() => setFullScriptModalMondai("all")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    fullScriptModalMondai === "all"
                      ? "bg-indigo-600 text-white shadow-2xs"
                      : "bg-white hover:bg-slate-200 text-slate-700 border border-slate-200"
                  }`}
                >
                  Toàn bộ ({questions.length + examSections.length})
                </button>
                {examSections.length > 0 && (
                  <button
                    onClick={() => setFullScriptModalMondai("intro")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      fullScriptModalMondai === "intro"
                        ? "bg-amber-600 text-white shadow-2xs"
                        : "bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200"
                    }`}
                  >
                    🎙 Mở đầu & Lời dẫn ({examSections.length})
                  </button>
                )}
                {[1, 2, 3, 4].map((mNum) => {
                  const count = questions.filter((q) => q.mondai === mNum).length;
                  if (count === 0 && isCustomExam) return null;
                  return (
                    <button
                      key={mNum}
                      onClick={() => setFullScriptModalMondai(mNum as 1 | 2 | 3 | 4)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        fullScriptModalMondai === mNum
                          ? "bg-indigo-600 text-white shadow-2xs"
                          : "bg-white hover:bg-slate-200 text-slate-700 border border-slate-200"
                      }`}
                    >
                      Mondai {mNum} ({count} câu)
                    </button>
                  );
                })}
              </div>

              <div className="text-xs text-slate-500 font-medium">
                {fullScriptModalMondai === "intro" ? (
                  <strong className="text-amber-700">{examSections.length} phần mở đầu & hướng dẫn</strong>
                ) : fullScriptModalMondai === "all" ? (
                  <strong className="text-indigo-600">
                    {examSections.length > 0 ? `${examSections.length} phần mở đầu + ` : ""}
                    {questions.length} câu hỏi
                  </strong>
                ) : (
                  <strong className="text-indigo-600">
                    {questions.filter((q) => q.mondai === fullScriptModalMondai).length} câu
                  </strong>
                )}
              </div>
            </div>

            {/* Modal Body - Scrollable Script Content */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
              {/* RENDER INTRO SECTIONS IN MODAL */}
              {(fullScriptModalMondai === "all" || fullScriptModalMondai === "intro") && examSections.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-1 border-b border-amber-200">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <h4 className="text-xs font-black uppercase tracking-wider text-amber-900">
                      【PHẦN MỞ ĐẦU ĐỀ THI & LỜI DẪN CÁC MONDAI (TỪ 00:00)】
                    </h4>
                  </div>

                  {examSections.map((sec) => (
                    <div
                      key={`modal-intro-${sec.id}`}
                      className="p-5 rounded-2xl border border-amber-200 bg-amber-50/40 hover:bg-amber-50/70 transition-colors space-y-3"
                    >
                      {/* Intro Header */}
                      <div className="flex items-center justify-between gap-3 border-b border-amber-200/80 pb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-amber-600 text-white">
                            {sec.type === "exam_intro" ? "Mở đầu đề thi" : `Lời dẫn Mondai ${sec.mondai}`}
                          </span>
                          <span className="text-xs font-bold text-amber-800">
                            {sec.titleJapanese}
                          </span>
                          <span className="text-xs text-amber-300">•</span>
                          <span className="text-sm font-extrabold text-slate-900">
                            {sec.title}
                          </span>
                        </div>
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 shrink-0">
                          ⏱ {sec.timestampDisplay}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-700 leading-relaxed">
                        <strong className="text-amber-950">Nội dung hướng dẫn: </strong>
                        {sec.descriptionVietnamese}
                      </p>

                      {/* Script lines */}
                      <div className="space-y-1.5 pl-1">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          Lời thoại phát thanh (Script):
                        </span>
                        {sec.script.map((line, lIdx) => (
                          <div
                            key={lIdx}
                            className="flex items-start gap-2.5 text-xs bg-white p-2.5 rounded-xl border border-amber-200/60 shadow-2xs"
                          >
                            <span className="px-2 py-0.5 rounded-md font-bold text-[10px] bg-amber-100 text-amber-900 shrink-0 mt-0.5">
                              {line.speaker}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-slate-900 leading-relaxed">{line.text}</p>
                              <p className="text-slate-600 text-[11px] mt-0.5">👉 {line.vietnamese}</p>
                            </div>
                            <button
                              onClick={() =>
                                playSingleLineTts(sec.id, lIdx, line.text, line.speakerType)
                              }
                              className="p-1 text-slate-400 hover:text-amber-700 shrink-0 cursor-pointer"
                              title="Nghe câu này"
                            >
                              <Volume2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Action */}
                      <div className="pt-2 border-t border-amber-200/60 flex items-center justify-end text-xs">
                        <button
                          onClick={() => {
                            setShowFullScriptModal(false);
                            setSelectedMondai("intro");
                            jumpToSection(sec);
                          }}
                          className="text-amber-700 hover:text-amber-900 font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <span>Nhảy tới đoạn này trong bài</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* RENDER QUESTIONS IN MODAL */}
              {fullScriptModalMondai !== "intro" && (
                <div className="space-y-4">
                  {fullScriptModalMondai === "all" && (
                    <div className="flex items-center gap-2 pt-2 pb-1 border-b border-indigo-200">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                      <h4 className="text-xs font-black uppercase tracking-wider text-indigo-900">
                        【CÁC CÂU HỎI THI CHI TIẾT ({questions.length} CÂU HỎI & ĐÁP ÁN)】
                      </h4>
                    </div>
                  )}

                  {questions
                    .filter(
                      (q) => fullScriptModalMondai === "all" || q.mondai === fullScriptModalMondai
                    )
                    .map((q) => (
                      <div
                        key={`modal-q-${q.id}`}
                        className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors space-y-3"
                      >
                        {/* Header line */}
                        <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 pb-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-indigo-600 text-white">
                              {q.isExample ? "Ví dụ mẫu" : `Câu ${q.questionNumber}`}
                            </span>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                              {q.mondaiTitle}
                            </span>
                            <span className="text-xs text-slate-400">•</span>
                            <span className="text-sm font-extrabold text-slate-900">
                              {q.title}
                            </span>
                          </div>
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 shrink-0">
                            ⏱ {q.timestampDisplay}
                          </span>
                        </div>

                    {/* Situation */}
                    <div className="text-xs bg-indigo-50/80 p-2.5 rounded-xl border border-indigo-100">
                      <span className="font-bold text-indigo-900">Tình huống: </span>
                      <span className="text-slate-800 font-semibold">{q.situation}</span>
                      <span className="block text-slate-600 mt-0.5 italic">
                        Dịch TV: {q.situationVietnamese}
                      </span>
                    </div>

                    {/* Dialogue lines */}
                    <div className="space-y-1.5 pl-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Lời thoại (Script):
                      </span>
                      {q.script.map((line, lIdx) => (
                        <div
                          key={lIdx}
                          className="flex items-start gap-2.5 text-xs bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs"
                        >
                          <span
                            className={`px-2 py-0.5 rounded-md font-bold text-[11px] shrink-0 ${
                              line.speakerType === "male"
                                ? "bg-blue-100 text-blue-800"
                                : line.speakerType === "female"
                                ? "bg-rose-100 text-rose-800"
                                : line.speakerType === "teacher"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {line.speaker}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-slate-900 leading-snug">{line.text}</p>
                            <p className="text-slate-500 text-[11px] mt-0.5">{line.vietnamese}</p>
                          </div>
                          <button
                            onClick={() =>
                              playSingleLineTts(q.id, lIdx, line.text, line.speakerType)
                            }
                            className="p-1 text-slate-400 hover:text-indigo-600 shrink-0 cursor-pointer"
                            title="Nghe câu này"
                          >
                            <Volume2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Answer key & explanation */}
                    <div className="pt-2 border-t border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                          Đáp án đúng: [{q.correctAnswer}]
                        </span>
                        <span className="text-slate-600 font-medium">
                          {q.options.find((o) => o.number === q.correctAnswer)?.text}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setShowFullScriptModal(false);
                          setSelectedMondai(q.mondai);
                          jumpToQuestion(q);
                        }}
                        className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <span>Nhảy tới câu này trong bài</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between gap-3 text-xs shrink-0">
              <span className="text-slate-500">
                {isCustomExam
                  ? `Đang hiển thị kịch bản tùy chỉnh: ${examTitle} (${questions.length} câu hỏi).`
                  : "Toàn bộ kịch bản đã được khớp chính xác theo file đề thi thực tế JLPT N4 07/2021."}
              </span>
              <button
                onClick={() => setShowFullScriptModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Cập nhật kịch bản khi nạp file mới */}
      {showUpdateScriptPrompt && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                  <Sparkles size={22} className="text-yellow-300" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold">Cập Nhật Kịch Bản Cho File Mới</h3>
                  <p className="text-xs text-indigo-100/90">
                    {audioFileName ? `File đã nạp: "${audioFileName}"` : "Chọn phương thức cập nhật kịch bản"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowUpdateScriptPrompt(false)}
                className="p-1.5 rounded-xl text-indigo-100 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Bạn vừa nạp một file âm thanh mới. Hiện tại kịch bản hiển thị vẫn là đề cũ N4 2021.
                Hãy chọn một trong các phương án sau để cập nhật kịch bản tương ứng với file của bạn:
              </p>

              <div className="space-y-3">
                {/* Option 1: AI Transcribe */}
                <button
                  onClick={() => {
                    setShowUpdateScriptPrompt(false);
                    handleRunAiAudioTranscribe();
                  }}
                  className="w-full text-left p-4 rounded-2xl border-2 border-purple-200 hover:border-purple-500 bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100/80 hover:to-indigo-100/80 transition-all cursor-pointer flex items-start gap-3.5 group shadow-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Sparkles size={20} className="text-yellow-300 animate-pulse" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-extrabold text-slate-900">
                        ⚡ Trích xuất kịch bản bằng AI (Gemini Flash)
                      </h4>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-purple-600 text-white">
                        Khuyên dùng
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      AI sẽ tự động nghe file audio, bóc tách toàn bộ câu hỏi (Mondai 1-4), hội thoại tiếng Nhật kèm dịch nghĩa tiếng Việt.
                    </p>
                  </div>
                </button>

                {/* Option 2: Upload Companion Script file */}
                <button
                  onClick={() => {
                    setShowUpdateScriptPrompt(false);
                    scriptFileInputRef.current?.click();
                  }}
                  className="w-full text-left p-4 rounded-2xl border border-slate-200 hover:border-cyan-500 bg-white hover:bg-cyan-50/50 transition-all cursor-pointer flex items-start gap-3.5 group shadow-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <FileUp size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-extrabold text-slate-900">
                      📂 Nạp file Script kèm theo (.txt, .json, .srt, .vtt)
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Tải lên file phụ đề (.srt, .vtt), file kịch bản (.txt), hoặc file dữ liệu bài thi (.json) tương ứng với audio này.
                    </p>
                  </div>
                </button>

                {/* Option 3: Manual Paste */}
                <button
                  onClick={() => {
                    setShowUpdateScriptPrompt(false);
                    setShowPasteScriptModal(true);
                  }}
                  className="w-full text-left p-4 rounded-2xl border border-slate-200 hover:border-indigo-500 bg-white hover:bg-indigo-50/50 transition-all cursor-pointer flex items-start gap-3.5 group shadow-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Edit3 size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-extrabold text-slate-900">
                      ✏️ Nhập / Dán nội dung Script thủ công
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Sao chép và dán nhanh văn bản kịch bản thoại có sẵn để hệ thống tự động bóc tách.
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-500">Bạn cũng có thể cập nhật lại bất kỳ lúc nào trên thanh công cụ.</span>
              <button
                onClick={() => setShowUpdateScriptPrompt(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold transition-colors cursor-pointer"
              >
                Giữ đề mẫu N4 2021
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Dán / Soạn thảo kịch bản thủ công */}
      {showPasteScriptModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-slate-900 p-5 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center shrink-0">
                  <Edit3 size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold">Nhập / Dán Kịch Bản Bài Nghe</h3>
                  <p className="text-xs text-slate-400">
                    Hỗ trợ định dạng văn bản thô, ghi chú hội thoại, phụ đề hoặc JSON
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPasteScriptModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 flex-1 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
                <span className="font-bold text-slate-700">Dán nội dung kịch bản vào khung dưới:</span>
                <button
                  type="button"
                  onClick={() => {
                    setPasteScriptText(`【Mở đầu đề thi - Từ 00:00】
Phát thanh viên: これから N4の ちょうかいしけんを はじめます。
Phát thanh viên: メモをとってもいいです。問題用紙を開けてください。

【Mondai 1: Hướng dẫn】
Phát thanh viên: 問題１では、まず質問を聞いてください。それから話を聞いて、問題用紙の１から４の中から、いちばんいいものをひとつえらんでください。

1. 男の人と女の人が話しています。
男: 明日、図書館へ行きませんか。
女: ええ、行きましょう。何時にしますか。
男: 10時に駅の前で会いましょう。
女: わかりました。
質問: 二人は何時にどこで会いますか。
1. 9時に図書館
2. 10時に駅の前
3. 10時に図書館
4. 11時に駅の前
Đáp án: 2

2. 先生と学生が話しています。
先生: 宿題は金曜日までに出してください。
学生: 先生、メールで送ってもいいですか。
先生: はい、メールで送ってください。
質問: 学生はどうやって宿題を出しますか。
1. 直接手渡す
2. メールで送る
3. 郵送する
4. 出さない
Đáp án: 2`);
                  }}
                  className="text-indigo-600 hover:text-indigo-800 font-bold underline cursor-pointer"
                >
                  + Chèn mẫu ví dụ (Template)
                </button>
              </div>

              <textarea
                value={pasteScriptText}
                onChange={(e) => setPasteScriptText(e.target.value)}
                placeholder="Dán nội dung kịch bản thoại tiếng Nhật tại đây... (Ví dụ: Mondai 1 \n 1. Nam: ... Nữ: ...)"
                rows={12}
                className="w-full p-4 rounded-2xl border border-slate-300 font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none leading-relaxed resize-none bg-slate-50"
              />

              <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-[11px] text-indigo-900 flex items-start gap-2">
                <Info size={14} className="text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  Hệ thống hỗ trợ tự động bóc tách các câu hỏi theo <strong>Mondai 1, 2, 3, 4</strong>, các vai nói (<strong>Nam/Nữ</strong>) và 4 lựa chọn trả lời. Bạn cũng có thể dùng nút <strong>"AI Format & Dịch Nghĩa"</strong> để Gemini hoàn thiện bản dịch tiếng Việt cho bạn.
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0 flex-wrap">
              <button
                type="button"
                onClick={() => setShowPasteScriptModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={async () => {
                    if (!pasteScriptText.trim()) {
                      showToast("Vui lòng nhập hoặc dán nội dung kịch bản.", "error");
                      return;
                    }
                    setIsAiTranscribing(true);
                    setAiTranscribeStatus("AI đang phân tích kịch bản và dịch nghĩa song ngữ...");
                    try {
                      const res = await fetch("/api/ai/parse-script-text", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ text: pasteScriptText, title: "Kịch bản tùy chỉnh" }),
                      });
                      if (!res.ok) throw new Error("AI không thể phân tích văn bản này.");
                      const data = await res.json();
                      const parsed = parseJsonExam(JSON.stringify(data), "Kịch bản tùy chỉnh (AI)");
                      applyNewExamData(parsed, "Kịch bản tùy chỉnh (AI)");
                    } catch (err: any) {
                      showToast("Lỗi AI: " + err.message, "error");
                    } finally {
                      setIsAiTranscribing(false);
                      setAiTranscribeStatus("");
                    }
                  }}
                  className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles size={14} className="text-yellow-300" />
                  <span>AI Format & Dịch</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!pasteScriptText.trim()) {
                      showToast("Vui lòng nhập hoặc dán nội dung kịch bản.", "error");
                      return;
                    }
                    try {
                      let parsed: ParsedExamData;
                      if (pasteScriptText.trim().startsWith("{") || pasteScriptText.trim().startsWith("[")) {
                        parsed = parseJsonExam(pasteScriptText, "Kịch bản JSON tùy chỉnh");
                      } else {
                        parsed = parsePlainTextExam(pasteScriptText, "Kịch bản văn bản tùy chỉnh");
                      }
                      applyNewExamData(parsed, "Kịch bản tùy chỉnh");
                    } catch (e: any) {
                      showToast("Không thể phân tích: " + e.message, "error");
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  Áp dụng ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI AUDIO SCANNING & SPEECH-TO-TEXT PROGRESS MODAL */}
      {isAiTranscribing && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="relative inline-block">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-600 flex items-center justify-center mx-auto shadow-xl shadow-purple-500/25 ring-4 ring-purple-100">
                  <Sparkles size={32} className="text-yellow-300 animate-pulse" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black shadow-xs">
                  <Loader2 size={13} className="animate-spin" />
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                AI Quét & Chuyển Giọng Nói Thành Kịch Bản
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {audioFileName ? `Đang phân tích file: "${audioFileName}"` : "Đang xử lý luồng âm thanh..."}
              </p>
            </div>

            {/* Simulated Animated Waveform Visualizer */}
            <div className="flex items-center justify-center gap-1.5 h-12 bg-slate-900 rounded-2xl p-3 border border-slate-800 shadow-inner overflow-hidden">
              {[40, 75, 55, 90, 60, 30, 85, 100, 65, 45, 95, 70, 85, 40, 60, 80, 50, 90, 65, 35].map((height, i) => (
                <div
                  key={i}
                  className="w-1 bg-gradient-to-t from-indigo-500 to-purple-400 rounded-full animate-pulse"
                  style={{
                    height: `${height}%`,
                    animationDelay: `${(i * 0.08) % 1}s`,
                    animationDuration: "0.9s",
                  }}
                />
              ))}
            </div>

            {/* Current Step Tracker */}
            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
              {[
                {
                  step: 1,
                  title: "Đọc & mã hóa file âm thanh",
                  desc: "Chuyển đổi dữ liệu MP3 chuẩn hóa cho mô hình AI",
                },
                {
                  step: 2,
                  title: "Gemini AI nhận diện tiếng Nhật & mốc thời gian",
                  desc: "Phân tích ngữ điệu giọng nói Tokyo, bóc tách hội thoại từ 00:00",
                },
                {
                  step: 3,
                  title: "Bóc tách kịch bản song ngữ & dịch tiếng Việt",
                  desc: "Chuẩn hóa chữ Hán Kanji, Hiragana và biên dịch nghĩa chuẩn sư phạm",
                },
                {
                  step: 4,
                  title: "Hoàn tất & đồng bộ kịch bản vào bài nghe",
                  desc: "Tự động mở Full Script để bạn vừa nghe vừa đọc kịch bản",
                },
              ].map((item) => {
                const isPassed = scanStep > item.step;
                const isCurrent = scanStep === item.step;
                return (
                  <div key={item.step} className="flex items-start gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold text-[11px] mt-0.5 transition-all ${
                        isPassed
                          ? "bg-emerald-500 text-white"
                          : isCurrent
                          ? "bg-purple-600 text-white animate-pulse ring-4 ring-purple-100"
                          : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {isPassed ? <Check size={13} /> : item.step}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-bold leading-tight ${
                          isCurrent
                            ? "text-purple-950 font-extrabold"
                            : isPassed
                            ? "text-emerald-900"
                            : "text-slate-400"
                        }`}
                      >
                        {item.title}
                      </p>
                      {isCurrent && (
                        <p className="text-[11px] text-purple-700 font-medium mt-0.5 animate-fade-in">
                          {aiTranscribeStatus || item.desc}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cancel Button */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-400 italic">
                Thời gian quét thông thường từ 10 - 25 giây
              </span>
              <button
                onClick={() => {
                  transcribeAbortRef.current = true;
                  setIsAiTranscribing(false);
                  setAiTranscribeStatus("");
                  showToast("Đã hủy quá trình quét âm thanh.", "info");
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 87 LISTENING NOTES & VOICE STUDIO MODAL */}
      <ListeningNotesModal
        isOpen={showListeningNotesModal}
        onClose={() => setShowListeningNotesModal(false)}
        selectedAiVoice={selectedAiVoice}
        setSelectedAiVoice={setSelectedAiVoice}
        playbackSpeed={playbackRate}
        setPlaybackSpeed={setPlaybackRate}
        voiceEngine={voiceEngine}
        setVoiceEngine={setVoiceEngine}
        browserVoices={voices}
        selectedBrowserVoiceIndex={selectedBrowserVoiceIndex}
        setSelectedBrowserVoiceIndex={setSelectedBrowserVoiceIndex}
      />

      {/* NATIVE AUDIO STORAGE & RETENTION MODAL */}
      <AudioStorageModal
        isOpen={showAudioStorageModal}
        onClose={() => setShowAudioStorageModal(false)}
        activePresetKey={activePresetKey}
        examTitle={examTitle}
        audioUrl={audioUrl}
        audioFileName={audioFileName}
        playbackMode={playbackMode}
        onAudioUpdated={(url, fileName, mode) => {
          if (audioUrl && audioUrl.startsWith("blob:") && audioUrl !== url) {
            URL.revokeObjectURL(audioUrl);
          }
          setAudioUrl(url || null);
          setAudioFileName(fileName);
          setPlaybackMode(mode);
          setAudioStorageStatus(url ? "server" : "none");
          stopTts();
          setIsPlayingAudio(false);
          setCurrentTime(0);
        }}
        onRunAiTranscribe={(file) => {
          handleRunAiAudioTranscribe(file);
        }}
        showToast={showToast}
      />

      {/* FIRESTORE SYNC & CRONJOB MODAL */}
      <FirestoreSyncModal
        isOpen={showFirestoreModal}
        onClose={() => setShowFirestoreModal(false)}
        defaultTab="listening"
      />

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-200">
          <div
            className={`px-4 py-3 rounded-2xl shadow-xl border text-xs font-bold flex items-center gap-2 max-w-md ${
              toastMessage.type === "success"
                ? "bg-emerald-600 text-white border-emerald-500 shadow-emerald-500/20"
                : toastMessage.type === "error"
                ? "bg-rose-600 text-white border-rose-500 shadow-rose-500/20"
                : "bg-slate-900 text-white border-slate-800 shadow-slate-900/20"
            }`}
          >
            {toastMessage.type === "success" ? (
              <CheckCircle2 size={16} className="shrink-0 text-emerald-200" />
            ) : toastMessage.type === "error" ? (
              <XCircle size={16} className="shrink-0 text-rose-200" />
            ) : (
              <Info size={16} className="shrink-0 text-indigo-300" />
            )}
            <span className="leading-snug">{toastMessage.text}</span>
          </div>
        </div>
      )}
    </div>
  );
}
