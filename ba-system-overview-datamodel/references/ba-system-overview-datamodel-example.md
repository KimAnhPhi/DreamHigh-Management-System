Version: 1.0.0
Author: M2MBA
Last Updated: 2026-04-12
Description: Ví dụ cấu trúc đầu ra (rút gọn) — chỉ minh họa định dạng, không phải nghiệp vụ thật.

# Tổng quan hệ thống: Ví dụ Mini-Shop

## 1. Tổng quan hệ thống

Hệ thống hỗ trợ bán hàng trực tuyến với đơn hàng, sản phẩm và người dùng. Dữ liệu trọng tâm: `User`, `Product`, `Order`, `OrderItem`.

**Phụ thuộc đầu vào:** `docs-BA/Data Model/ba-data-model.md` (giả định).

## 2. Danh sách đối tượng sử dụng

| STT | Đối tượng (Actor) | Mô tả / vai trò | Ghi chú |
|-----|-------------------|-----------------|--------|
| 1 | Khách hàng | Xem sản phẩm, đặt hàng | |
| 2 | Quản trị viên | Quản lý sản phẩm và đơn | |

## 3. Danh sách ứng dụng

| STT | Tên ứng dụng | Mục đích (nếu có trong đầu vào) | Ghi chú |
|-----|--------------|--------------------------------|--------|
| 1 | Web cửa hàng | Mua hàng | |
| 2 | Admin Web | Vận hành | |

## 4. Quy trình nghiệp vụ

#### 4.1 Đặt hàng và xác nhận

*(Thứ tự dòng = thứ tự thực hiện: Khách hàng trên Web cửa hàng → hệ thống tự động.)*

| Bước | Người thực hiện | Ứng dụng | Tên chức năng | Mô tả |
|------|-----------------|----------|---------------|--------|
| 1 | Khách hàng | Web cửa hàng | Giỏ hàng & thanh toán | Tạo `Order`, `OrderItem` |
| 2 | Hệ thống | Hệ thống / tự động | Xác nhận đơn | Cập nhật `Order.status` (giả định — cần xác nhận) |
| 3 | Quản trị viên | Admin Web | Duyệt đơn | Đổi trạng thái đơn sau khi bước 2 hoàn tất |

## 5. Danh sách chức năng theo ứng dụng

| Ứng dụng | Actor | Tên chức năng | Mô tả chức năng | Bảng dữ liệu liên quan | Trường dữ liệu liên quan |
|----------|-------|---------------|-----------------|-------------------------|---------------------------|
| Web cửa hàng | Khách hàng | Xem danh mục | Hiển thị sản phẩm | `Product` | `id`, `name`, `price` |
| Admin Web | Quản trị viên | Quản lý đơn | Danh sách và chi tiết đơn | `Order`, `OrderItem`, `User` | `Order.*`, `OrderItem.orderId`, `productId`, `quantity` |

- **Bảng chưa gán chức năng (cần làm rõ):** *(không — ví dụ đã phủ `Product`, `Order`, `OrderItem`, `User`.)*
- **Trường chưa phủ (cần làm rõ):** *(nếu model có cột chưa map — liệt kê `Bảng.cột`.)*
