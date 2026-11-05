// 402 chữ Kanji Sơ Trung Cấp theo 41 hàng giáo trình Đông Du
// Đã bổ sung ví dụ Động từ, Danh từ, phân loại âm On/Kun và Hiragana chuẩn 100%
export interface KanjiWordExample {
  word: string;
  reading: string;
  meaning: string;
  pos: "verb" | "noun" | "adj" | "other"; // Động từ, Danh từ, Tính từ
  readingType: "on" | "kun" | "mixed"; // Âm On hay Âm Kun
}

export interface KanjiSoTrungCapItem {
  id: string;
  stt: number;
  hang: number;
  kanji: string;
  hanViet: string;
  onyomi: string[];
  kunyomi: string[];
  meaning: string;
  words: KanjiWordExample[];
}

export const kanjiSoTrungCapList: KanjiSoTrungCapItem[] = [
  {
    "id": "k402_1",
    "stt": 1,
    "hang": 1,
    "kanji": "与",
    "hanViet": "Dự",
    "onyomi": [
      "よ"
    ],
    "kunyomi": [
      "あた・える"
    ],
    "meaning": "cho, cấp",
    "words": [
      {
        "word": "給与",
        "reading": "きゅうよ",
        "meaning": "Tiền lương",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "参与",
        "reading": "さんよ",
        "meaning": "Tham gia",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "与える",
        "reading": "あたえる",
        "meaning": "Ban tặng, trao cho, gây ra",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_2",
    "stt": 2,
    "hang": 1,
    "kanji": "且",
    "hanViet": "Thả",
    "onyomi": [
      "しょ",
      "そ"
    ],
    "kunyomi": [
      "か・つ"
    ],
    "meaning": "và",
    "words": [
      {
        "word": "且つ",
        "reading": "かつ",
        "meaning": "Đồng thời, và",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "且",
        "reading": "しょ",
        "meaning": "Chữ 且 (Thả): và",
        "pos": "noun",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_3",
    "stt": 3,
    "hang": 1,
    "kanji": "丸",
    "hanViet": "Hoàn",
    "onyomi": [
      "がん"
    ],
    "kunyomi": [
      "まる",
      "まる・い",
      "まる・める"
    ],
    "meaning": "tròn",
    "words": [
      {
        "word": "丸い",
        "reading": "まるい",
        "meaning": "Tròn",
        "pos": "adj",
        "readingType": "kun"
      },
      {
        "word": "弾丸",
        "reading": "だんがん",
        "meaning": "Viên đạn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "丸める",
        "reading": "まるめる",
        "meaning": "Vo tròn, cuộn tròn",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_4",
    "stt": 4,
    "hang": 1,
    "kanji": "乏",
    "hanViet": "Phạp",
    "onyomi": [
      "ぼう"
    ],
    "kunyomi": [
      "とぼ・しい"
    ],
    "meaning": "nghèo, thiếu thốn",
    "words": [
      {
        "word": "乏しい",
        "reading": "とぼしい",
        "meaning": "Nghèo nàn, thiếu thốn",
        "pos": "adj",
        "readingType": "kun"
      },
      {
        "word": "欠乏",
        "reading": "けつぼう",
        "meaning": "Thiếu thốn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "欠乏する",
        "reading": "けつぼうする",
        "meaning": "Làm thiếu thốn",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_5",
    "stt": 5,
    "hang": 1,
    "kanji": "乾",
    "hanViet": "Can",
    "onyomi": [
      "かん",
      "けん"
    ],
    "kunyomi": [
      "かわ・く",
      "かわ・かす",
      "ほ・す"
    ],
    "meaning": "làm khô",
    "words": [
      {
        "word": "乾燥",
        "reading": "かんそう",
        "meaning": "Khô khan",
        "pos": "verb",
        "readingType": "on"
      },
      {
        "word": "乾く",
        "reading": "かわく",
        "meaning": "Khô ráo",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "乾かす",
        "reading": "かわかす",
        "meaning": "Làm khô, sấy khô",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "乾す",
        "reading": "ほす",
        "meaning": "Phơi khô, làm ráo",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "乾",
        "reading": "かん",
        "meaning": "Chữ 乾 (Can): làm khô",
        "pos": "noun",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_6",
    "stt": 6,
    "hang": 1,
    "kanji": "乱",
    "hanViet": "Loạn",
    "onyomi": [
      "らん",
      "ろん"
    ],
    "kunyomi": [
      "みだ・れる",
      "みだ・す"
    ],
    "meaning": "rối loạn",
    "words": [
      {
        "word": "混乱",
        "reading": "こんらん",
        "meaning": "Hỗn loạn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "乱暴",
        "reading": "らんぼう",
        "meaning": "Bạo lực, thô bạo",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "乱れる",
        "reading": "みだれる",
        "meaning": "Bị rối loạn, xáo trộn",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "乱す",
        "reading": "みだす",
        "meaning": "Làm rối loạn, phá vỡ",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_7",
    "stt": 7,
    "hang": 1,
    "kanji": "了",
    "hanViet": "Liễu",
    "onyomi": [
      "りょう"
    ],
    "kunyomi": [],
    "meaning": "hoàn tất, hiểu",
    "words": [
      {
        "word": "了解",
        "reading": "りょうかい",
        "meaning": "Hiểu rõ, đồng ý",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "完了",
        "reading": "かんりょう",
        "meaning": "Hoàn tất",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "了解する",
        "reading": "りょうかいする",
        "meaning": "Làm hiểu rõ, đồng ý",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_8",
    "stt": 8,
    "hang": 1,
    "kanji": "争",
    "hanViet": "Tranh",
    "onyomi": [
      "そう"
    ],
    "kunyomi": [
      "あらそ・う"
    ],
    "meaning": "giành nhau",
    "words": [
      {
        "word": "戦争",
        "reading": "せんそう",
        "meaning": "Chiến tranh",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "争う",
        "reading": "あらそう",
        "meaning": "Tranh giành",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_9",
    "stt": 9,
    "hang": 1,
    "kanji": "互",
    "hanViet": "Hỗ",
    "onyomi": [
      "ご"
    ],
    "kunyomi": [
      "たが・い",
      "かたみ・に"
    ],
    "meaning": "giúp lẫn nhau",
    "words": [
      {
        "word": "相互",
        "reading": "そうご",
        "meaning": "Tương hỗ, qua lại",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "お互いに",
        "reading": "おたがいに",
        "meaning": "Lẫn nhau",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "互い",
        "reading": "たがい",
        "meaning": "Động từ của chữ 互 (Hỗ)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "互に",
        "reading": "かたみに",
        "meaning": "Động từ của chữ 互 (Hỗ)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_10",
    "stt": 10,
    "hang": 1,
    "kanji": "仏",
    "hanViet": "Phật",
    "onyomi": [
      "ぶつ",
      "ふつ"
    ],
    "kunyomi": [
      "ほとけ"
    ],
    "meaning": "Phật giáo",
    "words": [
      {
        "word": "仏教",
        "reading": "ぶっきょう",
        "meaning": "Phật giáo",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "仏",
        "reading": "ほとけ",
        "meaning": "Đức Phật",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "仏教する",
        "reading": "ぶっきょうする",
        "meaning": "Làm phật giáo",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_11",
    "stt": 11,
    "hang": 2,
    "kanji": "任",
    "hanViet": "Nhiệm",
    "onyomi": [
      "にん"
    ],
    "kunyomi": [
      "まか・せる",
      "まか・す"
    ],
    "meaning": "nhiệm vụ",
    "words": [
      {
        "word": "責任",
        "reading": "せきにん",
        "meaning": "Trách nhiệm",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "任せる",
        "reading": "まかせる",
        "meaning": "Giao phó",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "任す",
        "reading": "まかす",
        "meaning": "Đánh bại, vượt qua",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_12",
    "stt": 12,
    "hang": 2,
    "kanji": "仰",
    "hanViet": "Ngưỡng",
    "onyomi": [
      "ぎょう",
      "こう"
    ],
    "kunyomi": [
      "あお・ぐ",
      "おお・せ"
    ],
    "meaning": "tín ngưỡng",
    "words": [
      {
        "word": "信仰",
        "reading": "しんこう",
        "meaning": "Tín ngưỡng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "仰ぐ",
        "reading": "あおぐ",
        "meaning": "Ngước nhìn, tôn kính",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "仰せ",
        "reading": "おおせ",
        "meaning": "Động từ của chữ 仰 (Ngưỡng)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_13",
    "stt": 13,
    "hang": 2,
    "kanji": "伐",
    "hanViet": "Phạt",
    "onyomi": [
      "ばつ"
    ],
    "kunyomi": [
      "う・つ"
    ],
    "meaning": "đánh, chinh phạt",
    "words": [
      {
        "word": "伐採",
        "reading": "ばっさい",
        "meaning": "Chặt cây, đốn rừng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "伐つ",
        "reading": "うつ",
        "meaning": "Đánh, chặt, chinh phạt",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_14",
    "stt": 14,
    "hang": 2,
    "kanji": "余",
    "hanViet": "Dư",
    "onyomi": [
      "よ"
    ],
    "kunyomi": [
      "あま・る",
      "あま・す"
    ],
    "meaning": "dư thừa",
    "words": [
      {
        "word": "余分",
        "reading": "よぶん",
        "meaning": "Phần dư thừa",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "余る",
        "reading": "あまる",
        "meaning": "Dư thừa",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "余す",
        "reading": "あます",
        "meaning": "Để thừa lại",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_15",
    "stt": 15,
    "hang": 2,
    "kanji": "伸",
    "hanViet": "Thân",
    "onyomi": [
      "しん"
    ],
    "kunyomi": [
      "の・びる",
      "の・ばす"
    ],
    "meaning": "duỗi ra",
    "words": [
      {
        "word": "伸縮",
        "reading": "しんしゅく",
        "meaning": "Co giãn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "伸びる",
        "reading": "のびる",
        "meaning": "Kéo dài, phát triển",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "伸ばす",
        "reading": "のばす",
        "meaning": "Kéo dài ra, làm thẳng ra",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_16",
    "stt": 16,
    "hang": 2,
    "kanji": "伴",
    "hanViet": "Bạn",
    "onyomi": [
      "はん",
      "ばん"
    ],
    "kunyomi": [
      "ともな・う"
    ],
    "meaning": "đi cùng",
    "words": [
      {
        "word": "同伴",
        "reading": "どうはん",
        "meaning": "Cùng đi",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "伴う",
        "reading": "ともなう",
        "meaning": "Đi kèm theo",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_17",
    "stt": 17,
    "hang": 2,
    "kanji": "依",
    "hanViet": "Y, Ỷ",
    "onyomi": [
      "い",
      "え"
    ],
    "kunyomi": [
      "よ・る"
    ],
    "meaning": "dựa vào",
    "words": [
      {
        "word": "依頼",
        "reading": "いらい",
        "meaning": "Nhờ vả, yêu cầu",
        "pos": "verb",
        "readingType": "on"
      },
      {
        "word": "依然",
        "reading": "いぜん",
        "meaning": "Như cũ, vẫn vậy",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "依る",
        "reading": "よる",
        "meaning": "Dựa vào, phụ thuộc vào",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_18",
    "stt": 18,
    "hang": 2,
    "kanji": "保",
    "hanViet": "Bảo",
    "onyomi": [
      "ほ",
      "ほう"
    ],
    "kunyomi": [
      "たも・つ"
    ],
    "meaning": "bảo đảm",
    "words": [
      {
        "word": "保存",
        "reading": "ほぞん",
        "meaning": "Bảo tồn, lưu trữ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "保つ",
        "reading": "たもつ",
        "meaning": "Giữ gìn, duy trì",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_19",
    "stt": 19,
    "hang": 2,
    "kanji": "倍",
    "hanViet": "Bội",
    "onyomi": [
      "ばい"
    ],
    "kunyomi": [],
    "meaning": "gấp mấy lần",
    "words": [
      {
        "word": "二倍",
        "reading": "にばい",
        "meaning": "Gấp đôi",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "倍増",
        "reading": "ばいぞう",
        "meaning": "Tăng gấp bội",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "二倍する",
        "reading": "にばいする",
        "meaning": "Làm gấp đôi",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_20",
    "stt": 20,
    "hang": 2,
    "kanji": "倉",
    "hanViet": "Thương",
    "onyomi": [
      "そう"
    ],
    "kunyomi": [
      "くら"
    ],
    "meaning": "kho hàng",
    "words": [
      {
        "word": "倉庫",
        "reading": "そうこ",
        "meaning": "Nhà kho",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "倉庫する",
        "reading": "そうこする",
        "meaning": "Làm nhà kho",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_21",
    "stt": 21,
    "hang": 3,
    "kanji": "個",
    "hanViet": "Cá",
    "onyomi": [
      "こ",
      "か"
    ],
    "kunyomi": [],
    "meaning": "cá nhân",
    "words": [
      {
        "word": "個人",
        "reading": "こじん",
        "meaning": "Cá nhân",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "個性的",
        "reading": "こせいてき",
        "meaning": "Có cá tính",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "個人する",
        "reading": "こじんする",
        "meaning": "Làm cá nhân",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_22",
    "stt": 22,
    "hang": 3,
    "kanji": "修",
    "hanViet": "Tu",
    "onyomi": [
      "しゅう",
      "しゅ"
    ],
    "kunyomi": [
      "おさ・める",
      "おさ・まる"
    ],
    "meaning": "sửa chữa",
    "words": [
      {
        "word": "修理",
        "reading": "しゅうり",
        "meaning": "Sửa chữa",
        "pos": "verb",
        "readingType": "on"
      },
      {
        "word": "研修",
        "reading": "けんしゅう",
        "meaning": "Tu nghiệp, thực tập",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "修める",
        "reading": "おさめる",
        "meaning": "Thu nhận, sửa chữa, cai trị, trau dồi",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "修まる",
        "reading": "おさまる",
        "meaning": "Lắng xuống, dịu đi, thu gọn",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_23",
    "stt": 23,
    "hang": 3,
    "kanji": "俳",
    "hanViet": "Bài",
    "onyomi": [
      "はい"
    ],
    "kunyomi": [],
    "meaning": "nghệ sỹ",
    "words": [
      {
        "word": "俳優",
        "reading": "はいゆう",
        "meaning": "Diễn viên",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "俳句",
        "reading": "はいく",
        "meaning": "Thơ Haiku",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "俳優する",
        "reading": "はいゆうする",
        "meaning": "Làm diễn viên",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_24",
    "stt": 24,
    "hang": 3,
    "kanji": "偶",
    "hanViet": "Ngẫu",
    "onyomi": [
      "ぐう"
    ],
    "kunyomi": [
      "たま"
    ],
    "meaning": "ngẫu nhiên",
    "words": [
      {
        "word": "偶然",
        "reading": "ぐうぜん",
        "meaning": "Ngẫu nhiên",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "偶数",
        "reading": "ぐうすう",
        "meaning": "Số chẵn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "偶然する",
        "reading": "ぐうぜんする",
        "meaning": "Làm ngẫu nhiên",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_25",
    "stt": 25,
    "hang": 3,
    "kanji": "偉",
    "hanViet": "Vĩ",
    "onyomi": [
      "い"
    ],
    "kunyomi": [
      "えら・い"
    ],
    "meaning": "vĩ đại",
    "words": [
      {
        "word": "偉大",
        "reading": "いだい",
        "meaning": "Vĩ đại",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "偉い",
        "reading": "えらい",
        "meaning": "Tài giỏi, vĩ đại",
        "pos": "adj",
        "readingType": "kun"
      },
      {
        "word": "偉大する",
        "reading": "いだいする",
        "meaning": "Làm vĩ đại",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_26",
    "stt": 26,
    "hang": 3,
    "kanji": "傘",
    "hanViet": "Tản",
    "onyomi": [
      "さん"
    ],
    "kunyomi": [
      "かさ"
    ],
    "meaning": "ô, dù",
    "words": [
      {
        "word": "雨傘",
        "reading": "あまがさ",
        "meaning": "Dù che mưa",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "傘",
        "reading": "かさ",
        "meaning": "Cây dù",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "雨傘する",
        "reading": "あまがさする",
        "meaning": "Làm dù che mưa",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_27",
    "stt": 27,
    "hang": 3,
    "kanji": "傾",
    "hanViet": "Khuynh",
    "onyomi": [
      "けい"
    ],
    "kunyomi": [
      "かたむ・く",
      "かたむ・ける"
    ],
    "meaning": "khuynh hướng",
    "words": [
      {
        "word": "傾向",
        "reading": "けいこう",
        "meaning": "Khuynh hướng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "傾く",
        "reading": "かたむく",
        "meaning": "Nghiêng, dốc",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "傾ける",
        "reading": "かたむける",
        "meaning": "Làm nghiêng, dốc sức vào",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_28",
    "stt": 28,
    "hang": 3,
    "kanji": "像",
    "hanViet": "Tượng",
    "onyomi": [
      "ぞう"
    ],
    "kunyomi": [],
    "meaning": "hình tượng",
    "words": [
      {
        "word": "想像",
        "reading": "そうぞう",
        "meaning": "Tưởng tượng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "映像",
        "reading": "えいぞう",
        "meaning": "Hình ảnh video",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "想像する",
        "reading": "そうぞうする",
        "meaning": "Làm tưởng tượng",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_29",
    "stt": 29,
    "hang": 3,
    "kanji": "僕",
    "hanViet": "Bộc",
    "onyomi": [
      "ぼく"
    ],
    "kunyomi": [
      "しもべ"
    ],
    "meaning": "tôi (nam xưng)",
    "words": [
      {
        "word": "僕",
        "reading": "ぼく",
        "meaning": "Tôi (nam xưng)",
        "pos": "noun",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_30",
    "stt": 30,
    "hang": 3,
    "kanji": "僚",
    "hanViet": "Liêu",
    "onyomi": [
      "りょう"
    ],
    "kunyomi": [],
    "meaning": "bạn, viên chức",
    "words": [
      {
        "word": "同僚",
        "reading": "どうりょう",
        "meaning": "Đồng nghiệp",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "官僚",
        "reading": "かんりょう",
        "meaning": "Quan chức",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "同僚する",
        "reading": "どうりょうする",
        "meaning": "Làm đồng nghiệp",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_31",
    "stt": 31,
    "hang": 4,
    "kanji": "儀",
    "hanViet": "Nghi",
    "onyomi": [
      "ぎ"
    ],
    "kunyomi": [],
    "meaning": "lễ nghi",
    "words": [
      {
        "word": "礼儀",
        "reading": "れいぎ",
        "meaning": "Lễ nghi, phép lịch sự",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "儀式",
        "reading": "ぎしき",
        "meaning": "Nghi thức",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "礼儀する",
        "reading": "れいぎする",
        "meaning": "Làm lễ nghi, phép lịch sự",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_32",
    "stt": 32,
    "hang": 4,
    "kanji": "償",
    "hanViet": "Thường",
    "onyomi": [
      "しょう"
    ],
    "kunyomi": [
      "つぐな・う"
    ],
    "meaning": "bồi thường, đền",
    "words": [
      {
        "word": "賠償",
        "reading": "ばいしょう",
        "meaning": "Bồi thường",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "償う",
        "reading": "つぐなう",
        "meaning": "Đền bù",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_33",
    "stt": 33,
    "hang": 4,
    "kanji": "充",
    "hanViet": "Sung",
    "onyomi": [
      "じゅう"
    ],
    "kunyomi": [
      "あ・てる",
      "み・たす"
    ],
    "meaning": "sung túc, đầy",
    "words": [
      {
        "word": "充実",
        "reading": "じゅうじつ",
        "meaning": "Sung túc, trọn vẹn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "充電",
        "reading": "じゅうでん",
        "meaning": "Sạc pin",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "充てる",
        "reading": "あてる",
        "meaning": "Bố trí, dành cho, hướng vào",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "充たす",
        "reading": "みたす",
        "meaning": "Làm tràn đầy, đáp ứng, thỏa mãn",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_34",
    "stt": 34,
    "hang": 4,
    "kanji": "児",
    "hanViet": "Nhi",
    "onyomi": [
      "じ",
      "に"
    ],
    "kunyomi": [
      "こ"
    ],
    "meaning": "nhi đồng",
    "words": [
      {
        "word": "児童",
        "reading": "じどう",
        "meaning": "Nhi đồng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "幼児",
        "reading": "ようじ",
        "meaning": "Trẻ nhỏ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "児童する",
        "reading": "じどうする",
        "meaning": "Làm nhi đồng",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_35",
    "stt": 35,
    "hang": 4,
    "kanji": "克",
    "hanViet": "Khắc",
    "onyomi": [
      "こく"
    ],
    "kunyomi": [
      "か・つ"
    ],
    "meaning": "khắc phục",
    "words": [
      {
        "word": "克服",
        "reading": "こくふく",
        "meaning": "Khắc phục, vượt qua",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "克つ",
        "reading": "かつ",
        "meaning": "Thắng, vượt qua",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_36",
    "stt": 36,
    "hang": 4,
    "kanji": "共",
    "hanViet": "Cộng",
    "onyomi": [
      "きょう"
    ],
    "kunyomi": [
      "とも",
      "とも・に"
    ],
    "meaning": "công cộng",
    "words": [
      {
        "word": "共同",
        "reading": "きょうどう",
        "meaning": "Cộng đồng, chung",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "共に",
        "reading": "ともに",
        "meaning": "Cùng nhau",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "共同する",
        "reading": "きょうどうする",
        "meaning": "Làm cộng đồng, chung",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_37",
    "stt": 37,
    "hang": 4,
    "kanji": "典",
    "hanViet": "Điển",
    "onyomi": [
      "てん"
    ],
    "kunyomi": [],
    "meaning": "từ điển",
    "words": [
      {
        "word": "辞典",
        "reading": "じてん",
        "meaning": "Từ điển",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "典型",
        "reading": "てんけい",
        "meaning": "Điển hình",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "辞典する",
        "reading": "じてんする",
        "meaning": "Làm từ điển",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_38",
    "stt": 38,
    "hang": 4,
    "kanji": "再",
    "hanViet": "Tái",
    "onyomi": [
      "さい",
      "さ"
    ],
    "kunyomi": [
      "ふたた・び"
    ],
    "meaning": "lại lần nữa",
    "words": [
      {
        "word": "再生",
        "reading": "さいせい",
        "meaning": "Tái sinh, phát lại",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "再び",
        "reading": "ふたたび",
        "meaning": "Lại một lần nữa",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "再生する",
        "reading": "さいせいする",
        "meaning": "Làm tái sinh, phát lại",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_39",
    "stt": 39,
    "hang": 4,
    "kanji": "凍",
    "hanViet": "Đông",
    "onyomi": [
      "とう"
    ],
    "kunyomi": [
      "こお・る",
      "こご・える",
      "い・てる"
    ],
    "meaning": "đông lạnh",
    "words": [
      {
        "word": "冷凍",
        "reading": "れいとう",
        "meaning": "Đông lạnh",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "凍る",
        "reading": "こおる",
        "meaning": "Đóng băng",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "凍える",
        "reading": "こごえる",
        "meaning": "Bị cóng, tê buốt vì lạnh",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "凍てる",
        "reading": "いてる",
        "meaning": "Đông cứng",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_40",
    "stt": 40,
    "hang": 4,
    "kanji": "処",
    "hanViet": "Xử",
    "onyomi": [
      "しょ"
    ],
    "kunyomi": [
      "ところ"
    ],
    "meaning": "xử lý",
    "words": [
      {
        "word": "処理",
        "reading": "しょり",
        "meaning": "Xử lý",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "処分",
        "reading": "しょぶん",
        "meaning": "Xử phạt, vứt bỏ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "処理する",
        "reading": "しょりする",
        "meaning": "Làm xử lý",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_41",
    "stt": 41,
    "hang": 5,
    "kanji": "刑",
    "hanViet": "Hình",
    "onyomi": [
      "けい"
    ],
    "kunyomi": [],
    "meaning": "hình phạt, kết tội",
    "words": [
      {
        "word": "刑事",
        "reading": "けいじ",
        "meaning": "Hình sự",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "刑罰",
        "reading": "けいばつ",
        "meaning": "Hình phạt",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "刑事する",
        "reading": "けいじする",
        "meaning": "Làm hình sự",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_42",
    "stt": 42,
    "hang": 5,
    "kanji": "判",
    "hanViet": "Phán",
    "onyomi": [
      "はん",
      "ばん"
    ],
    "kunyomi": [
      "わか・る"
    ],
    "meaning": "phán xét",
    "words": [
      {
        "word": "判断",
        "reading": "はんだん",
        "meaning": "Phán đoán",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "裁判",
        "reading": "さいばん",
        "meaning": "Xét xử, tòa án",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "判る",
        "reading": "わかる",
        "meaning": "Động từ của chữ 判 (Phán)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_43",
    "stt": 43,
    "hang": 5,
    "kanji": "刷",
    "hanViet": "Loát",
    "onyomi": [
      "さつ"
    ],
    "kunyomi": [
      "す・る",
      "は・く"
    ],
    "meaning": "in ấn",
    "words": [
      {
        "word": "印刷",
        "reading": "いんさつ",
        "meaning": "In ấn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "刷る",
        "reading": "する",
        "meaning": "In",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "刷く",
        "reading": "はく",
        "meaning": "Khạc ra, nôn ra, thổ lộ",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_44",
    "stt": 44,
    "hang": 5,
    "kanji": "券",
    "hanViet": "Khoán",
    "onyomi": [
      "けん"
    ],
    "kunyomi": [],
    "meaning": "vé, khế ước",
    "words": [
      {
        "word": "旅券",
        "reading": "りょけん",
        "meaning": "Hộ chiếu",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "入場券",
        "reading": "にゅうじょうけん",
        "meaning": "Vé vào cửa",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "旅券する",
        "reading": "りょけんする",
        "meaning": "Làm hộ chiếu",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_45",
    "stt": 45,
    "hang": 5,
    "kanji": "制",
    "hanViet": "Chế",
    "onyomi": [
      "せい"
    ],
    "kunyomi": [],
    "meaning": "hạn chế, quy chế",
    "words": [
      {
        "word": "制度",
        "reading": "せいど",
        "meaning": "Chế độ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "制限",
        "reading": "せいげん",
        "meaning": "Hạn chế",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "制度する",
        "reading": "せいどする",
        "meaning": "Làm chế độ",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_46",
    "stt": 46,
    "hang": 5,
    "kanji": "到",
    "hanViet": "Đáo",
    "onyomi": [
      "とう"
    ],
    "kunyomi": [
      "いた・る"
    ],
    "meaning": "đến nơi, chu đáo",
    "words": [
      {
        "word": "到着",
        "reading": "とうちゃく",
        "meaning": "Đến nơi",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "到底",
        "reading": "とうてい",
        "meaning": "Hoàn toàn (không thể)",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "到る",
        "reading": "いたる",
        "meaning": "Động từ của chữ 到 (Đáo)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_47",
    "stt": 47,
    "hang": 5,
    "kanji": "削",
    "hanViet": "Tước",
    "onyomi": [
      "さく"
    ],
    "kunyomi": [
      "けず・る",
      "そ・ぐ"
    ],
    "meaning": "lột bỏ, vót",
    "words": [
      {
        "word": "削減",
        "reading": "さくげん",
        "meaning": "Cắt giảm",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "削る",
        "reading": "けずる",
        "meaning": "Gọt, bào bớt",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "削ぐ",
        "reading": "そぐ",
        "meaning": "Động từ của chữ 削 (Tước)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_48",
    "stt": 48,
    "hang": 5,
    "kanji": "剣",
    "hanViet": "Kiếm",
    "onyomi": [
      "けん"
    ],
    "kunyomi": [
      "つるぎ"
    ],
    "meaning": "cây kiếm",
    "words": [
      {
        "word": "真剣",
        "reading": "しんけん",
        "meaning": "Nghiêm túc",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "剣道",
        "reading": "けんどう",
        "meaning": "Kiếm đạo",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "真剣する",
        "reading": "しんけんする",
        "meaning": "Làm nghiêm túc",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_49",
    "stt": 49,
    "hang": 5,
    "kanji": "剤",
    "hanViet": "Tễ",
    "onyomi": [
      "ざい",
      "すい"
    ],
    "kunyomi": [],
    "meaning": "thuốc tễ",
    "words": [
      {
        "word": "洗剤",
        "reading": "せんざい",
        "meaning": "Chất tẩy rửa, xà phòng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "薬剤",
        "reading": "やくざい",
        "meaning": "Dược phẩm",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "洗剤する",
        "reading": "せんざいする",
        "meaning": "Làm chất tẩy rửa, xà phòng",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_50",
    "stt": 50,
    "hang": 5,
    "kanji": "副",
    "hanViet": "Phó",
    "onyomi": [
      "ふく"
    ],
    "kunyomi": [],
    "meaning": "giúp, phụ",
    "words": [
      {
        "word": "副作用",
        "reading": "ふくさよう",
        "meaning": "Tác dụng phụ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "副社長",
        "reading": "ふくしゃちょう",
        "meaning": "Phó giám đốc",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "副作用する",
        "reading": "ふくさようする",
        "meaning": "Làm tác dụng phụ",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_51",
    "stt": 51,
    "hang": 6,
    "kanji": "劇",
    "hanViet": "Kịch",
    "onyomi": [
      "げき"
    ],
    "kunyomi": [],
    "meaning": "vở kịch",
    "words": [
      {
        "word": "劇場",
        "reading": "げきじょう",
        "meaning": "Nhà hát",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "演劇",
        "reading": "えんげき",
        "meaning": "Vở kịch",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "劇場する",
        "reading": "げきじょうする",
        "meaning": "Làm nhà hát",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_52",
    "stt": 52,
    "hang": 6,
    "kanji": "労",
    "hanViet": "Lao",
    "onyomi": [
      "ろう"
    ],
    "kunyomi": [
      "いたわ・る",
      "ねぎら・う"
    ],
    "meaning": "lao động",
    "words": [
      {
        "word": "労働",
        "reading": "ろうどう",
        "meaning": "Lao động",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "苦労",
        "reading": "くろう",
        "meaning": "Gian nan, vất vả",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "労る",
        "reading": "いたわる",
        "meaning": "Động từ của chữ 労 (Lao)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "労う",
        "reading": "ねぎらう",
        "meaning": "Biết ơn, an ủi, tán dương công lao",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_53",
    "stt": 53,
    "hang": 6,
    "kanji": "励",
    "hanViet": "Lệ",
    "onyomi": [
      "れい"
    ],
    "kunyomi": [
      "はげ・む",
      "はげ・ます"
    ],
    "meaning": "khích lệ",
    "words": [
      {
        "word": "奨励",
        "reading": "しょうれい",
        "meaning": "Khích lệ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "励ます",
        "reading": "はげます",
        "meaning": "Động viên, cổ vũ",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "励む",
        "reading": "はげむ",
        "meaning": "Cố gắng, nỗ lực phấn đấu",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_54",
    "stt": 54,
    "hang": 6,
    "kanji": "効",
    "hanViet": "Hiệu",
    "onyomi": [
      "こう"
    ],
    "kunyomi": [
      "き・く"
    ],
    "meaning": "hiệu quả",
    "words": [
      {
        "word": "効果",
        "reading": "こうか",
        "meaning": "Hiệu quả",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "効く",
        "reading": "きく",
        "meaning": "Có tác dụng",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_55",
    "stt": 55,
    "hang": 6,
    "kanji": "勇",
    "hanViet": "Dũng",
    "onyomi": [
      "ゆう"
    ],
    "kunyomi": [
      "いさ・む"
    ],
    "meaning": "dũng cảm",
    "words": [
      {
        "word": "勇気",
        "reading": "ゆうき",
        "meaning": "Dũng khí",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "勇敢",
        "reading": "ゆうかん",
        "meaning": "Dũng cảm",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "勇む",
        "reading": "いさむ",
        "meaning": "Dũng cảm, phấn chấn",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_56",
    "stt": 56,
    "hang": 6,
    "kanji": "募",
    "hanViet": "Mộ",
    "onyomi": [
      "ぼ"
    ],
    "kunyomi": [
      "つの・る"
    ],
    "meaning": "chiêu mộ",
    "words": [
      {
        "word": "募集",
        "reading": "ぼしゅう",
        "meaning": "Tuyển dụng, chiêu mộ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "募る",
        "reading": "つのる",
        "meaning": "Thu thập, chiêu mộ",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_57",
    "stt": 57,
    "hang": 6,
    "kanji": "勧",
    "hanViet": "Khuyến",
    "onyomi": [
      "かん"
    ],
    "kunyomi": [
      "すす・める"
    ],
    "meaning": "khuyến khích",
    "words": [
      {
        "word": "勧誘",
        "reading": "かんゆう",
        "meaning": "Mời gọi, rủ rê",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "勧める",
        "reading": "すすめる",
        "meaning": "Khuyên bảo",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_58",
    "stt": 58,
    "hang": 6,
    "kanji": "匂",
    "hanViet": "Mùi",
    "onyomi": [],
    "kunyomi": [
      "にお・う",
      "にお・い"
    ],
    "meaning": "mùi",
    "words": [
      {
        "word": "匂い",
        "reading": "におい",
        "meaning": "Mùi hương",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "匂う",
        "reading": "におう",
        "meaning": "Tỏa mùi",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_59",
    "stt": 59,
    "hang": 6,
    "kanji": "卓",
    "hanViet": "Trác",
    "onyomi": [
      "たく"
    ],
    "kunyomi": [],
    "meaning": "cái bàn",
    "words": [
      {
        "word": "卓球",
        "reading": "たっきゅう",
        "meaning": "Bóng bàn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "食卓",
        "reading": "しょくたく",
        "meaning": "Bàn ăn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "卓球する",
        "reading": "たっきゅうする",
        "meaning": "Làm bóng bàn",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_60",
    "stt": 60,
    "hang": 6,
    "kanji": "協",
    "hanViet": "Hiệp",
    "onyomi": [
      "きょう"
    ],
    "kunyomi": [],
    "meaning": "hiệp lực",
    "words": [
      {
        "word": "協力",
        "reading": "きょうりょく",
        "meaning": "Hợp lực, giúp đỡ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "協会",
        "reading": "きょうかい",
        "meaning": "Hiệp hội",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "協力する",
        "reading": "きょうりょくする",
        "meaning": "Làm hợp lực, giúp đỡ",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_61",
    "stt": 61,
    "hang": 7,
    "kanji": "博",
    "hanViet": "Bác",
    "onyomi": [
      "はく",
      "ばく"
    ],
    "kunyomi": [],
    "meaning": "uyên bác",
    "words": [
      {
        "word": "博物館",
        "reading": "はくぶつかん",
        "meaning": "Viện bảo tàng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "博士",
        "reading": "はくし",
        "meaning": "Tiến sĩ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "博物館する",
        "reading": "はくぶつかんする",
        "meaning": "Làm viện bảo tàng",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_62",
    "stt": 62,
    "hang": 7,
    "kanji": "占",
    "hanViet": "Chiếm",
    "onyomi": [
      "せん"
    ],
    "kunyomi": [
      "し・める",
      "うらな・う"
    ],
    "meaning": "chiếm lĩnh, bói",
    "words": [
      {
        "word": "占める",
        "reading": "しめる",
        "meaning": "Chiếm lĩnh",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "占う",
        "reading": "うらなう",
        "meaning": "Bói toán",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "占",
        "reading": "せん",
        "meaning": "Chữ 占 (Chiếm): chiếm lĩnh, bói",
        "pos": "noun",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_63",
    "stt": 63,
    "hang": 7,
    "kanji": "却",
    "hanViet": "Khước",
    "onyomi": [
      "きゃく"
    ],
    "kunyomi": [
      "かえ・って"
    ],
    "meaning": "khước từ",
    "words": [
      {
        "word": "返却",
        "reading": "へんきゃく",
        "meaning": "Trả lại",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "却下",
        "reading": "きゃっか",
        "meaning": "Bác bỏ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "却って",
        "reading": "かえって",
        "meaning": "Động từ của chữ 却 (Khước)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_64",
    "stt": 64,
    "hang": 7,
    "kanji": "巻",
    "hanViet": "Quyển",
    "onyomi": [
      "かん",
      "けん"
    ],
    "kunyomi": [
      "ま・く",
      "まき"
    ],
    "meaning": "cuốn, cuộn",
    "words": [
      {
        "word": "巻き寿司",
        "reading": "まきずし",
        "meaning": "Cơm cuộn",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "巻く",
        "reading": "まく",
        "meaning": "Cuốn, quấn",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_65",
    "stt": 65,
    "hang": 7,
    "kanji": "及",
    "hanViet": "Cập",
    "onyomi": [
      "きゅう"
    ],
    "kunyomi": [
      "およ・ぶ",
      "およ・ぼす"
    ],
    "meaning": "phổ cập",
    "words": [
      {
        "word": "普及",
        "reading": "ふきゅう",
        "meaning": "Phổ cập",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "及ぼす",
        "reading": "およぼす",
        "meaning": "Gây ảnh hưởng",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "及ぶ",
        "reading": "およぶ",
        "meaning": "Đạt đến, lan ra, bằng",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_66",
    "stt": 66,
    "hang": 7,
    "kanji": "収",
    "hanViet": "Thu, thâu",
    "onyomi": [
      "しゅう"
    ],
    "kunyomi": [
      "おさ・める",
      "おさ・まる"
    ],
    "meaning": "thu nhập",
    "words": [
      {
        "word": "収入",
        "reading": "しゅうにゅう",
        "meaning": "Thu nhập",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "収穫",
        "reading": "しゅうかく",
        "meaning": "Thu hoạch",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "収める",
        "reading": "おさめる",
        "meaning": "Thu nhận, sửa chữa, cai trị, trau dồi",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "収まる",
        "reading": "おさまる",
        "meaning": "Lắng xuống, dịu đi, thu gọn",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_67",
    "stt": 67,
    "hang": 7,
    "kanji": "双",
    "hanViet": "Song",
    "onyomi": [
      "そう"
    ],
    "kunyomi": [
      "ふた",
      "たぐい"
    ],
    "meaning": "đôi, cả hai",
    "words": [
      {
        "word": "双子",
        "reading": "ふたご",
        "meaning": "Sinh đôi",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "双方",
        "reading": "そうほう",
        "meaning": "Cả hai phía",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "双方する",
        "reading": "そうほうする",
        "meaning": "Làm cả hai phía",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_68",
    "stt": 68,
    "hang": 7,
    "kanji": "司",
    "hanViet": "Ty, Tư",
    "onyomi": [
      "し"
    ],
    "kunyomi": [
      "つかさど・る"
    ],
    "meaning": "quản trị",
    "words": [
      {
        "word": "司会",
        "reading": "しかい",
        "meaning": "Chủ trì, MC",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "上司",
        "reading": "じょうし",
        "meaning": "Cấp trên",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "司る",
        "reading": "つかさどる",
        "meaning": "Động từ của chữ 司 (Ty, Tư)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_69",
    "stt": 69,
    "hang": 7,
    "kanji": "句",
    "hanViet": "Cú",
    "onyomi": [
      "く"
    ],
    "kunyomi": [],
    "meaning": "câu cú",
    "words": [
      {
        "word": "文句",
        "reading": "もんく",
        "meaning": "Phàn nàn, câu chữ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "俳句",
        "reading": "はいく",
        "meaning": "Thơ Haiku",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "文句する",
        "reading": "もんくする",
        "meaning": "Làm phàn nàn, câu chữ",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_70",
    "stt": 70,
    "hang": 7,
    "kanji": "叱",
    "hanViet": "Sất",
    "onyomi": [
      "しつ"
    ],
    "kunyomi": [
      "しか・る"
    ],
    "meaning": "la mắng",
    "words": [
      {
        "word": "叱る",
        "reading": "しかる",
        "meaning": "La mắng, quở trách",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "叱",
        "reading": "しつ",
        "meaning": "Chữ 叱 (Sất): la mắng",
        "pos": "noun",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_71",
    "stt": 71,
    "hang": 8,
    "kanji": "各",
    "hanViet": "Các",
    "onyomi": [
      "かく"
    ],
    "kunyomi": [
      "おのおの"
    ],
    "meaning": "mỗi, những",
    "words": [
      {
        "word": "各自",
        "reading": "かくじ",
        "meaning": "Mỗi người",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "各国",
        "reading": "かっこく",
        "meaning": "Các nước",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "各自する",
        "reading": "かくじする",
        "meaning": "Làm mỗi người",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_72",
    "stt": 72,
    "hang": 8,
    "kanji": "叫",
    "hanViet": "Khiếu",
    "onyomi": [
      "きょう"
    ],
    "kunyomi": [
      "さけ・ぶ"
    ],
    "meaning": "thét (kêu) lên",
    "words": [
      {
        "word": "叫ぶ",
        "reading": "さけぶ",
        "meaning": "Hét to, kêu gào",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "叫び声",
        "reading": "さけびごえ",
        "meaning": "Tiếng thét",
        "pos": "noun",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_73",
    "stt": 73,
    "hang": 8,
    "kanji": "吐",
    "hanViet": "Thổ",
    "onyomi": [
      "と"
    ],
    "kunyomi": [
      "は・く",
      "つ・く"
    ],
    "meaning": "nôn mửa",
    "words": [
      {
        "word": "吐く",
        "reading": "はく",
        "meaning": "Nôn mửa, thở ra",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "吐き気",
        "reading": "はきけ",
        "meaning": "Buồn nôn",
        "pos": "noun",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_74",
    "stt": 74,
    "hang": 8,
    "kanji": "否",
    "hanViet": "Phủ",
    "onyomi": [
      "ひ"
    ],
    "kunyomi": [
      "いな",
      "いや"
    ],
    "meaning": "phủ định",
    "words": [
      {
        "word": "否定",
        "reading": "ひてい",
        "meaning": "Phủ định",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "安否",
        "reading": "あんぴ",
        "meaning": "Bình an hay không",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "否定する",
        "reading": "ひていする",
        "meaning": "Làm phủ định",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_75",
    "stt": 75,
    "hang": 8,
    "kanji": "含",
    "hanViet": "Hàm",
    "onyomi": [
      "がん"
    ],
    "kunyomi": [
      "ふく・む",
      "ふく・める"
    ],
    "meaning": "bao gồm",
    "words": [
      {
        "word": "含有",
        "reading": "がんゆう",
        "meaning": "Hàm chứa",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "含む",
        "reading": "ふくむ",
        "meaning": "Bao gồm",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "含める",
        "reading": "ふくめる",
        "meaning": "Gồm có, bao gồm cả",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_76",
    "stt": 76,
    "hang": 8,
    "kanji": "呂",
    "hanViet": "Lã, Lữ",
    "onyomi": [
      "ろ",
      "りょ"
    ],
    "kunyomi": [],
    "meaning": "nhà tắm",
    "words": [
      {
        "word": "お風呂",
        "reading": "おふろ",
        "meaning": "Bồn tắm",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "風呂場",
        "reading": "ふろば",
        "meaning": "Phòng tắm",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "お風呂する",
        "reading": "おふろする",
        "meaning": "Làm bồn tắm",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_77",
    "stt": 77,
    "hang": 8,
    "kanji": "吠",
    "hanViet": "Phệ",
    "onyomi": [
      "はい"
    ],
    "kunyomi": [
      "ほ・える"
    ],
    "meaning": "sủa",
    "words": [
      {
        "word": "吠える",
        "reading": "ほえる",
        "meaning": "Sủa, gầm rú",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "吠",
        "reading": "はい",
        "meaning": "Chữ 吠 (Phệ): sủa",
        "pos": "noun",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_78",
    "stt": 78,
    "hang": 8,
    "kanji": "商",
    "hanViet": "Thương",
    "onyomi": [
      "しょう"
    ],
    "kunyomi": [
      "あきな・う"
    ],
    "meaning": "buôn bán",
    "words": [
      {
        "word": "商業",
        "reading": "しょうぎょう",
        "meaning": "Thương nghiệp",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "商品",
        "reading": "しょうひん",
        "meaning": "Sản phẩm",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "商う",
        "reading": "あきなう",
        "meaning": "Kinh doanh, buôn bán",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_79",
    "stt": 79,
    "hang": 8,
    "kanji": "善",
    "hanViet": "Thiện",
    "onyomi": [
      "ぜん"
    ],
    "kunyomi": [
      "よ・い",
      "い・い"
    ],
    "meaning": "tốt, giỏi",
    "words": [
      {
        "word": "改善",
        "reading": "かいぜん",
        "meaning": "Cải thiện",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "善良",
        "reading": "ぜんりょう",
        "meaning": "Lương thiện",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "善い",
        "reading": "よい",
        "meaning": "Động từ của chữ 善 (Thiện)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_80",
    "stt": 80,
    "hang": 8,
    "kanji": "器",
    "hanViet": "Khí",
    "onyomi": [
      "き"
    ],
    "kunyomi": [
      "うつわ"
    ],
    "meaning": "dụng cụ",
    "words": [
      {
        "word": "食器",
        "reading": "しょっき",
        "meaning": "Bát đĩa",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "楽器",
        "reading": "がっき",
        "meaning": "Nhạc cụ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "食器する",
        "reading": "しょっきする",
        "meaning": "Làm bát đĩa",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_81",
    "stt": 81,
    "hang": 9,
    "kanji": "囲",
    "hanViet": "Vi",
    "onyomi": [
      "い"
    ],
    "kunyomi": [
      "かこ・む",
      "かこ・う"
    ],
    "meaning": "vây quanh",
    "words": [
      {
        "word": "周囲",
        "reading": "しゅうい",
        "meaning": "Xung quanh",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "囲む",
        "reading": "かこむ",
        "meaning": "Bao quanh",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "囲う",
        "reading": "かこう",
        "meaning": "Động từ của chữ 囲 (Vi)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_82",
    "stt": 82,
    "hang": 9,
    "kanji": "圧",
    "hanViet": "Áp",
    "onyomi": [
      "あつ",
      "えん"
    ],
    "kunyomi": [
      "お・す",
      "へ・す"
    ],
    "meaning": "ép, đè nén",
    "words": [
      {
        "word": "血圧",
        "reading": "けつあつ",
        "meaning": "Huyết áp",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "圧力",
        "reading": "あつりょく",
        "meaning": "Áp lực",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "圧す",
        "reading": "おす",
        "meaning": "Động từ của chữ 圧 (Áp)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_83",
    "stt": 83,
    "hang": 9,
    "kanji": "坂",
    "hanViet": "Phản",
    "onyomi": [
      "はん"
    ],
    "kunyomi": [
      "さか"
    ],
    "meaning": "đường dốc",
    "words": [
      {
        "word": "坂道",
        "reading": "さかみち",
        "meaning": "Đường dốc",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "上り坂",
        "reading": "のぼりざか",
        "meaning": "Dốc lên",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "上り坂する",
        "reading": "のぼりざかする",
        "meaning": "Làm dốc lên",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_84",
    "stt": 84,
    "hang": 9,
    "kanji": "均",
    "hanViet": "Quân",
    "onyomi": [
      "きん"
    ],
    "kunyomi": [
      "なら・す"
    ],
    "meaning": "bình quân",
    "words": [
      {
        "word": "平均",
        "reading": "へいきん",
        "meaning": "Bình quân, trung bình",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "均等",
        "reading": "きんとう",
        "meaning": "Đồng đều",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "均す",
        "reading": "ならす",
        "meaning": "Động từ của chữ 均 (Quân)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_85",
    "stt": 85,
    "hang": 9,
    "kanji": "坊",
    "hanViet": "Phường",
    "onyomi": [
      "ぼう",
      "ぼっ"
    ],
    "kunyomi": [],
    "meaning": "thầy tu",
    "words": [
      {
        "word": "坊主",
        "reading": "ぼうず",
        "meaning": "Sư thầy, chú tiểu",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "赤ん坊",
        "reading": "あかんぼう",
        "meaning": "Em bé",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "坊主する",
        "reading": "ぼうずする",
        "meaning": "Làm sư thầy, chú tiểu",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_86",
    "stt": 86,
    "hang": 9,
    "kanji": "基",
    "hanViet": "Cơ",
    "onyomi": [
      "き"
    ],
    "kunyomi": [
      "もと",
      "もとい"
    ],
    "meaning": "căn bản",
    "words": [
      {
        "word": "基本",
        "reading": "きほん",
        "meaning": "Cơ bản",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "基づく",
        "reading": "もとづく",
        "meaning": "Dựa vào, căn cứ",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_87",
    "stt": 87,
    "hang": 9,
    "kanji": "域",
    "hanViet": "Vực",
    "onyomi": [
      "いき"
    ],
    "kunyomi": [],
    "meaning": "vùng, miền",
    "words": [
      {
        "word": "地域",
        "reading": "ちいき",
        "meaning": "Khu vực",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "区域",
        "reading": "くいき",
        "meaning": "Khu vực quy hoạch",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "地域する",
        "reading": "ちいきする",
        "meaning": "Làm khu vực",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_88",
    "stt": 88,
    "hang": 9,
    "kanji": "墓",
    "hanViet": "Mộ",
    "onyomi": [
      "ぼ"
    ],
    "kunyomi": [
      "はか"
    ],
    "meaning": "ngôi mộ",
    "words": [
      {
        "word": "墓地",
        "reading": "ぼち",
        "meaning": "Nghĩa trang",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "お墓",
        "reading": "おはか",
        "meaning": "Ngôi mộ",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "墓地する",
        "reading": "ぼちする",
        "meaning": "Làm nghĩa trang",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_89",
    "stt": 89,
    "hang": 9,
    "kanji": "塗",
    "hanViet": "Đồ",
    "onyomi": [
      "と"
    ],
    "kunyomi": [
      "ぬ・る",
      "ぬ・り"
    ],
    "meaning": "sơn phết",
    "words": [
      {
        "word": "塗装",
        "reading": "とそう",
        "meaning": "Sơn phết",
        "pos": "verb",
        "readingType": "on"
      },
      {
        "word": "塗る",
        "reading": "ぬる",
        "meaning": "Quết, bôi, sơn",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "塗り",
        "reading": "ぬり",
        "meaning": "Động từ của chữ 塗 (Đồ)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "塗",
        "reading": "と",
        "meaning": "Chữ 塗 (Đồ): sơn phết",
        "pos": "noun",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_90",
    "stt": 90,
    "hang": 9,
    "kanji": "境",
    "hanViet": "Cảnh",
    "onyomi": [
      "きょう",
      "けい"
    ],
    "kunyomi": [
      "さかい"
    ],
    "meaning": "biên giới",
    "words": [
      {
        "word": "環境",
        "reading": "かんきょう",
        "meaning": "Môi trường",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "国境",
        "reading": "こっきょう",
        "meaning": "Biên giới",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "環境する",
        "reading": "かんきょうする",
        "meaning": "Làm môi trường",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_91",
    "stt": 91,
    "hang": 10,
    "kanji": "塾",
    "hanViet": "Thục",
    "onyomi": [
      "じゅく"
    ],
    "kunyomi": [],
    "meaning": "trường tư",
    "words": [
      {
        "word": "学習塾",
        "reading": "がくしゅうじゅく",
        "meaning": "Lớp học thêm",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "塾",
        "reading": "じゅく",
        "meaning": "Trường lò, lớp phụ đạo",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "学習塾する",
        "reading": "がくしゅうじゅくする",
        "meaning": "Làm lớp học thêm",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_92",
    "stt": 92,
    "hang": 10,
    "kanji": "奇",
    "hanViet": "Kỳ",
    "onyomi": [
      "き"
    ],
    "kunyomi": [
      "く・し"
    ],
    "meaning": "lạ, khác thường",
    "words": [
      {
        "word": "好奇心",
        "reading": "こうきしん",
        "meaning": "Tính tò mò, hiếu kỳ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "奇数",
        "reading": "きすう",
        "meaning": "Số lẻ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "奇し",
        "reading": "くし",
        "meaning": "Động từ của chữ 奇 (Kỳ)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_93",
    "stt": 93,
    "hang": 10,
    "kanji": "奏",
    "hanViet": "Tấu",
    "onyomi": [
      "そう"
    ],
    "kunyomi": [
      "かな・でる"
    ],
    "meaning": "chơi nhạc",
    "words": [
      {
        "word": "演奏",
        "reading": "えんそう",
        "meaning": "Biểu diễn âm nhạc",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "吹奏楽",
        "reading": "すいそうがく",
        "meaning": "Nhạc kèn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "奏でる",
        "reading": "かなでる",
        "meaning": "Tấu nhạc, chơi đàn",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_94",
    "stt": 94,
    "hang": 10,
    "kanji": "契",
    "hanViet": "Khế",
    "onyomi": [
      "けい"
    ],
    "kunyomi": [
      "ちぎ・る"
    ],
    "meaning": "khế ước",
    "words": [
      {
        "word": "契約",
        "reading": "けいやく",
        "meaning": "Hợp đồng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "契機",
        "reading": "けいき",
        "meaning": "Thời cơ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "契る",
        "reading": "ちぎる",
        "meaning": "Giao ước, đính ước",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_95",
    "stt": 95,
    "hang": 10,
    "kanji": "奨",
    "hanViet": "Tưởng",
    "onyomi": [
      "しょう"
    ],
    "kunyomi": [
      "すす・める"
    ],
    "meaning": "khen ngợi",
    "words": [
      {
        "word": "奨学金",
        "reading": "しょうがくきん",
        "meaning": "Học bổng",
        "pos": "verb",
        "readingType": "on"
      },
      {
        "word": "推奨",
        "reading": "すいしょう",
        "meaning": "Khuyên dùng, tán thành",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "奨める",
        "reading": "すすめる",
        "meaning": "Khuyên bảo, tiến cử, động viên",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_96",
    "stt": 96,
    "hang": 10,
    "kanji": "妙",
    "hanViet": "Diệu",
    "onyomi": [
      "みょう",
      "びょう"
    ],
    "kunyomi": [
      "たえ"
    ],
    "meaning": "lạ, khéo, thần kỳ",
    "words": [
      {
        "word": "奇妙",
        "reading": "きみょう",
        "meaning": "Kỳ lạ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "微妙",
        "reading": "びみょう",
        "meaning": "Tinh tế, khó nói",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "奇妙する",
        "reading": "きみょうする",
        "meaning": "Làm kỳ lạ",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_97",
    "stt": 97,
    "hang": 10,
    "kanji": "姿",
    "hanViet": "Tư",
    "onyomi": [
      "し"
    ],
    "kunyomi": [
      "すがた"
    ],
    "meaning": "dáng vẻ",
    "words": [
      {
        "word": "姿勢",
        "reading": "しせい",
        "meaning": "Tư thế, dáng dấp",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "姿",
        "reading": "すがた",
        "meaning": "Bóng dáng",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "姿勢する",
        "reading": "しせいする",
        "meaning": "Làm tư thế, dáng dấp",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_98",
    "stt": 98,
    "hang": 10,
    "kanji": "姫",
    "hanViet": "Cơ",
    "onyomi": [
      "き"
    ],
    "kunyomi": [
      "ひめ"
    ],
    "meaning": "công chúa",
    "words": [
      {
        "word": "姫",
        "reading": "ひめ",
        "meaning": "Công chúa",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "お姫様",
        "reading": "おひめさま",
        "meaning": "Nàng công chúa",
        "pos": "noun",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_99",
    "stt": 99,
    "hang": 10,
    "kanji": "嫌",
    "hanViet": "Hiềm",
    "onyomi": [
      "けん",
      "げん"
    ],
    "kunyomi": [
      "きら・う",
      "いや"
    ],
    "meaning": "ghét",
    "words": [
      {
        "word": "嫌悪",
        "reading": "けんお",
        "meaning": "Căm ghét",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "嫌い",
        "reading": "きらい",
        "meaning": "Ghét",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "嫌う",
        "reading": "きらう",
        "meaning": "Ghét, căm ghét",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_100",
    "stt": 100,
    "hang": 10,
    "kanji": "嬉",
    "hanViet": "Hỉ",
    "onyomi": [
      "き"
    ],
    "kunyomi": [
      "うれ・しい"
    ],
    "meaning": "vui, hạnh phúc",
    "words": [
      {
        "word": "嬉しい",
        "reading": "うれしい",
        "meaning": "Vui mừng, hạnh phúc",
        "pos": "noun",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_101",
    "stt": 101,
    "hang": 11,
    "kanji": "嬢",
    "hanViet": "Nương",
    "onyomi": [
      "じょう"
    ],
    "kunyomi": [],
    "meaning": "con gái, nàng",
    "words": [
      {
        "word": "お嬢さん",
        "reading": "おじょうさん",
        "meaning": "Tiểu thư, con gái người khác",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "お嬢さんする",
        "reading": "おじょうさんする",
        "meaning": "Làm tiểu thư, con gái người khác",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_102",
    "stt": 102,
    "hang": 11,
    "kanji": "宗",
    "hanViet": "Tôn",
    "onyomi": [
      "しゅう",
      "そう"
    ],
    "kunyomi": [
      "むね"
    ],
    "meaning": "tôn giáo",
    "words": [
      {
        "word": "宗教",
        "reading": "しゅうきょう",
        "meaning": "Tôn giáo",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "宗教する",
        "reading": "しゅうきょうする",
        "meaning": "Làm tôn giáo",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_103",
    "stt": 103,
    "hang": 11,
    "kanji": "宮",
    "hanViet": "Cung",
    "onyomi": [
      "きゅう",
      "ぐう",
      "く"
    ],
    "kunyomi": [
      "みや"
    ],
    "meaning": "cung điện, đền",
    "words": [
      {
        "word": "神宮",
        "reading": "じんぐう",
        "meaning": "Đền Thần đạo",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "お宮",
        "reading": "おみや",
        "meaning": "Ngôi đền",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "神宮する",
        "reading": "じんぐうする",
        "meaning": "Làm đền thần đạo",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_104",
    "stt": 104,
    "hang": 11,
    "kanji": "容",
    "hanViet": "Dung",
    "onyomi": [
      "よう"
    ],
    "kunyomi": [
      "い・れる"
    ],
    "meaning": "nội dung",
    "words": [
      {
        "word": "内容",
        "reading": "ないよう",
        "meaning": "Nội dung",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "美容院",
        "reading": "びよういん",
        "meaning": "Thẩm mỹ viện",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "容れる",
        "reading": "いれる",
        "meaning": "Động từ của chữ 容 (Dung)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_105",
    "stt": 105,
    "hang": 11,
    "kanji": "宴",
    "hanViet": "Yến",
    "onyomi": [
      "えん"
    ],
    "kunyomi": [
      "うたげ"
    ],
    "meaning": "yến tiệc",
    "words": [
      {
        "word": "宴会",
        "reading": "えんかい",
        "meaning": "Bữa tiệc",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "披露宴",
        "reading": "ひろうえん",
        "meaning": "Tiệc cưới",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "宴会する",
        "reading": "えんかいする",
        "meaning": "Làm bữa tiệc",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_106",
    "stt": 106,
    "hang": 11,
    "kanji": "密",
    "hanViet": "Mật",
    "onyomi": [
      "みつ"
    ],
    "kunyomi": [
      "ひそ・か"
    ],
    "meaning": "đông đảo, kín",
    "words": [
      {
        "word": "秘密",
        "reading": "ひみつ",
        "meaning": "Bí mật",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "精密",
        "reading": "せいみつ",
        "meaning": "Chính xác, tinh mật",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "密か",
        "reading": "ひそか",
        "meaning": "Động từ của chữ 密 (Mật)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_107",
    "stt": 107,
    "hang": 11,
    "kanji": "寿",
    "hanViet": "Thọ",
    "onyomi": [
      "じゅ",
      "す"
    ],
    "kunyomi": [
      "ことぶき"
    ],
    "meaning": "sống lâu",
    "words": [
      {
        "word": "寿司",
        "reading": "すし",
        "meaning": "Món sushi",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "寿命",
        "reading": "じゅみょう",
        "meaning": "Tuổi thọ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "寿司する",
        "reading": "すしする",
        "meaning": "Làm món sushi",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_108",
    "stt": 108,
    "hang": 11,
    "kanji": "射",
    "hanViet": "Xạ",
    "onyomi": [
      "しゃ"
    ],
    "kunyomi": [
      "い・る",
      "さ・す"
    ],
    "meaning": "bắn",
    "words": [
      {
        "word": "注射",
        "reading": "ちゅうしゃ",
        "meaning": "Tiêm thuốc",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "放射",
        "reading": "ほうしゃ",
        "meaning": "Phóng xạ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "射る",
        "reading": "いる",
        "meaning": "Động từ của chữ 射 (Xạ)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "射す",
        "reading": "さす",
        "meaning": "Động từ của chữ 射 (Xạ)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_109",
    "stt": 109,
    "hang": 11,
    "kanji": "尋",
    "hanViet": "Tầm",
    "onyomi": [
      "じん"
    ],
    "kunyomi": [
      "たず・ねる",
      "ひろ"
    ],
    "meaning": "hỏi thăm",
    "words": [
      {
        "word": "尋ねる",
        "reading": "たずねる",
        "meaning": "Hỏi, thăm hỏi",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "尋問",
        "reading": "じんもん",
        "meaning": "Thẩm vấn",
        "pos": "noun",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_110",
    "stt": 110,
    "hang": 11,
    "kanji": "導",
    "hanViet": "Đạo",
    "onyomi": [
      "どう"
    ],
    "kunyomi": [
      "みちび・く"
    ],
    "meaning": "chỉ đạo",
    "words": [
      {
        "word": "指導",
        "reading": "しどう",
        "meaning": "Chỉ đạo, hướng dẫn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "導入",
        "reading": "どうにゅう",
        "meaning": "Đưa vào áp dụng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "導く",
        "reading": "みちびく",
        "meaning": "Động từ của chữ 導 (Đạo)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_111",
    "stt": 111,
    "hang": 12,
    "kanji": "就",
    "hanViet": "Tựu",
    "onyomi": [
      "しゅう",
      "じゅ"
    ],
    "kunyomi": [
      "つ・く",
      "つ・ける"
    ],
    "meaning": "thành tựu",
    "words": [
      {
        "word": "就職",
        "reading": "しゅうしょく",
        "meaning": "Tìm được việc",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "就任",
        "reading": "しゅうにん",
        "meaning": "Nhậm chức",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "就く",
        "reading": "つく",
        "meaning": "Động từ của chữ 就 (Tựu)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "就ける",
        "reading": "つける",
        "meaning": "Động từ của chữ 就 (Tựu)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_112",
    "stt": 112,
    "hang": 12,
    "kanji": "層",
    "hanViet": "Tằng",
    "onyomi": [
      "そう"
    ],
    "kunyomi": [],
    "meaning": "tầng, bậc",
    "words": [
      {
        "word": "高層",
        "reading": "こうそう",
        "meaning": "Cao tầng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "地層",
        "reading": "ちそう",
        "meaning": "Địa tầng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "高層する",
        "reading": "こうそうする",
        "meaning": "Làm cao tầng",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_113",
    "stt": 113,
    "hang": 12,
    "kanji": "岩",
    "hanViet": "Nham",
    "onyomi": [
      "がん"
    ],
    "kunyomi": [
      "いわ"
    ],
    "meaning": "tảng đá",
    "words": [
      {
        "word": "岩石",
        "reading": "がんせき",
        "meaning": "Đất đá, nham thạch",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "岩",
        "reading": "いわ",
        "meaning": "Tảng đá",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "岩石する",
        "reading": "がんせきする",
        "meaning": "Làm đất đá, nham thạch",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_114",
    "stt": 114,
    "hang": 12,
    "kanji": "崩",
    "hanViet": "Băng",
    "onyomi": [
      "ほう"
    ],
    "kunyomi": [
      "くず・れる",
      "くず・す"
    ],
    "meaning": "sạt lở, sụp đổ",
    "words": [
      {
        "word": "崩壊",
        "reading": "ほうかい",
        "meaning": "Sụp đổ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "崩れる",
        "reading": "くずれる",
        "meaning": "Lở, đổ sụp",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "崩す",
        "reading": "くずす",
        "meaning": "Động từ của chữ 崩 (Băng)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_115",
    "stt": 115,
    "hang": 12,
    "kanji": "巛",
    "hanViet": "Bộ xuyên",
    "onyomi": [
      "せん"
    ],
    "kunyomi": [
      "かわ"
    ],
    "meaning": "",
    "words": [
      {
        "word": "川",
        "reading": "かわ",
        "meaning": "Dòng sông (bộ xuyên)",
        "pos": "noun",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_116",
    "stt": 116,
    "hang": 12,
    "kanji": "州",
    "hanViet": "Châu",
    "onyomi": [
      "しゅう",
      "す"
    ],
    "kunyomi": [
      "す"
    ],
    "meaning": "châu lục",
    "words": [
      {
        "word": "本州",
        "reading": "ほんしゅう",
        "meaning": "Đảo Honshu",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "九州",
        "reading": "きゅうしゅう",
        "meaning": "Vùng Kyushu",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "本州する",
        "reading": "ほんしゅうする",
        "meaning": "Làm đảo honshu",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_117",
    "stt": 117,
    "hang": 12,
    "kanji": "帯",
    "hanViet": "Đới",
    "onyomi": [
      "たい"
    ],
    "kunyomi": [
      "お・びる",
      "おび"
    ],
    "meaning": "dây đai",
    "words": [
      {
        "word": "携帯電話",
        "reading": "けいたいでんわ",
        "meaning": "Điện thoại di động",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "地帯",
        "reading": "ちたい",
        "meaning": "Vùng đai",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "帯びる",
        "reading": "おびる",
        "meaning": "Động từ của chữ 帯 (Đới)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_118",
    "stt": 118,
    "hang": 12,
    "kanji": "幼",
    "hanViet": "Ấu",
    "onyomi": [
      "よう"
    ],
    "kunyomi": [
      "おさな・い"
    ],
    "meaning": "non nớt",
    "words": [
      {
        "word": "幼児",
        "reading": "ようじ",
        "meaning": "Ấu nhi",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "幼稚園",
        "reading": "ようちえん",
        "meaning": "Trường mẫu giáo",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "幼い",
        "reading": "おさない",
        "meaning": "Động từ của chữ 幼 (Ấu)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_119",
    "stt": 119,
    "hang": 12,
    "kanji": "府",
    "hanViet": "Phủ",
    "onyomi": [
      "ふ"
    ],
    "kunyomi": [],
    "meaning": "chính phủ",
    "words": [
      {
        "word": "政府",
        "reading": "せいふ",
        "meaning": "Chính phủ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "京都府",
        "reading": "きょうとふ",
        "meaning": "Phủ Kyoto",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "政府する",
        "reading": "せいふする",
        "meaning": "Làm chính phủ",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_120",
    "stt": 120,
    "hang": 12,
    "kanji": "廊",
    "hanViet": "Lang",
    "onyomi": [
      "ろう"
    ],
    "kunyomi": [],
    "meaning": "hành lang",
    "words": [
      {
        "word": "廊下",
        "reading": "ろうか",
        "meaning": "Hành lang",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "画廊",
        "reading": "がろう",
        "meaning": "Phòng tranh",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "廊下する",
        "reading": "ろうかする",
        "meaning": "Làm hành lang",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_121",
    "stt": 121,
    "hang": 13,
    "kanji": "彙",
    "hanViet": "Vị",
    "onyomi": [
      "い"
    ],
    "kunyomi": [],
    "meaning": "từ vựng",
    "words": [
      {
        "word": "語彙",
        "reading": "ごい",
        "meaning": "Từ vựng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "語彙する",
        "reading": "ごいする",
        "meaning": "Làm từ vựng",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_122",
    "stt": 122,
    "hang": 13,
    "kanji": "影",
    "hanViet": "Ảnh",
    "onyomi": [
      "えい"
    ],
    "kunyomi": [
      "かげ"
    ],
    "meaning": "bóng, hình",
    "words": [
      {
        "word": "影響",
        "reading": "えいきょう",
        "meaning": "Ảnh hưởng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "撮影",
        "reading": "さつえい",
        "meaning": "Chụp ảnh, quay phim",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "影響する",
        "reading": "えいきょうする",
        "meaning": "Làm ảnh hưởng",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_123",
    "stt": 123,
    "hang": 13,
    "kanji": "往",
    "hanViet": "Vãng",
    "onyomi": [
      "おう"
    ],
    "kunyomi": [
      "ゆ・く",
      "い・ぬ"
    ],
    "meaning": "đi qua",
    "words": [
      {
        "word": "往復",
        "reading": "おうふく",
        "meaning": "Khứ hồi",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "往来",
        "reading": "おうらい",
        "meaning": "Đi lại",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "往く",
        "reading": "ゆく",
        "meaning": "Động từ của chữ 往 (Vãng)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "往ぬ",
        "reading": "いぬ",
        "meaning": "Động từ của chữ 往 (Vãng)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_124",
    "stt": 124,
    "hang": 13,
    "kanji": "徒",
    "hanViet": "Đồ",
    "onyomi": [
      "と"
    ],
    "kunyomi": [
      "いたずら",
      "あだ"
    ],
    "meaning": "học trò",
    "words": [
      {
        "word": "生徒",
        "reading": "せいと",
        "meaning": "Học sinh",
        "pos": "verb",
        "readingType": "on"
      },
      {
        "word": "徒歩",
        "reading": "とほ",
        "meaning": "Đi bộ",
        "pos": "noun",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_125",
    "stt": 125,
    "hang": 13,
    "kanji": "従",
    "hanViet": "Tòng",
    "onyomi": [
      "じゅう",
      "しょう"
    ],
    "kunyomi": [
      "したが・う",
      "したが・える"
    ],
    "meaning": "tuân theo",
    "words": [
      {
        "word": "従業員",
        "reading": "じゅうぎょういん",
        "meaning": "Nhân viên",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "従う",
        "reading": "したがう",
        "meaning": "Tuân theo",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "従える",
        "reading": "したがえる",
        "meaning": "Động từ của chữ 従 (Tòng)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_126",
    "stt": 126,
    "hang": 13,
    "kanji": "得",
    "hanViet": "Đắc",
    "onyomi": [
      "とく"
    ],
    "kunyomi": [
      "え・る",
      "う・る"
    ],
    "meaning": "thu được",
    "words": [
      {
        "word": "納得",
        "reading": "なっとく",
        "meaning": "Thấu hiểu, đồng ý",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "得る",
        "reading": "える",
        "meaning": "Đạt được",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_127",
    "stt": 127,
    "hang": 13,
    "kanji": "御",
    "hanViet": "Ngự",
    "onyomi": [
      "ぎょ",
      "ご"
    ],
    "kunyomi": [
      "おん",
      "お・さめる",
      "み"
    ],
    "meaning": "từ kính ngữ",
    "words": [
      {
        "word": "御飯",
        "reading": "ごはん",
        "meaning": "Cơm",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "制御",
        "reading": "せいぎょ",
        "meaning": "Khống chế",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "御さめる",
        "reading": "おさめる",
        "meaning": "Động từ của chữ 御 (Ngự)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_128",
    "stt": 128,
    "hang": 13,
    "kanji": "徴",
    "hanViet": "Trưng",
    "onyomi": [
      "ちょう"
    ],
    "kunyomi": [
      "しるし"
    ],
    "meaning": "đặc trưng",
    "words": [
      {
        "word": "特徴",
        "reading": "とくちょう",
        "meaning": "Đặc trưng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "象徴",
        "reading": "しょうちょう",
        "meaning": "Biểu tượng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "特徴する",
        "reading": "とくちょうする",
        "meaning": "Làm đặc trưng",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_129",
    "stt": 129,
    "hang": 13,
    "kanji": "志",
    "hanViet": "Chí",
    "onyomi": [
      "し"
    ],
    "kunyomi": [
      "こころざ・す",
      "こころざし"
    ],
    "meaning": "ý chí",
    "words": [
      {
        "word": "意志",
        "reading": "いし",
        "meaning": "Ý chí",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "志望",
        "reading": "しぼう",
        "meaning": "Nguyện vọng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "志す",
        "reading": "こころざす",
        "meaning": "Động từ của chữ 志 (Chí)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_130",
    "stt": 130,
    "hang": 13,
    "kanji": "忍",
    "hanViet": "Nhẫn",
    "onyomi": [
      "にん"
    ],
    "kunyomi": [
      "しの・ぶ",
      "しの・ばせる"
    ],
    "meaning": "nhẫn nại",
    "words": [
      {
        "word": "忍者",
        "reading": "にんじゃ",
        "meaning": "Ninja",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "我慢",
        "reading": "がまん",
        "meaning": "Nhẫn nhịn, chịu đựng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "忍ぶ",
        "reading": "しのぶ",
        "meaning": "Động từ của chữ 忍 (Nhẫn)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "忍ばせる",
        "reading": "しのばせる",
        "meaning": "Động từ của chữ 忍 (Nhẫn)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_131",
    "stt": 131,
    "hang": 14,
    "kanji": "怠",
    "hanViet": "Đãi",
    "onyomi": [
      "たい"
    ],
    "kunyomi": [
      "おこた・る",
      "なま・ける"
    ],
    "meaning": "lười biếng",
    "words": [
      {
        "word": "怠慢",
        "reading": "たいまん",
        "meaning": "Cẩu thả, chây lười",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "怠ける",
        "reading": "なまける",
        "meaning": "Lười biếng",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "怠る",
        "reading": "おこたる",
        "meaning": "Động từ của chữ 怠 (Đãi)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_132",
    "stt": 132,
    "hang": 14,
    "kanji": "恐",
    "hanViet": "Khủng",
    "onyomi": [
      "きょう"
    ],
    "kunyomi": [
      "おそ・れる",
      "おそ・ろしい"
    ],
    "meaning": "sợ hãi",
    "words": [
      {
        "word": "恐怖",
        "reading": "きょうふ",
        "meaning": "Khủng khiếp, sợ hãi",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "恐ろしい",
        "reading": "おそろしい",
        "meaning": "Đáng sợ",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "恐れる",
        "reading": "おそれる",
        "meaning": "Động từ của chữ 恐 (Khủng)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_133",
    "stt": 133,
    "hang": 14,
    "kanji": "患",
    "hanViet": "Hoạn",
    "onyomi": [
      "かん"
    ],
    "kunyomi": [
      "わずら・う"
    ],
    "meaning": "bị bệnh",
    "words": [
      {
        "word": "患者",
        "reading": "かんじゃ",
        "meaning": "Bệnh nhân",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "急患",
        "reading": "きゅうかん",
        "meaning": "Cấp cứu",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "患う",
        "reading": "わずらう",
        "meaning": "Động từ của chữ 患 (Hoạn)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_134",
    "stt": 134,
    "hang": 14,
    "kanji": "惑",
    "hanViet": "Hoặc",
    "onyomi": [
      "わく"
    ],
    "kunyomi": [
      "まど・う"
    ],
    "meaning": "đi lạc, say mê",
    "words": [
      {
        "word": "迷惑",
        "reading": "めいわく",
        "meaning": "Phiền toái",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "戸惑う",
        "reading": "とまどう",
        "meaning": "Bối rối",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "惑う",
        "reading": "まどう",
        "meaning": "Động từ của chữ 惑 (Hoặc)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_135",
    "stt": 135,
    "hang": 14,
    "kanji": "態",
    "hanViet": "Thái",
    "onyomi": [
      "たい"
    ],
    "kunyomi": [
      "わざ・と"
    ],
    "meaning": "thái độ",
    "words": [
      {
        "word": "状態",
        "reading": "じょうたい",
        "meaning": "Trạng thái",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "態度",
        "reading": "たいど",
        "meaning": "Thái độ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "態と",
        "reading": "わざと",
        "meaning": "Động từ của chữ 態 (Thái)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_136",
    "stt": 136,
    "hang": 14,
    "kanji": "慕",
    "hanViet": "Mộ",
    "onyomi": [
      "ぼ"
    ],
    "kunyomi": [
      "した・う"
    ],
    "meaning": "ái mộ",
    "words": [
      {
        "word": "敬慕",
        "reading": "けいぼ",
        "meaning": "Kính yêu",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "慕う",
        "reading": "したう",
        "meaning": "Ngưỡng mộ, yêu quý",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_137",
    "stt": 137,
    "hang": 14,
    "kanji": "慮",
    "hanViet": "Lự",
    "onyomi": [
      "りょ"
    ],
    "kunyomi": [
      "おもんぱか・る"
    ],
    "meaning": "nghĩ ngợi, lo",
    "words": [
      {
        "word": "考慮",
        "reading": "こうりょ",
        "meaning": "Xem xét, cân nhắc",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "遠慮",
        "reading": "えんりょ",
        "meaning": "Khách khí, ngại ngần",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "慮る",
        "reading": "おもんぱかる",
        "meaning": "Động từ của chữ 慮 (Lự)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_138",
    "stt": 138,
    "hang": 14,
    "kanji": "憩",
    "hanViet": "Khế",
    "onyomi": [
      "けい"
    ],
    "kunyomi": [
      "いこ・い",
      "いこ・う"
    ],
    "meaning": "nghỉ ngơi",
    "words": [
      {
        "word": "休憩",
        "reading": "きゅうけい",
        "meaning": "Nghỉ giải lao",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "憩い",
        "reading": "いこい",
        "meaning": "Sự nghỉ ngơi",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "憩う",
        "reading": "いこう",
        "meaning": "Động từ của chữ 憩 (Khế)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_139",
    "stt": 139,
    "hang": 14,
    "kanji": "快",
    "hanViet": "Khoái",
    "onyomi": [
      "かい"
    ],
    "kunyomi": [
      "こころよ・い"
    ],
    "meaning": "thoải mái",
    "words": [
      {
        "word": "快適",
        "reading": "かいてき",
        "meaning": "Sảng khoái, tiện nghi",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "快晴",
        "reading": "かいせい",
        "meaning": "Trời trong xanh",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "快い",
        "reading": "こころよい",
        "meaning": "Động từ của chữ 快 (Khoái)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_140",
    "stt": 140,
    "hang": 14,
    "kanji": "怪",
    "hanViet": "Quái",
    "onyomi": [
      "かい",
      "け"
    ],
    "kunyomi": [
      "あや・しい",
      "あや・しむ"
    ],
    "meaning": "nghi ngờ",
    "words": [
      {
        "word": "怪我",
        "reading": "けが",
        "meaning": "Vết thương",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "怪しい",
        "reading": "あやしい",
        "meaning": "Đáng ngờ, kỳ quái",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "怪しむ",
        "reading": "あやしむ",
        "meaning": "Động từ của chữ 怪 (Quái)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_141",
    "stt": 141,
    "hang": 15,
    "kanji": "悔",
    "hanViet": "Hối",
    "onyomi": [
      "かい"
    ],
    "kunyomi": [
      "く・いる",
      "く・やむ",
      "くや・しい"
    ],
    "meaning": "tiếc, hối hận",
    "words": [
      {
        "word": "後悔",
        "reading": "こうかい",
        "meaning": "Hối hận",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "悔しい",
        "reading": "くやしい",
        "meaning": "Tiếc nuối, cay cú",
        "pos": "adj",
        "readingType": "kun"
      },
      {
        "word": "悔いる",
        "reading": "くいる",
        "meaning": "Động từ của chữ 悔 (Hối)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "悔やむ",
        "reading": "くやむ",
        "meaning": "Động từ của chữ 悔 (Hối)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_142",
    "stt": 142,
    "hang": 15,
    "kanji": "悩",
    "hanViet": "Não",
    "onyomi": [
      "のう"
    ],
    "kunyomi": [
      "なや・む",
      "なや・ます"
    ],
    "meaning": "phiền muộn",
    "words": [
      {
        "word": "苦悩",
        "reading": "くのう",
        "meaning": "Khổ não",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "悩む",
        "reading": "なやむ",
        "meaning": "Lo lắng, trăn trở",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "悩ます",
        "reading": "なやます",
        "meaning": "Động từ của chữ 悩 (Não)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_143",
    "stt": 143,
    "hang": 15,
    "kanji": "惜",
    "hanViet": "Tích",
    "onyomi": [
      "せき"
    ],
    "kunyomi": [
      "お・しい",
      "お・しむ"
    ],
    "meaning": "tiếc nuối",
    "words": [
      {
        "word": "惜しい",
        "reading": "おしい",
        "meaning": "Tiếc nuối, uổng công",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "惜しむ",
        "reading": "おしむ",
        "meaning": "Động từ của chữ 惜 (Tích)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_144",
    "stt": 144,
    "hang": 15,
    "kanji": "慌",
    "hanViet": "Hoảng",
    "onyomi": [
      "こう"
    ],
    "kunyomi": [
      "あわ・てる",
      "あわ・ただしい"
    ],
    "meaning": "vội vàng",
    "words": [
      {
        "word": "慌てる",
        "reading": "あわてる",
        "meaning": "Cuống cuồng, hốt hoảng",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "慌ただしい",
        "reading": "あわただしい",
        "meaning": "Động từ của chữ 慌 (Hoảng)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "慌",
        "reading": "こう",
        "meaning": "Chữ 慌 (Hoảng): vội vàng",
        "pos": "noun",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_145",
    "stt": 145,
    "hang": 15,
    "kanji": "愉",
    "hanViet": "Du",
    "onyomi": [
      "ゆ"
    ],
    "kunyomi": [
      "たの・しい"
    ],
    "meaning": "vui vẻ",
    "words": [
      {
        "word": "愉快",
        "reading": "ゆかい",
        "meaning": "Vui vẻ, thú vị",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "愉しい",
        "reading": "たのしい",
        "meaning": "Động từ của chữ 愉 (Du)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_146",
    "stt": 146,
    "hang": 15,
    "kanji": "慎",
    "hanViet": "Thận",
    "onyomi": [
      "しん"
    ],
    "kunyomi": [
      "つつし・む",
      "つつし・み"
    ],
    "meaning": "thận trọng",
    "words": [
      {
        "word": "慎重",
        "reading": "しんちょう",
        "meaning": "Thận trọng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "慎む",
        "reading": "つつしむ",
        "meaning": "Động từ của chữ 慎 (Thận)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "慎み",
        "reading": "つつしみ",
        "meaning": "Động từ của chữ 慎 (Thận)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_147",
    "stt": 147,
    "hang": 15,
    "kanji": "慢",
    "hanViet": "Mạn",
    "onyomi": [
      "まん"
    ],
    "kunyomi": [],
    "meaning": "kiêu hãnh",
    "words": [
      {
        "word": "我慢",
        "reading": "がまん",
        "meaning": "Kiên nhẫn, chịu đựng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "自慢",
        "reading": "じまん",
        "meaning": "Tự mãn, khoe khoang",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "我慢する",
        "reading": "がまんする",
        "meaning": "Làm kiên nhẫn, chịu đựng",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_148",
    "stt": 148,
    "hang": 15,
    "kanji": "憎",
    "hanViet": "Tăng",
    "onyomi": [
      "ぞう"
    ],
    "kunyomi": [
      "にく・む",
      "にく・い",
      "にく・らしい"
    ],
    "meaning": "đáng ghét",
    "words": [
      {
        "word": "憎む",
        "reading": "にくむ",
        "meaning": "Căm ghét",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "憎らしい",
        "reading": "にくらしい",
        "meaning": "Đáng ghét",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "憎い",
        "reading": "にくい",
        "meaning": "Động từ của chữ 憎 (Tăng)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_149",
    "stt": 149,
    "hang": 15,
    "kanji": "憶",
    "hanViet": "Ức",
    "onyomi": [
      "おく"
    ],
    "kunyomi": [],
    "meaning": "ký ức",
    "words": [
      {
        "word": "記憶",
        "reading": "きおく",
        "meaning": "Ký ức",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "追憶",
        "reading": "ついおく",
        "meaning": "Hồi tưởng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "記憶する",
        "reading": "きおくする",
        "meaning": "Làm ký ức",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_150",
    "stt": 150,
    "hang": 15,
    "kanji": "懐",
    "hanViet": "Hoài",
    "onyomi": [
      "かい",
      "え"
    ],
    "kunyomi": [
      "ふところ",
      "なつ・かしい",
      "なつ・く"
    ],
    "meaning": "nhớ mong",
    "words": [
      {
        "word": "懐かしい",
        "reading": "なつかしい",
        "meaning": "Hoài niệm, nhớ nhung",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "懐く",
        "reading": "なつく",
        "meaning": "Động từ của chữ 懐 (Hoài)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_151",
    "stt": 151,
    "hang": 16,
    "kanji": "我",
    "hanViet": "Ngã",
    "onyomi": [
      "が"
    ],
    "kunyomi": [
      "われ",
      "わ"
    ],
    "meaning": "tôi",
    "words": [
      {
        "word": "我々",
        "reading": "われわれ",
        "meaning": "Chúng tôi",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "自我",
        "reading": "じが",
        "meaning": "Cái tôi, bản ngã",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "自我する",
        "reading": "じがする",
        "meaning": "Làm cái tôi, bản ngã",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_152",
    "stt": 152,
    "hang": 16,
    "kanji": "戚",
    "hanViet": "Thích",
    "onyomi": [
      "せき"
    ],
    "kunyomi": [
      "みうち"
    ],
    "meaning": "thân thích",
    "words": [
      {
        "word": "親戚",
        "reading": "しんせき",
        "meaning": "Họ hàng thân thích",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "親戚する",
        "reading": "しんせきする",
        "meaning": "Làm họ hàng thân thích",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_153",
    "stt": 153,
    "hang": 16,
    "kanji": "折",
    "hanViet": "Chiết",
    "onyomi": [
      "せつ"
    ],
    "kunyomi": [
      "お・る",
      "おり",
      "お・れる"
    ],
    "meaning": "bẻ, gấp giấy",
    "words": [
      {
        "word": "骨折",
        "reading": "こっせつ",
        "meaning": "Gãy xương",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "折る",
        "reading": "おる",
        "meaning": "Gập, bẻ",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "折れる",
        "reading": "おれる",
        "meaning": "Động từ của chữ 折 (Chiết)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_154",
    "stt": 154,
    "hang": 16,
    "kanji": "担",
    "hanViet": "Đảm",
    "onyomi": [
      "たん"
    ],
    "kunyomi": [
      "かつ・ぐ",
      "にな・う"
    ],
    "meaning": "đảm đương",
    "words": [
      {
        "word": "担当",
        "reading": "たんとう",
        "meaning": "Đảm trách",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "担ぐ",
        "reading": "かつぐ",
        "meaning": "Vác lên vai",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "担う",
        "reading": "になう",
        "meaning": "Động từ của chữ 担 (Đảm)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_155",
    "stt": 155,
    "hang": 16,
    "kanji": "拝",
    "hanViet": "Bái",
    "onyomi": [
      "はい"
    ],
    "kunyomi": [
      "おが・む"
    ],
    "meaning": "vái lạy",
    "words": [
      {
        "word": "拝見",
        "reading": "はいけん",
        "meaning": "Xem (khiêm nhường)",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "拝む",
        "reading": "おがむ",
        "meaning": "Chắp tay cầu khấn",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_156",
    "stt": 156,
    "hang": 16,
    "kanji": "抱",
    "hanViet": "Bão",
    "onyomi": [
      "ほう"
    ],
    "kunyomi": [
      "だ・く",
      "いだ・く",
      "かか・える"
    ],
    "meaning": "bế, ôm",
    "words": [
      {
        "word": "抱く",
        "reading": "だく",
        "meaning": "Ôm ấp",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "抱える",
        "reading": "かかえる",
        "meaning": "Ôm lấy, gánh vác",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "抱",
        "reading": "ほう",
        "meaning": "Chữ 抱 (Bão): bế, ôm",
        "pos": "noun",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_157",
    "stt": 157,
    "hang": 16,
    "kanji": "振",
    "hanViet": "Chấn",
    "onyomi": [
      "しん"
    ],
    "kunyomi": [
      "ふ・る",
      "ふ・るう",
      "ふ・れる"
    ],
    "meaning": "vẫy, lúc lắc",
    "words": [
      {
        "word": "振動",
        "reading": "しんどう",
        "meaning": "Rung động",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "振る",
        "reading": "ふる",
        "meaning": "Vẫy, lắc, rũ bỏ",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "振るう",
        "reading": "ふるう",
        "meaning": "Động từ của chữ 振 (Chấn)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "振れる",
        "reading": "ふれる",
        "meaning": "Động từ của chữ 振 (Chấn)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_158",
    "stt": 158,
    "hang": 16,
    "kanji": "挫",
    "hanViet": "Tỏa",
    "onyomi": [
      "ざ"
    ],
    "kunyomi": [
      "くじ・く",
      "くじ・ける"
    ],
    "meaning": "đổ vỡ, nản lòng",
    "words": [
      {
        "word": "挫折",
        "reading": "ざせつ",
        "meaning": "Thất bại, nản chí",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "挫く",
        "reading": "くじく",
        "meaning": "Động từ của chữ 挫 (Tỏa)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "挫ける",
        "reading": "くじける",
        "meaning": "Động từ của chữ 挫 (Tỏa)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_159",
    "stt": 159,
    "hang": 16,
    "kanji": "採",
    "hanViet": "Thái",
    "onyomi": [
      "さい"
    ],
    "kunyomi": [
      "と・る"
    ],
    "meaning": "hái, thu thập",
    "words": [
      {
        "word": "採用",
        "reading": "さいよう",
        "meaning": "Tuyển dụng, áp dụng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "採る",
        "reading": "とる",
        "meaning": "Hái, nhặt lấy",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_160",
    "stt": 160,
    "hang": 16,
    "kanji": "接",
    "hanViet": "Tiếp",
    "onyomi": [
      "せつ",
      "しょう"
    ],
    "kunyomi": [
      "つ・ぐ"
    ],
    "meaning": "nối, trực tiếp",
    "words": [
      {
        "word": "面接",
        "reading": "めんせつ",
        "meaning": "Phỏng vấn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "直接",
        "reading": "ちょくせつ",
        "meaning": "Trực tiếp",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "接ぐ",
        "reading": "つぐ",
        "meaning": "Động từ của chữ 接 (Tiếp)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_161",
    "stt": 161,
    "hang": 17,
    "kanji": "描",
    "hanViet": "Miêu",
    "onyomi": [
      "びょう"
    ],
    "kunyomi": [
      "えが・く",
      "か・く"
    ],
    "meaning": "miêu tả, vẽ",
    "words": [
      {
        "word": "描写",
        "reading": "びょうしゃ",
        "meaning": "Miêu tả",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "描く",
        "reading": "えがく",
        "meaning": "Vẽ, phác họa",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_162",
    "stt": 162,
    "hang": 17,
    "kanji": "掛",
    "hanViet": "Quải",
    "onyomi": [
      "かい",
      "けい"
    ],
    "kunyomi": [
      "か・ける",
      "か・かる",
      "かかり"
    ],
    "meaning": "treo, tốn",
    "words": [
      {
        "word": "掛ける",
        "reading": "かける",
        "meaning": "Treo lên, gọi điện",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "心掛け",
        "reading": "こころがけ",
        "meaning": "Ý thức, lưu tâm",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "掛かる",
        "reading": "かかる",
        "meaning": "Động từ của chữ 掛 (Quải)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_163",
    "stt": 163,
    "hang": 17,
    "kanji": "握",
    "hanViet": "Ác",
    "onyomi": [
      "あく"
    ],
    "kunyomi": [
      "にぎ・る"
    ],
    "meaning": "nắm",
    "words": [
      {
        "word": "握手",
        "reading": "あくしゅ",
        "meaning": "Bắt tay",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "握る",
        "reading": "にぎる",
        "meaning": "Nắm lấy",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_164",
    "stt": 164,
    "hang": 17,
    "kanji": "援",
    "hanViet": "Viện",
    "onyomi": [
      "えん"
    ],
    "kunyomi": [],
    "meaning": "viện trợ",
    "words": [
      {
        "word": "応援",
        "reading": "おうえん",
        "meaning": "Cổ vũ, ủng hộ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "援助",
        "reading": "えんじょ",
        "meaning": "Viện trợ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "応援する",
        "reading": "おうえんする",
        "meaning": "Làm cổ vũ, ủng hộ",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_165",
    "stt": 165,
    "hang": 17,
    "kanji": "揚",
    "hanViet": "Dương",
    "onyomi": [
      "よう"
    ],
    "kunyomi": [
      "あ・げる",
      "あ・がる"
    ],
    "meaning": "chiên",
    "words": [
      {
        "word": "掲揚",
        "reading": "けいよう",
        "meaning": "Kéo cờ lên cao",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "揚げる",
        "reading": "あげる",
        "meaning": "Chiên giòn, nâng lên",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "揚がる",
        "reading": "あがる",
        "meaning": "Động từ của chữ 揚 (Dương)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_166",
    "stt": 166,
    "hang": 17,
    "kanji": "揺",
    "hanViet": "Dao",
    "onyomi": [
      "よう"
    ],
    "kunyomi": [
      "ゆ・れる",
      "ゆ・る",
      "ゆ・らぐ"
    ],
    "meaning": "dao động",
    "words": [
      {
        "word": "動揺",
        "reading": "どうよう",
        "meaning": "Dao động",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "揺れる",
        "reading": "ゆれる",
        "meaning": "Rung lắc",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "揺る",
        "reading": "ゆる",
        "meaning": "Động từ của chữ 揺 (Dao)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "揺らぐ",
        "reading": "ゆらぐ",
        "meaning": "Động từ của chữ 揺 (Dao)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_167",
    "stt": 167,
    "hang": 17,
    "kanji": "損",
    "hanViet": "Tổn",
    "onyomi": [
      "そん"
    ],
    "kunyomi": [
      "そこ・なう",
      "そこ・ねる"
    ],
    "meaning": "tổn hại",
    "words": [
      {
        "word": "損害",
        "reading": "そんがい",
        "meaning": "Tổn hại",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "損",
        "reading": "そん",
        "meaning": "Thiệt hại, lỗ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "損なう",
        "reading": "そこなう",
        "meaning": "Động từ của chữ 損 (Tổn)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "損ねる",
        "reading": "そこねる",
        "meaning": "Động từ của chữ 損 (Tổn)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_168",
    "stt": 168,
    "hang": 17,
    "kanji": "携",
    "hanViet": "Huề",
    "onyomi": [
      "けい"
    ],
    "kunyomi": [
      "たずさ・える",
      "たずさ・わる"
    ],
    "meaning": "dìu dắt, mang theo",
    "words": [
      {
        "word": "携帯",
        "reading": "けいたい",
        "meaning": "Cầm tay, di động",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "連携",
        "reading": "れんけい",
        "meaning": "Liên kết phối hợp",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "携える",
        "reading": "たずさえる",
        "meaning": "Động từ của chữ 携 (Huề)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "携わる",
        "reading": "たずさわる",
        "meaning": "Động từ của chữ 携 (Huề)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_169",
    "stt": 169,
    "hang": 17,
    "kanji": "挙",
    "hanViet": "Cử",
    "onyomi": [
      "きょ"
    ],
    "kunyomi": [
      "あ・げる",
      "あ・がる",
      "こぞ・る"
    ],
    "meaning": "cử hành",
    "words": [
      {
        "word": "選挙",
        "reading": "せんきょ",
        "meaning": "Bầu cử",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "手を挙げる",
        "reading": "てをあげる",
        "meaning": "Giơ tay",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "挙げる",
        "reading": "あげる",
        "meaning": "Động từ của chữ 挙 (Cử)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "挙がる",
        "reading": "あがる",
        "meaning": "Động từ của chữ 挙 (Cử)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "挙る",
        "reading": "こぞる",
        "meaning": "Động từ của chữ 挙 (Cử)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_170",
    "stt": 170,
    "hang": 17,
    "kanji": "改",
    "hanViet": "Cải",
    "onyomi": [
      "かい"
    ],
    "kunyomi": [
      "あらた・める",
      "あらた・まる"
    ],
    "meaning": "đổi mới",
    "words": [
      {
        "word": "改革",
        "reading": "かいかく",
        "meaning": "Cải cách",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "改める",
        "reading": "あらためる",
        "meaning": "Sửa đổi",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "改まる",
        "reading": "あらたまる",
        "meaning": "Động từ của chữ 改 (Cải)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_171",
    "stt": 171,
    "hang": 18,
    "kanji": "攻",
    "hanViet": "Công",
    "onyomi": [
      "こう"
    ],
    "kunyomi": [
      "せ・める"
    ],
    "meaning": "tấn công",
    "words": [
      {
        "word": "攻撃",
        "reading": "こうげき",
        "meaning": "Công kích, tấn công",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "専攻",
        "reading": "せんこう",
        "meaning": "Chuyên ngành",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "攻める",
        "reading": "せめる",
        "meaning": "Động từ của chữ 攻 (Công)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_172",
    "stt": 172,
    "hang": 18,
    "kanji": "断",
    "hanViet": "Đoạn",
    "onyomi": [
      "だん"
    ],
    "kunyomi": [
      "た・つ",
      "ことわ・る"
    ],
    "meaning": "từ chối, chặt đứt",
    "words": [
      {
        "word": "断る",
        "reading": "ことわる",
        "meaning": "Từ chối",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "決断",
        "reading": "けつだん",
        "meaning": "Quyết đoán",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "断つ",
        "reading": "たつ",
        "meaning": "Động từ của chữ 断 (Đoạn)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_173",
    "stt": 173,
    "hang": 18,
    "kanji": "旦",
    "hanViet": "Đán",
    "onyomi": [
      "たん",
      "だん"
    ],
    "kunyomi": [
      "あきら",
      "あさ"
    ],
    "meaning": "nguyên đán",
    "words": [
      {
        "word": "元旦",
        "reading": "がんたん",
        "meaning": "Sáng mùng 1 Tết",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "元旦する",
        "reading": "がんたんする",
        "meaning": "Làm sáng mùng 1 tết",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_174",
    "stt": 174,
    "hang": 18,
    "kanji": "旬",
    "hanViet": "Tuần",
    "onyomi": [
      "じゅん",
      "しゅん"
    ],
    "kunyomi": [],
    "meaning": "10 ngày",
    "words": [
      {
        "word": "上旬",
        "reading": "じょうじゅん",
        "meaning": "Thượng tuần (10 ngày đầu)",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "旬",
        "reading": "しゅん",
        "meaning": "Mùa rộ (hoa quả)",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "上旬する",
        "reading": "じょうじゅんする",
        "meaning": "Làm thượng tuần (10 ngày đầu)",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_175",
    "stt": 175,
    "hang": 18,
    "kanji": "昇",
    "hanViet": "Thăng",
    "onyomi": [
      "しょう"
    ],
    "kunyomi": [
      "のぼ・る"
    ],
    "meaning": "thăng tiến",
    "words": [
      {
        "word": "昇進",
        "reading": "しょうしん",
        "meaning": "Thăng tiến",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "昇る",
        "reading": "のぼる",
        "meaning": "Lên cao",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_176",
    "stt": 176,
    "hang": 18,
    "kanji": "暮",
    "hanViet": "Mộ",
    "onyomi": [
      "ぼ"
    ],
    "kunyomi": [
      "く・れる",
      "く・らす"
    ],
    "meaning": "trời tối",
    "words": [
      {
        "word": "一人暮らし",
        "reading": "ひとりぐらし",
        "meaning": "Sống một mình",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "暮れる",
        "reading": "くれる",
        "meaning": "Lặn, về chiều",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "暮らす",
        "reading": "くらす",
        "meaning": "Động từ của chữ 暮 (Mộ)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_177",
    "stt": 177,
    "hang": 18,
    "kanji": "曇",
    "hanViet": "Đàm",
    "onyomi": [
      "どん"
    ],
    "kunyomi": [
      "くも・る"
    ],
    "meaning": "trời âm u",
    "words": [
      {
        "word": "曇り",
        "reading": "くもり",
        "meaning": "Trời nhiều mây",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "曇る",
        "reading": "くもる",
        "meaning": "Nhiều mây",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_178",
    "stt": 178,
    "hang": 18,
    "kanji": "更",
    "hanViet": "Canh",
    "onyomi": [
      "こう"
    ],
    "kunyomi": [
      "さら",
      "ふ・ける",
      "ふ・かす"
    ],
    "meaning": "đổi mới",
    "words": [
      {
        "word": "変更",
        "reading": "へんこう",
        "meaning": "Biến đổi, thay đổi",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "更新",
        "reading": "こうしん",
        "meaning": "Đổi mới, cập nhật",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "更ける",
        "reading": "ふける",
        "meaning": "Động từ của chữ 更 (Canh)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "更かす",
        "reading": "ふかす",
        "meaning": "Động từ của chữ 更 (Canh)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_179",
    "stt": 179,
    "hang": 18,
    "kanji": "札",
    "hanViet": "Trát",
    "onyomi": [
      "さつ"
    ],
    "kunyomi": [
      "ふだ"
    ],
    "meaning": "tiền giấy",
    "words": [
      {
        "word": "改札口",
        "reading": "かいさつぐち",
        "meaning": "Cổng soát vé",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "札",
        "reading": "ふだ",
        "meaning": "Thẻ, nhãn",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "改札口する",
        "reading": "かいさつぐちする",
        "meaning": "Làm cổng soát vé",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_180",
    "stt": 180,
    "hang": 18,
    "kanji": "条",
    "hanViet": "Điều",
    "onyomi": [
      "じょう",
      "ちょう"
    ],
    "kunyomi": [
      "すじ"
    ],
    "meaning": "điều kiện",
    "words": [
      {
        "word": "条件",
        "reading": "じょうけん",
        "meaning": "Điều kiện",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "条約",
        "reading": "じょうやく",
        "meaning": "Hiệp ước",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "条件する",
        "reading": "じょうけんする",
        "meaning": "Làm điều kiện",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_181",
    "stt": 181,
    "hang": 19,
    "kanji": "板",
    "hanViet": "Bảng",
    "onyomi": [
      "はん",
      "ばん"
    ],
    "kunyomi": [
      "いた"
    ],
    "meaning": "mảnh ván",
    "words": [
      {
        "word": "黒板",
        "reading": "こくばん",
        "meaning": "Bảng đen",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "看板",
        "reading": "かんばん",
        "meaning": "Biển quảng cáo",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "黒板する",
        "reading": "こくばんする",
        "meaning": "Làm bảng đen",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_182",
    "stt": 182,
    "hang": 19,
    "kanji": "柱",
    "hanViet": "Trụ",
    "onyomi": [
      "ちゅう"
    ],
    "kunyomi": [
      "はしら"
    ],
    "meaning": "cây cột",
    "words": [
      {
        "word": "電柱",
        "reading": "でんちゅう",
        "meaning": "Cột điện",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "柱",
        "reading": "はしら",
        "meaning": "Cột trụ",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "電柱する",
        "reading": "でんちゅうする",
        "meaning": "Làm cột điện",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_183",
    "stt": 183,
    "hang": 19,
    "kanji": "栄",
    "hanViet": "Vinh",
    "onyomi": [
      "えい",
      "よう"
    ],
    "kunyomi": [
      "さか・える",
      "は・え"
    ],
    "meaning": "phồn vinh",
    "words": [
      {
        "word": "栄養",
        "reading": "えいよう",
        "meaning": "Dinh dưỡng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "栄える",
        "reading": "さかえる",
        "meaning": "Phồn vinh",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "栄え",
        "reading": "はえ",
        "meaning": "Động từ của chữ 栄 (Vinh)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_184",
    "stt": 184,
    "hang": 19,
    "kanji": "査",
    "hanViet": "Tra",
    "onyomi": [
      "さ"
    ],
    "kunyomi": [],
    "meaning": "điều tra",
    "words": [
      {
        "word": "調査",
        "reading": "ちょうさ",
        "meaning": "Điều tra",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "検査",
        "reading": "けんさ",
        "meaning": "Kiểm tra",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "調査する",
        "reading": "ちょうさする",
        "meaning": "Làm điều tra",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_185",
    "stt": 185,
    "hang": 19,
    "kanji": "染",
    "hanViet": "Nhiễm",
    "onyomi": [
      "せん"
    ],
    "kunyomi": [
      "そ・める",
      "そ・まる",
      "し・みる"
    ],
    "meaning": "nhuộm",
    "words": [
      {
        "word": "汚染",
        "reading": "おせん",
        "meaning": "Ô nhiễm",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "感染",
        "reading": "かんせん",
        "meaning": "Nhiễm bệnh",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "染める",
        "reading": "そめる",
        "meaning": "Động từ của chữ 染 (Nhiễm)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "染まる",
        "reading": "そまる",
        "meaning": "Động từ của chữ 染 (Nhiễm)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "染みる",
        "reading": "しみる",
        "meaning": "Động từ của chữ 染 (Nhiễm)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_186",
    "stt": 186,
    "hang": 19,
    "kanji": "枯",
    "hanViet": "Khô",
    "onyomi": [
      "こ"
    ],
    "kunyomi": [
      "か・れる",
      "か・らす"
    ],
    "meaning": "khô, cạn",
    "words": [
      {
        "word": "枯れる",
        "reading": "かれる",
        "meaning": "Khô héo, úa tàn",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "枯らす",
        "reading": "からす",
        "meaning": "Động từ của chữ 枯 (Khô)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "枯",
        "reading": "こ",
        "meaning": "Chữ 枯 (Khô): khô, cạn",
        "pos": "noun",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_187",
    "stt": 187,
    "hang": 19,
    "kanji": "柄",
    "hanViet": "Bính",
    "onyomi": [
      "へい"
    ],
    "kunyomi": [
      "がら",
      "え"
    ],
    "meaning": "kiểu, tính cách",
    "words": [
      {
        "word": "柄",
        "reading": "がら",
        "meaning": "Họa tiết, hoa văn",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "人柄",
        "reading": "ひとがら",
        "meaning": "Tính cách con người",
        "pos": "noun",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_188",
    "stt": 188,
    "hang": 19,
    "kanji": "根",
    "hanViet": "Căn",
    "onyomi": [
      "こん"
    ],
    "kunyomi": [
      "ね"
    ],
    "meaning": "rễ",
    "words": [
      {
        "word": "根本",
        "reading": "こんぽん",
        "meaning": "Căn bản",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "屋根",
        "reading": "やね",
        "meaning": "Mái nhà",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "根本する",
        "reading": "こんぽんする",
        "meaning": "Làm căn bản",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_189",
    "stt": 189,
    "hang": 19,
    "kanji": "株",
    "hanViet": "Chu, Châu",
    "onyomi": [
      "しゅ"
    ],
    "kunyomi": [
      "かぶ"
    ],
    "meaning": "cổ phần, gốc cây",
    "words": [
      {
        "word": "株式",
        "reading": "かぶしき",
        "meaning": "Cổ phiếu",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "株式会社",
        "reading": "かぶしきがいしゃ",
        "meaning": "Công ty cổ phần",
        "pos": "noun",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_190",
    "stt": 190,
    "hang": 19,
    "kanji": "桃",
    "hanViet": "Đào",
    "onyomi": [
      "とう"
    ],
    "kunyomi": [
      "もも"
    ],
    "meaning": "cây đào",
    "words": [
      {
        "word": "桃",
        "reading": "もも",
        "meaning": "Quả đào",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "白桃",
        "reading": "はくとう",
        "meaning": "Quả đào trắng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "白桃する",
        "reading": "はくとうする",
        "meaning": "Làm quả đào trắng",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_191",
    "stt": 191,
    "hang": 20,
    "kanji": "栽",
    "hanViet": "Tài",
    "onyomi": [
      "さい"
    ],
    "kunyomi": [],
    "meaning": "trồng cây",
    "words": [
      {
        "word": "栽培",
        "reading": "さいばい",
        "meaning": "Canh tác, trồng trọt",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "盆栽",
        "reading": "ぼんさい",
        "meaning": "Cây cảnh Bonsai",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "栽培する",
        "reading": "さいばいする",
        "meaning": "Làm canh tác, trồng trọt",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_192",
    "stt": 192,
    "hang": 20,
    "kanji": "検",
    "hanViet": "Kiểm",
    "onyomi": [
      "けん"
    ],
    "kunyomi": [],
    "meaning": "kiểm tra",
    "words": [
      {
        "word": "検討",
        "reading": "けんとう",
        "meaning": "Xem xét, thảo luận",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "点検",
        "reading": "てんけん",
        "meaning": "Kiểm tra bảo dưỡng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "検討する",
        "reading": "けんとうする",
        "meaning": "Làm xem xét, thảo luận",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_193",
    "stt": 193,
    "hang": 20,
    "kanji": "構",
    "hanViet": "Cấu",
    "onyomi": [
      "こう"
    ],
    "kunyomi": [
      "かま・える",
      "かま・う"
    ],
    "meaning": "cấu tạo",
    "words": [
      {
        "word": "構造",
        "reading": "こうぞう",
        "meaning": "Cấu trúc",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "構わない",
        "reading": "かまわない",
        "meaning": "Không sao",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "構える",
        "reading": "かまえる",
        "meaning": "Động từ của chữ 構 (Cấu)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "構う",
        "reading": "かまう",
        "meaning": "Động từ của chữ 構 (Cấu)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_194",
    "stt": 194,
    "hang": 20,
    "kanji": "標",
    "hanViet": "Tiêu",
    "onyomi": [
      "ひょう"
    ],
    "kunyomi": [
      "しるし"
    ],
    "meaning": "mục tiêu",
    "words": [
      {
        "word": "目標",
        "reading": "もくひょう",
        "meaning": "Mục tiêu",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "標準",
        "reading": "ひょうじゅん",
        "meaning": "Tiêu chuẩn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "目標する",
        "reading": "もくひょうする",
        "meaning": "Làm mục tiêu",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_195",
    "stt": 195,
    "hang": 20,
    "kanji": "歴",
    "hanViet": "Lịch",
    "onyomi": [
      "れき"
    ],
    "kunyomi": [],
    "meaning": "lịch sử, lý lịch",
    "words": [
      {
        "word": "歴史",
        "reading": "れきし",
        "meaning": "Lịch sử",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "経歴",
        "reading": "けいれき",
        "meaning": "Lý lịch",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "歴史する",
        "reading": "れきしする",
        "meaning": "Làm lịch sử",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_196",
    "stt": 196,
    "hang": 20,
    "kanji": "殴",
    "hanViet": "Ẩu",
    "onyomi": [
      "おう"
    ],
    "kunyomi": [
      "なぐ・る"
    ],
    "meaning": "đánh nhau",
    "words": [
      {
        "word": "殴る",
        "reading": "なぐる",
        "meaning": "Đấm, đánh",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "殴打",
        "reading": "おうだ",
        "meaning": "Ẩu đả",
        "pos": "noun",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_197",
    "stt": 197,
    "hang": 20,
    "kanji": "殺",
    "hanViet": "Sát",
    "onyomi": [
      "さつ",
      "さい",
      "せつ"
    ],
    "kunyomi": [
      "ころ・す"
    ],
    "meaning": "giết",
    "words": [
      {
        "word": "自殺",
        "reading": "じさつ",
        "meaning": "Tự sát",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "殺す",
        "reading": "ころす",
        "meaning": "Giết chóc",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_198",
    "stt": 198,
    "hang": 20,
    "kanji": "民",
    "hanViet": "Dân",
    "onyomi": [
      "みん"
    ],
    "kunyomi": [
      "たみ"
    ],
    "meaning": "người dân",
    "words": [
      {
        "word": "国民",
        "reading": "こくみん",
        "meaning": "Quốc dân",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "市民",
        "reading": "しみん",
        "meaning": "Công dân",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "国民する",
        "reading": "こくみんする",
        "meaning": "Làm quốc dân",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_199",
    "stt": 199,
    "hang": 20,
    "kanji": "求",
    "hanViet": "Cầu",
    "onyomi": [
      "きゅう",
      "ぐ"
    ],
    "kunyomi": [
      "もと・める"
    ],
    "meaning": "yêu cầu",
    "words": [
      {
        "word": "要求",
        "reading": "ようきゅう",
        "meaning": "Yêu cầu",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "求める",
        "reading": "もとめる",
        "meaning": "Tìm kiếm, mong cầu",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_200",
    "stt": 200,
    "hang": 20,
    "kanji": "沈",
    "hanViet": "Trầm",
    "onyomi": [
      "ちん"
    ],
    "kunyomi": [
      "しず・む",
      "しず・める"
    ],
    "meaning": "chìm, lặn",
    "words": [
      {
        "word": "沈没",
        "reading": "ちんぼつ",
        "meaning": "Chìm đắm, đắm tàu",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "沈む",
        "reading": "しずむ",
        "meaning": "Lặn, chìm",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "沈める",
        "reading": "しずめる",
        "meaning": "Động từ của chữ 沈 (Trầm)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_201",
    "stt": 201,
    "hang": 21,
    "kanji": "派",
    "hanViet": "Phái",
    "onyomi": [
      "はい"
    ],
    "kunyomi": [],
    "meaning": "đảng phái",
    "words": [
      {
        "word": "立派",
        "reading": "りっぱ",
        "meaning": "Tuyệt vời, tráng lệ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "派遣",
        "reading": "はけん",
        "meaning": "Phái cử",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "立派する",
        "reading": "りっぱする",
        "meaning": "Làm tuyệt vời, tráng lệ",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_202",
    "stt": 202,
    "hang": 21,
    "kanji": "深",
    "hanViet": "Thâm",
    "onyomi": [
      "しん"
    ],
    "kunyomi": [
      "ふか・い",
      "ふか・まる"
    ],
    "meaning": "sâu",
    "words": [
      {
        "word": "深刻",
        "reading": "しんこく",
        "meaning": "Nghiêm trọng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "深い",
        "reading": "ふかい",
        "meaning": "Sâu sắc",
        "pos": "adj",
        "readingType": "kun"
      },
      {
        "word": "深まる",
        "reading": "ふかまる",
        "meaning": "Động từ của chữ 深 (Thâm)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_203",
    "stt": 203,
    "hang": 21,
    "kanji": "混",
    "hanViet": "Hỗn",
    "onyomi": [
      "こん"
    ],
    "kunyomi": [
      "ま・じる",
      "ま・ざる",
      "こ・む"
    ],
    "meaning": "trộn lẫn",
    "words": [
      {
        "word": "混乱",
        "reading": "こんらん",
        "meaning": "Hỗn loạn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "混む",
        "reading": "こむ",
        "meaning": "Đông đúc",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "混じる",
        "reading": "まじる",
        "meaning": "Động từ của chữ 混 (Hỗn)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "混ざる",
        "reading": "まざる",
        "meaning": "Động từ của chữ 混 (Hỗn)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_204",
    "stt": 204,
    "hang": 21,
    "kanji": "満",
    "hanViet": "Mãn",
    "onyomi": [
      "まん"
    ],
    "kunyomi": [
      "み・ちる",
      "み・たす"
    ],
    "meaning": "đầy, mãn nguyện",
    "words": [
      {
        "word": "満足",
        "reading": "まんぞく",
        "meaning": "Thỏa mãn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "満員",
        "reading": "まんいん",
        "meaning": "Đông kín người",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "満ちる",
        "reading": "みちる",
        "meaning": "Động từ của chữ 満 (Mãn)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "満たす",
        "reading": "みたす",
        "meaning": "Làm tràn đầy, đáp ứng, thỏa mãn",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_205",
    "stt": 205,
    "hang": 21,
    "kanji": "溶",
    "hanViet": "Dung",
    "onyomi": [
      "よう"
    ],
    "kunyomi": [
      "と・ける",
      "と・かす"
    ],
    "meaning": "tan chảy",
    "words": [
      {
        "word": "溶液",
        "reading": "ようえき",
        "meaning": "Dung dịch",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "溶ける",
        "reading": "とける",
        "meaning": "Tan ra",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "溶かす",
        "reading": "とかす",
        "meaning": "Động từ của chữ 溶 (Dung)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_206",
    "stt": 206,
    "hang": 21,
    "kanji": "漁",
    "hanViet": "Ngư",
    "onyomi": [
      "ぎょ",
      "りょう"
    ],
    "kunyomi": [
      "あさ・る"
    ],
    "meaning": "đánh cá",
    "words": [
      {
        "word": "漁業",
        "reading": "ぎょぎょう",
        "meaning": "Ngư nghiệp",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "漁船",
        "reading": "ぎょせん",
        "meaning": "Tàu đánh cá",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "漁る",
        "reading": "あさる",
        "meaning": "Động từ của chữ 漁 (Ngư)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_207",
    "stt": 207,
    "hang": 21,
    "kanji": "漂",
    "hanViet": "Phiêu",
    "onyomi": [
      "ひょう"
    ],
    "kunyomi": [
      "ただよ・う"
    ],
    "meaning": "phảng phất",
    "words": [
      {
        "word": "漂白",
        "reading": "ひょうはく",
        "meaning": "Tẩy trắng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "漂う",
        "reading": "ただよう",
        "meaning": "Trôi dạt, phảng phất",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_208",
    "stt": 208,
    "hang": 21,
    "kanji": "激",
    "hanViet": "Khích, Kích",
    "onyomi": [
      "げき"
    ],
    "kunyomi": [
      "はげ・しい"
    ],
    "meaning": "dữ dội",
    "words": [
      {
        "word": "感激",
        "reading": "かんげき",
        "meaning": "Cảm kích",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "激しい",
        "reading": "はげしい",
        "meaning": "Kịch liệt, dữ dội",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "感激する",
        "reading": "かんげきする",
        "meaning": "Làm cảm kích",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_209",
    "stt": 209,
    "hang": 21,
    "kanji": "灯",
    "hanViet": "Đăng",
    "onyomi": [
      "とう"
    ],
    "kunyomi": [
      "ひ",
      "ほ",
      "とも・す",
      "ともしび"
    ],
    "meaning": "cái đèn",
    "words": [
      {
        "word": "電灯",
        "reading": "でんとう",
        "meaning": "Bóng đèn điện",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "街灯",
        "reading": "がいとう",
        "meaning": "Đèn đường",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "灯す",
        "reading": "ともす",
        "meaning": "Bật đèn, thắp sáng",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_210",
    "stt": 210,
    "hang": 21,
    "kanji": "炊",
    "hanViet": "Xúy",
    "onyomi": [
      "すい"
    ],
    "kunyomi": [
      "た・く"
    ],
    "meaning": "nấu cơm, đốt lửa",
    "words": [
      {
        "word": "炊飯器",
        "reading": "すいはんき",
        "meaning": "Nồi cơm điện",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "炊く",
        "reading": "たく",
        "meaning": "Nấu cơm",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_211",
    "stt": 211,
    "hang": 22,
    "kanji": "煮",
    "hanViet": "Chử",
    "onyomi": [
      "しゃ"
    ],
    "kunyomi": [
      "に・る",
      "に・える",
      "に・やす"
    ],
    "meaning": "nấu, ninh, hầm",
    "words": [
      {
        "word": "煮物",
        "reading": "にもの",
        "meaning": "Món kho/ninh",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "煮る",
        "reading": "にる",
        "meaning": "Ninh, nấu",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "煮える",
        "reading": "にえる",
        "meaning": "Động từ của chữ 煮 (Chử)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "煮やす",
        "reading": "にやす",
        "meaning": "Động từ của chữ 煮 (Chử)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_212",
    "stt": 212,
    "hang": 22,
    "kanji": "犯",
    "hanViet": "Phạm",
    "onyomi": [
      "はん",
      "ぼん"
    ],
    "kunyomi": [
      "おか・す"
    ],
    "meaning": "phạm tội",
    "words": [
      {
        "word": "犯人",
        "reading": "はんにん",
        "meaning": "Thủ phạm",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "犯罪",
        "reading": "はんざい",
        "meaning": "Tội phạm",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "犯す",
        "reading": "おかす",
        "meaning": "Động từ của chữ 犯 (Phạm)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_213",
    "stt": 213,
    "hang": 22,
    "kanji": "状",
    "hanViet": "Trạng",
    "onyomi": [
      "じょう"
    ],
    "kunyomi": [],
    "meaning": "trạng thái",
    "words": [
      {
        "word": "状況",
        "reading": "じょうきょう",
        "meaning": "Tình trạng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "礼状",
        "reading": "れいじょう",
        "meaning": "Thư cảm ơn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "状況する",
        "reading": "じょうきょうする",
        "meaning": "Làm tình trạng",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_214",
    "stt": 214,
    "hang": 22,
    "kanji": "環",
    "hanViet": "Hoàn",
    "onyomi": [
      "かん"
    ],
    "kunyomi": [
      "わ"
    ],
    "meaning": "vòng quanh",
    "words": [
      {
        "word": "環境",
        "reading": "かんきょう",
        "meaning": "Môi trường",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "循環",
        "reading": "じゅんかん",
        "meaning": "Tuần hoàn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "環境する",
        "reading": "かんきょうする",
        "meaning": "Làm môi trường",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_215",
    "stt": 215,
    "hang": 22,
    "kanji": "畑",
    "hanViet": "Vườn",
    "onyomi": [],
    "kunyomi": [
      "はた",
      "はたけ"
    ],
    "meaning": "rẫy, vườn",
    "words": [
      {
        "word": "畑",
        "reading": "はたけ",
        "meaning": "Cánh đồng, nương rẫy",
        "pos": "noun",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_216",
    "stt": 216,
    "hang": 22,
    "kanji": "畜",
    "hanViet": "Súc",
    "onyomi": [
      "ちく"
    ],
    "kunyomi": [],
    "meaning": "gia súc",
    "words": [
      {
        "word": "畜産",
        "reading": "ちくさん",
        "meaning": "Chăn nuôi",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "家畜",
        "reading": "かちく",
        "meaning": "Gia súc",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "畜産する",
        "reading": "ちくさんする",
        "meaning": "Làm chăn nuôi",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_217",
    "stt": 217,
    "hang": 22,
    "kanji": "疑",
    "hanViet": "Nghi",
    "onyomi": [
      "ぎ"
    ],
    "kunyomi": [
      "うたが・う"
    ],
    "meaning": "nghi ngờ",
    "words": [
      {
        "word": "疑問",
        "reading": "ぎもん",
        "meaning": "Nghi vấn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "疑う",
        "reading": "うたがう",
        "meaning": "Nghi ngờ",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_218",
    "stt": 218,
    "hang": 22,
    "kanji": "症",
    "hanViet": "Chứng",
    "onyomi": [
      "しょう"
    ],
    "kunyomi": [],
    "meaning": "triệu chứng",
    "words": [
      {
        "word": "重症",
        "reading": "じゅうしょう",
        "meaning": "Bệnh nặng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "症状",
        "reading": "しょうじょう",
        "meaning": "Triệu chứng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "重症する",
        "reading": "じゅうしょうする",
        "meaning": "Làm bệnh nặng",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_219",
    "stt": 219,
    "hang": 22,
    "kanji": "療",
    "hanViet": "Liệu",
    "onyomi": [
      "りょう"
    ],
    "kunyomi": [],
    "meaning": "điều trị",
    "words": [
      {
        "word": "治療",
        "reading": "ちりょう",
        "meaning": "Điều trị",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "医療",
        "reading": "いりょう",
        "meaning": "Y tế",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "治療する",
        "reading": "ちりょうする",
        "meaning": "Làm điều trị",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_220",
    "stt": 220,
    "hang": 22,
    "kanji": "皮",
    "hanViet": "Bì",
    "onyomi": [
      "ひ"
    ],
    "kunyomi": [
      "かわ"
    ],
    "meaning": "vỏ, da thú",
    "words": [
      {
        "word": "皮膚",
        "reading": "ひふ",
        "meaning": "Da dẻ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "皮",
        "reading": "かわ",
        "meaning": "Vỏ, da",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "皮膚する",
        "reading": "ひふする",
        "meaning": "Làm da dẻ",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_221",
    "stt": 221,
    "hang": 23,
    "kanji": "盛",
    "hanViet": "Thịnh",
    "onyomi": [
      "せい",
      "じょう"
    ],
    "kunyomi": [
      "も・る",
      "さか・る",
      "さか・ん"
    ],
    "meaning": "phồn thịnh",
    "words": [
      {
        "word": "盛ん",
        "reading": "さかん",
        "meaning": "Thịnh vượng",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "大盛り",
        "reading": "おおもり",
        "meaning": "Bát lớn (cơm)",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "盛る",
        "reading": "もる",
        "meaning": "Động từ của chữ 盛 (Thịnh)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_222",
    "stt": 222,
    "hang": 23,
    "kanji": "盗",
    "hanViet": "Đạo",
    "onyomi": [
      "とう"
    ],
    "kunyomi": [
      "ぬす・む"
    ],
    "meaning": "ăn cắp",
    "words": [
      {
        "word": "強盗",
        "reading": "ごうとう",
        "meaning": "Cướp bóc",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "盗む",
        "reading": "ぬすむ",
        "meaning": "Trộm cắp",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_223",
    "stt": 223,
    "hang": 23,
    "kanji": "省",
    "hanViet": "Tỉnh",
    "onyomi": [
      "せい",
      "しょう"
    ],
    "kunyomi": [
      "かえり・みる",
      "はぶ・く"
    ],
    "meaning": "xem xét",
    "words": [
      {
        "word": "反省",
        "reading": "はんせい",
        "meaning": "Kiểm điểm",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "省略",
        "reading": "しょうりゃく",
        "meaning": "Lược bớt",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "省みる",
        "reading": "かえりみる",
        "meaning": "Động từ của chữ 省 (Tỉnh)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "省く",
        "reading": "はぶく",
        "meaning": "Động từ của chữ 省 (Tỉnh)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_224",
    "stt": 224,
    "hang": 23,
    "kanji": "看",
    "hanViet": "Khán",
    "onyomi": [
      "かん"
    ],
    "kunyomi": [
      "み・る"
    ],
    "meaning": "xem",
    "words": [
      {
        "word": "看護師",
        "reading": "かんごし",
        "meaning": "Y tá",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "看板",
        "reading": "かんばん",
        "meaning": "Bảng hiệu",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "看る",
        "reading": "みる",
        "meaning": "Động từ của chữ 看 (Khán)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_225",
    "stt": 225,
    "hang": 23,
    "kanji": "眺",
    "hanViet": "Thiếu",
    "onyomi": [
      "ちょう"
    ],
    "kunyomi": [
      "なが・める"
    ],
    "meaning": "nhìn xa (ngắm)",
    "words": [
      {
        "word": "眺望",
        "reading": "ちょうぼう",
        "meaning": "Tầm nhìn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "眺める",
        "reading": "ながめる",
        "meaning": "Ngắm nhìn",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_226",
    "stt": 226,
    "hang": 23,
    "kanji": "睡",
    "hanViet": "Thụy",
    "onyomi": [
      "すい"
    ],
    "kunyomi": [
      "ねむ・る"
    ],
    "meaning": "giấc ngủ",
    "words": [
      {
        "word": "睡眠",
        "reading": "すいみん",
        "meaning": "Giấc ngủ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "熟睡",
        "reading": "じゅくすい",
        "meaning": "Ngủ say",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "睡る",
        "reading": "ねむる",
        "meaning": "Động từ của chữ 睡 (Thụy)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_227",
    "stt": 227,
    "hang": 23,
    "kanji": "砂",
    "hanViet": "Sa",
    "onyomi": [
      "さ",
      "しゃ"
    ],
    "kunyomi": [
      "すな"
    ],
    "meaning": "cát",
    "words": [
      {
        "word": "砂糖",
        "reading": "さとう",
        "meaning": "Đường ăn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "砂",
        "reading": "すな",
        "meaning": "Hạt cát",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "砂糖する",
        "reading": "さとうする",
        "meaning": "Làm đường ăn",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_228",
    "stt": 228,
    "hang": 23,
    "kanji": "硬",
    "hanViet": "Ngạnh",
    "onyomi": [
      "こう"
    ],
    "kunyomi": [
      "かた・い"
    ],
    "meaning": "cứng, ương ngạnh",
    "words": [
      {
        "word": "硬貨",
        "reading": "こうか",
        "meaning": "Tiền xu",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "硬い",
        "reading": "かたい",
        "meaning": "Cứng rắn",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "硬貨する",
        "reading": "こうかする",
        "meaning": "Làm tiền xu",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_229",
    "stt": 229,
    "hang": 23,
    "kanji": "磨",
    "hanViet": "Ma",
    "onyomi": [
      "ま"
    ],
    "kunyomi": [
      "みが・く"
    ],
    "meaning": "chà, đánh bóng",
    "words": [
      {
        "word": "研磨",
        "reading": "けんま",
        "meaning": "Mài giũa",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "磨く",
        "reading": "みがく",
        "meaning": "Đánh răng, mài",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_230",
    "stt": 230,
    "hang": 23,
    "kanji": "票",
    "hanViet": "Phiếu",
    "onyomi": [
      "ひょう"
    ],
    "kunyomi": [],
    "meaning": "lá phiếu",
    "words": [
      {
        "word": "投票",
        "reading": "とうひょう",
        "meaning": "Bỏ phiếu",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "伝票",
        "reading": "でんぴょう",
        "meaning": "Hóa đơn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "投票する",
        "reading": "とうひょうする",
        "meaning": "Làm bỏ phiếu",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_231",
    "stt": 231,
    "hang": 24,
    "kanji": "福",
    "hanViet": "Phúc",
    "onyomi": [
      "ふく"
    ],
    "kunyomi": [],
    "meaning": "hạnh phúc",
    "words": [
      {
        "word": "幸福",
        "reading": "こうふく",
        "meaning": "Hạnh phúc",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "福祉",
        "reading": "ふくし",
        "meaning": "Phúc lợi",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "幸福する",
        "reading": "こうふくする",
        "meaning": "Làm hạnh phúc",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_232",
    "stt": 232,
    "hang": 24,
    "kanji": "秀",
    "hanViet": "Tú",
    "onyomi": [
      "しゅう"
    ],
    "kunyomi": [
      "ひい・でる"
    ],
    "meaning": "ưu tú",
    "words": [
      {
        "word": "優秀",
        "reading": "ゆうしゅう",
        "meaning": "Ưu tú, xuất sắc",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "秀でる",
        "reading": "ひいでる",
        "meaning": "Động từ của chữ 秀 (Tú)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_233",
    "stt": 233,
    "hang": 24,
    "kanji": "秒",
    "hanViet": "Miểu",
    "onyomi": [
      "びょう"
    ],
    "kunyomi": [],
    "meaning": "đơn vị đếm giây",
    "words": [
      {
        "word": "秒",
        "reading": "びょう",
        "meaning": "Giây",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "毎秒",
        "reading": "まいびょう",
        "meaning": "Mỗi giây",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "毎秒する",
        "reading": "まいびょうする",
        "meaning": "Làm mỗi giây",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_234",
    "stt": 234,
    "hang": 24,
    "kanji": "秘",
    "hanViet": "Bí",
    "onyomi": [
      "ひ"
    ],
    "kunyomi": [
      "ひ・める"
    ],
    "meaning": "bí mật",
    "words": [
      {
        "word": "秘密",
        "reading": "ひみつ",
        "meaning": "Bí mật",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "神秘",
        "reading": "しんぴ",
        "meaning": "Thần bí",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "秘める",
        "reading": "ひめる",
        "meaning": "Động từ của chữ 秘 (Bí)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_235",
    "stt": 235,
    "hang": 24,
    "kanji": "移",
    "hanViet": "Di",
    "onyomi": [
      "い"
    ],
    "kunyomi": [
      "うつ・る",
      "うつ・す"
    ],
    "meaning": "di dời",
    "words": [
      {
        "word": "移動",
        "reading": "いどう",
        "meaning": "Di chuyển",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "移る",
        "reading": "うつる",
        "meaning": "Chuyển sang",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "移す",
        "reading": "うつす",
        "meaning": "Động từ của chữ 移 (Di)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_236",
    "stt": 236,
    "hang": 24,
    "kanji": "程",
    "hanViet": "Trình",
    "onyomi": [
      "てい"
    ],
    "kunyomi": [
      "ほど"
    ],
    "meaning": "trình độ",
    "words": [
      {
        "word": "程度",
        "reading": "ていど",
        "meaning": "Mức độ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "日程",
        "reading": "にってい",
        "meaning": "Lịch trình",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "程度する",
        "reading": "ていどする",
        "meaning": "Làm mức độ",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_237",
    "stt": 237,
    "hang": 24,
    "kanji": "稚",
    "hanViet": "Trĩ",
    "onyomi": [
      "ち"
    ],
    "kunyomi": [
      "いとけない"
    ],
    "meaning": "ấu trĩ, non nớt",
    "words": [
      {
        "word": "幼稚",
        "reading": "ようち",
        "meaning": "Ấu trĩ, non nớt",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "幼稚園",
        "reading": "ようちえん",
        "meaning": "Trường mầm non",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "幼稚する",
        "reading": "ようちする",
        "meaning": "Làm ấu trĩ, non nớt",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_238",
    "stt": 238,
    "hang": 24,
    "kanji": "稼",
    "hanViet": "Giá",
    "onyomi": [
      "か"
    ],
    "kunyomi": [
      "かせ・ぐ"
    ],
    "meaning": "kiếm sống",
    "words": [
      {
        "word": "稼ぐ",
        "reading": "かせぐ",
        "meaning": "Kiếm tiền",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "稼働",
        "reading": "かどう",
        "meaning": "Hoạt động máy móc",
        "pos": "noun",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_239",
    "stt": 239,
    "hang": 24,
    "kanji": "積",
    "hanViet": "Tích",
    "onyomi": [
      "せき"
    ],
    "kunyomi": [
      "つ・む",
      "つ・もる"
    ],
    "meaning": "chất đống",
    "words": [
      {
        "word": "面積",
        "reading": "めんせき",
        "meaning": "Diện tích",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "積もる",
        "reading": "つもる",
        "meaning": "Chất đống",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "積む",
        "reading": "つむ",
        "meaning": "Động từ của chữ 積 (Tích)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_240",
    "stt": 240,
    "hang": 24,
    "kanji": "穏",
    "hanViet": "Ổn",
    "onyomi": [
      "おん"
    ],
    "kunyomi": [
      "おだ・やか"
    ],
    "meaning": "yên ổn",
    "words": [
      {
        "word": "平穏",
        "reading": "へいおん",
        "meaning": "Bình yên",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "穏やか",
        "reading": "おだやか",
        "meaning": "Ôn hòa, êm đềm",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "平穏する",
        "reading": "へいおんする",
        "meaning": "Làm bình yên",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_241",
    "stt": 241,
    "hang": 25,
    "kanji": "突",
    "hanViet": "Đột",
    "onyomi": [
      "とつ"
    ],
    "kunyomi": [
      "つ・く"
    ],
    "meaning": "đột nhiên",
    "words": [
      {
        "word": "突然",
        "reading": "とつぜん",
        "meaning": "Đột nhiên",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "衝突",
        "reading": "しょうとつ",
        "meaning": "Va chạm",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "突く",
        "reading": "つく",
        "meaning": "Động từ của chữ 突 (Đột)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_242",
    "stt": 242,
    "hang": 25,
    "kanji": "章",
    "hanViet": "Chương",
    "onyomi": [
      "しょう"
    ],
    "kunyomi": [],
    "meaning": "đoạn văn",
    "words": [
      {
        "word": "文章",
        "reading": "ぶんしょう",
        "meaning": "Văn chương, đoạn văn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "第一章",
        "reading": "だいいっしょう",
        "meaning": "Chương 1",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "文章する",
        "reading": "ぶんしょうする",
        "meaning": "Làm văn chương, đoạn văn",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_243",
    "stt": 243,
    "hang": 25,
    "kanji": "童",
    "hanViet": "Đồng",
    "onyomi": [
      "どう"
    ],
    "kunyomi": [
      "わらべ"
    ],
    "meaning": "nhi đồng",
    "words": [
      {
        "word": "童話",
        "reading": "どうわ",
        "meaning": "Truyện cổ tích",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "児童",
        "reading": "じどう",
        "meaning": "Nhi đồng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "童話する",
        "reading": "どうわする",
        "meaning": "Làm truyện cổ tích",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_244",
    "stt": 244,
    "hang": 25,
    "kanji": "端",
    "hanViet": "Đoan",
    "onyomi": [
      "たん"
    ],
    "kunyomi": [
      "はし",
      "は",
      "はた"
    ],
    "meaning": "mép cạnh",
    "words": [
      {
        "word": "先端",
        "reading": "せんたん",
        "meaning": "Mũi nhọn, đi đầu",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "端",
        "reading": "はし",
        "meaning": "Rìa mép",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "先端する",
        "reading": "せんたんする",
        "meaning": "Làm mũi nhọn, đi đầu",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_245",
    "stt": 245,
    "hang": 25,
    "kanji": "競",
    "hanViet": "Cạnh",
    "onyomi": [
      "きょう",
      "けい"
    ],
    "kunyomi": [
      "きそ・う",
      "せ・る"
    ],
    "meaning": "cạnh tranh",
    "words": [
      {
        "word": "競争",
        "reading": "きょうそう",
        "meaning": "Cạnh tranh",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "競馬",
        "reading": "けいば",
        "meaning": "Đua ngựa",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "競う",
        "reading": "きそう",
        "meaning": "Động từ của chữ 競 (Cạnh)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "競る",
        "reading": "せる",
        "meaning": "Động từ của chữ 競 (Cạnh)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_246",
    "stt": 246,
    "hang": 25,
    "kanji": "等",
    "hanViet": "Đẳng",
    "onyomi": [
      "とう"
    ],
    "kunyomi": [
      "ひと・しい"
    ],
    "meaning": "bình đẳng",
    "words": [
      {
        "word": "平等",
        "reading": "びょうどう",
        "meaning": "Bình đẳng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "等しい",
        "reading": "ひとしい",
        "meaning": "Tương đương, bằng",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "平等する",
        "reading": "びょうどうする",
        "meaning": "Làm bình đẳng",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_247",
    "stt": 247,
    "hang": 25,
    "kanji": "範",
    "hanViet": "Phạm",
    "onyomi": [
      "はん"
    ],
    "kunyomi": [],
    "meaning": "phạm vi",
    "words": [
      {
        "word": "範囲",
        "reading": "はんい",
        "meaning": "Phạm vi",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "模範",
        "reading": "もはん",
        "meaning": "Mô phạm, mẫu mực",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "範囲する",
        "reading": "はんいする",
        "meaning": "Làm phạm vi",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_248",
    "stt": 248,
    "hang": 25,
    "kanji": "箸",
    "hanViet": "Trợ",
    "onyomi": [
      "ちょ"
    ],
    "kunyomi": [
      "はし"
    ],
    "meaning": "đũa",
    "words": [
      {
        "word": "お箸",
        "reading": "おはし",
        "meaning": "Đôi đũa",
        "pos": "noun",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_249",
    "stt": 249,
    "hang": 25,
    "kanji": "籍",
    "hanViet": "Tịch",
    "onyomi": [
      "せき"
    ],
    "kunyomi": [],
    "meaning": "quốc tịch",
    "words": [
      {
        "word": "国籍",
        "reading": "こくせき",
        "meaning": "Quốc tịch",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "書籍",
        "reading": "しょせき",
        "meaning": "Sách vở",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "国籍する",
        "reading": "こくせきする",
        "meaning": "Làm quốc tịch",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_250",
    "stt": 250,
    "hang": 25,
    "kanji": "粉",
    "hanViet": "Phấn",
    "onyomi": [
      "ふん"
    ],
    "kunyomi": [
      "こ",
      "こな"
    ],
    "meaning": "bột",
    "words": [
      {
        "word": "花粉",
        "reading": "かふん",
        "meaning": "Phấn hoa",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "小麦粉",
        "reading": "こむぎこ",
        "meaning": "Bột mì",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "花粉する",
        "reading": "かふんする",
        "meaning": "Làm phấn hoa",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_251",
    "stt": 251,
    "hang": 26,
    "kanji": "粋",
    "hanViet": "Túy",
    "onyomi": [
      "すい"
    ],
    "kunyomi": [
      "いき"
    ],
    "meaning": "thuần túy",
    "words": [
      {
        "word": "純粋",
        "reading": "じゅんすい",
        "meaning": "Thuần khiết",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "粋",
        "reading": "いき",
        "meaning": "Tao nhã",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "純粋する",
        "reading": "じゅんすいする",
        "meaning": "Làm thuần khiết",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_252",
    "stt": 252,
    "hang": 26,
    "kanji": "粒",
    "hanViet": "Lạp",
    "onyomi": [
      "りゅう"
    ],
    "kunyomi": [
      "つぶ"
    ],
    "meaning": "hạt",
    "words": [
      {
        "word": "粒子",
        "reading": "りゅうし",
        "meaning": "Hạt nhỏ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "一粒",
        "reading": "ひとつぶ",
        "meaning": "Một hạt",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "粒子する",
        "reading": "りゅうしする",
        "meaning": "Làm hạt nhỏ",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_253",
    "stt": 253,
    "hang": 26,
    "kanji": "粧",
    "hanViet": "Trang",
    "onyomi": [
      "しょう"
    ],
    "kunyomi": [],
    "meaning": "trang điểm",
    "words": [
      {
        "word": "化粧",
        "reading": "けしょう",
        "meaning": "Trang điểm",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "化粧する",
        "reading": "けしょうする",
        "meaning": "Làm trang điểm",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_254",
    "stt": 254,
    "hang": 26,
    "kanji": "精",
    "hanViet": "Tinh",
    "onyomi": [
      "せい",
      "しょう"
    ],
    "kunyomi": [],
    "meaning": "tinh thần",
    "words": [
      {
        "word": "精神",
        "reading": "せいしん",
        "meaning": "Tinh thần",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "精密",
        "reading": "せいみつ",
        "meaning": "Tinh vi, chính xác",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "精神する",
        "reading": "せいしんする",
        "meaning": "Làm tinh thần",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_255",
    "stt": 255,
    "hang": 26,
    "kanji": "糖",
    "hanViet": "Đường",
    "onyomi": [
      "とう"
    ],
    "kunyomi": [],
    "meaning": "chất đường",
    "words": [
      {
        "word": "砂糖",
        "reading": "さとう",
        "meaning": "Đường ăn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "糖尿病",
        "reading": "とうにょうびょう",
        "meaning": "Bệnh tiểu đường",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "砂糖する",
        "reading": "さとうする",
        "meaning": "Làm đường ăn",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_256",
    "stt": 256,
    "hang": 26,
    "kanji": "系",
    "hanViet": "Hệ",
    "onyomi": [
      "けい"
    ],
    "kunyomi": [],
    "meaning": "hệ thống",
    "words": [
      {
        "word": "系統",
        "reading": "けいとう",
        "meaning": "Hệ thống",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "太陽系",
        "reading": "たいようけい",
        "meaning": "Hệ mặt trời",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "系統する",
        "reading": "けいとうする",
        "meaning": "Làm hệ thống",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_257",
    "stt": 257,
    "hang": 26,
    "kanji": "紅",
    "hanViet": "Hồng",
    "onyomi": [
      "こう",
      "く"
    ],
    "kunyomi": [
      "べに",
      "くれない",
      "あか・い"
    ],
    "meaning": "đỏ đậm",
    "words": [
      {
        "word": "紅茶",
        "reading": "こうちゃ",
        "meaning": "Hồng trà",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "紅葉",
        "reading": "こうよう",
        "meaning": "Lá đỏ mùa thu",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "紅い",
        "reading": "あかい",
        "meaning": "Động từ của chữ 紅 (Hồng)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_258",
    "stt": 258,
    "hang": 26,
    "kanji": "純",
    "hanViet": "Thuần",
    "onyomi": [
      "じゅん"
    ],
    "kunyomi": [],
    "meaning": "thuần túy",
    "words": [
      {
        "word": "単純",
        "reading": "たんじゅん",
        "meaning": "Đơn thuần",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "純金",
        "reading": "じゅんきん",
        "meaning": "Vàng ròng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "単純する",
        "reading": "たんじゅんする",
        "meaning": "Làm đơn thuần",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_259",
    "stt": 259,
    "hang": 26,
    "kanji": "納",
    "hanViet": "Nạp",
    "onyomi": [
      "のう",
      "なっ",
      "なん"
    ],
    "kunyomi": [
      "おさ・める",
      "おさ・まる"
    ],
    "meaning": "nộp",
    "words": [
      {
        "word": "納得",
        "reading": "なっとく",
        "meaning": "Đồng thuận",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "納豆",
        "reading": "なっとう",
        "meaning": "Đậu lên men Natto",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "納める",
        "reading": "おさめる",
        "meaning": "Thu nhận, sửa chữa, cai trị, trau dồi",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "納まる",
        "reading": "おさまる",
        "meaning": "Lắng xuống, dịu đi, thu gọn",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_260",
    "stt": 260,
    "hang": 26,
    "kanji": "統",
    "hanViet": "Thống",
    "onyomi": [
      "とう"
    ],
    "kunyomi": [
      "す・べる"
    ],
    "meaning": "truyền thống",
    "words": [
      {
        "word": "大統領",
        "reading": "だいとうりょう",
        "meaning": "Tổng thống",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "統計",
        "reading": "とうけい",
        "meaning": "Thống kê",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "統べる",
        "reading": "すべる",
        "meaning": "Động từ của chữ 統 (Thống)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_261",
    "stt": 261,
    "hang": 27,
    "kanji": "絞",
    "hanViet": "Giảo",
    "onyomi": [
      "こう"
    ],
    "kunyomi": [
      "しぼ・る",
      "し・める",
      "し・まる"
    ],
    "meaning": "bóp, thắt, vắt",
    "words": [
      {
        "word": "絞る",
        "reading": "しぼる",
        "meaning": "Vắt kiệt, siết lại",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "絞める",
        "reading": "しめる",
        "meaning": "Chiếm, nắm giữ",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "絞まる",
        "reading": "しまる",
        "meaning": "Động từ của chữ 絞 (Giảo)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "絞",
        "reading": "こう",
        "meaning": "Chữ 絞 (Giảo): bóp, thắt, vắt",
        "pos": "noun",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_262",
    "stt": 262,
    "hang": 27,
    "kanji": "総",
    "hanViet": "Tổng",
    "onyomi": [
      "そう"
    ],
    "kunyomi": [
      "ふさ"
    ],
    "meaning": "tổng thể",
    "words": [
      {
        "word": "総理大臣",
        "reading": "そうりだいじん",
        "meaning": "Thủ tướng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "総合",
        "reading": "そうごう",
        "meaning": "Tổng hợp",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "総理大臣する",
        "reading": "そうりだいじんする",
        "meaning": "Làm thủ tướng",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_263",
    "stt": 263,
    "hang": 27,
    "kanji": "編",
    "hanViet": "Biên",
    "onyomi": [
      "へん"
    ],
    "kunyomi": [
      "あ・む"
    ],
    "meaning": "biên tập, đan",
    "words": [
      {
        "word": "編集",
        "reading": "へんしゅう",
        "meaning": "Biên tập",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "編む",
        "reading": "あむ",
        "meaning": "Đan áo len",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_264",
    "stt": 264,
    "hang": 27,
    "kanji": "緊",
    "hanViet": "Khẩn",
    "onyomi": [
      "きん"
    ],
    "kunyomi": [],
    "meaning": "gấp, khẩn cấp",
    "words": [
      {
        "word": "緊急",
        "reading": "きんきゅう",
        "meaning": "Khẩn cấp",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "緊張",
        "reading": "きんちょう",
        "meaning": "Căng thẳng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "緊急する",
        "reading": "きんきゅうする",
        "meaning": "Làm khẩn cấp",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_265",
    "stt": 265,
    "hang": 27,
    "kanji": "締",
    "hanViet": "Đế",
    "onyomi": [
      "てい"
    ],
    "kunyomi": [
      "し・める",
      "し・まる"
    ],
    "meaning": "siết chặt",
    "words": [
      {
        "word": "締切",
        "reading": "しめきり",
        "meaning": "Hạn chót",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "結ぶ",
        "reading": "むすぶ",
        "meaning": "Buộc lại",
        "pos": "verb",
        "readingType": "on"
      },
      {
        "word": "締める",
        "reading": "しめる",
        "meaning": "Chiếm, nắm giữ",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "締まる",
        "reading": "しまる",
        "meaning": "Động từ của chữ 締 (Đế)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_266",
    "stt": 266,
    "hang": 27,
    "kanji": "績",
    "hanViet": "Tích",
    "onyomi": [
      "せき"
    ],
    "kunyomi": [],
    "meaning": "thành tích",
    "words": [
      {
        "word": "成績",
        "reading": "せいせき",
        "meaning": "Thành tích",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "業績",
        "reading": "ぎょうせき",
        "meaning": "Thành quả kinh doanh",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "成績する",
        "reading": "せいせきする",
        "meaning": "Làm thành tích",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_267",
    "stt": 267,
    "hang": 27,
    "kanji": "繰",
    "hanViet": "Tao",
    "onyomi": [
      "そう"
    ],
    "kunyomi": [
      "く・る"
    ],
    "meaning": "kéo tơ",
    "words": [
      {
        "word": "繰り返す",
        "reading": "くりかえす",
        "meaning": "Lặp đi lặp lại",
        "pos": "verb",
        "readingType": "on"
      },
      {
        "word": "繰る",
        "reading": "くる",
        "meaning": "Động từ của chữ 繰 (Tao)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "繰",
        "reading": "そう",
        "meaning": "Chữ 繰 (Tao): kéo tơ",
        "pos": "noun",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_268",
    "stt": 268,
    "hang": 27,
    "kanji": "罪",
    "hanViet": "Tội",
    "onyomi": [
      "ざい"
    ],
    "kunyomi": [
      "つみ"
    ],
    "meaning": "tội lỗi",
    "words": [
      {
        "word": "無罪",
        "reading": "むざい",
        "meaning": "Vô tội",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "犯罪",
        "reading": "はんざい",
        "meaning": "Tội phạm",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "無罪する",
        "reading": "むざいする",
        "meaning": "Làm vô tội",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_269",
    "stt": 269,
    "hang": 27,
    "kanji": "署",
    "hanViet": "Thự",
    "onyomi": [
      "しょ"
    ],
    "kunyomi": [],
    "meaning": "công sở",
    "words": [
      {
        "word": "警察署",
        "reading": "けいさつしょ",
        "meaning": "Đồn cảnh sát",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "署名",
        "reading": "しょめい",
        "meaning": "Ký tên",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "警察署する",
        "reading": "けいさつしょする",
        "meaning": "Làm đồn cảnh sát",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_270",
    "stt": 270,
    "hang": 27,
    "kanji": "罰",
    "hanViet": "Phạt",
    "onyomi": [
      "ばつ",
      "ばち"
    ],
    "kunyomi": [],
    "meaning": "hình phạt",
    "words": [
      {
        "word": "罰金",
        "reading": "ばっきん",
        "meaning": "Tiền phạt",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "処罰",
        "reading": "しょばつ",
        "meaning": "Xử phạt",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "罰金する",
        "reading": "ばっきんする",
        "meaning": "Làm tiền phạt",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_271",
    "stt": 271,
    "hang": 28,
    "kanji": "翌",
    "hanViet": "Dực",
    "onyomi": [
      "よく"
    ],
    "kunyomi": [],
    "meaning": "kế tiếp",
    "words": [
      {
        "word": "翌日",
        "reading": "よくじつ",
        "meaning": "Ngày hôm sau",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "翌朝",
        "reading": "よくあさ",
        "meaning": "Sáng hôm sau",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "翌日する",
        "reading": "よくじつする",
        "meaning": "Làm ngày hôm sau",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_272",
    "stt": 272,
    "hang": 28,
    "kanji": "翻",
    "hanViet": "Phiên",
    "onyomi": [
      "ほん"
    ],
    "kunyomi": [
      "ひるがえ・る",
      "ひるがえ・す"
    ],
    "meaning": "phiên dịch",
    "words": [
      {
        "word": "翻訳",
        "reading": "ほんやく",
        "meaning": "Dịch văn bản",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "翻る",
        "reading": "ひるがえる",
        "meaning": "Động từ của chữ 翻 (Phiên)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "翻す",
        "reading": "ひるがえす",
        "meaning": "Động từ của chữ 翻 (Phiên)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_273",
    "stt": 273,
    "hang": 28,
    "kanji": "老",
    "hanViet": "Lão",
    "onyomi": [
      "ろう"
    ],
    "kunyomi": [
      "お・いる",
      "ふ・ける"
    ],
    "meaning": "già, suy yếu",
    "words": [
      {
        "word": "老人",
        "reading": "ろうじん",
        "meaning": "Người già",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "老後",
        "reading": "ろうご",
        "meaning": "Tuổi già",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "老いる",
        "reading": "おいる",
        "meaning": "Động từ của chữ 老 (Lão)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "老ける",
        "reading": "ふける",
        "meaning": "Động từ của chữ 老 (Lão)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_274",
    "stt": 274,
    "hang": 28,
    "kanji": "聴",
    "hanViet": "Thính",
    "onyomi": [
      "ちょう"
    ],
    "kunyomi": [
      "き・く"
    ],
    "meaning": "nghe",
    "words": [
      {
        "word": "聴解",
        "reading": "ちょうかい",
        "meaning": "Luyện nghe hiểu",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "聴く",
        "reading": "きく",
        "meaning": "Lắng nghe",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_275",
    "stt": 275,
    "hang": 28,
    "kanji": "職",
    "hanViet": "Chức",
    "onyomi": [
      "しょく"
    ],
    "kunyomi": [],
    "meaning": "nghề nghiệp",
    "words": [
      {
        "word": "職業",
        "reading": "しょくぎょう",
        "meaning": "Nghề nghiệp",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "職場",
        "reading": "しょくば",
        "meaning": "Nơi làm việc",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "職業する",
        "reading": "しょくぎょうする",
        "meaning": "Làm nghề nghiệp",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_276",
    "stt": 276,
    "hang": 28,
    "kanji": "肌",
    "hanViet": "Cơ",
    "onyomi": [
      "き"
    ],
    "kunyomi": [
      "はだ"
    ],
    "meaning": "làn da",
    "words": [
      {
        "word": "肌",
        "reading": "はだ",
        "meaning": "Làn da",
        "pos": "noun",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_277",
    "stt": 277,
    "hang": 28,
    "kanji": "肩",
    "hanViet": "Kiên",
    "onyomi": [
      "けん"
    ],
    "kunyomi": [
      "かた"
    ],
    "meaning": "vai",
    "words": [
      {
        "word": "肩",
        "reading": "かた",
        "meaning": "Bờ vai",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "肩幅",
        "reading": "かたはば",
        "meaning": "Độ rộng vai",
        "pos": "noun",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_278",
    "stt": 278,
    "hang": 28,
    "kanji": "肯",
    "hanViet": "Khẳng",
    "onyomi": [
      "こう"
    ],
    "kunyomi": [],
    "meaning": "khẳng định",
    "words": [
      {
        "word": "肯定",
        "reading": "こうてい",
        "meaning": "Khẳng định",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "肯定する",
        "reading": "こうていする",
        "meaning": "Làm khẳng định",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_279",
    "stt": 279,
    "hang": 28,
    "kanji": "肺",
    "hanViet": "Phế",
    "onyomi": [
      "はい"
    ],
    "kunyomi": [],
    "meaning": "lá phổi",
    "words": [
      {
        "word": "肺炎",
        "reading": "はいえん",
        "meaning": "Viêm phổi",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "肺",
        "reading": "はい",
        "meaning": "Phổi",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "肺炎する",
        "reading": "はいえんする",
        "meaning": "Làm viêm phổi",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_280",
    "stt": 280,
    "hang": 28,
    "kanji": "胸",
    "hanViet": "Hung",
    "onyomi": [
      "きょう"
    ],
    "kunyomi": [
      "むね",
      "むな"
    ],
    "meaning": "ngực",
    "words": [
      {
        "word": "胸",
        "reading": "むね",
        "meaning": "Lồng ngực, ngực",
        "pos": "noun",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_281",
    "stt": 281,
    "hang": 29,
    "kanji": "脳",
    "hanViet": "Não",
    "onyomi": [
      "のう"
    ],
    "kunyomi": [],
    "meaning": "bộ óc",
    "words": [
      {
        "word": "頭脳",
        "reading": "ずのう",
        "meaning": "Đầu óc",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "脳波",
        "reading": "のうは",
        "meaning": "Sóng não",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "頭脳する",
        "reading": "ずのうする",
        "meaning": "Làm đầu óc",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_282",
    "stt": 282,
    "hang": 29,
    "kanji": "腕",
    "hanViet": "Oản",
    "onyomi": [
      "わん"
    ],
    "kunyomi": [
      "うで"
    ],
    "meaning": "cánh tay",
    "words": [
      {
        "word": "腕時計",
        "reading": "うでどけい",
        "meaning": "Đồng hồ đeo tay",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "腕",
        "reading": "うで",
        "meaning": "Cánh tay, tay nghề",
        "pos": "noun",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_283",
    "stt": 283,
    "hang": 29,
    "kanji": "腹",
    "hanViet": "Phúc",
    "onyomi": [
      "ふく"
    ],
    "kunyomi": [
      "はら"
    ],
    "meaning": "bụng",
    "words": [
      {
        "word": "空腹",
        "reading": "くうふく",
        "meaning": "Bụng đói",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "お腹",
        "reading": "おなか",
        "meaning": "Cái bụng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "空腹する",
        "reading": "くうふくする",
        "meaning": "Làm bụng đói",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_284",
    "stt": 284,
    "hang": 29,
    "kanji": "腰",
    "hanViet": "Yêu",
    "onyomi": [
      "よう"
    ],
    "kunyomi": [
      "こし"
    ],
    "meaning": "eo, hông",
    "words": [
      {
        "word": "腰痛",
        "reading": "ようつう",
        "meaning": "Đau lưng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "腰",
        "reading": "こし",
        "meaning": "Thắt lưng, eo",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "腰痛する",
        "reading": "ようつうする",
        "meaning": "Làm đau lưng",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_285",
    "stt": 285,
    "hang": 29,
    "kanji": "腐",
    "hanViet": "Hủ",
    "onyomi": [
      "ふ"
    ],
    "kunyomi": [
      "くさ・る",
      "くさ・れる",
      "くさ・らす"
    ],
    "meaning": "mục nát, hôi thối",
    "words": [
      {
        "word": "腐る",
        "reading": "くさる",
        "meaning": "Thiu, ôi thiu",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "豆腐",
        "reading": "とうふ",
        "meaning": "Đậu phụ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "腐れる",
        "reading": "くされる",
        "meaning": "Động từ của chữ 腐 (Hủ)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "腐らす",
        "reading": "くさらす",
        "meaning": "Động từ của chữ 腐 (Hủ)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_286",
    "stt": 286,
    "hang": 29,
    "kanji": "臓",
    "hanViet": "Tạng",
    "onyomi": [
      "ぞう"
    ],
    "kunyomi": [],
    "meaning": "nội tạng",
    "words": [
      {
        "word": "心臓",
        "reading": "しんぞう",
        "meaning": "Quả tim",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "内臓",
        "reading": "ないぞう",
        "meaning": "Nội tạng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "心臓する",
        "reading": "しんぞうする",
        "meaning": "Làm quả tim",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_287",
    "stt": 287,
    "hang": 29,
    "kanji": "臣",
    "hanViet": "Thần",
    "onyomi": [
      "しん",
      "じん"
    ],
    "kunyomi": [],
    "meaning": "đại thần",
    "words": [
      {
        "word": "大臣",
        "reading": "だいじん",
        "meaning": "Bộ trưởng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "大臣する",
        "reading": "だいじんする",
        "meaning": "Làm bộ trưởng",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_288",
    "stt": 288,
    "hang": 29,
    "kanji": "臭",
    "hanViet": "Xú",
    "onyomi": [
      "しゅう"
    ],
    "kunyomi": [
      "くさ・い",
      "にお・う"
    ],
    "meaning": "hôi",
    "words": [
      {
        "word": "悪臭",
        "reading": "あくしゅう",
        "meaning": "Mùi hôi thối",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "臭い",
        "reading": "くさい",
        "meaning": "Có mùi hôi",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "臭う",
        "reading": "におう",
        "meaning": "Động từ của chữ 臭 (Xú)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_289",
    "stt": 289,
    "hang": 29,
    "kanji": "興",
    "hanViet": "Hưng",
    "onyomi": [
      "こう",
      "きょう"
    ],
    "kunyomi": [
      "おこ・る",
      "おこ・す"
    ],
    "meaning": "hưng thịnh",
    "words": [
      {
        "word": "興味",
        "reading": "きょうみ",
        "meaning": "Hứng thú",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "興奮",
        "reading": "こうふん",
        "meaning": "Hưng phấn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "興る",
        "reading": "おこる",
        "meaning": "Động từ của chữ 興 (Hưng)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "興す",
        "reading": "おこす",
        "meaning": "Động từ của chữ 興 (Hưng)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_290",
    "stt": 290,
    "hang": 29,
    "kanji": "航",
    "hanViet": "Hàng",
    "onyomi": [
      "こう"
    ],
    "kunyomi": [],
    "meaning": "hàng không, hàng hải",
    "words": [
      {
        "word": "航空",
        "reading": "こうくう",
        "meaning": "Hàng không",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "航海",
        "reading": "こうかい",
        "meaning": "Hàng hải",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "航空する",
        "reading": "こうくうする",
        "meaning": "Làm hàng không",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_291",
    "stt": 291,
    "hang": 30,
    "kanji": "般",
    "hanViet": "Ban",
    "onyomi": [
      "はん"
    ],
    "kunyomi": [],
    "meaning": "tổng quát",
    "words": [
      {
        "word": "一般",
        "reading": "いっぱん",
        "meaning": "Nói chung, phổ thông",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "全般",
        "reading": "ぜんぱん",
        "meaning": "Toàn thể",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "一般する",
        "reading": "いっぱんする",
        "meaning": "Làm nói chung, phổ thông",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_292",
    "stt": 292,
    "hang": 30,
    "kanji": "芸",
    "hanViet": "Nghệ",
    "onyomi": [
      "げい"
    ],
    "kunyomi": [],
    "meaning": "nghệ thuật",
    "words": [
      {
        "word": "芸術",
        "reading": "げいじゅつ",
        "meaning": "Nghệ thuật",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "芸能人",
        "reading": "げいのうじん",
        "meaning": "Nghệ sĩ giải trí",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "芸術する",
        "reading": "げいじゅつする",
        "meaning": "Làm nghệ thuật",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_293",
    "stt": 293,
    "hang": 30,
    "kanji": "草",
    "hanViet": "Thảo",
    "onyomi": [
      "そう"
    ],
    "kunyomi": [
      "くさ"
    ],
    "meaning": "cỏ",
    "words": [
      {
        "word": "草原",
        "reading": "そうげん",
        "meaning": "Thảo nguyên",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "草",
        "reading": "くさ",
        "meaning": "Cỏ",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "草原する",
        "reading": "そうげんする",
        "meaning": "Làm thảo nguyên",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_294",
    "stt": 294,
    "hang": 30,
    "kanji": "荒",
    "hanViet": "Hoang",
    "onyomi": [
      "こう"
    ],
    "kunyomi": [
      "あら・い",
      "あ・れる",
      "あ・らす"
    ],
    "meaning": "bỏ hoang",
    "words": [
      {
        "word": "荒れる",
        "reading": "あれる",
        "meaning": "Biển động, hoang phế",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "荒い",
        "reading": "あらい",
        "meaning": "Thô ráp",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "荒らす",
        "reading": "あらす",
        "meaning": "Động từ của chữ 荒 (Hoang)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_295",
    "stt": 295,
    "hang": 30,
    "kanji": "華",
    "hanViet": "Hoa",
    "onyomi": [
      "か",
      "け"
    ],
    "kunyomi": [
      "はな"
    ],
    "meaning": "Trung hoa",
    "words": [
      {
        "word": "豪華",
        "reading": "ごうか",
        "meaning": "Hào nhoáng, sang trọng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "華やか",
        "reading": "はなやか",
        "meaning": "Tươi thắm, rực rỡ",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "豪華する",
        "reading": "ごうかする",
        "meaning": "Làm hào nhoáng, sang trọng",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_296",
    "stt": 296,
    "hang": 30,
    "kanji": "葬",
    "hanViet": "Táng",
    "onyomi": [
      "そう"
    ],
    "kunyomi": [
      "ほうむ・る"
    ],
    "meaning": "chôn cất",
    "words": [
      {
        "word": "葬式",
        "reading": "そうしき",
        "meaning": "Tang lễ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "葬る",
        "reading": "ほうむる",
        "meaning": "Chôn cất",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_297",
    "stt": 297,
    "hang": 30,
    "kanji": "蒸",
    "hanViet": "Chưng",
    "onyomi": [
      "じょう",
      "せい"
    ],
    "kunyomi": [
      "む・す",
      "む・れる",
      "む・らす"
    ],
    "meaning": "bốc hơi",
    "words": [
      {
        "word": "蒸気",
        "reading": "じょうき",
        "meaning": "Hơi nước",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "蒸し暑い",
        "reading": "むしあつい",
        "meaning": "Oi bức",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "蒸す",
        "reading": "むす",
        "meaning": "Động từ của chữ 蒸 (Chưng)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "蒸れる",
        "reading": "むれる",
        "meaning": "Động từ của chữ 蒸 (Chưng)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "蒸らす",
        "reading": "むらす",
        "meaning": "Động từ của chữ 蒸 (Chưng)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_298",
    "stt": 298,
    "hang": 30,
    "kanji": "蔵",
    "hanViet": "Tàng",
    "onyomi": [
      "ぞう",
      "そう"
    ],
    "kunyomi": [
      "くら",
      "かく・れる"
    ],
    "meaning": "nhà kho",
    "words": [
      {
        "word": "冷蔵庫",
        "reading": "れいぞうこ",
        "meaning": "Tủ lạnh",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "蔵",
        "reading": "くら",
        "meaning": "Nhà kho",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "蔵れる",
        "reading": "かくれる",
        "meaning": "Động từ của chữ 蔵 (Tàng)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_299",
    "stt": 299,
    "hang": 30,
    "kanji": "虹",
    "hanViet": "Hồng",
    "onyomi": [
      "こう"
    ],
    "kunyomi": [
      "にじ"
    ],
    "meaning": "cầu vồng",
    "words": [
      {
        "word": "虹",
        "reading": "にじ",
        "meaning": "Cầu vồng",
        "pos": "noun",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_300",
    "stt": 300,
    "hang": 30,
    "kanji": "蚊",
    "hanViet": "Văn",
    "onyomi": [
      "ぶん"
    ],
    "kunyomi": [
      "か"
    ],
    "meaning": "con muỗi",
    "words": [
      {
        "word": "蚊",
        "reading": "か",
        "meaning": "Con muỗi",
        "pos": "noun",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_301",
    "stt": 301,
    "hang": 31,
    "kanji": "蛍",
    "hanViet": "Huỳnh",
    "onyomi": [
      "けい"
    ],
    "kunyomi": [
      "ほたる"
    ],
    "meaning": "con đom đóm",
    "words": [
      {
        "word": "蛍光灯",
        "reading": "けいこうとう",
        "meaning": "Đèn huỳnh quang",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "蛍",
        "reading": "ほたる",
        "meaning": "Đom đóm",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "蛍光灯する",
        "reading": "けいこうとうする",
        "meaning": "Làm đèn huỳnh quang",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_302",
    "stt": 302,
    "hang": 31,
    "kanji": "蛇",
    "hanViet": "Xà",
    "onyomi": [
      "じゃ",
      "だ",
      "や"
    ],
    "kunyomi": [
      "へび"
    ],
    "meaning": "con rắn",
    "words": [
      {
        "word": "蛇口",
        "reading": "じゃぐち",
        "meaning": "Vòi nước",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "蛇",
        "reading": "へび",
        "meaning": "Con rắn",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "蛇口する",
        "reading": "じゃぐちする",
        "meaning": "Làm vòi nước",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_303",
    "stt": 303,
    "hang": 31,
    "kanji": "蜂",
    "hanViet": "Phong",
    "onyomi": [
      "ほう"
    ],
    "kunyomi": [
      "はち"
    ],
    "meaning": "con ong",
    "words": [
      {
        "word": "蜂蜜",
        "reading": "はちみつ",
        "meaning": "Mật ong",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "蜂",
        "reading": "はち",
        "meaning": "Con ong",
        "pos": "noun",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_304",
    "stt": 304,
    "hang": 31,
    "kanji": "蜜",
    "hanViet": "Mật",
    "onyomi": [
      "みつ"
    ],
    "kunyomi": [],
    "meaning": "mật ong",
    "words": [
      {
        "word": "蜂蜜",
        "reading": "はちみつ",
        "meaning": "Mật ong",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "蜂蜜する",
        "reading": "はちみつする",
        "meaning": "Làm mật ong",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_305",
    "stt": 305,
    "hang": 31,
    "kanji": "血",
    "hanViet": "Huyết",
    "onyomi": [
      "けつ"
    ],
    "kunyomi": [
      "ち"
    ],
    "meaning": "máu",
    "words": [
      {
        "word": "血管",
        "reading": "けっかん",
        "meaning": "Mạch máu",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "血",
        "reading": "ち",
        "meaning": "Máu",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "血管する",
        "reading": "けっかんする",
        "meaning": "Làm mạch máu",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_306",
    "stt": 306,
    "hang": 31,
    "kanji": "街",
    "hanViet": "Nhai",
    "onyomi": [
      "がい",
      "かい"
    ],
    "kunyomi": [
      "まち"
    ],
    "meaning": "dãy phố",
    "words": [
      {
        "word": "商店街",
        "reading": "しょうてんがい",
        "meaning": "Phố mua sắm",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "街道",
        "reading": "かいどう",
        "meaning": "Đường phố",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "商店街する",
        "reading": "しょうてんがいする",
        "meaning": "Làm phố mua sắm",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_307",
    "stt": 307,
    "hang": 31,
    "kanji": "被",
    "hanViet": "Bị",
    "onyomi": [
      "ひ"
    ],
    "kunyomi": [
      "こうむ・る",
      "かぶ・る",
      "かぶ・せる"
    ],
    "meaning": "chịu, bị",
    "words": [
      {
        "word": "被害",
        "reading": "ひがい",
        "meaning": "Thiệt hại",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "被る",
        "reading": "かぶる",
        "meaning": "Đội, chịu lấy",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "被せる",
        "reading": "かぶせる",
        "meaning": "Động từ của chữ 被 (Bị)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_308",
    "stt": 308,
    "hang": 31,
    "kanji": "視",
    "hanViet": "Thị",
    "onyomi": [
      "し"
    ],
    "kunyomi": [
      "み・る"
    ],
    "meaning": "thị giác, nhìn",
    "words": [
      {
        "word": "視力",
        "reading": "しりょく",
        "meaning": "Thị lực",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "無視",
        "reading": "むし",
        "meaning": "Xem thường, phớt lờ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "視る",
        "reading": "みる",
        "meaning": "Động từ của chữ 視 (Thị)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_309",
    "stt": 309,
    "hang": 31,
    "kanji": "観",
    "hanViet": "Quan",
    "onyomi": [
      "かん"
    ],
    "kunyomi": [
      "み・る"
    ],
    "meaning": "quan sát, nhìn",
    "words": [
      {
        "word": "観光",
        "reading": "かんこう",
        "meaning": "Tham quan, du lịch",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "観客",
        "reading": "かんきゃく",
        "meaning": "Khán giả",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "観る",
        "reading": "みる",
        "meaning": "Động từ của chữ 観 (Quan)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_310",
    "stt": 310,
    "hang": 31,
    "kanji": "訓",
    "hanViet": "Huấn",
    "onyomi": [
      "くん"
    ],
    "kunyomi": [],
    "meaning": "huấn luyện",
    "words": [
      {
        "word": "訓練",
        "reading": "くんれん",
        "meaning": "Huấn luyện",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "教訓",
        "reading": "きょうくん",
        "meaning": "Bài học giáo huấn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "訓練する",
        "reading": "くんれんする",
        "meaning": "Làm huấn luyện",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_311",
    "stt": 311,
    "hang": 32,
    "kanji": "設",
    "hanViet": "Thiết",
    "onyomi": [
      "せつ"
    ],
    "kunyomi": [
      "もう・ける"
    ],
    "meaning": "thiết lập",
    "words": [
      {
        "word": "建設",
        "reading": "けんせつ",
        "meaning": "Xây dựng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "設計",
        "reading": "せっけい",
        "meaning": "Thiết kế",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "設ける",
        "reading": "もうける",
        "meaning": "Động từ của chữ 設 (Thiết)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_312",
    "stt": 312,
    "hang": 32,
    "kanji": "訪",
    "hanViet": "Phỏng",
    "onyomi": [
      "ほう"
    ],
    "kunyomi": [
      "おとず・れる",
      "たず・ねる"
    ],
    "meaning": "thăm hỏi",
    "words": [
      {
        "word": "訪問",
        "reading": "ほうもん",
        "meaning": "Thăm hỏi",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "訪ねる",
        "reading": "たずねる",
        "meaning": "Ghé thăm",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "訪れる",
        "reading": "おとずれる",
        "meaning": "Động từ của chữ 訪 (Phỏng)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_313",
    "stt": 313,
    "hang": 32,
    "kanji": "評",
    "hanViet": "Bình",
    "onyomi": [
      "ひょう"
    ],
    "kunyomi": [],
    "meaning": "bình luận",
    "words": [
      {
        "word": "評価",
        "reading": "ひょうか",
        "meaning": "Đánh giá",
        "pos": "verb",
        "readingType": "on"
      },
      {
        "word": "評判",
        "reading": "ひょうばん",
        "meaning": "Danh tiếng",
        "pos": "noun",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_314",
    "stt": 314,
    "hang": 32,
    "kanji": "詞",
    "hanViet": "Từ",
    "onyomi": [
      "し"
    ],
    "kunyomi": [],
    "meaning": "lời văn",
    "words": [
      {
        "word": "歌詞",
        "reading": "かし",
        "meaning": "Lời bài hát",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "動詞",
        "reading": "どうし",
        "meaning": "Động từ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "歌詞する",
        "reading": "かしする",
        "meaning": "Làm lời bài hát",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_315",
    "stt": 315,
    "hang": 32,
    "kanji": "診",
    "hanViet": "Chẩn",
    "onyomi": [
      "しん"
    ],
    "kunyomi": [
      "み・る"
    ],
    "meaning": "chẩn bệnh",
    "words": [
      {
        "word": "診断",
        "reading": "しんだん",
        "meaning": "Chẩn đoán",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "健診",
        "reading": "けんしん",
        "meaning": "Khám sức khỏe",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "診る",
        "reading": "みる",
        "meaning": "Động từ của chữ 診 (Chẩn)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_316",
    "stt": 316,
    "hang": 32,
    "kanji": "誠",
    "hanViet": "Thành",
    "onyomi": [
      "せい"
    ],
    "kunyomi": [
      "まこと"
    ],
    "meaning": "thành thật",
    "words": [
      {
        "word": "誠実",
        "reading": "せいじつ",
        "meaning": "Thành thật",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "誠に",
        "reading": "まことに",
        "meaning": "Chân thành (cảm ơn)",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "誠実する",
        "reading": "せいじつする",
        "meaning": "Làm thành thật",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_317",
    "stt": 317,
    "hang": 32,
    "kanji": "誤",
    "hanViet": "Ngộ",
    "onyomi": [
      "ご"
    ],
    "kunyomi": [
      "あやま・る"
    ],
    "meaning": "hiểu lầm",
    "words": [
      {
        "word": "誤解",
        "reading": "ごかい",
        "meaning": "Hiểu lầm",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "誤り",
        "reading": "あやまり",
        "meaning": "Sai sót",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "誤る",
        "reading": "あやまる",
        "meaning": "Động từ của chữ 誤 (Ngộ)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_318",
    "stt": 318,
    "hang": 32,
    "kanji": "諸",
    "hanViet": "Chư",
    "onyomi": [
      "しょ"
    ],
    "kunyomi": [
      "もろ"
    ],
    "meaning": "các, tất cả",
    "words": [
      {
        "word": "諸問題",
        "reading": "しょもんだい",
        "meaning": "Các vấn đề",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "諸国",
        "reading": "しょこく",
        "meaning": "Các nước",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "諸問題する",
        "reading": "しょもんだいする",
        "meaning": "Làm các vấn đề",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_319",
    "stt": 319,
    "hang": 32,
    "kanji": "誕",
    "hanViet": "Đản",
    "onyomi": [
      "たん"
    ],
    "kunyomi": [],
    "meaning": "ra đời",
    "words": [
      {
        "word": "誕生日",
        "reading": "たんじょうび",
        "meaning": "Sinh nhật",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "誕生",
        "reading": "たんじょう",
        "meaning": "Sự ra đời",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "誕生日する",
        "reading": "たんじょうびする",
        "meaning": "Làm sinh nhật",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_320",
    "stt": 320,
    "hang": 32,
    "kanji": "請",
    "hanViet": "Thỉnh",
    "onyomi": [
      "せい",
      "しん"
    ],
    "kunyomi": [
      "こ・う",
      "う・ける"
    ],
    "meaning": "thỉnh cầu",
    "words": [
      {
        "word": "請求",
        "reading": "せいきゅう",
        "meaning": "Yêu cầu thanh toán",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "普請",
        "reading": "ふしん",
        "meaning": "Xây dựng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "請う",
        "reading": "こう",
        "meaning": "Động từ của chữ 請 (Thỉnh)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "請ける",
        "reading": "うける",
        "meaning": "Động từ của chữ 請 (Thỉnh)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_321",
    "stt": 321,
    "hang": 33,
    "kanji": "誰",
    "hanViet": "Thùy",
    "onyomi": [
      "すい"
    ],
    "kunyomi": [
      "だれ",
      "たれ"
    ],
    "meaning": "ai",
    "words": [
      {
        "word": "誰",
        "reading": "だれ",
        "meaning": "Ai",
        "pos": "noun",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_322",
    "stt": 322,
    "hang": 33,
    "kanji": "諦",
    "hanViet": "Đế",
    "onyomi": [
      "てい",
      "たい"
    ],
    "kunyomi": [
      "あきら・める",
      "つまびらか"
    ],
    "meaning": "từ bỏ",
    "words": [
      {
        "word": "諦める",
        "reading": "あきらめる",
        "meaning": "Từ bỏ, cam chịu",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "諦",
        "reading": "てい",
        "meaning": "Chữ 諦 (Đế): từ bỏ",
        "pos": "noun",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_323",
    "stt": 323,
    "hang": 33,
    "kanji": "謙",
    "hanViet": "Khiêm",
    "onyomi": [
      "けん"
    ],
    "kunyomi": [
      "へりくだ・る"
    ],
    "meaning": "khiêm tốn",
    "words": [
      {
        "word": "謙遜",
        "reading": "けんそん",
        "meaning": "Khiêm tốn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "謙譲語",
        "reading": "けんじょうご",
        "meaning": "Khiêm nhường ngữ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "謙る",
        "reading": "へりくだる",
        "meaning": "Động từ của chữ 謙 (Khiêm)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_324",
    "stt": 324,
    "hang": 33,
    "kanji": "識",
    "hanViet": "Thức",
    "onyomi": [
      "しき"
    ],
    "kunyomi": [
      "し・る"
    ],
    "meaning": "nhận thức",
    "words": [
      {
        "word": "知識",
        "reading": "ちしき",
        "meaning": "Tri thức, hiểu biết",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "意識",
        "reading": "いしき",
        "meaning": "Ý thức",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "識る",
        "reading": "しる",
        "meaning": "Động từ của chữ 識 (Thức)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_325",
    "stt": 325,
    "hang": 33,
    "kanji": "護",
    "hanViet": "Hộ",
    "onyomi": [
      "ご"
    ],
    "kunyomi": [
      "まも・る"
    ],
    "meaning": "bảo vệ",
    "words": [
      {
        "word": "看護師",
        "reading": "かんごし",
        "meaning": "Y tá",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "弁護士",
        "reading": "べんごし",
        "meaning": "Luật sư",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "護る",
        "reading": "まもる",
        "meaning": "Bảo vệ, tuân thủ",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_326",
    "stt": 326,
    "hang": 33,
    "kanji": "譲",
    "hanViet": "Nhượng",
    "onyomi": [
      "じょう"
    ],
    "kunyomi": [
      "ゆず・る"
    ],
    "meaning": "chuyển nhượng",
    "words": [
      {
        "word": "譲る",
        "reading": "ゆずる",
        "meaning": "Nhường lại",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "謙譲",
        "reading": "けんじょう",
        "meaning": "Khiêm nhường",
        "pos": "noun",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_327",
    "stt": 327,
    "hang": 33,
    "kanji": "谷",
    "hanViet": "Cốc",
    "onyomi": [
      "こく"
    ],
    "kunyomi": [
      "たに"
    ],
    "meaning": "thung lũng",
    "words": [
      {
        "word": "渓谷",
        "reading": "けいこく",
        "meaning": "Thung lũng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "谷",
        "reading": "たに",
        "meaning": "Khe núi",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "渓谷する",
        "reading": "けいこくする",
        "meaning": "Làm thung lũng",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_328",
    "stt": 328,
    "hang": 33,
    "kanji": "豊",
    "hanViet": "Phong",
    "onyomi": [
      "ほう",
      "ぶ"
    ],
    "kunyomi": [
      "ゆた・か",
      "とよ"
    ],
    "meaning": "phong phú",
    "words": [
      {
        "word": "豊富",
        "reading": "ほうふ",
        "meaning": "Phong phú",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "豊か",
        "reading": "ゆたか",
        "meaning": "Giàu có, phì nhiêu",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "豊富する",
        "reading": "ほうふする",
        "meaning": "Làm phong phú",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_329",
    "stt": 329,
    "hang": 33,
    "kanji": "豚",
    "hanViet": "Đồn",
    "onyomi": [
      "とん"
    ],
    "kunyomi": [
      "ぶた"
    ],
    "meaning": "con lợn",
    "words": [
      {
        "word": "豚肉",
        "reading": "ぶたにく",
        "meaning": "Thịt lợn",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "豚",
        "reading": "ぶた",
        "meaning": "Con heo/lợn",
        "pos": "noun",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_330",
    "stt": 330,
    "hang": 33,
    "kanji": "貨",
    "hanViet": "Hóa",
    "onyomi": [
      "か"
    ],
    "kunyomi": [
      "たから"
    ],
    "meaning": "hàng hóa",
    "words": [
      {
        "word": "通貨",
        "reading": "つうか",
        "meaning": "Tiền tệ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "貨物",
        "reading": "かもつ",
        "meaning": "Hàng hóa",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "通貨する",
        "reading": "つうかする",
        "meaning": "Làm tiền tệ",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_331",
    "stt": 331,
    "hang": 34,
    "kanji": "責",
    "hanViet": "Trách",
    "onyomi": [
      "せき"
    ],
    "kunyomi": [
      "せ・める"
    ],
    "meaning": "trách nhiệm",
    "words": [
      {
        "word": "責任",
        "reading": "せきにん",
        "meaning": "Trách nhiệm",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "責める",
        "reading": "せめる",
        "meaning": "Chỉ trích, đổ lỗi",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_332",
    "stt": 332,
    "hang": 34,
    "kanji": "貧",
    "hanViet": "Bần",
    "onyomi": [
      "ひん",
      "びん"
    ],
    "kunyomi": [
      "まず・しい"
    ],
    "meaning": "nghèo",
    "words": [
      {
        "word": "貧乏",
        "reading": "びんぼう",
        "meaning": "Nghèo khó",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "貧しい",
        "reading": "まずしい",
        "meaning": "Nghèo túng",
        "pos": "adj",
        "readingType": "kun"
      },
      {
        "word": "貧乏する",
        "reading": "びんぼうする",
        "meaning": "Làm nghèo khó",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_333",
    "stt": 333,
    "hang": 34,
    "kanji": "販",
    "hanViet": "Phiến",
    "onyomi": [
      "はん"
    ],
    "kunyomi": [],
    "meaning": "buôn bán",
    "words": [
      {
        "word": "販売",
        "reading": "はんばい",
        "meaning": "Buôn bán",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "自動販売機",
        "reading": "じどうはんばいき",
        "meaning": "Máy bán hàng tự động",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "販売する",
        "reading": "はんばいする",
        "meaning": "Làm buôn bán",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_334",
    "stt": 334,
    "hang": 34,
    "kanji": "貴",
    "hanViet": "Quý",
    "onyomi": [
      "き"
    ],
    "kunyomi": [
      "たっと・い",
      "とうと・い"
    ],
    "meaning": "quý giá",
    "words": [
      {
        "word": "貴重",
        "reading": "きちょう",
        "meaning": "Quý giá",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "貴族",
        "reading": "きぞく",
        "meaning": "Quý tộc",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "貴い",
        "reading": "たっとい",
        "meaning": "Động từ của chữ 貴 (Quý)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_335",
    "stt": 335,
    "hang": 34,
    "kanji": "貼",
    "hanViet": "Thiếp",
    "onyomi": [
      "てん",
      "ちょう"
    ],
    "kunyomi": [
      "は・る"
    ],
    "meaning": "dán",
    "words": [
      {
        "word": "貼る",
        "reading": "はる",
        "meaning": "Dán lên",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "貼り紙",
        "reading": "はりがみ",
        "meaning": "Tờ giấy dán",
        "pos": "noun",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_336",
    "stt": 336,
    "hang": 34,
    "kanji": "賢",
    "hanViet": "Hiền",
    "onyomi": [
      "けん"
    ],
    "kunyomi": [
      "かしこ・い"
    ],
    "meaning": "khôn ngoan",
    "words": [
      {
        "word": "賢明",
        "reading": "けんめい",
        "meaning": "Sáng suốt",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "賢い",
        "reading": "かしこい",
        "meaning": "Thông minh",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "賢明する",
        "reading": "けんめいする",
        "meaning": "Làm sáng suốt",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_337",
    "stt": 337,
    "hang": 34,
    "kanji": "路",
    "hanViet": "Lộ",
    "onyomi": [
      "ろ"
    ],
    "kunyomi": [
      "じ",
      "みち"
    ],
    "meaning": "con đường",
    "words": [
      {
        "word": "道路",
        "reading": "どうろ",
        "meaning": "Đường lộ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "進路",
        "reading": "しんろ",
        "meaning": "Định hướng tương lai",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "道路する",
        "reading": "どうろする",
        "meaning": "Làm đường lộ",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_338",
    "stt": 338,
    "hang": 34,
    "kanji": "蹴",
    "hanViet": "Xúc",
    "onyomi": [
      "しゅう"
    ],
    "kunyomi": [
      "け・る"
    ],
    "meaning": "đá",
    "words": [
      {
        "word": "蹴る",
        "reading": "ける",
        "meaning": "Đá (bóng)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "一蹴",
        "reading": "いっしゅう",
        "meaning": "Gạt phắt đi",
        "pos": "noun",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_339",
    "stt": 339,
    "hang": 34,
    "kanji": "軍",
    "hanViet": "Quân",
    "onyomi": [
      "ぐん"
    ],
    "kunyomi": [],
    "meaning": "quân đội",
    "words": [
      {
        "word": "軍隊",
        "reading": "ぐんたい",
        "meaning": "Quân đội",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "米軍",
        "reading": "べいぐん",
        "meaning": "Quân đội Mỹ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "軍隊する",
        "reading": "ぐんたいする",
        "meaning": "Làm quân đội",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_340",
    "stt": 340,
    "hang": 34,
    "kanji": "軒",
    "hanViet": "Hiên",
    "onyomi": [
      "けん"
    ],
    "kunyomi": [
      "のき"
    ],
    "meaning": "đơn vị đếm nhà",
    "words": [
      {
        "word": "一軒家",
        "reading": "いっけんや",
        "meaning": "Nhà riêng một căn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "軒",
        "reading": "のき",
        "meaning": "Mái hiên",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "一軒家する",
        "reading": "いっけんやする",
        "meaning": "Làm nhà riêng một căn",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_341",
    "stt": 341,
    "hang": 35,
    "kanji": "軟",
    "hanViet": "Nhuyễn",
    "onyomi": [
      "なん"
    ],
    "kunyomi": [
      "やわ・らか",
      "やわ・らかい"
    ],
    "meaning": "mềm",
    "words": [
      {
        "word": "柔軟",
        "reading": "じゅうなん",
        "meaning": "Mềm dẻo, linh hoạt",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "軟らかい",
        "reading": "やわらかい",
        "meaning": "Mềm nhũn",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "軟らか",
        "reading": "やわらか",
        "meaning": "Động từ của chữ 軟 (Nhuyễn)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_342",
    "stt": 342,
    "hang": 35,
    "kanji": "載",
    "hanViet": "Tải",
    "onyomi": [
      "さい"
    ],
    "kunyomi": [
      "の・せる",
      "の・る"
    ],
    "meaning": "đăng báo",
    "words": [
      {
        "word": "掲載",
        "reading": "けいさい",
        "meaning": "Đăng tải (bài viết)",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "載せる",
        "reading": "のせる",
        "meaning": "Chất lên xe",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "載る",
        "reading": "のる",
        "meaning": "Động từ của chữ 載 (Tải)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_343",
    "stt": 343,
    "hang": 35,
    "kanji": "輪",
    "hanViet": "Luân",
    "onyomi": [
      "りん"
    ],
    "kunyomi": [
      "わ"
    ],
    "meaning": "vòng tròn, bánh xe",
    "words": [
      {
        "word": "車輪",
        "reading": "しゃりん",
        "meaning": "Bánh xe",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "指輪",
        "reading": "ゆびわ",
        "meaning": "Nhẫn đeo tay",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "車輪する",
        "reading": "しゃりんする",
        "meaning": "Làm bánh xe",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_344",
    "stt": 344,
    "hang": 35,
    "kanji": "輩",
    "hanViet": "Bối",
    "onyomi": [
      "はい"
    ],
    "kunyomi": [
      "ともがら"
    ],
    "meaning": "bạn (học, làm)",
    "words": [
      {
        "word": "先輩",
        "reading": "せんぱい",
        "meaning": "Tiền bối",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "後輩",
        "reading": "こうはい",
        "meaning": "Hậu bối",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "先輩する",
        "reading": "せんぱいする",
        "meaning": "Làm tiền bối",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_345",
    "stt": 345,
    "hang": 35,
    "kanji": "追",
    "hanViet": "Truy",
    "onyomi": [
      "つい"
    ],
    "kunyomi": [
      "お・う"
    ],
    "meaning": "đuổi theo",
    "words": [
      {
        "word": "追加",
        "reading": "ついか",
        "meaning": "Thêm vào",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "追う",
        "reading": "おう",
        "meaning": "Đuổi theo",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_346",
    "stt": 346,
    "hang": 35,
    "kanji": "迷",
    "hanViet": "Mê",
    "onyomi": [
      "めい"
    ],
    "kunyomi": [
      "まよ・う"
    ],
    "meaning": "lạc đường",
    "words": [
      {
        "word": "迷惑",
        "reading": "めいわく",
        "meaning": "Làm phiền",
        "pos": "verb",
        "readingType": "on"
      },
      {
        "word": "迷う",
        "reading": "まよう",
        "meaning": "Lạc đường, phân vân",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "迷",
        "reading": "めい",
        "meaning": "Chữ 迷 (Mê): lạc đường",
        "pos": "noun",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_347",
    "stt": 347,
    "hang": 35,
    "kanji": "遭",
    "hanViet": "Tao",
    "onyomi": [
      "そう"
    ],
    "kunyomi": [
      "あ・う"
    ],
    "meaning": "gặp nạn",
    "words": [
      {
        "word": "遭難",
        "reading": "そうなん",
        "meaning": "Gặp nạn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "遭う",
        "reading": "あう",
        "meaning": "Bắt gặp, tao ngộ",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_348",
    "stt": 348,
    "hang": 35,
    "kanji": "避",
    "hanViet": "Tỵ",
    "onyomi": [
      "ひ"
    ],
    "kunyomi": [
      "さ・ける"
    ],
    "meaning": "tránh",
    "words": [
      {
        "word": "避難",
        "reading": "ひなん",
        "meaning": "Lánh nạn, sơ tán",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "避ける",
        "reading": "さける",
        "meaning": "Né tránh",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_349",
    "stt": 349,
    "hang": 35,
    "kanji": "邪",
    "hanViet": "Tà",
    "onyomi": [
      "じゃ"
    ],
    "kunyomi": [
      "よこしま"
    ],
    "meaning": "tà gian",
    "words": [
      {
        "word": "風邪",
        "reading": "かぜ",
        "meaning": "Cảm cúm",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "邪魔",
        "reading": "じゃま",
        "meaning": "Cản trở, quấy rầy",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "風邪する",
        "reading": "かぜする",
        "meaning": "Làm cảm cúm",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_350",
    "stt": 350,
    "hang": 35,
    "kanji": "郎",
    "hanViet": "Lang",
    "onyomi": [
      "ろう"
    ],
    "kunyomi": [
      "おとこ"
    ],
    "meaning": "chồng",
    "words": [
      {
        "word": "太郎",
        "reading": "たろう",
        "meaning": "Tên Taro",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "太郎する",
        "reading": "たろうする",
        "meaning": "Làm tên taro",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_351",
    "stt": 351,
    "hang": 36,
    "kanji": "郷",
    "hanViet": "Hương",
    "onyomi": [
      "きょう",
      "ごう"
    ],
    "kunyomi": [
      "さと"
    ],
    "meaning": "làng quê",
    "words": [
      {
        "word": "故郷",
        "reading": "こきょう",
        "meaning": "Quê hương",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "故郷する",
        "reading": "こきょうする",
        "meaning": "Làm quê hương",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_352",
    "stt": 352,
    "hang": 36,
    "kanji": "郵",
    "hanViet": "Bưu",
    "onyomi": [
      "ゆう"
    ],
    "kunyomi": [],
    "meaning": "bưu điện",
    "words": [
      {
        "word": "郵便局",
        "reading": "ゆうびんきょく",
        "meaning": "Bưu điện",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "郵送",
        "reading": "ゆうそう",
        "meaning": "Gửi qua bưu điện",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "郵便局する",
        "reading": "ゆうびんきょくする",
        "meaning": "Làm bưu điện",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_353",
    "stt": 353,
    "hang": 36,
    "kanji": "酢",
    "hanViet": "Tạc",
    "onyomi": [
      "さく"
    ],
    "kunyomi": [
      "す"
    ],
    "meaning": "giấm ăn",
    "words": [
      {
        "word": "お酢",
        "reading": "おす",
        "meaning": "Giấm ăn",
        "pos": "noun",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_354",
    "stt": 354,
    "hang": 36,
    "kanji": "針",
    "hanViet": "Châm",
    "onyomi": [
      "しん"
    ],
    "kunyomi": [
      "はり"
    ],
    "meaning": "cây kim",
    "words": [
      {
        "word": "方針",
        "reading": "ほうしん",
        "meaning": "Phương châm",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "針",
        "reading": "はり",
        "meaning": "Cây kim",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "方針する",
        "reading": "ほうしんする",
        "meaning": "Làm phương châm",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_355",
    "stt": 355,
    "hang": 36,
    "kanji": "釣",
    "hanViet": "Điếu",
    "onyomi": [
      "ちょう"
    ],
    "kunyomi": [
      "つ・る",
      "つり"
    ],
    "meaning": "câu cá",
    "words": [
      {
        "word": "釣り",
        "reading": "つり",
        "meaning": "Câu cá",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "お釣り",
        "reading": "おつり",
        "meaning": "Tiền thừa thối lại",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "釣る",
        "reading": "つる",
        "meaning": "Động từ của chữ 釣 (Điếu)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_356",
    "stt": 356,
    "hang": 36,
    "kanji": "鈴",
    "hanViet": "Linh",
    "onyomi": [
      "れい",
      "りん"
    ],
    "kunyomi": [
      "すず"
    ],
    "meaning": "cái chuông",
    "words": [
      {
        "word": "風鈴",
        "reading": "ふうりん",
        "meaning": "Chuông gió",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "鈴",
        "reading": "すず",
        "meaning": "Quả chuông, lục lạc",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "風鈴する",
        "reading": "ふうりんする",
        "meaning": "Làm chuông gió",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_357",
    "stt": 357,
    "hang": 36,
    "kanji": "銭",
    "hanViet": "Tiền",
    "onyomi": [
      "せん",
      "ぜん"
    ],
    "kunyomi": [
      "ぜに"
    ],
    "meaning": "tiền tệ",
    "words": [
      {
        "word": "金銭",
        "reading": "きんせん",
        "meaning": "Tiền nong",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "小銭",
        "reading": "こぜに",
        "meaning": "Tiền lẻ",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "金銭する",
        "reading": "きんせんする",
        "meaning": "Làm tiền nong",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_358",
    "stt": 358,
    "hang": 36,
    "kanji": "錠",
    "hanViet": "Đĩnh",
    "onyomi": [
      "じょう"
    ],
    "kunyomi": [],
    "meaning": "viên thuốc",
    "words": [
      {
        "word": "錠剤",
        "reading": "じょうざい",
        "meaning": "Thuốc viên",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "施錠",
        "reading": "せじょう",
        "meaning": "Khóa chốt cửa",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "錠剤する",
        "reading": "じょうざいする",
        "meaning": "Làm thuốc viên",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_359",
    "stt": 359,
    "hang": 36,
    "kanji": "鍵",
    "hanViet": "Kiện",
    "onyomi": [
      "けん"
    ],
    "kunyomi": [
      "かぎ"
    ],
    "meaning": "chìa khóa",
    "words": [
      {
        "word": "鍵",
        "reading": "かぎ",
        "meaning": "Chìa khóa",
        "pos": "noun",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_360",
    "stt": 360,
    "hang": 36,
    "kanji": "閣",
    "hanViet": "Các",
    "onyomi": [
      "かく"
    ],
    "kunyomi": [],
    "meaning": "nội các",
    "words": [
      {
        "word": "内閣",
        "reading": "ないかく",
        "meaning": "Nội các chính phủ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "内閣する",
        "reading": "ないかくする",
        "meaning": "Làm nội các chính phủ",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_361",
    "stt": 361,
    "hang": 37,
    "kanji": "闇",
    "hanViet": "Ám",
    "onyomi": [
      "あん"
    ],
    "kunyomi": [
      "やみ"
    ],
    "meaning": "màn đêm",
    "words": [
      {
        "word": "闇",
        "reading": "やみ",
        "meaning": "Bóng tối",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "暗闇",
        "reading": "くらやみ",
        "meaning": "Màn đêm u tối",
        "pos": "noun",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_362",
    "stt": 362,
    "hang": 37,
    "kanji": "闘",
    "hanViet": "Đấu",
    "onyomi": [
      "とう"
    ],
    "kunyomi": [
      "たたか・う"
    ],
    "meaning": "chiến đấu",
    "words": [
      {
        "word": "戦闘",
        "reading": "せんとう",
        "meaning": "Chiến đấu",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "闘う",
        "reading": "たたかう",
        "meaning": "Đấu tranh",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_363",
    "stt": 363,
    "hang": 37,
    "kanji": "防",
    "hanViet": "Phòng",
    "onyomi": [
      "ぼう"
    ],
    "kunyomi": [
      "ふせ・ぐ"
    ],
    "meaning": "ngăn ngừa",
    "words": [
      {
        "word": "防止",
        "reading": "ぼうし",
        "meaning": "Phòng chống",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "防ぐ",
        "reading": "ふせぐ",
        "meaning": "Ngăn ngừa",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_364",
    "stt": 364,
    "hang": 37,
    "kanji": "阪",
    "hanViet": "Phản",
    "onyomi": [
      "はん"
    ],
    "kunyomi": [
      "さか"
    ],
    "meaning": "cái dốc",
    "words": [
      {
        "word": "大阪",
        "reading": "おおさか",
        "meaning": "Thành phố Osaka",
        "pos": "noun",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_365",
    "stt": 365,
    "hang": 37,
    "kanji": "限",
    "hanViet": "Hạn",
    "onyomi": [
      "げん"
    ],
    "kunyomi": [
      "かぎ・る",
      "かぎ・り"
    ],
    "meaning": "giới hạn",
    "words": [
      {
        "word": "限界",
        "reading": "げんかい",
        "meaning": "Giới hạn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "限る",
        "reading": "かぎる",
        "meaning": "Chỉ giới hạn",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "限り",
        "reading": "かぎり",
        "meaning": "Động từ của chữ 限 (Hạn)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_366",
    "stt": 366,
    "hang": 37,
    "kanji": "除",
    "hanViet": "Trừ",
    "onyomi": [
      "じょ",
      "じ"
    ],
    "kunyomi": [
      "のぞ・く"
    ],
    "meaning": "loại trừ",
    "words": [
      {
        "word": "掃除",
        "reading": "そうじ",
        "meaning": "Dọn dẹp vệ sinh",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "除く",
        "reading": "のぞく",
        "meaning": "Loại trừ",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_367",
    "stt": 367,
    "hang": 37,
    "kanji": "陸",
    "hanViet": "Lục",
    "onyomi": [
      "りく",
      "ろく"
    ],
    "kunyomi": [
      "おか"
    ],
    "meaning": "đất liền",
    "words": [
      {
        "word": "着陸",
        "reading": "ちゃくりく",
        "meaning": "Hạ cánh",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "大陸",
        "reading": "たいりく",
        "meaning": "Đại lục",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "着陸する",
        "reading": "ちゃくりくする",
        "meaning": "Làm hạ cánh",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_368",
    "stt": 368,
    "hang": 37,
    "kanji": "階",
    "hanViet": "Giai",
    "onyomi": [
      "かい"
    ],
    "kunyomi": [],
    "meaning": "giai đoạn",
    "words": [
      {
        "word": "階段",
        "reading": "かいだん",
        "meaning": "Cầu thang",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "段階",
        "reading": "だんかい",
        "meaning": "Giai đoạn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "階段する",
        "reading": "かいだんする",
        "meaning": "Làm cầu thang",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_369",
    "stt": 369,
    "hang": 37,
    "kanji": "隅",
    "hanViet": "Ôi, Ngung",
    "onyomi": [
      "ぐう"
    ],
    "kunyomi": [
      "すみ"
    ],
    "meaning": "góc, xó",
    "words": [
      {
        "word": "隅",
        "reading": "すみ",
        "meaning": "Góc xó",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "片隅",
        "reading": "かたすみ",
        "meaning": "Một góc nhỏ",
        "pos": "noun",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_370",
    "stt": 370,
    "hang": 37,
    "kanji": "隠",
    "hanViet": "Ẩn",
    "onyomi": [
      "いん",
      "おん"
    ],
    "kunyomi": [
      "かく・す",
      "かく・れる"
    ],
    "meaning": "che giấu",
    "words": [
      {
        "word": "隠す",
        "reading": "かくす",
        "meaning": "Giấu giếm",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "隠れる",
        "reading": "かくれる",
        "meaning": "Trốn ẩn",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "隠",
        "reading": "いん",
        "meaning": "Chữ 隠 (Ẩn): che giấu",
        "pos": "noun",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_371",
    "stt": 371,
    "hang": 38,
    "kanji": "雇",
    "hanViet": "Cố",
    "onyomi": [
      "こ"
    ],
    "kunyomi": [
      "やと・う"
    ],
    "meaning": "thuê mướn",
    "words": [
      {
        "word": "雇用",
        "reading": "こよう",
        "meaning": "Thuê mướn lao động",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "雇う",
        "reading": "やとう",
        "meaning": "Tuyển dụng, thuê",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_372",
    "stt": 372,
    "hang": 38,
    "kanji": "雰",
    "hanViet": "Phân",
    "onyomi": [
      "ふん"
    ],
    "kunyomi": [],
    "meaning": "bầu không khí",
    "words": [
      {
        "word": "雰囲気",
        "reading": "ふんいき",
        "meaning": "Bầu không khí",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "雰囲気する",
        "reading": "ふんいきする",
        "meaning": "Làm bầu không khí",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_373",
    "stt": 373,
    "hang": 38,
    "kanji": "雷",
    "hanViet": "Lôi",
    "onyomi": [
      "らい"
    ],
    "kunyomi": [
      "かみなり"
    ],
    "meaning": "sấm chớp",
    "words": [
      {
        "word": "雷",
        "reading": "かみなり",
        "meaning": "Sấm sét",
        "pos": "noun",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_374",
    "stt": 374,
    "hang": 38,
    "kanji": "革",
    "hanViet": "Cách",
    "onyomi": [
      "かく"
    ],
    "kunyomi": [
      "かわ"
    ],
    "meaning": "cải cách",
    "words": [
      {
        "word": "改革",
        "reading": "かいかく",
        "meaning": "Cải cách",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "革靴",
        "reading": "かわぐつ",
        "meaning": "Giày da",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "改革する",
        "reading": "かいかくする",
        "meaning": "Làm cải cách",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_375",
    "stt": 375,
    "hang": 38,
    "kanji": "靴",
    "hanViet": "Ngoa",
    "onyomi": [
      "か"
    ],
    "kunyomi": [
      "くつ"
    ],
    "meaning": "đôi giày",
    "words": [
      {
        "word": "靴",
        "reading": "くつ",
        "meaning": "Đôi giày",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "靴下",
        "reading": "くつした",
        "meaning": "Đôi tất",
        "pos": "noun",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_376",
    "stt": 376,
    "hang": 38,
    "kanji": "韓",
    "hanViet": "Hàn",
    "onyomi": [
      "かん"
    ],
    "kunyomi": [],
    "meaning": "Hàn Quốc",
    "words": [
      {
        "word": "韓国",
        "reading": "かんこく",
        "meaning": "Hàn Quốc",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "韓国する",
        "reading": "かんこくする",
        "meaning": "Làm hàn quốc",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_377",
    "stt": 377,
    "hang": 38,
    "kanji": "響",
    "hanViet": "Hưởng",
    "onyomi": [
      "きょう"
    ],
    "kunyomi": [
      "ひび・く"
    ],
    "meaning": "ảnh hưởng",
    "words": [
      {
        "word": "影響",
        "reading": "えいきょう",
        "meaning": "Ảnh hưởng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "響く",
        "reading": "ひびく",
        "meaning": "Vang vọng",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_378",
    "stt": 378,
    "hang": 38,
    "kanji": "頂",
    "hanViet": "Đỉnh",
    "onyomi": [
      "ちょう"
    ],
    "kunyomi": [
      "いただ・く",
      "いただき"
    ],
    "meaning": "đỉnh cao",
    "words": [
      {
        "word": "山頂",
        "reading": "さんちょう",
        "meaning": "Đỉnh núi",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "頂く",
        "reading": "いただく",
        "meaning": "Xin nhận (khiêm nhường)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_379",
    "stt": 379,
    "hang": 38,
    "kanji": "頃",
    "hanViet": "Khoảnh",
    "onyomi": [
      "けい",
      "きょう"
    ],
    "kunyomi": [
      "ころ",
      "ごろ"
    ],
    "meaning": "khoảnh khắc",
    "words": [
      {
        "word": "近頃",
        "reading": "ちかごろ",
        "meaning": "Dạo gần đây",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "日頃",
        "reading": "ひごろ",
        "meaning": "Hàng ngày",
        "pos": "noun",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_380",
    "stt": 380,
    "hang": 38,
    "kanji": "順",
    "hanViet": "Thuận",
    "onyomi": [
      "じゅん"
    ],
    "kunyomi": [],
    "meaning": "thứ tự",
    "words": [
      {
        "word": "順番",
        "reading": "じゅんばん",
        "meaning": "Thứ tự",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "順調",
        "reading": "じゅんちょう",
        "meaning": "Thuận lợi",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "順番する",
        "reading": "じゅんばんする",
        "meaning": "Làm thứ tự",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_381",
    "stt": 381,
    "hang": 39,
    "kanji": "領",
    "hanViet": "Lãnh, lĩnh",
    "onyomi": [
      "りょう"
    ],
    "kunyomi": [],
    "meaning": "thống suất",
    "words": [
      {
        "word": "領収書",
        "reading": "りょうしゅうしょ",
        "meaning": "Biên lai thu tiền",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "占領",
        "reading": "せんりょう",
        "meaning": "Chiếm lĩnh",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "領収書する",
        "reading": "りょうしゅうしょする",
        "meaning": "Làm biên lai thu tiền",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_382",
    "stt": 382,
    "hang": 39,
    "kanji": "頼",
    "hanViet": "Lại",
    "onyomi": [
      "らい"
    ],
    "kunyomi": [
      "たの・む",
      "たの・もしい",
      "たよ・る"
    ],
    "meaning": "nhờ, tin cậy",
    "words": [
      {
        "word": "信頼",
        "reading": "しんらい",
        "meaning": "Tin cậy",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "頼む",
        "reading": "たのむ",
        "meaning": "Nhờ vả",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "頼もしい",
        "reading": "たのもしい",
        "meaning": "Động từ của chữ 頼 (Lại)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "頼る",
        "reading": "たよる",
        "meaning": "Dựa dẫm, phụ thuộc",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_383",
    "stt": 383,
    "hang": 39,
    "kanji": "飼",
    "hanViet": "Tự",
    "onyomi": [
      "し"
    ],
    "kunyomi": [
      "か・う"
    ],
    "meaning": "nuôi con vật",
    "words": [
      {
        "word": "飼う",
        "reading": "かう",
        "meaning": "Nuôi thú cưng",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "飼い主",
        "reading": "かいぬし",
        "meaning": "Chủ nuôi",
        "pos": "noun",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_384",
    "stt": 384,
    "hang": 39,
    "kanji": "飽",
    "hanViet": "Bão",
    "onyomi": [
      "ほう"
    ],
    "kunyomi": [
      "あ・きる",
      "あ・かす"
    ],
    "meaning": "ngán, chán",
    "words": [
      {
        "word": "飽きる",
        "reading": "あきる",
        "meaning": "Phát chán, ngấy",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "飽かす",
        "reading": "あかす",
        "meaning": "Động từ của chữ 飽 (Bão)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "飽",
        "reading": "ほう",
        "meaning": "Chữ 飽 (Bão): ngán, chán",
        "pos": "noun",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_385",
    "stt": 385,
    "hang": 39,
    "kanji": "養",
    "hanViet": "Dưỡng",
    "onyomi": [
      "よう",
      "りょう"
    ],
    "kunyomi": [
      "やしな・う"
    ],
    "meaning": "nuôi dưỡng",
    "words": [
      {
        "word": "教養",
        "reading": "きょうよう",
        "meaning": "Giáo dưỡng, học thức",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "養う",
        "reading": "やしなう",
        "meaning": "Nuôi nấng",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_386",
    "stt": 386,
    "hang": 39,
    "kanji": "餌",
    "hanViet": "Nhĩ",
    "onyomi": [
      "じ",
      "に"
    ],
    "kunyomi": [
      "え",
      "えば"
    ],
    "meaning": "đồ ăn động vật",
    "words": [
      {
        "word": "餌",
        "reading": "えさ",
        "meaning": "Mồi, thức ăn cho thú",
        "pos": "noun",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_387",
    "stt": 387,
    "hang": 39,
    "kanji": "餅",
    "hanViet": "Bính",
    "onyomi": [
      "へい",
      "ひょう"
    ],
    "kunyomi": [
      "もち"
    ],
    "meaning": "bánh",
    "words": [
      {
        "word": "お餅",
        "reading": "おもち",
        "meaning": "Bánh mochi",
        "pos": "noun",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_388",
    "stt": 388,
    "hang": 39,
    "kanji": "香",
    "hanViet": "Hương",
    "onyomi": [
      "こう",
      "きょう"
    ],
    "kunyomi": [
      "か",
      "かお・る",
      "かお・り"
    ],
    "meaning": "hương thơm",
    "words": [
      {
        "word": "香水",
        "reading": "こうすい",
        "meaning": "Nước hoa",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "香り",
        "reading": "かおり",
        "meaning": "Mùi thơm",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "香る",
        "reading": "かおる",
        "meaning": "Động từ của chữ 香 (Hương)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_389",
    "stt": 389,
    "hang": 39,
    "kanji": "駆",
    "hanViet": "Khu",
    "onyomi": [
      "く"
    ],
    "kunyomi": [
      "か・ける",
      "か・る"
    ],
    "meaning": "chạy mau tới",
    "words": [
      {
        "word": "先駆者",
        "reading": "せんくしゃ",
        "meaning": "Người tiên phong",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "駆け足",
        "reading": "かけあし",
        "meaning": "Chạy nhanh",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "駆ける",
        "reading": "かける",
        "meaning": "Động từ của chữ 駆 (Khu)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "駆る",
        "reading": "かる",
        "meaning": "Động từ của chữ 駆 (Khu)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_390",
    "stt": 390,
    "hang": 39,
    "kanji": "駄",
    "hanViet": "Đà",
    "onyomi": [
      "だ"
    ],
    "kunyomi": [],
    "meaning": "phẩm chất xấu",
    "words": [
      {
        "word": "無駄",
        "reading": "むだ",
        "meaning": "Lãng phí, vô ích",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "駄目",
        "reading": "だめ",
        "meaning": "Không được",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "無駄する",
        "reading": "むだする",
        "meaning": "Làm lãng phí, vô ích",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_391",
    "stt": 391,
    "hang": 40,
    "kanji": "驚",
    "hanViet": "Kinh",
    "onyomi": [
      "きょう"
    ],
    "kunyomi": [
      "おどろ・く",
      "おどろ・かす"
    ],
    "meaning": "kinh ngạc",
    "words": [
      {
        "word": "驚く",
        "reading": "おどろく",
        "meaning": "Ngạc nhiên",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "驚異",
        "reading": "きょうい",
        "meaning": "Kinh dị, phi thường",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "驚かす",
        "reading": "おどろかす",
        "meaning": "Làm giật mình, làm kinh ngạc",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_392",
    "stt": 392,
    "hang": 40,
    "kanji": "骨",
    "hanViet": "Cốt",
    "onyomi": [
      "こつ"
    ],
    "kunyomi": [
      "ほね"
    ],
    "meaning": "xương",
    "words": [
      {
        "word": "骨折",
        "reading": "こっせつ",
        "meaning": "Gãy xương",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "骨",
        "reading": "ほね",
        "meaning": "Khung xương",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "骨折する",
        "reading": "こっせつする",
        "meaning": "Làm gãy xương",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_393",
    "stt": 393,
    "hang": 40,
    "kanji": "鬼",
    "hanViet": "Quỷ",
    "onyomi": [
      "き"
    ],
    "kunyomi": [
      "おに"
    ],
    "meaning": "ma quỷ",
    "words": [
      {
        "word": "鬼",
        "reading": "おに",
        "meaning": "Con quỷ",
        "pos": "noun",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_394",
    "stt": 394,
    "hang": 40,
    "kanji": "魂",
    "hanViet": "Hồn",
    "onyomi": [
      "こん"
    ],
    "kunyomi": [
      "たましい",
      "たま"
    ],
    "meaning": "linh hồn",
    "words": [
      {
        "word": "魂",
        "reading": "たましい",
        "meaning": "Linh hồn",
        "pos": "noun",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_395",
    "stt": 395,
    "hang": 40,
    "kanji": "魅",
    "hanViet": "Mị",
    "onyomi": [
      "み"
    ],
    "kunyomi": [],
    "meaning": "say mê",
    "words": [
      {
        "word": "魅力",
        "reading": "みりょく",
        "meaning": "Sức quyến rũ, sức hút",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "魅力する",
        "reading": "みりょくする",
        "meaning": "Làm sức quyến rũ, sức hút",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_396",
    "stt": 396,
    "hang": 40,
    "kanji": "魔",
    "hanViet": "Ma",
    "onyomi": [
      "ま"
    ],
    "kunyomi": [],
    "meaning": "ma quỷ, hồn ma",
    "words": [
      {
        "word": "邪魔",
        "reading": "じゃま",
        "meaning": "Quấy rầy",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "魔法",
        "reading": "まほう",
        "meaning": "Ma thuật",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "邪魔する",
        "reading": "じゃまする",
        "meaning": "Làm quấy rầy",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_397",
    "stt": 397,
    "hang": 40,
    "kanji": "鮮",
    "hanViet": "Tiên",
    "onyomi": [
      "せん"
    ],
    "kunyomi": [
      "あざ・やか"
    ],
    "meaning": "tươi",
    "words": [
      {
        "word": "新鮮",
        "reading": "しんせん",
        "meaning": "Tươi sống",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "鮮やか",
        "reading": "あざやか",
        "meaning": "Rực rỡ",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "新鮮する",
        "reading": "しんせんする",
        "meaning": "Làm tươi sống",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_398",
    "stt": 398,
    "hang": 40,
    "kanji": "鳴",
    "hanViet": "Minh",
    "onyomi": [
      "めい"
    ],
    "kunyomi": [
      "な・く",
      "な・る",
      "な・らす"
    ],
    "meaning": "kêu, hót",
    "words": [
      {
        "word": "悲鳴",
        "reading": "ひめい",
        "meaning": "Tiếng kêu la",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "鳴る",
        "reading": "なる",
        "meaning": "Rung chuông, reo",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "鳴く",
        "reading": "なく",
        "meaning": "Động từ của chữ 鳴 (Minh)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "鳴らす",
        "reading": "ならす",
        "meaning": "Động từ của chữ 鳴 (Minh)",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_399",
    "stt": 399,
    "hang": 40,
    "kanji": "黙",
    "hanViet": "Mặc",
    "onyomi": [
      "もく",
      "ぼく"
    ],
    "kunyomi": [
      "だま・る"
    ],
    "meaning": "im lặng",
    "words": [
      {
        "word": "沈黙",
        "reading": "ちんもく",
        "meaning": "Trầm mặc, im lặng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "黙る",
        "reading": "だまる",
        "meaning": "Nín lặng, im bặt",
        "pos": "verb",
        "readingType": "kun"
      }
    ]
  },
  {
    "id": "k402_400",
    "stt": 400,
    "hang": 40,
    "kanji": "鼻",
    "hanViet": "Tỵ",
    "onyomi": [
      "び"
    ],
    "kunyomi": [
      "はな"
    ],
    "meaning": "cái mũi",
    "words": [
      {
        "word": "耳鼻科",
        "reading": "じびか",
        "meaning": "Khoa tai mũi",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "鼻",
        "reading": "はな",
        "meaning": "Cái mũi",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "耳鼻科する",
        "reading": "じびかする",
        "meaning": "Làm khoa tai mũi",
        "pos": "verb",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_401",
    "stt": 401,
    "hang": 41,
    "kanji": "竜",
    "hanViet": "Long",
    "onyomi": [
      "りゅう",
      "りょう"
    ],
    "kunyomi": [
      "たつ"
    ],
    "meaning": "con rồng",
    "words": [
      {
        "word": "竜",
        "reading": "りゅう",
        "meaning": "Con rồng",
        "pos": "noun",
        "readingType": "on"
      }
    ]
  },
  {
    "id": "k402_402",
    "stt": 402,
    "hang": 41,
    "kanji": "亀",
    "hanViet": "Qui",
    "onyomi": [
      "き",
      "きゅう",
      "きん"
    ],
    "kunyomi": [
      "かめ"
    ],
    "meaning": "con rùa",
    "words": [
      {
        "word": "亀",
        "reading": "かめ",
        "meaning": "Con rùa",
        "pos": "noun",
        "readingType": "kun"
      }
    ]
  }
];
