---
name: ba-brand-base-gen
description: "Bước 2 trong workflow tạo Brand Guideline. Sinh file Markdown phần cơ bản (Overview, Color, Typo, Spacing, Tokens)."
---

# HƯỚNG DẪN SKILL: BA BRAND BASE GENERATION

**Version:** 1.0.1
**Author:** M2MBA
**Last Updated:** 2026-03-17
**Description:** Skill tạo nền tảng Brand Design Guideline. Đây là Bước 2 trong workflow `/ba-brand-guideline-gen`.

## Mục đích
- Tiếp nhận "Brand Brief" từ Bước 1 (Tên, Personality, Audience, Product Type, Colors, Target Platforms).
- Phân tích và sinh file Markdown hệ thống Design Guideline ở mức cơ sở.
- **Xử lý Multi-Platform**: Nếu User chọn nhiều platform (VD: Web Admin, Web Public, Mobile App, v.v.), bạn phải **TẠO RIÊNG BIỆT BẤY NHIÊU FILE** tương ứng với số lượng platform mà người dùng yêu cầu.
  - Quy tắc đặt tên: `[brand-name]-[platform]-guideline.md` (Ví dụ: `acme-webadmin-guideline.md`, `acme-webpublic-guideline.md`, `acme-mobileapp-guideline.md`).
- Hãy sinh Base System giống nhau (màu sắc, typography, spacing chuẩn) cho tất cả các file này.
- Mặc định lưu vào `docs-BA/Prototype/Brand Guideline/` (tạo thư mục nếu chưa có). Chỉ hỏi User khi họ muốn đường dẫn khác.

## Role & Xử lý màu sắc/Typography
- Dựa vào **Brand Personality**, hãy chủ động chọn một bảng màu phù hợp (Vibrant cho playful, Neutral/Blue cho professional) nếu User chưa cung cấp.
- Đảm bảo **Accessibility** cho các cấu trúc thẻ màu: Text trên nền background (Primary, Warning, Success) phải đạt tương phản WCAG 2.1 AA+ (Tối thiểu 4.5:1).
- Chủ động chọn **Google Fonts** phù hợp với brand.

## Yêu cầu Template Cấu Trúc
Bạn sẽ tạo nội dung dưới dạng format Markdown (Header, List, Code blocks) và ghi vào file với 5 Mục chính:

### 1. Brand Overview
Gồm: Tên, Tagline, Brand Personality (3-5 từ), Values, Target Audience, Product Type.

### 2. Color System
- Khai báo đầy đủ HEX Code cho:
  - **Primary Colors** (Tối thiểu: DEFAULT, dark, light, lightest)
  - **Secondary Colors** / **Accent Colors**
  - **Neutral Colors** (Black #000, Gray 900 -> Gray 50, White #FFF)
  - **Semantic Colors** (Success, Warning, Error, Info)
- Giải thích "Color Usage Guidelines".

### 3. Typography
- Định nghĩa các "Font Families" (Heading, Body, Code).
- **Type Scale**: Cung cấp chi tiết H1, H2, H3, H4, H5, H6, Body (Regular, Large, Small), Caption với thông tin [Size in px], [Line Height], và [Font Weight].

### 4. Spacing System
- Đưa ra "Base Unit" = 4px hoặc 8px (Recommend: 8px).
- Xây dựng dải Scale: XS (4px), SM (8px), MD (16px), LG (24px), XL (32px), 2XL (48px), 3XL (64px)... 

### 5. Design Tokens (JSON Base)
Tạo đoạn ` ```json ` tổng hợp toàn bộ thông số Colors, Typography, Spacing vừa định nghĩa vào một cây JSON duy nhất. Cấu trúc JSON **phải** được tổ chức sạch sẽ, ví dụ:
```json
{
  "colors": {
    "primary": { "DEFAULT": "#...", "dark": "#...", "light": "#..." },
    "neutral": { "900": "#...", "800": "#..." },
    "semantic": { "success": "#..." }
  },
  "typography": {
    "fontFamily": { "heading": "...", "body": "..." },
    "fontSize": { "h1": "48px", "body": "16px" }
  },
  "spacing": { "md": "16px" }
}
```

## Kết thúc Bước 2
Sau khi file `[brand-name]-guideline.md` được tạo và save thành công, hãy nhắc User gõ lệnh `/ba-brand-components-gen` để bắt đầu thêm chi tiết các Component (Bước 3).
