---
description: "Workflow to create detailed screen designs and generate frontend code."
---

Version: 1.0.0
Author: M2MBA
Last Updated: 2026-03-09
Description: Workflow 2 pha tạo MH chi tiết từng chức năng từ Prototype đến FE Code hoàn chỉnh.

# Workflow: Tạo MH Chi Tiết → FE Code Chức Năng

## Mục đích
Workflow này dẫn dắt quá trình thiết kế màn hình chi tiết cho một chức năng đơn lẻ (bao gồm User Flow và HTML Prototype), sau đó sinh code Frontend React/TypeScript tương ứng khi User đã chốt thiết kế.

> **Tiên quyết**: Layout Framework (Sidebar, Header, LayoutWrapper...) đã được tạo trước bởi workflow `/ba-layout-gen`.

---

## PHASE 1 — Tạo MH Chi Tiết (Skill: ba-ui-function-gen)

### Bước 1: Thu thập thông tin đầu vào
Trước khi kích hoạt skill, Agent thu thập hoặc đọc sẵn các thông tin sau:
- **Tên chức năng**: Ví dụ "Danh sách dự án", "Thêm mới hóa đơn"...
- **Vị trí Menu**: Đường dẫn điều hướng trên hệ thống (VD: `Dự án > Danh sách dự án`)
- **Brand Guideline**: Đọc file mới nhất tại `Prototype/Brand Guideline/brand-guideline_[YYYYMMDD].md`
- **Data Model**: Thông tin bảng dữ liệu liên quan (field names, types, relationships) — Đọc từ ERD hoặc User cung cấp

### Bước 2: Kích hoạt Skill tạo MH chi tiết
Kích hoạt skill `ba-ui-function-gen` với các input đã thu thập ở Bước 1.

Skill sẽ tự động thực hiện:
1. Phân tích logic nghiệp vụ và tạo file **User Flow** (Mermaid Flowchart)
   - Lưu tại: `Docs/Prototypes/[ten-chuc-nang]/user-flow-[ten-chuc-nang].md`
2. Build file **HTML Prototype** standalone cho chức năng
   - Lưu tại: `Docs/Prototypes/[ten-chuc-nang]/ui-proto-[ten-chuc-nang].html`
   - Bao gồm: Breadcrumb, Title, tất cả Controls (Input/Table/Button) theo Data Model

### Bước 3: Chờ User xem xét và xác nhận
- Agent thông báo vị trí 2 file được tạo ra
- **DỪNG** và hỏi User: *"User Flow và HTML Prototype cho chức năng '[Tên]' đã sẵn sàng. Bạn muốn chỉnh sửa gì không, hay tiến hành sinh FE Code?"*
- Nếu cần chỉnh: Re-generate hoặc chỉnh sửa theo phản hồi của User, quay lại hỏi xác nhận
- Nếu User OK → Chuyển sang Phase 2

---

## PHASE 2 — Sinh FE Code Chức Năng (Skill: ba-frontend-code-gen)

### Bước 4: Kích hoạt Skill sinh FE Code cho chức năng
Sau khi User chốt Prototype, kích hoạt skill `ba-frontend-code-gen` với phạm vi giới hạn **chỉ cho chức năng này**:
- **Input**: File `ui-proto-[ten-chuc-nang].html` và `user-flow-[ten-chuc-nang].md`
- **Brand Guideline**: Cùng file đã dùng ở Phase 1
- **Phạm vi (Scope)**: Skill thực hiện từ **Bước 6** (Lắp ráp Pages) của skill — giả định Layout Framework đã có sẵn.
  - Tạo Page Component tương ứng tại `frontend/[app]/src/pages/[ten-chuc-nang]/`
  - Tạo Feature Components cụ thể nếu cần (form, table...) tại `design-system/components/features/`
  - Import và sử dụng các Base UI Components và Layout đã có từ Design System

> **Lưu ý quan trọng:** Không tái tạo Design Tokens, Base Components hay Layout Framework. Chỉ tạo mới page và feature components cho chức năng này.

### Bước 5: Tích hợp vào Routing
- Agent cập nhật file routing (`App.tsx` hoặc `router.tsx`) để thêm route mới cho chức năng
- Đảm bảo breadcrumb và menu item active state hoạt động đúng với path mới

### Bước 6: Xác nhận kết quả
- Agent liệt kê các file đã tạo/cập nhật
- Hướng dẫn User kiểm tra trực tiếp trên browser (chạy `npm run dev` và navigate tới route mới)
- Gợi ý: Sử dụng lại workflow `/ba-ui-function-detail` cho chức năng tiếp theo
