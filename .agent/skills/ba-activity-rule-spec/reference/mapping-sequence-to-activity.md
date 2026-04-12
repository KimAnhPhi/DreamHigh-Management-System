## Mapping Sequence Diagram → Activity Flow

### Nguyên tắc chung
- Mỗi message FE → BE trong sequence:
  - Activity lane FE: Task `"Gửi yêu cầu [nghiệp vụ]"` (nghĩ theo business, không ghi tên API).
  - Lane BE: Task `"Xử lý yêu cầu [nghiệp vụ]"` (+ Decision Node validate nếu là Insert/Update/Delete).
  - Lane BE: Task `"Trả kết quả"`.
  - Lane FE: Decision Node `"Kết quả thành công?"` + các task xử lý từng nhánh.

### Gộp nhiều request
- Nếu FE gọi BE nhiều API liên tiếp mà **không có tương tác người dùng ở giữa**:
  - Gộp thành **1 request nghiệp vụ** duy nhất trong Activity:
    - `"Gửi yêu cầu lấy danh sách khóa học, lớp học, thông tin giảng viên"`.
  - BE: 1 task `"Xử lý yêu cầu ..."` có thể chứa nhiều query bên trong nhưng trả về **1 response**.

### FE validation
- Trước request BE, nếu có điều kiện kiểm tra input:
  - Tạo Decision Node lane FE `"Dữ liệu hợp lệ?"`.
  - Ghi chú:
    - **Hợp lệ khi:** [liệt kê điều kiện].
    - **Không hợp lệ khi:** [liệt kê điều kiện].
  - Nhánh không hợp lệ đi tới task hiển thị lỗi / chặn thao tác.

### BE validation (6 nhóm rule)
- Với Insert/Update/Delete:
  - Tạo Decision Node lane BE `"Dữ liệu hợp lệ?"` hoặc `"Validation thành công?"`.
  - Gom các điều kiện theo **6 nhóm rule** (xem: [validation-6-groups.md](mdc:.agent/skills/ba-activity-rule-spec/reference/validation-6-groups.md)).

