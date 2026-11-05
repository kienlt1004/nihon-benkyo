/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { n4Vocabulary } from "./data/vocabulary";
import { n4Grammar } from "./data/grammar";
import { AppMode } from "./types";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { ListView } from "./components/ListView";
import { FlashcardView } from "./components/FlashcardView";
import { QuizView } from "./components/QuizView";
import { GrammarView } from "./components/GrammarView";
import { AiSearchLookup } from "./components/AiSearchLookup";
import { LiveVoiceKaiwa } from "./components/LiveVoiceKaiwa";
import { ListeningView } from "./components/ListeningView";
import { PersonalReviewView } from "./components/PersonalReviewView";
import { KanjiLearningView } from "./components/KanjiLearningView";
import { Cloud, Star, CheckCircle, Sparkles, Radio } from "lucide-react";

function MainApp() {
  const [mode, setMode] = useState<AppMode>("list");
  const [selectedLesson, setSelectedLesson] = useState<number | "all">("all");
  const [lookupTargetWord, setLookupTargetWord] = useState<string>("");

  const { starredWordIds, masteredWordIds } = useAuth();

  // Filter data based on selected lesson
  const filteredData =
    selectedLesson === "all"
      ? n4Vocabulary
      : n4Vocabulary.filter((item) => item.lesson === selectedLesson);

  const lessons = Array.from(
    new Set(n4Vocabulary.map((item) => item.lesson)),
  ).sort((a, b) => a - b);

  const handleLookupWord = (word: string) => {
    setLookupTargetWord(word);
    setMode("ai-search");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar
        mode={mode}
        setMode={setMode}
        selectedLesson={selectedLesson}
        setSelectedLesson={setSelectedLesson}
        lessons={lessons}
        onOpenWordLookup={handleLookupWord}
      />

      <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {/* Section title & Subtext */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-h-[52px]">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {mode === "list" &&
                (selectedLesson === "all"
                  ? "Tất cả từ vựng N4"
                  : selectedLesson === 35
                  ? "Từ vựng N4 - Đề 30 (Dora Nihongo)"
                  : `Từ vựng N4 - Bài ${selectedLesson}`)}
              {mode === "flashcard" && "Học Thẻ Ghi Nhớ (Flashcards)"}
              {mode === "quiz" && "Luyện Thi Trắc Nghiệm N4"}
              {mode === "grammar" && "Ngữ Pháp Trọng Tâm JLPT N4"}
              {mode === "listening" && "Luyện Nghe JLPT N4 (Audio, Script & Dịch Câu)"}
              {mode === "review" && "Sổ Tay Ôn Tập Cá Nhân & Sửa Lỗi Sai N4/N3"}
              {mode === "kanji" && "Hán Tự & Từ Vựng N3 (Đông Du 1200 • Kanji Sơ Trung Cấp)"}
              {mode === "ai-search" && "Tra Cứu Chuyên Sâu (Google Search Grounding)"}
              {mode === "live-voice" && "Luyện Đàm Thoại Trực Tiếp (Gemini 3.8 Live)"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {mode === "list" &&
                `Hiển thị ${filteredData.length} từ vựng. Đã thuộc ${masteredWordIds.length} từ, đã lưu ${starredWordIds.length} từ.`}
              {mode === "flashcard" &&
                "Lật thẻ ghi nhớ từ vựng, âm Hán Việt và ví dụ câu thực tế."}
              {mode === "quiz" &&
                "Luyện phản xạ chọn đáp án đúng. Kết quả được tự động lưu lên Firestore Cloud."}
              {mode === "grammar" &&
                "Tổng hợp toàn bộ các cấu trúc ngữ pháp N4 và chuyên đề phân biệt các mẫu câu dễ nhầm."}
              {mode === "listening" &&
                "Luyện nghe đề thi Chokai N4 2021 với audio đồng bộ, ẩn/hiện kịch bản hội thoại và giải thích chi tiết."}
              {mode === "review" &&
                "Tổng hợp 6 phần: Ngữ pháp cốt lõi, từ vựng theo cặp, bảng trợ từ, 13 câu sửa sai, bài văn và checklist 8 nhóm."}
              {mode === "kanji" &&
                "Học toàn diện 1,264 Hán tự 1200, 402 chữ Kanji Sơ Trung Cấp, 100 chữ trọng tâm và 293 từ vựng N3. Lưu trữ trực tiếp trên Cloud Firestore."}
              {mode === "ai-search" &&
                "Được hỗ trợ bởi Gemini 3.5 Flash đối chiếu dữ liệu web tiếng Nhật thực tế qua Google Search."}
              {mode === "live-voice" &&
                "Trò chuyện 2 chiều bằng giọng nói theo thời gian thực với Sakura-sensei qua Live API."}
            </p>
          </div>

          {/* Consistent Global Progress Badge */}
          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Đã thuộc: <strong className="text-emerald-700">{masteredWordIds.length}</strong></span>
              <span className="text-slate-300">|</span>
              <span>Đã lưu: <strong className="text-amber-700">{starredWordIds.length}</strong></span>
            </div>
          </div>
        </div>

        {/* View Switcher Container with Standard Min Height */}
        <div className="w-full min-h-[540px]">
          {mode === "list" && (
            <ListView data={filteredData} onLookupWord={handleLookupWord} />
          )}
          {mode === "flashcard" && (
            <FlashcardView data={filteredData} onLookupWord={handleLookupWord} />
          )}
          {mode === "quiz" && (
            <QuizView
              data={filteredData}
              selectedLesson={selectedLesson}
              onLookupWord={handleLookupWord}
            />
          )}
          {mode === "grammar" && (
            <GrammarView
              data={n4Grammar}
              onLookupGrammar={(st) => handleLookupWord(`Giải thích ngữ pháp N4: ${st}`)}
            />
          )}
          {mode === "listening" && <ListeningView />}
          {mode === "review" && <PersonalReviewView />}
          {mode === "kanji" && <KanjiLearningView />}
          {mode === "ai-search" && (
            <AiSearchLookup
              initialWord={lookupTargetWord}
              onClearInitial={() => setLookupTargetWord("")}
            />
          )}
          {mode === "live-voice" && <LiveVoiceKaiwa />}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
