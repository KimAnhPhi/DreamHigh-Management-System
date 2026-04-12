# Story 1.3: Quản lý Người dùng & Phân quyền RBAC đa vai trò / đa chi nhánh (FR2, FR3)

Status: in-progress

## Story

As an Admin,

I want tạo và cập nhật tài khoản nhân viên với **một hoặc nhiều vai trò**, **một hoặc nhiều chi nhánh**, và ma trận quyền theo vai trò; đồng thời xem chi tiết tài khoản ở chế độ chỉ đọc khi cần,

So that dữ liệu và thao tác được giới hạn đúng chức danh và đúng phạm vi chi nhánh (NFR5).

## Acceptance Criteria

1. **Màn hình IAM tập trung:** Route **`/admin/users`** (Quản trị hệ thống) có các tab: **Người dùng**, **Vai trò & quyền**, **Log thao tác**, **Chi nhánh**, **Cấu hình** — layout `AppLayout` + DS midnight/gold.
2. **Danh sách người dùng:** Tìm kiếm; hiển thị username, họ tên, email, badge **nhiều** vai trò, **nhiều** mã chi nhánh; thao tác xem / sửa / tạo / khóa-mở (theo luồng đã có).
3. **Modal tài khoản (tạo/sửa):** Username bắt buộc; **khóa sửa username** sau khi tài khoản đã tồn tại; Họ tên bắt buộc; Email, SĐT; Trạng thái (Active / Suspended / Locked — map với enum backend); **chọn nhiều vai trò** (UI dạng thẻ có tick); **chọn nhiều chi nhánh** (chip); lưu gửi payload đầy đủ `roles[]`, `branchIds[]`.
4. **Modal chỉ đọc:** Cùng form ở trạng thái disabled; nút đóng; không gọi API cập nhật.
5. **Backend:** API lưu `SystemUser` với mảng role id và mảng branch id; JWT/claims hoặc load permission sau đăng nhập phản ánh đúng RBAC và scope chi nhánh (theo kiến trúc đã chọn).
6. **Bảo vệ:** User không phải Admin không gọi được API quản trị user; `RolesGuard` / `@Roles(...)` trên controller.

## Tasks / Subtasks

- [x] **Frontend — đồng bộ UI đã có** (AC: 1–4)
  - [x] `src/pages/Admin/AdminSystemManagementPage.tsx`, `system/SystemUserModal.tsx`, `tabs/AdminUsersTab.tsx`, `AdminRolesTab.tsx`, `AdminBranchesTab.tsx` (chi nhánh dữ liệu từ API).
  - [x] `ProtectedRoute` chỉ `ADMIN` cho `/admin/users` (đối chiếu `App.tsx`).
  - [x] Nối mock → API: `GET /users`, `GET /users/lookup/roles`, `GET /categories/branches`; `POST` / `PATCH` tạo/cập nhật; toggle trạng thái; ma trận vai trò vẫn merge `MOCK_ROLES` permissions theo `code`.
- [x] **Backend** (AC: 5, 6)
  - [x] DTO: `roles: string[]` (mã vai trò), `branchIds: number[]`; JWT strategy load roles + branchIds; `@Roles('ADMIN')` trên quản trị user.
- [ ] **Kiểm thử**
  - [ ] Tạo user 2 role + 2 branch; đăng nhập và kiểm tra scope; 403 khi role thấp gọi admin API.

## Dev Notes

### Frontend (dreamhigh-web) — tham chiếu file

- `src/types/adminSystem.ts` — `SystemUser`, `UserStatus`, `SystemRole`, `Branch`.
- `src/mock/adminSystem.ts` — mock ma trận quyền + `MOCK_ROLES.code`; danh sách user mock chỉ còn dùng khi dev offline.
- `src/pages/Admin/system/SystemUserModal.tsx` — modal IAM (đa vai trò theo `role.code`, đa chi nhánh `branchIds` string, mật khẩu khi tạo, read-only).

### Backend

- Không lưu mật khẩu plaintext; phân quyền theo role + branchId trên từng request có guard.
- Trạng thái tài khoản API: `ACTIVE` | `INACTIVE` (UI map Suspended/Locked → `INACTIVE` khi lưu).

### References

- [Source: `_bmad-output/planning-artifacts/epics.md` — Epic 1, FR2, FR3, Story 1.3]
- [Source: `dreamhigh-web/src/App.tsx` — route `/admin/users`]

## Dev Agent Record

### Agent Model Used

Composer (Cursor agent)

### Debug Log References

- `dreamhigh-web`: `npm run build` (tsc + vite) — OK.
- `pms-eng-api`: `npx prisma generate && npm run build` — OK (client phải generate sau khi schema có `username`).

### Completion Notes List

- Trang quản trị người dùng dùng React Query + `apiClient`; badge vai trò resolve theo `role.code`; chi nhánh từ `GET /categories/branches` (id string trên UI).
- Modal tạo user: email bắt buộc, mật khẩu + xác nhận tối thiểu 6 ký tự; cập nhật user gửi `status` `ACTIVE`/`INACTIVE`.
- Tab vai trò: khóa chỉnh ma trận khi `code === 'ADMIN'`; Super Admin không còn phụ thuộc id cố định `r1`.

### File List

- `dreamhigh-web/src/pages/Admin/AdminSystemManagementPage.tsx`
- `dreamhigh-web/src/pages/Admin/system/SystemUserModal.tsx`
- `dreamhigh-web/src/pages/Admin/system/tabs/AdminUsersTab.tsx`
- `dreamhigh-web/src/pages/Admin/system/tabs/AdminRolesTab.tsx`
- `dreamhigh-web/src/mock/adminSystem.ts`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

### Review Findings

- [ ] [Review][Decision] Nút « Lưu cấu hình quyền » (`handleSaveRoles`) chỉ hiển thị toast thành công, **không** gọi API cập nhật `RolePermission` / vai trò — cần xác nhận: giữ mock UI cho đến khi có API, hay đổi nhãn/disabled để tránh hiểu nhầm? [`dreamhigh-web/src/pages/Admin/AdminSystemManagementPage.tsx`]
- [ ] [Review][Patch] `JwtStrategy` fallback `secretOrKey` hardcode khi thiếu `JWT_SECRET` — rủi ro lộ secret / cluster đồng nhất kém. [`pms-eng-api/src/modules/auth/strategies/jwt.strategy.ts`]
