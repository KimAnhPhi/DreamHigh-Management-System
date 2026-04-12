# Story 1.1: Xác thực & Quản lý Tài khoản (Auth & Profile)

Status: ready-for-dev

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

- [ ] **Backend — Auth** (AC: 1, 2, 5)
  - [ ] Endpoint login/register/refresh theo module `auth` (NestJS); hash password; JWT secret từ env.
  - [ ] Endpoint profile + change-password có guard JWT.
- [ ] **Frontend — dreamhigh-web** (AC: 2, 3, 4)
  - [ ] `LoginPage`, `RegisterPage`, `ProfilePage`; `ProtectedRoute`; store auth (Zustand) + persistence nếu đã có pattern.
  - [ ] Form dùng `react-hook-form` + `zod` nơi phù hợp.
- [ ] **Kiểm thử** (AC: tất cả)
  - [ ] E2E hoặc test tay: login sai/đúng, redirect, đổi mật khẩu.

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

_(điền khi triển khai)_

### Debug Log References

### Completion Notes List

### File List

_(điền sau khi merge)_
