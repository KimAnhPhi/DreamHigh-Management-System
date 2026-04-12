---
name: ba-frontend-code-gen
description: "Skill hỗ trợ Business Analyst/Developer tạo Frontend code dựa trên Brand Guideline và System Design"
---

# HƯỚNG DẪN SKILL: BA FRONTEND CODE GEN

**Version:** 1.0.1
**Author:** M2MBA
**Last Updated:** 2026-03-17
**Description:** Skill tự động hóa quá trình sinh code Frontend (React/TypeScript/Tailwind) từ yêu cầu của user, tuân thủ chặt chẽ Brand Guideline và nguyên tắc System Design.

# NGỮ CẢNH VÀ MỤC TIÊU (CONTEXT & OBJECTIVE)
Khi làm việc trong các dự án web, việc đảm bảo UI/UX nhất quán với Brand Guideline là vô cùng quan trọng. 
Skill này giúp Agent tự động tạo ra một bộ code Frontend hoàn chuẩn mực, có kiến trúc Design System rõ ràng (Tokens, UI Components, Layouts, Utilities) giúp tăng khả năng tái sử dụng (reusability) và dễ dàng bảo trì (maintainability).

# HƯỚNG DẪN KÍCH HOẠT (TRIGGER)
Skill được kích hoạt khi User yêu cầu:
- "Gen code FE cho trang..."
- "Tạo giao diện dựa trên Brand Guideline..."
- "Code frontend cho MH Design..."

# ĐIỀU KIỆN TIÊN QUYẾT (PREREQUISITES)
1. Có Brand Guideline chuẩn tại `docs-BA/Prototype/Brand Guideline/brand-guideline_[YYYYMMDD].md`.
2. Có yêu cầu thiết kế màn hình (MH Design) từ User.

# QUY TRÌNH THỰC THI (EXECUTION STEPS)

Agent **BẮT BUỘC** thực hiện tuần tự các bước sau (Không bỏ qua bước nào):

## Bước 1: Thu thập thông tin & Đọc Brand Guideline
- **Nếu có Stitch Design**: Gọi skill `ba-stitch-design-sync` trước để extract và sync tokens từ Stitch
- Đọc file `docs-BA/Prototype/Brand Guideline/brand-guideline_[YYYYMMDD].md` mới nhất.
- Trích xuất toàn bộ: Color System (hex codes), Typography (font, size, weight), Spacing System, Component Specifications.
- **Lưu ý:** Tuyệt đối không tự suy diễn, dùng sai mã màu hoặc kích thước đã quy định.
- **Ưu tiên Stitch**: Nếu Brand Guideline khác với Stitch Design → Update Brand Guideline theo Stitch.

## Bước 2: Khởi tạo System Architecture & Design Tokens
- Tạo cấu trúc thư mục chuẩn trong `frontend/[tên-ứng-dụng]/src/`:
  - `design-system/tokens/`
  - `design-system/components/ui/`
  - `design-system/components/layout/`
  - `design-system/hooks/`
  - `design-system/utils/`
  - `pages/`
- Render các Design Tokens ra file (CSS Variables hoặc TypeScript Constants) trong thư mục `tokens/` (colors.ts, typography.ts, spacing.ts, index.ts).

## Bước 3: Tạo Centralized Management (Utilities, Constants & Hooks)
- Tạo các file tiện ích và hằng số dùng chung tại `design-system/utils/` và `design-system/constants/`:
  - `status.ts` hoặc `constants.ts`: Quản lý **trạng thái tập trung** (Enums + Mapping Config). Bắt buộc phải khai báo cố định cấu hình cho các trạng thái (ví dụ: danh mục trạng thái đơn hàng, màu sắc hiển thị tương ứng với từng trạng thái, icon đi kèm...).
  - `categories.ts`: Quản lý **danh mục dùng chung** (ví dụ: giới tính/gender, loại user, phân loại khóa học...). Tất cả các dữ liệu fix cứng trên giao diện dùng cho nhiều màn hình khác nhau phải được định nghĩa tại đây.
  - `cn.ts`: Utility nối class (clsx + tailwind-merge).
  - `format.ts`: Utility định dạng (tiền tệ, ngày tháng).
- Tạo các hooks dùng chung tại `design-system/hooks/` (VD: `useMediaQuery`, `useDebounce`).

## Bước 4: Tạo Base UI Components (Reusable)
- Xây dựng các Base Components (Button, Input, Card, Badge, Table...) tại `design-system/components/ui/`.
- **Yêu cầu bắt buộc:**
  - Components phải generic, tùy chỉnh thông qua props.
  - KHÔNG gắn business logic vào Base Components.
  - Code Typescript chuẩn (Kèm file .types.ts).
  - Kết nối components với Design Tokens (Sử dụng chuẩn class hoặc template literal).
  - Component Badge/Status phải xài config từ `utils/status.ts`.

## Bước 5: Tạo Layout Components
- Xây dựng Layout Framework (Header, Footer, Sidebar, Layout Content) tại `design-system/components/layout/`.
- Áp dụng padding, margins, nền tảng từ Design Tokens để đảm bảo bố cục website cứng cáp.

## Bước 6: Lắp ráp Pages
- Xây dựng các trang (Pages) theo cấu trúc MH Design yêu cầu tại thư mục `pages/`.
- **Luật:** Chỉ được sử dụng các components từ `design-system/`. Tuyệt đối không lặp lại code HTML thô (hardcode classes) nếu Component tương ứng đã có. 
- Gọi utility `getStatusConfig`, `getCategoryConfig` hoặc các Constant/Enum từ tập trung định nghĩa khi render các tags, select element hiển thị trạng thái, danh mục, giới tính... Tuyệt đối KHÔNG tự hardcode mảng dữ liệu fix ở các page.

# QUY TẮC BẢO ĐẢM CHẤT LƯỢNG (RULES & BEST PRACTICES)
- **Incremental Output:** Agent phải sinh từng thư mục/file theo từng segment, không sinh toàn bộ codebase khổng lồ trong một lượt (để tránh giới hạn token).
- **TypeScript & Type Safety:** Phải dùng TypeScript 100%. Export đầy đủ type để reuse.
- **Tuân thủ Brand Guideline:** Mọi hardcoded padding/margin/color trong file Pages/Layout đều vi phạm quy tắc. Bắt buộc import tokens/classes của Design System.
- **Centralized Data:** Phải xây dựng cơ chế lưu trữ cố định cho các dữ liệu được fix cứng (trạng thái, giới tính, màu sắc theo trạng thái, map category,...). Khi gen page, bắt buộc gọi các biến cấu hình tại `constants.ts` hoặc `status.ts`/`categories.ts` thay vì tạo list hardcoded.
- **Dễ bảo trì:** Logic filter (business logic) phải nằm ở Pages hoặc Hook, tuyệt đối không nằm ở tầng UI Components.
