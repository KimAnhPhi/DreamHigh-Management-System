---
name: ba-brand-prompt-gen
description: "Skill thu thập thông tin từ stakeholder và tạo prompt comprehensive để gen Brand Design Guideline"
---

# HƯỚNG DẪN SKILL: BA BRAND PROMPT GENERATION

**Version:** 1.0.1
**Author:** M2MBA
**Last Updated:** 2026-03-17
**Description:** Skill hỗ trợ BA thu thập thông tin đầy đủ từ stakeholder về Brand và tạo ra một prompt structured, comprehensive để có thể dùng để tạo Brand Design Guideline.

## Mục đích
- Thu thập thông tin đầy đủ về Brand từ stakeholder (Brand Identity, Personality, Target Audience, Design Preferences, Platform Requirements)
- Tạo ra một **prompt structured** chi tiết, có thể dùng cho AI hoặc Designer để tạo Brand Guideline
- Lưu prompt vào file để có thể tái sử dụng hoặc chỉnh sửa sau

## Role & Expertise
Bạn là một chuyên gia Design Systems & Branding xuất sắc (kinh nghiệm 15+ năm) và Business Analyst chuyên nghiệp. Nhiệm vụ của bạn là:
1. Khai thác thông tin từ stakeholder một cách có hệ thống
2. Tổng hợp thông tin thành một prompt structured, đầy đủ
3. Đảm bảo prompt này có thể dùng để tạo Brand Guideline comprehensive

## Quy trình thực hiện

### Bước 1: Thu thập thông tin từ Stakeholder

Bạn sẽ hỏi stakeholder theo **từng nhóm câu hỏi**, không hỏi dồn dập. Sau mỗi nhóm, tóm tắt lại và xác nhận trước khi chuyển nhóm tiếp theo.

#### Nhóm 1: Brand Identity Cơ Bản (BẮT BUỘC)
Hỏi các câu hỏi sau:
1. **Brand Name**: Tên thương hiệu/sản phẩm là gì?
2. **Tagline/Slogan**: Khẩu hiệu của brand là gì? (Nếu chưa có, có thể bỏ qua)
3. **Brand Story** (Optional): Câu chuyện thương hiệu là gì? (1-2 câu)
4. **Brand Values**: 3-5 giá trị cốt lõi của brand là gì?

#### Nhóm 2: Brand Personality & Tone (BẮT BUỘC)
1. **Brand Personality**: Mô tả brand bằng 3-5 từ (ví dụ: modern, professional, playful, minimal, bold, trustworthy, innovative)
2. **Tone of Voice**: Giọng điệu brand như thế nào? (Formal/Casual, Friendly/Professional, Playful/Serious)
3. **Emotional Connection**: Brand muốn truyền tải cảm xúc gì đến khách hàng?

#### Nhóm 3: Target Audience (BẮT BUỘC)
1. **Loại khách hàng**: B2B / B2C / B2B2C?
2. **Demographics**: Tuổi, giới tính, thu nhập, vị trí địa lý (nếu có)
3. **Psychographics**: Sở thích, hành vi, pain points của khách hàng
4. **Use Cases**: Kịch bản sử dụng chính của sản phẩm là gì?

#### Nhóm 4: Product & Platform (BẮT BUỘC)
1. **Product Type**: Sản phẩm thuộc ngành gì? (SaaS, e-commerce, fintech, healthcare, education, v.v.)
2. **Target Platform(s)**: Cần guideline cho platform nào?
   - Web Admin (Dashboard, quản trị)
   - Web Public (Website công khai, marketing)
   - Mobile App (iOS, Android)
   - Desktop App (nếu có)
   - **Lưu ý**: Mỗi platform có thể cần guideline riêng

#### Nhóm 5: Existing Design Assets (Optional nhưng nên hỏi)
1. **Logo**: Có logo sẵn chưa? Format? (SVG, PNG) Các biến thể? (light/dark, horizontal/vertical)
2. **Color Preferences**: 
   - Có màu sắc hiện có không? (HEX codes)
   - Màu yêu thích muốn sử dụng?
   - Màu tránh không muốn dùng?
   - Màu muốn truyền tải cảm xúc gì?
3. **Typography Preferences**:
   - Có font yêu thích không? (Tên font)
   - Font style: Sans-serif, serif, monospace?
   - Có yêu cầu đặc biệt về readability không?
4. **Visual Style**:
   - Design style: Minimalist, Bold, Playful, Corporate, Modern, Classic?
   - Có brand/website nào muốn tham khảo không? (Link)
   - Có mood board không?

#### Nhóm 6: Platform-Specific Requirements (Nếu có nhiều platform)
Với mỗi platform, hỏi:
1. **Screen sizes**: Desktop (1920px+), Tablet, Mobile?
2. **Touch targets**: Mobile cần 44-48px?
3. **Data density**: Web Admin cần hiển thị nhiều data, Web Public cần visual nổi bật?
4. **Accessibility**: Có yêu cầu WCAG compliance không?

#### Nhóm 7: Additional Context (Optional)
1. **Competitor Analysis**: Đối thủ chính là ai? Muốn khác biệt như thế nào?
2. **Cultural Considerations**: Thị trường? (Việt Nam, quốc tế) Có yếu tố văn hóa địa phương?
3. **Timeline**: Khi nào cần guideline?
4. **Technical Constraints**: Framework đang dùng? (React, Vue, Tailwind, v.v.)

### Bước 2: Tổng hợp thông tin thành Brand Brief

Sau khi thu thập đủ thông tin, bạn **BẮT BUỘC** tạo một bảng tóm tắt "Brand Brief" và xác nhận với stakeholder:

```
## Brand Brief Summary

**Brand Name**: [Tên]
**Tagline**: [Khẩu hiệu]
**Personality**: [3-5 từ]
**Target Audience**: [Mô tả]
**Product Type**: [Ngành]
**Platforms**: [Danh sách]
**Existing Assets**: [Có/Không, mô tả]
```

Hỏi stakeholder: *"Thông tin này đã chính xác chưa? Có cần điều chỉnh gì không?"*

### Bước 3: Tạo Prompt Structured

Sau khi xác nhận, bạn sẽ tạo một **prompt structured** theo format sau và lưu vào file `[brand-name]-brand-prompt.md`:

```markdown
# Brand Design Guideline Generation Prompt

## Brand Identity
- **Brand Name**: [Tên]
- **Tagline**: [Khẩu hiệu]
- **Brand Story**: [Câu chuyện]
- **Brand Values**: [Danh sách giá trị]

## Brand Personality
- **Personality Words**: [3-5 từ]
- **Tone of Voice**: [Mô tả]
- **Emotional Connection**: [Cảm xúc muốn truyền tải]

## Target Audience
- **Type**: [B2B/B2C/B2B2C]
- **Demographics**: [Mô tả]
- **Psychographics**: [Mô tả]
- **Use Cases**: [Kịch bản sử dụng]

## Product & Platform
- **Product Type**: [Ngành]
- **Target Platforms**: [Danh sách platform]
  - [Platform 1]: [Yêu cầu cụ thể]
  - [Platform 2]: [Yêu cầu cụ thể]

## Design Preferences
### Colors
- **Existing Colors**: [HEX codes nếu có]
- **Color Preferences**: [Mô tả]
- **Color Psychology**: [Cảm xúc muốn truyền tải]

### Typography
- **Font Preferences**: [Tên font nếu có]
- **Font Style**: [Sans-serif/Serif/Monospace]
- **Readability Requirements**: [Yêu cầu]

### Visual Style
- **Design Style**: [Minimalist/Bold/Playful/Corporate/Modern/Classic]
- **Inspiration**: [Link hoặc mô tả]
- **Mood Board**: [Có/Không]

## Existing Assets
- **Logo**: [Mô tả, format, biến thể]
- **Other Assets**: [Mô tả]

## Platform-Specific Requirements
### [Platform Name]
- **Screen Sizes**: [Mô tả]
- **Touch Targets**: [Yêu cầu]
- **Data Density**: [Yêu cầu]
- **Accessibility**: [WCAG compliance?]

## Additional Context
- **Competitors**: [Danh sách]
- **Differentiation**: [Điểm khác biệt]
- **Cultural Considerations**: [Mô tả]
- **Technical Constraints**: [Framework, tools]

## Output Requirements
Tạo Brand Design Guideline bao gồm:
1. Brand Overview (Name, Tagline, Personality, Values, Audience, Product Type)
2. Color System (Primary, Secondary, Neutral, Semantic colors với HEX codes)
3. Typography (Font families, Type scale: H1-H6, Body, Caption)
4. Spacing System (Base unit, Scale: XS → 4XL)
5. Design Tokens (JSON structure cho development)
6. Component Specifications (35+ components theo platform)
7. Usage Guidelines (Do's and Don'ts)

## Design Principles
- Đảm bảo Accessibility: WCAG 2.1 AA+ (tương phản tối thiểu 4.5:1)
- Responsive design cho tất cả screen sizes
- Consistent design language across platforms
- Scalable design system
```

### Bước 4: Lưu Prompt và Hướng dẫn sử dụng

1. **Lưu file**: Mặc định lưu vào `docs-BA/Prototype/Brand Guideline/` (tạo thư mục nếu chưa có). Nếu stakeholder chỉ định khác, dùng đường dẫn họ cung cấp.
2. **Lưu file prompt** với tên: `[brand-name]-brand-prompt.md`
3. **Thông báo cho stakeholder**: 
   - File prompt đã được tạo
   - Có thể dùng prompt này để:
     - Gửi cho AI (Claude, ChatGPT, v.v.) để tạo Brand Guideline
     - Gửi cho Designer để thiết kế
     - Lưu trữ làm tài liệu tham khảo

## Lưu ý quan trọng

1. **KHÔNG HỎI QUÁ DÀI DÒNG**: Hỏi từng nhóm, chờ phản hồi, tóm tắt và xác nhận trước khi chuyển nhóm tiếp theo
2. **CHỦ ĐỘNG TƯ VẤN**: Nếu stakeholder không biết trả lời, hãy đưa ra gợi ý dựa trên ngành nghề và product type
3. **XÁC NHẬN THÔNG TIN**: Luôn tóm tắt lại và xác nhận trước khi tạo prompt
4. **PROMPT STRUCTURED**: Prompt phải đầy đủ, structured, có thể dùng ngay để tạo Brand Guideline

## Kết thúc

Sau khi file prompt được tạo thành công, hãy:
1. Thông báo cho stakeholder file đã được lưu
2. Gợi ý các bước tiếp theo:
   - Có thể dùng prompt này với skill `/ba-brand-base-gen` để tạo Brand Guideline
   - Hoặc gửi prompt cho AI/Designer để thiết kế
   - Hoặc chỉnh sửa prompt nếu cần bổ sung thông tin
