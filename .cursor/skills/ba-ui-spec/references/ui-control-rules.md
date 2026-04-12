# Quy Tắc Mô Tả Chi Tiết Theo Từng Loại Control

Tài liệu này mô tả chi tiết quy tắc mô tả cho từng loại control trong UI Specification.

## ⚠️ Nguyên tắc chung quan trọng

1. **Không lặp lại thông tin đã có ở cột khác**: Đảm bảo thông tin mô tả ko bị dư thừa, mỗi thông tin sau khi mô tả xong, bạn tự review lại xem có bị lặp thông tin ko, nếu lặp thì bạn bỏ thông tin thừa ra

2. **Không cần chú thích nhóm/thuộc tính**: Không ghi "Độ dài:", "Format nhập liệu:", "Khi nào enable:", v.v.
   - ❌ Sai: "Độ dài: 10 ký tự số, bắt đầu bằng số 0. Format nhập liệu: Chỉ cho phép nhập số"
   - ✅ Đúng: "Gồm 10 ký tự số, bắt đầu bằng số 0" (đã bao gồm cả độ dài và format)

3. **Dữ liệu lấy từ DB - Mô tả theo ngôn ngữ tự nhiên**: Dễ hiểu cho dev và business stakeholder
   - ❌ Sai: "Load từ DB bảng PROVINCE với điều kiện tất cả các bản ghi đang hoạt động. Hiển thị province_name, lưu province_code"
   - ❌ Sai: "Load từ DB bảng CHANNEL với điều kiện is_active = true. Hiển thị channel_name, lưu channel_code"
   - ❌ Sai: "Load từ DB bảng ISSUE_TYPE với điều kiện tất cả các bản ghi đang hoạt động. Hiển thị issue_type_name, lưu issue_type_code"
   - ✅ Đúng: "Lấy danh sách các tỉnh thành đang hoạt động trên hệ thống"
   - ✅ Đúng: "Lấy danh sách các kênh tiếp nhận đang hoạt động trên hệ thống, sắp xếp theo tên kênh tăng dần theo alphabet"
   - ✅ Đúng: "Lấy danh sách các loại ticket/vấn đề đang hoạt động trên hệ thống"
   - **Nguyên tắc**: Không được sử dụng tên bảng/trường dữ liệu (PROVINCE, CHANNEL, province_name, channel_code, v.v.) mà phải hiểu ý nghĩa bảng/trường đó là gì để mô tả bằng ngôn ngữ tự nhiên

4. **Không mô tả vị trí hiển thị**: Không mô tả "Chiếm toàn bộ độ rộng", "Luôn hiển thị ở cuối form", chiều cao, fullWidth, resize

5. **Không mô tả "Khi nào enable" nếu luôn enable**: Chỉ mô tả khi có điều kiện
   - ❌ Sai: "Khi nào enable: Luôn enable"
   - ✅ Đúng: Không mô tả, hoặc "Chỉ enable khi tất cả các trường bắt buộc đã được nhập"

6. **Không cần chú thích từng ý**: Không cần "Chức năng:", "Hiển thị:", "Khi nào enable:", v.v.
   - ❌ Sai: "Chức năng: Lưu thông tin ticket. Khi nào hiển thị: Luôn hiển thị. Khi nào enable: Luôn enable"
   - ✅ Đúng: "Lưu thông tin ticket mới vào hệ thống" hoặc "Lưu thông tin ticket mới vào hệ thống. Chỉ enable khi tất cả các trường bắt buộc đã được nhập"

7. **Thông tin mô tả là optional/Tùy chọn**: Trong từng loại control bên dưới, với thông tin mô tả nào mà dạng tùy chọn, thì nếu thông tin đó ko có ràng buộc gì thì bạn ko cần mô tả. Ví dụ Với textbox thì thông tin mô tả Giá trị mặc định là Option thì nếu ko có ràng buộc giá trị mặc định = bao nhiêu thì bỏ qua thông tin này, ko cần mô tả

8. **Format bullet points trong file .md (để script docx parse được):**
   
   **DÙNG PATTERN TỰ ĐỘNG - Viết trên 1 dòng với liệt kê nhiều mục và ngoặc đơn:**
   
   ```
   Mô tả chính: "Item 1" (màu xxx), "Item 2" (màu yyy), "Item 3" (màu zzz)
   ```
   
   **⚠️ QUAN TRỌNG:** Phải có dấu `:` trước phần liệt kê để script nhận diện đúng và tự động tạo bullet points trong Word.
   
   **Ví dụ thực tế:**
   ```
   Trạng thái hiện tại của ticket. Hiển thị dưới dạng badge với màu sắc khác nhau theo trạng thái: "Chờ xử lý" và "Đang xử lý" (màu info), "Pending KH" và "Pending bộ phận" (màu warning), "Đã xử lý" và "Đã đóng" (màu success), "Overdue" (màu error)
   ``` 
---

## 1️⃣ Label / Badge

**Nguyên tắc:**
- Chỉ mô tả nếu giá trị hiển thị thay đổi theo dữ liệu theo từng lần sử dụng
- Các label cố định thì không mô tả

**Nội dung mô tả:**
- Tên dữ liệu hiển thị
- Format hiển thị (màu sắc, kiểu chữ, định dạng ngày,...)
- Khi nào hiển thị / không hiển thị

**Require, MaxLength, Error Message**: "—" (không có)

**Ví dụ:**
- Label cố định: "Họ tên" → Không mô tả
- Label thay đổi: "Tổng tiền: 1.000.000 VNĐ" → Mô tả format hiển thị số tiền, màu sắc

**Badge (Label có nhiều trạng thái với màu sắc):**

**Ví dụ Badge với nhiều trạng thái:**

**Pattern tự động (Format chính):** Liệt kê trên 1 dòng (script sẽ tự động phát hiện và tạo bullet)
```
Trạng thái hiện tại của ticket. Hiển thị dưới dạng badge với màu sắc khác nhau theo trạng thái: "Chờ xử lý" và "Đang xử lý" (màu info), "Pending KH" và "Pending bộ phận" (màu warning), "Đã xử lý" và "Đã đóng" (màu success), "Overdue" (màu error)
```

**⚠️ Lưu ý:** Phải có dấu `:` trước phần liệt kê để script docx nhận diện và tự động tạo bullet points

---

## 2️⃣ Textbox / Text Input / Text Area

### Tóm tắt mô tả Textbox

| # | Trường thông tin | Bắt buộc / Tùy chọn | Ghi chú hướng dẫn |
|---|------------------|---------------------|-------------------|
| 1 | Ý nghĩa dữ liệu | **Bắt buộc** | Mô tả trực tiếp dữ liệu textbox dùng để nhập gì (không cần prefix "Ý nghĩa dữ liệu:") |
| 2 | Bắt buộc nhập | Tùy chọn | **Chỉ mô tả nếu bắt buộc** - Mặc định: Không bắt buộc (không cần mô tả) |
| 3 | MaxLength | **Bắt buộc** | **LUÔN mô tả** - Ghi rõ độ dài tối đa |
| 4 | MinLength | Tùy chọn | Mô tả nếu có quy định cụ thể (ví dụ: Số điện thoại VN = 10 ký tự) |
| 5 | Giá trị mặc định | Tùy chọn | **Chỉ mô tả nếu có** - Nếu không có thì không mô tả |
| 6 | Format nhập liệu | Tùy chọn | **Chỉ mô tả nếu có ràng buộc** - Mô tả ký tự được phép/không được phép nhập |
| 7 | Readonly | Tùy chọn | **Chỉ mô tả nếu Readonly** - Mặc định: Cho phép chỉnh sửa (không cần mô tả) |

**Ràng buộc đặc biệt:**
- **Số điện thoại VN**: Gồm 10 ký tự số, bắt đầu bằng số 0 (đã bao gồm cả độ dài và format nhập liệu)

**Error Message**: Mô tả thông báo lỗi cụ thể (ví dụ: "Vui lòng nhập [tên trường]", "Độ dài tối đa là [X] ký tự", "Số điện thoại phải có 10 ký tự và bắt đầu bằng số 0")

**Ví dụ:**

**Ví dụ 1 - Textbox thông thường:**
- Mô tả chi tiết: "Họ và tên đầy đủ của nhân viên. Chỉ cho phép chữ cái, khoảng trắng, dấu tiếng Việt"
- MaxLength: 100 ký tự
- Require: Yes
- Error Message: "Vui lòng nhập họ tên", "Họ tên không được vượt quá 100 ký tự"

**Ví dụ 2 - Số điện thoại VN:**
- Mô tả chi tiết: "Số điện thoại liên hệ của khách hàng. Gồm 10 ký tự số, bắt đầu bằng số 0"
- MaxLength: 10 ký tự
- Require: Yes
- Error Message: "Vui lòng nhập số điện thoại", "Số điện thoại phải có 10 ký tự số và bắt đầu bằng số 0"

**Ví dụ 3 - Textbox không bắt buộc:**
- Mô tả chi tiết: "Ghi chú thêm (nếu có)"
- MaxLength: 500 ký tự
- Require: No

---

## 3️⃣ Combobox / Dropdown / Select

**Nguyên tắc:** Chỉ mô tả những gì khác với mặc định

**Nguyên tắc xác định nguồn dữ liệu:**

⚠️ **BẮT BUỘC kiểm tra ERD** (nếu user cung cấp):
1. Kiểm tra ERD để tìm bảng cấu hình tương ứng với dữ liệu của Combobox
2. Nếu có bảng cấu hình trong ERD → **Chắc chắn load từ DB**
3. Suy luận điều kiện lấy dữ liệu phù hợp dựa trên:
   - Tên bảng trong ERD
   - Các trường trong bảng (trạng thái, loại, v.v.)
   - Mối quan hệ với các bảng khác

⚠️ **Nếu KHÔNG có ERD**, tự dự đoán:
- **Nếu dữ liệu có xác suất thay đổi** (Phòng ban, Chức vụ, Danh mục, v.v.) → **Nên cấu hình lấy từ DB**
- **Nếu dữ liệu ít thay đổi hoặc cố định** (Giới tính, Trạng thái đơn hàng, v.v.) → **Có thể fix cứng**

⚠️ **QUAN TRỌNG: Mô tả theo ngôn ngữ tự nhiên, KHÔNG nói trực tiếp "Load từ DB bảng X"**
- ❌ **SAI**: "Load từ DB bảng CUSTOMER với điều kiện tất cả các bản ghi đang hoạt động. Hiển thị customer_name, lưu customer_code"
- ❌ **SAI**: "Load từ DB bảng leaveType với điều kiện is_active = true. Hiển thị type_name, lưu type_code"

- ✅ **ĐÚNG**: "Lấy danh sách các tỉnh thành đang hoạt động trên hệ thống"
- ✅ **ĐÚNG**: "Lấy danh sách các kênh tiếp nhận đang hoạt động trên hệ thống, sắp xếp theo tên kênh tăng dần theo alphabet"


**Nguyên tắc:**
- Mô tả theo nghiệp vụ, dễ hiểu cho dev và stakeholder
- Không đề cập tên bảng, tên trường trong DB (CUSTOMER, leaveType v.v.)
- Không đề cập điều kiện kỹ thuật như "is_active = true", "tất cả các bản ghi đang hoạt động"
- Chỉ mô tả logic nghiệp vụ: "đang hoạt động", "sắp xếp theo tên", v.v.


c### Tóm tắt mô tả Combobox

| # | Trường thông tin | Bắt buộc / Tùy chọn | Ghi chú hướng dẫn |
|---|------------------|---------------------|-------------------|
| 1 | Ý nghĩa dữ liệu | **Bắt buộc** | Giải thích dữ liệu đại diện cho thông tin gì (mô tả trực tiếp, không cần prefix) |
| 2 | Nguồn dữ liệu | **Bắt buộc** | **Nếu Fix cứng**: Ghi rõ các giá trị. **Nếu Load từ DB**: Mô tả theo ngôn ngữ tự nhiên, không nói trực tiếp "Load từ DB bảng X", mà mô tả theo nghiệp vụ (ví dụ: "Lấy danh sách các tỉnh thành đang hoạt động trên hệ thống") |
| 3 | Thứ tự hiển thị | Tùy chọn | **Chỉ mô tả nếu có** quy tắc sắp xếp |
| 4 | Phụ thuộc dữ liệu khác | Tùy chọn | **Chỉ mô tả nếu có** ràng buộc với control khác |
| 5 | Bắt buộc chọn | Tùy chọn | **Chỉ mô tả nếu bắt buộc** - Mặc định: Không bắt buộc (không cần mô tả) |
| 6 | Giá trị mặc định | Tùy chọn | **Chỉ mô tả nếu có** - Mặc định: Không có (không cần mô tả) |
| 7 | Chọn nhiều | Tùy chọn | **Chỉ mô tả nếu chọn nhiều** - Mặc định: Chỉ chọn 1 (không cần mô tả) |
| 8 | Filter khi gõ | Tùy chọn | **Chỉ mô tả nếu cho phép** - Mặc định: Không cho phép (không cần mô tả) |
| 9 | Readonly | Tùy chọn | **Chỉ mô tả nếu Readonly** - Mặc định: Có thể chỉnh sửa (không cần mô tả) |

**MaxLength**: "—" (không áp dụng cho Combobox)

**Error Message**: Mô tả thông báo lỗi (ví dụ: "Vui lòng chọn [tên trường]") nếu bắt buộc

**Mặc định (không cần mô tả):**
- Chỉ chọn 1
- Không filter khi gõ
- Có thể chỉnh sửa
- Không bắt buộc
- Không có giá trị mặc định

**Ví dụ:**

**Ví dụ 1 - Load từ DB (có ERD):**
- Mô tả chi tiết: "Phòng ban mà nhân viên thuộc về. Lấy danh sách các phòng ban đang hoạt động trên hệ thống, sắp xếp theo tên phòng ban tăng dần theo alphabet"
- Require: Yes
- Error Message: "Vui lòng chọn phòng ban"

**Ví dụ 2 - Load từ DB (không có ERD, suy luận):**
- Mô tả chi tiết: "Chức vụ của nhân viên. Lấy danh sách các chức vụ đang hoạt động trên hệ thống, sắp xếp theo tên chức vụ tăng dần theo alphabet"
- Require: Yes

**Ví dụ 3 - Fix cứng:**
- Mô tả chi tiết: "Trạng thái đơn hàng. Các giá trị: 'Chờ xử lý', 'Đang xử lý', 'Hoàn thành', 'Đã hủy'"
- Require: Yes
- Error Message: "Vui lòng chọn trạng thái đơn hàng"

**Ví dụ 4 - Combobox với giá trị mặc định:**
- Mô tả chi tiết: "Kênh tiếp nhận ticket. Lấy danh sách các kênh tiếp nhận đang hoạt động trên hệ thống, sắp xếp theo tên kênh tăng dần theo alphabet. Mặc định: 'Tổng đài' (nếu tạo từ cuộc gọi)"
- Require: Yes


---

## 4️⃣ RadioBox List / CheckBox List

**Áp dụng tương tự như Combobox** về nguyên tắc xác định nguồn dữ liệu:
- ⚠️ **BẮT BUỘC kiểm tra ERD** (nếu user cung cấp) để xác định bảng cấu hình
- ⚠️ **Nếu KHÔNG có ERD**, tự dự đoán dựa trên logic nghiệp vụ

**Lưu ý:** 
- RadioBox List: Chỉ chọn 1
- CheckBox List: Có thể chọn nhiều

**Ví dụ:**
- RadioBox List: "Giới tính" → Chỉ chọn 1 (Nam/Nữ/Khác)
- CheckBox List: "Sở thích" → Có thể chọn nhiều (Đọc sách, Xem phim, Du lịch, ...)

---

## 5️⃣ Upload File / Upload Image

**Nội dung mô tả:**
- Định dạng file cho phép và kích thước tối đa (mặc định ≤ 5MB)

**MaxLength**: "—" (không áp dụng cho Upload)

**Error Message**: 
- "Định dạng file không hợp lệ." (nếu không đúng format)
- "Kích thước file vượt quá [X]MB." (nếu vượt quá kích thước)
- "Vui lòng tải file." (nếu bắt buộc nhưng chưa tải)

**Ví dụ:**
- Mô tả chi tiết: "Ảnh đại diện của nhân viên. Chỉ chấp nhận file .jpg, .png, .jpeg, kích thước tối đa 5MB"
- Require: Yes
- Error Message: "Vui lòng tải ảnh đại diện", "Định dạng file không hợp lệ. Chỉ chấp nhận file .jpg, .png, .jpeg", "Kích thước file vượt quá 5MB"

---

## 6️⃣ DatePicker

### Tóm tắt mô tả DatePicker

| # | Trường thông tin | Bắt buộc / Tùy chọn | Ghi chú hướng dẫn |
|---|------------------|---------------------|-------------------|
| 1 | Đánh số mô tả | **Bắt buộc** | Mọi DatePicker đều cần đánh số trong mô tả (ví dụ: "Ngày 1:", "Ngày 2:") |
| 2 | Ý nghĩa dữ liệu | **Bắt buộc** | Nêu rõ ngày thể hiện điều gì (mô tả trực tiếp, không prefix) |
| 3 | Format hiển thị | **Bắt buộc** | Ghi rõ định dạng ngày (vd: dd/mm/yyyy) |
| 4 | Ràng buộc thời gian | Tùy chọn | Mô tả nếu có quy tắc ≤, ≥, hoặc ràng buộc giữa 2 trường ngày |
| 5 | Bắt buộc nhập | Tùy chọn | **Chỉ mô tả nếu bắt buộc** - Mặc định: Không bắt buộc (không cần mô tả) |
| 6 | Readonly / Editable | Tùy chọn | **Chỉ mô tả nếu Readonly** - Mặc định: Cho phép chỉnh sửa (không cần mô tả) |

**MaxLength**: "—" (không áp dụng cho DatePicker)

**Error Message**: Mô tả thông báo lỗi (ví dụ: "Vui lòng chọn ngày", "Ngày không hợp lệ", "Ngày phải sau ngày [X]")

**Ví dụ:**
- Mô tả chi tiết: "Ngày sinh của nhân viên. Format hiển thị: dd/mm/yyyy. Ngày sinh phải trước ngày hiện tại, tuổi tối thiểu 18"
- Require: Yes
- Error Message: "Vui lòng chọn ngày sinh", "Ngày sinh không hợp lệ. Tuổi tối thiểu là 18"

---

## 7️⃣ Icon trong bảng dữ liệu

**Nội dung mô tả:**
- Khi nào icon hiển thị hoặc không hiển thị
- Mô tả chức năng của icon (xem, sửa, xóa, ...)

**Require, MaxLength**: "—" (không áp dụng cho Icon)

**Error Message**: "—" (không áp dụng cho Icon)

**Ví dụ:**
- Icon "Xem chi tiết": Hiển thị trong mọi hàng của bảng, khi click vào sẽ mở màn hình chi tiết
- Icon "Xóa": Hiển thị trong mọi hàng của bảng, chỉ enable khi nhân viên có quyền xóa, khi click vào sẽ hiển thị dialog xác nhận xóa

**Lưu ý:** Không mô tả vị trí hiển thị (ví dụ: "Chiếm toàn bộ độ rộng của form", "Luôn hiển thị ở cuối form"), chiều cao, fullWidth, resize

---

## 8️⃣ Button

**Nội dung mô tả:**
- Chức năng của button
- Khi nào button hiển thị/ẩn
- Khi nào button enable/disable

**Require, MaxLength**: "—" (không áp dụng cho Button)

**Error Message**: "—" (không áp dụng cho Button)

**Ví dụ:**
- Button "Lưu": Lưu thông tin đơn hàng mới vào hệ thống. Chỉ enable khi tất cả các trường bắt buộc đã được nhập và hợp lệ
- Button "Hủy": Hủy bỏ thao tác thêm mới, quay lại màn hình danh sách

**Lưu ý:** 
- Không mô tả "Khi nào enable" nếu luôn enable, chỉ mô tả khi có điều kiện
- Không cần chú thích từng ý như "Chức năng:", "Khi nào enable:", "Hiển thị:", v.v.
- Không mô tả vị trí hiển thị, chiều cao, fullWidth, resize

---

## 📋 Lưu ý chung

### Control nhập liệu (Textbox, Combobox, DatePicker, Upload)
- **Phải có**: Require, MaxLength (nếu áp dụng), Error Message
- **Mô tả đầy đủ**: Ý nghĩa, Format, Ràng buộc, ...

### Control hiển thị (Label, Icon, Button)
- **Chỉ mô tả**: Logic hiển thị, Readonly/Enable/Disable (nếu có)
- **Label cố định**: Không mô tả
- **Label thay đổi**: Mô tả format và điều kiện hiển thị

### Format mô tả
- **Nhiều ý/Liệt kê**: Viết trên 1 dòng với pattern `(xxx), (yyy)` và **có dấu `:` trước phần liệt kê** - Script sẽ tự động phát hiện và tạo bullet points trong Word
- **Không lặp lại**: Đã có ở cột Require, MaxLength thì không nhắc lại trong mô tả chi tiết
- **Ngôn ngữ tự nhiên**: Mô tả theo nghiệp vụ, dễ hiểu cho dev và stakeholder
- **Không chú thích**: Không cần prefix như "Độ dài:", "Format:", "Khi nào enable:", v.v.

---

**Tham khảo:** https://m2mba.com/blog/articles/huong-dan-chi-tiet-cach-mo-ta-UI-control-cho-BA
