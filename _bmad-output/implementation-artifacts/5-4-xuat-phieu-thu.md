# Story 5.4: Xuất phiếu thu (PDF / in) (FR19)

Status: ready-for-dev

## Story

As a Học vụ,

I want in hoặc tải phiếu thu sau khi ghi nhận thanh toán,

So that trả cho phụ huynh chứng từ chuẩn và có thể lưu hồ sơ.

## Acceptance Criteria

1. **Sau thanh toán:** Từ bản ghi giao dịch (Story 5.3), nút **In phiếu thu** / **Tải PDF** tạo file với: số phiếu, ngày, tên HV, số tiền, phương thức, người thu, **mã tham chiếu** giao dịch.
2. **Template:** Theo brand (logo DreamHigh, font, màu) — có thể HTML → PDF (Puppeteer, pdf-lib, hoặc service Nest).
3. **Lưu trữ:** Optional: lưu URL/path file PDF gắn `paymentId` để tải lại.
4. **API:** `GET /payments/:id/receipt.pdf` hoặc generate on-the-fly; quyền chỉ staff được phép / chủ hồ sơ (theo BA).
5. **Bảo mật:** Không lộ payment id sequence cho user không hợp lệ.

## Tasks / Subtasks

- [ ] **Backend** (AC: 1–3, 5)
  - [ ] Service render PDF; template HTML hoặc template engine.
- [ ] **Frontend** (AC: 1, 4)
  - [ ] Nút download/open tab; loading state.
- [ ] **Kiểm thử**
  - [ ] PDF mở đúng; dữ liệu khớp DB.

## Dev Notes

### References

- [Source: `_bmad-output/planning-artifacts/epics.md` — Story 5.4, FR19]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
