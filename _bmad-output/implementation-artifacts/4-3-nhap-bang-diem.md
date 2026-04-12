# Story 4.3: Nhập bảng điểm & nhận xét (FR15)

Status: ready-for-dev

## Story

As a Giáo viên,

I want nhập điểm định kỳ (giữa kỳ / cuối kỳ) và nhận xét cho từng học viên trên lớp,

So that phụ huynh và trung tâm có hồ sơ đánh giá theo dõi.

## Acceptance Criteria

1. **Tab Kết quả:** Trên `/classes/:id`, tab **Kết quả** cho phép chọn một **kỳ đánh giá** (ví dụ Mid-term / Final) hoặc bài đánh giá đã cấu hình.
2. **Nhập điểm:** Grid hoặc form theo danh sách HV: điểm số (validate khoảng), nhận xét text; lưu từng dòng hoặc lưu hàng loạt.
3. **Cảnh báo điểm thấp:** Tuỳ BA — highlight/banner khi điểm &lt; ngưỡng (configurable).
4. **API:** `PUT`/`PATCH` bulk grades hoặc per-enrollment; envelope; liên kết `classId`, `studentId`, `assessmentType`, `score`, `comment`.
5. **Quyền:** Giáo viên phụ trách lớp hoặc role được phép.

## Tasks / Subtasks

- [ ] **Backend** (AC: 2, 4)
  - [ ] Bảng `Grade` / `Assessment` (hoặc tên tương đương): ràng buộc theo lớp + học viên + loại kỳ.
- [ ] **Frontend** (AC: 1, 3, 5)
  - [ ] Tab `results` trong `ClassDetailsPage.tsx`; form validation (Zod).
- [ ] **Kiểm thử**
  - [ ] Lưu điểm → reload; validation điểm ngoài phạm vi → lỗi rõ.

## Dev Notes

### References

- [Source: `_bmad-output/planning-artifacts/epics.md` — Story 4.3, FR15]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
