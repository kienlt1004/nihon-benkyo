import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  Sparkles,
  Trophy,
  History,
  Cloud,
  XCircle,
  RotateCcw,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Eye,
  Award,
  Layers,
  HelpCircle,
  FileCheck,
} from "lucide-react";
import { VocabularyItem } from "../data/vocabulary";
import { de30Exam, ExamQuestion } from "../data/de30Exam";
import { useAuth } from "../context/AuthContext";

interface QuizViewProps {
  data: VocabularyItem[];
  selectedLesson: number | "all";
  onLookupWord: (word: string) => void;
}

export function QuizView({ data, selectedLesson, onLookupWord }: QuizViewProps) {
  // Mode selection: "de30" (Official Dora Exam 30) or "random" (Quick flashcard vocabulary quiz)
  const [activeTab, setActiveTab] = useState<"de30" | "random">("de30");

  // --- ĐỀ 30 STATES ---
  const [de30Index, setDe30Index] = useState(0);
  const [de30Answers, setDe30Answers] = useState<Record<number, number>>({});
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [showKanji, setShowKanji] = useState(false);
  const [hasSavedDe30, setHasSavedDe30] = useState(false);

  // --- RANDOM QUIZ STATES ---
  const [currentQuestion, setCurrentQuestion] = useState<VocabularyItem | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const { saveQuizResult, quizHistory, studyStats } = useAuth();

  // Initialize random quiz when data changes
  useEffect(() => {
    if (data && data.length > 0) {
      generateRandomQuestion();
    }
  }, [data]);

  const generateRandomQuestion = () => {
    if (!data || data.length === 0) return;
    const randomItem = data[Math.floor(Math.random() * data.length)];
    setCurrentQuestion(randomItem);

    const wrongOptions: string[] = [];
    let attempts = 0;
    while (wrongOptions.length < 3 && attempts < 50) {
      attempts++;
      const randomWrong = data[Math.floor(Math.random() * data.length)];
      if (
        randomWrong.id !== randomItem.id &&
        !wrongOptions.includes(randomWrong.meaning) &&
        randomWrong.meaning !== randomItem.meaning
      ) {
        wrongOptions.push(randomWrong.meaning);
      }
    }

    const allOptions = [randomItem.meaning, ...wrongOptions].sort(
      () => Math.random() - 0.5,
    );
    setOptions(allOptions);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const handleRandomAnswer = (answer: string) => {
    if (selectedAnswer || !currentQuestion) return;

    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.meaning;
    setIsCorrect(correct);

    const newTotal = totalQuestions + 1;
    const newScore = correct ? score + 1 : score;
    setTotalQuestions(newTotal);
    if (correct) {
      setScore(newScore);
    }

    if (newTotal > 0 && newTotal % 5 === 0) {
      saveQuizResult(newScore, newTotal, String(selectedLesson));
    }

    setTimeout(() => {
      generateRandomQuestion();
    }, 1200);
  };

  const handleFinishRandomRound = () => {
    if (totalQuestions > 0) {
      saveQuizResult(score, totalQuestions, String(selectedLesson));
    }
    setScore(0);
    setTotalQuestions(0);
    generateRandomQuestion();
  };

  // --- ĐỀ 30 HANDLERS ---
  const currentDe30Q: ExamQuestion = de30Exam.questions[de30Index];
  const userDe30Selected = de30Answers[currentDe30Q.id];

  const handleSelectDe30Option = (optionIndex: number) => {
    // Only allow selecting once per question
    if (userDe30Selected !== undefined) return;

    const newAnswers = { ...de30Answers, [currentDe30Q.id]: optionIndex };
    setDe30Answers(newAnswers);

    // If all 20 questions are answered, save score
    const answeredCount = Object.keys(newAnswers).length;
    if (answeredCount === de30Exam.questions.length && !hasSavedDe30) {
      let correctTotal = 0;
      de30Exam.questions.forEach((q) => {
        if (newAnswers[q.id] === q.correctAnswer) {
          correctTotal++;
        }
      });
      saveQuizResult(correctTotal, de30Exam.questions.length, "Đề 30 (Dora)");
      setHasSavedDe30(true);
    }
  };

  const calculateDe30Score = () => {
    let correct = 0;
    de30Exam.questions.forEach((q) => {
      if (de30Answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const handleResetDe30 = () => {
    setDe30Answers({});
    setDe30Index(0);
    setHasSavedDe30(false);
  };

  const handleSaveDe30Progress = () => {
    const answeredCount = Object.keys(de30Answers).length;
    if (answeredCount === 0) return;
    const correctTotal = calculateDe30Score();
    saveQuizResult(correctTotal, answeredCount, "Đề 30 (Dora)");
    setHasSavedDe30(true);
  };

  const de30CorrectCount = calculateDe30Score();
  const de30AnsweredCount = Object.keys(de30Answers).length;

  return (
    <div className="w-full space-y-4">
      {/* Top Navigation Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setActiveTab("de30")}
            className={`px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "de30"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <FileCheck size={16} />
            <span>Đề 30 - Thi Thử N4 (20 câu)</span>
            <span
              className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                activeTab === "de30"
                  ? "bg-white/20 text-white"
                  : "bg-indigo-50 text-indigo-700"
              }`}
            >
              DORA
            </span>
          </button>

          <button
            onClick={() => setActiveTab("random")}
            className={`px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "random"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Layers size={16} />
            <span>Trắc nghiệm từ vựng theo bài</span>
          </button>
        </div>

        {activeTab === "de30" && (
          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => setShowKanji(!showKanji)}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200/70 text-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Eye size={13} className="text-slate-500" />
              <span>{showKanji ? "Dạng Kana / Phiên âm" : "Dạng Chữ Hán (Kanji)"}</span>
            </button>

            <button
              onClick={() => setShowAnswerKey(!showAnswerKey)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Award size={13} className="text-amber-600" />
              <span>{showAnswerKey ? "Ẩn đáp án đề" : "Bảng đáp án (Key)"}</span>
            </button>
          </div>
        )}
      </div>

      {/* Answer Key Drawer / Summary Box */}
      {activeTab === "de30" && showAnswerKey && (
        <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-amber-200/80">
            <div className="flex items-center gap-2">
              <Award size={18} className="text-amber-600" />
              <h4 className="font-extrabold text-sm text-amber-950">
                Bảng Đáp Án Chuẩn: ĐỀ 30 - TỪ VỰNG N4 (Dora Nihongo)
              </h4>
            </div>
            <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
              20 / 20 câu
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            {/* Row 1-10 */}
            <div className="bg-white/80 p-2.5 rounded-xl border border-amber-200/60">
              <div className="text-[11px] font-bold text-slate-500 mb-1">
                CÂU 1 - 10:
              </div>
              <div className="grid grid-cols-10 gap-1 text-center font-bold">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((c) => (
                  <div key={c} className="p-1 rounded bg-slate-100 text-slate-700">
                    <span className="text-[9px] text-slate-400 block font-normal">
                      C{c}
                    </span>
                    <strong className="text-indigo-700">
                      {de30Exam.questions[c - 1].correctAnswer}
                    </strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 11-20 */}
            <div className="bg-white/80 p-2.5 rounded-xl border border-amber-200/60">
              <div className="text-[11px] font-bold text-slate-500 mb-1">
                CÂU 11 - 20:
              </div>
              <div className="grid grid-cols-10 gap-1 text-center font-bold">
                {[11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((c) => (
                  <div key={c} className="p-1 rounded bg-slate-100 text-slate-700">
                    <span className="text-[9px] text-slate-400 block font-normal">
                      C{c}
                    </span>
                    <strong className="text-indigo-700">
                      {de30Exam.questions[c - 1].correctAnswer}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== TAB 1: ĐỀ 30 CHUẨN ===================== */}
      {activeTab === "de30" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Stage (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            {/* Header progress bar */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                  Dora Nihongo
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">
                  Đề 30: Câu {currentDe30Q.id} / 20
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="text-xs text-slate-400 font-semibold">
                    Đúng / Đã làm
                  </div>
                  <div className="text-sm font-black text-indigo-950">
                    {de30CorrectCount} / {de30AnsweredCount} câu
                  </div>
                </div>

                <button
                  onClick={handleResetDe30}
                  title="Làm lại đề thi"
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200/80 transition-colors cursor-pointer"
                >
                  <RotateCcw size={15} />
                </button>
              </div>
            </div>

            {/* Question Quick Palette (1 to 20) */}
            <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-200">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Danh sách câu hỏi:
              </div>
              <div className="grid grid-cols-10 sm:grid-cols-20 gap-1 sm:gap-1.5">
                {de30Exam.questions.map((q, idx) => {
                  const ans = de30Answers[q.id];
                  const isCurrent = idx === de30Index;
                  const isAnswered = ans !== undefined;
                  const isRight = isAnswered && ans === q.correctAnswer;

                  let style =
                    "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100";
                  if (isCurrent) {
                    style =
                      "bg-indigo-600 text-white font-extrabold ring-2 ring-indigo-400 shadow-xs";
                  } else if (isAnswered) {
                    style = isRight
                      ? "bg-emerald-500 text-white font-bold border border-emerald-600"
                      : "bg-rose-500 text-white font-bold border border-rose-600";
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setDe30Index(idx)}
                      className={`h-8 rounded-lg text-xs transition-all flex items-center justify-center cursor-pointer ${style}`}
                    >
                      {q.id}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 relative">
              <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase mb-4">
                <span>Câu số {currentDe30Q.id}</span>
                <span className="text-indigo-600 font-medium">
                  {userDe30Selected === undefined
                    ? "Chưa trả lời"
                    : userDe30Selected === currentDe30Q.correctAnswer
                    ? "✓ Chính xác"
                    : "✕ Chưa chính xác"}
                </span>
              </div>

              {/* Japanese Question Text */}
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-relaxed mb-6 font-sans">
                {showKanji && currentDe30Q.kanjiQuestion
                  ? currentDe30Q.kanjiQuestion
                  : currentDe30Q.question}
              </div>

              {/* Options (1, 2, 3, 4) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {currentDe30Q.options.map((opt, oIdx) => {
                  const optionNum = oIdx + 1;
                  const isSelected = userDe30Selected === optionNum;
                  const isTargetCorrect = optionNum === currentDe30Q.correctAnswer;

                  let btnStyle =
                    "bg-slate-50/70 border-2 border-slate-200/90 hover:border-indigo-400 hover:bg-indigo-50/40 text-slate-800";

                  if (userDe30Selected !== undefined) {
                    if (isTargetCorrect) {
                      btnStyle =
                        "bg-emerald-50 border-2 border-emerald-500 text-emerald-900 font-bold shadow-2xs";
                    } else if (isSelected) {
                      btnStyle =
                        "bg-rose-50 border-2 border-rose-500 text-rose-900 font-bold";
                    } else {
                      btnStyle =
                        "bg-slate-50 border-2 border-slate-100 text-slate-400 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={userDe30Selected !== undefined}
                      onClick={() => handleSelectDe30Option(optionNum)}
                      className={`p-4 rounded-2xl text-left font-sans transition-all flex items-center justify-between cursor-pointer min-h-[58px] ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                            isTargetCorrect && userDe30Selected !== undefined
                              ? "bg-emerald-500 text-white"
                              : isSelected && !isTargetCorrect
                              ? "bg-rose-500 text-white"
                              : "bg-slate-200/80 text-slate-700"
                          }`}
                        >
                          {optionNum}
                        </span>
                        <span className="text-base font-bold">{opt}</span>
                      </div>

                      {userDe30Selected !== undefined && isTargetCorrect && (
                        <CheckCircle2
                          size={20}
                          className="text-emerald-600 shrink-0 ml-2"
                        />
                      )}
                      {userDe30Selected !== undefined &&
                        isSelected &&
                        !isTargetCorrect && (
                          <XCircle size={20} className="text-rose-500 shrink-0 ml-2" />
                        )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Card (shows once answered) */}
              {userDe30Selected !== undefined && (
                <div className="bg-gradient-to-br from-indigo-50/60 to-slate-50 border border-indigo-100/80 rounded-2xl p-5 space-y-3 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
                    <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                      <HelpCircle size={15} className="text-indigo-600" />
                      <span>Giải thích chi tiết câu {currentDe30Q.id}</span>
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      Đáp án đúng: {currentDe30Q.correctAnswer}
                    </span>
                  </div>

                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase">
                      Dịch nghĩa tiếng Việt:
                    </div>
                    <div className="text-sm font-semibold text-slate-800 mt-0.5">
                      {currentDe30Q.translation}
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase">
                      Phân tích đáp án:
                    </div>
                    <div className="text-xs text-slate-700 leading-relaxed mt-0.5">
                      {currentDe30Q.explanation}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-indigo-100/60 text-xs">
                    <div className="bg-white/80 p-2.5 rounded-xl border border-indigo-100/50">
                      <span className="font-bold text-indigo-900 block mb-0.5">
                        📚 Ngữ pháp trọng tâm:
                      </span>
                      <span className="text-slate-600">{currentDe30Q.keyGrammar}</span>
                    </div>

                    <div className="bg-white/80 p-2.5 rounded-xl border border-indigo-100/50">
                      <span className="font-bold text-indigo-900 block mb-0.5">
                        🔤 Từ vựng cần nhớ:
                      </span>
                      <span className="text-slate-600">{currentDe30Q.keyVocab}</span>
                    </div>
                  </div>

                  <div className="pt-1 text-right">
                    <button
                      onClick={() =>
                        onLookupWord(
                          `Giải thích câu đề thi N4: ${currentDe30Q.question}`,
                        )
                      }
                      className="inline-flex items-center gap-1 text-xs text-indigo-700 hover:text-indigo-900 font-semibold bg-white px-3 py-1 rounded-lg border border-indigo-200 transition-colors cursor-pointer"
                    >
                      <Sparkles size={12} className="text-amber-500" />
                      <span>Tra cứu ngữ pháp câu này với Google AI</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Prev / Next controls */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                <button
                  disabled={de30Index === 0}
                  onClick={() => setDe30Index(de30Index - 1)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    de30Index === 0
                      ? "text-slate-300 cursor-not-allowed"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  <ChevronLeft size={16} />
                  <span>Câu trước</span>
                </button>

                <div className="text-xs font-bold text-slate-400">
                  {de30Index + 1} / {de30Exam.questions.length}
                </div>

                <button
                  disabled={de30Index === de30Exam.questions.length - 1}
                  onClick={() => setDe30Index(de30Index + 1)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    de30Index === de30Exam.questions.length - 1
                      ? "text-slate-300 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs"
                  }`}
                >
                  <span>Câu kế tiếp</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Exam Summary & Saved History */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col h-auto min-h-[520px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Trophy size={16} className="text-indigo-600" />
                <span>Tiến độ làm Đề 30</span>
              </div>
              <span title="Tự động đồng bộ kết quả">
                <Cloud size={15} className="text-emerald-500" />
              </span>
            </div>

            {/* Score Card */}
            <div className="py-4 border-b border-slate-100">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 text-white rounded-2xl p-4 text-center shadow-xs">
                <div className="text-xs font-medium text-indigo-100">Điểm số hiện tại</div>
                <div className="text-3xl font-black my-1">
                  {de30CorrectCount} / 20
                </div>
                <div className="text-xs text-indigo-200 font-medium">
                  Đã hoàn thành {de30AnsweredCount} / 20 câu (
                  {Math.round((de30AnsweredCount / 20) * 100)}%)
                </div>
              </div>

              {de30AnsweredCount > 0 && (
                <div className="mt-3">
                  <button
                    onClick={handleSaveDe30Progress}
                    disabled={hasSavedDe30}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      hasSavedDe30
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default"
                        : "bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200"
                    }`}
                  >
                    {hasSavedDe30 ? "✓ Đã lưu kết quả lên Firestore" : "Lưu kết quả lên Cloud"}
                  </button>
                </div>
              )}
            </div>

            {/* History Section */}
            <div className="mt-4 flex-1 flex flex-col">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <History size={14} className="text-slate-400" />
                <span>Lịch sử các lần thi trước</span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 max-h-[260px] pr-1">
                {quizHistory.length > 0 ? (
                  quizHistory.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-bold text-slate-800">
                          {item.lesson === "all"
                            ? "Tất cả bài"
                            : item.lesson.includes("30")
                            ? "Đề 30 (Dora)"
                            : `Bài ${item.lesson}`}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-extrabold text-indigo-700 text-sm">
                          {item.score}/{item.total}
                        </div>
                        <div className="text-[10px] text-emerald-600 font-semibold">
                          {Math.round((item.score / (item.total || 1)) * 100)}%
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-slate-400 text-xs">
                    Chưa có lượt nộp bài nào. Chọn đáp án các câu bên trái và kết quả sẽ tự động được ghi nhận.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ===================== TAB 2: TRẮC NGHIỆM RANDOM TỪ VỰNG ===================== */
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                  <Trophy size={20} />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold">
                    Kết quả hiện tại
                  </div>
                  <div className="text-base font-extrabold text-indigo-950">
                    {score} / {totalQuestions} câu đúng (
                    {totalQuestions > 0
                      ? Math.round((score / totalQuestions) * 100)
                      : 0}
                    %)
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {totalQuestions > 0 && (
                  <button
                    onClick={handleFinishRandomRound}
                    className="text-xs bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-semibold px-3 py-1.5 rounded-lg border border-indigo-200 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw size={13} />
                    <span>Lưu & Bắt đầu lại</span>
                  </button>
                )}
              </div>
            </div>

            {currentQuestion ? (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 text-center min-h-[260px] flex flex-col items-center justify-center relative">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Chọn nghĩa đúng của từ vựng:
                </div>

                <div className="text-5xl font-extrabold text-indigo-950 mb-2">
                  {currentQuestion.word}
                </div>

                {currentQuestion.hanViet && (
                  <div className="text-sm text-slate-500 font-semibold mb-3">
                    Hán Việt: {currentQuestion.hanViet}
                  </div>
                )}

                <div className="text-xs text-slate-600 bg-slate-50 py-2 px-4 rounded-xl inline-block max-w-md font-sans">
                  {currentQuestion.example}
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => onLookupWord(currentQuestion.word)}
                    className="inline-flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-full transition-colors cursor-pointer"
                  >
                    <Sparkles size={12} className="text-amber-500" />
                    <span>Tra cứu chi tiết từ này với Google Search</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 min-h-[260px] flex flex-col items-center justify-center">
                <p className="text-slate-500 text-sm">
                  Không đủ từ vựng để tạo bài trắc nghiệm.
                </p>
              </div>
            )}

            {/* Answer Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {options.map((option, idx) => {
                let btnClass =
                  "bg-white border-2 border-slate-200 text-slate-800 hover:border-indigo-400 hover:bg-indigo-50/50";

                if (selectedAnswer && currentQuestion) {
                  if (option === currentQuestion.meaning) {
                    btnClass =
                      "bg-emerald-50 border-2 border-emerald-500 text-emerald-800";
                  } else if (option === selectedAnswer) {
                    btnClass = "bg-rose-50 border-2 border-rose-500 text-rose-800";
                  } else {
                    btnClass =
                      "bg-slate-50 border-2 border-slate-200 text-slate-400 opacity-60";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleRandomAnswer(option)}
                    disabled={!!selectedAnswer}
                    className={`p-4 rounded-2xl text-sm font-bold transition-all duration-200 flex items-center justify-between text-left cursor-pointer min-h-[58px] ${btnClass}`}
                  >
                    <span>{option}</span>
                    {selectedAnswer &&
                      currentQuestion &&
                      option === currentQuestion.meaning && (
                        <CheckCircle2
                          size={18}
                          className="text-emerald-600 shrink-0 ml-2"
                        />
                      )}
                    {selectedAnswer &&
                      currentQuestion &&
                      option === selectedAnswer &&
                      option !== currentQuestion.meaning && (
                        <XCircle size={18} className="text-rose-500 shrink-0 ml-2" />
                      )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Sidebar for Random Quiz */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col h-[520px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <History size={16} className="text-indigo-600" />
                <span>Lịch sử làm bài trắc nghiệm</span>
              </div>
              <span title="Đồng bộ Firestore">
                <Cloud size={15} className="text-emerald-500" />
              </span>
            </div>

            <div className="py-3 border-b border-slate-100 grid grid-cols-2 gap-2 text-center">
              <div className="bg-indigo-50 p-2.5 rounded-xl border border-indigo-100">
                <div className="text-xs text-slate-500 font-medium">Điểm cao nhất</div>
                <div className="text-lg font-black text-indigo-700">
                  {studyStats?.highestScore || 0}
                </div>
              </div>
              <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-100">
                <div className="text-xs text-slate-500 font-medium">Đã hoàn thành</div>
                <div className="text-lg font-black text-amber-700">
                  {quizHistory.length} bài
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 py-2 space-y-2">
              {quizHistory.length > 0 ? (
                quizHistory.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-800">
                        {item.lesson === "all"
                          ? "Tất cả bài"
                          : item.lesson.includes("30")
                          ? "Đề 30 (Dora)"
                          : `Bài ${item.lesson}`}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-extrabold text-indigo-700 text-sm">
                        {item.score}/{item.total}
                      </div>
                      <div className="text-[10px] text-emerald-600 font-semibold">
                        {Math.round((item.score / (item.total || 1)) * 100)}% đúng
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-slate-400 text-xs">
                  Chưa có lượt làm bài nào. Trả lời câu hỏi bên trái, điểm số sẽ tự động lưu lên Firestore.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
