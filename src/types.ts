export type AppMode = "list" | "flashcard" | "quiz" | "grammar" | "ai-search" | "live-voice" | "listening" | "review" | "kanji" | "vocab-n3";

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface SearchGroundingResult {
  answer: string;
  sources: GroundingSource[];
}

export interface StudyStats {
  totalQuizzes: number;
  totalCorrect: number;
  highestScore: number;
  lastActive?: string;
}

export interface QuizRecord {
  id?: string;
  score: number;
  total: number;
  lesson: string;
  createdAt: string;
}

export interface UserProfileData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  starredWordIds: string[];
  masteredWordIds: string[];
  studyStats: StudyStats;
  lastActive?: string;
}
