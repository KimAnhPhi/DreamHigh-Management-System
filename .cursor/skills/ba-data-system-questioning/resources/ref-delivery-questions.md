# REF: Câu hỏi Phục vụ & Vận hành Dữ liệu (Delivery Side)
<!--
Version: 1.0.0 | Author: M2MBA | Last Updated: 2026-03-01
Dùng bởi skill: ba-data-system-questioning
Phạm vi: Tầng 4–6 — Output/Báo cáo → Chiều phân tích → Vận hành → Tích hợp → Tăng trưởng → Rebuild
-->

---

## TẦNG 3.5: QUY TRÌNH NGHIỆP VỤ (tiếp)

### 📊 Nhóm 3.5c: Quy trình ra quyết định từ data

| # | Câu hỏi | Lý do hỏi |
|---|---------|-----------|
| 3.5c.1 | Khi BOM/manager xem dashboard và thấy con số bất thường, bước tiếp theo của họ là gì — gọi ai, ra quyết định gì? | Hiểu decision-making flow để thiết kế dashboard hỗ trợ đúng hành động, không chỉ hiển thị số |
| 3.5c.2 | Quyết định nào đang được ra dựa trên data từ hệ thống này? Tần suất ra quyết định — hàng ngày, hàng tuần, hay theo sự kiện? | Xác định cadence để thiết kế freshness requirement đúng |
| 3.5c.3 | Hiện tại mất bao lâu từ lúc có câu hỏi đến lúc có câu trả lời từ data? Hệ thống mới cần rút ngắn xuống bao lâu? | Đo baseline và kỳ vọng cải thiện — tránh build hệ thống không nhanh hơn cách cũ |
| 3.5c.4 | Có quyết định nào hiện đang bị trì hoãn vì thiếu data hoặc data đến quá chậm không? | Lộ ra pain point thực sự mà dashboard cần giải quyết |

---

## TẦNG 4: OUTPUT & SỬ DỤNG

### 📋 Nhóm 4a: Biểu mẫu, Báo cáo & Nhu cầu người dùng

| # | Câu hỏi | Lý do hỏi |
|---|---------|-----------|
| 4a.1 | Những báo cáo nào đang được gửi định kỳ qua email — ai gửi, gửi cho ai, tần suất, định dạng? | Báo cáo đang gửi = yêu cầu thực tế đang tồn tại, không phải kỳ vọng |
| 4a.2 | Hệ thống mới cần tạo ra những báo cáo gì? Ai xem, dùng để ra quyết định gì? | Xác định output và người dùng thực sự của từng report |
| 4a.3 | Có báo cáo nào phải nộp cho cơ quan bên ngoài theo format quy định không? | Regulatory report có format cứng — cần xin template thực tế ngay |
| 4a.4 | Người dùng xem dashboard/báo cáo trên thiết bị gì — màn hình lớn, laptop, điện thoại? | Ảnh hưởng trực tiếp đến thiết kế UI/UX |
| 4a.5 | Có cần export ra Excel/PDF không? Định kỳ tự động hay theo yêu cầu? | Nhu cầu export thường xuất hiện muộn nếu không hỏi sớm |
| 4a.6 | Nếu chỉ có 3 con số trên dashboard, anh/chị chọn cái nào? | Buộc ưu tiên — tránh build 20 metric mà chỉ dùng 5 |

### 🔍 Nhóm 4b: Chiều phân tích & Drill-down

| # | Câu hỏi | Lý do hỏi |
|---|---------|-----------|
| 4b.1 | Ngoài con số tổng, người dùng muốn xem chi tiết theo những chiều nào — vùng, sản phẩm, kênh, nhân viên? | Xác định dimensions cần thiết để thiết kế data model đúng ngay từ đầu |
| 4b.2 | Khi thấy con số bất thường, người dùng thường muốn "đào" sâu theo hướng nào đầu tiên? | Định nghĩa drill-down path ưu tiên |
| 4b.3 | Có phân cấp tổ chức hay địa lý nào cần thể hiện không — Toàn quốc > Miền > Tỉnh > Chi nhánh? | Hierarchy ảnh hưởng đến data model và cách aggregate |
| 4b.4 | Người dùng có cần so sánh theo thời gian không — MoM, YoY, so với target, so với cùng kỳ? | Nếu có so sánh, cần thêm dimension kế hoạch vào data model |
| 4b.5 | Có KPI hay target nào được đặt trước không? Dashboard có cần hiển thị actual vs target không? | Target là chiều dữ liệu riêng — cần biết sớm để thiết kế đúng |

---

## TẦNG 5: VẬN HÀNH & KỸ THUẬT

### ⏱️ Nhóm 5a: Tần suất & Độ tươi dữ liệu

| # | Câu hỏi | Lý do hỏi |
|---|---------|-----------|
| 5a.1 | Dữ liệu cần cập nhật bao lâu một lần — realtime, mỗi giờ, hàng ngày? | "Realtime" của business và kỹ thuật thường khác nhau hoàn toàn |
| 5a.2 | Nếu dữ liệu bị trễ 2 tiếng, ảnh hưởng thế nào đến quyết định người dùng? | Đo lường business impact của data latency — cơ sở để quyết định architecture |
| 5a.3 | Có khung giờ nào mà dữ liệu tuyệt đối phải có mặt không — ví dụ: phải đúng trước 8 giờ sáng? | Hard deadline → SLA cứng cho pipeline |
| 5a.4 | Dữ liệu lịch sử cần lưu bao lâu? Có cần so sánh cùng kỳ nhiều năm trước không? | Retention policy ảnh hưởng đến storage design và query performance |

### 👁️ Nhóm 5b: Phân quyền & Bảo mật

| # | Câu hỏi | Lý do hỏi |
|---|---------|-----------|
| 5b.1 | Có thông tin nào chỉ một số người được xem không — chi phí, margin, lương, dữ liệu cá nhân? | Thiết kế row-level security hay column masking phải biết sớm |
| 5b.2 | Phân quyền dựa trên chức danh hay cấp từng người riêng? | Role-based vs attribute-based access — ảnh hưởng đến complexity |
| 5b.3 | Khi nhân viên thay đổi vị trí, quyền truy cập dữ liệu cũ xử lý thế nào? | Access lifecycle management thường bị bỏ qua đến khi có sự cố |
| 5b.4 | Có yêu cầu audit log — ghi lại ai xem dữ liệu gì vào lúc nào không? | Audit trail là yêu cầu compliance phổ biến — thiết kế sau rất tốn kém |
| 5b.5 | Có người dùng bên ngoài tổ chức cần truy cập không — auditor, đối tác, cơ quan quản lý? | External access cần thiết kế security layer riêng |

### 🔗 Nhóm 5c: Tích hợp & Upstream/Downstream

| # | Câu hỏi | Lý do hỏi |
|---|---------|-----------|
| 5c.1 | Ngoài việc hiển thị, dữ liệu từ hệ thống này có được đẩy sang hệ thống nào khác không? | Downstream dependency thường xuất hiện muộn và làm scope creep |
| 5c.2 | Khi hệ thống nguồn thay đổi cấu trúc dữ liệu, ai thông báo và quy trình xử lý thế nào? | Schema change management — thiếu là pipeline vỡ không báo trước |
| 5c.3 | API hay file export nào cần cung cấp cho đối tác hoặc hệ thống bên ngoài không? | External interface có SLA riêng — cần biết sớm |
| 5c.4 | Dữ liệu xử lý theo batch hay streaming? Nếu một record lỗi, pipeline dừng hay bỏ qua và tiếp tục? | Error handling strategy ảnh hưởng đến toàn bộ thiết kế pipeline |

### 🛠️ Nhóm 5d: Vận hành & Xử lý sự cố

| # | Câu hỏi | Lý do hỏi |
|---|---------|-----------|
| 5d.1 | Khi pipeline lỗi và dữ liệu không cập nhật, ai cần được thông báo và trong bao lâu? | Incident response plan phải rõ trước go-live |
| 5d.2 | Nếu phát hiện dữ liệu sai đã được publish, quy trình rollback và correction thế nào? | Có rollback strategy không là câu hỏi sống còn |
| 5d.3 | Ai là người vận hành hệ thống sau khi bàn giao — đội IT nội bộ hay outsource? Họ cần training gì? | Operator năng lực thấp hơn builder — cần thiết kế cho người vận hành, không phải người xây |
| 5d.4 | Có cần monitoring tự động cảnh báo khi dữ liệu bất thường không — giảm đột ngột, null rate tăng? | Proactive monitoring vs reactive troubleshooting — ảnh hưởng đến data trust |

---

## TẦNG 6: TĂNG TRƯỞNG & REBUILD

### 📈 Nhóm 6a: Mở rộng & Tương lai

| # | Câu hỏi | Lý do hỏi |
|---|---------|-----------|
| 6a.1 | Khối lượng dữ liệu hiện tại là bao nhiêu? Dự kiến tăng trưởng trong 2–3 năm tới? | Data volume thường bị underestimate — ảnh hưởng lớn đến lựa chọn technology |
| 6a.2 | Có metric hay dimension nào đang được yêu cầu nhưng chưa có dữ liệu để làm ngay không? | Biết để plan cho phase sau — không bị surprise scope |
| 6a.3 | Trong 6 tháng tới, có nguồn dữ liệu mới nào dự kiến cần tích hợp thêm không? | Extensibility phải được thiết kế từ đầu |

### 🔄 Nhóm 6b: Hệ thống cũ & Chuyển đổi *(CHỈ dùng khi là Rebuild/Migration)*
> **Nhận diện**: stakeholder đề cập "hệ thống cũ", "làm lại", "nâng cấp", "chuyển sang cái mới"

**6b-I: Hiểu hệ thống cũ**

| # | Câu hỏi | Lý do hỏi |
|---|---------|-----------|
| 6b.1 | Hệ thống hiện tại là gì? Xây từ bao giờ? | Biết tuổi và công nghệ để đánh giá technical debt |
| 6b.2 | Tính năng nào của hệ thống cũ đang hoạt động tốt và cần giữ lại? | Không phải mọi thứ cũ đều cần thay — tránh "fix cái không hỏng" |
| 6b.3 | Có tính năng nào đang dùng nhưng không được document — chỉ người cũ biết — không? | Hidden feature là rủi ro lớn nhất của Rebuild |
| 6b.4 | Có thể cho xem query/code của hệ thống cũ không? | Code thường chứa business logic thực tế chính xác hơn tài liệu |

**6b-II: Dữ liệu & Migration**

| # | Câu hỏi | Lý do hỏi |
|---|---------|-----------|
| 6b.5 | Dữ liệu lịch sử có cần migrate không? Bao nhiêu năm? | Volume migration ảnh hưởng lớn đến timeline và risk |
| 6b.6 | Dữ liệu hiện tại có sạch và nhất quán không? | Data quality của hệ thống cũ thường tệ hơn kỳ vọng |
| 6b.7 | Hệ thống cũ và mới có cần chạy song song không? Trong bao lâu? | Parallel run — tốn kém nhưng giảm rủi ro |

**6b-III: Quản lý thay đổi**

| # | Câu hỏi | Lý do hỏi |
|---|---------|-----------|
| 6b.8 | Có nhóm người dùng nào kháng cự việc đổi hệ thống không? Lý do? | Change resistance thường làm chậm adoption hơn technical issue |
| 6b.9 | Ai sẽ là "champion" nội bộ thúc đẩy adoption? | Champion nội bộ là yếu tố thành công quan trọng nhất của Rebuild |

> ⚠️ **Lưu ý BA**: Với Rebuild, rủi ro số 1 là **bỏ sót tính năng ẩn đang dùng**. Luôn ưu tiên hỏi kỹ 6b-I trước khi thiết kế bất kỳ thứ gì.
