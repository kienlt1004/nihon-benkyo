import { TuVungN3SouMatomeItem } from "../data/tuVungN3SouMatome";

/**
 * Result of parsing raw JSON or CSV data
 */
export interface ParseResult {
  success: boolean;
  items: TuVungN3SouMatomeItem[];
  error?: string;
  totalParsed: number;
}

/**
 * Result of merging incoming items into the existing dataset
 */
export interface MergeResult {
  mergedList: TuVungN3SouMatomeItem[];
  addedCount: number;
  updatedCount: number;
  totalBefore: number;
  totalAfter: number;
}

/**
 * Standardize text string by trimming and lowercasing
 */
function normalizeKey(str: string | undefined): string {
  if (!str) return "";
  return str.trim().toLowerCase().replace(/[\s\u3000]+/g, " ");
}

/**
 * Normalize and guess field names from object keys
 */
function extractFieldValue(obj: Record<string, any>, possibleKeys: string[]): any {
  const objKeys = Object.keys(obj);
  for (const pKey of possibleKeys) {
    const pKeyNorm = pKey.toLowerCase().replace(/[^a-z0-9]/g, "");
    for (const actualKey of objKeys) {
      const actualNorm = actualKey.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (actualNorm === pKeyNorm) {
        return obj[actualKey];
      }
    }
  }
  return undefined;
}

/**
 * Normalize vocabulary word type
 */
function normalizeType(rawType: any): "noun" | "verb" | "adj" | "phrase" | "adverb" {
  if (!rawType) return "noun";
  const str = String(rawType).toLowerCase().trim();
  if (str.includes("verb") || str.includes("động từ") || str.includes("dong tu")) return "verb";
  if (str.includes("adj") || str.includes("tính từ") || str.includes("tinh tu") || str.includes("い") || str.includes("な")) return "adj";
  if (str.includes("adv") || str.includes("phó từ") || str.includes("pho tu")) return "adverb";
  if (str.includes("phrase") || str.includes("cụm") || str.includes("cum")) return "phrase";
  return "noun";
}

/**
 * Simple CSV parser handling quotes and delimiters
 */
function parseCsvRows(csvText: string): string[][] {
  const cleanText = csvText.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
  if (!cleanText) return [];

  // Determine delimiter: tab, comma, or semicolon
  const firstLine = cleanText.split("\n")[0] || "";
  let delimiter = ",";
  if (firstLine.includes("\t") && !firstLine.includes(",")) delimiter = "\t";
  else if (firstLine.includes(";") && !firstLine.includes(",")) delimiter = ";";

  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = "";
  let inQuotes = false;

  for (let i = 0; i < cleanText.length; i++) {
    const char = cleanText[i];
    const nextChar = cleanText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentField += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === delimiter && !inQuotes) {
      currentRow.push(currentField.trim());
      currentField = "";
    } else if (char === "\n" && !inQuotes) {
      currentRow.push(currentField.trim());
      if (currentRow.some((f) => f.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentField = "";
    } else {
      currentField += char;
    }
  }

  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some((f) => f.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

/**
 * Convert raw object into typed TuVungN3SouMatomeItem
 */
export function convertRawToItem(raw: Record<string, any>, index: number): TuVungN3SouMatomeItem | null {
  const japanese =
    extractFieldValue(raw, [
      "japanese",
      "kanji",
      "word",
      "tuvung",
      "tu_vung",
      "tieng_nhat",
      "nhat",
      "vocabulary",
      "term",
      "expression",
    ]) || "";

  const hiragana =
    extractFieldValue(raw, [
      "hiragana",
      "reading",
      "furigana",
      "cachdoc",
      "cach_doc",
      "am_doc",
      "kana",
      "romaji",
    ]) || "";

  const vietnamese =
    extractFieldValue(raw, [
      "vietnamese",
      "meaning",
      "dich",
      "dich_nghia",
      "nghia",
      "y_nghia",
      "viet",
      "definition",
      "translation",
    ]) || "";

  // If no word or no meaning, invalid item
  if (!String(japanese).trim() && !String(hiragana).trim()) {
    return null;
  }

  const finalJapanese = String(japanese || hiragana).trim();
  const finalHiragana = String(hiragana || japanese).trim();
  const finalVietnamese = String(vietnamese || "").trim();

  const rawWeek = extractFieldValue(raw, ["week", "tuan", "weeknumber"]);
  const rawDay = extractFieldValue(raw, ["day", "ngay", "daynumber"]);
  const weekNum = typeof rawWeek === "number" ? rawWeek : parseInt(String(rawWeek || 1), 10) || 1;
  const dayNum = typeof rawDay === "number" ? rawDay : parseInt(String(rawDay || 1), 10) || 1;

  const category =
    extractFieldValue(raw, ["category", "topic", "chude", "chu_de", "nhom", "phan_loai"]) ||
    "Từ vựng nhập thêm";

  const weekTitle =
    extractFieldValue(raw, ["weektitle", "ten_tuan", "tuan_title"]) ||
    `Tuần ${weekNum}: Mở rộng N3`;

  const dayTitle =
    extractFieldValue(raw, ["daytitle", "ten_ngay", "ngay_title"]) ||
    `Ngày ${dayNum}: Từ vựng bổ sung`;

  const type = normalizeType(extractFieldValue(raw, ["type", "tuloai", "tu_loai", "pos"]));

  const exampleSentence =
    extractFieldValue(raw, ["examplesentence", "example", "sentence", "vidu", "vi_du", "cau_vidu"]) || "";

  const exampleMeaning =
    extractFieldValue(raw, ["examplemeaning", "nghia_vidu", "dich_vidu", "nghia_cau", "sentence_meaning"]) || "";

  const id =
    raw.id ||
    `n3sm_import_${Date.now()}_${index + 1}_${Math.random().toString(36).substring(2, 7)}`;

  return {
    id: String(id),
    stt: typeof raw.stt === "number" ? raw.stt : index + 1,
    week: weekNum,
    weekTitle: String(weekTitle),
    day: dayNum,
    dayTitle: String(dayTitle),
    category: String(category),
    japanese: finalJapanese,
    hiragana: finalHiragana,
    vietnamese: finalVietnamese,
    type,
    exampleSentence: exampleSentence ? String(exampleSentence).trim() : undefined,
    exampleMeaning: exampleMeaning ? String(exampleMeaning).trim() : undefined,
  };
}

/**
 * Parse raw text (either JSON or CSV) into TuVungN3SouMatomeItem[]
 */
export function parseRawVocabText(text: string): ParseResult {
  const trimmed = text.trim();
  if (!trimmed) {
    return { success: false, items: [], error: "Dữ liệu trống, vui lòng chọn file hoặc dán nội dung.", totalParsed: 0 };
  }

  // 1. Try parsing as JSON first
  if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
    try {
      const parsedJson = JSON.parse(trimmed);
      let rawArray: any[] = [];

      if (Array.isArray(parsedJson)) {
        rawArray = parsedJson;
      } else if (typeof parsedJson === "object" && parsedJson !== null) {
        // Look for candidate array properties
        const arrayProp = Object.values(parsedJson).find((val) => Array.isArray(val));
        if (arrayProp && Array.isArray(arrayProp)) {
          rawArray = arrayProp;
        } else {
          rawArray = [parsedJson];
        }
      }

      const items: TuVungN3SouMatomeItem[] = [];
      rawArray.forEach((itemObj, idx) => {
        if (typeof itemObj === "object" && itemObj !== null) {
          const item = convertRawToItem(itemObj, idx);
          if (item) items.push(item);
        }
      });

      if (items.length === 0) {
        return {
          success: false,
          items: [],
          error: "Không tìm thấy cấu trúc từ vựng hợp lệ trong tệp JSON.",
          totalParsed: 0,
        };
      }

      return { success: true, items, totalParsed: items.length };
    } catch {
      // If JSON parsing fails, fall through to CSV parser
    }
  }

  // 2. Parse as CSV
  try {
    const rows = parseCsvRows(trimmed);
    if (rows.length < 2) {
      return {
        success: false,
        items: [],
        error: "Tệp CSV cần ít nhất 1 dòng tiêu đề và 1 dòng dữ liệu.",
        totalParsed: 0,
      };
    }

    const headers = rows[0].map((h) => h.trim());
    const items: TuVungN3SouMatomeItem[] = [];

    for (let r = 1; r < rows.length; r++) {
      const row = rows[r];
      if (row.length === 0 || row.every((c) => !c.trim())) continue;

      const rowObj: Record<string, string> = {};
      headers.forEach((header, colIdx) => {
        rowObj[header] = row[colIdx] ?? "";
      });

      const item = convertRawToItem(rowObj, items.length);
      if (item) items.push(item);
    }

    if (items.length === 0) {
      return {
        success: false,
        items: [],
        error: "Không trích xuất được từ vựng hợp lệ nào từ tệp CSV.",
        totalParsed: 0,
      };
    }

    return { success: true, items, totalParsed: items.length };
  } catch (err: any) {
    return {
      success: false,
      items: [],
      error: `Lỗi đọc dữ liệu: ${err?.message || "Không thể phân tích định dạng"}`,
      totalParsed: 0,
    };
  }
}

/**
 * Deduplicate and Merge incoming items with existing items
 */
export function mergeAndDeduplicate(
  existingItems: TuVungN3SouMatomeItem[],
  incomingItems: TuVungN3SouMatomeItem[]
): MergeResult {
  const existingMap = new Map<string, { item: TuVungN3SouMatomeItem; index: number }>();

  // Index existing items
  existingItems.forEach((item, index) => {
    const key = `${normalizeKey(item.japanese)}___${normalizeKey(item.hiragana)}`;
    existingMap.set(key, { item, index });
    // Also index by japanese alone if hiragana might differ slightly
    if (!existingMap.has(normalizeKey(item.japanese))) {
      existingMap.set(normalizeKey(item.japanese), { item, index });
    }
  });

  const merged = [...existingItems];
  let addedCount = 0;
  let updatedCount = 0;

  incomingItems.forEach((incItem) => {
    const keyWithHira = `${normalizeKey(incItem.japanese)}___${normalizeKey(incItem.hiragana)}`;
    const keyJpOnly = normalizeKey(incItem.japanese);

    const existingMatch = existingMap.get(keyWithHira) || existingMap.get(keyJpOnly);

    if (existingMatch) {
      // Update existing item with missing fields
      const target = merged[existingMatch.index];
      let hasUpdate = false;

      if (!target.vietnamese && incItem.vietnamese) {
        target.vietnamese = incItem.vietnamese;
        hasUpdate = true;
      }
      if (!target.exampleSentence && incItem.exampleSentence) {
        target.exampleSentence = incItem.exampleSentence;
        hasUpdate = true;
      }
      if (!target.exampleMeaning && incItem.exampleMeaning) {
        target.exampleMeaning = incItem.exampleMeaning;
        hasUpdate = true;
      }
      if ((!target.category || target.category === "Từ vựng nhập thêm") && incItem.category) {
        target.category = incItem.category;
        hasUpdate = true;
      }

      if (hasUpdate) updatedCount++;
    } else {
      // Brand new item: append
      const newItem: TuVungN3SouMatomeItem = {
        ...incItem,
        stt: merged.length + 1,
      };
      merged.push(newItem);
      existingMap.set(keyWithHira, { item: newItem, index: merged.length - 1 });
      addedCount++;
    }
  });

  return {
    mergedList: merged,
    addedCount,
    updatedCount,
    totalBefore: existingItems.length,
    totalAfter: merged.length,
  };
}

/**
 * Export current list to standard JSON string
 */
export function exportToJson(items: TuVungN3SouMatomeItem[]): string {
  return JSON.stringify(items, null, 2);
}

/**
 * Export current list to formatted CSV string
 */
export function exportToCsv(items: TuVungN3SouMatomeItem[]): string {
  const headers = [
    "STT",
    "Tuần",
    "Tiêu đề tuần",
    "Ngày",
    "Tiêu đề ngày",
    "Chủ đề",
    "Tiếng Nhật",
    "Hiragana",
    "Nghĩa tiếng Việt",
    "Từ loại",
    "Ví dụ tiếng Nhật",
    "Dịch nghĩa ví dụ",
  ];

  const escapeCsv = (val: any) => {
    if (val === undefined || val === null) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = items.map((it) => [
    escapeCsv(it.stt),
    escapeCsv(it.week),
    escapeCsv(it.weekTitle),
    escapeCsv(it.day),
    escapeCsv(it.dayTitle),
    escapeCsv(it.category),
    escapeCsv(it.japanese),
    escapeCsv(it.hiragana),
    escapeCsv(it.vietnamese),
    escapeCsv(it.type),
    escapeCsv(it.exampleSentence || ""),
    escapeCsv(it.exampleMeaning || ""),
  ]);

  return [headers.map(escapeCsv).join(","), ...rows.map((r) => r.join(","))].join("\r\n");
}

/**
 * Trigger browser file download
 */
export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
