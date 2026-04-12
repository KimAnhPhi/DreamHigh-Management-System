# Draft — Dashboard (bóc tách MH & phân tích API)

**Ngày:** 2026-03-29  
**Nguồn:** Code FE `dreamhigh-web/src/pages/Dashboard/DashboardPage.tsx`, layout `AppLayout` / `PageHeader`  
**Tham chiếu dữ liệu:** `pms-eng-api/prisma/schema.prisma` — `SystemUser`, `Lead`, `Student`, `TrainingClass`, `ClassStudent`, enums `LeadStatus`, `StudentStatus`, `TrainingClassStatus`

---

## Bước 1 — Bóc tách màn hình (input: code FE)

| MH | Tên / Route | Phần tử / hành vi | Loại | Ghi chú |
|----|-------------|-------------------|------|---------|
| MH1 | Dashboard (trong `AppLayout`) | Breadcrumb Hệ thống / Dashboard | Điều hướng tĩnh | `href: '#'` |
| MH1 | | Tiêu đề chào mừng kèm `user.fullName` | Text | Lấy từ **Zustand** (`useAuthStore`), không gọi API trên MH |
| MH1 | | 3 thẻ StatCard: Tổng số Học viên, Lead mới (Tháng này), Lớp học đang mở | Thống kê | Giá trị từ `useQuery` + **mock** (học viên x trend cố định; gói API hiện tại gọi `/users`, `/leads`, `/classes`) |
| MH1 | | Khối biểu đồ cột “Thống kê đào tạo” | UI tĩnh / mock | Mảng chiều cao cố định trong FE, **không** gọi API |
| MH1 | | “Thông báo hệ thống” — danh sách 3 mục | Tĩnh | `NotificationItem` hard-code |
| MH1 | | “Trạng thái hệ thống” All systems operational | Tĩnh | Không gọi health check |

---

## Bước 2 — Phân tích data & API

| MH | Phân tích data | API cần có (theo ERD / mục tiêu nghiệp vụ) |
|----|----------------|------------|
| MH1 | **FE tự có (session):** `fullName`, `email`, `roles` từ store sau đăng nhập. **Cần BE (thống kê):** tổng người dùng hệ thống (`system_users`), số lead (`leads`), số lớp đang vận hành (`classes` + `TrainingClassStatus` ACTIVE), **mục tiêu:** số học viên đang ACTIVE (`students`). | `GET /api/users` (role ADMIN), `GET /api/leads` (ADMIN/MANAGER/STAFF), **đề xuất bổ sung:** `GET /api/students` hoặc endpoint tổng hợp (lọc `status`), **đề xuất:** danh sách / đếm `TrainingClass` theo `status` — FE hiện gọi `GET /api/classes` nhưng BE chỉ có `GET /api/classes/:code` (chi tiết một lớp), nên **chưa khớp**; cần API danh sách hoặc `GET /api/dashboard/stats`. |
| MH1 | Biểu đồ, thông báo, trạng thái operational | Không API (mock / tĩnh) |

**Đối tác thứ ba:** **Không.** Dashboard không tích hợp dịch vụ ngoài (không giống Google OAuth, thanh toán, v.v.).

**Ghi chú hiện trạng code FE:** `Promise.all` với `/users`, `/leads`, `/classes`; đáp ứng `users` thường là `{ statusCode, data, meta }` — cần lấy `data` để đếm; `leads` hiện BE có thể trả mảng trực tiếp từ `findMany` (tuỳ chuẩn hóa); `/classes` không tồn tại dạng list — **cần chỉnh FE hoặc bổ sung BE.** Số học viên trên thẻ đang **mock** (124).

---

*File draft phục vụ review; sequence & API chính thức: `Sequence_Dashboard_20260329.md`.*
