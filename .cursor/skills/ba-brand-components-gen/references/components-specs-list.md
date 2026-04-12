# Component Specifications List & Template

Tài liệu này định nghĩa **Format Bắt Buộc** và **Danh Sách 35 Components** cần phải sinh ra (append) vào file Brand Design Guideline.

## 1. Mẫu Bảng Bắt Buộc Định Nghĩa Component
**⚠️ LƯU Ý**: Thể hiện TẤT CẢ các thành phần của Component dưới dạng BẢNG, KHÔNG DÙNG VĂN BẢN THƯỜNG. Đây là định dạng chuẩn cho Handoff.

Ví dụ Output Template cho 1 Component:
```markdown
## [Component Name]

| Property | Value | Notes |
|----------|-------|-------|
| **Variants** | Primary, Secondary, Tertiary | [Mô tả từng variant - màu nền, viền] |
| **Sizes** | Small (32px), Medium (40px), Large (48px) | [Mô tả Padding] |
| **States** | Default, Hover, Active, Focus, Disabled | [Mô tả Hover color, opacity] |
| **Usage** | Dùng cho hành động chính, CTA | [Lưu ý không lạm dụng] |
| **Do's** | Nên XYZ | [Guidelines] |
| **Don'ts** | Không Nên XYZ | [Anti-patterns] |
```

## 2. Danh sách 35 Components (Phân loại theo Platform)

Để đảm bảo Guideline tối ưu cho từng nền tảng, các component dưới đây đã được gắn Tag: `[All]`, `[Web-Admin]`, `[Web-Public]`, `[Mobile-App]`.
Agent **chỉ sinh những components có Tag khớp với Target Platform** (hoặc tag `[All]`). Các nền tảng khác nhau sẽ có spec khác nhau (vd: Mobile App cần Touch Target to hơn).

### Nhóm 1: Core Elements & Typography (Items 1-9)
*Tập trung vào các thành phần cơ bản.*
1. **Buttons**: `[All]` (Lưu ý: Mobile App nhấn mạnh Touch Target 48px).
2. **Links**: `[All]`.
3. **Typography Styles**: `[All]`.
4. **Checkbox**: `[All]`.
5. **Radio**: `[All]`.
6. **Switch/Toggle**: `[All]`.
7. **Badges/Tags/Status Pills**: `[All]`.
8. **Avatar**: `[All]`.
9. **Empty State**: `[All]`.

### Nhóm 2: Form Controls & Inputs (Items 10-18)
10. **Text Input**: `[All]`.
11. **Textarea**: `[All]`.
12. **Select**: `[Web-Admin]`, `[Web-Public]`. (Mobile thường dùng Bottom Sheet/Picker thay vì Select Dropdown).
13. **Date Picker**: `[All]` (Lưu ý UI Mobile khác Web).
14. **Time Picker**: `[All]`.
15. **Search Box**: `[All]`.
16. **Form Layout**: `[All]`.
17. **File Upload**: `[Web-Admin]`, `[Web-Public]` (Mobile thường dùng Native Image Picker).
18. **Stepper/Progress Indicator**: `[All]`.

### Nhóm 3: Navigation & Layout (Items 19-27)
19. **Navbar/Header**: `[Web-Admin]`, `[Web-Public]`.
20. **Bottom Navigation**: `[Mobile-App]`.
21. **Sidebar (Admin)**: `[Web-Admin]`.
22. **Tabs**: `[All]`.
23. **Breadcrumb**: `[Web-Admin]`, `[Web-Public]`.
24. **Pagination**: `[Web-Admin]`, `[Web-Public]` (Mobile thường dùng Infinite Scroll).
25. **Dropdown Menu**: `[Web-Admin]`, `[Web-Public]` (Mobile dùng Bottom Sheet).
26. **Cards**: `[All]`.
27. **Drawer/Side Panel**: `[Web-Admin]`, `[Mobile-App]` (Làm Hamburger menu).
28. **Modal/Dialog**: `[All]`.

### Nhóm 4: Feedback, Data & Advanced UI (Items 29-35)
29. **Table/Data Grid**: `[Web-Admin]` (Mobile thường dùng List View, không dùng Table).
30. **Tooltip**: `[Web-Admin]`, `[Web-Public]` (Mobile ít dùng Tooltip do không có trạng thái Hover).
31. **Popover**: `[Web-Admin]`.
32. **Toast/Notification**: `[All]`.
33. **Alert Banners**: `[All]`.
34. **Loading State**: `[All]`.
35. **Charts**: `[Web-Admin]`.
36. **Permission/Role UI Notes**: `[Web-Admin]`.

Bạn phải duyệt nốt danh sách này, gom nhóm để sinh khoảng 10 items mỗi chặng (để an toàn Output).

1. **Buttons**: Primary, Secondary, Tertiary, Destructive, Icon button, Button group.
2. **Links**: Default, Hover, Active, Visited states.
3. **Typography Styles**: H1-H6, Body, Caption (Chỉ rõ usage & line-height).
4. **Text Input**: Default, Focus, Error, Disabled states, Label, placeholder.
5. **Textarea**: Same as Text Input + resize behavior.
6. **Select**: Single select, Multi-select, With search.
7. **Checkbox**: Default, Checked, Indeterminate, Disabled.
8. **Radio**: Default, Selected, Disabled.
9. **Switch/Toggle**: On, Off, Disabled.
10. **Date Picker**: Calendar view.
11. **Time Picker**: 12h/24h format.
12. **Search Box**: With icon, Clear button, Suggestion drop.
13. **Form Layout**: Field grouping, Error states.
14. **Cards**: Default, Elevated, Interactive, Admin/Blog Card.
15. **Table/Data Grid**: Sort, Filter, Pagination, Row selection.
16. **Pagination**: Page numbers, Previous/Next.
17. **Tabs**: Default, Pills, Vertical tabs.
18. **Breadcrumb**: Separator, Link states.
19. **Navbar/Header**: Logo, Navigation, User menu, Mobile.
20. **Sidebar (Admin)**: Active state, Collapsed/Expanded.
21. **Dropdown Menu**: Items, Divider, Disabled.
22. **Modal/Dialog**: Sizes, Header/Body/Footer, Backdrop.
23. **Drawer/Side Panel**: Left/Right placement.
24. **Tooltip**: Placement (Top, Bottom, Left, Right).
25. **Popover**: Placement, Arrow, Header/Body.
26. **Toast/Notification**: Success, Warning, Error, Info, Auto-dismiss.
27. **Alert Banners**: Variants, Action buttons.
28. **Badges/Tags/Status Pills**: Sizes, Removable.
29. **Stepper/Progress Indicator**: Linear progress, Circular.
30. **File Upload**: Drag & drop, Progress, Error states.
31. **Avatar**: Sizes (24px, 32px, 48px), Image, Initials.
32. **Empty State**: Icon/Illustration, Title, Action.
33. **Loading State**: Skeleton, Spinner.
34. **Charts**: Color palette cho biểu đồ.
35. **Permission/Role UI Notes (Admin)**: Role badges, Locked states.

## 3. Coverage Checklist Bắt Buộc Ở Cuối
Khi hoàn thành toàn bộ 35 Components, **PHẢI GÂN VÀO CHÍNH FILE LÀM VIỆC ĐÓ BẢNG CƠ BẢN SAU**:

```markdown
## ✅ Coverage Checklist
- [x] Đã hoàn thiện toàn bộ Typography & Colors.
- [x] Đã hoàn thiện Component Specs (35 items).
- [x] Token JSON đã được append chuẩn xác.
```
