import React, { useState, useRef, useEffect } from "react";
import {
  BookOpen,
  Layers,
  CheckSquare,
  FileText,
  Sparkles,
  Radio,
  ChevronDown,
  Database,
  LogOut,
  Star,
  CheckCircle,
  Cloud,
  Check,
  Menu,
  X,
  GraduationCap,
  Bot,
  Headphones,
  BookmarkCheck,
  Grid,
} from "lucide-react";
import { AppMode } from "../types";
import { useAuth } from "../context/AuthContext";
import { FirestoreSyncModal } from "./FirestoreSyncModal";
import { n4Vocabulary } from "../data/vocabulary";

interface NavbarProps {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  selectedLesson: number | "all";
  setSelectedLesson: (lesson: number | "all") => void;
  lessons: number[];
  onOpenWordLookup?: (word: string) => void;
}

export function Navbar({
  mode,
  setMode,
  selectedLesson,
  setSelectedLesson,
  lessons,
}: NavbarProps) {
  const { user, signOutUser, starredWordIds, masteredWordIds } = useAuth();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showSyncModal, setShowSyncModal] = useState(false);

  // Dropdown states
  const [studyDropdownOpen, setStudyDropdownOpen] = useState(false);
  const [aiDropdownOpen, setAiDropdownOpen] = useState(false);
  const [lessonDropdownOpen, setLessonDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Refs for click outside
  const studyRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);
  const lessonRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (studyRef.current && !studyRef.current.contains(event.target as Node)) {
        setStudyDropdownOpen(false);
      }
      if (aiRef.current && !aiRef.current.contains(event.target as Node)) {
        setAiDropdownOpen(false);
      }
      if (
        lessonRef.current &&
        !lessonRef.current.contains(event.target as Node)
      ) {
        setLessonDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Study modes list
  const studyModes = [
    {
      id: "list" as AppMode,
      title: "Danh sách từ vựng",
      subtitle: `${n4Vocabulary.length} từ vựng N4 theo các bài học & đề thi`,
      icon: BookOpen,
      iconColor: "text-indigo-600 bg-indigo-50",
    },
    {
      id: "flashcard" as AppMode,
      title: "Thẻ Flashcards",
      subtitle: "Lật thẻ ôn tập phản xạ từ & nghĩa",
      icon: Layers,
      iconColor: "text-blue-600 bg-blue-50",
    },
    {
      id: "quiz" as AppMode,
      title: "Luyện thi trắc nghiệm",
      subtitle: "Làm đề kiểm tra, chấm điểm tức thì",
      icon: CheckSquare,
      iconColor: "text-emerald-600 bg-emerald-50",
    },
    {
      id: "grammar" as AppMode,
      title: "Cấu trúc ngữ pháp",
      subtitle: "44 cấu trúc N4 & đề thi thực tế",
      icon: FileText,
      iconColor: "text-amber-600 bg-amber-50",
    },
    {
      id: "listening" as AppMode,
      title: "Luyện nghe & Xem Script",
      subtitle: "39 phút Chokai 2021 N4 kèm Script & Dịch",
      icon: Headphones,
      iconColor: "text-purple-600 bg-purple-50",
    },
    {
      id: "review" as AppMode,
      title: "Sổ tay ôn tập cá nhân",
      subtitle: "6 phần cốt lõi: Ngữ pháp, từ vựng, sửa câu sai & checklist",
      icon: BookmarkCheck,
      iconColor: "text-amber-600 bg-amber-50",
    },
    {
      id: "kanji" as AppMode,
      title: "100 Hán Tự N3 (Đông Du)",
      subtitle: "Bảng 10x10 chữ Hán Sơ Trung Cấp kèm chiết tự & flashcard",
      icon: Grid,
      iconColor: "text-emerald-600 bg-emerald-50",
    },
    {
      id: "vocab-n3" as AppMode,
      title: "Từ vựng N3 Sou Matome",
      subtitle: "Hơn 320 từ theo Tuần & Ngày (14 trang số hóa)",
      icon: BookOpen,
      iconColor: "text-blue-600 bg-blue-50",
    },
  ];

  // AI features list
  const aiModes = [
    {
      id: "ai-search" as AppMode,
      title: "Tra cứu AI chuyên sâu",
      subtitle: "Google Search Grounding & phân tích ngữ cảnh",
      badge: "Gemini 3.5",
      badgeColor: "bg-indigo-100 text-indigo-700",
      icon: Sparkles,
      iconColor: "text-indigo-600 bg-indigo-50",
    },
    {
      id: "live-voice" as AppMode,
      title: "Luyện Kaiwa trực tiếp",
      subtitle: "Đàm thoại thoại 2 chiều với gia sư AI",
      badge: "Gemini 3.8 Live",
      badgeColor: "bg-rose-100 text-rose-700",
      icon: Radio,
      iconColor: "text-rose-600 bg-rose-50",
    },
  ];

  // Determine active labels for the buttons
  const activeStudyMode = studyModes.find((m) => m.id === mode);
  const isAiModeActive = mode === "ai-search" || mode === "live-voice";
  const activeAiMode = aiModes.find((m) => m.id === mode);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-2 md:gap-4">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div
            onClick={() => setMode("list")}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="bg-indigo-600 group-hover:bg-indigo-700 text-white p-2 rounded-xl transition-colors shadow-xs">
              <BookOpen size={19} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-extrabold tracking-tight text-slate-900 leading-none">
                  Nihongo N4
                </h1>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/60 uppercase">
                  JLPT
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium block mt-0.5">
                Ôn luyện Minna no Nihongo
              </span>
            </div>
          </div>
        </div>

        {/* Center: Dropdown Navigation Controls (Desktop & Tablet) */}
        <nav className="hidden md:flex items-center gap-2">
          {/* 1. Học N4 Dropdown */}
          <div className="relative" ref={studyRef}>
            <button
              onClick={() => {
                setStudyDropdownOpen(!studyDropdownOpen);
                setAiDropdownOpen(false);
                setLessonDropdownOpen(false);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer border ${
                activeStudyMode
                  ? "bg-indigo-50/90 text-indigo-700 border-indigo-200 shadow-2xs"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
              }`}
            >
              <GraduationCap
                size={16}
                className={activeStudyMode ? "text-indigo-600" : "text-slate-500"}
              />
              <span>
                {activeStudyMode ? activeStudyMode.title : "Chương trình N4"}
              </span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 text-slate-400 ${
                  studyDropdownOpen ? "rotate-180 text-indigo-600" : ""
                }`}
              />
            </button>

            {/* Study Dropdown Menu */}
            {studyDropdownOpen && (
              <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Chế độ ôn tập N4
                </div>
                <div className="space-y-1">
                  {studyModes.map((item) => {
                    const Icon = item.icon;
                    const isSelected = mode === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setMode(item.id);
                          setStudyDropdownOpen(false);
                        }}
                        className={`w-full p-2.5 rounded-xl flex items-start gap-3 transition-colors text-left cursor-pointer ${
                          isSelected
                            ? "bg-indigo-50/80 text-indigo-900 font-semibold"
                            : "hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg shrink-0 mt-0.5 ${item.iconColor}`}
                        >
                          <Icon size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-800">
                              {item.title}
                            </span>
                            {isSelected && (
                              <Check
                                size={14}
                                className="text-indigo-600 shrink-0"
                              />
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                            {item.subtitle}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Direct Luyện nghe N4 Quick Button */}
          <button
            onClick={() => {
              setMode("listening");
              setStudyDropdownOpen(false);
              setAiDropdownOpen(false);
              setLessonDropdownOpen(false);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
              mode === "listening"
                ? "bg-purple-600 text-white border-purple-600 shadow-2xs"
                : "bg-purple-50 hover:bg-purple-100 text-purple-800 border-purple-200"
            }`}
            title="Luyện nghe JLPT N4 kèm Script & Đối chiếu dịch câu"
          >
            <Headphones size={15} />
            <span>Luyện nghe N4</span>
          </button>

          {/* Direct Sổ tay ôn tập Button */}
          <button
            onClick={() => {
              setMode("review");
              setStudyDropdownOpen(false);
              setAiDropdownOpen(false);
              setLessonDropdownOpen(false);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
              mode === "review"
                ? "bg-amber-600 text-white border-amber-600 shadow-2xs"
                : "bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200"
            }`}
            title="Sổ tay ôn tập cá nhân & sửa câu sai N4/N3"
          >
            <BookmarkCheck size={15} />
            <span>Sổ tay ôn tập</span>
            <span className="text-[9px] font-black bg-amber-200 text-amber-950 px-1 py-0.2 rounded-md">Mới</span>
          </button>

          {/* Direct Hán Tự N3 Button */}
          <button
            onClick={() => {
              setMode("kanji");
              setStudyDropdownOpen(false);
              setAiDropdownOpen(false);
              setLessonDropdownOpen(false);
            }}
            className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
              mode === "kanji"
                ? "bg-emerald-600 text-white border-emerald-600 shadow-2xs"
                : "bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-200"
            }`}
            title="1,959 Mục Hán Tự & Từ Vựng N3 Đông Du trên Cloud Firestore"
          >
            <Grid size={15} />
            <span>Hán Tự N3</span>
            <span className="text-[9px] font-black bg-emerald-200 text-emerald-950 px-1 py-0.2 rounded-md">1.9K</span>
          </button>

          {/* Direct Từ Vựng N3 Sou Matome Button */}
          <button
            onClick={() => {
              setMode("vocab-n3");
              setStudyDropdownOpen(false);
              setAiDropdownOpen(false);
              setLessonDropdownOpen(false);
            }}
            className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
              mode === "vocab-n3"
                ? "bg-blue-600 text-white border-blue-600 shadow-2xs"
                : "bg-blue-50 hover:bg-blue-100 text-blue-900 border-blue-200"
            }`}
            title="Từ vựng N3 Sou Matome số hóa từ 14 trang giáo trình (Việc nhà, Ra ngoài)"
          >
            <BookOpen size={15} />
            <span>Từ Vựng N3</span>
            <span className="text-[9px] font-black bg-blue-200 text-blue-950 px-1 py-0.2 rounded-md">Sou Matome</span>
          </button>

          {/* 2. Trợ lý AI Dropdown */}
          <div className="relative" ref={aiRef}>
            <button
              onClick={() => {
                setAiDropdownOpen(!aiDropdownOpen);
                setStudyDropdownOpen(false);
                setLessonDropdownOpen(false);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer border ${
                isAiModeActive
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-transparent shadow-xs"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
              }`}
            >
              <Bot
                size={16}
                className={isAiModeActive ? "text-amber-300" : "text-indigo-600"}
              />
              <span>
                {activeAiMode ? activeAiMode.title : "Trợ lý AI"}
              </span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${
                  isAiModeActive
                    ? "text-white/80"
                    : "text-slate-400"
                } ${aiDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* AI Dropdown Menu */}
            {aiDropdownOpen && (
              <div className="absolute left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Trợ lý thông minh Google Gemini
                </div>
                <div className="space-y-1">
                  {aiModes.map((item) => {
                    const Icon = item.icon;
                    const isSelected = mode === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setMode(item.id);
                          setAiDropdownOpen(false);
                        }}
                        className={`w-full p-2.5 rounded-xl flex items-start gap-3 transition-colors text-left cursor-pointer ${
                          isSelected
                            ? "bg-indigo-50/80 text-indigo-900 font-semibold"
                            : "hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg shrink-0 mt-0.5 ${item.iconColor}`}
                        >
                          <Icon size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-bold text-slate-800">
                              {item.title}
                            </span>
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${item.badgeColor}`}
                            >
                              {item.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                            {item.subtitle}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 3. Bài học Selector Dropdown */}
          <div className="relative" ref={lessonRef}>
            <button
              onClick={() => {
                setLessonDropdownOpen(!lessonDropdownOpen);
                setStudyDropdownOpen(false);
                setAiDropdownOpen(false);
              }}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200/70 text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="text-slate-400 font-normal">Bài:</span>
              <span className="font-bold text-slate-900">
                {selectedLesson === "all"
                  ? "Tất cả"
                  : selectedLesson === 35
                  ? "Đề 30 (Dora)"
                  : `Bài ${selectedLesson}`}
              </span>
              <ChevronDown
                size={13}
                className={`text-slate-400 transition-transform duration-200 ${
                  lessonDropdownOpen ? "rotate-180 text-slate-700" : ""
                }`}
              />
            </button>

            {/* Lesson Grid Dropdown */}
            {lessonDropdownOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Lọc theo bài học
                  </span>
                  <span className="text-[10px] text-indigo-600 font-bold bg-indigo-50 px-1.5 py-0.5 rounded">
                    {lessons.length} phần học
                  </span>
                </div>

                <button
                  onClick={() => {
                    setSelectedLesson("all");
                    setLessonDropdownOpen(false);
                  }}
                  className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-between mb-2 cursor-pointer transition-colors ${
                    selectedLesson === "all"
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <span>Tất cả bài học & Đề thi</span>
                  {selectedLesson === "all" && <Check size={13} />}
                </button>

                <div className="grid grid-cols-2 gap-1.5">
                  {lessons.map((lesson) => {
                    const isSelected = selectedLesson === lesson;
                    const label = lesson === 35 ? "Đề 30 (Dora)" : `Bài ${lesson}`;
                    return (
                      <button
                        key={lesson}
                        onClick={() => {
                          setSelectedLesson(lesson);
                          setLessonDropdownOpen(false);
                        }}
                        className={`py-1.5 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-indigo-50 text-indigo-700 font-bold border border-indigo-200"
                            : "hover:bg-slate-50 text-slate-600 border border-transparent"
                        }`}
                      >
                        <span className={lesson === 35 ? "text-emerald-700 font-bold" : ""}>{label}</span>
                        {isSelected && (
                          <Check size={12} className="text-indigo-600" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right: Database Sync & Profile / Mobile Toggle */}
        <div className="flex items-center gap-2">
          {/* Firestore Database Sync Button */}
          <button
            onClick={() => setShowSyncModal(true)}
            className="px-2.5 py-2 rounded-xl text-slate-700 hover:text-orange-600 hover:bg-orange-50/80 border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            title="Đồng bộ cơ sở dữ liệu Cloud Firestore"
          >
            <Database size={15} className="text-orange-500 shrink-0" />
            <span className="text-xs font-bold hidden lg:inline">
              Cơ sở dữ liệu
            </span>
          </button>

          {/* User Profile / Login */}
          {user ? (
            <div className="relative" ref={userRef}>
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors text-slate-800 cursor-pointer"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-indigo-500"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                    {user.displayName?.charAt(0) || "U"}
                  </div>
                )}
                <span className="text-xs font-semibold max-w-[100px] truncate hidden sm:inline-block">
                  {user.displayName || user.email}
                </span>
                <ChevronDown size={12} className="text-slate-400 hidden sm:block" />
              </button>

              {/* User Profile Dropdown */}
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 px-4 z-50 text-slate-800 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    {user.photoURL && (
                      <img
                        src={user.photoURL}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <div className="overflow-hidden">
                      <p className="text-sm font-bold text-slate-900 truncate">
                        {user.displayName}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* Sync status */}
                  <div className="py-2.5 text-xs text-emerald-700 flex items-center gap-2">
                    <Cloud size={14} className="text-emerald-500" />
                    <span>Đã kết nối Firestore Cloud Sync</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 py-2 border-y border-slate-100 text-center">
                    <div className="bg-amber-50 p-2 rounded-xl border border-amber-200/50">
                      <div className="text-amber-800 font-extrabold text-sm flex items-center justify-center gap-1">
                        <Star size={12} className="fill-amber-500 text-amber-500" />
                        <span>{starredWordIds.length}</span>
                      </div>
                      <div className="text-[10px] text-amber-700 font-medium">
                        Đã lưu
                      </div>
                    </div>
                    <div className="bg-indigo-50 p-2 rounded-xl border border-indigo-200/50">
                      <div className="text-indigo-800 font-extrabold text-sm flex items-center justify-center gap-1">
                        <CheckCircle size={12} className="text-indigo-600" />
                        <span>{masteredWordIds.length}</span>
                      </div>
                      <div className="text-[10px] text-indigo-700 font-medium">
                        Đã thuộc
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      setShowSyncModal(true);
                    }}
                    className="w-full mt-2.5 py-2 px-3 text-xs text-slate-700 hover:bg-slate-50 font-semibold rounded-xl flex items-center justify-center gap-2 border border-slate-200 transition-colors cursor-pointer"
                  >
                    <Database size={14} className="text-orange-500" />
                    <span>Đồng bộ Firestore</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      signOutUser();
                    }}
                    className="w-full mt-2 py-2 px-3 text-xs text-red-600 hover:bg-red-50 font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <LogOut size={14} />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs">
              <span className="flex items-center gap-1 text-amber-600" title="Từ đã lưu">
                <Star size={13} className="fill-amber-400 text-amber-500" />
                <span>{starredWordIds.length}</span>
              </span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1 text-emerald-600" title="Từ đã thuộc">
                <CheckCircle size={13} />
                <span>{masteredWordIds.length}</span>
              </span>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Mở menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-150">
          {/* Mobile Lesson Selector */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Chọn bài học
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <button
                onClick={() => setSelectedLesson("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                  selectedLesson === "all"
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Tất cả bài
              </button>
              {lessons.map((lesson) => (
                <button
                  key={lesson}
                  onClick={() => setSelectedLesson(lesson)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                    selectedLesson === lesson
                      ? "bg-indigo-600 text-white font-bold"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {lesson === 35 ? "Đề 30 (Dora)" : `Bài ${lesson}`}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Study Modes */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Chương trình N4
            </div>
            <div className="grid grid-cols-2 gap-2">
              {studyModes.map((item) => {
                const Icon = item.icon;
                const isSelected = mode === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setMode(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 cursor-pointer transition-all ${
                      isSelected
                        ? "bg-indigo-50 border-indigo-300 text-indigo-900 font-bold shadow-2xs"
                        : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg ${item.iconColor}`}>
                      <Icon size={15} />
                    </div>
                    <span className="text-xs truncate">{item.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Specialized Sections (2x2 grid, min-h-[48px] for iPhone 12+) */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                onClick={() => {
                  setMode("vocab-n3");
                  setMobileMenuOpen(false);
                }}
                className={`min-h-[48px] p-2.5 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  mode === "vocab-n3"
                    ? "bg-blue-600 text-white border-blue-600 shadow-2xs"
                    : "bg-blue-50 text-blue-900 border-blue-200"
                }`}
              >
                <BookOpen size={16} />
                <span>Từ Vựng N3 (320+)</span>
              </button>

              <button
                onClick={() => {
                  setMode("kanji");
                  setMobileMenuOpen(false);
                }}
                className={`min-h-[48px] p-2.5 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  mode === "kanji"
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-2xs"
                    : "bg-emerald-50 text-emerald-900 border-emerald-200"
                }`}
              >
                <Grid size={16} />
                <span>Hán Tự N3 (1.9K)</span>
              </button>

              <button
                onClick={() => {
                  setMode("listening");
                  setMobileMenuOpen(false);
                }}
                className={`min-h-[48px] p-2.5 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  mode === "listening"
                    ? "bg-purple-600 text-white border-purple-600 shadow-2xs"
                    : "bg-purple-50 text-purple-900 border-purple-200"
                }`}
              >
                <Headphones size={16} />
                <span>Luyện nghe N4</span>
              </button>

              <button
                onClick={() => {
                  setMode("review");
                  setMobileMenuOpen(false);
                }}
                className={`min-h-[48px] p-2.5 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  mode === "review"
                    ? "bg-amber-600 text-white border-amber-600 shadow-2xs"
                    : "bg-amber-50 text-amber-900 border-amber-200"
                }`}
              >
                <BookmarkCheck size={16} />
                <span>Sổ tay ôn tập</span>
              </button>
            </div>
          </div>

          {/* Mobile AI Features */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Trợ lý thông minh AI
            </div>
            <div className="grid grid-cols-1 gap-2">
              {aiModes.map((item) => {
                const Icon = item.icon;
                const isSelected = mode === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setMode(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`min-h-[48px] p-3 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? "bg-indigo-50 border-indigo-300 text-indigo-900 font-bold shadow-2xs"
                        : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-lg ${item.iconColor}`}>
                        <Icon size={15} />
                      </div>
                      <span className="text-xs font-semibold">{item.title}</span>
                    </div>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Horizontal Quick Navigation Strip (iPhone 12+ optimized thumb reach) */}
      <div className="md:hidden bg-slate-50 border-t border-slate-200/80 px-2 py-1.5 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setMode("vocab-n3")}
          className={`min-h-[40px] px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer ${
            mode === "vocab-n3"
              ? "bg-blue-600 text-white shadow-xs"
              : "bg-white text-slate-700 border border-slate-200"
          }`}
        >
          <BookOpen size={14} />
          <span>Từ Vựng N3</span>
        </button>

        <button
          onClick={() => setMode("kanji")}
          className={`min-h-[40px] px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer ${
            mode === "kanji"
              ? "bg-emerald-600 text-white shadow-xs"
              : "bg-white text-slate-700 border border-slate-200"
          }`}
        >
          <Grid size={14} />
          <span>Hán Tự N3</span>
        </button>

        <button
          onClick={() => setMode("listening")}
          className={`min-h-[40px] px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer ${
            mode === "listening"
              ? "bg-purple-600 text-white shadow-xs"
              : "bg-white text-slate-700 border border-slate-200"
          }`}
        >
          <Headphones size={14} />
          <span>Luyện nghe</span>
        </button>

        <button
          onClick={() => setMode("review")}
          className={`min-h-[40px] px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer ${
            mode === "review"
              ? "bg-amber-600 text-white shadow-xs"
              : "bg-white text-slate-700 border border-slate-200"
          }`}
        >
          <BookmarkCheck size={14} />
          <span>Sổ tay</span>
        </button>

        <button
          onClick={() => setMode("list")}
          className={`min-h-[40px] px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer ${
            mode === "list"
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-white text-slate-700 border border-slate-200"
          }`}
        >
          <BookOpen size={14} />
          <span>Minna N4</span>
        </button>
      </div>

      {/* Firestore Sync Modal */}
      <FirestoreSyncModal
        isOpen={showSyncModal}
        onClose={() => setShowSyncModal(false)}
      />
    </header>
  );
}
