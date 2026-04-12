## Ví dụ minh hoạ – Đăng ký khoá học

### Sequence Diagram (giản lược)
```text
Actor -> FE: Nhập thông tin đăng ký khóa học
FE -> BE: Gọi API POST /api/registrations
BE -> Database: Lưu registration
BE -> FE: Trả về kết quả
FE -> Actor: Hiển thị thông báo
```

### Bảng Activity Flow (rút gọn)
| Bước | Actor | Mô tả bước | Notation | Ghi chú |
|------|-------|------------|----------|---------|
| 1 | Actor | Nhập thông tin đăng ký khóa học | Task | |
| 2 | FE | Validate dữ liệu đầu vào | Decision Node | Hợp lệ / Không hợp lệ |
| 3 | FE | Gửi yêu cầu đăng ký khóa học | Task | |
| 4 | BE | Validate dữ liệu | Decision Node | Áp dụng 6 nhóm rule |
| 5 | BE | Lưu thông tin đăng ký | Task | |
| 6 | BE | Trả kết quả | Task | |
| 7 | FE | Kiểm tra kết quả | Decision Node | Thành công / Lỗi |
| 8 | FE | Hiển thị thông báo thành công | Task | |
| 9 | FE | Hiển thị thông báo lỗi | Task | |

