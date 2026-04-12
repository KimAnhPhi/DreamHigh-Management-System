# Story 4.4: Cảnh báo chuyên cần (vắng liên tiếp) (FR14)

Status: ready-for-dev

## Story

As a Quản lý hoặc Học vụ,

I want hệ thống cảnh báo học viên vắng liên tiếp vượt ngưỡng,

So that đội kịp chăm sóc và giảm bỏ học.

## Acceptance Criteria

1. **Ngưỡng:** Cấu hình được (ví dụ **3** buổi vắng liên tiếp) — constant hoặc bảng `system_config`.
2. **Nguồn đếm:** Dữ liệu từ điểm danh (Story 4.2): trạng thái Absent (và quy tắc “có phép” có tính hay không theo BA).
3. **Phát hiện:** Khi điểm danh buổi mới được lưu, pipeline kiểm tra chuỗi vắng; hoặc job định kỳ quét — **ít nhất một** cơ chế đảm bảo cảnh báo xuất hiện sau khi điều kiện đạt.
4. **Hiển thị:** Dashboard / trang Notifications / widget CRM: danh sách HV “nguy cơ” (badge đỏ / màu semantic error), có link tới hồ sơ HV hoặc lớp.
5. **Event-driven (kiến trúc):** NestJS `EventEmitter` — sau khi attendance cập nhật, emit event; listener `attendance` kiểm tra ngưỡng và tạo `Alert` record hoặc push notification (tùy scope).
6. **API:** `GET /alerts/attendance-risk` hoặc filter trên dashboard API; chỉ role được phép.

## Tasks / Subtasks

- [ ] **Backend** (AC: 1–3, 5)
  - [ ] Logic đếm chuỗi vắng theo HV + lớp (hoặc toàn trung tâm — theo BA).
  - [ ] Event + handler; optional bảng `AttendanceAlert`.
- [ ] **Frontend** (AC: 4, 6)
  - [ ] Widget trên `DashboardPage` hoặc màn Học viên; DS (error/warning tokens).
- [ ] **Kiểm thử**
  - [ ] Chuỗi 3 buổi Absent → xuất hiện cảnh báo; reset khi có Present / sau can thiệp (theo rule).

## Dev Notes

### References

- [Source: `_bmad-output/planning-artifacts/epics.md` — Story 4.4, FR14]
- [Source: `architecture/04-project-structure-boundaries.md` — `attendance/events`]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
