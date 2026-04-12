# Rubric 4 trụ + Domain: Process · Stakeholder · Exception · Compliance · **D**

**Dùng kèm skill:** `ba-elicitation-review` (scorecard 8 tiêu chí — tag gap **P/S/E/C/D**).  
**D (Domain data):** thực thể cần quản lý, master data, trạng thái & vòng đời — chi tiết `ba-elicitation-review-entity-lifecycle.md`.  
**Đường dẫn:** tương đối từ thư mục chứa `SKILL.md`.

---

## 1. Quy trình (Process)

| Tiêu chí | Cần có trong summary/history (bằng chứng) | Nếu thiếu → gap |
|:--|:--|:--|
| **Phạm vi & ranh giới** | In/out scope; giai đoạn (MVP vs sau); rebuild/migration nếu có | Gap |
| **Luồng chính (happy path)** | Bước có thứ tự; trigger; kết thúc thành công | Gap |
| **Actor theo bước** | Ai làm gì ở từng bước (không chỉ “hệ thống xử lý”) | Gap |
| **I/O & trạng thái** | Đầu vào/ra từng bước; trạng thái nghiệp vụ chuyển thế nào | Gap |
| **Thực thể & vòng đời** | Thực thể trọng yếu được đặt tên; trạng thái/chuyển trạng đủ để không bỏ sót đối tượng lưu trữ | Gap **D** (+P nếu gắn luồng) |
| **Tích hợp trong luồng** | Hệ thống ngoài; chiều dữ liệu; điểm chốt/ghi nhận | Gap |
| **SLA / thời hạn nghiệp vụ** | Chỉ khi stakeholder đã nêu — không bịa số | Gap hoặc “chưa hỏi” |

---

## 2. Stakeholder & công việc

| Tiêu chí | Cần có | Gap khi… |
|:--|:--|:--|
| **Danh sách vai** | Tên vai hoặc bộ phận + trách nhiệm chính | Không rõ ai chịu trách nhiệm |
| **RACI nhẹ** | Ai quyết định (A), ai thực hiện (R), ai được thông báo | Chỉ có vai chung chung |
| **Quyền & phân quyền** | Ai được xem/sửa/duyệt/hủy; theo segment nếu khác | Không tách quyền |
| **Điểm chạm tay** | Chỗ nào bắt buộc con người | Toàn auto mà không rõ owner |
| **Một stakeholder** | Rủi ro kiến thức tập trung; backup khi vắng | Chưa làm rõ |

---

## 3. Tình huống phát sinh (Exception)

| Nhóm | Gợi ý làm rõ | Gap khi… |
|:--|:--|:--|
| **Thanh toán** | Trễ, sai nội dung, đối soát fail | Không có nhánh |
| **Nghiệp vụ chính** | Đổi/hủy/bảo lưu/trùng dữ liệu — theo domain | Chỉ happy path |
| **Tích hợp** | Down, timeout, retry, duplicate | Chưa đề cập |
| **Phân khúc** | B2B vs B2C khác nhau | Chỉ một kiểu |
| **Chứng từ / pháp lý** | Hóa đơn, lưu trữ — theo mức đã mở | “Chưa chốt” mà không có câu hỏi tiếp |

---

## 4. Quy định tuân thủ (Compliance)

| Tiêu chí | Cần có | Gap khi… |
|:--|:--|:--|
| **Nội bộ** | Policy liên quan sản phẩm | Policy nhắc nhưng không có rule hệ thống |
| **Đối tác / nền tảng** | Ràng buộc ảnh hưởng thiết kế | Chỉ tên công cụ |
| **Thuế / hóa đơn** | Theo mức stakeholder đã mở | Không có plan làm rõ |
| **PII** | Log, retention nếu có PII | Không đề cập |

---

## 5. Domain / thực thể (D) — tóm tắt

| Tiêu chí | Gap khi… |
|:--|:--|
| **Inventory** | Không liệt kê được thực thể core trong scope |
| **Lifecycle** | Thiếu trạng thái terminal, điều kiện chuyển, hoặc ngoại lệ đổi trạng cho thực thể tiền/pháp lý |
| **Quan hệ** | Hai thực thể cùng luồng nhưng ranh giới aggregate không rõ |

---

## 6. Severity gap

| Mức | Định nghĩa |
|:--|:--|
| **Critical** | Không thiết kế an toàn được; rủi ro pháp lý/tiền; hoặc **D** thiếu thực thể/ trạng thái then chốt (đơn, thanh toán, hợp đồng…) |
| **High** | Thiếu actor hoặc exception hay gặp; hoặc **D** thiếu vòng đời một phần |
| **Medium** | Một vòng hỏi là đủ |
| **Low** | Tinh chỉnh sau |
