# Checklist Khảo Sát Hệ Thống Hiện Tại (Chuyên Sâu)

**Phiên bản:** 1.0.0 | **Tác giả:** M2MBA | **Cập nhật:** 2026-03-01
**Dùng khi:** Tổ chức đang có phần mềm chưa đáp ứng nhu cầu và muốn xây mới/thay thế.
**Không thay thế** checklist tổng quát (phần 1.2) — đây là **bộ câu hỏi bổ sung** khi cần đào sâu hơn.

> 💡 **Nguyên tắc sử dụng:** Hỏi về nỗi đau trước — hỏi về tính năng sau.
> Không cần hỏi hết trong một buổi. Phân bổ theo đối tượng phù hợp (xem bảng phân bổ cuối file).

---

## NHÓM A — Hệ thống hiện tại đang ở đâu?
> Tránh xây lại cái đã bỏ, nhưng cũng tránh bỏ những gì đang chạy tốt.

| ID | Câu hỏi XÁC NHẬN | Mục tiêu thu thập | Status |
|:--|:--|:--|:--:|
| ES-A1 | Theo tôi tìm hiểu, hệ thống [X] hiện đang đảm nhiệm [A, B, C]... Trong số đó, module/tính năng nào anh/chị hài lòng nhất và muốn giữ lại? | Xác định "điểm sáng" cần bảo toàn | ⬜ |
| ES-A2 | Có tính năng/module nào nếu thiếu sẽ làm công việc hàng ngày bị tắc nghẽn ngay không — dù hệ thống mới chưa sẵn sàng? | Xác định Must-have tuyệt đối | ⬜ |
| ES-A3 | Dữ liệu hiện tại đang lưu ở đâu — chỉ trong phần mềm, hay song song cả Excel/sổ tay? Bộ phận nào còn giữ "hệ thống bóng tối" ngoài phần mềm chính? | Phát hiện shadow system & phạm vi migration | ⬜ |
| ES-A4 | Ai trong tổ chức hiểu sâu hệ thống cũ nhất — cả về cách dùng lẫn lý do tại sao cấu hình như vậy? (Rủi ro nếu người này nghỉ việc trong khi chuyển đổi) | Xác định key person & knowledge risk | ⬜ |
| ES-A5 | Hệ thống hiện tại đã dùng được bao lâu? Nhà cung cấp/phiên bản là gì? Hợp đồng còn hay đã hết? | Lịch sử hệ thống, ràng buộc hợp đồng | ⬜ |

---

## NHÓM B — Nguồn gốc thực sự của vấn đề
> Phân biệt: vấn đề do phần mềm, do quy trình, hay do con người.
> ⚠️ Nhiều tổ chức nghĩ phần mềm là vấn đề nhưng thực ra **quy trình** mới là vấn đề.

| ID | Câu hỏi XÁC NHẬN | Mục tiêu thu thập | Status |
|:--|:--|:--|:--:|
| ES-B1 | Kể lại một ngày tệ nhất gần đây với hệ thống — cụ thể chuyện gì xảy ra, ai bị ảnh hưởng, mất bao lâu để xử lý? | Root cause cụ thể, tránh mô tả chung chung | ⬜ |
| ES-B2 | Việc gì hiện đang phải làm thủ công ngoài hệ thống (Excel, sổ tay, Zalo, giấy tờ)? Bộ phận nào dùng nhiều nhất? | Phát hiện shadow system & gap lớn nhất | ⬜ |
| ES-B3 | Việc gì mất nhiều thời gian nhất mà lẽ ra phần mềm phải tự động làm? Ước tính mất bao nhiêu giờ/tuần? | Đo lường tác động để ưu tiên tính năng | ⬜ |
| ES-B4 | Có lỗi hoặc sự cố nào lặp đi lặp lại không? Lần gần nhất xảy ra khi nào, gây hậu quả gì? | Xác định lỗi hệ thống vs. lỗi quy trình | ⬜ |
| ES-B5 | Có quyết định kinh doanh nào không thể đưa ra được vì thiếu dữ liệu từ phần mềm? Ví dụ: không biết tồn kho thật, không biết hiệu suất nhân viên... | Xác định data gap ảnh hưởng tới lãnh đạo | ⬜ |
| ES-B6 | *(Khi stakeholder nêu tính năng cụ thể)* Nếu có [tính năng X] thì anh/chị dùng để làm gì — quyết định gì, tiết kiệm việc gì? | Tìm vấn đề thực sự sau giải pháp stakeholder đề xuất | ⬜ |

---

## NHÓM C — Áp lực tăng trưởng đang tới
> Hệ thống mới phải đủ sức chạy 3–5 năm, không chỉ giải quyết bài toán hôm nay.

| ID | Câu hỏi XÁC NHẬN | Mục tiêu thu thập | Status |
|:--|:--|:--|:--:|
| ES-C1 | Trong 2–3 năm tới tổ chức dự kiến mở rộng như thế nào — thêm nhân sự, chi nhánh, kênh bán, sản phẩm mới? | Scope mở rộng cho thiết kế kiến trúc | ⬜ |
| ES-C2 | Khối lượng giao dịch hiện tại trung bình là bao nhiêu/ngày? Đỉnh điểm cao nhất là bao nhiêu? (VD: đơn hàng, giao dịch, phiếu nhập...) | Thiết kế capacity & performance | ⬜ |
| ES-C3 | Có sản phẩm/dịch vụ mới nào trong kế hoạch mà hệ thống cũ hiện không hỗ trợ được? | Xác định gap tương lai | ⬜ |
| ES-C4 | Có đối tác hoặc hệ thống bên ngoài nào sắp cần kết nối — ngân hàng, sàn TMĐT, cơ quan thuế, ERP? | Phạm vi tích hợp | ⬜ |
| ES-C5 | Quy định pháp lý hoặc nghĩa vụ tuân thủ nào sắp có hiệu lực ảnh hưởng đến hệ thống? (VD: hóa đơn điện tử, BHXH điện tử...) | Compliance requirements | ⬜ |

---

## NHÓM D — Bài học từ lần triển khai cũ
> Khai thác kinh nghiệm xương máu — tổ chức đã làm một lần rồi.
> ⚠️ Nhóm câu hỏi nhiều BA bỏ qua nhưng thực ra cực kỳ có giá trị.

| ID | Câu hỏi XÁC NHẬN | Mục tiêu thu thập | Status |
|:--|:--|:--|:--:|
| ES-D1 | Lần triển khai hệ thống cũ, điều gì diễn ra tệ nhất — về kỹ thuật, quy trình, hay con người? | Tránh lặp lại sai lầm | ⬜ |
| ES-D2 | Có tính năng nào được mua/yêu cầu nhưng cuối cùng không ai dùng không? Vì sao không dùng? | Xác định tính năng "ghost feature" | ⬜ |
| ES-D3 | Khi chuyển sang hệ thống cũ, nhân viên phản ứng ra sao? Mất bao lâu để vận hành ổn định? | Dự phòng kế hoạch change management | ⬜ |
| ES-D4 | Nếu làm lại từ đầu, anh/chị sẽ thay đổi điều gì trong cách triển khai — chọn vendor, cách training, thứ tự go-live? | Insight trực tiếp để cải thiện cách triển khai mới | ⬜ |
| ES-D5 | Có cam kết/hứa hẹn nào từ vendor cũ không được thực hiện không? Anh/chị kỳ vọng gì ở vendor mới khác với trước? | Quản lý kỳ vọng vendor | ⬜ |

---

## NHÓM E — Tiêu chí thành công thực sự
> Đồng thuận định nghĩa "thành công" từ đầu — tránh tranh cãi khi nghiệm thu.

| ID | Câu hỏi XÁC NHẬN | Mục tiêu thu thập | Status |
|:--|:--|:--|:--:|
| ES-E1 | 6 tháng sau khi hệ thống mới đi vào hoạt động, anh/chị nhìn lại và nói "dự án này thành công" — lúc đó anh/chị thấy điều gì cụ thể? | Định nghĩa thành công từ góc nhìn stakeholder | ⬜ |
| ES-E2 | Chỉ số nào muốn cải thiện rõ ràng — thời gian xử lý đơn, tỷ lệ lỗi, giờ làm báo cáo, số đơn hàng/ngày? Con số cụ thể kỳ vọng là bao nhiêu? | Đo lường DOD (Definition of Done) | ⬜ |
| ES-E3 | Có điều gì mà nếu hệ thống mới không làm được, anh/chị sẽ coi là thất bại — dù các thứ khác ổn? | Xác định "deal-breaker" | ⬜ |
| ES-E4 | Ai trong tổ chức sẽ là người đánh giá cuối cùng rằng hệ thống đạt yêu cầu để nghiệm thu? | Xác định decision maker nghiệm thu | ⬜ |
| ES-E5 | Ngân sách và timeline hiện tại có thực tế với kỳ vọng không? Mình muốn trao đổi thẳng để tránh ngạc nhiên sau. | Alignment ngân sách — timeline — scope | ⬜ |

---

## NHÓM F — Rủi ro chuyển đổi
> Giai đoạn chuyển đổi thường nguy hiểm hơn giai đoạn xây dựng.

| ID | Câu hỏi XÁC NHẬN | Mục tiêu thu thập | Status |
|:--|:--|:--|:--:|
| ES-F1 | Thời điểm nào trong năm là tệ nhất để cắt hệ thống cũ — mùa cao điểm, kiểm toán, quyết toán cuối năm? | Lập lịch go-live an toàn | ⬜ |
| ES-F2 | Dữ liệu cũ có cần migrate không? Bao nhiêu năm lịch sử? Dữ liệu đang ở định dạng gì (DB, Excel, file XML...)? | Phạm vi & kế hoạch data migration | ⬜ |
| ES-F3 | Tổ chức có thể chạy song song hai hệ thống một thời gian không, hay phải cutover cứng một ngày nhất định? | Chiến lược cutover | ⬜ |
| ES-F4 | Nếu hệ thống mới gặp sự cố trong tuần đầu go-live, kế hoạch dự phòng là gì — rollback về hệ thống cũ hay xử lý thủ công? | Contingency plan | ⬜ |
| ES-F5 | Ai chịu trách nhiệm đào tạo nhân viên? Có ngân sách và thời gian dành riêng cho training chưa? | Kế hoạch change management | ⬜ |
| ES-F6 | Nhóm nào trong tổ chức có khả năng phản đối hoặc không hợp tác khi chuyển đổi? Lý do có thể là gì? | Resistance management | ⬜ |

---

## 📌 Phân bổ câu hỏi theo đối tượng

| Đối tượng | Nhóm ưu tiên | Lý do |
|:--|:--|:--|
| Người dùng hàng ngày (Ops) | A, B | Biết rõ pain point & shadow system |
| Quản lý cấp trung | B, C, E | Biết bài toán tăng trưởng & KPI |
| Ban lãnh đạo | E, C | Quyết định ngân sách & tiêu chí thành công |
| Bộ phận IT / Kỹ thuật | A, F | Biết dữ liệu, hạ tầng, rủi ro migration |
| Stakeholder từng trải qua triển khai cũ | D | Kinh nghiệm xương máu |

## 📌 Ưu tiên nhóm theo tình huống

| Tình huống | Ưu tiên |
|:--|:--|
| Stakeholder chỉ than mà không rõ vấn đề | Nhóm B trước |
| Tổ chức đã từng triển khai thất bại | Nhóm D trước |
| Dự án có deadline cứng hoặc ngân sách hạn chế | Nhóm E + F trước |
| Tổ chức đang tăng trưởng nhanh | Nhóm C trước |
| Hệ thống cũ vẫn đang chạy, chưa bị hỏng hẳn | Nhóm A trước |
