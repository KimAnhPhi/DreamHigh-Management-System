# Story 1.2: Định nghĩa Danh mục Đào tạo & Khóa học (FR1, FR7)

Status: review

## Story

As an Admin hoặc Quản lý Đào tạo,

I want tạo, sửa, và ngừng áp dụng các danh mục cốt lõi (Chương trình, Cấp độ, Loại lớp, Phòng học) cùng Khóa học liên kết danh mục,

So that toàn hệ thống có master data thống nhất cho xếp lớp, tuyển sinh và học phí sau này.

## Acceptance Criteria

1. **Danh mục dùng chung (FR1):** CRUD hoặc tương đương cho program / level / class type / room; hỗ trợ trạng thái Active/Inactive (soft deactivate) không phá FK đang được tham chiếu.
2. **Khóa học (FR7):** Tạo/sửa khóa học gắn program + level (và metadata: thời lượng, sĩ số nếu PRD yêu cầu); hiển thị lưới có tìm kiếm/phân trang; thao tác grid &lt; 2s theo NFR2.
3. **API:** Envelope chuẩn; validate input (tránh trùng tên do khoảng trắng thừa).
4. **FE:** Màn hình data-centric, responsive desktop/tablet; dùng DS (Card, Button, Input, …) trong `dreamhigh-web`.

## Tasks / Subtasks

- [x] **Backend** (AC: 1–3)
  - [x] Module `categories`: REST programs, levels, rooms, **class-types**, **courses**, **branches**; chuẩn hóa mã/tên (`catalog-normalize.ts`); soft deactivate (`CatalogStatus` / `RoomStatus`).
  - [x] Kiểm tra trước khi ngừng: phòng (buổi học sắp tới); khóa học (lớp PLANNED/ACTIVE).
- [x] **Frontend** (AC: 2, 4)
  - [x] `CategoryManagement.tsx` — 4 tab (Chương trình, Cấp độ, Loại lớp, Phòng) + React Query + modal.
  - [x] `CourseManagement.tsx` + `CourseCatalogModal.tsx` — lưới khóa học, tìm kiếm debounce 300ms, phân trang, CRUD.
  - [x] `App.tsx` — `/admin/category-catalog` & `/admin/categories` cho **ADMIN** và **MANAGER**; users/audit vẫn ADMIN-only.
- [x] **Kiểm thử**
  - [x] Jest: `catalog-normalize.spec.ts`; regression: `student-status.machine.spec.ts`.

## Dev Notes

### Architecture compliance

- Master data thường thuộc `system-config` hoặc module tương đương trong `pms-eng-api` [Source: `architecture/04-project-structure-boundaries.md`].

### Frontend (dreamhigh-web)

- Tham chiếu: `src/pages/Admin/CategoryManagement.tsx`, `CourseManagement.tsx`, `CoursesHubPage.tsx` — bám layout `AppLayout` + `PageHeader` khi thêm/sửa.

### Database

- Prisma models: Program, Level, Room, Course — đối chiếu `schema.prisma`; không hard-delete khi còn tham chiếu.

### References

- [Source: `_bmad-output/planning-artifacts/epics.md` — Story 1.2]

## Dev Agent Record

### Agent Model Used

Composer (default)

### Debug Log References

### Completion Notes List

- **Schema:** model `ClassType` (loại lớp), migration `20260329190000_class_types`.
- **API:** `GET /categories/branches`, `GET/POST/PATCH/DELETE` cho `class-types`, `GET /categories/courses` (pagination + search + `levelId`), CRUD courses. Mutation roles: **ADMIN**, **MANAGER**. Chuẩn hóa trim/spaces; mã catalog uppercase sau normalize.
- **FE:** Bỏ mock chính trên `CategoryManagement` / `CourseManagement`; `CourseCatalogModal` map trường Prisma (`totalSessions`, `durationWeeks`, `tuitionFee`, `levelId`).
- **AC3 envelope:** Chưa áp dụng envelope toàn cục; validate phía server qua logic + message lỗi rõ.

### File List

- `pms-eng-api/prisma/schema.prisma`
- `pms-eng-api/prisma/migrations/20260329190000_class_types/migration.sql`
- `pms-eng-api/src/modules/categories/categories.service.ts`
- `pms-eng-api/src/modules/categories/categories.controller.ts`
- `pms-eng-api/src/modules/categories/catalog-normalize.ts`
- `pms-eng-api/src/modules/categories/catalog-normalize.spec.ts`
- `dreamhigh-web/src/pages/Admin/CategoryManagement.tsx`
- `dreamhigh-web/src/pages/Courses/CourseManagement.tsx`
- `dreamhigh-web/src/pages/Courses/CourseCatalogModal.tsx`
- `dreamhigh-web/src/App.tsx`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

### Review Findings

- [x] [Review][Defer] `categories.controller` dùng `@Body() body: any` — thiếu DTO/class-validator từng endpoint; phù hợp ghi chú AC3 envelope chưa toàn cục trong story. [`pms-eng-api/src/modules/categories/categories.controller.ts`]

## Change Log

- 2026-03-29: Story 1.2 — catalog API đầy đủ (loại lớp, khóa học, branches), normalize input, FE CategoryManagement + CourseManagement nối API, route MANAGER cho danh mục.
