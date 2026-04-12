# Story 2.3: Ghi nhận Placement Test & gợi ý cấp độ (FR12)

Status: ready-for-dev

## Story

As a Tư vấn viên (hoặc Học vụ),

I want nhập điểm bài kiểm tra xếp lớp đầu vào (Placement) và nhận gợi ý cấp độ / khóa phù hợp,

So that tư vấn chốt lớp đúng trình độ và giảm sai lệch phân lớp.

## Acceptance Criteria

1. **Điều kiện:** Chỉ ghi nhận placement cho học viên đã có hồ sơ (Story 2.1).
2. **Nhập điểm:** Form nhập các kỹ năng theo BA (tối thiểu: Listening, Reading, Writing — hoặc bộ điểm đã thống nhất); validate khoảng điểm (Zod + UI).
3. **Barem:** Sau khi lưu, backend tính tổng/điểm quy đổi và **map** sang `Level` (hoặc dải điểm) trong master data (Story 1.2): `minScore ≤ điểm ≤ maxScore` (hoặc quy tắc bảng lookup).
4. **Hiển thị:** Màn hình hiển thị rõ **Cấp độ / chương trình gợi ý** (badge nổi bật theo DS — ví dụ gold) để tư vấn thấy ngay.
5. **Lưu trữ:** Bản ghi placement gắn `studentId`, điểm từng kỹ năng, ngày thi, `recommendedLevelId` (nullable nếu không khớp barem).
6. **API:** Envelope; transaction khi ghi DB + cập nhật gợi ý.

## Tasks / Subtasks

- [ ] **Backend** (AC: 3, 5, 6)
  - [ ] Model Prisma `PlacementTest` (hoặc tên tương đương): `studentId`, scores, `recommendedLevelId`, `testDate`.
  - [ ] `POST /students/:id/placement-tests` + `GET` lịch sử nếu cần.
  - [ ] Service: lookup `Level` từ `system-config` / bảng level.
- [ ] **Frontend** (AC: 2, 4)
  - [ ] Tab hoặc section trong `StudentDetail.tsx` (hoặc màn riêng) — form điểm + hiển thị kết quả gợi ý.
  - [ ] Component form có thể tách `PlacementTestForm` để test dễ.
- [ ] **Kiểm thử**
  - [ ] Vài bộ điểm mẫu → đúng level gợi ý; biên min/max.

## Dev Notes

### Phụ thuộc

- **Story 1.2:** Cấu hình Level / barem trong danh mục; nếu chưa có API, có thể mock mapping trong FE tạm thời (ghi chú nợ technical).

### References

- [Source: `_bmad-output/planning-artifacts/epics.md` — Story 2.3, FR12]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
