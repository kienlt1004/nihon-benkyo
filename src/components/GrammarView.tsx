import React, { useState } from "react";
import {
  BookOpen,
  Sparkles,
  Search,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  X,
} from "lucide-react";
import { GrammarItem, grammarComparison } from "../data/grammar";

interface GrammarViewProps {
  data: GrammarItem[];
  onLookupGrammar: (structure: string) => void;
}

export function GrammarView({ data, onLookupGrammar }: GrammarViewProps) {
  const [subTab, setSubTab] = useState<"all" | "de30" | "compare">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const de30ItemsCount = data.filter((item) => item.id >= 31 && item.id <= 44).length;

  const displayData = data.filter((item) => {
    if (subTab === "de30" && (item.id < 31 || item.id > 44)) {
      return false;
    }
    const query = searchQuery.toLowerCase();
    return (
      item.structure.toLowerCase().includes(query) ||
      item.meaning.toLowerCase().includes(query) ||
      (item.formula && item.formula.toLowerCase().includes(query)) ||
      item.notes.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-4">
      {/* Sub-tab navigation */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setSubTab("all")}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer ${
              subTab === "all"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <BookOpen size={15} />
            <span>Tất cả ({data.length})</span>
          </button>

          <button
            onClick={() => setSubTab("de30")}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer ${
              subTab === "de30"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200"
            }`}
          >
            <Sparkles size={15} className={subTab === "de30" ? "text-amber-300" : "text-emerald-600"} />
            <span>Ngữ pháp Đề 30 ({de30ItemsCount})</span>
          </button>

          <button
            onClick={() => setSubTab("compare")}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer ${
              subTab === "compare"
                ? "bg-amber-500 text-white shadow-xs"
                : "text-amber-800 bg-amber-50 hover:bg-amber-100/80 border border-amber-200"
            }`}
          >
            <Sparkles size={15} />
            <span>Chuyên đề so sánh</span>
          </button>
        </div>

        {subTab !== "compare" && (
          <div className="relative flex-1 max-w-xs">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Tìm kiếm cấu trúc, ý nghĩa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-800"
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
        )}
      </div>

      {subTab === "all" || subTab === "de30" ? (
        <div className="space-y-4">
          {subTab === "de30" ? (
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-emerald-950 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-200/70 rounded-xl text-emerald-800">
                  <BookOpen size={20} />
                </div>
                <div>
                  <p className="font-extrabold text-sm text-emerald-950">
                    Ngữ pháp xuất hiện trong Đề 30 - Từ Vựng N4 (Dora Nihongo)
                  </p>
                  <p className="text-xs text-emerald-800/90 mt-0.5">
                    Tổng hợp 14 cấu trúc ngữ pháp then chốt được trích xuất trực tiếp từ 20 câu đề thi kèm công thức và bài tập ví dụ.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Quick jump callout */
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-900 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-200/60 rounded-xl text-amber-800">
                  <Lightbulb size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm">
                    Chuyên đề dễ nhầm: から vs たら vs てから vs たから
                  </p>
                  <p className="text-xs text-amber-800/90">
                    Xem bảng phân biệt nhanh, so sánh 4 câu thực tế và mẹo phản xạ tức thì khi làm bài.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSubTab("compare")}
                className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap self-end sm:self-center shadow-xs cursor-pointer"
              >
                <span>Xem ngay</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}

          {/* Grammar list table */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              {displayData.length > 0 ? (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      <th className="py-3 px-3 w-10 text-center">STT</th>
                      <th className="py-3 px-4 min-w-[170px]">Cấu trúc & Công thức</th>
                      <th className="py-3 px-4 min-w-[180px]">Ý nghĩa</th>
                      <th className="py-3 px-4 min-w-[260px]">Ví dụ minh họa</th>
                      <th className="py-3 px-4 min-w-[200px]">Lưu ý & Mẹo</th>
                      <th className="py-3 px-3 w-28 text-center">AI Sensei</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {displayData.map((item, index) => (
                      <tr
                        key={item.id}
                        className="hover:bg-slate-50/60 transition-colors align-top text-xs"
                      >
                        <td className="py-4 px-3 text-center text-slate-400 font-medium">
                          {index + 1}
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-extrabold text-sm text-indigo-950 leading-snug flex items-center flex-wrap gap-1.5">
                            <span>{item.structure}</span>
                            {item.id >= 31 && item.id <= 44 && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                Đề 30 N4
                              </span>
                            )}
                          </div>
                          {item.formula && (
                            <div className="mt-1.5 inline-block text-[11px] font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-100">
                              {item.formula}
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-4 font-bold text-slate-800">
                          {item.meaning}
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-slate-700 whitespace-pre-line leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-sans">
                            {item.example}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-slate-600 whitespace-pre-line leading-relaxed">
                          {item.notes}
                        </td>
                        <td className="py-4 px-3 text-center whitespace-nowrap">
                          <button
                            onClick={() => onLookupGrammar(item.structure)}
                            title="Tra cứu ví dụ thực tế và giải thích chi tiết với Google Search Grounding"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-colors cursor-pointer"
                          >
                            <Sparkles size={12} className="text-amber-500" />
                            <span>Hỏi AI</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-slate-500 text-sm mb-2">
                    Không tìm thấy ngữ pháp nào phù hợp với "{searchQuery}"
                  </p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-indigo-600 hover:text-indigo-800 text-xs font-semibold"
                  >
                    Xóa tìm kiếm
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Detailed comparison tab */
        <div className="space-y-6">
          {/* Section 1: Quick table */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-amber-400" />
                <h3 className="font-bold text-sm sm:text-base tracking-tight">
                  ⭐ Bảng phân biệt nhanh: から vs たら vs てから vs たから
                </h3>
              </div>
              <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700">
                Trọng tâm N4
              </span>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {grammarComparison.summaryTable.map((item, idx) => {
                  const colors = [
                    "border-emerald-200 bg-emerald-50/50 text-emerald-900",
                    "border-sky-200 bg-sky-50/50 text-sky-900",
                    "border-amber-200 bg-amber-50/50 text-amber-900",
                    "border-indigo-200 bg-indigo-50/50 text-indigo-900",
                  ];
                  const badgeColors = [
                    "bg-emerald-600 text-white",
                    "bg-sky-600 text-white",
                    "bg-amber-600 text-white",
                    "bg-indigo-600 text-white",
                  ];
                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border ${colors[idx % colors.length]} flex flex-col justify-between`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-extrabold text-base">
                            {item.pattern}
                          </span>
                          <span
                            className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${badgeColors[idx % badgeColors.length]}`}
                          >
                            {item.tip.split(" ")[0]}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 font-medium mb-2">
                          {item.meaning}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-slate-200/60 text-xs font-semibold">
                        👉 Nhớ:{" "}
                        <span className="underline decoration-dotted">
                          {item.tip}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 2: 4-sentence comparison */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <span className="text-orange-500">🔥</span> So sánh 4 câu cùng ngữ cảnh (Thời tiết & Ra ngoài)
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Cùng hành động "ra ngoài", nhưng thay đổi mẫu câu sẽ làm thay đổi hoàn toàn bản chất và logic của câu.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {grammarComparison.examplesComparison.map((ex, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200/70">
                      {ex.pattern}
                    </span>
                  </div>
                  <div className="font-bold text-slate-900 text-sm mb-1 font-sans">
                    {ex.jp}
                  </div>
                  <div className="text-xs font-medium text-slate-700 mb-2">
                    {ex.vi}
                  </div>
                  <div className="text-[11px] text-slate-500 bg-white p-2 rounded-lg border border-slate-200/80 font-sans">
                    💡{" "}
                    <span className="text-slate-700 font-medium">
                      {ex.note}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Critical distinction (てから vs たから) */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl shadow-sm p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-amber-400 text-indigo-950 rounded-lg font-bold">
                ⚡
              </div>
              <h3 className="font-bold text-base sm:text-lg text-amber-300">
                {grammarComparison.keyPairComparison.title}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
              <div className="bg-white/10 backdrop-blur-sm border border-white/15 p-4 rounded-xl">
                <div className="text-xs font-mono text-amber-300 font-semibold mb-1">
                  1. THỨ TỰ HÀNH ĐỘNG (てから)
                </div>
                <div className="text-base font-bold mb-1">
                  {grammarComparison.keyPairComparison.item1.jp}
                </div>
                <div className="text-xs text-slate-300 mb-2">
                  {grammarComparison.keyPairComparison.item1.vi}
                </div>
                <div className="text-xs bg-black/30 p-2 rounded text-emerald-300 font-medium">
                  👉 {grammarComparison.keyPairComparison.item1.explain}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/15 p-4 rounded-xl">
                <div className="text-xs font-mono text-sky-300 font-semibold mb-1">
                  2. NGUYÊN NHÂN / LÝ DO (たから)
                </div>
                <div className="text-base font-bold mb-1">
                  {grammarComparison.keyPairComparison.item2.jp}
                </div>
                <div className="text-xs text-slate-300 mb-2">
                  {grammarComparison.keyPairComparison.item2.vi}
                </div>
                <div className="text-xs bg-black/30 p-2 rounded text-sky-300 font-medium">
                  👉 {grammarComparison.keyPairComparison.item2.explain}
                </div>
              </div>
            </div>

            <div className="bg-amber-400/20 border border-amber-300/30 rounded-xl p-3 text-xs text-amber-100 font-medium">
              🚨 <strong>Lưu ý:</strong>{" "}
              {grammarComparison.keyPairComparison.takeaway}
            </div>
          </div>

          {/* Section 4: Mnemonic question checklist */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <HelpCircle size={18} className="text-indigo-600" />
              🧠 Mẹo tự hỏi phản xạ nhanh khi làm bài trắc nghiệm / điền từ
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Mỗi khi nhìn thấy chỗ trống cần điền mẫu liên kết, hãy tự đặt 4 câu hỏi theo thứ tự:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {grammarComparison.tips.map((tip, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                >
                  <span className="text-slate-700">{tip.q}</span>
                  <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-1 rounded-lg border border-indigo-200">
                    {tip.a}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start gap-2">
              <CheckCircle2
                size={18}
                className="text-emerald-600 shrink-0 mt-0.5"
              />
              <div>
                <strong>Lời khuyên khi ôn thi N4:</strong>{" "}
                {grammarComparison.advice}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
