import React, { useState, useEffect, useMemo, useRef, useDeferredValue } from "react";
import {
  Grid,
  Layers,
  CheckCircle2,
  HelpCircle,
  Volume2,
  Search,
  Sparkles,
  BookOpen,
  RotateCcw,
  Star,
  ChevronLeft,
  ChevronRight,
  Filter,
  Lightbulb,
  Edit3,
  Award,
  Eraser,
  Eye,
  EyeOff,
  Check,
  Zap,
  ImageIcon,
  X,
  Cloud,
  RefreshCw,
  Database,
  ArrowRight,
  Bookmark,
  Share2,
  Clock,
} from "lucide-react";
import { dongDuKanjiList, DongDuKanjiItem } from "../data/dongDuKanji";
import { hanTu1200List, HanTu1200Item } from "../data/hanTu1200";
import { kanjiSoTrungCapList, KanjiSoTrungCapItem } from "../data/kanjiSoTrungCap";
import { tuVungChuDeList, tuVungBaiHocList, TuVungChuDeItem, TuVungBaiHocItem } from "../data/tuVungN3";
import {
  getFirestoreKanjiCounts,
  pushAllKanjiDataToFirestore,
  KanjiSyncStats,
} from "../lib/firestoreSync";
import { FirestoreSyncModal } from "./FirestoreSyncModal";

// Unified view modes
type KanjiViewMode = "grid" | "flashcard" | "quiz" | "writing" | "guide";

// Datasets
type DatasetTab = "100_kanji" | "kanji_402" | "hantu_1200" | "vocab_n3";

// Unified Word Example
export interface KanjiWordItem {
  word: string;
  reading: string;
  meaning: string;
  pos?: "verb" | "noun" | "adj" | "other"; // Động từ, Danh từ, Tính từ
  readingType?: "on" | "kun" | "mixed"; // Âm On hay Âm Kun
}

// Unified Item for study
interface UnifiedItem {
  id: string;
  sourceDataset: DatasetTab;
  displayChar: string; // kanji or word
  reading?: string; // hiragana / onyomi / kunyomi
  onyomi?: string[];
  kunyomi?: string[];
  words?: KanjiWordItem[];
  hanViet: string;
  meaning: string;
  subInfo: string; // e.g. "Hàng 4", "Trang 2 • Khung 1", "1日目 – Nhà cửa"
  note?: string;
  example?: string;
  isRadical?: boolean;
}

export function KanjiLearningView() {
  const [datasetTab, setDatasetTab] = useState<DatasetTab>("100_kanji");
  const [viewMode, setViewMode] = useState<KanjiViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearch = useDeferredValue(searchQuery);
  const [currentlySpeaking, setCurrentlySpeaking] = useState<string | null>(null);
  const [showOriginalImageModal, setShowOriginalImageModal] = useState(false);

  // Audio cleanup on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Firestore Sync status
  const [syncStats, setSyncStats] = useState<KanjiSyncStats | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState<{ text: string; percent: number } | null>(null);
  const [syncSuccessToast, setSyncSuccessToast] = useState(false);
  const [showCronModal, setShowCronModal] = useState(false);

  // Filters for datasets
  const [selectedCol100, setSelectedCol100] = useState<number | "all">("all");
  const [selectedRow402, setSelectedRow402] = useState<number | "all">("all");
  const [selectedTrang1200, setSelectedTrang1200] = useState<number | "all">("all");
  const [filterRadicalsOnly, setFilterRadicalsOnly] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "learning" | "mastered" | "new">("all");

  // Pagination for large sets (1200 & 402)
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 40;

  // Selected item for modal & canvas
  const [selectedUnifiedItem, setSelectedUnifiedItem] = useState<UnifiedItem | null>(null);
  const [modalWordFilter, setModalWordFilter] = useState<"all" | "verb" | "noun" | "kun" | "on">("all");

  // Learning progress tracked in localStorage
  const [masteredIds, setMasteredIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("n3_study_mastered_ids");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [learningIds, setLearningIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("n3_study_learning_ids");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("n3_study_mastered_ids", JSON.stringify(masteredIds));
    } catch {
      // ignore
    }
  }, [masteredIds]);

  useEffect(() => {
    try {
      localStorage.setItem("n3_study_learning_ids", JSON.stringify(learningIds));
    } catch {
      // ignore
    }
  }, [learningIds]);

  // Load Firestore counts on mount
  useEffect(() => {
    let isMounted = true;
    getFirestoreKanjiCounts()
      .then((stats) => {
        if (isMounted) setSyncStats(stats);
      })
      .catch((err) => console.warn("Firestore count err:", err));
    return () => {
      isMounted = false;
    };
  }, []);

  // Trigger Cloud Firestore push
  const handleSyncToFirestore = async () => {
    setIsSyncing(true);
    setSyncProgress({ text: "Đang kết nối Firestore Cloud...", percent: 5 });
    try {
      const result = await pushAllKanjiDataToFirestore((text, percent) => {
        setSyncProgress({ text, percent });
      });
      if (result.success) {
        const fresh = await getFirestoreKanjiCounts();
        setSyncStats(fresh);
        setSyncSuccessToast(true);
        setTimeout(() => setSyncSuccessToast(false), 4500);
      }
    } catch (err: any) {
      alert("Đồng bộ thất bại: " + (err?.message || String(err)));
    } finally {
      setIsSyncing(false);
      setSyncProgress(null);
    }
  };

  const toggleMastered = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (masteredIds.includes(id)) {
      setMasteredIds((prev) => prev.filter((item) => item !== id));
    } else {
      setMasteredIds((prev) => [...prev, id]);
      setLearningIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const toggleLearning = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (learningIds.includes(id)) {
      setLearningIds((prev) => prev.filter((item) => item !== id));
    } else {
      setLearningIds((prev) => [...prev, id]);
      setMasteredIds((prev) => prev.filter((item) => item !== id));
    }
  };

  // TTS speech
  const speakJapanese = (text: string) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setCurrentlySpeaking(text);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.rate = 0.85;

    utterance.onend = () => setCurrentlySpeaking(null);
    utterance.onerror = () => setCurrentlySpeaking(null);

    window.speechSynthesis.speak(utterance);
  };

  // Unified items list based on selected datasetTab
  const rawUnifiedItems = useMemo<UnifiedItem[]>(() => {
    if (datasetTab === "100_kanji") {
      return dongDuKanjiList.map((item) => ({
        id: item.id,
        sourceDataset: "100_kanji",
        displayChar: item.kanji,
        onyomi: item.onyomi,
        kunyomi: item.kunyomi,
        words: item.words,
        reading: `On: ${item.onyomi.join(", ") || "-"} | Kun: ${item.kunyomi.join(", ") || "-"}`,
        hanViet: item.hanViet,
        meaning: item.meaning,
        subInfo: `Cột ${item.col} • Hàng ${item.row} (#${item.order})`,
        note: item.mnemonic,
        example: item.words.map((w) => `${w.word} (${w.reading}): ${w.meaning}`).join(" • "),
      }));
    }

    if (datasetTab === "kanji_402") {
      return kanjiSoTrungCapList.map((item) => ({
        id: item.id,
        sourceDataset: "kanji_402",
        displayChar: item.kanji,
        onyomi: item.onyomi || [],
        kunyomi: item.kunyomi || [],
        words: item.words || [],
        reading: `On: ${(item.onyomi || []).join(", ") || "-"} | Kun: ${(item.kunyomi || []).join(", ") || "-"}`,
        hanViet: item.hanViet,
        meaning: item.meaning,
        subInfo: `Hàng ${item.hang} trên bảng in (#${item.stt})`,
        example:
          item.words && item.words.length > 0
            ? item.words.map((w) => `${w.word} (${w.reading}): ${w.meaning}`).join(" • ")
            : undefined,
      }));
    }

    if (datasetTab === "hantu_1200") {
      return hanTu1200List.map((item) => ({
        id: item.id,
        sourceDataset: "hantu_1200",
        displayChar: item.kanji,
        hanViet: item.hanViet,
        meaning: item.meaning,
        subInfo: `Trang ${item.trang} • Khung ${item.khung} • Số ${item.so} (#${item.stt})`,
        note: item.note,
        isRadical: item.isRadical,
      }));
    }

    // vocab_n3 (259 topics + 34 lessons)
    const topicItems: UnifiedItem[] = tuVungChuDeList.map((item) => ({
      id: item.id,
      sourceDataset: "vocab_n3",
      displayChar: item.word,
      reading: item.hiragana,
      hanViet: item.hanViet,
      meaning: item.meaning,
      subInfo: `${item.topic} (#${item.stt})`,
      note: item.note,
    }));

    const lessonItems: UnifiedItem[] = tuVungBaiHocList.map((item) => ({
      id: item.id,
      sourceDataset: "vocab_n3",
      displayChar: item.word,
      reading: item.hiragana,
      hanViet: item.hanViet,
      meaning: item.meaning,
      subInfo: `Bài ${item.bai} • Slide ${item.slide} (#${item.stt})`,
      example: item.example,
      note: item.note,
    }));

    return [...topicItems, ...lessonItems];
  }, [datasetTab]);

  // Filtered Items
  const filteredList = useMemo(() => {
    const q = deferredSearch.toLowerCase().trim();
    return rawUnifiedItems.filter((item) => {
      // Specific dataset filters
      if (datasetTab === "100_kanji" && selectedCol100 !== "all") {
        if (!item.subInfo.includes(`Cột ${selectedCol100} `)) return false;
      }

      if (datasetTab === "kanji_402" && selectedRow402 !== "all") {
        if (!item.subInfo.includes(`Hàng ${selectedRow402} `)) return false;
      }

      if (datasetTab === "hantu_1200") {
        if (selectedTrang1200 !== "all" && !item.subInfo.includes(`Trang ${selectedTrang1200} `))
          return false;
        if (filterRadicalsOnly && !item.isRadical) return false;
      }

      if (datasetTab === "vocab_n3" && selectedTopic !== "all") {
        if (!item.subInfo.toLowerCase().includes(selectedTopic.toLowerCase())) return false;
      }

      // Status filter
      if (statusFilter === "mastered" && !masteredIds.includes(item.id)) return false;
      if (statusFilter === "learning" && !learningIds.includes(item.id)) return false;
      if (statusFilter === "new" && (masteredIds.includes(item.id) || learningIds.includes(item.id)))
        return false;

      // Search query
      if (q) {
        const matchChar = item.displayChar.includes(q);
        const matchReading = item.reading?.toLowerCase().includes(q);
        const matchOn = item.onyomi?.some((o) => o.toLowerCase().includes(q));
        const matchKun = item.kunyomi?.some((k) => k.toLowerCase().includes(q));
        const matchHanViet = item.hanViet.toLowerCase().includes(q);
        const matchMeaning = item.meaning.toLowerCase().includes(q);
        const matchSub = item.subInfo.toLowerCase().includes(q);
        const matchNote = item.note?.toLowerCase().includes(q);
        const matchExample = item.example?.toLowerCase().includes(q);
        return (
          matchChar ||
          Boolean(matchReading) ||
          Boolean(matchOn) ||
          Boolean(matchKun) ||
          matchHanViet ||
          matchMeaning ||
          matchSub ||
          Boolean(matchNote) ||
          Boolean(matchExample)
        );
      }

      return true;
    });
  }, [
    rawUnifiedItems,
    datasetTab,
    selectedCol100,
    selectedRow402,
    selectedTrang1200,
    filterRadicalsOnly,
    selectedTopic,
    statusFilter,
    masteredIds,
    learningIds,
    deferredSearch,
  ]);

  // Reset page when filter or tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [
    datasetTab,
    selectedCol100,
    selectedRow402,
    selectedTrang1200,
    filterRadicalsOnly,
    selectedTopic,
    statusFilter,
    searchQuery,
  ]);

  // Total pages
  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE) || 1;
  const pagedList = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredList.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredList, currentPage]);

  // Flashcard state
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const activeFlashcardItem = filteredList[currentCardIndex] || filteredList[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % (filteredList.length || 1));
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex(
      (prev) => (prev - 1 + (filteredList.length || 1)) % (filteredList.length || 1)
    );
  };

  // Canvas drawing state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showUnderlay, setShowUnderlay] = useState(true);
  const [writingTargetChar, setWritingTargetChar] = useState<string>("与");

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 14;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Quiz Mode State
  const [quizList, setQuizList] = useState<UnifiedItem[]>([]);
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const startQuiz = () => {
    const sample = [...filteredList].sort(() => Math.random() - 0.5).slice(0, 15);
    setQuizList(sample);
    setQuizQuestionIndex(0);
    setQuizScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const currentQuizItem = quizList[quizQuestionIndex];

  // Generate 4 options for quiz question
  useEffect(() => {
    if (!currentQuizItem) return;

    const correctAnswer = currentQuizItem.hanViet;
    const distractors = rawUnifiedItems
      .filter((k) => k.id !== currentQuizItem.id && k.hanViet !== correctAnswer && k.hanViet.length > 0)
      .map((k) => k.hanViet)
      .filter((v, i, arr) => arr.indexOf(v) === i)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const opts = [correctAnswer, ...distractors].sort(() => Math.random() - 0.5);
    setQuizOptions(opts);
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [currentQuizItem, rawUnifiedItems]);

  const handleSelectQuizAnswer = (opt: string) => {
    if (isAnswered) return;
    setSelectedAnswer(opt);
    setIsAnswered(true);

    if (opt === currentQuizItem.hanViet) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuizQuestion = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    setQuizQuestionIndex((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      {/* ======================================================== */}
      {/* 1. TOP HEADER & DATASET TABS                            */}
      {/* ======================================================== */}
      <div className="bg-white rounded-3xl p-5 md:p-6 border border-slate-200/90 shadow-sm space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Trung Tâm Hán Tự & Từ Vựng N3
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500 font-medium">Giáo Trình Đông Du & Đề N3</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Học Hán Tự Đa Phương Thức</span>
              <span className="text-xs font-extrabold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                1,959 Mục
              </span>
            </h1>
          </div>

          {/* Cloud Firestore Sync Status & Trigger */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
              <Cloud size={14} className="text-emerald-500" />
              <span>
                Firestore:{" "}
                <strong className="text-slate-900">
                  {syncStats ? syncStats.kanji1200InFirestore + syncStats.kanjiIntermediateInFirestore : "1,666"}
                </strong>{" "}
                chữ Hán
              </span>
            </div>

            <button
              onClick={() => setShowCronModal(true)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-2xs"
              title="Quản lý Cronjob tự động đồng bộ lên Firebase"
            >
              <Clock size={13} className="text-emerald-600" />
              <span>Cron Tự Động</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </button>

            <button
              onClick={handleSyncToFirestore}
              disabled={isSyncing}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
                isSyncing
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
              title="Đẩy toàn bộ 1,959 mục Hán tự và từ vựng lên Firebase Cloud Firestore"
            >
              <RefreshCw size={13} className={isSyncing ? "animate-spin" : ""} />
              <span>{isSyncing ? "Đang đồng bộ..." : "Đồng bộ Firestore"}</span>
            </button>
          </div>
        </div>

        {/* Sync Progress Bar if active */}
        {syncProgress && (
          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-2xl space-y-1.5 animate-in fade-in">
            <div className="flex justify-between text-xs font-bold text-indigo-900">
              <span>{syncProgress.text}</span>
              <span>{syncProgress.percent}%</span>
            </div>
            <div className="w-full h-2 bg-indigo-200/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${syncProgress.percent}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Sync Success Toast */}
        {syncSuccessToast && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs text-emerald-900 font-semibold animate-in fade-in">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600" />
              Đã đồng bộ toàn bộ 1,959 mục Hán Tự & Từ vựng N3 lên Cloud Firestore thành công!
            </span>
            <button onClick={() => setSyncSuccessToast(false)} className="text-emerald-700 hover:text-emerald-900">
              <X size={14} />
            </button>
          </div>
        )}

        {/* Dataset Switcher Segmented Control */}
        <div className="border-t border-slate-100 pt-4">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Chọn Tập Dữ Liệu Học:
          </span>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {/* 100 Kanji Tab */}
            <button
              onClick={() => setDatasetTab("100_kanji")}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                datasetTab === "100_kanji"
                  ? "bg-indigo-50 border-indigo-300 text-indigo-950 ring-2 ring-indigo-500/20 shadow-xs"
                  : "bg-slate-50/70 border-slate-200/80 hover:bg-slate-100/70 text-slate-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black">100 Kanji Trọng Tâm</span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Hiragana chuẩn
                </span>
              </div>
              <span className="text-[11px] text-slate-500 mt-1">10 Cột x 10 Hàng • N4 lên N3</span>
            </button>

            {/* 402 Kanji Sơ Trung Cấp Tab */}
            <button
              onClick={() => setDatasetTab("kanji_402")}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                datasetTab === "kanji_402"
                  ? "bg-indigo-50 border-indigo-300 text-indigo-950 ring-2 ring-indigo-500/20 shadow-xs"
                  : "bg-slate-50/70 border-slate-200/80 hover:bg-slate-100/70 text-slate-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black">Kanji 初中級 (402 chữ)</span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Hiragana chuẩn
                </span>
              </div>
              <span className="text-[11px] text-slate-500 mt-1">41 Hàng • Bảng in 初中級</span>
            </button>

            {/* 1,264 Hán Tự 1200 Tab */}
            <button
              onClick={() => setDatasetTab("hantu_1200")}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                datasetTab === "hantu_1200"
                  ? "bg-indigo-50 border-indigo-300 text-indigo-950 ring-2 ring-indigo-500/20 shadow-xs"
                  : "bg-slate-50/70 border-slate-200/80 hover:bg-slate-100/70 text-slate-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black">Hán Tự 1200 (1,264 mục)</span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-slate-200 text-slate-800">
                  16 Trang
                </span>
              </div>
              <span className="text-[11px] text-slate-500 mt-1">57 Bộ thủ & 1,207 Hán tự</span>
            </button>

            {/* Từ Vựng Chủ Đề & Bài Học Tab */}
            <button
              onClick={() => setDatasetTab("vocab_n3")}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                datasetTab === "vocab_n3"
                  ? "bg-indigo-50 border-indigo-300 text-indigo-950 ring-2 ring-indigo-500/20 shadow-xs"
                  : "bg-slate-50/70 border-slate-200/80 hover:bg-slate-100/70 text-slate-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black">Từ Vựng Đời Sống & Bài Học</span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-slate-200 text-slate-800">
                  293 Từ
                </span>
              </div>
              <span className="text-[11px] text-slate-500 mt-1">5 Chủ đề gia đình & Bài 1</span>
            </button>
          </div>
        </div>

        {/* View Mode Buttons (Lưới, Thẻ, Tập viết, Trắc nghiệm, Mẹo nhớ) */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 flex-wrap gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl overflow-x-auto max-w-full">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                viewMode === "grid"
                  ? "bg-white text-indigo-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Grid size={14} />
              <span>Ma Trận & Danh Sách</span>
            </button>

            <button
              onClick={() => setViewMode("flashcard")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                viewMode === "flashcard"
                  ? "bg-white text-indigo-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Layers size={14} />
              <span>Thẻ Ghi Nhớ (Flashcard)</span>
            </button>

            <button
              onClick={() => setViewMode("writing")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                viewMode === "writing"
                  ? "bg-white text-indigo-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Edit3 size={14} />
              <span>Tập Viết Chữ</span>
            </button>

            <button
              onClick={() => {
                setViewMode("quiz");
                startQuiz();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                viewMode === "quiz"
                  ? "bg-white text-indigo-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Award size={14} />
              <span>Luyện Trắc Nghiệm</span>
            </button>

            <button
              onClick={() => setViewMode("guide")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                viewMode === "guide"
                  ? "bg-white text-indigo-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Lightbulb size={14} />
              <span>Bí Kíp Ghi Nhớ</span>
            </button>
          </div>

          {/* Compare with Original Paper Modal Trigger */}
          {datasetTab === "100_kanji" && (
            <button
              onClick={() => setShowOriginalImageModal(true)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ImageIcon size={14} className="text-slate-600" />
              <span>Đối chiếu tờ giấy gốc</span>
            </button>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. SEARCH & DYNAMIC FILTER BAR                           */}
      {/* ======================================================== */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo chữ Hán, Hiragana, âm Hán Việt hoặc nghĩa tiếng Việt..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-slate-50 p-1 border border-slate-200 rounded-2xl shrink-0">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                statusFilter === "all" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600"
              }`}
            >
              Tất cả ({rawUnifiedItems.length})
            </button>
            <button
              onClick={() => setStatusFilter("learning")}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                statusFilter === "learning" ? "bg-white text-indigo-700 shadow-2xs" : "text-slate-600"
              }`}
            >
              Đang học ({rawUnifiedItems.filter((i) => learningIds.includes(i.id)).length})
            </button>
            <button
              onClick={() => setStatusFilter("mastered")}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                statusFilter === "mastered" ? "bg-white text-emerald-700 shadow-2xs" : "text-slate-600"
              }`}
            >
              Đã thuộc ({rawUnifiedItems.filter((i) => masteredIds.includes(i.id)).length})
            </button>
          </div>
        </div>

        {/* Dataset-specific secondary filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs text-slate-600 scrollbar-none">
          <span className="font-bold text-slate-400 shrink-0">Bộ lọc:</span>

          {/* 100 Kanji: Columns 1 to 10 */}
          {datasetTab === "100_kanji" && (
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => setSelectedCol100("all")}
                className={`px-2.5 py-1 rounded-lg font-semibold cursor-pointer ${
                  selectedCol100 === "all" ? "bg-indigo-600 text-white" : "bg-slate-100 hover:bg-slate-200"
                }`}
              >
                Tất cả cột
              </button>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCol100(c)}
                  className={`px-2 py-1 rounded-lg font-semibold cursor-pointer ${
                    selectedCol100 === c ? "bg-indigo-600 text-white" : "bg-slate-100 hover:bg-slate-200"
                  }`}
                >
                  Cột {c}
                </button>
              ))}
            </div>
          )}

          {/* 402 Kanji: Rows 1 to 41 */}
          {datasetTab === "kanji_402" && (
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => setSelectedRow402("all")}
                className={`px-2.5 py-1 rounded-lg font-semibold cursor-pointer ${
                  selectedRow402 === "all" ? "bg-indigo-600 text-white" : "bg-slate-100 hover:bg-slate-200"
                }`}
              >
                Tất cả 41 hàng
              </button>
              {[1, 5, 10, 15, 20, 25, 30, 35, 40].map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRow402(r)}
                  className={`px-2 py-1 rounded-lg font-semibold cursor-pointer ${
                    selectedRow402 === r ? "bg-indigo-600 text-white" : "bg-slate-100 hover:bg-slate-200"
                  }`}
                >
                  Hàng {r}
                </button>
              ))}
            </div>
          )}

          {/* 1,264 Hán tự: Pages 1 to 16 & Radicals toggle */}
          {datasetTab === "hantu_1200" && (
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setFilterRadicalsOnly(!filterRadicalsOnly)}
                className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer transition-colors ${
                  filterRadicalsOnly
                    ? "bg-amber-600 text-white"
                    : "bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100"
                }`}
              >
                ★ 57 Bộ Thủ
              </button>
              <button
                onClick={() => setSelectedTrang1200("all")}
                className={`px-2.5 py-1 rounded-lg font-semibold cursor-pointer ${
                  selectedTrang1200 === "all" ? "bg-indigo-600 text-white" : "bg-slate-100 hover:bg-slate-200"
                }`}
              >
                Tất cả 16 trang
              </button>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedTrang1200(p)}
                  className={`px-2 py-1 rounded-lg font-semibold cursor-pointer ${
                    selectedTrang1200 === p ? "bg-indigo-600 text-white" : "bg-slate-100 hover:bg-slate-200"
                  }`}
                >
                  Trang {p}
                </button>
              ))}
            </div>
          )}

          {/* Vocab N3: Topics */}
          {datasetTab === "vocab_n3" && (
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => setSelectedTopic("all")}
                className={`px-2.5 py-1 rounded-lg font-semibold cursor-pointer ${
                  selectedTopic === "all" ? "bg-indigo-600 text-white" : "bg-slate-100 hover:bg-slate-200"
                }`}
              >
                Tất cả (293 từ)
              </button>
              {[
                { label: "1日目 Nhà cửa", query: "1日目" },
                { label: "2-3日目 Nấu ăn", query: "2-3日目" },
                { label: "4日目 Dọn dẹp", query: "4日目" },
                { label: "5日目 Giặt giũ", query: "5日目" },
                { label: "6日 Nuôi con", query: "6日" },
                { label: "Bài 1 りんご", query: "Bài 1" },
              ].map((t) => (
                <button
                  key={t.query}
                  onClick={() => setSelectedTopic(t.query)}
                  className={`px-2 py-1 rounded-lg font-semibold cursor-pointer ${
                    selectedTopic === t.query ? "bg-indigo-600 text-white" : "bg-slate-100 hover:bg-slate-200"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. VIEW MODE 1: MATRIX / GRID & LIST                     */}
      {/* ======================================================== */}
      {viewMode === "grid" && (
        <div className="space-y-4">
          {/* Header count & pagination indicator */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Tìm thấy <strong className="text-slate-800">{filteredList.length}</strong> mục
              {totalPages > 1 && (
                <span>
                  {" "}
                  (Trang {currentPage} / {totalPages})
                </span>
              )}
            </span>

            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 font-bold hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
                >
                  ← Trước
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 font-bold hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
                >
                  Sau →
                </button>
              </div>
            )}
          </div>

          {/* Grid Cards Container */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {pagedList.map((item) => {
              const isMastered = masteredIds.includes(item.id);
              const isLearning = learningIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedUnifiedItem(item);
                    setModalWordFilter("all");
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group hover:shadow-md hover:-translate-y-0.5 ${
                    isMastered
                      ? "bg-emerald-50/40 border-emerald-200"
                      : isLearning
                      ? "bg-indigo-50/40 border-indigo-200"
                      : "bg-white border-slate-200 hover:border-indigo-300"
                  }`}
                >
                  {/* Top subInfo & action flags */}
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-2">
                    <span className="truncate max-w-[110px]">{item.subInfo}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => toggleLearning(item.id, e)}
                        className={`p-1 rounded-md transition-colors ${
                          isLearning ? "text-indigo-600 bg-indigo-100" : "text-slate-300 hover:text-indigo-500"
                        }`}
                        title="Đang học"
                      >
                        <Zap size={11} />
                      </button>
                      <button
                        onClick={(e) => toggleMastered(item.id, e)}
                        className={`p-1 rounded-md transition-colors ${
                          isMastered ? "text-emerald-600 bg-emerald-100" : "text-slate-300 hover:text-emerald-500"
                        }`}
                        title="Đã thuộc"
                      >
                        <Check size={11} />
                      </button>
                    </div>
                  </div>

                  {/* Big Character Display */}
                  <div className="text-center py-2">
                    <div
                      className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight group-hover:scale-105 transition-transform"
                      style={{ fontFamily: "'Klee One', 'Noto Serif JP', serif" }}
                    >
                      {item.displayChar}
                    </div>

                    {/* On / Kun or Reading display */}
                    {(item.onyomi && item.onyomi.length > 0) || (item.kunyomi && item.kunyomi.length > 0) ? (
                      <div className="mt-1 space-y-0.5 text-left bg-slate-50/80 p-1.5 rounded-xl border border-slate-100">
                        {item.onyomi && item.onyomi.length > 0 && (
                          <div className="text-[10px] text-purple-900 font-bold truncate flex items-center gap-1">
                            <span className="text-[8px] font-black px-1 py-0.2 rounded bg-purple-100 text-purple-700 shrink-0">
                              ON
                            </span>
                            <span className="truncate">{item.onyomi.join("・")}</span>
                          </div>
                        )}
                        {item.kunyomi && item.kunyomi.length > 0 && (
                          <div className="text-[10px] text-emerald-900 font-medium truncate flex items-center gap-1">
                            <span className="text-[8px] font-black px-1 py-0.2 rounded bg-emerald-100 text-emerald-700 shrink-0">
                              KUN
                            </span>
                            <span className="truncate">{item.kunyomi.join("・")}</span>
                          </div>
                        )}
                      </div>
                    ) : item.reading ? (
                      <div className="text-[11px] font-bold text-indigo-700 mt-1 truncate">
                        {item.reading}
                      </div>
                    ) : null}
                  </div>

                  {/* Bottom: Han Viet & Meaning & POS badges */}
                  <div className="border-t border-slate-100 pt-2 mt-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-black text-slate-900 truncate">
                        {item.hanViet}
                      </span>
                      {item.words && item.words.length > 0 && (
                        <div className="flex items-center gap-0.5 shrink-0 text-[8px] font-bold">
                          {item.words.some((w) => w.pos === "verb") && (
                            <span className="px-1 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200/60" title="Có ví dụ Động từ">
                              ĐT
                            </span>
                          )}
                          {item.words.some((w) => w.pos === "noun") && (
                            <span className="px-1 py-0.2 rounded bg-indigo-50 text-indigo-700 border border-indigo-200/60" title="Có ví dụ Danh từ">
                              DT
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-2 mt-0.5" title={item.meaning}>
                      {item.meaning}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
              >
                ← Trang trước
              </button>

              <span className="text-xs font-bold text-slate-700 px-3 py-1.5 bg-slate-100 rounded-xl">
                {currentPage} / {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
              >
                Trang tiếp theo →
              </button>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. VIEW MODE 2: FLASHCARD INTERACTIVE FLIP               */}
      {/* ======================================================== */}
      {viewMode === "flashcard" && activeFlashcardItem && (
        <div className="max-w-xl mx-auto space-y-6">
          {/* Card Counter & Action Bar */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              Thẻ {currentCardIndex + 1} / {filteredList.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => speakJapanese(activeFlashcardItem.displayChar)}
                className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-indigo-600 transition-colors cursor-pointer"
                title="Nghe phát âm chuẩn"
              >
                <Volume2 size={16} />
              </button>
              <button
                onClick={() => toggleMastered(activeFlashcardItem.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer flex items-center gap-1.5 ${
                  masteredIds.includes(activeFlashcardItem.id)
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-white text-slate-700 border-slate-200 hover:border-emerald-300"
                }`}
              >
                <Check size={14} />
                <span>
                  {masteredIds.includes(activeFlashcardItem.id) ? "Đã thuộc" : "Đánh dấu thuộc"}
                </span>
              </button>
            </div>
          </div>

          {/* The Flip Card */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[360px] bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between text-center select-none"
          >
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              {activeFlashcardItem.subInfo}
            </div>

            {!isFlipped ? (
              /* Mặt trước: Chữ to + Gợi ý */
              <div className="my-auto py-6 space-y-4">
                <div
                  className="text-8xl sm:text-9xl font-black text-slate-900 tracking-tight"
                  style={{ fontFamily: "'Klee One', 'Noto Serif JP', serif" }}
                >
                  {activeFlashcardItem.displayChar}
                </div>
                <div className="text-xs text-slate-400 font-medium">
                  (Bấm vào thẻ để lật xem Âm Hán Việt & Nghĩa)
                </div>
              </div>
            ) : (
              /* Mặt sau: Đầy đủ giải nghĩa & âm */
              <div className="my-auto py-4 space-y-4 text-left">
                <div className="text-center pb-3 border-b border-slate-100">
                  <div className="text-4xl font-black text-indigo-700">
                    {activeFlashcardItem.hanViet}
                  </div>
                </div>

                {/* On / Kun dedicated dual deck */}
                {(activeFlashcardItem.onyomi && activeFlashcardItem.onyomi.length > 0) ||
                (activeFlashcardItem.kunyomi && activeFlashcardItem.kunyomi.length > 0) ? (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-purple-50/70 border border-purple-200/70 rounded-2xl">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-extrabold text-purple-900 uppercase tracking-wider flex items-center gap-1">
                          <span>Âm On (音読み)</span>
                          <span className="text-[9px] font-normal text-purple-700">· Hiragana</span>
                        </span>
                        {activeFlashcardItem.onyomi && activeFlashcardItem.onyomi.length > 0 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              speakJapanese(activeFlashcardItem.onyomi![0]);
                            }}
                            className="text-purple-600 hover:text-purple-900 p-0.5 rounded cursor-pointer"
                            title="Nghe âm On"
                          >
                            <Volume2 size={12} />
                          </button>
                        )}
                      </div>
                      <div className="text-sm font-black text-purple-950">
                        {activeFlashcardItem.onyomi && activeFlashcardItem.onyomi.length > 0
                          ? activeFlashcardItem.onyomi.join("・")
                          : "-"}
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-50/70 border border-emerald-200/70 rounded-2xl">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-extrabold text-emerald-900 uppercase tracking-wider flex items-center gap-1">
                          <span>Âm Kun (訓読み)</span>
                          <span className="text-[9px] font-normal text-emerald-700">· Hiragana</span>
                        </span>
                        {activeFlashcardItem.kunyomi && activeFlashcardItem.kunyomi.length > 0 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              speakJapanese(activeFlashcardItem.kunyomi![0].replace("・", ""));
                            }}
                            className="text-emerald-600 hover:text-emerald-900 p-0.5 rounded cursor-pointer"
                            title="Nghe âm Kun"
                          >
                            <Volume2 size={12} />
                          </button>
                        )}
                      </div>
                      <div className="text-sm font-black text-emerald-950">
                        {activeFlashcardItem.kunyomi && activeFlashcardItem.kunyomi.length > 0
                          ? activeFlashcardItem.kunyomi.join("・")
                          : "-"}
                      </div>
                    </div>
                  </div>
                ) : activeFlashcardItem.reading ? (
                  <div className="p-2.5 bg-indigo-50/70 border border-indigo-200/70 rounded-2xl text-center">
                    <span className="text-xs font-bold text-indigo-900">{activeFlashcardItem.reading}</span>
                  </div>
                ) : null}

                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-bold text-slate-400 text-xs uppercase block">Ý nghĩa:</span>
                    <p className="text-slate-800 font-semibold">{activeFlashcardItem.meaning}</p>
                  </div>

                  {activeFlashcardItem.note && (
                    <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/60 text-xs text-amber-950">
                      <strong>Ghi chú:</strong> {activeFlashcardItem.note}
                    </div>
                  )}

                  {activeFlashcardItem.words && activeFlashcardItem.words.length > 0 ? (
                    <div className="space-y-1.5 pt-1 text-left">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-400 uppercase text-[10px] block">
                          Từ vựng ví dụ (Động từ & Danh từ):
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">
                          {activeFlashcardItem.words.filter((w) => w.pos === "verb").length} ĐT •{" "}
                          {activeFlashcardItem.words.filter((w) => w.pos === "noun").length} DT
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-0.5">
                        {activeFlashcardItem.words.map((w, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs hover:bg-slate-100/70 transition-colors"
                          >
                            <div className="min-w-0 pr-1">
                              <div className="flex items-center gap-1 flex-wrap">
                                <span className="font-bold text-slate-900">{w.word}</span>
                                <span className="text-[11px] text-slate-500 font-medium">({w.reading})</span>
                                {w.pos === "verb" && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-800">
                                    Động từ
                                  </span>
                                )}
                                {w.pos === "noun" && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800">
                                    Danh từ
                                  </span>
                                )}
                                {w.pos === "adj" && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-900">
                                    Tính từ
                                  </span>
                                )}
                                {w.readingType === "kun" && (
                                  <span className="text-[9px] font-semibold px-1 py-0.2 rounded bg-emerald-100 text-emerald-800">
                                    Kun
                                  </span>
                                )}
                                {w.readingType === "on" && (
                                  <span className="text-[9px] font-semibold px-1 py-0.2 rounded bg-purple-100 text-purple-800">
                                    On
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-slate-600 truncate mt-0.5">{w.meaning}</div>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                speakJapanese(w.reading);
                              }}
                              className="text-slate-400 hover:text-indigo-600 p-1.5 rounded-md shrink-0 cursor-pointer"
                              title="Phát âm từ"
                            >
                              <Volume2 size={13} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : activeFlashcardItem.example ? (
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700">
                      <strong>Ví dụ:</strong> {activeFlashcardItem.example}
                    </div>
                  ) : null}
                </div>
              </div>
            )}

            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
              <RotateCcw size={13} />
              <span>{isFlipped ? "Bấm để lật về mặt trước" : "Bấm để xem đáp án"}</span>
            </div>
          </div>

          {/* Prev / Next controls */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrevCard}
              className="flex-1 py-3 px-4 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <ChevronLeft size={16} />
              <span>Thẻ trước</span>
            </button>
            <button
              onClick={handleNextCard}
              className="flex-1 py-3 px-4 rounded-2xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Thẻ tiếp theo</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. VIEW MODE 3: WRITING PRACTICE CANVAS                  */}
      {/* ======================================================== */}
      {viewMode === "writing" && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900">Bảng Tập Viết Chữ Hán</h3>
                <p className="text-xs text-slate-500">Luyện nét bút thư pháp theo ô vuông chữ điền</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowUnderlay(!showUnderlay)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer flex items-center gap-1.5 ${
                    showUnderlay
                      ? "bg-slate-100 text-slate-700 border-slate-300"
                      : "bg-white text-slate-400 border-slate-200"
                  }`}
                >
                  {showUnderlay ? <Eye size={14} /> : <EyeOff size={14} />}
                  <span>{showUnderlay ? "Nét mờ: Bật" : "Nét mờ: Tắt"}</span>
                </button>

                <button
                  onClick={clearCanvas}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Eraser size={14} />
                  <span>Xóa bảng</span>
                </button>
              </div>
            </div>

            {/* Canvas Area with Grids */}
            <div className="relative w-full max-w-[340px] h-[340px] mx-auto bg-slate-50 rounded-3xl border-2 border-dashed border-slate-300 overflow-hidden select-none">
              {/* Traditional Kanji Grid Lines (Ô chữ điền) */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-full h-[1px] bg-red-200/60"></div>
                <div className="absolute h-full w-[1px] bg-red-200/60"></div>
                <div className="absolute inset-0 border border-red-200/40"></div>
              </div>

              {/* Faint Guide Kanji Underlay */}
              {showUnderlay && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-300/40 select-none">
                  <span
                    className="text-[230px] font-black leading-none"
                    style={{ fontFamily: "'Klee One', 'Noto Serif JP', serif" }}
                  >
                    {writingTargetChar}
                  </span>
                </div>
              )}

              {/* Drawing Canvas */}
              <canvas
                ref={canvasRef}
                width={340}
                height={340}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="absolute inset-0 cursor-crosshair touch-none"
              />
            </div>

            {/* Target Character Quick Selector */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 block">
                Chọn chữ để luyện viết từ danh sách:
              </span>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {filteredList.slice(0, 25).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setWritingTargetChar(item.displayChar);
                      clearCanvas();
                    }}
                    className={`w-11 h-11 rounded-2xl text-lg font-black shrink-0 border transition-all cursor-pointer ${
                      writingTargetChar === item.displayChar
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                        : "bg-white text-slate-800 border-slate-200 hover:border-indigo-300"
                    }`}
                  >
                    {item.displayChar}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 6. VIEW MODE 4: QUIZ MODE                                */}
      {/* ======================================================== */}
      {viewMode === "quiz" && (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Câu {quizQuestionIndex + 1} / {quizList.length}
              </span>
              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Điểm: {quizScore} / {quizQuestionIndex}
              </span>
            </div>

            {currentQuizItem && quizQuestionIndex < quizList.length ? (
              <div className="space-y-6 text-center">
                <div>
                  <span className="text-xs text-slate-400 font-bold block mb-2">
                    Âm Hán Việt tương ứng của mục này là gì?
                  </span>
                  <div
                    className="text-7xl sm:text-8xl font-black text-slate-900 tracking-tight my-4"
                    style={{ fontFamily: "'Klee One', 'Noto Serif JP', serif" }}
                  >
                    {currentQuizItem.displayChar}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    Nghĩa gợi ý: <em>{currentQuizItem.meaning}</em>
                  </div>
                </div>

                {/* 4 Options */}
                <div className="grid grid-cols-2 gap-3 text-left">
                  {quizOptions.map((opt, idx) => {
                    const isSelected = selectedAnswer === opt;
                    const isCorrect = opt === currentQuizItem.hanViet;

                    let btnStyle =
                      "bg-slate-50 border-slate-200 text-slate-800 hover:bg-indigo-50 hover:border-indigo-300";
                    if (isAnswered) {
                      if (isCorrect) {
                        btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-black";
                      } else if (isSelected) {
                        btnStyle = "bg-rose-50 border-rose-500 text-rose-950 font-bold";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectQuizAnswer(opt)}
                        disabled={isAnswered}
                        className={`p-4 rounded-2xl border-2 text-sm font-bold transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {isAnswered && isCorrect && <Check size={16} className="text-emerald-600" />}
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <div className="pt-2">
                    <button
                      onClick={handleNextQuizQuestion}
                      className="w-full py-3 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-colors cursor-pointer shadow-md"
                    >
                      {quizQuestionIndex + 1 < quizList.length ? "Câu tiếp theo →" : "Xem kết quả bài thi"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Quiz Finished Summary */
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Award size={32} />
                </div>
                <h3 className="text-xl font-black text-slate-900">Hoàn Tất Bài Trắc Nghiệm!</h3>
                <p className="text-sm text-slate-600">
                  Bạn trả lời đúng{" "}
                  <strong className="text-emerald-700 text-base">
                    {quizScore} / {quizList.length}
                  </strong>{" "}
                  câu ({Math.round((quizScore / (quizList.length || 1)) * 100)}%).
                </p>
                <div className="pt-2">
                  <button
                    onClick={startQuiz}
                    className="py-3 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-sm"
                  >
                    Làm lại lượt khác
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 7. VIEW MODE 5: MEMORIZATION GUIDE                       */}
      {/* ======================================================== */}
      {viewMode === "guide" && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Phương Pháp Trường Đông Du
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-1">
                Làm Sao Nhớ Hết 1,264 Chữ Hán Tự & Từ Vựng N3?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                    1
                  </span>
                  <span>57 Bộ Thủ Là Chìa Khóa Vàng</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Đừng học chữ Hán như một bức tranh vô nghĩa. Mọi chữ Hán phức tạp đều ghép từ các bộ thủ
                  căn bản (Nhân đứng 亻, Thủy 氵, Hỏa 灬, Mộc 木...). Nắm chắc 57 bộ thủ trong bảng Hán Tự
                  1200 giúp bạn giải mã được 90% chữ N3.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                    2
                  </span>
                  <span>Chiết Tự Hán Việt Liên Tưởng</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Tận dụng lợi thế tiếng Việt: Âm Hán Việt tương đồng trực tiếp với nghĩa từ vựng N3. Ví dụ:
                  "屋上" = Ốc Thượng = Mái/sân thượng; "玄関" = Huyền Quan = Cửa vào; "似る" = Tự = Tựa như,
                  giống nhau.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                    3
                  </span>
                  <span>Lặp Lại Ngắt Quãng (Spaced Repetition)</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Thay vì học dồn một ngày 100 chữ, hãy dùng chế độ Flashcard mỗi ngày 30 chữ. Dữ liệu đã
                  được đồng bộ lên Cloud Firestore để bạn tiếp tục ôn luyện trên mọi thiết bị di động hay
                  máy tính mà không bị mất tiến độ.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                    4
                  </span>
                  <span>Luyện Cơ Tay Bằng Bảng Vẽ (Writing)</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Não bộ ghi nhớ hình thái chữ sâu hơn gấp 3 lần khi tay bạn trực tiếp chuyển động nét bút.
                  Bảng tập viết chữ Hán trong tab này mô phỏng ô chữ điền chuẩn Nhật Bản để bạn luyện viết
                  hàng ngày.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 8. DETAIL ITEM MODAL                                     */}
      {/* ======================================================== */}
      {selectedUnifiedItem && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 border border-slate-200 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {selectedUnifiedItem.subInfo}
              </span>
              <button
                onClick={() => setSelectedUnifiedItem(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <div className="text-center py-2 space-y-2">
              <div
                className="text-7xl font-black text-slate-900"
                style={{ fontFamily: "'Klee One', 'Noto Serif JP', serif" }}
              >
                {selectedUnifiedItem.displayChar}
              </div>
              <div className="text-xl font-black text-indigo-700">
                {selectedUnifiedItem.hanViet}
              </div>
              {/* Dedicated On / Kun Deck in Modal */}
              {(selectedUnifiedItem.onyomi && selectedUnifiedItem.onyomi.length > 0) ||
              (selectedUnifiedItem.kunyomi && selectedUnifiedItem.kunyomi.length > 0) ? (
                <div className="grid grid-cols-2 gap-2 text-left pt-1">
                  <div className="p-3 bg-purple-50/70 border border-purple-200/70 rounded-2xl">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] font-extrabold text-purple-900 uppercase tracking-wider flex items-center gap-1">
                        <span>Âm On (音読み)</span>
                        <span className="text-[9px] font-normal text-purple-700">· Hiragana</span>
                      </span>
                      {selectedUnifiedItem.onyomi && selectedUnifiedItem.onyomi.length > 0 && (
                        <button
                          onClick={() => speakJapanese(selectedUnifiedItem.onyomi![0])}
                          className="text-purple-600 hover:text-purple-900 p-0.5 cursor-pointer"
                          title="Nghe âm On"
                        >
                          <Volume2 size={12} />
                        </button>
                      )}
                    </div>
                    <div className="text-sm font-black text-purple-950">
                      {selectedUnifiedItem.onyomi && selectedUnifiedItem.onyomi.length > 0
                        ? selectedUnifiedItem.onyomi.join("・")
                        : "-"}
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-50/70 border border-emerald-200/70 rounded-2xl">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] font-extrabold text-emerald-900 uppercase tracking-wider flex items-center gap-1">
                        <span>Âm Kun (訓読み)</span>
                        <span className="text-[9px] font-normal text-emerald-700">· Hiragana</span>
                      </span>
                      {selectedUnifiedItem.kunyomi && selectedUnifiedItem.kunyomi.length > 0 && (
                        <button
                          onClick={() =>
                            speakJapanese(selectedUnifiedItem.kunyomi![0].replace("・", ""))
                          }
                          className="text-emerald-600 hover:text-emerald-900 p-0.5 cursor-pointer"
                          title="Nghe âm Kun"
                        >
                          <Volume2 size={12} />
                        </button>
                      )}
                    </div>
                    <div className="text-sm font-black text-emerald-950">
                      {selectedUnifiedItem.kunyomi && selectedUnifiedItem.kunyomi.length > 0
                        ? selectedUnifiedItem.kunyomi.join("・")
                        : "-"}
                    </div>
                  </div>
                </div>
              ) : selectedUnifiedItem.reading ? (
                <div className="text-xs font-bold text-slate-500">{selectedUnifiedItem.reading}</div>
              ) : null}
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs">
              <div>
                <span className="font-bold text-slate-400 uppercase text-[10px] block">Nghĩa tiếng Việt:</span>
                <p className="text-slate-900 font-semibold text-sm mt-0.5">{selectedUnifiedItem.meaning}</p>
              </div>

              {selectedUnifiedItem.note && (
                <div>
                  <span className="font-bold text-slate-400 uppercase text-[10px] block">Ghi chú & Chiết tự:</span>
                  <p className="text-slate-700 mt-0.5">{selectedUnifiedItem.note}</p>
                </div>
              )}

              {selectedUnifiedItem.words && selectedUnifiedItem.words.length > 0 ? (
                <div className="space-y-2 pt-1 text-left">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="font-bold text-slate-500 uppercase text-[10px] block">
                      Ví dụ từ vựng ({selectedUnifiedItem.words.length}):
                    </span>
                    {/* Category filter pills */}
                    <div className="flex items-center gap-1 flex-wrap text-[10px]">
                      <button
                        onClick={() => setModalWordFilter("all")}
                        className={`px-2 py-0.5 rounded-md font-bold cursor-pointer transition-colors ${
                          modalWordFilter === "all"
                            ? "bg-slate-900 text-white"
                            : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                        }`}
                      >
                        Tất cả ({selectedUnifiedItem.words.length})
                      </button>
                      <button
                        onClick={() => setModalWordFilter("verb")}
                        className={`px-2 py-0.5 rounded-md font-bold cursor-pointer transition-colors ${
                          modalWordFilter === "verb"
                            ? "bg-blue-600 text-white"
                            : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                        }`}
                      >
                        Động từ ({selectedUnifiedItem.words.filter((w) => w.pos === "verb").length})
                      </button>
                      <button
                        onClick={() => setModalWordFilter("noun")}
                        className={`px-2 py-0.5 rounded-md font-bold cursor-pointer transition-colors ${
                          modalWordFilter === "noun"
                            ? "bg-indigo-600 text-white"
                            : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                        }`}
                      >
                        Danh từ ({selectedUnifiedItem.words.filter((w) => w.pos === "noun").length})
                      </button>
                      <button
                        onClick={() => setModalWordFilter("kun")}
                        className={`px-2 py-0.5 rounded-md font-bold cursor-pointer transition-colors ${
                          modalWordFilter === "kun"
                            ? "bg-emerald-600 text-white"
                            : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        }`}
                      >
                        Âm Kun ({selectedUnifiedItem.words.filter((w) => w.readingType === "kun").length})
                      </button>
                      <button
                        onClick={() => setModalWordFilter("on")}
                        className={`px-2 py-0.5 rounded-md font-bold cursor-pointer transition-colors ${
                          modalWordFilter === "on"
                            ? "bg-purple-600 text-white"
                            : "bg-purple-50 text-purple-700 hover:bg-purple-100"
                        }`}
                      >
                        Âm On ({selectedUnifiedItem.words.filter((w) => w.readingType === "on").length})
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                    {selectedUnifiedItem.words
                      .filter((w) => {
                        if (modalWordFilter === "verb") return w.pos === "verb";
                        if (modalWordFilter === "noun") return w.pos === "noun";
                        if (modalWordFilter === "kun") return w.readingType === "kun";
                        if (modalWordFilter === "on") return w.readingType === "on";
                        return true;
                      })
                      .map((w, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs hover:border-slate-300 transition-colors shadow-2xs"
                        >
                          <div className="min-w-0 pr-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-black text-slate-900">{w.word}</span>
                              <span className="text-[11px] text-slate-500 font-medium">({w.reading})</span>
                              {w.pos === "verb" && (
                                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-800">
                                  Động từ
                                </span>
                              )}
                              {w.pos === "noun" && (
                                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800">
                                  Danh từ
                                </span>
                              )}
                              {w.pos === "adj" && (
                                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-900">
                                  Tính từ
                                </span>
                              )}
                              {w.readingType === "kun" && (
                                <span className="text-[9px] font-semibold px-1 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  Kun
                                </span>
                              )}
                              {w.readingType === "on" && (
                                <span className="text-[9px] font-semibold px-1 py-0.2 rounded bg-purple-50 text-purple-700 border border-purple-200">
                                  On
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-600 mt-0.5 line-clamp-1">{w.meaning}</div>
                          </div>
                          <button
                            onClick={() => speakJapanese(w.reading)}
                            className="text-slate-400 hover:text-indigo-600 p-1.5 rounded-lg hover:bg-slate-50 shrink-0 cursor-pointer"
                            title="Phát âm từ"
                          >
                            <Volume2 size={14} />
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              ) : selectedUnifiedItem.example ? (
                <div>
                  <span className="font-bold text-slate-400 uppercase text-[10px] block">Ví dụ câu & Từ ghép:</span>
                  <p className="text-slate-700 mt-0.5 font-medium">{selectedUnifiedItem.example}</p>
                </div>
              ) : null}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => speakJapanese(selectedUnifiedItem.displayChar)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Volume2 size={15} />
                <span>Phát âm</span>
              </button>

              <button
                onClick={() => {
                  setWritingTargetChar(selectedUnifiedItem.displayChar);
                  setViewMode("writing");
                  setSelectedUnifiedItem(null);
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer border border-indigo-200"
              >
                <Edit3 size={15} />
                <span>Tập viết chữ</span>
              </button>

              <button
                onClick={() => {
                  toggleMastered(selectedUnifiedItem.id);
                }}
                className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer ${
                  masteredIds.includes(selectedUnifiedItem.id)
                    ? "bg-emerald-600 text-white"
                    : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                }`}
              >
                <Check size={15} />
                <span>{masteredIds.includes(selectedUnifiedItem.id) ? "Đã thuộc" : "Đánh dấu"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 9. ORIGINAL PAPER SHEET COMPARISON MODAL                 */}
      {/* ======================================================== */}
      {showOriginalImageModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-slate-900">
                  Đối Chiếu Bảng In Gốc Trường Đông Du (漢字・初中級)
                </h3>
                <p className="text-xs text-slate-500">
                  Hình ảnh tờ giấy bài tập chữ Hán Sơ Trung Cấp 100 chữ (10 cột x 10 hàng)
                </p>
              </div>
              <button
                onClick={() => setShowOriginalImageModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4 bg-slate-900/5 flex items-center justify-center">
              <img
                src="/grid_zoomed.png"
                alt="Bảng in 100 chữ Hán Tự Đông Du"
                className="max-w-full max-h-[70vh] rounded-xl shadow-lg border border-slate-200 object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Dedicated Cronjob & Firestore Sync Modal */}
      <FirestoreSyncModal
        isOpen={showCronModal}
        onClose={() => setShowCronModal(false)}
        defaultTab="cron"
      />
    </div>
  );
}
