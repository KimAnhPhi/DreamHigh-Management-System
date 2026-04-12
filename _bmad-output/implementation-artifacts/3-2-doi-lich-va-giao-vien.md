# Story 3.2: Dời lịch & đổi giáo viên / phòng (FR9)

Status: ready-for-dev

## Story

As a Quản lý đào tạo,

I want dời một hoặc nhiều buổi học, đổi giáo viên hoặc phòng khi có sự cố,

So that lớp tiếp tục vận hành, dữ liệu dạy và lương sau này vẫn khớp người dạy thực tế.

## Acceptance Criteria

1. **Đổi GV một buổi:** Chọn session → gán `teacherId` mới → hệ thống kiểm tra **không** trùng lịch GV mới (cùng quy tắc Story 3.1); cập nhật thành công.
2. **Đổi phòng:** Tương tự, kiểm tra phòng không bị chiếm trong slot đó.
3. **Dời lịch:** Đổi `start`/`end` (hoặc ngày) của session; tùy chọn dời các buổi sau (shift) theo tần suất lớp; **không** sửa session đã hoàn thành / đã chốt điểm danh theo quy tắc BA (enum `COMPLETED` không reschedule).
4. **Hủy / nghỉ buổi:** Nếu có trong scope — trạng thái rõ (ví dụ `CANCELLED`), không đưa vào giờ dạy thực tế (thống nhất Story 3.4).
5. **API:** `PATCH` session hoặc endpoint chuyên biệt (`swap-teacher`, `reschedule`); envelope; transaction khi cập nhật nhiều session.
6. **UI:** Từ lịch hoặc chi tiết lớp (`/classes/:id`): modal hành động với xác nhận; hiển thị cảnh báo nếu vi phạm ràng buộc.

## Tasks / Subtasks

- [ ] **Backend** (AC: 1–5)
  - [ ] Service reschedule/swap; validate completed/cancelled rules.
  - [ ] (Tuỳ chọn) ghi audit hoặc lịch sử thay đổi session cho tra cứu.
- [ ] **Frontend** (AC: 6)
  - [ ] `ClassScheduleManagement`, `ClassDetailsPage` (route **`/classes/:id`**) — nút đổi GV / dời lịch.
- [ ] **Kiểm thử**
  - [ ] Swap GV trùng giờ → lỗi; dời buổi completed → từ chối nếu BA cấm.

## Dev Notes

### References

- [Source: `_bmad-output/planning-artifacts/epics.md` — Story 3.2, FR9]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
