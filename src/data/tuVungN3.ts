// 259 Từ vựng theo chủ đề đời sống & 34 Từ vựng bài học
export interface TuVungChuDeItem {
  id: string;
  stt: number;
  topic: string;
  word: string;
  hiragana: string;
  hanViet: string;
  meaning: string;
  note?: string;
}

export interface TuVungBaiHocItem {
  id: string;
  stt: number;
  bai: number;
  slide: number;
  word: string;
  hiragana: string;
  hanViet: string;
  meaning: string;
  example?: string;
  note?: string;
}

export const tuVungChuDeList: TuVungChuDeItem[] = [
  {
    "id": "v_topic_1",
    "stt": 1,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "屋上",
    "hiragana": "おくじょう",
    "hanViet": "屋 Ốc, 上 Thượng",
    "meaning": "Sân thượng",
    "note": ""
  },
  {
    "id": "v_topic_2",
    "stt": 2,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "屋根",
    "hiragana": "やね",
    "hanViet": "屋 Ốc, 根 Căn",
    "meaning": "Mái nhà",
    "note": ""
  },
  {
    "id": "v_topic_3",
    "stt": 3,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "玄関",
    "hiragana": "げんかん",
    "hanViet": "玄 Huyền, 関 Quan",
    "meaning": "Hành lang, cửa vào nhà",
    "note": ""
  },
  {
    "id": "v_topic_4",
    "stt": 4,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "窓ガラス",
    "hiragana": "まどガラス",
    "hanViet": "窓 Song",
    "meaning": "Cửa kính",
    "note": ""
  },
  {
    "id": "v_topic_5",
    "stt": 5,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "雨戸",
    "hiragana": "あまど",
    "hanViet": "雨 Vũ, 戸 Hộ",
    "meaning": "Cửa chớp, cửa chắn mưa",
    "note": ""
  },
  {
    "id": "v_topic_6",
    "stt": 6,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "網戸",
    "hiragana": "あみど",
    "hanViet": "網 Võng, 戸 Hộ",
    "meaning": "Cửa lưới chắn côn trùng",
    "note": "Âm Hán Việt bổ sung (sách không có): 網 Võng"
  },
  {
    "id": "v_topic_7",
    "stt": 7,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "ノブ・ノッブ",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Tay nắm cửa",
    "note": ""
  },
  {
    "id": "v_topic_8",
    "stt": 8,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "居間",
    "hiragana": "いま",
    "hanViet": "居 Cư, 間 Gian",
    "meaning": "Phòng khách",
    "note": ""
  },
  {
    "id": "v_topic_9",
    "stt": 9,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "リビング",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Phòng khách",
    "note": ""
  },
  {
    "id": "v_topic_10",
    "stt": 10,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "寝室",
    "hiragana": "しんしつ",
    "hanViet": "寝 Tẩm, 室 Thất",
    "meaning": "Phòng ngủ",
    "note": ""
  },
  {
    "id": "v_topic_11",
    "stt": 11,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "キッチン",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Nhà bếp",
    "note": ""
  },
  {
    "id": "v_topic_12",
    "stt": 12,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "台所",
    "hiragana": "だいどころ",
    "hanViet": "台 Đài, 所 Sở",
    "meaning": "Nhà bếp",
    "note": ""
  },
  {
    "id": "v_topic_13",
    "stt": 13,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "お風呂",
    "hiragana": "おふろ",
    "hanViet": "風 Phong, 呂 Lã, Lữ",
    "meaning": "Phòng tắm",
    "note": ""
  },
  {
    "id": "v_topic_14",
    "stt": 14,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "洗面所",
    "hiragana": "せんめんじょ",
    "hanViet": "洗 Tẩy, 面 Diện, 所 Sở",
    "meaning": "Bồn rửa mặt",
    "note": ""
  },
  {
    "id": "v_topic_15",
    "stt": 15,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "ベッド",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Giường ngủ",
    "note": ""
  },
  {
    "id": "v_topic_16",
    "stt": 16,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "枕",
    "hiragana": "まくら",
    "hanViet": "枕 Chẩm",
    "meaning": "Gối kê đầu",
    "note": "Âm Hán Việt bổ sung (sách không có): 枕 Chẩm"
  },
  {
    "id": "v_topic_17",
    "stt": 17,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "布団",
    "hiragana": "ふとん",
    "hanViet": "布 Bố, 団 Đoàn",
    "meaning": "Chăn, nệm",
    "note": ""
  },
  {
    "id": "v_topic_18",
    "stt": 18,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "毛布",
    "hiragana": "もうふ",
    "hanViet": "毛 Mao, 布 Bố",
    "meaning": "Chăn",
    "note": ""
  },
  {
    "id": "v_topic_19",
    "stt": 19,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "スリッパ",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Dép mang trong nhà",
    "note": ""
  },
  {
    "id": "v_topic_20",
    "stt": 20,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "電子レンジ",
    "hiragana": "でんしレンジ",
    "hanViet": "電 Điện, 子 Tử",
    "meaning": "Lò vi sóng",
    "note": ""
  },
  {
    "id": "v_topic_21",
    "stt": 21,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "オーブン",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Lò nướng",
    "note": ""
  },
  {
    "id": "v_topic_22",
    "stt": 22,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "冷蔵庫",
    "hiragana": "れいぞうこ",
    "hanViet": "冷 Lãnh, 蔵 Tàng, 庫 Khố",
    "meaning": "Tủ lạnh",
    "note": ""
  },
  {
    "id": "v_topic_23",
    "stt": 23,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "冷凍庫",
    "hiragana": "れいとうこ",
    "hanViet": "冷 Lãnh, 凍 Đông, 庫 Khố",
    "meaning": "Tủ đông",
    "note": ""
  },
  {
    "id": "v_topic_24",
    "stt": 24,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "戸棚",
    "hiragana": "とだな",
    "hanViet": "戸 Hộ, 棚 Bằng",
    "meaning": "Tủ bếp, tủ đựng chén",
    "note": ""
  },
  {
    "id": "v_topic_25",
    "stt": 25,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "ガスレンジ",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Bếp gas",
    "note": ""
  },
  {
    "id": "v_topic_26",
    "stt": 26,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "押し入れ",
    "hiragana": "おしいれ",
    "hanViet": "押 Áp, 入 Nhập",
    "meaning": "Tủ âm tường",
    "note": ""
  },
  {
    "id": "v_topic_27",
    "stt": 27,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "ガスコンロ",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Bếp gas",
    "note": ""
  },
  {
    "id": "v_topic_28",
    "stt": 28,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "レバー",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Cần gạt nước",
    "note": "Đã sửa lỗi chính tả – bản gốc ghi レーバー"
  },
  {
    "id": "v_topic_29",
    "stt": 29,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "蛇口",
    "hiragana": "じゃぐち",
    "hanViet": "蛇 Xà, 口 Khẩu",
    "meaning": "Vòi nước",
    "note": ""
  },
  {
    "id": "v_topic_30",
    "stt": 30,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "流し（台）",
    "hiragana": "ながし（だい）",
    "hanViet": "流 Lưu, 台 Đài",
    "meaning": "Bồn rửa",
    "note": ""
  },
  {
    "id": "v_topic_31",
    "stt": 31,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "ワイングラス",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Ly uống rượu",
    "note": ""
  },
  {
    "id": "v_topic_32",
    "stt": 32,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "ガラスのコップ",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Ly thủy tinh",
    "note": ""
  },
  {
    "id": "v_topic_33",
    "stt": 33,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "コーヒーカップ",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Tách uống cà phê",
    "note": ""
  },
  {
    "id": "v_topic_34",
    "stt": 34,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "湯のみ",
    "hiragana": "ゆのみ",
    "hanViet": "湯 Thang",
    "meaning": "Tách uống trà",
    "note": ""
  },
  {
    "id": "v_topic_35",
    "stt": 35,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "茶わん",
    "hiragana": "ちゃわん",
    "hanViet": "茶 Trà",
    "meaning": "Cái chén, chén uống trà",
    "note": ""
  },
  {
    "id": "v_topic_36",
    "stt": 36,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "丼",
    "hiragana": "どんぶり",
    "hanViet": "",
    "meaning": "Cái tô",
    "note": "Để trống âm Hán Việt (sách không có, âm ít dùng): 丼"
  },
  {
    "id": "v_topic_37",
    "stt": 37,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "お皿",
    "hiragana": "おさら",
    "hanViet": "皿 Mãnh",
    "meaning": "Cái đĩa",
    "note": ""
  },
  {
    "id": "v_topic_38",
    "stt": 38,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "天井",
    "hiragana": "てんじょう",
    "hanViet": "天 Thiên, 井 Tỉnh*",
    "meaning": "Trần nhà",
    "note": "Âm Hán Việt bổ sung (sách không có): 井 Tỉnh"
  },
  {
    "id": "v_topic_39",
    "stt": 39,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "床",
    "hiragana": "ゆか",
    "hanViet": "床 Sàng",
    "meaning": "Sàn nhà",
    "note": ""
  },
  {
    "id": "v_topic_40",
    "stt": 40,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "壁",
    "hiragana": "かべ",
    "hanViet": "壁 Bích",
    "meaning": "Bức tường",
    "note": ""
  },
  {
    "id": "v_topic_41",
    "stt": 41,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "カーテン",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Rèm cửa",
    "note": ""
  },
  {
    "id": "v_topic_42",
    "stt": 42,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "換気扇",
    "hiragana": "かんきせん",
    "hanViet": "換 Hoán, 気 Khí, 扇 Phiến*",
    "meaning": "Quạt thông gió",
    "note": "Âm Hán Việt bổ sung (sách không có): 扇 Phiến"
  },
  {
    "id": "v_topic_43",
    "stt": 43,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "畳",
    "hiragana": "たたみ",
    "hanViet": "畳 Điệp*",
    "meaning": "Chiếu lót sàn nhà",
    "note": "Âm Hán Việt bổ sung (sách không có): 畳 Điệp"
  },
  {
    "id": "v_topic_44",
    "stt": 44,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "じゅうたん",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Tấm thảm",
    "note": ""
  },
  {
    "id": "v_topic_45",
    "stt": 45,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "カーペット",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Tấm thảm",
    "note": ""
  },
  {
    "id": "v_topic_46",
    "stt": 46,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "コード",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Dây điện",
    "note": ""
  },
  {
    "id": "v_topic_47",
    "stt": 47,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "コンセント",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Ổ cắm điện",
    "note": ""
  },
  {
    "id": "v_topic_48",
    "stt": 48,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "プラグ",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Chuôi cắm điện",
    "note": ""
  },
  {
    "id": "v_topic_49",
    "stt": 49,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "エアコン",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Máy điều hòa",
    "note": ""
  },
  {
    "id": "v_topic_50",
    "stt": 50,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "ヒーター",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Lò sưởi",
    "note": ""
  },
  {
    "id": "v_topic_51",
    "stt": 51,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "クーラー",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Máy lạnh",
    "note": ""
  },
  {
    "id": "v_topic_52",
    "stt": 52,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "ストーブ",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Lò sưởi",
    "note": ""
  },
  {
    "id": "v_topic_53",
    "stt": 53,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "冷房",
    "hiragana": "れいぼう",
    "hanViet": "冷 Lãnh, 房 Phòng",
    "meaning": "Phòng lạnh, máy lạnh",
    "note": ""
  },
  {
    "id": "v_topic_54",
    "stt": 54,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "暖房をつける",
    "hiragana": "だんぼう",
    "hanViet": "暖 Noãn, 房 Phòng",
    "meaning": "Bật máy sưởi",
    "note": ""
  },
  {
    "id": "v_topic_55",
    "stt": 55,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "リモコン",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Điều khiển từ xa",
    "note": ""
  },
  {
    "id": "v_topic_56",
    "stt": 56,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "スイッチ",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Công tắc",
    "note": ""
  },
  {
    "id": "v_topic_57",
    "stt": 57,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "電源を入れる",
    "hiragana": "でんげんをいれる",
    "hanViet": "電 Điện, 源 Nguyên, 入 Nhập",
    "meaning": "Bật nguồn",
    "note": ""
  },
  {
    "id": "v_topic_58",
    "stt": 58,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "電源を切る",
    "hiragana": "でんげんをきる",
    "hanViet": "電 Điện, 源 Nguyên, 切 Thiết",
    "meaning": "Ngắt điện",
    "note": ""
  },
  {
    "id": "v_topic_59",
    "stt": 59,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "じゅうたんを敷く",
    "hiragana": "じゅうたんをしく",
    "hanViet": "敷 Phu*",
    "meaning": "Trải thảm",
    "note": "Âm Hán Việt bổ sung (sách không có): 敷 Phu"
  },
  {
    "id": "v_topic_60",
    "stt": 60,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "部屋を暖める",
    "hiragana": "へやをあたためる",
    "hanViet": "部 Bộ, 屋 Ốc, 暖 Noãn",
    "meaning": "Làm ấm phòng",
    "note": ""
  },
  {
    "id": "v_topic_61",
    "stt": 61,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "冷房が効いている",
    "hiragana": "れいぼうがきいている",
    "hanViet": "冷 Lãnh, 房 Phòng, 効 Hiệu",
    "meaning": "Máy lạnh hoạt động tốt",
    "note": ""
  },
  {
    "id": "v_topic_62",
    "stt": 62,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "日当たりがいい",
    "hiragana": "ひあたりがいい",
    "hanViet": "日 Nhật, 当 Đương",
    "meaning": "Đón nắng tốt, sáng",
    "note": ""
  },
  {
    "id": "v_topic_63",
    "stt": 63,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "日当たりが悪い",
    "hiragana": "ひあたりがわるい",
    "hanViet": "日 Nhật, 当 Đương, 悪 Ác",
    "meaning": "Ít ánh nắng chiếu vào, tối",
    "note": ""
  },
  {
    "id": "v_topic_64",
    "stt": 64,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "南向き",
    "hiragana": "みなみむき",
    "hanViet": "南 Nam, 向 Hướng",
    "meaning": "Nhà quay mặt hướng nam",
    "note": ""
  },
  {
    "id": "v_topic_65",
    "stt": 65,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "北",
    "hiragana": "きた",
    "hanViet": "北 Bắc",
    "meaning": "Hướng bắc",
    "note": ""
  },
  {
    "id": "v_topic_66",
    "stt": 66,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "西",
    "hiragana": "にし",
    "hanViet": "西 Tây",
    "meaning": "Hướng tây",
    "note": ""
  },
  {
    "id": "v_topic_67",
    "stt": 67,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "東",
    "hiragana": "ひがし",
    "hanViet": "東 Đông",
    "meaning": "Hướng đông",
    "note": ""
  },
  {
    "id": "v_topic_68",
    "stt": 68,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "水道",
    "hiragana": "すいどう",
    "hanViet": "水 Thủy, 道 Đạo",
    "meaning": "Nước máy",
    "note": ""
  },
  {
    "id": "v_topic_69",
    "stt": 69,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "ひねる（I）",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Vặn",
    "note": ""
  },
  {
    "id": "v_topic_70",
    "stt": 70,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "水道の蛇口をひねる",
    "hiragana": "すいどうのじゃぐちをひねる",
    "hanViet": "水 Thủy, 道 Đạo, 蛇 Xà, 口 Khẩu",
    "meaning": "Vặn vòi nước",
    "note": "Claude bổ sung (bản gốc để trống) – bản gốc để trống cách đọc"
  },
  {
    "id": "v_topic_71",
    "stt": 71,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "水が凍る",
    "hiragana": "みずがこおる",
    "hanViet": "水 Thủy, 凍 Đông",
    "meaning": "Nước đóng băng",
    "note": ""
  },
  {
    "id": "v_topic_72",
    "stt": 72,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "氷になる",
    "hiragana": "こおりになる",
    "hanViet": "氷 Băng",
    "meaning": "Thành nước đá",
    "note": ""
  },
  {
    "id": "v_topic_73",
    "stt": 73,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "冷凍する",
    "hiragana": "れいとうする",
    "hanViet": "冷 Lãnh, 凍 Đông",
    "meaning": "Đông lạnh",
    "note": ""
  },
  {
    "id": "v_topic_74",
    "stt": 74,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "保存する",
    "hiragana": "ほぞんする",
    "hanViet": "保 Bảo, 存 Tồn",
    "meaning": "Bảo quản",
    "note": ""
  },
  {
    "id": "v_topic_75",
    "stt": 75,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "残り物",
    "hiragana": "のこりもの",
    "hanViet": "残 Tàn, 物 Vật",
    "meaning": "Thức ăn thừa",
    "note": ""
  },
  {
    "id": "v_topic_76",
    "stt": 76,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "を温める",
    "hiragana": "あたためる",
    "hanViet": "温 Ôn",
    "meaning": "Hâm nóng",
    "note": ""
  },
  {
    "id": "v_topic_77",
    "stt": 77,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "を冷やす",
    "hiragana": "ひやす",
    "hanViet": "冷 Lãnh",
    "meaning": "Ướp lạnh",
    "note": ""
  },
  {
    "id": "v_topic_78",
    "stt": 78,
    "topic": "1日目 – Nhà cửa, đồ dùng",
    "word": "が冷えている",
    "hiragana": "ひえている",
    "hanViet": "冷 Lãnh",
    "meaning": "(Bia) đã lạnh",
    "note": ""
  },
  {
    "id": "v_topic_79",
    "stt": 79,
    "topic": "2-3日目 – 炊事 (Nấu ăn)",
    "word": "大さじ",
    "hiragana": "おおさじ",
    "hanViet": "大 Đại",
    "meaning": "Muỗng to, muỗng canh",
    "note": ""
  },
  {
    "id": "v_topic_80",
    "stt": 80,
    "topic": "2-3日目 – 炊事 (Nấu ăn)",
    "word": "小さじ",
    "hiragana": "こさじ",
    "hanViet": "小 Tiểu",
    "meaning": "Muỗng nhỏ, muỗng cà phê",
    "note": ""
  },
  {
    "id": "v_topic_81",
    "stt": 81,
    "topic": "2-3日目 – 炊事 (Nấu ăn)",
    "word": "包丁",
    "hiragana": "ほうちょう",
    "hanViet": "包 Bao, 丁 Đinh",
    "meaning": "Dao làm bếp",
    "note": ""
  },
  {
    "id": "v_topic_82",
    "stt": 82,
    "topic": "2-3日目 – 炊事 (Nấu ăn)",
    "word": "まな板",
    "hiragana": "まないた",
    "hanViet": "板 Bảng",
    "meaning": "Tấm thớt",
    "note": ""
  },
  {
    "id": "v_topic_83",
    "stt": 83,
    "topic": "2-3日目 – 炊事 (Nấu ăn)",
    "word": "はかり",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Cái cân",
    "note": ""
  },
  {
    "id": "v_topic_84",
    "stt": 84,
    "topic": "2-3日目 – 炊事 (Nấu ăn)",
    "word": "やかん",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Ấm nấu nước",
    "note": ""
  },
  {
    "id": "v_topic_85",
    "stt": 85,
    "topic": "2-3日目 – 炊事 (Nấu ăn)",
    "word": "なべ",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Cái nồi",
    "note": ""
  },
  {
    "id": "v_topic_86",
    "stt": 86,
    "topic": "2-3日目 – 炊事 (Nấu ăn)",
    "word": "フライパン",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Cái chảo",
    "note": ""
  },
  {
    "id": "v_topic_87",
    "stt": 87,
    "topic": "2-3日目 – 炊事 (Nấu ăn)",
    "word": "フライ返し",
    "hiragana": "フライがえし",
    "hanViet": "返 Phản",
    "meaning": "Cái xẻng, cái sạn",
    "note": ""
  },
  {
    "id": "v_topic_88",
    "stt": 88,
    "topic": "2-3日目 – 炊事 (Nấu ăn)",
    "word": "炊飯器",
    "hiragana": "すいはんき",
    "hanViet": "炊 Xúy, 飯 Phạn, 器 Khí",
    "meaning": "Nồi cơm điện",
    "note": ""
  },
  {
    "id": "v_topic_89",
    "stt": 89,
    "topic": "2-3日目 – 炊事 (Nấu ăn)",
    "word": "しゃもじ",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Muỗng xúc cơm",
    "note": ""
  },
  {
    "id": "v_topic_90",
    "stt": 90,
    "topic": "2-3日目 – 炊事 (Nấu ăn)",
    "word": "ふた",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Cái nắp",
    "note": ""
  },
  {
    "id": "v_topic_91",
    "stt": 91,
    "topic": "2-3日目 – 炊事 (Nấu ăn)",
    "word": "おたま",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Cái vá múc canh",
    "note": ""
  },
  {
    "id": "v_topic_92",
    "stt": 92,
    "topic": "2-3日目 – 炊事 (Nấu ăn)",
    "word": "材料",
    "hiragana": "ざいりょう",
    "hanViet": "材 Tài, 料 Liệu",
    "meaning": "Nguyên liệu nấu ăn",
    "note": ""
  },
  {
    "id": "v_topic_93",
    "stt": 93,
    "topic": "2-3日目 – 炊事 (Nấu ăn)",
    "word": "ジャガイモ",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Khoai tây",
    "note": ""
  },
  {
    "id": "v_topic_94",
    "stt": 94,
    "topic": "2-3日目 – 炊事 (Nấu ăn)",
    "word": "玉ねぎ",
    "hiragana": "たまねぎ",
    "hanViet": "玉 Ngọc",
    "meaning": "Hành tây",
    "note": ""
  },
  {
    "id": "v_topic_95",
    "stt": 95,
    "topic": "2-3日目 – 炊事 (Nấu ăn)",
    "word": "皮",
    "hiragana": "かわ",
    "hanViet": "皮 Bì",
    "meaning": "Vỏ",
    "note": ""
  },
  {
    "id": "v_topic_96",
    "stt": 96,
    "topic": "2-3日目 – 炊事 (Nấu ăn)",
    "word": "幅",
    "hiragana": "はば",
    "hanViet": "幅 Bức*",
    "meaning": "Bề ngang",
    "note": "Âm Hán Việt bổ sung (sách không có): 幅 Bức"
  },
  {
    "id": "v_topic_97",
    "stt": 97,
    "topic": "2-3日目 – 炊事 (Nấu ăn)",
    "word": "夕食",
    "hiragana": "ゆうしょく",
    "hanViet": "夕 Tịch, 食 Thực",
    "meaning": "Cơm tối",
    "note": ""
  },
  {
    "id": "v_topic_98",
    "stt": 98,
    "topic": "2-3日目 – 炊事 (Nấu ăn)",
    "word": "朝食",
    "hiragana": "ちょうしょく",
    "hanViet": "朝 Triều, 食 Thực",
    "meaning": "Cơm sáng",
    "note": ""
  },
  {
    "id": "v_topic_99",
    "stt": 99,
    "topic": "2-3日目 – 炊事 (Nấu ăn)",
    "word": "昼食",
    "hiragana": "ちゅうしょく",
    "hanViet": "昼 Trú, 食 Thực",
    "meaning": "Cơm trưa",
    "note": ""
  },
  {
    "id": "v_topic_100",
    "stt": 100,
    "topic": "2-3日目 – 炊事 (Nấu ăn)",
    "word": "おかず",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Món ăn",
    "note": ""
  },
  {
    "id": "v_topic_101",
    "stt": 101,
    "topic": "2-3日目 – 炊事 (Nấu ăn)",
    "word": "主食",
    "hiragana": "しゅしょく",
    "hanViet": "主 Chủ, 食 Thực",
    "meaning": "Món chính (cơm, bánh mì)",
    "note": ""
  },
  {
    "id": "v_topic_102",
    "stt": 102,
    "topic": "2-3日目 – 炊事 (Nấu ăn)",
    "word": "副食",
    "hiragana": "ふくしょく",
    "hanViet": "副 Phó, 食 Thực",
    "meaning": "Món phụ (thức ăn)",
    "note": ""
  },
  {
    "id": "v_topic_103",
    "stt": 103,
    "topic": "2-3日目 – 炊事 (Nấu ăn)",
    "word": "栄養",
    "hiragana": "えいよう",
    "hanViet": "栄 Vinh, 養 Dưỡng",
    "meaning": "Dinh dưỡng",
    "note": ""
  },
  {
    "id": "v_topic_104",
    "stt": 104,
    "topic": "2-3日目 – 炊事 (Nấu ăn)",
    "word": "バランス",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Cân bằng",
    "note": ""
  },
  {
    "id": "v_topic_105",
    "stt": 105,
    "topic": "2-3日目 – 炊事 (Nấu ăn)",
    "word": "カロリー",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Năng lượng",
    "note": ""
  },
  {
    "id": "v_topic_106",
    "stt": 106,
    "topic": "2-3日目 – 炊事 (Nấu ăn)",
    "word": "少々",
    "hiragana": "しょうしょう",
    "hanViet": "少 Thiểu",
    "meaning": "Một ít",
    "note": ""
  },
  {
    "id": "v_topic_107",
    "stt": 107,
    "topic": "2-3日目 – 炊事 (Nấu ăn)",
    "word": "調味料",
    "hiragana": "ちょうみりょう",
    "hanViet": "調 Điều, 味 Vị, 料 Liệu",
    "meaning": "Gia vị",
    "note": ""
  },
  {
    "id": "v_topic_108",
    "stt": 108,
    "topic": "2-3日目 – 炊事 (Nấu ăn)",
    "word": "酢",
    "hiragana": "す",
    "hanViet": "酢 Tạc",
    "meaning": "Giấm",
    "note": ""
  },
  {
    "id": "v_topic_109",
    "stt": 109,
    "topic": "2-3日目 – 炊事 (Nấu ăn)",
    "word": "サラダ油",
    "hiragana": "サラダゆ",
    "hanViet": "油 Du",
    "meaning": "Dầu cải",
    "note": ""
  },
  {
    "id": "v_topic_110",
    "stt": 110,
    "topic": "2-3日目 – 炊事 (Nấu ăn)",
    "word": "天ぷら油",
    "hiragana": "てんぷらあぶら",
    "hanViet": "天 Thiên, 油 Du",
    "meaning": "Dầu để chiên",
    "note": ""
  },
  {
    "id": "v_topic_111",
    "stt": 111,
    "topic": "2-3日目 – 炊事 (Nấu ăn)",
    "word": "こしょう",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Tiêu",
    "note": ""
  },
  {
    "id": "v_topic_112",
    "stt": 112,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "エプロン",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Tạp dề",
    "note": ""
  },
  {
    "id": "v_topic_113",
    "stt": 113,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "ほうき",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Chổi quét",
    "note": ""
  },
  {
    "id": "v_topic_114",
    "stt": 114,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "ちりとり",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Đồ hốt rác",
    "note": ""
  },
  {
    "id": "v_topic_115",
    "stt": 115,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "ぞうきん",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Giẻ lau",
    "note": ""
  },
  {
    "id": "v_topic_116",
    "stt": 116,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "ふきん",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Khăn lau",
    "note": ""
  },
  {
    "id": "v_topic_117",
    "stt": 117,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "台ぶきん",
    "hiragana": "だいぶきん",
    "hanViet": "台 Đài",
    "meaning": "Khăn lau bàn",
    "note": ""
  },
  {
    "id": "v_topic_118",
    "stt": 118,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "バケツ",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Xô múc nước",
    "note": ""
  },
  {
    "id": "v_topic_119",
    "stt": 119,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "モップ",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Cây lau nhà",
    "note": ""
  },
  {
    "id": "v_topic_120",
    "stt": 120,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "掃除機",
    "hiragana": "そうじき",
    "hanViet": "掃 Tảo, 除 Trừ, 機 Cơ",
    "meaning": "Máy hút bụi",
    "note": ""
  },
  {
    "id": "v_topic_121",
    "stt": 121,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "ゴミ箱",
    "hiragana": "ごみばこ",
    "hanViet": "箱 Tương",
    "meaning": "Thùng rác",
    "note": ""
  },
  {
    "id": "v_topic_122",
    "stt": 122,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "くずかご",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Thùng rác",
    "note": ""
  },
  {
    "id": "v_topic_123",
    "stt": 123,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "ゴミ袋",
    "hiragana": "ごみぶくろ",
    "hanViet": "袋 Đại",
    "meaning": "Túi đựng rác",
    "note": ""
  },
  {
    "id": "v_topic_124",
    "stt": 124,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "ほこり",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Bụi",
    "note": ""
  },
  {
    "id": "v_topic_125",
    "stt": 125,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "生ごみ",
    "hiragana": "なまごみ",
    "hanViet": "生 Sinh",
    "meaning": "Rác sinh hoạt",
    "note": ""
  },
  {
    "id": "v_topic_126",
    "stt": 126,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "燃えるゴミ",
    "hiragana": "もえるゴミ",
    "hanViet": "燃 Nhiên",
    "meaning": "Rác cháy được",
    "note": ""
  },
  {
    "id": "v_topic_127",
    "stt": 127,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "可燃物",
    "hiragana": "かねんぶつ",
    "hanViet": "可 Khả, 燃 Nhiên, 物 Vật",
    "meaning": "Rác cháy được",
    "note": ""
  },
  {
    "id": "v_topic_128",
    "stt": 128,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "燃えないゴミ",
    "hiragana": "もえないゴミ",
    "hanViet": "燃 Nhiên",
    "meaning": "Rác không đốt được",
    "note": ""
  },
  {
    "id": "v_topic_129",
    "stt": 129,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "不燃物",
    "hiragana": "ふねんぶつ",
    "hanViet": "不 Bất, 燃 Nhiên, 物 Vật",
    "meaning": "Rác không đốt được",
    "note": ""
  },
  {
    "id": "v_topic_130",
    "stt": 130,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "粗大ゴミ",
    "hiragana": "そだいゴミ",
    "hanViet": "粗 Thô, 大 Đại",
    "meaning": "Rác to",
    "note": "Âm Hán Việt bổ sung (sách không có): 粗 Thô"
  },
  {
    "id": "v_topic_131",
    "stt": 131,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "資源ゴミ",
    "hiragana": "しげんゴミ",
    "hanViet": "資 Tư, 源 Nguyên",
    "meaning": "Rác tái chế",
    "note": ""
  },
  {
    "id": "v_topic_132",
    "stt": 132,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "物置",
    "hiragana": "ものおき",
    "hanViet": "物 Vật, 置 Trí",
    "meaning": "Kho chứa dụng cụ",
    "note": ""
  },
  {
    "id": "v_topic_133",
    "stt": 133,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "家具",
    "hiragana": "かぐ",
    "hanViet": "家 Gia, 具 Cụ",
    "meaning": "Đồ gỗ gia dụng, đồ nội thất",
    "note": ""
  },
  {
    "id": "v_topic_134",
    "stt": 134,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "面倒な",
    "hiragana": "めんどう",
    "hanViet": "面 Diện, 倒 Đảo",
    "meaning": "Phiền phức",
    "note": ""
  },
  {
    "id": "v_topic_135",
    "stt": 135,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "面倒くさい",
    "hiragana": "めんどうくさい",
    "hanViet": "面 Diện, 倒 Đảo",
    "meaning": "Phiền phức",
    "note": ""
  },
  {
    "id": "v_topic_136",
    "stt": 136,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "エプロンをかける / をつける / をする",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Mang tạp dề",
    "note": ""
  },
  {
    "id": "v_topic_137",
    "stt": 137,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "をどける",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Di dời",
    "note": ""
  },
  {
    "id": "v_topic_138",
    "stt": 138,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "がどく",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Được dời",
    "note": ""
  },
  {
    "id": "v_topic_139",
    "stt": 139,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "部屋を散らかす",
    "hiragana": "ちらかす",
    "hanViet": "部 Bộ, 屋 Ốc, 散 Tán",
    "meaning": "Làm bừa bộn",
    "note": ""
  },
  {
    "id": "v_topic_140",
    "stt": 140,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "部屋が散らかる",
    "hiragana": "ちらかる",
    "hanViet": "部 Bộ, 屋 Ốc, 散 Tán",
    "meaning": "Bừa bộn",
    "note": ""
  },
  {
    "id": "v_topic_141",
    "stt": 141,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "部屋を片付ける",
    "hiragana": "かたづける",
    "hanViet": "部 Bộ, 屋 Ốc, 片 Phiến, 付 Phó",
    "meaning": "Dọn dẹp, sắp xếp",
    "note": ""
  },
  {
    "id": "v_topic_142",
    "stt": 142,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "部屋が片付く",
    "hiragana": "かたづく",
    "hanViet": "部 Bộ, 屋 Ốc, 片 Phiến, 付 Phó",
    "meaning": "Được dọn dẹp",
    "note": ""
  },
  {
    "id": "v_topic_143",
    "stt": 143,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "水をこぼす",
    "hiragana": "みずをこぼす",
    "hanViet": "水 Thủy",
    "meaning": "Làm đổ",
    "note": "Claude bổ sung (bản gốc để trống) – bản gốc để trống cách đọc"
  },
  {
    "id": "v_topic_144",
    "stt": 144,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "水がこぼれる",
    "hiragana": "みずがこぼれる",
    "hanViet": "水 Thủy",
    "meaning": "Tràn, đổ",
    "note": "Claude bổ sung (bản gốc để trống) – bản gốc để trống cách đọc"
  },
  {
    "id": "v_topic_145",
    "stt": 145,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "ほこりがたまる",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Bụi đọng lại",
    "note": ""
  },
  {
    "id": "v_topic_146",
    "stt": 146,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "ほこりがつもる",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Phủ đầy bụi",
    "note": ""
  },
  {
    "id": "v_topic_147",
    "stt": 147,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "雪が積もる",
    "hiragana": "ゆきがつもる",
    "hanViet": "雪 Tuyết, 積 Tích",
    "meaning": "Tuyết phủ dày",
    "note": ""
  },
  {
    "id": "v_topic_148",
    "stt": 148,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "ほこりを取る",
    "hiragana": "ほこりをとる",
    "hanViet": "取 Thủ",
    "meaning": "Phủi bụi",
    "note": ""
  },
  {
    "id": "v_topic_149",
    "stt": 149,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "掃除機",
    "hiragana": "そうじき",
    "hanViet": "掃 Tảo, 除 Trừ, 機 Cơ",
    "meaning": "Máy hút bụi",
    "note": ""
  },
  {
    "id": "v_topic_150",
    "stt": 150,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "掃除機をかける",
    "hiragana": "そうじきをかける",
    "hanViet": "掃 Tảo, 除 Trừ, 機 Cơ",
    "meaning": "Hút bụi",
    "note": ""
  },
  {
    "id": "v_topic_151",
    "stt": 151,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "ほうきで掃く",
    "hiragana": "ほうきではく",
    "hanViet": "掃 Tảo",
    "meaning": "Quét bằng chổi",
    "note": ""
  },
  {
    "id": "v_topic_152",
    "stt": 152,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "水をくむ",
    "hiragana": "みずをくむ",
    "hanViet": "水 Thủy",
    "meaning": "Múc nước",
    "note": ""
  },
  {
    "id": "v_topic_153",
    "stt": 153,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "ぞうきんをぬらす",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Làm ướt, nhúng nước",
    "note": ""
  },
  {
    "id": "v_topic_154",
    "stt": 154,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "ぞうきんをしぼる",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Vắt khăn",
    "note": ""
  },
  {
    "id": "v_topic_155",
    "stt": 155,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "ゆかをふく",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Lau sàn nhà",
    "note": ""
  },
  {
    "id": "v_topic_156",
    "stt": 156,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "家具を磨く",
    "hiragana": "かぐをみがく",
    "hanViet": "家 Gia, 具 Cụ, 磨 Ma",
    "meaning": "Đánh bóng",
    "note": ""
  },
  {
    "id": "v_topic_157",
    "stt": 157,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "ブラシでこする",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Chà xát bằng bàn chải",
    "note": ""
  },
  {
    "id": "v_topic_158",
    "stt": 158,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "ゴミを分ける",
    "hiragana": "ごみをわける",
    "hanViet": "分 Phân",
    "meaning": "Phân loại",
    "note": ""
  },
  {
    "id": "v_topic_159",
    "stt": 159,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "分別する",
    "hiragana": "ぶんべつする",
    "hanViet": "分 Phân, 別 Biệt",
    "meaning": "Phân loại",
    "note": ""
  },
  {
    "id": "v_topic_160",
    "stt": 160,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "スリッパをそろえる",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Sắp xếp, so cho đều",
    "note": ""
  },
  {
    "id": "v_topic_161",
    "stt": 161,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "物置にしまう",
    "hiragana": "ものおきにしまう",
    "hanViet": "物 Vật, 置 Trí",
    "meaning": "Cất vào kho",
    "note": ""
  },
  {
    "id": "v_topic_162",
    "stt": 162,
    "topic": "4日目 – 掃除 (Dọn dẹp)",
    "word": "ゴミを出す",
    "hiragana": "ごみをだす",
    "hanViet": "出 Xuất",
    "meaning": "Đổ rác",
    "note": ""
  },
  {
    "id": "v_topic_163",
    "stt": 163,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "洗濯機",
    "hiragana": "せんたくき",
    "hanViet": "洗 Tẩy, 濯 Trạc, 機 Cơ",
    "meaning": "Máy giặt",
    "note": ""
  },
  {
    "id": "v_topic_164",
    "stt": 164,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "乾燥機",
    "hiragana": "かんそうき",
    "hanViet": "乾 Can, 燥 Táo, 機 Cơ",
    "meaning": "Máy sấy",
    "note": "Âm Hán Việt bổ sung (sách không có): 燥 Táo"
  },
  {
    "id": "v_topic_165",
    "stt": 165,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "洗濯物",
    "hiragana": "せんたくもの",
    "hanViet": "洗 Tẩy, 濯 Trạc, 物 Vật",
    "meaning": "Đồ giặt",
    "note": ""
  },
  {
    "id": "v_topic_166",
    "stt": 166,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "がたまる",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Dồn lại",
    "note": ""
  },
  {
    "id": "v_topic_167",
    "stt": 167,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "をためる",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Để dồn lại",
    "note": ""
  },
  {
    "id": "v_topic_168",
    "stt": 168,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "がぬれる",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Bị ướt",
    "note": ""
  },
  {
    "id": "v_topic_169",
    "stt": 169,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "をぬらす",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Làm ướt",
    "note": ""
  },
  {
    "id": "v_topic_170",
    "stt": 170,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "が湿る（I）",
    "hiragana": "しめる",
    "hanViet": "湿 Thấp*",
    "meaning": "Ẩm ướt",
    "note": "Âm Hán Việt bổ sung (sách không có): 湿 Thấp"
  },
  {
    "id": "v_topic_171",
    "stt": 171,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "が乾く",
    "hiragana": "かわく",
    "hanViet": "乾 Can",
    "meaning": "Khô",
    "note": ""
  },
  {
    "id": "v_topic_172",
    "stt": 172,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "を乾かす",
    "hiragana": "かわかす",
    "hanViet": "乾 Can",
    "meaning": "Sấy khô",
    "note": ""
  },
  {
    "id": "v_topic_173",
    "stt": 173,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "を干す",
    "hiragana": "ほす",
    "hanViet": "干 Can",
    "meaning": "Phơi khô",
    "note": ""
  },
  {
    "id": "v_topic_174",
    "stt": 174,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "を畳む",
    "hiragana": "たたむ",
    "hanViet": "畳 Điệp*",
    "meaning": "Gấp lại",
    "note": "Âm Hán Việt bổ sung (sách không có): 畳 Điệp"
  },
  {
    "id": "v_topic_175",
    "stt": 175,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "真っ白に仕上がる",
    "hiragana": "まっしろにしあがる",
    "hanViet": "真 Chân, 白 Bạch, 仕 Sĩ, 上 Thượng",
    "meaning": "Giặt xong trắng tinh",
    "note": ""
  },
  {
    "id": "v_topic_176",
    "stt": 176,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "を汚す",
    "hiragana": "よごす",
    "hanViet": "汚 Ô",
    "meaning": "Làm bẩn",
    "note": ""
  },
  {
    "id": "v_topic_177",
    "stt": 177,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "が汚れる",
    "hiragana": "よごれる",
    "hanViet": "汚 Ô",
    "meaning": "Dơ bẩn",
    "note": ""
  },
  {
    "id": "v_topic_178",
    "stt": 178,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "汚れ",
    "hiragana": "よごれ",
    "hanViet": "汚 Ô",
    "meaning": "Vết dơ",
    "note": ""
  },
  {
    "id": "v_topic_179",
    "stt": 179,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "汚れが落ちる",
    "hiragana": "よごれがおちる",
    "hanViet": "汚 Ô, 落 Lạc",
    "meaning": "Tan vết dơ",
    "note": ""
  },
  {
    "id": "v_topic_180",
    "stt": 180,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "洗剤",
    "hiragana": "せんざい",
    "hanViet": "洗 Tẩy, 剤 Tễ",
    "meaning": "Bột giặt",
    "note": ""
  },
  {
    "id": "v_topic_181",
    "stt": 181,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "漂白剤",
    "hiragana": "ひょうはくざい",
    "hanViet": "漂 Phiêu, 白 Bạch, 剤 Tễ",
    "meaning": "Thuốc tẩy",
    "note": ""
  },
  {
    "id": "v_topic_182",
    "stt": 182,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "柔軟剤",
    "hiragana": "じゅうなんざい",
    "hanViet": "柔 Nhu, 軟 Nhuyễn, 剤 Tễ",
    "meaning": "Nước xả vải",
    "note": ""
  },
  {
    "id": "v_topic_183",
    "stt": 183,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "ブラシ",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Bàn chải",
    "note": ""
  },
  {
    "id": "v_topic_184",
    "stt": 184,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "クリーニング",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Tiệm giặt ủi",
    "note": ""
  },
  {
    "id": "v_topic_185",
    "stt": 185,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "コインランドリー",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Máy giặt tự động",
    "note": ""
  },
  {
    "id": "v_topic_186",
    "stt": 186,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "Tシャツ",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Áo thun",
    "note": "Claude bổ sung (bản gốc để trống) – bản gốc để trống nghĩa"
  },
  {
    "id": "v_topic_187",
    "stt": 187,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "ワイシャツ",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Áo sơ mi",
    "note": ""
  },
  {
    "id": "v_topic_188",
    "stt": 188,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "ズボン",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Quần tây",
    "note": ""
  },
  {
    "id": "v_topic_189",
    "stt": 189,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "ジーンズ",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Quần jeans",
    "note": ""
  },
  {
    "id": "v_topic_190",
    "stt": 190,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "タオル",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Khăn tắm",
    "note": ""
  },
  {
    "id": "v_topic_191",
    "stt": 191,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "ハンカチ",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Khăn tay",
    "note": ""
  },
  {
    "id": "v_topic_192",
    "stt": 192,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "そで",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Tay áo",
    "note": ""
  },
  {
    "id": "v_topic_193",
    "stt": 193,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "すそ",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Vạt áo",
    "note": ""
  },
  {
    "id": "v_topic_194",
    "stt": 194,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "えり",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Cổ áo",
    "note": ""
  },
  {
    "id": "v_topic_195",
    "stt": 195,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "ボタン",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Nút",
    "note": ""
  },
  {
    "id": "v_topic_196",
    "stt": 196,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "吊るす",
    "hiragana": "つるす",
    "hanViet": "吊 Điếu*",
    "meaning": "Treo lên",
    "note": "Âm Hán Việt bổ sung (sách không có): 吊 Điếu"
  },
  {
    "id": "v_topic_197",
    "stt": 197,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "しわ",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Nếp nhăn",
    "note": ""
  },
  {
    "id": "v_topic_198",
    "stt": 198,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "を伸ばす",
    "hiragana": "のばす",
    "hanViet": "伸 Thân",
    "meaning": "Kéo giãn",
    "note": ""
  },
  {
    "id": "v_topic_199",
    "stt": 199,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "が伸びる",
    "hiragana": "のびる",
    "hanViet": "伸 Thân",
    "meaning": "Giãn, nở ra",
    "note": ""
  },
  {
    "id": "v_topic_200",
    "stt": 200,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "が縮む",
    "hiragana": "ちぢむ",
    "hanViet": "縮 Súc*",
    "meaning": "Co rút",
    "note": "Âm Hán Việt bổ sung (sách không có): 縮 Súc"
  },
  {
    "id": "v_topic_201",
    "stt": 201,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "色が落ちる",
    "hiragana": "いろがおちる",
    "hanViet": "色 Sắc, 落 Lạc",
    "meaning": "Phai màu",
    "note": ""
  },
  {
    "id": "v_topic_202",
    "stt": 202,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "ウール",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Vải len",
    "note": ""
  },
  {
    "id": "v_topic_203",
    "stt": 203,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "ハンガー",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Móc phơi quần áo",
    "note": ""
  },
  {
    "id": "v_topic_204",
    "stt": 204,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "アイロン",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Bàn là",
    "note": ""
  },
  {
    "id": "v_topic_205",
    "stt": 205,
    "topic": "5日目 – 洗濯 (Giặt giũ)",
    "word": "アイロンをかける",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Ủi quần áo",
    "note": ""
  },
  {
    "id": "v_topic_206",
    "stt": 206,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "かわいい",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Dễ thương",
    "note": ""
  },
  {
    "id": "v_topic_207",
    "stt": 207,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "かわいらしい",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Dễ thương",
    "note": ""
  },
  {
    "id": "v_topic_208",
    "stt": 208,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "かわいそう",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Tội nghiệp, đáng thương",
    "note": ""
  },
  {
    "id": "v_topic_209",
    "stt": 209,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "行儀がいい",
    "hiragana": "ぎょうぎがいい",
    "hanViet": "行 Hành, 儀 Nghi",
    "meaning": "Lễ phép",
    "note": ""
  },
  {
    "id": "v_topic_210",
    "stt": 210,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "利口な",
    "hiragana": "りこう",
    "hanViet": "利 Lợi, 口 Khẩu",
    "meaning": "Thông minh, lanh lợi",
    "note": ""
  },
  {
    "id": "v_topic_211",
    "stt": 211,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "かしこい",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Thông minh, lanh lợi",
    "note": ""
  },
  {
    "id": "v_topic_212",
    "stt": 212,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "人なつこい",
    "hiragana": "ひとなつこい",
    "hanViet": "人 Nhân",
    "meaning": "Thân thiện",
    "note": "Claude bổ sung (bản gốc để trống) – bản gốc để trống cách đọc"
  },
  {
    "id": "v_topic_213",
    "stt": 213,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "わがままな",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Ích kỷ, bướng bỉnh",
    "note": ""
  },
  {
    "id": "v_topic_214",
    "stt": 214,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "生意気な",
    "hiragana": "なまいき",
    "hanViet": "生 Sinh, 意 Ý, 気 Khí",
    "meaning": "Hỗn láo",
    "note": ""
  },
  {
    "id": "v_topic_215",
    "stt": 215,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "えらい",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Tài giỏi",
    "note": ""
  },
  {
    "id": "v_topic_216",
    "stt": 216,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "いたずらな",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Nghịch ngợm",
    "note": ""
  },
  {
    "id": "v_topic_217",
    "stt": 217,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "幼い",
    "hiragana": "おさない",
    "hanViet": "幼 Ấu",
    "meaning": "Ngây thơ",
    "note": ""
  },
  {
    "id": "v_topic_218",
    "stt": 218,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "赤ちゃん",
    "hiragana": "あかちゃん",
    "hanViet": "赤 Xích",
    "meaning": "Trẻ sơ sinh",
    "note": ""
  },
  {
    "id": "v_topic_219",
    "stt": 219,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "育児",
    "hiragana": "いくじ",
    "hanViet": "育 Dục, 児 Nhi",
    "meaning": "Nuôi dạy trẻ",
    "note": ""
  },
  {
    "id": "v_topic_220",
    "stt": 220,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "子育て",
    "hiragana": "こそだて",
    "hanViet": "子 Tử, 育 Dục",
    "meaning": "Nuôi con",
    "note": ""
  },
  {
    "id": "v_topic_221",
    "stt": 221,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "幼児",
    "hiragana": "ようじ",
    "hanViet": "幼 Ấu, 児 Nhi",
    "meaning": "Trẻ em",
    "note": ""
  },
  {
    "id": "v_topic_222",
    "stt": 222,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "ペット",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Thú cưng",
    "note": ""
  },
  {
    "id": "v_topic_223",
    "stt": 223,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "お尻",
    "hiragana": "おしり",
    "hanViet": "",
    "meaning": "Cái mông",
    "note": "Để trống âm Hán Việt (sách không có, âm ít dùng): 尻"
  },
  {
    "id": "v_topic_224",
    "stt": 224,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "迷子",
    "hiragana": "まいご",
    "hanViet": "迷 Mê, 子 Tử",
    "meaning": "Trẻ lạc",
    "note": ""
  },
  {
    "id": "v_topic_225",
    "stt": 225,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "餌",
    "hiragana": "えさ",
    "hanViet": "餌 Nhĩ",
    "meaning": "Thức ăn cho thú",
    "note": ""
  },
  {
    "id": "v_topic_226",
    "stt": 226,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "穴",
    "hiragana": "あな",
    "hanViet": "穴 Huyệt",
    "meaning": "Cái lỗ",
    "note": ""
  },
  {
    "id": "v_topic_227",
    "stt": 227,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "しっぽ",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Cái đuôi",
    "note": ""
  },
  {
    "id": "v_topic_228",
    "stt": 228,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "子供が生まれる",
    "hiragana": "こどもがうまれる",
    "hanViet": "子 Tử, 供 Cung, 生 Sinh",
    "meaning": "Trẻ em được sinh ra",
    "note": ""
  },
  {
    "id": "v_topic_229",
    "stt": 229,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "子供を産む",
    "hiragana": "こどもをうむ",
    "hanViet": "子 Tử, 供 Cung, 産 Sản",
    "meaning": "Sinh con",
    "note": ""
  },
  {
    "id": "v_topic_230",
    "stt": 230,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "子供を甘やかす",
    "hiragana": "あまやかす",
    "hanViet": "子 Tử, 供 Cung, 甘 Cam",
    "meaning": "Nuông chiều",
    "note": "Đã sửa lỗi chính tả – bản gốc ghi 子供をを甘やかす"
  },
  {
    "id": "v_topic_231",
    "stt": 231,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "子供をおんぶする",
    "hiragana": "こどもをおんぶする",
    "hanViet": "子 Tử, 供 Cung",
    "meaning": "Cõng trên lưng",
    "note": "Claude bổ sung (bản gốc để trống) – bản gốc để trống cách đọc"
  },
  {
    "id": "v_topic_232",
    "stt": 232,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "子供を抱っこする",
    "hiragana": "だっこする",
    "hanViet": "子 Tử, 供 Cung, 抱 Bão",
    "meaning": "Bế trên tay",
    "note": ""
  },
  {
    "id": "v_topic_233",
    "stt": 233,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "子供を抱く",
    "hiragana": "だく",
    "hanViet": "子 Tử, 供 Cung, 抱 Bão",
    "meaning": "Bế trên tay",
    "note": ""
  },
  {
    "id": "v_topic_234",
    "stt": 234,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "を育てる",
    "hiragana": "そだてる",
    "hanViet": "育 Dục",
    "meaning": "Nuôi dạy",
    "note": ""
  },
  {
    "id": "v_topic_235",
    "stt": 235,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "が育つ",
    "hiragana": "そだつ",
    "hanViet": "育 Dục",
    "meaning": "Trưởng thành, lớn lên",
    "note": ""
  },
  {
    "id": "v_topic_236",
    "stt": 236,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "が成長する",
    "hiragana": "せいちょうする",
    "hanViet": "成 Thành, 長 Trường",
    "meaning": "Trưởng thành",
    "note": ""
  },
  {
    "id": "v_topic_237",
    "stt": 237,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "頭をなでる",
    "hiragana": "あたまをなでる",
    "hanViet": "頭 Đầu",
    "meaning": "Xoa đầu",
    "note": ""
  },
  {
    "id": "v_topic_238",
    "stt": 238,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "お尻をたたく",
    "hiragana": "おしりをたたく",
    "hanViet": "",
    "meaning": "Đánh vào mông",
    "note": "Để trống âm Hán Việt (sách không có, âm ít dùng): 尻"
  },
  {
    "id": "v_topic_239",
    "stt": 239,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "お尻をぶつ",
    "hiragana": "おしりをぶつ",
    "hanViet": "",
    "meaning": "Đánh vào mông",
    "note": "Để trống âm Hán Việt (sách không có, âm ít dùng): 尻"
  },
  {
    "id": "v_topic_240",
    "stt": 240,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "手をつなぐ",
    "hiragana": "てをつなぐ",
    "hanViet": "手 Thủ",
    "meaning": "Dắt tay",
    "note": "Claude bổ sung (bản gốc để trống) – bản gốc để trống cách đọc"
  },
  {
    "id": "v_topic_241",
    "stt": 241,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "手をはなす",
    "hiragana": "てをはなす",
    "hanViet": "手 Thủ",
    "meaning": "Buông tay",
    "note": "Claude bổ sung (bản gốc để trống) – bản gốc để trống cách đọc"
  },
  {
    "id": "v_topic_242",
    "stt": 242,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "迷子になる",
    "hiragana": "まいごになる",
    "hanViet": "迷 Mê, 子 Tử",
    "meaning": "Thành trẻ lạc",
    "note": ""
  },
  {
    "id": "v_topic_243",
    "stt": 243,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "付いて行く",
    "hiragana": "ついていく",
    "hanViet": "付 Phó, 行 Hành",
    "meaning": "Đi theo",
    "note": ""
  },
  {
    "id": "v_topic_244",
    "stt": 244,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "犬を飼う",
    "hiragana": "いぬをかう",
    "hanViet": "犬 Khuyển, 飼 Tự",
    "meaning": "Nuôi chó",
    "note": ""
  },
  {
    "id": "v_topic_245",
    "stt": 245,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "犬の世話をする",
    "hiragana": "いぬのせわをする",
    "hanViet": "犬 Khuyển, 世 Thế, 話 Thoại",
    "meaning": "Chăm sóc chó",
    "note": ""
  },
  {
    "id": "v_topic_246",
    "stt": 246,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "散歩に連れていく",
    "hiragana": "さんぽにつれていく",
    "hanViet": "散 Tán, 歩 Bộ, 連 Liên",
    "meaning": "Dắt đi dạo",
    "note": ""
  },
  {
    "id": "v_topic_247",
    "stt": 247,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "えさをやる",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Cho thức ăn",
    "note": ""
  },
  {
    "id": "v_topic_248",
    "stt": 248,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "えさを与える",
    "hiragana": "えさをあたえる",
    "hanViet": "与 Dự",
    "meaning": "Cho thức ăn",
    "note": ""
  },
  {
    "id": "v_topic_249",
    "stt": 249,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "吠える",
    "hiragana": "ほえる",
    "hanViet": "吠 Phệ",
    "meaning": "Sủa",
    "note": ""
  },
  {
    "id": "v_topic_250",
    "stt": 250,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "噛む",
    "hiragana": "かむ",
    "hanViet": "",
    "meaning": "Cắn, nhai",
    "note": "Để trống âm Hán Việt (sách không có, âm ít dùng): 噛"
  },
  {
    "id": "v_topic_251",
    "stt": 251,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "しっぽを振る",
    "hiragana": "しっぽをふる",
    "hanViet": "振 Chấn",
    "meaning": "Vẫy đuôi",
    "note": ""
  },
  {
    "id": "v_topic_252",
    "stt": 252,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "人になれる",
    "hiragana": "ひとになれる",
    "hanViet": "人 Nhân",
    "meaning": "Quen với con người",
    "note": ""
  },
  {
    "id": "v_topic_253",
    "stt": 253,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "うなる",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Gầm gừ",
    "note": ""
  },
  {
    "id": "v_topic_254",
    "stt": 254,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "穴を掘る",
    "hiragana": "あなをほる",
    "hanViet": "穴 Huyệt, 掘 Quật*",
    "meaning": "Đào lỗ",
    "note": "Âm Hán Việt bổ sung (sách không có): 掘 Quật"
  },
  {
    "id": "v_topic_255",
    "stt": 255,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "穴を埋める",
    "hiragana": "あなをうめる",
    "hanViet": "穴 Huyệt, 埋 Mai*",
    "meaning": "Lấp lỗ",
    "note": "Âm Hán Việt bổ sung (sách không có): 埋 Mai"
  },
  {
    "id": "v_topic_256",
    "stt": 256,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "けんかする",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Cãi nhau, đánh nhau",
    "note": ""
  },
  {
    "id": "v_topic_257",
    "stt": 257,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "殴る",
    "hiragana": "なぐる",
    "hanViet": "殴 Ẩu",
    "meaning": "Đấm, đánh mạnh",
    "note": ""
  },
  {
    "id": "v_topic_258",
    "stt": 258,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "足で蹴る",
    "hiragana": "あしでける",
    "hanViet": "足 Túc, 蹴 Xúc",
    "meaning": "Đá bằng chân",
    "note": ""
  },
  {
    "id": "v_topic_259",
    "stt": 259,
    "topic": "6日 – 子育て (Nuôi con)",
    "word": "似ている",
    "hiragana": "にている",
    "hanViet": "似 Tự",
    "meaning": "Giống nhau, giống với",
    "note": ""
  }
];
export const tuVungBaiHocList: TuVungBaiHocItem[] = [
  {
    "id": "v_lesson_1",
    "stt": 1,
    "bai": 1,
    "slide": 2,
    "word": "寒い地方",
    "hiragana": "さむいちほう",
    "hanViet": "寒 Hàn, 地 Địa, 方 Phương",
    "meaning": "Vùng lạnh, địa phương lạnh",
    "example": "",
    "note": ""
  },
  {
    "id": "v_lesson_2",
    "stt": 2,
    "bai": 1,
    "slide": 2,
    "word": "青森県",
    "hiragana": "あおもりけん",
    "hanViet": "青 Thanh, 森 Sâm, 県 Huyện",
    "meaning": "Tỉnh Aomori",
    "example": "",
    "note": ""
  },
  {
    "id": "v_lesson_3",
    "stt": 3,
    "bai": 1,
    "slide": 2,
    "word": "長野県",
    "hiragana": "ながのけん",
    "hanViet": "長 Trường, 野 Dã, 県 Huyện",
    "meaning": "Tỉnh Nagano",
    "example": "",
    "note": ""
  },
  {
    "id": "v_lesson_4",
    "stt": 4,
    "bai": 1,
    "slide": 2,
    "word": "産地",
    "hiragana": "さんち",
    "hanViet": "産 Sản, 地 Địa",
    "meaning": "Nơi sản xuất",
    "example": "",
    "note": ""
  },
  {
    "id": "v_lesson_5",
    "stt": 5,
    "bai": 1,
    "slide": 2,
    "word": "～として",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Với tư cách là ~; như là ~; được dùng làm ~",
    "example": "",
    "note": ""
  },
  {
    "id": "v_lesson_6",
    "stt": 6,
    "bai": 1,
    "slide": 3,
    "word": "実",
    "hiragana": "み",
    "hanViet": "実 Thực",
    "meaning": "Quả, trái",
    "example": "",
    "note": ""
  },
  {
    "id": "v_lesson_7",
    "stt": 7,
    "bai": 1,
    "slide": 3,
    "word": "一本の木",
    "hiragana": "いっぽんのき",
    "hanViet": "一 Nhất, 本 Bản, 木 Mộc",
    "meaning": "Một cây",
    "example": "",
    "note": ""
  },
  {
    "id": "v_lesson_8",
    "stt": 8,
    "bai": 1,
    "slide": 3,
    "word": "あまり多くの～",
    "hiragana": "あまりおおくの～",
    "hanViet": "多 Đa",
    "meaning": "Quá nhiều ~",
    "example": "",
    "note": ""
  },
  {
    "id": "v_lesson_9",
    "stt": 9,
    "bai": 1,
    "slide": 3,
    "word": "丈夫そう",
    "hiragana": "じょうぶそう",
    "hanViet": "丈 Trượng, 夫 Phu",
    "meaning": "Trông có vẻ chắc khỏe",
    "example": "",
    "note": ""
  },
  {
    "id": "v_lesson_10",
    "stt": 10,
    "bai": 1,
    "slide": 3,
    "word": "外の～",
    "hiragana": "ほかの～",
    "hanViet": "外 Ngoại",
    "meaning": "~ còn lại, ~ khác",
    "example": "",
    "note": ""
  },
  {
    "id": "v_lesson_11",
    "stt": 11,
    "bai": 1,
    "slide": 4,
    "word": "害虫",
    "hiragana": "がいちゅう",
    "hanViet": "害 Hại, 虫 Trùng",
    "meaning": "Sâu bệnh",
    "example": "",
    "note": ""
  },
  {
    "id": "v_lesson_12",
    "stt": 12,
    "bai": 1,
    "slide": 4,
    "word": "農薬",
    "hiragana": "のうやく",
    "hanViet": "農 Nông, 薬 Dược",
    "meaning": "Thuốc trừ sâu",
    "example": "",
    "note": ""
  },
  {
    "id": "v_lesson_13",
    "stt": 13,
    "bai": 1,
    "slide": 4,
    "word": "世話をする",
    "hiragana": "せわをする",
    "hanViet": "世 Thế, 話 Thoại",
    "meaning": "Chăm sóc",
    "example": "",
    "note": ""
  },
  {
    "id": "v_lesson_14",
    "stt": 14,
    "bai": 1,
    "slide": 5,
    "word": "つく",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Bám vào",
    "example": "害虫がつく",
    "note": ""
  },
  {
    "id": "v_lesson_15",
    "stt": 15,
    "bai": 1,
    "slide": 5,
    "word": "防ぐ",
    "hiragana": "ふせぐ",
    "hanViet": "防 Phòng",
    "meaning": "Ngăn",
    "example": "害虫がつくのを防ぐ",
    "note": "Claude bổ sung cách đọc (slide không ghi)"
  },
  {
    "id": "v_lesson_16",
    "stt": 16,
    "bai": 1,
    "slide": 5,
    "word": "かける",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Phun",
    "example": "農薬をかける",
    "note": ""
  },
  {
    "id": "v_lesson_17",
    "stt": 17,
    "bai": 1,
    "slide": 5,
    "word": "かぶせる",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Trùm",
    "example": "袋をかぶせる",
    "note": ""
  },
  {
    "id": "v_lesson_18",
    "stt": 18,
    "bai": 1,
    "slide": 5,
    "word": "育てる",
    "hiragana": "そだてる",
    "hanViet": "育 Dục",
    "meaning": "Nuôi dưỡng",
    "example": "りんごを育てる",
    "note": "Claude bổ sung cách đọc (slide không ghi)"
  },
  {
    "id": "v_lesson_19",
    "stt": 19,
    "bai": 1,
    "slide": 6,
    "word": "～もあるし、～もある",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Có ~ và cũng có ~",
    "example": "",
    "note": ""
  },
  {
    "id": "v_lesson_20",
    "stt": 20,
    "bai": 1,
    "slide": 6,
    "word": "夏ごろ",
    "hiragana": "なつごろ",
    "hanViet": "夏 Hạ",
    "meaning": "Khoảng mùa hè",
    "example": "",
    "note": ""
  },
  {
    "id": "v_lesson_21",
    "stt": 21,
    "bai": 1,
    "slide": 6,
    "word": "～から食べられる",
    "hiragana": "～からたべられる",
    "hanViet": "食 Thực",
    "meaning": "Ăn được từ ~",
    "example": "",
    "note": ""
  },
  {
    "id": "v_lesson_22",
    "stt": 22,
    "bai": 1,
    "slide": 6,
    "word": "秋の終わり",
    "hiragana": "あきのおわり",
    "hanViet": "秋 Thu, 終 Chung",
    "meaning": "Cuối thu",
    "example": "",
    "note": ""
  },
  {
    "id": "v_lesson_23",
    "stt": 23,
    "bai": 1,
    "slide": 6,
    "word": "～でなければ～ない",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Nếu không phải ~ thì không ~",
    "example": "",
    "note": ""
  },
  {
    "id": "v_lesson_24",
    "stt": 24,
    "bai": 1,
    "slide": 7,
    "word": "外の地方",
    "hiragana": "ほかのちほう",
    "hanViet": "外 Ngoại, 地 Địa, 方 Phương",
    "meaning": "Các vùng khác",
    "example": "",
    "note": ""
  },
  {
    "id": "v_lesson_25",
    "stt": 25,
    "bai": 1,
    "slide": 7,
    "word": "果物屋",
    "hiragana": "くだものや",
    "hanViet": "果 Quả, 物 Vật, 屋 Ốc",
    "meaning": "Cửa hàng hoa quả",
    "example": "",
    "note": ""
  },
  {
    "id": "v_lesson_26",
    "stt": 26,
    "bai": 1,
    "slide": 7,
    "word": "八百屋",
    "hiragana": "やおや",
    "hanViet": "八 Bát, 百 Bách, 屋 Ốc",
    "meaning": "Cửa hàng rau củ",
    "example": "",
    "note": ""
  },
  {
    "id": "v_lesson_27",
    "stt": 27,
    "bai": 1,
    "slide": 7,
    "word": "店先",
    "hiragana": "みせさき",
    "hanViet": "店 Điếm, 先 Tiên",
    "meaning": "Trước sạp hàng",
    "example": "",
    "note": ""
  },
  {
    "id": "v_lesson_28",
    "stt": 28,
    "bai": 1,
    "slide": 7,
    "word": "詰める",
    "hiragana": "つめる",
    "hanViet": "詰 Cật",
    "meaning": "Đóng vào ~",
    "example": "",
    "note": ""
  },
  {
    "id": "v_lesson_29",
    "stt": 29,
    "bai": 1,
    "slide": 7,
    "word": "積む",
    "hiragana": "つむ",
    "hanViet": "積 Tích",
    "meaning": "Chất lên ~",
    "example": "",
    "note": ""
  },
  {
    "id": "v_lesson_30",
    "stt": 30,
    "bai": 1,
    "slide": 8,
    "word": "とれる",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Thu hoạch",
    "example": "寒い地方でとれる",
    "note": ""
  },
  {
    "id": "v_lesson_31",
    "stt": 31,
    "bai": 1,
    "slide": 8,
    "word": "詰められる",
    "hiragana": "つめられる",
    "hanViet": "詰 Cật",
    "meaning": "Được đóng",
    "example": "箱に詰められる",
    "note": "Claude bổ sung cách đọc (slide không ghi)"
  },
  {
    "id": "v_lesson_32",
    "stt": 32,
    "bai": 1,
    "slide": 8,
    "word": "貨物列車",
    "hiragana": "かもつれっしゃ",
    "hanViet": "貨 Hóa, 物 Vật, 列 Liệt, 車 Xa",
    "meaning": "Tàu chở hàng",
    "example": "",
    "note": "Cách đọc lấy từ cột “例” của slide"
  },
  {
    "id": "v_lesson_33",
    "stt": 33,
    "bai": 1,
    "slide": 8,
    "word": "トラック",
    "hiragana": "",
    "hanViet": "",
    "meaning": "Xe tải",
    "example": "",
    "note": ""
  },
  {
    "id": "v_lesson_34",
    "stt": 34,
    "bai": 1,
    "slide": 8,
    "word": "積まれる",
    "hiragana": "つまれる",
    "hanViet": "積 Tích",
    "meaning": "Được chất lên",
    "example": "貨物列車に積まれる",
    "note": "Claude bổ sung cách đọc (slide không ghi)"
  }
];
