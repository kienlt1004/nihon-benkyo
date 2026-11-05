#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Enrich all 402 N3 Kanji with accurate Onyomi (Katakana), Kunyomi (Hiragana with okurigana), and example vocabulary.
"""

import json
import re

# Complete Joyo & JLPT N3 Dictionary for all 402 characters
KANJI_DICT = {
    # Hàng 1
    "与": {"on": ["ヨ"], "kun": ["あた・える"], "words": [{"word": "給与", "reading": "きゅうよ", "meaning": "Tiền lương"}, {"word": "参与", "reading": "さんよ", "meaning": "Tham gia"}]},
    "且": {"on": ["ショ", "ソ"], "kun": ["か・つ"], "words": [{"word": "且つ", "reading": "かつ", "meaning": "Đồng thời, và"}]},
    "丸": {"on": ["ガン"], "kun": ["まる", "まる・い", "まる・める"], "words": [{"word": "丸い", "reading": "まるい", "meaning": "Tròn"}, {"word": "弾丸", "reading": "だんがん", "meaning": "Viên đạn"}]},
    "乏": {"on": ["ボウ"], "kun": ["とぼ・しい"], "words": [{"word": "乏しい", "reading": "とぼしい", "meaning": "Nghèo nàn, thiếu thốn"}, {"word": "欠乏", "reading": "けつぼう", "meaning": "Thiếu thốn"}]},
    "乾": {"on": ["カン", "ケン"], "kun": ["かわ・く", "かわ・かす", "ほ・す"], "words": [{"word": "乾燥", "reading": "かんそう", "meaning": "Khô khan"}, {"word": "乾く", "reading": "かわく", "meaning": "Khô ráo"}]},
    "乱": {"on": ["ラン", "ロン"], "kun": ["みだ・れる", "みだ・す"], "words": [{"word": "混乱", "reading": "こんらん", "meaning": "Hỗn loạn"}, {"word": "乱暴", "reading": "らんぼう", "meaning": "Bạo lực, thô bạo"}]},
    "了": {"on": ["リョウ"], "kun": [], "words": [{"word": "了解", "reading": "りょうかい", "meaning": "Hiểu rõ, đồng ý"}, {"word": "完了", "reading": "かんりょう", "meaning": "Hoàn tất"}]},
    "争": {"on": ["ソウ"], "kun": ["あらそ・う"], "words": [{"word": "戦争", "reading": "せんそう", "meaning": "Chiến tranh"}, {"word": "争う", "reading": "あらそう", "meaning": "Tranh giành"}]},
    "互": {"on": ["ゴ"], "kun": ["たが・い", "かたみ・に"], "words": [{"word": "相互", "reading": "そうご", "meaning": "Tương hỗ, qua lại"}, {"word": "お互いに", "reading": "おたがいに", "meaning": "Lẫn nhau"}]},
    "仏": {"on": ["ブツ", "フツ"], "kun": ["ほとけ"], "words": [{"word": "仏教", "reading": "ぶっきょう", "meaning": "Phật giáo"}, {"word": "仏", "reading": "ほとけ", "meaning": "Đức Phật"}]},

    # Hàng 2
    "任": {"on": ["ニン"], "kun": ["まか・せる", "まか・す"], "words": [{"word": "責任", "reading": "せきにん", "meaning": "Trách nhiệm"}, {"word": "任せる", "reading": "まかせる", "meaning": "Giao phó"}]},
    "仰": {"on": ["ギョウ", "コウ"], "kun": ["あお・ぐ", "おお・せ"], "words": [{"word": "信仰", "reading": "しんこう", "meaning": "Tín ngưỡng"}, {"word": "仰ぐ", "reading": "あおぐ", "meaning": "Ngước nhìn, tôn kính"}]},
    "伐": {"on": ["バツ"], "kun": ["う・つ"], "words": [{"word": "伐採", "reading": "ばっさい", "meaning": "Chặt cây, đốn rừng"}]},
    "余": {"on": ["ヨ"], "kun": ["あま・る", "あま・す"], "words": [{"word": "余分", "reading": "よぶん", "meaning": "Phần dư thừa"}, {"word": "余る", "reading": "あまる", "meaning": "Dư thừa"}]},
    "伸": {"on": ["シン"], "kun": ["の・びる", "の・ばす"], "words": [{"word": "伸縮", "reading": "しんしゅく", "meaning": "Co giãn"}, {"word": "伸びる", "reading": "のびる", "meaning": "Kéo dài, phát triển"}]},
    "伴": {"on": ["ハン", "バン"], "kun": ["ともな・う"], "words": [{"word": "同伴", "reading": "どうはん", "meaning": "Cùng đi"}, {"word": "伴う", "reading": "ともなう", "meaning": "Đi kèm theo"}]},
    "依": {"on": ["イ", "エ"], "kun": ["よ・る"], "words": [{"word": "依頼", "reading": "いらい", "meaning": "Nhờ vả, yêu cầu"}, {"word": "依然", "reading": "いぜん", "meaning": "Như cũ, vẫn vậy"}]},
    "保": {"on": ["ホ", "ホウ"], "kun": ["たも・つ"], "words": [{"word": "保存", "reading": "ほぞん", "meaning": "Bảo tồn, lưu trữ"}, {"word": "保つ", "reading": "たもつ", "meaning": "Giữ gìn, duy trì"}]},
    "倍": {"on": ["バイ"], "kun": [], "words": [{"word": "二倍", "reading": "にばい", "meaning": "Gấp đôi"}, {"word": "倍増", "reading": "ばいぞう", "meaning": "Tăng gấp bội"}]},
    "仓": {"on": ["ソウ"], "kun": ["くら"], "words": [{"word": "倉庫", "reading": "そうこ", "meaning": "Nhà kho"}]},
    "倉": {"on": ["ソウ"], "kun": ["くら"], "words": [{"word": "倉庫", "reading": "そうこ", "meaning": "Nhà kho"}]},

    # Hàng 3
    "個": {"on": ["コ", "カ"], "kun": [], "words": [{"word": "個人", "reading": "こじん", "meaning": "Cá nhân"}, {"word": "個性的", "reading": "こせいてき", "meaning": "Có cá tính"}]},
    "修": {"on": ["シュウ", "シュ"], "kun": ["おさ・める", "おさ・まる"], "words": [{"word": "修理", "reading": "しゅうり", "meaning": "Sửa chữa"}, {"word": "研修", "reading": "けんしゅう", "meaning": "Tu nghiệp, thực tập"}]},
    "俳": {"on": ["ハイ"], "kun": [], "words": [{"word": "俳優", "reading": "はいゆう", "meaning": "Diễn viên"}, {"word": "俳句", "reading": "はいく", "meaning": "Thơ Haiku"}]},
    "偶": {"on": ["グウ"], "kun": ["たま"], "words": [{"word": "偶然", "reading": "ぐうぜん", "meaning": "Ngẫu nhiên"}, {"word": "偶数", "reading": "ぐうすう", "meaning": "Số chẵn"}]},
    "偉": {"on": ["イ"], "kun": ["えら・い"], "words": [{"word": "偉大", "reading": "いだい", "meaning": "Vĩ đại"}, {"word": "偉い", "reading": "えらい", "meaning": "Tài giỏi, vĩ đại"}]},
    "傘": {"on": ["サン"], "kun": ["かさ"], "words": [{"word": "雨傘", "reading": "あまがさ", "meaning": "Dù che mưa"}, {"word": "傘", "reading": "かさ", "meaning": "Cây dù"}]},
    "傾": {"on": ["ケイ"], "kun": ["かたむ・く", "かたむ・ける"], "words": [{"word": "傾向", "reading": "けいこう", "meaning": "Khuynh hướng"}, {"word": "傾く", "reading": "かたむく", "meaning": "Nghiêng, dốc"}]},
    "像": {"on": ["ゾウ"], "kun": [], "words": [{"word": "想像", "reading": "そうぞう", "meaning": "Tưởng tượng"}, {"word": "映像", "reading": "えいぞう", "meaning": "Hình ảnh video"}]},
    "僕": {"on": ["ボク"], "kun": ["しもべ"], "words": [{"word": "僕", "reading": "ぼく", "meaning": "Tôi (nam xưng)"}]},
    "僚": {"on": ["リョウ"], "kun": [], "words": [{"word": "同僚", "reading": "どうりょう", "meaning": "Đồng nghiệp"}, {"word": "官僚", "reading": "かんりょう", "meaning": "Quan chức"}]},

    # Hàng 4
    "儀": {"on": ["ギ"], "kun": [], "words": [{"word": "礼儀", "reading": "れいぎ", "meaning": "Lễ nghi, phép lịch sự"}, {"word": "儀式", "reading": "ぎしき", "meaning": "Nghi thức"}]},
    "償": {"on": ["ショウ"], "kun": ["つぐな・う"], "words": [{"word": "賠償", "reading": "ばいしょう", "meaning": "Bồi thường"}, {"word": "償う", "reading": "つぐなう", "meaning": "Đền bù"}]},
    "充": {"on": ["ジュウ"], "kun": ["あ・てる", "み・たす"], "words": [{"word": "充実", "reading": "じゅうじつ", "meaning": "Sung túc, trọn vẹn"}, {"word": "充電", "reading": "じゅうでん", "meaning": "Sạc pin"}]},
    "児": {"on": ["ジ", "ニ"], "kun": ["こ"], "words": [{"word": "児童", "reading": "じどう", "meaning": "Nhi đồng"}, {"word": "幼児", "reading": "ようじ", "meaning": "Trẻ nhỏ"}]},
    "克": {"on": ["コク"], "kun": ["か・つ"], "words": [{"word": "克服", "reading": "こくふく", "meaning": "Khắc phục, vượt qua"}]},
    "共": {"on": ["キョウ"], "kun": ["とも", "とも・に"], "words": [{"word": "共同", "reading": "きょうどう", "meaning": "Cộng đồng, chung"}, {"word": "共に", "reading": "ともに", "meaning": "Cùng nhau"}]},
    "典": {"on": ["テン"], "kun": [], "words": [{"word": "辞典", "reading": "じてん", "meaning": "Từ điển"}, {"word": "典型", "reading": "てんけい", "meaning": "Điển hình"}]},
    "再": {"on": ["サイ", "サ"], "kun": ["ふたた・び"], "words": [{"word": "再生", "reading": "さいせい", "meaning": "Tái sinh, phát lại"}, {"word": "再び", "reading": "ふたたび", "meaning": "Lại một lần nữa"}]},
    "凍": {"on": ["トウ"], "kun": ["こお・る", "こご・える", "い・てる"], "words": [{"word": "冷凍", "reading": "れいとう", "meaning": "Đông lạnh"}, {"word": "凍る", "reading": "こおる", "meaning": "Đóng băng"}]},
    "処": {"on": ["ショ"], "kun": ["ところ"], "words": [{"word": "処理", "reading": "しょり", "meaning": "Xử lý"}, {"word": "処分", "reading": "しょぶん", "meaning": "Xử phạt, vứt bỏ"}]},

    # Hàng 5
    "刑": {"on": ["ケイ"], "kun": [], "words": [{"word": "刑事", "reading": "けいじ", "meaning": "Hình sự"}, {"word": "刑罰", "reading": "けいばつ", "meaning": "Hình phạt"}]},
    "判": {"on": ["ハン", "バン"], "kun": ["わか・る"], "words": [{"word": "判断", "reading": "はんだん", "meaning": "Phán đoán"}, {"word": "裁判", "reading": "さいばん", "meaning": "Xét xử, tòa án"}]},
    "刷": {"on": ["サツ"], "kun": ["す・る", "は・く"], "words": [{"word": "印刷", "reading": "いんさつ", "meaning": "In ấn"}, {"word": "刷る", "reading": "する", "meaning": "In"}]},
    "券": {"on": ["ケン"], "kun": [], "words": [{"word": "旅券", "reading": "りょけん", "meaning": "Hộ chiếu"}, {"word": "入場券", "reading": "にゅうじょうけん", "meaning": "Vé vào cửa"}]},
    "制": {"on": ["セイ"], "kun": [], "words": [{"word": "制度", "reading": "せいど", "meaning": "Chế độ"}, {"word": "制限", "reading": "せいげん", "meaning": "Hạn chế"}]},
    "到": {"on": ["トウ"], "kun": ["いた・る"], "words": [{"word": "到着", "reading": "とうちゃく", "meaning": "Đến nơi"}, {"word": "到底", "reading": "とうてい", "meaning": "Hoàn toàn (không thể)"}]},
    "削": {"on": ["サク"], "kun": ["けず・る", "そ・ぐ"], "words": [{"word": "削減", "reading": "さくげん", "meaning": "Cắt giảm"}, {"word": "削る", "reading": "けずる", "meaning": "Gọt, bào bớt"}]},
    "剣": {"on": ["ケン"], "kun": ["つるぎ"], "words": [{"word": "真剣", "reading": "しんけん", "meaning": "Nghiêm túc"}, {"word": "剣道", "reading": "けんどう", "meaning": "Kiếm đạo"}]},
    "剤": {"on": ["ザイ", "スイ"], "kun": [], "words": [{"word": "洗剤", "reading": "せんざい", "meaning": "Chất tẩy rửa, xà phòng"}, {"word": "薬剤", "reading": "やくざい", "meaning": "Dược phẩm"}]},
    "副": {"on": ["フク"], "kun": [], "words": [{"word": "副作用", "reading": "ふくさよう", "meaning": "Tác dụng phụ"}, {"word": "副社長", "reading": "ふくしゃちょう", "meaning": "Phó giám đốc"}]},

    # Hàng 6
    "劇": {"on": ["ゲキ"], "kun": [], "words": [{"word": "劇場", "reading": "げきじょう", "meaning": "Nhà hát"}, {"word": "演劇", "reading": "えんげき", "meaning": "Vở kịch"}]},
    "労": {"on": ["ロウ"], "kun": ["いたわ・る", "ねぎら・う"], "words": [{"word": "労働", "reading": "ろうどう", "meaning": "Lao động"}, {"word": "苦労", "reading": "くろう", "meaning": "Gian nan, vất vả"}]},
    "励": {"on": ["レイ"], "kun": ["はげ・む", "はげ・ます"], "words": [{"word": "奨励", "reading": "しょうれい", "meaning": "Khích lệ"}, {"word": "励ます", "reading": "はげます", "meaning": "Động viên, cổ vũ"}]},
    "効": {"on": ["コウ"], "kun": ["き・く"], "words": [{"word": "効果", "reading": "こうか", "meaning": "Hiệu quả"}, {"word": "効く", "reading": "きく", "meaning": "Có tác dụng"}]},
    "勇": {"on": ["ユウ"], "kun": ["いさ・む"], "words": [{"word": "勇気", "reading": "ゆうき", "meaning": "Dũng khí"}, {"word": "勇敢", "reading": "ゆうかん", "meaning": "Dũng cảm"}]},
    "募": {"on": ["ボ"], "kun": ["つの・る"], "words": [{"word": "募集", "reading": "ぼしゅう", "meaning": "Tuyển dụng, chiêu mộ"}, {"word": "募る", "reading": "つのる", "meaning": "Thu thập, chiêu mộ"}]},
    "勧": {"on": ["カン"], "kun": ["すす・める"], "words": [{"word": "勧誘", "reading": "かんゆう", "meaning": "Mời gọi, rủ rê"}, {"word": "勧める", "reading": "すすめる", "meaning": "Khuyên bảo"}]},
    "匂": {"on": [], "kun": ["にお・う", "にお・い"], "words": [{"word": "匂い", "reading": "におい", "meaning": "Mùi hương"}, {"word": "匂う", "reading": "におう", "meaning": "Tỏa mùi"}]},
    "卓": {"on": ["タク"], "kun": [], "words": [{"word": "卓球", "reading": "たっきゅう", "meaning": "Bóng bàn"}, {"word": "食卓", "reading": "しょくたく", "meaning": "Bàn ăn"}]},
    "協": {"on": ["キョウ"], "kun": [], "words": [{"word": "協力", "reading": "きょうりょく", "meaning": "Hợp lực, giúp đỡ"}, {"word": "協会", "reading": "きょうかい", "meaning": "Hiệp hội"}]},

    # Hàng 7
    "博": {"on": ["ハク", "バク"], "kun": [], "words": [{"word": "博物館", "reading": "はくぶつかん", "meaning": "Viện bảo tàng"}, {"word": "博士", "reading": "はくし", "meaning": "Tiến sĩ"}]},
    "占": {"on": ["セン"], "kun": ["し・める", "うらな・う"], "words": [{"word": "占める", "reading": "しめる", "meaning": "Chiếm lĩnh"}, {"word": "占う", "reading": "うらなう", "meaning": "Bói toán"}]},
    "却": {"on": ["キャク"], "kun": ["かえ・って"], "words": [{"word": "返却", "reading": "へんきゃく", "meaning": "Trả lại"}, {"word": "却下", "reading": "きゃっか", "meaning": "Bác bỏ"}]},
    "巻": {"on": ["カン", "ケン"], "kun": ["ま・く", "まき"], "words": [{"word": "巻き寿司", "reading": "まきずし", "meaning": "Cơm cuộn"}, {"word": "巻く", "reading": "まく", "meaning": "Cuốn, quấn"}]},
    "及": {"on": ["キュウ"], "kun": ["およ・ぶ", "およ・ぼす"], "words": [{"word": "普及", "reading": "ふきゅう", "meaning": "Phổ cập"}, {"word": "及ぼす", "reading": "およぼす", "meaning": "Gây ảnh hưởng"}]},
    "収": {"on": ["シュウ"], "kun": ["おさ・める", "おさ・まる"], "words": [{"word": "収入", "reading": "しゅうにゅう", "meaning": "Thu nhập"}, {"word": "収穫", "reading": "しゅうかく", "meaning": "Thu hoạch"}]},
    "双": {"on": ["ソウ"], "kun": ["ふた", "たぐい"], "words": [{"word": "双子", "reading": "ふたご", "meaning": "Sinh đôi"}, {"word": "双方", "reading": "そうほう", "meaning": "Cả hai phía"}]},
    "司": {"on": ["シ"], "kun": ["つかさど・る"], "words": [{"word": "司会", "reading": "しかい", "meaning": "Chủ trì, MC"}, {"word": "上司", "reading": "じょうし", "meaning": "Cấp trên"}]},
    "句": {"on": ["ク"], "kun": [], "words": [{"word": "文句", "reading": "もんく", "meaning": "Phàn nàn, câu chữ"}, {"word": "俳句", "reading": "はいく", "meaning": "Thơ Haiku"}]},
    "叱": {"on": ["シツ"], "kun": ["しか・る"], "words": [{"word": "叱る", "reading": "しかる", "meaning": "La mắng, quở trách"}]},

    # Hàng 8
    "各": {"on": ["カク"], "kun": ["おのおの"], "words": [{"word": "各自", "reading": "かくじ", "meaning": "Mỗi người"}, {"word": "各国", "reading": "かっこく", "meaning": "Các nước"}]},
    "叫": {"on": ["キョウ"], "kun": ["さけ・ぶ"], "words": [{"word": "叫ぶ", "reading": "さけぶ", "meaning": "Hét to, kêu gào"}, {"word": "叫び声", "reading": "さけびごえ", "meaning": "Tiếng thét"}]},
    "吐": {"on": ["ト"], "kun": ["は・く", "つ・く"], "words": [{"word": "吐く", "reading": "はく", "meaning": "Nôn mửa, thở ra"}, {"word": "吐き気", "reading": "はきけ", "meaning": "Buồn nôn"}]},
    "否": {"on": ["ヒ"], "kun": ["いな", "いや"], "words": [{"word": "否定", "reading": "ひてい", "meaning": "Phủ định"}, {"word": "安否", "reading": "あんぴ", "meaning": "Bình an hay không"}]},
    "含": {"on": ["ガン"], "kun": ["ふく・む", "ふく・める"], "words": [{"word": "含有", "reading": "がんゆう", "meaning": "Hàm chứa"}, {"word": "含む", "reading": "ふくむ", "meaning": "Bao gồm"}]},
    "呂": {"on": ["ロ", "リョ"], "kun": [], "words": [{"word": "お風呂", "reading": "おふろ", "meaning": "Bồn tắm"}, {"word": "風呂場", "reading": "ふろば", "meaning": "Phòng tắm"}]},
    "吠": {"on": ["ハイ"], "kun": ["ほ・える"], "words": [{"word": "吠える", "reading": "ほえる", "meaning": "Sủa, gầm rú"}]},
    "商": {"on": ["ショウ"], "kun": ["あきな・う"], "words": [{"word": "商業", "reading": "しょうぎょう", "meaning": "Thương nghiệp"}, {"word": "商品", "reading": "しょうひん", "meaning": "Sản phẩm"}]},
    "善": {"on": ["ゼン"], "kun": ["よ・い", "い・い"], "words": [{"word": "改善", "reading": "かいぜん", "meaning": "Cải thiện"}, {"word": "善良", "reading": "ぜんりょう", "meaning": "Lương thiện"}]},
    "器": {"on": ["キ"], "kun": ["うつわ"], "words": [{"word": "食器", "reading": "しょっき", "meaning": "Bát đĩa"}, {"word": "楽器", "reading": "がっき", "meaning": "Nhạc cụ"}]},

    # Hàng 9
    "囲": {"on": ["イ"], "kun": ["かこ・む", "かこ・う"], "words": [{"word": "周囲", "reading": "しゅうい", "meaning": "Xung quanh"}, {"word": "囲む", "reading": "かこむ", "meaning": "Bao quanh"}]},
    "圧": {"on": ["アツ", "エン"], "kun": ["お・す", "へ・す"], "words": [{"word": "血圧", "reading": "けつあつ", "meaning": "Huyết áp"}, {"word": "圧力", "reading": "あつりょく", "meaning": "Áp lực"}]},
    "坂": {"on": ["ハン"], "kun": ["さか"], "words": [{"word": "坂道", "reading": "さかみち", "meaning": "Đường dốc"}, {"word": "上り坂", "reading": "のぼりざか", "meaning": "Dốc lên"}]},
    "均": {"on": ["キン"], "kun": ["なら・す"], "words": [{"word": "平均", "reading": "へいきん", "meaning": "Bình quân, trung bình"}, {"word": "均等", "reading": "きんとう", "meaning": "Đồng đều"}]},
    "坊": {"on": ["ボウ", "ボッ"], "kun": [], "words": [{"word": "坊主", "reading": "ぼうず", "meaning": "Sư thầy, chú tiểu"}, {"word": "赤ん坊", "reading": "あかんぼう", "meaning": "Em bé"}]},
    "基": {"on": ["キ"], "kun": ["もと", "もとい"], "words": [{"word": "基本", "reading": "きほん", "meaning": "Cơ bản"}, {"word": "基づく", "reading": "もとづく", "meaning": "Dựa vào, căn cứ"}]},
    "域": {"on": ["イキ"], "kun": [], "words": [{"word": "地域", "reading": "ちいき", "meaning": "Khu vực"}, {"word": "区域", "reading": "くいき", "meaning": "Khu vực quy hoạch"}]},
    "墓": {"on": ["ボ"], "kun": ["はか"], "words": [{"word": "墓地", "reading": "ぼち", "meaning": "Nghĩa trang"}, {"word": "お墓", "reading": "おはか", "meaning": "Ngôi mộ"}]},
    "塗": {"on": ["ト"], "kun": ["ぬ・る", "ぬ・り"], "words": [{"word": "塗装", "reading": "とそう", "meaning": "Sơn phết"}, {"word": "塗る", "reading": "ぬる", "meaning": "Quết, bôi, sơn"}]},
    "境": {"on": ["キョウ", "ケイ"], "kun": ["さかい"], "words": [{"word": "環境", "reading": "かんきょう", "meaning": "Môi trường"}, {"word": "国境", "reading": "こっきょう", "meaning": "Biên giới"}]},

    # Hàng 10
    "塾": {"on": ["ジュク"], "kun": [], "words": [{"word": "学習塾", "reading": "がくしゅうじゅく", "meaning": "Lớp học thêm"}, {"word": "塾", "reading": "じゅく", "meaning": "Trường lò, lớp phụ đạo"}]},
    "奇": {"on": ["キ"], "kun": ["く・し"], "words": [{"word": "好奇心", "reading": "こうきしん", "meaning": "Tính tò mò, hiếu kỳ"}, {"word": "奇数", "reading": "きすう", "meaning": "Số lẻ"}]},
    "奏": {"on": ["ソウ"], "kun": ["かな・でる"], "words": [{"word": "演奏", "reading": "えんそう", "meaning": "Biểu diễn âm nhạc"}, {"word": "吹奏楽", "reading": "すいそうがく", "meaning": "Nhạc kèn"}]},
    "契": {"on": ["ケイ"], "kun": ["ちぎ・る"], "words": [{"word": "契約", "reading": "けいやく", "meaning": "Hợp đồng"}, {"word": "契機", "reading": "けいき", "meaning": "Thời cơ"}]},
    "奨": {"on": ["ショウ"], "kun": ["すす・める"], "words": [{"word": "奨学金", "reading": "しょうがくきん", "meaning": "Học bổng"}, {"word": "推奨", "reading": "すいしょう", "meaning": "Khuyên dùng, tán thành"}]},
    "妙": {"on": ["ミョウ", "ビョウ"], "kun": ["たえ"], "words": [{"word": "奇妙", "reading": "きみょう", "meaning": "Kỳ lạ"}, {"word": "微妙", "reading": "びみょう", "meaning": "Tinh tế, khó nói"}]},
    "姿": {"on": ["シ"], "kun": ["すがた"], "words": [{"word": "姿勢", "reading": "しせい", "meaning": "Tư thế, dáng dấp"}, {"word": "姿", "reading": "すがた", "meaning": "Bóng dáng"}]},
    "姫": {"on": ["キ"], "kun": ["ひめ"], "words": [{"word": "姫", "reading": "ひめ", "meaning": "Công chúa"}, {"word": "お姫様", "reading": "おひめさま", "meaning": "Nàng công chúa"}]},
    "嫌": {"on": ["ケン", "ゲン"], "kun": ["きら・う", "いや"], "words": [{"word": "嫌悪", "reading": "けんお", "meaning": "Căm ghét"}, {"word": "嫌い", "reading": "きらい", "meaning": "Ghét"}]},
    "嬉": {"on": ["キ"], "kun": ["うれ・しい"], "words": [{"word": "嬉しい", "reading": "うれしい", "meaning": "Vui mừng, hạnh phúc"}]},

    # Hàng 11
    "嬢": {"on": ["ジョウ"], "kun": [], "words": [{"word": "お嬢さん", "reading": "おじょうさん", "meaning": "Tiểu thư, con gái người khác"}]},
    "宗": {"on": ["シュウ", "ソウ"], "kun": ["むね"], "words": [{"word": "宗教", "reading": "しゅうきょう", "meaning": "Tôn giáo"}]},
    "宮": {"on": ["キュウ", "グウ", "ク"], "kun": ["みや"], "words": [{"word": "神宮", "reading": "じんぐう", "meaning": "Đền Thần đạo"}, {"word": "お宮", "reading": "おみや", "meaning": "Ngôi đền"}]},
    "容": {"on": ["ヨウ"], "kun": ["い・れる"], "words": [{"word": "内容", "reading": "ないよう", "meaning": "Nội dung"}, {"word": "美容院", "reading": "びよういん", "meaning": "Thẩm mỹ viện"}]},
    "宴": {"on": ["エン"], "kun": ["うたげ"], "words": [{"word": "宴会", "reading": "えんかい", "meaning": "Bữa tiệc"}, {"word": "披露宴", "reading": "ひろうえん", "meaning": "Tiệc cưới"}]},
    "密": {"on": ["ミツ"], "kun": ["ひそ・か"], "words": [{"word": "秘密", "reading": "ひみつ", "meaning": "Bí mật"}, {"word": "精密", "reading": "せいみつ", "meaning": "Chính xác, tinh mật"}]},
    "寿": {"on": ["ジュ", "ス"], "kun": ["ことぶき"], "words": [{"word": "寿司", "reading": "すし", "meaning": "Món sushi"}, {"word": "寿命", "reading": "じゅみょう", "meaning": "Tuổi thọ"}]},
    "射": {"on": ["シャ"], "kun": ["い・る", "さ・す"], "words": [{"word": "注射", "reading": "ちゅうしゃ", "meaning": "Tiêm thuốc"}, {"word": "放射", "reading": "ほうしゃ", "meaning": "Phóng xạ"}]},
    "尋": {"on": ["ジン"], "kun": ["たず・ねる", "ひろ"], "words": [{"word": "尋ねる", "reading": "たずねる", "meaning": "Hỏi, thăm hỏi"}, {"word": "尋問", "reading": "じんもん", "meaning": "Thẩm vấn"}]},
    "導": {"on": ["ドウ"], "kun": ["みちび・く"], "words": [{"word": "指導", "reading": "しどう", "meaning": "Chỉ đạo, hướng dẫn"}, {"word": "導入", "reading": "どうにゅう", "meaning": "Đưa vào áp dụng"}]},

    # Hàng 12
    "就": {"on": ["シュウ", "ジュ"], "kun": ["つ・く", "つ・ける"], "words": [{"word": "就職", "reading": "しゅうしょく", "meaning": "Tìm được việc"}, {"word": "就任", "reading": "しゅうにん", "meaning": "Nhậm chức"}]},
    "層": {"on": ["ソウ"], "kun": [], "words": [{"word": "高層", "reading": "こうそう", "meaning": "Cao tầng"}, {"word": "地層", "reading": "ちそう", "meaning": "Địa tầng"}]},
    "岩": {"on": ["ガン"], "kun": ["いわ"], "words": [{"word": "岩石", "reading": "がんせき", "meaning": "Đất đá, nham thạch"}, {"word": "岩", "reading": "いわ", "meaning": "Tảng đá"}]},
    "崩": {"on": ["ホウ"], "kun": ["くず・れる", "くず・す"], "words": [{"word": "崩壊", "reading": "ほうかい", "meaning": "Sụp đổ"}, {"word": "崩れる", "reading": "くずれる", "meaning": "Lở, đổ sụp"}]},
    "巛": {"on": ["セン"], "kun": ["かわ"], "words": [{"word": "川", "reading": "かわ", "meaning": "Dòng sông (bộ xuyên)"}]},
    "州": {"on": ["シュウ", "ス"], "kun": ["す"], "words": [{"word": "本州", "reading": "ほんしゅう", "meaning": "Đảo Honshu"}, {"word": "九州", "reading": "きゅうしゅう", "meaning": "Vùng Kyushu"}]},
    "帯": {"on": ["タイ"], "kun": ["お・びる", "おび"], "words": [{"word": "携帯電話", "reading": "けいたいでんわ", "meaning": "Điện thoại di động"}, {"word": "地帯", "reading": "ちたい", "meaning": "Vùng đai"}]},
    "幼": {"on": ["ヨウ"], "kun": ["おさな・い"], "words": [{"word": "幼児", "reading": "ようじ", "meaning": "Ấu nhi"}, {"word": "幼稚園", "reading": "ようちえん", "meaning": "Trường mẫu giáo"}]},
    "府": {"on": ["フ"], "kun": [], "words": [{"word": "政府", "reading": "せいふ", "meaning": "Chính phủ"}, {"word": "京都府", "reading": "きょうとふ", "meaning": "Phủ Kyoto"}]},
    "廊": {"on": ["ロウ"], "kun": [], "words": [{"word": "廊下", "reading": "ろうか", "meaning": "Hành lang"}, {"word": "画廊", "reading": "がろう", "meaning": "Phòng tranh"}]},

    # Hàng 13
    "彙": {"on": ["イ"], "kun": [], "words": [{"word": "語彙", "reading": "ごい", "meaning": "Từ vựng"}]},
    "影": {"on": ["エイ"], "kun": ["かげ"], "words": [{"word": "影響", "reading": "えいきょう", "meaning": "Ảnh hưởng"}, {"word": "撮影", "reading": "さつえい", "meaning": "Chụp ảnh, quay phim"}]},
    "往": {"on": ["オウ"], "kun": ["ゆ・く", "い・ぬ"], "words": [{"word": "往復", "reading": "おうふく", "meaning": "Khứ hồi"}, {"word": "往来", "reading": "おうらい", "meaning": "Đi lại"}]},
    "徒": {"on": ["ト"], "kun": ["いたずら", "あだ"], "words": [{"word": "生徒", "reading": "せいと", "meaning": "Học sinh"}, {"word": "徒歩", "reading": "とほ", "meaning": "Đi bộ"}]},
    "従": {"on": ["ジュウ", "ショウ"], "kun": ["したが・う", "したが・える"], "words": [{"word": "従業員", "reading": "じゅうぎょういん", "meaning": "Nhân viên"}, {"word": "従う", "reading": "したがう", "meaning": "Tuân theo"}]},
    "得": {"on": ["トク"], "kun": ["え・る", "う・る"], "words": [{"word": "納得", "reading": "なっとく", "meaning": "Thấu hiểu, đồng ý"}, {"word": "得る", "reading": "える", "meaning": "Đạt được"}]},
    "御": {"on": ["ギョ", "ゴ"], "kun": ["おん", "お・さめる", "み"], "words": [{"word": "御飯", "reading": "ごはん", "meaning": "Cơm"}, {"word": "制御", "reading": "せいぎょ", "meaning": "Khống chế"}]},
    "徴": {"on": ["チョウ"], "kun": ["しるし"], "words": [{"word": "特徴", "reading": "とくちょう", "meaning": "Đặc trưng"}, {"word": "象徴", "reading": "しょうちょう", "meaning": "Biểu tượng"}]},
    "志": {"on": ["シ"], "kun": ["こころざ・す", "こころざし"], "words": [{"word": "意志", "reading": "いし", "meaning": "Ý chí"}, {"word": "志望", "reading": "しぼう", "meaning": "Nguyện vọng"}]},
    "忍": {"on": ["ニン"], "kun": ["しの・ぶ", "しの・ばせる"], "words": [{"word": "忍者", "reading": "にんじゃ", "meaning": "Ninja"}, {"word": "我慢", "reading": "がまん", "meaning": "Nhẫn nhịn, chịu đựng"}]},

    # Hàng 14
    "怠": {"on": ["タイ"], "kun": ["おこた・る", "なま・ける"], "words": [{"word": "怠慢", "reading": "たいまん", "meaning": "Cẩu thả, chây lười"}, {"word": "怠ける", "reading": "なまける", "meaning": "Lười biếng"}]},
    "恐": {"on": ["キョウ"], "kun": ["おそ・れる", "おそ・ろしい"], "words": [{"word": "恐怖", "reading": "きょうふ", "meaning": "Khủng khiếp, sợ hãi"}, {"word": "恐ろしい", "reading": "おそろしい", "meaning": "Đáng sợ"}]},
    "患": {"on": ["カン"], "kun": ["わずら・う"], "words": [{"word": "患者", "reading": "かんじゃ", "meaning": "Bệnh nhân"}, {"word": "急患", "reading": "きゅうかん", "meaning": "Cấp cứu"}]},
    "惑": {"on": ["ワク"], "kun": ["まど・う"], "words": [{"word": "迷惑", "reading": "めいわく", "meaning": "Phiền toái"}, {"word": "戸惑う", "reading": "とまどう", "meaning": "Bối rối"}]},
    "態": {"on": ["タイ"], "kun": ["わざ・と"], "words": [{"word": "状態", "reading": "じょうたい", "meaning": "Trạng thái"}, {"word": "態度", "reading": "たいど", "meaning": "Thái độ"}]},
    "慕": {"on": ["ボ"], "kun": ["した・う"], "words": [{"word": "敬慕", "reading": "けいぼ", "meaning": "Kính yêu"}, {"word": "慕う", "reading": "したう", "meaning": "Ngưỡng mộ, yêu quý"}]},
    "慮": {"on": ["リョ"], "kun": ["おもんぱか・る"], "words": [{"word": "考慮", "reading": "こうりょ", "meaning": "Xem xét, cân nhắc"}, {"word": "遠慮", "reading": "えんりょ", "meaning": "Khách khí, ngại ngần"}]},
    "憩": {"on": ["ケイ"], "kun": ["いこ・い", "いこ・う"], "words": [{"word": "休憩", "reading": "きゅうけい", "meaning": "Nghỉ giải lao"}, {"word": "憩い", "reading": "いこい", "meaning": "Sự nghỉ ngơi"}]},
    "快": {"on": ["カイ"], "kun": ["こころよ・い"], "words": [{"word": "快適", "reading": "かいてき", "meaning": "Sảng khoái, tiện nghi"}, {"word": "快晴", "reading": "かいせい", "meaning": "Trời trong xanh"}]},
    "怪": {"on": ["カイ", "ケ"], "kun": ["あや・しい", "あや・しむ"], "words": [{"word": "怪我", "reading": "けが", "meaning": "Vết thương"}, {"word": "怪しい", "reading": "あやしい", "meaning": "Đáng ngờ, kỳ quái"}]},

    # Hàng 15
    "悔": {"on": ["カイ"], "kun": ["く・いる", "く・やむ", "くや・しい"], "words": [{"word": "後悔", "reading": "こうかい", "meaning": "Hối hận"}, {"word": "悔しい", "reading": "くやしい", "meaning": "Tiếc nuối, cay cú"}]},
    "悩": {"on": ["ノウ"], "kun": ["なや・む", "なや・ます"], "words": [{"word": "苦悩", "reading": "くのう", "meaning": "Khổ não"}, {"word": "悩む", "reading": "なやむ", "meaning": "Lo lắng, trăn trở"}]},
    "惜": {"on": ["セキ"], "kun": ["お・しい", "お・しむ"], "words": [{"word": "惜しい", "reading": "おしい", "meaning": "Tiếc nuối, uổng công"}]},
    "慌": {"on": ["コウ"], "kun": ["あわ・てる", "あわ・ただしい"], "words": [{"word": "慌てる", "reading": "あわてる", "meaning": "Cuống cuồng, hốt hoảng"}]},
    "愉": {"on": ["ユ"], "kun": ["たの・しい"], "words": [{"word": "愉快", "reading": "ゆかい", "meaning": "Vui vẻ, thú vị"}]},
    "慎": {"on": ["シン"], "kun": ["つつし・む", "つつし・み"], "words": [{"word": "慎重", "reading": "しんちょう", "meaning": "Thận trọng"}]},
    "慢": {"on": ["マン"], "kun": [], "words": [{"word": "我慢", "reading": "がまん", "meaning": "Kiên nhẫn, chịu đựng"}, {"word": "自慢", "reading": "じまん", "meaning": "Tự mãn, khoe khoang"}]},
    "憎": {"on": ["ゾウ"], "kun": ["にく・む", "にく・い", "にく・らしい"], "words": [{"word": "憎む", "reading": "にくむ", "meaning": "Căm ghét"}, {"word": "憎らしい", "reading": "にくらしい", "meaning": "Đáng ghét"}]},
    "憶": {"on": ["オク"], "kun": [], "words": [{"word": "記憶", "reading": "きおく", "meaning": "Ký ức"}, {"word": "追憶", "reading": "ついおく", "meaning": "Hồi tưởng"}]},
    "懐": {"on": ["カイ", "エ"], "kun": ["ふところ", "なつ・かしい", "なつ・く"], "words": [{"word": "懐かしい", "reading": "なつかしい", "meaning": "Hoài niệm, nhớ nhung"}]},

    # Hàng 16
    "我": {"on": ["ガ"], "kun": ["われ", "わ"], "words": [{"word": "我々", "reading": "われわれ", "meaning": "Chúng tôi"}, {"word": "自我", "reading": "じが", "meaning": "Cái tôi, bản ngã"}]},
    "戚": {"on": ["セキ"], "kun": ["みうち"], "words": [{"word": "親戚", "reading": "しんせき", "meaning": "Họ hàng thân thích"}]},
    "折": {"on": ["セツ"], "kun": ["お・る", "おり", "お・れる"], "words": [{"word": "骨折", "reading": "こっせつ", "meaning": "Gãy xương"}, {"word": "折る", "reading": "おる", "meaning": "Gập, bẻ"}]},
    "担": {"on": ["タン"], "kun": ["かつ・ぐ", "にな・う"], "words": [{"word": "担当", "reading": "たんとう", "meaning": "Đảm trách"}, {"word": "担ぐ", "reading": "かつぐ", "meaning": "Vác lên vai"}]},
    "拝": {"on": ["ハイ"], "kun": ["おが・む"], "words": [{"word": "拝見", "reading": "はいけん", "meaning": "Xem (khiêm nhường)"}, {"word": "拝む", "reading": "おがむ", "meaning": "Chắp tay cầu khấn"}]},
    "抱": {"on": ["ホウ"], "kun": ["だ・く", "いだ・く", "かか・える"], "words": [{"word": "抱く", "reading": "だく", "meaning": "Ôm ấp"}, {"word": "抱える", "reading": "かかえる", "meaning": "Ôm lấy, gánh vác"}]},
    "振": {"on": ["シン"], "kun": ["ふ・る", "ふ・るう", "ふ・れる"], "words": [{"word": "振動", "reading": "しんどう", "meaning": "Rung động"}, {"word": "振る", "reading": "ふる", "meaning": "Vẫy, lắc, rũ bỏ"}]},
    "挫": {"on": ["ザ"], "kun": ["くじ・く", "くじ・ける"], "words": [{"word": "挫折", "reading": "ざせつ", "meaning": "Thất bại, nản chí"}]},
    "採": {"on": ["サイ"], "kun": ["と・る"], "words": [{"word": "採用", "reading": "さいよう", "meaning": "Tuyển dụng, áp dụng"}, {"word": "採る", "reading": "とる", "meaning": "Hái, nhặt lấy"}]},
    "接": {"on": ["セツ", "ショウ"], "kun": ["つ・ぐ"], "words": [{"word": "面接", "reading": "めんせつ", "meaning": "Phỏng vấn"}, {"word": "直接", "reading": "ちょくせつ", "meaning": "Trực tiếp"}]},

    # Hàng 17
    "描": {"on": ["ビョウ"], "kun": ["えが・く", "か・く"], "words": [{"word": "描写", "reading": "びょうしゃ", "meaning": "Miêu tả"}, {"word": "描く", "reading": "えがく", "meaning": "Vẽ, phác họa"}]},
    "掛": {"on": ["カイ", "ケイ"], "kun": ["か・ける", "か・かる", "かかり"], "words": [{"word": "掛ける", "reading": "かける", "meaning": "Treo lên, gọi điện"}, {"word": "心掛け", "reading": "こころがけ", "meaning": "Ý thức, lưu tâm"}]},
    "握": {"on": ["アク"], "kun": ["にぎ・る"], "words": [{"word": "握手", "reading": "あくしゅ", "meaning": "Bắt tay"}, {"word": "握る", "reading": "にぎる", "meaning": "Nắm lấy"}]},
    "援": {"on": ["エン"], "kun": [], "words": [{"word": "応援", "reading": "おうえん", "meaning": "Cổ vũ, ủng hộ"}, {"word": "援助", "reading": "えんじょ", "meaning": "Viện trợ"}]},
    "揚": {"on": ["ヨウ"], "kun": ["あ・げる", "あ・がる"], "words": [{"word": "掲揚", "reading": "けいよう", "meaning": "Kéo cờ lên cao"}, {"word": "揚げる", "reading": "あげる", "meaning": "Chiên giòn, nâng lên"}]},
    "揺": {"on": ["ヨウ"], "kun": ["ゆ・れる", "ゆ・る", "ゆ・らぐ"], "words": [{"word": "動揺", "reading": "どうよう", "meaning": "Dao động"}, {"word": "揺れる", "reading": "ゆれる", "meaning": "Rung lắc"}]},
    "損": {"on": ["ソン"], "kun": ["そこ・なう", "そこ・ねる"], "words": [{"word": "損害", "reading": "そんがい", "meaning": "Tổn hại"}, {"word": "損", "reading": "そん", "meaning": "Thiệt hại, lỗ"}]},
    "携": {"on": ["ケイ"], "kun": ["たずさ・える", "たずさ・わる"], "words": [{"word": "携帯", "reading": "けいたい", "meaning": "Cầm tay, di động"}, {"word": "連携", "reading": "れんけい", "meaning": "Liên kết phối hợp"}]},
    "挙": {"on": ["キョ"], "kun": ["あ・げる", "あ・がる", "こぞ・る"], "words": [{"word": "選挙", "reading": "せんきょ", "meaning": "Bầu cử"}, {"word": "手を挙げる", "reading": "てをあげる", "meaning": "Giơ tay"}]},
    "改": {"on": ["カイ"], "kun": ["あらた・める", "あらた・まる"], "words": [{"word": "改革", "reading": "かいかく", "meaning": "Cải cách"}, {"word": "改める", "reading": "あらためる", "meaning": "Sửa đổi"}]},

    # Hàng 18
    "攻": {"on": ["コウ"], "kun": ["せ・める"], "words": [{"word": "攻撃", "reading": "こうげき", "meaning": "Công kích, tấn công"}, {"word": "専攻", "reading": "せんこう", "meaning": "Chuyên ngành"}]},
    "断": {"on": ["ダン"], "kun": ["た・つ", "ことわ・る"], "words": [{"word": "断る", "reading": "ことわる", "meaning": "Từ chối"}, {"word": "決断", "reading": "けつだん", "meaning": "Quyết đoán"}]},
    "旦": {"on": ["タン", "ダン"], "kun": ["あきら", "あさ"], "words": [{"word": "元旦", "reading": "がんたん", "meaning": "Sáng mùng 1 Tết"}]},
    "旬": {"on": ["ジュン", "シュン"], "kun": [], "words": [{"word": "上旬", "reading": "じょうじゅん", "meaning": "Thượng tuần (10 ngày đầu)"}, {"word": "旬", "reading": "しゅん", "meaning": "Mùa rộ (hoa quả)"}]},
    "昇": {"on": ["ショウ"], "kun": ["のぼ・る"], "words": [{"word": "昇進", "reading": "しょうしん", "meaning": "Thăng tiến"}, {"word": "昇る", "reading": "のぼる", "meaning": "Lên cao"}]},
    "暮": {"on": ["ボ"], "kun": ["く・れる", "く・らす"], "words": [{"word": "一人暮らし", "reading": "ひとりぐらし", "meaning": "Sống một mình"}, {"word": "暮れる", "reading": "くれる", "meaning": "Lặn, về chiều"}]},
    "曇": {"on": ["ドン"], "kun": ["くも・る"], "words": [{"word": "曇り", "reading": "くもり", "meaning": "Trời nhiều mây"}, {"word": "曇る", "reading": "くもる", "meaning": "Nhiều mây"}]},
    "更": {"on": ["コウ"], "kun": ["さら", "ふ・ける", "ふ・かす"], "words": [{"word": "変更", "reading": "へんこう", "meaning": "Biến đổi, thay đổi"}, {"word": "更新", "reading": "こうしん", "meaning": "Đổi mới, cập nhật"}]},
    "札": {"on": ["サツ"], "kun": ["ふだ"], "words": [{"word": "改札口", "reading": "かいさつぐち", "meaning": "Cổng soát vé"}, {"word": "札", "reading": "ふだ", "meaning": "Thẻ, nhãn"}]},
    "条": {"on": ["ジョウ", "チョウ"], "kun": ["すじ"], "words": [{"word": "条件", "reading": "じょうけん", "meaning": "Điều kiện"}, {"word": "条約", "reading": "じょうやく", "meaning": "Hiệp ước"}]},

    # Hàng 19
    "板": {"on": ["ハン", "バン"], "kun": ["いた"], "words": [{"word": "黒板", "reading": "こくばん", "meaning": "Bảng đen"}, {"word": "看板", "reading": "かんばん", "meaning": "Biển quảng cáo"}]},
    "柱": {"on": ["チュウ"], "kun": ["はしら"], "words": [{"word": "電柱", "reading": "でんちゅう", "meaning": "Cột điện"}, {"word": "柱", "reading": "はしら", "meaning": "Cột trụ"}]},
    "栄": {"on": ["エイ", "ヨウ"], "kun": ["さか・える", "は・え"], "words": [{"word": "栄養", "reading": "えいよう", "meaning": "Dinh dưỡng"}, {"word": "栄える", "reading": "さかえる", "meaning": "Phồn vinh"}]},
    "査": {"on": ["サ"], "kun": [], "words": [{"word": "調査", "reading": "ちょうさ", "meaning": "Điều tra"}, {"word": "検査", "reading": "けんさ", "meaning": "Kiểm tra"}]},
    "染": {"on": ["セン"], "kun": ["そ・める", "そ・まる", "し・みる"], "words": [{"word": "汚染", "reading": "おせん", "meaning": "Ô nhiễm"}, {"word": "感染", "reading": "かんせん", "meaning": "Nhiễm bệnh"}]},
    "枯": {"on": ["コ"], "kun": ["か・れる", "か・らす"], "words": [{"word": "枯れる", "reading": "かれる", "meaning": "Khô héo, úa tàn"}]},
    "柄": {"on": ["ヘイ"], "kun": ["がら", "え"], "words": [{"word": "柄", "reading": "がら", "meaning": "Họa tiết, hoa văn"}, {"word": "人柄", "reading": "ひとがら", "meaning": "Tính cách con người"}]},
    "根": {"on": ["コン"], "kun": ["ね"], "words": [{"word": "根本", "reading": "こんぽん", "meaning": "Căn bản"}, {"word": "屋根", "reading": "やね", "meaning": "Mái nhà"}]},
    "株": {"on": ["シュ"], "kun": ["かぶ"], "words": [{"word": "株式", "reading": "かぶしき", "meaning": "Cổ phiếu"}, {"word": "株式会社", "reading": "かぶしきがいしゃ", "meaning": "Công ty cổ phần"}]},
    "桃": {"on": ["トウ"], "kun": ["もも"], "words": [{"word": "桃", "reading": "もも", "meaning": "Quả đào"}, {"word": "白桃", "reading": "はくとう", "meaning": "Quả đào trắng"}]},

    # Hàng 20
    "栽": {"on": ["サイ"], "kun": [], "words": [{"word": "栽培", "reading": "さいばい", "meaning": "Canh tác, trồng trọt"}, {"word": "盆栽", "reading": "ぼんさい", "meaning": "Cây cảnh Bonsai"}]},
    "検": {"on": ["ケン"], "kun": [], "words": [{"word": "検討", "reading": "けんとう", "meaning": "Xem xét, thảo luận"}, {"word": "点検", "reading": "てんけん", "meaning": "Kiểm tra bảo dưỡng"}]},
    "構": {"on": ["コウ"], "kun": ["かま・える", "かま・う"], "words": [{"word": "構造", "reading": "こうぞう", "meaning": "Cấu trúc"}, {"word": "構わない", "reading": "かまわない", "meaning": "Không sao"}]},
    "標": {"on": ["ヒョウ"], "kun": ["しるし"], "words": [{"word": "目標", "reading": "もくひょう", "meaning": "Mục tiêu"}, {"word": "標準", "reading": "ひょうじゅん", "meaning": "Tiêu chuẩn"}]},
    "歴": {"on": ["レキ"], "kun": [], "words": [{"word": "歴史", "reading": "れきし", "meaning": "Lịch sử"}, {"word": "経歴", "reading": "けいれき", "meaning": "Lý lịch"}]},
    "殴": {"on": ["オウ"], "kun": ["なぐ・る"], "words": [{"word": "殴る", "reading": "なぐる", "meaning": "Đấm, đánh"}, {"word": "殴打", "reading": "おうだ", "meaning": "Ẩu đả"}]},
    "殺": {"on": ["サツ", "サイ", "セツ"], "kun": ["ころ・す"], "words": [{"word": "自殺", "reading": "じさつ", "meaning": "Tự sát"}, {"word": "殺す", "reading": "ころす", "meaning": "Giết chóc"}]},
    "民": {"on": ["ミン"], "kun": ["たみ"], "words": [{"word": "国民", "reading": "こくみん", "meaning": "Quốc dân"}, {"word": "市民", "reading": "しみん", "meaning": "Công dân"}]},
    "求": {"on": ["キュウ", "グ"], "kun": ["もと・める"], "words": [{"word": "要求", "reading": "ようきゅう", "meaning": "Yêu cầu"}, {"word": "求める", "reading": "もとめる", "meaning": "Tìm kiếm, mong cầu"}]},
    "沈": {"on": ["チン"], "kun": ["しず・む", "しず・める"], "words": [{"word": "沈没", "reading": "ちんぼつ", "meaning": "Chìm đắm, đắm tàu"}, {"word": "沈む", "reading": "しずむ", "meaning": "Lặn, chìm"}]},

    # Hàng 21
    "派": {"on": ["ハイ"], "kun": [], "words": [{"word": "立派", "reading": "りっぱ", "meaning": "Tuyệt vời, tráng lệ"}, {"word": "派遣", "reading": "はけん", "meaning": "Phái cử"}]},
    "深": {"on": ["シン"], "kun": ["ふか・い", "ふか・まる"], "words": [{"word": "深刻", "reading": "しんこく", "meaning": "Nghiêm trọng"}, {"word": "深い", "reading": "ふかい", "meaning": "Sâu sắc"}]},
    "混": {"on": ["コン"], "kun": ["ま・じる", "ま・ざる", "こ・む"], "words": [{"word": "混乱", "reading": "こんらん", "meaning": "Hỗn loạn"}, {"word": "混む", "reading": "こむ", "meaning": "Đông đúc"}]},
    "満": {"on": ["マン"], "kun": ["み・ちる", "み・たす"], "words": [{"word": "満足", "reading": "まんぞく", "meaning": "Thỏa mãn"}, {"word": "満員", "reading": "まんいん", "meaning": "Đông kín người"}]},
    "溶": {"on": ["ヨウ"], "kun": ["と・ける", "と・かす"], "words": [{"word": "溶液", "reading": "ようえき", "meaning": "Dung dịch"}, {"word": "溶ける", "reading": "とける", "meaning": "Tan ra"}]},
    "漁": {"on": ["ギョ", "リョウ"], "kun": ["あさ・る"], "words": [{"word": "漁業", "reading": "ぎょぎょう", "meaning": "Ngư nghiệp"}, {"word": "漁船", "reading": "ぎょせん", "meaning": "Tàu đánh cá"}]},
    "漂": {"on": ["ヒョウ"], "kun": ["ただよ・う"], "words": [{"word": "漂白", "reading": "ひょうはく", "meaning": "Tẩy trắng"}, {"word": "漂う", "reading": "ただよう", "meaning": "Trôi dạt, phảng phất"}]},
    "激": {"on": ["ゲキ"], "kun": ["はげ・しい"], "words": [{"word": "感激", "reading": "かんげき", "meaning": "Cảm kích"}, {"word": "激しい", "reading": "はげしい", "meaning": "Kịch liệt, dữ dội"}]},
    "灯": {"on": ["トウ"], "kun": ["ひ", "ほ-", "ともしび"], "words": [{"word": "電灯", "reading": "でんとう", "meaning": "Bóng đèn điện"}, {"word": "街灯", "reading": "がいとう", "meaning": "Đèn đường"}]},
    "炊": {"on": ["スイ"], "kun": ["た・く"], "words": [{"word": "炊飯器", "reading": "すいはんき", "meaning": "Nồi cơm điện"}, {"word": "炊く", "reading": "たく", "meaning": "Nấu cơm"}]},

    # Hàng 22
    "煮": {"on": ["シャ"], "kun": ["に・る", "に・える", "に・やす"], "words": [{"word": "煮物", "reading": "にもの", "meaning": "Món kho/ninh"}, {"word": "煮る", "reading": "にる", "meaning": "Ninh, nấu"}]},
    "犯": {"on": ["ハン", "ボン"], "kun": ["おか・す"], "words": [{"word": "犯人", "reading": "はんにん", "meaning": "Thủ phạm"}, {"word": "犯罪", "reading": "はんざい", "meaning": "Tội phạm"}]},
    "状": {"on": ["ジョウ"], "kun": [], "words": [{"word": "状況", "reading": "じょうきょう", "meaning": "Tình trạng"}, {"word": "礼状", "reading": "れいじょう", "meaning": "Thư cảm ơn"}]},
    "環": {"on": ["カン"], "kun": ["わ"], "words": [{"word": "環境", "reading": "かんきょう", "meaning": "Môi trường"}, {"word": "循環", "reading": "じゅんかん", "meaning": "Tuần hoàn"}]},
    "畑": {"on": [], "kun": ["はた", "はたけ"], "words": [{"word": "畑", "reading": "はたけ", "meaning": "Cánh đồng, nương rẫy"}]},
    "畜": {"on": ["チク"], "kun": [], "words": [{"word": "畜産", "reading": "ちくさん", "meaning": "Chăn nuôi"}, {"word": "家畜", "reading": "かちく", "meaning": "Gia súc"}]},
    "疑": {"on": ["ギ"], "kun": ["うたが・う"], "words": [{"word": "疑問", "reading": "ぎもん", "meaning": "Nghi vấn"}, {"word": "疑う", "reading": "うたがう", "meaning": "Nghi ngờ"}]},
    "症": {"on": ["ショウ"], "kun": [], "words": [{"word": "重症", "reading": "じゅうしょう", "meaning": "Bệnh nặng"}, {"word": "症状", "reading": "しょうじょう", "meaning": "Triệu chứng"}]},
    "療": {"on": ["リョウ"], "kun": [], "words": [{"word": "治療", "reading": "ちりょう", "meaning": "Điều trị"}, {"word": "医療", "reading": "いりょう", "meaning": "Y tế"}]},
    "皮": {"on": ["ヒ"], "kun": ["かわ"], "words": [{"word": "皮膚", "reading": "ひふ", "meaning": "Da dẻ"}, {"word": "皮", "reading": "かわ", "meaning": "Vỏ, da"}]},

    # Hàng 23
    "盛": {"on": ["セイ", "ジョウ"], "kun": ["も・る", "さか・る", "さか・ん"], "words": [{"word": "盛ん", "reading": "さかん", "meaning": "Thịnh vượng"}, {"word": "大盛り", "reading": "おおもり", "meaning": "Bát lớn (cơm)"}]},
    "盗": {"on": ["トウ"], "kun": ["ぬす・む"], "words": [{"word": "強盗", "reading": "ごうとう", "meaning": "Cướp bóc"}, {"word": "盗む", "reading": "ぬすむ", "meaning": "Trộm cắp"}]},
    "省": {"on": ["セイ", "ショウ"], "kun": ["かえり・みる", "はぶ・く"], "words": [{"word": "反省", "reading": "はんせい", "meaning": "Kiểm điểm"}, {"word": "省略", "reading": "しょうりゃく", "meaning": "Lược bớt"}]},
    "看": {"on": ["カン"], "kun": ["み・る"], "words": [{"word": "看護師", "reading": "かんごし", "meaning": "Y tá"}, {"word": "看板", "reading": "かんばん", "meaning": "Bảng hiệu"}]},
    "眺": {"on": ["チョウ"], "kun": ["なが・める"], "words": [{"word": "眺望", "reading": "ちょうぼう", "meaning": "Tầm nhìn"}, {"word": "眺める", "reading": "ながめる", "meaning": "Ngắm nhìn"}]},
    "睡": {"on": ["スイ"], "kun": ["ねむ・る"], "words": [{"word": "睡眠", "reading": "すいみん", "meaning": "Giấc ngủ"}, {"word": "熟睡", "reading": "じゅくすい", "meaning": "Ngủ say"}]},
    "砂": {"on": ["サ", "シャ"], "kun": ["すな"], "words": [{"word": "砂糖", "reading": "さとう", "meaning": "Đường ăn"}, {"word": "砂", "reading": "すな", "meaning": "Hạt cát"}]},
    "硬": {"on": ["コウ"], "kun": ["かた・い"], "words": [{"word": "硬貨", "reading": "こうか", "meaning": "Tiền xu"}, {"word": "硬い", "reading": "かたい", "meaning": "Cứng rắn"}]},
    "磨": {"on": ["マ"], "kun": ["みが・く"], "words": [{"word": "研磨", "reading": "けんま", "meaning": "Mài giũa"}, {"word": "磨く", "reading": "みがく", "meaning": "Đánh răng, mài"}]},
    "票": {"on": ["ヒョウ"], "kun": [], "words": [{"word": "投票", "reading": "とうひょう", "meaning": "Bỏ phiếu"}, {"word": "伝票", "reading": "でんぴょう", "meaning": "Hóa đơn"}]},

    # Hàng 24
    "福": {"on": ["フク"], "kun": [], "words": [{"word": "幸福", "reading": "こうふく", "meaning": "Hạnh phúc"}, {"word": "福祉", "reading": "ふくし", "meaning": "Phúc lợi"}]},
    "秀": {"on": ["シュウ"], "kun": ["ひい・でる"], "words": [{"word": "優秀", "reading": "ゆうしゅう", "meaning": "Ưu tú, xuất sắc"}]},
    "秒": {"on": ["ビョウ"], "kun": [], "words": [{"word": "秒", "reading": "びょう", "meaning": "Giây"}, {"word": "毎秒", "reading": "まいびょう", "meaning": "Mỗi giây"}]},
    "秘": {"on": ["ヒ"], "kun": ["ひ・める"], "words": [{"word": "秘密", "reading": "ひみつ", "meaning": "Bí mật"}, {"word": "神秘", "reading": "しんぴ", "meaning": "Thần bí"}]},
    "移": {"on": ["イ"], "kun": ["うつ・る", "うつ・す"], "words": [{"word": "移動", "reading": "いどう", "meaning": "Di chuyển"}, {"word": "移る", "reading": "うつる", "meaning": "Chuyển sang"}]},
    "程": {"on": ["テイ"], "kun": ["ほど"], "words": [{"word": "程度", "reading": "ていど", "meaning": "Mức độ"}, {"word": "日程", "reading": "にってい", "meaning": "Lịch trình"}]},
    "稚": {"on": ["チ"], "kun": ["いとけない"], "words": [{"word": "幼稚", "reading": "ようち", "meaning": "Ấu trĩ, non nớt"}, {"word": "幼稚園", "reading": "ようちえん", "meaning": "Trường mầm non"}]},
    "稼": {"on": ["カ"], "kun": ["かせ・ぐ"], "words": [{"word": "稼ぐ", "reading": "かせぐ", "meaning": "Kiếm tiền"}, {"word": "稼働", "reading": "かどう", "meaning": "Hoạt động máy móc"}]},
    "積": {"on": ["セキ"], "kun": ["つ・む", "つ・もる"], "words": [{"word": "面積", "reading": "めんせき", "meaning": "Diện tích"}, {"word": "積もる", "reading": "つもる", "meaning": "Chất đống"}]},
    "穏": {"on": ["オン"], "kun": ["おだ・やか"], "words": [{"word": "平穏", "reading": "へいおん", "meaning": "Bình yên"}, {"word": "穏やか", "reading": "おだやか", "meaning": "Ôn hòa, êm đềm"}]},

    # Hàng 25
    "突": {"on": ["トツ"], "kun": ["つ・く"], "words": [{"word": "突然", "reading": "とつぜん", "meaning": "Đột nhiên"}, {"word": "衝突", "reading": "しょうとつ", "meaning": "Va chạm"}]},
    "章": {"on": ["ショウ"], "kun": [], "words": [{"word": "文章", "reading": "ぶんしょう", "meaning": "Văn chương, đoạn văn"}, {"word": "第一章", "reading": "だいいっしょう", "meaning": "Chương 1"}]},
    "童": {"on": ["ドウ"], "kun": ["わらべ"], "words": [{"word": "童話", "reading": "どうわ", "meaning": "Truyện cổ tích"}, {"word": "児童", "reading": "じどう", "meaning": "Nhi đồng"}]},
    "端": {"on": ["タン"], "kun": ["はし", "は", "はた"], "words": [{"word": "先端", "reading": "せんたん", "meaning": "Mũi nhọn, đi đầu"}, {"word": "端", "reading": "はし", "meaning": "Rìa mép"}]},
    "競": {"on": ["キョウ", "ケイ"], "kun": ["きそ・う", "せ・る"], "words": [{"word": "競争", "reading": "きょうそう", "meaning": "Cạnh tranh"}, {"word": "競馬", "reading": "けいば", "meaning": "Đua ngựa"}]},
    "等": {"on": ["トウ"], "kun": ["ひと・しい"], "words": [{"word": "平等", "reading": "びょうどう", "meaning": "Bình đẳng"}, {"word": "等しい", "reading": "ひとしい", "meaning": "Tương đương, bằng"}]},
    "範": {"on": ["ハン"], "kun": [], "words": [{"word": "範囲", "reading": "はんい", "meaning": "Phạm vi"}, {"word": "模範", "reading": "もはん", "meaning": "Mô phạm, mẫu mực"}]},
    "箸": {"on": ["チョ"], "kun": ["はし"], "words": [{"word": "お箸", "reading": "おはし", "meaning": "Đôi đũa"}]},
    "籍": {"on": ["セキ"], "kun": [], "words": [{"word": "国籍", "reading": "こくせき", "meaning": "Quốc tịch"}, {"word": "書籍", "reading": "しょせき", "meaning": "Sách vở"}]},
    "粉": {"on": ["フン"], "kun": ["こ", "こな"], "words": [{"word": "花粉", "reading": "かふん", "meaning": "Phấn hoa"}, {"word": "小麦粉", "reading": "こむぎこ", "meaning": "Bột mì"}]},

    # Hàng 26
    "粋": {"on": ["スイ"], "kun": ["いき"], "words": [{"word": "純粋", "reading": "じゅんすい", "meaning": "Thuần khiết"}, {"word": "粋", "reading": "いき", "meaning": "Tao nhã"}]},
    "粒": {"on": ["リュウ"], "kun": ["つぶ"], "words": [{"word": "粒子", "reading": "りゅうし", "meaning": "Hạt nhỏ"}, {"word": "一粒", "reading": "ひとつぶ", "meaning": "Một hạt"}]},
    "粧": {"on": ["ショウ"], "kun": [], "words": [{"word": "化粧", "reading": "けしょう", "meaning": "Trang điểm"}]},
    "精": {"on": ["セイ", "ショウ"], "kun": [], "words": [{"word": "精神", "reading": "せいしん", "meaning": "Tinh thần"}, {"word": "精密", "reading": "せいみつ", "meaning": "Tinh vi, chính xác"}]},
    "糖": {"on": ["トウ"], "kun": [], "words": [{"word": "砂糖", "reading": "さとう", "meaning": "Đường ăn"}, {"word": "糖尿病", "reading": "とうにょうびょう", "meaning": "Bệnh tiểu đường"}]},
    "系": {"on": ["ケイ"], "kun": [], "words": [{"word": "系統", "reading": "けいとう", "meaning": "Hệ thống"}, {"word": "太陽系", "reading": "たいようけい", "meaning": "Hệ mặt trời"}]},
    "紅": {"on": ["コウ", "ク"], "kun": ["べに", "くれない", "あか・い"], "words": [{"word": "紅茶", "reading": "こうちゃ", "meaning": "Hồng trà"}, {"word": "紅葉", "reading": "こうよう", "meaning": "Lá đỏ mùa thu"}]},
    "純": {"on": ["ジュン"], "kun": [], "words": [{"word": "単純", "reading": "たんじゅん", "meaning": "Đơn thuần"}, {"word": "純金", "reading": "じゅんきん", "meaning": "Vàng ròng"}]},
    "納": {"on": ["ノウ", "ナッ", "ナン"], "kun": ["おさ・める", "おさ・まる"], "words": [{"word": "納得", "reading": "なっとく", "meaning": "Đồng thuận"}, {"word": "納豆", "reading": "なっとう", "meaning": "Đậu lên men Natto"}]},
    "統": {"on": ["トウ"], "kun": ["す・べる"], "words": [{"word": "大統領", "reading": "だいとうりょう", "meaning": "Tổng thống"}, {"word": "統計", "reading": "とうけい", "meaning": "Thống kê"}]},

    # Hàng 27
    "絞": {"on": ["コウ"], "kun": ["しぼ・る", "し・める", "し・まる"], "words": [{"word": "絞る", "reading": "しぼる", "meaning": "Vắt kiệt, siết lại"}]},
    "総": {"on": ["ソウ"], "kun": ["ふさ"], "words": [{"word": "総理大臣", "reading": "そうりだいじん", "meaning": "Thủ tướng"}, {"word": "総合", "reading": "そうごう", "meaning": "Tổng hợp"}]},
    "編": {"on": ["ヘン"], "kun": ["あ・む"], "words": [{"word": "編集", "reading": "へんしゅう", "meaning": "Biên tập"}, {"word": "編む", "reading": "あむ", "meaning": "Đan áo len"}]},
    "緊": {"on": ["キン"], "kun": [], "words": [{"word": "緊急", "reading": "きんきゅう", "meaning": "Khẩn cấp"}, {"word": "緊張", "reading": "きんちょう", "meaning": "Căng thẳng"}]},
    "締": {"on": ["テイ"], "kun": ["し・める", "し・まる"], "words": [{"word": "締切", "reading": "しめきり", "meaning": "Hạn chót"}, {"word": "結ぶ", "reading": "むすぶ", "meaning": "Buộc lại"}]},
    "績": {"on": ["セキ"], "kun": [], "words": [{"word": "成績", "reading": "せいせき", "meaning": "Thành tích"}, {"word": "業績", "reading": "ぎょうせき", "meaning": "Thành quả kinh doanh"}]},
    "繰": {"on": ["ソウ"], "kun": ["く・る"], "words": [{"word": "繰り返す", "reading": "くりかえす", "meaning": "Lặp đi lặp lại"}]},
    "罪": {"on": ["ザイ"], "kun": ["つみ"], "words": [{"word": "無罪", "reading": "むざい", "meaning": "Vô tội"}, {"word": "犯罪", "reading": "はんざい", "meaning": "Tội phạm"}]},
    "署": {"on": ["ショ"], "kun": [], "words": [{"word": "警察署", "reading": "けいさつしょ", "meaning": "Đồn cảnh sát"}, {"word": "署名", "reading": "しょめい", "meaning": "Ký tên"}]},
    "罰": {"on": ["バツ", "バチ"], "kun": [], "words": [{"word": "罰金", "reading": "ばっきん", "meaning": "Tiền phạt"}, {"word": "処罰", "reading": "しょばつ", "meaning": "Xử phạt"}]},

    # Hàng 28
    "翌": {"on": ["ヨク"], "kun": [], "words": [{"word": "翌日", "reading": "よくじつ", "meaning": "Ngày hôm sau"}, {"word": "翌朝", "reading": "よくあさ", "meaning": "Sáng hôm sau"}]},
    "翻": {"on": ["ホン"], "kun": ["ひるがえ・る", "ひるがえ・す"], "words": [{"word": "翻訳", "reading": "ほんやく", "meaning": "Dịch văn bản"}]},
    "老": {"on": ["ロウ"], "kun": ["お・いる", "ふ・ける"], "words": [{"word": "老人", "reading": "ろうじん", "meaning": "Người già"}, {"word": "老後", "reading": "ろうご", "meaning": "Tuổi già"}]},
    "聴": {"on": ["チョウ"], "kun": ["き・く"], "words": [{"word": "聴解", "reading": "ちょうかい", "meaning": "Luyện nghe hiểu"}, {"word": "聴く", "reading": "きく", "meaning": "Lắng nghe"}]},
    "職": {"on": ["ショク"], "kun": [], "words": [{"word": "職業", "reading": "しょくぎょう", "meaning": "Nghề nghiệp"}, {"word": "職場", "reading": "しょくば", "meaning": "Nơi làm việc"}]},
    "肌": {"on": ["キ"], "kun": ["はだ"], "words": [{"word": "肌", "reading": "はだ", "meaning": "Làn da"}]},
    "肩": {"on": ["ケン"], "kun": ["かた"], "words": [{"word": "肩", "reading": "かた", "meaning": "Bờ vai"}, {"word": "肩幅", "reading": "かたはば", "meaning": "Độ rộng vai"}]},
    "肯": {"on": ["コウ"], "kun": [], "words": [{"word": "肯定", "reading": "こうてい", "meaning": "Khẳng định"}]},
    "肺": {"on": ["ハイ"], "kun": [], "words": [{"word": "肺炎", "reading": "はいえん", "meaning": "Viêm phổi"}, {"word": "肺", "reading": "はい", "meaning": "Phổi"}]},
    "胸": {"on": ["キョウ"], "kun": ["むね", "むな"], "words": [{"word": "胸", "reading": "むね", "meaning": "Lồng ngực, ngực"}]},

    # Hàng 29
    "脳": {"on": ["ノウ"], "kun": [], "words": [{"word": "頭脳", "reading": "ずのう", "meaning": "Đầu óc"}, {"word": "脳波", "reading": "のうは", "meaning": "Sóng não"}]},
    "腕": {"on": ["ワン"], "kun": ["うで"], "words": [{"word": "腕時計", "reading": "うでどけい", "meaning": "Đồng hồ đeo tay"}, {"word": "腕", "reading": "うで", "meaning": "Cánh tay, tay nghề"}]},
    "腹": {"on": ["フク"], "kun": ["はら"], "words": [{"word": "空腹", "reading": "くうふく", "meaning": "Bụng đói"}, {"word": "お腹", "reading": "おなか", "meaning": "Cái bụng"}]},
    "腰": {"on": ["ヨウ"], "kun": ["こし"], "words": [{"word": "腰痛", "reading": "ようつう", "meaning": "Đau lưng"}, {"word": "腰", "reading": "こし", "meaning": "Thắt lưng, eo"}]},
    "腐": {"on": ["フ"], "kun": ["くさ・る", "くさ・れる", "くさ・らす"], "words": [{"word": "腐る", "reading": "くさる", "meaning": "Thiu, ôi thiu"}, {"word": "豆腐", "reading": "とうふ", "meaning": "Đậu phụ"}]},
    "臓": {"on": ["ゾウ"], "kun": [], "words": [{"word": "心臓", "reading": "しんぞう", "meaning": "Quả tim"}, {"word": "内臓", "reading": "ないぞう", "meaning": "Nội tạng"}]},
    "臣": {"on": ["シン", "ジン"], "kun": [], "words": [{"word": "大臣", "reading": "だいじん", "meaning": "Bộ trưởng"}]},
    "臭": {"on": ["シュウ"], "kun": ["くさ・い", "にお・う"], "words": [{"word": "悪臭", "reading": "あくしゅう", "meaning": "Mùi hôi thối"}, {"word": "臭い", "reading": "くさい", "meaning": "Có mùi hôi"}]},
    "興": {"on": ["コウ", "キョウ"], "kun": ["おこ・る", "おこ・す"], "words": [{"word": "興味", "reading": "きょうみ", "meaning": "Hứng thú"}, {"word": "興奮", "reading": "こうふん", "meaning": "Hưng phấn"}]},
    "航": {"on": ["コウ"], "kun": [], "words": [{"word": "航空", "reading": "こうくう", "meaning": "Hàng không"}, {"word": "航海", "reading": "こうかい", "meaning": "Hàng hải"}]},

    # Hàng 30
    "般": {"on": ["ハン"], "kun": [], "words": [{"word": "一般", "reading": "いっぱん", "meaning": "Nói chung, phổ thông"}, {"word": "全般", "reading": "ぜんぱん", "meaning": "Toàn thể"}]},
    "芸": {"on": ["ゲイ"], "kun": [], "words": [{"word": "芸術", "reading": "げいじゅつ", "meaning": "Nghệ thuật"}, {"word": "芸能人", "reading": "げいのうじん", "meaning": "Nghệ sĩ giải trí"}]},
    "草": {"on": ["ソウ"], "kun": ["くさ"], "words": [{"word": "草原", "reading": "そうげん", "meaning": "Thảo nguyên"}, {"word": "草", "reading": "くさ", "meaning": "Cỏ"}]},
    "荒": {"on": ["コウ"], "kun": ["あら・い", "あ・れる", "あ・らす"], "words": [{"word": "荒れる", "reading": "あれる", "meaning": "Biển động, hoang phế"}, {"word": "荒い", "reading": "あらい", "meaning": "Thô ráp"}]},
    "華": {"on": ["カ", "ケ"], "kun": ["はな"], "words": [{"word": "豪華", "reading": "ごうか", "meaning": "Hào nhoáng, sang trọng"}, {"word": "華やか", "reading": "はなやか", "meaning": "Tươi thắm, rực rỡ"}]},
    "葬": {"on": ["ソウ"], "kun": ["ほうむ・る"], "words": [{"word": "葬式", "reading": "そうしき", "meaning": "Tang lễ"}, {"word": "葬る", "reading": "ほうむる", "meaning": "Chôn cất"}]},
    "蒸": {"on": ["ジョウ", "セイ"], "kun": ["む・す", "む・れる", "む・らす"], "words": [{"word": "蒸気", "reading": "じょうき", "meaning": "Hơi nước"}, {"word": "蒸し暑い", "reading": "むしあつい", "meaning": "Oi bức"}]},
    "蔵": {"on": ["ゾウ", "ソウ"], "kun": ["くら", "かく・れる"], "words": [{"word": "冷蔵庫", "reading": "れいぞうこ", "meaning": "Tủ lạnh"}, {"word": "蔵", "reading": "くら", "meaning": "Nhà kho"}]},
    "虹": {"on": ["コウ"], "kun": ["にじ"], "words": [{"word": "虹", "reading": "にじ", "meaning": "Cầu vồng"}]},
    "蚊": {"on": ["ブン"], "kun": ["か"], "words": [{"word": "蚊", "reading": "か", "meaning": "Con muỗi"}]},

    # Hàng 31
    "蛍": {"on": ["ケイ"], "kun": ["ほたる"], "words": [{"word": "蛍光灯", "reading": "けいこうとう", "meaning": "Đèn huỳnh quang"}, {"word": "蛍", "reading": "ほたる", "meaning": "Đom đóm"}]},
    "蛇": {"on": ["ジャ", "ダ", "ヤ"], "kun": ["へび"], "words": [{"word": "蛇口", "reading": "じゃぐち", "meaning": "Vòi nước"}, {"word": "蛇", "reading": "へび", "meaning": "Con rắn"}]},
    "蜂": {"on": ["ホウ"], "kun": ["はち"], "words": [{"word": "蜂蜜", "reading": "はちみつ", "meaning": "Mật ong"}, {"word": "蜂", "reading": "はち", "meaning": "Con ong"}]},
    "蜜": {"on": ["ミツ"], "kun": [], "words": [{"word": "蜂蜜", "reading": "はちみつ", "meaning": "Mật ong"}]},
    "血": {"on": ["ケツ"], "kun": ["ち"], "words": [{"word": "血管", "reading": "けっかん", "meaning": "Mạch máu"}, {"word": "血", "reading": "ち", "meaning": "Máu"}]},
    "街": {"on": ["ガイ", "カイ"], "kun": ["まち"], "words": [{"word": "商店街", "reading": "しょうてんがい", "meaning": "Phố mua sắm"}, {"word": "街道", "reading": "かいどう", "meaning": "Đường phố"}]},
    "被": {"on": ["ヒ"], "kun": ["こうむ・る", "かぶ・る", "かぶ・せる"], "words": [{"word": "被害", "reading": "ひがい", "meaning": "Thiệt hại"}, {"word": "被る", "reading": "かぶる", "meaning": "Đội, chịu lấy"}]},
    "視": {"on": ["シ"], "kun": ["み・る"], "words": [{"word": "視力", "reading": "しりょく", "meaning": "Thị lực"}, {"word": "無視", "reading": "むし", "meaning": "Xem thường, phớt lờ"}]},
    "観": {"on": ["カン"], "kun": ["み・る"], "words": [{"word": "観光", "reading": "かんこう", "meaning": "Tham quan, du lịch"}, {"word": "観客", "reading": "かんきゃく", "meaning": "Khán giả"}]},
    "訓": {"on": ["クン"], "kun": [], "words": [{"word": "訓練", "reading": "くんれん", "meaning": "Huấn luyện"}, {"word": "教訓", "reading": "きょうくん", "meaning": "Bài học giáo huấn"}]},

    # Hàng 32
    "設": {"on": ["セツ"], "kun": ["もう・ける"], "words": [{"word": "建設", "reading": "けんせつ", "meaning": "Xây dựng"}, {"word": "設計", "reading": "せっけい", "meaning": "Thiết kế"}]},
    "訪": {"on": ["ホウ"], "kun": ["おとず・れる", "たず・ねる"], "words": [{"word": "訪問", "reading": "ほうもん", "meaning": "Thăm hỏi"}, {"word": "訪ねる", "reading": "たずねる", "meaning": "Ghé thăm"}]},
    "評": {"on": ["ヒョウ"], "kun": [], "words": [{"word": "評価", "reading": "ひょうか", "meaning": "Đánh giá"}, {"word": "評判", "reading": "ひょうばん", "meaning": "Danh tiếng"}]},
    "詞": {"on": ["シ"], "kun": [], "words": [{"word": "歌詞", "reading": "かし", "meaning": "Lời bài hát"}, {"word": "動詞", "reading": "どうし", "meaning": "Động từ"}]},
    "診": {"on": ["シン"], "kun": ["み・る"], "words": [{"word": "診断", "reading": "しんだん", "meaning": "Chẩn đoán"}, {"word": "健診", "reading": "けんしん", "meaning": "Khám sức khỏe"}]},
    "誠": {"on": ["セイ"], "kun": ["まこと"], "words": [{"word": "誠実", "reading": "せいじつ", "meaning": "Thành thật"}, {"word": "誠に", "reading": "まことに", "meaning": "Chân thành (cảm ơn)"}]},
    "誤": {"on": ["ゴ"], "kun": ["あやま・る"], "words": [{"word": "誤解", "reading": "ごかい", "meaning": "Hiểu lầm"}, {"word": "誤り", "reading": "あやまり", "meaning": "Sai sót"}]},
    "諸": {"on": ["ショ"], "kun": ["もろ"], "words": [{"word": "諸問題", "reading": "しょもんだい", "meaning": "Các vấn đề"}, {"word": "諸国", "reading": "しょこく", "meaning": "Các nước"}]},
    "誕": {"on": ["タン"], "kun": [], "words": [{"word": "誕生日", "reading": "たんじょうび", "meaning": "Sinh nhật"}, {"word": "誕生", "reading": "たんじょう", "meaning": "Sự ra đời"}]},
    "請": {"on": ["セイ", "シン"], "kun": ["こ・う", "う・ける"], "words": [{"word": "請求", "reading": "せいきゅう", "meaning": "Yêu cầu thanh toán"}, {"word": "普請", "reading": "ふしん", "meaning": "Xây dựng"}]},

    # Hàng 33
    "誰": {"on": ["スイ"], "kun": ["だれ", "たれ"], "words": [{"word": "誰", "reading": "だれ", "meaning": "Ai"}]},
    "諦": {"on": ["テイ", "タイ"], "kun": ["あきら・める", "つまびらか"], "words": [{"word": "諦める", "reading": "あきらめる", "meaning": "Từ bỏ, cam chịu"}]},
    "謙": {"on": ["ケン"], "kun": ["へりくだ・る"], "words": [{"word": "謙遜", "reading": "けんそん", "meaning": "Khiêm tốn"}, {"word": "謙譲語", "reading": "けんじょうご", "meaning": "Khiêm nhường ngữ"}]},
    "識": {"on": ["シキ"], "kun": ["し・る"], "words": [{"word": "知識", "reading": "ちしき", "meaning": "Tri thức, hiểu biết"}, {"word": "意識", "reading": "いしき", "meaning": "Ý thức"}]},
    "護": {"on": ["ゴ"], "kun": ["まも・る"], "words": [{"word": "看護師", "reading": "かんごし", "meaning": "Y tá"}, {"word": "弁護士", "reading": "べんごし", "meaning": "Luật sư"}]},
    "譲": {"on": ["ジョウ"], "kun": ["ゆず・る"], "words": [{"word": "譲る", "reading": "ゆずる", "meaning": "Nhường lại"}, {"word": "謙譲", "reading": "けんじょう", "meaning": "Khiêm nhường"}]},
    "谷": {"on": ["コク"], "kun": ["たに"], "words": [{"word": "渓谷", "reading": "けいこく", "meaning": "Thung lũng"}, {"word": "谷", "reading": "たに", "meaning": "Khe núi"}]},
    "豊": {"on": ["ホウ", "ブ"], "kun": ["ゆた・か", "とよ"], "words": [{"word": "豊富", "reading": "ほうふ", "meaning": "Phong phú"}, {"word": "豊か", "reading": "ゆたか", "meaning": "Giàu có, phì nhiêu"}]},
    "豚": {"on": ["トン"], "kun": ["ぶた"], "words": [{"word": "豚肉", "reading": "ぶたにく", "meaning": "Thịt lợn"}, {"word": "豚", "reading": "ぶた", "meaning": "Con heo/lợn"}]},
    "貨": {"on": ["カ"], "kun": ["たから"], "words": [{"word": "通貨", "reading": "つうか", "meaning": "Tiền tệ"}, {"word": "貨物", "reading": "かもつ", "meaning": "Hàng hóa"}]},

    # Hàng 34
    "責": {"on": ["セキ"], "kun": ["せ・める"], "words": [{"word": "責任", "reading": "せきにん", "meaning": "Trách nhiệm"}, {"word": "責める", "reading": "せめる", "meaning": "Chỉ trích, đổ lỗi"}]},
    "貧": {"on": ["ヒン", "ビン"], "kun": ["まず・しい"], "words": [{"word": "貧乏", "reading": "びんぼう", "meaning": "Nghèo khó"}, {"word": "貧しい", "reading": "まずしい", "meaning": "Nghèo túng"}]},
    "販": {"on": ["ハン"], "kun": [], "words": [{"word": "販売", "reading": "はんばい", "meaning": "Buôn bán"}, {"word": "自動販売機", "reading": "じどうはんばいき", "meaning": "Máy bán hàng tự động"}]},
    "貴": {"on": ["キ"], "kun": ["たっと・い", "とうと・い"], "words": [{"word": "貴重", "reading": "きちょう", "meaning": "Quý giá"}, {"word": "貴族", "reading": "きぞく", "meaning": "Quý tộc"}]},
    "貼": {"on": ["テン", "チョウ"], "kun": ["は・る"], "words": [{"word": "貼る", "reading": "はる", "meaning": "Dán lên"}, {"word": "貼り紙", "reading": "はりがみ", "meaning": "Tờ giấy dán"}]},
    "賢": {"on": ["ケン"], "kun": ["かしこ・い"], "words": [{"word": "賢明", "reading": "けんめい", "meaning": "Sáng suốt"}, {"word": "賢い", "reading": "かしこい", "meaning": "Thông minh"}]},
    "路": {"on": ["ロ"], "kun": ["じ", "みち"], "words": [{"word": "道路", "reading": "どうろ", "meaning": "Đường lộ"}, {"word": "進路", "reading": "しんろ", "meaning": "Định hướng tương lai"}]},
    "蹴": {"on": ["シュウ"], "kun": ["け・る"], "words": [{"word": "蹴る", "reading": "ける", "meaning": "Đá (bóng)"}, {"word": "一蹴", "reading": "いっしゅう", "meaning": "Gạt phắt đi"}]},
    "軍": {"on": ["グン"], "kun": [], "words": [{"word": "軍隊", "reading": "ぐんたい", "meaning": "Quân đội"}, {"word": "米軍", "reading": "べいぐん", "meaning": "Quân đội Mỹ"}]},
    "軒": {"on": ["ケン"], "kun": ["のき"], "words": [{"word": "一軒家", "reading": "いっけんや", "meaning": "Nhà riêng một căn"}, {"word": "軒", "reading": "のき", "meaning": "Mái hiên"}]},

    # Hàng 35
    "軟": {"on": ["ナン"], "kun": ["やわ・らか", "やわ・らかい"], "words": [{"word": "柔軟", "reading": "じゅうなん", "meaning": "Mềm dẻo, linh hoạt"}, {"word": "軟らかい", "reading": "やわらかい", "meaning": "Mềm nhũn"}]},
    "載": {"on": ["サイ"], "kun": ["の・せる", "の・る"], "words": [{"word": "掲載", "reading": "けいさい", "meaning": "Đăng tải (bài viết)"}, {"word": "載せる", "reading": "のせる", "meaning": "Chất lên xe"}]},
    "輪": {"on": ["リン"], "kun": ["わ"], "words": [{"word": "車輪", "reading": "しゃりん", "meaning": "Bánh xe"}, {"word": "指輪", "reading": "ゆびわ", "meaning": "Nhẫn đeo tay"}]},
    "輩": {"on": ["ハイ"], "kun": ["ともがら"], "words": [{"word": "先輩", "reading": "せんぱい", "meaning": "Tiền bối"}, {"word": "後輩", "reading": "こうはい", "meaning": "Hậu bối"}]},
    "追": {"on": ["ツイ"], "kun": ["お・う"], "words": [{"word": "追加", "reading": "ついか", "meaning": "Thêm vào"}, {"word": "追う", "reading": "おう", "meaning": "Đuổi theo"}]},
    "迷": {"on": ["メイ"], "kun": ["まよ・う"], "words": [{"word": "迷惑", "reading": "めいわく", "meaning": "Làm phiền"}, {"word": "迷う", "reading": "まよう", "meaning": "Lạc đường, phân vân"}]},
    "遭": {"on": ["ソウ"], "kun": ["あ・う"], "words": [{"word": "遭難", "reading": "そうなん", "meaning": "Gặp nạn"}, {"word": "遭う", "reading": "あう", "meaning": "Bắt gặp, tao ngộ"}]},
    "避": {"on": ["ヒ"], "kun": ["さ・ける"], "words": [{"word": "避難", "reading": "ひなん", "meaning": "Lánh nạn, sơ tán"}, {"word": "避ける", "reading": "さける", "meaning": "Né tránh"}]},
    "邪": {"on": ["ジャ"], "kun": ["よこしま"], "words": [{"word": "風邪", "reading": "かぜ", "meaning": "Cảm cúm"}, {"word": "邪魔", "reading": "じゃま", "meaning": "Cản trở, quấy rầy"}]},
    "郎": {"on": ["ロウ"], "kun": ["おとこ"], "words": [{"word": "太郎", "reading": "たろう", "meaning": "Tên Taro"}]},

    # Hàng 36
    "郷": {"on": ["キョウ", "ゴウ"], "kun": ["さと"], "words": [{"word": "故郷", "reading": "こきょう", "meaning": "Quê hương"}]},
    "郵": {"on": ["ユウ"], "kun": [], "words": [{"word": "郵便局", "reading": "ゆうびんきょく", "meaning": "Bưu điện"}, {"word": "郵送", "reading": "ゆうそう", "meaning": "Gửi qua bưu điện"}]},
    "酢": {"on": ["サク"], "kun": ["す"], "words": [{"word": "お酢", "reading": "おす", "meaning": "Giấm ăn"}]},
    "針": {"on": ["シン"], "kun": ["はり"], "words": [{"word": "方針", "reading": "ほうしん", "meaning": "Phương châm"}, {"word": "針", "reading": "はり", "meaning": "Cây kim"}]},
    "釣": {"on": ["チョウ"], "kun": ["つ・る", "つり"], "words": [{"word": "釣り", "reading": "つり", "meaning": "Câu cá"}, {"word": "お釣り", "reading": "おつり", "meaning": "Tiền thừa thối lại"}]},
    "鈴": {"on": ["レイ", "リン"], "kun": ["すず"], "words": [{"word": "風鈴", "reading": "ふうりん", "meaning": "Chuông gió"}, {"word": "鈴", "reading": "すず", "meaning": "Quả chuông, lục lạc"}]},
    "銭": {"on": ["セン", "ゼン"], "kun": ["ぜに"], "words": [{"word": "金銭", "reading": "きんせん", "meaning": "Tiền nong"}, {"word": "小銭", "reading": "こぜに", "meaning": "Tiền lẻ"}]},
    "錠": {"on": ["ジョウ"], "kun": [], "words": [{"word": "錠剤", "reading": "じょうざい", "meaning": "Thuốc viên"}, {"word": "施錠", "reading": "せじょう", "meaning": "Khóa chốt cửa"}]},
    "鍵": {"on": ["ケン"], "kun": ["かぎ"], "words": [{"word": "鍵", "reading": "かぎ", "meaning": "Chìa khóa"}]},
    "閣": {"on": ["カク"], "kun": [], "words": [{"word": "内閣", "reading": "ないかく", "meaning": "Nội các chính phủ"}]},

    # Hàng 37
    "闇": {"on": ["アン"], "kun": ["やみ"], "words": [{"word": "闇", "reading": "やみ", "meaning": "Bóng tối"}, {"word": "暗闇", "reading": "くらやみ", "meaning": "Màn đêm u tối"}]},
    "闘": {"on": ["トウ"], "kun": ["たたか・う"], "words": [{"word": "戦闘", "reading": "せんとう", "meaning": "Chiến đấu"}, {"word": "闘う", "reading": "たたかう", "meaning": "Đấu tranh"}]},
    "防": {"on": ["ボウ"], "kun": ["ふせ・ぐ"], "words": [{"word": "防止", "reading": "ぼうし", "meaning": "Phòng chống"}, {"word": "防ぐ", "reading": "ふせぐ", "meaning": "Ngăn ngừa"}]},
    "阪": {"on": ["ハン"], "kun": ["さか"], "words": [{"word": "大阪", "reading": "おおさか", "meaning": "Thành phố Osaka"}]},
    "限": {"on": ["ゲン"], "kun": ["かぎ・る", "かぎ・り"], "words": [{"word": "限界", "reading": "げんかい", "meaning": "Giới hạn"}, {"word": "限る", "reading": "かぎる", "meaning": "Chỉ giới hạn"}]},
    "除": {"on": ["ジョ", "ジ"], "kun": ["のぞ・く"], "words": [{"word": "掃除", "reading": "そうじ", "meaning": "Dọn dẹp vệ sinh"}, {"word": "除く", "reading": "のぞく", "meaning": "Loại trừ"}]},
    "陸": {"on": ["リク", "ロク"], "kun": ["おか"], "words": [{"word": "着陸", "reading": "ちゃくりく", "meaning": "Hạ cánh"}, {"word": "大陸", "reading": "たいりく", "meaning": "Đại lục"}]},
    "階": {"on": ["カイ"], "kun": [], "words": [{"word": "階段", "reading": "かいだん", "meaning": "Cầu thang"}, {"word": "段階", "reading": "だんかい", "meaning": "Giai đoạn"}]},
    "隅": {"on": ["グウ"], "kun": ["すみ"], "words": [{"word": "隅", "reading": "すみ", "meaning": "Góc xó"}, {"word": "片隅", "reading": "かたすみ", "meaning": "Một góc nhỏ"}]},
    "隠": {"on": ["イン", "オン"], "kun": ["かく・す", "かく・れる"], "words": [{"word": "隠す", "reading": "かくす", "meaning": "Giấu giếm"}, {"word": "隠れる", "reading": "かくれる", "meaning": "Trốn ẩn"}]},

    # Hàng 38
    "雇": {"on": ["コ"], "kun": ["やと・う"], "words": [{"word": "雇用", "reading": "こよう", "meaning": "Thuê mướn lao động"}, {"word": "雇う", "reading": "やとう", "meaning": "Tuyển dụng, thuê"}]},
    "雰": {"on": ["フン"], "kun": [], "words": [{"word": "雰囲気", "reading": "ふんいき", "meaning": "Bầu không khí"}]},
    "雷": {"on": ["ライ"], "kun": ["かみなり"], "words": [{"word": "雷", "reading": "かみなり", "meaning": "Sấm sét"}]},
    "革": {"on": ["カク"], "kun": ["かわ"], "words": [{"word": "改革", "reading": "かいかく", "meaning": "Cải cách"}, {"word": "革靴", "reading": "かわぐつ", "meaning": "Giày da"}]},
    "靴": {"on": ["カ"], "kun": ["くつ"], "words": [{"word": "靴", "reading": "くつ", "meaning": "Đôi giày"}, {"word": "靴下", "reading": "くつした", "meaning": "Đôi tất"}]},
    "韓": {"on": ["カン"], "kun": [], "words": [{"word": "韓国", "reading": "かんこく", "meaning": "Hàn Quốc"}]},
    "響": {"on": ["キョウ"], "kun": ["ひび・く"], "words": [{"word": "影響", "reading": "えいきょう", "meaning": "Ảnh hưởng"}, {"word": "響く", "reading": "ひびく", "meaning": "Vang vọng"}]},
    "頂": {"on": ["チョウ"], "kun": ["いただ・く", "いただき"], "words": [{"word": "山頂", "reading": "さんちょう", "meaning": "Đỉnh núi"}, {"word": "頂く", "reading": "いただく", "meaning": "Xin nhận (khiêm nhường)"}]},
    "頃": {"on": ["ケイ", "キョウ"], "kun": ["ころ", "ごろ"], "words": [{"word": "近頃", "reading": "ちかごろ", "meaning": "Dạo gần đây"}, {"word": "日頃", "reading": "ひごろ", "meaning": "Hàng ngày"}]},
    "順": {"on": ["ジュン"], "kun": [], "words": [{"word": "順番", "reading": "じゅんばん", "meaning": "Thứ tự"}, {"word": "順調", "reading": "じゅんちょう", "meaning": "Thuận lợi"}]},

    # Hàng 39
    "領": {"on": ["リョウ"], "kun": [], "words": [{"word": "領収書", "reading": "りょうしゅうしょ", "meaning": "Biên lai thu tiền"}, {"word": "占領", "reading": "せんりょう", "meaning": "Chiếm lĩnh"}]},
    "頼": {"on": ["ライ"], "kun": ["たの・む", "たの・もしい", "たよ・る"], "words": [{"word": "信頼", "reading": "しんらい", "meaning": "Tin cậy"}, {"word": "頼む", "reading": "たのむ", "meaning": "Nhờ vả"}]},
    "飼": {"on": ["シ"], "kun": ["か・う"], "words": [{"word": "飼う", "reading": "かう", "meaning": "Nuôi thú cưng"}, {"word": "飼い主", "reading": "かいぬし", "meaning": "Chủ nuôi"}]},
    "飽": {"on": ["ホウ"], "kun": ["あ・きる", "あ・かす"], "words": [{"word": "飽きる", "reading": "あきる", "meaning": "Phát chán, ngấy"}]},
    "養": {"on": ["ヨウ", "リョウ"], "kun": ["养", "やしな・う"], "words": [{"word": "教養", "reading": "きょうよう", "meaning": "Giáo dưỡng, học thức"}, {"word": "養う", "reading": "やしなう", "meaning": "Nuôi nấng"}]},
    "餌": {"on": ["ジ", "ニ"], "kun": ["え", "えば"], "words": [{"word": "餌", "reading": "えさ", "meaning": "Mồi, thức ăn cho thú"}]},
    "餅": {"on": ["ヘイ", "ヒョウ"], "kun": ["もち"], "words": [{"word": "お餅", "reading": "おもち", "meaning": "Bánh mochi"}]},
    "香": {"on": ["コウ", "キョウ"], "kun": ["か", "かお・る", "かお・り"], "words": [{"word": "香水", "reading": "こうすい", "meaning": "Nước hoa"}, {"word": "香り", "reading": "かおり", "meaning": "Mùi thơm"}]},
    "駆": {"on": ["ク"], "kun": ["か・ける", "か・る"], "words": [{"word": "先駆者", "reading": "せんくしゃ", "meaning": "Người tiên phong"}, {"word": "駆け足", "reading": "かけあし", "meaning": "Chạy nhanh"}]},
    "駄": {"on": ["ダ"], "kun": [], "words": [{"word": "無駄", "reading": "むだ", "meaning": "Lãng phí, vô ích"}, {"word": "駄目", "reading": "だめ", "meaning": "Không được"}]},

    # Hàng 40
    "驚": {"on": ["キョウ"], "kun": ["おどろ・く", "おどろ・かす"], "words": [{"word": "驚く", "reading": "おどろく", "meaning": "Ngạc nhiên"}, {"word": "驚異", "reading": "きょうい", "meaning": "Kinh dị, phi thường"}]},
    "骨": {"on": ["コツ"], "kun": ["ほね"], "words": [{"word": "骨折", "reading": "こっせつ", "meaning": "Gãy xương"}, {"word": "骨", "reading": "ほね", "meaning": "Khung xương"}]},
    "鬼": {"on": ["キ"], "kun": ["おに"], "words": [{"word": "鬼", "reading": "おに", "meaning": "Con quỷ"}]},
    "魂": {"on": ["コン"], "kun": ["たましい", "たま"], "words": [{"word": "魂", "reading": "たましい", "meaning": "Linh hồn"}]},
    "魅": {"on": ["ミ"], "kun": [], "words": [{"word": "魅力", "reading": "みりょく", "meaning": "Sức quyến rũ, sức hút"}]},
    "魔": {"on": ["マ"], "kun": [], "words": [{"word": "邪魔", "reading": "じゃま", "meaning": "Quấy rầy"}, {"word": "魔法", "reading": "まほう", "meaning": "Ma thuật"}]},
    "鮮": {"on": ["セン"], "kun": ["あざ・やか"], "words": [{"word": "新鮮", "reading": "しんせん", "meaning": "Tươi sống"}, {"word": "鮮やか", "reading": "あざやか", "meaning": "Rực rỡ"}]},
    "鳴": {"on": ["メイ"], "kun": ["な・く", "な・る", "な・らす"], "words": [{"word": "悲鳴", "reading": "ひめい", "meaning": "Tiếng kêu la"}, {"word": "鳴る", "reading": "なる", "meaning": "Rung chuông, reo"}]},
    "黙": {"on": ["モク", "ボク"], "kun": ["だま・る"], "words": [{"word": "沈黙", "reading": "ちんもく", "meaning": "Trầm mặc, im lặng"}, {"word": "黙る", "reading": "だまる", "meaning": "Nín lặng, im bặt"}]},
    "鼻": {"on": ["ビ"], "kun": ["はな"], "words": [{"word": "耳鼻科", "reading": "じびか", "meaning": "Khoa tai mũi"}, {"word": "鼻", "reading": "はな", "meaning": "Cái mũi"}]},

    # Hàng 41
    "竜": {"on": ["リュウ", "リョウ"], "kun": ["たつ"], "words": [{"word": "竜", "reading": "りゅう", "meaning": "Con rồng"}]},
    "亀": {"on": ["キ", "キュウ", "キン"], "kun": ["かめ"], "words": [{"word": "亀", "reading": "かめ", "meaning": "Con rùa"}]}
}

def main():
    with open("src/data/kanjiSoTrungCap.ts", "r", encoding="utf-8") as f:
        content = f.read()

    # Parse existing JSON array in ts file
    match = re.search(r'export const kanjiSoTrungCapList:\s*KanjiSoTrungCapItem\[\]\s*=\s*(\[.*?\]);', content, re.DOTALL)
    if not match:
        print("Could not match kanjiSoTrungCapList in ts file")
        return

    items = json.loads(match.group(1))
    print(f"Loaded {len(items)} items from ts file")

    missing = []
    enriched_items = []
    for item in items:
        char = item["kanji"]
        dict_entry = KANJI_DICT.get(char)
        if not dict_entry:
            missing.append(char)
            onyomi = []
            kunyomi = []
            words = []
        else:
            onyomi = dict_entry.get("on", [])
            kunyomi = dict_entry.get("kun", [])
            words = dict_entry.get("words", [])

        enriched_items.append({
            "id": item["id"],
            "stt": item["stt"],
            "hang": item["hang"],
            "kanji": char,
            "hanViet": item["hanViet"],
            "onyomi": onyomi,
            "kunyomi": kunyomi,
            "meaning": item["meaning"],
            "words": words
        })

    if missing:
        print(f"Warning: {len(missing)} kanji missing from dictionary: {missing}")
    else:
        print("ALL 402 KANJI MATCHED 100% IN DICTIONARY!")

    new_ts_content = f"""// 402 chữ Kanji Sơ Trung Cấp theo 41 hàng giáo trình Đông Du (kèm Âm On & Âm Kun chuẩn)
export interface KanjiSoTrungCapItem {{
  id: string;
  stt: number;
  hang: number;
  kanji: string;
  hanViet: string;
  onyomi: string[];
  kunyomi: string[];
  meaning: string;
  words?: {{
    word: string;
    reading: string;
    meaning: string;
  }}[];
}}

export const kanjiSoTrungCapList: KanjiSoTrungCapItem[] = {json.dumps(enriched_items, ensure_ascii=False, indent=2)};
"""

    with open("src/data/kanjiSoTrungCap.ts", "w", encoding="utf-8") as f:
        f.write(new_ts_content)

    print(f"Successfully generated src/data/kanjiSoTrungCap.ts with {len(enriched_items)} enriched items!")

if __name__ == "__main__":
    main()
