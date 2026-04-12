---
name: ba-mockup-prompt-gen-layout
description: "USE WHEN: Cần một prompt duy nhất cho app shell + điều hướng; nhãn giao diện tiếng Việt; vùng main để trống; paste Stitch hoặc AI design tool. Brand Guideline không bắt buộc. Output: prompt-shell_*.md. NOT FOR: prompt layout từng màn theo file Brand Guideline đầy đủ token — dùng skill ba-mockup-prompt-gen. NOT FOR: prompt chỉ nghiệp vụ + ERD không design — dùng ba-mockup-prompt-gen_detail. Keywords: shell navigation sidebar header empty main Stitch khung app."
version: 2.3.0
author: M2MBA
last_updated: 2026-03-23
---

## Phân biệt với `ba-mockup-prompt-gen` (tránh lẫn)

| | **Skill này (`…_layout`)** | **`ba-mockup-prompt-gen`** |
|---|---|---|
| **Mục đích** | Một prompt: **app shell + điều hướng**, main trống | Nhiều prompt/file: **layout từng màn + MH HF** theo **file Brand Guideline** |
| **Brand Guideline** | Không bắt buộc | **Bắt buộc** (đọc được file) |
| **Output** | `prompt-shell_*.md` | `prompt-layout_*.md`, `prompt-mh-detail_*.md` (có block brand) |
| **Khi nào** | Stitch / “chỉ khung app + menu” | Đã có BG, cần khớp design system từng màn |

Cần prompt **chỉ nghiệp vụ + ERD**, không ép màu/font → dùng **`ba-mockup-prompt-gen_detail`**, không dùng hai skill trên.

---

## INPUT BẮT BUỘC

Thiếu bất kỳ mục nào → hỏi ngay, không gen:

1. **Tên app**
2. **Platform**: Web / Mobile / cả hai
3. **Đối tượng người dùng** (ví dụ: dispatcher, học viên, admin nội bộ)
4. **Danh sách tính năng** (liệt kê tên, không cần mô tả chi tiết)

---

## OUTPUT

1 file: `docs-BA/Prototype/Prompt/prompt-shell_[tên-app]_[YYYYMMDD].md`

---

## PIPELINE

### B1 – Đọc input, không suy diễn thêm
Dùng đúng những gì user cung cấp. Không tự thêm tính năng, không tự chọn navigation pattern.

### B1b – Ngôn ngữ prompt và mockup (bắt buộc)
- **File prompt** sinh ra: phần **Context** và **Request** viết **tiếng Việt** (trừ tên app/brand/product nếu user giữ nguyên).
- Trong **Context** luôn có **một dòng cố định** về ngôn ngữ giao diện (copy đúng khối dưới, không bỏ, không rút gọn):
  - `Ngôn ngữ giao diện (bắt buộc): Tiếng Việt — toàn bộ chữ hiển thị trên mockup (menu, nút, tiêu đề, breadcrumb, placeholder, empty state, tooltip) phải bằng tiếng Việt; chỉ giữ tên thương mại/tên riêng (ví dụ QuickBooks, SSO) khi là tên gốc.`
- **Không** dùng khối Request toàn tiếng Anh (tránh tool mặc định gen nhãn tiếng Anh).

### B1c – Vùng nội dung chính (main) chỉ để trống (mặc định)
- Mục tiêu: gen **shell** (sidebar, header, footer) + **nhãn điều hướng**; **không** gen nội dung demo ở khối giữa màn hình (tránh card “mẫu trạng thái”, widget, biểu đồ, breadcrumb giả, tiêu đề trang chi tiết trong vùng main).
- Trong **Context** luôn có **một dòng cố định** (copy đúng khối dưới, không bỏ, không rút gọn):
  - `Vùng nội dung chính (main content, bắt buộc): Chỉ để trống — một khối nền trắng/nền app đồng nhất, không chữ, không hình minh họa, không card/widget/metric/bảng/biểu đồ; không breadcrumb hay tiêu đề trang trong vùng này.`
- Trong **Request** luôn nhắc: trạng thái điều hướng (default/hover/active/active-parent) chỉ thể hiện **trên sidebar/header** (hoặc thanh nav tương ứng), **không** tạo bảng so sánh hoặc showcase trạng thái ở giữa màn hình.
- Nếu user **không** muốn main trống (ngoại lệ) → user phải nói rõ; khi đó bỏ dòng B1c và các câu liên quan trong Request.

### B2 – Gen prompt

```markdown
# Prompt: App Shell & Navigation — [Tên app]

## Context
- App: [Tên app]
- Platform: [Web / Mobile / Responsive web]
- Primary users: [đối tượng người dùng]
- Ngôn ngữ giao diện (bắt buộc): Tiếng Việt — toàn bộ chữ hiển thị trên mockup (menu, nút, tiêu đề, breadcrumb, placeholder, empty state, tooltip) phải bằng tiếng Việt; chỉ giữ tên thương mại/tên riêng (ví dụ QuickBooks, SSO) khi là tên gốc.
- Vùng nội dung chính (main content, bắt buộc): Chỉ để trống — một khối nền trắng/nền app đồng nhất, không chữ, không hình minh họa, không card/widget/metric/bảng/biểu đồ; không breadcrumb hay tiêu đề trang trong vùng này.
- Features: [danh sách tính năng, mỗi item 1 dòng]

## Request
Thiết kế **app shell và điều hướng** cho [Tên app].

Dựa trên tính năng và platform ở trên:
- Đề xuất kiến trúc thông tin và mẫu điều hướng phù hợp (không bắt buộc trước một pattern cụ thể — tool tự chọn nếu hợp lý).
- Thiết kế shell: header, sidebar/nav (hoặc top nav), **vùng main chỉ là khối trống** như mục Context, footer nếu cần.
- Hiển thị đầy đủ trạng thái điều hướng: mặc định, hover, active, active-parent — **chỉ trên các mục menu thật** (sidebar/header), không tạo vùng demo/so sánh trạng thái ở giữa màn hình.

Tuân theo design system hiện có (nếu có). **Không** thiết kế màn hình chi tiết — chỉ shell và navigation; **không** điền nội dung trang vào vùng main.

**Nhắc lại:** Mọi nhãn và chữ trên giao diện mockup (ngoài vùng main đang để trống) phải là **tiếng Việt** như mục Ngôn ngữ giao diện ở trên.
```

---

## CHECKLIST

- [ ] Đủ 4 input trước khi gen
- [ ] Không tự thêm / bớt tính năng so với input
- [ ] Prompt có **dòng Ngôn ngữ giao diện (bắt buộc): Tiếng Việt** đúng theo B1b
- [ ] Prompt có **dòng Vùng nội dung chính (main content, bắt buộc): Chỉ để trống** đúng theo B1c (trừ khi user chọn ngoại lệ)
- [ ] Request nêu rõ trạng thái nav chỉ trên menu, không showcase ở giữa màn hình
- [ ] Context + Request viết **tiếng Việt** (không khối Request tiếng Anh thay thế)
- [ ] Prompt không cố định navigation pattern — để Stitch tự chọn
- [ ] Prompt không yêu cầu thiết kế MH chi tiết
- [ ] Không còn placeholder `[...]` chưa điền