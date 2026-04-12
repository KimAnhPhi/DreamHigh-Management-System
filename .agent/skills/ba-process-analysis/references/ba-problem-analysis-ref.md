Version: 1.0.0
Author: M2MBA
Last Updated: 2026-03-06
Description: Tài liệu Reference hướng dẫn Agent cách nhận diện, phân loại và phân tích vấn đề trong quá trình làm AS-IS Analysis.

# HƯỚNG DẪN PHÂN TÍCH VẤN ĐỀ TRONG QUY TRÌNH BA

Khi Agent đang tạo phần "3. Phân tích vấn đề" trong file phân tích AS-IS, Agent cần áp dụng các bộ tiêu chí và phương pháp dưới đây dựa trên bảng mô tả bước ở mục 2.2.

---

## 1. Phân tích từng bước AS-IS

**Mục tiêu:** Quét từng bước trong bảng "Mô tả quy trình", tìm kiến các điểm yếu liên quan tới:
- Vấn đề thực tại: Bottle-neck (điểm nghẽn), rủi ro sai sót.
- Cơ hội cải tiến: Cách để tự động hóa, tối ưu hóa, giảm thời gian chờ/xử lý.

**Các loại vấn đề thường gặp cần nhận diện:**
- **Thủ công quá nhiều**: Các bước thao tác tay, giấy tờ, gửi email thủ công trong khi có thể cho hệ thống tự động xử lý.
- **Thời gian xử lý dài**: Các bước mất nhiều thời gian do quá trình phê duyệt hoặc tra cứu thông tin khó khăn.
- **Rủi ro lỗi cao**: Các bước phải nhập liệu tay dễ dẫn tới sai sót nhầm lẫn do con người (Human Error).
- **Thiếu kiểm soát**: Không có cơ chế kiểm tra chéo (validation), không có log, không rành mạch quyền phê duyệt.
- **Dữ liệu không đồng bộ**: Cùng 1 dữ liệu nhưng phải nhập lại nhiều lần vào nhiều hệ thống khác nhau (Duplicate Data Entry).
- **Phụ thuộc con người**: Một task bị delay nếu người đảm nhiệm vắng mặt (Single Point of Failure).

---

## 2. Ưu tiên phần mềm hóa / Tự động hóa

Khi nghĩ ra "Cách xử lý" (Giải pháp) cho từng vấn đề, Agent hãy cân nhắc 4 cấp độ ưu tiên sau:

1. **Tự động hóa hoàn toàn**: Hệ thống chạy trigger tự động không cần người can thiệp (e.g. Tự động gửi email khi trạng thái thay đổi, hệ thống auto-validate dữ liệu).
2. **Bán tự động**: Hệ thống gợi ý/điền sẵn thông tin (auto-fill), con người chỉ cần xác nhận/duyệt.
3. **Tối ưu hóa quy trình**: Bỏ đi những bước thừa, gộp các bước lại với nhau để giảm thời gian chờ (Giảm số thao tác click, hợp nhất biểu mẫu).
4. **Cải thiện kiểm soát**: Thêm cơ chế validation bắt lỗi trực tiếp tại màn hình, phân quyền rõ ràng, bổ sung Approve Workflow.

---

## 3. Cách trình bày Bảng phân tích vấn đề

Áp dụng các thông tin phân tích được vào bảng chuẩn với các chuẩn mực sau:

| Bước | Vấn đề | Xác suất | Ưu tiên | Cách xử lý | Action Plan |
|------|--------|----------|---------|------------|-------------|
| [STT] | [Mô tả vấn đề] | [Quy mô] | [Độ ưu tiên] | [Giải pháp đề xuất] | [Kế hoạch hành động] |

**Quy tắc điền nội dung:**
1. **Bước**: Lấy đúng số thứ tự (STT) và tên bước từ bảng AS-IS ở phần trước.
2. **Vấn đề**: Viết ngắn gọn từ danh sách "Các loại vấn đề". Cụ thể hóa vào tình huống (VD: "Phải nhập lại thông tin khách hàng từ file Excel thủ công, dễ sai sót").
3. **Xác suất**: Đánh giá dựa trên trải nghiệm
   - **Cao**: Thường xuyên xảy ra (>50% số giao dịch)
   - **Trung bình**: Thỉnh thoảng xảy ra (20-50%)
   - **Thấp**: Hiếm khi xảy ra (<20%)
4. **Ưu tiên**: Độ cấp bách phải xử lý
   - **Cao**: Gây tốn nhiều chi phí/thời gian, là điểm nghẽn nghiêm trọng, cần xử lý ngay.
   - **Trung bình**: Ảnh hưởng vừa phải, nên đưa vào để tối ưu tính năng.
   - **Thấp**: Nice-to-have, có thể bổ sung trong các phase sau.
5. **Cách xử lý**: Giải pháp thuộc 4 cấp độ ở Mục 2 (VD: "Tích hợp API đẩy dữ liệu Tự động").
6. **Action Plan**: Roadmap thực thi cơ bản (VD: "Phase 1: Phân tích tích hợp API", "Phase 2: Xây dựng cơ chế duyệt Web").

---

## 4. Cách trình bày mục "Tổng kết"

Nguồn dữ liệu thống kê dựa trên Bảng phân tích. Đưa ra góc nhìn chiến lược dành cho Product Owner/Sponsor:

**Tổng số vấn đề:** [Tổng dòng trong bảng]
- **Ưu tiên cao:** [Đếm số dòng]
- **Ưu tiên trung bình:** [Đếm số dòng]
- **Ưu tiên thấp:** [Đếm số dòng]

**Các cơ hội cải tiến chính:**
- List ra các "Cách xử lý" đắt giá nhất, mang lại lợi ích cao nhất về thời gian, chi phí (VD: Loại bỏ hoàn toàn quy trình xử lý giấy tờ).

**Khuyến nghị:** 
- Đề xuất bước đi tiếp theo cho BA hoặc PM (VD: Phân tích kỹ hệ thống thanh toán để Tự động hóa bước 3).
