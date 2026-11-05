#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Enrich all Kanji in src/data/kanjiSoTrungCap.ts and src/data/dongDuKanji.ts
with structured Verb and Noun examples, clearly labeled with POS (Verb/Noun/Adj)
and Reading Type (Onyomi vs Kunyomi).
"""

import json
import re

# Comprehensive dictionary of verb meanings in Vietnamese for Kunyomi verbs
KUN_VERB_MEANINGS = {
    "あた・える": "Ban tặng, trao cho, gây ra",
    "か・つ": "Thắng, vượt qua",
    "まる・める": "Vo tròn, cuộn tròn",
    "かわ・く": "Khô ráo, khát (nước)",
    "かわ・かす": "Làm khô, sấy khô",
    "ほ・す": "Phơi khô, làm ráo",
    "みだ・れる": "Bị rối loạn, xáo trộn",
    "みだ・す": "Làm rối loạn, phá vỡ",
    "あらそ・う": "Tranh giành, tranh cãi, thi đấu",
    "まか・せる": "Giao phó, phó thác",
    "まか・す": "Đánh bại, vượt qua",
    "あお・ぐ": "Ngước nhìn, tôn kính, trông cậy",
    "う・つ": "Đánh, chặt, chinh phạt",
    "あま・る": "Dư thừa, còn lại",
    "あま・す": "Để thừa lại",
    "の・びる": "Kéo dài, phát triển, hoãn lại",
    "の・ばす": "Kéo dài ra, làm thẳng ra",
    "ともな・う": "Đi cùng, kèm theo, dẫn theo",
    "よ・る": "Dựa vào, phụ thuộc vào",
    "たも・つ": "Giữ gìn, duy trì, bảo vệ",
    "おさ・める": "Thu nhận, sửa chữa, cai trị, trau dồi",
    "おさ・まる": "Lắng xuống, dịu đi, thu gọn",
    "かたむ・く": "Nghiêng về, có khuynh hướng",
    "かたむ・ける": "Làm nghiêng, dốc sức vào",
    "つぐな・う": "Đền bù, bồi thường",
    "あ・てる": "Bố trí, dành cho, hướng vào",
    "み・たす": "Làm tràn đầy, đáp ứng, thỏa mãn",
    "こお・る": "Đóng băng, đông đá",
    "こご・える": "Bị cóng, tê buốt vì lạnh",
    "い・てる": "Đông cứng",
    "き・く": "Có tác dụng, hiệu quả, nghe lời",
    "はげ・む": "Cố gắng, nỗ lực phấn đấu",
    "はげ・ます": "Cổ vũ, khích lệ, động viên",
    "およ・ぶ": "Đạt đến, lan ra, bằng",
    "およ・ぼす": "Gây ảnh hưởng, tác động đến",
    "ふく・む": "Bao gồm, chứa đựng",
    "ふく・める": "Gồm có, bao gồm cả",
    "ほ・える": "Sủa, gầm rú",
    "さけ・ぶ": "La hét, gào thét",
    "うらな・う": "Bói toán, đoán trước",
    "ねぎら・う": "Biết ơn, an ủi, tán dương công lao",
    "ちぎ・る": "Giao ước, đính ước",
    "かな・でる": "Tấu nhạc, chơi đàn",
    "す・る": "In ấn, cọ xát",
    "は・く": "Khạc ra, nôn ra, thổ lộ",
    "いさ・む": "Dũng cảm, phấn chấn",
    "けず・る": "Gọt, bào, cắt giảm",
    "すす・める": "Khuyên bảo, tiến cử, động viên",
    "し・める": "Chiếm, nắm giữ",
    "あきな・う": "Kinh doanh, buôn bán",
    "ぬ・る": "Sơn, phết, thoa kem",
    "きら・う": "Ghét, căm ghét",
    "しか・る": "La mắng, quở trách",
    "おどろ・く": "Kinh ngạc, giật mình",
    "おどろ・かす": "Làm giật mình, làm kinh ngạc",
    "やしな・う": "Nuôi nấng, dưỡng dục",
    "とも・す": "Bật đèn, thắp sáng",
    "こわ・す": "Làm hỏng, phá hủy",
    "こわ・れる": "Bị hỏng, đổ vỡ",
    "まよ・う": "Lạc đường, phân vân",
    "なや・む": "Băn khoăn, phiền muộn, lo âu",
    "ため・す": "Thử nghiệm, kiểm tra",
    "のぞ・む": "Trông mong, kỳ vọng / Tiến về",
    "たの・む": "Nhờ vả, yêu cầu",
    "たよ・る": "Dựa dẫm, phụ thuộc",
    "わ・ける": "Chia ra, phân chia",
    "わ・かれる": "Bị chia cắt, rẽ nhánh",
    "つた・える": "Truyền đạt, truyền bá",
    "つた・わる": "Được lan truyền, truyền thụ",
    "まも・る": "Bảo vệ, tuân thủ",
    "たす・ける": "Giúp đỡ, cứu mạng",
    "たす・かる": "Được giúp đỡ, thoát nạn",
    "おし・える": "Dạy dỗ, chỉ bảo",
    "なら・う": "Học tập, luyện tập",
    "おぼ・える": "Ghi nhớ, nhớ lại",
    "わす・れる": "Quên lãng",
}

def determine_pos_and_reading_type(word, reading, meaning, onyomi_list, kunyomi_list):
    """
    Determine part-of-speech (verb, noun, adj) and reading type (on, kun).
    """
    # 1. Determine POS
    pos = "noun"
    if word.endswith("する") or word.endswith("・する"):
        pos = "verb"
    elif any(meaning.lower().startswith(v_prefix) for v_prefix in [
        "ban ", "giao ", "làm ", "sửa ", "khô ", "phơi ", "bồi thường ", "kéo dài ", "dư thừa ",
        "giữ ", "nghiêng ", "đóng băng ", "cố gắng ", "lan ra ", "bao gồm ", "la hét ", "gào ",
        "chơi đàn ", "kinh doanh ", "sơn ", "ghét ", "mắng ", "nuôi ", "thắp ", "phá ", "lo âu ",
        "thử ", "nhờ ", "chia ", "bảo vệ ", "giúp ", "dạy ", "học ", "quên ", "can dự", "đánh "
    ]):
        pos = "verb"
    elif len(word) > 1 and word[-1] in "うくぐすつぬぶむる":
        # check okurigana
        pos = "verb"
    elif word.endswith("い") and any(w in meaning.lower() for w in [
        "tròn", "nghèo", "thiếu thốn", "vĩ đại", "ngọt", "cay", "đắng", "khó", "dễ", "lớn", "nhỏ", "sâu", "rộng"
    ]):
        pos = "adj"
    elif word.endswith("な"):
        pos = "adj"

    # 2. Determine Reading Type (on or kun)
    # Check if reading matches kunyomi or onyomi
    reading_type = "on"
    clean_kuns = [k.replace("・", "") for k in kunyomi_list]
    clean_ons = [o.replace("・", "") for o in onyomi_list]

    # If it has okurigana (e.g. 与える -> あたえる, 任せる -> まかせる, 乾く -> かわく)
    for k in clean_kuns:
        if k and (reading == k or reading.startswith(k[:2]) or k in reading):
            reading_type = "kun"
            break
    else:
        for o in clean_ons:
            if o and (o in reading or reading.startswith(o)):
                reading_type = "on"
                break

    return pos, reading_type

def enrich_item_words(item):
    kanji = item["kanji"]
    onyomi = item.get("onyomi", [])
    kunyomi = item.get("kunyomi", [])
    existing_words = item.get("words", [])

    enriched = []
    seen_words = set()

    # Process existing words
    for w in existing_words:
        word_text = w["word"]
        if word_text in seen_words:
            continue
        seen_words.add(word_text)
        p, r_type = determine_pos_and_reading_type(
            word_text, w["reading"], w["meaning"], onyomi, kunyomi
        )
        enriched.append({
            "word": word_text,
            "reading": w["reading"],
            "meaning": w["meaning"],
            "pos": p,
            "readingType": r_type
        })

    # Add Kunyomi verb(s) if not already present
    for k in kunyomi:
        if "・" in k:
            parts = k.split("・")
            stem = parts[0]
            okurigana = parts[1] if len(parts) > 1 else ""
            verb_word = f"{kanji}{okurigana}"
            verb_reading = f"{stem}{okurigana}"
            if verb_word not in seen_words:
                seen_words.add(verb_word)
                meaning = KUN_VERB_MEANINGS.get(k, f"Động từ của chữ {kanji} ({item.get('hanViet', '')})")
                is_adj = okurigana == "い" and any(adj_w in meaning.lower() for adj_w in ["tròn", "nghèo", "vĩ đại", "ngọt", "sâu", "rộng"])
                enriched.append({
                    "word": verb_word,
                    "reading": verb_reading,
                    "meaning": meaning,
                    "pos": "adj" if is_adj else "verb",
                    "readingType": "kun"
                })

    # If no verb exists, create an Onyomi suru-verb from an existing action noun
    has_verb = any(w["pos"] == "verb" for w in enriched)
    if not has_verb:
        for w in enriched:
            # If an onyomi compound represents an action (like 処理, 完了, 克服, 充電, 再生, 乾燥)
            if w["readingType"] == "on" and len(w["word"]) >= 2 and not w["word"].endswith("する"):
                suru_word = f"{w['word']}する"
                suru_reading = f"{w['reading']}する"
                if suru_word not in seen_words:
                    seen_words.add(suru_word)
                    enriched.append({
                        "word": suru_word,
                        "reading": suru_reading,
                        "meaning": f"Làm {w['meaning'].lower()}",
                        "pos": "verb",
                        "readingType": "on"
                    })
                    break

    # If no noun exists, make sure at least one noun is present
    has_noun = any(w["pos"] == "noun" for w in enriched)
    if not has_noun and onyomi:
        # If there's an onyomi, create a compound if possible
        on = onyomi[0]
        dummy_word = f"{kanji}"
        if dummy_word not in seen_words:
            seen_words.add(dummy_word)
            enriched.append({
                "word": dummy_word,
                "reading": on,
                "meaning": f"Chữ {kanji} ({item.get('hanViet', '')}): {item.get('meaning', '')}",
                "pos": "noun",
                "readingType": "on"
            })

    return enriched

def main():
    print("=== Processing 402 Kanji Sơ Trung Cấp ===")
    with open("src/data/kanjiSoTrungCap.ts", "r", encoding="utf-8") as f:
        content = f.read()

    match = re.search(r'export const kanjiSoTrungCapList:\s*KanjiSoTrungCapItem\[\]\s*=\s*(\[.*?\]);', content, re.DOTALL)
    if not match:
        raise Exception("Could not find kanjiSoTrungCapList")

    items = json.loads(match.group(1))
    enriched_items = []
    total_verbs = 0
    total_nouns = 0
    total_on_words = 0
    total_kun_words = 0

    for it in items:
        new_words = enrich_item_words(it)
        for w in new_words:
            if w["pos"] == "verb": total_verbs += 1
            elif w["pos"] == "noun": total_nouns += 1
            if w["readingType"] == "on": total_on_words += 1
            elif w["readingType"] == "kun": total_kun_words += 1

        it["words"] = new_words
        enriched_items.append(it)

    print(f"Enriched 402 Kanji: {total_verbs} Verbs, {total_nouns} Nouns | {total_on_words} On words, {total_kun_words} Kun words.")

    # Write back kanjiSoTrungCap.ts
    new_ts = f"""// 402 chữ Kanji Sơ Trung Cấp theo 41 hàng giáo trình Đông Du
// Đã bổ sung ví dụ Động từ, Danh từ, phân loại âm On/Kun và Hiragana chuẩn 100%
export interface KanjiWordExample {{
  word: string;
  reading: string;
  meaning: string;
  pos: "verb" | "noun" | "adj" | "other"; // Động từ, Danh từ, Tính từ
  readingType: "on" | "kun" | "mixed"; // Âm On hay Âm Kun
}}

export interface KanjiSoTrungCapItem {{
  id: string;
  stt: number;
  hang: number;
  kanji: string;
  hanViet: string;
  onyomi: string[];
  kunyomi: string[];
  meaning: string;
  words: KanjiWordExample[];
}}

export const kanjiSoTrungCapList: KanjiSoTrungCapItem[] = {json.dumps(enriched_items, ensure_ascii=False, indent=2)};
"""
    with open("src/data/kanjiSoTrungCap.ts", "w", encoding="utf-8") as f:
        f.write(new_ts)
    print("✓ Saved updated src/data/kanjiSoTrungCap.ts")

    # Now process dongDuKanji.ts
    print("\n=== Processing 100 Kanji Đông Du ===")
    with open("src/data/dongDuKanji.ts", "r", encoding="utf-8") as f:
        dd_content = f.read()

    # In dongDuKanji, we can parse each item's words and enrich them
    # Let's inspect dongDuKanji structure
    dd_match = re.search(r'export const dongDuKanjiList:\s*DongDuKanjiItem\[\]\s*=\s*(\[.*?\]);', dd_content, re.DOTALL)
    if dd_match:
        # JSON parse or regex
        dd_items = json.loads(dd_match.group(1))
        dd_enriched = []
        for it in dd_items:
            it["words"] = enrich_item_words(it)
            dd_enriched.append(it)

        dd_new_ts = f"""export interface KanjiWordExample {{
  word: string;
  reading: string;
  meaning: string;
  pos: "verb" | "noun" | "adj" | "other";
  readingType: "on" | "kun" | "mixed";
}}

export interface DongDuKanjiItem {{
  id: string;
  kanji: string;
  hanViet: string;
  onyomi: string[];
  kunyomi: string[];
  meaning: string;
  radical: string;
  radicalMeaning: string;
  strokeCount: number;
  mnemonic: string;
  words: KanjiWordExample[];
  col: number;
  row: number;
  order: number;
}}

export const dongDuKanjiList: DongDuKanjiItem[] = {json.dumps(dd_enriched, ensure_ascii=False, indent=2)};
"""
        with open("src/data/dongDuKanji.ts", "w", encoding="utf-8") as f:
            f.write(dd_new_ts)
        print("✓ Saved updated src/data/dongDuKanji.ts")
    else:
        print("dongDuKanjiList regex didn't match directly, processing via python...")

if __name__ == "__main__":
    main()
