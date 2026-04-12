---
name: ba-ui-layout-gen
description: "Skill thiết kế Information Architecture và tạo Layout HTML Prototype từ Brand Guideline và danh sách Use Case trước khi thiết kế/code FE chi tiết."
---

# HƯỚNG DẪN SKILL: BA UI LAYOUT GEN

**Version:** 1.0.1
**Author:** M2MBA
**Last Updated:** 2026-03-17
**Description:** Kỹ năng phân tích kiến trúc thông tin (IA) từ danh sách Use Case và Brand Guideline, sau đó tạo Layout HTML Prototype để User xác nhận trước khi code FE thật.

## 🎯 Mục đích
Tạo ra một cấu trúc Layout cốt lõi (bố cục màn hình, điều hướng, vùng nội dung chính) chuẩn xác, hợp lý với các Use Case của ứng dụng và tuân thủ Brand Guideline. Cung cấp file HTML trực quan để User dễ dàng hình dung kiến trúc thông tin, từ đó điều chỉnh và "chốt" Layout trước khi đầu tư làm FE Code chi tiết.

## 📥 Đầu vào (Inputs)
1. **Brand Guideline**: Tài liệu quy chuẩn thương hiệu (Màu sắc, Typography, Spacing, System Design Component cơ bản nếu có).
2. **Danh sách Use Case (UC) / Tính năng**: Danh sách các chức năng hệ thống cần hỗ trợ trên giao diện.
3. **Ứng dụng cần thiết kế**: Thông tin bối cảnh nền tảng (Ví dụ: Web App quản lý dự án, Mobile App bán hàng, Dashboard Admin Platform...).

## 🔄 Quy trình thực thi (Khắt khe tuân thủ)

### Bước 1: Phân tích Kiến trúc thông tin (Information Architecture - IA)
Agent phân tích các Input để phác thảo tổng quan IA:
- **Cấu trúc điều hướng (Navigation Structure)**: Xác định loại menu (Ví dụ: Top Header Menu, Left Sidebar, Bottom Tab cho Mobile).
- **Phân bổ không gian (Layout Regions)**: Phân bổ vùng Header, Footer, Main Content Area, Panel phụ trợ, v.v.
- **Sơ đồ phân bổ Use Case**: Nhóm các Use Case có liên quan logic vào chung một khu vực/menu item để tối ưu UX.

### Bước 2: Đề xuất & Làm rõ yêu cầu (Clarification)
- Trình bày tóm tắt đề xuất IA (Sơ đồ điều hướng dạng text/bullet list) cho User.
- **Bắt buộc đặt câu hỏi**: NẾU có bất kỳ Use Case nào chưa rõ ràng về vị trí đặt, thiếu thông tin về luồng phân quyền, hoặc cấu trúc có điểm chưa logic, Agent **PHẢI** hỏi lại User.
- **Chờ Xác nhận (Wait for Confirm)**: Phải đợi User phản hồi, điều chỉnh và chốt IA trước khi sang bước 3.

### Bước 3: Build Prototype Layout HTML (Incremental Update)
Sau khi User đã Confirm IA, Agent tiến hành code file HTML Wireframe/Layout:
- **Quy mô hiển thị (Role Context)**: LUÔN thiết kế theo góc nhìn Master (Master Layout), tích hợp toàn bộ hệ thống menu Navigation của TẤT CẢ các Role vào một màn hình duy nhất để User có cái nhìn toàn cảnh về bộ khung kiến trúc thông tin.
- **Ngôn ngữ/Công nghệ**: Sử dụng HTML5 và CSS cơ bản (Plain CSS hoặc TailwindCSS tùy bối cảnh). Tuyệt đối **KHÔNG code JS logic phức tạp** hay Framework FE (React, Vue) ở bước này.
- **Nội dung Mockup**: Sử dụng các "Placeholder Box" hoặc dummy content tại các vùng chức năng (Ví dụ: box ghi "Datatable danh sách dự án ở đây").
- **Áp dụng Brand**: Sử dụng đúng mã màu (Primary, Secondary, Background) và Font chữ từ Brand Guideline để layout có cảm giác "chuẩn brand".
- **⚠️ KIỂM SOÁT LỖI (Incremental Update)**: Nếu cấu trúc Layout HTML dài, Agent **BẮT BUỘC** phải sinh nội dung theo từng đoạn (segment) và cập nhật dần. Tuyệt đối không sinh file dung lượng quá lớn trong một lần phản hồi để tránh lỗi đứt gãy context window.
- **Vị trí lưu file HTML:** `docs-BA/Prototype/Layout/[tên-ứng-dụng]/` (tạo thư mục nếu chưa có).

## ⚠️ Quy tắc & Giới hạn (Atomic Design)
- **Tính nguyên tử (Single Responsibility)**: Skill này CHỈ tập trung xây dựng bộ khung Layout & IA. KHÔNG tạo nội dung chi tiết bên trong từng form/màn hình.
- Nếu User yêu cầu code FE hoàn chỉnh cho cả chức năng bên trong, Agent cần hướng dẫn User hoàn thành Layout trước, sau đó chuyển sang dùng skill `ba-frontend-code-gen` để thực hiện tiếp.
- Nếu ứng dụng rất lớn (đa luồng), Agent chủ động gợi ý chia nhỏ làm IA cho từng module (VD: Module Admin riêng, Module Khách hàng riêng) để tránh quá tải.

## 💡 Hướng dẫn kích hoạt
Câu lệnh mẫu để gọi Skill:
> "Kích hoạt skill ba-ui-layout-gen. Dưới đây là Brand Guideline (...), danh sách Use Case là (...), và ứng dụng này là hệ thống Quản lý Dự án nội bộ. Hãy phân tích IA."
