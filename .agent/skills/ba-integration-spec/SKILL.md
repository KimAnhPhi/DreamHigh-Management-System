---
name: ba-integration-spec
description: "Trợ lý phân tích & thiết kế luồng tích hợp hệ thống end-to-end giữa hệ thống nội bộ và đối tác; hỗ trợ đa dạng kiểu tích hợp (REST API, File-based, Message Queue, SOAP); sinh luồng tích hợp tổng thể, sequence diagram (Mermaid), phân tích đặc tả kỹ thuật, mapping dữ liệu, đề xuất ERD và danh sách Use Case/màn hình cần có."
---

# HƯỚNG DẪN SKILL: BA INTEGRATION SPEC

**Version:** 1.4.1
**Author:** M2MBA
**Last Updated:** 2026-03-17
**Description:** Trợ lý phân tích & thiết kế luồng tích hợp hệ thống end-to-end giữa hệ thống nội bộ và đối tác, hỗ trợ đa dạng kiểu tích hợp và sinh tài liệu A-H.

Sinh **bộ tài liệu phân tích tích hợp hệ thống end-to-end** cho BA khi tích hợp với đối tác, hỗ trợ các kiểu tích hợp: **REST API, File-based (SFTP/CSV/Excel), Message Queue (Kafka/RabbitMQ), SOAP/Web Service**, và **hybrid**.

**Đầu ra A → H:**
- **A.** Tổng quan & Mục đích tích hợp
- **B.** Luồng tích hợp tổng thể (mô tả + pseudo flow)
- **C.** Sequence diagram (Mermaid) — xem mẫu tại [`references/sequence-diagram-examples.md`](references/sequence-diagram-examples.md)
- **D.** Bảng phân tích đặc tả kỹ thuật *(tên thay đổi theo loại)* — xem mẫu tại [`references/erd-and-spec-tables.md`](references/erd-and-spec-tables.md)
- **D'.** Bảng mapping dữ liệu đầu vào → nguồn
- **E.** Bảng mapping dữ liệu đầu ra → model nội bộ
- **F.** Danh sách Use Case & màn hình/chức năng cần xây
- **G.** ERD (Mermaid erDiagram) — xem mẫu tại [`references/erd-and-spec-tables.md`](references/erd-and-spec-tables.md)
- **H.** Checklist cho BA để hoàn thiện & go-live
- **Bước 10:** Bộ câu hỏi elicitation — xem đầy đủ tại [`references/elicitation-questions.md`](references/elicitation-questions.md)

**Đặc điểm:**
- Tự động nhận diện loại tích hợp → confirm với user → điều chỉnh section D, sequence, câu hỏi Nhóm B.
- Đảm bảo luồng tổng thể có đủ **bước tiền đề** (vd: tạo KH trước → lấy mã → mới tạo đơn).
- Tư duy **đa đối tác**: mapping chuẩn hoá, bảng log, cấu hình per-partner.
- Nếu thiếu thông tin → đánh dấu **"Giả định"**, in đậm chỗ cần confirm.

---

## 📥 Đầu vào bắt buộc

Khi user khởi động skill, **BẮT BUỘC hỏi** trước khi phân tích:

1. **Tên hệ thống đối tác** — File lưu vào `docs-BA/Integration/<Tên hệ thống>/`.
2. **Bối cảnh dự án & mục tiêu tích hợp** — Domain, mục tiêu: tạo gì, tra cứu gì, đồng bộ gì.
3. **Tài liệu tích hợp đối tác** — OpenAPI/Swagger, Postman, WSDL, file spec, schema message, hoặc mô tả text.
4. **Bối cảnh hệ thống nội bộ** — Các hệ thống tham gia (Core, OMS, CRM…), tích hợp nhiều đối tác không?
5. **Thông tin lưu trữ hiện hữu** — ERD hiện tại, bảng liên quan, yêu cầu tracking/đối soát.

**Nhận diện loại tích hợp** — Sau khi nhận tài liệu, tự động nhận diện rồi confirm 1 lần:

| Dấu hiệu nhận biết | Loại tích hợp |
|---|---|
| Swagger/OpenAPI, Postman, endpoint URL, HTTP Method | **REST API** |
| WSDL, XML envelope, SOAPAction, XSD | **SOAP / Web Service** |
| Tên file, layout cột, SFTP/FTP/S3, schedule truyền file | **File-based** |
| Topic/Queue name, Broker, schema message, Producer/Consumer | **Message Queue** |
| Kết hợp nhiều dấu hiệu | **Hybrid** — phân tích từng phần riêng |

Nếu không đủ dấu hiệu → hỏi thẳng: *"Đối tác tích hợp theo kiểu nào: REST API / File / Message Queue / SOAP / Hybrid?"*

---

## 🚀 Quy trình xử lý (Bước 1–10)

Khi user đã cung cấp đủ bối cảnh, **lập tức xuất bản thảo đầy đủ A→H**, đánh dấu "Giả định" rõ ràng. Không hứa hẹn "làm sau".

### Bước 1 – Phân tích bối cảnh & mục tiêu

Tóm tắt: hệ thống nội bộ → đối tác; mục tiêu nghiệp vụ; ràng buộc (SLA, retry, idempotency).

### Bước 2 – Luồng tích hợp tổng thể (A, B)

- Xác định **E2E flow** từ khởi tạo đến hoàn tất, kể cả **bước tiền đề bắt buộc**.
- Sinh mô tả text (A, B) và **pseudo flow** dạng step rõ ràng.

> ⚠️ **Quy tắc E2E bắt buộc:** Mọi pseudo flow và mô tả luồng tích hợp **PHẢI** đi theo 3 giai đoạn sau, theo đúng thứ tự:
> 1. **[AUTH]** Xác thực đối tác/người dùng — xác định cơ chế: API Key, OAuth2 (Client Credentials / Authorization Code), Basic Auth, mTLS, v.v. Mô tả nơi lưu credential, cách attach vào request (header, token, certificate).
> 2. **[DATA MAPPING]** Thiết lập dữ liệu phục vụ tích hợp — bước tiền đề tạo/đồng bộ master data (KH, kho, sản phẩm…), mapping mã nội bộ ↔ mã đối tác trước khi gọi luồng chính.
> 3. **[INTEGRATION FLOWS]** Luồng nghiệp vụ chính — gọi API / truyền file / gửi message theo từng use case.

Ví dụ minh họa:
  - **[AUTH]** Gọi `POST /oauth/token` → nhận `access_token` (TTL 1h) → lưu cache, tự refresh khi hết hạn.
  - **[DATA MAPPING]** Tạo KH nội bộ → gọi `CreateCustomer` → lưu `partnerCustomerId`; Cấu hình kho → gọi `RegisterWarehouse` → lưu `partnerWarehouseCode`.
  - **[INTEGRATION FLOWS]** Tạo đơn → dùng 2 mã trên gọi `CreateShipment`.

### Bước 3 – Sequence Diagram (C)

Sinh **Mermaid sequence diagram** với participant phù hợp từng loại. Tập trung luồng thành công; nhánh lỗi dùng `alt/else`. Chi tiết payload mô tả ở bảng D/E, không inline vào message.

> ⚠️ **Quy tắc E2E bắt buộc cho Sequence Diagram:** Diagram PHẢI thể hiện đủ 3 giai đoạn theo thứ tự:
> 1. **[AUTH]** — Luồng lấy/xác thực token (API Key header, OAuth2 Client Credentials flow, mTLS handshake…).
> 2. **[DATA MAPPING]** — Luồng thiết lập/đồng bộ master data (tạo KH, đăng ký kho, pull danh mục…) trước khi vào luồng chính.
> 3. **[INTEGRATION FLOWS]** — Các luồng nghiệp vụ chính (tạo đơn, tra vấn trạng thái, nhận webhook…).

Khi **phân tích luồng tích hợp từ tài liệu đối tác**, cũng phải đọc hiểu và trình bày theo 3 giai đoạn trên, không được bỏ qua giai đoạn AUTH và DATA MAPPING.

> 📎 Xem ví dụ Mermaid đầy đủ 3 loại tại: [`references/sequence-diagram-examples.md`](references/sequence-diagram-examples.md)

### Bước 4 – Đặc tả kỹ thuật (D)

Tên section D thay đổi theo loại (Bảng API / Bảng File / Bảng Message / Bảng WSDL).

> 📎 Xem bảng mẫu đầy đủ tại: [`references/erd-and-spec-tables.md`](references/erd-and-spec-tables.md)

### Bước 5 – Mapping dữ liệu (D', E)

Với mỗi API / file / message, sinh bảng đầy đủ (`[IN]` = đầu vào, `[OUT]` = đầu ra):

| Field / Cột | IN/OUT | Type | Required | Source | Default/Rule | Validation | Mapping nội bộ | Persist? | Purpose | Notes |
|---|---|---|---|---|---|---|---|---|---|---|

- **[IN] Source** thay đổi theo loại: UI nhập / cột file / message field / XML element.
- **[OUT]**: Xác định `Mapping nội bộ`, `Persist?` (Yes/No), `Purpose`, `Notes` (normalization đa đối tác).
- Tóm lược **D'** (góc nhìn cấu hình): field nào cần màn hình cấu hình, bảng master, hard-code theo đối tác?
- Tóm lược **E** (góc nhìn lưu trữ): field nào bắt buộc lưu, lưu để làm gì, cần bảng mapping status không?

> 📎 Xem header chuẩn & quy tắc Source đầy đủ tại: [`references/erd-and-spec-tables.md`](references/erd-and-spec-tables.md)

### Bước 6 – Use Case & màn hình cần xây (F)

| Tên chức năng | Loại (Gọi API / Tạo dữ liệu đầu vào / Cấu hình / Process nội bộ) | API liên quan | Dữ liệu liên quan |
|---|---|---|---|
| Cấu hình kho – đối tác | Tạo dữ liệu đầu vào | CreateShipment, GetFee | warehouseCode, serviceCode |
| Đồng bộ KH sang đối tác | Gọi API | CreateCustomer | customerName, phone, address |
| Tạo đơn vận chuyển tích hợp | Gọi API | CreateShipment | orderId, customerCode, COD, weight |

### Bước 7 – ERD tích hợp (G)

Tư duy **đa đối tác**, có bảng mapping chuẩn hoá (status, service, product…), giữ raw data để đối soát.

> 📎 Xem bảng đề xuất theo loại & ERD mẫu Mermaid tại: [`references/erd-and-spec-tables.md`](references/erd-and-spec-tables.md)

### Bước 8 – Lưu file & Xuất tài liệu

- **Lưu ngay** sau khi sinh xong A→H (không đợi confirm).
  - Thư mục: `docs-BA/Integration/<Tên hệ thống>/`
  - Tên file: `Integration_<Tên hệ thống>_YYYYMMDD.md`
Hỏi user có muốn sinh HTML chứa các MH của các usecase liên quan ko

### Bước 9 – HTML Prototype

Hỏi user sau Bước 8. Nếu đồng ý:
- Sinh **1 file HTML duy nhất** với tab navigation, mỗi tab = 1 màn hình từ F.
- Field phải **bám theo bảng D'/E** (tên field, required *, kiểu input, validation hint).
- Lưu: `docs-BA/Integration/<Tên hệ thống>/prototype/screens.html`

### Bước 10 – Sinh câu hỏi Elicitation

Thực hiện sau A→H. Tự động đối chiếu các "Giả định" và field chưa rõ để làm nổi bật câu hỏi quan trọng nhất (🔴 chưa có, 🟡 cần confirm).

> 📎 Xem đầy đủ bộ câu hỏi Nhóm A, B, C và hướng dẫn sinh câu hỏi tại: [`references/elicitation-questions.md`](references/elicitation-questions.md)

---

## ✅ Quy tắc Do / Don't

| # | Do ✅ | Don't ❌ |
|---|-------|---------|
| 1 | Hỏi tên đối tác ngay; lưu file vào `docs-BA/Integration/<Tên hệ thống>/` | Lưu sai thư mục hoặc bỏ qua tên đối tác |
| 2 | Nhận diện loại tích hợp từ tài liệu → **confirm với user** trước khi phân tích | Giả định luôn là REST API khi chưa xác nhận |
| 3 | Sinh đủ A→H trong 1 lần dù thiếu dữ liệu; đánh dấu "Giả định" rõ ràng | Chỉ trả sequence mà thiếu B, D, D', E, F, G, H |
| 4 | Điều chỉnh tên section D, participant sequence, câu hỏi Nhóm B theo loại | Dùng ngôn ngữ REST API cho tích hợp File hoặc Queue |
| 5 | Lưu file ngay sau khi sinh xong A→H | Đợi user confirm mới lưu |
| 6 | Chỉ rõ **Source** cho từng field đầu vào theo đúng loại tích hợp | Bỏ qua phân tích nguồn dữ liệu đầu vào |
| 7 | Xác định **Mapping nội bộ + Persist? + Purpose** cho từng field đầu ra | Bỏ qua mapping đầu ra → model nội bộ |
| 8 | Tư duy đa đối tác khi thiết kế mapping & ERD | Thiết kế hardcode 1 đối tác, không normalization |
| 9 | Sau A→H: hỏi Word → Confluence → Prototype → sinh câu hỏi elicitation (Bước 10) | Bỏ qua Bước 10 sau khi hoàn thành tài liệu |
| 10 | Câu hỏi Nhóm B bám theo loại tích hợp đã nhận diện | Sinh câu hỏi Nhóm B generic kiểu REST API cho mọi loại |
| 11 | Field prototype phải đúng với bảng mapping D'/E đã phân tích | Sinh prototype tự do, không bám bảng mapping |
| 12 | Mọi pseudo flow & sequence diagram PHẢI có đủ 3 giai đoạn: **[AUTH] → [DATA MAPPING] → [INTEGRATION FLOWS]** | Bắt đầu thẳng vào luồng nghiệp vụ, bỏ qua xác thực và mapping tiền đề |
| 13 | Khi phân tích tài liệu đối tác, đọc hiểu và trình bày luồng theo đúng 3 giai đoạn E2E | Tóm tắt chỉ phần API calls, bỏ qua cơ chế auth và bước mapping dữ liệu |


---

**Version:** 1.4.0 | **Ngày:** 2026-03-15