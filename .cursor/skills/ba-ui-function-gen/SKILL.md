---
name: ba-ui-function-gen
description: "Skill gen MH giao diện từng chức năng đơn lẻ từ brand guideline và data model, bao gồm User Flow (Mermaid) và HTML Prototype."
---

# HƯỚNG DẪN SKILL: BA UI FUNCTION GEN

**Version:** 1.0.1
**Author:** M2MBA
**Last Updated:** 2026-03-17
**Description:** Skill giúp Business Analyst nhanh chóng tạo bản phác thảo giao diện (HTML Prototype) và luồng xử lý (User Flow) cho một chức năng cụ thể dựa trên Brand Guideline và cấu trúc dữ liệu liên quan.

## 🎯 Mục đích
Tạo ra các thành phần thiết kế nhanh cho từng chức năng đơn lẻ để User/Stakeholder xác nhận trước khi tiến hành code Frontend thực tế. Kết quả bao gồm 1 file `.md` chứa User Flow (Mermaid) và 1 file `.html` chứa giao diện Prototype.

## 📥 Đầu vào (Inputs)
1. **Brand Guideline**: Tài liệu quy chuẩn thương hiệu (Màu sắc, Typography, Spacing, System Design).
2. **Data Model**: Thông tin bảng dữ liệu liên quan đến chức năng (Field names, Types, Relationships).
3. **Mô tả chức năng**: Tên chức năng, mục đích, và các yêu cầu logic cụ thể.
4. **Vị trí Menu (Optional)**: Đường dẫn menu dự kiến (nếu đã có). Nếu chưa có, Agent sẽ tự đề xuất vị trí phù hợp trong IA.

## 🔄 Quy trình thực thi (Khắt khe tuân thủ)

### Bước 1: Phân tích & Tạo User Flow (Mermaid)
- Phân tích logic nghiệp vụ từ mô tả chức năng và Data Model.
- **Vị trí lưu trữ**: `docs-BA/Prototypes/[ten-chuc-nang]/`.
- Tạo file `.md` với tên: `user-flow-[ten-chuc-nang].md` trong thư mục trên.
- **Nội dung file flow**:
    - **Menu Path**: Thể hiện rõ đường dẫn menu tới chức năng này ở đầu file.
    - Sơ đồ Mermaid (Flowchart) thể hiện các bước tương tác trên màn hình và chuyển đổi trạng thái/màn hình khi user thao tác.
    - Các điểm kiểm soát (Validation rules) dựa trên Data Model.

### Bước 2: Build HTML Prototype (Standalone)
- **Vị trí lưu trữ**: `docs-BA/Prototypes/[ten-chuc-nang]/`.
- Tạo file `.html` với tên: `ui-proto-[ten-chuc-nang].html` trong thư mục trên.
- **Yêu cầu kỹ thuật**:
    - Sử dụng chuẩn từ Brand Guideline (Primary color, Font family, Spacing).
    - **KHÔNG** tích hợp Layout chung của hệ thống (Sidebar/Header). Chỉ tập trung vào nội dung chính của chức năng/màn hình đó.
    - Thể hiện rõ các Control (Input, Select, Button, Table) tương ứng với Data Model.
    - **Logic chuyển màn hình**: Sử dụng các Button điều hướng giả lập (ví dụ: nhấn "Chi tiết" sẽ ẩn danh sách và hiện form chi tiết qua CSS `display: none` hoặc JS đơn giản).
    - Phải có Breadcrumb và Title màn hình chuẩn theo Menu path.

### Bước 3: Kiểm soát & Cập nhật Incremental
- Nếu màn hình phức tạp hoặc code HTML dài (>100 dòng), Agent **BẮT BUỘC** sinh nội dung theo từng đoạn (segment) và dùng `replace_file_content` hoặc `multi_replace_file_content` để cập nhật.

## ⚠️ Quy tắc & Giới hạn
- **Tính nguyên tử**: Chỉ tập trung vào MỘT chức năng/màn hình tại một thời điểm.
- **Không code JS Backend**: Chỉ sử dụng JS cho các tương tác UI giả lập (Show/Hide, Tab switching).
- **Tuân thủ Brand**: Không tự ý đổi màu sắc hoặc kích thước font ngoài Guideline.

## 💡 Hướng dẫn kích hoạt
> "Kích hoạt skill ba-ui-function-gen. Tạo MH cho chức năng 'Thanh toán hóa đơn', menu 'Hóa đơn > Thanh toán'. Brand guideline tại ... và data model gồm bảng Invoice (id, status, amount)..."
