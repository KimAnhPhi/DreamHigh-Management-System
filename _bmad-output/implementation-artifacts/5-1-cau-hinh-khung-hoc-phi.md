# Story 5.1: Cấu hình khung học phí gốc (FR16)

Status: ready-for-dev

## Story

As a Học vụ hoặc Quản lý,

I want thiết lập mức học phí chuẩn (khung giá) gắn với khóa học hoặc lớp,

So that mọi giao dịch thu và công nợ có mốc giá thống nhất trước khi áp ưu đãi.

## Acceptance Criteria

1. **Đối tượng gắn giá:** Theo PRD — ít nhất một trong: **Khóa học** (course), **Lớp** (class instance), hoặc bảng giá theo chương trình/cấp độ; rõ ràng trong model và UI.
2. **CRUD:** Tạo/sửa/xem khung giá; đơn vị tiền VND; hiệu lực từ ngày (nếu cần versioning).
3. **Ngừng áp dụng:** Soft deactivate hoặc khoảng hiệu lực — không phá hợp đồng/đã thu cũ.
4. **API:** Module `billing-finance` (hoặc `system-config` nếu chỉ master); envelope; validate số không âm.
5. **Phụ thuộc Epic 1:** Liên kết `courseId` / `classId` từ master data đã có.

## Tasks / Subtasks

- [ ] **Backend** (AC: 1–4)
  - [ ] Prisma models: ví dụ `TuitionFrame`, `CoursePricing` — đặt tên theo schema thực tế.
  - [ ] REST CRUD + `GET` theo filter course/class.
- [ ] **Frontend**
  - [ ] Màn cấu hình trong hub Khóa học / Tài chính (route tạo khi có module — ví dụ `/courses/manage` + tab học phí hoặc trang `/finance/tuition-frames`); DS components.
- [ ] **Kiểm thử**
  - [ ] Tạo khung giá → hiển thị khi tạo giao dịch (Story 5.3).

## Dev Notes

### Architecture compliance

- [Source: `architecture/04-project-structure-boundaries.md` — `billing-finance`]

### References

- [Source: `_bmad-output/planning-artifacts/epics.md` — Story 5.1, FR16]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
