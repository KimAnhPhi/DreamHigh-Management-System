---
name: ba-html-to-react-native-ds-code-gen
description: >
  Chuyển HTML prototype thành React Native/TypeScript (Expo) tuân thủ Design Tokens & Mobile Design System.
  Trigger: user paste HTML + yêu cầu "convert sang React Native / gen màn mobile / chuyển web → mobile / Expo / RN component".
version: 1.3.2
author: M2MBA
last_updated: 2026-03-22
---

## MODE (tự detect, user có thể override)

| | Mode A – BOOTSTRAP | Mode B – INCREMENTAL |
|---|---|---|
| **Khi nào** | Repo chưa có app Expo/RN | Repo đã có app Expo/RN |
| **Output** | Scaffold + tokens + DS + screens | Chỉ file screen mới + component con + mock |
| **KHÔNG** | — | Scaffold lại project; tự đổi SDK/deps |

> Không đọc được repo → **hỏi user** trước khi tiếp tục.
> Override: user ghi `mode=bootstrap` hoặc `mode=incremental`.

---

## SETUP (hỏi trước khi gen — chỉ hỏi 1 lần, gộp trong 1 message)

**Bắt buộc với MỌI mode:** Expo SDK version? *(đọc `package.json` nếu có; không đọc được → hỏi user; không tự đoán)*

### Khi Mode A (chưa có app)
Hỏi thêm:
1. Tên project
2. Navigation: Expo Router hay React Navigation? *(mặc định: Expo Router)*
3. Standalone hay Monorepo? *(mặc định: Standalone)*

**Scaffold chuẩn (Mode A):**
```
[project]/
├── app/(_layout.tsx, (tabs)/)   # Expo Router
├── design-system/tokens/        # colors, typography, spacing, radius, shadow + index.ts
├── design-system/components/    # + index.ts
├── screens/
├── mock/
├── assets/
├── app.json / package.json / tsconfig.json
```

**Deps mặc định** — cài bằng `npx expo install` (KHÔNG tự pin version):
`expo`, `expo-router` hoặc `@react-navigation/native + bottom-tabs`, `react-native-safe-area-context`, `@expo/vector-icons`, `expo-font`, `react-native-reanimated`

Nếu cần web: `npx expo install react-dom react-native-web`
Nếu React Navigation: thêm `react-native-gesture-handler`, `react-native-screens`

---

## PIPELINE (bắt buộc, theo thứ tự)

### B1 – Trích Design Tokens từ HTML
HTML là nguồn sự thật duy nhất. Trích từ HTML: màu, typography, spacing base, radius, shadow. Không tự bịa giá trị.

### B2 – Phân tích HTML (đọc TOÀN BỘ DOM, không bỏ sót)
Liệt kê các tầng layout trước khi gen code:
```
[1] StatusBar / Safe Area top
[2] Header
[3] Sub-header / Tabs / Segment (nếu có)
[4] Content (ScrollView/FlatList/Form)
[5] FAB (nếu có)
[6] Bottom sheet (nếu có)
[7] Bottom nav
[8] Safe Area bottom
```
Ghi nhận mỗi tầng: nội dung, layout, style, typography, trạng thái (active/disabled), icon, tương tác.

**Dễ bỏ sót — kiểm tra kỹ:** divider, badge/dot, caption, safe area, empty state, loading/skeleton, sticky header.

### B3 – Map HTML → RN + DS

| HTML | RN |
|---|---|
| `div/section/main` | `View` |
| `p/span/h1-h6` | `Text` |
| `button` / clickable div | `Pressable` |
| `img` | `Image` / `ImageBackground` |
| scroll | `ScrollView` / `FlatList` |
| root | `SafeAreaView` |

Icon: map sang `@expo/vector-icons`. Không đoán icon name — nếu không chắc, dùng family có icon đó (Google → `FontAwesome name="google"`).

Tách component: screen ≤ 200 LOC; block lặp → DS component riêng.

### B4 – Style → StyleSheet + Tokens
```tsx
// ❌  style={{ marginTop: 13, color: '#00bdb6' }}
// ✅  style={{ marginTop: spacing[3], color: colors.primary[500] }}
```
Token map: color → `colors.*` | spacing/padding/gap → `spacing.*` | radius → `radius.*` | font → `typography.*` | shadow → `shadows.*`/`elevation`

### B5 – Gen Code

**Screen template:**
```tsx
// screens/[Name]Screen.tsx
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '@/design-system/tokens';
import { ComponentA } from '@/design-system/components';

const [Name]Screen: React.FC = () => (
  <SafeAreaView style={{ flex: 1, backgroundColor: colors.neutral[50] }}>
    <ScrollView>{/* ... */}</ScrollView>
  </SafeAreaView>
);
export default [Name]Screen;
```

**Màn có input — bắt buộc:**
```tsx
<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
  <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
```

**Mock data — extract y chang từ HTML, không placeholder:**
```ts
// mock/[feature].ts
export const mockItems: Item[] = [
  { id: '1', name: 'Tên thật từ HTML', amount: 85000, status: 'completed' },
  // TẤT CẢ items trong HTML, không rút gọn
];
```

**Navigation hint:**
- Expo Router: `app/(tabs)/[feature].tsx` → `export default [Name]Screen`
- React Navigation: gợi ý stack/tab name

### B6 – Checklist trước khi output
- [ ] Liệt kê đủ 8 tầng layout trước khi gen
- [ ] Không bỏ sót: divider, badge, caption, safe area, empty/loading state
- [ ] Touch target ≥ 44×44pt
- [ ] Text ≥ 12pt caption, ≥ 14pt body
- [ ] Layout OK trên 375px (iOS SE) và 360dp (Android nhỏ)
- [ ] Không hardcode hex/pixel
- [ ] 100% TypeScript, không `any`
- [ ] `index.ts` barrel export trong `tokens/` và `components/`
- [ ] Mock data từ HTML gốc, không placeholder

---

## QUY TẮC CỨNG

| Rule | |
|---|---|
| HTML First | HTML là nguồn sự thật duy nhất cho tokens. Token có sẵn trong DS → dùng nếu khớp HTML, không override tùy tiện. Chưa có → trích từ HTML. |
| No hardcode | Không inline hex, pixel ngoài tokens |
| Type Safety | Không `any`. Props interface cho mọi component. |
| Separation | UI ở screen/component; logic/API/state → hooks/store |
| Native patterns | `FlatList` cho list dài; `Pressable` cho tap; `Platform.OS` khi cần |
| Expo install | Luôn dùng `npx expo install`, không tự pin version. Sau đổi SDK: `npx expo install --fix` |

---

