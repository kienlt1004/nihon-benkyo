import React from "react";
import { ListeningNotesSection } from "./ListeningNotesSection";

interface ListeningNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Shared voice settings
  selectedAiVoice: string;
  setSelectedAiVoice: (v: string) => void;
  playbackSpeed: number;
  setPlaybackSpeed: (s: number) => void;
  voiceEngine: "ai" | "browser";
  setVoiceEngine: (e: "ai" | "browser") => void;
  browserVoices: SpeechSynthesisVoice[];
  selectedBrowserVoiceIndex: number;
  setSelectedBrowserVoiceIndex: (idx: number) => void;
}

export function ListeningNotesModal({
  isOpen,
  onClose,
  selectedAiVoice,
  setSelectedAiVoice,
  playbackSpeed,
  setPlaybackSpeed,
  voiceEngine,
  setVoiceEngine,
  browserVoices,
  selectedBrowserVoiceIndex,
  setSelectedBrowserVoiceIndex,
}: ListeningNotesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-50 rounded-3xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <ListeningNotesSection
            selectedAiVoice={selectedAiVoice}
            setSelectedAiVoice={setSelectedAiVoice}
            playbackSpeed={playbackSpeed}
            setPlaybackSpeed={setPlaybackSpeed}
            voiceEngine={voiceEngine}
            setVoiceEngine={setVoiceEngine}
            browserVoices={browserVoices}
            selectedBrowserVoiceIndex={selectedBrowserVoiceIndex}
            setSelectedBrowserVoiceIndex={setSelectedBrowserVoiceIndex}
            isModal={true}
            onCloseModal={onClose}
          />
        </div>
      </div>
    </div>
  );
}
