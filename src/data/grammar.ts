export interface GrammarItem {
  id: number;
  structure: string;
  meaning: string;
  formula?: string;
  example: string;
  notes: string;
}

export interface ComparisonItem {
  pattern: string;
  mainMeaning: string;
  mnemonic: string;
  explanation: string;
  sentenceExample: {
    jp: string;
    vi: string;
    analysis: string;
  };
}

export const n4Grammar: GrammarItem[] = [
  {
    id: 1,
    structure: "お + Vます (bỏ ます) + になる",
    meaning: "Tôn kính ngữ của động từ",
    formula: "お + Vます (bỏ ます) + になる",
    example: "社長はお帰りになりました。",
    notes:
      "Dùng để nói về hành động của người lớn tuổi, cấp trên, khách hàng một cách tôn kính. Không dùng cho hành động của bản thân.",
  },
  {
    id: 2,
    structure: "よろしく",
    meaning: "Giúp tôi gửi lời / Nhờ bạn chuyển lời tốt đẹp",
    formula: "～によろしく",
    example: "ご家族によろしくお伝えください。",
    notes:
      "Thường dùng ở cuối cuộc trò chuyện, hoặc trong thư từ để nhờ người nghe chuyển lời hỏi thăm đến người khác.",
  },
  {
    id: 3,
    structure: "伝える（つたえる）",
    meaning: "Truyền đạt, nói lại",
    formula: "～に ～を 伝える",
    example: "あの人に私の気持ちを伝えてください。",
    notes: "Truyền đạt lại thông tin, lời nhắn, hay cảm xúc.",
  },
  {
    id: 4,
    structure: "お伝えください",
    meaning: "Xin hãy truyền đạt / Hãy gửi lời",
    formula: "お伝えください (Kính ngữ)",
    example: "先生に、明日休むとお伝えください。",
    notes:
      "Là dạng tôn kính ngữ nhờ vả ai đó truyền đạt lại lời nhắn của mình cho người thứ ba.",
  },
  {
    id: 5,
    structure: "いくら～ても",
    meaning: "Cho dù ~ đến mấy đi nữa",
    formula: "いくら + Vても / Aい くて も / Aな・N でも",
    example: "いくら高くても、買いたいです。",
    notes:
      "Dùng để nhấn mạnh mức độ của điều kiện, kết quả vẫn không thay đổi.",
  },
  {
    id: 6,
    structure: "～かもしれません",
    meaning: "Có lẽ, không chừng",
    formula: "Thể thông thường (Futsuukei) + かもしれません (Aな/N bỏ だ)",
    example: "明日は雨が降るかもしれません。",
    notes:
      "Thể hiện sự phỏng đoán của người nói với mức độ chắc chắn thấp (khoảng 50%).",
  },
  {
    id: 7,
    structure: "～から",
    meaning: "Vì / bởi vì (A から、B → Vì A nên B)",
    formula: "V + から | Aい + から | Aな + だから | N + だから",
    example:
      "雨が降っていますから、出かけません。(Vì trời đang mưa nên tôi không ra ngoài)\n忙しいから、行きません。(Vì bận nên không đi)\n学生だから、お金がありません。(Vì là học sinh nên không có tiền)",
    notes:
      "👉 Mẹo nhớ: から = VÌ. Nêu rõ nguyên nhân, lý do dẫn đến kết quả ở vế sau.",
  },
  {
    id: 8,
    structure: "～たら",
    meaning: "Nếu / khi / sau khi (Aたら、B)",
    formula: "Thể quá khứ た + ら (Vたら / Aい かったら / Aな・N だったら)",
    example:
      "① Nếu: 時間があったら、映画を見ます。(Nếu có thời gian thì tôi sẽ xem phim - chưa biết có hay không)\n② Khi: 日本に行ったら、富士山を見たいです。(Khi đi Nhật, tôi muốn ngắm núi Phú Sĩ)\n③ Sau khi: 仕事が終わったら、帰ります。(Sau khi công việc kết thúc thì tôi về)",
    notes:
      "👉 Mẹo nhớ: たら = NẾU / KHI / SAU KHI. Quan trọng: たら không phải lúc nào cũng dịch là 'nếu'.",
  },
  {
    id: 9,
    structure: "～てから",
    meaning: "Sau khi làm A thì làm B (A → rồi mới → B)",
    formula: "Vて + から、B",
    example:
      "ご飯を食べてから、勉強します。(Sau khi ăn cơm, tôi học)\n日本へ来てから、日本語を勉強しています。(Sau khi đến Nhật, tôi đang học tiếng Nhật)\n手を洗ってから、ご飯を食べます。(Rửa tay rồi mới ăn cơm)",
    notes:
      "👉 Mẹo nhớ: てから = SAU KHI LÀM A. Nhấn mạnh trình tự thời gian: làm xong việc A rồi mới thực hiện việc B.",
  },
  {
    id: 10,
    structure: "～たから",
    meaning: "Vì đã... / bởi vì đã... (Thực chất là thể た + から)",
    formula: "Vた + から、B",
    example:
      "昨日勉強したから、テストができました。(Vì hôm qua đã học nên tôi làm được bài kiểm tra)\nSo sánh: 勉強するから (Vì sẽ học) vs 勉強したから (Vì đã học)",
    notes:
      "👉 Mẹo nhớ: たから = VÌ ĐÃ LÀM A. Không phải một mẫu ngữ pháp hoàn toàn riêng biệt, đơn giản là động từ thể た (quá khứ) kết hợp với から (nguyên nhân).",
  },
  {
    id: 11,
    structure: "V(ý chí) + とする (おりようとする / 入ろうとする)",
    meaning: "Vừa định làm gì thì... / Chuẩn bị làm gì thì...",
    formula: "V(thể ý chí よう・おう) + とする / とした時 / としたら",
    example:
      "① 電車を降りようとした時、ドアが閉まってしまいました。(Vừa định bước xuống tàu thì cửa đã đóng mất rồi)\n② お風呂に入ろうとした時、電話が鳴りました。(Vừa định bước vào bồn tắm thì chuông điện thoại reo)\n③ 出かけようとしたら、雨が降り始めました。(Vừa định bước ra ngoài thì trời bắt đầu đổ mưa)",
    notes:
      "Diễn tả một hành vi vừa chớm định bắt đầu trong tích tắc thì bất ngờ có sự việc hoặc hành động khác xen vào cắt ngang.",
  },
  {
    id: 12,
    structure: "味・におい・音・声 + がする",
    meaning: "Có vị... / Có mùi... / Có âm thanh... / Có tiếng nói...",
    formula: "N (giác quan: 味, におい, 音, 声, 気) + がする",
    example:
      "① このジュースはトマトの味がします。(Loại nước hoa quả này có vị cà chua)\n② 台所からいいにおいがします。(Từ nhà bếp bốc lên mùi thơm nức)\n③ 外で誰かの声がします。(Bên ngoài có tiếng ai đó đang nói chuyện)\n④ 隣の部屋から変な音がします。(Từ phòng bên cạnh phát ra tiếng động lạ)",
    notes:
      "Dùng trợ từ が đi với する để diễn tả cảm giác tự nhiên thu nhận qua ngũ quan (vị giác, khứu giác, thính giác) mà không phải do ý chí tạo ra.",
  },
  {
    id: 13,
    structure: "お + V(bỏ ます) + ください (お楽しみください)",
    meaning: "Xin mời... / Chúc... vui vẻ (Kính ngữ lịch sự)",
    formula: "お + Vます(bỏ ます) + ください",
    example:
      "① 映画をどうぞお楽しみください。(Chúc quý vị thưởng thức bộ phim vui vẻ!)\n② どうぞこちらにお掛けください。(Xin mời quý khách ngồi vào đây)\n③ 少々お待ちください。(Xin quý khách vui lòng đợi trong giây lát)",
    notes:
      "Mẫu câu kính ngữ tôn trọng đối phương một cách lịch sự, nhã nhặn khi mời mọc, khuyên nhủ hoặc chúc người nghe.",
  },
  {
    id: 14,
    structure: "お + V(bỏ ます) + します (お持ちします)",
    meaning: "Để tôi... giúp (Khiêm nhường ngữ - hạ mình để phục vụ/giúp đỡ)",
    formula: "お + Vます(bỏ ます) + します / いたします",
    example:
      "① 重そうですね。お荷物をお持ちしましょうか。(Trông nặng quá nhỉ. Để tôi xách/cầm giúp hành lý cho bạn nhé)\n② 駅まで車でお送りします。(Tôi sẽ chở bạn ra tận ga xe điện)\n③ 私がご案内します。(Để tôi hướng dẫn quý khách)",
    notes:
      "Là thể khiêm nhường ngữ (Kenjougo). Dùng khi bản thân người nói chủ động thực hiện hành động để giúp đỡ cấp trên, khách hàng hoặc người đối thoại.",
  },
  {
    id: 15,
    structure: "V(bỏ ます) + おわる / はじめる",
    meaning: "Làm xong việc gì / Bắt đầu làm việc gì",
    formula: "Vます(bỏ ます) + 終わる / 始める",
    example:
      "① むすめは、ごはんを食べおわると すぐに勉強を始めました。(Con gái vừa ăn cơm xong là bắt đầu học ngay)\n② この本を読み終わったら、貸してください。(Đọc xong cuốn này thì cho tôi mượn nhé)",
    notes:
      "Ghép trực tiếp sau động từ bỏ ます để biểu thị điểm kết thúc hoặc khởi đầu của hành động.",
  },
  {
    id: 16,
    structure: "V(thể ý chí) + と思っています",
    meaning: "Đang có dự định / dự tính làm gì",
    formula: "V(ý chí よう・おう) + と思っています",
    example:
      "① きょうはこの本を読もうと思っています。(Hôm nay tôi định đọc cuốn sách này)\n② 機会があれば、京都へ行こうと思っています。(Nếu có cơ hội, tôi dự định sẽ đi Kyoto)",
    notes:
      "Diễn tả ý định đã được ấp ủ từ trước và hiện tại vẫn đang duy trì dự định đó.",
  },
  {
    id: 17,
    structure: "A とか B (とか)",
    meaning: "Như là A hay B... (Liệt kê không đầy đủ trong văn nói)",
    formula: "N1 + とか + N2 + とか (V-るとか V-るとか)",
    example:
      "① ひきだしにはフィルムとか写真とかが入っています。(Trong ngăn kéo có những thứ như cuộn phim hay ảnh)\n② チョコレートとか甘いものとかはあまり好きではありません。(Những thứ như sô cô la hay đồ ngọt thì tôi không thích lắm)",
    notes:
      "Dùng trong khẩu ngữ thân mật để liệt kê một vài đại diện tiêu biểu (tương tự や nhưng bình dân hơn).",
  },
  {
    id: 18,
    structure: "N + で (chỉ nguyên nhân thiên tai, sự cố)",
    meaning: "Do, vì (thiên tai, dịch bệnh, tai nạn, sự cố)",
    formula: "N (tai nạn, bão, động đất, bệnh tật) + で",
    example:
      "① 台風で庭の木が倒れてしまいました。(Do bão mà cây trong vườn đã bị đổ mất)\n② 事故で電車が動かなかったので、遅刻しました。(Vì sự cố mà tàu không chạy nên tôi đã bị muộn)",
    notes:
      "Vế sau của câu thường là kết quả không mong muốn và KHÔNG chứa câu mệnh lệnh, cầu khiến hay ý chí.",
  },
  {
    id: 19,
    structure: "～から作られる vs ～で作られる",
    meaning: "Được làm từ (nguyên liệu biến đổi) vs Được làm bằng (vật liệu thấy rõ dạng)",
    formula: "N + から作られる (nguyên liệu biến đổi chất) | N + で作られる (vật liệu còn nguyên dạng)",
    example:
      "① 日本の酒は米から作られます。(Rượu Nhật Bản được làm từ gạo - hạt gạo bị lên men biến chất thành rượu)\n② この机は木で作られています。(Chiếc bàn này được làm bằng gỗ - vẫn nhìn thấy rõ chất liệu gỗ)",
    notes:
      "Mẹo nhớ N4: Từ nguyên liệu không còn thấy hình dáng ban đầu dùng から. Vật liệu nhìn thấy rõ bằng mắt thường dùng で.",
  },
  {
    id: 20,
    structure: "V(thể thông thường) + のを忘れる",
    meaning: "Quên mất việc làm gì (Danh từ hóa mệnh đề)",
    formula: "V(thông thường) + のを忘れる",
    example:
      "① 約束があったのを、すっかり忘れていた。(Tôi đã quên bẵng mất việc mình có cuộc hẹn)\n② ゆうべはメールをチェックするのを忘れました。(Tối qua tôi quên mất việc kiểm tra email)",
    notes:
      "Dùng trợ từ の để biến một mệnh đề hành động thành danh từ làm tân ngữ cho động từ 忘れる.",
  },
  {
    id: 21,
    structure: "N + ばかり + V",
    meaning: "Toàn là... / Chỉ toàn làm việc gì",
    formula: "N + ばかり + V / Vて + ばかりいる",
    example:
      "① 亡くなった祖父のことばかり思い出しています。(Tôi chỉ toàn nhớ về người ông đã khuất của mình)\n② 遊んでばかりいないで、勉強しなさい。(Đừng có chỉ toàn chơi bời như thế, hãy học đi!)",
    notes:
      "Diễn tả tần suất quá mức, chỉ tập trung vào một sự việc duy nhất, thường mang hàm ý phàn nàn hoặc cảm xúc sâu sắc.",
  },
  {
    id: 22,
    structure: "N + でも (ngay cả, dù là...)",
    meaning: "Ngay cả..., dù là... (Nêu trường hợp cực đoan để nhấn mạnh)",
    formula: "N + でも",
    example:
      "① このへんは冬でも暖かいところです。(Khu vực này ngay cả vào mùa đông vẫn rất ấm áp)\n② どんな人でもできますよ。簡単ですから。(Bất cứ ai cũng làm được mà, vì rất đơn giản)",
    notes:
      "Đưa ra ví dụ điển hình nhất hoặc cực đoan nhất để khẳng định những trường hợp khác đương nhiên cũng như vậy.",
  },
  {
    id: 23,
    structure: "Bị động gián tiếp / Bị động thiệt hại (迷惑の受身)",
    meaning: "Bị ai đó làm phiền toái, thiệt hại đồ vật của mình",
    formula: "[Người gây hại] に + [Đồ vật sở hữu] を + V(bị động れる/られる)",
    example:
      "① 妹にカメラを壊されて、本当に心が痛む。(Bị em gái làm hỏng máy ảnh, lòng tôi thực sự đau xót)\n② 電車で隣の人に足を踏まれました。(Trên tàu điện tôi bị người bên cạnh giẫm vào chân)",
    notes:
      "Chủ ngữ là người chịu phiền toái/thiệt hại. Tân ngữ chịu tác động đi với trợ từ を.",
  },
  {
    id: 24,
    structure: "[Lượng từ] + も",
    meaning: "Đến tận..., tới mức... (Nhấn mạnh số lượng nhiều)",
    formula: "[Số từ + lượng từ] + も",
    example:
      "① ゆうべははがきを20枚も書いて、疲れました。(Tối qua tôi đã viết tới tận 20 tấm bưu thiếp nên mệt nhoài)\n② 1時間も待ったのに、彼は来ませんでした。(Tôi đã đợi tới tận 1 tiếng đồng hồ mà anh ấy không đến)",
    notes:
      "Dùng trợ từ も sau số lượng để thể hiện sự ngạc nhiên vì số lượng quá nhiều so với mức bình thường.",
  },
  {
    id: 25,
    structure: "V-ている + のが聞こえる / のが見える",
    meaning: "Nghe thấy / Nhìn thấy ai đó đang làm gì (Mẫu câu tri giác)",
    formula: "V-ている + のが聞こえる / のが見える",
    example:
      "① 田中さんが歌っているのが聞こえます。(Tôi nghe thấy anh Tanaka đang hát)\n② 窓から星が光っているのが見えます。(Từ cửa sổ nhìn thấy những ngôi sao đang lấp lánh)",
    notes:
      "Danh từ hóa hành động đang diễn ra bằng の, đi kèm trợ từ が và động từ năng lực tự nhiên 聞こえる/見える.",
  },
  {
    id: 26,
    structure: "だけ vs しか～ない",
    meaning: "Chỉ (だけ đi khẳng định/phủ định; しか bắt buộc đi với vị ngữ phủ định)",
    formula: "N + だけ / N + しか + V(phủ định ない)",
    example:
      "① 1番と4番だけ覚えてください。(Bạn chỉ cần nhớ câu 1 và câu 4 thôi)\n② 100円しかありません。(Tôi chỉ có vỏn vẹn 100 yên - mang cảm giác thiếu thốn)",
    notes:
      "だけ là 'chỉ' mang tính trung tính. しか...ない mang sắc thái tiếc nuối, chê ít, cảm thấy không đủ.",
  },
  {
    id: 27,
    structure: "V(sai khiến) + てくださいませんか",
    meaning: "Xin hãy cho phép tôi làm gì (Xin phép lịch sự cao)",
    formula: "V(sai khiến させて) + くださいませんか / いただけませんか",
    example:
      "① この会議室を使わせてくださいませんか。(Xin phép cho tôi được sử dụng phòng họp này có được không ạ?)\n② 早く帰らせていただけませんか。(Cho phép tôi xin về sớm được không ạ?)",
    notes:
      "Dùng khi xin phép cấp trên hoặc đối tác cho bản thân mình thực hiện một hành động.",
  },
  {
    id: 28,
    structure: "V(bỏ ます) + 方 (かた)",
    meaning: "Cách làm gì (Cách sử dụng, cách đọc, cách nấu...)",
    formula: "Vます(bỏ ます) + 方 (かた)",
    example:
      "① 店員はわたしにスマートフォンの使い方を説明しました。(Nhân viên đã giải thích cho tôi cách dùng điện thoại thông minh)\n② この漢字の読み方を教えてください。(Hãy chỉ cho tôi cách đọc chữ Hán này)",
    notes:
      "Biến động từ thành danh từ chỉ phương thức hoặc cách thức thực hiện hành vi.",
  },
  {
    id: 29,
    structure: "V-る + のに + 忙しい / 便利 / 必要",
    meaning: "Bận rộn cho việc... / Tiện lợi cho việc... / Cần thiết cho việc...",
    formula: "V-る + のに + Tính từ / Động từ đánh giá",
    example:
      "① 赤ちゃんを育てるのに毎日忙しいです。(Chị ấy ngày nào cũng bận rộn với việc chăm sóc em bé)\n② これは小さくて持って歩くのに便利なノートパソコンです。(Đây là chiếc laptop nhỏ gọn, rất tiện để mang theo khi đi lại)",
    notes:
      "Dùng のに để chỉ mục đích hoặc phạm vi áp dụng cho một đánh giá/tính chất ở vế sau.",
  },
  {
    id: 30,
    structure: "Tổng hợp Liên từ & Phó từ cốt lõi N4 (Đề thi thường gặp)",
    meaning: "Các từ nối và trạng từ mấu chốt trong phần ngữ pháp JLPT N4",
    formula: "Liên từ câu & Phó từ bổ nghĩa",
    example:
      "• 全然～ない: Hoàn toàn không (全然理解できませんでした)\n• だが: Nhưng, tuy nhiên (văn viết đối lập: うめは咲いた。だが、さくらはまだ咲いていない)\n• すると: Thế là, ngay sau đó (ざせきをゆずりました。すると、たいへんよろこんでくれた)\n• または: Hoặc là (図書館で調べるか、またはインターネットで調べよう)\n• それとも: Hay là (dùng trong câu hỏi: ここで食べますか、それともお持ち帰りですか)\n• まさか: Không thể nào, chẳng lẽ (thể hiện sự ngạc nhiên khó tin: まさか解散するとは)\n• やっぱり: Quả nhiên, rốt cuộc thì (やめることにした)\n• 必ず (かならず): Nhất định, chắc chắn (nhấn mạnh quy luật: この薬を飲むと必ず眠くなる)\n• 一生懸命 (いっしょうけんめい): Hết mình, miệt mài (れんしゅうに一生懸命になる)",
    notes:
      "Những từ này xuất hiện liên tục trong đề thi ngữ pháp N4 (nhất là đề số 9 và 21), nắm chắc sẽ giúp bạn ăn trọn điểm câu điền từ nối!",
  },
  // --- NGỮ PHÁP TRỌNG TÂM ĐỀ 30 N4 (DORA NIHONGO) ---
  {
    id: 31,
    structure: "いくら + [Vても / Aいくても / Na・Nでも]",
    meaning: "Dù có... thế nào / bao nhiêu đi nữa (Đề 30 - Câu 11)",
    formula: "いくら + Vても / Aいくても / Naでも / Nでも",
    example:
      "① いくら遅くても山田さんは7時には着くだろう。(Dù có muộn đến mấy thì chắc anh Yamada cũng sẽ đến trước 7 giờ)\n② いくら安くても、必要ないものは買いません。(Dù có rẻ đến mấy tôi cũng không mua đồ không cần thiết)",
    notes:
      "Đi cùng với vế sau có thể dùng biểu thị sự phỏng đoán (だろう), ý chí hoặc thói quen. Nhấn mạnh mức độ cao của điều kiện giả định ngược.",
  },
  {
    id: 32,
    structure: "Vる / Vない + ことにする",
    meaning: "Quyết định làm / không làm việc gì (Ý chí chủ động - Đề 30 - Câu 8)",
    formula: "Vる / Vない + ことにする (quá khứ: ことにした)",
    example:
      "① むすこが入試前の大事なときなので、うちは旅行に行かないことにした。(Vì đang là thời điểm quan trọng trước kỳ thi của con trai nên gia đình tôi đã quyết định không đi du lịch)\n② 健康のために、毎朝ジョギングすることにしました。(Vì sức khỏe, tôi đã quyết định mỗi sáng sẽ chạy bộ)",
    notes:
      "Khác với ことになる (do tập thể hoặc hoàn cảnh quyết định), ことにする thể hiện sự chủ động quyết định dứt khoát của chính bản thân người nói.",
  },
  {
    id: 33,
    structure: "Vる + べきだ / べきです",
    meaning: "Nên làm gì / Phải làm gì (Đạo lý, bổn phận - Đề 30 - Câu 9)",
    formula: "Vる + べきだ / べきです (Động từ する có thể chia thành すべき hoặc するべき)",
    example:
      "① きみは自分の将来のことをもっとまじめに考えるべきです。(Em nên suy nghĩ nghiêm túc hơn về tương lai của chính bản thân mình)\n② 約束はどんなことがあっても守るべきだ。(Lời hứa thì dù có chuyện gì xảy ra cũng phải giữ gìn)",
    notes:
      "Dùng để diễn tả quan điểm đạo đức, bổn phận mang tính lẽ thường. Tránh dùng trực tiếp với người trên tuổi hoặc cấp trên vì mang sắc thái dạy bảo khá mạnh.",
  },
  {
    id: 34,
    structure: "N + のような + N & N + がする (におい / 味 / 音 / 声)",
    meaning: "Giống như N & Có mùi / vị / âm thanh / tiếng gì đó (Đề 30 - Câu 10)",
    formula: "N + のような + N | N (匂い / 味 / 音 / 声 / 気) + がする",
    example:
      "① この香水はせっけんのようなにおいがします。(Nước hoa này có mùi hương giống như xà phòng)\n② 台所からいい匂いがしてきました。(Từ nhà bếp bay ra mùi thơm rất ngào ngạt)\n③ 外で赤ちゃんの泣き声がします。(Bên ngoài có tiếng em bé khóc)",
    notes:
      "Dùng がする khi nói về những kích thích tiếp nhận bằng giác quan (khứu giác, vị giác, thính giác, linh cảm) một cách tự nhiên từ môi trường xung quanh.",
  },
  {
    id: 35,
    structure: "N が + Vてある (Tha động từ)",
    meaning: "Đang được làm gì (Trạng thái có chủ ý lưu lại trên đồ vật - Đề 30 - Câu 12)",
    formula: "N が + Tha động từ (thể て) + ある",
    example:
      "① へやの壁にはいろいろな絵やカレンダーがかけてあります。(Trên tường phòng có treo sẵn nhiều bức tranh và lịch)\n② 机の上に会議の資料が並べてあります。(Trên bàn đã được xếp sẵn tài liệu cuộc họp)",
    notes:
      "Phân biệt với Vている (tự động từ chỉ trạng thái tự nhiên): Vてある nhấn mạnh có bàn tay con người chủ ý thực hiện hành động đó từ trước vì một mục đích nào đó.",
  },
  {
    id: 36,
    structure: "Vます(bỏ ます) + 切る / 切れない",
    meaning: "Làm hết sạch, dốc hết / Không thể làm hết, không xuể (Đề 30 - Câu 4)",
    formula: "Vます(bỏ ます) + きる / きれない (quá khứ: きった / きれなかった)",
    example:
      "① 力を出し切れなかった生徒がいたことを残念に思います。(Thật đáng tiếc khi có những học sinh đã không thể phát huy hết khả năng của mình)\n② こんなにたくさんの料理はとても食べ切れません。(Nhiều thức ăn thế này tôi không tài nào ăn hết nổi)",
    notes:
      "Thể hiện việc hoàn thành trọn vẹn tới cùng (切る) hoặc không đủ sức/không thể làm cho đến hết (切れない).",
  },
  {
    id: 37,
    structure: "ご + Danh từ (Hán Nhật) + してください / くださいませんか",
    meaning: "Kính ngữ nhờ vả, yêu cầu lịch sự (Đề 30 - Câu 5)",
    formula: "ご + N (nhóm 3) + してください | お + Vます(bỏ ます) + ください",
    example:
      "① この方を職員室へご案内してください。(Xin vui lòng dẫn đường cho vị này tới phòng giáo viên)\n② こちらで少々お待ちください。(Xin vui lòng đợi ở đây một chút)\n③ 詳細につきましては後ほどご連絡いたします。(Về chi tiết tôi xin phép liên lạc lại sau)",
    notes:
      "Với từ thuần Nhật (Wago) dùng お (お持ちください, お座りください); với từ gốc Hán (Kango) dùng ご (ご案内, ご連絡, ご注意).",
  },
  {
    id: 38,
    structure: "Vる / Vない + ように気をつける",
    meaning: "Chú ý cẩn thận để làm / không làm điều gì (Đề 30 - Câu 16)",
    formula: "Vる / Vない + ように気をつける / 気をつけてください",
    example:
      "① お客様が見えますから、失礼なことをしないように気をつけてください。(Khách quý sắp đến nên hãy chú ý cẩn thận đừng làm điều gì thất lễ nhé)\n② 風邪をひかないように、暖かくして寝てください。(Hãy giữ ấm khi ngủ để không bị cảm lạnh nhé)",
    notes:
      "Dùng để dặn dò hoặc tự nhắc nhở bản thân cẩn trọng hướng tới một mục tiêu hoặc phòng tránh hậu quả tiêu cực.",
  },
  {
    id: 39,
    structure: "V1ないで + V2",
    meaning: "Làm V2 mà không làm V1 (Đề 30 - Câu 18)",
    formula: "V1 (thể ない) + で + V2",
    example:
      "① あした試験があります。だから、きょうは遊ばないで勉強します。(Ngày mai có bài thi. Vì vậy hôm nay tôi không đi chơi mà tập trung học)\n② 朝ごはんを食べないで会社へ行きました。(Tôi đã đi làm mà không ăn sáng)",
    notes:
      "Biểu thị hành động V2 được thực hiện trong trạng thái không thực hiện hành vi V1 đi kèm. Phân biệt với ずに (lối viết văn trang trọng hơn).",
  },
  {
    id: 40,
    structure: "N1 または N2 (Hoặc là / Hay là)",
    meaning: "A hoặc là B (Từ nối lựa chọn tương đương - Đề 30 - Câu 17)",
    formula: "N1 または N2 / Mệnh đề 1。または Mệnh đề 2。",
    example:
      "① あなたは英語または日本語が話せますか。(Bạn có thể nói được tiếng Anh hoặc tiếng Nhật không?)\n② 黒または青のボールペンで記入してください。(Vui lòng điền bằng bút bi mực đen hoặc mực xanh)",
    notes:
      "Từ nối trang trọng và chuẩn mực trong các văn bản chỉ dẫn, đề thi và thông báo chính thức.",
  },
  {
    id: 41,
    structure: "V(thể thường) / A / Na・Nな + のに",
    meaning: "Mặc dù... thế mà... (Bất mãn, tiếc nuối, ngược mong đợi - Đề 30 - Câu 19)",
    formula: "Thể thông thường (Naな / Nな) + のに",
    example:
      "① 6時に会う約束をしたのに、彼女は来ませんでした。(Đã hẹn gặp lúc 6 giờ thế mà cô ấy đã không đến)\n② 一生懸命勉強したのに、不合格でした。(Đã học tập chăm chỉ hết sức thế mà vẫn trượt)",
    notes:
      "Khác với ても/けれども mang tính khách quan, のに hàm chứa cảm xúc chủ quan thất vọng, oán trách hoặc bất ngờ của người nói.",
  },
  {
    id: 42,
    structure: "Vていく",
    meaning: "Làm V1 rồi đi tiếp / Diễn tiến xa dần / Tiếp tục phát triển (Đề 30 - Câu 3)",
    formula: "Vて + いく (Vていきませんか)",
    example:
      "① ちょっと家に寄っていきませんか。(Bạn có muốn ghé qua nhà tôi một chút rồi đi tiếp không?)\n② これからも日本語の勉強を続けていくつもりです。(Từ nay về sau tôi vẫn dự định tiếp tục học tiếng Nhật)",
    notes:
      "Diễn tả hành động làm một việc gì đó rồi di chuyển xa khỏi điểm nói hiện tại, hoặc tiến trình thay đổi tiếp diễn trong tương lai.",
  },
  {
    id: 43,
    structure: "Vます(bỏ ます) + すぎる & とうとう",
    meaning: "Làm gì quá mức & Rốt cuộc / Cuối cùng thì (Đề 30 - Câu 15)",
    formula: "Vます(bỏ ます) + すぎる | とうとう + Kết quả (sau thời gian dài)",
    example:
      "① 中村さんは働きすぎてとうとう病気になってしまいました。(Anh Nakamura làm việc quá sức nên cuối cùng đã đổ bệnh)\n② 食べすぎてお腹が痛くなりました。(Ăn nhiều quá nên bị đau bụng)",
    notes:
      "すぎる mang nghĩa tiêu cực (quá đà). とうとう thường đi với kết quả sau một quá trình dài, nhiều khi là điều không mong muốn.",
  },
  {
    id: 44,
    structure: "Aい(bỏ い) + くなる / Aな・N + になる",
    meaning: "Trở nên... / Biến đổi trạng thái (Đề 30 - Câu 1)",
    formula: "Aい → く + なる | Aな / N → に + なる",
    example:
      "① お腹がいっぱいになったら、眠くなってしまいました。(Khi bụng no căng rồi thì đâm ra buồn ngủ mất tiêu)\n② 暖かくなって、桜が咲き始めました。(Trời trở nên ấm áp và hoa anh đào đã bắt đầu nở)",
    notes:
      "Mẫu câu cơ bản biểu thị sự biến đổi tự nhiên của trạng thái sự vật, hiện tượng hoặc cảm giác cơ thể.",
  },
];

export const grammarComparison = {
  title: "Phân biệt chuyên sâu: から vs たら vs てから vs たから",
  summaryTable: [
    { pattern: "から", meaning: "vì, bởi vì", tip: "VÌ (Nguyên nhân/lý do)" },
    {
      pattern: "たら",
      meaning: "nếu / khi / sau khi",
      tip: "NẾU / KHI (Điều kiện/thời điểm)",
    },
    {
      pattern: "てから",
      meaning: "sau khi làm",
      tip: "LÀM A RỒI MỚI B (Thứ tự hành động)",
    },
    {
      pattern: "たから",
      meaning: "vì đã...",
      tip: "ĐÃ A NÊN B (Nguyên nhân trong quá khứ)",
    },
  ],
  examplesComparison: [
    {
      pattern: "① から",
      jp: "雨が降っていますから、出かけません。",
      vi: "Vì trời đang mưa nên tôi không ra ngoài.",
      note: "「雨が降っています」 là NGUYÊN NHÂN dẫn đến việc không ra ngoài.",
    },
    {
      pattern: "② たら",
      jp: "雨がやんだら、出かけます。",
      vi: "Nếu/Khi trời tạnh mưa thì tôi sẽ ra ngoài.",
      note: "「雨がやむ」 là ĐIỀU KIỆN / THỜI ĐIỂM hành động ra ngoài sẽ diễn ra.",
    },
    {
      pattern: "③ てから",
      jp: "ご飯を食べてから、出かけます。",
      vi: "Ăn cơm xong rồi mới ra ngoài.",
      note: "食べる → 出かける : A xảy ra trước, B xảy ra sau (THỨ TỰ hành động).",
    },
    {
      pattern: "④ たから",
      jp: "ご飯を食べたから、出かけます。",
      vi: "Vì tôi đã ăn cơm rồi nên tôi ra ngoài.",
      note: "「食べた」 là NGUYÊN NHÂN của 「出かけます」 (đã no bụng rồi nên đi).",
    },
  ],
  keyPairComparison: {
    title: "Đặc biệt chú ý cặp này (Dễ nhầm lẫn nhất)",
    item1: {
      jp: "勉強してから、寝ます。",
      vi: "Học xong rồi mới ngủ.",
      explain: "てから = THỨ TỰ (học trước rồi ngủ sau)",
    },
    item2: {
      jp: "勉強したから、寝ます。",
      vi: "Vì đã học rồi nên ngủ.",
      explain:
        "たから = NGUYÊN NHÂN (đã hoàn thành việc học nên yên tâm đi ngủ)",
    },
    takeaway:
      "Chỉ khác một chữ て / た, nhưng ý nghĩa hoàn toàn khác nhau (Thứ tự vs Nguyên nhân)!",
  },
  tips: [
    { q: "Có nghĩa “VÌ” không?", a: "→ dùng から" },
    { q: "Có nghĩa “NẾU / KHI” không?", a: "→ dùng たら" },
    { q: "Có nghĩa “SAU KHI LÀM A RỒI MỚI B” không?", a: "→ dùng てから" },
    { q: "Có nghĩa “VÌ ĐÃ làm A” không?", a: "→ dùng た + から" },
  ],
  advice:
    "Nếu bạn đang học N4, hãy luyện phân biệt riêng 3 mẫu 「から vs たら vs てから」 trước; còn 「たから」 chỉ cần hiểu bản chất là thể quá khứ 「た」 kết hợp với 「から」 là sẽ đỡ rối rất nhiều.",
};
