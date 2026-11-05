import fs from "fs";
import path from "path";
import { dongDuKanjiList } from "../data/dongDuKanji";

export interface KanjiWordExample {
  word: string;
  reading: string;
  meaning: string;
  pos: "verb" | "noun" | "adj" | "other";
  readingType: "on" | "kun" | "mixed";
}

const KUN_VERB_MEANINGS: Record<string, string> = {
  "あた・える": "Ban tặng, trao cho, gây ra",
  "まか・せる": "Giao phó, phó thác",
  "まか・す": "Đánh bại, vượt qua",
  "おさ・める": "Sửa chữa, tu dưỡng, cai trị",
  "おさ・まる": "Lắng xuống, yên ổn",
  "つぐな・う": "Đền bù, bồi thường",
  "あ・てる": "Bố trí, dành cho, hướng vào",
  "み・たす": "Làm tràn đầy, đáp ứng",
  "こお・る": "Đóng băng, đông cứng",
  "こご・える": "Tê cóng, cóng buốt",
  "き・く": "Có tác dụng, hiệu nghiệm",
  "はげ・む": "Cố gắng, nỗ lực phấn đấu",
  "はげ・ます": "Động viên, khích lệ",
  "およ・ぶ": "Đạt đến, lan ra, bằng",
  "およ・ぼす": "Gây ảnh hưởng, tác động đến",
  "ふく・む": "Bao gồm, chứa đựng",
  "ふく・める": "Gồm có, tính cả vào",
  "ほ・える": "Sủa, gầm rú",
  "さけ・ぶ": "La hét, gào thét",
  "うらな・う": "Bói toán, tiên đoán",
  "ねぎら・う": "Cảm kích công lao, an ủi",
  "ちぎ・る": "Giao ước, đính ước",
  "かな・でる": "Tấu nhạc, chơi đàn",
  "す・る": "In ấn, cọ xát",
  "は・く": "Khạc ra, nôn ra, thổ lộ",
  "いさ・む": "Dũng cảm, phấn chấn",
  "けず・る": "Gọt, bào, cắt giảm",
  "すす・める": "Khuyên bảo, tiến cử",
  "し・める": "Chiếm, nắm giữ",
  "あきな・う": "Kinh doanh, buôn bán",
  "ぬ・る": "Sơn, phết, thoa",
  "きら・う": "Ghét, căm ghét",
  "しか・る": "La mắng, quở trách",
  "か・つ": "Thắng, vượt qua",
  "あお・ぐ": "Ngước nhìn, tôn kính",
  "の・びる": "Kéo dài, phát triển",
  "の・ばす": "Làm dài ra, kéo thẳng",
  "ともな・う": "Kèm theo, dẫn theo",
  "たも・つ": "Giữ gìn, duy trì",
  "かたむ・く": "Nghiêng, có chiều hướng",
  "かたむ・ける": "Làm nghiêng, dồn tâm trí",
  "あらそ・う": "Tranh giành, thi đấu",
  "みだ・れる": "Bị xáo trộn, bối rối",
  "みだ・す": "Làm rối loạn",
  "かわ・く": "Khô ráo, khát nước",
  "かわ・かす": "Làm khô, sấy khô",
};

function determinePosAndType(
  word: string,
  reading: string,
  meaning: string,
  onyomi: string[],
  kunyomi: string[]
): { pos: "verb" | "noun" | "adj" | "other"; readingType: "on" | "kun" | "mixed" } {
  let pos: "verb" | "noun" | "adj" | "other" = "noun";
  const m = meaning.toLowerCase();

  if (word.endsWith("する")) {
    pos = "verb";
  } else if (
    m.startsWith("ban ") ||
    m.startsWith("giao ") ||
    m.startsWith("làm ") ||
    m.startsWith("sửa ") ||
    m.startsWith("khô ") ||
    m.startsWith("bồi thường ") ||
    m.startsWith("kéo dài ") ||
    m.startsWith("dư thừa ") ||
    m.startsWith("giữ ") ||
    m.startsWith("nghiêng ") ||
    m.startsWith("đóng băng ") ||
    m.startsWith("nỗ lực ") ||
    m.startsWith("cố gắng ") ||
    m.startsWith("la hét ") ||
    m.startsWith("kinh doanh ") ||
    m.startsWith("sơn ") ||
    m.startsWith("ghét ") ||
    m.startsWith("la mắng ") ||
    m.startsWith("ngước ") ||
    m.startsWith("kèm ") ||
    m.startsWith("tranh ")
  ) {
    pos = "verb";
  } else if (word.length > 1 && "うくぐすつぬぶむる".includes(word.slice(-1))) {
    pos = "verb";
  } else if (word.endsWith("い") && (m.includes("tròn") || m.includes("vĩ đại") || m.includes("nghèo") || m.includes("vui") || m.includes("tốt"))) {
    pos = "adj";
  }

  // reading type
  let readingType: "on" | "kun" | "mixed" = "on";
  const cleanKuns = kunyomi.map((k) => k.replace(/・/g, ""));
  const cleanOns = onyomi.map((o) => o.replace(/・/g, ""));

  for (const k of cleanKuns) {
    if (k && (reading === k || reading.startsWith(k.slice(0, 2)) || reading.includes(k))) {
      readingType = "kun";
      break;
    }
  }

  return { pos, readingType };
}

async function run() {
  console.log("Enriching 100 Dong Du Kanji with verb & noun metadata...");

  const enrichedList = dongDuKanjiList.map((item) => {
    const enrichedWords: KanjiWordExample[] = [];
    const seen = new Set<string>();

    for (const w of item.words) {
      if (seen.has(w.word)) continue;
      seen.add(w.word);

      const { pos, readingType } = determinePosAndType(
        w.word,
        w.reading,
        w.meaning,
        item.onyomi,
        item.kunyomi
      );

      enrichedWords.push({
        word: w.word,
        reading: w.reading,
        meaning: w.meaning,
        pos,
        readingType,
      });
    }

    // Add Kun verb if missing
    for (const k of item.kunyomi) {
      if (k.includes("・")) {
        const parts = k.split("・");
        const okurigana = parts[1] || "";
        const verbWord = `${item.kanji}${okurigana}`;
        const verbReading = `${parts[0]}${okurigana}`;

        if (!seen.has(verbWord)) {
          seen.add(verbWord);
          const meaning = KUN_VERB_MEANINGS[k] || `Động từ của chữ ${item.kanji} (${item.hanViet})`;
          const isAdj = okurigana === "い";
          enrichedWords.push({
            word: verbWord,
            reading: verbReading,
            meaning,
            pos: isAdj ? "adj" : "verb",
            readingType: "kun",
          });
        }
      }
    }

    // Ensure action onyomi has a suru-verb if needed
    const hasVerb = enrichedWords.some((w) => w.pos === "verb");
    if (!hasVerb) {
      const firstOnNoun = enrichedWords.find((w) => w.readingType === "on" && w.pos === "noun");
      if (firstOnNoun && !firstOnNoun.word.endsWith("する")) {
        const suruWord = `${firstOnNoun.word}する`;
        if (!seen.has(suruWord)) {
          seen.add(suruWord);
          enrichedWords.push({
            word: suruWord,
            reading: `${firstOnNoun.reading}する`,
            meaning: `Làm ${firstOnNoun.meaning.toLowerCase()}`,
            pos: "verb",
            readingType: "on",
          });
        }
      }
    }

    return {
      ...item,
      words: enrichedWords,
    };
  });

  const outputContent = `export interface KanjiWordExample {
  word: string;
  reading: string;
  meaning: string;
  pos: "verb" | "noun" | "adj" | "other"; // Động từ, Danh từ, Tính từ
  readingType: "on" | "kun" | "mixed"; // Âm On hay Âm Kun
}

export interface DongDuKanjiItem {
  id: string;
  kanji: string;
  hanViet: string;
  onyomi: string[];
  kunyomi: string[];
  meaning: string;
  radical: string;
  radicalMeaning: string;
  strokeCount: number;
  mnemonic: string; // Mẹo nhớ chiết tự
  words: KanjiWordExample[];
  col: number; // 1 to 10 (từ trái qua phải trên giấy)
  row: number; // 1 to 10 (từ trên xuống dưới)
  order: number;
}

export const dongDuKanjiList: DongDuKanjiItem[] = ${JSON.stringify(enrichedList, null, 2)};
`;

  const targetPath = path.resolve(process.cwd(), "src/data/dongDuKanji.ts");
  fs.writeFileSync(targetPath, outputContent, "utf-8");
  console.log("✓ Successfully saved enriched src/data/dongDuKanji.ts!");
}

run();
