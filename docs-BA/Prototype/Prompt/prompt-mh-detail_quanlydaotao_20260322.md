### MH 01: Danh sách danh mục

#### Mục đích & nhu cầu (nghiệp vụ)
- Người dùng cần xem danh sách danh mục hiện có trên hệ thống, phân loại theo trạng thái (Hiệu lực / Ngừng hiệu lực) và loại danh mục.
- Ràng buộc / quy tắc nghiệp vụ: Chỉ hiển thị các danh mục theo quyền được phân của người dùng. Không có dữ liệu thì báo "Không có dữ liệu phù hợp".
- **Phạm vi đầu ra (bắt buộc):** Chỉ thiết kế **nội dung MH chi tiết** (vùng chức năng của màn này). **Không** bao gồm menu điều hướng, sidebar app, top bar toàn app, header shell ứng dụng hay khung layout bao ngoài chỉ để điều hướng giữa các module.

#### Phạm vi dữ liệu (từ ERD)
| Field | Kiểu / mô tả | PK/FK | Ràng buộc (nullable, enum, format nghiệp vụ) |
|---|---|---|---|
| Mã danh mục | String (1-50) | PK | Định danh duy nhất toàn hệ thống |
| Tên danh mục | String (1-255) | | |
| Loại danh mục | String (1-100) | FK | Chọn từ danh sách phân loại (Nhóm danh mục) |
| Trạng thái | Enum | | "Hiệu lực" hoặc "Ngừng hiệu lực", Mặc định: Hiệu lực |
| Thao tác | Hành động | | Cho phép điều hướng "Xem chi tiết" theo từng bản ghi |

#### Luồng hành vi mong muốn (nghiệp vụ, không mô tả UI)
| Bước / sự kiện | Kết quả nghiệp vụ mong đợi |
|---|---|
| Mở màn hình | Hiển thị danh sách kết quả danh mục |
| Tìm kiếm / Lọc | Theo mã, tên, trạng thái danh mục |
| Nhấp "Thêm mới" | Di chuyển sang màn hình Thêm mới danh mục |
| Nhấp "Xem chi tiết" bản ghi | Di chuyển sang màn hình Xem chi tiết của bản ghi tương ứng |

#### Giao cho công cụ [AI_TOOL]
Thiết kế giao diện màn hình **Danh sách danh mục** cho ứng dụng **Quản lý Đào tạo** đáp ứng **mục đích & nhu cầu** và **dữ liệu** trên. **Chỉ xuất ra nội dung màn hình chi tiết** (khu vực chức năng của MH này); **không** tạo menu điều hướng, sidebar, top bar toàn app hay bất kỳ chrome điều hướng nào ngoài phạm vi MH. **Không có ràng buộc design style khác trong prompt này** — bạn tự chọn bố cục nội dung trong vùng MH, thành phần giao diện, màu sắc và trạng thái tương tác phù hợp.

---

### MH 02: Thêm mới danh mục

#### Mục đích & nhu cầu (nghiệp vụ)
- Người dùng cần thêm mới một danh mục vào hệ thống.
- Ràng buộc / quy tắc nghiệp vụ: 
  - Mã danh mục phải là duy nhất. Khóa không cho phép sửa mã sau khi tạo thành công. 
  - Các trường bắt buộc phải được nhập đủ. Báo lỗi khi thiếu dữ liệu hoặc trùng mã. 
  - Tạo thành công danh mục có trạng thái mặc định là "Hiệu lực".
- **Phạm vi đầu ra (bắt buộc):** Chỉ thiết kế **nội dung MH chi tiết** (vùng chức năng của màn này). **Không** bao gồm menu điều hướng, sidebar app, top bar toàn app, header shell ứng dụng hay khung layout bao ngoài chỉ để điều hướng giữa các module.

#### Phạm vi dữ liệu (từ ERD)
| Field | Kiểu / mô tả | PK/FK | Ràng buộc (nullable, enum, format nghiệp vụ) |
|---|---|---|---|
| Mã danh mục | String (1-50) | PK | Bắt buộc nhập, không trùng lặp |
| Tên danh mục | String (1-255) | | Bắt buộc nhập |
| Loại danh mục | String (1-100) | FK | Bắt buộc nhập, chọn từ danh mục loại |
| Mô tả | String (0-500) | | Tùy chọn, ghi chú thêm |
| Trạng thái | Enum | | Bắt buộc, Mặc định: Hiệu lực |

#### Luồng hành vi mong muốn (nghiệp vụ, không mô tả UI)
| Bước / sự kiện | Kết quả nghiệp vụ mong đợi |
|---|---|
| Nhập thông tin và click Lưu | Hệ thống validate -> Thêm mới thành công vào DB và hiển thị thông báo "Thêm mới thành công" |
| Thiếu trường bắt buộc | Hệ thống chặn Lưu, hiển thị báo lỗi thiếu thông tin |
| Trùng mã danh mục | Hệ thống chặn Lưu, hiển thị báo lỗi trùng mã |

#### Giao cho công cụ [AI_TOOL]
Thiết kế giao diện màn hình **Thêm mới danh mục** cho ứng dụng **Quản lý Đào tạo** đáp ứng **mục đích & nhu cầu** và **dữ liệu** trên. **Chỉ xuất ra nội dung màn hình chi tiết** (khu vực chức năng của MH này); **không** tạo menu điều hướng, sidebar, top bar toàn app hay bất kỳ chrome điều hướng nào ngoài phạm vi MH. **Không có ràng buộc design style khác trong prompt này** — bạn tự chọn bố cục nội dung trong vùng MH, thành phần giao diện, màu sắc và trạng thái tương tác phù hợp.

---

### MH 03: Xem chi tiết / Chỉnh sửa danh mục

#### Mục đích & nhu cầu (nghiệp vụ)
- Xem thông tin chi tiết một danh mục đã lưu. Cung cấp khả năng Chỉnh sửa thông tin (nếu có quyền) hoặc chuyển trạng thái sang Ngừng hiệu lực.
- Ràng buộc / quy tắc nghiệp vụ: 
  - Không cho phép chỉnh sửa Mã danh mục.
  - Không đổi Loại danh mục nếu đã phát sinh dữ liệu trong hệ thống.
  - Không cho phép Cập nhật thông tin nếu danh mục đang ở trạng thái Ngừng hiệu lực (trừ Admin).
  - Cảnh báo hoặc chặn việc "Ngừng hiệu lực" nếu danh mục đã phát sinh dữ liệu (tuỳ theo quyền hạn).
- **Phạm vi đầu ra (bắt buộc):** Chỉ thiết kế **nội dung MH chi tiết** (vùng chức năng của màn này). **Không** bao gồm menu điều hướng, sidebar app, top bar toàn app, header shell ứng dụng hay khung layout bao ngoài chỉ để điều hướng giữa các module.

#### Phạm vi dữ liệu (từ ERD)
| Field | Kiểu / mô tả | PK/FK | Ràng buộc (nullable, enum, format nghiệp vụ) |
|---|---|---|---|
| Mã danh mục | String (1-50) | PK | Read-only |
| Tên danh mục | String (1-255) | | Bắt buộc nhập (khi Chỉnh sửa) |
| Loại danh mục | String (1-100) | FK | Khóa/Read-only nếu đã phát sinh dữ liệu |
| Mô tả | String (0-500) | | Tùy chọn |
| Trạng thái | Enum | | Hiệu lực / Ngừng hiệu lực |
| Ngày tạo | DateTime | | Read-only (System) |
| Người tạo | String (1-100) | | Read-only (System) |
| Ngày cập nhật | DateTime | | Read-only (System) |
| Người cập nhật | String (1-100) | | Read-only (System) |

#### Luồng hành vi mong muốn (nghiệp vụ, không mô tả UI)
| Bước / sự kiện | Kết quả nghiệp vụ mong đợi |
|---|---|
| Mở màn hình Xem chi tiết | Các trường thông tin ở dạng View. Xuất hiện các nút: Chỉnh sửa, Ngừng hiệu lực. |
| Click Chỉnh sửa | Chuyển dữ liệu sang form chỉnh sửa (trừ Mã danh mục, và Loại danh mục nếu thoả điều kiện khóa). Xuất hiện nút Lưu, Huỷ. |
| Click Ngừng hiệu lực | Hiển thị Popup xác nhận. Xác nhận sẽ cập nhật trạng thái nếu không vướng dữ liệu cũ hoặc cảnh báo nếu vướng. |
| Click Lưu (trạng thái Chỉnh sửa) | Validate tính hợp lệ của trường -> Cập nhật vào hệ thống và quay về dạng View. |

#### Giao cho công cụ [AI_TOOL]
Thiết kế giao diện màn hình **Xem chi tiết / Chỉnh sửa danh mục** cho ứng dụng **Quản lý Đào tạo** đáp ứng **mục đích & nhu cầu** và **dữ liệu** trên. **Chỉ xuất ra nội dung màn hình chi tiết** (khu vực chức năng của MH này); **không** tạo menu điều hướng, sidebar, top bar toàn app hay bất kỳ chrome điều hướng nào ngoài phạm vi MH. **Không có ràng buộc design style khác trong prompt này** — bạn tự chọn bố cục nội dung trong vùng MH, thành phần giao diện, màu sắc và trạng thái tương tác phù hợp.
