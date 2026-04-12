## Brand Guideline Reference

### Colors
- Primary: `#CC9933` | Secondary: `#888880`
- Background: `#FAFAF7` | Surface: `#F2EFE8`
- Header bg: `#1A1A18` | Sidebar bg: `#FAFAF7` | Footer bg: `#1A1A18`
- Success: `#50B478` | Warning: `#CC9933` | Error: `#D24646`

### Typography
- Font: Jost, Cormorant Garamond | Weights: 300, 400, 500
- H1: 2rem/300 | H2: 1.5rem/500 | Body: 1rem/400
- Nav active: 0.72rem/300 `#CC9933` | Nav default: 0.72rem/300 `rgba(255,255,255,0.5)`

### Spacing
- Base unit: 8px
- Header height: 64px | Footer height: 64px | Nav item height: 48px
- Sidebar expanded: 240px | Sidebar collapsed: 64px | Content padding: 48px

## App Shell Structure

### Overall
- Layout: Top nav + content
- Max width: 1280px centered
- Breakpoints (Web): Mobile <768px | Tablet 768–1024px | Desktop >1024px

### Header (64px, bg `#1A1A18`, fixed: yes)
- Left: Logo 120x32px
- Center: Navigation Menu
- Right: User avatar, notification bell
- Border-bottom / Shadow: none

### Content Area
- Padding: 48px 48px 48px 48px | bg: `#FAFAF7`

### Footer (64px, bg `#1A1A18`, position: static)
- Content: Copyright, "Dream Big. Fly High."

## Navigation Structure

### Menu Hierarchy
- [icon] Dashboard → /
- [icon] Quản lý Khóa học → /courses
- [icon] Quản lý Học viên → /students
- [icon] Quản lý Danh mục → /categories
- [icon] Cài đặt → /settings

### States
- Active: text `#CC9933`
- Hover: text `#FFFFFF`
- Default: bg transparent, text `rgba(255,255,255,0.5)`

### Breadcrumb
- Position: top of content | Separator: >

## AI Tool Prompt — v0.dev

### Full App Shell
"Design the app shell for Phần mềm Quản lý Đào tạo Trung tâm Tiếng Anh Web app.
Layout: Top nav + content.
Header: 64px, bg #1A1A18. Left: logo 120x32px. Center: Navigation Menu. Right: User avatar, notification bell.
Navigation items: Dashboard, Quản lý Khóa học, Quản lý Học viên, Quản lý Danh mục (active), Cài đặt.
Active nav: text #CC9933.
Hover nav: text #FFFFFF. Default nav: text rgba(255,255,255,0.5).
Content area: padding 48px, bg #FAFAF7. Max width: 1280px centered.
Font: Jost. Primary color: #CC9933. Spacing unit: 8px.
All interactive elements must have hover and active states."
