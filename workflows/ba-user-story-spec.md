---
description: Quy trình đặc tả User Story hoàn chỉnh từ giao diện đến nghiệp vụ chi tiết.
---

# Workflow: Đặc tả User Story Chi tiết

Workflow này hướng dẫn Business Analyst thực hiện đặc tả chi tiết cho một User Story, đảm bảo tính nhất quán giữa giao diện (UI), luồng xử lý (Sequence) và quy tắc nghiệp vụ (Activity Rules).

## Quy trình thực hiện

1. **Bước 1: Đặc tả màn hình (UI Specification)**
   - Sử dụng skill `ba-ui-spec` để mô tả chi tiết các control, trường dữ liệu và logic hiển thị trên màn hình.
   - Đầu ra: File `.md` chứa bảng đặc tả UI chi tiết.

2. **Bước 2: Phân tích luồng (Sequence Diagram)**
   - Sử dụng skill `ba-sequence-spec` để vẽ sơ đồ tương tác giữa User - Frontend - Backend - Database/Đối tác.
   - Đầu ra: Sơ đồ Mermaid sequence và đặc tả API liên quan.

3. **Bước 3: Đặc tả quy tắc nghiệp vụ (Activity Rule)**
   - Sử dụng skill `ba-activity-rule-spec` để mô tả các điều kiện ranh giới, logic tính toán và các case xử lý lỗi/thành công.
   - Đầu ra: Bảng Activity Rules hoặc sơ đồ Activity.

4. **Bước 4: Tổng hợp tài liệu User Story**
   - Sử dụng skill `ba-user-story-spec` để gom tất cả thông tin từ 3 bước trên vào một tài liệu User Story hoàn chỉnh theo định dạng mẫu của dự án.
   - Đầu ra: File đặc tả User Story cuối cùng (Ready for Dev/QC).
