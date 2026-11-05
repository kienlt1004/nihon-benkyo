import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  tuVungN3SouMatomeData,
  TuVungN3SouMatomeItem,
} from "../data/tuVungN3SouMatome";
import {
  Volume2,
  Search,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  CheckCircle2,
  Bookmark,
  Sparkles,
  Layers,
  List,
  CheckSquare,
  BookOpen,
  Filter,
  X,
  VolumeX,
} from "lucide-react";

interface N3VocabLearningViewProps {
  onLookupWord?: (word: string) => void;
}

export function N3VocabLearningView({ onLookupWord }: N3VocabLearningViewProps) {
  // Navigation / View state
  const [subMode, setSubMode] = useState<"list" | "flashcard" | "quiz">("list");
  const [selectedWeek, setSelectedWeek] = useState<number | "all">("all");
  const [selectedDay, setSelectedDay] = useState<number | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Flashcard state
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [autoPlayAudio, setAutoPlayAudio] = useState(true);
  const [isShuffled, setIsShuffled] = useState(false);
  const [cardOrder, setCardOrder] = useState<number[]>([]);

  // Quiz state
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [wrongItemIds, setWrongItemIds] = useState<string[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  // Local saved state (Mastered / Starred)
  const [learnedIds, setLearnedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem("n3_soumatome_learned");
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [starredIds, setStarredIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem("n3_soumatome_starred");
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        "n3_soumatome_learned",
        JSON.stringify(Array.from(learnedIds))
      );
    } catch {}
  }, [learnedIds]);

  useEffect(() => {
    try {
      localStorage.setItem(
        "n3_soumatome_starred",
        JSON.stringify(Array.from(starredIds))
      );
    } catch {}
  }, [starredIds]);

  // Audio speech synthesis helper
  const speakJapanese = (text: string) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  // Filtered dataset
  const filteredData = useMemo(() => {
    return tuVungN3SouMatomeData.filter((item) => {
      if (selectedWeek !== "all" && item.week !== selectedWeek) return false;
      if (selectedDay !== "all" && item.day !== selectedDay) return false;
      if (selectedCategory !== "all" && item.category !== selectedCategory)
        return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchJp = item.japanese.toLowerCase().includes(q);
        const matchHira = item.hiragana.toLowerCase().includes(q);
        const matchVi = item.vietnamese.toLowerCase().includes(q);
        const matchCat = item.category.toLowerCase().includes(q);
        return matchJp || matchHira || matchVi || matchCat;
      }
      return true;
    });
  }, [selectedWeek, selectedDay, selectedCategory, searchQuery]);

  // Distinct categories based on current week/day selection
  const categories = useMemo(() => {
    const list = tuVungN3SouMatomeData
      .filter((item) => {
        if (selectedWeek !== "all" && item.week !== selectedWeek) return false;
        if (selectedDay !== "all" && item.day !== selectedDay) return false;
        return true;
      })
      .map((item) => item.category);
    return Array.from(new Set(list)).sort();
  }, [selectedWeek, selectedDay]);

  // Prepare Flashcard order
  useEffect(() => {
    const indices = Array.from({ length: filteredData.length }, (_, i) => i);
    if (isShuffled) {
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
    }
    setCardOrder(indices);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  }, [filteredData, isShuffled]);

  const currentFlashcard = useMemo(() => {
    if (filteredData.length === 0) return null;
    const actualIndex = cardOrder[currentCardIndex] ?? 0;
    return filteredData[actualIndex] || filteredData[0];
  }, [filteredData, cardOrder, currentCardIndex]);

  // Flashcard controls
  const handleNextCard = () => {
    if (currentCardIndex < filteredData.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
      setIsFlipped(false);
      if (autoPlayAudio) {
        const nextIdx = cardOrder[currentCardIndex + 1];
        if (filteredData[nextIdx]) {
          speakJapanese(filteredData[nextIdx].japanese);
        }
      }
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prev) => prev - 1);
      setIsFlipped(false);
      if (autoPlayAudio) {
        const prevIdx = cardOrder[currentCardIndex - 1];
        if (filteredData[prevIdx]) {
          speakJapanese(filteredData[prevIdx].japanese);
        }
      }
    }
  };

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped && autoPlayAudio && currentFlashcard) {
      speakJapanese(currentFlashcard.hiragana);
    }
  };

  const toggleLearned = (id: string) => {
    setLearnedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleStarred = (id: string) => {
    setStarredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // -------------------------------------------------------------
  // QUIZ ENGINE
  // -------------------------------------------------------------
  const quizItems = useMemo(() => {
    return filteredData.length > 4
      ? filteredData
      : tuVungN3SouMatomeData.slice(0, 50);
  }, [filteredData]);

  const currentQuizItem = quizItems[quizQuestionIndex] || quizItems[0];

  // Generate 4 randomized options
  const quizOptions = useMemo(() => {
    if (!currentQuizItem) return [];
    const wrongPool = tuVungN3SouMatomeData
      .filter((i) => i.id !== currentQuizItem.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const combined = [currentQuizItem, ...wrongPool].sort(
      () => Math.random() - 0.5
    );
    return combined;
  }, [currentQuizItem]);

  const handleSelectQuizOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
    setIsAnswerSubmitted(true);

    const isCorrect = quizOptions[index]?.id === currentQuizItem.id;
    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
      setLearnedIds((prev) => new Set(prev).add(currentQuizItem.id));
    } else {
      setWrongItemIds((prev) => [...prev, currentQuizItem.id]);
    }
  };

  const handleNextQuizQuestion = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    if (quizQuestionIndex < quizItems.length - 1) {
      setQuizQuestionIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setQuizQuestionIndex(0);
    setQuizScore(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setWrongItemIds([]);
    setQuizFinished(false);
  };

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      {/* ------------------------------------------------------- */}
      {/* 1. HERO / STATS HEADER & MODE SWITCHER                  */}
      {/* ------------------------------------------------------- */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2 py-0.5 rounded-md">
                Sou Matome N3 Goi
              </span>
              <span className="text-xs text-slate-400 font-medium">·</span>
              <span className="text-xs text-slate-500 font-medium">
                14 trang giáo trình số hóa
              </span>
            </div>
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
              Từ Vựng N3 Sou Matome
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Tổng hợp {tuVungN3SouMatomeData.length} từ vựng, biểu thức và ví dụ
              thực tế từ Tuần 1 (Việc nhà) & Tuần 2 (Ra ngoài).
            </p>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-3 self-start md:self-center">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>
                Đã thuộc:{" "}
                <strong className="text-emerald-700 tabular-nums">
                  {learnedIds.size}
                </strong>
                /{tuVungN3SouMatomeData.length}
              </span>
              <span className="text-slate-300">·</span>
              <span>
                Đã lưu:{" "}
                <strong className="text-amber-700 tabular-nums">
                  {starredIds.size}
                </strong>
              </span>
            </div>
          </div>
        </div>

        {/* Mode Switcher Buttons (iPhone 12+ thumb-friendly) */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
          <div className="inline-flex p-1 bg-slate-100 rounded-xl w-full sm:w-auto">
            <button
              onClick={() => setSubMode("list")}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                subMode === "list"
                  ? "bg-white text-indigo-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <List size={15} />
              <span>Danh Sách ({filteredData.length})</span>
            </button>

            <button
              onClick={() => {
                setSubMode("flashcard");
                setIsFlipped(false);
              }}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                subMode === "flashcard"
                  ? "bg-white text-indigo-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Layers size={15} />
              <span>Flashcard</span>
            </button>

            <button
              onClick={() => {
                setSubMode("quiz");
                restartQuiz();
              }}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                subMode === "quiz"
                  ? "bg-white text-indigo-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <CheckSquare size={15} />
              <span>Trắc Nghiệm</span>
            </button>
          </div>

          {/* Quick Search on Desktop & Mobile */}
          <div className="relative w-full sm:w-64">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm Kanji, Hiragana, nghĩa..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------- */}
      {/* 2. FILTER STRIP (Tuần & Ngày - Horizontal Mobile Scroll) */}
      {/* ------------------------------------------------------- */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-4 shadow-xs space-y-2.5">
        {/* Week Selector */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Tuần:
          </span>
          <button
            onClick={() => {
              setSelectedWeek("all");
              setSelectedDay("all");
              setSelectedCategory("all");
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
              selectedWeek === "all"
                ? "bg-indigo-600 text-white shadow-2xs"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
          >
            Tất cả tuần (T1 + T2)
          </button>

          <button
            onClick={() => {
              setSelectedWeek(1);
              setSelectedDay("all");
              setSelectedCategory("all");
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
              selectedWeek === 1
                ? "bg-indigo-600 text-white shadow-2xs"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
          >
            Tuần 1: 家事 (Việc nhà · 170 từ)
          </button>

          <button
            onClick={() => {
              setSelectedWeek(2);
              setSelectedDay("all");
              setSelectedCategory("all");
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
              selectedWeek === 2
                ? "bg-indigo-600 text-white shadow-2xs"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
          >
            Tuần 2: 外出 (Ra ngoài & Đi tàu · 102 từ)
          </button>
        </div>

        {/* Day Selector Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Ngày:
          </span>
          <button
            onClick={() => setSelectedDay("all")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap cursor-pointer transition-colors shrink-0 ${
              selectedDay === "all"
                ? "bg-slate-800 text-white font-bold"
                : "bg-slate-100 hover:bg-slate-200 text-slate-600"
            }`}
          >
            Tất cả ngày
          </button>

          {(selectedWeek === "all" || selectedWeek === 1) && (
            <>
              <button
                onClick={() => {
                  setSelectedWeek(1);
                  setSelectedDay(1);
                }}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap cursor-pointer transition-colors shrink-0 ${
                  selectedWeek === 1 && selectedDay === 1
                    ? "bg-indigo-600 text-white font-bold"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                }`}
              >
                T1-N1: Nhà cửa
              </button>
              <button
                onClick={() => {
                  setSelectedWeek(1);
                  setSelectedDay(2);
                }}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap cursor-pointer transition-colors shrink-0 ${
                  selectedWeek === 1 && selectedDay === 2
                    ? "bg-indigo-600 text-white font-bold"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                }`}
              >
                T1-N2,3: Nấu ăn
              </button>
              <button
                onClick={() => {
                  setSelectedWeek(1);
                  setSelectedDay(4);
                }}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap cursor-pointer transition-colors shrink-0 ${
                  selectedWeek === 1 && selectedDay === 4
                    ? "bg-indigo-600 text-white font-bold"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                }`}
              >
                T1-N4: Dọn dẹp & Rác
              </button>
              <button
                onClick={() => {
                  setSelectedWeek(1);
                  setSelectedDay(5);
                }}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap cursor-pointer transition-colors shrink-0 ${
                  selectedWeek === 1 && selectedDay === 5
                    ? "bg-indigo-600 text-white font-bold"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                }`}
              >
                T1-N5: Giặt giũ
              </button>
              <button
                onClick={() => {
                  setSelectedWeek(1);
                  setSelectedDay(6);
                }}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap cursor-pointer transition-colors shrink-0 ${
                  selectedWeek === 1 && selectedDay === 6
                    ? "bg-indigo-600 text-white font-bold"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                }`}
              >
                T1-N6: Nuôi con & Thú
              </button>
            </>
          )}

          {(selectedWeek === "all" || selectedWeek === 2) && (
            <>
              <button
                onClick={() => {
                  setSelectedWeek(2);
                  setSelectedDay(1);
                }}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap cursor-pointer transition-colors shrink-0 ${
                  selectedWeek === 2 && selectedDay === 1
                    ? "bg-indigo-600 text-white font-bold"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                }`}
              >
                T2-N1: Kế hoạch
              </button>
              <button
                onClick={() => {
                  setSelectedWeek(2);
                  setSelectedDay(2);
                }}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap cursor-pointer transition-colors shrink-0 ${
                  selectedWeek === 2 && selectedDay === 2
                    ? "bg-indigo-600 text-white font-bold"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                }`}
              >
                T2-N2: Đi tàu & Khách sạn
              </button>
              <button
                onClick={() => {
                  setSelectedWeek(2);
                  setSelectedDay(3);
                }}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap cursor-pointer transition-colors shrink-0 ${
                  selectedWeek === 2 && selectedDay === 3
                    ? "bg-indigo-600 text-white font-bold"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                }`}
              >
                T2-N3: Vé & Sân ga
              </button>
            </>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------- */}
      {/* 3. SUBMODE 1: DANH SÁCH (LIST VIEW)                     */}
      {/* ------------------------------------------------------- */}
      {subMode === "list" && (
        <div className="space-y-3">
          {filteredData.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
              <BookOpen size={36} className="mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-semibold">
                Không tìm thấy từ vựng nào khớp với bộ lọc.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedWeek("all");
                  setSelectedDay("all");
                  setSelectedCategory("all");
                }}
                className="mt-3 px-4 py-2 text-xs font-bold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
              >
                Xóa tất cả bộ lọc
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredData.map((item) => {
                const isLearned = learnedIds.has(item.id);
                const isStarred = starredIds.has(item.id);

                return (
                  <div
                    key={item.id}
                    className={`bg-white rounded-2xl border p-4 transition-all flex flex-col justify-between shadow-2xs hover:shadow-sm ${
                      isLearned
                        ? "border-emerald-200 bg-emerald-50/20"
                        : "border-slate-200/90 hover:border-indigo-200"
                    }`}
                  >
                    <div>
                      {/* Top meta tags */}
                      <div className="flex items-center justify-between gap-2 mb-2 text-[11px] text-slate-400 font-medium">
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
                            T{item.week}-N{item.day}
                          </span>
                          <span>·</span>
                          <span className="truncate">{item.category}</span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => toggleStarred(item.id)}
                            className="p-1 text-slate-400 hover:text-amber-500 transition-colors cursor-pointer"
                            title={isStarred ? "Bỏ lưu" : "Lưu từ"}
                          >
                            <Bookmark
                              size={15}
                              className={
                                isStarred
                                  ? "fill-amber-400 text-amber-500"
                                  : ""
                              }
                            />
                          </button>
                          <button
                            onClick={() => toggleLearned(item.id)}
                            className="p-1 text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer"
                            title={isLearned ? "Đã thuộc" : "Đánh dấu đã thuộc"}
                          >
                            <CheckCircle2
                              size={16}
                              className={
                                isLearned
                                  ? "fill-emerald-500 text-white"
                                  : ""
                              }
                            />
                          </button>
                        </div>
                      </div>

                      {/* Japanese Word + Furigana */}
                      <div className="flex items-baseline justify-between gap-2">
                        <div>
                          <div className="text-xs text-indigo-600 font-semibold tracking-wide">
                            {item.hiragana}
                          </div>
                          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                            {item.japanese}
                          </h3>
                        </div>

                        {/* Audio Speak Button */}
                        <button
                          onClick={() => speakJapanese(item.japanese)}
                          className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 border border-slate-200 transition-colors cursor-pointer shrink-0"
                          title="Nghe phát âm"
                        >
                          <Volume2 size={18} />
                        </button>
                      </div>

                      {/* Vietnamese Meaning */}
                      <p className="mt-2 text-sm font-bold text-slate-800 leading-snug">
                        {item.vietnamese}
                      </p>

                      {/* Example sentence if available */}
                      {item.exampleSentence && (
                        <div className="mt-3 p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 text-xs text-slate-600 space-y-1">
                          <p className="font-medium text-slate-800">
                            {item.exampleSentence}
                          </p>
                          {item.exampleMeaning && (
                            <p className="text-slate-500 text-[11px]">
                              {item.exampleMeaning}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Bottom AI Lookup Prompt */}
                    {onLookupWord && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-end">
                        <button
                          onClick={() => onLookupWord(item.japanese)}
                          className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                        >
                          <Sparkles size={12} />
                          <span>Tra cứu AI Grounding</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------- */}
      {/* 4. SUBMODE 2: FLASHCARD VIEW (iPhone 12+ Thumb Friendly) */}
      {/* ------------------------------------------------------- */}
      {subMode === "flashcard" && (
        <div className="max-w-xl mx-auto space-y-4">
          {/* Flashcard Card Container */}
          {currentFlashcard ? (
            <div className="space-y-4">
              {/* Progress counter */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
                <span>
                  Thẻ {currentCardIndex + 1} / {filteredData.length}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsShuffled(!isShuffled)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 border cursor-pointer transition-colors ${
                      isShuffled
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-slate-600 border-slate-200"
                    }`}
                  >
                    <Shuffle size={13} />
                    <span>Trộn thẻ</span>
                  </button>

                  <button
                    onClick={() => setAutoPlayAudio(!autoPlayAudio)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 border cursor-pointer transition-colors ${
                      autoPlayAudio
                        ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                        : "bg-white text-slate-400 border-slate-200"
                    }`}
                  >
                    {autoPlayAudio ? <Volume2 size={13} /> : <VolumeX size={13} />}
                    <span>Phát âm</span>
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full transition-all duration-300"
                  style={{
                    width: `${
                      ((currentCardIndex + 1) / filteredData.length) * 100
                    }%`,
                  }}
                ></div>
              </div>

              {/* 3D Interactive Card (Tap to flip) */}
              <div
                onClick={handleFlipCard}
                className="w-full min-h-[300px] sm:min-h-[340px] bg-white rounded-3xl border-2 border-indigo-100 p-6 sm:p-8 flex flex-col justify-between shadow-md hover:shadow-lg transition-all cursor-pointer relative select-none"
              >
                {/* Card Top Meta */}
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span className="font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2 py-0.5 rounded-md">
                    Tuần {currentFlashcard.week} · Ngày {currentFlashcard.day} (
                    {currentFlashcard.category})
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStarred(currentFlashcard.id);
                      }}
                      className="p-1.5 text-slate-400 hover:text-amber-500 cursor-pointer"
                    >
                      <Bookmark
                        size={18}
                        className={
                          starredIds.has(currentFlashcard.id)
                            ? "fill-amber-400 text-amber-500"
                            : ""
                        }
                      />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLearned(currentFlashcard.id);
                      }}
                      className="p-1.5 text-slate-400 hover:text-emerald-600 cursor-pointer"
                    >
                      <CheckCircle2
                        size={19}
                        className={
                          learnedIds.has(currentFlashcard.id)
                            ? "fill-emerald-500 text-white"
                            : ""
                        }
                      />
                    </button>
                  </div>
                </div>

                {/* Card Center Content */}
                <div className="my-auto text-center py-4">
                  {!isFlipped ? (
                    /* Front side: Kanji / Japanese */
                    <div className="space-y-3">
                      <div className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                        {currentFlashcard.japanese}
                      </div>
                      <div className="text-xs text-slate-400 font-medium">
                        Chạm vào thẻ để xem Hiragana & Nghĩa tiếng Việt
                      </div>
                    </div>
                  ) : (
                    /* Back side: Hiragana, Meaning, Example */
                    <div className="space-y-3 animate-in fade-in zoom-in-95 duration-150">
                      <div className="text-base sm:text-lg font-bold text-indigo-600">
                        {currentFlashcard.hiragana}
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                        {currentFlashcard.vietnamese}
                      </div>
                      {currentFlashcard.exampleSentence && (
                        <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 text-left">
                          <p className="font-semibold text-slate-900">
                            {currentFlashcard.exampleSentence}
                          </p>
                          {currentFlashcard.exampleMeaning && (
                            <p className="text-slate-500 text-xs mt-0.5">
                              {currentFlashcard.exampleMeaning}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Bottom: Flip hint & Audio trigger */}
                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1 text-indigo-600 font-bold">
                    <RotateCw size={13} />
                    <span>Lật thẻ</span>
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakJapanese(currentFlashcard.japanese);
                    }}
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 transition-colors"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>
              </div>

              {/* Bottom Thumb-Friendly Nav Controls */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={handlePrevCard}
                  disabled={currentCardIndex === 0}
                  className="min-h-[48px] px-4 py-3 rounded-xl border border-slate-200 bg-white font-bold text-xs sm:text-sm text-slate-700 flex items-center justify-center gap-1.5 shadow-xs hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronLeft size={18} />
                  <span>Từ trước</span>
                </button>

                <button
                  onClick={handleFlipCard}
                  className="min-h-[48px] px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <RotateCw size={17} />
                  <span>{isFlipped ? "Mặt trước" : "Lật nghĩa"}</span>
                </button>

                <button
                  onClick={handleNextCard}
                  disabled={currentCardIndex === filteredData.length - 1}
                  className="min-h-[48px] px-4 py-3 rounded-xl border border-slate-200 bg-white font-bold text-xs sm:text-sm text-slate-700 flex items-center justify-center gap-1.5 shadow-xs hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <span>Tiếp theo</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
              <p className="text-sm">Không có thẻ nào phù hợp.</p>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------- */}
      {/* 5. SUBMODE 3: QUIZ TRẮC NGHIỆM (1 Cột Tối Ưu iPhone 12+)  */}
      {/* ------------------------------------------------------- */}
      {subMode === "quiz" && (
        <div className="max-w-xl mx-auto space-y-4">
          {!quizFinished ? (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-6 shadow-xs space-y-5">
              {/* Quiz Header & Progress */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>
                  Câu hỏi {quizQuestionIndex + 1} / {quizItems.length}
                </span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-bold">
                  Điểm: {quizScore}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full transition-all duration-300"
                  style={{
                    width: `${
                      ((quizQuestionIndex + 1) / quizItems.length) * 100
                    }%`,
                  }}
                ></div>
              </div>

              {/* Question Box */}
              <div className="text-center py-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded">
                  Từ vựng N3 Sou Matome
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2">
                  {currentQuizItem?.japanese}
                </h2>
                <div className="text-sm font-semibold text-indigo-600 mt-1">
                  {currentQuizItem?.hiragana}
                </div>
                <button
                  onClick={() => speakJapanese(currentQuizItem?.japanese)}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 cursor-pointer"
                >
                  <Volume2 size={14} />
                  <span>Nghe phát âm</span>
                </button>
              </div>

              {/* 4 Choices (1 column on iPhone 12, touch target >= 44px) */}
              <div className="space-y-2.5">
                {quizOptions.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = opt.id === currentQuizItem.id;

                  let btnStyle =
                    "bg-white border-slate-200 hover:bg-slate-50 text-slate-800";
                  if (isAnswerSubmitted) {
                    if (isCorrect) {
                      btnStyle =
                        "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-2 ring-emerald-500/20";
                    } else if (isSelected && !isCorrect) {
                      btnStyle =
                        "bg-rose-50 border-rose-500 text-rose-900 font-bold ring-2 ring-rose-500/20";
                    } else {
                      btnStyle = "bg-white border-slate-200 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectQuizOption(idx)}
                      disabled={isAnswerSubmitted}
                      className={`w-full min-h-[48px] p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold">
                          {opt.vietnamese}
                        </span>
                      </div>
                      {isAnswerSubmitted && isCorrect && (
                        <CheckCircle2
                          size={18}
                          className="text-emerald-600 shrink-0"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Next Question Button */}
              {isAnswerSubmitted && (
                <button
                  onClick={handleNextQuizQuestion}
                  className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <span>
                    {quizQuestionIndex < quizItems.length - 1
                      ? "Câu tiếp theo"
                      : "Xem kết quả"}
                  </span>
                  <ChevronRight size={16} />
                </button>
              )}
            </div>
          ) : (
            /* Quiz Completed Summary */
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 size={36} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  Hoàn Thành Bài Kiểm Tra!
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Bạn đã trả lời đúng{" "}
                  <strong className="text-emerald-600 text-base">
                    {quizScore}
                  </strong>{" "}
                  trên tổng số{" "}
                  <strong className="text-slate-800">{quizItems.length}</strong>{" "}
                  câu hỏi.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                Tỷ lệ chính xác:{" "}
                <strong className="text-indigo-700 text-sm">
                  {Math.round((quizScore / quizItems.length) * 100)}%
                </strong>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={restartQuiz}
                  className="flex-1 min-h-[44px] py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
                >
                  Làm lại bài kiểm tra
                </button>
                <button
                  onClick={() => setSubMode("list")}
                  className="min-h-[44px] py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  Xem danh sách
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
