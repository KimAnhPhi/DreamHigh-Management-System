# Bảng testcase — Stories 1.2, 1.3, 2.1, 2.2

**Nguồn:** `_bmad-output/implementation-artifacts/1-2-danh-muc-dao-tao.md`, `1-3-phan-quyen-rbac.md`, `2-1-ho-so-hoc-vien.md`, `2-2-thay-doi-trang-thai-lo-trinh.md`  
**Ngày:** 2026-03-29  
**Ghi chú:** Cột **Đã gen test** / **Kết quả (chạy)** cập nhật sau khi gen code và sau khi chạy lệnh test (theo workflow `bmad-qa-generate-e2e-tests`).

---

## Story 1.2 — Danh mục đào tạo & khóa học (FR1, FR7)

| TC ID | Loại | Mô tả | Điều kiện | Bước | Kết quả mong đợi | Trace (AC / endpoint) | Đã gen test | Kết quả (chạy) |
|-------|------|-------|-----------|------|------------------|----------------------|-------------|----------------|
| 1.2-TC-01 | Positive | Chuẩn hóa mã/tên catalog (trim, khoảng trắng) | — | Gọi hàm normalize / tạo program với mã có khoảng thừa | Mã được chuẩn hóa, không trùng do format | AC3; `catalog-normalize.ts` | Một phần (`catalog-normalize.spec.ts`) | — |
| 1.2-TC-02 | Positive | CRUD program (tạo, sửa, soft inactive) | Token ADMIN hoặc MANAGER | Tab Chương trình: tạo → sửa → đặt inactive | Bản ghi cập nhật; inactive không phá FK đang dùng | AC1; `GET/POST/PATCH/DELETE /categories/programs` | Chưa | — |
| 1.2-TC-03 | Positive | CRUD level / class-type / room | Có program, branch | Lần lượt tạo level, loại lớp, phòng gắn chi nhánh | Dữ liệu hiển thị đúng tab; lọc theo branch khi cần | AC1; `/categories/levels`, `class-types`, `rooms` | Chưa | — |
| 1.2-TC-04 | Negative | Ngừng phòng khi còn buổi học sắp tới | Phòng có session upcoming | PATCH room inactive / delete theo rule | API/UI từ chối hoặc message rõ | AC1; `categories.service` (guard) | Chưa | — |
| 1.2-TC-05 | Positive | Khóa học: lưới + tìm kiếm + phân trang | Có courses | Mở CourseManagement; gõ search; đổi trang | Kết quả khớp; debounce ổn định | AC2; `GET /categories/courses` | Chưa | — |
| 1.2-TC-06 | Positive | Tạo/sửa khóa học gắn program + level | Catalog đủ | Modal khóa học: điền metadata, lưu | `GET` chi tiết khớp; list refresh | AC2; `POST/PATCH /categories/courses` | Chưa | — |
| 1.2-TC-07 | Negative | Ngừng khóa học khi có lớp PLANNED/ACTIVE | Có lớp liên kết | Thử deactivate course | 409/400 với message | AC1 story notes | Chưa | — |
| 1.2-TC-08 | Negative | MANAGER không gọi API chỉ ADMIN (nếu có) | Token MANAGER | Gọi endpoint chỉ ADMIN (nếu tồn tại) | 403 | `App.tsx` routes | Chưa | — |

---

## Story 1.3 — IAM & RBAC (FR2, FR3)

| TC ID | Loại | Mô tả | Điều kiện | Bước | Kết quả mong đợi | Trace (AC / endpoint) | Đã gen test | Kết quả (chạy) |
|-------|------|-------|-----------|------|------------------|----------------------|-------------|----------------|
| 1.3-TC-01 | Positive | Admin mở `/admin/users` + tab Users | Token ADMIN | Điều hướng, mở tab | Danh sách load từ API | AC1–2; `GET /users` | Chưa | — |
| 1.3-TC-02 | Positive | Tạo user 2 role + 2 branch + password | Admin | Modal tạo: điền đủ, lưu | 201; user xuất hiện; badge đúng | AC2–3; `POST /users` | Chưa | — |
| 1.3-TC-03 | Positive | Cập nhật user (roles/branches/status) | User đã có | Sửa PATCH | 200; JWT sau login phản ánh (nếu test login) | AC3; `PATCH /users/:id` | Chưa | — |
| 1.3-TC-04 | Positive | Toggle Active ↔ Inactive | User không phải chính mình | Toggle trạng thái trên lưới | `INACTIVE`/`ACTIVE` đúng | AC2; `PATCH` status | Chưa | — |
| 1.3-TC-05 | Positive | Modal chỉ đọc không gọi PATCH | — | Xem chi tiết; đóng | Không request PATCH khi đóng | AC4 | Chưa | — |
| 1.3-TC-06 | Negative | Non-ADMIN gọi `GET /users` | Token STAFF/MANAGER | `curl` hoặc UI nếu lộ route | 403 | AC6; `users.controller` | Chưa | — |
| 1.3-TC-07 | Negative | Trùng username/email khi tạo | Đã có user | POST trùng | 409 Conflict | `users.service` | Chưa | — |
| 1.3-TC-08 | Negative | Super Admin matrix read-only | Tab Vai trò | Chọn role ADMIN → thử sửa checkbox | Không đổi được quyền (UI) | AC notes 1.3 | Chưa | — |

---

## Story 2.1 — Hồ sơ & tìm kiếm học viên (FR5)

| TC ID | Loại | Mô tả | Điều kiện | Bước | Kết quả mong đợi | Trace (AC / endpoint) | Đã gen test | Kết quả (chạy) |
|-------|------|-------|-----------|------|------------------|----------------------|-------------|----------------|
| 2.1-TC-01 | Positive | Danh sách + search debounce | Token CRM | StudentListPage: gõ từ khóa | Kết quả lọc; không spam request | AC1; `GET /students?search=` | Chưa | — |
| 2.1-TC-02 | Positive | Tạo HV mới (API) | POST hợp lệ | `POST /students` | 201; có id/hiển thị mã | AC2; `POST /students` | Chưa | — |
| 2.1-TC-03 | Negative | Trùng SĐT | Đã có parent/student cùng SĐT | POST trùng SĐT đã chuẩn hóa | 409 + payload gợi ý existing id | AC3 | Chưa | — |
| 2.1-TC-04 | Positive | Mở chi tiết `/crm/students/:id` | id hợp lệ | Click dòng / navigate | `GET /students/:id` hiển thị đủ vùng | AC4 | Chưa | — |
| 2.1-TC-05 | Boundary | NFR2 — thời gian phản hồi list | Mạng ổn định | Đo thời gian từ gõ đến render | &lt; 2s (theo AC) | AC1 | Chưa | — |
| 2.1-TC-06 | Negative | StudentManagement mock vs API | — | Ghi nhận gap | TC N/A cho đến khi nối API | Story task mở | N/A | — |

---

## Story 2.2 — Trạng thái lộ trình HV (FR6)

| TC ID | Loại | Mô tả | Điều kiện | Bước | Kết quả mong đợi | Trace (AC / endpoint) | Đã gen test | Kết quả (chạy) |
|-------|------|-------|-----------|------|------------------|----------------------|-------------|----------------|
| 2.2-TC-01 | Positive | Transition hợp lệ (ví dụ → ACTIVE) | Student ở trạng thái nguồn hợp lệ | `PATCH /students/:id/status` | 200; `statusChangedAt` cập nhật | AC2,4 | Chưa | — |
| 2.2-TC-02 | Negative | Transition cấm (vd. RESERVED → GRADUATED) | Theo machine | `PATCH` target cấm | 400 + message | AC1,5; machine | Rồi (`student-status.machine.spec.ts`) | — |
| 2.2-TC-03 | Positive | UI: dropdown `allowedTransitions` + modal lý do | Trang chi tiết API | Đổi trạng thái nhạy cảm | Modal bắt buộc; invalidate sau lưu | AC3 | Chưa | — |
| 2.2-TC-04 | Negative | Gửi `status` qua `PATCH /students/:id` chung | — | PATCH body có status | 400 yêu cầu dùng endpoint status | Dev notes 2.2 | Chưa | — |

---

## Gợi ý bước tiếp

1. **Review** bảng trên — chỉnh TC ID / scope nếu BA khác kỳ vọng.  
2. Gọi skill **`bmad-qa-generate-e2e-tests`** (hoặc trả lời **“gen test theo bảng”**) để sinh **API test (Jest/supertest)** + **E2E (Playwright)** nếu project đã cấu hình — rồi **chạy test** và cập nhật cột **Kết quả (chạy)**.  
3. Ưu tiên automation: **1.3-TC-06**, **2.1-TC-03**, **2.2-TC-02** (đã có unit) + bổ sung integration cho **1.2** CRUD.
