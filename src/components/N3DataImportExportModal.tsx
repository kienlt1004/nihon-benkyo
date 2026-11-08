import React, { useState, useRef } from "react";
import { TuVungN3SouMatomeItem } from "../data/tuVungN3SouMatome";
import {
  parseRawVocabText,
  mergeAndDeduplicate,
  exportToJson,
  exportToCsv,
  downloadFile,
  ParseResult,
  MergeResult,
} from "../lib/vocabDataParser";
import { pushN3SouMatomeDataToFirestore } from "../lib/firestoreSync";
import {
  X,
  Upload,
  Download,
  FileText,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Layers,
  ArrowRight,
  Database,
  CloudUpload,
} from "lucide-react";

interface N3DataImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentItems: TuVungN3SouMatomeItem[];
  onMergeSuccess: (mergedItems: TuVungN3SouMatomeItem[], syncStats: { added: number; updated: number }) => void;
  onResetToDefault: () => void;
  isCustomized: boolean;
}

export function N3DataImportExportModal({
  isOpen,
  onClose,
  currentItems,
  onMergeSuccess,
  onResetToDefault,
  isCustomized,
}: N3DataImportExportModalProps) {
  const [activeTab, setActiveTab] = useState<"upload" | "paste" | "export">("upload");
  const [rawText, setRawText] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);
  const [mergePreview, setMergePreview] = useState<MergeResult | null>(null);
  const [autoSyncFirestore, setAutoSyncFirestore] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Process text whenever user inputs or selects a file
  const handleProcessInput = (content: string, fileName?: string) => {
    setErrorMessage("");
    if (fileName) setSelectedFileName(fileName);
    setRawText(content);

    if (!content.trim()) {
      setParseResult(null);
      setMergePreview(null);
      return;
    }

    const res = parseRawVocabText(content);
    setParseResult(res);

    if (res.success && res.items.length > 0) {
      const preview = mergeAndDeduplicate(currentItems, res.items);
      setMergePreview(preview);
    } else {
      setMergePreview(null);
      if (res.error) setErrorMessage(res.error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      handleProcessInput(content, file.name);
    };
    reader.onerror = () => {
      setErrorMessage("Không thể đọc tệp. Vui lòng thử lại hoặc dán trực tiếp nội dung.");
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      handleProcessInput(content, file.name);
    };
    reader.readAsText(file);
  };

  // Sample data insertion
  const handleInsertSample = (type: "json" | "csv") => {
    if (type === "json") {
      const sampleJson = JSON.stringify(
        [
          {
            japanese: "片付ける",
            hiragana: "かたづける",
            vietnamese: "Dọn dẹp, sắp xếp gọn gàng",
            category: "Việc nhà",
            type: "verb",
            week: 1,
            day: 4,
            exampleSentence: "部屋をきれいに片付ける。",
            exampleMeaning: "Dọn dẹp phòng cho ngăn nắp sạch sẽ.",
          },
          {
            japanese: "乗り換える",
            hiragana: "のりかえる",
            vietnamese: "Đổi tàu, chuyển tuyến",
            category: "Giao thông",
            type: "verb",
            week: 2,
            day: 2,
            exampleSentence: "新宿駅で地下鉄に乗り換える。",
            exampleMeaning: "Đổi sang tàu điện ngầm ở ga Shinjuku.",
          },
        ],
        null,
        2
      );
      handleProcessInput(sampleJson, "sample_n3_vocab.json");
    } else {
      const sampleCsv = `japanese,hiragana,vietnamese,category,type,week,day,exampleSentence,exampleMeaning
片付ける,かたづける,"Dọn dẹp, thu dọn",Việc nhà,verb,1,4,部屋を片付ける。,Dọn phòng gọn gàng.
乗り換える,のりかえる,"Đổi tàu, chuyển tuyến",Giao thông,verb,2,2,地下鉄に乗り換える。,Đổi sang tàu ngầm.`;
      handleProcessInput(sampleCsv, "sample_n3_vocab.csv");
    }
  };

  // Confirm Merge and Sync
  const handleConfirmMerge = async () => {
    if (!mergePreview || mergePreview.mergedList.length === 0) return;

    setIsSyncing(true);
    setSyncStatusMsg("Đang lưu trữ dữ liệu vào bộ nhớ ứng dụng...");

    const newMergedList = mergePreview.mergedList;
    const stats = {
      added: mergePreview.addedCount,
      updated: mergePreview.updatedCount,
    };

    try {
      if (autoSyncFirestore) {
        setSyncStatusMsg(`Đang đồng bộ ${newMergedList.length} từ vựng lên Cloud Firestore...`);
        await pushN3SouMatomeDataToFirestore(newMergedList, (text) => {
          setSyncStatusMsg(text);
        });
      }

      onMergeSuccess(newMergedList, stats);
      setIsSyncing(false);
      onClose();
    } catch (err: any) {
      console.error("Firestore sync error:", err);
      // Even if Firestore fails, local state is preserved
      onMergeSuccess(newMergedList, stats);
      setIsSyncing(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xl max-w-2xl w-full my-auto overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs shrink-0">
              <Database size={18} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Nhập & Xuất Dữ Liệu Từ Vựng N3
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Kho hiện tại: {currentItems.length} từ</span>
                <span>·</span>
                <span>Tự động khử trùng lặp</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl hover:bg-slate-200/60 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Switcher (>= 44px touch targets) */}
        <div className="p-3 border-b border-slate-100 bg-white flex items-center gap-2">
          <button
            onClick={() => setActiveTab("upload")}
            className={`flex-1 min-h-[44px] py-2 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === "upload"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Upload size={16} />
            <span>Tải Tệp (JSON/CSV)</span>
          </button>

          <button
            onClick={() => setActiveTab("paste")}
            className={`flex-1 min-h-[44px] py-2 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === "paste"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <FileText size={16} />
            <span>Dán Văn Bản</span>
          </button>

          <button
            onClick={() => setActiveTab("export")}
            className={`flex-1 min-h-[44px] py-2 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === "export"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Download size={16} />
            <span>Xuất Dữ Liệu</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* TAB 1: FILE UPLOAD */}
          {activeTab === "upload" && (
            <div className="space-y-4">
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-indigo-200 hover:border-indigo-500 rounded-2xl p-6 sm:p-8 text-center bg-indigo-50/40 hover:bg-indigo-50/70 transition-all cursor-pointer flex flex-col items-center justify-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-white border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs mb-3">
                  <Upload size={24} />
                </div>
                <p className="text-sm font-bold text-slate-800">
                  {selectedFileName ? (
                    <span className="text-indigo-600 font-extrabold">{selectedFileName}</span>
                  ) : (
                    "Kéo thả tệp JSON hoặc CSV vào đây"
                  )}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Hoặc bấm để chọn tệp từ thiết bị của bạn (.json, .csv, .txt)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,.csv,.txt"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {/* Sample format shortcuts */}
              <div className="flex items-center justify-between text-xs text-slate-500 flex-wrap gap-2">
                <span>Chưa có tệp sẵn?</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleInsertSample("json")}
                    className="min-h-[36px] px-2.5 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 rounded-lg hover:bg-indigo-100 cursor-pointer"
                  >
                    Xem mẫu JSON
                  </button>
                  <button
                    onClick={() => handleInsertSample("csv")}
                    className="min-h-[36px] px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 cursor-pointer"
                  >
                    Xem mẫu CSV
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PASTE TEXT */}
          {activeTab === "paste" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Dán nội dung JSON hoặc CSV từ Claude Artifact:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleInsertSample("json")}
                    className="px-2 py-0.5 text-[11px] font-semibold text-indigo-600 hover:underline cursor-pointer"
                  >
                    Dán mẫu JSON
                  </button>
                  <span>·</span>
                  <button
                    onClick={() => handleInsertSample("csv")}
                    className="px-2 py-0.5 text-[11px] font-semibold text-indigo-600 hover:underline cursor-pointer"
                  >
                    Dán mẫu CSV
                  </button>
                </div>
              </div>

              <textarea
                value={rawText}
                onChange={(e) => handleProcessInput(e.target.value)}
                placeholder="[ { &quot;japanese&quot;: &quot;屋上&quot;, &quot;hiragana&quot;: &quot;おくじょう&quot;, &quot;vietnamese&quot;: &quot;Sân thượng&quot; } ]"
                rows={8}
                className="w-full p-3 font-mono text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
              />
            </div>
          )}

          {/* TAB 3: EXPORT DATA */}
          {activeTab === "export" && (
            <div className="space-y-4 py-2">
              <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-2">
                <h3 className="text-sm font-black text-indigo-900">
                  Xuất dữ liệu toàn bộ {currentItems.length} từ vựng
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Tải xuống toàn bộ kho từ vựng N3 Sou Matome hiện tại về máy tính hoặc điện thoại dưới dạng tệp chuẩn, sẵn sàng tái sử dụng hoặc mở bằng Excel/Google Sheets.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() =>
                    downloadFile(
                      exportToJson(currentItems),
                      `tu_vung_n3_soumatome_${Date.now()}.json`,
                      "application/json"
                    )
                  }
                  className="min-h-[48px] p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40 text-left transition-all cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900">Xuất file JSON (.json)</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Dành cho lập trình & sao lưu</div>
                  </div>
                  <Download size={18} className="text-indigo-600" />
                </button>

                <button
                  onClick={() =>
                    downloadFile(
                      exportToCsv(currentItems),
                      `tu_vung_n3_soumatome_${Date.now()}.csv`,
                      "text/csv;charset=utf-8"
                    )
                  }
                  className="min-h-[48px] p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40 text-left transition-all cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900">Xuất file CSV (.csv)</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Mở trực tiếp trên Excel / Sheets</div>
                  </div>
                  <Download size={18} className="text-emerald-600" />
                </button>
              </div>

              {isCustomized && (
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    Bạn đang sử dụng kho từ vựng đã được mở rộng.
                  </div>
                  <button
                    onClick={() => {
                      if (confirm("Khôi phục về danh sách 415 từ gốc theo 14 trang tài liệu?")) {
                        onResetToDefault();
                        onClose();
                      }
                    }}
                    className="min-h-[40px] px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw size={14} />
                    <span>Khôi phục 415 từ gốc</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Error notice */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
              <AlertTriangle size={16} className="text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* PARSE & MERGE PREVIEW (Appears when data is valid) */}
          {mergePreview && (
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Kết quả phân tích dữ liệu
                </span>
                <span className="text-xs text-indigo-700 font-semibold">
                  {mergePreview.totalBefore} từ ➔ {mergePreview.totalAfter} từ
                </span>
              </div>

              {/* Stats badges */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs text-slate-500">Đọc được</div>
                  <div className="text-sm sm:text-base font-black text-slate-900 mt-0.5">
                    {parseResult?.totalParsed || 0}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="text-xs text-emerald-700 font-medium">Thêm mới</div>
                  <div className="text-sm sm:text-base font-black text-emerald-800 mt-0.5">
                    +{mergePreview.addedCount}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                  <div className="text-xs text-amber-700 font-medium">Cập nhật trùng</div>
                  <div className="text-sm sm:text-base font-black text-amber-800 mt-0.5">
                    {mergePreview.updatedCount}
                  </div>
                </div>
              </div>

              {/* Preview items list */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Xem trước 5 từ đầu tiên:
                </div>
                <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                  {parseResult?.items.slice(0, 5).map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">
                            {item.japanese}
                          </span>
                          <span className="text-slate-500">{item.hiragana}</span>
                          <span className="text-[10px] text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
                            {item.type}
                          </span>
                        </div>
                        <div className="text-slate-600 truncate mt-0.5">
                          {item.vietnamese}
                        </div>
                        {item.exampleSentence && (
                          <div className="text-[11px] text-slate-400 truncate mt-0.5">
                            Ví dụ: {item.exampleSentence}
                          </div>
                        )}
                      </div>

                      <div className="text-right shrink-0 text-[11px] text-slate-400">
                        T{item.week}-N{item.day}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Firestore sync toggle */}
              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoSyncFirestore}
                  onChange={(e) => setAutoSyncFirestore(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <div className="text-xs">
                  <span className="font-bold text-slate-800">
                    Tự động đồng bộ lên Cloud Firestore
                  </span>
                  <span className="text-slate-500 block text-[11px]">
                    Lưu trữ vĩnh viễn trên database để truy cập từ các thiết bị khác
                  </span>
                </div>
              </label>
            </div>
          )}
        </div>

        {/* Footer Actions (Thumb-Friendly >= 48px) */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="text-xs text-slate-500 w-full sm:w-auto text-center sm:text-left">
            {isSyncing ? (
              <span className="text-indigo-600 font-semibold animate-pulse flex items-center gap-1.5">
                <CloudUpload size={15} />
                <span>{syncStatusMsg || "Đang đồng bộ..."}</span>
              </span>
            ) : (
              <span>Định dạng hỗ trợ: JSON hoặc CSV</span>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              disabled={isSyncing}
              className="flex-1 sm:flex-none min-h-[48px] px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer disabled:opacity-50"
            >
              Đóng
            </button>

            {mergePreview && mergePreview.mergedList.length > 0 && (
              <button
                onClick={handleConfirmMerge}
                disabled={isSyncing}
                className="flex-1 sm:flex-none min-h-[48px] px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <CheckCircle2 size={16} />
                <span>Xác nhận ghép ({mergePreview.totalAfter} từ)</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
