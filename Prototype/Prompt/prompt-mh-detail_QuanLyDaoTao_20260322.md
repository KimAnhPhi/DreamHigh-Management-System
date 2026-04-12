### MH 01: Danh sách danh mục

#### Layout
single column — kế thừa App Shell Top nav + content

#### Data & Fields (từ ERD)
| Field | Type | Component UI | Format | Example |
|---|---|---|---|---|
| Mã danh mục | string | Text display | — | "KID-001" |
| Tên danh mục | string | Text display | — | "Tiếng Anh Trẻ Em" |
| Loại danh mục | string | Text display | — | "Chương trình học" |
| Trạng thái | enum | Status badge | Hiệu lực / Ngừng... | "Hiệu lực" |
| Thao tác | action | Button | — | "Xem chi tiết" |

#### Components
| Component | Type | Position | States |
|---|---|---|---|
| Thêm mới danh mục | Button Primary | Top right (above table) | Default/Hover/Active |
| Tìm kiếm | Text Input | Top left (above table) | Default/Focus/Filled |
| Bảng dữ liệu | Table | Main content | Row Hover |
| Pagination | List | Below table | Default/Active |

#### Colors & Typography
- Primary: `#CC9933` | Background: `#FAFAF7` | Text: `#1A1A18`
- Font: Jost | Heading: 24px bold (Cormorant Garamond) | Body: 16px regular (Jost)
- Override riêng cho MH này (nếu có): Badge 'Hiệu lực' bg `rgba(80,180,120,0.12)`, text `#2D7A50`; Badge 'Ngừng hiệu lực' bg `rgba(0,0,0,0.06)`, text `#888880`.

#### Spacing
- Page padding: 48px | Section gap: 24px | Component gap: 16px
- (Chỉ dùng bội số 8px từ Brand Guideline)

#### Contrast (WCAG AA)
- Text chính (`#1A1A18`) trên bg (`#FAFAF7`): 15:1 ✅
- Button text (`#1A1A18`) trên button bg (`#CC9933`): 8:1 ✅

#### Interactions
| Trigger | Action | Feedback |
|---|---|---|
| Click [Thêm mới] | Điều hướng | Sang màn hình MH 02 |
| Click [Xem chi tiết] | Điều hướng | Sang màn hình MH 03 |
| Nhập tìm kiếm | Lọc dữ liệu table | Table cập nhật hoặc báo 'Không có dữ liệu phù hợp' (NOTI-004) |

#### AI Tool Prompt — v0.dev
"Design a high-fidelity Danh sách danh mục screen for Phần mềm Quản lý Đào tạo Trung tâm Tiếng Anh Web app.
Inherits app shell: Top nav header 64px, bg #1A1A18.
Key components: Search input top left, Primary Button 'Thêm mới danh mục' top right. Data table below.
Data displayed: Mã danh mục, Tên danh mục, Loại danh mục, Trạng thái (badges: Hiệu lực / Ngừng hiệu lực), Thao tác (icon/button).
Colors: Primary #CC9933, Background #FAFAF7, Text #1A1A18. Card surface #F2EFE8.
Font: Jost, Heading: Cormorant Garamond 24px, Body 16px regular.
Spacing: page padding 48px, component gap 16px. Table row gap/padding 12px.
Ensure WCAG AA contrast. Buttons use flexbox center alignment.
Include all required states for: Button, Input, Table Rows."

---

### MH 02: Thêm mới danh mục

#### Layout
single narrow column (form center) — kế thừa App Shell Top nav + content

#### Data & Fields (từ ERD)
| Field | Type | Component UI | Format | Example |
|---|---|---|---|---|
| Mã danh mục | string | Text input | — | "KID-001" |
| Tên danh mục | string | Text input | — | "Tiếng Anh Trẻ Em" |
| Loại danh mục | enum | Select dropdown | — | "Chương trình học" |
| Mô tả | string | Textarea | — | "Dành cho độ tuổi 6-11" |
| Trạng thái | enum | Select dropdown | Hiệu lực / Ngừng | "Hiệu lực" |

#### Components
| Component | Type | Position | States |
|---|---|---|---|
| Form Container | Card | Center | — |
| Input fields | Text Input / Dropdown | Card body | Default/Focus/Error |
| Lưu | Button Primary | Card footer (Right) | Default/Hover/Active/Disabled |
| Hủy | Button Ghost | Card footer (Right) | Default/Hover |

#### Colors & Typography
- Primary: `#CC9933` | Background: `#FAFAF7` | Text: `#1A1A18`
- Font: Jost | Heading: 24px bold | Body: 16px regular
- Override riêng cho MH này (nếu có): Form Field dùng border-bottom `2px solid #CC9933` khi focus.

#### Spacing
- Page padding: 48px | Section gap: 24px | Component gap: 16px
- (Chỉ dùng bội số 8px từ Brand Guideline)

#### Contrast (WCAG AA)
- Text chính (`#1A1A18`) trên bg (`#FAFAF7`): 15:1 ✅
- Button text (`#1A1A18`) trên button bg (`#CC9933`): 8:1 ✅
- Ghost button text (`#3D3D3A`) trên bg (`#FAFAF7`): 10:1 ✅

#### Interactions
| Trigger | Action | Feedback |
|---|---|---|
| Click [Lưu] (hợp lệ) | Lưu data | Toast success (NOTI-002) & redirect |
| Click [Lưu] (thiếu data) | Validate form | Hiển thị error inline (ERR-002) |
| Click [Hủy] | Hủy bỏ nhập liệu | Quay lại danh sách |

#### AI Tool Prompt — v0.dev
"Design a high-fidelity Thêm mới danh mục screen for Phần mềm Quản lý Đào tạo Trung tâm Tiếng Anh Web app.
Inherits app shell: Top nav header.
Key components: Centered form card. Includes Mã (input), Tên (input), Loại (dropdown), Mô tả (textarea), Trạng thái (dropdown). Bottom right: 'Hủy' (ghost button), 'Lưu' (primary button).
Data displayed: Form fields with labels and placeholders.
Colors: Primary #CC9933, Background #FAFAF7, Text #1A1A18. Form has bottom border 2px solid #CC9933 on focus.
Font: Jost, Heading: Cormorant Garamond 24px, Body 16px regular.
Spacing: page padding 48px, component gap 16px.
Ensure WCAG AA contrast. Buttons use flexbox center alignment.
Include all required states for: Text inputs (focus with gold underline, error states), Buttons (hover)."

---

### MH 03: Xem chi tiết / Chỉnh sửa danh mục

#### Layout
single narrow column (form center) — kế thừa App Shell Top nav + content

#### Data & Fields (từ ERD)
| Field | Type | Component UI | Format | Example |
|---|---|---|---|---|
| Mã danh mục | string | Text display (Label) | — | "KID-001" |
| Tên danh mục | string | Text input | — | "Tiếng Anh Trẻ Em" |
| Loại danh mục | enum | Select dropdown | — | "Chương trình học" |
| Mô tả | string | Textarea | — | "Dành cho độ tuổi 6-11" |
| Trạng thái | enum | Select dropdown | Hiệu lực / Ngừng | "Hiệu lực" |
| Meta data (Ngày/Người tạo) | string | Text display (Micro) | — | "11/03/2026 bởi Admin" |

#### Components
| Component | Type | Position | States |
|---|---|---|---|
| Form Container | Card | Center | — |
| Metadata Box | Card | Center (Below form) | — |
| Chỉnh sửa | Button Ghost | Card header | Default/Hover |
| Lưu | Button Primary | Card footer | Default/Hover |
| Ngừng hiệu lực | Button Dark | Card footer (Left) | Default/Hover/Disabled |

#### Colors & Typography
- Primary: `#CC9933` | Background: `#FAFAF7` | Text: `#1A1A18`, `#888880` (meta)
- Font: Jost | Heading: 24px bold | Body: 16px regular | Meta: 12px (Micro)
- Override riêng cho MH này (nếu có): Mã danh mục hiển thị read-only dạng text đậm.

#### Spacing
- Page padding: 48px | Section gap: 24px | Component gap: 16px
- (Chỉ dùng bội số 8px từ Brand Guideline)

#### Contrast (WCAG AA)
- Text chính (`#1A1A18`) trên bg (`#FAFAF7`): 15:1 ✅
- Button text (`#1A1A18`) trên button bg (`#CC9933`): 8:1 ✅

#### Interactions
| Trigger | Action | Feedback |
|---|---|---|
| Click [Lưu] | Cập nhật | Toast success (NOTI-003) & reload |
| Click [Ngừng hiệu lực] | Mở popup | Hiển thị cảnh báo nếu đã có dữ liệu (WARN-001) |
| Click [Chỉnh sửa] | Chuyển trạng thái | Form chuyển từ View sang Edit mode |

#### AI Tool Prompt — v0.dev
"Design a high-fidelity Xem/Chỉnh sửa danh mục screen for Phần mềm Quản lý Đào tạo Trung tâm Tiếng Anh Web app.
Inherits app shell: Top nav header.
Key components: Centered card. Toggle between View and Edit mode. Edit mode fields: Mã (read-only label), Tên (input), Loại (dropdown), Mô tả (textarea), Trạng thái (dropdown). Also display metadata (Ngày/người tạo). Buttons: 'Ngừng hiệu lực' (Dark button, Left), 'Hủy', 'Lưu' (Primary, Right).
Colors: Primary #CC9933, Background #FAFAF7, Text #1A1A18. 
Font: Jost, Meta info uses Micro 12px #888880.
Spacing: page padding 48px, component gap 16px.
Ensure WCAG AA contrast. Buttons use flexbox center alignment.
Include all required states for: Buttons, Inputs, Modals (Warning popup design)."
