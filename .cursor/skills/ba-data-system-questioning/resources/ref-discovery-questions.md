# REF: Câu hỏi Khám phá Dữ liệu Nguồn (Discovery Side)
<!--
Version: 1.0.0 | Author: M2MBA | Last Updated: 2026-03-01
Dùng bởi skill: ba-data-system-questioning
Phạm vi: Tầng 0–3.5 — Nguyên nhân gốc rễ → Data Source → Business Logic → Lineage → Quy trình nghiệp vụ
-->

---

## TẦNG 0: NGUYÊN NHÂN GỐC RỄ & BỐI CẢNH DỰ ÁN
> Hỏi trước tiên — không hiểu "tại sao" thì dễ build đúng yêu cầu nhưng sai vấn đề

### 🌱 Nhóm 0: Tại sao dự án này tồn tại?

| # | Câu hỏi | Lý do hỏi |
|---|---------|-----------|
| 0.1 | Điều gì đang xảy ra trong thực tế khiến dự án này được khởi động — sự cố cụ thể, áp lực từ đâu, hay cơ hội gì? | Phân biệt dự án "phải làm" (driven by pain) vs "muốn làm" — ảnh hưởng đến mức độ ưu tiên và scope |
| 0.2 | Trước khi có hệ thống này, mọi người đang giải quyết bài toán đó bằng cách nào? Tại sao cách đó không còn đủ nữa? | Workaround hiện tại thường chứa business logic ẩn và lộ ngưỡng chịu đựng thực sự |
| 0.3 | Nếu dự án này không được làm, điều tệ nhất có thể xảy ra là gì? Trong bao lâu? | Xác định mức độ khẩn cấp thực sự — tránh overscope dự án "nice-to-have" |
| 0.4 | Ai là người khởi xướng dự án này — C-level, IT, hay một bộ phận cụ thể? Động lực của họ là gì? | Người khởi xướng thường có hidden agenda — biết trước để tránh xung đột yêu cầu sau |
| 0.5 | Đã có dự án tương tự được thử trước đây chưa? Nếu có, tại sao thất bại hoặc không đạt kỳ vọng? | Lịch sử thất bại chứa bài học quan trọng nhất — tránh lặp lại sai lầm cũ |
| 0.6 | Thành công của dự án này được đo bằng chỉ số gì sau 6 tháng go-live? Ai là người đánh giá? | Không có KPI rõ từ đầu → dự án dễ bị "done nhưng không ai dùng" |
| 0.7 | Có áp lực bên ngoài nào đang thúc đẩy dự án không — quy định pháp lý, yêu cầu tập đoàn mẹ, deadline audit? | Regulatory/compliance driver thường là hard constraint ẩn — bỏ sót là rủi ro pháp lý |

---

## TẦNG 1: DATA SOURCE — Hiểu dữ liệu đầu vào từ gốc đến ngọn
> **Quy trình bắt buộc**: Xác định nguồn → Xin artifact thực tế → Đọc hiểu cấu trúc → Profile từng trường → Map vào metric

### 🗄️ Nhóm 1a: Kiểm kê nguồn & Xin artifact thực tế

| # | Câu hỏi / Hành động | Lý do |
|---|---------------------|-------|
| 1a.1 | Để tính được [output cuối cùng], cần những loại dữ liệu gì? Mỗi loại đang nằm ở đâu — hệ thống nào, database nào, file nào? | Lập bản đồ tất cả nguồn trước khi đi vào chi tiết |
| 1a.2 | Ai là data owner của từng nguồn — ai chịu trách nhiệm về độ chính xác và ai có thể cấp quyền truy cập? | Xác định người cần phỏng vấn tiếp và người có thể cung cấp artifact |
| 1a.3 | Nguồn nào là "source of truth" khi hai nguồn cho kết quả khác nhau? Có được document chính thức không? | Conflict resolution rule phải rõ trước khi build bất kỳ thứ gì |
| 1a.4 | **[Action]** Xin file Excel/CSV mẫu thực tế — không cần đầy đủ, 50–100 dòng là đủ để phân tích cấu trúc | Xem trực tiếp lộ ra vấn đề mà mô tả bằng lời không bao giờ đủ |
| 1a.5 | **[Action]** Nếu nguồn là database: xin ERD hoặc data dictionary, hoặc ít nhất danh sách bảng và mô tả ngắn | Không có cấu trúc DB thì mọi thảo luận về requirement đều là phỏng đoán |
| 1a.6 | **[Action]** Nếu nguồn là API: xin API spec hoặc response mẫu thực tế của các endpoint liên quan | API response thực tế thường khác documentation — cần xem cả hai |
| 1a.7 | Dữ liệu được cập nhật vào nguồn theo chu kỳ nào — realtime, batch hàng ngày, hay thủ công? Ai trigger? | Freshness của nguồn quyết định freshness tối đa của toàn hệ thống |

---

### 📋 Nhóm 1b: Cấu trúc nguồn Excel/File *(SAU KHI có file thực tế)*

| # | Câu hỏi | Lý do |
|---|---------|-------|
| 1b.1 | File này có bao nhiêu sheet? Mỗi sheet chứa loại dữ liệu gì — có phải tất cả đều cần không? | Tránh import toàn bộ khi chỉ cần một phần |
| 1b.2 | Dòng nào là header thực sự? Có dòng merge cell, subtotal, hay ghi chú không? | Excel "dirty" thường có header nhiều tầng, merge cell — phức tạp hơn tưởng |
| 1b.3 | Mỗi dòng đại diện cho cấp độ chi tiết nào — một giao dịch, một chuyến bay, hay một summary? | Grain của dữ liệu — sai điều này là sai toàn bộ cách tính |
| 1b.4 | Đi qua từng cột quan trọng: tên cột này nghĩa là gì? Giá trị ví dụ là gì? Đơn vị là gì? | Tên cột trong Excel thường viết tắt hoặc mơ hồ — phải hỏi rõ từng cái |
| 1b.5 | Có cột nào chứa công thức Excel không — derived từ cột khác trong cùng file? | Cột công thức = business logic đang làm thủ công — cần capture để tái tạo |
| 1b.6 | Có cột nào mà người dùng hay để trống hoặc nhập "N/A", "không rõ", "TBD"? | Cột hay bị bỏ trống lộ ra data gap thực tế |
| 1b.7 | File này có được điền theo template cố định không, hay mỗi người điền theo cách riêng? | Không có template cố định → cần chuẩn hóa trước khi import |

---

### 🗃️ Nhóm 1c: Cấu trúc nguồn Database *(SAU KHI có ERD/danh sách bảng)*

| # | Câu hỏi | Lý do |
|---|---------|-------|
| 1c.1 | Trong số các bảng trong DB, bảng nào là bảng chính? Các bảng khác có vai trò gì — lookup, log, hay config? | Xác định scope trước để không bị lạc trong DB có hàng trăm bảng |
| 1c.2 | Primary key của bảng chính là gì? Nó có ý nghĩa nghiệp vụ gì không — ví dụ mã chuyến bay, mã giao dịch? | Hiểu PK để join đúng và hiểu grain của bảng |
| 1c.3 | Đi qua từng cột quan trọng: cột này chứa gì, kiểu dữ liệu là gì, đơn vị là gì, giá trị ví dụ trông như thế nào? | Tên cột trong DB thường viết tắt kỹ thuật — phải hỏi rõ nghĩa nghiệp vụ |
| 1c.4 | Có cột nào chứa code/enum cần tra bảng lookup không — ví dụ status_code = 1, 2, 3? Bảng lookup ở đâu? | Code không có lookup table = dữ liệu không đọc được nếu không có người giải thích |
| 1c.5 | Có cột timestamp không — created_at, updated_at, event_time? Timezone lưu là gì? | Timestamp timezone sai âm thầm — gây lệch số liệu theo giờ/ngày |
| 1c.6 | Cột nào thường có giá trị null? Null có nghĩa là "chưa có", "không áp dụng", hay "không biết"? | Ba loại null này có ý nghĩa khác nhau trong tính toán |
| 1c.7 | Dữ liệu có bị soft-delete không — có cột is_deleted, status = 'inactive'? Cần filter ra khi lấy? | Soft-delete hay bị bỏ qua — tính ra số liệu bị thừa |

---

### 🔬 Nhóm 1d: Data Profiling — Chất lượng thực tế

| # | Câu hỏi | Lý do |
|---|---------|-------|
| 1d.1 | Với các trường quan trọng nhất: tỷ lệ null/trống là bao nhiêu %? Tần suất xảy ra? | Completeness thực tế — ảnh hưởng trực tiếp đến độ tin cậy của metric |
| 1d.2 | Có giá trị nào bất thường không — âm khi lẽ ra phải dương, vượt range hợp lệ? | Outlier detection — tìm lỗi dữ liệu ngay từ source |
| 1d.3 | Định dạng có nhất quán không — ví dụ ngày có chỗ DD/MM/YYYY, có chỗ YYYY-MM-DD? | Format inconsistency là nguyên nhân phổ biến nhất của pipeline lỗi âm thầm |
| 1d.4 | Dữ liệu các kỳ trước có cấu trúc và chất lượng tương tự không, hay chỉ dữ liệu gần đây mới tốt? | Historical data quality thường tệ hơn recent data — ảnh hưởng đến phân tích xu hướng |
| 1d.5 | Có record nào trùng lặp không — cùng key nhưng có nhiều dòng? Trùng là do lỗi hay do thiết kế? | Duplicate là nguyên nhân phổ biến nhất của double-counting |

---

### 🔗 Nhóm 1e: Mapping — Trường nào dùng để tính gì?

| # | Câu hỏi | Lý do |
|---|---------|-------|
| 1e.1 | Metric [tên metric] cần dùng những trường nào? Mỗi trường đó nằm ở bảng/cột nào? | Tạo field-level mapping — nền tảng để viết transformation logic |
| 1e.2 | Có trường nào cần dùng nhưng hiện tại **không có** trong nguồn không? Dữ liệu đó đang nằm ở đâu? | Phát hiện data gap sớm — tránh phát hiện muộn khi đã thiết kế xong |
| 1e.3 | Có trường nào cần join từ nhiều bảng/nguồn khác nhau không? Join theo key nào? Quan hệ 1-1, 1-N, hay N-N? | Join cardinality sai → data explosion hoặc thiếu data |
| 1e.4 | Với derived field — công thức cụ thể là gì? Dữ liệu đầu vào cho công thức đó nằm ở đâu? | Derived field phải được trace về tận raw field trong source |
| 1e.5 | Sau khi mapping xong: có trường nào BA hiểu khác với stakeholder hiểu không? | Validate lại toàn bộ mapping trước khi chốt — sai ở đây là sai toàn bộ hệ thống |

---

## TẦNG 2: CÔNG THỨC TÍNH TOÁN — Business Logic

### 📐 Nhóm 2: Định nghĩa Metric & Khai thác Business Logic
> **Nguyên tắc vàng**: Không dừng lại ở câu trả lời bằng lời. Hỏi đến khi stakeholder chỉ được vào **con số thực tế** và giải thích **từng bước tính**.

| # | Câu hỏi | Lý do hỏi |
|---|---------|-----------|
| 2.1 | [Tên metric] được định nghĩa chính thức là gì? Có tài liệu, email, hay văn bản nào ghi lại không? | Tìm nguồn định nghĩa chính thức — tránh phụ thuộc vào trí nhớ stakeholder |
| 2.2 | Muốn tự tính [metric] này bằng tay từ dữ liệu thô, tôi cần làm gì — bước 1, bước 2, bước 3? | Buộc stakeholder diễn đạt thành quy trình tuần tự — lộ ra các bước transform ẩn |
| 2.3 | Anh/chị có thể lấy con số [metric] kỳ gần nhất và chỉ cho tôi thấy nó được tính từ những records nào không? | "Truy ngược từ output" — hiệu quả nhất để phát hiện logic ẩn |
| 2.4 | Có những trường hợp nào bị **loại trừ** khỏi phép tính này không — đơn hủy, giao dịch nội bộ, test? | Điều kiện loại trừ thường bị quên nhắc nhưng ảnh hưởng lớn đến kết quả |
| 2.5 | Có metric nào hiện đang bất đồng giữa các phòng ban về cách tính không? Ai đang đúng? | Phát hiện conflict sớm — tránh build xong rồi mới tranh luận |
| 2.6 | Nếu một record vừa thỏa điều kiện A vừa thỏa điều kiện B, tính một lần hay hai lần? | Double-counting là lỗi phổ biến nhất trong analytics |
| 2.7 | Metric này tính theo event time (thời điểm xảy ra) hay processing time (thời điểm ghi vào hệ thống)? | Sai điều này dẫn đến số liệu sai cả kỳ — không dễ phát hiện |
| 2.8 | Có sự kiện nào xảy ra sau kỳ tính nhưng ảnh hưởng ngược lại kỳ trước không — hoàn tiền, điều chỉnh? | Late-arriving data và retroactive adjustment cần xử lý riêng |
| 2.9 | Công thức này có thay đổi theo năm/giai đoạn không? Nếu so sánh 2 năm, số còn so sánh được không? | Historical consistency — thường bị bỏ qua đến khi BOM hỏi tại sao số năm ngoái khác |

### ✅ Nhóm 2b: Kiểm chứng công thức bằng số thực *(Bắt buộc sau khi có công thức sơ bộ)*

| # | Hành động | Mục đích |
|---|-----------|----------|
| 2b.1 | Yêu cầu stakeholder mở hệ thống/file và chỉ con số [metric] kỳ gần nhất | Lấy baseline thực tế để kiểm chứng |
| 2b.2 | Cùng stakeholder tính lại từ đầu theo công thức vừa mô tả | Nếu khớp → đúng. Nếu không → còn logic ẩn |
| 2b.3 | "Tại sao kết quả tôi tính được là X nhưng hệ thống ra Y — chênh lệch đến từ đâu?" | Câu hỏi vàng — thường lộ ra adjustment thủ công hay business rule ẩn |
| 2b.4 | Lấy thêm 1–2 kỳ khác để kiểm chứng lại | Đảm bảo công thức đúng không chỉ cho một kỳ đặc biệt |

---

## TẦNG 3: DATA LINEAGE

### 🗺️ Nhóm 3: Luồng dữ liệu & Transformation Rules

| # | Câu hỏi | Lý do hỏi |
|---|---------|-----------|
| 3.1 | Từ khi dữ liệu được tạo ra ở nguồn đến khi xuất hiện trên dashboard, nó đi qua những hệ thống hoặc bước xử lý nào? | Map toàn bộ lineage — thường có nhiều bước trung gian không ai để ý |
| 3.2 | Ở mỗi bước trung gian, dữ liệu có bị thay đổi, lọc, hay tổng hợp gì không? Ai làm và theo rule nào? | Mỗi transform là điểm rủi ro — cần document rõ |
| 3.3 | Có bước nào đang được làm thủ công bởi một người cụ thể không? | Single point of failure — người đó nghỉ thì luồng đứt |
| 3.4 | Nếu dữ liệu sai xuất hiện trên báo cáo cuối, làm thế nào để trace ngược lại? | Đánh giá khả năng troubleshoot — không trace được là vấn đề lớn |
| 3.5 | Có bảng mapping nào dùng trong transformation — mã hóa, chuẩn hóa tên, quy đổi đơn vị? Ai maintain? | Mapping table hay bị giữ trong đầu người hoặc Excel cũ — rủi ro cao |
| 3.6 | Khi aggregation, xử lý null như thế nào — bỏ qua, tính là 0, hay flag lỗi? | Null handling trong aggregation là nguồn sai số âm thầm |

---

## TẦNG 3.5: QUY TRÌNH NGHIỆP VỤ XUNG QUANH DATA
> Hệ thống data không tự vận hành — luôn có con người và quy trình bao quanh. Bỏ sót tầng này → hệ thống đúng kỹ thuật nhưng không ai dùng được đúng cách.

### 🔁 Nhóm 3.5a: Quy trình nhập & phê duyệt dữ liệu

| # | Câu hỏi | Lý do hỏi |
|---|---------|-----------|
| 3.5a.1 | Ai là người có quyền nhập/import dữ liệu vào hệ thống? Họ được cấp quyền dựa trên tiêu chí gì? | Xác định access control ngay từ đầu — không phải sau khi build xong |
| 3.5a.2 | Sau khi import, có bước review hoặc approve trước khi dùng chính thức không? Ai review, theo tiêu chí gì? | Data approval workflow — thiếu thì ai cũng import được, dữ liệu không đáng tin |
| 3.5a.3 | Nếu reviewer phát hiện dữ liệu import có vấn đề, họ làm gì — reject toàn bộ, flag từng dòng, hay sửa trực tiếp? | Rejection flow phải rõ — không có thì người import không biết phải làm gì tiếp |
| 3.5a.4 | Dữ liệu sau khi được approve có thể bị sửa thêm không? Ai được sửa và cần approve lại không? | Post-approval edit là rủi ro với audit trail — đặc biệt với hệ thống compliance |

### 🚨 Nhóm 3.5b: Quy trình xử lý khi dữ liệu có vấn đề

| # | Câu hỏi | Lý do hỏi |
|---|---------|-----------|
| 3.5b.1 | Khi phát hiện dữ liệu sai, quy trình xử lý hiện tại là gì, từng bước? | Map toàn bộ error handling flow thực tế, không phải flow lý tưởng |
| 3.5b.2 | Ai có quyền sửa dữ liệu đã được phê duyệt? Việc sửa đó có cần approve bởi người khác không? | Phân quyền correction — đặc biệt quan trọng với hệ thống regulatory |
| 3.5b.3 | Sau khi sửa, hệ thống cần lưu lại những gì — ai sửa, sửa cái gì, lý do sửa, sửa lúc nào? | Audit trail của correction — yêu cầu bắt buộc với nhiều loại compliance |
| 3.5b.4 | Nếu lỗi dữ liệu ảnh hưởng đến báo cáo đã gửi đi rồi, quy trình xử lý thế nào? | Retroactive correction — tình huống khó nhất, cần có plan cụ thể |
| 3.5b.5 | Ai chịu trách nhiệm cuối cùng khi có dữ liệu sai — data owner, người nhập, hay người approve? | Accountability không rõ → không ai chịu trách nhiệm → lỗi lặp lại |
