---
name: ba-ds-bg-tool-prompt-gen
description: >-
  Sinh prompt copy-paste tối ưu cho công cụ gen thiết kế (Figma Make, Stitch, v0, v.v.) để tạo Design System hoặc Brand Guideline (token, typography, màu, component foundation), không phải mockup từng màn hình. Use when user muốn prompt cho Figma Make/Stitch/gen UI tool để build design system, tạo brand guideline visual, variables/components library, hoặc khi nói "prompt cho tool thiết kế làm DS/BG". NOT FOR: đã có Brand Guideline và cần prompt layout từng MH — dùng ba-mockup-prompt-gen; thu thập stakeholder dài kỳ — dùng ba-brand-prompt-gen trước rồi có thể dùng skill này để đóng gói prompt tool.
---

# Skill: Prompt cho tool gen thiết kế — Design System & Brand Guideline

**Version:** 1.0.0  
**Mục tiêu:** Tạo **một hoặc nhiều file prompt** (Markdown) để user **dán vào** Figma Make, Stitch, hoặc tool gen UI khác, nhằm **sinh Design System / Brand Guideline** (foundation), không phải wireframe từng màn app.

## Phân biệt nhanh (tránh lẫn skill)

| Nhu cầu | Skill phù hợp |
|--------|----------------|
| Prompt để **tool thiết kế** tạo **DS / BG / token / thư viện cơ sở** | **Skill này** |
| Hỏi stakeholder và prompt **markdown** generic cho AI/Designer | `ba-brand-prompt-gen` |
| Đã có file BG, cần prompt **từng màn** theo token | `ba-mockup-prompt-gen` |
| Chỉ **shell + nav**, main trống | `ba-mockup-prompt-gen_layout` |

## Điều kiện kích hoạt

- User muốn **prompt** (tiếng Việt hoặc song ngữ tùy chọn) gửi vào **một** công cụ: **Figma Make**, **Google Stitch**, **v0**, **bolt.new**, **Uizard**, **khác**.
- Mục tiêu đầu ra: **Design System** (màu, type, spacing, elevation, icon style, component primitives) và/hoặc **Brand Guideline** (logo usage, palette, tone, layout grid) — **không** yêu cầu chi tiết từng MH nghiệp vụ.

Nếu user **chưa có** gì ngoài ý tưởng: có thể **rút gọn** phần hỏi (mục "Input tối thiểu") hoặc gợi ý làm `ba-brand-prompt-gen` trước rồi quay lại để **đóng gói** prompt cho tool.

## Input tối thiểu (agent phải có hoặc hỏi)

1. **Tên brand / sản phẩm**
2. **Loại đầu ra**: `design-system` | `brand-guideline` | `cả hai` (ưu tiên thứ tự)
3. **Công cụ đích** → lưu `[AI_TOOL]` (ví dụ: Figma Make, Stitch)
4. **Nền tảng**: Web / Mobile / cả hai (ảnh hưởng grid, touch target, scale type)
5. **Một trong các nguồn** (càng đủ càng tốt):
   - Brand Brief ngắn (personality, audience, ngành)
   - Màu / font có sẵn (nếu có)
   - Link moodboard hoặc reference (nếu có)
6. **Ngôn ngữ prompt**: `vi` | `en` | `song ngữ (vi+en nhãn token)`

## Quy trình thực thi

### Bước 1 — Chuẩn hoá biến

Gán:

- `[BRAND]`, `[AI_TOOL]`, `[PLATFORM]`, `[OUTPUT_TYPE]`, `[LANG]`
- `[BRIEF]`: tóm tắt brand (personality, audience, product type, constraints)

### Bước 2 — Chọn "lớp" prompt theo tool

Thêm vào prompt đích **một khối** trong phần *Technical / Tool constraints* (không cần dài):

| Tool | Bắt buộc nhắc trong prompt |
|------|----------------------------|
| **Figma Make** | Variables (color/number/string), collections gợi ý (Primitive / Semantic), Auto-layout, component naming `Category/Name/Variant`, variant axes rõ ràng, file structure (Cover, Foundations, Components) |
| **Stitch** | Khung tổng thể file (foundations trước, components sau), nhất quán naming token, mô tả khối UI foundation (swatches, type ramp, spacing strip) |
| **v0 / bolt / web-first** | Design tokens dạng CSS variables hoặc Tailwind extend, semantic HTML, không bịa backend |
| **Khác** | Một dòng: "Tuân theo convention của [tool]: tạo bảng màu có nhãn, scale chữ, spacing scale, và component cơ bản (Button, Input, Card)" |

### Bước 3 — Cấu trúc nội dung prompt chính (template)

Tạo file: `docs-BA/Prototype/Prompt/prompt-ds-bg_[brand-slug]_[tool-slug]_YYYYMMDD.md` (tạo thư mục `docs-BA/Prototype/Prompt/` nếu chưa có).

Dùng **khung** sau (điền nội dung thật, không để placeholder trống nếu đã có từ user):

```markdown
# Prompt — [OUTPUT_TYPE] cho [BRAND] ([AI_TOOL])

## Vai trò
Bạn là senior product designer + design systems lead. Nhiệm vụ: thiết kế [design system | brand guideline | cả hai] nhất quán, có thể mở rộng, đạt accessibility (WCAG 2.1 AA cho text thông thường).

## Bối cảnh thương hiệu (bắt buộc tuân thủ)
[BRIEF — personality, audience, ngành, đối thủ/differentiation nếu có]

## Phạm vi đầu ra (deliverables)
- **Foundations**: color ramps (primary/secondary/neutral/semantic), typography scale (H1–Caption + body), spacing scale (base 4 hoặc 8), radius, elevation/shadow (nếu phù hợp [PLATFORM]), grid & breakpoints (web) hoặc safe area (mobile).
- **Semantic mapping**: ví dụ primary.DEFAULT dùng cho CTA; neutral cho nền và border; semantic cho trạng thái.
- **Components (primitives)**: Button (variants + states), Input, Select/Field, Checkbox/Radio, Card, Modal/Dialog (hoặc tối thiểu placeholder), Navigation item — **đủ states**: default/hover/focus/disabled/loading/error (áp dụng được đâu thì làm).
- **Documentation trong khung thiết kế**: một trang "How to use" ngắn: độ tương phản, không dùng màu lung tung, spacing không hard-code ngoài scale.
[ Nếu OUTPUT có Brand Guideline: thêm logo safe zone (nếu có mô tả), tone of voice ngắn, do/don't minh hoạ bằng khối UI ]

## Ràng buộc kỹ thuật — [AI_TOOL]
[Chèn bảng tool ở Bước 2 — 3–8 bullet cụ thể]

## Ngôn ngữ giao diện mẫu
[Ngôn ngữ nhãn UI trong khung demo: vi / en]

## Không làm
- Không thiết kế luồng màn hình ứng dụng đầy đủ hoặc mockup feature cụ thể (trừ khung minh hoạ nhỏ cho component).
- Không dùng màu chỉ mô tả bằng từ; phải có mã HEX (hoặc token trỏ tới HEX).
- Không bỏ qua focus state cho interactive elements.

## Thứ tự thực hiện trong tool
1) Foundations (màu + type + spacing)  
2) Semantic tokens / styles  
3) Components primitives + variants  
4) Trang tổng quan / cover

## Checklist nghiệm thu (self-review trước khi hoàn thành)
- [ ] Contrast chữ chính ≥ 4.5:1 trên nền tương ứng
- [ ] Spacing chỉ từ scale đã định nghĩa
- [ ] Tên component/token nhất quán, có quy tắc đặt tên
- [ ] [PLATFORM]: touch target tối thiểu ~44px nếu mobile
```

### Bước 4 — Tuỳ chọn: tách prompt "chỉ foundation" vs "foundation + components"

Nếu user lo context tool quá dài:

- File **`prompt-ds-bg_*_foundations.md`**: chỉ màu + type + spacing + grid.
- File **`prompt-ds-bg_*_components.md`**: tham chiếu "dùng đúng token từ bước foundations" + liệt kê primitives.

Ghi chú ngắn ở đầu file thứ hai: *"Thực hiện sau khi đã có foundations; không đổi HEX/scale trừ khi conflict."*

### Bước 5 — Liên kết workflow nội bộ (không bắt buộc)

Sau khi tool sinh visual:

- Muốn **file Markdown Brand Guideline** chuẩn hoá: gợi ý `ba-brand-base-gen` + `ba-brand-components-gen` để đồng bộ tài liệu dev.
- Muốn **code token**: `ba-stitch-design-sync` hoặc pipeline FE hiện có của repo.

## Lưu ý cho agent

1. **Không** nhét User Flow/ERD vào prompt này trừ khi user yêu cầu — đó là mockup/screen level.
2. Luôn gắn `[AI_TOOL]` với **ràng buộc cụ thể** (bảng Bước 2), tránh prompt chung chung.
3. Nếu user đưa **sẵn** file Brand Guideline: trích **token và nguyên tắc** vào prompt dưới dạng "BẮT BUỘC khớp", không sáng tạo lại palette trừ khi user bảo "refresh".

## Kết thúc

- Lưu file prompt, báo đường dẫn.
- Nhắc: dán toàn bộ vào [AI_TOOL]; nếu tool giới hạn độ dài → dùng tách file ở Bước 4.
