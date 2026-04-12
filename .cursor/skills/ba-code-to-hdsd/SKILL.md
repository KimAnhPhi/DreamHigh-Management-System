---
name: code-to-hdsd
description: >
  Viết HDSD cho end user từ FE (pages/screens) + BE (service) + PRD tuỳ chọn: trace UI → API →
  service, gom biz rules. Cấu trúc: Tổng quan hệ thống; quy trình (bảng Actor); danh sách app +
  chức năng; đặc tả từng tính năng (bước + quy định nghiệp vụ). Xuất .md / .docx / PDF.
  Trigger: viết HDSD từ code, hướng dẫn sử dụng, user manual, tài liệu cho người dùng, FE+BE.
---

Version: 1.1.2  
Author: M2MBA  
Last Updated: 2026-04-11  
Description: Viết HDSD (Tổng quan + 3 lớp) từ FE+BE+PRD (tuỳ chọn), xuất .md/.docx/.pdf; `.cursor/scripts/md_to_docx.py`.

# Skill: Viết HDSD từ FE + BE Source Code

## Kiến trúc output — Tổng quan + 3 lớp

```
INPUT
├── FE source (1 hoặc nhiều repo — mỗi repo = 1 ứng dụng)
├── BE source (service layer)
└── PRD (tuỳ chọn)
         ↓
[MỞ ĐẦU] TỔNG QUAN HỆ THỐNG
         Giới thiệu | Mục tiêu | Phạm vi | Đối tượng sử dụng (ngôn ngữ nghiệp vụ)
         ↓
[LỚP 1] QUY TRÌNH NGHIỆP VỤ
         Bảng: STT | Ai (Actor) | Làm gì (tên chức năng)
         ↓
[LỚP 2A] DANH SÁCH ỨNG DỤNG
         Bảng: Tên ứng dụng | Mô tả ý nghĩa
         ↓
[LỚP 2B] DANH SÁCH CHỨC NĂNG
         Bảng: (Ứng dụng*) | Actor | Tên chức năng | Ý nghĩa  (*bỏ cột khi chỉ 1 FE)
         ↓
[LỚP 3] ĐẶC TẢ TỪNG TÍNH NĂNG
         Tên | Ý nghĩa | Người dùng | Các bước | Quy định nghiệp vụ
```

---

## Đường dẫn & môi trường (Cursor / workspace)

- **Input**: Dùng đường dẫn **tương đối trong workspace** mà user đính kèm hoặc chỉ rõ (ví dụ `apps/web/`, `backend/src/`) — không giả định thư mục cố định kiểu `/mnt/...`.
- **Output mặc định gợi ý**: `docs-BA/hdsd/ba-hdsd-[ten-he-thong].md` (hoặc `.docx` / `.pdf` nếu user chọn). Nếu user chỉ folder khác → tuân theo.
- **Bảo mật**: Không chép API key, secret, token, PII thật từ code/env vào HDSD; diễn đạt nghiệp vụ, không paste credential.

---

## BƯỚC 0 — Xác định & đọc input

### 0.1 Kiểm tra input

- [ ] **FE source**: 1 hoặc nhiều repo/folder — mỗi folder riêng = 1 ứng dụng
- [ ] **BE source**: thư mục `services/`, `use-cases/`, `handlers/`, `domain/` (tuỳ stack)
- [ ] **PRD**: file trong workspace hoặc paste text (tuỳ chọn)
- [ ] **Output format**: Word / Markdown / PDF — **hỏi user nếu chưa nói** (không tự chọn format)

**Khảo sát cấu trúc** (chọn cách phù hợp OS — ưu tiên công cụ trong Cursor):

- Liệt kê file: Explorer, hoặc `Glob` / `SemanticSearch`, hoặc terminal: PowerShell `Get-ChildItem -Recurse -File | Select-Object -First 200 FullName`, hoặc `rg --files` nếu có.

### 0.2 Xác định danh sách ứng dụng (FE)

Mỗi FE repo/folder riêng biệt = 1 ứng dụng. Nhận diện qua:

- Tên folder: `admin-portal/`, `customer-app/`, `mobile/`
- `package.json` → field `name`, `description`
- `README.md` → mô tả ứng dụng

Đọc `package.json` bằng Read tool hoặc:

```bash
# ví dụ — thay <path-fe> bằng đường dẫn thật trong workspace
rg '"name"|"description"' <path-fe>/package.json
```

> Nếu có PRD → ưu tiên tên ứng dụng từ PRD; dùng tên folder/package.json làm fallback.

### 0.3 Đọc PRD nếu có

- `.md` / `.txt`: Read tool trực tiếp.
- `.docx` / `.pdf`: nếu môi trường có `pandoc` / `pdftotext` thì convert sang text để đọc; nếu không → yêu cầu user paste phần liên quan hoặc cung cấp bản `.md`.

Trích từ PRD: **tên Actor** (nhóm người dùng ngoài đời thực), **tên ứng dụng**, **quy trình nghiệp vụ**, **business rules**.

> **Actor** = nhóm người dùng thực tế: "Nhân viên bán hàng", "Quản lý kho", "Khách hàng"  
> — KHÔNG phải role kỹ thuật như `ROLE_ADMIN`, `user.role === 'MANAGER'`

---

## BƯỚC 1 — Đọc FE pages & lập bảng nội bộ

### 1.1 Ưu tiên đọc theo thứ tự

1. **Định tuyến / cấu trúc màn hình** — một trong các dạng:
   - Vue/React Router: `src/router/*`, `routes.tsx`
   - Next.js App Router: `app/**/page.tsx`, `layout.tsx`
   - Next.js Pages Router: `pages/**/*.tsx`
2. **Từng màn hình** theo thứ tự nghiệp vụ (đọc file bằng Read / grep trong workspace).

```bash
# Ví dụ tìm route — thay <fe-root> bằng đường dẫn FE trong workspace
rg -n "path:|Route|createBrowserRouter" <fe-root>/src
```

### 1.2 Từ mỗi page, nhận diện

| Tìm gì | Dấu hiệu |
|--------|----------|
| **Tên chức năng** | Tiêu đề trang `<h1>`, breadcrumb, tên button hành động chính |
| **Actor** | Điều kiện hiển thị theo role → map sang tên người dùng thực tế |
| **Các bước UI** | Form steps, button sequence, confirmation dialog, wizard |
| **API calls** | `axios.post(...)`, `fetch(...)`, `apiService.xxx()`, `useQuery(...)`, server actions |

### 1.3 Bảng nội bộ FE → API (không xuất ra output)

| Ứng dụng | Page | Tên chức năng | Actor | API call | BE service |
|----------|------|--------------|-------|----------|------------|
| Admin Portal | `OrderApprove.tsx` | Duyệt đơn hàng | Quản lý | `POST /api/orders/:id/approve` | `OrderService.approve()` |

---

## BƯỚC 2 — Đọc BE & trích xuất biz rules

### 2.1 Trace endpoint → controller → service

```bash
# Từ URL hoặc tên thao tác — thay <be-root>
rg -n "orders/approve|approve|@Post" <be-root>
```

Đọc service / use-case tương ứng (ưu tiên lớp chứa điều kiện nghiệp vụ, không chỉ DTO validate).

### 2.2 Nhận diện biz rules trong service layer

**LÀ biz rule — đưa vào Quy định:**

```typescript
if (order.status !== 'PENDING') throw ...        // ràng buộc trạng thái
if (!user.hasRole('MANAGER')) throw ...           // phân quyền
if (order.items.length === 0) throw ...           // điều kiện nghiệp vụ
if (stock.quantity < requestedQty) throw ...      // ràng buộc dữ liệu thực tế
if (invoice.isPaid) throw ...                     // trạng thái không cho phép
if (order.createdBy !== currentUser.id) throw ... // ownership
if (totalValue > 10_000_000) requireApproval()    // ngưỡng nghiệp vụ
```

**KHÔNG phải biz rule — bỏ qua:**

```typescript
if (!isEmail(dto.email)) throw ...         // format
if (dto.phone.length !== 10) throw ...     // format
if (dto.password.length < 8) throw ...     // format
if (isNaN(dto.quantity)) throw ...         // format
if (!dto.name || dto.name === '') throw ... // required field
```

> **Ranh giới:** Biz rule = phụ thuộc **trạng thái / role / ràng buộc nghiệp vụ** — không thể biết chỉ nhìn vào input. Format = chỉ nhìn hình thức input là biết.

**Prisma / BE trong project:** Ưu tiên Prisma Client API; nếu đọc raw query, tuân workspace rules (không đoán cột động, không lộ chi tiết lỗi DB trong HDSD).

### 2.3 Chuyển biz rule → ngôn ngữ nghiệp vụ

| Code (BE service) | Viết trong HDSD |
|-------------------|-----------------|
| `order.status !== 'PENDING'` | "Chỉ có thể duyệt đơn hàng ở trạng thái **Chờ duyệt**" |
| `!user.hasRole('MANAGER')` | "Chỉ **Quản lý** mới có quyền thực hiện" |
| `order.items.length === 0` | "Phải có ít nhất 1 sản phẩm trước khi gửi đơn" |
| `stock.quantity < requestedQty` | "Số lượng xuất không được vượt quá tồn kho hiện có" |
| `invoice.isPaid` | "Không thể chỉnh sửa hóa đơn đã thanh toán" |
| `order.createdBy !== currentUser.id` | "Chỉ người tạo mới có thể thực hiện thao tác này" |
| `totalValue > 10_000_000` | "Đơn hàng trên 10 triệu cần **Kế toán** phê duyệt" |

### 2.4 Merge biz rules FE + BE

Lấy **union** của cả 2 nguồn, ưu tiên diễn đạt từ BE message. Loại bỏ duplicate.

---

## BƯỚC 3 — Soạn nội dung output

### Phần mở đầu: Tổng quan hệ thống

Đặt **trước LỚP 1** trong file HDSD — giúp người đọc hiểu bối cảnh trước khi vào quy trình và chức năng.

**Nội dung đề xuất** (chỉ viết mục nào **có căn cứ** từ PRD, README, tài liệu dự án, hoặc mô tả rõ trong code/repo; không bịa mục tiêu/phạm vi chung chung):

| Khối | Gợi ý nội dung | Nguồn ưu tiên |
|------|----------------|---------------|
| **Hệ thống là gì** | 1–2 đoạn: hệ thống phục vụ việc gì, trong bối cảnh nào | PRD, README, `package.json` description |
| **Mục tiêu / giá trị mang lại** | Vì sao dùng hệ thống; kết quả mong đợi cho tổ chức hoặc người dùng | PRD phần mục tiêu, vision |
| **Phạm vi (đại ý)** | Hệ thống quản lý / hỗ trợ những nhóm nghiệp vụ chính nào (không liệt kê kỹ thuật) | PRD scope, epic, cấu trúc module nghiệp vụ từ FE |
| **Đối tượng sử dụng** | Ai là người dùng chính (tên nghiệp vụ, không phải role code); có thể nói ngắn “chi tiết vai trò xem mục quy trình và danh sách chức năng bên dưới” | PRD actor, stakeholder |

> Thiếu tài liệu: có thể suy luận ngắn từ README + danh sách app FE + route, kèm **`[Suy diễn từ code — cần xác nhận]`**. Không điền số liệu, cam kết SLA hay mục tiêu cụ thể nếu không có nguồn.

### LỚP 1: Quy trình nghiệp vụ

Bảng mô tả luồng chính — Actor thực tế, không dùng role kỹ thuật:

```
| STT | Ai (Actor)          | Làm gì (Tên chức năng)              |
|-----|---------------------|--------------------------------------|
| 1   | Nhân viên bán hàng  | Tạo đơn hàng mới                    |
| 2   | Nhân viên bán hàng  | Gửi đơn hàng chờ duyệt              |
| 3   | Quản lý             | Duyệt / Từ chối đơn hàng            |
| 4   | Nhân viên bán hàng  | Theo dõi trạng thái đơn hàng        |
```

- Tên "Làm gì" phải **khớp chính xác** với tên tính năng ở LỚP 3
- Nhiều quy trình độc lập → tách nhiều bảng, mỗi bảng có tiêu đề quy trình

### LỚP 2A: Danh sách ứng dụng

Mỗi FE repo = 1 dòng trong bảng:

```
| Tên ứng dụng       | Mô tả ý nghĩa                                              |
|--------------------|------------------------------------------------------------|
| Cổng quản trị      | Dành cho nội bộ — quản lý đơn hàng, kho, báo cáo          |
| Ứng dụng khách hàng| Dành cho khách hàng — đặt hàng, theo dõi đơn, thanh toán  |
```

### LỚP 2B: Danh sách chức năng hệ thống

- **Nhiều FE app**: bảng 4 cột — `Ứng dụng | Actor | Tên chức năng | Ý nghĩa`
- **Chỉ 1 FE app**: bảng **3 cột** — `Actor | Tên chức năng | Ý nghĩa` (bỏ cột Ứng dụng)

Ví dụ (nhiều app):

```
| Ứng dụng            | Actor                  | Tên chức năng          | Ý nghĩa                              |
|---------------------|------------------------|------------------------|--------------------------------------|
| Cổng quản trị       | Nhân viên bán hàng     | Tạo đơn hàng mới       | Khởi tạo đơn hàng gửi nhà cung cấp  |
| Cổng quản trị       | Quản lý                | Duyệt đơn hàng         | Phê duyệt hoặc từ chối đơn hàng     |
| Ứng dụng khách hàng | Khách hàng             | Đặt hàng               | Chọn sản phẩm và gửi yêu cầu mua    |
```

**Quy tắc bảng 2B:**

- Sắp xếp theo (Ứng dụng nếu có) → Actor → Tên chức năng
- 1 chức năng có thể dùng bởi nhiều Actor → tách thành nhiều dòng
- Tên chức năng trong 2B phải **khớp chính xác** với LỚP 1 và LỚP 3
- Ý nghĩa: 1 câu ngắn, súc tích

### LỚP 3: Đặc tả từng tính năng

Template cố định — **không thêm, không bớt mục** (trừ khi bỏ hẳn mục Quy định khi không có rule):

```markdown
### [Tên chức năng]

**Ý nghĩa:** [1-2 câu mô tả chức năng dùng để làm gì]

**Người sử dụng:** [Actor(s)]

**Các bước thực hiện:**
1. [Bước 1 — hành động cụ thể trên UI]
2. [Bước 2]
3. ...

**Quy định cần tuân thủ:**
- [Biz rule — trạng thái, phân quyền, ràng buộc nghiệp vụ]
```

> Không có biz rule → bỏ hẳn mục "Quy định cần tuân thủ"  
> Quy định = biz rule only — không đưa validate format vào

---

## BƯỚC 4 — Xuất file

### Markdown (.md) — mặc định khuyến nghị

Lưu file vào workspace (đường dẫn tương đối), ví dụ `docs-BA/hdsd/ba-hdsd-[ten-he-thong].md`.

```markdown
# Hướng Dẫn Sử Dụng — [Tên Hệ Thống]
> Phiên bản: 1.0 | Cập nhật: [ngày]

## Mục lục
- [I. Tổng quan hệ thống](#i-tổng-quan-hệ-thống)
- [II. Quy trình nghiệp vụ](#ii-quy-trình-nghiệp-vụ)
- [III. Danh sách ứng dụng](#iii-danh-sách-ứng-dụng)
- [IV. Danh sách chức năng](#iv-danh-sách-chức-năng)
- [V. Hướng dẫn chi tiết](#v-hướng-dẫn-chi-tiết)

## I. Tổng quan hệ thống

**Hệ thống là gì:** [1–2 đoạn — theo PRD/README/repo]

**Mục tiêu / giá trị mang lại:** [bullet hoặc đoạn — theo tài liệu; không bịa số liệu]

**Phạm vi (đại ý):** [nhóm nghiệp vụ chính hệ thống phục vụ]

**Đối tượng sử dụng:** [nhóm người dùng nghiệp vụ; có thể ghi “Chi tiết vai trò và thao tác xem mục II–V.”]

## II. Quy trình nghiệp vụ
| STT | Ai | Làm gì |

## III. Danh sách ứng dụng
| Tên ứng dụng | Mô tả ý nghĩa |

## IV. Danh sách chức năng hệ thống
| (Ứng dụng — nếu >1 FE) | Actor | Tên chức năng | Ý nghĩa |

## V. Hướng dẫn chi tiết từng chức năng
### 1. [Tên chức năng]
...
```

### Word (.docx)

**Ưu tiên — script dự án** (Markdown → `.docx`, `python-docx`, bảng + heading + **bold** / link):

- Đường dẫn tương đối: [`.cursor/scripts/md_to_docx.py`](.cursor/scripts/md_to_docx.py)
- Chạy từ **thư mục gốc workspace** (chỉnh lại đường dẫn input/output cho đúng file của bạn):

```bash
py .cursor/scripts/md_to_docx.py docs-BA/hdsd/ba-hdsd-[ten-he-thong].md docs-BA/hdsd/ba-hdsd-[ten-he-thong].docx
```

> Đóng file `.docx` trong Word trước khi ghi đè. Script tự cài `python-docx` nếu thiếu.  
> Giới hạn: header bảng không tô màu thương hiệu; dòng `1.` trong Markdown xuất như đoạn văn (vẫn đủ dùng cho HDSD). Cần bố cục Word nâng cao → Pandoc hoặc `.cursor/skills/ba-ui-spec/scripts/export_ui_spec_to_docx.py`.

- **Dự phòng**: `pandoc … -o …docx` nếu máy có Pandoc.

### PDF

Tạo `.docx` trước, sau đó mở bằng Word/LibreOffice **Export PDF**, hoặc dùng `soffice --headless --convert-to pdf` nếu đã cài LibreOffice.

---

## BƯỚC 5 — Giao kết quả

- File nằm trong workspace tại đường dẫn đã ghi (ưu tiên **đường dẫn tương đối** so với root repo).
- Trong tin nhắn trả lời user: nêu rõ **đường dẫn file**, **số ứng dụng FE**, **số chức năng** (LỚP 2B / LỚP 3), và mọi chỗ có **`[Suy diễn — cần xác nhận]`** / **`[Chưa xác minh từ BE]`**.

---

## Xử lý tình huống đặc biệt

**Không tìm thấy BE service từ endpoint**  
→ `rg` rộng hơn theo resource name. Nếu vẫn không thấy: dùng biz rules từ FE, ghi `[Chưa xác minh từ BE]`.

**BE có nhiều layer** (controller → use-case → domain)  
→ Đọc tới service/use-case là đủ. Domain entity validation thường là format check — bỏ qua.

**Chỉ có 1 FE repo**  
→ LỚP 2A: 1 dòng. LỚP 2B: **3 cột** (Actor | Tên chức năng | Ý nghĩa). LỚP 1 / 3 giữ nguyên logic.

**Không có PRD**  
→ Suy diễn Actor từ role guards trong code, map sang tên thực tế hợp lý.  
→ Ghi `[Suy diễn từ code — cần xác nhận]` tại những điểm không chắc.

**Một page nhiều tab / sub-flow**  
→ Mỗi tab/sub-flow = 1 tính năng riêng trong LỚP 2B và LỚP 3.

---

## Checklist trước khi giao file

- [ ] **Tổng quan (mục I):** có căn cứ PRD/README/repo hoặc ghi rõ `[Suy diễn từ code — cần xác nhận]`; không bịa mục tiêu/số liệu
- [ ] LỚP 2A: mỗi FE repo/folder = 1 dòng ứng dụng
- [ ] LỚP 2B: **4 cột** nếu >1 FE; **3 cột** nếu chỉ 1 FE
- [ ] Tên chức năng nhất quán xuyên suốt LỚP 1 → 2B → LỚP 3
- [ ] Actor dùng tên người dùng thực tế — không phải role kỹ thuật
- [ ] Biz rules từ FE và BE đã được merge, không duplicate
- [ ] Quy định: KHÔNG có validate format
- [ ] Không còn tên biến, function, class kỹ thuật trong output
- [ ] Không lộ secret / PII từ codebase
- [ ] File đã lưu trong workspace; user biết đường dẫn tương đối
- [ ] Nếu user cần Word: đã chạy [`.cursor/scripts/md_to_docx.py`](.cursor/scripts/md_to_docx.py) (hoặc Pandoc) và báo đường dẫn `.docx`
