# 4. Project Structure & Boundaries

Chúng ta chia dự án thành 2 repo độc lập cho Web và API.

## 4.1. Backend API (NestJS Base Tree) - `pms-eng-api`
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

## 4.2. Frontend App (Vite React) - `pms-eng-web`
**Dev local (Vite):** `http://localhost:5175/` — cấu hình cổng trong `vite.config.ts` (workspace hiện tại: thư mục `dreamhigh-web`). Request `/api` được proxy tới NestJS `http://127.0.0.1:3000`.

**Cần chạy song song Backend** (`pms-eng-api`): `npm run start:dev` — API mặc định `http://localhost:3000`, prefix `api` (ví dụ đăng nhập: `POST /api/auth/login`). Thiếu API sẽ lỗi kết nối khi đăng nhập.

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
