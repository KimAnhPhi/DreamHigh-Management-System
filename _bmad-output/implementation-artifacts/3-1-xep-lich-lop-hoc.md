# Story 3.1: Xếp lịch lớp học & chặn trùng GV/phòng (FR8)

Status: ready-for-dev

## Story

As a Quản lý đào tạo,

I want tạo lớp từ khóa học, gán lịch cố định (các thứ trong tuần, khung giờ), giáo viên và phòng học,

So that hệ thống sinh các buổi học (session) và **không** cho double-booking giáo viên hoặc phòng.

## Acceptance Criteria

1. **Tạo lớp + lịch:** Từ khóa học (master data Epic 1), tạo lớp với tần suất ngày/giờ, khoảng ngày bắt đầu–kết thúc (hoặc số buổi); sinh danh sách session tương lai trong transaction.
2. **Validation trùng lịch:** Trước khi lưu, kiểm tra overlap với session đã có: cùng `teacherId` hoặc cùng `roomId` trong khoảng thời gian giao nhau → **từ chối** (422 hoặc 400) kèm message rõ (tên GV/phòng, lớp đang xung đột).
3. **Thuật toán overlap:** Chuẩn khoảng thời gian: `new_start < existing_end AND new_end > existing_start` (cùng timezone/ngày).
4. **UI:** Luồng tạo lớp/xếp lịch trên FE (wizard hoặc form nhiều bước); có thể **preview** session trước khi commit; tuân DS DreamHigh (`AppLayout`, `PageHeader`, `Card`, …).
5. **API:** Envelope; dùng transaction khi bulk insert session.

## Tasks / Subtasks

- [ ] **Backend — `classes` / `sessions`** (AC: 1–3, 5)
  - [ ] Endpoint tạo lớp + generate sessions; một query hoặc kiểm tra tập overlap hiệu quả (tránh N+1 check từng buổi nếu có thể gom).
  - [ ] Trả lỗi có cấu trúc khi conflict (ai/ở đâu/trùng với lớp nào).
- [ ] **Frontend** (AC: 4)
  - [ ] `src/pages/Classes/ClassScheduleManagement.tsx` (và/hoặc hub `ClassesHubPage.tsx`) — đối chiếu route **`/classes/schedule`**, **`/classes`** trong `App.tsx`.
  - [ ] Gọi API preview → confirm tạo.
- [ ] **Kiểm thử**
  - [ ] Hai lớp cùng GV cùng slot → chặn; lịch hợp lệ → tạo đủ session.

## Dev Notes

### Architecture compliance

- Module `classes` trong `pms-eng-api` [Source: `architecture/04-project-structure-boundaries.md`].

### References

- [Source: `_bmad-output/planning-artifacts/epics.md` — Story 3.1, FR8]
- [Source: `dreamhigh-web/src/App.tsx` — `/classes`, `/classes/schedule`]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
