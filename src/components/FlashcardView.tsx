import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Star,
  CheckCircle,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { VocabularyItem } from "../data/vocabulary";
import { useAuth } from "../context/AuthContext";

interface FlashcardViewProps {
  data: VocabularyItem[];
  onLookupWord: (word: string) => void;
}

export function FlashcardView({ data, onLookupWord }: FlashcardViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const { starredWordIds, toggleStarWord, masteredWordIds, toggleMasteredWord } = useAuth();

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 min-h-[480px] flex flex-col items-center justify-center">
        <p className="text-slate-500 text-sm">Không có từ vựng nào trong bài học này.</p>
      </div>
    );
  }

  const safeIndex = Math.min(currentIndex, data.length - 1);
  const currentWord = data[safeIndex];
  const isStarred = starredWordIds.includes(String(currentWord.id));
  const isMastered = masteredWordIds.includes(String(currentWord.id));

  // Calculate mastery progress in current filtered list
  const currentMasteredCount = data.filter((item) =>
    masteredWordIds.includes(String(item.id)),
  ).length;
  const progressPercent = Math.round((currentMasteredCount / data.length) * 100);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
    }, 150);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex(Math.floor(Math.random() * data.length));
    }, 150);
  };

  const handleSelectCard = (index: number) => {
    setIsFlipped(false);
    setCurrentIndex(index);
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left 2 Cols: Main Flashcard Stage */}
      <div className="lg:col-span-2 flex flex-col items-center">
        {/* Top status bar */}
        <div className="w-full flex items-center justify-between mb-4">
          <div className="text-xs font-semibold text-slate-600 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-xs flex items-center gap-1.5">
            <span className="font-bold text-indigo-700">Thẻ {safeIndex + 1}</span>
            <span className="text-slate-400">/</span>
            <span>{data.length}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Star toggle button */}
            <button
              onClick={() => toggleStarWord(String(currentWord.id))}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isStarred
                  ? "bg-amber-50 border-amber-300 text-amber-700"
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
              title="Lưu vào danh sách cần ôn (Firestore)"
            >
              <Star size={15} className={isStarred ? "fill-amber-400 text-amber-500" : ""} />
              <span>{isStarred ? "Đã lưu" : "Lưu từ"}</span>
            </button>

            {/* Mastered toggle button */}
            <button
              onClick={() => toggleMasteredWord(String(currentWord.id))}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isMastered
                  ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
              title="Đánh dấu đã thuộc (Firestore)"
            >
              <CheckCircle size={15} className={isMastered ? "text-emerald-600" : ""} />
              <span>{isMastered ? "Đã thuộc" : "Đánh dấu thuộc"}</span>
            </button>
          </div>
        </div>

        {/* Flippable Card Container */}
        <div
          className="w-full min-h-[380px] sm:min-h-[420px] aspect-[16/10] perspective-1000 cursor-pointer select-none"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div
            className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
              isFlipped ? "rotate-y-180" : ""
            }`}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front Face: Kanji / Word */}
            <div
              className="absolute inset-0 w-full h-full bg-white rounded-3xl shadow-sm border border-slate-200 flex flex-col items-center justify-between p-8 backface-hidden"
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className="w-full flex justify-between items-center text-xs text-slate-400">
                <span className="bg-slate-100 px-2.5 py-1 rounded-md text-slate-600 font-semibold">
                  {currentWord.type}
                </span>
                <span>Bài {currentWord.lesson}</span>
              </div>

              <div className="my-auto text-center">
                <div className="text-5xl sm:text-7xl font-extrabold text-indigo-950 tracking-tight mb-3">
                  {currentWord.word}
                </div>
                <div className="text-slate-400 font-semibold tracking-wider text-xs uppercase">
                  Chạm để lật thẻ xem nghĩa
                </div>
              </div>

              <div className="w-full text-center text-xs text-slate-400">
                Nhấn vào thẻ để xem nghĩa, Hán Việt và ví dụ minh họa
              </div>
            </div>

            {/* Back Face: Meaning & Example */}
            <div
              className="absolute inset-0 w-full h-full bg-indigo-600 rounded-3xl shadow-sm flex flex-col items-center justify-between p-8 backface-hidden rotate-y-180 text-white"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div className="w-full flex justify-between items-center text-xs text-indigo-200">
                <span>Nghĩa & Ví dụ</span>
                <span>Bài {currentWord.lesson}</span>
              </div>

              <div className="my-auto text-center max-w-lg">
                <div className="text-3xl sm:text-4xl font-extrabold mb-1">
                  {currentWord.meaning}
                </div>
                {currentWord.hanViet && (
                  <div className="text-base text-indigo-200 mb-4 font-semibold tracking-wide">
                    Hán Việt: {currentWord.hanViet}
                  </div>
                )}
                <div className="bg-indigo-700/60 rounded-2xl p-4 text-center border border-indigo-500/30">
                  <div className="text-indigo-200 text-xs mb-1 font-medium">Ví dụ minh họa:</div>
                  <div className="text-base sm:text-lg text-white font-medium">
                    {currentWord.example}
                  </div>
                </div>
              </div>

              {/* Quick AI Search Trigger */}
              <div className="w-full flex justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLookupWord(currentWord.word);
                  }}
                  className="px-4 py-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold rounded-full flex items-center gap-1.5 border border-white/20 transition-colors"
                >
                  <Sparkles size={14} className="text-amber-300" />
                  <span>Hỏi AI Sensei (Google Search)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors shadow-xs cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleShuffle}
            className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw size={14} />
            <span>Trộn thẻ</span>
          </button>
          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors shadow-xs cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Right 1 Col: Deck Word List & Quick Jump (Standardized Width) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col h-[520px]">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <BookOpen size={16} className="text-indigo-600" />
            <span>Danh sách từ trong thẻ</span>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            {data.length} từ
          </span>
        </div>

        {/* Progress Bar */}
        <div className="py-3 border-b border-slate-100">
          <div className="flex justify-between text-xs mb-1.5 font-medium">
            <span className="text-slate-500">Tiến độ đã thuộc</span>
            <span className="text-indigo-700 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Scrollable list of cards with quick click */}
        <div className="flex-1 overflow-y-auto pr-1 py-2 space-y-1.5">
          {data.map((item, idx) => {
            const isSelected = idx === safeIndex;
            const itemStarred = starredWordIds.includes(String(item.id));
            const itemMastered = masteredWordIds.includes(String(item.id));

            return (
              <button
                key={item.id}
                onClick={() => handleSelectCard(idx)}
                className={`w-full p-2.5 rounded-xl text-left transition-all flex items-center justify-between text-xs cursor-pointer ${
                  isSelected
                    ? "bg-indigo-50 border border-indigo-200 text-indigo-950 font-bold"
                    : "hover:bg-slate-50 text-slate-700 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="text-slate-400 text-[11px] w-5 text-right">
                    {idx + 1}.
                  </span>
                  <span className="font-bold truncate">{item.word}</span>
                  <span className="text-slate-400 font-normal truncate hidden sm:inline">
                    - {item.meaning}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  {itemStarred && (
                    <Star size={12} className="fill-amber-400 text-amber-500" />
                  )}
                  {itemMastered && (
                    <CheckCircle size={13} className="text-emerald-600" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
