# Stitch Design Extraction Guide

Hướng dẫn chi tiết cách trích xuất Design Tokens từ Stitch Design.

## 📋 Checklist Trước Khi Extract

- [ ] Có Stitch Project ID
- [ ] Có quyền truy cập Stitch MCP API
- [ ] Đã test kết nối với Stitch API
- [ ] Có Brand Guideline file để so sánh
- [ ] Có Frontend code để update

## 🔍 Bước 1: Lấy Thông Tin Từ Stitch

### 1.1. Project Info
```javascript
// Gọi API
const project = await mcp_stitch_get_project({
  name: `projects/${projectId}`
});

// Trích xuất:
const primaryColor = project.designTheme.customColor; // "#00bdb6"
const font = project.designTheme.font; // "BE_VIETNAM_PRO"
const roundness = project.designTheme.roundness; // "ROUND_TWELVE" = 12px
const colorMode = project.designTheme.colorMode; // "LIGHT"
```

### 1.2. List Screens
```javascript
const screens = await mcp_stitch_list_screens({
  projectId: projectId
});

// Với mỗi screen:
for (const screen of screens.screens) {
  const screenDetail = await mcp_stitch_get_screen({
    name: screen.name,
    projectId: projectId,
    screenId: screen.id
  });
  
  // Tải HTML
  const htmlUrl = screenDetail.htmlCode.downloadUrl;
  // Download và parse HTML
}
```

## 🎨 Bước 2: Extract Colors

### 2.1. Từ Project Info
- **Primary Color**: `designTheme.customColor`
- **Color Mode**: `designTheme.colorMode` (LIGHT/DARK)

### 2.2. Từ HTML/CSS
Parse HTML để tìm:

```javascript
// Hex colors
const hexPattern = /#([0-9a-fA-F]{3,6})\b/g;

// RGB/RGBA colors
const rgbPattern = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/g;

// CSS Variables
const cssVarPattern = /var\(--([^)]+)\)/g;
```

### 2.3. Nhóm Colors

**Primary Colors:**
- DEFAULT: Từ `designTheme.customColor`
- Dark: Tìm darker shade (thường -20% lightness)
- Light: Tìm lighter shade (thường +40% lightness)
- Lightest: Tìm lightest shade (thường +80% lightness)

**Semantic Colors:**
- Success: Từ badge "HOÀN THÀNH", "COMPLETED" (thường #28A745)
- Error: Từ badge "ĐÃ HỦY", "CANCELLED", red pin (thường #DC3545)
- Warning: Từ warning states (thường #FFC107)
- Info: Từ info states (thường #17A2B8)

**Neutral Colors:**
- 900: Heading text (thường #1A1A1A)
- 700: Body text (thường #4A4A4A)
- 400: Placeholder, inactive nav (thường #9B9B9B)
- 100: Borders, backgrounds (thường #F5F5F5)
- 200: Light borders, dashed lines (thường #E5E5E5)

## 📝 Bước 3: Extract Typography

### 3.1. Font Family
```javascript
// Từ project info
const fontFamily = project.designTheme.font; // "BE_VIETNAM_PRO"

// Từ HTML
const fontFamilyPattern = /font-family:\s*['"]?([^'";}]+)['"]?/gi;
```

### 3.2. Font Sizes
Parse HTML để tìm tất cả `font-size`:

```javascript
const fontSizePattern = /font-size:\s*(\d+(?:\.\d+)?)px/gi;

// Nhóm theo usage:
// - H1: Largest (thường 32px)
// - H2: Screen headers (thường 24px)
// - H3: Sub-headers (thường 20px)
// - Body Large: 18px
// - Body Regular: 16px
// - Body Small: 14px
// - Caption: 12px
```

### 3.3. Line Heights
```javascript
const lineHeightPattern = /line-height:\s*(\d+(?:\.\d+)?)px/gi;

// Thường line-height = font-size * 1.25 - 1.5
```

### 3.4. Font Weights
```javascript
const fontWeightPattern = /font-weight:\s*(\d+)/gi;

// Common: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
```

## 📏 Bước 4: Extract Spacing

### 4.1. Base Unit
Tìm base unit (4px hoặc 8px) bằng cách:
- Xem tất cả spacing values
- Tìm GCD (Greatest Common Divisor)
- Thường là 4px hoặc 8px

### 4.2. Spacing Scale
```javascript
const spacingPattern = /(?:padding|margin|gap):\s*(\d+(?:\.\d+)?)px/gi;

// Nhóm thành scale:
// XS: 4px
// SM: 8px
// MD: 16px
// LG: 24px
// XL: 32px
// 2XL: 48px
```

## 🔲 Bước 5: Extract Border Radius

```javascript
const borderRadiusPattern = /border-radius:\s*(\d+(?:\.\d+)?)px/gi;

// Từ project info
const baseRadius = project.designTheme.roundness; // "ROUND_TWELVE" = 12px

// Scale:
// SM: 4px
// MD: 8px
// LG: 12px (base)
// XL: 16px
// Full: 9999px
```

## ✅ Bước 6: Validation

### 6.1. So sánh với Screenshot
- Mở screenshot từ Stitch
- So sánh màu sắc, font size với tokens đã extract
- Verify spacing, border radius

### 6.2. So sánh với Brand Guideline
- Đọc Brand Guideline hiện tại
- So sánh từng token
- Tạo diff report

### 6.3. So sánh với Frontend Code
- Đọc tokens trong `frontend/[app]/src/design-system/tokens/`
- So sánh với tokens từ Stitch
- Identify differences

## 📊 Output Format

### Design Tokens JSON
```json
{
  "colors": {
    "primary": {
      "DEFAULT": "#00bdb6",
      "dark": "#008C89",
      "light": "#B2EAE9",
      "lightest": "#E6F8F7"
    },
    "semantic": {
      "success": "#28A745",
      "error": "#DC3545"
    },
    "neutral": {
      "900": "#1A1A1A",
      "700": "#4A4A4A",
      "400": "#9B9B9B",
      "100": "#F5F5F5"
    }
  },
  "typography": {
    "fontFamily": {
      "heading": "'Be Vietnam Pro', sans-serif",
      "body": "'Be Vietnam Pro', sans-serif"
    },
    "fontSize": {
      "h1": "32px",
      "h2": "24px",
      "bodyRegular": "16px"
    },
    "lineHeight": {
      "h1": "40px",
      "h2": "32px",
      "bodyRegular": "24px"
    }
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px",
    "lg": "24px"
  },
  "borderRadius": {
    "lg": "12px"
  }
}
```

## 🚨 Common Issues & Solutions

### Issue 1: Không parse được HTML
**Solution**: 
- Kiểm tra URL download có hợp lệ
- Thử tải bằng cách khác (curl, wget)
- Dùng screenshot để extract colors manually

### Issue 2: Colors không khớp
**Solution**:
- So sánh với screenshot
- Verify với `designTheme.customColor`
- Check CSS variables trong HTML

### Issue 3: Typography không khớp
**Solution**:
- Verify font từ `designTheme.font`
- Check computed styles trong browser DevTools
- So sánh với screenshot

### Issue 4: Spacing không khớp
**Solution**:
- Measure trong screenshot
- Check base unit (4px vs 8px)
- Verify với design system standards

## 📚 References

- [Stitch MCP API Documentation](https://github.com/google-labs-code/stitch-skills)
- [Design Tokens Format](https://tr.designtokens.org/format/)
- [CSS Color Extraction](https://developer.mozilla.org/en-US/docs/Web/CSS/color)
