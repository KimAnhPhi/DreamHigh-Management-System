# Architecture — Security & compliance profile (đầu vào tùy chọn)

**Cách dùng mặc định (khuyến nghị):** Gộp vào **một** tài liệu kiến trúc — dán nội dung từ file template này thành một section trong `{planning_artifacts}/architecture.md` (ví dụ tiêu đề `## Security & Compliance Profile`). Không bắt buộc tạo file riêng.

**Tùy chọn:** Nếu team muốn tách file (legacy hoặc shard sau): copy sang `{planning_artifacts}/architecture-security-profile.md` hoặc `planning-artifacts/architecture/security-profile.md` và thêm vào `inputDocuments` / index.

Agent **bắt buộc** đọc phần bảo mật đã gộp trong `architecture.md` (hoặc file profile riêng nếu tồn tại) khi làm **Category 2: Authentication & Security** (bước 4) và khi **validation** (bước 7).

---

## 1. Baseline chuẩn

| Trường | Giá trị (điền) |
|--------|----------------|
| **OWASP ASVS target** | Ví dụ: `4.0.3` — **Level** `1` / `2` / `3` |
| **Rủi ro chấp nhận** | `low` / `medium` / `high` (mức chịu rủi ro nếu chưa đủ control) |
| **Tuân thủ / khung khác** | Ví dụ: không có / GDPR / PCI (nếu có thẻ) / SOC2 — mô tả ngắn |

---

## 2. Bề mặt tấn công (attack surface)

| Trường | Có / Không / Mô tả ngắn |
|--------|-------------------------|
| **API HTTP công khai Internet** | |
| **Chỉ nội bộ / VPN** | |
| **Ứng dụng di động** | |
| **Webhook nhận từ đối tác** | |
| **Admin / back-office** | |

---

## 3. Dữ liệu & nhạy cảm (để AI map vào ASVS / encryption / logging)

Đánh dấu loại dữ liệu hệ thống **lưu hoặc xử lý**:

- [ ] Thông tin định danh cá nhân (PII): tên, email, SĐT, địa chỉ…
- [ ] Dữ liệu tài chính / thanh toán / hóa đơn (không lưu full PAN nếu tránh PCI)
- [ ] Bí mật nghiệp vụ / giá nội bộ vs giá khách
- [ ] Credentials người dùng (hash OK; không plain text)
- [ ] Token OAuth / refresh (lưu trữ & rotation)
- [ ] File upload từ user (malware, path traversal)
- [ ] Khác: _ghi rõ_

---

## 4. Tích hợp bên thứ ba

| Hệ thống | Mục đích | Hướng luồng | Ghi chú bảo mật |
|----------|----------|-------------|-----------------|
| Ví dụ: IdP (OIDC) | Đăng nhập | Inbound | |
| Ví dụ: QBO / ERP | Đồng bộ kế toán | Outbound + callback? | |
| | | | |

---

## 5. Yêu cầu phi chức năng bảo mật (ưu tiên của product)

Chọn / bổ sung:

- [ ] SSO bắt buộc (không password local)
- [ ] MFA cho role admin / finance
- [ ] RBAC + cô lập dữ liệu theo tenant / role (field-level nếu cần)
- [ ] Audit trail bất biến cho thao tác nhạy cảm
- [ ] Mã hóa at-rest (DB / object storage) — yêu cầu cụ thể: ___
- [ ] Mã hóa in-transit TLS 1.2+ — bắt buộc end-to-end: ___
- [ ] Rate limiting API
- [ ] WAF / reverse proxy (do hạ tầng cung cấp)
- [ ] Khác: ___

---

## 6. Ghi chú cho agent kiến trúc

_(Ví dụ: “Phase 1 chỉ nội bộ nhưng chuẩn bị ASVS L2 cho go-live public”; “Chưa có pentest budget — cần SAST + dependency scan CI”)_

- 

---

**Lưu ý:** File này **không** thay thế pentest hay SAST; nó buộc agent **căn chỉnh** mục kiến trúc (auth, API security, logging, secrets, isolation) với **mức rủi ro thật** của dự án.
