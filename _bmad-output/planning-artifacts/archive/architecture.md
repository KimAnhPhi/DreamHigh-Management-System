---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7]
inputDocuments: ["PRD_QuanLyDaoTao_TrungTamTiengAnh.md"]
workflowType: 'architecture'
project_name: 'Phần mềm Quản lý Đào tạo Trung tâm Tiếng Anh'
user_name: 'Product Manager'
date: '2026-03-29'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## 1. Project Context Analysis

### Requirements Overview

**Functional Requirements:**
Hệ thống xoay quanh 13 module chính tập trung vào Vận hành (Học vụ, Giáo viên, Tài chính) và Tăng trưởng (Tuyển sinh CRM). Backend mang trọng số lớn về Logic nghiệp vụ (Event-driven cho việc cảnh báo điểm danh, State-machine quản lý vòng đời học viên, logic cấn trừ học phí ưu đãi).

**Non-Functional Requirements:**
- **Security:** Mã hóa dữ liệu người dùng, cấu trúc Role-Based Access Control (RBAC) khắt khe (VD: Học vụ không được xem doanh thu, chi nhánh nào chỉ thấy data chi nhánh đó).
- **Performance:** Báo cáo xuất realtime, grid hiển thị danh sách lớn phải phản hồi < 2s.

**Scale & Complexity:**
- Complexity: Medium-Enterprise (Quản lý đa chi nhánh, liên quan tài chính dòng tiền).
- Domain chính: Web SaaS (Operational Dashboard) + API Backend phục vụ Phase 3 Mobile App sau này.

---

## 2. Core Architectural Decisions

### Data Architecture
- **Database:** PostgreSQL (Mô hình Relational rất tối ưu cho các hệ thống ERP / Giáo dục với các constraints ràng buộc danh mục chặt chẽ).
- **ORM:** Prisma (Đảm bảo Type-safety từ DB đến API, thay đổi Schema trực quan, phù hợp với hệ sinh thái BMad).
- **Multi-tenancy:** Áp dụng logical `branchId` filtering qua Record-level (một Database cho toàn hệ thống) để quản lý đa chi nhánh dễ dàng triển khai.

### Authentication & Security
- **Auth Strategy:** JSON Web Token (JWT) kết hợp HttpOnly Cookies hoặc quản lý Storage Token.
- **Vân tay bảo mật (ASVS level tư duy):**
  - Mật khẩu phải dùng bcrypt hashing.
  - Phân quyền theo Guards của NestJS dựa trên Roles (Admin, Manager, AcademicStaff, Teacher, Student).
  - Rate limiting API và Data validation ở Transport layer (NestJS Validation Pipe + class-validator / Zod).

### API & Communication Patterns
- **Protocol:** RESTful API chuẩn hóa.
- **Contract Type:** `data` and `meta` (phân trang, filter) response DTOs. Mọi response đều trả về `statusCode`, `message`, `data`.
- **Giao tiếp Frontend - Backend:** Dùng React Query (để cache và quản lý loading state phía FE) + Axios Interceptors (để đính kèm token và handle 401 refresh token).

### Frontend Architecture
- **Framework:** React + Vite + TypeScript (Lựa chọn tối ưu cho SPA Dashboard vì không cần thiết SEO public ở Phase 1).
- **State Management:** Xử lý Server state bằng React Query. Xử lý Client global state (Theme/Sidebar/Toast) bằng Zustand.
- **UI Components:** Tailwind CSS + Shadcn UI.
- **Routing:** React Router DOM (Entity-based layout routing).

### Infrastructure & Deployment
- **Hosting Strategy:** 
  - Frontend: Vercel / Cloudflare Pages (Tốc độ biên cao, CDN mượt).
  - Backend: Setup trên Render / AWS ECS / VPS với Docker Compose.
- **Repository:** Two Repositories Pattern (`pms-eng-web` và `pms-eng-api`) để giảm thiểu conflict giữa team Frontend và Backend.
- **CI/CD:** GitHub Actions tự động lint, build và push image.

---

## 3. Implementation Patterns (API Contracts)

Để đảm bảo đồng bộ khi AI code (Backend và Frontend), chúng ta quy định chung chuẩn biên DTO như sau:

**1. Request DTO:**
Sử dụng `class-validator` (cho NestJS) ở Backend. Mọi payload từ Client phải match với DTO này.
```typescript
// VD: create-student.dto.ts
export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;
  
  // ...
}
```

**2. Standardized Response Format:**
API luôn wrap dữ liệu trả về theo Response Interface dưới đây:
```typescript
{
  "statusCode": 200,
  "message": "Lấy danh sách thành công",
  "data": [ { "id": 1, "name": "Mary" } ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 50
  }
}
```
Frontend bắt buộc gọi thông qua abstraction layer `api-client.ts` để đọc field `data`.

---

## 4. Project Structure & Boundaries

Chúng ta chia dự án thành 2 repo độc lập cho Web và API.

### 4.1. Backend API (NestJS Base Tree) - `pms-eng-api`
Phân rã theo Domain-Driven Design (khuyến nghị cho hệ thống đa module của Trung tâm):

```text
pms-eng-api/
├── package.json
├── prisma/
│   └── schema.prisma // Base DB Diagram
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── common/         // Code dùng chung toàn cục
│   │   ├── exceptions/ // Custom JWT Exception, Business Error
│   │   ├── filters/    // Global Exception Filter
│   │   └── guards/     // RBAC Auth Guards
│   └── modules/        // Chứa 13 business module
│       ├── auth/
│       ├── system-config/ // Danh mục dùng chung
│       ├── students/   // Quản lý học viên
│       │   ├── dto/
│       │   ├── state-machine/ // Xử lý logic vòng đời Lead -> Học viên
│       │   ├── controllers/
│       │   ├── services/
│       │   └── repositories/
│       ├── classes/    // Quản lý lớp, khóa, xếp lịch
│       ├── attendance/ // Điểm danh
│       │   └── events/ // Bắn event "Vắng học quá giới hạn"
│       └── billing-finance/ // Học phí
│           ├── dto/
│           ├── controllers/
│           ├── services/
│           └── events/      // Lắng nghe event "Thanh toán xong" -> báo SMS 
```

**Integration Flow API:**
- Frontend Submit "Nộp học phí" -> `billing-finance.controller` 
- -> `billing-finance.service` cập nhật công nợ PostgreSQL
- -> Phát Event `PaymentSuccessEvent` (sử dụng NestJS EventEmitter)
- -> `students` module hoặc `notification` module lắng nghe sự kiện để gửi Email và đổi trạng thái học viên. Kiến trúc giúp Code không bị gãy (Decoupled).

### 4.2. Frontend App (Vite React) - `pms-eng-web`
Sử dụng Feature-based Structure tránh Flat hierarchy (vì 13 module nhét chung vào thư mục `pages/` sẽ rối).

```text
pms-eng-web/
├── package.json
├── vite.config.ts
├── src/
│   ├── App.tsx
│   ├── assets/
│   ├── components/ 
│   │   ├── ui/       // Buttons, Inputs, Modals theo Shadcn
│   │   └── layout/   // AppShell, Sidebar, TopHeader
│   ├── features/     // Core Logic đặt tại đây
│   │   ├── admin-danh-muc/
│   │   ├── hoc-vien/ // components chứa data table, forms
│   │   ├── lich-hoc/
│   │   └── thu-chi/
│   │       ├── api/     // Các React Query mutations, services gọi axios
│   │       ├── hooks/   // Custom hooks
│   │       └── schemas/ // Zod forms 
│   ├── lib/
│   │   ├── api-client.ts // Axios config tích hợp token
│   │   └── utils.ts      // Format ngày, format tiền tệ VND
│   ├── pages/            // Chỉ chịu trách nhiệm kết xuất và Routes mapping
│   │   ├── dashboard/
│   │   │   └── DashboardPage.tsx
│   │   ├── students/
│   │   │   ├── StudentListPage.tsx
│   │   │   └── StudentDetailPage.tsx
│   │   └── billing/
│   └── routes/           // Cấu trúc Router configuration mapping Admin Layout
```

**UI Boundaries / Data Fetching:**
- Tính năng nào thì code query logic nằm ở `features/<folder>/api/`. Layer Pages (`pages/`) chỉ mount Data Table Component và trỏ link.
- Không fetch data trực tiếp trong Component theo kiểu `useEffect`, bắt buộc dùng React Query để đảm bảo loading / error state được handle clean.
