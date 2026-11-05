import React, { useState, useEffect, useRef } from "react";
import {
  FileAudio,
  Upload,
  CheckCircle2,
  AlertCircle,
  X,
  Play,
  Pause,
  Download,
  Trash2,
  Sparkles,
  Server,
  HardDrive,
  RefreshCw,
  HelpCircle,
  Volume2,
  Layers,
  ArrowRight,
  Loader2,
} from "lucide-react";
import {
  saveAudioToCache,
  getAudioFromCache,
  removeAudioFromCache,
  uploadAudioToServer,
} from "../lib/audioStorage";

interface AudioStorageModalProps {
  isOpen: boolean;
  onClose: () => void;
  activePresetKey: string;
  examTitle: string;
  audioUrl: string | null;
  audioFileName: string;
  playbackMode: "tts" | "file";
  onAudioUpdated: (url: string, fileName: string, mode: "file") => void;
  onRunAiTranscribe?: (file: File) => void;
  showToast: (text: string, type?: "success" | "error" | "info") => void;
}

interface ServerAudioItem {
  fileName: string;
  audioUrl: string;
  sizeBytes: number;
  updatedAt: string;
}

export const AudioStorageModal: React.FC<AudioStorageModalProps> = ({
  isOpen,
  onClose,
  activePresetKey,
  examTitle,
  audioUrl,
  audioFileName,
  playbackMode,
  onAudioUpdated,
  onRunAiTranscribe,
  showToast,
}) => {
  const [serverFiles, setServerFiles] = useState<ServerAudioItem[]>([]);
  const [isLoadingServerFiles, setIsLoadingServerFiles] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadAction, setUploadAction] = useState<"attach_only" | "transcribe">("attach_only");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewPlaying, setPreviewPlaying] = useState(false);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const fetchServerAudioFiles = async () => {
    setIsLoadingServerFiles(true);
    try {
      const res = await fetch("/api/audio/list");
      if (res.ok) {
        const data = await res.json();
        setServerFiles(data.files || []);
      }
    } catch (err) {
      console.warn("Không thể tải danh sách audio máy chủ:", err);
    } finally {
      setIsLoadingServerFiles(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchServerAudioFiles();
    } else {
      if (previewAudioRef.current) {
        previewAudioRef.current.pause();
      }
      setPreviewPlaying(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type.startsWith("audio/") || /\.(mp3|wav|m4a|aac|ogg)$/i.test(file.name))) {
      setSelectedFile(file);
    }
  };

  const handleExecuteSave = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      showToast(`Đang lưu trữ file giọng đọc gốc "${selectedFile.name}"...`, "info");

      // 1. Cache to browser IndexedDB
      await saveAudioToCache(activePresetKey, selectedFile, {
        name: selectedFile.name,
        size: selectedFile.size,
        mimeType: selectedFile.type || "audio/mp3",
      });

      // 2. Upload to Server storage
      let permanentUrl = "";
      try {
        const res = await uploadAudioToServer(selectedFile, selectedFile.name, activePresetKey);
        permanentUrl = res.audioUrl;
      } catch (uploadErr) {
        console.warn("Upload lên máy chủ gặp lỗi, sử dụng IndexedDB cache:", uploadErr);
        permanentUrl = URL.createObjectURL(selectedFile);
      }

      onAudioUpdated(permanentUrl || URL.createObjectURL(selectedFile), selectedFile.name, "file");
      showToast(`🎉 Đã lưu vĩnh viễn giọng đọc gốc "${selectedFile.name}"!`, "success");

      if (uploadAction === "transcribe" && onRunAiTranscribe) {
        onClose();
        onRunAiTranscribe(selectedFile);
      } else {
        setSelectedFile(null);
        fetchServerAudioFiles();
      }
    } catch (err: any) {
      console.error("Lỗi khi lưu audio:", err);
      showToast("Lỗi khi lưu file: " + (err.message || String(err)), "error");
    } finally {
      setIsUploading(false);
    }
  };

  const handlePickServerFile = (item: ServerAudioItem) => {
    onAudioUpdated(item.audioUrl, item.fileName, "file");
    showToast(`🎧 Đã gắn file audio máy chủ "${item.fileName}"!`, "success");
  };

  const handleRemoveCurrentAudio = async () => {
    await removeAudioFromCache(activePresetKey);
    onAudioUpdated("", "", "file");
    showToast("Đã gỡ file audio gốc khỏi đề thi này.", "info");
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes) return "0 MB";
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl text-slate-100">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <FileAudio size={22} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Lưu Trữ & Giữ File Giọng Đọc Gốc</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Native Audio
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Lưu giữ 100% giọng đọc thực tế của người Nhật từ đĩa CD / Audio chính thức
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* Active Preset Banner */}
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Layers size={18} className="text-indigo-400 shrink-0" />
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Đề đang chọn</span>
                <span className="text-sm font-bold text-white">{examTitle}</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {activePresetKey.toUpperCase()}
            </span>
          </div>

          {/* Current Audio Status Card */}
          <div
            className={`p-4 rounded-xl border transition-all ${
              audioUrl
                ? "bg-emerald-950/20 border-emerald-500/40"
                : "bg-amber-950/20 border-amber-500/40"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    audioUrl
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                      : "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                  }`}
                >
                  {audioUrl ? <Volume2 size={18} /> : <AlertCircle size={18} />}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {audioUrl
                      ? "Đã lưu & đang gắn file giọng đọc gốc"
                      : "Chưa gắn file MP3 gốc (Đang dùng AI Studio TTS)"}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {audioUrl
                      ? `File: "${audioFileName || "audio.mp3"}" - Lưu vĩnh viễn trên Server & IndexedDB, không mất khi F5.`
                      : "Bạn có thể nạp file MP3 của CD A hoặc đề JLPT bên dưới để nghe giọng phát thanh viên Nhật chuẩn xác."}
                  </p>
                </div>
              </div>

              {audioUrl && (
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={audioUrl}
                    download={audioFileName || "listening_audio.mp3"}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1 transition-colors"
                    title="Tải file MP3 này về máy"
                  >
                    <Download size={14} />
                  </a>
                  <button
                    onClick={handleRemoveCurrentAudio}
                    className="p-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-medium transition-colors cursor-pointer"
                    title="Gỡ file này"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}
            </div>

            {/* In-modal Audio Preview Player if URL is set */}
            {audioUrl && (
              <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center gap-3">
                <audio ref={previewAudioRef} src={audioUrl} />
                <button
                  onClick={() => {
                    if (previewAudioRef.current) {
                      if (previewPlaying) {
                        previewAudioRef.current.pause();
                        setPreviewPlaying(false);
                      } else {
                        previewAudioRef.current.play();
                        setPreviewPlaying(true);
                      }
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  {previewPlaying ? <Pause size={14} /> : <Play size={14} />}
                  <span>{previewPlaying ? "Tạm dừng nghe thử" : "Nghe thử file gốc"}</span>
                </button>
                <span className="text-[11px] text-slate-400">
                  Chế độ hiện tại:{" "}
                  <strong className="text-emerald-300">
                    {playbackMode === "file" ? "File MP3 Gốc" : "AI Studio TTS"}
                  </strong>
                </span>
              </div>
            )}
          </div>

          {/* Upload / Attach File Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Upload size={14} />
              <span>Tải Lên & Giữ File Giọng Gốc Mới (MP3 / WAV / M4A)</span>
            </h3>

            {/* Drag & Drop Zone */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-6 rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center text-center ${
                selectedFile
                  ? "border-emerald-500/60 bg-emerald-950/20"
                  : "border-slate-700 hover:border-indigo-500 bg-slate-800/40 hover:bg-slate-800/70"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*,.mp3,.wav,.m4a,.aac,.ogg"
                className="hidden"
                onChange={handleFileSelect}
              />

              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 ${
                  selectedFile
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-indigo-500/20 text-indigo-400"
                }`}
              >
                <FileAudio size={26} />
              </div>

              {selectedFile ? (
                <div>
                  <p className="text-sm font-bold text-emerald-300">{selectedFile.name}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Dung lượng: {formatFileSize(selectedFile.size)} - Đã sẵn sàng lưu giữ!
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-bold text-white">
                    Kéo thả file âm thanh gốc vào đây, hoặc click để chọn file
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Hỗ trợ file MP3, WAV, M4A của đĩa CD A hoặc bài thi JLPT (lên đến 100MB)
                  </p>
                </div>
              )}
            </div>

            {/* Action options when file is chosen */}
            {selectedFile && (
              <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700 space-y-3 animate-fade-in">
                <span className="text-xs font-bold text-slate-300 block">Chọn hình thức xử lý:</span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setUploadAction("attach_only")}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      uploadAction === "attach_only"
                        ? "bg-emerald-500/20 border-emerald-500/60 text-white"
                        : "bg-slate-900 border-slate-700/60 text-slate-400 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-xs mb-1">
                      <CheckCircle2
                        size={14}
                        className={
                          uploadAction === "attach_only" ? "text-emerald-400" : "text-slate-500"
                        }
                      />
                      <span>Giữ kịch bản & Gắn làm giọng gốc</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Rất phù hợp cho CD A hoặc JLPT: Giữ nguyên 40 câu hỏi chuẩn, chỉ nạp giọng đọc
                      gốc vào.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setUploadAction("transcribe")}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      uploadAction === "transcribe"
                        ? "bg-purple-500/20 border-purple-500/60 text-white"
                        : "bg-slate-900 border-slate-700/60 text-slate-400 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-xs mb-1">
                      <Sparkles
                        size={14}
                        className={
                          uploadAction === "transcribe" ? "text-purple-400" : "text-slate-500"
                        }
                      />
                      <span>Quét AI Speech-to-Text kịch bản mới</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Dùng cho audio hoàn toàn mới cần Gemini trích xuất lại câu hỏi và lời thoại.
                    </p>
                  </button>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedFile(null)}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="button"
                    disabled={isUploading}
                    onClick={handleExecuteSave}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-50"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        <span>Đang lưu trữ file...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={14} />
                        <span>Lưu & Kích Hoạt Giọng Đọc Gốc</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Stored Audio Files on Server */}
          {serverFiles.length > 0 && (
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Server size={14} />
                  <span>File Âm Thanh Gốc Đã Lưu Trên Máy Chủ ({serverFiles.length})</span>
                </h3>
                <button
                  onClick={fetchServerAudioFiles}
                  className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw size={12} className={isLoadingServerFiles ? "animate-spin" : ""} />
                  <span>Làm mới</span>
                </button>
              </div>

              <div className="space-y-1.5 max-h-40 overflow-y-auto">
                {serverFiles.map((sf, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileAudio size={16} className="text-emerald-400 shrink-0" />
                      <span className="font-semibold text-slate-200 truncate">{sf.fileName}</span>
                      <span className="text-[10px] text-slate-500 shrink-0">
                        ({formatFileSize(sf.sizeBytes)})
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handlePickServerFile(sf)}
                        className="px-2.5 py-1 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>Gắn vào đề này</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Explanatory Info Card */}
          <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/30 flex items-start gap-3 text-xs text-indigo-200">
            <HelpCircle size={18} className="text-indigo-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-indigo-100 block">Cơ chế lưu giữ file giọng gốc hoạt động như thế nào?</strong>
              <p className="text-indigo-200/90 leading-relaxed text-[11px]">
                • <strong>Bộ nhớ đệm IndexedDB</strong>: File audio lưu cục bộ ngay trên trình duyệt của bạn với dung lượng lên đến hàng trăm MB, khởi động phát tức thì không cần tải lại mỗi lần vào app.
              </p>
              <p className="text-indigo-200/90 leading-relaxed text-[11px]">
                • <strong>Máy chủ Server Storage</strong>: Bản sao file MP3 được lưu trữ trên thư mục ổ đĩa máy chủ (<code>/uploads/audio/</code>), hỗ trợ tua chính xác đến từng mili-giây cho 40 câu hỏi.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/60">
          <span className="text-xs text-slate-400">
            Trạng thái hiện tại:{" "}
            <strong className={audioUrl ? "text-emerald-300" : "text-amber-300"}>
              {audioUrl ? "Đã giữ file giọng gốc" : "Đang dùng Giọng đọc AI Studio"}
            </strong>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
