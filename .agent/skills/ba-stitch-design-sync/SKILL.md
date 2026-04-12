---
name: ba-stitch-design-sync
description: "Skill trích xuất và đồng bộ Design Tokens từ Stitch Design, đảm bảo code Frontend khớp 100% với thiết kế"
---

# HƯỚNG DẪN SKILL: BA STITCH DESIGN SYNC

**Version:** 1.0.1
**Author:** M2MBA
**Last Updated:** 2026-03-17
**Description:** Skill tự động trích xuất Design Tokens (Colors, Typography, Spacing, Components) từ Stitch Design HTML/CSS và đồng bộ với Brand Guideline + Frontend Code.

Khi gen Frontend code từ Stitch Design, thường xảy ra vấn đề:
- Font chữ, size, line-height không khớp
- Màu sắc sai lệch (dùng màu từ Brand Guideline cũ thay vì Stitch)
- Spacing, padding, margin không đúng
- Border radius, shadows không khớp

Skill này giải quyết bằng cách:
1. **Trích xuất chính xác** Design Tokens từ Stitch HTML/CSS
2. **So sánh và validate** với Brand Guideline hiện tại
3. **Tự động cập nhật** Design Tokens và Frontend Code
4. **Tạo validation report** để đảm bảo 100% khớp

# HƯỚNG DẪN KÍCH HOẠT (TRIGGER)

Skill được kích hoạt khi User yêu cầu:
- "Sync design tokens từ Stitch..."
- "Lấy màu sắc, font từ Stitch design..."
- "Fix code không khớp với Stitch..."
- "Extract design tokens từ Stitch project..."

# ĐIỀU KIỆN TIÊN QUYẾT (PREREQUISITES)

1. Có Stitch Project ID hoặc URL
2. Có quyền truy cập Stitch MCP API
3. Có Brand Guideline file (để so sánh và update)
4. Có Frontend code đã gen (để update)

# QUY TRÌNH THỰC THI (EXECUTION STEPS)

Agent **BẮT BUỘC** thực hiện tuần tự các bước sau:

## Bước 1: Lấy thông tin từ Stitch Project

### 1.1. Lấy Project Info
- Gọi `mcp_stitch_get_project` với project ID
- Trích xuất:
  - `designTheme.customColor` → Primary color
  - `designTheme.font` → Font family
  - `designTheme.roundness` → Border radius
  - `designTheme.colorMode` → Light/Dark mode

### 1.2. Lấy tất cả Screens
- Gọi `mcp_stitch_list_screens` để lấy danh sách screens
- Với mỗi screen, gọi `mcp_stitch_get_screen` để lấy:
  - `htmlCode.downloadUrl` → HTML code
  - `screenshot.downloadUrl` → Screenshot để reference

### 1.3. Tải và Parse HTML
- Tải HTML code từ mỗi screen
- Parse HTML để trích xuất:
  - **Colors**: Tất cả `#hex`, `rgb()`, `rgba()` values
  - **Typography**: `font-family`, `font-size`, `font-weight`, `line-height`
  - **Spacing**: `padding`, `margin`, `gap` values
  - **Border Radius**: `border-radius` values
  - **Shadows**: `box-shadow` values
  - **Component Styles**: Inline styles và CSS classes

### 1.4. Trích xuất Navigation & Layout Metadata (OPTIONAL nhưng khuyến nghị)

- Đối với các project có **bottom tab / top tab / menu điều hướng rõ ràng** (như app Xanh SM):
  - Parse HTML + structure của từng screen để thu thập:
    - Danh sách **screens chính** (Home, Activity, Promotions, Points, Profile…).
    - **Navigation groups**:
      - Bottom Navigation (icon + label + order).
      - Top Tabs / Segmented controls trong từng màn (ví dụ: Đang đến / Hoàn thành / Đã huỷ).
    - Các **identifier** có thể dùng làm key:
      - data-attributes, id/class, text label cố định.
- Chuẩn hóa thông tin này thành 2 cấu hình JSON:
  - `navigation-config.json`:
    - Danh sách routes, label, group (bottomTab/topTab), thứ tự.
    - Ví dụ:
      - `[{ "key": "home", "label": "Trang chủ", "group": "bottom", "iconKey": "home" }, ...]`
  - `icon-map.json`:
    - Map `iconKey` → tên icon hoặc asset (path SVG/PNG, hoặc tên icon trong lib).
    - Ví dụ:
      - `{ "home": { "type": "vector", "name": "home-outline" }, "activity": { "type": "vector", "name": "history" } }`
- Lưu 2 file này vào thư mục chuẩn của repo (ví dụ):
  - `design-system/navigation/navigation-config.json`
  - `design-system/navigation/icon-map.json`

## Bước 2: Trích xuất Design Tokens

### 2.1. Color Extraction
- Parse tất cả màu từ HTML/CSS
- Nhóm theo category:
  - **Primary Colors**: Màu chính (từ `designTheme.customColor` và các biến thể)
  - **Semantic Colors**: Success, Error, Warning, Info (từ badges, status)
  - **Neutral Colors**: Gray scale (từ text, borders, backgrounds)
  - **Accent Colors**: Màu phụ (nếu có)

### 2.2. Typography Extraction
- Parse font-family từ HTML (`<style>`, inline styles, computed styles)
- Extract font-size, line-height, font-weight cho từng element:
  - Headings (H1-H6)
  - Body text (large, regular, small)
  - Caption, labels
- Tạo Typography Scale với đầy đủ thông tin

### 2.3. Spacing Extraction
- Parse tất cả padding, margin, gap values
- Xác định Base Unit (4px hoặc 8px)
- Tạo Spacing Scale (XS, SM, MD, LG, XL, 2XL, 3XL...)

### 2.4. Other Tokens
- **Border Radius**: Parse `border-radius` values
- **Shadows**: Parse `box-shadow` values
- **Component Specs**: Layout, sizing của components

## Bước 3: So sánh và Validate

### 3.1. So sánh với Brand Guideline
- Đọc Brand Guideline hiện tại
- So sánh từng token:
  - Colors: So sánh hex codes
  - Typography: So sánh font, size, weight, line-height
  - Spacing: So sánh values
- Tạo **Diff Report** liệt kê tất cả khác biệt

### 3.2. So sánh với Frontend Code
- Đọc Design Tokens trong `frontend/[app]/src/design-system/tokens/`
- So sánh với tokens từ Stitch
- Identify các hardcoded values trong components

## Bước 4: Cập nhật Design Tokens

### 4.1. Update Brand Guideline
- Cập nhật file Brand Guideline với tokens từ Stitch
- Ghi chú rõ ràng: "Cập nhật từ Stitch Project ID: [ID]"
- Version bump (1.0.0 → 1.1.0)

### 4.2. Update Frontend Tokens
- Cập nhật `colors.ts` với màu từ Stitch
- Cập nhật `typography.ts` với font, size, line-height từ Stitch
- Cập nhật `spacing.ts` với spacing values từ Stitch
- Cập nhật `tailwind.config.js` với tokens mới

## Bước 5: Cập nhật Components và Pages

### 5.1. Update Components
- Tìm tất cả hardcoded colors trong components
- Thay thế bằng tokens từ `colors.ts`
- Update typography classes/styles với tokens từ `typography.ts`
- Update spacing với tokens từ `spacing.ts`

### 5.2. Update Pages
- Tìm tất cả hardcoded values trong pages
- Thay thế bằng design tokens
- Đảm bảo sử dụng inline styles với `colors`, `typography`, `spacing` objects

## Bước 6: Validation và Report

### 6.1. Tạo Validation Checklist
- [ ] Tất cả colors đã dùng tokens từ Stitch
- [ ] Tất cả typography đã khớp với Stitch
- [ ] Tất cả spacing đã khớp với Stitch
- [ ] Border radius đã khớp với Stitch
- [ ] Components layout đã khớp với Stitch screenshots

### 6.2. Tạo Comparison Report
- So sánh Before/After
- List tất cả thay đổi
- Screenshots comparison (nếu có)

# QUY TẮC BẢO ĐẢM CHẤT LƯỢNG (RULES & BEST PRACTICES)

## Nguyên tắc "Stitch First"
- **TUYỆT ĐỐI ƯU TIÊN**: Tokens từ Stitch Design là source of truth
- Nếu Brand Guideline khác với Stitch → Update Brand Guideline theo Stitch
- Nếu Frontend Code khác với Stitch → Update Frontend Code theo Stitch

## Extraction Rules
- **Không suy diễn**: Chỉ dùng values có trong Stitch HTML/CSS
- **Parse chính xác**: Dùng regex/parser để extract, không guess
- **Validate**: So sánh với screenshot để đảm bảo đúng

## Update Rules
- **Incremental**: Update từng file một, không update tất cả cùng lúc
- **Backup**: Tạo backup hoặc commit trước khi update
- **Documentation**: Ghi chú rõ ràng source của mỗi token

## Validation Rules
- **100% Match**: Tất cả tokens phải khớp 100% với Stitch
- **No Hardcode**: Không được hardcode values, phải dùng tokens
- **Consistent**: Tất cả components/pages phải dùng cùng tokens

# OUTPUT FILES

1. **Design Tokens** (Updated):
   - `frontend/[app]/src/design-system/tokens/colors.ts`
   - `frontend/[app]/src/design-system/tokens/typography.ts`
   - `frontend/[app]/src/design-system/tokens/spacing.ts`

2. **Brand Guideline** (Updated):
   - `docs-BA/Prototype/Brand Guideline/[app]-guideline_[YYYYMMDD].md`

3. **Validation Report**:
   - `docs-BA/Prototype/Stitch-sync/[app]/STITCH_SYNC_REPORT.md`

4. **Comparison Report**:
   - `docs-BA/Prototype/Stitch-sync/[app]/STITCH_COMPARISON.md`

# TROUBLESHOOTING

## Nếu không parse được HTML
- Kiểm tra URL download có hợp lệ không
- Thử tải HTML bằng cách khác
- Dùng screenshot để extract colors (manual)

## Nếu tokens không khớp
- Kiểm tra lại regex/parser
- So sánh với screenshot
- Verify với Stitch project info

## Nếu update code bị lỗi
- Kiểm tra syntax
- Đảm bảo imports đúng
- Test từng component sau khi update
