---
description: "Workflow to create project layout prototypes and generate frontend code."
---

Version: 1.0.0
Author: M2MBA
Last Updated: 2026-03-09
Description: Workflow 2 pha tạo Layout từ IA Prototype đến FE Code hoàn chỉnh.

# Workflow: Tạo Layout Prototype → FE Code

## Mục đích
Workflow này dẫn dắt quá trình thiết kế bộ khung giao diện tổng thể (master layout) từ Brand Guideline và danh sách Use Case, sau đó chuyển đổi prototype đã được chốt thành code Frontend thực tế.

---

## PHASE 1 — Tạo Layout Prototype (Skill: ba-ui-layout-gen)

### Bước 1: Kích hoạt Skill tạo Layout
Kích hoạt skill `ba-ui-layout-gen` với thông tin đầu vào:
- **Brand Guideline**: Do user cung cấp đường dẫn cụ thể`
- **Danh sách Use Case / Tính năng**: Lấy từ file Use Case List hoặc yêu cầu User cung cấp
- **Mô tả ứng dụng**: Loại ứng dụng (Web Admin, Dashboard, Mobile App...) và mục đích hệ thống

Skill sẽ tự động thực hiện:
1. Phân tích Information Architecture (IA) — Cấu trúc menu, vùng layout
2. Trình bày đề xuất IA dạng bullet-list cho User review
3. **Chờ User xác nhận IA** trước khi sinh code HTML

### Bước 2: Chờ User xác nhận IA và tinh chỉnh (nếu cần)
- Skill sẽ **DỪNG** ở đây để User review và confirm cấu trúc điều hướng, phân bổ không gian
- Nếu có điều chỉnh, cập nhật theo phản hồi của User
- Khi User xác nhận → Skill tiến hành build file `HTML Prototype Layout`

### Bước 3: Skill sinh file HTML Prototype
Skill tự động tạo file HTML layout tại đường dẫn được User chỉ định (mặc định: `Prototype/Layout/`).

### Bước 4: Chờ User CHỐT Layout
- Mở file HTML để User xem trực quan
- **DỪNG** và hỏi User: *"Bạn đã xem xong Layout Prototype. Bạn muốn chỉnh sửa thêm hay tiến hành sinh FE Code?"*
- Nếu cần chỉnh: Quay lại Bước 1 với yêu cầu điều chỉnh
- Nếu User chốt → Chuyển sang Phase 2

---

## PHASE 2 — Sinh FE Code Layout (Skill: ba-html-to-react-ds-code-gen)

### Bước 5: Kích hoạt Skill chuyển đổi HTML → React Code
Sau khi User chốt Layout Prototype, kích hoạt skill `ba-html-to-react-ds-code-gen` với:
- **Input**: File HTML Layout Prototype đã được chốt (từ Phase 1)
- **Brand Guideline**: Cùng file đã dùng ở Phase 1
- **Phạm vi (Scope)**: Chuyển đổi toàn bộ HTML Layout Prototype thành:
  - Design Tokens (`colors.ts`, `typography.ts`, `spacing.ts`, `radius.ts`, `shadow.ts`)
  - Base UI Components (Button, Input, Card, Badge, Tag, Table, Modal, Tabs...)
  - Layout Components (AppLayout, Header, Sidebar, Footer, PageHeader, Section...)
  - Tailwind config được extend từ Design Tokens
  - Routing structure cơ bản (nếu multi-page)

> **Lưu ý:** Skill `ba-html-to-react-ds-code-gen` sẽ tự động:
> - Phân tích toàn bộ HTML từ trên xuống dưới, không bỏ sót bất kỳ phần nào
> - Map HTML → React Components theo Design System
> - Sinh code React + TypeScript + Tailwind tuân thủ Brand Guideline
> - Tạo mock data extract trực tiếp từ HTML gốc

### Bước 6: Xác nhận kết quả
- Agent liệt kê các file đã sinh ra (Design Tokens, Components, Pages)
- Hướng dẫn User kiểm tra trực tiếp trên browser (chạy `npm run dev`)
- Gợi ý bước tiếp theo: Dùng workflow `/ba-ui-function-detail` để tạo từng màn hình chức năng chi tiết
