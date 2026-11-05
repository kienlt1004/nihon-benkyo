export interface ExamQuestion {
  id: number;
  question: string;
  kanjiQuestion?: string;
  options: string[];
  correctAnswer: number; // 1-based index (1, 2, 3, or 4)
  explanation: string;
  translation: string;
  keyGrammar: string;
  keyVocab: string;
}

export const de30Exam: {
  title: string;
  subtitle: string;
  source: string;
  totalQuestions: number;
  questions: ExamQuestion[];
} = {
  title: "Đề 30 - Từ Vựng & Ngữ Pháp N4",
  subtitle: "20 câu trắc nghiệm trọng tâm sát đề thi JLPT N4",
  source: "DORA NIHONGO",
  totalQuestions: 20,
  questions: [
    {
      id: 1,
      question: "おなかが いっぱいに なったら、（　）なって しまいました。",
      kanjiQuestion: "お腹がいっぱいになったら、（　）なってしまいました。",
      options: ["すごく", "さびしく", "うるさく", "ねむく"],
      correctAnswer: 4,
      translation: "Khi bụng đã no căng, tôi đâm ra buồn ngủ mất tiêu.",
      explanation:
        "Khi ăn no thì dẫn đến buồn ngủ (ねむく). Tính từ đuôi い「ねむい - 眠い」khi đi kèm với động từ なる chuyển thành「ねむくなる」. Các từ khác: すごく (rất/kinh khủng), さびしく (cô đơn), うるさく (ồn ào).",
      keyGrammar: "Vたら (sau khi/nếu), Aい (bỏ い) + くなる (trở nên...), Vてしまう (lỡ/mất tiêu).",
      keyVocab: "ねむい (眠い - buồn ngủ), おなかがいっぱい (no bụng).",
    },
    {
      id: 2,
      question: "あの 人は よく（　）して 学校に おくれます。",
      kanjiQuestion: "あの人はよく（　）して学校に遅れます。",
      options: ["きょうみ", "せいじ", "けいざい", "ねぼう"],
      correctAnswer: 4,
      translation: "Người đó thường hay ngủ quên (ngủ nướng) rồi đi học muộn.",
      explanation:
        "「ねぼうする (寝坊する)」nghĩa là ngủ quên, ngủ nướng, dẫn đến vế sau đi học muộn. Các đáp án khác: きょうみ (hứng thú), せいじ (chính trị), けいざい (kinh tế) không phù hợp ngữ cảnh.",
      keyGrammar: "Vて (nguyên nhân/chuỗi hành động), N に 遅れる (muộn cái gì).",
      keyVocab: "ねぼう (寝坊 - ngủ nướng), おくれる (遅れる - muộn/trễ).",
    },
    {
      id: 3,
      question: "ちょっと いえに（　）いきませんか。",
      kanjiQuestion: "ちょっと家に（　）行きませんか。",
      options: ["やんで", "よんで", "やって", "よって"],
      correctAnswer: 4,
      translation: "Bạn có muốn tạt qua / ghé qua nhà tôi một chút không?",
      explanation:
        "Động từ「寄る (よる)」nghĩa là ghé qua, tạt vào, chia thể て là「よって」. Cụm「よっていく」nghĩa là ghé qua rồi đi tiếp. Các từ khác: やんで (tạnh mưa), よんで (gọi/đọc), やって (làm).",
      keyGrammar: "Vていく (làm gì rồi đi tiếp), Vませんか (lời mời rủ rê lịch sự).",
      keyVocab: "よる (寄る - ghé qua, tạt vào).",
    },
    {
      id: 4,
      question: "力を 出し切れなかった 生徒が いた ことを（　）思います。",
      kanjiQuestion: "力を出し切れなかった生徒がいたことを（　）思います。",
      options: ["ふくざつに", "しつれいに", "とくべつに", "ざんねんに"],
      correctAnswer: 4,
      translation: "Tôi cảm thấy thật đáng tiếc khi có những học sinh không phát huy hết khả năng của mình.",
      explanation:
        "Mẫu「～ことを残念に思う」nghĩa là cảm thấy đáng tiếc về việc gì đó. Các từ khác: ふくざつに (phức tạp), しつれいに (thất lễ), とくべつに (đặc biệt).",
      keyGrammar: "Vます(bỏ ます) + 切る / 切れない (làm hết sạch / không thể... hết), Mệnh đề + ことを残念に思う.",
      keyVocab: "ざんねん (残念 - đáng tiếc), だしきる (出し切る - dốc hết sức).",
    },
    {
      id: 5,
      question: "この 方を 職員室へ ご（　）して ください。",
      kanjiQuestion: "この方を職員室へご（　）してください。",
      options: ["よてい", "けんぶつ", "うんどう", "あんない"],
      correctAnswer: 4,
      translation: "Xin vui lòng hướng dẫn / dẫn vị này đến phòng giáo viên giúp tôi.",
      explanation:
        "Mẫu kính ngữ nhờ vả:「ご + N(Hán Nhật) + してください」. 「ご案内してください」= xin hãy hướng dẫn / dẫn đường. Các từ khác: よてい (dự định), けんぶつ (ngắm cảnh), うんどう (thể dục).",
      keyGrammar: "ご + Danh từ nhóm 3 + してください (Kính ngữ nhờ vả trang trọng).",
      keyVocab: "あんない (案内 - hướng dẫn, dẫn đường), 職員室 (しょくいんしつ - phòng giáo viên).",
    },
    {
      id: 6,
      question: "先生、いま レポートを（　）いいですか。",
      kanjiQuestion: "先生、いまレポートを（　）いいですか。",
      options: ["とっても", "くれても", "あげても", "だしても"],
      correctAnswer: 4,
      translation: "Thưa thầy, bây giờ em nộp bài báo cáo có được không ạ?",
      explanation:
        "Cụm từ「レポートを出す」nghĩa là nộp báo cáo. Chia thể て là「だしても」đi cùng「いいですか」tạo mẫu xin phép. とっても (lấy), くれても (cho mình), あげても (tặng ai).",
      keyGrammar: "Vてもいいですか (Mẫu câu xin phép làm việc gì).",
      keyVocab: "だす (出す - nộp/đưa ra), レポート (bài báo cáo).",
    },
    {
      id: 7,
      question: "コーヒーに さとうを 入れないと（　）です。",
      kanjiQuestion: "コーヒーに砂糖を入れないと（　）です。",
      options: ["こわい", "からい", "よわい", "にがい"],
      correctAnswer: 4,
      translation: "Cà phê nếu không cho đường vào thì sẽ đắng.",
      explanation:
        "Cà phê không có đường thì vị đắng:「にがい (苦い)」. Các từ khác: こわい (sợ/đáng sợ), からい (cay), よわい (yếu).",
      keyGrammar: "Vないと (Nếu không... thì - điều kiện tự nhiên/tất yếu).",
      keyVocab: "にがい (苦い - đắng), さとう (砂糖 - đường ăn).",
    },
    {
      id: 8,
      question: "むすこが 入試前の（　）ときなので、うちは りょこうに 行かないことに した。",
      kanjiQuestion: "息子が入試前の（　）ときなので、うちは旅行に行かないことにした。",
      options: ["しんぱいな", "だいじな", "ひつような", "あんぜんな"],
      correctAnswer: 2,
      translation: "Vì đang là thời điểm quan trọng trước kỳ thi của con trai nên nhà tôi quyết định không đi du lịch.",
      explanation:
        "Thời điểm quan trọng dùng tính từ「だいじな (大事なとき)」. Các từ khác: しんぱいな (lo lắng), ひつような (cần thiết), あんぜんな (an toàn). Chú ý đáp án là 2.",
      keyGrammar: "～なので (Vì - nêu lý do khách quan), Vことにする (Quyết định làm/không làm gì).",
      keyVocab: "だいじ (大事 - quan trọng), 入試 (にゅうし - kỳ thi tuyển sinh).",
    },
    {
      id: 9,
      question: "きみは 自分の（　）の ことを もっと まじめに 考えるべきです。",
      kanjiQuestion: "君は自分の（　）のことをもっと真面目に考えるべきです。",
      options: ["よしゅう", "しょうかい", "しょうらい", "れんらく"],
      correctAnswer: 3,
      translation: "Em nên suy nghĩ nghiêm túc hơn về tương lai của chính bản thân mình.",
      explanation:
        "Suy nghĩ về tương lai của mình:「しょうらい (将来)」. Các từ khác: よしゅう (chuẩn bị bài), しょうかい (giới thiệu), れんらく (liên lạc).",
      keyGrammar: "Vる + べきだ / べきです (Nên / Phải làm gì - đạo lý, bổn phận).",
      keyVocab: "しょうらい (将来 - tương lai), まじめ (真面目 - nghiêm túc).",
    },
    {
      id: 10,
      question: "この 香水は せっけんの ような（　）が します。",
      kanjiQuestion: "この香水は石鹸のような（　）がします。",
      options: ["けんか", "じゃま", "におい", "おしいれ"],
      correctAnswer: 3,
      translation: "Nước hoa này có mùi hương giống như xà phòng vậy.",
      explanation:
        "Đi với động từ「～がします」chỉ mùi vị giác quan là「におい (匂い)」: においがする = có mùi. Các từ khác: けんか (cãi nhau), じゃま (cản trở), おしいれ (tủ âm tường).",
      keyGrammar: "N のような + N (Giống như...), N (匂い/味/音/声) + がする (Có mùi/vị/âm thanh).",
      keyVocab: "におい (匂い - mùi hương), こうすい (香水 - nước hoa), せっけん (石鹸 - xà phòng).",
    },
    {
      id: 11,
      question: "（　）おそくても 山田さんは 7時には 着くだろう。",
      kanjiQuestion: "（　）遅くても山田さんは7時には着くだろう。",
      options: ["どんな", "どうして", "いかが", "いくら"],
      correctAnswer: 4,
      translation: "Dù có muộn đến mấy thì chắc anh Yamada cũng sẽ đến trước 7 giờ.",
      explanation:
        "Cấu trúc cố định:「いくら ～ ても」= Dù có... đến mấy đi chăng nữa. Ở đây là「いくらおそくても」. どんな (thế nào), どうして (tại sao), いかが (như thế nào).",
      keyGrammar: "いくら + Vても / Aいくても (Dù có... đến mấy), ～だろう (Chắc là/phỏng đoán).",
      keyVocab: "いくら (dẫu cho...), おそい (遅い - muộn, chậm), つく (着く - đến nơi).",
    },
    {
      id: 12,
      question: "へやの（　）には いろいろな えや カレンダーが かけて あります。",
      kanjiQuestion: "部屋の（　）には色々な絵やカレンダーが掛けてあります。",
      options: ["かべ", "たたみ", "おくじょう", "もん"],
      correctAnswer: 1,
      translation: "Trên bức tường của căn phòng có treo nhiều bức tranh và cuốn lịch.",
      explanation:
        "Treo tranh và lịch ở trên tường:「かべ (壁)」. Các từ khác: たたみ (chiếu tatami - dưới sàn), おくじょう (sân thượng), もん (cánh cổng).",
      keyGrammar: "Vてある (Trạng thái có chủ ý lưu lại trên đồ vật: かけてあります = đang được treo).",
      keyVocab: "かべ (壁 - bức tường), かける (掛ける - treo), カレンダー (cuốn lịch).",
    },
    {
      id: 13,
      question: "手で しなものに（　）ください。",
      kanjiQuestion: "手で品物に（　）ください。",
      options: ["のこらないで", "うつらないで", "さわらないで", "まわらないで"],
      correctAnswer: 3,
      translation: "Xin vui lòng không dùng tay chạm/sờ vào hàng hóa.",
      explanation:
        "Chạm vào đồ vật:「品物に触る (さわる)」-> thể phủ định nhờ vả là「さわらないでください」. のこらないで (đừng sót lại), うつらないで (đừng lây sang), まわらないで (đừng quay quanh).",
      keyGrammar: "Vないでください (Xin đừng làm việc gì), N に 触る (Chạm vào cái gì).",
      keyVocab: "さわる (触る - chạm vào, sờ vào), しなもの (品物 - hàng hóa, món đồ).",
    },
    {
      id: 14,
      question: "かぜを ひいたので（　）が いたいです。",
      kanjiQuestion: "風邪を引いたので（　）が痛いです。",
      options: ["のど", "ひげ", "かみ", "こえ"],
      correctAnswer: 1,
      translation: "Vì bị cảm lạnh nên cổ họng tôi bị đau.",
      explanation:
        "Bị cảm thì đau họng:「のどが痛い (のど)」. Các từ khác: ひげ (râu), かみ (tóc), こえ (giọng nói - nếu là khản tiếng thì nói là 声が出ない).",
      keyGrammar: "～ので (Vì - giải thích nguyên nhân khách quan).",
      keyVocab: "のど (喉 - cổ họng), かぜをひく (風邪を引く - bị cảm cúm).",
    },
    {
      id: 15,
      question: "なかむらさんは はたらきすぎて（　）病気に なって しまいました。",
      kanjiQuestion: "中村さんは働きすぎて（　）病気になってしまいました。",
      options: ["とうとう", "ちっとも", "もうすぐ", "なかなか"],
      correctAnswer: 1,
      translation: "Anh Nakamura vì làm việc quá sức nên cuối cùng đã đổ bệnh mất rồi.",
      explanation:
        "Phó từ「とうとう」nghĩa là rốt cuộc/cuối cùng thì sau một chuỗi thời gian, thường dẫn tới kết quả đáng tiếc. ちっとも (một chút cũng không - đi phủ định), もうすぐ (sắp sửa), なかなか (mãi mà không).",
      keyGrammar: "Vます(bỏ ます) + すぎる (Làm gì quá mức), とうとう + Kết quả, Vてしまう (mất rồi).",
      keyVocab: "とうとう (cuối cùng/rốt cuộc), はたらく (働く - làm việc), 病気 (びょうき - ốm bệnh).",
    },
    {
      id: 16,
      question: "おきゃくさまが 見えますから、（　）ことを しないように 気を つけて くださいよ。",
      kanjiQuestion: "お客様が見えますから、（　）ことをしないように気をつけてくださいよ。",
      options: ["しんぱいな", "ていねいな", "しんせつな", "しつれいな"],
      correctAnswer: 4,
      translation: "Khách quý sắp đến đấy, hãy chú ý cẩn thận đừng làm điều gì thất lễ nhé.",
      explanation:
        "Để đón khách quý thì không được làm những điều thất lễ, bất lịch sự:「しつれいなこと (失礼なこと)」. ていねいな (lịch sự), しんせつな (tử tế), しんぱいな (lo lắng).",
      keyGrammar: "見えます (Kính ngữ tôn kính của 来る), Vないように気をつける (Chú ý cẩn thận để không...).",
      keyVocab: "しつれい (失礼 - thất lễ, bất lịch sự), おきゃくさま (お客様 - quý khách).",
    },
    {
      id: 17,
      question: "あなたは 英語（　）日本語が 話せますか。",
      kanjiQuestion: "あなたは英語（　）日本語が話せますか。",
      options: ["または", "けれど", "すると", "それで"],
      correctAnswer: 1,
      translation: "Bạn có thể nói được tiếng Anh hoặc là tiếng Nhật không?",
      explanation:
        "Liên từ nối hai sự lựa chọn:「A または B」= A hoặc là B. けれど (nhưng mà), すると (thế rồi/ngay sau đó), それで (vì thế).",
      keyGrammar: "N1 または N2 (A hoặc là B - liên từ lựa chọn), V khả năng (話せる).",
      keyVocab: "または (hoặc là, hay là), えいご (英語 - tiếng Anh), にほんご (日本語 - tiếng Nhật).",
    },
    {
      id: 18,
      question: "あした しけんが あります。（　）、きょうは あそばないで 勉強します。",
      kanjiQuestion: "明日試験があります。（　）、今日は遊ばないで勉強します。",
      options: ["けれども", "しかし", "だから", "それから"],
      correctAnswer: 3,
      translation: "Ngày mai có bài thi. Vì vậy, hôm nay tôi sẽ không đi chơi mà tập trung học bài.",
      explanation:
        "Vế trước nêu lý do (mai có thi), vế sau nêu hành động hệ quả (hôm nay phải học) -> dùng từ nối kết quả「だから (vì thế / do đó)」. けれども/しかし (nhưng), それから (sau đó).",
      keyGrammar: "だから (Liên từ chỉ quan hệ nguyên nhân - kết quả), V1ないで + V2 (Làm V2 mà không làm V1).",
      keyVocab: "しけん (試験 - kỳ thi), あそぶ (遊ぶ - chơi đùa), べんきょうする (勉強する - học).",
    },
    {
      id: 19,
      question: "6時に あう（　）を したのに、かのじょは 来ませんでした。",
      kanjiQuestion: "6時に会う（　）をしたのに、彼女は来ませんでした。",
      options: ["やくそく", "よほう", "よやく", "よしゅう"],
      correctAnswer: 1,
      translation: "Đã hẹn gặp nhau lúc 6 giờ thế mà cô ấy đã không đến.",
      explanation:
        "Hẹn gặp ai đó dùng cụm「約束をする (やくそくをする)」. よやく (予約 - đặt phòng/vé), よほう (予報 - dự báo thời tiết), よしゅう (予習 - soạn bài trước).",
      keyGrammar: "V (thể thường) + のに (Mặc dù... thế mà - thể hiện sự thất vọng, bất mãn).",
      keyVocab: "やくそく (約束 - lời hứa, cuộc hẹn), かのじょ (彼女 - cô ấy/bạn gái).",
    },
    {
      id: 20,
      question: "かれは スーパーで（　）の しごとを して います。",
      kanjiQuestion: "彼はスーパーで（　）の仕事をしています。",
      options: ["パートタイム", "ステレオ", "テキスト", "アクセサリー"],
      correctAnswer: 1,
      translation: "Anh ấy đang làm công việc bán thời gian tại siêu thị.",
      explanation:
        "Làm việc bán thời gian ở siêu thị:「パートタイムの仕事」. ステレオ (dàn âm thanh), テキスト (sách giáo trình), アクセサリー (phụ kiện trang sức).",
      keyGrammar: "N の 仕事をしている (Đang làm công việc gì), Vている (Nghề nghiệp/trạng thái).",
      keyVocab: "パートタイム (việc bán thời gian - Part-time), スーパー (siêu thị), 仕事 (しごと - công việc).",
    },
  ],
};
