# Story 3.3: Tra cứu thời khóa biểu cá nhân giáo viên (FR10)

Status: ready-for-dev

## Story

As a Giáo viên,

I want xem các buổi dạy được giao cho mình (theo ngày/tuần/tháng),

So that tôi biết lớp nào, phòng nào, giờ nào — không thấy lịch của giáo viên khác.

## Acceptance Criteria

1. **Phạm vi dữ liệu:** API/FE chỉ trả session có `teacherId` trùng user đăng nhập (map user ↔ teacher record trong hệ thống).
2. **Dashboard / hub:** Giáo viên sau đăng nhập có màn hoặc widget xem lịch sắp tới (theo epics: widget trên Dashboard hoặc trang riêng).
3. **Hiển thị:** Danh sách hoặc lịch (calendar/list); mỗi event: môn/lớp, thời gian, phòng, trạng thái buổi.
4. **Bảo mật:** Gọi `GET` schedule với JWT; backend bắt buộc filter theo `sub`/teacherId — không tin query string teacherId từ client.
5. **NFR2:** Tải lịch trong khoảng ngày chọn phản hồi nhanh (&lt; 2s) với volume bình thường.

## Tasks / Subtasks

- [ ] **Backend** (AC: 1, 4)
  - [ ] `GET /sessions/my-schedule?startDate=&endDate=` (hoặc tương đương) trong module classes/sessions; join tên lớp, phòng.
- [ ] **Frontend** (AC: 2, 3, 5)
  - [ ] `DashboardPage` widget + hoặc trang trong hub **`/classes`** / lịch cá nhân — đối chiếu role **TEACHER** trong `ProtectedRoute` / `MODULES` dashboard.
  - [ ] Có thể dùng calendar component hoặc grid list; style DS (gold/midnight).
- [ ] **Kiểm thử**
  - [ ] User teacher A không thấy session của teacher B; gọi API giả mạo teacherId khác → 403/ignored.

## Dev Notes

### References

- [Source: `_bmad-output/planning-artifacts/epics.md` — Story 3.3, FR10]
- [Source: `dreamhigh-web/src/pages/Dashboard/dashboardConstants.ts` — module Courses/Classes cho role TEACHER]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
