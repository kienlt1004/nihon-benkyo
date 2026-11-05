# Kế Hoạch Triển Khai: Tab Từ Vựng N3 Sou Matome, Đồng Bộ Firestore & Tối Ưu Responsive Mobile (iPhone 12+)

Kế hoạch xây dựng phân hệ học tập từ vựng N3 chuyên sâu theo giáo trình **Nihongo Sou Matome N3 Goi (総まとめ N3 語彙)** từ 14 trang tài liệu người dùng đã tải lên, tích hợp 3 chế độ học tập (Danh sách, Flashcard âm thanh, Quiz phản xạ), đồng bộ Cloud Firestore/Cronjob, và **đặc biệt tối ưu hóa trải nghiệm Responsive toàn diện cho màn hình di động từ iPhone 12 trở lên (chiều rộng 390px+, safe area padding, touch target $\ge 44\text{px}$)**.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> Các yêu cầu và quyết định đã được cập nhật theo phản hồi mới nhất của người dùng:

- **Confirmed Decision 1 (Điều hướng & Bố cục Mobile)**:
  - Tab độc lập **"Từ Vựng N3"** trên thanh điều hướng chính.
  - Trên iPhone 12+ (viewport từ 390px $\times$ 844px), thanh điều hướng hỗ trợ cuộn ngang mượt mà (`overflow-x-auto no-scrollbar`) hoặc menu mobile dropdown tinh gọn, không bị tràn viền hay vỡ dòng.
- **Confirmed Decision 2 (Tối ưu Responsive cho iPhone 12+)**:
  - Touch targets $\ge 44\text{px}$ cho tất cả các nút điều khiển, lật thẻ, chọn đáp án Quiz.
  - Tối ưu vùng chạm thao tác một tay (Thumb Zone) trên điện thoại di động: nút Next/Prev, nút phát âm loa to rõ, dễ bấm.
  - Thẻ Flashcard co giãn tỷ lệ linh hoạt (`aspect-[4/3]` trên mobile hoặc `min-h-[260px]`), cỡ chữ Kanji tự động thích ứng (`text-3xl` $\to$ `text-5xl`), không bị tràn chữ.
  - Hỗ trợ safe-area-inset cho thanh trạng thái tai thỏ / Dynamic Island và thanh điều hướng đáy của iOS.
- **Confirmed Decision 3 (Chế độ học tập phong phú)**:
  - Danh sách bài học theo Tuần/Ngày có bộ lọc cuộn ngang tiện lợi trên điện thoại.
  - Flashcard lật thẻ 3D phản hồi tức thì với Web Speech API `ja-JP`.
  - Quiz trắc nghiệm 4 lựa chọn dàn dọc 1 cột tối ưu trên iPhone, hiển thị kết quả trực quan.
- **Confirmed Decision 4 (Đồng bộ Firestore & Cronjob tự động)**:
  - Tạo collection `vocabulary_n3_soumatome` trên Cloud Firestore database `ai-studio-nihongon4vocab-fd5ad8c1-ca14-45f6-8619-a4844ba03736`.
  - Tự động tích hợp vào lịch trình chạy Cronjob của máy chủ.

---

### 1. Overview & Core Concept

- **Dữ liệu số hóa 100% từ 14 ảnh giáo trình Sou Matome N3**:
  - **Tuần 1 (第1週 家事 - Việc nhà)**:
    - *Ngày 1 (Nhà cửa)*: 居間, 屋上, 網戸, 天井, 床, じゅうたん, 部屋を暖める, エアコンのリモコン...
    - *Ngày 2 (Bếp núc & Dụng cụ)*: 炊事, 包丁, まな板, 大さじ, 小さじ, 酢, サラダ油, 天ぷら油...
    - *Ngày 3 (Nấu nướng & Chế biến)*: 煮る, 蒸す, 揚げる, 炒める, 茹でる, 味見, 焦げる, 煮える...
    - *Ngày 4 (Dọn dẹp & Rác)*: 掃除, 散らかす, 片付ける, 分別, 生ごみ, 燃えるごみ, 粗大ごみ...
    - *Ngày 5 (Giặt giũ & Quần áo)*: 洗濯, 干す, 縮む, 洗剤, 漂白剤, しわを伸ばす, 吊るす...
    - *Ngày 6 (Nuôi dạy con cái)*: 子育て, 育児, なでる, 抱く, 甘やかす, わがまま, 手を引く...
  - **Tuần 2 (第2週 外出 - Ra ngoài & Di chuyển)**:
    - *Ngày 1 (Kế hoạch & Thời gian)*: 計画を立てる, 日程, スケジュール, 日帰り, 宿泊, 変更...
    - *Ngày 2 (Du lịch & Vé tàu)*: 電車, 旅館, 温泉, 自由席, 指定席, 片道, 往復, 特急券...
    - *Ngày 3 (Đi tàu điện & Nhà ga)*: 電車に乗る, 自動券売機, 始発, 終電, 改札口, 乗り換え, 乗り遅れる...

---

### 2. User Experience & Responsive Design (iPhone 12+)

- **Quy chuẩn Responsive riêng cho iPhone 12+ (390px width trở lên)**:
  - **Header & Navbar**:
    - Sử dụng `px-4 py-3 sm:px-6`, các tab phân hệ cho phép lướt ngang bằng ngón tay (`flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none pb-1`).
    - Nút chuyển theme Dark/Light và nút Đồng bộ giữ vị trí gọn gàng, không che khuất nội dung.
  - **Bộ lọc Tuần & Ngày (Filter Chips)**:
    - Nút lọc Tuần 1, Tuần 2 và Ngày 1 $\to$ 6 hiển thị dạng hàng ngang lướt chạm nhẹ nhàng với nhãn tiếng Việt rõ ràng.
  - **Flashcard trên Mobile**:
    - Chiều cao linh hoạt `h-72 sm:h-80 md:h-96`, bo tròn chuẩn iOS (`rounded-2xl`).
    - Nút bấm lật thẻ, chuyển từ (Next/Prev) và nút phát âm âm thanh có diện tích chạm `min-h-[48px] min-w-[48px]`, bố trí tại nửa dưới màn hình để ngón tay cái dễ bấm nhất.
  - **Quiz trắc nghiệm trên Mobile**:
    - 4 đáp án chuyển từ lưới 2 cột trên desktop sang **1 cột dọc** trên iPhone 12, khoảng cách nút đủ lớn để tránh chạm nhầm.
  - **Bảng danh sách từ vựng**:
    - Hiển thị dạng danh thiếp card phẳng hoặc danh sách dòng gọn nhẹ với chữ Hán cỡ vừa, furigana Hiragana trên đầu và nghĩa tiếng Việt sắc nét.

---

### 3. Technical Architecture & Component Flow

```
┌────────────────────────────────────────────────────────────────────────┐
│             Responsive Navbar (iPhone 12+ Friendly, 390px+)            │
│  [Học Hán Tự]  [★ Từ Vựng N3 Sou Matome]  [Luyện Nghe]  [Đồng Bộ]       │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   N3VocabLearningView (Component)                      │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ Search & Mobile Stat Bar (Đã học / Tổng số từ / Thanh tìm kiếm)    │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ Week & Day Scroll Strip: [Tuần 1] [Tuần 2] · [Ngày 1 -> 6]         │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ Mode Switcher (Segmented Control): [Danh sách] [Flashcard] [Quiz]  │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│                                    │
│   ┌────────────────────────────────┼──────────────────────────────┐
│   ▼                                ▼                              ▼
│ [ListView (Mobile Card)]     [FlashcardView (iOS 3D)]        [QuizView]
│ - Thẻ từ vựng tối ưu 390px   - Tối ưu vùng chạm ngón cái     - Bố cục 1 cột iPhone
│ - Nghe phát âm ja-JP         - Phát âm Web Speech API        - Hiển thị giải thích
│ - Yêu thích & Ghi nhớ        - Next/Prev/Shuffle             - Chấm điểm phản xạ
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│               Data Model & Cloud Firestore Synchronization             │
│  - src/data/tuVungN3SouMatome.ts (~160+ từ vựng từ 14 ảnh)             │
│  - Firestore Collection: /vocabulary_n3_soumatome/{itemId}             │
│  - Backend Express Cronjob: /api/sync/trigger & /api/sync/cron-schedule│
└────────────────────────────────────────────────────────────────────────┘
```

---

### 4. Implementation Steps (To be executed upon Proceed)

1. **Số hóa toàn bộ từ vựng (`src/data/tuVungN3SouMatome.ts`)**:
   - Trích xuất toàn bộ hơn 160+ mục từ vựng, ngữ cảnh và ví dụ từ 14 ảnh giáo trình Sou Matome N3.
2. **Cấu hình Firestore Schema & Security Rules**:
   - Thêm quy tắc bảo mật cho `vocabulary_n3_soumatome` trong `firebase-blueprint.json` và `firestore.rules`.
   - Triển khai rules bằng công cụ `deploy_firebase`.
3. **Cập nhật Server Sync & Cronjob**:
   - Mở rộng `src/lib/serverSync.ts` và `src/lib/firestoreSync.ts` để đồng bộ dữ liệu `vocabulary_n3_soumatome`.
4. **Xây dựng Component `src/components/N3VocabLearningView.tsx`**:
   - Thiết kế chuẩn Responsive cho iPhone 12+ (390px) đến Desktop 1440px.
   - Hỗ trợ 3 chế độ học tập (Danh sách, Flashcard, Quiz) kèm phát âm giọng đọc tiếng Nhật chuẩn.
5. **Tích hợp vào `App.tsx` & `Navbar.tsx`**:
   - Cung cấp tab "Từ Vựng N3" độc lập trên thanh điều hướng với giao diện cuộn ngang hoặc dropdown thích ứng màn hình di động.
6. **Kiểm tra và biên dịch**:
   - Chạy `compile_applet` và `lint_applet` đồng thời để kiểm tra toàn bộ mã nguồn.
