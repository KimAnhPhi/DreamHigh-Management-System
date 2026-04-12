Version: 1.1.0  
Author: M2MBA  
Last Updated: 2026-04-10  
Description: Sáu nhóm rule validation BE — dùng khi phân tích API (Mermaid + bảng) trong skill ba-activity-rule-spec.

## 6 nhóm rule validation trên BE

### Nhóm 1: Rule theo quy định nghiệp vụ
- Ví dụ: lớp học phải còn slot, số dư >= số tiền giao dịch + phí, thời gian trong khoảng cho phép.
- Cách xác định: dựa vào business rules, context nghiệp vụ, ERD.

### Nhóm 2: Rule data có thể bị fake qua API
- Ví dụ: ID phải tồn tại, foreign key hợp lệ, reference data tồn tại.
- Cách xác định: kiểm tra tất cả ID/reference trong request với database.

### Nhóm 3: Rule data thay đổi trong quá trình thực hiện
- Ví dụ: tồn kho thay đổi, trạng thái tài khoản/ticket thay đổi, khuyến mãi hết hạn.
- Cách xác định: đọc lại state hiện tại tại thời điểm xử lý, so sánh với state lúc load.

### Nhóm 4: Rule mapping dữ liệu
- Ví dụ: classroom_id phải thuộc course_id; register_id – classroom_id phải mapping đúng.
- Cách xác định: dựa vào ERD, kiểm tra tính nhất quán giữa các field trong request.

### Nhóm 5: Rule data duplicate
- Ví dụ: không cho đăng ký trùng; không cho hai request song song cùng key nghiệp vụ.
- Cách xác định: kiểm tra record/request cùng key đang tồn tại hoặc đang xử lý.

### Nhóm 6: Rule so sánh xác nhận / tính toán lại trên server
- Ví dụ: tổng tiền, số lượng, các giá trị tính toán phải khớp giữa client và server.
- Cách xác định: luôn tính lại trên BE và so sánh với giá trị client gửi lên.

---

Khi thiết kế luồng validate cho API (trong Mermaid và cột "Vì sao có rule đó"), **cân nhắc đủ các nhóm** phù hợp với loại thao tác (đọc/ghi/xóa):

- **Hợp lệ khi:** tóm tắt điều kiện đã kiểm tra theo các nhóm áp dụng được.
- **Không hợp lệ khi:** các vi phạm tương ứng (kèm mã lỗi HTTP nếu spec đã định nghĩa).
