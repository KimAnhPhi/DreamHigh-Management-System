# Story 5.2: Thiết lập ưu đãi / cấn trừ học phí (FR17)

Status: ready-for-dev

## Story

As a Tư vấn hoặc Học vụ,

I want ghi nhận ưu đãi (% hoặc số tiền cố định) cho **một học viên** hoặc gói đăng ký,

So that số tiền phải thu phản hợp lệ (sau khung giá Story 5.1).

## Acceptance Criteria

1. **Loại ưu đãi:** Hỗ trợ **phần trăm** và/hoặc **số tiền** cố định; không cho tổng cấn trừ vượt số tiền phải thu (validate).
2. **Phạm vi:** Gắn `studentId` + (tuỳ chọn) `enrollmentId` / `classId` / kỳ thanh toán; lý do/mã khuyến mãi (audit).
3. **API:** `POST`/`PATCH` discount record; envelope; lưu người tạo, thời gian.
4. **Tính toán:** Service tính `amountDue = baseAmount - discount` (thứ tự áp dụng % và fix theo nghiệp vụ — ghi rõ trong code comment).
5. **UI:** Form trên hồ sơ HV hoặc màn thanh toán; hiển thị breakdown trước khi thu.

## Tasks / Subtasks

- [ ] **Backend** (AC: 1–4)
  - [ ] Model `StudentDiscount` hoặc tương đương; FK tới student/enrollment.
- [ ] **Frontend** (AC: 5)
  - [ ] Tích hợp CRM `StudentDetail` hoặc flow thanh toán; `NotificationPortal` cho thành công/lỗi.
- [ ] **Kiểm thử**
  - [ ] Nhiều tổ hợp % + fix; biên vượt quá số phải thu → 400.

## Dev Notes

### References

- [Source: `_bmad-output/planning-artifacts/epics.md` — Story 5.2, FR17]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
