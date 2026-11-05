export interface ReviewGrammarItem {
  id: string;
  pattern: string;
  furigana?: string;
  meaning: string;
  usage?: string;
  examples: {
    jp: string;
    furigana?: string;
    vi: string;
    note?: string;
  }[];
  mistakeAlert?: string;
  category: string;
}

export interface ReviewVocabularyItem {
  id: string;
  kanji: string;
  hiragana: string;
  meaning: string;
  category: string;
  note?: string;
  collocations?: string[];
  examples?: {
    jp: string;
    vi: string;
  }[];
}

export interface ReviewMistakeItem {
  id: string;
  wrong: string;
  correct: string;
  explanation: string;
  tag: string;
  furigana?: string;
}

export interface ReviewParticleItem {
  particle: string;
  usage: string;
  example: string;
  furigana?: string;
  vi: string;
}

export interface ReviewEssayPhrase {
  jp: string;
  hiragana: string;
  meaning: string;
  topic: string;
  isHighlightSentence?: boolean;
}

export interface ReviewChecklistGroup {
  id: number;
  title: string;
  subtitle: string;
  keyPoints: string[];
  description: string;
}

// ==========================================
// PHẦN I — TỔNG HỢP NGỮ PHÁP (9 Mục chi tiết)
// ==========================================
export const reviewGrammarList: ReviewGrammarItem[] = [
  // 1. Điều kiện, giả định và nguyên nhân
  {
    id: "g-1-1",
    pattern: "～ければ",
    meaning: "Nếu… (Thể điều kiện của Tính từ đuôi い)",
    usage: "Tính từ い bỏ い + ければ (ví dụ: いい → よければ, 高い → 高ければ). Với Na/N dùng ～なら hoặc ～であれば. Động từ dùng thể ば.",
    category: "1. Điều kiện, giả định & nguyên nhân",
    examples: [
      {
        jp: "天気がよければ、サッカーをします。",
        furigana: "てんきがよければ、サッカーをします。",
        vi: "Nếu thời tiết đẹp, tôi sẽ chơi bóng đá.",
        note: "Lưu ý: '天気がよければ' tự nhiên hơn '天気はよければ' trong câu điều kiện thông thường.",
      },
      {
        jp: "安ければ、買います。",
        furigana: "やすければ、かいます。",
        vi: "Nếu rẻ thì tôi sẽ mua.",
      },
    ],
    mistakeAlert: "Tránh dùng trợ từ は trong vế điều kiện '天気はよければ ❌', hãy dùng '天気がよければ 🟢'.",
  },
  {
    id: "g-1-2",
    pattern: "～たら",
    meaning: "Nếu / Khi…",
    usage: "Động từ thể た + ら (行った → 行ったら). Dùng rất linh hoạt cho cả giả định, điều kiện tương lai hoặc việc xảy ra sau khi hành động trước hoàn thành.",
    category: "1. Điều kiện, giả định & nguyên nhân",
    examples: [
      {
        jp: "日本へ行ったら、日本語をもっと勉強したいです。",
        furigana: "にほんへいったら、にほんごをもっとべんきょうしたいです。",
        vi: "Nếu/khi đến Nhật, tôi muốn học tiếng Nhật nhiều hơn.",
      },
      {
        jp: "家に帰ったら、すぐにお風呂に入ります。",
        furigana: "いえにかえったら、すぐにおふろにはいります。",
        vi: "Sau khi về đến nhà, tôi sẽ tắm ngay.",
      },
    ],
  },
  {
    id: "g-1-3",
    pattern: "～と",
    meaning: "Hễ… thì… (Quy luật tự nhiên, hướng dẫn thao tác)",
    usage: "Động từ thể từ điển (V-ru) + と. Chỉ kết quả tất yếu, hiển nhiên xảy ra khi có vế trước (nút bấm, chỉ đường, hiện tượng tự nhiên).",
    category: "1. Điều kiện, giả định & nguyên nhân",
    examples: [
      {
        jp: "このボタンを押すと、ドアが開きます。",
        furigana: "このボタンをおすと、ドアがあきます。",
        vi: "Nếu nhấn nút này, cửa sẽ mở.",
      },
      {
        jp: "春になると、桜が咲きます。",
        furigana: "はるになると、さくらがさきます。",
        vi: "Hễ mùa xuân đến thì hoa anh đào lại nở.",
      },
    ],
  },
  {
    id: "g-1-4",
    pattern: "～なら",
    meaning: "Nếu là / Nếu nói về… (Đưa ra lời khuyên, đề xuất)",
    usage: "Danh từ / Tính từ / Động từ + なら. Lấy thông tin đối phương vừa nhắc làm tiền đề để đưa ra ý kiến, gợi ý.",
    category: "1. Điều kiện, giả định & nguyên nhân",
    examples: [
      {
        jp: "日本へ行くなら、日本語を勉強したほうがいいです。",
        furigana: "にほんへいくなら、にほんごをべんきょうしたほうがいいです。",
        vi: "Nếu định đi Nhật, bạn nên học tiếng Nhật.",
      },
      {
        jp: "クイニョンなら、海がとてもきれいです。",
        furigana: "クイニョンなら、うみがとてもきれいです。",
        vi: "Nếu là Quy Nhơn thì biển rất đẹp.",
      },
    ],
  },
  {
    id: "g-1-5",
    pattern: "～から ／ ～ので ／ だから",
    meaning: "Vì… nên… (Nguyên nhân, lý do)",
    usage: "～から: trực tiếp, chủ quan. ～ので: khách quan, mềm mại, giải thích lịch sự. だから: liên từ đứng đầu câu sau mang nghĩa 'Vì vậy'.",
    category: "1. Điều kiện, giả định & nguyên nhân",
    examples: [
      {
        jp: "地震があったので、多くの人が亡くなりました。",
        furigana: "じしんがあったので、おおくのひとがなくなりました。",
        vi: "Vì xảy ra động đất nên nhiều người đã thiệt mạng.",
      },
      {
        jp: "今日は雨です。だから、出かけません。",
        furigana: "きょうはあめです。だから、でかけません。",
        vi: "Hôm nay trời mưa. Vì vậy, tôi không ra ngoài.",
      },
    ],
  },

  // 2. Nối câu và diễn tả quan hệ giữa các ý
  {
    id: "g-2-1",
    pattern: "～それに (Hơn nữa) vs ～それで (Vì vậy)",
    meaning: "Cặp liên từ nối câu dễ nhầm lẫn",
    usage: "それに: bổ sung thêm 1 thông tin/lý do tương đồng. それで: diễn tả kết quả hoặc diễn biến tiếp theo do nguyên nhân trước.",
    category: "2. Nối câu & diễn tả quan hệ",
    examples: [
      {
        jp: "この学校は先生が優しいです。それに、授業も楽しいです。",
        furigana: "このがっこうは せんせいが やさしいです。それに、じゅぎょうも たのしいです。",
        vi: "Trường này có giáo viên hiền. Hơn nữa, giờ học cũng rất vui.",
        note: "それに: Thêm đặc điểm tốt nữa",
      },
      {
        jp: "電車が遅れました。それで、学校に遅れました。",
        furigana: "でんしゃがおくれました。それで、がっこうにおくれました。",
        vi: "Tàu bị trễ. Vì vậy, tôi đã đến trường muộn.",
        note: "それで: Nguyên nhân tàu trễ dẫn đến đi học muộn",
      },
    ],
  },
  {
    id: "g-2-2",
    pattern: "～て / ～てから / ～たあとで / ～ながら / ～し～し",
    meaning: "Các mẫu nối chuỗi hành động và liệt kê",
    usage: "～て (làm rồi làm), ～てから (sau khi làm thì mới...), ～たあとで (sau khi làm xong), ～ながら (vừa làm A vừa làm B), ～し～し (vừa... lại vừa...)",
    category: "2. Nối câu & diễn tả quan hệ",
    examples: [
      {
        jp: "ご飯を食べて、学校へ行きます。",
        furigana: "ごはんをたべて、がっこうへいきます。",
        vi: "Ăn cơm xong rồi đi đến trường.",
      },
      {
        jp: "仕事が終わったあとで、勉強します。",
        furigana: "しごとがおわったあとで、べんきょうします。",
        vi: "Sau khi công việc kết thúc, tôi sẽ học bài.",
      },
      {
        jp: "音楽を聞きながら、勉強します。",
        furigana: "おんがくをききながら、べんきょうします。",
        vi: "Tôi vừa nghe nhạc vừa học bài.",
      },
      {
        jp: "安いし、おいしいし、よく食べます。",
        furigana: "やすいし、おいしいし、よくたべます。",
        vi: "Vừa rẻ lại vừa ngon nên tôi thường xuyên ăn.",
      },
    ],
  },
  {
    id: "g-2-3",
    pattern: "～のに (Mặc dù) vs ～ても (Dù... vẫn)",
    meaning: "Diễn tả sự trái ngược / đối lập",
    usage: "～のに: nhấn mạnh sự tiếc nuối, bất ngờ, kết quả thực tế trái với mong đợi. ～ても: giả định nhượng bộ (cho dù... cũng).",
    category: "2. Nối câu & diễn tả quan hệ",
    examples: [
      {
        jp: "一生懸命勉強したのに、試験に合格できませんでした。",
        furigana: "いっしょうけんめいべんきょうしたのに、しけんにごうかくできませんでした。",
        vi: "Mặc dù đã học chăm chỉ thế nhưng vẫn không đậu kỳ thi.",
      },
      {
        jp: "雨が降っても、出かけます。",
        furigana: "あめがふっても、でかけます。",
        vi: "Cho dù trời có mưa, tôi vẫn sẽ đi ra ngoài.",
      },
    ],
  },

  // 3. Thời điểm và trạng thái của hành động
  {
    id: "g-3-1",
    pattern: "～ところ (ところです / ているところ / たところ)",
    meaning: "Giai đoạn của hành động: Sắp làm / Đang làm / Vừa làm xong",
    usage: "V-ru + ところ (sắp sửa làm). V-teiru + ところ (đang lúc làm). V-ta + ところ (vừa mới làm xong tức thì).",
    category: "3. Thời điểm & trạng thái hành động",
    examples: [
      {
        jp: "今からご飯を食べるところです。",
        furigana: "いまからごはんをたべるところです。",
        vi: "Tôi chuẩn bị ăn cơm bây giờ đây.",
      },
      {
        jp: "今、レポートを書いているところです。",
        furigana: "いま、レポートをかいているところです。",
        vi: "Hiện tại tôi đang viết báo cáo.",
      },
      {
        jp: "今、帰ったところです。",
        furigana: "いま、かえったところです。",
        vi: "Tôi vừa mới về đến nơi xong.",
      },
    ],
  },
  {
    id: "g-3-2",
    pattern: "～たばかり vs ～たところ",
    meaning: "Phân biệt hai mẫu diễn tả 'vừa mới làm'",
    usage: "～たところ: Vừa mới làm xong ngay lúc đó (tính theo giây/phút). ～たばかり: Mới làm gần đây (theo cảm nhận chủ quan, có thể vài ngày hay vài tháng).",
    category: "3. Thời điểm & trạng thái hành động",
    examples: [
      {
        jp: "日本に来たばかりです。",
        furigana: "にほんにきたばかりです。",
        vi: "Tôi mới đến Nhật gần đây.",
      },
      {
        jp: "レポートを書いたところです。",
        furigana: "レポートをかいたところです。",
        vi: "Tôi vừa mới đặt bút viết xong bài báo cáo.",
      },
    ],
    mistakeAlert: "Lỗi từng viết: '日本語でレポートを書ったばかりです ❌' → '日本語でレポートを書いたばかりです 🟢' (chia thể quá khứ của 書く là 書いた).",
  },
  {
    id: "g-3-3",
    pattern: "～てある vs ～ておく",
    meaning: "Trạng thái sẵn có vs Hành động chuẩn bị trước",
    usage: "～てある: Trạng thái kết quả của hành động có chủ đích của ai đó (tha động từ). ～ておく: Hành động làm sẵn, chuẩn bị trước cho một mục đích trong tương lai.",
    category: "3. Thời điểm & trạng thái hành động",
    examples: [
      {
        jp: "会議の資料が準備してあります。",
        furigana: "かいぎのしりょうが じゅんびしてあります。",
        vi: "Tài liệu cuộc họp đã được chuẩn bị sẵn rồi.",
      },
      {
        jp: "明日のために、資料を準備しておきます。",
        furigana: "あしたのために、しりょうを じゅんびしておきます。",
        vi: "Tôi sẽ chuẩn bị sẵn tài liệu cho ngày mai.",
      },
    ],
  },
  {
    id: "g-3-4",
    pattern: "～てくる / ～ていく / ～続ける",
    meaning: "Sự thay đổi theo thời gian & hành động tiếp diễn",
    usage: "～てくる: diễn biến thay đổi từ quá khứ đến hiện tại. ～ていく: tiếp diễn từ hiện tại đến tương lai. ～続ける: tiếp tục liên tục không dừng.",
    category: "3. Thời điểm & trạng thái hành động",
    examples: [
      {
        jp: "日本語が少し分かるようになってきました。",
        furigana: "にほんごがすこし わかるようになってきました。",
        vi: "Tiếng Nhật đã dần dần trở nên hiểu được rồi.",
      },
      {
        jp: "これからも日本語を勉強していきます。",
        furigana: "これからも にほんごを べんきょうしていきます。",
        vi: "Từ nay về sau tôi cũng sẽ tiếp tục học tiếng Nhật.",
      },
      {
        jp: "雨が降り続けています。",
        furigana: "あめがふりつづけています。",
        vi: "Mưa tiếp tục rơi liên tục không ngớt.",
      },
    ],
  },

  // 4. Mục đích, dự định và mong muốn
  {
    id: "g-4-1",
    pattern: "～ために vs ～ように",
    meaning: "Phân biệt mục đích: Để...",
    usage: "～ために: Mục đích có chủ ý rõ ràng (Động từ ý chí V-ru hoặc Danh từ の). ～ように: Nhấn mạnh trạng thái mong muốn đạt được, khả năng (Động từ khả năng hoặc tự động từ vô ý chí).",
    category: "4. Mục đích, dự định & mong muốn",
    examples: [
      {
        jp: "日本へ行くために、日本語を勉強しています。",
        furigana: "にほんへいくために、にほんごをべんきょうしています。",
        vi: "Tôi học tiếng Nhật để đi Nhật Bản.",
        note: "行く là động từ có ý chí → dùng ために",
      },
      {
        jp: "日本語が話せるように、毎日練習します。",
        furigana: "にほんごがはなせるように、まいにちれんしゅうします。",
        vi: "Tôi luyện tập mỗi ngày để có thể nói được tiếng Nhật.",
        note: "話せる là động từ khả năng (trạng thái) → dùng ように",
      },
    ],
  },
  {
    id: "g-4-2",
    pattern: "～つもりです / ～予定です / ～ことにする / ～ことになる",
    meaning: "Dự định & Quyết định",
    usage: "～つもり: dự định trong tâm trí. ～予定: lịch trình cụ thể đã định. ～ことにする: bản thân tự quyết định. ～ことになる: được quyết định bởi tổ chức, ngoại cảnh.",
    category: "4. Mục đích, dự định & mong muốn",
    examples: [
      {
        jp: "日本で働くつもりです。",
        furigana: "にほんで はたらくつもりです。",
        vi: "Tôi dự định sẽ làm việc tại Nhật Bản.",
      },
      {
        jp: "来年、日本へ行く予定です。",
        furigana: "らいねん、にほんへいくよていです。",
        vi: "Tôi có lịch trình sang Nhật vào năm tới.",
      },
      {
        jp: "毎日、日本語を勉強することにしました。",
        furigana: "まいにち、にほんごをべんきょうすることにしました。",
        vi: "Tôi đã tự quyết định mỗi ngày sẽ học tiếng Nhật.",
      },
      {
        jp: "来月、日本へ行くことになりました。",
        furigana: "らいげつ、にほんへいくことになりました。",
        vi: "Đã có quyết định tháng sau tôi sẽ sang Nhật.",
      },
    ],
  },
  {
    id: "g-4-3",
    pattern: "～てほしいです / ～たいです",
    meaning: "Mong muốn: Muốn ai đó làm gì vs Muốn bản thân làm gì",
    usage: "～たい: chủ ngữ muốn tự mình làm. [Người] に + ～てほしい: muốn người khác làm điều gì cho mình.",
    category: "4. Mục đích, dự định & mong muốn",
    examples: [
      {
        jp: "日本へ行きたいです。",
        furigana: "にほんへいきたいです。",
        vi: "Tôi muốn đi Nhật Bản.",
      },
      {
        jp: "先生に教えてほしいです。",
        furigana: "せんせいに おしえてほしいです。",
        vi: "Em mong muốn được thầy/cô chỉ dạy cho.",
      },
    ],
  },

  // 5. So sánh, suy đoán và vẻ bề ngoài
  {
    id: "g-5-1",
    pattern: "～よう / ～そう / ～みたい / ～はず / ～かもしれない",
    meaning: "Suy đoán, vẻ bề ngoài và mức độ chắc chắn",
    usage: "～ようです: dường như (dựa trên quan sát trực giác). ～そうです: trông có vẻ (nhìn bề ngoài) HOẶC nghe nói rằng (truyền đạt). ～みたい: giống như (khẩu ngữ). ～はず: chắc chắn (dựa trên căn cứ lý luận). ～かもしれない: có thể, có lẽ.",
    category: "5. So sánh, suy đoán & vẻ bề ngoài",
    examples: [
      {
        jp: "雨が降るようです。",
        furigana: "あめがふるようです。",
        vi: "Dường như trời sắp mưa.",
      },
      {
        jp: "この料理はおいしそうです。",
        furigana: "このりょうりはおいしそうです。",
        vi: "Món ăn này trông có vẻ ngon.",
      },
      {
        jp: "明日は雨だそうです。",
        furigana: "あしたはあめだそうです。",
        vi: "Nghe nói ngày mai trời sẽ mưa.",
      },
      {
        jp: "彼はもう着いたはずです。",
        furigana: "かれはもうついたはずです。",
        vi: "Anh ấy chắc chắn đã đến nơi rồi (theo lịch trình).",
      },
    ],
    mistakeAlert: "Lỗi từng gặp: '彼女は歌手のようなことが知っています ❌' → Sửa đúng: '彼女は歌手のように歌が上手です 🟢' hoặc '彼女は歌手のようなきれいな声をしています 🟢'.",
  },
  {
    id: "g-5-2",
    pattern: "～すぎる / ～ほど / ～くらい / ～だけ / ～しか～ない",
    meaning: "Mức độ, giới hạn và so sánh lượng",
    usage: "～すぎる (quá mức), ～ほど (đến mức), ～くらい/ぐらい (khoảng, mức độ), ～だけ (chỉ - đi với khẳng định), ～しか...ない (chỉ - đi với phủ định).",
    category: "5. So sánh, suy đoán & vẻ bề ngoài",
    examples: [
      {
        jp: "食べすぎました。",
        furigana: "たべすぎました。",
        vi: "Tôi đã ăn quá nhiều rồi.",
      },
      {
        jp: "死ぬほど疲れました。",
        furigana: "しぬほどつかれました。",
        vi: "Tôi mệt đến mức gần như kiệt sức.",
      },
      {
        jp: "千円しかありません。",
        furigana: "せんえんしかありません。",
        vi: "Tôi chỉ còn đúng 1000 yên (mang sắc thái ít ỏi).",
      },
      {
        jp: "水だけ飲みました。",
        furigana: "みずだけのみました。",
        vi: "Tôi chỉ uống nước thôi.",
      },
    ],
  },

  // 6. Nghĩa vụ, cho phép, cấm đoán và trải nghiệm
  {
    id: "g-6-1",
    pattern: "Nghĩa vụ, cho phép, cấm đoán và khả năng",
    meaning: "Tổng hợp các mẫu câu ứng xử cơ bản N4",
    usage: "～なければなりません (phải làm), ～なくてもいいです (không cần làm cũng được), ～てはいけません (không được phép), ～てもいいです (được phép), ～たことがあります (đã từng), ～てみる (thử làm), ～てしまう (lỡ làm, làm xong), ～やすい/にくい (dễ/khó làm).",
    category: "6. Nghĩa vụ, cho phép & trải nghiệm",
    examples: [
      {
        jp: "日本語を勉強しなければなりません。",
        furigana: "にほんごをべんきょうしなければなりません。",
        vi: "Tôi phải học tiếng Nhật.",
      },
      {
        jp: "明日は来なくてもいいです。",
        furigana: "あしたはこなくてもいいです。",
        vi: "Ngày mai bạn không cần đến cũng được.",
      },
      {
        jp: "ここで写真を撮ってはいけません。",
        furigana: "ここでしゃしんをとってはいけません。",
        vi: "Không được chụp ảnh ở đây.",
      },
      {
        jp: "日本料理を食べてみます。",
        furigana: "にほんりょうりをたべてみます。",
        vi: "Tôi sẽ ăn thử món ăn Nhật Bản.",
      },
      {
        jp: "この漢字は書きにくいです。",
        furigana: "このかんじはかきにくいです。",
        vi: "Chữ Hán này rất khó viết.",
      },
    ],
  },

  // 7. Thể bị động, sai khiến và sai khiến bị động
  {
    id: "g-7-1",
    pattern: "Bị động (受身) / Sai khiến (使役) / Sai khiến bị động (使役受身) / ～によって",
    meaning: "Thể tương tác hành động giữa người với người và vật",
    usage: "Thể bị động: Chủ ngữ chịu tác động (われる/られる). Thể sai khiến: Bắt/cho phép ai làm (わせる/らせる). Sai khiến bị động: Bị bắt phải làm việc gì. ～によって: Bởi, do ai sáng chế/xây dựng (trong văn viết).",
    category: "7. Thể bị động & sai khiến",
    examples: [
      {
        jp: "電話はベルによって発明されました。",
        furigana: "でんわはベルによって はつめいされました。",
        vi: "Điện thoại được phát minh bởi Bell.",
      },
      {
        jp: "母は子供に野菜を食べさせました。",
        furigana: "はははこどもに やさいをたべさせました。",
        vi: "Mẹ bắt đứa trẻ ăn rau xanh (sai khiến).",
      },
      {
        jp: "私は先生に作文を書かされました。",
        furigana: "わたしはせんせいに さくぶんをかかされました。",
        vi: "Tôi bị thầy giáo bắt viết bài văn (sai khiến bị động).",
      },
      {
        jp: "この建物はフランス人によって建てられました。",
        furigana: "このたてものは フランスじんによって たてられました。",
        vi: "Tòa nhà này được xây dựng bởi người Pháp.",
      },
      {
        jp: "兄がうそをついたので、父は怒りました。",
        furigana: "あにがうそをついたので、ちちはおこりました。",
        vi: "Vì anh trai nói dối nên bố tức giận.",
        note: "Lưu ý quan trọng: Không phải mọi câu 'làm cho ai đó tức giận' đều cần thể sai khiến. Với nguyên nhân dẫn đến cảm xúc, cấu trúc ～ので／～から tự nhiên hơn rất nhiều.",
      },
    ],
  },

  // 8. Kính ngữ và khiêm nhường ngữ
  {
    id: "g-8-1",
    pattern: "Kính ngữ (尊敬語) & Khiêm nhường ngữ (謙譲語)",
    meaning: "Giao tiếp lịch sự, kính trọng cấp trên & thầy cô",
    usage: "Kính ngữ nâng đối phương lên: いらっしゃる, おっしゃる, 召し上がる, ご覧になる, なさる, ご存じです. Khiêm nhường hạ mình xuống: 参る, 申す/申し上げる, 拝見する, 伺う, いたす. Công thức: お/ご + V-bỏ-masu + になる (kính ngữ), お/ご + V-bỏ-masu + する (khiêm nhường).",
    category: "8. Kính ngữ & Khiêm nhường ngữ",
    examples: [
      {
        jp: "田中先生はどこにお住まいですか。",
        furigana: "たなかせんせいは どこにおすまいですか。",
        vi: "Thầy Tanaka hiện đang sống ở đâu ạ?",
        note: "Câu bạn từng luyện hỏi thầy giáo lịch sự",
      },
      {
        jp: "このレポートをチェックしていただけませんか。",
        furigana: "このレポートをチェックしていただけませんか。",
        vi: "Thầy/cô có thể vui lòng kiểm tra bài báo cáo này giúp em được không ạ?",
      },
      {
        jp: "明日、先生の研究所へ伺います。",
        furigana: "あした、せんせいのけんきゅうじょへ うかがいます。",
        vi: "Ngày mai em xin phép ghé thăm văn phòng nghiên cứu của thầy ạ (伺う - khiêm nhường).",
      },
    ],
  },

  // 9. Các cấu trúc nâng cao khác đã xuất hiện trong phần ôn N4/N3
  {
    id: "g-9-1",
    pattern: "Cấu trúc nâng cao N4/N3 trọng tâm",
    meaning: "Tổng hợp các mẫu câu mở rộng thường gặp trong đề thi",
    usage: "～たまま (giữ nguyên trạng thái), ～たって (dù... vẫn - văn nói), ～てみないと (nếu không thử thì chưa biết), ～のことで (về chuyện...), ～ぐらいで (chỉ vì... mà), ～てよかった (thật tốt vì đã...), ～にVてほしい (muốn ai làm gì), ～間／間に (trong suốt / trong lúc), ～ばかり (toàn làm gì), ～ばかりでなく (không những mà còn), ～ようとする (đang định làm).",
    category: "9. Cấu trúc nâng cao N4/N3",
    examples: [
      {
        jp: "電気をつけたまま寝ました。",
        furigana: "でんきをつけたままねました。",
        vi: "Tôi đã để nguyên đèn sáng mà đi ngủ.",
      },
      {
        jp: "いくら勉強したって、難しいです。",
        furigana: "いくらべんきょうしたって、むずかしいです。",
        vi: "Dù có học bao nhiêu đi nữa thì vẫn thấy khó.",
      },
      {
        jp: "食べてみないと、分かりません。",
        furigana: "たべてみないと、わかりません。",
        vi: "Nếu không ăn thử thì không thể biết được.",
      },
      {
        jp: "仕事のことで相談があります。",
        furigana: "しごとのことですんだんがあります。",
        vi: "Tôi có chuyện công việc muốn xin trao đổi/tư vấn.",
      },
      {
        jp: "そのぐらいで怒らないでください。",
        furigana: "そのぐらいでおこらないでください。",
        vi: "Xin đừng nổi giận chỉ vì chuyện cỏn con như thế.",
      },
      {
        jp: "日本語ばかりでなく、英語も勉強しています。",
        furigana: "にほんごばかりでなく、えいごもべんきょうしています。",
        vi: "Không chỉ tiếng Nhật mà tôi còn đang học cả tiếng Anh nữa.",
      },
      {
        jp: "出かけようとしたとき、電話が来ました。",
        furigana: "でかけようとしたとき、でんわがきました。",
        vi: "Đúng lúc tôi đang định bước ra ngoài thì có điện thoại tới.",
      },
    ],
  },
];

// ==========================================
// PHẦN II — TỪ VỰNG BẠN ĐÃ HỎI (6 Nhóm)
// ==========================================
export const reviewVocabularyList: ReviewVocabularyItem[] = [
  // 1. Động từ dễ nhầm và động từ theo cặp
  {
    id: "v-1-1",
    kanji: "借りる",
    hiragana: "かりる",
    meaning: "Mượn, nhận mượn",
    category: "1. Động từ theo cặp & dễ nhầm",
    note: "Đi với trợ từ に/から chỉ đối tượng cho mình mượn: 友達に/から本を借りました (Tôi mượn sách của bạn).",
  },
  {
    id: "v-1-2",
    kanji: "貸す",
    hiragana: "かす",
    meaning: "Cho mượn",
    category: "1. Động từ theo cặp & dễ nhầm",
    note: "Đi với trợ từ に chỉ người nhận mượn: 友達に本を貸しました (Tôi cho bạn mượn sách).",
  },
  {
    id: "v-1-3",
    kanji: "慣れる",
    hiragana: "なれる",
    meaning: "Quen với",
    category: "1. Động từ theo cặp & dễ nhầm",
    note: "ĐẶC BIỆT ĐI VỚI TRỢ TỪ に, không đi với を: 日本語に慣れる, 日本の生活に慣れる.",
  },
  {
    id: "v-1-4",
    kanji: "準備する",
    hiragana: "じゅんびする",
    meaning: "Chuẩn bị",
    category: "1. Động từ theo cặp & dễ nhầm",
  },
  {
    id: "v-1-5",
    kanji: "用意する",
    hiragana: "よういする",
    meaning: "Chuẩn bị sẵn đồ đạc, vật dụng",
    category: "1. Động từ theo cặp & dễ nhầm",
  },
  {
    id: "v-1-6",
    kanji: "支度する",
    hiragana: "したくする",
    meaning: "Chuẩn bị, sửa soạn bản thân",
    category: "1. Động từ theo cặp & dễ nhầm",
  },
  {
    id: "v-1-7",
    kanji: "備える",
    hiragana: "そなえる",
    meaning: "Chuẩn bị sẵn, trang bị, phòng bị",
    category: "1. Động từ theo cặp & dễ nhầm",
  },
  {
    id: "v-1-8",
    kanji: "整える",
    hiragana: "ととのえる",
    meaning: "Sắp xếp, chỉnh đốn gọn gàng",
    category: "1. Động từ theo cặp & dễ nhầm",
  },
  {
    id: "v-1-9",
    kanji: "増やす",
    hiragana: "ふやす",
    meaning: "Làm tăng lên (tha động từ, を)",
    category: "1. Động từ theo cặp & dễ nhầm",
    note: "学生を増やします (Làm tăng số lượng học sinh).",
  },
  {
    id: "v-1-10",
    kanji: "増える",
    hiragana: "ふえる",
    meaning: "Tự tăng lên (tự động từ, が)",
    category: "1. Động từ theo cặp & dễ nhầm",
    note: "学生が増えます (Số lượng học sinh tự tăng lên).",
  },
  {
    id: "v-1-11",
    kanji: "減らす",
    hiragana: "へらす",
    meaning: "Làm giảm xuống (tha động từ, を)",
    category: "1. Động từ theo cặp & dễ nhầm",
    note: "学費を減らす (Làm giảm học phí).",
  },
  {
    id: "v-1-12",
    kanji: "減る",
    hiragana: "へる",
    meaning: "Tự giảm bớt (tự động từ, が)",
    category: "1. Động từ theo cặp & dễ nhầm",
    note: "学費が減る (Học phí tự giảm).",
  },
  {
    id: "v-1-13",
    kanji: "隠す",
    hiragana: "かくす",
    meaning: "Giấu cái gì (tha động từ)",
    category: "1. Động từ theo cặp & dễ nhầm",
  },
  {
    id: "v-1-14",
    kanji: "隠れる",
    hiragana: "かくれる",
    meaning: "Trốn, ẩn nấp, bị che khuất (tự động từ)",
    category: "1. Động từ theo cặp & dễ nhầm",
  },
  {
    id: "v-1-15",
    kanji: "残す",
    hiragana: "のこす",
    meaning: "Để lại, giữ lại (tha động từ)",
    category: "1. Động từ theo cặp & dễ nhầm",
  },
  {
    id: "v-1-16",
    kanji: "残る",
    hiragana: "のこる",
    meaning: "Còn lại (tự động từ)",
    category: "1. Động từ theo cặp & dễ nhầm",
  },
  {
    id: "v-1-17",
    kanji: "勤める",
    hiragana: "つとめる",
    meaning: "Làm việc tại công ty, cơ quan",
    category: "1. Động từ theo cặp & dễ nhầm",
    note: "Đi với に: 日本の会社に勤める (Làm việc tại công ty Nhật).",
  },
  {
    id: "v-1-18",
    kanji: "努める",
    hiragana: "つとめる",
    meaning: "Nỗ lực, cố gắng hết sức",
    category: "1. Động từ theo cặp & dễ nhầm",
  },
  {
    id: "v-1-19",
    kanji: "落ち着く",
    hiragana: "おちつく",
    meaning: "Bình tĩnh, ổn định",
    category: "1. Động từ theo cặp & dễ nhầm",
    collocations: ["気持ちが落ち着く (tâm trạng bình tĩnh lại)"],
  },
  {
    id: "v-1-20",
    kanji: "配る",
    hiragana: "くばる",
    meaning: "Phân phát",
    category: "1. Động từ theo cặp & dễ nhầm",
    collocations: ["荷物を配る (phân phát bưu kiện)"],
  },
  {
    id: "v-1-21",
    kanji: "検討する",
    hiragana: "けんとうする",
    meaning: "Xem xét, cân nhắc kỹ",
    category: "1. Động từ theo cặp & dễ nhầm",
    collocations: ["問題を検討する (xem xét vấn đề)"],
  },
  {
    id: "v-1-22",
    kanji: "応募する",
    hiragana: "おうぼする",
    meaning: "Ứng tuyển, nộp đơn",
    category: "1. Động từ theo cặp & dễ nhầm",
  },
  {
    id: "v-1-23",
    kanji: "輸入する",
    hiragana: "ゆにゅうする",
    meaning: "Nhập khẩu",
    category: "1. Động từ theo cặp & dễ nhầm",
  },
  {
    id: "v-1-24",
    kanji: "輸出する",
    hiragana: "ゆしゅつする",
    meaning: "Xuất khẩu",
    category: "1. Động từ theo cặp & dễ nhầm",
  },

  // 2. Danh từ và tính từ bạn từng hỏi
  {
    id: "v-2-1",
    kanji: "教会",
    hiragana: "きょうかい",
    meaning: "Nhà thờ",
    category: "2. Danh từ & tính từ bạn từng hỏi",
    note: "Cùng âm đọc きょうかい với 協会 (hiệp hội) nhưng khác nghĩa hoàn toàn.",
  },
  {
    id: "v-2-2",
    kanji: "協会",
    hiragana: "きょうかい",
    meaning: "Hiệp hội, tổ chức đoàn thể",
    category: "2. Danh từ & tính từ bạn từng hỏi",
  },
  {
    id: "v-2-3",
    kanji: "古民家",
    hiragana: "こみんか",
    meaning: "Nhà cổ truyền thống Nhật Bản",
    category: "2. Danh từ & tính từ bạn từng hỏi",
  },
  {
    id: "v-2-4",
    kanji: "価値",
    hiragana: "かち",
    meaning: "Giá trị",
    category: "2. Danh từ & tính từ bạn từng hỏi",
  },
  {
    id: "v-2-5",
    kanji: "性格",
    hiragana: "せいかく",
    meaning: "Tính cách con người",
    category: "2. Danh từ & tính từ bạn từng hỏi",
  },
  {
    id: "v-2-6",
    kanji: "内容",
    hiragana: "ないよう",
    meaning: "Nội dung",
    category: "2. Danh từ & tính từ bạn từng hỏi",
  },
  {
    id: "v-2-7",
    kanji: "活動",
    hiragana: "かつどう",
    meaning: "Hoạt động",
    category: "2. Danh từ & tính từ bạn từng hỏi",
  },
  {
    id: "v-2-8",
    kanji: "通知",
    hiragana: "つうち",
    meaning: "Thông báo",
    category: "2. Danh từ & tính từ bạn từng hỏi",
  },
  {
    id: "v-2-9",
    kanji: "禁止",
    hiragana: "きんし",
    meaning: "Cấm đoán",
    category: "2. Danh từ & tính từ bạn từng hỏi",
  },
  {
    id: "v-2-10",
    kanji: "父母",
    hiragana: "ふぼ",
    meaning: "Cha mẹ (văn phong trang trọng)",
    category: "2. Danh từ & tính từ bạn từng hỏi",
  },
  {
    id: "v-2-11",
    kanji: "両親",
    hiragana: "りょうしん",
    meaning: "Bố mẹ, cả cha lẫn mẹ",
    category: "2. Danh từ & tính từ bạn từng hỏi",
  },
  {
    id: "v-2-12",
    kanji: "兄弟",
    hiragana: "きょうだい",
    meaning: "Anh chị em trong nhà",
    category: "2. Danh từ & tính từ bạn từng hỏi",
  },
  {
    id: "v-2-13",
    kanji: "学費",
    hiragana: "がくひ",
    meaning: "Học phí",
    category: "2. Danh từ & tính từ bạn từng hỏi",
  },
  {
    id: "v-2-14",
    kanji: "地震",
    hiragana: "じしん",
    meaning: "Trận động đất",
    category: "2. Danh từ & tính từ bạn từng hỏi",
  },
  {
    id: "v-2-15",
    kanji: "石油",
    hiragana: "せきゆ",
    meaning: "Dầu mỏ, dầu hỏa",
    category: "2. Danh từ & tính từ bạn từng hỏi",
  },
  {
    id: "v-2-16",
    kanji: "近所",
    hiragana: "きんじょ",
    meaning: "Khu phố hàng xóm, vùng lân cận",
    category: "2. Danh từ & tính từ bạn từng hỏi",
  },
  {
    id: "v-2-17",
    kanji: "隣人",
    hiragana: "りんじん",
    meaning: "Người hàng xóm",
    category: "2. Danh từ & tính từ bạn từng hỏi",
  },
  {
    id: "v-2-18",
    kanji: "隣の人",
    hiragana: "となりのひと",
    meaning: "Người ngồi bên cạnh / ở cạnh",
    category: "2. Danh từ & tính từ bạn từng hỏi",
  },

  // 3. Trạng từ và từ nối
  {
    id: "v-3-1",
    kanji: "一応",
    hiragana: "いちおう",
    meaning: "Tạm thời, trước mắt, dù sao cũng",
    category: "3. Trạng từ & từ nối",
  },
  {
    id: "v-3-2",
    kanji: "ようやく",
    hiragana: "ようやく",
    meaning: "Cuối cùng cũng (sau nhiều mong mỏi/nỗ lực)",
    category: "3. Trạng từ & từ nối",
  },
  {
    id: "v-3-3",
    kanji: "ぐっすり",
    hiragana: "ぐっすり",
    meaning: "Ngủ say sưa, giấc ngủ ngon",
    category: "3. Trạng từ & từ nối",
    collocations: ["ぐっすり眠る (ngủ một giấc say)"],
  },
  {
    id: "v-3-4",
    kanji: "だんだん",
    hiragana: "だんだん",
    meaning: "Dần dần từng bước một",
    category: "3. Trạng từ & từ nối",
  },
  {
    id: "v-3-5",
    kanji: "どんどん",
    hiragana: "どんどん",
    meaning: "Nhanh chóng, liên tục tiến triển",
    category: "3. Trạng từ & từ nối",
  },
  {
    id: "v-3-6",
    kanji: "そろそろ",
    hiragana: "そろそろ",
    meaning: "Sắp sửa đến lúc",
    category: "3. Trạng từ & từ nối",
    collocations: ["そろそろ失礼します (đã đến lúc tôi xin phép về)"],
  },
  {
    id: "v-3-7",
    kanji: "しっかり",
    hiragana: "しっかり",
    meaning: "Chắc chắn, cẩn thận, vững vàng",
    category: "3. Trạng từ & từ nối",
  },
  {
    id: "v-3-8",
    kanji: "はっきり",
    hiragana: "はっきり",
    meaning: "Rõ ràng, rành mạch",
    category: "3. Trạng từ & từ nối",
  },
  {
    id: "v-3-9",
    kanji: "かなり",
    hiragana: "かなり",
    meaning: "Khá là, đáng kể",
    category: "3. Trạng từ & từ nối",
  },
  {
    id: "v-3-10",
    kanji: "ずっと",
    hiragana: "ずっと",
    meaning: "Suốt / Hơn hẳn",
    category: "3. Trạng từ & từ nối",
  },
  {
    id: "v-3-11",
    kanji: "特に",
    hiragana: "とくに",
    meaning: "Đặc biệt là",
    category: "3. Trạng từ & từ nối",
  },
  {
    id: "v-3-12",
    kanji: "実は",
    hiragana: "じつは",
    meaning: "Thật ra thì, sự thật là",
    category: "3. Trạng từ & từ nối",
  },
  {
    id: "v-3-13",
    kanji: "いくら～ても",
    hiragana: "いくら～ても",
    meaning: "Dù... bao nhiêu đi chăng nữa",
    category: "3. Trạng từ & từ nối",
  },

  // 4. Từ vựng N3 xuất hiện trong phần luyện đề (Đề thi 12/2024)
  {
    id: "v-4-1",
    kanji: "怪しい",
    hiragana: "あやしい",
    meaning: "Đáng ngờ, khả nghi",
    category: "4. Từ vựng N3 (Đề 12/2024)",
    collocations: ["怪しい人（あやしいひと）: người đáng ngờ"],
  },
  {
    id: "v-4-2",
    kanji: "内容を確認する",
    hiragana: "ないようをかくにんする",
    meaning: "Xác nhận nội dung",
    category: "4. Từ vựng N3 (Đề 12/2024)",
  },
  {
    id: "v-4-3",
    kanji: "荷物を配る",
    hiragana: "にもつをくばる",
    meaning: "Phân phát hàng hóa, bưu kiện",
    category: "4. Từ vựng N3 (Đề 12/2024)",
  },
  {
    id: "v-4-4",
    kanji: "日本の会社に勤める",
    hiragana: "にほんのかいしゃにつとめる",
    meaning: "Làm việc tại công ty Nhật Bản",
    category: "4. Từ vựng N3 (Đề 12/2024)",
    note: "Không nói '日本に勤める ❌', phải nói '日本の会社に勤める 🟢'.",
  },

  // 5. Từ vựng về cảm xúc, sức khỏe và âm thanh
  {
    id: "v-5-1",
    kanji: "風邪をひく",
    hiragana: "かぜをひく",
    meaning: "Bị cảm lạnh",
    category: "5. Cảm xúc, sức khỏe & âm thanh",
  },
  {
    id: "v-5-2",
    kanji: "熱がある",
    hiragana: "ねつがある",
    meaning: "Bị phát sốt",
    category: "5. Cảm xúc, sức khỏe & âm thanh",
  },
  {
    id: "v-5-3",
    kanji: "頭痛 / 頭が痛い",
    hiragana: "ずつう / あたまがいたい",
    meaning: "Cơn đau đầu / Bị đau đầu",
    category: "5. Cảm xúc, sức khỏe & âm thanh",
  },
  {
    id: "v-5-4",
    kanji: "咳が出る",
    hiragana: "せきがでる",
    meaning: "Bị ho, ho ra từng cơn",
    category: "5. Cảm xúc, sức khỏe & âm thanh",
  },
  {
    id: "v-5-5",
    kanji: "音がする",
    hiragana: "おとがする",
    meaning: "Có tiếng động (phát ra âm thanh)",
    category: "5. Cảm xúc, sức khỏe & âm thanh",
  },
  {
    id: "v-5-6",
    kanji: "声がする",
    hiragana: "こえがする",
    meaning: "Nghe thấy có tiếng người nói",
    category: "5. Cảm xúc, sức khỏe & âm thanh",
  },
  {
    id: "v-5-7",
    kanji: "匂いがする",
    hiragana: "においがする",
    meaning: "Có mùi (thơm hoặc nồng)",
    category: "5. Cảm xúc, sức khỏe & âm thanh",
    collocations: ["いい匂いがする (có mùi thơm)"],
  },
  {
    id: "v-5-8",
    kanji: "味がする",
    hiragana: "あじがする",
    meaning: "Có vị",
    category: "5. Cảm xúc, sức khỏe & âm thanh",
    collocations: ["甘い味がする (có vị ngọt)"],
  },
  {
    id: "v-5-9",
    kanji: "やる気 / やる気が出る",
    hiragana: "やるき / やるきがでる",
    meaning: "Động lực / Có động lực, hứng khởi làm việc",
    category: "5. Cảm xúc, sức khỏe & âm thanh",
  },
  {
    id: "v-5-10",
    kanji: "ストレスがたまる",
    hiragana: "ストレスがたまる",
    meaning: "Căng thẳng bị tích tụ",
    category: "5. Cảm xúc, sức khỏe & âm thanh",
  },

  // 6. Từ vựng về trường học và công việc
  {
    id: "v-6-1",
    kanji: "期末試験",
    hiragana: "きまつしけん",
    meaning: "Kỳ thi cuối kỳ",
    category: "6. Trường học & công việc",
    collocations: ["試験の準備をする (chuẩn bị cho kỳ thi)"],
  },
  {
    id: "v-6-2",
    kanji: "聴解",
    hiragana: "ちょうかい",
    meaning: "Phần thi nghe hiểu",
    category: "6. Trường học & công việc",
    collocations: ["聴解を聞く (làm bài thi nghe hiểu)"],
  },
  {
    id: "v-6-3",
    kanji: "作文",
    hiragana: "さくぶん",
    meaning: "Bài văn, bài tập làm văn",
    category: "6. Trường học & công việc",
    collocations: ["作文を書く (viết bài văn)"],
  },
  {
    id: "v-6-4",
    kanji: "就職",
    hiragana: "しゅうしょく",
    meaning: "Tìm việc / Đi làm sau tốt nghiệp",
    category: "6. Trường học & công việc",
  },
  {
    id: "v-6-5",
    kanji: "報告書 / 資料",
    hiragana: "ほうこくしょ / しりょう",
    meaning: "Bản báo cáo / Tài liệu công việc",
    category: "6. Trường học & công việc",
    collocations: ["レポートをチェックする (kiểm tra báo cáo)"],
  },
  {
    id: "v-6-6",
    kanji: "故障 / 修理",
    hiragana: "こしょう / しゅうり",
    meaning: "Hỏng hóc / Sửa chữa máy móc",
    category: "6. Trường học & công việc",
    collocations: ["コピー機が壊れる (máy photocopy bị hỏng)"],
  },
  {
    id: "v-6-7",
    kanji: "先輩に相談する",
    hiragana: "せんぱいにそうだんする",
    meaning: "Trao đổi, xin lời khuyên từ tiền bối",
    category: "6. Trường học & công việc",
  },
];

// ==========================================
// PHẦN III — TRỢ TỪ VÀ 13 CÂU SỬA SAI
// ==========================================
export const reviewParticlesList: ReviewParticleItem[] = [
  { particle: "は", usage: "Chủ đề câu chuyện, đối chiếu so sánh hai vế", example: "私は学生です。", furigana: "わたしはがくせいです。", vi: "Tôi là học sinh." },
  { particle: "が", usage: "Chủ ngữ ngữ pháp, thông tin mới xuất hiện, đối tượng của tính từ/khả năng", example: "日本語が分かります。", furigana: "にほんごがわかります。", vi: "Tôi hiểu được tiếng Nhật." },
  { particle: "を", usage: "Tân ngữ trực tiếp chịu tác động, nơi chốn chuyển động xuyên qua (công viên, cầu)", example: "本を読みます。", furigana: "ほんをよみます。", vi: "Tôi đọc sách." },
  { particle: "に", usage: "Thời điểm cụ thể, đích đến chuyển động, đối tượng tiếp nhận", example: "友達に本を貸します。", furigana: "ともだちにほんをかします。", vi: "Tôi cho người bạn mượn sách." },
  { particle: "で", usage: "Địa điểm diễn ra hành động, công cụ, phương tiện đi lại", example: "学校で勉強します。", furigana: "がっこうでべんきょうします。", vi: "Tôi học bài ở trường." },
  { particle: "へ", usage: "Chỉ hướng di chuyển về phía nào đó", example: "日本へ行きます。", furigana: "にほんへいきます。", vi: "Tôi đi sang Nhật Bản." },
  { particle: "と", usage: "Cùng với (người đồng hành), trích dẫn lời nói/suy nghĩ", example: "友達と話します。", furigana: "ともだちとはなします。", vi: "Tôi nói chuyện cùng với bạn." },
  { particle: "から", usage: "Từ (điểm xuất phát không gian/thời gian), bởi vì", example: "友達から本を借ります。", furigana: "ともだちからほんをかります。", vi: "Tôi mượn quyển sách từ người bạn." },
  { particle: "まで", usage: "Đến tận (mốc thời gian, điểm dừng chân)", example: "五時まで勉強します。", furigana: "ごじまでべんきょうします。", vi: "Tôi học bài cho tới 5 giờ." },
  { particle: "より", usage: "Dùng trong câu so sánh hơn: A は B より... (A hơn B)", example: "電車はバスより速いです。", furigana: "でんしゃはバスよりはやいです。", vi: "Tàu điện thì nhanh hơn xe buýt." },
  { particle: "の", usage: "Sở hữu, kết nối và bổ nghĩa giữa hai danh từ", example: "日本語の先生", furigana: "にほんごのせんせい", vi: "Thầy giáo dạy tiếng Nhật." },
  { particle: "も", usage: "Cũng (đồng nhất tính chất)", example: "私も行きます。", furigana: "わたしもいきます。", vi: "Tôi cũng sẽ đi." },
  { particle: "しか", usage: "Chỉ... (BẮT BUỘC PHẢI ĐI VỚI ĐỘNG TỪ PHỦ ĐỊNH ～ない)", example: "千円しかありません。", furigana: "せんえんしかありません。", vi: "Tôi chỉ có vẻn vẹn 1000 yên." },
  { particle: "だけ", usage: "Chỉ... (đi được với cả khẳng định lẫn phủ định)", example: "水だけ飲みました。", furigana: "みずだけのみました。", vi: "Tôi chỉ uống nước lọc thôi." },
];

export const reviewMistakeSentences: ReviewMistakeItem[] = [
  {
    id: "err-1",
    wrong: "日本語を慣れる",
    correct: "日本語に慣れる",
    explanation: "Động từ '慣れる' (quen với) bắt buộc đi kèm trợ từ 'に', không dùng 'を'. Ví dụ: 日本語に慣れました (Tôi đã quen với tiếng Nhật).",
    tag: "Trợ từ",
    furigana: "にほんごになれる",
  },
  {
    id: "err-2",
    wrong: "天気はよければ",
    correct: "天気がよければ",
    explanation: "Trong mệnh đề điều kiện '～ければ', chủ ngữ của điều kiện đi với trợ từ 'が' là tự nhiên và chính xác nhất, không dùng 'は'.",
    tag: "Ngữ pháp điều kiện",
    furigana: "てんきがよければ",
  },
  {
    id: "err-3",
    wrong: "彼女は歌手のようなことが知っています",
    correct: "彼女は歌手のように歌が上手です / 彼女は歌手のようなきれいな声をしています",
    explanation: "Câu ban đầu sai cấu trúc biểu đạt. Muốn so sánh ai đó hát hay hoặc có giọng như ca sĩ: dùng 'ように + tính từ/động từ' (歌手のように歌が上手です) hoặc 'ような + danh từ' (歌手のような声).",
    tag: "Cấu trúc so sánh",
    furigana: "かのじょはかしゅのようにうたがじょうずです",
  },
  {
    id: "err-4",
    wrong: "料理が上手だはずです",
    correct: "料理が上手なはずです",
    explanation: "Tính từ đuôi な khi bổ nghĩa cho 'はずです' phải nối bằng 'な': 上手なはずです (chắc chắn nấu ăn ngon).",
    tag: "Nối tính từ Na",
    furigana: "りょうりがじょうずなはずです",
  },
  {
    id: "err-5",
    wrong: "漢字がかけなて",
    correct: "漢字が書けなくて",
    explanation: "Sai chính tả chia thể. '書く' → Khả năng: '書ける' → Phủ định: '書けない' → Nối câu: '書けなくて' (không thể viết được).",
    tag: "Chia thể động từ",
    furigana: "かんじがかかなくて",
  },
  {
    id: "err-6",
    wrong: "ちょうかいがききとられません",
    correct: "聴解が聞き取れません",
    explanation: "Nếu muốn nói 'không thể nghe kịp/không nắm bắt được bài nghe', dùng thể khả năng phủ định của 聞き取る là '聞き取れません'.",
    tag: "Khả năng nghe hiểu",
    furigana: "ちょうかいがききとれません",
  },
  {
    id: "err-7",
    wrong: "日本語でレポートを書ったばかりです",
    correct: "日本語でレポートを書いたばかりです",
    explanation: "Động từ '書く' thuộc nhóm 1 đuôi く, thể quá khứ là '書いた', không phải '書った'. Vì vậy phải là '書いたばかりです'.",
    tag: "Chia thể quá khứ",
    furigana: "にほんごでレポートをかいたばかりです",
  },
  {
    id: "err-8",
    wrong: "雨が降り続ける (nhầm lẫn cách dùng)",
    correct: "雨が降り続ける 🟢 (Đúng ngữ pháp: mưa tiếp tục rơi)",
    explanation: "Đây là cách nói chính xác diễn tả hành động mưa rơi liên tục không ngắt quãng (V-bỏ-masu + 続ける).",
    tag: "Tiếp tục hành động",
    furigana: "あめがふりつづける",
  },
  {
    id: "err-9",
    wrong: "雨が続く (nhầm lẫn với 降り続ける)",
    correct: "雨が続く 🟢 (Nhấn mạnh tình trạng thời tiết mưa kéo dài)",
    explanation: "'雨が続く' là danh từ + が続く, nhấn mạnh đợt thời tiết mưa dầm dề kéo dài nhiều ngày.",
    tag: "Phân biệt từ vựng",
    furigana: "あめがつづく",
  },
  {
    id: "err-10",
    wrong: "幸せ人がいません",
    correct: "幸せな人がいません",
    explanation: "'幸せ' là tính từ đuôi な, khi đứng trước danh từ để bổ nghĩa bắt buộc phải thêm 'な': 幸せな人 (người hạnh phúc).",
    tag: "Bổ nghĩa danh từ",
    furigana: "しあわせなひとがいません",
  },
  {
    id: "err-11",
    wrong: "上手だように",
    correct: "上手なようです (hoặc 上手にできるように)",
    explanation: "Nếu muốn suy đoán: '上手なようです' (trông có vẻ giỏi). Nếu muốn diễn tả mục đích để làm giỏi: '上手にできるように' (để có thể làm giỏi).",
    tag: "Cấu trúc よう",
    furigana: "じょうずなようです",
  },
  {
    id: "err-12",
    wrong: "入学 dùng trợ từ gì?",
    correct: "学校に入学する / 入学式に出る",
    explanation: "Động từ '入学する' đi với trợ từ 'に' để chỉ nơi mình bước chân vào học: 大学に入学する (nhập học đại học).",
    tag: "Trợ từ động từ",
    furigana: "がっこうににゅうがくする",
  },
  {
    id: "err-13",
    wrong: "書けなくて vs 書かなくて (dễ nhầm ý nghĩa)",
    correct: "書けなくて = không thể viết (khả năng) | 書かなくて = không viết (hành động)",
    explanation: "'書けなくて' là thể khả năng phủ định nối câu của '書ける' (không thể viết). '書かなくて' là thể phủ định của '書く' (không viết / vì không viết).",
    tag: "Phân biệt thể",
    furigana: "かけなくて vs かかなくて",
  },
];

// ==========================================
// PHẦN IV — CÁC CỤM TỪ TỪ BÀI VĂN & GIAO TIẾP
// ==========================================
export const reviewEssayPhrases: ReviewEssayPhrase[] = [
  // 1. Tự giới thiệu và công việc
  { jp: "～と申します", hiragana: "～ともうします", meaning: "Tôi tên là… (lịch sự, khiêm nhường)", topic: "1. Tự giới thiệu & công việc" },
  { jp: "～と呼んでください", hiragana: "～とよんでください", meaning: "Hãy gọi tôi là…", topic: "1. Tự giới thiệu & công việc" },
  { jp: "出身", hiragana: "しゅっしん", meaning: "Quê quán, xuất thân", topic: "1. Tự giới thiệu & công việc" },
  { jp: "趣味", hiragana: "しゅみ", meaning: "Sở thích", topic: "1. Tự giới thiệu & công việc" },
  { jp: "得意なこと", hiragana: "とくいなこと", meaning: "Điều mình giỏi, thế mạnh", topic: "1. Tự giới thiệu & công việc" },
  { jp: "協力する", hiragana: "きょうりょくする", meaning: "Hợp tác, chung sức", topic: "1. Tự giới thiệu & công việc" },
  { jp: "チームで協力する", hiragana: "チームできょうりょくする", meaning: "Hợp tác làm việc theo nhóm", topic: "1. Tự giới thiệu & công việc" },
  { jp: "苦手なこと", hiragana: "にがてなこと", meaning: "Điều mình còn yếu, không giỏi", topic: "1. Tự giới thiệu & công việc" },
  { jp: "将来の夢", hiragana: "しょうらいのゆめ", meaning: "Ước mơ trong tương lai", topic: "1. Tự giới thiệu & công việc" },
  { jp: "日本の会社", hiragana: "にほんのかいしゃ", meaning: "Công ty Nhật Bản", topic: "1. Tự giới thiệu & công việc" },
  { jp: "よろしくお願いします", hiragana: "よろしくおねがいします", meaning: "Mong được giúp đỡ / Rất mong được hợp tác", topic: "1. Tự giới thiệu & công việc" },
  {
    jp: "得意なことはチームで協力して仕事をすることです。",
    hiragana: "とくいなことは チームで きょうりょくして しごとをすることです。",
    meaning: "Điểm mạnh của tôi là làm việc nhóm và hợp tác với mọi người trong công việc.",
    topic: "1. Tự giới thiệu & công việc",
    isHighlightSentence: true,
  },

  // 2. Bài văn về ước mơ và kế hoạch tương lai
  { jp: "小さいときから", hiragana: "ちいさいときから", meaning: "Từ khi tôi còn nhỏ", topic: "2. Ước mơ & kế hoạch tương lai" },
  { jp: "日本の景色", hiragana: "にほんのけしき", meaning: "Phong cảnh thiên nhiên Nhật Bản", topic: "2. Ước mơ & kế hoạch tương lai" },
  { jp: "日本の文化", hiragana: "にほんのぶんか", meaning: "Nền văn hóa Nhật Bản", topic: "2. Ước mơ & kế hoạch tương lai" },
  { jp: "日本へ行くために", hiragana: "にほんへいくために", meaning: "Để có thể sang Nhật Bản", topic: "2. Ước mơ & kế hoạch tương lai" },
  { jp: "勉強し始める", hiragana: "べんきょうしはじめる", meaning: "Bắt đầu học", topic: "2. Ước mơ & kế hoạch tương lai" },
  { jp: "計画を立てる", hiragana: "けいかくをたてる", meaning: "Lập nên kế hoạch", topic: "2. Ước mơ & kế hoạch tương lai" },
  { jp: "将来の計画", hiragana: "しょうらいのけいかく", meaning: "Kế hoạch cho tương lai", topic: "2. Ước mơ & kế hoạch tương lai" },
  { jp: "経験を積む", hiragana: "けいけんをつむ", meaning: "Tích lũy kinh nghiệm sống & làm việc", topic: "2. Ước mơ & kế hoạch tương lai" },
  { jp: "会社を作る", hiragana: "かいしゃをつくる", meaning: "Thành lập công ty riêng", topic: "2. Ước mơ & kế hoạch tương lai" },
  { jp: "両親を喜ばせる", hiragana: "りょうしんをよろこばせる", meaning: "Làm cho cha mẹ vui lòng", topic: "2. Ước mơ & kế hoạch tương lai" },
  { jp: "人生", hiragana: "じんせい", meaning: "Cuộc đời con người", topic: "2. Ước mơ & kế hoạch tương lai" },
  { jp: "うまくいく", hiragana: "うまくいく", meaning: "Mọi việc diễn ra suôn sẻ, thuận lợi", topic: "2. Ước mơ & kế hoạch tương lai" },
  { jp: "卒業したあとで", hiragana: "そつぎょうしたあとで", meaning: "Sau khi tốt nghiệp", topic: "2. Ước mơ & kế hoạch tương lai" },
  { jp: "～ようになりたい", hiragana: "～ようになりたい", meaning: "Muốn trở nên có thể làm được điều gì...", topic: "2. Ước mơ & kế hoạch tương lai" },

  // 3. Bài văn về Quy Nhơn
  { jp: "生まれた所", hiragana: "うまれたところ", meaning: "Nơi tôi sinh ra và lớn lên", topic: "3. Bài văn về Quy Nhơn" },
  { jp: "お気に入りの場所", hiragana: "おきにいりのばしょ", meaning: "Địa điểm yêu thích", topic: "3. Bài văn về Quy Nhơn" },
  { jp: "海と山", hiragana: "うみとやま", meaning: "Biển cả và núi non", topic: "3. Bài văn về Quy Nhơn" },
  { jp: "きれいな海", hiragana: "きれいなうみ", meaning: "Bờ biển trong xanh tuyệt đẹp", topic: "3. Bài văn về Quy Nhơn" },
  { jp: "透き通る", hiragana: "すきとおる", meaning: "Trong suốt (nước biển)", topic: "3. Bài văn về Quy Nhơn" },
  { jp: "新鮮な魚介類", hiragana: "しんせんなぎょかいるい", meaning: "Hải sản tươi sống thơm ngon", topic: "3. Bài văn về Quy Nhơn" },
  { jp: "物価が安い", hiragana: "ぶっかがやすい", meaning: "Giá cả sinh hoạt rất rẻ", topic: "3. Bài văn về Quy Nhơn" },
  { jp: "交通費", hiragana: "こうつうひ", meaning: "Chi phí đi lại", topic: "3. Bài văn về Quy Nhơn" },
  { jp: "飛行機 / 夜行バス", hiragana: "ひこうき / やこうバス", meaning: "Máy bay / Xe buýt giường nằm đêm", topic: "3. Bài văn về Quy Nhơn" },
  { jp: "ぜひ行ってみてください", hiragana: "ぜひいってみてください", meaning: "Nhất định bạn hãy thử một lần đến thăm nhé", topic: "3. Bài văn về Quy Nhơn" },
  {
    jp: "みなさんも、ぜひクイニョンへ行ってみてください。",
    hiragana: "みなさんも、ぜひクイニョンへ いってみてください。",
    meaning: "Mọi người cũng nhất định hãy thử một lần đến Quy Nhơn nhé!",
    topic: "3. Bài văn về Quy Nhơn",
    isHighlightSentence: true,
  },

  // 4. Bài văn về người bạn yêu thích
  { jp: "親友", hiragana: "しんゆう", meaning: "Người bạn thân chí cốt", topic: "4. Bài văn về người bạn yêu thích" },
  { jp: "仲がいい", hiragana: "なかがいい", meaning: "Thân thiết, mối quan hệ tốt đẹp", topic: "4. Bài văn về người bạn yêu thích" },
  { jp: "明るい", hiragana: "あかるい", meaning: "Tính tình vui vẻ, tươi sáng, cởi mở", topic: "4. Bài văn về người bạn yêu thích" },
  { jp: "おもしろい", hiragana: "おもしろい", meaning: "Thú vị, hài hước, dí dỏm", topic: "4. Bài văn về người bạn yêu thích" },
  { jp: "優しい", hiragana: "やさしい", meaning: "Tốt bụng, nhân hậu, dịu dàng", topic: "4. Bài văn về người bạn yêu thích" },
  { jp: "誕生日ケーキ", hiragana: "たんじょうびケーキ", meaning: "Bánh sinh nhật mừng tuổi mới", topic: "4. Bài văn về người bạn yêu thích" },
  { jp: "思い出", hiragana: "おもいで", meaning: "Kỷ niệm khó quên", topic: "4. Bài văn về người bạn yêu thích" },
  { jp: "大切な人", hiragana: "たいせつなひと", meaning: "Người quan trọng trong cuộc đời", topic: "4. Bài văn về người bạn yêu thích" },
  { jp: "一緒に過ごす", hiragana: "いっしょにすごす", meaning: "Cùng nhau trải qua những tháng ngày", topic: "4. Bài văn về người bạn yêu thích" },
  { jp: "大学時代", hiragana: "だいがくじだい", meaning: "Thời sinh viên đại học", topic: "4. Bài văn về người bạn yêu thích" },
];

// ==========================================
// PHẦN V — NHỮNG ĐIỂM DỄ SAI KHI THI JLPT N4/N3
// ==========================================
export const reviewExamPitfalls = [
  {
    ruleNumber: 1,
    title: "Học động từ luôn đi kèm với trợ từ",
    summary: "Đừng học động từ rời rạc; luôn học cả cụm trợ từ đi liền để không bị đánh lừa trong bài thi.",
    bullets: [
      "慣れる → に慣れる (không dùng を)",
      "借りる → に／から借りる (nhận mượn từ ai)",
      "貸す → に貸す (cho ai mượn)",
      "入学する → 学校に入学する",
      "勤める → 会社に勤める",
    ],
  },
  {
    ruleNumber: 2,
    title: "Phân biệt chính xác các thể động từ",
    summary: "Nhớ kỹ các biến thể đuôi để tránh nhầm giữa thể khả năng và phủ định thường.",
    bullets: [
      "書く → 書ける: viết → có thể viết (khả năng)",
      "書けない → 書けなくて: không thể viết → dạng nối câu",
      "書かない → 書かなくて: không viết → dạng nối câu",
      "書いた → 書いたばかり: vừa mới viết xong gần đây",
    ],
  },
  {
    ruleNumber: 3,
    title: "Bổ nghĩa danh từ & phân biệt Tính từ/Phó từ",
    summary: "Tính từ Na cần giữ 'な' khi bổ nghĩa cho danh từ, dùng 'に' khi bổ nghĩa cho động từ.",
    bullets: [
      "幸せな人 (người hạnh phúc - giữ な)",
      "料理が上手な人 (người nấu ăn giỏi - giữ な)",
      "歌手のような声 (giọng hát giống ca sĩ - ような + N)",
      "歌手のように歌う (hát như ca sĩ - ように + V)",
    ],
  },
  {
    ruleNumber: 4,
    title: "Phân biệt bản chất và sắc thái của câu",
    summary: "Chú ý mục đích và cảm xúc người nói để không nhầm các mẫu câu nguyên nhân - nhượng bộ.",
    bullets: [
      "～のに: mặc dù... nhưng... (thể hiện sự tiếc nuối, bất ngờ)",
      "～ので／～から: vì... nên... (giải thích lý do)",
      "～ても: dù... vẫn... (nhượng bộ giả định)",
      "～ために: để đạt mục đích chủ động",
      "～ように: để trạng thái / khả năng diễn ra",
    ],
  },
  {
    ruleNumber: 5,
    title: "Đừng chỉ dịch từng từ rời rạc",
    summary: "Ví dụ: cả '借りました' và '貸しました' đều có thể đi với '弟に'. Muốn chọn đúng phải phân tích ai là chủ ngữ, ai nhận tiền/sách và ai đưa ra hành động.",
    bullets: [
      "弟に本を借りました: Tôi mượn sách của em trai (Tôi nhận sách).",
      "弟に本を貸しました: Tôi cho em trai mượn sách (Em trai nhận sách).",
    ],
  },
];

// ==========================================
// PHẦN VI — DANH SÁCH ÔN TẬP ƯU TIÊN (8 Nhóm Checklist)
// ==========================================
export const reviewChecklistGroups: ReviewChecklistGroup[] = [
  {
    id: 1,
    title: "Nhóm 1 — Trợ từ và động từ",
    subtitle: "Nắm vững trợ từ và tự/tha động từ",
    keyPoints: ["は・が・を・に・で・から", "借りる・貸す・慣れる", "Tự động từ và tha động từ (減る/減らす, 増える/増やす)"],
    description: "Ôn tập các cặp trợ từ đối chiếu và các động từ đi với trợ từ đặc thù.",
  },
  {
    id: 2,
    title: "Nhóm 2 — Điều kiện và nguyên nhân",
    subtitle: "Phân biệt 4 mẫu điều kiện và liên từ nguyên nhân",
    keyPoints: ["～と・～ば・～たら・～なら", "～から・～ので・～のに・～ても", "Phân biệt 天気がよければ vs 天気はよければ"],
    description: "Nhớ rõ quy tắc dùng と cho tự nhiên, ば cho giả định, たら thông dụng, なら cho lời khuyên.",
  },
  {
    id: 3,
    title: "Nhóm 3 — Thể động từ",
    subtitle: "Khả năng, bị động, sai khiến và phủ định",
    keyPoints: ["Thể khả năng, bị động, sai khiến, sai khiến bị động", "～なくて vs ～ないで", "書けなくて vs 書かなくて"],
    description: "Luyện chuyển đổi nhanh thể bị động và sai khiến bị động trong đề thi.",
  },
  {
    id: 4,
    title: "Nhóm 4 — Trạng thái và thời gian",
    subtitle: "Các mẫu diễn tả quá trình hành động",
    keyPoints: ["～ている・～てある・～ておく", "～ところ・～たばかり・～たまま", "Phân biệt たところ (vừa xong) vs たばかり (mới gần đây)"],
    description: "Ghi nhớ trạng thái có chủ đích てある và chuẩn bị trước ておく.",
  },
  {
    id: 5,
    title: "Nhóm 5 — Dự định và mục đích",
    subtitle: "Biểu đạt ý định và thói quen",
    keyPoints: ["～つもり・～予定", "～ために vs ～ように", "～ことにする (tự quyết) vs ～ことになる (ngoại cảnh)"],
    description: "Phân biệt mục đích ý chí ために và trạng thái/khả năng ように.",
  },
  {
    id: 6,
    title: "Nhóm 6 — Kính ngữ & Khiêm nhường ngữ",
    subtitle: "Động từ đặc biệt và mẫu お/ご...になる",
    keyPoints: ["いらっしゃる・おっしゃる・召し上がる・ご覧になる", "伺う・参る・申す・拝見する", "Luyện câu hỏi lịch sự với Tanaka-sensei"],
    description: "Tập phản xạ khi nào dùng kính ngữ nâng đối phương, khi nào dùng khiêm nhường hạ mình.",
  },
  {
    id: 7,
    title: "Nhóm 7 — Từ vựng cốt lõi",
    subtitle: "Từ vựng theo cặp, trạng từ và đề thi N3",
    keyPoints: ["Động từ theo cặp (giấu/trốn, tăng/giảm, mượn/cho mượn)", "Trạng từ (ぐっすり, そろそろ, 一応, ようやく)", "Từ N3 đề 12/2024 (怪しい, 検討する, 配る, 勤める)"],
    description: "Học từ vựng gắn liền với câu văn và ngữ cảnh thay vì học từ đơn lẻ.",
  },
  {
    id: 8,
    title: "Nhóm 8 — Luyện đọc và viết",
    subtitle: "Ôn lại 13 câu sai và 4 bài văn biểu đạt",
    keyPoints: ["Ôn kỹ 13 câu từng viết sai và lời giải thích", "Luyện viết tự giới thiệu và điểm mạnh nhóm", "Bài văn về Quy Nhơn, ước mơ và người bạn thân"],
    description: "Áp dụng toàn bộ kiến thức vào viết câu tự nhiên và thực hành phản xạ nói/viết.",
  },
];

export const reviewStudyAdvice = `Lời khuyên: Với lượng kiến thức bạn đã học, đừng cố học thuộc toàn bộ danh sách trong một lần. Hãy học theo cụm động từ + trợ từ, tự đặt câu và ôn lại những câu từng sai. Với phần từ vựng N3, cần kiểm tra thêm theo đề cụ thể vì danh sách trên gồm các từ đã được ghi nhận trong những lần luyện trước.`;
