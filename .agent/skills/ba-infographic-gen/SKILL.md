---
name: ba-infographic-gen
description: "Skill chuyên biệt để phân tích input (ảnh/văn bản) và tạo ảnh infographic minh họa chất lượng cao thông qua Gemini image generation."
---

# HƯỚNG DẪN SKILL: BA INFOGRAPHIC GEN

**Version:** 1.0.1
**Author:** M2MBA
**Last Updated:** 2026-03-17
**Description:** Skill đóng vai trò "Kỹ thuật viên" thực thi các bản thiết kế (blueprints) từ ba-infographic-prompt-gen để tạo ra hình ảnh infographic cuối cùng.

## Mục đích
- Tiếp nhận input từ người dùng dưới dạng mô tả văn bản hoặc hình ảnh (sơ đồ nháp, ảnh chụp bảng trắng, tài liệu cũ).
- Phân tích nội dung để xác định các thông tin cốt lõi, luồng logic hoặc các điểm dữ liệu quan trọng.
- Thiết kế bố cục và phong cách infographic phù hợp (Flow chart, Comparison, List, Statistics, Process).
- Sử dụng công cụ `generate_image` để tạo ra hình ảnh infographic cuối cùng.

## Quy trình Thực hiện (Workflow)

### 1. Phân tích Input
- Nếu là **Văn bản**: Trích xuất các bước, các so sánh hoặc các con số chính. Xác định thông điệp muốn truyền tải.
- Nếu là **Hình ảnh**: Sử dụng năng lực vision để đọc nội dung ảnh, hiểu cấu trúc và thông tin cần được "làm đẹp" hoặc "trực quan hóa".

### 2. Đề xuất Phong cách Infographic
Trước khi gen ảnh, bạn nên gợi ý cho người dùng một số phong cách phù hợp và **Hỏi ý kiến về hướng sắp xếp**:
- **Hướng sắp xếp**: Top-Down (Trên xuống) hay Left-to-Right (Trái sang phải)?
- **Process/Workflow**: Minh họa quy trình từng bước.
- **Comparison**: So sánh giữa 2 hoặc nhiều đối tượng (VD: AS-IS vs TO-BE).
- **Informational**: Giải thích một khái niệm hoặc danh sách các đặc điểm.

### 3. Tạo Prompt cho `generate_image`
Soạn thảo prompt chi tiết và chuyên nghiệp để Gemini tạo ảnh tốt nhất. 
- **Quy tắc Centrality**: Thành phần trung tâm (Backend/Core) phải được mô tả là **lớn nhất (2x size)** và nổi bật. Các thành phần khác thu nhỏ lại.
- **Quy tắc Actor/User**: Nếu input có nhắc tới người dùng, **PHẢI** vẽ icon User và thể hiện rõ họ đang tương tác với App/Device nào. Không bao giờ lược bỏ User.
- **Quy tắc Gom nhóm (Grouping)**: Mô tả các nhóm tích hợp/chức năng nằm trong các **hình khối chữ nhật (rectangular blocks)** có nhãn tiêu đề rõ ràng.
- **Keywords quan trọng**: `Infographic`, `Clean and modern design`, `Professional color palette`, `High resolution`, `Vector style`, `Minimalist`, `Business illustration`.
- **Lưu ý về chữ (Text)**: Gemini/DALL-E có thể gặp khó khăn với text dài. Ưu tiên các icon, ký hiệu và text cực ngắn (1-3 từ).
- **Cấu trúc Prompt**: 
  - `Style`: Professional infographic design, flat vector style.
  - `Layout`: Central subject [Big] with surrounding nodes [Small], encapsulated groups in rectangles, numbered steps, etc.
  - `Colors`: [Dựa trên Brand Guideline nếu có, hoặc phong cách Business Professional].
  - `Content`: Illustration of [tóm tắt nội dung input, bao gồm User interaction].

### 4. Gọi tool `generate_image`
Thực hiện gọi tool với prompt đã soạn thảo.

### 5. Trình bày và Lưu trữ
- Hiển thị ảnh cho người dùng.
- Hỏi người dùng xem có cần điều chỉnh prompt để gen lại hay không.
- Gợi ý lưu ảnh vào `docs-BA/Prototype/Infographics/` (tạo thư mục nếu chưa có).

## Ví dụ sử dụng
- "Tôi có một ảnh chụp sơ đồ quy trình đăng ký bằng tay, hãy biến nó thành một infographic hiện đại."
- "Hãy tạo một infographic so sánh ưu nhược điểm của việc dùng ERP so với Excel dựa trên mô tả sau..."
