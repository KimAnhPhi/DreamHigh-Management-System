---
name: ba-usecase-list-gen
description: "Skill tự động phân tích 7 nhóm Use Case từ quy trình nghiệp vụ. Đầu ra là 1 file duy nhất chứa danh sách Epics, các Use Case thuộc từng Epic và bảng Change log, KHÔNG cần user xác nhận (confirm) qua từng bước."
---

# HƯỚNG DẪN SKILL: BA USECASE LIST GEN

**Version:** 1.0.1
**Author:** M2MBA
**Last Updated:** 2026-03-17
**Description:** Tự động phân tích và liệt kê danh sách Use Case theo 7 nhóm, gom nhóm theo Epic vào 1 file duy nhất.

## 🎯 Mục đích
Skill này giúp Business Analyst (BA) tự động hóa hoàn toàn quá trình xác định Use Case:
- **KHÔNG CẦN** user xác nhận (confirm) qua từng nhóm (1 đến 7). 
- Liệt kê toàn bộ Use Case dựa theo phân tích logic tối ưu nhất ở 1 lượt thực thi (one-shot).
- Phân nhóm theo **Epics**, liệt kê rõ ràng các Use Case con bên trong mỗi Epic.
- Có **Change log** để theo dõi lịch sử bổ sung, cập nhật ở những lần yêu cầu tiếp theo.
- Sinh ra **1 output file duy nhất** để tiết kiệm thao tác.

## 📋 Yếu tố đầu vào
- Mô tả quy trình nghiệp vụ (Tài liệu text, file BPMN, meeting notes, v.v.).
- (Tùy chọn) Vấn đề cần giải quyết, danh sách module/hệ thống dự kiến.

## ⚙️ Quy trình phân tích của Agent (One-shot Action)

Khi được kích hoạt, Agent tự động thực hiện các tác vụ ngầm sau:

### 1. Phân tích 7 Nhóm Use Case
Agent tự động quét quy trình nghiệp vụ đi qua 7 góc nhìn để khai phá trọn vẹn Use Case:
- **Nhóm 1 (Phục vụ quy trình):** Phân tích các bước con người tương tác hệ thống. Gộp các bước cùng 1 đích đến thành 1 UC (Ví dụ: Nhập thông tin + Gửi -> UC: Tạo yêu cầu).
- **Nhóm 2 (CRUD RUD):** Các UC Đọc, Sửa, Xóa tương ứng các Entity tạo ra từ nhóm 1. (Lưu ý về rule ai được Xóa, Sửa, và trong điều kiện nào).
- **Nhóm 3 (Exception - Tình huống phát sinh):** Hủy, Hoàn trả, Phê duyệt bổ sung (Tần suất xảy ra cao, không tính case hiếm).
- **Nhóm 4 (Reference Data):** Quản lý cấu hình, danh mục tham chiếu cần thay đổi linh động để phục vụ quy trình.
- **Nhóm 5 (Report):** Các báo cáo thiết yếu (Phải có đích danh, ví dụ: Xem báo cáo trạng thái đơn hàng).
- **Nhóm 6 (Lookup):** Tra cứu thông tin cá nhân/đối tượng độc lập, tách riêng với danh sách (nếu màn hình tra cứu rất đặc thù như CSKH).
- **Nhóm 7 (User/Permission):** Quản lý user, phân quyền, đăng nhập tương ứng với Actor trong quy trình.(phần này xác định cho cả hệ thống, nên UC list của hệ thống đã có rôi thì bỏ qua )

### 2. Định nghĩa Epic & Gom nhóm
- Nhóm các UC chung 1 mục tiêu / nhóm Entity lớn thành các **Epic**. Ví dụ: `Epic 1: Quản lý Bán hàng`, `Epic 2: Quản lý Khách hàng`.
- Xác định và ghi rõ **Ý nghĩa** của mỗi Epic.

### 3. Sinh & Cập nhật File Kết quả (Output file)
- **Tên file sinh ra bắt buộc:** `ba-usecase-list-gen.md`
- **Thư mục lưu:** `docs-BA/Usecase List/` (Agent tự kiểm tra và tạo nếu cần).
- **Quy tắc tạo/cập nhật File Output:**
    - **Nếu file chưa có:** Tạo mới với khối Metadata ở đầu + bảng Change log (mô tả "Version 1.0 - Khởi tạo danh sách UC") + Danh sách Epics và UC.
    - **Nếu file đã có (User yêu cầu chạy bổ sung quy trình mới):** Agent sẽ **đọc** file cũ, **chèn thêm** Epics/UCs mới vào cấu trúc hiện tại, và **điền thêm 1 dòng vào Change log** ghi rõ thông tin các UC được bổ sung.
- **Quy tắc Incremental Generation:** Với quy trình lớn sinh ra nội dung dài, Agent dùng incremental update để in file theo từng đoạn (segment) nhằm tránh lỗi sinh quá dài một lúc.

## 📄 Structure / Template File Output

Agent BẮT BUỘC sử dụng cấu trúc đúng chuẩn sau khi sinh hoặc cập nhật file `ba-usecase-list-gen.md` (Đảm bảo có block Metadata):

```markdown
Version: 1.0.0
Author: M2MBA
Last Updated: yyyy-mm-dd
Description: Danh sách Epics và Use Case tổng hợp từ các quy trình nghiệp vụ.

# TÀI LIỆU DANH SÁCH USE CASE (TỔNG HỢP)

## 1. Change Log
| Version | Ngày cập nhật | Người thực hiện | Nội dung cập nhật chi tiết |
|---|---|---|---|
| 1.0 | [Ngày] | Agent | Phân tích và tạo mới danh sách Use Case từ quy trình [Tên quy trình] |
| 1.1 | [Ngày] | Agent | Bổ sung các Use Case cho quy trình [Tên quy trình thứ 2] |

## 2. Danh sách Epics và Use Case chi tiết

### Epic 1: [Tên Epic 1]
**Ý nghĩa Epic:** [Mô tả vai trò và chức năng bao quát của Epic này]

| STT | Tên Use Case | Actor | Thuộc Nhóm | Mô tả tóm tắt (Điều kiện hoạt động / Ghi chú) |
|---|---|---|---|---|
| 1.1 | [Tiền tố hành động + Mục tiêu] | [Actor] | Nhóm 1 | [Ghi chú nếu có] |
| 1.2 | ... | ... | ... | ... |

### Epic 2: [Tên Epic 2]
...
```

## ⚠️ Checklist Bắt Buộc Dành Cho Agent
1. **Tuyệt đối Auto 100%:** Luôn in thẳng ra thành phẩm 1 file Markdown hoàn chỉnh, không bao giờ dừng lại chờ người dùng (User) verify từng nhóm (Nhóm 1 -> Nhóm 7).
2. **Luôn cung cấp Change log:** Bất kỳ lần chạy kết xuất nào vào output file (tạo mới hoặc bổ sung file hiện có) cũng phải ghi log tương ứng tại mục `1. Change Log`.
3. **Đúng định dạng Naming Convention:** File sinh ra phải chuẩn format theo rule: `[loại]-[đối tượng]-[hành động].md`, tức là `ba-usecase-list-gen.md`.
