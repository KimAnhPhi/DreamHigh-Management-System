---
Version: 1.0.0
Author: M2MBA
Last Updated: 2026-03-14
Description: Các ví dụ Sequence Diagram Mermaid chuẩn theo từng loại tích hợp dùng trong ba-integration-spec
---

# Sequence Diagram Examples – Tham chiếu cho Bước 3

## Participant theo loại tích hợp

| Loại | Participant điển hình |
|---|---|
| REST API | App (Client) · Backend · Partner API · Core System |
| File-based | Scheduler · Backend · SFTP/S3 Server · File Processor · Core System |
| Message Queue | Producer (BE) · Message Broker (Topic/Queue) · Consumer (BE) · Core System |
| SOAP | App · Backend · SOAP Gateway · Core System |
| Hybrid | Kết hợp — tách thành 2 sequence riêng nếu luồng phức tạp |

---

## 🌐 Ví dụ REST API

```mermaid
sequenceDiagram
participant App as 🧩 App (Client)
participant BE as ⚙️ Backend
participant Partner as 🌐 Partner API
participant Core as 🗄️ Core System

App->>BE: 1️⃣ Gửi yêu cầu tạo đơn tích hợp
BE->>Core: 2️⃣ Kiểm tra thông tin KH & cấu hình tích hợp
alt Đã có mã KH & cấu hình đối tác
    Core-->>BE: ✅ Trả về partnerCustomerId, partnerConfig
    BE->>Partner: 3️⃣ Gửi request tạo đơn hàng
    Partner-->>BE: 4️⃣ Trả về kết quả (mã đối tác, trạng thái)
    alt Thành công
        BE->>Core: 5️⃣ Lưu mapping & trạng thái tích hợp
        BE-->>App: ✅ Thông báo tạo đơn tích hợp thành công
    else Lỗi nghiệp vụ từ đối tác
        BE-->>App: ⚠️ Thông báo lỗi tích hợp
    end
else Chưa có mã KH/cấu hình
    BE-->>App: ⚠️ Yêu cầu thiết lập cấu hình trước
end
```

---

## 📁 Ví dụ File-based (SFTP)

```mermaid
sequenceDiagram
participant Scheduler as ⏰ Scheduler
participant BE as ⚙️ Backend
participant SFTP as 📁 SFTP Server (Đối tác)
participant Core as 🗄️ Core System

Scheduler->>BE: 1️⃣ Trigger job theo lịch (vd: 02:00 hàng ngày)
BE->>SFTP: 2️⃣ Kết nối SFTP & kiểm tra file mới trong /inbox
alt Có file mới
    SFTP-->>BE: 3️⃣ Download file (CSV/Excel)
    BE->>BE: 4️⃣ Validate cấu trúc file, header, encoding
    alt File hợp lệ
        BE->>Core: 5️⃣ Parse & import dữ liệu vào hệ thống nội bộ
        Core-->>BE: ✅ Import thành công (N records)
        BE->>SFTP: 6️⃣ Move file sang /processed
    else File lỗi cấu trúc
        BE->>SFTP: 6️⃣ Move file sang /error
        BE-->>BE: ⚠️ Gửi alert & ghi log lỗi
    end
else Không có file mới
    BE-->>BE: ℹ️ Ghi log "no file", kết thúc job
end
```

---

## 📨 Ví dụ Message Queue (Kafka)

```mermaid
sequenceDiagram
participant Partner as 🌐 Đối tác (Producer)
participant Broker as 📨 Message Broker
participant Consumer as ⚙️ Consumer (Backend)
participant Core as 🗄️ Core System

Partner->>Broker: 1️⃣ Publish message (vd: OrderStatusChanged)
Broker-->>Consumer: 2️⃣ Deliver message (at-least-once)
Consumer->>Consumer: 3️⃣ Deserialize & validate message schema
alt Message hợp lệ
    Consumer->>Core: 4️⃣ Xử lý nghiệp vụ & cập nhật trạng thái
    Core-->>Consumer: ✅ Đã cập nhật
    Consumer->>Broker: 5️⃣ Acknowledge message (ACK)
else Message lỗi schema / nghiệp vụ
    Consumer->>Broker: 5️⃣ NACK → vào Dead Letter Queue
    Consumer-->>Consumer: ⚠️ Gửi alert, ghi log lỗi
end
```
