# 2. Core Architectural Decisions

## Data Architecture
- **Database:** PostgreSQL (Mô hình Relational rất tối ưu cho các hệ thống ERP / Giáo dục với các constraints ràng buộc danh mục chặt chẽ).
- **ORM:** Prisma (Đảm bảo Type-safety từ DB đến API, thay đổi Schema trực quan, phù hợp với hệ sinh thái BMad).
- **Multi-tenancy:** Áp dụng logical `branchId` filtering qua Record-level (một Database cho toàn hệ thống) để quản lý đa chi nhánh dễ dàng triển khai.

## Authentication & Security
- **Auth Strategy:** JSON Web Token (JWT) kết hợp HttpOnly Cookies hoặc quản lý Storage Token.
- **Vân tay bảo mật (ASVS level tư duy):**
  - Mật khẩu phải dùng bcrypt hashing.
  - Phân quyền theo Guards của NestJS dựa trên Roles (Admin, Manager, AcademicStaff, Teacher, Student).
  - Rate limiting API và Data validation ở Transport layer (NestJS Validation Pipe + class-validator / Zod).

## API & Communication Patterns
- **Protocol:** RESTful API chuẩn hóa.
- **Contract Type:** `data` and `meta` (phân trang, filter) response DTOs. Mọi response đều trả về `statusCode`, `message`, `data`.
- **Giao tiếp Frontend - Backend:** Dùng React Query (để cache và quản lý loading state phía FE) + Axios Interceptors (để đính kèm token và handle 401 refresh token).

## Frontend Architecture
- **Framework:** React + Vite + TypeScript (Lựa chọn tối ưu cho SPA Dashboard vì không cần thiết SEO public ở Phase 1).
- **State Management:** Xử lý Server state bằng React Query. Xử lý Client global state (Theme/Sidebar/Toast) bằng Zustand.
- **UI Components:** Tailwind CSS + Shadcn UI.
- **Routing:** React Router DOM (Entity-based layout routing).

## Infrastructure & Deployment
- **Hosting Strategy:** 
  - Frontend: Vercel / Cloudflare Pages (Tốc độ biên cao, CDN mượt).
  - Backend: Setup trên Render / AWS ECS / VPS với Docker Compose.
- **Repository:** Two Repositories Pattern (`pms-eng-web` và `pms-eng-api`) để giảm thiểu conflict giữa team Frontend và Backend.
- **CI/CD:** GitHub Actions tự động lint, build và push image.

---
