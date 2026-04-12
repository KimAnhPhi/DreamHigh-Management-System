# Draft — Đăng nhập (bóc tách MH & phân tích API)

**Ngày:** 2026-04-05  
**Nguồn:** Code FE `dreamhigh-web/src/pages/Auth/LoginPage.tsx`, `App.tsx` (GoogleOAuthProvider), BE `pms-eng-api` module `auth`  
**ERD tham chiếu:** `docs-BA/ERD/ba-erd-QuanLyDaoTao_TrungTamTiengAnh.md` — thực thể `SYSTEM_USER` (kèm `google_sub`, `password_hash` có thể null), RBAC `USER_ROLE` / `ROLE`

---

## Bước 1 — Bóc tách màn hình (input: code FE)

| MH | Tên / Route | Phần tử / hành vi | Loại | Ghi chú |
|----|-------------|-------------------|------|---------|
| MH1 | Đăng nhập `/login` | Logo, tên hệ thống, tagline (tĩnh trong Card) | Branding | Không gọi API |
| MH1 | | **Đăng nhập nhanh — Google** (widget `GoogleLogin`) | Bên thứ ba | Chỉ hiển thị khi có `VITE_GOOGLE_CLIENT_ID`; SDK Google, sau đó `POST /api/auth/google` |
| MH1 | | Phân cách “hoặc email” | UI | Tĩnh |
| MH1 | | Ô Email đăng nhập | Input | User nhập |
| MH1 | | Ô Mật khẩu + nút hiện/ẩn | PasswordInput | User nhập |
| MH1 | | Nút Đăng nhập hệ thống | Submit | Kích hoạt `POST /api/auth/login` |
| MH1 | | Link Đăng ký | Điều hướng | `navigate` tới `/register` |
| MH1 | | Thông báo lỗi (khi có) | FE state | Từ response BE hoặc lỗi mạng / Google |

---

## Bước 2 — Phân tích data & API

| MH | Phân tích data | API cần có |
|----|----------------|------------|
| MH1 | **FE tự có:** email, mật khẩu; hoặc **credential Google** (`id_token`) do SDK trả; branding; sau đăng nhập: lưu `token` + `user` (kèm `roles`) qua Zustand persist. **Cần BE:** xác thực `SYSTEM_USER` (bcrypt hoặc Google), trả JWT và user công khai. | `POST /api/auth/login`, `POST /api/auth/google` |

**Đối tác thứ ba:** **Google (OAuth 2.0 / Sign in with Google)** — FE dùng `@react-oauth/google`, BE xác minh `id_token` bằng `google-auth-library`, biến môi trường `GOOGLE_CLIENT_ID` (trùng Web Client ID với FE).

---

*File draft phục vụ review; nội dung chính thức: `Sequence_DangNhap_20260405.md`.*
