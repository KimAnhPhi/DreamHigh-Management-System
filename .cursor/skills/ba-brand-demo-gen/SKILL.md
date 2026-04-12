---
name: ba-brand-demo-gen
description: "Bước 4 trong workflow tạo Brand Guideline. Đọc file Brand Guideline (markdown) và tự động thiết kế file HTML Demo trực quan mô phỏng Design System đầy đủ."
---

# HƯỚNG DẪN SKILL: BA BRAND DEMO GEN

**Version:** 1.0.1
**Author:** M2MBA
**Last Updated:** 2026-03-17
**Description:** Skill cuối cùng trong quy trình `/ba-brand-guideline-gen`. Nhiệm vụ của bạn là đọc toàn bộ nội dung file Markdown vừa tạo và chuyển hóa nó thành 1 file HTML duy nhất (standalone) có thể chạy thẳng trên Browser để Demo UI.

## Quy trình thực hiện
1. Đọc nội dung các file Markdown Design Guideline mà người dùng đang làm việc (Ví dụ: `[brand-name]-webadmin-guideline.md`).
2. Trích xuất (Extract) các thông số JSON Tokens và Specs của file markdown.
3. Tham khảo định dạng HTML chuẩn tại file tham chiếu: `references/html-demo-guidelines.md`.
4. Tạo và ghi (Write) file HTML tương ứng (Ví dụ `<brand_name>-webadmin-demo.html`).
   *Lưu ý:* Nếu có nhiều platform (nhiều file .md), hãy duyệt qua từng file và tạo ra các file HTML riêng rẽ tương ứng.
5. **Vị trí lưu:** Cùng thư mục với file guideline nguồn; nếu tạo mới, mặc định `docs-BA/Prototype/Brand Guideline/` (tạo thư mục nếu chưa có).

## Yêu cầu chất lượng file Demo HTML
- **PHẢI** convert các Tokens thành CSS Variable (ví dụ: `--color-primary`, `--font-h1`).
- **PHẢI** tạo Style inline (`<style>`) ngay trong `<head>` của file HTML (không dùng CSS ngoại).
- **PHẢI** vẽ lại đủ các thẻ mô tả UI Component: Thẻ div hiển thị hệ thống màu, Các mức Heading từ H1-H6, Button variants, Form layout, Breadcrumb... 
- Giao diện phải **Accessible, Responsive và Trực quan**. Không cần JavaScript phức tạp trừ code xử lý Tabs/Dropdown đơn giản (nếu cần).
- Đừng quên thêm font từ Google Fonts dựa trên guideline.

Hoàn tất và báo User có thể click vào file HTML để chạy trên Browser kiểm tra kết quả!
