# BA Stitch Design Sync Skill

Skill tự động trích xuất và đồng bộ Design Tokens từ Stitch Design với Brand Guideline và Frontend Code.

## 🎯 Mục đích

Đảm bảo Frontend code **100% khớp** với Stitch Design về:
- ✅ Màu sắc (Colors)
- ✅ Typography (Font, Size, Line Height, Weight)
- ✅ Spacing (Padding, Margin, Gap)
- ✅ Border Radius
- ✅ Shadows
- ✅ Component Styles

## 🚀 Cách sử dụng

### Kích hoạt Skill

```
Sync design tokens từ Stitch project [PROJECT_ID]
```

hoặc

```
Lấy màu sắc, font từ Stitch design [PROJECT_ID] và update Brand Guideline
```

### Quy trình tự động

1. **Extract**: Lấy tokens từ Stitch HTML/CSS
2. **Compare**: So sánh với Brand Guideline và Frontend Code
3. **Update**: Tự động cập nhật tokens
4. **Validate**: Tạo report validation

## 📋 Output Files

1. **Updated Design Tokens**:
   - `frontend/[app]/src/design-system/tokens/colors.ts`
   - `frontend/[app]/src/design-system/tokens/typography.ts`
   - `frontend/[app]/src/design-system/tokens/spacing.ts`

2. **Updated Brand Guideline**:
   - `Prototype/Brand Guideline/[app]-guideline_[YYYYMMDD].md`

3. **Validation Report**:
   - `frontend/[app]/STITCH_SYNC_REPORT.md`

## 🔧 Scripts

### Extract Tokens
```bash
node .agent/skills/ba-stitch-design-sync/scripts/extract-tokens.js <html-file>
```

### Validate Tokens
```bash
node .agent/skills/ba-stitch-design-sync/scripts/validate-tokens.js <stitch-tokens.json> <frontend-tokens-dir>
```

## 📝 Best Practices

1. **Stitch First**: Tokens từ Stitch là source of truth
2. **No Hardcode**: Tất cả values phải từ tokens
3. **100% Match**: Đảm bảo khớp 100% với Stitch
4. **Documentation**: Ghi chú rõ source của mỗi token

## 🐛 Troubleshooting

- Nếu không parse được HTML: Kiểm tra URL, thử cách khác
- Nếu tokens không khớp: So sánh với screenshot, verify lại
- Nếu update bị lỗi: Test từng component, check imports
