# Story 5.3: Ghi nhận giao dịch thu & cập nhật công nợ (FR18)

Status: ready-for-dev

## Story

As a Học vụ,

I want ghi nhận thanh toán tiền mặt hoặc chuyển khoản và cập nhật số dư công nợ của học viên,

So that sổ quỹ và công nợ luôn khớp thực tế thu.

## Acceptance Criteria

1. **Giao dịch:** Loại `CASH` / `BANK_TRANSFER` (mở rộng sau); số tiền; ngày giao dịch; tham chiếu học viên + (tuỳ chọn) hóa đơn/kỳ đóng.
2. **Công nợ:** `balance` hoặc `outstandingAmount` cập nhật sau mỗi giao dịch thành công trong **transaction** DB (payment + ledger).
3. **Idempotency:** Tránh ghi đôi cùng mã tham chiếu ngân hàng (nếu có `externalRef`).
4. **API:** `POST /payments` hoặc `POST /billing/transactions`; envelope; class-validator.
5. **Event:** Sau thanh toán thành công, emit event (ví dụ `PaymentSuccessEvent`) cho module khác (SMS/email) — theo kiến trúc [Source: architecture boundaries].
6. **UI:** Màn thu tiền trên hồ sơ HV hoặc màn thu tập trung; xác nhận trước khi ghi.

## Tasks / Subtasks

- [ ] **Backend — `billing-finance`** (AC: 1–5)
  - [ ] Models: `Payment`, `StudentLedger` hoặc tương đương.
  - [ ] Transaction + event emit.
- [ ] **Frontend** (AC: 6)
  - [ ] Form thu tiền; hiển thị số dư trước/sau; DS.
- [ ] **Kiểm thử**
  - [ ] Thu 100k → nợ giảm đúng; lỗi giữa chừng → rollback.

## Dev Notes

### References

- [Source: `_bmad-output/planning-artifacts/epics.md` — Story 5.3, FR18]
- [Source: `architecture/04-project-structure-boundaries.md` — billing-finance + events]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
