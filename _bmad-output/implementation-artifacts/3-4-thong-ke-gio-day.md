# Story 3.4: Thống kê giờ dạy thực tế & phục vụ chốt lương (FR11)

Status: ready-for-dev

## Story

As a Kế toán hoặc Học vụ,

I want xem tổng giờ dạy thực tế của từng giáo viên trong một kỳ (tháng/khóa),

So that áp đơn giá giờ, điều chỉnh thưởng/phạt và chốt thanh toán (hoặc export).

## Acceptance Criteria

1. **Nguồn đếm:** Chỉ tính các buổi/session **đã hoàn thành** (hoặc đã điểm danh/chốt theo quy tắc nghiệp vụ — thống nhất với Epic 4); session **hủy** không vào tổng giờ.
2. **Báo cáo tổng hợp:** Theo khoảng ngày: danh sách **Giáo viên | tổng giờ | (tuỳ chọn) chi tiết theo lớp/khóa**; có **export** CSV/Excel (NFR3).
3. **API:** `GET /reports/teacher-hours?from=&to=` (hoặc tên tương đương); envelope; group theo `teacherId`; đơn vị giờ thống nhất (ví dụ decimal hours).
4. **UI vận hành học vụ (bổ sung FR11):** Màn **`/hr/teachers`** (role ADMIN/MANAGER/STAFF) — tab **Bảng kê lương kỳ**, chi tiết giáo viên với nhật ký giảng dạy, phân rã Off/On, điều chỉnh thưởng/phạt, phiếu lương — **đồng bộ số liệu** với nguồn session thực khi đã có API (hiện có thể mock).
5. **Nhất quán:** Đơn giá giờ Offline/Online theo hồ sơ giáo viên; không double-count cùng buổi.

## Tasks / Subtasks

- [ ] **Backend** (AC: 1, 3)
  - [ ] Query aggregate từ `sessions` (hoặc bảng teaching log) join teacher; loại cancelled; timezone rõ ràng.
- [ ] **Frontend — báo cáo** (AC: 2)
  - [ ] Trang báo cáo (hoặc màn trong Finance/HR) + export `xlsx`/CSV.
- [ ] **Frontend — HR** (AC: 4)
  - [ ] `src/pages/HR/TeacherManagement.tsx`, `TeacherDetail.tsx`, modals điều chỉnh / phiếu lương — nối API khi sẵn sàng.
- [ ] **Kiểm thử**
  - [ ] Kỳ có N buổi completed → tổng giờ khớp; buổi cancelled → không tính.

## Dev Notes

### Phụ thuộc

- Session hoàn thành / điểm danh (Epic 4) xác định “thực tế đã dạy”; có thể giai đoạn 1 đếm theo `COMPLETED` + rule đơn giản.

### References

- [Source: `_bmad-output/planning-artifacts/epics.md` — Story 3.4, FR11]
- [Source: `dreamhigh-web/src/App.tsx` — `/hr/teachers`]
- Mock hiện tại: `dreamhigh-web/src/mock/teacherManagement.ts`

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
