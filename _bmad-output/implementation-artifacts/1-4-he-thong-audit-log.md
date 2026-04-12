# Story 1.4: Hệ thống ghi vết thao tác (Audit Log) (FR4)

Status: ready-for-dev

## Story

As an Admin,

I want xem lịch sử thao tác của người dùng trên các thực thể nhạy cảm (tài chính, dữ liệu học viên, cấu hình),

So that tôi truy vết sự cố, đáp ứng kiểm soát nội bộ và hỗ trợ điều tra.

## Acceptance Criteria

1. **Ghi log:** Khi thực hiện CREATE/UPDATE/DELETE (hoặc các action được đánh dấu) trên resource quan trọng, hệ thống ghi một bản ghi audit với ít nhất: `userId`, `action`, `resource`/module, `timestamp`, `ipAddress`/`device` nếu có, và chi tiết thay đổi (JSON: old/new hoặc snapshot).
2. **Không làm chậm response:** Ghi log không chặn response thành công (async queue hoặc interceptor fire-and-forget an toàn).
3. **Đọc log:** Admin mở tab **Log thao tác** trong Quản trị hệ thống (`/admin/users` → tab Logs) hoặc route audit chuyên biệt nếu có (`/admin/audit-logs`): danh sách có lọc theo user, ngày, loại action; **read-only**, không xóa/sửa log.
4. **Bảo mật:** Chỉ role được phép (Admin) truy cập API và UI log.

## Tasks / Subtasks

- [ ] **Backend** (AC: 1, 2, 4)
  - [ ] Model `AuditLog` / `ActivityLog` trong Prisma; service ghi log.
  - [ ] `AuditInterceptor` hoặc middleware + decorator `@Audit()` trên controller cần thiết — tránh copy-paste `create` ở từng handler (theo hướng dẫn story cũ, điều chỉnh cho phù hợp codebase).
  - [ ] `GET /api/.../audit-logs` có filter + pagination + guard Admin.
- [ ] **Frontend** (AC: 3, 4)
  - [ ] `AdminLogsTab.tsx` hoặc `AuditLogPage.tsx`; nối API khi sẵn sàng; hiện mock `MOCK_ACTIVITY_LOGS` có thể giữ cho dev.
- [ ] **Kiểm thử**
  - [ ] Thực hiện một thao tác ghi dữ liệu → một dòng log xuất hiện với đúng user và metadata.

## Dev Notes

### Architecture compliance

- Event-driven / interceptor phù hợp NestJS; không log body chứa password hoặc PII không cần thiết.

### Frontend (dreamhigh-web)

- `src/pages/Admin/AdminSystemManagementPage.tsx` — tab logs.
- `src/pages/Admin/AuditLogPage.tsx` — nếu route riêng trong `App.tsx`.

### References

- [Source: `_bmad-output/planning-artifacts/epics.md` — Story 1.4]
- Types: `src/types/adminSystem.ts` — `ActivityLog`, `AuditAction`

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
