# BA UI Specification Skill

Trợ lý mô tả chi tiết màn hình giao diện người dùng (UI Specification) cho Business Analyst.

---

## 🎯 Tính năng

1. **Phân tích màn hình** - Phân tích mô tả hoặc hình ảnh màn hình để xác định các control
2. **Xác định control** - Tự động xác định các loại control (Textbox, Combobox, Label, DatePicker, Button, Upload, ...)
3. **Tạo UI Spec** - Tạo bảng đặc tả chi tiết theo quy tắc chuẩn
4. **Format chuyên nghiệp** - Bảng dạng thuần văn bản, dễ copy vào tài liệu Word/Excel

---

## 🚀 Quick Start

### Kích hoạt Skill

```
/ba-ui-spec
```

Hoặc nói:
- "Mô tả màn hình"
- "Tạo UI Spec"
- "Phân tích màn hình"

### Quy trình sử dụng

1. **Cung cấp thông tin:**
   - Hệ thống: Tên hệ thống/ứng dụng
   - Chức năng: Tên chức năng/module
   - Ai sử dụng: Người dùng/vai trò
   - Mục đích: Mục đích sử dụng màn hình
   - Mô tả/hình ảnh màn hình: Mô tả text hoặc hình ảnh
   - Epics: Tên Epics (skill sẽ hỏi nếu không tìm thấy)
   - User Story: Tên User Story (skill sẽ hỏi nếu không suy luận được)

2. **Skill phân tích:**
   - Phân tích màn hình
   - Xác định các control
   - Xác định loại chức năng (Create/Update/Delete hoặc Read)

3. **Nhận kết quả:**
   - Bảng UI Spec đầy đủ với các cột phù hợp
   - Format thuần văn bản, dễ copy vào tài liệu
   - File `.md` và `.docx` được lưu tự động vào cấu trúc: `User stories/<Epics>/<Tên_user_story>/`

---

## 📋 Quy tắc mô tả

### Control nhập liệu (Textbox, Combobox, DatePicker, Upload)
- **Phải có**: Require, MaxLength (nếu áp dụng), Error Message
- **Mô tả đầy đủ**: Ý nghĩa, Format, Ràng buộc, ...

### Control hiển thị (Label, Icon)
- **Chỉ mô tả**: Logic hiển thị, Readonly (nếu có)
- **Label cố định**: Không mô tả
- **Label thay đổi**: Mô tả format và điều kiện hiển thị

### Phân biệt chức năng
- **Create/Update/Delete**: Bảng 7 cột (STT, Tên control, Loại control, Require, MaxLength, Mô tả chi tiết, Thông báo lỗi)
- **Read**: Bảng 3 cột (Tên control, Loại control, Mô tả chi tiết)

---

## 📁 File Output

Skill tự động tạo cấu trúc thư mục và lưu file:

**Cấu trúc thư mục:**
```
User stories/
└── <Epics>/
    └── <Tên_user_story>/
        ├── UI_Spec_<Tên_màn_hình>_YYYYMMDD.md
        └── UI_Spec_<Tên_màn_hình>_YYYYMMDD.docx
```

**Ví dụ:**
```
User stories/
└── Quản lý nhân sự/
    └── Thêm mới nhân viên/
        ├── UI_Spec_Them_moi_nhan_vien_20260119.md
        └── UI_Spec_Them_moi_nhan_vien_20260119.docx
```

**Lưu ý:**
- Skill sẽ tự động tạo các thư mục nếu chưa có
- Epics: Skill sẽ cố gắng suy luận, nếu không tìm thấy → **BẮT BUỘC hỏi user**
- User Story: Skill sẽ cố gắng suy luận từ thông tin đã có, nếu không có thì hỏi user

---

## 💡 Ví dụ

### Input
```
Hệ thống: Hệ thống quản lý đơn hàng
Chức năng: Thêm mới đơn hàng
Ai sử dụng: Nhân viên bán hàng
Mục đích: Nhập thông tin đơn hàng mới
Mô tả: Màn hình có các trường nhập liệu...
```

### Output
- Bảng UI Spec với đầy đủ thông tin về từng control
- File `.md` và `.docx` được tự động tạo trong cấu trúc: `User stories/<Epics>/<Tên_user_story>/`

---

## 🔧 Scripts

### Xuất UI Spec ra Word

```bash
python .claude/skills/ba-ui-spec/scripts/export_ui_spec_to_docx.py <ui_spec_file> [output_file]
```

**Ví dụ:**
```bash
python .claude/skills/ba-ui-spec/scripts/export_ui_spec_to_docx.py "User stories/Quản lý đơn hàng/Thêm mới đơn hàng/UI_Spec_Them_moi_don_hang_20260119.md"
```

---

## 📚 Tài liệu tham khảo

- Quy tắc mô tả chi tiết theo từng loại control: Xem `SKILL.md`
- Tham khảo: https://m2mba.com/blog/articles/huong-dan-chi-tiet-cach-mo-ta-UI-control-cho-BA

---

**Version:** 1.0.0  
**Ngày tạo:** 2026-01-19
