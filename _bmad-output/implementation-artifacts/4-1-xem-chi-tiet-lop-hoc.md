# Story 4.1: Xem chi tiết lớp học (shell & tab)

Status: ready-for-dev

## Story

As a Giáo viên (hoặc Học vụ có quyền),

I want mở trang chi tiết lớp theo đường dẫn `/classes/[id]` với các tab nội dung rõ ràng,

So that tôi xem tổng quan lớp, lịch, học viên, điểm danh và kết quả trên cùng một luồng.

## Acceptance Criteria

1. **Route:** `GET` (FE) **`/classes/:id`** — chỉ user có quyền (TEACHER được gán lớp, hoặc STAFF/MANAGER/ADMIN) truy cập; sai quyền → 403 hoặc redirect.
2. **Dữ liệu lớp:** Load thông tin lớp từ API (envelope); hiển thị tên khóa, mã lớp, GV phụ trách, lịch tóm tắt — theo contract backend.
3. **Tab:** Ít nhất các khối: **Tổng quan** (overview), **Lịch học** (schedule), **Học viên** (students), **Điểm danh** (attendance), **Kết quả** (results) — khớp cấu trúc UI đã có trên FE hoặc map tên tương đương (epics ghi Overview / Students / Attendance / Results).
4. **Trạng thái:** Loading / lỗi / empty có feedback (DS); breadcrumb về hub lớp `/classes`.
5. **Story con:** Tab Điểm danh và Kết quả được làm chi tiết ở Story **4.2**, **4.3**; story này bảo đảm **khung** và điều hướng tab hoạt động.

## Tasks / Subtasks

- [ ] **Frontend** (AC: 1–5)
  - [ ] `dreamhigh-web/src/pages/ClassDetailsPage.tsx` — `Tabs`, `PageHeader`, `AppLayout`; `useParams` `:id`; React Query `GET /classes/:id`.
  - [ ] Đồng bộ nhãn tab với epics/BA; placeholder nội dung tab chờ 4.2/4.3 nếu cần.
- [ ] **Backend**
  - [ ] `GET /classes/:id` trả đủ quan hệ (course, teacher, enrollments count…) cho header + tab.
- [ ] **Kiểm thử**
  - [ ] Mở lớp hợp lệ → đủ tab; id không tồn tại → 404 UI.

## Dev Notes

### References

- [Source: `_bmad-output/planning-artifacts/epics.md` — Story 4.1]
- [Source: `dreamhigh-web/src/pages/ClassDetailsPage.tsx`]
- [Source: `dreamhigh-web/src/App.tsx` — route `/classes/:id`]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
