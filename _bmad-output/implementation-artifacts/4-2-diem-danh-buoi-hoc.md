# Story 4.2: Điểm danh buổi học (FR13)

Status: ready-for-dev

## Story

As a Giáo viên,

I want ghi nhận có mặt / vắng / có phép cho từng học viên theo từng buổi (session) đã chọn,

So that chuyên cần và báo cáo sau này (kể cả cảnh báo FR14) dựa trên dữ liệu thực.

## Acceptance Criteria

1. **Chọn session:** Trên tab Điểm danh của `/classes/:id`, chọn một buổi (session) trong danh sách buổi của lớp (theo ngày hoặc danh sách).
2. **Ghi nhận:** Với mỗi học viên trong lớp, chọn trạng thái (Present / Absent / Excused / … — enum thống nhất PRD); lưu ngay hoặc lưu hàng loạt với nút xác nhận.
3. **API:** `PATCH` hoặc `POST` bulk attendance records gắn `sessionId`, `studentId`, `status`, `recordedBy`, timestamp; response envelope.
4. **Quyền:** Chỉ GV được phân công hoặc role được phép mới sửa điểm danh buổi đó.
5. **NFR2:** Thao tác lưu phản hồi nhanh; UI không mất dữ liệu khi đổi session (confirm nếu có thay đổi chưa lưu).

## Tasks / Subtasks

- [ ] **Backend — `attendance` module** (AC: 2–4)
  - [ ] Model attendance theo session + student; unique (sessionId, studentId).
  - [ ] Endpoint lưu/đọc điểm danh theo session.
- [ ] **Frontend** (AC: 1, 2, 5)
  - [ ] Tab hoặc embed trong `ClassDetailsPage` — có thể tách `AttendanceModal.tsx` / `Classes/AttendanceModal.tsx` (đã có file: tích hợp API).
  - [ ] Bảng tick + trạng thái; DS midnight/gold.
- [ ] **Kiểm thử**
  - [ ] Lưu điểm danh → GET lại khớp; user không thuộc lớp → không sửa được.

## Dev Notes

### Architecture compliance

- Module `attendance` + events “vắng quá giới hạn” cho Epic 4 Story 4.4 [Source: `architecture/04-project-structure-boundaries.md`].

### References

- [Source: `_bmad-output/planning-artifacts/epics.md` — Story 4.2, FR13]
- [Source: `dreamhigh-web/src/pages/Classes/AttendanceModal.tsx`]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
