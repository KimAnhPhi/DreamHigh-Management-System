---
description: "Workflow to generate MCQs from documents and sync to the M2MBA system via API."
---

Version: 1.0.0
Author: M2MBA
Last Updated: 2026-03-04
Description: Workflow tự động tạo bộ câu hỏi trắc nghiệm từ tài liệu và đồng bộ lên hệ thống M2MBA.

# Workflow: Đồng bộ MCQ lên hệ thống M2MBA

Sử dụng workflow này để tự động hóa quy trình từ khâu đọc tài liệu, sinh câu hỏi trắc nghiệm đến khâu tạo bài test và đẩy câu hỏi lên server M2MBA.

## Các bước thực hiện:

### 1. Phân tích đầu vào & Sinh câu hỏi
- Kiểm tra file đầu vào.
- **Nếu đầu vào là tài liệu văn bản (PDF, DOCX, Markdown nội dung)**: Kích hoạt skill `ba-mcq-gen` để sinh danh sách câu hỏi trắc nghiệm và lưu vào thư mục `M2MBA/ListQA`.
- **Nếu đầu vào đã là file câu hỏi trắc nghiệm (đúng format của skill `ba-mcq-gen`)**: Chuyển sang bước tiếp theo.

### 2. Xác nhận hành động từ người dùng
- Hiển thị danh sách các bài test gần nhất (gọi `m2mba_list_papers`).
- Đưa ra 2 lựa chọn cho người dùng:
  - **Lựa chọn A**: Tạo bài test mới hoàn toàn.
  - **Lựa chọn B**: Gán các câu hỏi này vào một bài test đã có (người dùng cung cấp ID).

### 3. Khởi tạo bài test (Nếu chọn Lựa chọn A)
- Yêu cầu người dùng cung cấp: Tên bài test, Thời gian làm bài (phút).
- Gọi tool `m2mba_create_paper` với các thông tin trên.
- Sau khi tạo thành công, gọi `m2mba_list_papers` để lấy ID của bài test vừa tạo (thường là ID lớn nhất/đầu tiên trong danh sách).

### 4. Đẩy câu hỏi lên hệ thống
- Đọc file Markdown câu hỏi trắc nghiệm.
- Duyệt qua từng câu hỏi trong file:
  - Phân tích nội dung: Câu hỏi, 4 đáp án, đáp án đúng, giải thích, độ khó (EASY, MEDIUM, HARD).
  - Gọi tool `m2mba_create_question` cho từng câu.
  - Lưu lại danh sách các `questionId` được trả về.

### 5. Gán câu hỏi vào bài test
- Sau khi đã có danh sách `questionId` và `paperId`.
- Gọi tool `m2mba_add_questions_to_paper` để hoàn tất việc gán câu hỏi vào bài test.

## Quy định chung:
- **Nguyên tắc Atomic**: Nếu có lỗi ở bất kỳ bước đẩy API nào, hãy báo lại cho người dùng và dừng lại để kiểm tra.
- **Incremental Progress**: Sau khi đẩy thành công từng câu hỏi, hãy cập nhật trạng thái trong log để người dùng theo dõi.
- **Phân loại độ khó**: Map từ (Dễ -> EASY), (Trung bình -> MEDIUM), (Khó -> HARD) khi gọi API.
