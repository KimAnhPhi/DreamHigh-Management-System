---
name: ba-brand-components-gen
description: "Bước 3 trong workflow tạo Brand Guideline. Sinh Specifications chi tiết cho 35 UI Components dựa trên màu sắc/typography đã tạo."
---

# HƯỚNG DẪN SKILL: BA BRAND COMPONENTS GENERATION

**Version:** 1.0.1
**Author:** M2MBA
**Last Updated:** 2026-03-17
**Description:** Skill sinh phần `Component Specifications` nối tiếp (append) vào file Brand Guideline hiện có.

## Mục đích
- Đọc lại các file `[brand-name]-[platform]-guideline.md` đã được tạo ở Bước 2.
- Sinh ra specifications (đặc tả) cho các Components phù hợp.
- **CRITICAL ROLE**: Ghi nối tiếp (Append) nội dung này vào **ĐÚNG FILE** của nền tảng đó. Nếu có bao nhiêu file do Bước 2 sinh ra (Ví dụ: Web Admin, Web Public, Mobile, v.v.), bạn phải thực hiện sinh và append Components tương ứng bấy nhiêu file.

## Cơ chế thông minh định tuyến Component theo Platform
- Component cho Web Admin (cần layout nhỏ gọn, data-heavy) sẽ khác với Web Public (cần visual to rõ, CTA nổi bật) và khác với Mobile App (cần touch-target lớn 44-48px).
- Chỉ sinh ra những component THẬT SỰ liên quan đến Platform đó (Tham khảo `references/components-specs-list.md`). 
- Nếu dự án có nhiều Platform, hãy xử lý **CUỐN CHIẾU TỪNG PLATFORM MỘT**. (VD: Ghi xong 100% file của Web Admin rồi mới chuyển sang chạy file Web Public, sau đó mới sang Mobile App).

## Cơ chế chống lỗi (Incremental Update)
- Việc sinh nhiều Component Specs dưới dạng BẢNG có thể tốn rất nhiều token và làm gãy logic giữa chừng.
- **BẮT BUỘC**: Thay vì in ra tất cả component cùng lúc, Agent hãy sinh khoảng **7-10 Component / lần phản hồi** và biên dịch thẳng chúng vào cuối file bằng công cụ Edit Edit.
- **Tự động hóa**: Bạn **KHÔNG ĐƯỢC HỎI** User xem có muốn nối tiếp hay không. Hãy tự động chủ động tự chạy Edit Tool liên tục từng đợt để append cho đến khi sinh xong và nối xong 100% bộ component của Platform đó.

## Reference File
- Bắt buộc đọc file `references/components-specs-list.md` nằm cùng thư mục skill này để biết **Format Bảng Bắt Buộc** và **Danh sách 35 Components Cần Sinh**.

## Yêu cầu bổ sung cho Specification
- **Variants**: Primary, Secondary, Tertiary, Destructive (Nếu có).
- **Sizes**: Small (32px), Medium (40px), Large (48px)
- **States**: Default, Hover, Active, Focus, Disabled
- **Do's & Don'ts**: Đưa ra hướng dẫn sử dụng tốt nhất.

Sau khi sinh đủ (và append đủ) 35 specs, kết thúc bằng việc tạo Bảng Check-list (Coverage Checklist) từ reference file và mời User sử dụng lệnh `/ba-brand-demo-gen` (Bước 4) để render HTML.
