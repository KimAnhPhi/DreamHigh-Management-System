# Story 2.1: Quản lý Hồ sơ & Tìm kiếm Học viên (FR5)

Status: review

## Story

As a Nhân viên Học vụ (hoặc Tuyển sinh),

I want tạo mới và tìm kiếm hồ sơ học viên theo định danh (SĐT, tên, mã HV),

So that tôi quản lý liên lạc và tư vấn mà không tạo trùng hồ sơ và tra cứu nhanh (NFR2).

## Acceptance Criteria

1. **Danh sách:** Người dùng có quyền CRM mở màn danh sách học viên với ô tìm kiếm; kết quả lọc phản hồi trong &lt; 2 giây (debounce + API hoặc client filter tạm).
2. **Tạo mới:** Form tạo hồ sơ với các trường tối thiểu theo PRD (họ tên, SĐT phụ huynh/học viên, kênh…); lưu thành công → hiển thị mã HV (hoặc ID hiển thị) và có thể mở chi tiết.
3. **Chống trùng:** Nếu SĐT (hoặc quy tắc unique đã chọn) đã tồn tại → API trả **409 Conflict** hoặc UI cảnh báo và đề xuất mở hồ sơ cũ (không tạo bản ghi trùng).
4. **Chi tiết:** Mở profile học viên với các vùng/tab dữ liệu (thông tin liên hệ, lộ trình, ghi chú tư vấn — theo thiết kế màn hình).
5. **API:** Response envelope `{ statusCode, message, data, meta }`; DTO validate (class-validator).

## Tasks / Subtasks

- [x] **Backend — `students` module** (AC: 2–3, 5)
  - [x] `GET /students` với query `search` (pagination có thể bổ sung sau); chống trùng SĐT ở tầng service — schema hiện **chưa** có `@unique` trên `phone` (Parent/Student).
  - [x] `POST /students`; xử lý duplicate → 409.
  - [x] `GET /students/:id` cho chi tiết.
- [x] **Frontend — dreamhigh-web** (AC: 1, 2, 4)
  - [x] `src/pages/CRM/StudentListPage.tsx` — danh sách + search (debounce 300ms, chuẩn hóa payload mảng/envelope).
  - [ ] `src/pages/CRM/StudentManagement.tsx` — vẫn mock (học phí/lộ trình); chưa nối API tạo/sửa đầy đủ.
  - [x] Chi tiết từ API: `src/pages/CRM/StudentApiDetailPage.tsx` + route `/crm/students/:id`; `StudentDetail.tsx` / `StudentModal.tsx` giữ cho luồng mock.
  - [x] Route: `/crm/students`, `/crm/students/manage`, `/crm/students/:id`; `ProtectedRoute` CRM (ADMIN, MANAGER, STAFF).
- [ ] **Kiểm thử**
  - [ ] Tạo HV mới; tìm theo SĐT; thử tạo trùng SĐT → 409 hoặc cảnh báo.

## Dev Notes

### Architecture compliance

- Module `students` + state-machine sau này cho FR6 [Source: `_bmad-output/planning-artifacts/architecture/04-project-structure-boundaries.md`].

### Frontend (dreamhigh-web)

- DS: `AppLayout`, `PageHeader`, `Card`, `Button`, `Input`; brand midnight/gold.
- Thay thế dần mock bằng React Query khi API sẵn sàng.

### References

- [Source: `_bmad-output/planning-artifacts/epics.md` — Epic 2, Story 2.1, FR5]
- [Source: `dreamhigh-web/src/App.tsx` — routes `/crm/students`]

## Dev Agent Record

### Agent Model Used

Composer (default)

### Debug Log References

### Completion Notes List

- **Backend:** `StudentsService.create` kiểm tra trùng SĐT phụ huynh (nested `parent.create`) và SĐT học viên; `ConflictException` 409 kèm `existingParentId` / `existingStudentId`; chuẩn hóa SĐT (bỏ khoảng trắng) trước khi lưu.
- **Frontend:** `StudentListPage` debounce 300ms, `normalizeListPayload` hỗ trợ mảng trực tiếp hoặc `{ data: [] }`, click dòng → `/crm/students/:id`. Trang `StudentApiDetailPage` gọi `GET /students/:id` (React Query).
- **AC5 (envelope + DTO):** Chưa áp dụng toàn cục interceptor envelope và class-validator DTO cho `POST /students` — để lần sau nếu team chốt format thống nhất.

### File List

- `pms-eng-api/src/modules/students/students.service.ts`
- `dreamhigh-web/src/pages/CRM/StudentListPage.tsx`
- `dreamhigh-web/src/pages/CRM/StudentApiDetailPage.tsx`
- `dreamhigh-web/src/App.tsx`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

### Review Findings

- [x] [Review][Defer] `POST /students` nhận `body: any` và spread vào `prisma.student.create` — rủi ro mass assignment; nên thay bằng DTO + whitelist field khi team chốt contract. [`pms-eng-api/src/modules/students/students.service.ts`]
- [x] [Review][Defer] `StudentManagement` mock — đã ghi trong Tasks story; không chặn review code path API list/detail. [`dreamhigh-web/src/pages/CRM/StudentManagement.tsx` — tham chiếu]
