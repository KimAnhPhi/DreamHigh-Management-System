# Story 1.1: Xác thực & Quản lý Tài khoản (Auth & Profile)

Status: review

<!-- Validation: optional — chạy validate-create-story trước dev-story nếu có. -->

## Story

As a Người dùng (Admin / Giáo viên / Học vụ / Phụ huynh),

I want đăng ký (nếu được phép), đăng nhập, xem hồ sơ tài khoản và đổi / reset mật khẩu,

So that tôi bảo vệ thông tin cá nhân và chỉ truy cập được các chức năng đúng vai trò.

## Acceptance Criteria

1. **Đăng ký (nếu bật trong cấu hình):** Request hợp lệ tạo user; mật khẩu được băm (bcrypt, đủ round); không trả password plaintext trong response.
2. **Đăng nhập:** `POST /api/auth/login` (hoặc tương đương) với username/email + password đúng → JWT (và refresh nếu có); sai → 401 với thông báo rõ ràng.
3. **Bảo vệ route FE:** Người chưa đăng nhập truy cập route được bảo vệ → chuyển hướng `/login` (hoặc trang đích đã cấu hình).
4. **Profile:** User đã đăng nhập mở `/profile` → xem thông tin tài khoản; có luồng đổi mật khẩu an toàn (xác nhận mật khẩu cũ hoặc token).
5. **NFR:** Tuân thủ envelope API `{ statusCode, message, data, meta }` cho response chuẩn dự án.

## Tasks / Subtasks

- [x] **Backend — Auth** (AC: 1, 2, 5)
  - [x] Endpoint login/register/refresh theo module `auth` (NestJS); hash password; JWT secret từ env.
  - [x] Endpoint profile + change-password có guard JWT.
- [x] **Frontend — dreamhigh-web** (AC: 2, 3, 4)
  - [x] `LoginPage`, `RegisterPage`, `ProfilePage`; `ProtectedRoute`; store auth (Zustand) + persistence nếu đã có pattern.
  - [x] Form dùng `react-hook-form` + `zod` nơi phù hợp.
- [x] **Kiểm thử** (AC: tất cả)
  - [x] E2E hoặc test tay: login sai/đúng, redirect, đổi mật khẩu.

## Change Log

- 2026-04-12: Xác nhận đối chiếu AC với codebase hiện có; bổ sung unit test `UsersService.changePassword`; cập nhật story → review. (Refresh token: chưa có trong scope — JWT access-only đủ AC2 “hoặc tương đương”.)

## Dev Notes

### Architecture compliance

- [Source: `_bmad-output/planning-artifacts/architecture/04-project-structure-boundaries.md`] — FE `dreamhigh-web`, API `pms-eng-api`; proxy Vite `/api` → `127.0.0.1:3000`.
- Response API bọc envelope; DTO validate với class-validator.

### Frontend (dreamhigh-web)

- Routes tham chiếu: `src/App.tsx` — `/login`, `/register`, `/profile`; component bảo vệ `src/router/ProtectedRoute.tsx`.
- Brand: DreamHigh DS (midnight/gold), không hardcode màu ngoài token/tailwind config.

### Backend (pms-eng-api)

- Module `auth`, guards JWT; không leak password/hash trong DTO trả về client.

### Testing

- Unit: AuthService validate; integration: login → JWT → guarded route.

### Project Structure Notes

- Giữ feature theo thư mục pages hiện có; không tạo thư mục song song trùng chức năng.

### References

- [Source: `_bmad-output/planning-artifacts/epics.md` — Epic 1, Story 1.1]
- [Source: `_bmad-output/planning-artifacts/architecture/03-implementation-patterns-api-contracts.md`] (nếu có chi tiết envelope)

## Dev Agent Record

### Agent Model Used

Composer (Cursor)

### Debug Log References

_(none)_

### Completion Notes List

- **AC1:** `AuthService.register` (`pms-eng-api`) — bcrypt hash, `toPublicUser` không trả password.
- **AC2:** `POST /api/auth/login`, `POST /api/auth/google`; JWT qua `JwtStrategy`; sai cred → `UnauthorizedException`.
- **AC3:** `ProtectedRoute` → redirect `/login`; role không đủ → `/dashboard`.
- **AC4:** `GET /api/users/profile`, `PATCH /api/users/change-password` (JWT); `ProfilePage` + `react-hook-form` + zod.
- **AC5:** `UsersService.getProfile` / `changePassword` trả envelope `{ statusCode, message, data, meta }`.
- **Refresh token:** không triển khai; chỉ access JWT — ghi chú cho backlog nếu cần.

### File List

- `pms-eng-api/src/modules/users/users.service.spec.ts` (new — unit tests changePassword)
- `_bmad-output/implementation-artifacts/1-1-xac-thuc-quan-ly-tai-khoan.md` (this story)

**Tham chiếu đã có sẵn (không đổi trong phiên này):** `dreamhigh-web/src/pages/Auth/*`, `ProfilePage.tsx`, `ProtectedRoute.tsx`, `pms-eng-api/src/modules/auth/*`, `users.controller.ts`, `users.service.ts`.
