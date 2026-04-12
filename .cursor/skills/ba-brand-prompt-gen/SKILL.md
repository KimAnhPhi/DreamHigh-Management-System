---
name: ba-brand-prompt-gen
description: "Skill thu thập thông tin từ stakeholder và tạo prompt comprehensive để gen Design System (tokens, components, nguyên tắc); không phải Brand Guideline marketing."
---

# HƯỚNG DẪN SKILL: BA DESIGN SYSTEM PROMPT GENERATION (`ba-brand-prompt-gen`)

**Version:** 1.2.0  
**Author:** M2MBA  
**Last Updated:** 2026-04-10  
**Description:** Thu thập input sản phẩm / nhận diện / nền tảng có hệ thống, xác nhận Brief, sinh **một file prompt structured** để **gen Design System** (màu, typo, spacing, component, token JSON) — **không** đồng nghĩa với tài liệu Brand Guideline thuần marketing.

## Mục đích
Thu thập đủ ngữ cảnh sản phẩm (product + audience + platform + optional brand/assets) → **prompt đủ section** để AI/designer/Dev sinh **Design System** tái sử dụng trong code & Figma.

## Role
Chuyên gia Design Systems + BA: khai thác có nhóm, tổng hợp, không bịa dữ liệu stakeholder.

## References (bắt buộc khi thực thi)
Đường dẫn tương đối thư mục chứa `SKILL.md`:

| File | Dùng cho |
|------|----------|
| `references/brand-info-checklist.md` | Checklist + **câu hỏi mẫu** (ngữ cảnh brand/product phục vụ DS; 1–4 bắt buộc, 5–7 khuyến nghị/tùy) |
| `references/prompt-template.md` | **Khung prompt** đầu ra Design System (điền placeholder, giữ cấu trúc) |

**Không** nhét lại toàn bộ checklist/template vào skill — đọc file reference để tiết kiệm token.

## Quy trình

### Bước 1 — Thu thập
- Hỏi theo **từng nhóm** trong checklist (không dồn một lần).
- Sau **mỗi nhóm**: tóm tắt ngắn → stakeholder xác nhận → nhóm tiếp.
- Thiếu mục bắt buộc: hỏi tiếp hoặc ghi rõ “chưa có” nếu stakeholder xác nhận bỏ qua có chủ đích.

### Bước 2 — Brief đầu vào (xác nhận trước khi gen prompt)
Tạo khối tóm tắt và hỏi: *Đã chính xác chưa?*

```markdown
## Design System — Brief Summary
**Product / Brand Name**: …
**Tagline** (nếu có): …
**Personality / Voice** (3–5 từ): …
**Target Audience**: …
**Product Type**: …
**Platforms** (web/app/admin…): …
**Existing Assets** (logo, màu, font…): Có/Không — …
```

### Bước 3 — Sinh prompt
- Điền **`references/prompt-template.md`** bằng nội dung đã thống nhất (có thể bỏ subsection không áp dụng nhưng **không** xóa nhóm bắt buộc).
- Phần **Output Requirements / Design Principles** trong template: **giữ** — đó là brief cho bước gen **Design System** (base-gen, code, tool).

### Bước 4 — Lưu & handoff
- **Đường dẫn mặc định:** `docs-BA/Prototype/Design System/` (tạo nếu chưa có); stakeholder chỉ định khác thì theo họ.
- **Tên file:** `[product-or-brand-name]-design-system-prompt.md`
- Thông báo đường dẫn; gợi ý tiếp: **`/ba-brand-base-gen`** (nếu workflow repo có bước sinh phần cơ bản) hoặc AI/designer; chỉnh prompt nếu cần.

## Lưu ý ngắn
- **Design System** = token + component + pattern + nguyên tắc dùng trong sản phẩm; có thể kèm đoạn ngữ cảnh brand ngắn nhưng **đầu ra mục tiêu** là hệ thống thiết kế cho dev/PM, không phải brochure thương hiệu.
- Một nhóm một lượt; stakeholder lúng túng → gợi ý theo ngành/product type (không thay họ quyết định).
- Prompt phải **đủ section** để downstream (base-gen / designer / dev) không phải đoán.
