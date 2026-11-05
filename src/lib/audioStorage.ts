// Client-side IndexedDB caching for original listening audio files (MP3/WAV/M4A)
// Ensures original voice recordings are never lost on reload or offline.

const DB_NAME = "NihongoListeningAudioDB";
const STORE_NAME = "audioFiles";
const DB_VERSION = 1;

interface CachedAudioRecord {
  key: string;
  blob: Blob;
  name: string;
  size: number;
  mimeType: string;
  timestamp: number;
}

function openAudioDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      reject(new Error("IndexedDB is not supported in this environment."));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "key" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Saves an original audio file/blob to browser IndexedDB
 */
export async function saveAudioToCache(
  key: string,
  blob: Blob,
  metadata: { name: string; size: number; mimeType?: string }
): Promise<void> {
  try {
    const db = await openAudioDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const record: CachedAudioRecord = {
        key,
        blob,
        name: metadata.name,
        size: metadata.size,
        mimeType: metadata.mimeType || blob.type || "audio/mp3",
        timestamp: Date.now(),
      };
      const req = store.put(record);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn("[IndexedDB] Could not save audio to cache:", err);
  }
}

/**
 * Retrieves a cached original audio file/blob from browser IndexedDB
 */
export async function getAudioFromCache(
  key: string
): Promise<{ blob: Blob; url: string; name: string; size: number; timestamp: number } | null> {
  try {
    const db = await openAudioDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => {
        const record = req.result as CachedAudioRecord | undefined;
        if (!record || !record.blob) {
          resolve(null);
          return;
        }
        const url = URL.createObjectURL(record.blob);
        resolve({
          blob: record.blob,
          url,
          name: record.name,
          size: record.size,
          timestamp: record.timestamp,
        });
      };
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn("[IndexedDB] Could not retrieve audio from cache:", err);
    return null;
  }
}

/**
 * Deletes a cached original audio from browser IndexedDB
 */
export async function removeAudioFromCache(key: string): Promise<void> {
  try {
    const db = await openAudioDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn("[IndexedDB] Could not delete audio from cache:", err);
  }
}

/**
 * Uploads audio file to server storage to keep permanently on backend
 */
export async function uploadAudioToServer(
  file: File | Blob,
  fileName: string,
  examPreset?: string
): Promise<{ success: boolean; audioUrl: string; fileName: string }> {
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const data = result.split(",")[1];
      resolve(data);
    };
    reader.onerror = (e) => reject(e);
  });

  const res = await fetch("/api/audio/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fileName,
      audioBase64: base64,
      mimeType: file.type || "audio/mp3",
      examPreset: examPreset || null,
    }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || "Không thể lưu audio lên máy chủ.");
  }

  return await res.json();
}
