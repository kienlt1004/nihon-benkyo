import {
  collection,
  doc,
  writeBatch,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "./firebase";
import { n4Vocabulary } from "../data/vocabulary";
import { n4Grammar } from "../data/grammar";

export interface SyncStats {
  vocabCountInFirestore: number;
  grammarCountInFirestore: number;
  localVocabCount: number;
  localGrammarCount: number;
}

/**
 * Fetch current document counts in Firestore collections
 */
export async function getFirestoreDataCounts(): Promise<SyncStats> {
  const localVocabCount = n4Vocabulary.length;
  const localGrammarCount = n4Grammar.length;

  let vocabCountInFirestore = 0;
  let grammarCountInFirestore = 0;

  try {
    const vocabCol = collection(db, "vocabulary");
    const vocabSnap = await getCountFromServer(vocabCol);
    vocabCountInFirestore = vocabSnap.data().count;
  } catch (err) {
    console.warn("Could not count vocabulary in Firestore:", err);
  }

  try {
    const grammarCol = collection(db, "grammar");
    const grammarSnap = await getCountFromServer(grammarCol);
    grammarCountInFirestore = grammarSnap.data().count;
  } catch (err) {
    console.warn("Could not count grammar in Firestore:", err);
  }

  return {
    vocabCountInFirestore,
    grammarCountInFirestore,
    localVocabCount,
    localGrammarCount,
  };
}

/**
 * Push all vocabulary and grammar data from the app into Cloud Firestore
 */
export async function pushAllDataToFirestore(
  onProgress?: (progressText: string, percentage: number) => void
): Promise<{ success: boolean; uploadedWords: number; uploadedGrammar: number }> {
  const totalItems = n4Vocabulary.length + n4Grammar.length;
  let processedItems = 0;

  // 1. Push Vocabulary in chunks of 250 (Firestore limit is 500 per writeBatch)
  const CHUNK_SIZE = 250;
  for (let i = 0; i < n4Vocabulary.length; i += CHUNK_SIZE) {
    const chunk = n4Vocabulary.slice(i, i + CHUNK_SIZE);
    const batch = writeBatch(db);

    chunk.forEach((item) => {
      const docRef = doc(db, "vocabulary", String(item.id));
      batch.set(docRef, {
        id: item.id,
        lesson: item.lesson,
        word: item.word,
        hanViet: item.hanViet || "",
        type: item.type,
        meaning: item.meaning,
        example: item.example,
        updatedAt: new Date().toISOString(),
      });
    });

    await batch.commit();
    processedItems += chunk.length;
    if (onProgress) {
      const pct = Math.round((processedItems / totalItems) * 100);
      onProgress(
        `Đang tải lên từ vựng: ${processedItems}/${n4Vocabulary.length} từ...`,
        pct
      );
    }
  }

  // 2. Push Grammar in a single batch
  const grammarBatch = writeBatch(db);
  n4Grammar.forEach((item) => {
    const docRef = doc(db, "grammar", String(item.id));
    grammarBatch.set(docRef, {
      id: item.id,
      structure: item.structure,
      meaning: item.meaning,
      formula: item.formula || "",
      example: item.example,
      notes: item.notes,
      updatedAt: new Date().toISOString(),
    });
  });

  await grammarBatch.commit();
  processedItems += n4Grammar.length;

  if (onProgress) {
    onProgress("Đã hoàn tất đồng bộ toàn bộ từ vựng & ngữ pháp lên Firestore!", 100);
  }

  return {
    success: true,
    uploadedWords: n4Vocabulary.length,
    uploadedGrammar: n4Grammar.length,
  };
}

export interface ListeningSyncStats {
  examsInFirestore: number;
  questionsInFirestore: number;
  notesInFirestore: number;
  localExamsCount: number;
  localQuestionsCount: number;
  localNotesCount: number;
  lastSyncedAt?: string;
}

import { jlpt2021N4ListeningExam, examIntroSections } from "../data/listeningN4_2021";
import { cdaQuestions, cdaExamIntroSections } from "../data/listeningN4_CDA";
import { listeningN4NotesData } from "../data/listeningNotesN4";

/**
 * Fetch current listening counts in Firestore
 */
export async function getFirestoreListeningCounts(): Promise<ListeningSyncStats> {
  const localExamsCount = 2;
  const localQuestionsCount = jlpt2021N4ListeningExam.length + cdaQuestions.length;
  const localNotesCount = listeningN4NotesData.length;

  let examsInFirestore = 0;
  let questionsInFirestore = 0;
  let notesInFirestore = 0;
  let lastSyncedAt: string | undefined;

  try {
    const snap = await getCountFromServer(collection(db, "listening_exams"));
    examsInFirestore = snap.data().count;
  } catch (e) {
    console.warn("Could not count listening_exams:", e);
  }

  try {
    const snap = await getCountFromServer(collection(db, "listening_questions"));
    questionsInFirestore = snap.data().count;
  } catch (e) {
    console.warn("Could not count listening_questions:", e);
  }

  try {
    const snap = await getCountFromServer(collection(db, "listening_notes"));
    notesInFirestore = snap.data().count;
  } catch (e) {
    console.warn("Could not count listening_notes:", e);
  }

  return {
    examsInFirestore,
    questionsInFirestore,
    notesInFirestore,
    localExamsCount,
    localQuestionsCount,
    localNotesCount,
    lastSyncedAt,
  };
}

/**
 * Push all listening data (2 complete exams + 72 questions + 87 tips & scripts) into Cloud Firestore
 */
export async function pushAllListeningDataToFirestore(
  onProgress?: (progressText: string, percentage: number) => void,
  triggerType: "manual" | "cronjob" = "manual"
): Promise<{
  success: boolean;
  uploadedExams: number;
  uploadedQuestions: number;
  uploadedNotes: number;
}> {
  const allQuestions = [
    ...jlpt2021N4ListeningExam.map((q) => ({ ...q, examId: "jlpt_2021_n4", docKey: `2021_${q.id}` })),
    ...cdaQuestions.map((q) => ({ ...q, examId: "jitsuryoku_up_cda", docKey: `cda_${q.id}` })),
  ];

  const totalItems = 2 + allQuestions.length + listeningN4NotesData.length;
  let processedItems = 0;
  const nowIso = new Date().toISOString();

  // 1. Sync Listening Exams (2 exams)
  const examBatch = writeBatch(db);
  const exam1Doc = doc(db, "listening_exams", "jlpt_2021_n4");
  examBatch.set(exam1Doc, {
    id: "jlpt_2021_n4",
    title: "Đề thi JLPT N4 07/2021 (Đề chuẩn 32 câu)",
    subtitle: "Đề thi chính thức với lời thoại và đáp án phân tích chi tiết",
    questionsCount: jlpt2021N4ListeningExam.length,
    sectionsCount: examIntroSections.length,
    introSections: examIntroSections,
    updatedAt: nowIso,
  });

  const exam2Doc = doc(db, "listening_exams", "jitsuryoku_up_cda");
  examBatch.set(exam2Doc, {
    id: "jitsuryoku_up_cda",
    title: "実力アップ! N4 聞く 聴解 (CD A - 40 câu)",
    subtitle: "Sách luyện thi N4 Jitsuryoku Up - CD A trọn bộ 40 bài tập hội thoại thực tế",
    questionsCount: cdaQuestions.length,
    sectionsCount: cdaExamIntroSections.length,
    introSections: cdaExamIntroSections,
    updatedAt: nowIso,
  });

  await examBatch.commit();
  processedItems += 2;
  if (onProgress) {
    onProgress("Đã lưu 2 bộ đề thi nghe chính (2021 & CD A) lên Firestore...", Math.round((processedItems / totalItems) * 100));
  }

  // 2. Sync Questions in chunks of 200
  const Q_CHUNK = 200;
  for (let i = 0; i < allQuestions.length; i += Q_CHUNK) {
    const chunk = allQuestions.slice(i, i + Q_CHUNK);
    const qBatch = writeBatch(db);

    chunk.forEach((item) => {
      const qDoc = doc(db, "listening_questions", item.docKey);
      qBatch.set(qDoc, {
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
    processedItems += chunk.length;
    if (onProgress) {
      onProgress(
        `Đang tải lên câu hỏi nghe: ${processedItems}/${allQuestions.length + 2}...`,
        Math.round((processedItems / totalItems) * 100)
      );
    }
  }

  // 3. Sync 87 Listening Notes in chunks of 200
  for (let i = 0; i < listeningN4NotesData.length; i += Q_CHUNK) {
    const chunk = listeningN4NotesData.slice(i, i + Q_CHUNK);
    const noteBatch = writeBatch(db);

    chunk.forEach((note) => {
      const noteDoc = doc(db, "listening_notes", `note_${note.id}`);
      noteBatch.set(noteDoc, {
        id: note.id,
        category: note.category,
        japanese: note.japanese,
        hiragana: note.hiragana,
        romaji: note.romaji,
        vietnamese: note.vietnamese,
        examTip: note.examTip,
        exampleSentence: note.exampleSentence || null,
        updatedAt: nowIso,
      });
    });

    await noteBatch.commit();
    processedItems += chunk.length;
    if (onProgress) {
      onProgress(
        `Đang tải lên 87 Lưu Ý Vàng & Phòng Luyện Voice: ${processedItems}/${totalItems}...`,
        Math.round((processedItems / totalItems) * 100)
      );
    }
  }

  // 4. Log Sync History
  try {
    const logBatch = writeBatch(db);
    const logDoc = doc(db, "sync_logs", `sync_${Date.now()}`);
    logBatch.set(logDoc, {
      timestamp: nowIso,
      type: triggerType,
      itemsSynced: totalItems,
      uploadedExams: 2,
      uploadedQuestions: allQuestions.length,
      uploadedNotes: listeningN4NotesData.length,
      status: "success",
    });
    await logBatch.commit();
  } catch (logErr) {
    console.warn("Could not write sync log:", logErr);
  }

  if (onProgress) {
    onProgress(`🎉 Hoàn tất đẩy toàn bộ dữ liệu phần nghe (${allQuestions.length} câu hỏi + 87 lưu ý) lên Firebase Firestore!`, 100);
  }

  return {
    success: true,
    uploadedExams: 2,
    uploadedQuestions: allQuestions.length,
    uploadedNotes: listeningN4NotesData.length,
  };
}

// ==========================================
// KANJI & VOCABULARY N3 SYNC IMPLEMENTATION
// ==========================================

import { hanTu1200List } from "../data/hanTu1200";
import { kanjiSoTrungCapList } from "../data/kanjiSoTrungCap";
import { tuVungChuDeList, tuVungBaiHocList } from "../data/tuVungN3";

export interface KanjiSyncStats {
  kanji1200InFirestore: number;
  kanjiIntermediateInFirestore: number;
  vocabTopicsInFirestore: number;
  vocabLessonsInFirestore: number;
  localKanji1200Count: number;
  localKanjiIntermediateCount: number;
  localVocabTopicsCount: number;
  localVocabLessonsCount: number;
}

/**
 * Fetch current kanji and vocabulary document counts in Firestore collections
 */
export async function getFirestoreKanjiCounts(): Promise<KanjiSyncStats> {
  const localKanji1200Count = hanTu1200List.length;
  const localKanjiIntermediateCount = kanjiSoTrungCapList.length;
  const localVocabTopicsCount = tuVungChuDeList.length;
  const localVocabLessonsCount = tuVungBaiHocList.length;

  let kanji1200InFirestore = 0;
  let kanjiIntermediateInFirestore = 0;
  let vocabTopicsInFirestore = 0;
  let vocabLessonsInFirestore = 0;

  try {
    const c1200 = collection(db, "kanji_1200");
    const s1200 = await getCountFromServer(c1200);
    kanji1200InFirestore = s1200.data().count;
  } catch (err) {
    console.warn("Could not count kanji_1200 in Firestore:", err);
  }

  try {
    const cInter = collection(db, "kanji_intermediate");
    const sInter = await getCountFromServer(cInter);
    kanjiIntermediateInFirestore = sInter.data().count;
  } catch (err) {
    console.warn("Could not count kanji_intermediate in Firestore:", err);
  }

  try {
    const cTopics = collection(db, "vocab_topics");
    const sTopics = await getCountFromServer(cTopics);
    vocabTopicsInFirestore = sTopics.data().count;
  } catch (err) {
    console.warn("Could not count vocab_topics in Firestore:", err);
  }

  try {
    const cLessons = collection(db, "vocab_lessons");
    const sLessons = await getCountFromServer(cLessons);
    vocabLessonsInFirestore = sLessons.data().count;
  } catch (err) {
    console.warn("Could not count vocab_lessons in Firestore:", err);
  }

  return {
    kanji1200InFirestore,
    kanjiIntermediateInFirestore,
    vocabTopicsInFirestore,
    vocabLessonsInFirestore,
    localKanji1200Count,
    localKanjiIntermediateCount,
    localVocabTopicsCount,
    localVocabLessonsCount,
  };
}

/**
 * Push all 4 N3 datasets (1,264 Hán tự 1200 + 402 Kanji Sơ Trung Cấp + 259 Từ vựng chủ đề + 34 Từ vựng bài học) to Cloud Firestore
 */
export async function pushAllKanjiDataToFirestore(
  onProgress?: (progressText: string, percentage: number) => void
): Promise<{
  success: boolean;
  uploaded1200: number;
  uploaded402: number;
  uploadedTopics: number;
  uploadedLessons: number;
}> {
  const totalItems =
    hanTu1200List.length +
    kanjiSoTrungCapList.length +
    tuVungChuDeList.length +
    tuVungBaiHocList.length;

  let processedItems = 0;
  const nowIso = new Date().toISOString();
  const CHUNK_SIZE = 250;

  // 1. Push 1,264 Hán tự 1200
  for (let i = 0; i < hanTu1200List.length; i += CHUNK_SIZE) {
    const chunk = hanTu1200List.slice(i, i + CHUNK_SIZE);
    const batch = writeBatch(db);

    chunk.forEach((item) => {
      const docRef = doc(db, "kanji_1200", item.id);
      batch.set(docRef, {
        id: item.id,
        stt: item.stt,
        trang: item.trang,
        khung: item.khung,
        so: item.so,
        kanji: item.kanji,
        hanViet: item.hanViet,
        meaning: item.meaning,
        note: item.note || "",
        isRadical: item.isRadical,
        updatedAt: nowIso,
      });
    });

    await batch.commit();
    processedItems += chunk.length;
    if (onProgress) {
      onProgress(
        `Đang tải lên Hán tự 1200: ${processedItems}/${hanTu1200List.length}...`,
        Math.round((processedItems / totalItems) * 100)
      );
    }
  }

  // 2. Push 402 Kanji Sơ Trung Cấp
  for (let i = 0; i < kanjiSoTrungCapList.length; i += CHUNK_SIZE) {
    const chunk = kanjiSoTrungCapList.slice(i, i + CHUNK_SIZE);
    const batch = writeBatch(db);

    chunk.forEach((item) => {
      const docRef = doc(db, "kanji_intermediate", item.id);
      batch.set(docRef, {
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

    await batch.commit();
    processedItems += chunk.length;
    if (onProgress) {
      onProgress(
        `Đang tải lên Kanji Sơ Trung Cấp: ${chunk.length} chữ...`,
        Math.round((processedItems / totalItems) * 100)
      );
    }
  }

  // 3. Push 259 Từ vựng theo chủ đề
  for (let i = 0; i < tuVungChuDeList.length; i += CHUNK_SIZE) {
    const chunk = tuVungChuDeList.slice(i, i + CHUNK_SIZE);
    const batch = writeBatch(db);

    chunk.forEach((item) => {
      const docRef = doc(db, "vocab_topics", item.id);
      batch.set(docRef, {
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

    await batch.commit();
    processedItems += chunk.length;
    if (onProgress) {
      onProgress(
        `Đang tải lên Từ vựng theo chủ đề: ${processedItems}/${totalItems}...`,
        Math.round((processedItems / totalItems) * 100)
      );
    }
  }

  // 4. Push 34 Từ vựng bài học
  const lessonBatch = writeBatch(db);
  tuVungBaiHocList.forEach((item) => {
    const docRef = doc(db, "vocab_lessons", item.id);
    lessonBatch.set(docRef, {
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
  processedItems += tuVungBaiHocList.length;

  // 5. Log sync
  try {
    const logBatch = writeBatch(db);
    const logDoc = doc(db, "sync_logs", `sync_kanji_${Date.now()}`);
    logBatch.set(logDoc, {
      timestamp: nowIso,
      type: "n3_kanji_full_sync",
      itemsSynced: totalItems,
      uploaded1200: hanTu1200List.length,
      uploaded402: kanjiSoTrungCapList.length,
      uploadedTopics: tuVungChuDeList.length,
      uploadedLessons: tuVungBaiHocList.length,
      status: "success",
    });
    await logBatch.commit();
  } catch (logErr) {
    console.warn("Could not write sync log:", logErr);
  }

  if (onProgress) {
    onProgress(`🎉 Hoàn tất nạp toàn bộ 1,959 mục Hán Tự & Từ Vựng N3 lên Cloud Firestore!`, 100);
  }

  return {
    success: true,
    uploaded1200: hanTu1200List.length,
    uploaded402: kanjiSoTrungCapList.length,
    uploadedTopics: tuVungChuDeList.length,
    uploadedLessons: tuVungBaiHocList.length,
  };
}

import { TuVungN3SouMatomeItem, tuVungN3SouMatomeData } from "../data/tuVungN3SouMatome";

/**
 * Get count of vocabulary_n3_soumatome documents currently in Cloud Firestore
 */
export async function getFirestoreN3VocabCount(): Promise<number> {
  try {
    const col = collection(db, "vocabulary_n3_soumatome");
    const snap = await getCountFromServer(col);
    return snap.data().count;
  } catch (err) {
    console.warn("Could not count vocabulary_n3_soumatome:", err);
    return 0;
  }
}

/**
 * Push N3 Sou Matome Vocabulary items (default or custom merged) to Cloud Firestore
 */
export async function pushN3SouMatomeDataToFirestore(
  items: TuVungN3SouMatomeItem[] = tuVungN3SouMatomeData,
  onProgress?: (progressText: string, percentage: number) => void
): Promise<{ success: boolean; uploadedCount: number }> {
  const CHUNK_SIZE = 200;
  const nowIso = new Date().toISOString();
  let processedItems = 0;

  for (let i = 0; i < items.length; i += CHUNK_SIZE) {
    const chunk = items.slice(i, i + CHUNK_SIZE);
    const batch = writeBatch(db);

    chunk.forEach((item) => {
      const docRef = doc(db, "vocabulary_n3_soumatome", item.id);
      batch.set(docRef, {
        id: item.id,
        stt: item.stt,
        week: item.week,
        weekTitle: item.weekTitle,
        day: item.day,
        dayTitle: item.dayTitle,
        category: item.category,
        japanese: item.japanese,
        hiragana: item.hiragana,
        vietnamese: item.vietnamese,
        type: item.type,
        exampleSentence: item.exampleSentence || "",
        exampleMeaning: item.exampleMeaning || "",
        updatedAt: nowIso,
      });
    });

    await batch.commit();
    processedItems += chunk.length;

    if (onProgress) {
      const pct = Math.round((processedItems / items.length) * 100);
      onProgress(
        `Đang đồng bộ Từ Vựng N3: ${processedItems}/${items.length} từ...`,
        pct
      );
    }
  }

  // Log sync history
  try {
    const logBatch = writeBatch(db);
    const logDoc = doc(db, "sync_logs", `sync_n3_soumatome_${Date.now()}`);
    logBatch.set(logDoc, {
      timestamp: nowIso,
      type: "n3_soumatome_vocab_sync",
      itemsSynced: items.length,
      uploadedCount: items.length,
      status: "success",
    });
    await logBatch.commit();
  } catch (logErr) {
    console.warn("Could not write sync log for n3 sou matome:", logErr);
  }

  if (onProgress) {
    onProgress(`🎉 Đã đồng bộ thành công ${items.length} từ vựng N3 Sou Matome lên Cloud Firestore!`, 100);
  }

  return {
    success: true,
    uploadedCount: items.length,
  };
}

