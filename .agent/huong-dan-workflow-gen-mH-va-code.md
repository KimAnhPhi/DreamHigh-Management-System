# Hướng dẫn workflow: từ Design System (Stitch) → layout → MH chi tiết → code React / React Native

Tài liệu này mô tả **thứ tự bước**, **skill Cursor cần gọi**, **đầu vào / đầu ra**, và **cách kiểm thử** khi team muốn gen màn hình (MH) rồi chuyển sang code web hoặc mobile.

**Vị trí:** `.cursor/huong-dan-workflow-gen-mH-va-code.md`

---

## Tổng quan pipeline

```text
[1] Skill prompt DS/BG → Stitch gen Design System (+ logo)
         ↓
[2] Tải / lưu artifact DS vào thư mục dự án
         ↓
[3] Skill prompt layout (shell + nav, main trống) → tool AI thiết kế khung app
         ↓
[4] Skill prompt MH chi tiết (theo cụm CRUD + ERD) → tool AI gen từng vùng nội dung MH
         ↓
[5] Skill HTML → React (web) hoặc HTML → React Native (mobile) — gen theo từng MH hoặc theo lô có giới hạn
         ↓
[6] Chạy app / test — xem mục "Kiểm thử & xem kết quả"
```

---

## Bước 1 — Gen Design System bằng Stitch (dùng skill `ba-ds-bg-tool-prompt-gen`)

### Cách làm

1. Trong Cursor, **mô tả yêu cầu** và yêu cầu agent chạy skill **`ba-ds-bg-tool-prompt-gen`** (Prompt cho tool gen thiết kế — Design System & Brand Guideline).
2. Agent sẽ sinh file prompt Markdown, thường có dạng:
   - `Prototype/Prompt/prompt-ds-bg_[brand]_[tool]_YYYYMMDD.md`
   - hoặc tách `*_foundations.md` / `*_components.md` nếu prompt quá dài.

### Đầu vào cần chuẩn bị (tối thiểu)

- Tên brand / sản phẩm
- Loại đầu ra: `design-system` và/hoặc `brand-guideline`
- Công cụ đích: **Stitch** (ghi rõ trong prompt)
- Nền tảng: Web / Mobile / cả hai
- Brief ngắn (personality, đối tượng, ngành), màu/font nếu có

### Đầu ra

- **Một (hoặc vài) file `.md`**: copy **toàn bộ** nội dung → dán vào **Google Stitch** (hoặc tool đã ghi trong prompt).

### Logo và brand

- **Bắt buộc** đính kèm / upload **logo** (và nếu có: file brand ngắn) vào Stitch khi chạy prompt, hoặc nhắc trong prompt rõ ràng: *dùng logo đã upload, safe zone, nền sáng/tối*.
- Nếu Stitch cho phép “reference image”, dùng logo làm reference để màu và component đồng bộ thương hiệu.

### Sau khi Stitch gen xong

- **Tải** export mà Stitch cung cấp (tuỳ Stitch: PDF, hình, hoặc file thiết kế — giữ đúng định dạng team quy ước).
- **Lưu vào dự án**, ví dụ:
  - `docs-BA/Prototype/Design system/`
  - hoặc `Prototype/Design system/`
- Mục đích: dev/BA/AI sau này **tham chiếu** token, màu, component; đồng bộ với bước code (tokens) nếu dùng thêm skill đồng bộ thiết kế khi có.

---

## Bước 2 — Gen layout app (khung + điều hướng, main trống): skill `ba-mockup-prompt-gen_layout`

### Khi nào dùng

- Cần **một prompt duy nhất**: app shell (header/sidebar/tab…) + **menu điều hướng**, **vùng main để trống** — không gen nội dung từng MH ở đây.

### Cách dùng

1. Trong Cursor, cung cấp đủ **4 input bắt buộc** (thiếu thì agent sẽ hỏi):
   - Tên app
   - Platform: Web / Mobile / cả hai
   - Đối tượng người dùng
   - **Danh sách tính năng** (tên từng mục, đủ để dựng menu) — **nên đính kèm hoặc dán** danh sách **Use Case (UC)** đã được sinh ra từ **workflow tạo PRD** (PRD / epic–story / file UC list trong repo) để menu shell khớp phạm vi sản phẩm đã thống nhất
2. Yêu cầu agent chạy skill **`ba-mockup-prompt-gen_layout`**.

### Đầu ra

- File: `docs-BA/Prototype/Prompt/prompt-shell_[tên-app]_[YYYYMMDD].md` (hoặc `Prototype/Prompt/...` nếu repo không dùng `docs-BA/`).
- **Cách dùng file**: mở file → **copy toàn bộ** → dán vào **Stitch** (hoặc công cụ AI thiết kế đã chọn).
- Kết quả mong đợi trên tool: **khung app + nhãn tiếng Việt + main trống** (theo quy tắc trong skill — tránh demo giả ở giữa màn hình).

### Gợi ý

- **UC ↔ layout:** Input “danh sách tính năng” lấy trực tiếp từ **UC list** sau bước PRD (hoặc skill `ba-usecase-list-gen` nếu team tách bước) — tránh tự nghĩ thêm mục menu không có trong phạm vi đã sign-off.
- Nếu đã có file Design System ở bước 1: khi paste vào Stitch, **đính kèm/link** tới artifact DS hoặc mô tả “tuân theo DS đã gen” để màu/component nhất quán.

---

## Bước 3 — Gen MH chi tiết (theo cụm CRUD, đầu vào ERD): skill `ba-mockup-prompt-gen_detail`

### Khi nào dùng

- Đã có **layout/shell** (bước 2).
- Cần gen **nội dung từng MH** — đặc biệt nên gom theo **cụm CRUD** (vd. một entity: Danh sách → Chi tiết → Tạo/Sửa → Xác nhận xóa) để luồng nghiệp vụ và màn hình khớp nhau.

### Đầu vào bắt buộc (thiếu → dừng và bổ sung)

1. **ERD** hoặc mô tả dữ liệu đủ field cho các MH cần gen
2. **Danh sách chức năng / phạm vi cần gen** — liệt kê các nhóm chức năng hoặc luồng nghiệp vụ tương ứng cần có MH (có thể lấy từ UC/PRD). **Không cần** gõ sẵn từng tên màn: nhờ **Agent trong Cursor** đọc **ERD + phạm vi chức năng** để **tự đề xuất danh sách MH** (thường bám cụm CRUD và quan hệ entity). Sau khi **chốt** tên từng MH, mới gen file prompt cho skill `ba-mockup-prompt-gen_detail` (skill vẫn yêu cầu danh sách MH đã rõ ràng trong file đầu ra).
3. **Tên công cụ AI thiết kế** `[AI_TOOL]` (vd. Stitch)

### Đầu ra

- **Một file** `docs-BA/Prototype/Prompt/prompt-mh-detail_[tên-app]_[YYYYMMDD].md`
- Nội dung là **prompt thuần nghiệp vụ + data**: **không** nhúng Brand Guideline / màu font spacing ép trong file (theo đúng skill — tool tự quyết layout trong **vùng nội dung MH**).
- **Cách dùng**: copy **toàn bộ** file → dán vào Stitch (hoặc `[AI_TOOL]`).

### Gợi ý tổ chức CRUD

- Khi Agent đề xuất MH từ ERD, thường gom theo thứ tự: **List → Detail → Create/Edit → Delete confirm** (tuỳ domain).
- Trong ERD, ghi rõ PK/FK, enum, nullable — skill sẽ map vào bảng field từng MH.

---

## Bước 4 — Gen code từ HTML prototype: React Native (mobile) hoặc React (web)

### Skill tương ứng

| Mục tiêu | Skill |
|----------|--------|
| **Mobile (Expo / React Native)** | `ba-html-to-react-native-ds-code-gen` |
| **Web (React + Tailwind)** | `ba-html-to-react-ds-code-gen` |

### Đầu vào

- **HTML** của từng MH (từ export Stitch hoặc “View code / HTML” nếu tool cung cấp).
- Yêu cầu rõ: *convert sang React Native* hoặc *React + Tailwind*, tuân **Design Tokens** / DS trong repo (nếu đã có thư mục tokens).

### Khi có quá nhiều MH

- **Không** nhồi hết một lần nếu dễ vượt context hoặc khó review.
- Nên **chỉ định rõ**: “Gen MH [tên MH]” hoặc “Gen cụm CRUD [Tên entity] gồm các MH: …”.
- Làm **lặp theo từng MH** hoặc **theo cụm nhỏ**; sau mỗi cụm, chạy app và kiểm tra navigation.

### Đảm bảo luồng (click đi đâu → màn nào)

- Khi paste HTML vào Cursor, thêm yêu cầu: **mô tả navigation** — map nút/link → màn đích (hoặc `href` / `data-*` để dev nối router sau).
- Hoặc: **gen từng MH đơn lẻ** — trên Stitch (hoặc tool), **mở từng màn**, copy HTML của **đúng màn đó** vào chat và ra lệnh: *“Convert MH X sang RN/React, giữ luồng đi tới MH Y khi bấm [nhãn nút]”*.

---

## Bước 5 — Kiểm thử và xem kết quả cuối

Sau khi có code trong repo, trong Cursor có thể hỏi trực tiếp:

- *“Dự án này chạy local bằng lệnh gì? Cách mở trên trình duyệt / Expo Go?”*
- *“Cách chạy test (unit/e2e) nếu có?”*

Agent sẽ đọc `package.json`, `README`, cấu hình Expo/Vite/Next và đưa **lệnh cụ thể** (ví dụ: `npm run dev`, `npx expo start`, profile tunnel nếu team đang dùng).

**Gợi ý thực tế**

- **Web**: thường `npm install` (lần đầu) → `npm run dev` → mở URL localhost trong trình duyệt.
- **Expo**: `npx expo start` → quét QR bằng Expo Go (cùng mạng) hoặc emulator.
- Nếu repo **chưa có** script: nhờ agent tạo/README hoặc thêm script vào `package.json` theo stack đang dùng.

---

## Bảng tra skill nhanh

| Bước | Skill Cursor | File / artifact điển hình |
|------|----------------|-----------------------------|
| DS/BG cho tool thiết kế | `ba-ds-bg-tool-prompt-gen` | `prompt-ds-bg_*.md` → Stitch (+ logo) |
| Lưu DS sau Stitch | *(thủ công)* | `docs-BA/Prototype/Design system/` |
| Layout shell + nav | `ba-mockup-prompt-gen_layout` | `prompt-shell_*.md` → Stitch |
| MH chi tiết (chức năng + ERD → đề xuất MH, CRUD) | `ba-mockup-prompt-gen_detail` | `prompt-mh-detail_*.md` → Stitch |
| Code web | `ba-html-to-react-ds-code-gen` | Component/page trong repo React |
| Code mobile | `ba-html-to-react-native-ds-code-gen` | Screen/component trong repo Expo/RN |

---

## Lưu ý cuối

- **Logo**: luôn đưa vào bước Stitch (DS và/hoặc layout) để không bị lệch nhận diện.
- **Chiến lược MH đông**: ưu tiên **cụm CRUD + ERD** rõ ràng, gen và code **theo lô nhỏ**, mỗi lô có thể chạy được trên app.
- Nếu đã có **Brand Guideline** đầy đủ và cần prompt **từng màn khớp token từng file BG**, pipeline nâng cao dùng skill **`ba-mockup-prompt-gen`** (khác với chỉ layout hoặc chỉ detail thuần data) — trao đổi với team khi cần độ khớp design cao.
