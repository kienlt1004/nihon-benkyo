export interface KanjiWordExample {
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

export const dongDuKanjiList: DongDuKanjiItem[] = [
  {
    "id": "k-1-1",
    "kanji": "与",
    "hanViet": "DỮ, DỰ",
    "onyomi": [
      "よ"
    ],
    "kunyomi": [
      "あた・える"
    ],
    "meaning": "Ban cho, cung cấp, gây ra",
    "radical": "一 (Nhất)",
    "radicalMeaning": "Một nét ngang",
    "strokeCount": 3,
    "mnemonic": "Một (一) tay đưa ra chia cho người khác điều gì đó.",
    "words": [
      {
        "word": "与える",
        "reading": "あたえる",
        "meaning": "Ban tặng, gây ra (ảnh hưởng)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "給与",
        "reading": "きゅうよ",
        "meaning": "Tiền lương, thù lao",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "関与",
        "reading": "かんよ",
        "meaning": "Dính líu, can dự vào",
        "pos": "noun",
        "readingType": "on"
      }
    ],
    "col": 1,
    "row": 1,
    "order": 1
  },
  {
    "id": "k-1-2",
    "kanji": "任",
    "hanViet": "NHIỆM",
    "onyomi": [
      "にん"
    ],
    "kunyomi": [
      "まか・せる",
      "まか・す"
    ],
    "meaning": "Giao phó, đảm nhiệm, nhiệm vụ",
    "radical": "亻 (Nhân đứng)",
    "radicalMeaning": "Con người",
    "strokeCount": 6,
    "mnemonic": "Người (亻) vác trên vai gánh nặng (壬) chính là đảm nhiệm trách nhiệm.",
    "words": [
      {
        "word": "任せる",
        "reading": "まかせる",
        "meaning": "Giao phó, phó thác",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "責任",
        "reading": "せきにん",
        "meaning": "Trách nhiệm",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "辞任",
        "reading": "じにん",
        "meaning": "Từ chức",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "任す",
        "reading": "まかす",
        "meaning": "Đánh bại, vượt qua",
        "pos": "verb",
        "readingType": "kun"
      }
    ],
    "col": 1,
    "row": 2,
    "order": 2
  },
  {
    "id": "k-1-3",
    "kanji": "個",
    "hanViet": "CÁ",
    "onyomi": [
      "こ",
      "か"
    ],
    "kunyomi": [],
    "meaning": "Cá nhân, cái, chiếc",
    "radical": "亻 (Nhân đứng)",
    "radicalMeaning": "Con người",
    "strokeCount": 10,
    "mnemonic": "Mỗi người (亻) cố thủ trong một cái thành kiên cố (固) là một cá nhân riêng biệt.",
    "words": [
      {
        "word": "個人",
        "reading": "こじん",
        "meaning": "Cá nhân",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "個性",
        "reading": "こせい",
        "meaning": "Cá tính",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "一個",
        "reading": "いっこ",
        "meaning": "Một cái/chiếc",
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
    ],
    "col": 1,
    "row": 3,
    "order": 3
  },
  {
    "id": "k-1-4",
    "kanji": "儀",
    "hanViet": "NGHI",
    "onyomi": [
      "ぎ"
    ],
    "kunyomi": [],
    "meaning": "Lễ nghi, quy tắc, dáng vẻ",
    "radical": "亻 (Nhân đứng)",
    "radicalMeaning": "Con người",
    "strokeCount": 15,
    "mnemonic": "Người (亻) hành xử hợp với nghĩa cử (義) là người trọng lễ nghi.",
    "words": [
      {
        "word": "礼儀",
        "reading": "れいぎ",
        "meaning": "Lễ nghi, phép lịch sự",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "行事",
        "reading": "ぎょうじ",
        "meaning": "Sự kiện, nghi lễ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "儀式",
        "reading": "ぎしき",
        "meaning": "Nghi thức, buổi lễ",
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
    ],
    "col": 1,
    "row": 4,
    "order": 4
  },
  {
    "id": "k-1-5",
    "kanji": "刑",
    "hanViet": "HÌNH",
    "onyomi": [
      "けい"
    ],
    "kunyomi": [],
    "meaning": "Hình phạt, án phạt",
    "radical": "刂 (Đao)",
    "radicalMeaning": "Con dao, vũ khí",
    "strokeCount": 6,
    "mnemonic": "Khung hình (开) bị con dao (刂) trừng trị, tức là chịu hình phạt.",
    "words": [
      {
        "word": "刑務所",
        "reading": "けいむしょ",
        "meaning": "Nhà tù, trại giam",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "死刑",
        "reading": "しけい",
        "meaning": "Tử hình",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "刑事",
        "reading": "けいじ",
        "meaning": "Cảnh sát hình sự",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "刑務所する",
        "reading": "けいむしょする",
        "meaning": "Làm nhà tù, trại giam",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 1,
    "row": 5,
    "order": 5
  },
  {
    "id": "k-1-6",
    "kanji": "劇",
    "hanViet": "KỊCH",
    "onyomi": [
      "げき"
    ],
    "kunyomi": [],
    "meaning": "Vở kịch, kịch liệt",
    "radical": "刂 (Đao)",
    "radicalMeaning": "Con dao, đao",
    "strokeCount": 15,
    "mnemonic": "Con hổ (虍) và lợn rừng (豕) cầm đao (刂) đấu nhau như diễn một vở kịch lớn.",
    "words": [
      {
        "word": "劇場",
        "reading": "げきじょう",
        "meaning": "Nhà hát, rạp kịch",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "悲劇",
        "reading": "ひげき",
        "meaning": "Bi kịch",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "劇的",
        "reading": "げきてき",
        "meaning": "Kịch tính, đột ngột",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "劇場する",
        "reading": "げきじょうする",
        "meaning": "Làm nhà hát, rạp kịch",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 1,
    "row": 6,
    "order": 6
  },
  {
    "id": "k-1-7",
    "kanji": "博",
    "hanViet": "BÁC",
    "onyomi": [
      "はく",
      "ばく"
    ],
    "kunyomi": [],
    "meaning": "Rộng lớn, bác học, triển lãm",
    "radical": "十 (Thập)",
    "radicalMeaning": "Số mười",
    "strokeCount": 12,
    "mnemonic": "Mười (十) lĩnh vực đều biết rõ ràng chuyên sâu chính là bác sĩ, bác học.",
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
        "reading": "はかせ / はくし",
        "meaning": "Tiến sĩ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "博覧会",
        "reading": "はくらんかい",
        "meaning": "Hội chợ triển lãm",
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
    ],
    "col": 1,
    "row": 7,
    "order": 7
  },
  {
    "id": "k-1-8",
    "kanji": "各",
    "hanViet": "CÁC",
    "onyomi": [
      "かく"
    ],
    "kunyomi": [
      "おの・おの"
    ],
    "meaning": "Mỗi, từng, các",
    "radical": "口 (Khẩu)",
    "radicalMeaning": "Cái miệng",
    "strokeCount": 6,
    "mnemonic": "Dưới bước chân (夂) mỗi người đều cất lên một miệng (口) nói khác nhau.",
    "words": [
      {
        "word": "各自",
        "reading": "かくじ",
        "meaning": "Mỗi người, từng người",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "各国",
        "reading": "かっこく",
        "meaning": "Các quốc gia",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "各地",
        "reading": "かくち",
        "meaning": "Các vùng miền",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "各おの",
        "reading": "おのおの",
        "meaning": "Động từ của chữ 各 (CÁC)",
        "pos": "verb",
        "readingType": "kun"
      }
    ],
    "col": 1,
    "row": 8,
    "order": 8
  },
  {
    "id": "k-1-9",
    "kanji": "囲",
    "hanViet": "VI",
    "onyomi": [
      "い"
    ],
    "kunyomi": [
      "かこ・む",
      "かこ・う"
    ],
    "meaning": "Bao quanh, vây quanh",
    "radical": "囗 (Vi)",
    "radicalMeaning": "Vây tròn bên ngoài",
    "strokeCount": 7,
    "mnemonic": "Khung tường thành (囗) vây lấy chữ giếng (井 bên trong).",
    "words": [
      {
        "word": "囲む",
        "reading": "かこむ",
        "meaning": "Bao quanh, vây quanh",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "周囲",
        "reading": "しゅうい",
        "meaning": "Xung quanh, chu vi",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "雰囲気",
        "reading": "ふんいき",
        "meaning": "Bầu không khí",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "囲う",
        "reading": "かこう",
        "meaning": "Động từ của chữ 囲 (VI)",
        "pos": "verb",
        "readingType": "kun"
      }
    ],
    "col": 1,
    "row": 9,
    "order": 9
  },
  {
    "id": "k-1-10",
    "kanji": "塾",
    "hanViet": "THỤC",
    "onyomi": [
      "じゅく"
    ],
    "kunyomi": [],
    "meaning": "Lớp học thêm, tư thục",
    "radical": "土 (Thổ)",
    "radicalMeaning": "Đất đai",
    "strokeCount": 14,
    "mnemonic": "Nơi nấu nướng rèn luyện (熟) tri thức trên nền đất (土) là trường tư thục.",
    "words": [
      {
        "word": "学習塾",
        "reading": "がくしゅうじゅく",
        "meaning": "Lớp học thêm",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "塾生",
        "reading": "じゅくせい",
        "meaning": "Học sinh trường tư thục",
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
    ],
    "col": 1,
    "row": 10,
    "order": 10
  },
  {
    "id": "k-2-1",
    "kanji": "且",
    "hanViet": "THẢ",
    "onyomi": [
      "しょ",
      "そ"
    ],
    "kunyomi": [
      "か・つ"
    ],
    "meaning": "Hơn nữa, vả lại",
    "radical": "一 (Nhất)",
    "radicalMeaning": "Một nét",
    "strokeCount": 5,
    "mnemonic": "Hình cái kệ nhiều tầng xếp chồng lên nhau, vừa thế này 'lại còn' thế khác.",
    "words": [
      {
        "word": "且つ",
        "reading": "かつ",
        "meaning": "Và, vả lại, đồng thời",
        "pos": "verb",
        "readingType": "kun"
      }
    ],
    "col": 2,
    "row": 1,
    "order": 11
  },
  {
    "id": "k-2-2",
    "kanji": "仰",
    "hanViet": "NGƯỠNG",
    "onyomi": [
      "ぎょう",
      "こう"
    ],
    "kunyomi": [
      "あお・ぐ",
      "おお・せ"
    ],
    "meaning": "Ngước nhìn, tôn kính, ngưỡng mộ",
    "radical": "亻 (Nhân đứng)",
    "radicalMeaning": "Con người",
    "strokeCount": 6,
    "mnemonic": "Người (亻) hướng về dấu hiệu lệnh (卬) thể hiện lòng kính ngưỡng ngước lên.",
    "words": [
      {
        "word": "仰ぐ",
        "reading": "あおぐ",
        "meaning": "Ngước nhìn lên, thỉnh thị",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "信仰",
        "reading": "しんこう",
        "meaning": "Tín ngưỡng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "仰天",
        "reading": "ぎょうてん",
        "meaning": "Kinh ngạc, giật bắn mình",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "仰せ",
        "reading": "おおせ",
        "meaning": "Động từ của chữ 仰 (NGƯỠNG)",
        "pos": "verb",
        "readingType": "kun"
      }
    ],
    "col": 2,
    "row": 2,
    "order": 12
  },
  {
    "id": "k-2-3",
    "kanji": "修",
    "hanViet": "TU",
    "onyomi": [
      "しゅう",
      "しゅ"
    ],
    "kunyomi": [
      "おさ・める",
      "おさ・まる"
    ],
    "meaning": "Tu sửa, rèn luyện, học tập",
    "radical": "亻 (Nhân đứng)",
    "radicalMeaning": "Con người",
    "strokeCount": 10,
    "mnemonic": "Người (亻) cần mẫn gọt giũa lông đuôi tóc (彡) để tu thân sửa mình.",
    "words": [
      {
        "word": "修理",
        "reading": "しゅうり",
        "meaning": "Sửa chữa",
        "pos": "verb",
        "readingType": "on"
      },
      {
        "word": "修学旅行",
        "reading": "しゅうがくりょこう",
        "meaning": "Chuyến du lịch học tập",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "研修",
        "reading": "けんしゅう",
        "meaning": "Tu nghiệp, tập huấn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "修める",
        "reading": "おさめる",
        "meaning": "Sửa chữa, tu dưỡng, cai trị",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "修まる",
        "reading": "おさまる",
        "meaning": "Lắng xuống, yên ổn",
        "pos": "verb",
        "readingType": "kun"
      }
    ],
    "col": 2,
    "row": 3,
    "order": 13
  },
  {
    "id": "k-2-4",
    "kanji": "償",
    "hanViet": "THƯỜNG",
    "onyomi": [
      "しょう"
    ],
    "kunyomi": [
      "つぐな・う"
    ],
    "meaning": "Bồi thường, đền bù",
    "radical": "亻 (Nhân đứng)",
    "radicalMeaning": "Con người",
    "strokeCount": 17,
    "mnemonic": "Người (亻) trao giải thưởng tiền vỏ sò (賞) để bồi thường thiệt hại.",
    "words": [
      {
        "word": "償う",
        "reading": "つぐなう",
        "meaning": "Bồi thường, chuộc tội",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "補償",
        "reading": "ほしょう",
        "meaning": "Đền bù, bồi thường",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "弁償",
        "reading": "べんしょう",
        "meaning": "Bồi hoàn tài sản",
        "pos": "noun",
        "readingType": "on"
      }
    ],
    "col": 2,
    "row": 4,
    "order": 14
  },
  {
    "id": "k-2-5",
    "kanji": "判",
    "hanViet": "PHÁN",
    "onyomi": [
      "はん",
      "ばん"
    ],
    "kunyomi": [],
    "meaning": "Phán quyết, con dấu, phân biệt",
    "radical": "刂 (Đao)",
    "radicalMeaning": "Con dao",
    "strokeCount": 7,
    "mnemonic": "Dùng dao (刂) chia đôi một nửa (半) để phán xử trắng đen rõ ràng.",
    "words": [
      {
        "word": "判断",
        "reading": "はんだん",
        "meaning": "Phán đoán, nhận định",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "裁判",
        "reading": "さいばん",
        "meaning": "Xét xử, phiên tòa",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "判子",
        "reading": "はんこ",
        "meaning": "Con dấu cá nhân",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "判断する",
        "reading": "はんだんする",
        "meaning": "Làm phán đoán, nhận định",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 2,
    "row": 5,
    "order": 15
  },
  {
    "id": "k-2-6",
    "kanji": "労",
    "hanViet": "LAO",
    "onyomi": [
      "ろう"
    ],
    "kunyomi": [
      "ねぎら・う"
    ],
    "meaning": "Lao động, mệt nhọc, cảm ơn công sức",
    "radical": "力 (Lực)",
    "radicalMeaning": "Sức lực",
    "strokeCount": 7,
    "mnemonic": "Dưới ngọn đuốc lập lòe (𤇾) dồn hết sức lực (力) để làm việc lao nhọc.",
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
        "meaning": "Gian khổ, vất vả",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "ご苦労様",
        "reading": "ごくろうさま",
        "meaning": "Cảm ơn bạn đã vất vả",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "労う",
        "reading": "ねぎらう",
        "meaning": "Cảm kích công lao, an ủi",
        "pos": "verb",
        "readingType": "kun"
      }
    ],
    "col": 2,
    "row": 6,
    "order": 16
  },
  {
    "id": "k-2-7",
    "kanji": "占",
    "hanViet": "CHIÊM, CHIẾM",
    "onyomi": [
      "せん"
    ],
    "kunyomi": [
      "うらな・う",
      "し・める"
    ],
    "meaning": "Bói toán, chiếm giữ, chiếm lĩnh",
    "radical": "卜 (Bốc)",
    "radicalMeaning": "Bói toán",
    "strokeCount": 5,
    "mnemonic": "Xem quẻ bói (卜) bằng miệng (口) đọc chiêm nghiệm, hoặc chiếm cứ vị trí.",
    "words": [
      {
        "word": "占める",
        "reading": "しめる",
        "meaning": "Chiếm (tỷ lệ, vị trí)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "占い",
        "reading": "うらない",
        "meaning": "Bói toán",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "独占",
        "reading": "どくせん",
        "meaning": "Độc chiếm",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "占う",
        "reading": "うらなう",
        "meaning": "Bói toán, tiên đoán",
        "pos": "verb",
        "readingType": "kun"
      }
    ],
    "col": 2,
    "row": 7,
    "order": 17
  },
  {
    "id": "k-2-8",
    "kanji": "叫",
    "hanViet": "KHIẾU",
    "onyomi": [
      "きょう"
    ],
    "kunyomi": [
      "さけ・ぶ"
    ],
    "meaning": "Kêu la, gào thét",
    "radical": "口 (Khẩu)",
    "radicalMeaning": "Cái miệng",
    "strokeCount": 6,
    "mnemonic": "Cái miệng (口) ngoác rộng gấp mười (丩) lần để gào thét.",
    "words": [
      {
        "word": "叫ぶ",
        "reading": "さけぶ",
        "meaning": "Gào lên, hét to",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "叫び声",
        "reading": "さけびごえ",
        "meaning": "Tiếng la hét",
        "pos": "noun",
        "readingType": "kun"
      }
    ],
    "col": 2,
    "row": 8,
    "order": 18
  },
  {
    "id": "k-2-9",
    "kanji": "圧",
    "hanViet": "ÁP",
    "onyomi": [
      "あつ"
    ],
    "kunyomi": [],
    "meaning": "Áp lực, đè nén",
    "radical": "土 (Thổ)",
    "radicalMeaning": "Đất",
    "strokeCount": 5,
    "mnemonic": "Dưới vách đá cheo leo (厂), một hòn đất (土) bị đè nén áp lực lớn.",
    "words": [
      {
        "word": "圧力",
        "reading": "あつりょく",
        "meaning": "Áp lực",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "血圧",
        "reading": "けつあつ",
        "meaning": "Huyết áp",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "圧倒的",
        "reading": "あっとうてき",
        "meaning": "Áp đảo, vượt trội",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "圧力する",
        "reading": "あつりょくする",
        "meaning": "Làm áp lực",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 2,
    "row": 9,
    "order": 19
  },
  {
    "id": "k-2-10",
    "kanji": "奇",
    "hanViet": "KỲ",
    "onyomi": [
      "き"
    ],
    "kunyomi": [],
    "meaning": "Kỳ lạ, kỳ diệu, số lẻ",
    "radical": "大 (Đại)",
    "radicalMeaning": "To lớn",
    "strokeCount": 8,
    "mnemonic": "Người to lớn (大) có hành động khả nghi (可) thật là kỳ quái.",
    "words": [
      {
        "word": "奇跡",
        "reading": "きせき",
        "meaning": "Phép màu, kỳ tích",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "奇妙",
        "reading": "きみょう",
        "meaning": "Kỳ lạ, kỳ dị",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "好奇心",
        "reading": "こうきしん",
        "meaning": "Lòng hiếu kỳ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "奇跡する",
        "reading": "きせきする",
        "meaning": "Làm phép màu, kỳ tích",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 2,
    "row": 10,
    "order": 20
  },
  {
    "id": "k-3-1",
    "kanji": "丸",
    "hanViet": "HOÀN",
    "onyomi": [
      "がん"
    ],
    "kunyomi": [
      "まる",
      "まる・い",
      "まる・める"
    ],
    "meaning": "Hình tròn, viên thuốc tròn",
    "radical": "丶 (Chủ)",
    "radicalMeaning": "Dấu chấm",
    "strokeCount": 3,
    "mnemonic": "Chín (九) cộng thêm một dấu chấm (丶) xoay tròn thành viên tròn.",
    "words": [
      {
        "word": "丸い",
        "reading": "まるい",
        "meaning": "Tròn trịa",
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
        "word": "日の丸",
        "reading": "ひのまる",
        "meaning": "Quốc kỳ Nhật Bản",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "丸める",
        "reading": "まるめる",
        "meaning": "Động từ của chữ 丸 (HOÀN)",
        "pos": "verb",
        "readingType": "kun"
      }
    ],
    "col": 3,
    "row": 1,
    "order": 21
  },
  {
    "id": "k-3-2",
    "kanji": "伐",
    "hanViet": "PHẠT",
    "onyomi": [
      "ばつ"
    ],
    "kunyomi": [],
    "meaning": "Chặt cây, đánh dẹp, trừng phạt",
    "radical": "亻 (Nhân đứng)",
    "radicalMeaning": "Người",
    "strokeCount": 6,
    "mnemonic": "Người lính (亻) cầm cây mác dài (戈) đi chặt cây phạt rừng.",
    "words": [
      {
        "word": "伐採",
        "reading": "ばっさい",
        "meaning": "Chặt phá rừng cây",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "討伐",
        "reading": "とうばつ",
        "meaning": "Chinh phạt, tiêu diệt",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "伐採する",
        "reading": "ばっさいする",
        "meaning": "Làm chặt phá rừng cây",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 3,
    "row": 2,
    "order": 22
  },
  {
    "id": "k-3-3",
    "kanji": "俳",
    "hanViet": "BÀI",
    "onyomi": [
      "はい"
    ],
    "kunyomi": [],
    "meaning": "Thơ Haiku, diễn viên kịch",
    "radical": "亻 (Nhân đứng)",
    "radicalMeaning": "Người",
    "strokeCount": 10,
    "mnemonic": "Người (亻) nói những lời phi thường đối lập (非) là nhà thơ Haiku.",
    "words": [
      {
        "word": "俳句",
        "reading": "はいく",
        "meaning": "Thơ Haiku Nhật",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "俳優",
        "reading": "はいゆう",
        "meaning": "Diễn viên",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "俳句する",
        "reading": "はいくする",
        "meaning": "Làm thơ haiku nhật",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 3,
    "row": 3,
    "order": 23
  },
  {
    "id": "k-3-4",
    "kanji": "充",
    "hanViet": "SUNG",
    "onyomi": [
      "じゅう"
    ],
    "kunyomi": [
      "あ・てる"
    ],
    "meaning": "Tràn đầy, nạp điện, đầy đủ",
    "radical": "儿 (Nhi)",
    "radicalMeaning": "Đôi chân người",
    "strokeCount": 5,
    "mnemonic": "Đứa trẻ (儿) đội nón nhảy múa tràn đầy sức sống và sung túc.",
    "words": [
      {
        "word": "充電",
        "reading": "じゅうでん",
        "meaning": "Sạc pin, nạp điện",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "充実",
        "reading": "じゅうじつ",
        "meaning": "Đầy đủ, sung túc",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "充分",
        "reading": "じゅうぶん",
        "meaning": "Thỏa mãn, đầy đủ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "充てる",
        "reading": "あてる",
        "meaning": "Bố trí, dành cho, hướng vào",
        "pos": "verb",
        "readingType": "kun"
      }
    ],
    "col": 3,
    "row": 4,
    "order": 24
  },
  {
    "id": "k-3-5",
    "kanji": "刷",
    "hanViet": "XOÁT, LOÁT",
    "onyomi": [
      "さつ"
    ],
    "kunyomi": [
      "す・る"
    ],
    "meaning": "In ấn, chải, quét",
    "radical": "刂 (Đao)",
    "radicalMeaning": "Con dao",
    "strokeCount": 8,
    "mnemonic": "Lau sạch miếng vải (巾) rồi dùng dao gạt (刂) mực để in sách.",
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
        "meaning": "In (sách báo)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "増刷",
        "reading": "ぞうさつ",
        "meaning": "In thêm bản mới",
        "pos": "noun",
        "readingType": "on"
      }
    ],
    "col": 3,
    "row": 5,
    "order": 25
  },
  {
    "id": "k-3-6",
    "kanji": "励",
    "hanViet": "LỆ",
    "onyomi": [
      "れい"
    ],
    "kunyomi": [
      "はげ・む",
      "はげ・ます"
    ],
    "meaning": "Khích lệ, cố gắng hết mình",
    "radical": "力 (Lực)",
    "radicalMeaning": "Sức lực",
    "strokeCount": 7,
    "mnemonic": "Đứng trước vách đá chục ngàn vạn khó khăn (万), dốc hết sức lực (力) tự khích lệ.",
    "words": [
      {
        "word": "励ます",
        "reading": "はげます",
        "meaning": "Cổ vũ, động viên",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "励む",
        "reading": "はげむ",
        "meaning": "Chăm chỉ phấn đấu",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "奨励",
        "reading": "しょうれい",
        "meaning": "Khích lệ, tán thưởng",
        "pos": "noun",
        "readingType": "on"
      }
    ],
    "col": 3,
    "row": 6,
    "order": 26
  },
  {
    "id": "k-3-7",
    "kanji": "却",
    "hanViet": "KHƯỚC",
    "onyomi": [
      "きゃく"
    ],
    "kunyomi": [],
    "meaning": "Từ chối, lùi lại, trái lại",
    "radical": "卩 (Tiết)",
    "radicalMeaning": "Đốt tre, quỳ",
    "strokeCount": 7,
    "mnemonic": "Đi đến (去) trước mặt người ta rồi quỳ lùi lại (卩) từ khước.",
    "words": [
      {
        "word": "却下",
        "reading": "きゃっか",
        "meaning": "Bác bỏ, từ chối",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "返却",
        "reading": "へんきゃく",
        "meaning": "Trả lại (sách, đồ mượn)",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "売却",
        "reading": "ばいきゃく",
        "meaning": "Bán tống khứ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "却下する",
        "reading": "きゃっかする",
        "meaning": "Làm bác bỏ, từ chối",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 3,
    "row": 7,
    "order": 27
  },
  {
    "id": "k-3-8",
    "kanji": "吐",
    "hanViet": "THỔ",
    "onyomi": [
      "と"
    ],
    "kunyomi": [
      "は・く"
    ],
    "meaning": "Nôn ói, nhổ ra, thở ra",
    "radical": "口 (Khẩu)",
    "radicalMeaning": "Cái miệng",
    "strokeCount": 6,
    "mnemonic": "Cái miệng (口) nôn nhổ đồ bẩn ra trên mặt đất (土).",
    "words": [
      {
        "word": "吐く",
        "reading": "はく",
        "meaning": "Nôn, khạc nhổ",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "吐き気",
        "reading": "はきけ",
        "meaning": "Cảm giác buồn nôn",
        "pos": "noun",
        "readingType": "on"
      }
    ],
    "col": 3,
    "row": 8,
    "order": 28
  },
  {
    "id": "k-3-9",
    "kanji": "坂",
    "hanViet": "BẢN, PHẢN",
    "onyomi": [
      "はん"
    ],
    "kunyomi": [
      "さか"
    ],
    "meaning": "Con dốc, con đèo",
    "radical": "土 (Thổ)",
    "radicalMeaning": "Đất",
    "strokeCount": 7,
    "mnemonic": "Hòn đất (土) nằm nghiêng phản nghịch (反) tạo thành con dốc trượt.",
    "words": [
      {
        "word": "坂",
        "reading": "さか",
        "meaning": "Con dốc",
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
        "word": "下り坂",
        "reading": "くだりざか",
        "meaning": "Dốc xuống",
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
    ],
    "col": 3,
    "row": 9,
    "order": 29
  },
  {
    "id": "k-3-10",
    "kanji": "奏",
    "hanViet": "TẤU",
    "onyomi": [
      "そう"
    ],
    "kunyomi": [
      "かな・でる"
    ],
    "meaning": "Tấu đàn, trình tấu, dâng lên",
    "radical": "大 (Đại)",
    "radicalMeaning": "To lớn",
    "strokeCount": 9,
    "mnemonic": "Ba người (三人) cùng tấu bản nhạc dâng lên trời cao (大).",
    "words": [
      {
        "word": "演奏",
        "reading": "えんそう",
        "meaning": "Biểu diễn âm nhạc",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "奏でる",
        "reading": "かなでる",
        "meaning": "Đánh đàn, hòa tấu",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "合奏",
        "reading": "がっそう",
        "meaning": "Hòa tấu nhạc cụ",
        "pos": "noun",
        "readingType": "on"
      }
    ],
    "col": 3,
    "row": 10,
    "order": 30
  },
  {
    "id": "k-4-1",
    "kanji": "芝",
    "hanViet": "CHI",
    "onyomi": [
      "し"
    ],
    "kunyomi": [
      "しば"
    ],
    "meaning": "Bãi cỏ, thảm cỏ xanh, kịch nghệ (shibai)",
    "radical": "艹 (Thảo)",
    "radicalMeaning": "Cây cỏ",
    "strokeCount": 6,
    "mnemonic": "Cây cỏ (艹) mọc vươn dài (之) lan rộng tạo thành thảm cỏ xanh tươi.",
    "words": [
      {
        "word": "芝生",
        "reading": "しばふ",
        "meaning": "Bãi cỏ, thảm cỏ xanh",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "芝居",
        "reading": "しばい",
        "meaning": "Vở kịch, diễn kịch",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "芝",
        "reading": "しば",
        "meaning": "Cỏ, thảm cỏ",
        "pos": "noun",
        "readingType": "kun"
      }
    ],
    "col": 4,
    "row": 1,
    "order": 31
  },
  {
    "id": "k-4-2",
    "kanji": "余",
    "hanViet": "DƯ",
    "onyomi": [
      "よ"
    ],
    "kunyomi": [
      "あま・る",
      "あま・す"
    ],
    "meaning": "Dư thừa, quá mức",
    "radical": "人 (Nhân)",
    "radicalMeaning": "Người",
    "strokeCount": 7,
    "mnemonic": "Người ở trong nhà kho còn đọng lại đống rơm rạ dư thừa.",
    "words": [
      {
        "word": "余る",
        "reading": "あまる",
        "meaning": "Còn thừa, dư ra",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "余計",
        "reading": "よけい",
        "meaning": "Thừa thãi, không cần thiết",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "余白",
        "reading": "よはく",
        "meaning": "Khoảng trống lề trắng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "余す",
        "reading": "あます",
        "meaning": "Động từ của chữ 余 (DƯ)",
        "pos": "verb",
        "readingType": "kun"
      }
    ],
    "col": 4,
    "row": 2,
    "order": 32
  },
  {
    "id": "k-4-3",
    "kanji": "偶",
    "hanViet": "NGẪU",
    "onyomi": [
      "ぐう"
    ],
    "kunyomi": [],
    "meaning": "Tình cờ, ngẫu nhiên, số chẵn",
    "radical": "亻 (Nhân đứng)",
    "radicalMeaning": "Người",
    "strokeCount": 11,
    "mnemonic": "Người (亻) gặp mặt con thú lạ (禺) hoàn toàn là tình cờ ngẫu nhiên.",
    "words": [
      {
        "word": "偶然",
        "reading": "ぐうぜん",
        "meaning": "Tình cờ, ngẫu nhiên",
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
        "word": "配偶者",
        "reading": "はいぐうしゃ",
        "meaning": "Người bạn đời, vợ/chồng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "偶然する",
        "reading": "ぐうぜんする",
        "meaning": "Làm tình cờ, ngẫu nhiên",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 4,
    "row": 3,
    "order": 33
  },
  {
    "id": "k-4-4",
    "kanji": "児",
    "hanViet": "NHI",
    "onyomi": [
      "じ",
      "に"
    ],
    "kunyomi": [],
    "meaning": "Trẻ con, con nít",
    "radical": "儿 (Nhi)",
    "radicalMeaning": "Đôi chân trẻ",
    "strokeCount": 7,
    "mnemonic": "Đứa bé có cái đầu tròn xoe trên đôi chân chập chững (儿).",
    "words": [
      {
        "word": "児童",
        "reading": "じどう",
        "meaning": "Nhi đồng, trẻ em",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "育児",
        "reading": "いくじ",
        "meaning": "Chăm sóc nuôi dạy con",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "小児科",
        "reading": "しょうにか",
        "meaning": "Khoa nhi bệnh viện",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "児童する",
        "reading": "じどうする",
        "meaning": "Làm nhi đồng, trẻ em",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 4,
    "row": 4,
    "order": 34
  },
  {
    "id": "k-4-5",
    "kanji": "券",
    "hanViet": "KHOÁN",
    "onyomi": [
      "けん"
    ],
    "kunyomi": [],
    "meaning": "Vé, phiếu, chứng khoán",
    "radical": "刀 (Đao)",
    "radicalMeaning": "Con dao",
    "strokeCount": 8,
    "mnemonic": "Cuốn giấy cuộn được con dao (刀) cắt ra thành từng tấm vé phát cho người mua.",
    "words": [
      {
        "word": "旅券",
        "reading": "りょけん",
        "meaning": "Hộ chiếu (passport)",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "乗車券",
        "reading": "じょうしゃけん",
        "meaning": "Vé tàu xe",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "証券",
        "reading": "しょうけん",
        "meaning": "Chứng khoán",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "旅券する",
        "reading": "りょけんする",
        "meaning": "Làm hộ chiếu (passport)",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 4,
    "row": 5,
    "order": 35
  },
  {
    "id": "k-4-6",
    "kanji": "効",
    "hanViet": "HIỆU",
    "onyomi": [
      "こう"
    ],
    "kunyomi": [
      "き・く"
    ],
    "meaning": "Có hiệu quả, công hiệu",
    "radical": "力 (Lực)",
    "radicalMeaning": "Sức lực",
    "strokeCount": 8,
    "mnemonic": "Trao đổi kinh nghiệm (交) kết hợp cùng sức lực (力) tạo nên hiệu quả cao.",
    "words": [
      {
        "word": "効く",
        "reading": "きく",
        "meaning": "Có tác dụng, hiệu quả",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "効果",
        "reading": "こうか",
        "meaning": "Hiệu quả",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "有効",
        "reading": "ゆうこう",
        "meaning": "Còn hiệu lực",
        "pos": "noun",
        "readingType": "on"
      }
    ],
    "col": 4,
    "row": 6,
    "order": 36
  },
  {
    "id": "k-4-7",
    "kanji": "巻",
    "hanViet": "QUYỂN",
    "onyomi": [
      "かん"
    ],
    "kunyomi": [
      "ま・く",
      "まき"
    ],
    "meaning": "Cuốn sách, cuộn tròn lại",
    "radical": "己 (Kỷ)",
    "radicalMeaning": "Bản thân",
    "strokeCount": 9,
    "mnemonic": "Hai tay cuộn chặt sợi tơ lại thành một quyển sách thẻ tre tròn.",
    "words": [
      {
        "word": "巻く",
        "reading": "まく",
        "meaning": "Cuộn lại, quấn quanh",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "竜巻",
        "reading": "たつまき",
        "meaning": "Vòi rồng, lốc xoáy",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "全巻",
        "reading": "ぜんかん",
        "meaning": "Toàn bộ các tập truyện",
        "pos": "noun",
        "readingType": "on"
      }
    ],
    "col": 4,
    "row": 7,
    "order": 37
  },
  {
    "id": "k-4-8",
    "kanji": "否",
    "hanViet": "PHỦ",
    "onyomi": [
      "ひ"
    ],
    "kunyomi": [
      "いな"
    ],
    "meaning": "Phủ định, không, phản đối",
    "radical": "口 (Khẩu)",
    "radicalMeaning": "Cái miệng",
    "strokeCount": 7,
    "mnemonic": "Mở miệng (口) nói lời chối bỏ Không (不) là phủ định.",
    "words": [
      {
        "word": "否定",
        "reading": "ひてい",
        "meaning": "Phủ định",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "拒否",
        "reading": "きょひ",
        "meaning": "Từ chối, cự tuyệt",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "賛否",
        "reading": "さんぴ",
        "meaning": "Tán thành và phản đối",
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
    ],
    "col": 4,
    "row": 8,
    "order": 38
  },
  {
    "id": "k-4-9",
    "kanji": "均",
    "hanViet": "QUÂN",
    "onyomi": [
      "きん"
    ],
    "kunyomi": [],
    "meaning": "Đều đặn, bình quân",
    "radical": "土 (Thổ)",
    "radicalMeaning": "Đất",
    "strokeCount": 7,
    "mnemonic": "Đem đất (土) chia đều dưới góc (勹) bằng cái muỗng (冫) cho quân bình.",
    "words": [
      {
        "word": "平均",
        "reading": "へいきん",
        "meaning": "Trung bình, bình quân",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "均等",
        "reading": "きんとう",
        "meaning": "Đồng đều, cân đối",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "平均する",
        "reading": "へいきんする",
        "meaning": "Làm trung bình, bình quân",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 4,
    "row": 9,
    "order": 39
  },
  {
    "id": "k-4-10",
    "kanji": "契",
    "hanViet": "KHẾ",
    "onyomi": [
      "けい"
    ],
    "kunyomi": [
      "ちぎ・る"
    ],
    "meaning": "Khế ước, hợp đồng, thề nguyền",
    "radical": "大 (Đại)",
    "radicalMeaning": "To lớn",
    "strokeCount": 9,
    "mnemonic": "Cầm dao (刀) khắc lên gỗ rồi hai người lớn (大) thề ước ký khế ước.",
    "words": [
      {
        "word": "契約",
        "reading": "けいやく",
        "meaning": "Hợp đồng, khế ước",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "契機",
        "reading": "けいき",
        "meaning": "Cơ hội, bước ngoặt",
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
    ],
    "col": 4,
    "row": 10,
    "order": 40
  },
  {
    "id": "k-5-1",
    "kanji": "乾",
    "hanViet": "CAN, KIỀN",
    "onyomi": [
      "かん"
    ],
    "kunyomi": [
      "かわ・く",
      "かわ・かす"
    ],
    "meaning": "Khô ráo, làm khô",
    "radical": "乙 (Ất)",
    "radicalMeaning": "Cái can, nét uốn",
    "strokeCount": 11,
    "mnemonic": "Mặt trời sớm chiếu mười (十) buổi ban mai (早) làm nước bốc hơi khô queo.",
    "words": [
      {
        "word": "乾く",
        "reading": "かわく",
        "meaning": "Khô ráo",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "乾杯",
        "reading": "かんぱい",
        "meaning": "Cạn chén, chúc mừng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "乾燥",
        "reading": "かんそう",
        "meaning": "Hanh khô, sấy khô",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "乾かす",
        "reading": "かわかす",
        "meaning": "Làm khô, sấy khô",
        "pos": "verb",
        "readingType": "kun"
      }
    ],
    "col": 5,
    "row": 1,
    "order": 41
  },
  {
    "id": "k-5-2",
    "kanji": "伸",
    "hanViet": "THÂN",
    "onyomi": [
      "しん"
    ],
    "kunyomi": [
      "の・びる",
      "の・ばす"
    ],
    "meaning": "Kéo dài, vươn vai, phát triển",
    "radical": "亻 (Nhân đứng)",
    "radicalMeaning": "Người",
    "strokeCount": 7,
    "mnemonic": "Người (亻) vươn mình thẳng thớm như tia sét (申) kéo dài cơ thể.",
    "words": [
      {
        "word": "伸びる",
        "reading": "のびる",
        "meaning": "Dài ra, tăng trưởng",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "伸ばす",
        "reading": "のばす",
        "meaning": "Kéo dài, duỗi thẳng",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "追伸",
        "reading": "ついしん",
        "meaning": "Tái bút (P.S)",
        "pos": "noun",
        "readingType": "on"
      }
    ],
    "col": 5,
    "row": 2,
    "order": 42
  },
  {
    "id": "k-5-3",
    "kanji": "偉",
    "hanViet": "VĨ",
    "onyomi": [
      "い"
    ],
    "kunyomi": [
      "えら・い"
    ],
    "meaning": "Vĩ đại, xuất chúng, tài giỏi",
    "radical": "亻 (Nhân đứng)",
    "radicalMeaning": "Người",
    "strokeCount": 12,
    "mnemonic": "Người (亻) vượt qua mọi ranh giới khác biệt (韋) là vĩ nhân.",
    "words": [
      {
        "word": "偉い",
        "reading": "えらい",
        "meaning": "Tài giỏi, đáng nể",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "偉人",
        "reading": "いじん",
        "meaning": "Vĩ nhân",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "偉大",
        "reading": "いだい",
        "meaning": "Vĩ đại",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "偉人する",
        "reading": "いじんする",
        "meaning": "Làm vĩ nhân",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 5,
    "row": 3,
    "order": 43
  },
  {
    "id": "k-5-4",
    "kanji": "克",
    "hanViet": "KHẮC",
    "onyomi": [
      "こく"
    ],
    "kunyomi": [],
    "meaning": "Khắc phục, vượt qua thử thách",
    "radical": "儿 (Nhi)",
    "radicalMeaning": "Đôi chân",
    "strokeCount": 7,
    "mnemonic": "Mười (十) người cùng anh em (兄) bền gan khắc phục gian truân.",
    "words": [
      {
        "word": "克服",
        "reading": "こくふく",
        "meaning": "Khắc phục (bệnh tật, khó khăn)",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "克服する",
        "reading": "こくふくする",
        "meaning": "Làm khắc phục (bệnh tật, khó khăn)",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 5,
    "row": 4,
    "order": 44
  },
  {
    "id": "k-5-5",
    "kanji": "制",
    "hanViet": "CHẾ",
    "onyomi": [
      "せい"
    ],
    "kunyomi": [],
    "meaning": "Kiểm soát, chế độ, hạn chế",
    "radical": "刂 (Đao)",
    "radicalMeaning": "Con dao",
    "strokeCount": 8,
    "mnemonic": "Cầm dao (刂) chặt tỉa cành cây um tùm để thiết lập chế độ trật tự.",
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
        "meaning": "Hạn chế, giới hạn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "制作",
        "reading": "せいさく",
        "meaning": "Sản xuất, chế tác",
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
    ],
    "col": 5,
    "row": 5,
    "order": 45
  },
  {
    "id": "k-5-6",
    "kanji": "勇",
    "hanViet": "DŨNG",
    "onyomi": [
      "ゆう"
    ],
    "kunyomi": [
      "いさ・む"
    ],
    "meaning": "Dũng cảm, quả cảm",
    "radical": "力 (Lực)",
    "radicalMeaning": "Sức mạnh",
    "strokeCount": 9,
    "mnemonic": "Người đội mũ sắt cầm kích với sức mạnh (力) xung phong là dũng tướng.",
    "words": [
      {
        "word": "勇気",
        "reading": "ゆうき",
        "meaning": "Lòng dũng cảm",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "勇敢",
        "reading": "ゆうかん",
        "meaning": "Dũng cảm, gan dạ",
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
    ],
    "col": 5,
    "row": 6,
    "order": 46
  },
  {
    "id": "k-5-7",
    "kanji": "及",
    "hanViet": "CẬP",
    "onyomi": [
      "きゅう"
    ],
    "kunyomi": [
      "およ・ぶ",
      "およ・ぼす"
    ],
    "meaning": "Lan tới, đạt đến, và",
    "radical": "又 (Hựu)",
    "radicalMeaning": "Bàn tay",
    "strokeCount": 3,
    "mnemonic": "Bàn tay vươn ra chạm kịp người phía trước.",
    "words": [
      {
        "word": "及ぶ",
        "reading": "およぶ",
        "meaning": "Đạt đến, lan ra",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "普及",
        "reading": "ふきゅう",
        "meaning": "Phổ cập, lan rộng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "追及",
        "reading": "ついきゅう",
        "meaning": "Truy cứu trách nhiệm",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "及ぼす",
        "reading": "およぼす",
        "meaning": "Gây ảnh hưởng, tác động đến",
        "pos": "verb",
        "readingType": "kun"
      }
    ],
    "col": 5,
    "row": 7,
    "order": 47
  },
  {
    "id": "k-5-8",
    "kanji": "含",
    "hanViet": "HÀM",
    "onyomi": [
      "がん"
    ],
    "kunyomi": [
      "ふく・む",
      "ふく・める"
    ],
    "meaning": "Chứa đựng, bao hàm, ngậm trong miệng",
    "radical": "口 (Khẩu)",
    "radicalMeaning": "Cái miệng",
    "strokeCount": 7,
    "mnemonic": "Bây giờ (今) ngậm kín trong miệng (口) chứa đựng mọi điều.",
    "words": [
      {
        "word": "含む",
        "reading": "ふくむ",
        "meaning": "Bao gồm, chứa đựng",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "含める",
        "reading": "ふくめる",
        "meaning": "Gộp vào, tính cả",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "含有",
        "reading": "がんゆう",
        "meaning": "Hàm lượng chứa đựng",
        "pos": "noun",
        "readingType": "on"
      }
    ],
    "col": 5,
    "row": 8,
    "order": 48
  },
  {
    "id": "k-5-9",
    "kanji": "坊",
    "hanViet": "PHƯỜNG",
    "onyomi": [
      "ぼう",
      "ぼっ"
    ],
    "kunyomi": [],
    "meaning": "Chú bé, thầy tu, ngõ phường",
    "radical": "土 (Thổ)",
    "radicalMeaning": "Đất",
    "strokeCount": 7,
    "mnemonic": "Khu đất (土) ở bốn phương (方) nơi các chú bé tập trung vui chơi.",
    "words": [
      {
        "word": "赤ん坊",
        "reading": "あかんぼう",
        "meaning": "Em bé sơ sinh",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "朝寝坊",
        "reading": "あさねぼう",
        "meaning": "Ngủ nướng dậy trễ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "坊主",
        "reading": "ぼうず",
        "meaning": "Thầy tu, chú tiểu",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "赤ん坊する",
        "reading": "あかんぼうする",
        "meaning": "Làm em bé sơ sinh",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 5,
    "row": 9,
    "order": 49
  },
  {
    "id": "k-5-10",
    "kanji": "奨",
    "hanViet": "TƯỞNG",
    "onyomi": [
      "しょう"
    ],
    "kunyomi": [],
    "meaning": "Khích lệ, khen thưởng",
    "radical": "大 (Đại)",
    "radicalMeaning": "To lớn",
    "strokeCount": 13,
    "mnemonic": "Đem thịt chó quý dâng lên bậc bề trên để cầu xin lời khen thưởng khích lệ.",
    "words": [
      {
        "word": "奨学金",
        "reading": "しょうがくきん",
        "meaning": "Học bổng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "推奨",
        "reading": "すいしょう",
        "meaning": "Khuyến nghị, đề xuất tốt",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "奨励",
        "reading": "しょうれい",
        "meaning": "Tán thưởng, khích lệ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "奨学金する",
        "reading": "しょうがくきんする",
        "meaning": "Làm học bổng",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 5,
    "row": 10,
    "order": 50
  },
  {
    "id": "k-6-1",
    "kanji": "乱",
    "hanViet": "LOẠN",
    "onyomi": [
      "らん"
    ],
    "kunyomi": [
      "みだ・れる",
      "みだ・す"
    ],
    "meaning": "Hỗn loạn, rối ren, làm loạn",
    "radical": "乙 (Ất)",
    "radicalMeaning": "Nét cong",
    "strokeCount": 7,
    "mnemonic": "Bàn tay cầm lưỡi câu móc vào đống dây nhợ rối tung hỗn loạn.",
    "words": [
      {
        "word": "混乱",
        "reading": "こんらん",
        "meaning": "Hỗn loạn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "乱れる",
        "reading": "みだれる",
        "meaning": "Bị xáo trộn, rối",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "反乱",
        "reading": "はんらん",
        "meaning": "Nổi loạn, phản nghịch",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "乱す",
        "reading": "みだす",
        "meaning": "Làm rối loạn",
        "pos": "verb",
        "readingType": "kun"
      }
    ],
    "col": 6,
    "row": 1,
    "order": 51
  },
  {
    "id": "k-6-2",
    "kanji": "伴",
    "hanViet": "BẠN",
    "onyomi": [
      "はん",
      "ばん"
    ],
    "kunyomi": [
      "ともな・う"
    ],
    "meaning": "Đi cùng, kéo theo, bạn đồng hành",
    "radical": "亻 (Nhân đứng)",
    "radicalMeaning": "Người",
    "strokeCount": 7,
    "mnemonic": "Người (亻) chia nửa (半) tấm lòng cùng đồng hành bên nhau.",
    "words": [
      {
        "word": "伴う",
        "reading": "ともなう",
        "meaning": "Đi kèm, kéo theo",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "同伴",
        "reading": "どうはん",
        "meaning": "Đi cùng nhau",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "伴侶",
        "reading": "はんりょ",
        "meaning": "Bạn đồng hành trăm năm",
        "pos": "noun",
        "readingType": "on"
      }
    ],
    "col": 6,
    "row": 2,
    "order": 52
  },
  {
    "id": "k-6-3",
    "kanji": "傘",
    "hanViet": "TẢN",
    "onyomi": [
      "さん"
    ],
    "kunyomi": [
      "かさ"
    ],
    "meaning": "Cái ô, cây dù",
    "radical": "人 (Nhân)",
    "radicalMeaning": "Người",
    "strokeCount": 12,
    "mnemonic": "Hình dáng cái mái dù che chở cho bốn người (人人人人) bên dưới cán ô (十).",
    "words": [
      {
        "word": "傘",
        "reading": "かさ",
        "meaning": "Cái ô, dù",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "雨傘",
        "reading": "あまがさ",
        "meaning": "Dù đi mưa",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "日傘",
        "reading": "ひがさ",
        "meaning": "Dù che nắng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "雨傘する",
        "reading": "あまがさする",
        "meaning": "Làm dù đi mưa",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 6,
    "row": 3,
    "order": 53
  },
  {
    "id": "k-6-4",
    "kanji": "共",
    "hanViet": "CỘNG",
    "onyomi": [
      "きょう"
    ],
    "kunyomi": [
      "とも",
      "とも・に"
    ],
    "meaning": "Cùng nhau, chung nhau, cộng đồng",
    "radical": "八 (Bát)",
    "radicalMeaning": "Số tám",
    "strokeCount": 6,
    "mnemonic": "Hai tay dâng cúng đồ vật cùng chia sẻ với mọi người cộng đồng.",
    "words": [
      {
        "word": "共に",
        "reading": "ともに",
        "meaning": "Cùng với",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "共同",
        "reading": "きょうどう",
        "meaning": "Cộng đồng, liên kết chung",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "共通",
        "reading": "きょうつう",
        "meaning": "Điểm chung, phổ biến",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "共同する",
        "reading": "きょうどうする",
        "meaning": "Làm cộng đồng, liên kết chung",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 6,
    "row": 4,
    "order": 54
  },
  {
    "id": "k-6-5",
    "kanji": "到",
    "hanViet": "ĐÁO",
    "onyomi": [
      "とう"
    ],
    "kunyomi": [],
    "meaning": "Đến nơi, đạt đến",
    "radical": "刂 (Đao)",
    "radicalMeaning": "Con dao",
    "strokeCount": 8,
    "mnemonic": "Vừa đi đến nơi (至) liền dùng con dao (刂) cắm mốc đánh dấu.",
    "words": [
      {
        "word": "到着",
        "reading": "とうちゃく",
        "meaning": "Đến nơi",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "到達",
        "reading": "とうたつ",
        "meaning": "Đạt tới đích",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "周到",
        "reading": "しゅうとう",
        "meaning": "Chu đáo, tỉ mỉ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "到着する",
        "reading": "とうちゃくする",
        "meaning": "Làm đến nơi",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 6,
    "row": 5,
    "order": 55
  },
  {
    "id": "k-6-6",
    "kanji": "募",
    "hanViet": "MỘ",
    "onyomi": [
      "ぼ"
    ],
    "kunyomi": [
      "つの・る"
    ],
    "meaning": "Chiêu mộ, quyên góp, tuyển sinh",
    "radical": "力 (Lực)",
    "radicalMeaning": "Sức mạnh",
    "strokeCount": 12,
    "mnemonic": "Trời tối dần (莫), dồn sức lực (力) tuyển mộ người tài cho công ty.",
    "words": [
      {
        "word": "募集",
        "reading": "ぼしゅう",
        "meaning": "Tuyển mộ, tuyển dụng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "募る",
        "reading": "つのる",
        "meaning": "Quyên góp, ngày càng mãnh liệt",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "応募",
        "reading": "おうぼ",
        "meaning": "Ứng tuyển, nộp hồ sơ",
        "pos": "noun",
        "readingType": "on"
      }
    ],
    "col": 6,
    "row": 6,
    "order": 56
  },
  {
    "id": "k-6-7",
    "kanji": "収",
    "hanViet": "THU",
    "onyomi": [
      "しゅう"
    ],
    "kunyomi": [
      "おさ・める",
      "おさ・まる"
    ],
    "meaning": "Thu hoạch, thu thập, cất giữ",
    "radical": "又 (Hựu)",
    "radicalMeaning": "Bàn tay",
    "strokeCount": 4,
    "mnemonic": "Bàn tay (又) gom các sợi chỉ đan (丩) cất vào kho thu nhận.",
    "words": [
      {
        "word": "収入",
        "reading": "しゅうにゅう",
        "meaning": "Thu nhập",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "収める",
        "reading": "おさめる",
        "meaning": "Thu được, nộp (tiền)",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "回収",
        "reading": "かいしゅう",
        "meaning": "Thu hồi, gom lại",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "収まる",
        "reading": "おさまる",
        "meaning": "Lắng xuống, yên ổn",
        "pos": "verb",
        "readingType": "kun"
      }
    ],
    "col": 6,
    "row": 7,
    "order": 57
  },
  {
    "id": "k-6-8",
    "kanji": "呂",
    "hanViet": "LỮ",
    "onyomi": [
      "ろ"
    ],
    "kunyomi": [],
    "meaning": "Bồn tắm, nốt nhạc, xương sống",
    "radical": "口 (Khẩu)",
    "radicalMeaning": "Cái miệng",
    "strokeCount": 7,
    "mnemonic": "Hai cái miệng (口) nối nhau bằng một nét xương sống như bồn tắm đôi.",
    "words": [
      {
        "word": "お風呂",
        "reading": "おふろ",
        "meaning": "Bồn tắm nước nóng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "風呂屋",
        "reading": "ふろや",
        "meaning": "Nhà tắm công cộng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "お風呂する",
        "reading": "おふろする",
        "meaning": "Làm bồn tắm nước nóng",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 6,
    "row": 8,
    "order": 58
  },
  {
    "id": "k-6-9",
    "kanji": "基",
    "hanViet": "CƠ",
    "onyomi": [
      "き"
    ],
    "kunyomi": [
      "もと",
      "もと・づく"
    ],
    "meaning": "Cơ sở, nền tảng, căn bản",
    "radical": "土 (Thổ)",
    "radicalMeaning": "Đất",
    "strokeCount": 11,
    "mnemonic": "Đặt chiếc cối xay đá (其) vững chắc trên nền đất (土) làm cơ sở nền móng.",
    "words": [
      {
        "word": "基本",
        "reading": "きほん",
        "meaning": "Cơ bản",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "基準",
        "reading": "きじゅん",
        "meaning": "Tiêu chuẩn, chuẩn mực",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "基づく",
        "reading": "もとづく",
        "meaning": "Dựa trên cơ sở",
        "pos": "verb",
        "readingType": "kun"
      }
    ],
    "col": 6,
    "row": 9,
    "order": 59
  },
  {
    "id": "k-6-10",
    "kanji": "妙",
    "hanViet": "DIỆU",
    "onyomi": [
      "みょう"
    ],
    "kunyomi": [],
    "meaning": "Kỳ diệu, khéo léo, lạ lùng",
    "radical": "女 (Nữ)",
    "radicalMeaning": "Người phụ nữ",
    "strokeCount": 7,
    "mnemonic": "Người con gái (女) còn ít tuổi (少) mà có tài năng thật kỳ diệu.",
    "words": [
      {
        "word": "微妙",
        "reading": "びみょう",
        "meaning": "Tinh tế, khó nói, mơ hồ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "奇妙",
        "reading": "きみょう",
        "meaning": "Kỳ lạ, dị thường",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "絶妙",
        "reading": "ぜつみょう",
        "meaning": "Tuyệt diệu, hoàn hảo",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "微妙する",
        "reading": "びみょうする",
        "meaning": "Làm tinh tế, khó nói, mơ hồ",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 6,
    "row": 10,
    "order": 60
  },
  {
    "id": "k-7-1",
    "kanji": "了",
    "hanViet": "LIỄU",
    "onyomi": [
      "りょう"
    ],
    "kunyomi": [],
    "meaning": "Kết thúc, hoàn tất, thấu hiểu",
    "radical": "亅 (Quyết)",
    "radicalMeaning": "Nét móc",
    "strokeCount": 2,
    "mnemonic": "Đứa bé bó tay gập người báo hiệu kết thúc công việc.",
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
        "word": "修了",
        "reading": "しゅうりょう",
        "meaning": "Hoàn thành khóa học",
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
    ],
    "col": 7,
    "row": 1,
    "order": 61
  },
  {
    "id": "k-7-2",
    "kanji": "依",
    "hanViet": "Y",
    "onyomi": [
      "い",
      "え"
    ],
    "kunyomi": [],
    "meaning": "Dựa vào, ỷ lại, nương tựa",
    "radical": "亻 (Nhân đứng)",
    "radicalMeaning": "Người",
    "strokeCount": 8,
    "mnemonic": "Người (亻) khoác chiếc áo ấm (衣) dựa vào hơi ấm để sống sót.",
    "words": [
      {
        "word": "依頼",
        "reading": "いらい",
        "meaning": "Nhờ vả, ủy thác",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "依存",
        "reading": "いぞん / いそん",
        "meaning": "Phụ thuộc, nghiện",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "依頼する",
        "reading": "いらいする",
        "meaning": "Làm nhờ vả, ủy thác",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 7,
    "row": 2,
    "order": 62
  },
  {
    "id": "k-7-3",
    "kanji": "傾",
    "hanViet": "KHUYNH",
    "onyomi": [
      "けい"
    ],
    "kunyomi": [
      "かたむ・く",
      "かたむ・ける"
    ],
    "meaning": "Nghiêng, khuynh hướng",
    "radical": "亻 (Nhân đứng)",
    "radicalMeaning": "Người",
    "strokeCount": 13,
    "mnemonic": "Người (亻) đội cái đầu (頁) nặng trĩu nghiêng lệch về một bên.",
    "words": [
      {
        "word": "傾向",
        "reading": "けいこう",
        "meaning": "Khuynh hướng, xu hướng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "傾く",
        "reading": "かたむく",
        "meaning": "Nghiêng về, sa sút",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "傾ける",
        "reading": "かたむける",
        "meaning": "Làm nghiêng, dồn tâm trí",
        "pos": "verb",
        "readingType": "kun"
      }
    ],
    "col": 7,
    "row": 3,
    "order": 63
  },
  {
    "id": "k-7-4",
    "kanji": "典",
    "hanViet": "ĐIỂN",
    "onyomi": [
      "てん"
    ],
    "kunyomi": [],
    "meaning": "Từ điển, kinh điển, nghi lễ",
    "radical": "八 (Bát)",
    "radicalMeaning": "Số tám / Hai tay",
    "strokeCount": 8,
    "mnemonic": "Hai tay nâng cuốn sách tre quý giá (曲) trên bàn thờ kinh điển.",
    "words": [
      {
        "word": "辞典",
        "reading": "じてん",
        "meaning": "Từ điển",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "古典",
        "reading": "こてん",
        "meaning": "Cổ điển",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "典型",
        "reading": "てんけい",
        "meaning": "Điển hình, mẫu mực",
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
    ],
    "col": 7,
    "row": 4,
    "order": 64
  },
  {
    "id": "k-7-5",
    "kanji": "削",
    "hanViet": "TƯỚC",
    "onyomi": [
      "さく"
    ],
    "kunyomi": [
      "けず・る"
    ],
    "meaning": "Gọt đẽo, cắt giảm",
    "radical": "刂 (Đao)",
    "radicalMeaning": "Con dao",
    "strokeCount": 9,
    "mnemonic": "Dùng dao (刂) gọt cho đồ vật nhỏ bớt lại (肖).",
    "words": [
      {
        "word": "削る",
        "reading": "けずる",
        "meaning": "Gọt đẽo, cắt giảm",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "削減",
        "reading": "さくげん",
        "meaning": "Cắt giảm (ngân sách, khí thải)",
        "pos": "noun",
        "readingType": "on"
      }
    ],
    "col": 7,
    "row": 5,
    "order": 65
  },
  {
    "id": "k-7-6",
    "kanji": "勧",
    "hanViet": "KHUYẾN",
    "onyomi": [
      "かん"
    ],
    "kunyomi": [
      "すす・める"
    ],
    "meaning": "Khuyên bảo, khuyến khích",
    "radical": "力 (Lực)",
    "radicalMeaning": "Sức mạnh",
    "strokeCount": 13,
    "mnemonic": "Dùng lời chim hót (雚) kèm sức mạnh khéo léo (力) để khuyên bảo người khác.",
    "words": [
      {
        "word": "勧める",
        "reading": "すすめる",
        "meaning": "Khuyên, mời, gợi ý",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "勧誘",
        "reading": "かんゆう",
        "meaning": "Rủ rê, chèo kéo",
        "pos": "noun",
        "readingType": "on"
      }
    ],
    "col": 7,
    "row": 6,
    "order": 66
  },
  {
    "id": "k-7-7",
    "kanji": "双",
    "hanViet": "SONG",
    "onyomi": [
      "そう"
    ],
    "kunyomi": [
      "ふた"
    ],
    "meaning": "Cặp, đôi, song sinh",
    "radical": "又 (Hựu)",
    "radicalMeaning": "Bàn tay",
    "strokeCount": 4,
    "mnemonic": "Hai bàn tay (又 又) sóng đôi bên nhau kết thành một cặp.",
    "words": [
      {
        "word": "双方",
        "reading": "そうほう",
        "meaning": "Cả hai bên",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "双子",
        "reading": "ふたご",
        "meaning": "Sinh đôi",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "双方する",
        "reading": "そうほうする",
        "meaning": "Làm cả hai bên",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 7,
    "row": 7,
    "order": 67
  },
  {
    "id": "k-7-8",
    "kanji": "吠",
    "hanViet": "PHỆ",
    "onyomi": [
      "はい"
    ],
    "kunyomi": [
      "ほ・える"
    ],
    "meaning": "Chó sủa, gầm rú",
    "radical": "口 (Khẩu)",
    "radicalMeaning": "Cái miệng",
    "strokeCount": 7,
    "mnemonic": "Cái miệng (口) của con chó (犬) ngoác to ra sủa gâu gâu.",
    "words": [
      {
        "word": "吠える",
        "reading": "ほえる",
        "meaning": "Chó sủa, thú gầm",
        "pos": "verb",
        "readingType": "kun"
      }
    ],
    "col": 7,
    "row": 8,
    "order": 68
  },
  {
    "id": "k-7-9",
    "kanji": "域",
    "hanViet": "VỰC",
    "onyomi": [
      "いき"
    ],
    "kunyomi": [],
    "meaning": "Khu vực, vùng miền",
    "radical": "土 (Thổ)",
    "radicalMeaning": "Đất",
    "strokeCount": 11,
    "mnemonic": "Khu đất (土) được quân lính cầm vũ khí (或) canh phòng là lãnh vực.",
    "words": [
      {
        "word": "地域",
        "reading": "ちいき",
        "meaning": "Khu vực, địa phương",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "領域",
        "reading": "りょういき",
        "meaning": "Lĩnh vực chuyên môn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "区域",
        "reading": "くいき",
        "meaning": "Phân khu",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "地域する",
        "reading": "ちいきする",
        "meaning": "Làm khu vực, địa phương",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 7,
    "row": 9,
    "order": 69
  },
  {
    "id": "k-7-10",
    "kanji": "姿",
    "hanViet": "TƯ",
    "onyomi": [
      "し"
    ],
    "kunyomi": [
      "すがた"
    ],
    "meaning": "Dáng vẻ, tư thế, phong thái",
    "radical": "女 (Nữ)",
    "radicalMeaning": "Người phụ nữ",
    "strokeCount": 9,
    "mnemonic": "Người phụ nữ (女) lần thứ hai (次) bước ra với tư thế yêu kiều.",
    "words": [
      {
        "word": "姿",
        "reading": "すがた",
        "meaning": "Dáng dấp, bóng dáng",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "姿勢",
        "reading": "しせい",
        "meaning": "Tư thế ngồi/đứng, thái độ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "姿勢する",
        "reading": "しせいする",
        "meaning": "Làm tư thế ngồi/đứng, thái độ",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 7,
    "row": 10,
    "order": 70
  },
  {
    "id": "k-8-1",
    "kanji": "争",
    "hanViet": "TRANH",
    "onyomi": [
      "そう"
    ],
    "kunyomi": [
      "あらそ・う"
    ],
    "meaning": "Tranh đấu, tranh giành, cãi nhau",
    "radical": "亅 (Quyết)",
    "radicalMeaning": "Cái móc",
    "strokeCount": 6,
    "mnemonic": "Hai bàn tay tranh nhau giật lấy một cây gậy móc.",
    "words": [
      {
        "word": "争う",
        "reading": "あらそう",
        "meaning": "Tranh chấp, cãi cọ",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "戦争",
        "reading": "せんそう",
        "meaning": "Chiến tranh",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "競争",
        "reading": "きょうそう",
        "meaning": "Cạnh tranh, đua tài",
        "pos": "noun",
        "readingType": "on"
      }
    ],
    "col": 8,
    "row": 1,
    "order": 71
  },
  {
    "id": "k-8-2",
    "kanji": "保",
    "hanViet": "BẢO",
    "onyomi": [
      "ほ"
    ],
    "kunyomi": [
      "たも・つ"
    ],
    "meaning": "Bảo vệ, giữ gìn, bảo hiểm",
    "radical": "亻 (Nhân đứng)",
    "radicalMeaning": "Người",
    "strokeCount": 9,
    "mnemonic": "Người lớn (亻) che chở cõng đứa trẻ sơ sinh (呆) để bảo bọc.",
    "words": [
      {
        "word": "保存",
        "reading": "ほぞん",
        "meaning": "Lưu giữ, bảo tồn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "保険",
        "reading": "ほけん",
        "meaning": "Bảo hiểm",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "保つ",
        "reading": "たもつ",
        "meaning": "Duy trì, giữ gìn",
        "pos": "verb",
        "readingType": "kun"
      }
    ],
    "col": 8,
    "row": 2,
    "order": 72
  },
  {
    "id": "k-8-3",
    "kanji": "像",
    "hanViet": "TƯỢNG",
    "onyomi": [
      "ぞう"
    ],
    "kunyomi": [],
    "meaning": "Bức tượng, hình ảnh",
    "radical": "亻 (Nhân đứng)",
    "radicalMeaning": "Người",
    "strokeCount": 14,
    "mnemonic": "Người (亻) đục đẽo tạc nên hình dáng con voi to lớn (象) thành bức tượng.",
    "words": [
      {
        "word": "画像",
        "reading": "がぞう",
        "meaning": "Hình ảnh kỹ thuật số",
        "pos": "noun",
        "readingType": "on"
      },
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
        "meaning": "Phim ảnh, hình ảnh trình chiếu",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "画像する",
        "reading": "がぞうする",
        "meaning": "Làm hình ảnh kỹ thuật số",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 8,
    "row": 3,
    "order": 73
  },
  {
    "id": "k-8-4",
    "kanji": "再",
    "hanViet": "TÁI",
    "onyomi": [
      "さい",
      "さ"
    ],
    "kunyomi": [
      "ふたた・び"
    ],
    "meaning": "Lặp lại, tái sinh, làm lại lần nữa",
    "radical": "冂 (Quynh)",
    "radicalMeaning": "Vùng biên giới",
    "strokeCount": 6,
    "mnemonic": "Một việc đóng khung rồi lại mở ra làm lại lần thứ hai.",
    "words": [
      {
        "word": "再度",
        "reading": "さいど",
        "meaning": "Một lần nữa",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "再生",
        "reading": "さいせい",
        "meaning": "Phát lại video, tái chế",
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
        "word": "再度する",
        "reading": "さいどする",
        "meaning": "Làm một lần nữa",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 8,
    "row": 4,
    "order": 74
  },
  {
    "id": "k-8-5",
    "kanji": "剣",
    "hanViet": "KIẾM",
    "onyomi": [
      "けん"
    ],
    "kunyomi": [
      "つるぎ"
    ],
    "meaning": "Thanh kiếm",
    "radical": "刂 (Đao)",
    "radicalMeaning": "Con dao",
    "strokeCount": 10,
    "mnemonic": "Tập hợp mọi người (僉) cầm binh khí đao dài (刂) luyện kiếm pháp.",
    "words": [
      {
        "word": "真剣",
        "reading": "しんけん",
        "meaning": "Nghiêm túc, thật lòng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "剣道",
        "reading": "けんどう",
        "meaning": "Kiếm đạo Nhật Bản",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "真剣する",
        "reading": "しんけんする",
        "meaning": "Làm nghiêm túc, thật lòng",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 8,
    "row": 5,
    "order": 75
  },
  {
    "id": "k-8-6",
    "kanji": "旬",
    "hanViet": "TUẦN",
    "onyomi": [
      "じゅん",
      "しゅん"
    ],
    "kunyomi": [],
    "meaning": "Mười ngày (tuần lễ xưa), mùa đồ ăn ngon nhất",
    "radical": "日 (Nhật)",
    "radicalMeaning": "Mặt trời, ngày",
    "strokeCount": 6,
    "mnemonic": "Mặt trời (日) gói trọn trong vòng tay (勹) tròn 10 ngày gọi là một tuần trăng.",
    "words": [
      {
        "word": "上旬",
        "reading": "じょうじゅん",
        "meaning": "Thượng tuần (1-10 đầu tháng)",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "中旬",
        "reading": "ちゅうじゅん",
        "meaning": "Trung tuần (11-20 giữa tháng)",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "下旬",
        "reading": "げじゅん",
        "meaning": "Hạ tuần (21 đến cuối tháng)",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "旬",
        "reading": "しゅん",
        "meaning": "Đúng mùa, tươi ngon nhất",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "上旬する",
        "reading": "じょうじゅんする",
        "meaning": "Làm thượng tuần (1-10 đầu tháng)",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 8,
    "row": 6,
    "order": 76
  },
  {
    "id": "k-8-7",
    "kanji": "司",
    "hanViet": "TI, TƯ",
    "onyomi": [
      "し"
    ],
    "kunyomi": [],
    "meaning": "Cai quản, phụ trách, người điều hành",
    "radical": "口 (Khẩu)",
    "radicalMeaning": "Cái miệng",
    "strokeCount": 5,
    "mnemonic": "Cái miệng (口) phát lệnh điều khiển một góc trời phụ trách công vụ.",
    "words": [
      {
        "word": "司会",
        "reading": "しかい",
        "meaning": "MC, người dẫn chương trình",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "上司",
        "reading": "じょうし",
        "meaning": "Cấp trên, sếp",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "司会する",
        "reading": "しかいする",
        "meaning": "Làm mc, người dẫn chương trình",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 8,
    "row": 7,
    "order": 77
  },
  {
    "id": "k-8-8",
    "kanji": "商",
    "hanViet": "THƯƠNG",
    "onyomi": [
      "しょう"
    ],
    "kunyomi": [
      "あきな・う"
    ],
    "meaning": "Thương mại, buôn bán, hàng hóa",
    "radical": "口 (Khẩu)",
    "radicalMeaning": "Cái miệng",
    "strokeCount": 11,
    "mnemonic": "Đội nón đứng ngoài cửa chợ mở miệng (口) mời chào buôn bán.",
    "words": [
      {
        "word": "商品",
        "reading": "しょうひん",
        "meaning": "Sản phẩm, hàng hóa",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "商業",
        "reading": "しょうぎょう",
        "meaning": "Thương nghiệp",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "商店街",
        "reading": "しょうてんがい",
        "meaning": "Phố mua sắm",
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
    ],
    "col": 8,
    "row": 8,
    "order": 78
  },
  {
    "id": "k-8-9",
    "kanji": "墓",
    "hanViet": "MỘ",
    "onyomi": [
      "ぼ"
    ],
    "kunyomi": [
      "はか"
    ],
    "meaning": "Ngôi mộ, phần mộ",
    "radical": "土 (Thổ)",
    "radicalMeaning": "Đất",
    "strokeCount": 13,
    "mnemonic": "Mặt trời lặn sau đám cỏ (莫), chôn cất người mất dưới lớp đất (土) xây ngôi mộ.",
    "words": [
      {
        "word": "墓",
        "reading": "はか",
        "meaning": "Ngôi mộ",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "お墓参り",
        "reading": "おはかまいり",
        "meaning": "Viếng mộ tổ tiên",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "墓地",
        "reading": "ぼち",
        "meaning": "Nghĩa trang",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "墓地する",
        "reading": "ぼちする",
        "meaning": "Làm nghĩa trang",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 8,
    "row": 9,
    "order": 79
  },
  {
    "id": "k-8-10",
    "kanji": "姫",
    "hanViet": "CƠ",
    "onyomi": [
      "き"
    ],
    "kunyomi": [
      "ひめ"
    ],
    "meaning": "Công chúa, tiểu thư",
    "radical": "女 (Nữ)",
    "radicalMeaning": "Người phụ nữ",
    "strokeCount": 10,
    "mnemonic": "Người con gái (女) có họ hàng hoàng tộc quyền quý (臣) chính là công chúa.",
    "words": [
      {
        "word": "お姫様",
        "reading": "おひめさま",
        "meaning": "Nàng công chúa",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "姫",
        "reading": "ひめ",
        "meaning": "Công chúa",
        "pos": "noun",
        "readingType": "kun"
      }
    ],
    "col": 8,
    "row": 10,
    "order": 80
  },
  {
    "id": "k-9-1",
    "kanji": "互",
    "hanViet": "HỖ",
    "onyomi": [
      "ご"
    ],
    "kunyomi": [
      "たが・い"
    ],
    "meaning": "Lẫn nhau, qua lại",
    "radical": "二 (Nhị)",
    "radicalMeaning": "Số hai",
    "strokeCount": 4,
    "mnemonic": "Hai sợi chỉ móc ngoặc đan xen vào nhau hỗ trợ qua lại.",
    "words": [
      {
        "word": "お互いに",
        "reading": "おたがいに",
        "meaning": "Lẫn nhau, cùng nhau",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "相互",
        "reading": "そうご",
        "meaning": "Tương hỗ, qua lại lẫn nhau",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "交互",
        "reading": "こうご",
        "meaning": "Luân phiên, xen kẽ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "互い",
        "reading": "たがい",
        "meaning": "Động từ của chữ 互 (HỖ)",
        "pos": "adj",
        "readingType": "kun"
      },
      {
        "word": "相互する",
        "reading": "そうごする",
        "meaning": "Làm tương hỗ, qua lại lẫn nhau",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 9,
    "row": 1,
    "order": 81
  },
  {
    "id": "k-9-2",
    "kanji": "倍",
    "hanViet": "BỘI",
    "onyomi": [
      "ばい"
    ],
    "kunyomi": [],
    "meaning": "Gấp đôi, gấp bội",
    "radical": "亻 (Nhân đứng)",
    "radicalMeaning": "Người",
    "strokeCount": 10,
    "mnemonic": "Người (亻) nhổ nước bọt (咅) tăng gấp đôi công suất.",
    "words": [
      {
        "word": "二倍",
        "reading": "にばい",
        "meaning": "Gấp hai lần",
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
        "meaning": "Làm gấp hai lần",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 9,
    "row": 2,
    "order": 82
  },
  {
    "id": "k-9-3",
    "kanji": "僕",
    "hanViet": "BỘC",
    "onyomi": [
      "ぼく"
    ],
    "kunyomi": [],
    "meaning": "Tôi (con trai xưng hô), nô bộc",
    "radical": "亻 (Nhân đứng)",
    "radicalMeaning": "Người",
    "strokeCount": 14,
    "mnemonic": "Người (亻) phục vụ chăm sóc nghề nghiệp bên lò lửa làm nô bộc khiêm tốn.",
    "words": [
      {
        "word": "僕",
        "reading": "ぼく",
        "meaning": "Tôi (nam giới thường dùng)",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "僕する",
        "reading": "ぼくする",
        "meaning": "Làm tôi (nam giới thường dùng)",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 9,
    "row": 3,
    "order": 83
  },
  {
    "id": "k-9-4",
    "kanji": "凍",
    "hanViet": "ĐỐNG",
    "onyomi": [
      "とう"
    ],
    "kunyomi": [
      "こお・る",
      "こご・える"
    ],
    "meaning": "Đông lạnh, đóng băng",
    "radical": "冫 (Băng)",
    "radicalMeaning": "Băng giá",
    "strokeCount": 10,
    "mnemonic": "Nước gặp băng giá (冫) ở phía Đông (東) đông cứng lại thành đá.",
    "words": [
      {
        "word": "凍る",
        "reading": "こおる",
        "meaning": "Đông đá, đóng băng",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "冷凍庫",
        "reading": "れいとうこ",
        "meaning": "Ngăn đông tủ lạnh",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "凍結",
        "reading": "とうけつ",
        "meaning": "Đông kết, đóng băng tài khoản",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "凍える",
        "reading": "こごえる",
        "meaning": "Tê cóng, cóng buốt",
        "pos": "verb",
        "readingType": "kun"
      }
    ],
    "col": 9,
    "row": 4,
    "order": 84
  },
  {
    "id": "k-9-5",
    "kanji": "剤",
    "hanViet": "TỄ",
    "onyomi": [
      "ざい"
    ],
    "kunyomi": [],
    "meaning": "Thuốc, hóa chất, dung dịch điều chế",
    "radical": "刂 (Đao)",
    "radicalMeaning": "Con dao",
    "strokeCount": 10,
    "mnemonic": "Dùng dao (刂) cắt nhỏ cỏ cây (斉) để bào chế thành thuốc điều trị.",
    "words": [
      {
        "word": "洗剤",
        "reading": "せんざい",
        "meaning": "Bột giặt, nước rửa chén",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "薬剤師",
        "reading": "やくざいし",
        "meaning": "Dược sĩ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "殺虫剤",
        "reading": "さっちゅうざい",
        "meaning": "Thuốc trừ sâu",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "洗剤する",
        "reading": "せんざいする",
        "meaning": "Làm bột giặt, nước rửa chén",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 9,
    "row": 5,
    "order": 85
  },
  {
    "id": "k-9-6",
    "kanji": "卓",
    "hanViet": "TRÁC",
    "onyomi": [
      "たく"
    ],
    "kunyomi": [],
    "meaning": "Cái bàn, xuất chúng, trác tuyệt",
    "radical": "十 (Thập)",
    "radicalMeaning": "Số mười",
    "strokeCount": 8,
    "mnemonic": "Người đứng dậy sớm (早) trên mười bậc (十) cao như cái bàn nổi bật.",
    "words": [
      {
        "word": "食卓",
        "reading": "しょくたく",
        "meaning": "Bàn ăn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "卓球",
        "reading": "たっきゅう",
        "meaning": "Môn bóng bàn",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "卓越",
        "reading": "たくえつ",
        "meaning": "Trác việt, xuất chúng",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "食卓する",
        "reading": "しょくたくする",
        "meaning": "Làm bàn ăn",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 9,
    "row": 6,
    "order": 86
  },
  {
    "id": "k-9-7",
    "kanji": "句",
    "hanViet": "CÂU, CÚ",
    "onyomi": [
      "く"
    ],
    "kunyomi": [],
    "meaning": "Câu thơ, câu văn, lời phàn nàn",
    "radical": "口 (Khẩu)",
    "radicalMeaning": "Cái miệng",
    "strokeCount": 5,
    "mnemonic": "Lời nói từ miệng (口) được bọc lại (勹) thành một câu văn tròn ý.",
    "words": [
      {
        "word": "文句",
        "reading": "もんく",
        "meaning": "Lời phàn nàn, càu nhàu",
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
        "word": "語句",
        "reading": "ごく",
        "meaning": "Cụm từ ngữ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "文句する",
        "reading": "もんくする",
        "meaning": "Làm lời phàn nàn, càu nhàu",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 9,
    "row": 7,
    "order": 87
  },
  {
    "id": "k-9-8",
    "kanji": "善",
    "hanViet": "THIỆN",
    "onyomi": [
      "ぜん"
    ],
    "kunyomi": [
      "よ・い"
    ],
    "meaning": "Tốt đẹp, hướng thiện, lương thiện",
    "radical": "口 (Khẩu)",
    "radicalMeaning": "Cái miệng",
    "strokeCount": 12,
    "mnemonic": "Con cừu hiền lành (羊) nói những lời tốt đẹp từ miệng (口) là tâm hướng thiện.",
    "words": [
      {
        "word": "改善",
        "reading": "かいぜん",
        "meaning": "Cải tiến, làm cho tốt hơn (Kaizen)",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "親善",
        "reading": "しんぜん",
        "meaning": "Thân thiện, hòa hảo",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "善悪",
        "reading": "ぜんあく",
        "meaning": "Thiện và ác",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "善い",
        "reading": "よい",
        "meaning": "Động từ của chữ 善 (THIỆN)",
        "pos": "adj",
        "readingType": "kun"
      },
      {
        "word": "改善する",
        "reading": "かいぜんする",
        "meaning": "Làm cải tiến, làm cho tốt hơn (kaizen)",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 9,
    "row": 8,
    "order": 88
  },
  {
    "id": "k-9-9",
    "kanji": "塗",
    "hanViet": "ĐỒ",
    "onyomi": [
      "と"
    ],
    "kunyomi": [
      "ぬ・る"
    ],
    "meaning": "Quét sơn, bôi, trát",
    "radical": "土 (Thổ)",
    "radicalMeaning": "Đất",
    "strokeCount": 13,
    "mnemonic": "Dùng nước (氵) hòa với bùn đất (土) trên đường đi (余) để trát quét tường.",
    "words": [
      {
        "word": "塗る",
        "reading": "ぬる",
        "meaning": "Sơn, bôi thuốc, quết bơ",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "塗装",
        "reading": "とそう",
        "meaning": "Lớp sơn bề mặt",
        "pos": "noun",
        "readingType": "on"
      }
    ],
    "col": 9,
    "row": 9,
    "order": 89
  },
  {
    "id": "k-9-10",
    "kanji": "嫌",
    "hanViet": "HIỀM",
    "onyomi": [
      "けん",
      "げん"
    ],
    "kunyomi": [
      "きら・う",
      "いや"
    ],
    "meaning": "Ghét, không thích, hiềm khích",
    "radical": "女 (Nữ)",
    "radicalMeaning": "Người phụ nữ",
    "strokeCount": 13,
    "mnemonic": "Người phụ nữ (女) khi còn kiêm nhiệm (兼) quá nhiều việc sẽ dễ bực bội chán ghét.",
    "words": [
      {
        "word": "嫌い",
        "reading": "きらい",
        "meaning": "Ghét, không thích",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "嫌",
        "reading": "いや",
        "meaning": "Khó chịu, không muốn",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "機嫌",
        "reading": "きげん",
        "meaning": "Tâm trạng (tốt/xấu)",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "嫌う",
        "reading": "きらう",
        "meaning": "Ghét, căm ghét",
        "pos": "verb",
        "readingType": "kun"
      }
    ],
    "col": 9,
    "row": 10,
    "order": 90
  },
  {
    "id": "k-10-1",
    "kanji": "仏",
    "hanViet": "PHẬT",
    "onyomi": [
      "ぶつ",
      "ふつ"
    ],
    "kunyomi": [
      "ほとけ"
    ],
    "meaning": "Đức Phật, nước Pháp",
    "radical": "亻 (Nhân đứng)",
    "radicalMeaning": "Người",
    "strokeCount": 4,
    "mnemonic": "Người (亻) buông bỏ mọi sợi dây vướng bận (厶) đắc đạo thành Phật.",
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
        "word": "仏語",
        "reading": "ふつご",
        "meaning": "Tiếng Pháp",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "仏教する",
        "reading": "ぶっきょうする",
        "meaning": "Làm phật giáo",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 10,
    "row": 1,
    "order": 91
  },
  {
    "id": "k-10-2",
    "kanji": "倉",
    "hanViet": "THƯƠNG",
    "onyomi": [
      "そう"
    ],
    "kunyomi": [
      "くら"
    ],
    "meaning": "Nhà kho, kho chứa",
    "radical": "人 (Nhân)",
    "radicalMeaning": "Người",
    "strokeCount": 10,
    "mnemonic": "Dưới mái nhà (人) che chắn cho cửa kho (口) cất giữ đồ đạc.",
    "words": [
      {
        "word": "倉庫",
        "reading": "そうこ",
        "meaning": "Nhà kho, kho bãi",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "倉",
        "reading": "くら",
        "meaning": "Kho chứa thóc lúa",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "倉庫する",
        "reading": "そうこする",
        "meaning": "Làm nhà kho, kho bãi",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 10,
    "row": 2,
    "order": 92
  },
  {
    "id": "k-10-3",
    "kanji": "僚",
    "hanViet": "LIÊU",
    "onyomi": [
      "りょう"
    ],
    "kunyomi": [],
    "meaning": "Bạn đồng nghiệp, quan chức",
    "radical": "亻 (Nhân đứng)",
    "radicalMeaning": "Người",
    "strokeCount": 14,
    "mnemonic": "Người (亻) cùng nhau thắp sáng đuốc lớn (寮) làm việc thâu đêm là đồng liêu.",
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
        "meaning": "Quan chức nhà nước",
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
    ],
    "col": 10,
    "row": 3,
    "order": 93
  },
  {
    "id": "k-10-4",
    "kanji": "処",
    "hanViet": "XỨ, XỬ",
    "onyomi": [
      "しょ"
    ],
    "kunyomi": [],
    "meaning": "Xử lý, nơi chốn, trừng phạt",
    "radical": "几 (Kỷ)",
    "radicalMeaning": "Cái ghế dựa",
    "strokeCount": 5,
    "mnemonic": "Bước chân đi chậm (夂) tới cái ghế bàn (几) ngồi xuống để xử lý giấy tờ.",
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
        "meaning": "Vứt bỏ, xử phạt",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "対処",
        "reading": "たいしょ",
        "meaning": "Đối phó, xử trí",
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
    ],
    "col": 10,
    "row": 4,
    "order": 94
  },
  {
    "id": "k-10-5",
    "kanji": "副",
    "hanViet": "PHÓ",
    "onyomi": [
      "ふく"
    ],
    "kunyomi": [],
    "meaning": "Cấp phó, phụ, bản sao",
    "radical": "刂 (Đao)",
    "radicalMeaning": "Con dao",
    "strokeCount": 11,
    "mnemonic": "Dùng dao (刂) chia đôi hũ của cải đầy ắp (畐) thành phần chính và phần phó.",
    "words": [
      {
        "word": "副社長",
        "reading": "ふくしゃちょう",
        "meaning": "Phó giám đốc",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "副作用",
        "reading": "ふくさよう",
        "meaning": "Tác dụng phụ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "副詞",
        "reading": "ふくし",
        "meaning": "Phó từ",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "副社長する",
        "reading": "ふくしゃちょうする",
        "meaning": "Làm phó giám đốc",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 10,
    "row": 5,
    "order": 95
  },
  {
    "id": "k-10-6",
    "kanji": "協",
    "hanViet": "HIỆP",
    "onyomi": [
      "きょう"
    ],
    "kunyomi": [],
    "meaning": "Hợp tác, hiệp lực, đồng lòng",
    "radical": "十 (Thập)",
    "radicalMeaning": "Số mười",
    "strokeCount": 8,
    "mnemonic": "Mười người (十) đem ba chữ sức lực (力 力 力) chung tay hiệp lực lại.",
    "words": [
      {
        "word": "協力",
        "reading": "きょうりょく",
        "meaning": "Hợp tác, giúp đỡ",
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
        "word": "妥協",
        "reading": "だきょう",
        "meaning": "Thỏa hiệp",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "協力する",
        "reading": "きょうりょくする",
        "meaning": "Làm hợp tác, giúp đỡ",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 10,
    "row": 6,
    "order": 96
  },
  {
    "id": "k-10-7",
    "kanji": "叱",
    "hanViet": "SẤT",
    "onyomi": [
      "しつ"
    ],
    "kunyomi": [
      "しか・る"
    ],
    "meaning": "La mắng, quở trách",
    "radical": "口 (Khẩu)",
    "radicalMeaning": "Cái miệng",
    "strokeCount": 5,
    "mnemonic": "Cái miệng (口) nói lời sắc bén như chiếc thìa gõ đầu (匕) để mắng mỏ.",
    "words": [
      {
        "word": "叱る",
        "reading": "しかる",
        "meaning": "Mắng, la rầy",
        "pos": "verb",
        "readingType": "kun"
      },
      {
        "word": "叱責",
        "reading": "しっせき",
        "meaning": "Khiển trách nghiêm khắc",
        "pos": "noun",
        "readingType": "on"
      }
    ],
    "col": 10,
    "row": 7,
    "order": 97
  },
  {
    "id": "k-10-8",
    "kanji": "器",
    "hanViet": "KHÍ",
    "onyomi": [
      "き"
    ],
    "kunyomi": [
      "うつわ"
    ],
    "meaning": "Dụng cụ, đồ chứa, khí chất",
    "radical": "口 (Khẩu)",
    "radicalMeaning": "Cái miệng",
    "strokeCount": 15,
    "mnemonic": "Bốn cái miệng bát đĩa (口 口 口 口) đặt quanh con chó canh giữ (大/犬) tạo thành đồ dùng khí cụ.",
    "words": [
      {
        "word": "食器",
        "reading": "しょっき",
        "meaning": "Bát đĩa đồ ăn",
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
        "word": "器用",
        "reading": "きよう",
        "meaning": "Khéo tay, tháo vát",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "食器する",
        "reading": "しょっきする",
        "meaning": "Làm bát đĩa đồ ăn",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 10,
    "row": 8,
    "order": 98
  },
  {
    "id": "k-10-9",
    "kanji": "境",
    "hanViet": "CẢNH",
    "onyomi": [
      "きょう",
      "けい"
    ],
    "kunyomi": [
      "さかい"
    ],
    "meaning": "Ranh giới, hoàn cảnh, biên cương",
    "radical": "土 (Thổ)",
    "radicalMeaning": "Đất",
    "strokeCount": 14,
    "mnemonic": "Vùng đất (土) nơi ánh gương soi sáng (竟) phân định ranh giới lãnh thổ.",
    "words": [
      {
        "word": "環境",
        "reading": "かんきょう",
        "meaning": "Môi trường sống",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "国境",
        "reading": "こっきょう",
        "meaning": "Biên giới quốc gia",
        "pos": "noun",
        "readingType": "on"
      },
      {
        "word": "境",
        "reading": "さかい",
        "meaning": "Ranh giới",
        "pos": "noun",
        "readingType": "kun"
      },
      {
        "word": "環境する",
        "reading": "かんきょうする",
        "meaning": "Làm môi trường sống",
        "pos": "verb",
        "readingType": "on"
      }
    ],
    "col": 10,
    "row": 9,
    "order": 99
  },
  {
    "id": "k-10-10",
    "kanji": "嬉",
    "hanViet": "HỶ, HI",
    "onyomi": [
      "き"
    ],
    "kunyomi": [
      "うれ・しい"
    ],
    "meaning": "Vui mừng, hớn hở, hạnh phúc",
    "radical": "女 (Nữ)",
    "radicalMeaning": "Người phụ nữ",
    "strokeCount": 15,
    "mnemonic": "Người con gái (女) nghe bài ca vui tươi (喜) nở nụ cười hớn hở hạnh phúc.",
    "words": [
      {
        "word": "嬉しい",
        "reading": "うれしい",
        "meaning": "Vui sướng, hạnh phúc",
        "pos": "adj",
        "readingType": "kun"
      },
      {
        "word": "嬉し泣き",
        "reading": "うれしなき",
        "meaning": "Khóc vì vui sướng",
        "pos": "noun",
        "readingType": "kun"
      }
    ],
    "col": 10,
    "row": 10,
    "order": 100
  }
];
