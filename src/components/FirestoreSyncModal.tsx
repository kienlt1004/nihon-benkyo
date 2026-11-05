import React, { useState, useEffect } from "react";
import {
  Database,
  Cloud,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  X,
  RefreshCw,
  UploadCloud,
  Headphones,
  BookOpen,
  Clock,
  Sparkles,
  Zap,
} from "lucide-react";
import {
  getFirestoreDataCounts,
  pushAllDataToFirestore,
  getFirestoreListeningCounts,
  pushAllListeningDataToFirestore,
  ListeningSyncStats,
  SyncStats,
} from "../lib/firestoreSync";
import { n4Vocabulary } from "../data/vocabulary";

interface FirestoreSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "listening" | "vocab" | "cron" | "all";
}

export const FirestoreSyncModal: React.FC<FirestoreSyncModalProps> = ({
  isOpen,
  onClose,
  defaultTab = "listening",
}) => {
  const [activeTab, setActiveTab] = useState<"listening" | "vocab" | "cron">(
    defaultTab === "cron" ? "cron" : defaultTab === "vocab" ? "vocab" : "listening"
  );
  const [stats, setStats] = useState<SyncStats | null>(null);
  const [listeningStats, setListeningStats] = useState<ListeningSyncStats | null>(null);
  const [cronStatus, setCronStatus] = useState<any | null>(null);
  const [isUpdatingSchedule, setIsUpdatingSchedule] = useState(false);

  const [isLoadingCounts, setIsLoadingCounts] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState("");
  const [syncSuccess, setSyncSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchStats = async () => {
    setIsLoadingCounts(true);
    setErrorMessage(null);
    try {
      const [vData, lData] = await Promise.all([
        getFirestoreDataCounts(),
        getFirestoreListeningCounts(),
      ]);
      setStats(vData);
      setListeningStats(lData);

      // Fetch server cron status
      try {
        const cronRes = await fetch("/api/sync/cron-status");
        if (cronRes.ok) {
          const cronData = await cronRes.json();
          setCronStatus(cronData);
        }
      } catch (cronErr) {
        console.warn("Could not fetch cron status:", cronErr);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Không thể tải số liệu từ Firestore");
    } finally {
      setIsLoadingCounts(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab === "cron" ? "cron" : defaultTab === "vocab" ? "vocab" : "listening");
      fetchStats();
      setSyncSuccess(false);
      setSyncProgress(0);
      setProgressMessage("");
      setErrorMessage(null);
    }
  }, [isOpen, defaultTab]);

  // Sync only listening data (Exams + Questions + 87 Notes)
  const handleSyncListening = async () => {
    setIsSyncing(true);
    setErrorMessage(null);
    setSyncSuccess(false);
    setSyncProgress(0);
    setProgressMessage("Đang chuẩn bị đẩy toàn bộ dữ liệu phần nghe (2 đề thi + 72 câu + 87 lưu ý)...");

    try {
      await pushAllListeningDataToFirestore((msg, pct) => {
        setProgressMessage(msg);
        setSyncProgress(pct);
      }, "manual");
      setSyncSuccess(true);
      await fetchStats();
    } catch (err: any) {
      console.error("Lỗi đồng bộ Listening:", err);
      setErrorMessage(err.message || "Có lỗi xảy ra khi đẩy dữ liệu phần nghe lên Firestore.");
    } finally {
      setIsSyncing(false);
    }
  };

  // Sync vocabulary & grammar
  const handleSyncVocab = async () => {
    setIsSyncing(true);
    setErrorMessage(null);
    setSyncSuccess(false);
    setSyncProgress(0);
    setProgressMessage("Đang khởi tạo kết nối Cloud Firestore...");

    try {
      await pushAllDataToFirestore((msg, pct) => {
        setProgressMessage(msg);
        setSyncProgress(pct);
      });
      setSyncSuccess(true);
      await fetchStats();
    } catch (err: any) {
      console.error("Lỗi đồng bộ:", err);
      setErrorMessage(err.message || "Có lỗi xảy ra trong quá trình ghi dữ liệu lên Firestore.");
    } finally {
      setIsSyncing(false);
    }
  };

  // Trigger server-side sync & cronjob
  const handleTriggerServerCron = async () => {
    setIsSyncing(true);
    setErrorMessage(null);
    setSyncSuccess(false);
    setSyncProgress(25);
    setProgressMessage("Đang kích hoạt cronjob đồng bộ tự động trên server Express...");

    try {
      const res = await fetch("/api/sync/trigger", { method: "POST" });
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || "Server sync failed");
      }
      setSyncProgress(100);
      setProgressMessage("Cronjob đã hoàn tất đồng bộ thành công!");
      setSyncSuccess(true);
      await fetchStats();
    } catch (err: any) {
      console.error("Lỗi kích hoạt server cron:", err);
      setErrorMessage(err.message || "Không thể kích hoạt cronjob trên server.");
    } finally {
      setIsSyncing(false);
    }
  };

  // Update cron schedule
  const handleUpdateSchedule = async (newSchedule: string, description?: string) => {
    setIsUpdatingSchedule(true);
    setErrorMessage(null);
    try {
      const res = await fetch("/api/sync/cron-schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schedule: newSchedule, description }),
      });
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || "Không thể cập nhật lịch");
      }
      const data = await res.json();
      setCronStatus(data);
    } catch (err: any) {
      console.error("Lỗi cập nhật lịch cron:", err);
      setErrorMessage(err.message || "Không thể cập nhật tần suất cron.");
    } finally {
      setIsUpdatingSchedule(false);
    }
  };

  // Toggle cron active / paused
  const handleToggleCron = async () => {
    setErrorMessage(null);
    try {
      const res = await fetch("/api/sync/cron-toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !cronStatus?.active }),
      });
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || "Lỗi cập nhật trạng thái");
      }
      const data = await res.json();
      setCronStatus(data);
    } catch (err: any) {
      console.error("Lỗi bật/tắt cron:", err);
      setErrorMessage(err.message || "Không thể thay đổi trạng thái cron.");
    }
  };

  if (!isOpen) return null;

  const firestoreConsoleUrl =
    "https://console.firebase.google.com/project/gen-lang-client-0416030341/firestore/databases/ai-studio-nihongon4vocab-fd5ad8c1-ca14-45f6-8619-a4844ba03736/data";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md">
              <Database size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white">
                  Đồng Bộ Dữ Liệu Lên Cloud Firestore
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500 text-white">
                  NoSQL DB
                </span>
              </div>
              <p className="text-xs text-indigo-200">
                Đẩy dữ liệu phần nghe (2 đề thi, 72 câu hỏi, 87 lưu ý) & tự động hóa với Cronjob
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-indigo-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="px-6 pt-3 pb-1 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs shrink-0 font-bold">
          <button
            onClick={() => setActiveTab("listening")}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "listening"
                ? "bg-white text-indigo-900 shadow-xs border border-indigo-200/80"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Headphones size={14} className="text-indigo-600" />
            <span>Phần Nghe Hiểu (72 câu + 87 lưu ý)</span>
          </button>

          <button
            onClick={() => setActiveTab("cron")}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "cron"
                ? "bg-white text-indigo-900 shadow-xs border border-indigo-200/80"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Clock size={14} className="text-amber-500" />
            <span>Cronjob Tự Động Sync</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </button>

          <button
            onClick={() => setActiveTab("vocab")}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "vocab"
                ? "bg-white text-indigo-900 shadow-xs border border-indigo-200/80"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <BookOpen size={14} className="text-slate-500" />
            <span>Từ Vựng & Ngữ Pháp N4</span>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Database Info Box */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 font-mono">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-sans">Firebase Project ID:</span>
              <span className="font-semibold text-slate-800">gen-lang-client-0416030341</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-sans">Firestore Database:</span>
              <span className="font-bold text-indigo-700 truncate max-w-[280px]">
                ai-studio-nihongon4vocab-fd5ad8c1-ca14-45f6-8619-a4844ba03736
              </span>
            </div>
          </div>

          {/* TAB 1: LISTENING DATA STATS */}
          {activeTab === "listening" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-600">
                  Dữ Liệu Phần Nghe (2 Bộ Đề + 87 Lưu Ý)
                </h4>
                <button
                  onClick={fetchStats}
                  className="text-xs text-indigo-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw size={12} className={isLoadingCounts ? "animate-spin" : ""} />
                  <span>Cập nhật số liệu</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* 1. Exams */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-1">
                  <div className="text-[11px] font-bold text-slate-500 flex items-center justify-between">
                    <span>listening_exams</span>
                    <span className="text-xs">📁</span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-slate-900">
                      {listeningStats ? listeningStats.examsInFirestore : "—"}
                    </span>
                    <span className="text-xs text-slate-400">/ 2 đề</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium">
                    JLPT 2021 & CD A (Jitsuryoku)
                  </p>
                </div>

                {/* 2. Questions */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-1">
                  <div className="text-[11px] font-bold text-slate-500 flex items-center justify-between">
                    <span>listening_questions</span>
                    <span className="text-xs">🎧</span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-indigo-600">
                      {listeningStats ? listeningStats.questionsInFirestore : "—"}
                    </span>
                    <span className="text-xs text-slate-400">
                      / {listeningStats ? listeningStats.localQuestionsCount : 72} câu
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium">
                    Kèm 100% script, dịch & giải thích
                  </p>
                </div>

                {/* 3. 87 Notes */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-1">
                  <div className="text-[11px] font-bold text-slate-500 flex items-center justify-between">
                    <span>listening_notes</span>
                    <span className="text-xs">🔥</span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-amber-600">
                      {listeningStats ? listeningStats.notesInFirestore : "—"}
                    </span>
                    <span className="text-xs text-slate-400">
                      / {listeningStats ? listeningStats.localNotesCount : 87} bí kíp
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium">
                    Phòng luyện voice & mẹo đề thi
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-900 leading-relaxed">
                <p className="font-bold flex items-center gap-1.5 text-indigo-950">
                  <Sparkles size={14} className="text-amber-500" />
                  Nội dung sẽ được đẩy lên Cloud Firestore:
                </p>
                <ul className="list-disc list-inside mt-1.5 space-y-1 text-[11px] text-indigo-800">
                  <li><strong>Đề thi JLPT N4 07/2021:</strong> 5 phần mở đầu/hướng dẫn + 32 câu hỏi thi chính thức (Mondai 1-4).</li>
                  <li><strong>Đề thi 実力アップ! N4 聞く 聴解 (CD A):</strong> 6 phần giới thiệu + 40 câu hỏi chi tiết phân vai chuẩn Nhật.</li>
                  <li><strong>87 Lưu Ý Vàng & Phòng Luyện Voice:</strong> 8 chủ đề (Chào hỏi, Trang phục, Đồ vật, Phương hướng, Thứ tự, Lượng từ...).</li>
                  <li>Mỗi câu hỏi lưu trữ đầy đủ: Kịch bản Kanji/Hiragana, bản dịch tiếng Việt, 4 lựa chọn, đáp án đúng và từ vựng then chốt.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: CRONJOB AUTO-SYNC STATUS & CONFIGURATION */}
          {activeTab === "cron" && (
            <div className="space-y-4">
              {/* Header Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Clock size={20} />
                  </div>
                  <div className="text-xs">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-extrabold text-emerald-950">
                        Cronjob Tự Động Đồng Bộ Dữ Liệu
                      </h4>
                      {cronStatus?.active ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-600 text-white flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          ACTIVE
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-white">
                          PAUSED
                        </span>
                      )}
                    </div>
                    <p className="text-emerald-800 mt-1 leading-relaxed">
                      Tiến trình nền Express tự động quét và đồng bộ toàn bộ 10 tập dữ liệu (1,959 mục Hán tự/Từ vựng, 2 đề thi nghe, 71 câu hỏi, 90 lưu ý, ngữ pháp N4) lên Firebase Firestore.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleToggleCron}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-colors cursor-pointer border ${
                    cronStatus?.active
                      ? "bg-white hover:bg-slate-100 text-slate-700 border-slate-200"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white border-transparent"
                  }`}
                >
                  {cronStatus?.active ? "Tạm dừng" : "Kích hoạt lại"}
                </button>
              </div>

              {/* Schedule Frequency Selector */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Tần Suất Đồng Bộ Tự Động:</span>
                  {isUpdatingSchedule && (
                    <span className="text-[11px] text-indigo-600 font-semibold animate-pulse">
                      Đang cập nhật lịch...
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { schedule: "*/15 * * * *", label: "Mỗi 15 phút" },
                    { schedule: "*/30 * * * *", label: "Mỗi 30 phút" },
                    { schedule: "0 * * * *", label: "Mỗi 1 giờ (Mặc định)" },
                    { schedule: "0 */2 * * *", label: "Mỗi 2 giờ" },
                    { schedule: "0 */6 * * *", label: "Mỗi 6 giờ" },
                    { schedule: "0 0 * * *", label: "Mỗi ngày lúc 0h" },
                  ].map((p) => {
                    const isSelected = cronStatus?.schedule === p.schedule;
                    return (
                      <button
                        key={p.schedule}
                        disabled={isUpdatingSchedule}
                        onClick={() => handleUpdateSchedule(p.schedule, p.label)}
                        className={`p-2 rounded-xl text-xs font-bold border text-center transition-all cursor-pointer ${
                          isSelected
                            ? "bg-indigo-50 border-indigo-300 text-indigo-900 ring-2 ring-indigo-500/20"
                            : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700"
                        }`}
                      >
                        <div>{p.label}</div>
                        <div className="text-[9px] font-mono text-slate-400 mt-0.5">{p.schedule}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Status details table */}
              <div className="space-y-2 p-4 rounded-2xl border border-slate-200 bg-white text-xs space-y-2 shadow-2xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Lịch trình đang áp dụng:</span>
                  <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md font-mono">
                    {cronStatus?.schedule || "0 * * * *"}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Trạng thái hiện tại:</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {cronStatus?.lastStatus === "running"
                      ? "Đang chạy sync..."
                      : cronStatus?.active
                      ? "Đang hoạt động tự động"
                      : "Đang tạm dừng"}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Lần chạy gần nhất (Last Run):</span>
                  <span className="font-semibold text-slate-800">
                    {cronStatus?.lastRun ? new Date(cronStatus.lastRun).toLocaleString("vi-VN") : "Khởi động ban đầu"}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Lần chạy kế tiếp (Next Run):</span>
                  <span className="font-semibold text-indigo-700">
                    {cronStatus?.nextRun ? new Date(cronStatus.nextRun).toLocaleString("vi-VN") : "Chưa lên lịch"}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Tổng số lượt đã chạy:</span>
                  <span className="font-bold text-purple-700">
                    {cronStatus?.totalRuns ?? 0} lần
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Phạm vi đồng bộ:</span>
                  <span className="font-medium text-slate-700 text-right">
                    10 datasets • 1,959 Hán tự/Từ vựng & Đề thi nghe N4
                  </span>
                </div>
              </div>

              {/* Recent Logs if any */}
              {cronStatus?.recentLogs && cronStatus.recentLogs.length > 0 && (
                <div className="p-4 rounded-2xl border border-slate-200 bg-white text-xs space-y-2 shadow-2xs">
                  <span className="font-bold text-slate-700 block">Nhật Ký Các Lần Đồng Bộ Gần Đây:</span>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {cronStatus.recentLogs.map((log: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-[11px]"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              log.status === "success" ? "bg-emerald-500" : "bg-rose-500"
                            }`}
                          />
                          <span className="font-medium text-slate-800">
                            {new Date(log.timestamp).toLocaleTimeString("vi-VN")} ({new Date(log.timestamp).toLocaleDateString("vi-VN")})
                          </span>
                          <span className="text-slate-400">·</span>
                          <span className="font-semibold text-slate-600 capitalize">
                            {log.triggerType === "cronjob" ? "Tự động" : log.triggerType === "boot_sync" ? "Khởi động" : "Thủ công"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 font-mono text-[10px]">
                          <span>{log.itemsSynced} mục</span>
                          <span>•</span>
                          <span>{(log.durationMs / 1000).toFixed(1)}s</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  onClick={handleTriggerServerCron}
                  disabled={isSyncing}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center gap-1.5 transition-all shadow-sm cursor-pointer disabled:opacity-50"
                >
                  <Zap size={14} className="fill-slate-950" />
                  <span>Kích hoạt Cron chạy Sync ngay</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: VOCAB & GRAMMAR */}
          {activeTab === "vocab" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs">
                  <div className="text-xs font-medium text-slate-500 mb-1">
                    Collection: <code className="text-indigo-600 font-bold">vocabulary</code>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-slate-900">
                      {stats ? stats.vocabCountInFirestore : "—"}
                    </span>
                    <span className="text-xs text-slate-400">
                      / {stats ? stats.localVocabCount : n4Vocabulary.length} từ
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs">
                  <div className="text-xs font-medium text-slate-500 mb-1">
                    Collection: <code className="text-indigo-600 font-bold">grammar</code>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-slate-900">
                      {stats ? stats.grammarCountInFirestore : "—"}
                    </span>
                    <span className="text-xs text-slate-400">
                      / {stats ? stats.localGrammarCount : 30} cấu trúc
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSyncVocab}
                disabled={isSyncing}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-900 text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <UploadCloud size={14} />
                <span>Đồng bộ riêng phần Từ Vựng & Ngữ Pháp lên Firestore</span>
              </button>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Sync Progress Bar */}
          {isSyncing && (
            <div className="space-y-2 p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200">
              <div className="flex justify-between text-xs font-bold text-indigo-950">
                <span className="truncate">{progressMessage}</span>
                <span>{syncProgress}%</span>
              </div>
              <div className="w-full h-2.5 bg-indigo-200/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 rounded-full"
                  style={{ width: `${syncProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Success Message */}
          {syncSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-3 animate-in fade-in">
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-extrabold text-sm text-emerald-950">
                  Đồng bộ dữ liệu thành công lên Firebase!
                </p>
                <p className="text-emerald-800 mt-1">
                  Toàn bộ 2 bộ đề thi nghe (JLPT 2021 & CD A), 72 câu hỏi hội thoại kèm kịch bản và 87 lưu ý vàng đã được lưu trữ an toàn trong các collection tương ứng trên Cloud Firestore.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <a
            href={firestoreConsoleUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-slate-500 hover:text-indigo-600 flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink size={13} />
            <span>Xem trực tiếp trên Firebase Console</span>
          </a>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={fetchStats}
              disabled={isLoadingCounts || isSyncing}
              className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
              title="Làm mới số liệu"
            >
              <RefreshCw size={15} className={isLoadingCounts ? "animate-spin" : ""} />
            </button>

            <button
              onClick={handleSyncListening}
              disabled={isSyncing}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              <UploadCloud size={16} />
              <span>
                {isSyncing
                  ? "Đang đẩy dữ liệu..."
                  : syncSuccess
                  ? "Đẩy lại dữ liệu phần nghe"
                  : "Đẩy toàn bộ data phần nghe lên Firebase"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
