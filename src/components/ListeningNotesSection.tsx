import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Volume2,
  Play,
  Pause,
  Search,
  BookOpen,
  HelpCircle,
  Eye,
  Flame,
  Check,
  Copy,
  Sliders,
  X,
  Volume1,
  Sparkles,
  Layers,
} from "lucide-react";
import {
  listeningN4NotesData,
  listeningNoteCategories,
  ListeningNoteItem,
} from "../data/listeningNotesN4";

interface ListeningNotesSectionProps {
  // Shared Voice Studio settings
  selectedAiVoice: string;
  setSelectedAiVoice: (v: string) => void;
  playbackSpeed: number;
  setPlaybackSpeed: (s: number) => void;
  voiceEngine: "ai" | "browser";
  setVoiceEngine: (e: "ai" | "browser") => void;
  browserVoices: SpeechSynthesisVoice[];
  selectedBrowserVoiceIndex: number;
  setSelectedBrowserVoiceIndex: (idx: number) => void;
  isModal?: boolean;
  onCloseModal?: () => void;
}

export function ListeningNotesSection({
  selectedAiVoice,
  setSelectedAiVoice,
  playbackSpeed,
  setPlaybackSpeed,
  voiceEngine,
  setVoiceEngine,
  browserVoices,
  selectedBrowserVoiceIndex,
  setSelectedBrowserVoiceIndex,
  isModal = false,
  onCloseModal,
}: ListeningNotesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [practiceMode, setPracticeMode] = useState<"detail" | "quiz">("detail");
  const [revealedIds, setRevealedIds] = useState<Record<number, boolean>>({});
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState<number | null>(null);
  const [speakingType, setSpeakingType] = useState<"word" | "sentence" | null>(null);
  const [autoPlayIndex, setAutoPlayIndex] = useState<number>(-1);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [isTestingVoice, setIsTestingVoice] = useState<boolean>(false);

  const audioCacheRef = useRef<Record<string, string>>({});
  const activeAudioElementRef = useRef<HTMLAudioElement | null>(null);
  const autoPlayAbortRef = useRef<boolean>(false);

  // Available Gemini AI Voice personas
  const aiPersonas = [
    { id: "Kore", label: "🌸 Kore (Nữ nhẹ nhàng)", shortLabel: "🌸 Kore", desc: "Giọng nữ tự nhiên chuẩn Tokyo" },
    { id: "Puck", label: "👦 Puck (Nam trẻ)", shortLabel: "👦 Puck", desc: "Giọng nam thanh niên hội thoại" },
    { id: "Charon", label: "🎙 Charon (Nam trầm)", shortLabel: "🎙 Charon", desc: "Giọng giám thị/người lớn tuổi" },
    { id: "Fenrir", label: "📻 Fenrir (Phát thanh viên)", shortLabel: "📻 Fenrir", desc: "Giọng đọc đề thi chuyên nghiệp" },
    { id: "Zephyr", label: "👩 Zephyr (Nữ phát thanh)", shortLabel: "👩 Zephyr", desc: "Giọng nữ hướng dẫn đề thi" },
  ];

  // Filter notes based on category and search query
  const filteredNotes = listeningN4NotesData.filter((note) => {
    const matchesCat = activeCategory === "all" || note.category === activeCategory;
    if (!matchesCat) return false;
    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase().trim();
    return (
      note.japanese.toLowerCase().includes(q) ||
      note.hiragana.toLowerCase().includes(q) ||
      note.romaji.toLowerCase().includes(q) ||
      note.vietnamese.toLowerCase().includes(q) ||
      note.examTip.toLowerCase().includes(q) ||
      String(note.id) === q
    );
  });

  // Stop any active audio
  const stopAllAudio = useCallback(() => {
    if (activeAudioElementRef.current) {
      activeAudioElementRef.current.pause();
      activeAudioElementRef.current = null;
    }
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setCurrentlySpeakingId(null);
    setSpeakingType(null);
    setIsTestingVoice(false);
  }, []);

  useEffect(() => {
    return () => {
      autoPlayAbortRef.current = true;
      stopAllAudio();
    };
  }, [stopAllAudio]);

  const speakBrowserText = (text: string): Promise<void> => {
    return new Promise((resolve) => {
      if (typeof window === "undefined" || !window.speechSynthesis) {
        resolve();
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = playbackSpeed;

      const jaVoices = browserVoices.filter(
        (v) => v.lang.startsWith("ja") || v.lang.includes("JP")
      );
      if (jaVoices.length > 0 && selectedBrowserVoiceIndex < jaVoices.length) {
        utterance.voice = jaVoices[selectedBrowserVoiceIndex];
      }

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();
      window.speechSynthesis.speak(utterance);
    });
  };

  // Play audio snippet (Gemini AI Voice or Web Speech)
  const speakText = useCallback(
    async (text: string, id: number, type: "word" | "sentence") => {
      stopAllAudio();
      setCurrentlySpeakingId(id);
      setSpeakingType(type);

      if (voiceEngine === "ai") {
        try {
          const cacheKey = `${selectedAiVoice}_${text}`;
          let base64Audio = audioCacheRef.current[cacheKey];

          if (!base64Audio) {
            const res = await fetch("/api/ai/tts", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                text,
                voiceName: selectedAiVoice,
              }),
            });

            if (!res.ok) {
              throw new Error("Không thể gọi AI TTS");
            }

            const data = await res.json();
            base64Audio = data.audioBase64;
            audioCacheRef.current[cacheKey] = base64Audio;
          }

          const audio = new Audio(`data:audio/wav;base64,${base64Audio}`);
          audio.playbackRate = playbackSpeed;
          activeAudioElementRef.current = audio;

          await new Promise<void>((resolve) => {
            audio.onended = () => resolve();
            audio.onerror = () => resolve();
            audio.play().catch(() => resolve());
          });
        } catch (err) {
          console.warn("AI TTS error, fallback to browser speech:", err);
          await speakBrowserText(text);
        } finally {
          setCurrentlySpeakingId(null);
          setSpeakingType(null);
        }
      } else {
        await speakBrowserText(text);
        setCurrentlySpeakingId(null);
        setSpeakingType(null);
      }
    },
    [stopAllAudio, voiceEngine, selectedAiVoice, playbackSpeed, browserVoices, selectedBrowserVoiceIndex]
  );

  // Quick voice test
  const handleTestVoice = async () => {
    setIsTestingVoice(true);
    await speakText("日本語の聴解練習を始めましょう！", 999999, "word");
    setIsTestingVoice(false);
  };

  // Toggle reveal in Quiz mode
  const toggleReveal = (id: number) => {
    setRevealedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Auto-play loop
  const startAutoPlay = async () => {
    if (filteredNotes.length === 0) return;
    setIsAutoPlaying(true);
    autoPlayAbortRef.current = false;

    for (let i = 0; i < filteredNotes.length; i++) {
      if (autoPlayAbortRef.current) break;
      setAutoPlayIndex(i);
      const note = filteredNotes[i];

      // Read word
      await speakText(note.japanese, note.id, "word");
      if (autoPlayAbortRef.current) break;

      await new Promise((r) => setTimeout(r, 600));
      if (autoPlayAbortRef.current) break;

      // Read example if available
      if (note.exampleSentence) {
        await speakText(note.exampleSentence.japanese, note.id, "sentence");
        if (autoPlayAbortRef.current) break;
      }

      await new Promise((r) => setTimeout(r, 1200));
    }

    setIsAutoPlaying(false);
    setAutoPlayIndex(-1);
  };

  const stopAutoPlay = () => {
    autoPlayAbortRef.current = true;
    setIsAutoPlaying(false);
    setAutoPlayIndex(-1);
    stopAllAudio();
  };

  // Copy item content
  const handleCopyNote = (note: ListeningNoteItem) => {
    const text = `${note.id}. ${note.japanese} (${note.hiragana}) - ${note.vietnamese}\n💡 Mẹo thi: ${note.examTip}${
      note.exampleSentence
        ? `\nVí dụ: ${note.exampleSentence.japanese} -> ${note.exampleSentence.vietnamese}`
        : ""
    }`;
    navigator.clipboard.writeText(text);
    setCopiedId(note.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* HERO BANNER & VOICE STUDIO HEADER */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-xl border border-indigo-900/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 font-black flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/25">
              <Flame size={26} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg sm:text-xl font-black tracking-tight text-white">
                  87 Lưu Ý Vàng & Phòng Luyện Voice Thi Nghe N4
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-amber-950 shadow-xs uppercase">
                  Bí kíp độc quyền JLPT
                </span>
              </div>
              <p className="text-xs sm:text-sm text-indigo-200 mt-1 max-w-2xl leading-relaxed">
                Tổng hợp 87 bẫy nghe, lượng từ đếm (1-10 chiếc/ly/con), câu cửa miệng Mondai 3 & 4, thời lượng, miêu tả người và kính ngữ.
                Luyện nghe với <strong>5 chất giọng Gemini AI chuẩn Nhật</strong> và Web Speech.
              </p>
            </div>
          </div>

          {isModal && onCloseModal && (
            <button
              onClick={onCloseModal}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors self-end md:self-auto cursor-pointer"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* VOICE STUDIO SETTINGS PANEL */}
        <div className="mt-5 p-3.5 sm:p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 text-xs">
          {/* Left: Engine & Personas */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 flex-wrap">
            {/* Engine switch */}
            <div className="flex items-center bg-black/30 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setVoiceEngine("ai")}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  voiceEngine === "ai"
                    ? "bg-purple-600 text-white shadow-xs"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <Sparkles size={12} className="text-amber-300" />
                <span>Gemini AI Voice</span>
              </button>
              <button
                onClick={() => setVoiceEngine("browser")}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  voiceEngine === "browser"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                🌐 Web Speech
              </button>
            </div>

            {/* Persona pills */}
            {voiceEngine === "ai" ? (
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-bold text-indigo-200 hidden sm:inline">Giọng:</span>
                {aiPersonas.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedAiVoice(p.id)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      selectedAiVoice === p.id
                        ? "bg-purple-500 text-white border-purple-400 shadow-xs ring-2 ring-purple-400/30"
                        : "bg-white/10 hover:bg-white/20 text-white/90 border-white/15"
                    }`}
                    title={p.desc}
                  >
                    {p.shortLabel}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-indigo-200">Giọng trình duyệt:</span>
                <select
                  value={selectedBrowserVoiceIndex}
                  onChange={(e) => setSelectedBrowserVoiceIndex(Number(e.target.value))}
                  className="p-1 rounded-xl border border-white/20 bg-slate-900 text-white text-xs font-medium focus:outline-hidden"
                >
                  {browserVoices
                    .filter((v) => v.lang.startsWith("ja") || v.lang.includes("JP"))
                    .map((v, i) => (
                      <option key={i} value={i}>
                        {v.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
          </div>

          {/* Right: Speed pills & Test button */}
          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <div className="flex items-center bg-black/30 p-1 rounded-xl border border-white/10">
              <span className="text-[11px] font-bold text-indigo-200 px-1.5 hidden sm:inline">Tốc độ:</span>
              {[
                { val: 0.8, label: "0.8x" },
                { val: 1.0, label: "1.0x Chuẩn" },
                { val: 1.2, label: "1.2x Nhanh" },
              ].map((s) => (
                <button
                  key={s.val}
                  onClick={() => setPlaybackSpeed(s.val)}
                  className={`px-2 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                    playbackSpeed === s.val
                      ? "bg-indigo-600 text-white shadow-2xs"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <button
              onClick={handleTestVoice}
              disabled={isTestingVoice}
              className="px-3 py-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              title="Nghe thử âm lượng và phát âm của giọng đọc đang chọn"
            >
              <Volume1 size={14} />
              <span>{isTestingVoice ? "Đang phát..." : "Thử giọng"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* TOOLBAR: SEARCH, STUDY MODES & AUTOPLAY */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Tìm theo số (VD: 81), từ vựng (背中, 枚, ずつ), hoặc nghĩa (mấy phút, áo sơ mi)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:border-indigo-500 shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-2.5 p-0.5 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Study Mode Switcher & Auto-Play */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setPracticeMode("detail")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                practiceMode === "detail"
                  ? "bg-white text-indigo-700 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="Hiện đầy đủ nghĩa tiếng Việt và mẹo thi"
            >
              <BookOpen size={13} />
              <span>Chi tiết</span>
            </button>
            <button
              onClick={() => setPracticeMode("quiz")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                practiceMode === "quiz"
                  ? "bg-white text-indigo-700 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="Ẩn nghĩa tiếng Việt để luyện nghe đoán phản xạ"
            >
              <HelpCircle size={13} />
              <span>Luyện phản xạ (Ẩn nghĩa)</span>
            </button>
          </div>

          {/* Auto Play Continuous Button */}
          {isAutoPlaying ? (
            <button
              onClick={stopAutoPlay}
              className="px-3.5 py-2 rounded-xl text-xs font-black bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-1.5 shadow-sm transition-all cursor-pointer animate-pulse"
              title="Dừng chế độ phát tự động"
            >
              <Pause size={14} />
              <span>Dừng phát ({autoPlayIndex + 1}/{filteredNotes.length})</span>
            </button>
          ) : (
            <button
              onClick={startAutoPlay}
              className="px-3.5 py-2 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              title="Phát lần lượt tất cả các từ trong danh mục đang chọn"
            >
              <Play size={14} fill="currentColor" />
              <span>Phát liên tục ({filteredNotes.length})</span>
            </button>
          )}

          {/* Reveal / Hide All in Quiz mode */}
          {practiceMode === "quiz" && (
            <button
              onClick={() => {
                const nextAllRevealed = Object.keys(revealedIds).length < listeningN4NotesData.length;
                if (nextAllRevealed) {
                  const allMap: Record<number, boolean> = {};
                  listeningN4NotesData.forEach((n) => (allMap[n.id] = true));
                  setRevealedIds(allMap);
                } else {
                  setRevealedIds({});
                }
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
            >
              {Object.keys(revealedIds).length > 0 ? "Ẩn tất cả" : "Hiện tất cả"}
            </button>
          )}
        </div>
      </div>

      {/* CATEGORY TABS */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeCategory === "all"
              ? "bg-slate-900 text-white shadow-2xs"
              : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
          }`}
        >
          Tất cả 87 lưu ý ({listeningN4NotesData.length})
        </button>
        {listeningNoteCategories.map((cat) => {
          const count = listeningN4NotesData.filter((n) => n.category === cat.key).length;
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 border ${
                isActive
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-2xs"
                  : "bg-white hover:bg-slate-100 text-slate-700 border-slate-200"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.title} ({count})</span>
            </button>
          );
        })}
      </div>

      {/* NOTES CARDS GRID */}
      {filteredNotes.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search size={24} />
          </div>
          <h4 className="text-base font-bold text-slate-800">
            Không tìm thấy lưu ý nào phù hợp với "{searchQuery}"
          </h4>
          <p className="text-xs text-slate-500">
            Hãy thử tìm bằng từ khóa khác hoặc bấm danh mục "Tất cả 87 lưu ý".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNotes.map((note, index) => {
            const isSpeakingWord = currentlySpeakingId === note.id && speakingType === "word";
            const isSpeakingSentence = currentlySpeakingId === note.id && speakingType === "sentence";
            const isItemActiveInAutoPlay = isAutoPlaying && autoPlayIndex === index;
            const isRevealed = practiceMode === "detail" || revealedIds[note.id];
            const catMeta = listeningNoteCategories.find((c) => c.key === note.category);

            return (
              <div
                key={note.id}
                id={`note-${note.id}`}
                className={`bg-white rounded-3xl border transition-all duration-200 p-4 sm:p-5 flex flex-col justify-between shadow-xs hover:shadow-md ${
                  isItemActiveInAutoPlay
                    ? "border-emerald-500 ring-3 ring-emerald-500/20 bg-emerald-50/20"
                    : isSpeakingWord || isSpeakingSentence
                    ? "border-indigo-500 ring-2 ring-indigo-500/20"
                    : "border-slate-200/90 hover:border-slate-300"
                }`}
              >
                <div>
                  {/* Top Bar: ID Badge, Category & Copy */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center shadow-2xs">
                        {note.id}
                      </span>
                      {catMeta && (
                        <span
                          className={`px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold border ${catMeta.badgeColor}`}
                        >
                          {catMeta.icon} {catMeta.title}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleCopyNote(note)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Sao chép nội dung lưu ý này"
                    >
                      {copiedId === note.id ? (
                        <Check size={14} className="text-emerald-600" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>

                  {/* Japanese Word & Pronunciation */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug">
                        {note.japanese}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500 flex-wrap">
                        <span className="font-semibold text-indigo-700">{note.hiragana}</span>
                        <span className="text-slate-300">•</span>
                        <span className="font-mono text-[11px] text-slate-400">{note.romaji}</span>
                      </div>
                    </div>

                    {/* Pronounce word button */}
                    <button
                      onClick={() => speakText(note.japanese, note.id, "word")}
                      className={`p-2.5 rounded-2xl flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-2xs ${
                        isSpeakingWord
                          ? "bg-indigo-600 text-white scale-105 animate-pulse"
                          : "bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/80"
                      }`}
                      title={`Nghe phát âm từ: ${note.japanese} (${selectedAiVoice})`}
                    >
                      <Volume2 size={18} />
                    </button>
                  </div>

                  {/* Vietnamese Meaning & Exam Tip */}
                  <div className="mt-3">
                    {isRevealed ? (
                      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                        <div className="flex items-start gap-1.5 text-xs sm:text-sm font-extrabold text-slate-900 leading-relaxed">
                          <span className="text-indigo-600 shrink-0">👉</span>
                          <span>{note.vietnamese}</span>
                        </div>

                        {/* Exam Tip */}
                        <div className="pt-2 border-t border-slate-200/70 flex items-start gap-2 text-xs text-amber-950 bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/60">
                          <Flame size={14} className="text-amber-600 shrink-0 mt-0.5" />
                          <div className="leading-relaxed">
                            <strong className="font-black text-amber-900">Mẹo thi JLPT: </strong>
                            {note.examTip}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => toggleReveal(note.id)}
                        className="w-full p-3 rounded-2xl bg-indigo-50/60 hover:bg-indigo-50 border border-dashed border-indigo-300 text-xs font-bold text-indigo-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Eye size={14} />
                        <span>Bấm để hiện bản dịch & mẹo bẫy thi</span>
                      </button>
                    )}
                  </div>

                  {/* Example Sentence in Exam */}
                  {note.exampleSentence && isRevealed && (
                    <div className="mt-2.5 p-3 rounded-2xl bg-purple-50/50 border border-purple-200/60 flex items-start justify-between gap-3 text-xs">
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 block mb-0.5">
                          Ví dụ trong đề thi nghe:
                        </span>
                        <p className="font-bold text-slate-900 leading-relaxed">
                          {note.exampleSentence.japanese}
                        </p>
                        <p className="text-slate-600 text-[11px] mt-0.5">
                          {note.exampleSentence.vietnamese}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          speakText(note.exampleSentence!.japanese, note.id, "sentence")
                        }
                        className={`p-2 rounded-xl shrink-0 transition-all cursor-pointer ${
                          isSpeakingSentence
                            ? "bg-purple-600 text-white animate-pulse"
                            : "bg-purple-100 hover:bg-purple-200 text-purple-800"
                        }`}
                        title="Nghe phát âm câu ví dụ này"
                      >
                        <Volume2 size={15} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
