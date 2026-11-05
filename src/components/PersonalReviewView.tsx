import React, { useState, useEffect, useMemo } from "react";
import {
  BookOpen,
  CheckSquare,
  AlertTriangle,
  PenTool,
  Award,
  ListChecks,
  Volume2,
  Search,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ExternalLink,
  HelpCircle,
  ArrowRight,
  ThumbsUp,
  GraduationCap,
  BookmarkCheck,
  Compass,
  FileCheck,
} from "lucide-react";
import {
  reviewGrammarList,
  reviewVocabularyList,
  reviewParticlesList,
  reviewMistakeSentences,
  reviewEssayPhrases,
  reviewExamPitfalls,
  reviewChecklistGroups,
  reviewStudyAdvice,
} from "../data/personalReviewNotes";

type ReviewTab = "grammar" | "vocab" | "particles" | "essays" | "pitfalls" | "checklist";

export function PersonalReviewView() {
  const [activeTab, setActiveTab] = useState<ReviewTab>("checklist");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrammarCat, setSelectedGrammarCat] = useState<string>("all");
  const [selectedVocabCat, setSelectedVocabCat] = useState<string>("all");
  const [selectedEssayTopic, setSelectedEssayTopic] = useState<string>("all");
  const [currentlySpeaking, setCurrentlySpeaking] = useState<string | null>(null);

  // Checklist state stored in localStorage
  const [completedItems, setCompletedItems] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem("nihongo_personal_review_checklist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("nihongo_personal_review_checklist", JSON.stringify(completedItems));
    } catch {
      // ignore
    }
  }, [completedItems]);

  const toggleChecklistItem = (id: number) => {
    setCompletedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const resetChecklist = () => {
    if (window.confirm("Bạn có chắc chắn muốn đặt lại toàn bộ checklist về 0/8 không?")) {
      setCompletedItems([]);
    }
  };

  // Text-to-speech pronunciation
  const speakJapanese = (text: string) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setCurrentlySpeaking(text);

    const cleanText = text.replace(/[❌🟢~～]/g, "").trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "ja-JP";
    utterance.rate = 0.9;

    utterance.onend = () => setCurrentlySpeaking(null);
    utterance.onerror = () => setCurrentlySpeaking(null);

    window.speechSynthesis.speak(utterance);
  };

  // Grammar categories
  const grammarCategories = useMemo(() => {
    return Array.from(new Set(reviewGrammarList.map((item) => item.category)));
  }, []);

  // Vocab categories
  const vocabCategories = useMemo(() => {
    return Array.from(new Set(reviewVocabularyList.map((item) => item.category)));
  }, []);

  // Essay topics
  const essayTopics = useMemo(() => {
    return Array.from(new Set(reviewEssayPhrases.map((item) => item.topic)));
  }, []);

  // Filtered grammar
  const filteredGrammar = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return reviewGrammarList.filter((item) => {
      const matchCat = selectedGrammarCat === "all" || item.category === selectedGrammarCat;
      const matchQuery =
        !q ||
        item.pattern.toLowerCase().includes(q) ||
        item.meaning.toLowerCase().includes(q) ||
        (item.usage && item.usage.toLowerCase().includes(q)) ||
        item.examples.some(
          (ex) =>
            ex.jp.toLowerCase().includes(q) ||
            ex.vi.toLowerCase().includes(q) ||
            (ex.furigana && ex.furigana.toLowerCase().includes(q))
        );
      return matchCat && matchQuery;
    });
  }, [searchQuery, selectedGrammarCat]);

  // Filtered vocabulary
  const filteredVocab = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return reviewVocabularyList.filter((item) => {
      const matchCat = selectedVocabCat === "all" || item.category === selectedVocabCat;
      const matchQuery =
        !q ||
        item.kanji.toLowerCase().includes(q) ||
        item.hiragana.toLowerCase().includes(q) ||
        item.meaning.toLowerCase().includes(q) ||
        (item.note && item.note.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });
  }, [searchQuery, selectedVocabCat]);

  // Filtered mistakes
  const filteredMistakes = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return reviewMistakeSentences.filter((item) => {
      return (
        !q ||
        item.wrong.toLowerCase().includes(q) ||
        item.correct.toLowerCase().includes(q) ||
        item.explanation.toLowerCase().includes(q) ||
        item.tag.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  // Filtered essays
  const filteredEssays = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return reviewEssayPhrases.filter((item) => {
      const matchTopic = selectedEssayTopic === "all" || item.topic === selectedEssayTopic;
      const matchQuery =
        !q ||
        item.jp.toLowerCase().includes(q) ||
        item.hiragana.toLowerCase().includes(q) ||
        item.meaning.toLowerCase().includes(q);
      return matchTopic && matchQuery;
    });
  }, [searchQuery, selectedEssayTopic]);

  const completionPercent = Math.round((completedItems.length / 8) * 100);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Banner Card */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 text-xs font-semibold mb-3">
              <Sparkles size={14} className="text-amber-300" />
              <span>Tài Liệu Ôn Tập Cá Nhân • N4 & N3 JLPT</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Sổ Tay Ôn Tập Cốt Lõi & Sửa Lỗi Sai
            </h1>
            <p className="text-sm text-indigo-100/90 mt-2 leading-relaxed">
              Tổng hợp toàn diện từ các câu bạn từng viết sai, trợ từ dễ nhầm (は・が・に・で),
              bộ từ vựng đề thi N3 tháng 12/2024, kính ngữ Tanaka-sensei và 4 bài văn biểu đạt.
            </p>
          </div>

          {/* Quick Progress Widget */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 shrink-0 min-w-[240px]">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold text-indigo-200 uppercase tracking-wider">
                Tiến độ ôn tập
              </span>
              <span className="text-lg font-black text-amber-300">
                {completedItems.length} / 8 nhóm
              </span>
            </div>
            <div className="w-full bg-black/25 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-2.5 text-[11px] text-indigo-200">
              <span>{completionPercent}% hoàn thành</span>
              <button
                onClick={() => setActiveTab("checklist")}
                className="font-bold underline hover:text-white transition-colors cursor-pointer"
              >
                Mở Checklist →
              </button>
            </div>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="mt-6 pt-5 border-t border-indigo-700/50">
          <div className="relative max-w-2xl">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm nhanh từ vựng, ngữ pháp (～ければ, 借りる, 慣れる, Quy Nhơn...)"
              className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white/15 border border-white/20 text-white placeholder-indigo-200/60 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:bg-white/20 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded-lg transition-colors cursor-pointer"
              >
                Xóa
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveTab("checklist")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer border ${
            activeTab === "checklist"
              ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
          }`}
        >
          <ListChecks size={16} />
          <span>VI. Checklist Học Tập ({completedItems.length}/8)</span>
        </button>

        <button
          onClick={() => setActiveTab("grammar")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer border ${
            activeTab === "grammar"
              ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
          }`}
        >
          <BookOpen size={16} />
          <span>I. Ngữ Pháp (9 Chuyên Đề)</span>
        </button>

        <button
          onClick={() => setActiveTab("vocab")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer border ${
            activeTab === "vocab"
              ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
          }`}
        >
          <GraduationCap size={16} />
          <span>II. Từ Vựng & Động Từ Cặp ({reviewVocabularyList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("particles")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer border ${
            activeTab === "particles"
              ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
          }`}
        >
          <AlertTriangle size={16} className="text-amber-500" />
          <span>III. Trợ Từ & 13 Câu Sửa Sai</span>
        </button>

        <button
          onClick={() => setActiveTab("essays")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer border ${
            activeTab === "essays"
              ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
          }`}
        >
          <PenTool size={16} />
          <span>IV. 4 Bài Văn & Giao Tiếp</span>
        </button>

        <button
          onClick={() => setActiveTab("pitfalls")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer border ${
            activeTab === "pitfalls"
              ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Award size={16} />
          <span>V. 5 Quy Tắc Điểm Dễ Sai N4/N3</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: CHECKLIST (Phần VI) */}
      {/* ======================================================== */}
      {activeTab === "checklist" && (
        <div className="space-y-6">
          {/* Header row & Reset */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-700 font-extrabold text-sm mb-1">
                <ListChecks size={18} />
                <span>PHẦN VI — DANH SÁCH ÔN TẬP ƯU TIÊN</span>
              </div>
              <h2 className="text-xl font-black text-slate-900">
                Checklist Học Tập Cá Nhân ({completedItems.length}/8 Hoàn Thành)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Tích chọn từng nhóm kiến thức khi bạn đã tự tin làm chủ và đặt câu chuẩn xác.
              </p>
            </div>

            <button
              onClick={resetChecklist}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-bold transition-colors cursor-pointer self-start sm:self-center"
            >
              <RotateCcw size={14} />
              <span>Đặt lại checklist (0/8)</span>
            </button>
          </div>

          {/* Checklist Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviewChecklistGroups.map((group) => {
              const isDone = completedItems.includes(group.id);
              return (
                <div
                  key={group.id}
                  onClick={() => toggleChecklistItem(group.id)}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
                    isDone
                      ? "bg-emerald-50/70 border-emerald-300 shadow-xs"
                      : "bg-white border-slate-200 hover:border-indigo-300 hover:shadow-xs"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors border ${
                      isDone
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {isDone && <CheckCircle2 size={16} />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3
                        className={`text-sm font-bold ${
                          isDone ? "text-emerald-900 line-through" : "text-slate-900"
                        }`}
                      >
                        {group.title}
                      </h3>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          isDone
                            ? "bg-emerald-200/60 text-emerald-800"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {isDone ? "Đã ôn" : "Cần học"}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 font-medium mt-1">
                      {group.subtitle}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {group.keyPoints.map((pt, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 shadow-2xs"
                        >
                          {pt}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Verbatim Advice Callout */}
          <div className="bg-amber-50/90 border border-amber-200 rounded-3xl p-6 shadow-2xs">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-500 text-white shrink-0 mt-0.5">
                <ThumbsUp size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-900 mb-1">
                  Lời Khuyên Học Tập Cá Nhân
                </h4>
                <p className="text-xs sm:text-sm text-amber-800/90 leading-relaxed font-medium">
                  {reviewStudyAdvice}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: NGỮ PHÁP (Phần I - 9 chuyên đề) */}
      {/* ======================================================== */}
      {activeTab === "grammar" && (
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedGrammarCat("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                selectedGrammarCat === "all"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Tất cả 9 chuyên đề ({reviewGrammarList.length})
            </button>
            {grammarCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedGrammarCat(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                  selectedGrammarCat === cat
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Condition Comparison Card (4 Mẫu Điều Kiện) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <Compass size={18} className="text-indigo-600" />
              <h3 className="text-base font-extrabold text-slate-900">
                Bảng Phân Biệt Nhanh 4 Mẫu Điều Kiện Trọng Tâm
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                    <th className="py-2.5 px-3 font-bold">Mẫu</th>
                    <th className="py-2.5 px-3 font-bold">Ý chính</th>
                    <th className="py-2.5 px-3 font-bold">Điểm cốt lõi cần nhớ</th>
                    <th className="py-2.5 px-3 font-bold">Ví dụ thực tế</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-indigo-50/40">
                    <td className="py-2.5 px-3 font-extrabold text-indigo-700">～と</td>
                    <td className="py-2.5 px-3 font-medium">Hễ… thì…</td>
                    <td className="py-2.5 px-3 text-slate-600">Kết quả tự nhiên, quy luật vật lý, chỉ dẫn đường đi</td>
                    <td className="py-2.5 px-3 text-slate-800">ボタンを押すと、ドアが開きます。</td>
                  </tr>
                  <tr className="hover:bg-indigo-50/40">
                    <td className="py-2.5 px-3 font-extrabold text-indigo-700">～ば (ければ)</td>
                    <td className="py-2.5 px-3 font-medium">Nếu… thì…</td>
                    <td className="py-2.5 px-3 text-slate-600">Điều kiện giả định tổng quát (dùng が thay vì は)</td>
                    <td className="py-2.5 px-3 text-slate-800">天気がよければ、サッカーをします。</td>
                  </tr>
                  <tr className="hover:bg-indigo-50/40">
                    <td className="py-2.5 px-3 font-extrabold text-indigo-700">～たら</td>
                    <td className="py-2.5 px-3 font-medium">Nếu / Khi…</td>
                    <td className="py-2.5 px-3 text-slate-600">Cực kỳ thông dụng, dùng cả cho hành động sau khi xong việc</td>
                    <td className="py-2.5 px-3 text-slate-800">日本へ行ったら、もっと勉強したい。</td>
                  </tr>
                  <tr className="hover:bg-indigo-50/40">
                    <td className="py-2.5 px-3 font-extrabold text-indigo-700">～なら</td>
                    <td className="py-2.5 px-3 font-medium">Nếu là / Nếu nói về…</td>
                    <td className="py-2.5 px-3 text-slate-600">Lấy chủ đề đối phương nói làm tiền đề đưa ra gợi ý, lời khuyên</td>
                    <td className="py-2.5 px-3 text-slate-800">日本へ行くなら、日本語を勉強したほうがいい。</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Grammar Cards List */}
          <div className="space-y-4">
            {filteredGrammar.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:border-indigo-300 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-black text-indigo-700">
                      {item.pattern}
                    </span>
                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {item.category}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60 self-start sm:self-center">
                    {item.meaning}
                  </span>
                </div>

                {item.usage && (
                  <p className="text-xs text-slate-600 font-medium bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <strong>Cách dùng:</strong> {item.usage}
                  </p>
                )}

                {/* Examples */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Ví dụ minh họa
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {item.examples.map((ex, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-2xl bg-slate-50 hover:bg-indigo-50/50 border border-slate-200/70 transition-colors flex items-start justify-between gap-3 group"
                      >
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-900">
                            {ex.jp}
                          </p>
                          {ex.furigana && (
                            <p className="text-xs text-slate-500 font-medium">
                              {ex.furigana}
                            </p>
                          )}
                          <p className="text-xs text-slate-600 font-semibold">
                            → {ex.vi}
                          </p>
                          {ex.note && (
                            <p className="text-[11px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-md inline-block mt-1">
                              💡 {ex.note}
                            </p>
                          )}
                        </div>

                        <button
                          onClick={() => speakJapanese(ex.jp)}
                          className={`p-2 rounded-xl border transition-colors cursor-pointer shrink-0 ${
                            currentlySpeaking === ex.jp
                              ? "bg-indigo-600 text-white border-indigo-600"
                              : "bg-white text-slate-500 border-slate-200 hover:text-indigo-600 hover:bg-indigo-50"
                          }`}
                          title="Nghe phát âm chuẩn giọng Nhật"
                        >
                          <Volume2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {item.mistakeAlert && (
                  <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium flex items-start gap-2">
                    <AlertTriangle size={15} className="text-rose-600 shrink-0 mt-0.5" />
                    <span>{item.mistakeAlert}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: TỪ VỰNG & ĐỘNG TỪ THEO CẶP (Phần II) */}
      {/* ======================================================== */}
      {activeTab === "vocab" && (
        <div className="space-y-6">
          {/* Vocab Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedVocabCat("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                selectedVocabCat === "all"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Tất cả từ vựng ({reviewVocabularyList.length})
            </button>
            {vocabCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedVocabCat(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                  selectedVocabCat === cat
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Special Focus Box for 借りる・貸す & 慣れる */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-amber-50/90 border border-amber-200 rounded-3xl p-5 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm">
                <AlertTriangle size={16} className="text-amber-600" />
                <span>Phân biệt đặc biệt: 借りる vs 貸す</span>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed font-medium">
                Cả 2 từ đều có thể đi với trợ từ <strong>に</strong> chỉ người. Muốn chọn đúng phải hiểu ai là chủ ngữ nhận sách hay trao sách:
              </p>
              <div className="bg-white p-3 rounded-2xl border border-amber-200 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">友達に本を借りました。</span>
                  <span className="text-slate-500">Tôi mượn sách của bạn (Tôi nhận)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">友達に本を貸しました。</span>
                  <span className="text-slate-500">Tôi cho bạn mượn sách (Bạn nhận)</span>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50/90 border border-indigo-200 rounded-3xl p-5 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-indigo-900 font-extrabold text-sm">
                <BookmarkCheck size={16} className="text-indigo-600" />
                <span>Động từ 慣れる (なれる) bắt buộc đi với に</span>
              </div>
              <p className="text-xs text-indigo-800 leading-relaxed font-medium">
                Tuyệt đối không dùng <strong>を</strong>. Luôn dùng <strong>[N] に慣れる</strong>:
              </p>
              <div className="bg-white p-3 rounded-2xl border border-indigo-200 space-y-1 text-xs">
                <div className="text-slate-800 font-bold">
                  🟢 日本語に慣れました。 <span className="font-normal text-slate-500">(Tôi đã quen với tiếng Nhật)</span>
                </div>
                <div className="text-slate-800 font-bold">
                  🟢 日本の生活にまだ慣れていません。 <span className="font-normal text-slate-500">(Chưa quen cuộc sống ở Nhật)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Vocabulary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredVocab.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:border-indigo-300 hover:shadow-xs transition-all flex flex-col justify-between gap-3 group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {item.kanji}
                      </div>
                      <div className="text-xs text-indigo-600 font-bold mt-0.5">
                        {item.hiragana}
                      </div>
                    </div>

                    <button
                      onClick={() => speakJapanese(item.kanji)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                      title="Nghe đọc từ"
                    >
                      <Volume2 size={15} />
                    </button>
                  </div>

                  <p className="text-xs font-semibold text-slate-700 mt-2">
                    {item.meaning}
                  </p>

                  {item.note && (
                    <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg mt-2 border border-amber-200/60 font-medium">
                      💡 {item.note}
                    </p>
                  )}

                  {item.collocations && item.collocations.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {item.collocations.map((col, idx) => (
                        <div
                          key={idx}
                          className="text-[11px] font-medium text-slate-600 bg-slate-50 px-2 py-1 rounded-md border border-slate-200/50"
                        >
                          {col}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                  <span>{item.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: TRỢ TỪ & 13 CÂU SỬA SAI (Phần III) */}
      {/* ======================================================== */}
      {activeTab === "particles" && (
        <div className="space-y-6">
          {/* 14 Trợ từ Table */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <Compass size={18} className="text-indigo-600" />
              <h3 className="text-base font-extrabold text-slate-900">
                14 Trợ Từ Cốt Lõi Phải Phân Biệt Tuyệt Đối
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                    <th className="py-2.5 px-3 font-bold">Trợ từ</th>
                    <th className="py-2.5 px-3 font-bold">Cách dùng thường gặp</th>
                    <th className="py-2.5 px-3 font-bold">Ví dụ thực tế</th>
                    <th className="py-2.5 px-3 font-bold">Dịch nghĩa</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {reviewParticlesList.map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80">
                      <td className="py-2 px-3 font-extrabold text-base text-indigo-700">
                        {p.particle}
                      </td>
                      <td className="py-2 px-3 font-medium text-slate-700">{p.usage}</td>
                      <td className="py-2 px-3 font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{p.example}</span>
                        <button
                          onClick={() => speakJapanese(p.example)}
                          className="text-slate-400 hover:text-indigo-600 cursor-pointer p-0.5"
                          title="Phát âm"
                        >
                          <Volume2 size={13} />
                        </button>
                      </td>
                      <td className="py-2 px-3 text-slate-600">{p.vi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 13 Sửa Lỗi Sai Thực Tế */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 text-rose-600 font-extrabold text-sm">
                  <AlertTriangle size={18} />
                  <span>PHẦN III.3 — 13 CÂU BẠN TỪNG HỎI HOẶC VIẾT SAI</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">
                  Đối Chiếu Câu Sai & Sửa Chuẩn Kèm Giải Thích Lý Do
                </h3>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                {reviewMistakeSentences.length} lỗi tiêu biểu
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3.5 pt-2">
              {filteredMistakes.map((mistake, idx) => (
                <div
                  key={mistake.id}
                  className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/90 hover:border-slate-300 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs font-extrabold text-slate-400">
                      #{idx + 1} • {mistake.tag}
                    </span>
                    <button
                      onClick={() => speakJapanese(mistake.correct)}
                      className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                      title="Nghe câu sửa đúng"
                    >
                      <Volume2 size={14} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    {/* Wrong */}
                    <div className="bg-rose-50/90 border border-rose-200/80 p-3 rounded-xl">
                      <div className="flex items-center gap-1.5 text-rose-700 font-bold mb-1">
                        <span>❌ Câu bạn viết / hỏi:</span>
                      </div>
                      <div className="text-sm font-bold text-rose-950 font-mono">
                        {mistake.wrong}
                      </div>
                    </div>

                    {/* Correct */}
                    <div className="bg-emerald-50/90 border border-emerald-200/80 p-3 rounded-xl">
                      <div className="flex items-center gap-1.5 text-emerald-700 font-bold mb-1">
                        <span>🟢 Sửa chuẩn xác:</span>
                      </div>
                      <div className="text-sm font-bold text-emerald-950">
                        {mistake.correct}
                      </div>
                      {mistake.furigana && (
                        <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
                          {mistake.furigana}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-700 font-medium leading-relaxed">
                    <strong className="text-slate-900">Giải thích chi tiết: </strong>
                    {mistake.explanation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: BÀI VĂN & GIAO TIẾP (Phần IV) */}
      {/* ======================================================== */}
      {activeTab === "essays" && (
        <div className="space-y-6">
          {/* Topic Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedEssayTopic("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                selectedEssayTopic === "all"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Tất cả 4 chủ đề ({reviewEssayPhrases.length})
            </button>
            {essayTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedEssayTopic(topic)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                  selectedEssayTopic === topic
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Highlight Cards for Key Essay Sentences */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 rounded-3xl p-5 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">
                  Câu giao tiếp tự giới thiệu (Điểm mạnh)
                </span>
                <button
                  onClick={() =>
                    speakJapanese("得意なことはチームで協力して仕事をすることです。")
                  }
                  className="p-1 rounded-lg bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-100 cursor-pointer"
                >
                  <Volume2 size={15} />
                </button>
              </div>
              <p className="text-base font-black text-slate-900">
                得意なことはチームで協力して仕事をすることです。
              </p>
              <p className="text-xs text-indigo-700 font-medium">
                とくいなことは チームで きょうりょくして しごとをすることです。
              </p>
              <p className="text-xs font-semibold text-slate-600 pt-1">
                → Điểm mạnh của tôi là làm việc nhóm và hợp tác với mọi người.
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-3xl p-5 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                  Câu kết bài văn Quy Nhơn bạn đã chọn
                </span>
                <button
                  onClick={() =>
                    speakJapanese("みなさんも、ぜひクイニョンへ行ってみてください。")
                  }
                  className="p-1 rounded-lg bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-100 cursor-pointer"
                >
                  <Volume2 size={15} />
                </button>
              </div>
              <p className="text-base font-black text-slate-900">
                みなさんも、ぜひクイニョンへ行ってみてください。
              </p>
              <p className="text-xs text-emerald-700 font-medium">
                みなさんも、ぜひクイニョンへ いってみてください。
              </p>
              <p className="text-xs font-semibold text-slate-600 pt-1">
                → Mọi người cũng hãy thử một lần đến thăm Quy Nhơn nhé!
              </p>
            </div>
          </div>

          {/* Phrases Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredEssays.map((phrase, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:border-indigo-300 transition-all flex flex-col justify-between gap-3 group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-base font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {phrase.jp}
                      </div>
                      <div className="text-xs text-indigo-600 font-bold mt-0.5">
                        {phrase.hiragana}
                      </div>
                    </div>

                    <button
                      onClick={() => speakJapanese(phrase.jp)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer shrink-0"
                      title="Nghe phát âm"
                    >
                      <Volume2 size={14} />
                    </button>
                  </div>

                  <p className="text-xs font-semibold text-slate-700 mt-2">
                    {phrase.meaning}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-bold">
                  {phrase.topic}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 6: CẨM NANG THI N4/N3 (Phần V) */}
      {/* ======================================================== */}
      {activeTab === "pitfalls" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 text-indigo-700 font-extrabold text-sm mb-1">
              <Award size={18} />
              <span>PHẦN V — NHỮNG ĐIỂM DỄ SAI KHI THI JLPT N4/N3</span>
            </div>
            <h2 className="text-xl font-black text-slate-900">
              5 Nguyên Tắc Vàng Dựa Trên Các Lỗi Đã Luyện
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Tuyệt đối không dịch từng từ riêng lẻ; hãy luôn nhìn nhận ngữ cảnh, trợ từ và vai trò chủ ngữ.
            </p>
          </div>

          <div className="space-y-4">
            {reviewExamPitfalls.map((item) => (
              <div
                key={item.ruleNumber}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3 hover:border-indigo-300 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0">
                    {item.ruleNumber}
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 font-medium pl-11">
                  {item.summary}
                </p>

                <div className="pl-11 grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {item.bullets.map((bullet, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-800 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
