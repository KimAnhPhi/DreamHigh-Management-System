---
name: ba-html-to-react-ds-code-gen
description: "Chuyển HTML prototype thành React/TypeScript + Tailwind cho web app, tuân thủ Design Tokens & Design System. Trigger: user paste HTML + yêu cầu convert sang React / gen page web / refactor HTML → component / Tailwind."
version: 1.2.0
author: M2MBA
last_updated: 2026-03-22
---

## MODE (tự detect, user có thể override)

| | Mode A – BOOTSTRAP | Mode B – INCREMENTAL |
|---|---|---|
| **Khi nào** | Repo chưa có project React | Repo đã có project React |
| **Output** | Scaffold + tokens + DS + pages | Chỉ file page mới + component con + mock |
| **KHÔNG** | — | Scaffold lại project; tự đổi deps |

> Không đọc được repo → **hỏi user** trước khi tiếp tục.
> Override: `mode=bootstrap` hoặc `mode=incremental`.

---

## SETUP (hỏi 1 lần, gộp 1 message)

### Khi Mode A (chưa có project)
Hỏi gộp:
1. Tên project
2. Build tool: Vite *(mặc định)* hay Next.js?
3. Standalone hay Monorepo? *(mặc định: Standalone)*

**Scaffold chuẩn (Mode A):**
```
[project]/
├── src/
│   ├── design-system/
│   │   ├── tokens/          # colors, typography, spacing, radius, shadow + index.ts
│   │   ├── components/
│   │   │   ├── ui/          # Button, Input, Card, Badge, Table, Modal, Tabs...
│   │   │   └── layout/      # AppLayout, PageHeader, Sidebar, Section...
│   │   └── utils/           # cn.ts
│   ├── pages/
│   └── mock/
├── tailwind.config.ts
├── package.json
└── tsconfig.json
```

**Deps mặc định** — cài qua package manager:
`react`, `react-dom`, `typescript`, `tailwindcss`, `postcss`, `autoprefixer`, `vite`, `@vitejs/plugin-react`, `clsx`, `tailwind-merge`, `lucide-react`, `react-router-dom`

---

## PIPELINE (bắt buộc, theo thứ tự)

### B1 – Trích Design Tokens từ HTML
HTML là nguồn sự thật duy nhất. Trích: màu (primary/secondary/neutral/semantic), typography, spacing base, radius, shadow. Sinh `tailwind.config.ts` extend từ tokens. Không tự bịa giá trị.

### B2 – Phân tích HTML (đọc TOÀN BỘ DOM, không bỏ sót)
Liệt kê các tầng layout trước khi gen code:
```
[1] Top bar / Announcement (nếu có)
[2] Header / Navbar
[3] Breadcrumb / Page title bar (nếu có)
[4] Content chính
    ├─ Sidebar (nếu có)
    └─ Main: Section A / B / C...
[5] Sticky bar / FAB (nếu có)
[6] Footer
```
Ghi nhận mỗi tầng: nội dung, layout (flex/grid/gap/columns), style, typography, trạng thái (active/hover/disabled), icon, tương tác, responsive breakpoint.

**Dễ bỏ sót — kiểm tra kỹ:** divider, badge/dot, tooltip, helper text, caption, empty state, loading/skeleton, sticky header, hamburger menu mobile.

### B3 – Map HTML → React Components + DS

| HTML pattern | React component |
|---|---|
| `header` / top nav | `AppLayout > Header` hoặc `Navbar` |
| `aside` / sidebar | `Sidebar` |
| `main` / content | `Content` / `Section` |
| `footer` | `Footer` |
| `button` / `.btn` | `Button` DS |
| `input` / `textarea` | `Input` DS |
| `select` | `Select` DS |
| `table` | `Table` DS |
| card pattern (div + shadow/border) | `Card` DS |
| badge / pill / tag | `Badge` / `Tag` DS |
| status indicator | `StatusBadge` |
| modal / dialog | `Modal` DS |
| tabs / segment | `Tabs` DS |

Không sinh HTML thuần nếu DS đã có component phù hợp. Block lặp lại → DS component riêng. Page ≤ 200 LOC.

### B4 – Style → Tailwind + Tokens
```tsx
// ❌  className="bg-[#00bdb6] mt-[13px] text-[13px]"
// ✅  className="bg-primary-500 mt-3 text-sm"
```

| Token | Tailwind |
|---|---|
| `colors.primary.*` | `bg-primary-*` / `text-primary-*` / `border-primary-*` |
| `colors.neutral.*` | `bg-neutral-*` / `text-neutral-*` |
| `colors.semantic.*` | `bg-success-*` / `bg-warning-*` / `bg-error-*` |
| `spacing.*` | `p-*` / `m-*` / `gap-*` |
| `radius.*` | `rounded-sm/md/lg/full` |
| `shadow.*` | `shadow-sm/md/lg` |
| `typography.size.*` | `text-xs/sm/base/lg/xl` |
| `typography.weight.*` | `font-normal/medium/semibold/bold` |

Status → dùng `StatusBadge` thay vì hardcode màu.

### B5 – Gen Code

**Page template:**
```tsx
// pages/[Name]Page.tsx
import { AppLayout, PageHeader, Section } from '@/design-system/components/layout';
import { Button, Card } from '@/design-system/components/ui';
import { mockItems } from '@/mock/[feature]';

const [Name]Page: React.FC = () => (
  <AppLayout>
    <PageHeader title="..." />
    <Section>{/* content */}</Section>
  </AppLayout>
);
export default [Name]Page;
```

**Mock data — extract y chang từ HTML, không placeholder:**
```ts
// mock/[feature].ts
export const mockItems: Item[] = [
  { id: '1', title: 'Tên thật từ HTML', price: 1200000, status: 'published' },
  // TẤT CẢ items trong HTML, không rút gọn
];
```

**Routing hint:**
- Vite + react-router-dom: `<Route path="/[feature]" element={<[Name]Page />} />`
- Next.js: `app/[feature]/page.tsx`

### B6 – Checklist trước khi output
- [ ] Liệt kê đủ các tầng layout trước khi gen
- [ ] Không bỏ sót: divider, badge, tooltip, caption, empty/loading state, hamburger
- [ ] Không hardcode hex / arbitrary pixel (`text-[x]`, `mt-[x]`)
- [ ] Không div thừa không có semantic/style
- [ ] 100% TypeScript, không `any`, props interface đầy đủ
- [ ] Dùng DS component thay HTML thuần khi có thể
- [ ] `index.ts` barrel export trong `tokens/` và `components/`
- [ ] Mock data từ HTML gốc, không placeholder
- [ ] Responsive OK: kiểm tra `sm:` / `md:` / `lg:` breakpoint

---

## QUY TẮC CỨNG

| Rule | |
|---|---|
| HTML First | HTML là nguồn sự thật duy nhất cho tokens. Token DS có sẵn → dùng nếu khớp HTML. Chưa có → trích từ HTML. |
| No hardcode | Không hex, không arbitrary Tailwind value ngoài token scale |
| Type Safety | Không `any`. Props interface cho mọi component. |
| Separation | UI ở pages/components; logic/API/state → hooks/store |
| Incremental output | HTML lớn → gen Base Components trước, Page sau |

---

