# Prompt Layout Design: Phần mềm Quản lý Đào tạo Trung tâm Tiếng Anh

*Lưu ý: Copy toàn bộ nội dung bên dưới (từ dấu `---`) dán vào công cụ Gen UI (như v0, Stitch, Figma AI).*

---

**[SCOPE CLARIFICATION - IMPORTANT]**
Vui lòng CHỈ thiết kế CẤU TRÚC LAYOUT TỔNG THỂ (Shell), HỆ THỐNG ĐIỀU HƯỚNG (Navigation/Menu), và CÂY THÔNG TIN (IA) ở mức khung. 
TUYỆT ĐỐI KHÔNG thiết kế chi tiết bên trong các màn hình chức năng (như form nhập liệu hay bảng dữ liệu phức tạp). Hãy dùng các khối giữ chỗ (placeholders) cho vùng nội dung chính.

*(English: Please focus strictly on the layout shell, global navigation, and Information Architecture (IA). DO NOT generate detailed screens or complex data tables. Use placeholders for the main content area.)*

**[BỐI CẢNH SẢN PHẨM]**
Phần mềm SaaS Quản lý Đào tạo Trung tâm Tiếng Anh (DreamHigh Center Management). Vận hành đa chi nhánh, gồm nhiều phân hệ quản trị phức tạp.

**[NỀN TẢNG & MẬT ĐỘ]**
- Nền tảng: Web Application (Responsive, tối ưu cho Desktop/Tablet).
- Mật độ dữ liệu: Cao (SaaS/ERP).
- Đặc thù: Trên top bar cần có bộ chọn (Dropdown) chuyển đổi "Chi nhánh".

**[ĐA VAI & KHUNG ĐIỀU HƯỚNG (IA MAP)]**
Giao diện thay đổi Sidebar tùy vào vai trò. Bạn hãy chọn 1 role bất kỳ (ví dụ Quản lý đào tạo hoặc Ban Giám đốc) để vẽ Sidebar mẫu:
1. **Ban Giám đốc (Director)**: Menu: Dashboard tổng thể, Quản lý Chi nhánh, Báo cáo Học phí.
2. **Quản lý đào tạo (Academic Manager)**: Menu: Khóa học, Lịch học, Quản lý Giáo viên, Kiểm tra Đánh giá.
3. **Nhân viên học vụ (Academic Staff)**: Menu: Hồ sơ học viên, Cảnh báo Điểm danh, Học phí.
4. **Tư vấn tuyển sinh (Admissions/Sales)**: Menu: Tuyển sinh Lead, CRM Khách hàng.
5. **Giáo viên (Teacher)**: Menu: Lịch dạy tuần, Điểm danh lớp, Tài liệu giảng dạy.
6. **Học viên / Phụ huynh (Portal)**: Menu: Kết quả, Lịch học, Trạng thái đóng phí.

**[CẤU TRÚC LAYOUT ĐỀ XUẤT (CONCEPT)]**
- **Shell Layout**: 
  - **Sidebar Menu (Trái):** Chứa liên kết chính, logo. Nền tối `Midnight (#1A1A18)`.
  - **Top Bar (Trên):** Chứa Global Search, Branch Switcher (Chi nhánh), Notifications, Profile.
- **Content Area**: 
  - Page Header lớn (Tiêu đề, Breadcrumbs, Button).
  - Khối Tabs ngang chuyển đổi module con.

**[BRAND GUIDELINE & DESIGN SYSTEM] (RẤT QUAN TRỌNG)**
Layout phải tuân thủ nghiêm ngặt hệ thống Design Token của **DreamHigh**:

1. **Tông màu (Colors):**
   - Màu nền (Page Bg): `Ivory White (#FAFAF7)` (Pha chút kem, tuyệt đối KHÔNG dùng trắng tinh `#FFFFFF`).
   - Màu nhấn (Primary/Accent): `DreamHigh Gold (#CC9933)`. CHỈ ĐƯỢC dùng màu nhấn duy nhất này (không dùng gradient tím, hồng, xanh đậm).
   - Sidebar/Headings: `Midnight (#1A1A18)`. Background Navbar/Sidebar là Midnight. Sidebar text/link khi Active sẽ là màu vàng `#CC9933`.
   - Card Bg: `Parchment (#F2EFE8)` hoặc Ivory White (#FAFAF7).

2. **Kiểu chữ (Typography):**
   - Font giao diện chủ đạo (Body, Label, Value, Navigation): `Jost` (Google Font). Mọi thứ Uppercase phải có `letter-spacing: 0.1em` hoặc `0.2em`. Tuyệt đối không dùng các font weight cục mịch như >700/800.
   - Font tiêu đề (Heading H1, H2, Dashboard Value): `Cormorant Garamond` (Ưu tiên Italic). Thể hiện tính hoài cổ, cảm xúc, thanh lịch.

3. **Góc bo & Biểu mẫu (Shapes & Card Style):**
   - Góc bo (Border-radius): Mặc định là `2px` (góc gần vuông) cho mọi Card, Button, Input, Table.
   - CẤM các bo tròn lớn `> 8px`. Layout cần sắc bén (sharp edges), sang trọng (luxury style).
   - Form/Card: Viền xám mảnh `1px solid rgba(0,0,0,0.07)`, đôi khi có thanh accent top `2px solid #CC9933`. Tối giản đổ bóng mạnh (drop shadow).

4. **Nút bấm (Buttons):** Nút Primary (ví dụ: 'Thêm mới') dùng nền `#CC9933`, text đen `#1A1A18`, chữ Uppercase, font Jost 500.

**[LỜI KẾT CHO AI UI GENERATOR]**
Kết xuất ngay cho tôi HTML/CSS (Ví dụ qua v0/Stitch) hoặc React/Tailwind một wireframe cấu trúc (Shell + Navigation Sidebar theo nhóm quyền "Ban Giám đốc" hoặc "Quản lý đào tạo"). Giao diện CHẮC CHẮN PHẢI tuân thủ Font Jost/Cormorant, màu Black/Gold/Parchment `#FAFAF7/#CC9933`, và border-radius 2px. Các vùng chứa dữ liệu (Bảng, Form) hãy dùng thẻ `<div placeholder="">` nhạt màu để chừa chỗ trống.
