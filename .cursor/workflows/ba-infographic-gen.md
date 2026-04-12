---
description: "Workflow to generate infographics from prompts and requirements."
---

# Workflow: BA Infographic Generation

**Version**: 1.0.0
**Author**: M2MBA
**Last Updated**: 2026-03-12
**Description**: Quy trình tự động hóa việc tạo hình ảnh minh họa cho Business Analyst bằng cách kết hợp sức mạnh phân tích của Prompt Generator và khả năng trực quan hóa của Image Generator.

## Quy trình Thực hiện

### Bước 1: Phân tích & Tạo Prompt Tối ưu
- **Skill sử dụng**: `/ba-infographic-prompt-gen`
- **Nghiệm vụ**: 
    - Phân tích yêu cầu nghiệp vụ từ BA (thành phần hệ thống, luồng dữ liệu, actors).
    - Đề xuất bố cục (layout) và phong cách (style) phù hợp.
    - Tạo ra một prompt chi tiết làm đầu vào cho bước tiếp theo.
- **Xác nhận**: Agent trình bày prompt cho BA và hỏi xem có cần điều chỉnh gì trước khi gen ảnh không.

### Bước 2: Sinh Ảnh Infographic Minh họa
- **Skill sử dụng**: `/ba-infographic-gen`
- **Nghiệm vụ**:
    - Nhận prompt đã được tối ưu từ Bước 1.
    - Gọi công cụ `generate_image` để tạo ra file ảnh AI.
    - Trình bày kết quả và lắng nghe ý kiến phản hồi của BA.

### Bước 3: Cập nhật & Nhúng Tài liệu (Sau khi User OK)
- **Điều kiện**: Thực hiện SAU KHI người dùng xác nhận hài lòng với ảnh đã gen.
- **Thao tác**: 
    - **Hỏi User**: "Bạn có muốn chèn ảnh này vào file tài liệu nào (ví dụ PRD) và mục nào không?".
    - **Cập nhật File**: Sau khi User chỉ định, Agent thực hiện:
        - Copy ảnh vào thư mục `assets/` hoặc cùng cấp với file tài liệu.
        - Chèn ảnh vào tài liệu bằng **đường dẫn tương đối** (Relative Path).
        - Bổ sung **Bảng mô tả thành phần** (Thành phần, Ý nghĩa) ngay bên dưới ảnh dựa trên kết quả phân tích Product Overview.

---
**Lưu ý cho Agent**: 
- Luôn đảm bảo Bước 1 hoàn tất và có prompt chất lượng trước khi chuyển sang Bước 2.
- Nếu input ban đầu là hình ảnh nháp, hãy đảm bảo skill Prompt Gen đã "đọc" kỹ cấu trúc trước khi gen prompt mới.
