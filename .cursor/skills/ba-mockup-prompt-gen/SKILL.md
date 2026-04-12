---
name: ba-mockup-prompt-gen
description: "USE WHEN: Đã có file Brand Guideline (đọc được); cần sinh prompt layout từng màn và/hoặc MH high-fidelity với màu font spacing component WCAG trích từ guideline; kèm User Flow và ERD. Output: prompt-layout_*.md và prompt-mh-detail_*.md có Brand Guideline Reference. NOT FOR: chỉ khung app shell + menu + main trống (không cần token từng màn) — dùng skill ba-mockup-prompt-gen_layout. NOT FOR: một file prompt chỉ nghiệp vụ + data không ép design — dùng ba-mockup-prompt-gen_detail. Keywords: brand guideline bắt buộc, design tokens, từng màn hình, Figma Make v0 mockup theo DS."
---

# HƯỚNG DẪN SKILL: BA MOCKUP PROMPT GEN

**Version:** 1.5.0
**Author:** M2MBA
**Last Updated:** 2026-03-23
**Description:** Skill tạo file prompt thiết kế MH (Layout từng màn + High-Fidelity) **từ Brand Guideline đã có sẵn**, User Flow, ERD — dùng với AI design tools.

## Điều kiện kích hoạt (bắt buộc)

Skill này **chỉ** chạy khi **đã có file Brand Guideline** (Markdown hoặc tương đương) mà agent **đọc được nội dung** (path trong repo hoặc user paste).  
**Không có Brand Guideline** → **không** dùng skill này: hướng user sang **`ba-mockup-prompt-gen_layout`** (chỉ shell + điều hướng) hoặc **`ba-mockup-prompt-gen_detail`** (prompt chỉ nhu cầu + data, tool tự chọn visual), hoặc tạo Brand Guideline trước (`ba-brand-*`).

# PHÂN BIỆT VỚI SKILL LIÊN QUAN (tránh lẫn)

| Skill | Khi nào dùng | Brand Guideline | Đầu ra chính |
|--------|----------------|-------------------|---------------|
| **`ba-mockup-prompt-gen`** (skill này) | Cần prompt **theo đúng** màu/font/spacing/component đã định nghĩa; layout **từng màn** + (tuỳ chọn) MH HF đầy đủ | **Bắt buộc** (file đọc được) | `prompt-layout_*.md`, `prompt-mh-detail_*.md` — có block **Brand Guideline Reference**, WCAG, states |
| **`ba-mockup-prompt-gen_layout`** | Chỉ cần **app shell + navigation**; nhãn tiếng Việt; **vùng main để trống**; không cần chi tiết token | **Không bắt buộc** (“design system nếu có”) | **Một file** `prompt-shell_*.md` — không phải layout từng MH theo token |
| **`ba-mockup-prompt-gen_detail`** | Muốn **một file** prompt **chỉ nghiệp vụ + ERD**; để AI tool **tự** chọn bố cục/style | **Cấm** nhúng BG vào file prompt | `prompt-mh-detail_*.md` nhưng **không** màu/font/spacing ép buộc |

**Gợi ý chọn nhanh:** Shell/nav toàn app → **layout**. Đã có BG và cần khớp design system từng màn → **skill này**. Chỉ cần mô tả chức năng + data, không ép brand trong prompt → **detail**.

# NGỮ CẢNH VÀ MỤC TIÊU

Skill này giúp BA/Designer tạo file prompt **bám sát Brand Guideline có sẵn**, đưa vào AI design tool và sinh UI **nhất quán với design system**. Mục tiêu: giảm viết tay, giữ đúng token và chất lượng hiển thị.

Skill hỗ trợ 2 loại prompt (cả hai đều **dựa trên** Brand Guideline đã đọc):
- **Bước 1 – Prompt Layout (theo màn / page)**: Cấu trúc bố cục **từng screen/page** (không phải app shell — shell-only xem skill **layout**).
- **Bước 2 – Prompt MH Chi tiết**: High-Fidelity với data, component, color, spacing, interaction **trích từ guideline**.

# ĐIỀU KIỆN TIÊN QUYẾT (PREREQUISITES)

Trước khi thực thi, Agent **BẮT BUỘC** kiểm tra các yếu tố sau:

| Đối tượng | Yêu cầu |
|---|---|
| **Brand Guideline (file)** | **Luôn bắt buộc** cho skill này. Không có → **dừng** và chuyển hướng sang skill khác (xem bảng phân biệt phía trên). |
| Loại Prompt **Layout (từng màn)** | Brand Guideline + User Flows + danh sách Screens + Platform |
| Loại Prompt **MH Chi tiết** | Brand Guideline + Layout đã có (từ Bước 1 hoặc user cung cấp) + ERD hoặc mô tả data + User Flows |

Nếu thiếu bất kỳ input nào (trừ Visual Quality Guidelines — tuỳ chọn), Agent phải **DỪNG và hỏi user** trước khi tiếp tục. Không được tự suy diễn hoặc bịa thông tin.

# QUY TRÌNH THỰC THI (EXECUTION STEPS)

## Bước 0: Thu thập thông tin và đọc input files

### Bước 0.1 — Xác nhận thông tin cơ bản

Hỏi user (hoặc xác định từ context) các thông tin sau trước khi làm bất cứ điều gì:

- Loại prompt cần tạo: **Layout** / **MH Chi tiết** / **Cả hai**?
- Tên ứng dụng là gì?
- Platform: **Web** / **Mobile** / **Desktop**?
- Danh sách screens cần gen (liệt kê tên từng màn hình)?
- AI design tool sẽ dùng: **Figma Make** / **Galileo** / **Uizard** / **v0** / **bolt.new** / **khác**?
- **Đường dẫn hoặc nội dung Brand Guideline** (nếu chưa có trong context) — **thiếu thì không được gen bằng skill này**.

⛔ Nếu user chưa cung cấp đủ thông tin trên (và **không có BG**) → DỪNG: hoặc bổ sung BG, hoặc dùng **`ba-mockup-prompt-gen_layout`** / **`ba-mockup-prompt-gen_detail`** thay cho skill này.

⛔ Nếu user **chỉ** cần shell + navigation + main trống (Stitch) → không dùng skill này; dùng **`ba-mockup-prompt-gen_layout`**.

Lưu tên tool vào biến `[AI_TOOL]` để dùng xuyên suốt các bước sau.

### Bước 0.2 — Đọc Brand Guideline & Visual Quality Guidelines (bắt buộc có BG)

1. Tìm Brand Guideline tại: `docs-BA/Prototype/Brand Guideline/brand-guideline_*.md` (hoặc path user cung cấp)
   - Không thấy → Glob search `**/*brand*guideline*.md`, `**/*brand*.md`
   - Vẫn không thấy → **DỪNG** skill này: yêu cầu user cung cấp path hoặc paste nội dung **Brand Guideline**. Không được “tự tạo” palette thay thế rồi vẫn gọi là skill có BG.
2. Tìm Visual Quality Guidelines tại: `docs-BA/Prototype/Brand Guideline/visual-quality-guidelines.md`
   - Không thấy → Glob search `**/*visual*quality*.md`
   - Vẫn không thấy → **không dừng**, dùng tiêu chuẩn mặc định trong skill

Sau khi đọc, log gộp một lần:

```
✅ Brand Guideline: [path] | Colors: [#HEX list] | Fonts: [names] | Spacing: [base]px | Button: [tóm tắt]
✅ Visual Quality Guidelines: [path hoặc "dùng mặc định"]
✅ User Flow: [path] → [N] flows | ERD: [path] → [N] entities: [list] | Layout: [path nếu có]
```

⛔ Không tự đặt màu/font/spacing nếu chưa đọc Brand Guideline.
⛔ Nếu thiếu file bắt buộc (User Flow / ERD / Layout tuỳ loại prompt) → DỪNG, báo rõ file nào thiếu.

---

## Bước 1: Gen Prompt Layout (bố cục từng màn — không phải app shell)

**Chỉ thực hiện nếu user yêu cầu loại Layout hoặc cả hai.**

Đây là **layout từng screen/page** theo token Brand Guideline. **Không** gộp với **`ba-mockup-prompt-gen_layout`**: skill kia sinh **một** prompt cho **shell + nav**, main trống.

Tạo file tại: `docs-BA/Prototype/Prompt/prompt-layout_[tên-ứng-dụng]_[YYYYMMDD].md`

Cấu trúc file:

```
# Prompt: Layout Design for [Tên Ứng dụng]

## Brand Guideline Reference (TUÂN THỦ NGHIÊM NGẶT)
[Chèn Brand Guideline Reference — xem Bước 3]

---

## Screens
```

Với **mỗi screen**, sinh theo format dưới đây, sau đó **append vào file** và thông báo trước khi sang screen tiếp theo:

```
### Screen [N]: [Tên Screen]

#### Layout Type
[Single column / Two column / Grid / Dashboard / etc.]

#### Structure
- Header: [Height]px, bg: `#HEX`, Components: [list]
- Main Content: Layout: [type], Padding: [value]px, bg: `#HEX`
- Sidebar (nếu có): [Width]px, bg: `#HEX`, Components: [list]
- Footer (nếu có): [Height]px, bg: `#HEX`, Components: [list]

#### Component Placement
- Top Section: [components và vị trí]
- Middle Section: [components và vị trí]
- Bottom Section: [components và vị trí]

#### Spacing (từ Brand Guideline)
- Page Padding: [value]px
- Gap giữa sections: [value]px
- Gap giữa components: [value]px

#### Responsive (chỉ với Web)
- Mobile (< 768px): [layout changes]
- Tablet (768px–1024px): [layout changes]
- Desktop (> 1024px): [layout changes]

#### AI Tool Prompt (Ready-to-use)
> Copy đoạn sau vào [AI_TOOL]:

"Design a [Tên Screen] screen for [Tên Ứng dụng] [platform] app.
Layout: [single column/two column/grid/...].
Header: [height]px tall, background [#HEX], contains [list components].
Main content: [layout type], padding [value]px, background [#HEX].
[Sidebar nếu có]: [width]px wide, background [#HEX].
[Footer nếu có]: [height]px tall, background [#HEX].
Top section contains: [components]. Middle section contains: [components]. Bottom section contains: [components].
Use [Font Name] for all text. Primary color: [#HEX]. Spacing unit: [value]px."
```

**Sau mỗi screen**, Agent thực hiện:
1. Append nội dung screen vào file
2. Log: `✅ Đã gen Screen [N]: [Tên Screen]`
3. Nếu còn screen tiếp theo: `→ Tiếp tục Screen [N+1]: [Tên]...` (auto-continue nếu user đã chọn "tất cả"; dừng chờ confirm nếu user chưa nói rõ)

---

## Bước 2: Gen Prompt MH Chi tiết

**Chỉ thực hiện nếu user yêu cầu loại MH Chi tiết hoặc cả hai.**

Tạo file tại: `docs-BA/Prototype/Prompt/prompt-mh-detail_[tên-ứng-dụng]_[YYYYMMDD].md`

Cấu trúc file:

```
# Prompt: High-Fidelity Mockup Design for [Tên Ứng dụng]

## Brand Guideline Reference (TUÂN THỦ NGHIÊM NGẶT)
[Chèn Brand Guideline Reference — xem Bước 3]

---

## Screens
```

Với **mỗi screen**, sinh theo format dưới đây, append vào file, rồi thông báo:

```
### Screen [N]: [Tên Screen]

#### Layout Structure
[Reference layout từ Bước 1 hoặc mô tả ngắn cấu trúc nếu không có file layout]

#### Data & Information (từ ERD)
[Xem hướng dẫn ERD → Data mapping bên dưới]
- [Field Name]: Type [text/number/date/enum/boolean/FK], Format: [nếu có], Example: "[value]"
...

#### Components (TUÂN THỦ Brand Guideline)
- [Tên Component]: Type [Button/Input/Card/Table/...], Specs: [reference brand], Position: [vị trí], Content: [nội dung/data], States: [Default/Hover/Active/Disabled/Error]
...

#### Colors (TUÂN THỦ Brand Guideline)
- Primary: `#HEX` — [usage]
- Background: `#HEX` — [usage]
- Text Primary: `#HEX` — [usage]
- Text Secondary: `#HEX` — [usage]
...

#### Typography (TUÂN THỦ Brand Guideline)
- Heading: [Font], [size]px, Weight [w] — [usage]
- Body: [Font], [size]px, Weight [w] — [usage]
- Caption: [Font], [size]px, Weight [w] — [usage]

#### Spacing (TUÂN THỦ Brand Guideline)
- Page Padding: [value]px
- Section Spacing: [value]px
- Component Padding: [value]px
- Component Gap: [value]px

#### ⚠️ Visual Quality Requirements (từ visual-quality-guidelines.md)

**1. Color Contrast (WCAG 2.1 AA+)**

| Element | Contrast tối thiểu |
|---|---|
| Normal text (< 18px hoặc < 14px bold) | **4.5:1** |
| Large text (≥ 18px hoặc ≥ 14px bold) | **3:1** |
| UI Components (buttons, inputs, icons) | **3:1** |

Ghi rõ trong prompt:
- Text Primary (`#HEX`) trên bg (`#HEX`): ✅ [ratio]:1
- Text Secondary (`#HEX`) trên bg (`#HEX`): ✅ [ratio]:1
- Button text (`#HEX`) trên button bg (`#HEX`): ✅ [ratio]:1
- Icon (`#HEX`) trên bg (`#HEX`): ✅ [ratio]:1
⚠️ Nếu contrast < 4.5:1 (text) hoặc < 3:1 (UI element) → PHẢI điều chỉnh màu hoặc thêm border/shadow.

**2. Button Alignment**
- Tất cả buttons trong cùng row: height cố định [value]px, padding [v]px [h]px — nhất quán
- Display: `flex` | `align-items: center` | `gap: [value]px`
- Text không được bị cắt: `overflow: hidden; text-overflow: ellipsis`
- Disabled state: `opacity: 0.5`, `cursor: not-allowed`, không thay đổi kích thước

**3. Icon Alignment**
- Icon container: fixed `[w]px × [h]px`, display `flex`, `align-items: center`, `justify-content: center`
- Icon size: 50–75% container (tham chiếu: Button SM 12px/16px, MD 16px/20px, LG 18px/24px, Nav 20px/24px)
- Icon + text: `gap: [value]px`, baseline-aligned

**4. Spacing Consistency**
- Chỉ dùng bội số của base unit từ Brand Guideline (4px hoặc 8px)
- KHÔNG dùng spacing lẻ (3px, 5px, 7px) trừ khi Brand Guideline định nghĩa
- Section-level spacing > component-level spacing

**5. States bắt buộc cho interactive components**

| Component | States bắt buộc |
|---|---|
| Button | Default, Hover, Active, Disabled, Loading |
| Input | Default, Focus, Error, Disabled, Filled |
| Checkbox/Radio | Unchecked, Checked, Indeterminate, Disabled |
| Dropdown | Closed, Open, Selected, Disabled |
| Link | Default, Hover, Visited, Focus |

Mỗi state phải mô tả rõ visual change: màu, border, opacity, cursor.

#### Interactions
- [Tên interaction]: Trigger: [action], States: [list], Feedback: [visual/message]
...

#### AI Tool Prompt (Ready-to-use)
> Copy đoạn sau vào [AI_TOOL]:

"Design a high-fidelity [Tên Screen] screen for [Tên Ứng dụng] [platform] app.
[Mô tả layout ngắn].
Key components: [list components với specs ngắn gọn].
Colors: Primary [#HEX], Background [#HEX], Text [#HEX].
Typography: [Font name], Heading [size]px bold, Body [size]px regular.
Spacing: Page padding [value]px, component gap [value]px.
[Mô tả data/content chính cần hiển thị].
Ensure WCAG AA contrast compliance. All buttons aligned with flexbox center."
```

**Sau mỗi screen**, Agent thực hiện:
1. Append nội dung screen vào file
2. Log: `✅ Đã gen Screen [N]: [Tên Screen]`
3. Tiếp tục hoặc chờ confirm (giống Bước 1)

---

## Bước 3: Brand Guideline Reference Header

Ở **đầu mỗi file prompt** (Layout và MH Chi tiết), Agent **BẮT BUỘC** chèn section sau, điền đầy đủ từ Brand Guideline đã đọc ở Bước 0.2:

```markdown
## Brand Guideline Reference (TUÂN THỦ NGHIÊM NGẶT)

### Color System
- Primary: `#HEX` — [usage]
- Secondary: `#HEX` — [usage]
- Neutral/Gray scale: `#HEX` → `#HEX`
- Success: `#HEX` | Warning: `#HEX` | Error: `#HEX` | Info: `#HEX`
- Background: `#HEX` | Surface: `#HEX`

### Typography
- Heading Font: [name], Weights: [list]
- Body Font: [name], Weights: [list]
- H1: [size]px / Weight [w] / Line-height [lh]px
- H2/H3/H4: [...]
- Body: [size]px / Weight [w] / Line-height [lh]px
- Caption: [size]px / Weight [w]

### Spacing System
- Base Unit: [4px/8px]
- XS [v]px | SM [v]px | MD [v]px | LG [v]px | XL [v]px | XXL [v]px

### Key Component Specs
- Primary Button: bg `#HEX`, text `#HEX`, padding [v]px [h]px, radius [v]px, font [size]px/[w]
- Secondary Button: bg transparent, border [v]px `#HEX`, padding [v]px [h]px, radius [v]px
- Text Input: border [v]px `#HEX`, padding [v]px [h]px, radius [v]px, focus border `#HEX`
- Card: bg `#HEX`, padding [v]px, radius [v]px, shadow [spec]
```

---

## Bước 4: Tổng kết và hướng dẫn sử dụng

Sau khi gen xong tất cả screens và files, Agent **BẮT BUỘC** tự chạy checklist sau và output kết quả trước khi kết thúc:

```
## ✅ Visual Quality Checklist (tự kiểm tra trước khi hoàn thành)

### File: [tên file]
- [ ] Tất cả màu dùng hex codes (không dùng "blue", "red", v.v.)
- [ ] Contrast ratio đã ghi rõ cho text và UI components
- [ ] Button height và padding nhất quán trong cùng screen
- [ ] Icon size nhất quán trong cùng context
- [ ] Spacing chỉ dùng từ spacing scale của Brand Guideline
- [ ] Responsive breakpoints đã mô tả (Web only)
- [ ] Tất cả states của interactive components đã liệt kê
- [ ] Brand Guideline Reference có ở đầu file
- [ ] AI Tool Prompt (Ready-to-use) có cho mỗi screen, tên [AI_TOOL] điền đúng

❌ Nếu có item chưa đạt → ghi rõ item nào và lý do, tự fix trước khi báo hoàn thành.
```

Sau khi checklist pass, Agent tóm tắt:

```
## ✅ Hoàn thành

### Files đã tạo:
- [path đầy đủ file Layout] — [N] screens
- [path đầy đủ file MH Chi tiết] — [N] screens

### Cách sử dụng với [AI_TOOL]:
1. Mở [AI_TOOL]
2. Tại mỗi screen, copy đoạn "AI Tool Prompt (Ready-to-use)" tương ứng
3. Paste vào prompt box của [AI_TOOL] và chạy
4. Nếu cần điều chỉnh: sửa màu sắc theo Color System trong Brand Guideline Reference

### Lưu ý trước khi dùng:
⚠️ Đảm bảo [AI_TOOL] đã được cấu hình đúng font: [Font names từ Brand Guideline]
⚠️ Nếu [AI_TOOL] không nhận font → thay bằng font system gần nhất và ghi chú lại
```

---

# HƯỚNG DẪN MAP ERD → DATA SECTION

Khi đọc ERD để gen phần Data & Information trong MH Chi tiết, áp dụng quy tắc sau:

| ERD Element | UI Component tương ứng |
|---|---|
| Entity (table) | Một section/card trên màn hình |
| String field | Text input / Text display |
| Number field | Number input / Formatted text (currency, %) |
| DateTime field | Date picker / Formatted date display |
| Boolean field | Toggle / Checkbox |
| Enum field | Radio group / Select dropdown |
| FK (Foreign Key) | Dropdown / Autocomplete / Searchable select |
| One-to-many relationship | List / Table / Expandable section |
| Many-to-many relationship | Multi-select / Tag input / Chip group |

Ví dụ áp dụng:
- ERD: `Order { id, customer_id (FK→Customer), status (enum: pending/processing/done), created_at (DateTime), total_amount (Number) }`
- Data section:
  ```
  - order_id: Type text, Format: "ORD-XXXXX", Example: "ORD-00123"
  - customer_id: Type FK→Customer, Component: Autocomplete search, Example: "Nguyễn Văn A"
  - status: Type enum [pending/processing/done], Component: Select dropdown / Status badge
  - created_at: Type DateTime, Format: "DD/MM/YYYY HH:mm", Example: "11/03/2026 09:30"
  - total_amount: Type Number, Format: "#,### VND", Example: "1,500,000 VND"
  ```

---

# QUY TẮC BẮT BUỘC

1. **PHẢI hoàn thành Bước 0** (tất cả 3 sub-steps) trước khi viết bất kỳ nội dung nào.
2. **PHẢI có và đọc Brand Guideline thực tế** — không tự đặt màu/font/spacing; không có file BG → **không** thực thi skill này (chuyển sang skill layout/detail hoặc yêu cầu tạo BG).
3. **PHẢI Glob search** nếu không tìm thấy Brand Guideline tại path mặc định.
4. **PHẢI đọc Visual Quality Guidelines** nếu tìm thấy file; nếu không có thì dùng tiêu chuẩn mặc định trong skill.
5. **PHẢI tạo thư mục** `docs-BA/Prototype/Prompt/` nếu chưa tồn tại.
6. **PHẢI dùng hex codes** cho tất cả màu sắc.
7. **PHẢI ghi rõ contrast ratio** cho mỗi color combination quan trọng (text, button, icon).
8. **PHẢI ghi rõ flexbox alignment** cho buttons và icons.
9. **PHẢI liệt kê đủ states** cho mọi interactive component (Button, Input, Checkbox, Dropdown, Link).
10. **PHẢI sinh từng screen một** (Incremental Output): append vào file → log → tiếp tục/chờ confirm.
11. **PHẢI include section "AI Tool Prompt (Ready-to-use)"** cho mỗi screen ở cả 2 loại file, điền đúng tên [AI_TOOL] user đã chọn ở Bước 0.1.
12. **PHẢI reference ERD** khi gen MH Chi tiết — dùng bảng ERD→Data mapping, không tự bịa field.
13. **PHẢI chạy Visual Quality Checklist** (Bước 4) và output kết quả trước khi báo hoàn thành.
14. Naming convention: `prompt-layout_[tên-app]_[YYYYMMDD].md` và `prompt-mh-detail_[tên-app]_[YYYYMMDD].md`.

# THAM CHIẾU

- Brand Guideline: `docs-BA/Prototype/Brand Guideline/brand-guideline_[YYYYMMDD].md`
- Visual Quality Guidelines: `docs-BA/Prototype/Brand Guideline/visual-quality-guidelines.md`
- Output: `docs-BA/Prototype/Prompt/`
- Skill liên quan (không thay thế skill này): **`ba-mockup-prompt-gen_layout`** (shell), **`ba-mockup-prompt-gen_detail`** (prompt không ép brand)