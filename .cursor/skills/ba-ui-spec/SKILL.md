---
name: ba-ui-spec
description: "Trợ lý mô tả chi tiết màn hình giao diện người dùng (UI Specification) cho Business Analyst. Phân tích màn hình, xác định các control và tạo bảng đặc tả chi tiết theo quy tắc chuẩn."
---

# HƯỚNG DẪN SKILL: BA UI SPEC

**Version:** 1.0.1
**Author:** M2MBA
**Last Updated:** 2026-03-17
**Description:** Hỗ trợ Business Analyst tạo tài liệu UI Specification chuyên nghiệp từ mô tả hoặc hình ảnh màn hình, bao gồm bảng đặc tả chi tiết các control và validation rules.

## 🎯 Mục đích

Hỗ trợ BA tạo tài liệu UI Specification chuyên nghiệp từ mô tả/hình ảnh màn hình.

**Đặc điểm:**
- Thu thập 5 thông tin: Hệ thống, Chức năng, Ai sử dụng, Mục đích, Mô tả/hình ảnh
- Tạo bảng đặc tả: 7 cột (Create/Update/Delete) hoặc 3 cột (Read)
- Format: Bảng thuần văn bản, dễ copy vào Word/Excel
- Tự động lưu file .md và xuất .docx

---

## 🚀 Quy trình

**Khởi động**: "Mô tả màn hình" / "Tạo UI Spec" / "Phân tích màn hình" / "/ba-ui-spec"

### **Bước 1: Thu thập thông tin**

Hỏi user 5 thông tin cơ bản + Epics + User Story:
1. Hệ thống
2. Chức năng  
3. Ai sử dụng
4. Mục đích
5. Mô tả hoặc hình ảnh màn hình
6. **Epics** (suy luận từ thông tin trên, nếu không có → **BẮT BUỘC hỏi**)
7. **User Story** (suy luận từ thông tin trên, nếu không có → hỏi)

**Thông tin bổ sung:** ERD (nếu có) để xác định nguồn dữ liệu Combobox

### **Bước 2: Kiểm tra ERD cho Combobox/RadioBox/CheckBox**

**Nếu có ERD:**
- Tìm bảng cấu hình tương ứng → Mô tả theo ngôn ngữ tự nhiên (ví dụ: "Lấy danh sách các tỉnh thành đang hoạt động trên hệ thống")

**Nếu không có ERD:**
- Dữ liệu thay đổi → Mô tả theo ngôn ngữ tự nhiên (ví dụ: "Lấy danh sách các kênh tiếp nhận đang hoạt động trên hệ thống")
- Dữ liệu cố định → "Các giá trị: [...]"

**⚠️ QUAN TRỌNG:** KHÔNG nói trực tiếp "Load từ DB bảng X", mà mô tả theo nghiệp vụ, dễ hiểu cho dev và stakeholder

### **Bước 3: Phân tích màn hình**

Xác định:
- Các control: Textbox, Combobox, Label, DatePicker, Button, Upload, RadioBox, CheckBox, Icon
- Loại chức năng: Create, Update, Delete, Read

### **Bước 4: Tạo bảng đặc tả**

**⚠️ BẮT BUỘC: Bảng phải dùng Markdown Table chuẩn**

**Yêu cầu format:**
- Có 1 dòng header
- Có 1 dòng separator dạng `|---|---|`
- Mỗi dòng dữ liệu phải **bắt đầu và kết thúc bằng dấu `|`**
- Số cột giữa các dòng phải **đúng bằng nhau**
- **TUYỆT ĐỐI KHÔNG** viết kiểu `11 | ... | ...` dạng text (không có dấu `|` ở đầu)

**Create/Update/Delete (7 cột):**
```markdown
| STT | Tên control | Loại control | Require | MaxLength | Mô tả chi tiết | Thông báo lỗi |
|-----|-------------|--------------|---------|-----------|----------------|---------------|
| 1 | [Tên] | [Loại] | Yes/No | [Số] | [Mô tả] | [Thông báo] |
```

**Read (3 cột):**
```markdown
| Tên control | Loại control | Mô tả chi tiết |
|-------------|--------------|----------------|
| [Tên] | [Loại] | [Mô tả] |
```

### **Bước 5: Tạo file User Flow (tùy chọn)**

**Sau khi hoàn thành bảng đặc tả UI Spec**, **TỰ ĐỘNG HỎI user** có muốn tạo file User Flow không.

**Quy trình:**

1. **Hỏi user confirm:**
   > "Bạn có muốn tạo file User Flow cho màn hình này không? File sẽ mô tả luồng chuyển màn hình và các hành động của user."

2. **Nếu user đồng ý:**
   - **Nếu user cung cấp thông tin User Flow:**
     - Sử dụng thông tin user cung cấp để tạo file User Flow
     - Format theo hướng và yêu cầu của user
   
   - **Nếu user KHÔNG cung cấp thông tin:**
     - Tự động tạo **bản draft** dựa trên:
       - Bảng đặc tả UI Spec đã tạo
       - Các control và chức năng đã phân tích
       - Luồng nghiệp vụ suy luận từ UI Spec
     - Tạo file với format chuẩn User Flow
     - **TỰ ĐỘNG HỎI user confirm** bản draft và chỉnh sửa nếu cần

3. **Tên file:** `User_Flow_<Tên_chức_năng>_YYYYMMDD.md`
4. **Vị trí lưu:** Cùng thư mục với file UI Spec (`docs-BA/User stories/<Epics>/<User_Story>/`)

**Format file User Flow .md:**
- Mô tả luồng chuyển màn hình (MH0 → MH1 → MH2)
- Mô tả các hành động của user trên từng màn hình
- Mô tả dữ liệu hiển thị và nguồn gốc (nếu có)
- Có thể kèm theo sequence diagram đơn giản (nếu cần)

**Ví dụ câu hỏi confirm:**
> "Bạn có muốn tạo file User Flow cho màn hình này không? Nếu có, bạn có thể cung cấp thông tin User Flow hoặc để tôi tạo bản draft dựa trên UI Spec đã phân tích."

### **Bước 6: Lưu file**

Cấu trúc: `docs-BA/User stories/<Epics>/<User_Story>/UI_Spec_<Tên>_YYYYMMDD.md`
Tự động xuất: `.docx` bằng script `export_ui_spec_to_docx.py`

**Format file .md (để script parse được):**

**1. Header thông tin:**
```
Tên chức năng: [Tên chức năng]
Actor: [Ai sử dụng]
Mục đích: [Mục đích]
```

**2. Bảng đặc tả:**
- **Format: Markdown Table chuẩn** (KHÔNG phải text thuần)
- **BẮT BUỘC có:**
  - 1 dòng header với dấu `|` ở đầu và cuối
  - 1 dòng separator dạng `|---|---|`
  - Mỗi dòng dữ liệu phải **bắt đầu và kết thúc bằng dấu `|`**
  - Số cột giữa các dòng phải **đúng bằng nhau**
- **TUYỆT ĐỐI KHÔNG** viết kiểu `11 | ... | ...` dạng text (không có dấu `|` ở đầu)

**Ví dụ đúng:**
```markdown
| STT | Tên control | Loại control |
|-----|-------------|--------------|
| 1 | Tên khách hàng | Textbox |
| 2 | Số điện thoại | Textbox |
```

**Ví dụ SAI (KHÔNG được dùng):**
```
11 | Tên khách hàng | Textbox
12 | Số điện thoại | Textbox
```

**3. Format mô tả chi tiết (cột "Mô tả chi tiết"):**

**Khi có nhiều ý hoặc liệt kê, DÙNG PATTERN TỰ ĐỘNG:**

**Pattern tự động (Format chính):** Viết trên 1 dòng với liệt kê nhiều mục và ngoặc đơn - script sẽ tự động phát hiện và tạo bullet points
```
Mô tả chính: "Item 1" (màu xxx), "Item 2" (màu yyy), "Item 3" (màu zzz)
```

**⚠️ QUAN TRỌNG:** Phải có dấu `:` trước phần liệt kê để script nhận diện đúng và tự động tạo bullet points trong Word.

**Ví dụ thực tế:**
```
Trạng thái hiện tại của ticket. Hiển thị dưới dạng badge với màu sắc khác nhau theo trạng thái: "Chờ xử lý" và "Đang xử lý" (màu info), "Pending KH" và "Pending bộ phận" (màu warning), "Đã xử lý" và "Đã đóng" (màu success), "Overdue" (màu error)
```

**Lưu ý:** Skill phải tạo file .md với format trên để script có thể parse và tạo file Word đúng cấu trúc, đặc biệt là phần bullet points

**Cấu trúc file Word (.docx) sẽ có:**
1. **Thông tin chung** (bảng 2 cột):
   - Tên chức năng
   - Actor
   - Mục đích
2. **Màn hình**
3. **Mô tả màn hình**: Bảng đặc tả chi tiết các control

---

## 📋 Quy tắc mô tả control

**Chi tiết:** `references/ui-control-rules.md`

**Tóm tắt:**
- **Label:** Chỉ mô tả nếu giá trị thay đổi
- **Textbox:** LUÔN có MaxLength, mô tả trực tiếp, chỉ mô tả ràng buộc. SĐT VN: 10 số, bắt đầu bằng 0
- **Combobox/RadioBox/CheckBox:** BẮT BUỘC kiểm tra ERD → xác định nguồn dữ liệu. **KHÔNG nói "Load từ DB bảng X"**, mà mô tả theo ngôn ngữ tự nhiên (ví dụ: "Lấy danh sách các tỉnh thành đang hoạt động trên hệ thống")
- **DatePicker:** Có Format hiển thị (bắt buộc), ràng buộc thời gian
- **Upload:** Định dạng file, kích thước tối đa, Require
- **Icon/Button:** Khi nào hiển thị/ẩn, chức năng

**Lưu ý:**
- Mô tả trực tiếp, không prefix, không lặp lại thông tin đã có ở cột khác
- Chỉ mô tả thông tin có ràng buộc
- **Nhiều ý → bullet points:** Viết trên 1 dòng với pattern liệt kê `(xxx), (yyy)` và **có dấu `:` trước phần liệt kê** - script sẽ tự động phát hiện và tạo bullet points trong Word
- Ngôn ngữ: Tiếng Việt, tự nhiên, chuyên nghiệp
- **Combobox:** Không đề cập tên bảng/trường DB, chỉ mô tả logic nghiệp vụ
- **Format file .md:** Đảm bảo format phù hợp để script docx parse được bullet points (xem chi tiết ở phần "Format file .md" phía trên)

---

## ✅ BẮT BUỘC

1. Thu thập đủ thông tin, Epics (nếu không có → **hỏi**), User Story
2. Textbox LUÔN có MaxLength
3. Combobox BẮT BUỘC kiểm tra ERD (nếu có) và mô tả theo ngôn ngữ tự nhiên (KHÔNG nói "Load từ DB bảng X")
4. DatePicker có Format hiển thị
5. Phân biệt chức năng: 7 cột (Create/Update/Delete) vs 3 cột (Read)
6. **Format bảng: Markdown Table chuẩn** - BẮT BUỘC có header, separator `|---|---|`, mỗi dòng bắt đầu và kết thúc bằng `|`, số cột đúng bằng nhau
7. Không lặp lại thông tin đã có ở cột Require, MaxLength
8. Lưu file đúng cấu trúc: `docs-BA/User stories/<Epics>/<User_Story>/`
9. File .md phải có format: "Tên chức năng:", "Actor:", "Mục đích:" ở đầu file để script parse được
10. Tự động xuất .docx với cấu trúc: 1. Thông tin chung (bảng), 2. Màn hình, 3. Mô tả màn hình (bảng)
11. **Bước 5:** Sau khi hoàn thành UI Spec, **TỰ ĐỘNG HỎI user** có muốn tạo file User Flow không
12. **User Flow:** Nếu user đồng ý nhưng không cung cấp thông tin → tạo bản draft dựa trên UI Spec đã phân tích
13. **User Flow:** Nếu user cung cấp thông tin → sử dụng thông tin của user để tạo file

## ❌ KHÔNG ĐƯỢC

1. Bỏ qua control, MaxLength, Error Message
2. Mô tả dựa code FE hiện có
3. Dùng prefix trong mô tả ("Độ dài:", "Format:", "Khi nào enable:", v.v.)
4. Mô tả thông tin không ràng buộc
5. **Dùng format text thuần** thay vì Markdown Table chuẩn (phải có header, separator, dấu `|` ở đầu và cuối mỗi dòng)
6. **Viết bảng kiểu `11 | ... | ...`** không có dấu `|` ở đầu dòng
6. Không kiểm tra ERD cho Combobox
7. Bỏ qua hỏi Epics nếu không có
8. **Nói trực tiếp "Load từ DB bảng X"** - Phải mô tả theo ngôn ngữ tự nhiên (ví dụ: "Lấy danh sách các tỉnh thành đang hoạt động trên hệ thống")
9. **Đề cập tên bảng/trường DB** (PROVINCE, CHANNEL, province_name, channel_code, v.v.) - Chỉ mô tả logic nghiệp vụ
10. **Lặp lại thông tin** đã có ở cột Require, MaxLength trong mô tả chi tiết
11. **Mô tả vị trí hiển thị** (fullWidth, chiều cao, resize, "Luôn hiển thị ở cuối form")
12. **Mô tả "Khi nào enable"** nếu luôn enable
13. **Bỏ qua hỏi user** về việc tạo file User Flow sau khi hoàn thành UI Spec
14. **Tự động tạo User Flow** mà không hỏi user confirm
15. **Bỏ qua tạo bản draft** khi user không cung cấp thông tin User Flow

---

## 🔧 Script
```bash
python .claude/skills/ba-ui-spec/scripts/export_ui_spec_to_docx.py <ui_spec_file>
```

---

