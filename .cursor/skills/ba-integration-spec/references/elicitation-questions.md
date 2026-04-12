---
Version: 1.0.0
Author: M2MBA
Last Updated: 2026-03-14
Description: Bộ câu hỏi elicitation đầy đủ (Nhóm A/B/C) cho Bước 10 của ba-integration-spec
---

# Bộ câu hỏi Elicitation – Bước 10

> Thực hiện **sau khi đã hoàn thành A→H**. Skill tự động đối chiếu A→H để đánh dấu 🔴 (chưa có thông tin) và 🟡 (cần confirm).

---

## Nhóm A – Hỏi Stakeholder Biz (Business / Product Owner)
*Tập trung vào: tại sao, cái gì, kỳ vọng nghiệp vụ.*

**1. Mục tiêu & phạm vi nghiệp vụ**
- Tích hợp này giải quyết vấn đề gì? KPI kỳ vọng sau tích hợp là gì?
- Phạm vi giai đoạn 1 gồm những luồng nào? Luồng nào để roadmap sau?
- Nếu tích hợp thất bại hoặc chậm, nghiệp vụ bị ảnh hưởng thế nào (tài chính, UX, vận hành)?

**2. Quy tắc & ngoại lệ nghiệp vụ**
- Có trường hợp nào phải xử lý khác luồng thông thường không (VIP, đơn đặc biệt, vùng không phục vụ…)?
- Khi dữ liệu hai bên mâu thuẫn nhau, bên nào là source of truth?
- Có yêu cầu về thứ tự xử lý hoặc điều kiện tiên quyết nào mà tài liệu API chưa đề cập không?

**3. Kỳ vọng hiệu năng & SLA**
- Cần đồng bộ real-time, near-real-time hay batch? Tần suất nếu là batch?
- Nếu đối tác downtime, quy trình fallback thủ công là gì? Ai thực hiện?
- Thời gian delay tối đa hệ thống có thể chấp nhận mà không ảnh hưởng nghiệp vụ?

**4. Bảo mật & tuân thủ**
- Dữ liệu trao đổi có chứa PII, dữ liệu tài chính, hoặc dữ liệu nhạy cảm nào không?
- Có yêu cầu compliance nào cần tuân thủ (GDPR, PCI-DSS, Thông tư ngân hàng…)?
- Ai được phép xem / chỉnh sửa dữ liệu tích hợp phía nghiệp vụ?

**5. Vận hành & ownership sau go-live**
- Sau go-live, ai chịu trách nhiệm xử lý incident tích hợp phía nội bộ?
- Có yêu cầu báo cáo hoặc dashboard theo dõi tình trạng tích hợp không?
- Quy trình phê duyệt khi cần thay đổi cấu hình tích hợp là gì?

---

## Nhóm B – Hỏi Đối tác tích hợp (Technical / Solution Team)
*Tập trung vào: kỹ thuật, giới hạn, độ tin cậy. Câu hỏi thay đổi theo loại tích hợp đã nhận diện.*

**Chung cho mọi loại:**
- Môi trường test/sandbox: có không, credential ai cấp, có đủ edge case không?
- Khi có breaking change, thông báo trước bao lâu qua kênh nào?
- Ai là đầu mối kỹ thuật khi có sự cố? SLA hỗ trợ của đối tác?
- Encoding, timezone, định dạng ngày tháng dùng chuẩn gì?

---

**🌐 REST API — câu hỏi bổ sung:**
- Authentication: OAuth2 / API Key / mTLS? Token expiry bao lâu, refresh thế nào?
- Rate limit: bao nhiêu request/giây hoặc/ngày? Có quota theo account không?
- API có idempotency không? Gọi trùng lần 2 xử lý thế nào?
- Timeout mặc định bao lâu? Retry do đối tác xử lý hay bên mình tự làm?
- Có webhook/callback để đối tác push trạng thái về không? Cơ chế retry của webhook?
- Giá trị null và field không có trong response xử lý thế nào?

---

**📁 File-based — câu hỏi bổ sung:**
- Giao thức truyền file: SFTP / FTPS / S3 / API upload? Credential dạng gì (key pair / password)?
- Naming convention file có cố định không? Có thể có nhiều file cùng ngày không?
- File có header row không? Encoding (UTF-8 / UTF-8 BOM / Windows-1252)?
- Delimiter thực tế là gì? Có escape character khi field chứa delimiter không?
- Nếu file lỗi cấu trúc, quy trình xử lý thế nào — reject toàn bộ hay partial import?
- Có file acknowledgement / response file từ đối tác sau khi xử lý không?
- Thư mục lưu file processed/error được dọn dẹp định kỳ không?
- Khi đối tác chưa có file đúng giờ, có cơ chế thông báo không?

---

**📨 Message Queue — câu hỏi bổ sung:**
- Broker loại gì (Kafka / RabbitMQ / SQS / Azure Service Bus)? Version?
- Delivery guarantee: at-most-once / at-least-once / exactly-once?
- Message ordering có được đảm bảo không (per partition/per queue)?
- Schema format: JSON / Avro / Protobuf? Có Schema Registry không?
- Cơ chế xử lý khi consumer fail: DLQ, retry tự động, hay thủ công?
- Message retention bao lâu? Consumer group phía mình tự quản lý offset không?
- Có thể replay message từ offset cụ thể không?
- Throughput dự kiến (messages/giây)? Có cần partition riêng không?

---

**🔧 SOAP / Web Service — câu hỏi bổ sung:**
- WSDL endpoint có ổn định không hay thay đổi theo môi trường?
- WS-Security dùng UsernameToken hay Certificate?
- Có giới hạn kích thước SOAP envelope không?
- Fault code / FaultString chuẩn hóa như thế nào?
- Có MTOM/XOP cho attachment không?

---

## Nhóm C – Câu hỏi confirm cả hai bên
*Hỏi trong buổi 3-way sau khi đã align từng bên riêng.*

| Chủ đề | Câu hỏi cần confirm |
|--------|---------------------|
| **Field mapping** | Tên field bên biz gọi là gì vs đối tác gọi là gì? Kiểu dữ liệu có khớp không? |
| **Status mapping** | Trạng thái đối tác trả về có tương đương 1-1 với trạng thái nội bộ không? Có trạng thái nào chưa có mapping? |
| **Rollout plan** | Go-live khi nào? Cutover data cũ thế nào? Kế hoạch rollback nếu lỗi? |
| **Data reconciliation** | Nếu dữ liệu hai bên lệch nhau, quy trình đối chiếu và xử lý là gì? Tần suất? |
| **Ownership incident** | Ai là đầu mối khi có sự cố? Alert gửi về đâu? Escalation path là gì? |
| **Môi trường chuyển đổi** | Khi nào chuyển từ sandbox sang production? Cần kiểm tra điều kiện gì? |

> 💡 **Tip cho BA**: Tổ chức **ít nhất 2 buổi elicitation riêng** — 1 với Biz, 1 với đối tác — trước buổi 3-way confirm. Buổi 3-way mà chưa align từng bên trước thường tốn rất nhiều thời gian vào việc giải thích khái niệm cơ bản thay vì ra được quyết định.

---

## Cách sinh câu hỏi ưu tiên

Sau khi hoàn thành A→H, skill tự động:

1. **Rà soát các "Giả định"** trong A→H → đánh dấu 🔴 vào câu hỏi liên quan.
2. **Rà soát field chưa rõ Source** trong bảng D' → đánh dấu 🟡 vào câu hỏi nhóm A/B tương ứng.
3. **Rà soát field Persist = Yes nhưng Purpose chưa rõ** → thêm câu hỏi đối soát/tracking vào nhóm C.
4. In ra **danh sách câu hỏi theo thứ tự ưu tiên** (🔴 trước, 🟡 sau), gom theo nhóm A / B / C.

**Ví dụ output:**
```
📋 BỘ CÂU HỎI ELICITATION – [Tên hệ thống đối tác]

=== NHÓM A – Hỏi Stakeholder Biz ===
🔴 [Mục tiêu] Nếu tích hợp CreateShipment thất bại, fallback thủ công là gì?
🔴 [Quy tắc] Đơn có COD và đơn không COD xử lý luồng khác nhau không?
🟡 [SLA] Thời gian đồng bộ trạng thái đơn hàng tối đa bao lâu?

=== NHÓM B – Hỏi Đối tác tích hợp ===
🔴 [Reliability] API CreateCustomer có idempotency không?
🔴 [Test] Sandbox có mock case lỗi 4xx cho CreateShipment không?
🟡 [Data] Trường `status` trong response có thể thêm giá trị mới không cần báo trước không?

=== NHÓM C – Confirm cả hai bên ===
🔴 [Status mapping] Trạng thái "RETURNED" của đối tác map sang trạng thái nào trong hệ thống nội bộ?
🟡 [Rollout] Kế hoạch cutover data đơn cũ sang model tích hợp mới thế nào?
```
