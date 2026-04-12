---
description: "Workflow to generate n8n workflow in 4 steps."
---

# Workflow: n8n Workflow Generation Engine (BA Edition)

Metadata:
Version: 1.0.0
Author: M2MBA
Last Updated: 2026-03-13
Description: Điều phối 4 skills chuyên biệt để tạo ra workflow n8n tối ưu.

## 📋 Hướng dẫn thực hiện

Khi người dùng yêu cầu "tạo workflow n8n cho [mô tả]", Agent phải thực hiện tuần tự các bước sau đây để đảm bảo chất lượng đầu ra:

### Bước 1: Thiết kế cấu trúc (Flow Pattern)
Sử dụng skill **ba-n8n-workflow-patterns** để:
- Xác định pattern phù hợp (Scheduled, Webhook, API Integration...).
- Phác thảo các node cần thiết và luồng dữ liệu chính.

### Bước 2: Cấu hình chi tiết (Node Config)
Sử dụng skill **ba-n8n-node-config** để:
- Xác định các properties bắt buộc cho từng node dựa trên Resource/Operation.
- Kiểm tra các ràng buộc phụ thuộc (dependencies) giữa các field.

### Bước 3: Xử lý logic nâng cao (JS Code)
Sử dụng skill **ba-n8n-js-code** để:
- Viết các đoạn mã JavaScript nếu workflow có sử dụng Node Code.
- Đảm bảo dữ liệu được chuyển đổi (transform) đúng định dạng `[{json:{}}]`.

### Bước 4: Chuẩn hóa cú pháp (Expression Syntax)
Sử dụng skill **ba-n8n-expression-syntax** để:
- Kiểm tra lại toàn bộ các biểu thức `{{ }}`.
- Đảm bảo truy xuất dữ liệu từ node trước hoặc webhook body đúng cú pháp.

---

## 🚀 Kết quả đầu ra
- 1 file JSON workflow hoàn chỉnh.
- 1 file Hướng dẫn (Walkthrough) giải thích các bước cấu hình credentials/biến cho người dùng.
