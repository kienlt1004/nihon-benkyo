import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  doc,
  setDoc,
  onSnapshot,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { QuizRecord, StudyStats, UserProfileData } from "../types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  starredWordIds: string[];
  masteredWordIds: string[];
  studyStats: StudyStats;
  quizHistory: QuizRecord[];
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  toggleStarWord: (wordId: string) => Promise<void>;
  toggleMasteredWord: (wordId: string) => Promise<void>;
  saveQuizResult: (score: number, total: number, lesson: string) => Promise<void>;
}

const LOCAL_STORAGE_KEY_STARRED = "nihongo_n4_starred_words";
const LOCAL_STORAGE_KEY_MASTERED = "nihongo_n4_mastered_words";
const LOCAL_STORAGE_KEY_STATS = "nihongo_n4_study_stats";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [starredWordIds, setStarredWordIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_STARRED);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [masteredWordIds, setMasteredWordIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_MASTERED);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [studyStats, setStudyStats] = useState<StudyStats>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_STATS);
      return saved
        ? JSON.parse(saved)
        : { totalQuizzes: 0, totalCorrect: 0, highestScore: 0 };
    } catch {
      return { totalQuizzes: 0, totalCorrect: 0, highestScore: 0 };
    }
  });
  const [quizHistory, setQuizHistory] = useState<QuizRecord[]>([]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        // Sync with Firestore user document
        const userDocRef = doc(db, "users", currentUser.uid);

        const unsubscribeDoc = onSnapshot(
          userDocRef,
          async (snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.data();
              if (Array.isArray(data.starredWordIds)) {
                setStarredWordIds(data.starredWordIds);
                localStorage.setItem(
                  LOCAL_STORAGE_KEY_STARRED,
                  JSON.stringify(data.starredWordIds),
                );
              }
              if (Array.isArray(data.masteredWordIds)) {
                setMasteredWordIds(data.masteredWordIds);
                localStorage.setItem(
                  LOCAL_STORAGE_KEY_MASTERED,
                  JSON.stringify(data.masteredWordIds),
                );
              }
              if (data.studyStats) {
                setStudyStats(data.studyStats);
                localStorage.setItem(
                  LOCAL_STORAGE_KEY_STATS,
                  JSON.stringify(data.studyStats),
                );
              }
            } else {
              // Initialize new Firestore document for user with existing local state
              const initialData: Partial<UserProfileData> = {
                uid: currentUser.uid,
                email: currentUser.email,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL,
                starredWordIds: starredWordIds,
                masteredWordIds: masteredWordIds,
                studyStats: studyStats,
                lastActive: new Date().toISOString(),
              };
              await setDoc(userDocRef, initialData, { merge: true });
            }
          },
          (err) => {
            console.error("Firestore user sync error:", err);
          },
        );

        // Fetch quiz history from Firestore
        const historyCol = collection(db, "users", currentUser.uid, "quizHistory");
        const historyQuery = query(historyCol, orderBy("createdAt", "desc"), limit(20));
        const unsubscribeHistory = onSnapshot(
          historyQuery,
          (snapshot) => {
            const list: QuizRecord[] = [];
            snapshot.forEach((d) => {
              const item = d.data();
              list.push({
                id: d.id,
                score: item.score || 0,
                total: item.total || 0,
                lesson: item.lesson || "all",
                createdAt: item.createdAt || new Date().toISOString(),
              });
            });
            setQuizHistory(list);
          },
          (err) => {
            console.error("Firestore history sync error:", err);
          },
        );

        return () => {
          unsubscribeDoc();
          unsubscribeHistory();
        };
      }
    });

    return () => unsubscribeAuth();
  }, [user?.uid]);

  const signInWithGoogle = async () => {
    console.warn("Google Sign-In has been disabled as requested.");
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (err: any) {
      console.error("Sign-Out Error:", err);
      throw err;
    }
  };

  const toggleStarWord = async (wordId: string) => {
    const updated = starredWordIds.includes(wordId)
      ? starredWordIds.filter((id) => id !== wordId)
      : [...starredWordIds, wordId];

    setStarredWordIds(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY_STARRED, JSON.stringify(updated));

    if (user) {
      try {
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(
          userDocRef,
          {
            starredWordIds: updated,
            lastActive: new Date().toISOString(),
          },
          { merge: true },
        );
      } catch (err) {
        console.error("Error updating starred word in Firestore:", err);
      }
    }
  };

  const toggleMasteredWord = async (wordId: string) => {
    const updated = masteredWordIds.includes(wordId)
      ? masteredWordIds.filter((id) => id !== wordId)
      : [...masteredWordIds, wordId];

    setMasteredWordIds(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY_MASTERED, JSON.stringify(updated));

    if (user) {
      try {
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(
          userDocRef,
          {
            masteredWordIds: updated,
            lastActive: new Date().toISOString(),
          },
          { merge: true },
        );
      } catch (err) {
        console.error("Error updating mastered word in Firestore:", err);
      }
    }
  };

  const saveQuizResult = async (score: number, total: number, lesson: string) => {
    const updatedStats: StudyStats = {
      totalQuizzes: (studyStats.totalQuizzes || 0) + 1,
      totalCorrect: (studyStats.totalCorrect || 0) + score,
      highestScore: Math.max(studyStats.highestScore || 0, score),
      lastActive: new Date().toISOString(),
    };

    setStudyStats(updatedStats);
    localStorage.setItem(LOCAL_STORAGE_KEY_STATS, JSON.stringify(updatedStats));

    const record: QuizRecord = {
      score,
      total,
      lesson,
      createdAt: new Date().toISOString(),
    };

    setQuizHistory((prev) => [record, ...prev.slice(0, 19)]);

    if (user) {
      try {
        // Save to Firestore subcollection
        const historyCol = collection(db, "users", user.uid, "quizHistory");
        await addDoc(historyCol, record);

        // Update overall studyStats in user profile
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, { studyStats: updatedStats }, { merge: true });
      } catch (err) {
        console.error("Error saving quiz result to Firestore:", err);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        starredWordIds,
        masteredWordIds,
        studyStats,
        quizHistory,
        signInWithGoogle,
        signOutUser,
        toggleStarWord,
        toggleMasteredWord,
        saveQuizResult,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
