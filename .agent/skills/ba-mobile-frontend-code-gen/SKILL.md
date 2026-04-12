---
name: ba-mobile-frontend-code-gen
description: "Skill hỗ trợ Business Analyst/Developer tạo code Frontend cho ứng dụng mobile dựa trên Brand Guideline và System Design"
---

# HƯỚNG DẪN SKILL: BA MOBILE FRONTEND CODE GEN

**Version:** 1.0.1
**Author:** M2MBA
**Last Updated:** 2026-03-17
**Description:** Skill tự động hóa quá trình sinh code Frontend cho ứng dụng mobile từ yêu cầu của user, tuân thủ chặt chẽ Brand Guideline và nguyên tắc Mobile Design System.

## NGỮ CẢNH VÀ MỤC TIÊU (CONTEXT & OBJECTIVE)

Trong các dự án **mobile app**, việc đảm bảo UI/UX nhất quán với Brand Guideline, đồng thời tuân theo các nguyên tắc platform (Material Design, iOS HIG) là cực kỳ quan trọng.  
Skill này giúp Agent tự động tạo ra một bộ code Frontend mobile chuẩn mực với kiến trúc Design System rõ ràng, **có thể áp dụng cho nhiều tech stack mobile khác nhau** (React Native, Flutter, Native...), bao gồm:
- Design Tokens (Colors, Typography, Spacing, Radius, Elevation)
- Base UI Components (Button, Text, Input, Card, ListItem, Badge/Status…)
- Layout & Navigation (Stack, Tabs, Drawer, Safe Area)
- Utilities & Hooks (format, responsive size, device info…)  

Mục tiêu: tăng khả năng tái sử dụng (reusability), đảm bảo tính nhất quán (consistency) và dễ bảo trì (maintainability) cho toàn bộ mobile app.

## HƯỚNG DẪN KÍCH HOẠT (TRIGGER)

Skill được kích hoạt khi User yêu cầu liên quan đến **mobile app**, ví dụ:
- "Gen code mobile app cho màn hình..."
- "Tạo giao diện mobile theo Brand Guideline..."
- "Code frontend mobile cho MH Design này..."
- "Từ design này, gen mobile screen + components theo design system..."

> Lưu ý: Nếu user chỉ nói chung chung "gen code FE" nhưng context là **mobile**, Agent nên ưu tiên skill này thay vì `ba-frontend-code-gen` (dành cho web).

## ĐIỀU KIỆN TIÊN QUYẾT (PREREQUISITES)

1. Có Brand Guideline chuẩn tại `docs-BA/Prototype/Brand Guideline/brand-guideline_[YYYYMMDD].md`.  
2. Có yêu cầu thiết kế màn hình (MH Design) từ User:  
   - Figma/Stitch/Design link, hoặc  
   - Mô tả wireframe/flow, hoặc  
   - Screenshot màn hình.  
3. Đã thống nhất **tech stack mobile** với User cho **dự án hiện tại**, ví dụ:
   - React Native + TypeScript (khuyến nghị nếu team đang dùng React/TypeScript cho web).
   - Flutter (Dart) nếu hệ sinh thái mobile độc lập.
   - Native iOS/Android nếu có yêu cầu đặc thù.
4. Agent **bắt buộc hỏi rõ tech stack** nếu User chưa nói; không được tự suy diễn.

## LỰA CHỌN TECH STACK MOBILE (GENERIC)

Trước khi thực thi các bước chi tiết, Agent cần:
- Hỏi User: "**App mobile này dùng tech stack gì? (React Native / Flutter / Native iOS / Native Android / Khác)**".
- Lưu lại lựa chọn tech stack này như một biến context (ví dụ: `MOBILE_STACK`).
- Áp dụng:
  - Các bước về **Brand Guideline, Tokens, Constants, Status/Categories** → dùng chung cho mọi stack.
  - Các bước chi tiết về **thư mục, component, navigation, code example** → điều chỉnh theo `MOBILE_STACK`:
    - Nếu `MOBILE_STACK = React Native` → dùng cấu trúc và ví dụ React Native + TypeScript.
    - Nếu `MOBILE_STACK = Flutter` → map sang Widget, `ThemeData`, `TextStyle`, `Color`, `EdgeInsets`, `Navigator`, v.v.
    - Nếu stack khác → bám nguyên tắc Design System, nhưng mô tả ở mức khái niệm hoặc pseudo-code.

### Dev/Test Playground (React Native + Expo)

- Khi `MOBILE_STACK = React Native` và mục tiêu là **xem nhanh UI trên thiết bị thật**, Agent nên ưu tiên sử dụng **một Expo app cố định trong repo** làm playground, thay vì:
  - Tạo thêm nhiều project RN khác nhau.
  - Sinh code ra thư mục tạm (`mobile-app`) rồi copy tay sang project Expo.
- Quy ước:
  - Trong mỗi repo, có tối đa **1 app Expo chính để preview** (ví dụ: `mobile-preview/` hoặc `<brand>-mobile/`).
  - Nếu thư mục này **chưa tồn tại**, Agent:
    - Gợi ý User tạo bằng lệnh (ví dụ): `npx create-expo-app mobile-preview`.
    - Sau khi tạo xong, mọi lần gen sau **luôn ghi trực tiếp** vào đây, không tạo project mới.
  - Nếu thư mục Expo app đã tồn tại:
    - **Không** tạo thêm project khác.
    - Ghi thẳng:
      - `design-system/tokens/*`
      - `design-system/components/ui/*`, `design-system/components/layout/*`
      - `screens/*`
      - `app/(tabs)/*` (nếu dùng Expo Router).
- Khi gen code cho RN + Expo:
  - Sử dụng alias TypeScript dạng `@/design-system/...`, `@/screens/...` theo `tsconfig` Expo mặc định (`"paths": { "@/*": ["./*"] }`).
  - Hướng dẫn User test:
    - `cd <expo-app-folder>`
    - `npm start`
    - Mở app trên **Expo Go** (scan QR hoặc nhập URL) để xem UI.

## QUY TRÌNH THỰC THI (EXECUTION STEPS)

Agent **BẮT BUỘC** thực hiện tuần tự các bước sau (Không bỏ qua bước nào):

### Bước 1: Thu thập thông tin & Đọc Brand Guideline

- Nếu có Stitch Design: Gọi skill `ba-stitch-design-sync` trước để extract và sync tokens từ Stitch (colors, typography, spacing, radius, shadows…).  
- Đọc file Brand Guideline mới nhất:  
  - `docs-BA/Prototype/Brand Guideline/brand-guideline_[YYYYMMDD].md`  
- Trích xuất tối thiểu:
  - **Color System**: Primary, Secondary, Neutral, Semantic (Success, Warning, Error, Info…) kèm mã màu (hex).
  - **Typography**: Font family, size, weight, line height, đặc biệt các `Heading`, `Body`, `Caption`, `Button`.
  - **Spacing & Radius System**: Khoảng cách, bo góc (radius), elevation/shadow nếu có.
  - **Component Specifications**: Button, AppBar, Card, ListItem, Chip/Tag, Badge/Status… (nếu guideline có).
- Nếu Brand Guideline khác với Stitch Design → Ưu tiên tokens từ Stitch (vì sát thiết kế thực tế hơn) và **ghi chú sự khác biệt** (phục vụ update Brand Guideline sau).
- **Tuyệt đối không tự suy diễn** màu, typography, spacing khi đã có guideline. Chỉ được nội suy những giá trị rõ ràng từ hệ thống (ví dụ spacing x2/x0.5).

### Bước 2: Khởi tạo Mobile Design System Architecture & Tokens

- Tạo cấu trúc thư mục chuẩn trong repo mobile (không gắn với dự án cụ thể), ví dụ:
  - `design-system/tokens/`
  - `design-system/components/ui/`
  - `design-system/components/layout/`
  - `design-system/navigation/`
  - `design-system/hooks/`
  - `design-system/utils/`
  - `screens/`
  - `types/`
- Tạo các file tokens dưới dạng **constants** phù hợp với tech stack đã chọn:
  - Nếu React Native:
    - `design-system/tokens/colors.ts`
    - `design-system/tokens/typography.ts`
    - `design-system/tokens/spacing.ts`
    - `design-system/tokens/radius.ts`
    - `design-system/tokens/elevation.ts` (nếu Brand có định nghĩa shadow/elevation)
    - `design-system/tokens/index.ts` (re-export tất cả tokens)
  - Nếu Flutter:
    - Có thể gom trong `lib/design_system/tokens/` với các file Dart tương ứng (colors.dart, typography.dart, spacing.dart, radius.dart, elevation.dart…).
  - Nếu Native khác: Agent mô tả cách tổ chức tương tự (module tokens riêng) thay vì code chi tiết.
- Mapping tokens sang platform:
  - Dùng giá trị hex cho colors (hoặc `Color(0xFF...)` với Flutter).
  - Font size/line height dùng số (dp/sp) phù hợp thiết bị.
  - Spacing/radius/elevation là number (dp).
- **Không dùng Tailwind class, không tạo `cn.ts`** (đây là skill mobile, tách biệt với web).  
  Thay vào đó, dùng style object/StyleSheet, theme object hoặc cơ chế styling native của tech stack tương ứng.

### Bước 3: Tạo Centralized Management (Utilities, Constants & Hooks)

- Tạo các file tiện ích và hằng số dùng chung tại `design-system/utils/` và `design-system/constants/`:
  - `design-system/constants/status.ts` hoặc `design-system/constants/constants.ts`:
    - Quản lý **trạng thái tập trung** (Enums + Mapping Config).
    - Khai báo cố định cấu hình cho các trạng thái app (ví dụ: trạng thái đơn hàng, ticket, hoạt động, booking…) → mỗi trạng thái map tới:
      - label hiển thị;
      - màu nền/màu chữ (dùng tokens colors);
      - icon (tên icon hoặc component RN icon tương ứng);
      - priority (nếu cần).
  - `design-system/constants/categories.ts`:
    - Quản lý **danh mục dùng chung** (ví dụ: giới tính/gender, loại user, phân loại khóa học, loại thông báo…).
    - Tất cả dữ liệu fix cứng hiển thị nhiều nơi phải được định nghĩa tại đây, **không hardcode lại ở từng screen**.
  - `design-system/utils/format.ts`:
    - Utility định dạng (tiền tệ, ngày tháng, giờ, số lượng).
    - Sử dụng chuẩn quốc tế/locale (ví dụ: `Intl`, `date-fns`, `dayjs`… nếu có).
- Tạo các hooks dùng chung tại `design-system/hooks/`, ví dụ:
  - `useResponsiveSize` hoặc `useScale` (scale UI theo kích thước màn hình/dpi).
  - `useSafeAreaInsets` (nếu wrap lại từ `react-native-safe-area-context`).
  - `useDebounce` (cho search/filter).
  - `useTheme` (nếu có theming light/dark).
- Mục tiêu: **mọi logic xử lý chung cho UI/UX mobile phải được gom về Design System**, không để rải rác ở từng screen.

### Bước 4: Tạo Base UI Components (Reusable, Mobile-First)

- Xây dựng Base Components reusable tại `design-system/components/ui/`, tối thiểu nên có:
  - `Button` (primary/secondary/ghost, full width/inline, loading state).
  - `Text` (Heading, Body, Caption, Button text), đọc typography từ tokens.
  - `Input` / `TextField` (label, error, helperText, prefix/suffix icon).
  - `Card` (container với elevation/radius chuẩn).
  - `ListItem` (avatar/icon + title + subtitle + rightAction/rightLabel).
  - `Badge` / `StatusTag` (sử dụng config từ `constants/status.ts`).
  - `Chip` / `Tag` (filter/tagging).
  - `Icon` wrapper (nếu dùng library icon, ví dụ `react-native-vector-icons`).
- **Yêu cầu bắt buộc:**
  - Components phải **generic**, tùy chỉnh thông qua props (variant, size, color, disabled, loading…).
  - KHÔNG gắn business logic vào Base Components (không call API, không xử lý nghiệp vụ).
  - Code TypeScript chuẩn, có định nghĩa type/props rõ ràng (tách file `.types.ts` nếu cần).
  - Kết nối components với Design Tokens:
    - Lấy colors/spacing/radius/typography từ `design-system/tokens`.
    - Không hardcode số liệu/hex trừ khi thật sự là constant không thuộc brand.
  - Component hiển thị trạng thái (Badge/Status) phải dùng config từ `constants/status.ts`:
    - Ví dụ: `getStatusConfig(status).backgroundColor` → màu nền luôn đúng với brand.
- Đối với component có interaction (Button, ListItem, Chip…), đảm bảo:
  - Touch target đủ lớn (≥ 44–48 dp).
  - State pressed/disabled/active thể hiện rõ ràng theo guideline.

### Bước 5: Tạo Layout Components & Navigation (Mobile Specific)

- Xây dựng Layout Framework cho mobile tại `design-system/components/layout/` (hoặc tương đương với từng stack):
  - `ScreenContainer`:
    - Wrap Safe Area (status bar, notch, bottom home indicator).
    - Áp dụng background color chuẩn từ tokens.
    - Quản lý padding mặc định, scroll (nếu cần).
  - `AppBar` / `Header`:
    - Title, back button, optional action (icon, menu).
    - Tham chiếu typography + colors từ tokens.
  - `Section` / `ContentContainer`:
    - Chuẩn hóa khoảng cách giữa các block trong 1 screen.
- Xây dựng structure cho **Navigation** tại `design-system/navigation/`:
  - Nếu React Native:
    - Ưu tiên dùng React Navigation.
    - `RootNavigator` (Stack chính).
    - `MainTabNavigator` (Bottom Tab).
    - `DrawerNavigator` (nếu có).
    - Định nghĩa type-safe route params (TypeScript) trong `types/navigation.ts`.
  - Nếu Flutter:
    - Định nghĩa router, route names, params trong một module navigation riêng.
  - Nếu tech stack khác: áp dụng nguyên tắc tách riêng navigation module, không trộn route logic vào từng screen.
- Agent phải:
  - Sử dụng Layout components cho mọi screen (không viết lại Safe Area, padding mỗi nơi một kiểu).
  - Chỉ định rõ route name, param, và cách screen gắn với navigator.

### Bước 6: Lắp ráp Screens (Mobile Screens)

- Xây dựng các màn hình (Screens) theo cấu trúc MH Design tại thư mục `screens/`:
  - Ví dụ: `screens/Activity/ActivityListScreen.tsx`, `screens/Activity/ActivityDetailScreen.tsx`
  - Tách rõ:
    - `screens/[Domain]/[ScreenName]Screen.tsx` (container + logic UI).
    - `screens/[Domain]/components/` (các component chỉ dùng trong domain đó, nhưng vẫn reuse base UI).
- **Luật sử dụng components:**
  - Chỉ được sử dụng các components từ `design-system/` (tokens, ui, layout, navigation, hooks, utils).
  - Tuyệt đối không lặp lại JSX + style thô nếu đã có Base Component tương ứng.
  - Nếu phát hiện pattern UI mới xuất hiện ≥ 2 nơi → trừu tượng hóa thành component trong `design-system/components/ui/` hoặc `design-system/components/layout/`.
- **Centralized data & status:**
  - Khi render tags, chip, filter, danh sách trạng thái, giới tính, loại, v.v…:
    - Bắt buộc dùng `constants/status.ts`, `constants/categories.ts` hoặc các Enum/constant tập trung.
    - Tuyệt đối KHÔNG tự hardcode mảng dữ liệu fix ở từng screen.
- Business logic (filtering, gọi API, mapping DTO → ViewModel) phải:
  - Nằm ở tầng Screen hoặc Hooks riêng (vd: `useActivityList`), không nhét vào Base UI Components.

## QUY TẮC BẢO ĐẢM CHẤT LƯỢNG (RULES & BEST PRACTICES)

- **Mobile-First & Platform-Aware:**
  - Thiết kế và code phải ưu tiên trải nghiệm mobile: thao tác 1 tay, touch target đủ lớn, bố cục rõ ràng.
  - Nếu có sự khác biệt giữa iOS và Android (status bar, gesture…) → dùng Layout/Hook để trừu tượng, không rải conditional khắp nơi.

- **Incremental Output:**
  - Agent phải sinh từng thư mục/file theo từng segment (tokens → utils/constants → components → layout/navigation → screens), không sinh toàn bộ codebase khổng lồ trong một lượt (để tránh giới hạn token và dễ review).

- **Type Safety (theo tech stack):**
  - Nếu dùng React Native với TypeScript → dùng TS 100%, định nghĩa type rõ ràng cho:
    - Props của Base Components.
    - Navigation params (route params).
    - Config status/categories.
  - Nếu dùng Flutter/Dart hoặc ngôn ngữ khác có type system → áp dụng tương tự để đảm bảo type-safe cho config, navigation, props/widget.

- **Tuân thủ Brand Guideline & Tokens:**
  - Mọi hardcoded padding/margin/color/font-size trong Screens/Layout nếu đã có trong tokens đều được coi là **vi phạm**.
  - Bắt buộc import tokens (`colors`, `spacing`, `typography`, `radius`, `elevation`) từ `design-system/tokens`.

- **Centralized Data & Config:**
  - Xây dựng cơ chế lưu trữ cố định cho các dữ liệu fix cứng (trạng thái, danh mục, mapping màu/icon).
  - Khi gen screen, bắt buộc gọi các biến cấu hình tại:
    - `design-system/constants/status.ts`
    - `design-system/constants/categories.ts`
    - Hoặc `constants.ts` tập trung
  - Tuyệt đối không tạo list hardcoded tại từng screen cho các thông tin dùng chung.

- **Dễ bảo trì & Tái sử dụng:**
  - Logic filter/sort/search, pagination, grouping… phải nằm ở Screen hoặc Hook, không nằm ở tầng Base UI Components.
  - Mọi pattern UI lặp lại từ 2 màn trở lên nên được nâng cấp lên thành component/layout riêng trong `design-system/`.

- **Performance (Mobile):**
  - Với danh sách dài, dùng `FlatList`/`SectionList`, không dùng `ScrollView` với hàng trăm item.
  - Hạn chế re-render không cần thiết bằng việc:
    - Tách nhỏ component.
    - Dùng `React.memo`, `useCallback`, `useMemo` khi hợp lý.
  - Tránh tạo style inline mới trong mỗi render nếu có thể reuse từ StyleSheet hoặc tokenized style.

---

Skill `ba-mobile-frontend-code-gen` được thiết kế để **bổ sung** cho `ba-frontend-code-gen` (web), không thay thế. Agent cần chọn đúng skill theo **ngữ cảnh nền tảng (web vs mobile)** để đảm bảo code sinh ra tuân thủ đúng chuẩn kiến trúc Frontend của từng platform.

