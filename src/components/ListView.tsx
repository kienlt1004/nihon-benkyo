import React, { useState } from "react";
import { Search, Star, CheckCircle, Sparkles, Filter, X } from "lucide-react";
import { VocabularyItem } from "../data/vocabulary";
import { useAuth } from "../context/AuthContext";

interface ListViewProps {
  data: VocabularyItem[];
  onLookupWord: (word: string) => void;
}

export function ListView({ data, onLookupWord }: ListViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "starred" | "mastered">("all");
  const { starredWordIds, toggleStarWord, masteredWordIds, toggleMasteredWord, user } = useAuth();

  const displayData = data.filter((item) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      item.word.toLowerCase().includes(query) ||
      (item.hanViet && item.hanViet.toLowerCase().includes(query)) ||
      item.meaning.toLowerCase().includes(query) ||
      (item.example && item.example.toLowerCase().includes(query));

    if (!matchesSearch) return false;

    if (filterType === "starred") {
      return starredWordIds.includes(String(item.id));
    }
    if (filterType === "mastered") {
      return masteredWordIds.includes(String(item.id));
    }
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Top Controls: Search & Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Tìm kiếm theo Kanji, Hán Việt, ý nghĩa hoặc ví dụ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-800 placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 self-end sm:self-center">
          <button
            onClick={() => setFilterType("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filterType === "all"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Tất cả ({data.length})
          </button>
          <button
            onClick={() => setFilterType("starred")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
              filterType === "starred"
                ? "bg-amber-500 text-white"
                : "bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200/50"
            }`}
          >
            <Star size={13} className={filterType === "starred" ? "fill-white" : "fill-amber-400 text-amber-500"} />
            <span>Đã lưu ({starredWordIds.length})</span>
          </button>
          <button
            onClick={() => setFilterType("mastered")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
              filterType === "mastered"
                ? "bg-indigo-600 text-white"
                : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200/50"
            }`}
          >
            <CheckCircle size={13} />
            <span>Đã thuộc ({masteredWordIds.length})</span>
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          {displayData.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-3 w-10 text-center">STT</th>
                  <th className="py-3.5 px-2 w-10 text-center">Lưu</th>
                  <th className="py-3.5 px-4 whitespace-nowrap min-w-[120px]">Từ vựng</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">Hán Việt</th>
                  <th className="py-3.5 px-3 w-20">Loại</th>
                  <th className="py-3.5 px-4 min-w-[200px]">Ví dụ (Kanji)</th>
                  <th className="py-3.5 px-4 min-w-[150px]">Ý nghĩa</th>
                  <th className="py-3.5 px-3 w-28 text-center">AI Sensei</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayData.map((item, index) => {
                  const isStarred = starredWordIds.includes(String(item.id));
                  const isMastered = masteredWordIds.includes(String(item.id));

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-50/70 transition-colors ${
                        isMastered ? "bg-emerald-50/30" : ""
                      }`}
                    >
                      <td className="py-3.5 px-3 text-center text-slate-400 text-xs font-medium">
                        {index + 1}
                      </td>
                      <td className="py-3.5 px-2 text-center">
                        <button
                          onClick={() => toggleStarWord(String(item.id))}
                          title={isStarred ? "Bỏ lưu từ" : "Lưu vào danh sách trọng tâm (Firestore)"}
                          className="text-slate-300 hover:text-amber-500 transition-colors cursor-pointer"
                        >
                          <Star
                            size={18}
                            className={isStarred ? "fill-amber-400 text-amber-500" : ""}
                          />
                        </button>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-base text-indigo-950 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span>{item.word}</span>
                          {item.lesson === 35 && (
                            <span className="text-[10px] bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded font-bold">
                              Đề 30
                            </span>
                          )}
                          {isMastered && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                              Thuộc
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-xs font-semibold text-slate-600 whitespace-nowrap">
                        {item.hanViet || "—"}
                      </td>
                      <td className="py-3.5 px-3 text-xs">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600">
                          {item.type}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-700 leading-relaxed font-sans">
                        {item.example}
                      </td>
                      <td className="py-3.5 px-4 text-xs font-semibold text-slate-900">
                        {item.meaning}
                      </td>
                      <td className="py-3.5 px-3 text-center whitespace-nowrap">
                        <button
                          onClick={() => onLookupWord(item.word)}
                          title="Tra cứu nguồn gốc, ví dụ thực tế và ngữ pháp với Google Search Grounding"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-900 border border-indigo-200 transition-all cursor-pointer"
                        >
                          <Sparkles size={12} className="text-amber-500" />
                          <span>Hỏi AI</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="py-16 text-center">
              <p className="text-slate-500 text-sm mb-3">
                {filterType === "starred"
                  ? "Bạn chưa lưu từ vựng nào vào mục Yêu thích. Hãy bấm ngôi sao để lưu từ cần ôn tập."
                  : filterType === "mastered"
                  ? "Chưa có từ nào được đánh dấu đã thuộc."
                  : `Không tìm thấy từ vựng nào phù hợp với "${searchQuery}"`}
              </p>
              {(searchQuery || filterType !== "all") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setFilterType("all");
                  }}
                  className="text-indigo-600 hover:text-indigo-800 text-xs font-semibold"
                >
                  Xóa bộ lọc & xem tất cả
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
