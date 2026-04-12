## Rule layout Draw.io cho Activity Flowchart

### Lanes & Pool
- Lanes theo thứ tự: **Actor**, **FE**, **BE**, **Đối tác** (nếu có).
- Pool vertical (`horizontal=1`), mỗi lane rộng ~400px, x tăng dần 0, 400, 800, 1200, ...

### Task
- Chỉ có **system task** (FE/BE), không có manual task.
- Shape: rectangle, rounded=1.
- Style chuẩn:
```xml
style="rounded=1;whiteSpace=wrap;html=1;fontStyle=1;fontSize=14;"
```
- Tên task: `"1. [Tên nghiệp vụ]"`, `"2. [Tên nghiệp vụ]"`, ...

### Decision Node (Gateway)
- Khi dùng:
  - FE validation trước khi gọi BE.
  - BE validation cho Insert/Update/Delete.
  - FE xử lý kết quả response từ BE.
  - Kiểm tra điều kiện cụ thể (trạng thái, loại, ...).
- Style:
```xml
style="strokeWidth=2;html=1;shape=mxgraph.flowchart.decision;whiteSpace=wrap;"
```
- Mỗi Decision Node phải có **đủ tất cả các nhánh** và mỗi nhánh có label + task/end tương ứng.

### Start / End Event
- Luôn có ít nhất 1 **Start** và 1 **End**.
- Start nối tới bước đầu tiên; End nhận các nhánh kết thúc.

### Sequence Flow
- **Không vẽ edges trong XML**: chỉ generate nodes (pool, lanes, tasks, decisions, start/end).
- User sẽ tự nối trong Draw.io sau khi import.

