import fs from "fs";
import path from "path";
import cron, { ScheduledTask } from "node-cron";
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  doc,
  writeBatch,
  collection,
  getCountFromServer,
  Firestore,
} from "firebase/firestore";

import { jlpt2021N4ListeningExam, examIntroSections } from "../data/listeningN4_2021";
import { cdaQuestions, cdaExamIntroSections } from "../data/listeningN4_CDA";
import { listeningN4NotesData } from "../data/listeningNotesN4";
import { n4Vocabulary } from "../data/vocabulary";
import { n4Grammar } from "../data/grammar";
import { hanTu1200List } from "../data/hanTu1200";
import { kanjiSoTrungCapList } from "../data/kanjiSoTrungCap";
import { dongDuKanjiList } from "../data/dongDuKanji";
import { tuVungChuDeList, tuVungBaiHocList } from "../data/tuVungN3";

// Read Firebase config from firebase-applet-config.json
let serverDb: Firestore | null = null;
try {
  const configPath = path.resolve(process.cwd(), "firebase-applet-config.json");
  if (fs.existsSync(configPath)) {
    const raw = fs.readFileSync(configPath, "utf-8");
    const cfg = JSON.parse(raw);
    const fbApp = getApps().length > 0 ? getApp() : initializeApp({
      apiKey: cfg.apiKey,
      authDomain: cfg.authDomain,
      projectId: cfg.projectId,
      storageBucket: cfg.storageBucket,
      messagingSenderId: cfg.messagingSenderId,
      appId: cfg.appId,
    });
    serverDb = cfg.firestoreDatabaseId && cfg.firestoreDatabaseId !== "(default)"
      ? getFirestore(fbApp, cfg.firestoreDatabaseId)
      : getFirestore(fbApp);
    console.log("[Firebase Server] Initialized with DB:", cfg.firestoreDatabaseId || "(default)");
  }
} catch (err) {
  console.warn("[Firebase Server] Could not init Firebase on server:", err);
}

export interface SyncLogEntry {
  id: string;
  timestamp: string;
  triggerType: string;
  status: "success" | "error";
  durationMs: number;
  itemsSynced: number;
  details?: string;
}

// Cronjob State Tracker
export interface CronState {
  active: boolean;
  schedule: string;
  scheduleDescription: string;
  lastRun: string | null;
  nextRun: string | null;
  lastStatus: "idle" | "running" | "success" | "error";
  lastError: string | null;
  totalRuns: number;
  lastStats: any | null;
  recentLogs: SyncLogEntry[];
}

const SCHEDULE_PRESETS: Record<string, string> = {
  "*/15 * * * *": "Mỗi 15 phút (Every 15 minutes)",
  "*/30 * * * *": "Mỗi 30 phút (Every 30 minutes)",
  "0 * * * *": "Mỗi 1 giờ (Hourly at minute 0)",
  "0 */2 * * *": "Mỗi 2 giờ (Every 2 hours)",
  "0 */6 * * *": "Mỗi 6 giờ (Every 6 hours)",
  "0 0 * * *": "Mỗi ngày lúc 00:00 (Daily at midnight)",
};

const cronState: CronState = {
  active: true,
  schedule: "0 * * * *", // Default: Every hour at minute 0
  scheduleDescription: SCHEDULE_PRESETS["0 * * * *"],
  lastRun: null,
  nextRun: null,
  lastStatus: "idle",
  lastError: null,
  totalRuns: 0,
  lastStats: null,
  recentLogs: [],
};

let currentCronTask: ScheduledTask | null = null;

// Estimate next run based on standard cron schedules
function estimateNextRun(schedule: string): string {
  const now = new Date();
  if (schedule === "*/15 * * * *") {
    const minutes = now.getMinutes();
    const nextMin = (Math.floor(minutes / 15) + 1) * 15;
    const nextDate = new Date(now);
    nextDate.setMinutes(nextMin, 0, 0);
    return nextDate.toISOString();
  }
  if (schedule === "*/30 * * * *") {
    const minutes = now.getMinutes();
    const nextMin = (Math.floor(minutes / 30) + 1) * 30;
    const nextDate = new Date(now);
    nextDate.setMinutes(nextMin, 0, 0);
    return nextDate.toISOString();
  }
  if (schedule === "0 * * * *") {
    const nextDate = new Date(now);
    nextDate.setHours(now.getHours() + 1, 0, 0, 0);
    return nextDate.toISOString();
  }
  if (schedule === "0 */2 * * *") {
    const hours = now.getHours();
    const nextHour = (Math.floor(hours / 2) + 1) * 2;
    const nextDate = new Date(now);
    nextDate.setHours(nextHour, 0, 0, 0);
    return nextDate.toISOString();
  }
  if (schedule === "0 */6 * * *") {
    const hours = now.getHours();
    const nextHour = (Math.floor(hours / 6) + 1) * 6;
    const nextDate = new Date(now);
    nextDate.setHours(nextHour, 0, 0, 0);
    return nextDate.toISOString();
  }
  if (schedule === "0 0 * * *") {
    const nextDate = new Date(now);
    nextDate.setDate(now.getDate() + 1);
    nextDate.setHours(0, 0, 0, 0);
    return nextDate.toISOString();
  }
  // Default: in 1 hour
  return new Date(Date.now() + 3600 * 1000).toISOString();
}

/**
 * Execute full sync of listening data + vocab + grammar + all kanji datasets to Firestore
 */
export async function executeServerSync(triggerType: string = "cronjob") {
  if (!serverDb) {
    throw new Error("Firebase Firestore chưa được cấu hình trên server.");
  }

  const startTime = Date.now();
  cronState.lastStatus = "running";
  console.log(`[Firebase Sync ${triggerType}] Bắt đầu đồng bộ dữ liệu toàn diện lên Cloud Firestore...`);

  try {
    const nowIso = new Date().toISOString();
    const allQuestions = [
      ...jlpt2021N4ListeningExam.map((q) => ({ ...q, examId: "jlpt_2021_n4", docKey: `2021_${q.id}` })),
      ...cdaQuestions.map((q) => ({ ...q, examId: "jitsuryoku_up_cda", docKey: `cda_${q.id}` })),
    ];

    // 1. Sync Listening Exams
    const examBatch = writeBatch(serverDb);
    examBatch.set(doc(serverDb, "listening_exams", "jlpt_2021_n4"), {
      id: "jlpt_2021_n4",
      title: "Đề thi JLPT N4 07/2021 (Đề chuẩn 32 câu)",
      subtitle: "Đề thi chính thức với lời thoại và đáp án phân tích chi tiết",
      questionsCount: jlpt2021N4ListeningExam.length,
      sectionsCount: examIntroSections.length,
      introSections: examIntroSections,
      updatedAt: nowIso,
    });
    examBatch.set(doc(serverDb, "listening_exams", "jitsuryoku_up_cda"), {
      id: "jitsuryoku_up_cda",
      title: "実力アップ! N4 聞く 聴解 (CD A - 40 câu)",
      subtitle: "Sách luyện thi N4 Jitsuryoku Up - CD A trọn bộ 40 bài tập hội thoại thực tế",
      questionsCount: cdaQuestions.length,
      sectionsCount: cdaExamIntroSections.length,
      introSections: cdaExamIntroSections,
      updatedAt: nowIso,
    });
    await examBatch.commit();

    // 2. Sync Listening Questions (chunks of 200)
    const Q_CHUNK = 200;
    for (let i = 0; i < allQuestions.length; i += Q_CHUNK) {
      const chunk = allQuestions.slice(i, i + Q_CHUNK);
      const qBatch = writeBatch(serverDb);
      chunk.forEach((item) => {
        qBatch.set(doc(serverDb!, "listening_questions", item.docKey), {
          id: item.id,
          examId: item.examId,
          mondai: item.mondai,
          mondaiTitle: item.mondaiTitle,
          questionNumber: item.questionNumber,
          isExample: Boolean(item.isExample),
          timeStart: item.timeStart,
          timeEnd: item.timeEnd,
          timestampDisplay: item.timestampDisplay,
          title: item.title,
          situation: item.situation,
          situationVietnamese: item.situationVietnamese,
          questionText: item.questionText,
          questionVietnamese: item.questionVietnamese,
          options: item.options,
          correctAnswer: item.correctAnswer,
          script: item.script,
          explanation: item.explanation,
          keyVocabulary: item.keyVocabulary,
          updatedAt: nowIso,
        });
      });
      await qBatch.commit();
    }

    // 3. Sync Listening 90 Notes (chunks of 200)
    for (let i = 0; i < listeningN4NotesData.length; i += Q_CHUNK) {
      const chunk = listeningN4NotesData.slice(i, i + Q_CHUNK);
      const nBatch = writeBatch(serverDb);
      chunk.forEach((item) => {
        nBatch.set(doc(serverDb!, "listening_notes", String(item.id)), {
          id: item.id,
          category: item.category,
          japanese: item.japanese,
          hiragana: item.hiragana,
          romaji: item.romaji,
          vietnamese: item.vietnamese,
          examTip: item.examTip,
          exampleSentence: item.exampleSentence || null,
          updatedAt: nowIso,
        });
      });
      await nBatch.commit();
    }

    // 4. Sync Hán Tự 1200 (1,264 mục)
    for (let i = 0; i < hanTu1200List.length; i += Q_CHUNK) {
      const chunk = hanTu1200List.slice(i, i + Q_CHUNK);
      const kBatch = writeBatch(serverDb);
      chunk.forEach((item) => {
        kBatch.set(doc(serverDb!, "kanji_1200", item.id), {
          id: item.id,
          stt: item.stt,
          trang: item.trang,
          khung: item.khung,
          so: item.so,
          kanji: item.kanji,
          hanViet: item.hanViet,
          meaning: item.meaning,
          note: item.note || "",
          isRadical: Boolean(item.isRadical),
          updatedAt: nowIso,
        });
      });
      await kBatch.commit();
    }

    // 5. Sync Kanji Sơ Trung Cấp (402 chữ với âm On/Kun Hiragana và ví dụ Động từ/Danh từ)
    for (let i = 0; i < kanjiSoTrungCapList.length; i += Q_CHUNK) {
      const chunk = kanjiSoTrungCapList.slice(i, i + Q_CHUNK);
      const interBatch = writeBatch(serverDb);
      chunk.forEach((item) => {
        interBatch.set(doc(serverDb!, "kanji_intermediate", item.id), {
          id: item.id,
          stt: item.stt,
          hang: item.hang,
          kanji: item.kanji,
          hanViet: item.hanViet,
          onyomi: item.onyomi || [],
          kunyomi: item.kunyomi || [],
          meaning: item.meaning,
          words: item.words || [],
          updatedAt: nowIso,
        });
      });
      await interBatch.commit();
    }

    // 6. Sync 100 Kanji Đông Du (với chiết tự, bộ thủ, âm On/Kun Hiragana và ví dụ Động từ/Danh từ)
    for (let i = 0; i < dongDuKanjiList.length; i += Q_CHUNK) {
      const chunk = dongDuKanjiList.slice(i, i + Q_CHUNK);
      const ddBatch = writeBatch(serverDb);
      chunk.forEach((item) => {
        ddBatch.set(doc(serverDb!, "dongdu_kanji", item.id), {
          id: item.id,
          kanji: item.kanji,
          hanViet: item.hanViet,
          onyomi: item.onyomi || [],
          kunyomi: item.kunyomi || [],
          meaning: item.meaning,
          radical: item.radical,
          radicalMeaning: item.radicalMeaning,
          strokeCount: item.strokeCount,
          mnemonic: item.mnemonic,
          words: item.words || [],
          col: item.col,
          row: item.row,
          order: item.order,
          updatedAt: nowIso,
        });
      });
      await ddBatch.commit();
    }

    // 7. Sync Từ vựng theo chủ đề (259 từ)
    for (let i = 0; i < tuVungChuDeList.length; i += Q_CHUNK) {
      const chunk = tuVungChuDeList.slice(i, i + Q_CHUNK);
      const topicBatch = writeBatch(serverDb);
      chunk.forEach((item) => {
        topicBatch.set(doc(serverDb!, "vocab_topics", item.id), {
          id: item.id,
          stt: item.stt,
          topic: item.topic,
          word: item.word,
          hiragana: item.hiragana,
          hanViet: item.hanViet,
          meaning: item.meaning,
          note: item.note || "",
          updatedAt: nowIso,
        });
      });
      await topicBatch.commit();
    }

    // 8. Sync Từ vựng bài học (34 từ)
    const lessonBatch = writeBatch(serverDb);
    tuVungBaiHocList.forEach((item) => {
      lessonBatch.set(doc(serverDb!, "vocab_lessons", item.id), {
        id: item.id,
        stt: item.stt,
        bai: item.bai,
        slide: item.slide,
        word: item.word,
        hiragana: item.hiragana,
        hanViet: item.hanViet,
        meaning: item.meaning,
        example: item.example || "",
        note: item.note || "",
        updatedAt: nowIso,
      });
    });
    await lessonBatch.commit();

    const durationMs = Date.now() - startTime;
    const totalItemsCount =
      2 +
      allQuestions.length +
      listeningN4NotesData.length +
      n4Vocabulary.length +
      n4Grammar.length +
      hanTu1200List.length +
      kanjiSoTrungCapList.length +
      dongDuKanjiList.length +
      tuVungChuDeList.length +
      tuVungBaiHocList.length;

    // 9. Record sync log in Firestore
    const logId = `sync_${Date.now()}`;
    const logBatch = writeBatch(serverDb);
    logBatch.set(doc(serverDb, "sync_logs", logId), {
      id: logId,
      timestamp: nowIso,
      type: triggerType,
      durationMs,
      totalItemsCount,
      examsCount: 2,
      questionsCount: allQuestions.length,
      notesCount: listeningN4NotesData.length,
      vocabCount: n4Vocabulary.length,
      grammarCount: n4Grammar.length,
      kanji1200Count: hanTu1200List.length,
      kanji402Count: kanjiSoTrungCapList.length,
      dongDuKanjiCount: dongDuKanjiList.length,
      vocabTopicsCount: tuVungChuDeList.length,
      vocabLessonsCount: tuVungBaiHocList.length,
      status: "success",
    });
    await logBatch.commit();

    cronState.lastRun = nowIso;
    cronState.nextRun = estimateNextRun(cronState.schedule);
    cronState.lastStatus = "success";
    cronState.lastError = null;
    cronState.totalRuns += 1;
    cronState.lastStats = {
      examsCount: 2,
      questionsCount: allQuestions.length,
      notesCount: listeningN4NotesData.length,
      vocabCount: n4Vocabulary.length,
      grammarCount: n4Grammar.length,
      kanji1200Count: hanTu1200List.length,
      kanji402Count: kanjiSoTrungCapList.length,
      dongDuKanjiCount: dongDuKanjiList.length,
      vocabTopicsCount: tuVungChuDeList.length,
      vocabLessonsCount: tuVungBaiHocList.length,
      totalItemsCount,
      durationMs,
      timestamp: nowIso,
    };

    // Add to in-memory recent logs
    cronState.recentLogs.unshift({
      id: logId,
      timestamp: nowIso,
      triggerType,
      status: "success",
      durationMs,
      itemsSynced: totalItemsCount,
      details: `${totalItemsCount} mục đồng bộ thành công trong ${(durationMs / 1000).toFixed(1)}s`,
    });
    if (cronState.recentLogs.length > 10) {
      cronState.recentLogs.pop();
    }

    console.log(`[Firebase Sync ${triggerType}] ✅ Đồng bộ thành công: ${totalItemsCount} mục trong ${(durationMs / 1000).toFixed(1)}s!`);
    return {
      success: true,
      timestamp: nowIso,
      durationMs,
      stats: cronState.lastStats,
    };
  } catch (err: any) {
    const durationMs = Date.now() - startTime;
    cronState.lastStatus = "error";
    cronState.lastError = err?.message || String(err);
    cronState.recentLogs.unshift({
      id: `err_${Date.now()}`,
      timestamp: new Date().toISOString(),
      triggerType,
      status: "error",
      durationMs,
      itemsSynced: 0,
      details: err?.message || String(err),
    });
    if (cronState.recentLogs.length > 10) {
      cronState.recentLogs.pop();
    }
    console.error(`[Firebase Sync ${triggerType}] ❌ Lỗi đồng bộ:`, err);
    throw err;
  }
}

/**
 * Initialize or update background cron job on server
 */
export function initCronSync() {
  if (currentCronTask) {
    currentCronTask.stop();
    currentCronTask = null;
  }

  if (!cronState.active) {
    console.log("[Cronjob] Cron Sync hiện đang ở chế độ Tạm dừng (Paused).");
    return;
  }

  try {
    currentCronTask = cron.schedule(cronState.schedule, async () => {
      console.log(`[Cronjob] [${new Date().toLocaleTimeString("vi-VN")}] Bắt đầu chạy sync tự động theo lịch (${cronState.schedule})...`);
      try {
        await executeServerSync("cronjob");
      } catch (err: any) {
        console.warn("[Cronjob] Lỗi khi chạy tự động:", err?.message);
      }
    });

    cronState.nextRun = estimateNextRun(cronState.schedule);
    console.log(`[Cronjob] ✅ Đã kích hoạt Cronjob tự động: "${cronState.schedule}" (${cronState.scheduleDescription}). Lần chạy kế tiếp: ${cronState.nextRun}`);
  } catch (err: any) {
    console.error("[Cronjob] Lỗi thiết lập lịch cron:", err);
  }

  // Initial sync 3 seconds after server boots up
  setTimeout(async () => {
    try {
      console.log("[Cronjob] Chạy đồng bộ khởi động ban đầu (Initial sync on boot)...");
      await executeServerSync("boot_sync");
    } catch (e: any) {
      console.warn("[Cronjob] Initial sync warning:", e?.message);
    }
  }, 3000);
}

/**
 * Update cron schedule dynamically (e.g. every 15m, 30m, 1h, 6h, daily)
 */
export function setCronSchedule(newSchedule: string, description?: string) {
  if (!cron.validate(newSchedule)) {
    throw new Error(`Biểu thức cron không hợp lệ: "${newSchedule}"`);
  }

  cronState.schedule = newSchedule;
  cronState.scheduleDescription = description || SCHEDULE_PRESETS[newSchedule] || `Lịch tùy chỉnh (${newSchedule})`;
  cronState.nextRun = estimateNextRun(newSchedule);

  if (cronState.active) {
    initCronSync();
  }

  console.log(`[Cronjob] Đã cập nhật lịch Cron mới: "${newSchedule}" (${cronState.scheduleDescription})`);
  return getCronSyncStatus();
}

/**
 * Toggle Cron job active or paused
 */
export function toggleCronActive(enable?: boolean) {
  const targetState = enable !== undefined ? enable : !cronState.active;
  cronState.active = targetState;

  if (targetState) {
    initCronSync();
  } else {
    if (currentCronTask) {
      currentCronTask.stop();
      currentCronTask = null;
    }
    cronState.nextRun = null;
    console.log("[Cronjob] Đã tạm dừng Cronjob.");
  }

  return getCronSyncStatus();
}

export function getCronSyncStatus() {
  return {
    ...cronState,
    databaseConfigured: Boolean(serverDb),
    presets: SCHEDULE_PRESETS,
  };
}
