# Story 2.2: Thay đổi trạng thái Lộ trình học viên (FR6)

Status: review

## Story

As a Học vụ,

I want chuyển trạng thái vòng đời học viên (ví dụ Lead → Đang học → Bảo lưu / Nghỉ học → Tốt nghiệp) theo quy tắc nghiệp vụ,

So that báo cáo phễu và dữ liệu vận hành phản ánh đúng thực tế tại trung tâm.

## Acceptance Criteria

1. **Enum / state machine:** Trạng thái lưu trong DB dưới dạng enum (hoặc tương đương) thống nhất với PRD; có luật chuyển hợp lệ (ví dụ không cho Lead → Tốt nghiệp bỏ qua bước trung gian nếu BA quy định cấm).
2. **Cập nhật:** `PATCH` (hoặc action chuyên biệt) đổi trạng thái với `targetStatus` + lý do/timestamp khi cần audit.
3. **UI:** Trên màn chi tiết học viên (`StudentDetail` hoặc tương đương) có điều khiển đổi trạng thái (select + xác nhận modal cho bước nhạy cảm); sau khi lưu, UI refresh (React Query invalidate).
4. **Lead → Đang học:** Khi học viên nhập học / đóng cọc (theo quy trình BA), học vụ chuyển sang trạng thái “đang học” và hệ thống lưu **thời điểm** chuyển (field `statusChangedAt` hoặc bảng lịch sử).
5. **API:** Envelope chuẩn; lỗi chuyển trạng thái không hợp lệ → 400 với message rõ.

## Tasks / Subtasks

- [x] **Backend** (AC: 1, 2, 5)
  - [x] Service state machine trong `students` (hoặc `state-machine` subfolder) — validate transition.
  - [x] `PATCH /students/:id/status` (hoặc RPC rõ tên); ghi nhận timestamp / optional audit row.
- [x] **Frontend** (AC: 3, 4)
  - [x] `StudentApiDetailPage.tsx` (tương đương màn chi tiết API) — select trạng thái theo `allowedTransitions` + modal xác nhận; `StudentDetail.tsx` vẫn mock CRM — nhãn enum dùng chung `crmStudentStatusLabels.ts`.
  - [x] Đồng bộ nhãn tiếng Việt với enum backend (`ACTIVE` → Đang học, …).
- [x] **Kiểm thử**
  - [x] Các transition hợp lệ; một transition cấm phải bị từ chối (Jest: `student-status.machine.spec.ts`).

## Dev Notes

### Architecture compliance

- State-machine cho vòng đời học viên [Source: `architecture/04-project-structure-boundaries.md` — `students/state-machine`].

### References

- [Source: `_bmad-output/planning-artifacts/epics.md` — Story 2.2, FR6]

## Dev Agent Record

### Agent Model Used

Composer (default)

### Debug Log References

### Completion Notes List

- **Prisma:** `Student.statusChangedAt`, model `StudentStatusHistory` (audit), migration `20260329183000_student_status_history`.
- **State machine:** `RESERVED` → `GRADUATED` cấm; `GRADUATED` terminal. `PATCH /api/students/:id/status` + DTO `UpdateStudentStatusDto` (class-validator). Lỗi transition / trùng trạng thái → **400** với message tiếng Việt. `PATCH /students/:id` chung từ chối gửi `status` (bắt dùng endpoint status).
- **FE:** `StudentApiDetailPage` — dropdown theo `allowedTransitions`, modal (lý do bắt buộc cho RESERVED/DROPPED/GRADUATED), `invalidateQueries` sau khi lưu. Nhãn: `utils/crmStudentStatusLabels.ts`.
- **Lead → ACTIVE:** `enrollment.service` ghi `statusChangedAt` khi tạo HV từ lead; `students.create` cũng set `statusChangedAt`.
- **AC5 (envelope):** Response giữ dạng JSON trực tiếp như các endpoint hiện có; envelope toàn cục chưa áp dụng.

### File List

- `pms-eng-api/prisma/schema.prisma`
- `pms-eng-api/prisma/migrations/20260329183000_student_status_history/migration.sql`
- `pms-eng-api/src/modules/students/state-machine/student-status.machine.ts`
- `pms-eng-api/src/modules/students/state-machine/student-status.machine.spec.ts`
- `pms-eng-api/src/modules/students/dto/update-student-status.dto.ts`
- `pms-eng-api/src/modules/students/students.service.ts`
- `pms-eng-api/src/modules/students/students.controller.ts`
- `pms-eng-api/src/modules/enrollment/enrollment.service.ts`
- `pms-eng-api/jest.config.cjs`
- `pms-eng-api/package.json`
- `dreamhigh-web/src/utils/crmStudentStatusLabels.ts`
- `dreamhigh-web/src/pages/CRM/StudentApiDetailPage.tsx`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

## Change Log

- 2026-03-29: Story 2.2 — state machine, PATCH status, `statusChangedAt` + lịch sử, UI chi tiết API, Jest cho transition rules.

### Review Findings

- [x] [Review][Defer] FE `needsSensitiveReason` gồm `RESERVED` — đối chiếu BA nếu đổi tên trạng thái / quy tắc bắt buộc lý do. [`dreamhigh-web/src/pages/CRM/StudentApiDetailPage.tsx`]
