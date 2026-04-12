---
description: "Workflow to generate a Product Requirements Document (PRD) from AS-IS to TO-BE."
---
Version: 1.0.0
Author: M2MBA
Last Updated: 2026-03-06
Description: Workflow tự động tạo Product Requirements Document (PRD) toàn diện từ kết quả khơi gợi yêu cầu.

# Workflow: BA PRD Creation

Workflow này hướng dẫn Agent thực hiện chuỗi các bước liên tiếp để tự động hóa quá trình tạo Product Requirements Document (PRD) cho một dự án/tính năng mới, bắt đầu từ dữ liệu khơi gợi yêu cầu. Việc này kết hợp các skill phân tích BA có sẵn để tạo thành một chuỗi luồng xử lý mượt mà.

## Các bước thực hiện:

1. **Thu thập Kết quả Khơi gợi Yêu cầu**
   - Yêu cầu người dùng cung cấp tài liệu "Kết quả khơi gợi yêu cầu" (Meeting notes, bản ghi âm đã chuyển text, thư điện tử trao đổi, hoặc file thống nhất yêu cầu ban đầu).
   - Nếu người dùng đã cung cấp mô tả ngay từ prompt đầu tiên, tiến hành nạp dữ liệu và tự động sang Bước 2.

// turbo
2. **Phân tích Quy trình Hiện tại (AS-IS)**
   - Input: Kết quả khơi gợi yêu cầu ở Bước 1.
   - Thao tác: Áp dụng Agent skill `ba-process-analysis` để phân tích nghiệp vụ, mô hình hóa và xác định lỗi/vấn đề (pain points) của hệ thống hiện tại.
   - Output: File tài liệu phân tích AS-IS.

// turbo
3. **Đề xuất Quy trình Mới (TO-BE)**
   - Input: File quy trình AS-IS từ Bước 2 và mục tiêu mong đợi của người dùng.
   - Thao tác: Áp dụng Agent skill `ba-process-proposal` để thiết kế quy trình đề xuất (TO-BE), giải quyết các pain points đã xác định.
   - Output: File tài liệu quy trình TO-BE.

// turbo
4. **Mô hình Tổng quan Sản phẩm**
   - Input: Quy trình TO-BE và kết quả khơi gợi yêu cầu.
   - Thao tác: Áp dụng Agent skill `ba-product-overview-gen` để xác định các actor, application, hệ thống tích hợp và mô hình giao tiếp.
   - Output: File tài liệu `Analysis/ba-product-overview-gen.md`.

// turbo
5. **Phân tích Danh sách Epic và Tính năng (Use Case)**
   - Input: File quy trình TO-BE từ Bước 3 và Mô hình tổng quan từ Bước 4.
   - Thao tác: Áp dụng Agent skill `ba-usecase-list-gen` để trích xuất và gom nhóm các Use Case thành từng Epic.
   - Output: File danh sách Epic và Use Cases chi tiết.

// turbo
6. **Tổng hợp và Tạo Product Requirements Document (PRD)**
   - Input: Toàn bộ dữ liệu từ Bước 1 đến Bước 5.
   - Thao tác: Tổng hợp thành file PRD duy nhất. BẮT BUỘC tuân thủ file mẫu: `e:\Training Project\Skill BA gg Antigravity\.agent\workflows\references\ba-prd-template.md`. 
   - *Lưu ý về Infographic:* Bước này không tự động gen ảnh. Nếu cần ảnh minh họa cho mục "4. Mô hình tổng quan sản phẩm", hãy chạy riêng workflow `/ba-infographic-gen` sau khi PRD hoàn tất.
   - Output: File PRD `docs-BA/PRD/ba-prd-[feature-name].md`.

// turbo
7. **Thiết kế ERD (Entity-Relationship Diagram)**
   - Input: File PRD đã hoàn tất từ Bước 6.
   - Thao tác: Kích hoạt skill `ba-erd-gen` để phân tích các thực thể và quan hệ.
   - Output: File ERD lưu vào thư mục `Data model/`.
   - *Lưu ý:* Nếu thông tin trong PRD chưa đủ để xác định attributes/relations, skill `ba-erd-gen` sẽ tự động dừng và hỏi User làm rõ trước khi sinh file.
   - Sau khi tạo file ERD xong → thực hiện **Quy tắc Cập nhật Master ERD** ở mục dưới.

---

## 📁 Quy tắc Quản lý File Output

### Nguyên tắc Update vs Tạo Mới

| Tình huống | Hành động | Kết quả |
|------------|-----------|---------|
| Thêm/bớt tính năng trong cùng nghiệp vụ | **Update file cũ** | Tăng Minor version (v1.0 → v1.1), ghi Change log |
| Scope/nhóm nghiệp vụ mới hoàn toàn | **Tạo file mới** theo tên nghiệp vụ đó | Đồng thời hỏi User cập nhật Master Index |

### Quy tắc Cập nhật Master PRD Index

Sau mỗi lần tạo PRD mới, Agent **BẮT BUỘC** phải kiểm tra và cập nhật file:
`docs-BA/PRD/prd-index.md`

Nếu file chưa tồn tại → Tạo mới. Định dạng file:

```markdown
# PRD Master Index

| Tên file | Nhóm nghiệp vụ | Version | Mô tả ngắn | Ngày tạo |
|----------|----------------|---------|------------|----------|
| [ba-prd-xxx.md](link) | [Nhóm nghiệp vụ] | v1.0 | [Tóm tắt scope] | DD/MM/YYYY |
```

### Quy tắc Cập nhật Master ERD

Khi tạo xong file ERD mới, Agent hỏi User:
> *"File ERD `ba-erd-[tên].md` đã tạo xong. Bạn có muốn cập nhật vào **Master ERD tổng** không?"*

**Nếu User đồng ý:** Cập nhật file `Data model/erd-master.md` với nội dung:
- **Chỉ vẽ các Entities** (không vẽ attributes) và **quan hệ giữa chúng** (Mermaid `erDiagram` tối giản).
- Thêm bảng mapping: Entity nào thuộc ERD file nào, nghiệp vụ nào.

Định dạng file `erd-master.md`:

```markdown
# ERD Master - Tổng quan Thực thể Hệ thống

## Sơ đồ Quan hệ Tổng (Entities Only)
[Mermaid erDiagram chỉ có entity và relationship, KHÔNG có attributes]

## Danh sách File ERD theo Nhóm Nghiệp vụ

| Nhóm nghiệp vụ | File ERD chi tiết | Entities thuộc nhóm |
|----------------|-------------------|---------------------|
| [Ví dụ: Quản lý Đơn hàng] | [ba-erd-order.md](link) | Order, OrderItem, Payment |
| [Ví dụ: Quản lý Người dùng] | [ba-erd-user.md](link) | User, Role, Permission |
```
