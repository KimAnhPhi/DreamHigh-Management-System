# SRS – Module 01: Quản lý Danh mục

| Trường | Nội dung |
|---|---|
| **Tên tài liệu** | SRS – Module 01: Quản lý Danh mục |
| **Phiên bản** | 1.0 |
| **Trạng thái** | FINAL – Approved for Development |

---

## Lịch sử chỉnh sửa

| Phiên bản | Ngày | Người chỉnh sửa | Mô tả thay đổi |
|---|---|---|---|
| 0.1 | …/…/2026 | BA | Khởi tạo tài liệu |
| 0.9 | …/…/2026 | BA | Bổ sung UC, Message Code |
| 1.0 | …/…/2026 | BA | Chuẩn hóa & chốt final để Dev triển khai |

---

## 1. Tổng quan tài liệu

### 1.1. Mục đích

Tài liệu này mô tả đầy đủ yêu cầu chức năng, nghiệp vụ, ràng buộc và thông báo hệ thống của Module Quản lý Danh mục trong Phần mềm Quản lý Đào tạo Trung tâm Tiếng Anh.

Module này đóng vai trò **Master Data**, cung cấp dữ liệu nền cho tất cả các module nghiệp vụ khác.

### 1.2. Phạm vi

**In-Scope**
- Quản lý danh mục dùng chung (CRUD logic)
- Áp dụng cho toàn bộ hệ thống
- Áp dụng chuẩn Message Code (`ERR` / `WARN` / `NOTI`)

**Out-of-Scope**
- Không quản lý dữ liệu nghiệp vụ phát sinh
- Không xóa cứng danh mục đã sử dụng
- Không quản lý phân quyền chi tiết theo từng bản ghi

### 1.3. Tác nhân tham gia (Actors)

| Actor | Mô tả | Quyền |
|---|---|---|
| Admin hệ thống | Quản trị hệ thống | CRUD toàn bộ |
| Quản lý trung tâm | Quản lý dữ liệu nền | Thêm / Sửa / Ngừng |
| Nhân viên học vụ | Sử dụng dữ liệu | Chỉ xem |
| Hệ thống | Kiểm tra & ghi log | Tự động |

---

## 2. Flow nghiệp vụ

### 2.1. Luồng tổng quát

```
1. Người dùng truy cập Module Quản lý Danh mục
2. Xem danh sách danh mục
3. Thêm mới / Xem chi tiết / Cập nhật / Ngừng hiệu lực
4. Hệ thống kiểm tra Business Rules
5. Hệ thống lưu dữ liệu và trả về Message Code
```

### 2.2. Trạng thái danh mục (State Transition)

```
Hiệu lực  →  Ngừng hiệu lực
```

> ⚠️ **Không cho phép xóa cứng danh mục đã phát sinh dữ liệu.**

---

## 3. Use Case chi tiết

### UC-01: Xem danh sách danh mục

**Pre-Conditions**
- Người dùng đã đăng nhập

**Main Flow**

| Bước | Actor | Hành động |
|---|---|---|
| 1 | Người dùng | Truy cập Module Quản lý Danh mục |
| 2 | Hệ thống | Kiểm tra quyền truy cập |
| 3 | Hệ thống | Tải danh sách danh mục |
| 4 | Người dùng | Tìm kiếm / lọc dữ liệu *(optional)* |
| 5 | Hệ thống | Hiển thị danh sách kết quả |

**Post-Conditions**
- Danh sách danh mục được hiển thị

**Luồng ngoại lệ & Message Code**

| Trường hợp | Code |
|---|---|
| Không có dữ liệu | `NOTI-004` |
| Không có quyền | `ERR-001` |

**Business Rules**
- `BR-01` Người dùng chỉ xem được danh mục theo quyền được phân

---

### UC-02: Thêm mới danh mục

**Pre-Conditions**
- Người dùng có quyền thêm mới

**Main Flow**

| Bước | Actor | Hành động |
|---|---|---|
| 1 | Người dùng | Click **[Thêm mới]** |
| 2 | Hệ thống | Hiển thị màn hình Thêm mới danh mục |
| 3 | Người dùng | Nhập thông tin danh mục |
| 4 | Người dùng | Click **[Lưu]** |
| 5 | Hệ thống | Validate dữ liệu đầu vào |
| 6 | Hệ thống | Lưu danh mục vào CSDL |
| 7 | Hệ thống | Hiển thị `NOTI-002` |

**Post-Conditions**
- Danh mục được tạo với trạng thái **Hiệu lực**

**Luồng ngoại lệ & Message Code**

| Trường hợp | Code |
|---|---|
| Thiếu dữ liệu bắt buộc | `ERR-002` |
| Trùng mã danh mục | `ERR-004` |

**Business Rules**
- `BR-02` Mã danh mục phải là duy nhất trong toàn hệ thống
- `BR-03` Không cho phép chỉnh sửa mã danh mục sau khi đã tạo

---

### UC-03: Cập nhật danh mục

**Pre-Conditions**
- Danh mục tồn tại trong hệ thống
- Người dùng có quyền chỉnh sửa

**Main Flow**

| Bước | Actor | Hành động |
|---|---|---|
| 1 | Người dùng | Chọn danh mục cần cập nhật |
| 2 | Người dùng | Click **[Xem chi tiết]** |
| 3 | Người dùng | Click **[Chỉnh sửa]** |
| 4 | Người dùng | Cập nhật thông tin |
| 5 | Người dùng | Click **[Lưu]** |
| 6 | Hệ thống | Cập nhật dữ liệu vào CSDL |
| 7 | Hệ thống | Hiển thị `NOTI-003` |

**Post-Conditions**
- Danh mục được cập nhật thành công

**Luồng ngoại lệ & Message Code**

| Trường hợp | Code |
|---|---|
| Không có quyền | `ERR-001` |

**Business Rules**
- `BR-04` Không cho phép chỉnh sửa danh mục đã ngừng hiệu lực, trừ khi người dùng có quyền Admin

---

### UC-04: Ngừng hiệu lực danh mục

**Pre-Conditions**
- Danh mục tồn tại trong hệ thống

**Main Flow**

| Bước | Actor | Hành động |
|---|---|---|
| 1 | Người dùng | Click **[Ngừng hiệu lực]** |
| 2 | Hệ thống | Hiển thị popup xác nhận |
| 3 | Người dùng | Xác nhận hành động |
| 4 | Hệ thống | Cập nhật trạng thái danh mục |
| 5 | Hệ thống | Hiển thị `NOTI-005` |

**Post-Conditions**
- Danh mục chuyển sang trạng thái **Ngừng hiệu lực**

**Luồng ngoại lệ & Message Code**

| Trường hợp | Code |
|---|---|
| Danh mục đã phát sinh dữ liệu | `WARN-001` |

**Business Rules**
- `BR-05` Không cho phép xóa cứng danh mục đã phát sinh dữ liệu nghiệp vụ

---

## 4. Mô tả màn hình & trường dữ liệu

### 4.1. Màn hình 01 – Danh sách danh mục

| STT | Tên trường | Loại trường | Kiểu dữ liệu (Min; Max) | Default | Bắt buộc | Mô tả |
|---|---|---|---|---|---|---|
| 1 | Mã danh mục | Label | String (1; 50) | — | — | Định danh danh mục |
| 2 | Tên danh mục | Label | String (1; 255) | — | — | Tên hiển thị |
| 3 | Loại danh mục | Label | String (1; 100) | — | — | Nhóm danh mục |
| 4 | Trạng thái | Label | Enum | Hiệu lực | — | Hiệu lực / Ngừng hiệu lực |
| 5 | Thao tác | Button | — | — | — | Xem chi tiết |

### 4.2. Màn hình 02 – Thêm mới danh mục

| STT | Tên trường | Loại trường | Kiểu dữ liệu (Min; Max) | Default | Bắt buộc | Mô tả |
|---|---|---|---|---|---|---|
| 1 | Mã danh mục | Textbox | String (1; 50) | — | ✅ | Không trùng, không sửa sau khi tạo |
| 2 | Tên danh mục | Textbox | String (1; 255) | — | ✅ | Tên danh mục |
| 3 | Loại danh mục | Dropdown | String (1; 100) | — | ✅ | Chọn từ danh mục loại |
| 4 | Mô tả | Textarea | String (0; 500) | — | ❌ | Ghi chú |
| 5 | Trạng thái | Dropdown | Enum | Hiệu lực | ✅ | Trạng thái danh mục |

### 4.3. Màn hình 03 – Xem chi tiết / Chỉnh sửa danh mục

| STT | Tên trường | Loại trường | Kiểu dữ liệu (Min; Max) | Default | Bắt buộc | Mô tả |
|---|---|---|---|---|---|---|
| 1 | Mã danh mục | Label | String (1; 50) | — | — | Read-only |
| 2 | Tên danh mục | Textbox | String (1; 255) | — | ✅ | Cho phép chỉnh sửa |
| 3 | Loại danh mục | Dropdown | String (1; 100) | — | ✅ | Không đổi nếu đã phát sinh dữ liệu |
| 4 | Mô tả | Textarea | String (0; 500) | — | ❌ | Ghi chú |
| 5 | Trạng thái | Dropdown | Enum | Hiệu lực | ✅ | Hiệu lực / Ngừng hiệu lực |
| 6 | Ngày tạo | Label | DateTime | System | — | Read-only |
| 7 | Người tạo | Label | String (1; 100) | System | — | Read-only |
| 8 | Ngày cập nhật | Label | DateTime | System | — | Read-only |
| 9 | Người cập nhật | Label | String (1; 100) | System | — | Read-only |

---

## 5. Acceptance Criteria

| ID | Mô tả |
|---|---|
| `AC-01` | Không cho tạo danh mục trùng mã |
| `AC-02` | Không cho xóa cứng danh mục dù ở bất kỳ trạng thái nào |
| `AC-03` | Hệ thống hiển thị đúng Message Code theo từng tình huống |

---

## 6. Constraints

- Áp dụng cho toàn bộ hệ thống, không giới hạn module
- Không xóa dữ liệu đã phát sinh nghiệp vụ
- Message Code dùng chung toàn hệ thống — không định nghĩa riêng theo module

---

## 7. Message Catalog

### 7.1. Error Messages

| Code | Nội dung |
|---|---|
| `ERR-001` | Không có quyền thực hiện thao tác này |
| `ERR-002` | Thiếu thông tin bắt buộc |
| `ERR-004` | Mã danh mục đã tồn tại trong hệ thống |

### 7.2. Notification Messages

| Code | Nội dung |
|---|---|
| `NOTI-002` | Thêm mới danh mục thành công |
| `NOTI-003` | Cập nhật danh mục thành công |
| `NOTI-004` | Không có dữ liệu phù hợp |
| `NOTI-005` | Ngừng hiệu lực danh mục thành công |

### 7.3. Warning Messages

| Code | Nội dung |
|---|---|
| `WARN-001` | Danh mục đã phát sinh dữ liệu — không thể xóa cứng |

---

## 8. Sign-off

| Vai trò | Họ tên | Ký | Ngày |
|---|---|---|---|
| Business Owner | | | |
| BA | | | |
| Tech Lead | | | |

---

---

## Review & Nhận xét

> Phần này tổng hợp các góp ý kỹ thuật sau khi đọc toàn bộ SRS Module 01. Mục tiêu là đảm bảo tài liệu đủ chất lượng để Dev và QA triển khai mà không cần hỏi lại BA.

---

### ✅ Điểm tốt

- Cấu trúc tài liệu đúng chuẩn SRS: có UC, Business Rules, Message Code, Field Spec, AC
- Phân tách rõ 3 loại message: `ERR` / `WARN` / `NOTI` — nhất quán và dễ tham chiếu
- State Transition đơn giản, rõ ràng: chỉ có 2 trạng thái, một chiều
- Business Rule `BR-03` (không sửa mã sau khi tạo) và `BR-05` (không xóa cứng) là các ràng buộc quan trọng, được ghi rõ
- Bảng field spec đầy đủ Min/Max, Default, Bắt buộc — dev có thể dùng trực tiếp để build form validation

---

### 🔴 Vấn đề cần bổ sung hoặc làm rõ

#### 1. Message Code bị thiếu `ERR-003`

Catalog hiện có `ERR-001`, `ERR-002`, `ERR-004` — **bỏ qua `ERR-003`**. Nếu đây là dải mã dùng chung toàn hệ thống, cần giải thích `ERR-003` là gì hoặc ghi chú rõ "reserved / dùng ở module khác". Nếu để trống mà không giải thích, Dev và QA sẽ bị nhầm lẫn.

#### 2. `WARN-001` chưa mô tả hành vi tiếp theo

> *"Danh mục đã phát sinh dữ liệu"*

Khi hiển thị `WARN-001`, hệ thống làm gì tiếp? Có 2 kịch bản cần làm rõ:

- **Kịch bản A:** Chặn hoàn toàn — người dùng không thể ngừng hiệu lực
- **Kịch bản B:** Cảnh báo nhưng vẫn cho phép tiếp tục (nếu có quyền)

Hiện tại UC-04 không làm rõ điều này. Dev sẽ không biết nên block hay allow.

**Gợi ý bổ sung vào UC-04:**

```
Nếu WARN-001:
  - Actor = Admin → hiển thị WARN-001 + cho phép xác nhận tiếp tục
  - Actor ≠ Admin → hiển thị WARN-001 + block, không cho thực hiện
```

#### 3. UC-03 thiếu validate khi lưu

UC-02 (Thêm mới) có bước validate rõ ràng ở Bước 5. UC-03 (Cập nhật) **không có bước validate** — nhảy thẳng từ Click [Lưu] → Cập nhật CSDL. Cần bổ sung bước validate tương tự và luồng ngoại lệ `ERR-002` (thiếu thông tin bắt buộc).

#### 4. Màn hình 03 thiếu nút hành động

Bảng field spec Màn hình 03 mô tả các trường dữ liệu nhưng **không liệt kê các button**: [Chỉnh sửa], [Lưu], [Hủy], [Ngừng hiệu lực]. Dev cần biết button nào hiển thị, khi nào ẩn/hiện, khi nào disabled.

**Gợi ý bổ sung:**

| Nút | Hiển thị khi | Disabled khi |
|---|---|---|
| [Chỉnh sửa] | Đang ở chế độ xem | Danh mục đã Ngừng hiệu lực (với non-Admin) |
| [Lưu] | Đang ở chế độ chỉnh sửa | Không có thay đổi |
| [Hủy] | Đang ở chế độ chỉnh sửa | — |
| [Ngừng hiệu lực] | Trạng thái = Hiệu lực | — |

#### 5. Loại danh mục (Dropdown) chưa định nghĩa nguồn dữ liệu

Màn hình 02 và 03 có trường **Loại danh mục** là Dropdown, nhưng tài liệu không nêu:

- Danh sách giá trị lấy từ đâu? (hardcode, hay từ bảng khác trong DB?)
- Ai quản lý danh sách loại danh mục đó?
- Nếu cũng là danh mục — đây có phải danh mục cấp cha không?

Nếu "Loại danh mục" là một danh mục khác trong chính module này, cần mô tả cấu trúc phân cấp (parent-child) rõ ràng hơn.

#### 6. Acceptance Criteria quá ngắn, chưa đủ để QA viết test case

`AC-01`, `AC-02`, `AC-03` chỉ mô tả ở mức rất cao. QA không thể viết test case từ đây. Cần mở rộng theo format **Given – When – Then**:

**Ví dụ mở rộng AC-01:**

```
Given: Hệ thống đã có danh mục với mã "KID-001"
When:  Người dùng thêm mới danh mục với mã "KID-001"
Then:  Hệ thống hiển thị ERR-004, không lưu bản ghi mới
```

#### 7. Không có yêu cầu phi chức năng (Non-Functional Requirements)

SRS thiếu hoàn toàn phần NFR. Dù là module Master Data nhưng vẫn cần tối thiểu:

| NFR | Yêu cầu gợi ý |
|---|---|
| Hiệu năng | Danh sách danh mục tải trong < 2 giây với ≤ 1.000 bản ghi |
| Audit Log | Mọi thao tác tạo/sửa/ngừng phải được ghi log (ai, khi nào, thay đổi gì) |
| Phân trang | Danh sách cần phân trang nếu > N bản ghi (cần định nghĩa N) |
| Tìm kiếm | Tìm kiếm theo mã, tên — có phân biệt hoa thường không? |

---

### 🟡 Góp ý bổ sung (Nice to have)

- **Bổ sung UC-05: Import danh mục từ Excel** — Module BRD đề cập tính năng này nhưng SRS không có UC tương ứng. Nếu đây là in-scope, cần bổ sung đầy đủ.
- **Bổ sung UC-06: Export danh mục ra Excel** — tương tự.
- **Thêm màn hình mockup hoặc wireframe** (dù đơn giản) giúp Dev và QA căn chỉnh kỳ vọng về UI nhanh hơn.
- **Mô tả cấu trúc dữ liệu (Data Model)** tối thiểu cho bảng `DanhMuc` — giúp Dev backend thiết kế schema đúng ngay từ đầu.

---

### 📋 Tổng kết

| Hạng mục | Đánh giá |
|---|---|
| Cấu trúc SRS | ✅ Đúng chuẩn, đầy đủ các phần cơ bản |
| Use Case & Business Rules | ✅ Rõ ràng, dễ hiểu |
| Message Code | ⚠️ Thiếu `ERR-003`, `WARN-001` chưa mô tả hành vi |
| Field Specification | ⚠️ Thiếu button spec ở Màn hình 03 |
| Acceptance Criteria | 🔴 Quá ngắn, chưa đủ cho QA viết test case |
| Non-Functional Requirements | 🔴 Hoàn toàn thiếu |
| Import / Export Excel | 🔴 BRD đề cập nhưng SRS không có UC |
| Nguồn dữ liệu Dropdown | ⚠️ Chưa được định nghĩa |

**Khuyến nghị trước khi Dev bắt đầu:** Giải quyết các mục 🔴 (AC, NFR, Import/Export UC) và làm rõ hành vi `WARN-001` để tránh phát sinh yêu cầu bổ sung giữa chừng.

---

*SRS Module 01 – Quản lý Danh mục · v1.0 · Phần mềm Quản lý Đào tạo Trung tâm Tiếng Anh*
