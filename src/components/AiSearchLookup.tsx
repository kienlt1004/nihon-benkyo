import React, { useState, useEffect } from "react";
import Markdown from "react-markdown";
import {
  Search,
  Sparkles,
  ExternalLink,
  Globe,
  Loader2,
  Copy,
  Check,
  BookOpen,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import { GroundingSource, SearchGroundingResult } from "../types";

interface AiSearchLookupProps {
  initialQuery?: string;
  initialWord?: string;
  onClearInitial?: () => void;
}

const PRESET_QUERIES = [
  "Phân biệt mẫu câu ~てから và ~たから trong bài thi JLPT N4",
  "Cách dùng và ngữ cảnh thực tế của 気にする (kinisuru) vs 気づく (kidzuku)",
  "Tổng hợp các cặp Tự động từ (自動詞) và Tha động từ (他動詞) N4 hay gặp",
  "Cách chia và sử dụng Thể bị động (受身形) & Thể sai khiến (使役形)",
  "Ý nghĩa và lưu ý khi dùng kính ngữ N4: お/ご...になります",
];

export function AiSearchLookup({
  initialQuery,
  initialWord,
  onClearInitial,
}: AiSearchLookupProps) {
  const [query, setQuery] = useState(initialQuery || initialWord || "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchGroundingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialQuery || initialWord) {
      const q = initialQuery || (initialWord ? `Giải thích chi tiết từ vựng / ngữ pháp N4: ${initialWord}` : "");
      setQuery(q);
      executeSearch(q);
    }
  }, [initialQuery, initialWord]);

  const executeSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ai/search-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchTerm }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Không thể thực hiện tra cứu.");
      }
      setResult(data);
    } catch (err: any) {
      console.error("Lỗi tìm kiếm:", err);
      setError(err?.message || "Đã xảy ra lỗi khi kết nối với máy chủ AI.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onClearInitial) onClearInitial();
    executeSearch(query);
  };

  const handleCopy = () => {
    if (!result?.answer) return;
    navigator.clipboard.writeText(result.answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Search Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-2xl p-6 text-white shadow-sm border border-indigo-700/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 text-xs font-medium mb-3">
              <Sparkles size={14} className="text-amber-300" />
              <span>Google Search Grounding (gemini-3.5-flash)</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Tra cứu & Hỏi đáp Tiếng Nhật N4
            </h2>
            <p className="text-sm text-indigo-200 mt-1 max-w-2xl leading-relaxed">
              Giải thích ngữ nghĩa, mẫu câu, sắc thái văn hóa và phân biệt các điểm ngữ pháp N4 dễ nhầm lẫn, được đối chiếu trực tiếp từ nguồn web tiếng Nhật uy tín qua Google Search.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 self-start sm:self-center text-slate-200">
            <Globe size={16} className="text-emerald-400" />
            <span>Dữ liệu web thực tế</span>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nhập từ vựng, ngữ pháp, hoặc câu hỏi N4 (ví dụ: 'Cách dùng てから và たから')..."
              className="w-full pl-11 pr-4 py-3 bg-white text-slate-800 placeholder:text-slate-400 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-amber-400 shadow-inner"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-sm whitespace-nowrap cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Đang tra cứu...</span>
              </>
            ) : (
              <>
                <Sparkles size={16} />
                <span>Tra cứu ngay</span>
              </>
            )}
          </button>
        </form>

        {/* Preset Prompt Suggestions */}
        <div className="mt-4 flex flex-wrap gap-2 items-center">
          <span className="text-xs text-indigo-300 font-medium flex items-center gap-1">
            <HelpCircle size={14} /> Gợi ý tra cứu:
          </span>
          {PRESET_QUERIES.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setQuery(preset);
                executeSearch(preset);
              }}
              className="text-xs bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1 rounded-full text-indigo-100 transition-colors text-left"
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Error notification */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm">
          <strong>Lỗi:</strong> {error}
        </div>
      )}

      {/* Loading state indicator */}
      {loading && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
          <div className="inline-flex items-center justify-center p-4 bg-indigo-50 text-indigo-600 rounded-2xl mb-4 animate-pulse">
            <Sparkles size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">
            Gemini 3.5 Flash đang tra cứu Google Search...
          </h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Đang tổng hợp giải thích ngữ pháp, ví dụ tự nhiên và trích dẫn các nguồn web tiếng Nhật uy tín.
          </p>
        </div>
      )}

      {/* Search Result Display */}
      {!loading && result && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
                <BookOpen size={18} className="text-indigo-600" />
                <span>Kết quả phân tích chuyên sâu (Google Search Grounding)</span>
              </div>
              <button
                onClick={handleCopy}
                className="text-xs text-slate-600 hover:text-indigo-600 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-white transition-all bg-slate-100"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-green-600" />
                    <span className="text-green-600 font-medium">Đã sao chép</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Sao chép</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-6">
              <div className="prose prose-slate max-w-none text-slate-800 leading-relaxed text-sm sm:text-base space-y-4">
                <Markdown>{result.answer}</Markdown>
              </div>
            </div>
          </div>

          {/* Grounding Citations & Sources */}
          {result.sources && result.sources.length > 0 && (
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <Globe size={18} className="text-indigo-600" />
                <h4 className="text-sm font-bold text-slate-900">
                  Nguồn dữ liệu web được đối chiếu (Google Search Sources)
                </h4>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-semibold">
                  {result.sources.length} nguồn
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-3">
                Các trang tin, từ điển và cổng giáo dục tiếng Nhật được mô hình Gemini 3.5 Flash tham chiếu:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {result.sources.map((src, index) => (
                  <a
                    key={index}
                    href={src.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white rounded-xl border border-slate-200 hover:border-indigo-400 hover:shadow-sm transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                        <Globe size={12} />
                        <span className="truncate max-w-[200px]">
                          {new URL(src.uri).hostname.replace("www.", "")}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-800 group-hover:text-indigo-600 line-clamp-2 transition-colors">
                        {src.title || src.uri}
                      </p>
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-indigo-600 font-medium">
                      <span>Mở liên kết</span>
                      <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
