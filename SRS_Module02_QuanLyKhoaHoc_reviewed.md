# SRS – Module 02: Quản lý Khóa học

| Trường | Nội dung |
|---|---|
| **Tên tài liệu** | SRS – Module 02: Quản lý Khóa học |
| **Phiên bản** | 1.2 |
| **Trạng thái** | FINAL – Approved for Development |

---

## Lịch sử chỉnh sửa

| Phiên bản | Ngày | Người chỉnh sửa | Mô tả thay đổi |
|---|---|---|---|
| 0.1 | …/…/2026 | BA | Khởi tạo tài liệu |
| 0.8 | …/…/2026 | BA | Gộp Cấp độ vào Khóa học |
| 1.0 | …/…/2026 | BA | Chuẩn hóa & chốt final |
| 1.1 | …/…/2026 | BA | CR01 – Bổ sung gán Syllabus & Màn hình Theo dõi Diễn biến Khóa học |
| 1.2 | …/…/2026 | BA | C02 – Bổ sung Màn hình Điểm danh học viên |

---

## 1. Tổng quan tài liệu

### 1.1. Mục đích

Tài liệu mô tả yêu cầu nghiệp vụ, chức năng, luồng xử lý và ràng buộc cho Module Quản lý Khóa học, dùng để:

- Quản lý vòng đời khóa học
- Gắn khóa học với cấp độ đào tạo và chương trình học (Syllabus)
- Theo dõi diễn biến thực tế từng buổi học theo khóa
- Quản lý điểm danh học viên theo buổi
- Quản lý giảng viên, trợ giảng, học viên theo khóa

### 1.2. Phạm vi

**In-Scope**
- Quản lý danh sách khóa học
- Sinh mã khóa học tự động
- Quản lý thông tin chi tiết khóa
- Gán Chương trình học (Syllabus) cho khóa học
- Theo dõi diễn biến thực tế từng buổi học
- Điểm danh học viên theo buổi
- Quản lý danh sách học viên theo khóa

**Out-of-Scope**
- Thu học phí
- Xếp lớp học chi tiết theo buổi
- Đánh giá kết quả học tập
- Chỉnh sửa cấu trúc Syllabus gốc (chỉ đọc & theo dõi)

### 1.3. Nguyên tắc thiết kế cốt lõi

> **Syllabus là chuẩn kế hoạch — Khóa học là thực thi thực tế.**

- Module 02 **không sửa** cấu trúc Syllabus gốc
- Module 02 chỉ: **Gán** Syllabus → **Theo dõi** tiến độ → **Cập nhật** diễn biến thực tế
- Diễn biến thực tế **không ghi ngược** vào Syllabus gốc

### 1.4. Tác nhân tham gia (Actors)

| Actor | Mô tả | Quyền |
|---|---|---|
| Admin | Quản trị hệ thống | Toàn quyền |
| Quản lý đào tạo | Quản lý khóa học | CRUD |
| Nhân viên học vụ | Theo dõi khóa, điểm danh | Xem + Cập nhật điểm danh |
| Giảng viên | Xem khóa phụ trách, điểm danh (nếu được phân quyền) | Chỉ xem + Điểm danh |
| Hệ thống | Sinh mã & validate | Tự động |

---

## 2. Flow nghiệp vụ

### 2.1. Luồng tổng quát

```
1. Người dùng truy cập Module Quản lý Khóa học
2. Xem danh sách khóa học
3. Thêm mới / Xem chi tiết / Cập nhật khóa
4. Gán Chương trình học (Syllabus)
5. Theo dõi diễn biến từng buổi học
6. Điểm danh học viên theo buổi
7. Hệ thống validate & lưu dữ liệu
```

### 2.2. Trạng thái khóa học (State Transition)

```
Khởi tạo → Đang mở → Đang học → Hoàn thành
                                ↘ Ngừng
```

| Trạng thái | Cho phép chỉnh sửa | Cho phép đổi Syllabus | Cho phép điểm danh |
|---|---|---|---|
| Khởi tạo | ✅ | ✅ | ❌ |
| Đang mở | ✅ (giới hạn) | ⚠️ WARN-205 | ❌ |
| Đang học | ⚠️ Hạn chế | ❌ | ✅ |
| Hoàn thành | ❌ | ❌ | ❌ |
| Ngừng | ❌ | ❌ | ❌ |

---

## 3. Use Case chi tiết

### UC-02.01: Xem danh sách khóa học

**Pre-Conditions**
- Người dùng đã đăng nhập

**Main Flow**

| Bước | Actor | Hành động |
|---|---|---|
| 1 | Người dùng | Truy cập Module Quản lý Khóa học |
| 2 | Hệ thống | Hiển thị danh sách khóa học |
| 3 | Người dùng | Lọc theo năm học / trạng thái / cấp độ *(optional)* |
| 4 | Hệ thống | Hiển thị danh sách kết quả |

**Post-Conditions**
- Danh sách khóa học được hiển thị

**Luồng ngoại lệ & Message Code**

| Trường hợp | Code |
|---|---|
| Không có dữ liệu | `NOTI-004` |
| Không có quyền | `ERR-001` |

**Business Rules**
- `BR-01` Người dùng chỉ xem được khóa học theo quyền của trung tâm được phân

---

### UC-02.02: Thêm mới khóa học

**Pre-Conditions**
- Người dùng có quyền tạo khóa

**Main Flow**

| Bước | Actor | Hành động |
|---|---|---|
| 1 | Người dùng | Click **[Thêm mới khóa học]** |
| 2 | Hệ thống | Hiển thị màn hình Thêm mới |
| 3 | Hệ thống | Sinh mã khóa học tự động |
| 4 | Người dùng | Nhập thông tin khóa học |
| 5 | Người dùng | Chọn Chương trình học *(xem UC-02.06)* |
| 6 | Người dùng | Click **[Lưu]** |
| 7 | Hệ thống | Validate dữ liệu đầu vào |
| 8 | Hệ thống | Lưu dữ liệu khóa học + quan hệ Syllabus |
| 9 | Hệ thống | Hiển thị `NOTI-002` |

**Post-Conditions**
- Khóa học được tạo với trạng thái **Khởi tạo**
- Khóa học được gán với Chương trình học (nếu chọn)

**Luồng ngoại lệ & Message Code**

| Trường hợp | Code |
|---|---|
| Thiếu dữ liệu bắt buộc | `ERR-002` |
| Trùng mã khóa | `ERR-004` |
| Syllabus không hợp lệ | `ERR-206` |

**Business Rules**
- `BR-02` Mã khóa học được sinh tự động, không cho phép chỉnh sửa
- `BR-03` Một khóa học chỉ thuộc một cấp độ đào tạo

---

### UC-02.03: Xem chi tiết khóa học

**Pre-Conditions**
- Khóa học tồn tại trong hệ thống

**Main Flow**

| Bước | Actor | Hành động |
|---|---|---|
| 1 | Người dùng | Click tên khóa học |
| 2 | Hệ thống | Hiển thị màn hình chi tiết khóa học |
| 3 | Người dùng | Xem / chỉnh sửa *(nếu có quyền)* |

**Post-Conditions**
- Thông tin khóa học được hiển thị đầy đủ

---

### UC-02.04: Cập nhật khóa học

**Pre-Conditions**
- Khóa học chưa hoàn thành
- Người dùng có quyền chỉnh sửa

**Main Flow**

| Bước | Actor | Hành động |
|---|---|---|
| 1 | Người dùng | Click **[Chỉnh sửa]** |
| 2 | Người dùng | Cập nhật thông tin |
| 3 | Người dùng | Click **[Lưu]** |
| 4 | Hệ thống | Validate dữ liệu |
| 5 | Hệ thống | Cập nhật dữ liệu vào CSDL |
| 6 | Hệ thống | Hiển thị `NOTI-003` |

**Post-Conditions**
- Khóa học được cập nhật thành công

**Luồng ngoại lệ & Message Code**

| Trường hợp | Code |
|---|---|
| Thiếu dữ liệu bắt buộc | `ERR-002` |
| Không có quyền | `ERR-001` |
| Khóa học đã bắt đầu | `WARN-002` |

**Business Rules**
- `BR-04` Không cho phép đổi cấp độ khi khóa học đã bắt đầu
- `BR-207` Không cho phép thay đổi Syllabus khi khóa học đã bắt đầu

---

### UC-02.05: Xem danh sách học viên theo khóa

**Pre-Conditions**
- Khóa học tồn tại

**Main Flow**

| Bước | Actor | Hành động |
|---|---|---|
| 1 | Người dùng | Click **[Xem chi tiết]** trên khóa học |
| 2 | Hệ thống | Chuyển sang màn hình Danh sách học viên |
| 3 | Hệ thống | Hiển thị danh sách học viên trong khóa |

**Post-Conditions**
- Danh sách học viên của khóa được hiển thị

---

### UC-02.06: Gán Chương trình học khi tạo / cập nhật khóa học

**Mô tả:** Cho phép người dùng chọn và gán Chương trình học (Syllabus) ngay trong quá trình Tạo mới hoặc Cập nhật Khóa học.

**Pre-Conditions**
- Chương trình học tồn tại và có trạng thái = **Hiệu lực**
- Người dùng có quyền quản lý khóa học

**Main Flow**

| Bước | Actor | Hành động |
|---|---|---|
| 1 | Người dùng | Mở màn hình Tạo mới / Cập nhật Khóa học |
| 2 | Người dùng | Tại section **Chương trình học**, chọn Dropdown *Chọn Syllabus* |
| 3 | Hệ thống | Hiển thị danh sách Syllabus: Trạng thái = Hiệu lực + phù hợp đối tượng đào tạo |
| 4 | Người dùng | Chọn 01 Syllabus |
| 5 | Người dùng | Click **[Lưu Khóa học]** |
| 6 | Hệ thống | Validate dữ liệu |
| 7 | Hệ thống | Lưu quan hệ Khóa học ↔ Chương trình học |
| 8 | Hệ thống | Hiển thị `NOTI-206` |

**Post-Conditions**
- Khóa học được gán với đúng 01 Chương trình học
- Lộ trình học được kế thừa từ Syllabus

**Luồng ngoại lệ & Message Code**

| Trường hợp | Code |
|---|---|
| Syllabus không hiệu lực | `ERR-206` |
| Khóa học đã bắt đầu | `WARN-205` |
| Không có quyền | `ERR-001` |

**Business Rules**
- `BR-206` Mỗi Khóa học chỉ được gán 01 Chương trình học
- `BR-207` Không cho thay đổi Syllabus khi Khóa học đã bắt đầu
- `BR-208` Syllabus gán phải cùng đối tượng đào tạo với Khóa học

---

### UC-02.07: Cập nhật diễn biến buổi học theo khóa

**Mô tả:** Cho phép cập nhật tình trạng thực tế của từng buổi học trong Khóa học, không ảnh hưởng đến Syllabus gốc.

**Pre-Conditions**
- Khóa học đã được gán Chương trình học
- Buổi học tồn tại trong lộ trình

**Main Flow**

| Bước | Actor | Hành động |
|---|---|---|
| 1 | Người dùng | Mở Màn hình Theo dõi Diễn biến Khóa học |
| 2 | Người dùng | Chọn một buổi học |
| 3 | Người dùng | Click **[Cập nhật]** |
| 4 | Người dùng | Nhập: Ngày thực tế / Nội dung thực tế / Trạng thái buổi |
| 5 | Người dùng | Click **[Lưu]** |
| 6 | Hệ thống | Validate dữ liệu |
| 7 | Hệ thống | Lưu dữ liệu runtime (không ghi vào Syllabus gốc) |
| 8 | Hệ thống | Hiển thị `NOTI-207` |

**Post-Conditions**
- Diễn biến buổi học được cập nhật
- Syllabus gốc không bị thay đổi

**Luồng ngoại lệ & Message Code**

| Trường hợp | Code |
|---|---|
| Buổi đã hoàn thành | `WARN-207` |
| Không có quyền | `ERR-001` |

**Business Rules**
- `BR-220` Không cho sửa buổi học đã có trạng thái Hoàn thành
- `BR-221` Buổi Huỷ không tính vào tiến độ khóa học
- `BR-222` Diễn biến khóa học không ghi ngược vào Syllabus gốc

---

### UC-02.08: Cập nhật điểm danh học viên

**Pre-Conditions**
- Buổi học tồn tại
- Học viên đã ghi danh vào khóa học
- Buổi học chưa bị khoá điểm danh

**Main Flow**

| Bước | Actor | Hành động |
|---|---|---|
| 1 | Người dùng | Mở màn hình Điểm danh |
| 2 | Hệ thống | Hiển thị Board tổng quan + danh sách học viên |
| 3 | Người dùng | Tick trạng thái điểm danh cho từng học viên |
| 4 | Người dùng | Tick Hoàn thành BTVN *(nếu có)* |
| 5 | Người dùng | Nhập ghi chú *(optional)* |
| 6 | Người dùng | Click **[Lưu]** |
| 7 | Hệ thống | Validate dữ liệu |
| 8 | Hệ thống | Lưu dữ liệu điểm danh |
| 9 | Hệ thống | Cập nhật Board tổng quan realtime |
| 10 | Hệ thống | Hiển thị `NOTI-208` |

**Post-Conditions**
- Dữ liệu điểm danh được lưu
- Board tổng quan được cập nhật realtime

**Luồng ngoại lệ & Message Code**

| Trường hợp | Code |
|---|---|
| Buổi học đã khoá | `WARN-208` |
| Học viên không thuộc khóa | `ERR-208` |
| Không có quyền | `ERR-001` |

**Business Rules**
- `BR-230` Mỗi học viên chỉ có 01 trạng thái điểm danh / buổi
- `BR-231` Buổi đã khoá không cho chỉnh sửa điểm danh
- `BR-232` Ghi chú không bắt buộc
- `BR-233` Dữ liệu điểm danh là dữ liệu thực tế của khóa, không ghi vào Syllabus

---

## 4. Mô tả màn hình & trường dữ liệu

### 4.1. Màn hình 01 – Danh sách Khóa học

| STT | Tên trường | Loại | Kiểu dữ liệu (Min; Max) | Default | Bắt buộc | Mô tả |
|---|---|---|---|---|---|---|
| 1 | Mã khóa học | Label | String (1; 50) | — | — | Sinh tự động |
| 2 | Tên khóa học | Label | String (1; 255) | — | — | Tên hiển thị |
| 3 | Cấp độ | Label | String (1; 100) | — | — | Starters, Movers… |
| 4 | Chương trình học | Label | String (1; 255) | — | — | Syllabus đã gán |
| 5 | Năm học | Label | Number (4; 4) | — | — | Ví dụ: 2025 |
| 6 | Trạng thái | Label | Enum | Khởi tạo | — | Khởi tạo / Đang mở / Đang học / Hoàn thành / Ngừng |
| 7 | Thao tác | Button | — | — | — | Xem chi tiết |

### 4.2. Màn hình 02 – Thêm mới / Cập nhật Khóa học

**Thông tin cơ bản**

| STT | Tên trường | Loại | Kiểu dữ liệu (Min; Max) | Default | Bắt buộc | Mô tả |
|---|---|---|---|---|---|---|
| 1 | Mã khóa học | Label | String (1; 50) | System | — | Read-only, sinh tự động |
| 2 | Tên khóa học | Textbox | String (1; 255) | — | ✅ | |
| 3 | Cấp độ | Dropdown | String (1; 100) | — | ✅ | Không đổi khi khóa đã bắt đầu |
| 4 | Thời lượng | Number | Number (1; 999) | — | ✅ | Số buổi học |
| 5 | Ngày khai giảng | Date | Date | — | ✅ | |
| 6 | Lịch học dự kiến | Textarea | String (0; 500) | — | ❌ | |
| 7 | GV Việt Nam | Dropdown | String (1; 100) | — | ❌ | |
| 8 | GV Nước ngoài | Dropdown | String (1; 100) | — | ❌ | |
| 9 | Trợ giảng | Dropdown | String (1; 100) | — | ❌ | |
| 10 | Trạng thái | Dropdown | Enum | Khởi tạo | ✅ | |

**Section: Chương trình học**

| STT | Tên trường | Loại | Kiểu dữ liệu (Min; Max) | Default | Bắt buộc | Mô tả |
|---|---|---|---|---|---|---|
| 1 | Chương trình học | Dropdown | String (1; 255) | — | ✅ | Danh sách Syllabus hiệu lực, cùng đối tượng đào tạo |
| 2 | Tổng số buổi | Label | Number | Auto | — | Lấy từ Syllabus, read-only |
| 3 | Số giờ / buổi | Label | Number | Auto | — | Lấy từ Syllabus, read-only |
| 4 | Thời lượng khóa | Label | Number | Auto | — | Tự tính = Tổng buổi × Giờ/buổi, read-only |

> ⚠️ Trường **Chương trình học** bị disabled khi Khóa học đã bắt đầu (`WARN-205` nếu cố thay đổi).

### 4.3. Màn hình 03 – Danh sách Học viên trong Khóa

| STT | Tên trường | Loại | Kiểu dữ liệu (Min; Max) | Default | Bắt buộc | Mô tả |
|---|---|---|---|---|---|---|
| 1 | Mã học viên | Label | String (1; 50) | — | — | |
| 2 | Tên học viên | Label | String (1; 255) | — | — | |
| 3 | Phụ huynh | Label | String (1; 255) | — | — | |
| 4 | SĐT | Label | String (10; 15) | — | — | |
| 5 | Trạng thái | Label | Enum | — | — | Trạng thái học viên trong khóa |

### 4.4. Màn hình 04 – Theo dõi Diễn biến Khóa học

**Phần 1: Thông tin tổng quan Khóa học**

| Trường | Kiểu dữ liệu | Mô tả |
|---|---|---|
| Mã khóa học | String | Read-only |
| Tên khóa học | String | Read-only |
| Chương trình học áp dụng | String | Syllabus đã gán |
| Giảng viên phụ trách | String | Read-only |
| Trạng thái khóa học | Enum | Read-only |

**Phần 2: Bảng diễn biến từng buổi học**

| STT | Tên cột | Loại | Kiểu dữ liệu | Mô tả |
|---|---|---|---|---|
| 1 | STT buổi | Label | Number | Số thứ tự buổi học |
| 2 | Ngày dự kiến | Label | Date | Theo Syllabus, read-only |
| 3 | Ngày thực tế | Datepicker | Date | Có thể chỉnh sửa |
| 4 | Giáo viên | Dropdown | String (1; 100) | Theo phân công |
| 5 | Trợ giảng | Dropdown | String (1; 100) | |
| 6 | Trạng thái | Badge | Enum | Chưa học / Đã học / Huỷ |
| 7 | Nội dung thực tế | Textarea | String (0; 1000) | Có thể khác Syllabus |
| 8 | Tài liệu | Icon / Upload | File | Upload tài liệu theo buổi |
| 9 | BTVN | Textarea | String (0; 500) | Bài tập thực tế giao |
| 10 | Ghi chú | Textarea | String (0; 500) | Nhật ký buổi học |
| 11 | Thao tác | Button | — | **[Cập nhật]** |

**Trạng thái buổi học (Enum)**

| Giá trị | Ý nghĩa | Tính vào tiến độ |
|---|---|---|
| Chưa học | Chưa diễn ra | — |
| Đã học | Đã hoàn thành | ✅ |
| Huỷ | Bị hủy | ❌ |

### 4.5. Màn hình 05 – Điểm danh học viên

**Phần 1: Board tổng quan điểm danh**

> Dữ liệu được tính theo buổi học đang chọn, cập nhật realtime.

| STT | Tên thẻ | Mô tả | Công thức |
|---|---|---|---|
| 1 | Số học viên đi học | Tổng học viên có mặt | `COUNT(Attendance = PRESENT)` |
| 2 | Số học viên nghỉ học | Tổng học viên vắng | `COUNT(Attendance = ABSENT)` |
| 3 | Tỷ lệ hoàn thành BTVN | % hoàn thành bài tập | `(HV hoàn thành BTVN / Tổng HV) × 100` |
| 4 | Tổng số học viên | Tổng học viên khóa | `COUNT(enrolled)` |

> ⚠️ `BR-224`: Học viên vắng vẫn được tính vào mẫu số khi tính tỷ lệ BTVN.

**Phần 2: Header thông tin buổi học**

| Trường | Kiểu dữ liệu | Mô tả |
|---|---|---|
| Mã khóa học | String | Auto |
| Tên khóa học | String | Auto |
| Buổi học | String | STT buổi |
| Ngày học | Date | Thực tế / Dự kiến |
| Giảng viên | String | Theo phân công |
| Trạng thái buổi | Enum | Chưa học / Đã học / Huỷ |

**Phần 3: Bảng điểm danh học viên**

| STT | Tên trường | Loại | Kiểu dữ liệu (Min; Max) | Bắt buộc | Mô tả |
|---|---|---|---|---|---|
| 1 | STT | Label | Number | — | Số thứ tự |
| 2 | Mã học viên | Label | String (1; 50) | — | Auto |
| 3 | Tên học viên | Label | String (1; 150) | — | Auto |
| 4 | Trạng thái điểm danh | Checkbox / Radio | Enum | ✅ | Có mặt / Vắng |
| 5 | Hoàn thành BTVN | Checkbox | Boolean | ❌ | Đánh dấu độc lập với trạng thái đi học |
| 6 | Ghi chú | Textarea | String (0; 500) | ❌ | Ghi chú riêng cho từng học viên |
| 7 | Cập nhật bởi | Label | String | — | Tên người dùng |
| 8 | Thời gian cập nhật | Label | Datetime | — | System timestamp |

**Trạng thái điểm danh (Enum)**

| Giá trị | Ý nghĩa |
|---|---|
| `PRESENT` | Có mặt |
| `ABSENT` | Vắng |

**Hành vi thao tác**
- Cho phép cập nhật inline trực tiếp trên bảng
- Tick **Hoàn thành BTVN** độc lập với trạng thái điểm danh
- Ghi chú riêng cho từng học viên

---

## 5. Business Rules – Tổng hợp

| BR | Mô tả |
|---|---|
| `BR-01` | Người dùng chỉ xem được khóa học theo quyền được phân |
| `BR-02` | Mã khóa học được sinh tự động, không cho phép chỉnh sửa |
| `BR-03` | Một khóa học chỉ thuộc một cấp độ đào tạo |
| `BR-04` | Không cho phép đổi cấp độ khi khóa học đã bắt đầu |
| `BR-206` | Mỗi Khóa học chỉ được gán 01 Chương trình học |
| `BR-207` | Không cho thay đổi Syllabus khi Khóa học đã bắt đầu |
| `BR-208` | Syllabus gán phải cùng đối tượng đào tạo với Khóa học |
| `BR-220` | Không cho sửa buổi học đã có trạng thái Hoàn thành |
| `BR-221` | Buổi Huỷ không tính vào tiến độ khóa học |
| `BR-222` | Diễn biến khóa học không ghi ngược vào Syllabus gốc |
| `BR-223` | Tỷ lệ hoàn thành BTVN = (HV hoàn thành / Tổng HV) × 100 |
| `BR-224` | Học viên vắng vẫn tính vào mẫu số khi tính tỷ lệ BTVN |
| `BR-230` | Mỗi học viên chỉ có 01 trạng thái điểm danh / buổi |
| `BR-231` | Buổi đã khoá không cho chỉnh sửa điểm danh |
| `BR-232` | Ghi chú điểm danh không bắt buộc |
| `BR-233` | Dữ liệu điểm danh là dữ liệu thực tế, không ghi vào Syllabus |

---

## 6. Acceptance Criteria

| ID | Mô tả | Given – When – Then |
|---|---|---|
| `AC-01` | Mã khóa học sinh đúng format | **Given** người dùng tạo khóa mới / **When** click Lưu / **Then** mã khóa được sinh tự động theo format quy định |
| `AC-02` | Không cho sửa mã khóa | **Given** khóa học đã tồn tại / **When** người dùng cố sửa mã / **Then** trường Mã khóa là read-only, không thể nhập |
| `AC-03` | Không cho đổi cấp độ khi khóa đang học | **Given** khóa ở trạng thái Đang học / **When** người dùng cố đổi cấp độ / **Then** hệ thống hiển thị `WARN-002`, không cho lưu |
| `AC-04` | Không cho đổi Syllabus khi khóa đã bắt đầu | **Given** khóa ở trạng thái Đang mở / Đang học / **When** người dùng cố đổi Syllabus / **Then** hệ thống hiển thị `WARN-205` |
| `AC-05` | Syllabus phải cùng đối tượng đào tạo | **Given** người dùng chọn Syllabus khác đối tượng / **When** click Lưu / **Then** hệ thống hiển thị `ERR-206` |
| `AC-06` | Diễn biến không ghi vào Syllabus gốc | **Given** người dùng cập nhật nội dung buổi thực tế / **When** lưu diễn biến / **Then** Syllabus gốc không thay đổi |
| `AC-07` | Board điểm danh cập nhật realtime | **Given** người dùng tick điểm danh / **When** lưu / **Then** Board tổng quan cập nhật ngay, không cần F5 |
| `AC-08` | Buổi khoá không cho chỉnh sửa điểm danh | **Given** buổi học đã khoá / **When** người dùng cố cập nhật / **Then** hệ thống hiển thị `WARN-208` |

---

## 7. Constraints

- Áp dụng Message Code thống nhất toàn hệ thống
- Không xóa cứng khóa học — chỉ ngừng hiệu lực
- Phải liên kết danh mục cấp độ từ Module 01
- Module 02 không sửa cấu trúc Syllabus gốc — chỉ đọc và theo dõi
- Dữ liệu điểm danh là dữ liệu thực tế — không ghi ngược vào Syllabus

---

## 8. Message Catalog

### 8.1. Error Messages

| Code | Nội dung |
|---|---|
| `ERR-001` | Bạn không có quyền thực hiện thao tác này |
| `ERR-002` | Thiếu thông tin bắt buộc |
| `ERR-004` | Mã khóa học đã tồn tại trong hệ thống |
| `ERR-206` | Chương trình học không hợp lệ hoặc không cùng đối tượng đào tạo |
| `ERR-208` | Học viên không thuộc khóa học này |

### 8.2. Notification Messages

| Code | Nội dung |
|---|---|
| `NOTI-002` | Thêm mới khóa học thành công |
| `NOTI-003` | Cập nhật khóa học thành công |
| `NOTI-004` | Không có dữ liệu phù hợp |
| `NOTI-206` | Gán chương trình học cho khóa học thành công |
| `NOTI-207` | Cập nhật diễn biến buổi học thành công |
| `NOTI-208` | Cập nhật điểm danh thành công |

### 8.3. Warning Messages

| Code | Nội dung |
|---|---|
| `WARN-002` | Khóa học đã bắt đầu, hạn chế chỉnh sửa |
| `WARN-205` | Khóa học đã bắt đầu, không thể đổi chương trình học |
| `WARN-207` | Buổi học đã hoàn thành, không thể chỉnh sửa |
| `WARN-208` | Buổi học đã khoá điểm danh, không thể chỉnh sửa |

---

## 9. Sign-off

| Vai trò | Họ tên | Ký | Ngày |
|---|---|---|---|
| Business Owner | | | |
| BA | | | |
| Tech Lead | | | |

---

---

## Review & Nhận xét

> Phần này tổng hợp các góp ý sau khi review toàn bộ SRS Module 02 (bao gồm v1.0, CR01 v1.1 và C02). Mục tiêu đảm bảo tài liệu đủ chất lượng để Dev và QA không cần hỏi lại BA.

---

### ✅ Điểm tốt

- Nguyên tắc **"Syllabus = kế hoạch / Khóa học = thực thi"** được phát biểu rõ ràng — tránh nhầm lẫn khi thiết kế DB
- Business Rules đánh số nhất quán và có mã riêng (`BR-xxx`) — dễ truy vết
- Board điểm danh cung cấp đủ 4 chỉ số cần thiết cho quản lý tức thì
- Tách bạch rõ Điểm danh ↔ BTVN là hai trường độc lập — thiết kế đúng nghiệp vụ
- CR01 và C02 được tổ chức theo từng change request — dễ theo dõi lịch sử thay đổi

---

### 🔴 Vấn đề cần xử lý trước khi Dev bắt đầu

#### 1. Thiếu UC xử lý khi Khóa học chưa có Syllabus

`BR-206` yêu cầu mỗi Khóa học chỉ gán 01 Syllabus, nhưng tài liệu không làm rõ:

- Khóa học có **bắt buộc** phải gán Syllabus trước khi chuyển sang trạng thái **Đang mở** không?
- Nếu không gán Syllabus, có cho phép điểm danh không? (Màn hình 05 phụ thuộc vào Syllabus để sinh danh sách buổi)

**Gợi ý bổ sung Business Rule:**
```
BR-209: Khóa học phải gán Syllabus trước khi chuyển sang trạng thái
        "Đang mở". Nếu chưa gán → ERR-209.
```

#### 2. Chưa định nghĩa format Mã khóa học

`BR-02` nêu "mã khóa sinh tự động" nhưng không có format cụ thể. Dev sẽ tự đặt format nếu không có đặc tả — dẫn đến không nhất quán.

**Cần bổ sung:** Format, ví dụ: `[CẤP ĐỘ]-[NĂM]-[SEQ]` → `KET-2026-001`

#### 3. Màn hình 05 thiếu cơ chế "Khoá điểm danh"

`BR-231` nêu "Buổi đã khoá không cho chỉnh sửa" nhưng không có UC mô tả **ai khoá, khi nào khoá, và khoá bằng cách nào**.

**Gợi ý bổ sung UC-02.09:**
```
UC-02.09: Khoá điểm danh buổi học
Actor: Admin, Nhân viên học vụ
Trigger: Khi buổi học đã kết thúc và điểm danh đã đầy đủ
```

#### 4. Trường "Thời lượng" ở Màn hình 02 bị xung đột

Màn hình 02 có trường **Thời lượng (Số buổi)** do người dùng nhập (`Number, bắt buộc`), nhưng sau CR01, **Tổng số buổi** lại được lấy tự động từ Syllabus.

→ Hai trường này **mâu thuẫn**. Cần làm rõ:
- Nếu đã gán Syllabus → **Tổng số buổi** từ Syllabus, trường Thời lượng bị ẩn hoặc disabled
- Nếu chưa gán Syllabus → người dùng tự nhập Thời lượng

#### 5. BR-223 và BR-224 đánh số trùng với diễn biến (BR-221, BR-222)

Trong tài liệu gốc:
- `BR-221`: *Buổi Huỷ không tính vào tiến độ* (UC-02.07)
- `BR-221`: *Số HV đi học = COUNT(PRESENT)* (Board điểm danh)

→ **Trùng số BR**. Cần đánh lại số cho nhất quán. Tài liệu đã được chỉnh sửa trong phần trên (dùng `BR-223`, `BR-224` cho board điểm danh).

#### 6. Acceptance Criteria gốc chỉ có 3 AC, quá ít

v1.0 chỉ có AC-01 đến AC-03. Sau CR01 và C02 bổ sung nhiều UC mới nhưng không có AC tương ứng. Phần này đã được bổ sung lên 8 AC trong tài liệu trên — cần BA xác nhận lại trước khi QA dùng.

---

### 🟡 Góp ý bổ sung (Nice to have)

- **Bổ sung UC Export danh sách điểm danh** ra Excel/PDF — nghiệp vụ thường gặp ở trung tâm, cần xác nhận có in-scope không
- **Làm rõ quyền Giảng viên** trong điểm danh: Giảng viên có thể tự điểm danh không hay phải qua Nhân viên học vụ duyệt?
- **Bổ sung Data Model tối thiểu** cho bảng `KhoaHoc`, `DienBienBuoiHoc`, `DiemDanh` — giúp Dev backend tránh thiết kế lại
- **Màn hình 04** nên ghi rõ số màn hình chính thức thay vì `5.X. Màn hình XX` như trong tài liệu gốc

---

### 📋 Tổng kết

| Hạng mục | Đánh giá |
|---|---|
| Cấu trúc tài liệu | ✅ Đầy đủ, hợp nhất 3 phần thành 1 tài liệu mạch lạc |
| Use Cases | ✅ Đủ 8 UC, luồng rõ ràng |
| Business Rules | ⚠️ Trùng số BR-221/BR-222 (đã fix trong file này) |
| Field Specification | ⚠️ Xung đột trường Thời lượng vs Tổng buổi từ Syllabus |
| Acceptance Criteria | ⚠️ Bổ sung từ 3 lên 8 AC — cần BA xác nhận |
| Message Catalog | ✅ Đầy đủ, nhất quán |
| Syllabus chưa gán | 🔴 Chưa có BR và UC xử lý tình huống này |
| Khoá điểm danh | 🔴 Chưa có UC mô tả cơ chế khoá |
| Format Mã khóa | 🔴 Chưa định nghĩa format cụ thể |

---

*SRS Module 02 – Quản lý Khóa học · v1.2 · Phần mềm Quản lý Đào tạo Trung tâm Tiếng Anh*
