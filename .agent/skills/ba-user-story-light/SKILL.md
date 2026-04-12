---
name: ba-user-story-light
description: "Tạo User Story rút gọn cho chức năng đơn giản từ ảnh màn hình hoặc code FE; tự phân tích API (Command/Query), rule validate + rule lấy dữ liệu, và tổng hợp AC đủ để dev/QA triển khai."
---

# BA User Story — Light (rút gọn)

**Version:** 1.4.0  
**Mục đích:** Một file User Story **ngắn, đủ triển khai/test** cho **chức năng đơn giản** (ít nhánh, ít màn, không cần full sequence/activity như bản đầy đủ).

**Không dùng skill này khi:** Epic phức tạp, nhiều luồng song song, nhiều hệ tích hợp, hoặc cần Sequence/Activity đầy đủ → dùng `ba-user-story-spec` hoặc workflow tương ứng.

---

## Khi nào kích hoạt skill

Kích hoạt khi user có ý định như:

- "US light"
- "đặc tả user story rút gọn"
- "tạo user story nhanh từ màn hình/code"
- "ba-user-story-light"

---

## Tham chiếu bắt buộc

| Nội dung | File |
|----------|------|
| Cách mô tả MH (khi đầu vào là ảnh/design): control, bảng 7/3 cột | `.cursor/skills/ba-ui-spec/SKILL.md` |
| Phân nhóm rule validate (BE) | `.cursor/skills/ba-activity-rule-spec/reference/validation-6-groups.md` |

Agent **phải đọc** hai nguồn trên khi thực thi skill (hoặc áp dụng đúng quy tắc đã được trích).

---

## Đầu vào

1. **Ảnh màn hình** và/hoặc **mô tả ngắn** chức năng.
2. **Hoặc mã nguồn FE** (component, page, route, `services/*`, store): **bắt buộc rà soát** route, service layer, params điều hướng, và các MH liên quan **một** User Story (theo tinh thần **Bước 0** trong `ba-ui-spec`).

**Nếu từ code phát hiện ≥2 luồng UI độc lập đáng tách:** **dừng gom một US light** — báo user và đề xuất tách theo `ba-ui-spec` (nhiều file) hoặc `ba-user-story-spec`.

---

## Quy trình (bắt buộc theo thứ tự)

1. **Actor / Làm gì / Vì sao** — suy từ ảnh hoặc code; nếu thiếu thông tin quan trọng thì hỏi ngắn gọn.
2. **Màn hình trong phạm vi US** — bảng STT + tên MH (user tự gắn ảnh nếu cần).
3. **Mô tả MH** — **phân nhánh đầu vào** (xem mục **“Màn hình: ảnh vs code FE”** bên dưới).
4. **Phân tích API (agent tự làm):** không chờ user liệt kê. Rà `fetch`/axios/service, env API base, body/query trong code; đối chiếu luồng màn. Lập **bảng phân tích API** (mục 3.5): gồm cột **Loại** `Command` (POST/PUT/PATCH/DELETE) hoặc `Query` (GET, list, search, export đọc dữ liệu...); endpoint, khi nào gọi, **request** (body và/hoặc **query/path**), header, màn/file gọi. Nếu màn chỉ UI/local (vd. TTS `expo-speech`): ghi **rõ dòng “không gọi API”**; vẫn **suy ra API cần có** nếu code chưa nối.
5. **Rule theo từng API** (mục 3.6):  
   - **API ghi (Command):** map field body/path → **6 nhóm** `validation-6-groups.md` (chỉ phần áp dụng được).  
   - **API truy vấn (Query):** **bắt buộc** nêu **rule cách lấy dữ liệu** — không chỉ ghi “gọi GET”. Xem mục **“API truy vấn: rule lấy data”** bên dưới.  
   - Validation thuần FE: ghi ở 3.6 hoặc nhóm “FE không map API”.
6. **Acceptance criteria (mục 4):** **tổng hợp** — không copy dài dòng 3.6; ưu tiên **scenario** (Given–When–Then) bao phủ hành vi + lỗi; rule trong 4.1 có thể là **bảng tóm tắt** + tham chiếu 3.6 để tránh trùng.

---

## Màn hình: ảnh vs code FE

| Đầu vào | Cách mô tả |
|---------|------------|
| **Ảnh / design** | Tuân `ba-ui-spec`: bảng 7 cột CUD / 3 cột Read khi cần đủ control để dev/test khớp UI. |
| **Code FE** | **Chỉ những gì cần để dev code / nối API / test:** file hoặc route, **state** (`useState`, store), **binding** control ↔ state, **validation** (FE), **điều kiện** enable/disable hoặc hiển thị, **điều hướng** và **params** truyền đi, **gap** (control chưa có handler, chưa truyền data sang màn sau). **Không** lập bảng cho tiêu đề, label cố định, tip chỉ đọc, mô tả option tĩnh — coi là đã có trong code. Màn **chỉ toàn nội dung tĩnh + một nút điều hướng:** **một đoạn văn** (vd. “chạm X → route Y”), **không** bảng control. |

---

## Cấu trúc đầu ra (bắt buộc)

Sinh **một** file Markdown (hoặc nội dung chat) theo đúng thứ tự các mục sau.

### 1. Mô tả chung

- **Là ai (Actor):** …
- **Tôi làm gì:** …
- **Vì sao (giá trị / mục tiêu):** …

### 2. Màn hình (user tự up ảnh nếu cần)

| STT | Tên màn hình / bối cảnh | Ảnh / file (user bổ sung) |
|-----|-------------------------|---------------------------|
| 1 | … | *(tùy chọn)* |

### 3. Mô tả màn hình (= phạm vi UI để triển khai)

- Ghi **đầu vào: ảnh** hoặc **code FE** và áp dụng bảng quy tắc ở mục **“Màn hình: ảnh vs code FE”**.
- Với **code FE:** có thể dùng **một bảng tối thiểu** cho **màn trọng tâm** (chỉ cột: vùng / state & hành vi / validation & điều kiện / gap) — **không** bắt buộc 7 cột đầy đủ nếu không phục vụ dev.

### 3.5 Bảng phân tích API (agent tự xác định)

Agent **tự rà code + luồng nghiệp vụ**, không chỉ ghi “chưa có API”.

| STT | Loại | API (method + path hoặc contract dự kiến) | Mục đích / khi gọi | Request: body / **query / path** / header | Nguồn trong code (file, màn) | Ghi chú |
|-----|------|-------------------------------------------|-------------------|-------------------------------------------|-------------------------------|--------|
| … | Command \| Query | … | … | … | … | … |

- **Query:** liệt đủ tham số truy vấn dự kiến (vd. `page`, `limit`, `q`, `status`, `from`, `to`, `sort`, `id` trên path).
- Có thể có dòng **“Không gọi HTTP”** cho hành vi cục bộ (TTS, cache…) trong phạm vi màn.
- Nếu contract chưa có: vẫn điền **payload/query dự kiến** và đánh dấu **dự kiến**.

### API truy vấn: rule lấy data (bắt buộc khi Loại = Query)

Với mỗi API **đọc / danh sách / tìm kiếm**, ngoài map nhóm 1–6 khi có (vd. **nhóm 2:** `id` trên path phải tồn tại và thuộc quyền user), **phải** làm rõ **cách lấy dữ liệu** — tối thiểu các khía cạnh sau (chỉ ghi phần có ý nghĩa với US):

| Khía cạnh | Nội dung cần nêu trong rule / 3.6 |
|-----------|-----------------------------------|
| **Tham số truy vấn** | Query/path nào bắt buộc / tùy chọn; kiểu & format (số, ISO date, enum); giá trị mặc định; giới hạn (max `limit`, khoảng ngày tối đa). |
| **Phạm vi & phân quyền** | Dữ liệu trả về giới hạn theo user / org / robot — khớp token hoặc `x-sender-id`; không lộ bản ghi người khác (thường gắn nhóm **2**, **4**). |
| **Lọc, sắp xếp, phân trang** | Cách filter; sort theo field nào, asc/desc; cursor vs offset; hành vi khi `page` vượt tổng (trả rỗng vs lỗi). |
| **Tìm kiếm full-text** | `q` tối thiểu bao nhiêu ký tự; có normalize / không phân biệt hoa thường (nếu cần test). |
| **Response dùng cho UI** | Trường nào map lên list/detail; empty list → UI hiển thị gì; có cần gọi thêm API chi tiết (theo `id`) không. |
| **Lỗi & biên** | 400 khi query không hợp lệ; 403 khi không được xem; 404 khi resource theo path không tồn tại. |

Có thể gộp vào **một bảng con** ngay dưới dòng API Query trong 3.6 (vd. cột “Rule lấy data” chi tiết) hoặc đoạn bullet — miễn **đủ để dev/QA biết “lấy data như thế nào”**.

### 3.6 Rule validate theo từng API (và FE liên quan)

**Theo từng API** (hoặc từng nhóm “FE-only”), lập bảng. Với **Query**, cột **Rule** gồm cả **validate tham số** + **cách lấy / phạm vi** (tham chiếu bảng trên).

| API hoặc nhóm | Field / tham số | Nhóm (1–6), “Query”, hoặc “FE” | Rule / điều kiện |
|----------------|-----------------|--------------------------------|------------------|
| `GET …/items` | `page`, `limit` | Query | `limit` ≤ max; `page` ≥ 1; mặc định … |
| `GET …/items/:id` | `id` (path) | 2 | Tồn tại; thuộc quyền user |
| `POST …` | `contentText` | 2, 4, 6 | … |
| FE | `message` | FE | max 250, bắt buộc khi submit |

- Nguồn nhóm 1–6: `validation-6-groups.md`.
- **Không** lặp cả 6 nhóm nếu không có việc.

### 4. Acceptance criteria (tổng hợp)

#### 4.1 Rule-based (tóm tắt)

- **Tổng hợp** từ 3.6: có thể gộp theo **nghiệp vụ** hoặc **màn**, tránh trùng nguyên văn 3.6 — có thể viết “**Chi tiết:** mục 3.6” cho phần BE.
- Bắt buộc thể hiện mối liên hệ **API ↔ field** (đã có ở 3.5–3.6).

#### 4.2 Scenario-based (Given – When – Then)

| ID | Given | When | Then |
|----|-------|------|------|
| AC-S01 | … | … | … |

- Ưu tiên scenario mô tả **hành vi người dùng + kết quả** (màn hình, thông báo, lỗi API).

---

## Quy tắc chất lượng

- **Thứ tự:** 3.5 (bảng API, phân biệt Command/Query) → 3.6 (rule theo API; Query có **rule lấy data**) → 4 (AC tổng hợp). Không viết rule BE “trên không” chưa gắn API/field/tham số truy vấn.
- **API Query:** không dừng ở “GET danh sách” — luôn có **quy tắc cách lấy** (param, phân trang, phạm vi, lỗi biên).
- **API:** agent **chủ động** suy ra từ service layer, route, và bước sau trong luồng (kể cả khi UI chưa gọi).
- **MH từ code:** tối giản — **đủ để dev code**, không sao chép UI tĩnh làm đặc tả.
- **Ngắn nhưng kiểm được:** scenario không trùng hết phần rule; rule chi tiết nằm 3.6, 4.1 chỉ tóm hoặc tham chiếu.
- **Tiếng Việt** rõ ràng.
- **Bảng Markdown:** header + `|---|---|` + mỗi dòng bắt đầu/kết thúc bằng `|`.
- Nếu thiếu dữ liệu khiến đặc tả mơ hồ, agent ghi rõ **Giả định** và **Thông tin cần xác nhận**.

### Ngôn ngữ nghiệp vụ (bắt buộc)

Mục tiêu: tài liệu để **PO/BA/QA/stakeholder đọc hiểu ngay**, không cần biết code.

- Viết theo mẫu: **Vai trò nghiệp vụ + hành động + kết quả mong đợi**.
- Ưu tiên từ nghiệp vụ: "người dùng tạo yêu cầu", "hệ thống ghi nhận", "kiểm tra điều kiện", "trả kết quả".
- Chỉ dùng từ kỹ thuật khi không thể tránh (API/field/status code), và phải gắn với ý nghĩa nghiệp vụ.
- Không mô tả theo cấu trúc code (hook, component nội bộ, store key, tên hàm) ở phần mô tả nghiệp vụ/AC.
- Nếu cần giữ dấu vết kỹ thuật để dev làm việc: đặt trong cột **Nguồn trong code** hoặc **Ghi chú kỹ thuật**; tách khỏi câu mô tả nghiệp vụ.

### Từ thay thế khuyến nghị

| Tránh dùng trực tiếp | Ưu tiên diễn đạt nghiệp vụ |
|---|---|
| gọi API `POST /...` | gửi yêu cầu tạo mới |
| validate payload | kiểm tra dữ liệu nhập hợp lệ |
| map field | đối chiếu thông tin theo quy tắc |
| response 200/400/403 | xử lý thành công / dữ liệu không hợp lệ / không có quyền |
| query param `page`, `limit` | số trang, số bản ghi mỗi trang |

### Cơ chế tự kiểm trước khi xuất (quality gate)

Trước khi trả kết quả, agent tự rà:

1. **Tỷ lệ nghiệp vụ:** mỗi mục chính (1, 3, 4) phải đọc hiểu được nếu ẩn toàn bộ code path.
2. **Từ khóa kỹ thuật rò rỉ:** nếu câu có >1 thuật ngữ kỹ thuật liên tiếp, viết lại theo ngôn ngữ nghiệp vụ.
3. **AC dễ test:** Given/When/Then mô tả hành vi quan sát được, không mô tả cách code nội bộ.
4. **Tách lớp rõ:** nội dung nghiệp vụ ở mô tả + AC; chi tiết kỹ thuật nằm 3.5/3.6 và cột ghi chú.

---

## Vị trí lưu file

1. **Mặc định (khi user không chỉ định path):** `docs-BA/User stories/`
2. **Cấu trúc (mặc định):** `docs-BA/User stories/<Epics>/User_Story_<Tên>_light_YYYYMMDD.md`  
   - **`<Epics>`:** tên epic hoặc module (vd. `Robot-Reminder`, `Auth`) — chọn theo ngữ cảnh US; **tạo thư mục nếu chưa có**.  
   - **`<Tên>`:** slug ngắn, không dấu hoặc dùng underscore (vd. `Tao_loi_nhac_TTS`).  
   - **`YYYYMMDD`:** ngày sinh file (theo ngày làm việc).  
   - *Tùy chọn:* có thể thêm cấp `docs-BA/User stories/<Epics>/<User_Story_ID>/...` khi cần nhóm nhiều tài liệu trong một US.
3. **Hành động agent:** sau khi soạn xong nội dung, **ghi file nếu user yêu cầu tạo/cập nhật file**; nếu user chỉ cần nội dung chat thì trả trực tiếp theo đúng template.

**Ví dụ:** `docs-BA/User stories/Robot-Reminder/User_Story_Tao_loi_nhac_TTS_light_20250323.md`

*(Nếu user chỉ định rõ path khác, ưu tiên theo user.)*

---

## Khởi động

User có thể gọi: **“US light”**, **“đặc tả user story rút gọn”**, **“ba-user-story-light”**, hoặc mô tả tương đương.
