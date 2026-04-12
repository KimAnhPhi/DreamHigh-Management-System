---
description: "Workflow to generate a Product Requirements Document (PRD) from AS-IS to TO-BE."
---
Version: 1.4.0
Author: M2MBA
Last Updated: 2026-04-10
Description: Workflow tự động tạo Product Requirements Document (PRD) toàn diện từ kết quả khơi gợi yêu cầu.

# Workflow: BA PRD Creation

Workflow này hướng dẫn Agent thực hiện chuỗi các bước liên tiếp để tự động hóa quá trình tạo Product Requirements Document (PRD) cho một dự án/tính năng mới, bắt đầu từ dữ liệu khơi gợi yêu cầu. Việc này kết hợp các skill phân tích BA có sẵn để tạo thành một chuỗi luồng xử lý mượt mà.

**Khi User tái chạy workflow hoặc yêu cầu sửa PRD đã có:** Agent **áp dụng trước** mục **📁 Quy tắc Quản lý File Output** (phân loại thay đổi nhỏ / lớn / nghiệp vụ mới, cập nhật file liên quan, `docs-BA/PRD/prd-index.md`).

### Quy ước lưu trữ tài liệu BA (gộp file — trừ AS-IS / TO-BE theo quy trình)

| Loại | Quy ước | Khi sửa |
|------|---------|---------|
| **AS-IS** | **Theo từng quy trình:** `docs-BA/Processes/<slug-quy-trình>/as-is.md` (một quy trình = một thư mục; slug ngắn, không dấu, ví dụ `thanh-toan-tien-nuoc`). | Chỉ **cập nhật** cặp thư mục của **đúng quy trình** đang đổi. |
| **TO-BE** | Cùng cấu trúc: `docs-BA/Processes/<slug-quy-trình>/to-be.md`. | Giống AS-IS — **không** gộp nhiều quy trình vào một file. |
| **Mô hình tổng quan sản phẩm** (Bước 4) | **Một file:** `docs-BA/ba-product-overview.md` (bổ sung/ sửa incremental + Change log trong file). | Cập nhật file này khi scope tích hợp/actor thay đổi. |
| **Epic + Use Case + User Story** | **Một file master:** `docs-BA/epics-US/ba-epics-and-user-stories.md` — mục Epics/UC do `ba-usecase-list-gen`; mục User Stories chi tiết do `ba-user-story-light` (mỗi US = một tiểu mục trong file, **không** tạo file `.md` rời cho từng US trừ khi User yêu cầu). | Cập nhật **cùng file**; ghi Change log ở đầu file. |
| **Data model (ERD + Data Dictionary + state nếu có)** | **Một file:** `docs-BA/Data Model/ba-data-model.md` — mọi miền/nhóm entity bổ sung bằng section `## …` trong cùng file; **không** tạo `ba-erd-[chủ-đề].md` rời trừ khi User chỉ định. | Cập nhật/append vào file master; có **Change log** ở đầu file. |
| **PRD** | **`docs-BA/PRD/ba-prd-[feature-name].md`** — tổng hợp; có thể **link** tới các file trên. | Theo **📁 Quy tắc Quản lý File Output**. |

**Gọi skill đơn lẻ:** Agent vẫn tuân **quy ước trên** (không tách file Epics/US/Data model) trừ khi User nói rõ muốn ngoại lệ.

## Các bước thực hiện:

1. **Thu thập Kết quả Khơi gợi Yêu cầu**
   - Yêu cầu người dùng cung cấp tài liệu "Kết quả khơi gợi yêu cầu" (Meeting notes, bản ghi âm đã chuyển text, thư điện tử trao đổi, hoặc file thống nhất yêu cầu ban đầu).
   - Nếu người dùng đã cung cấp mô tả ngay từ prompt đầu tiên, tiến hành nạp dữ liệu và tự động sang Bước 2.

// turbo
2. **Phân tích Quy trình Hiện tại (AS-IS)**
   - Input: Kết quả khơi gợi yêu cầu ở Bước 1.
   - Thao tác: Áp dụng Agent skill `ba-process-analysis` để phân tích nghiệp vụ, mô hình hóa và xác định lỗi/vấn đề (pain points) của hệ thống hiện tại.
   - Output: `docs-BA/Processes/<slug-quy-trình>/as-is.md` — **một file AS-IS cho đúng quy trình** đang phân tích (User/Agent chọn `slug` thống nhất tên thư mục với TO-BE).

// turbo
3. **Đề xuất Quy trình Mới (TO-BE)**
   - Input: File AS-IS cùng `slug` từ Bước 2 và mục tiêu mong đợi của người dùng.
   - Thao tác: Áp dụng Agent skill `ba-process-proposal` để thiết kế quy trình đề xuất (TO-BE), giải quyết các pain points đã xác định.
   - Output: `docs-BA/Processes/<slug-quy-trình>/to-be.md` — **chỉ cập nhật** file TO-BE của quy trình đang sửa.

// turbo
4. **Mô hình Tổng quan Sản phẩm**
   - Input: Quy trình TO-BE và kết quả khơi gợi yêu cầu.
   - Thao tác: Áp dụng Agent skill `ba-product-overview-gen` để xác định các actor, application, hệ thống tích hợp và mô hình giao tiếp.
   - Output: **Một file** `docs-BA/ba-product-overview.md` (tạo hoặc cập nhật incremental + Change log trong file).

// turbo
5. **Phân tích Danh sách Epic và Tính năng (Use Case)**
   - Input: File quy trình TO-BE từ Bước 3 và Mô hình tổng quan từ Bước 4.
   - Thao tác: Áp dụng Agent skill `ba-usecase-list-gen` để trích xuất và gom nhóm các Use Case thành từng Epic.
   - Output: Ghi vào **`docs-BA/epics-US/ba-epics-and-user-stories.md`** (phần Epics/UC; xem SKILL). User Story chi tiết sau này cùng file, mục riêng.

// turbo
5B. **Kiểm tra & thu thập Non-Functional Requirements (NFR)** *(trước Bước 6)*
   - **Mục đích:** Mục **## 8. Non-Functional Requirements** trong PRD (theo template) cần nội dung từ stakeholder — **không** được tự điền chỉ tiêu số (latency, uptime, v.v.) khi chưa có cơ sở nghiệp vụ.
   - **Kiểm tra:** Từ kết quả khơi gợi (Bước 1) và các output Bước 2–5, xác định đã có **yêu cầu phi chức năng** đủ để điền bảng NFR trong PRD chưa (ít nhất các nhóm: hiệu năng/tải, sẵn sàng/phục hồi, bảo mật & tuân thủ, khả năng mở rộng, trải nghiệm & accessibility nếu áp dụng, vận hành/giám sát nếu áp dụng).
   - **Nếu chưa có hoặc còn mơ hồ:**
     1. **Yêu cầu User / PO / stakeholder** cung cấp NFR (bullet list hoặc bảng: loại → yêu cầu → ghi chú), **hoặc**
     2. **Đưa bộ câu hỏi gợi ý** để họ trả lời — lấy từ checklist **Phần 6.4** trong skill `ba-elicitation-qna-gen`, file `resources/ba-elicitation-checklist.md` (cùng thư mục cha với `SKILL.md`, không gắn cứng `.cursor`/`.agent`). Có thể chạy `/ba-elicitation-qna-gen` với trọng tâm NFR để sinh file `questions_tracking_*` nếu cần theo dõi từng câu.
   - **Sau khi có câu trả lời:** ghi nhận vào input cho Bước 6; các chỉ tiêu định lượng chỉ ghi đúng theo số stakeholder xác nhận (hoặc ghi **TBD** trong PRD kèm mục Open Q&A nếu vẫn chưa chốt).
   - **Chỉ chuyển sang Bước 6** khi đã có đủ cơ sở để điền mục NFR trong PRD ở mức **Draft có căn cứ**, hoặc User chấp nhận để lại NFR dạng Open Questions có owner.

// turbo
6. **Tổng hợp và Tạo Product Requirements Document (PRD)**
   - Input: Toàn bộ dữ liệu từ Bước 1 đến Bước 5 **và kết quả Bước 5B (NFR)**.
   - Thao tác: Tổng hợp thành file PRD duy nhất. BẮT BUỘC tuân thủ file mẫu trong workspace: `.cursor/workflows/references/ba-prd-template.md` (hoặc `.agent/workflows/references/ba-prd-template.md` nếu dùng bản `.agent`).
   - *Lưu ý về Infographic:* Bước này không tự động gen ảnh. Nếu cần ảnh minh họa cho mục "4. Mô hình tổng quan sản phẩm", hãy chạy riêng workflow `/ba-infographic-gen` sau khi PRD hoàn tất.
   - Output: File PRD **`docs-BA/PRD/ba-prd-[feature-name].md`** (khi cập nhật bản đã có, áp dụng **📁 Quy tắc Quản lý File Output**).

// turbo
7. **Thiết kế ERD / Data model**
   - Input: File PRD đã hoàn tất từ Bước 6.
   - Thao tác: Kích hoạt skill `ba-erd-gen` để phân tích các thực thể và quan hệ.
   - Output: Cập nhật **`docs-BA/Data Model/ba-data-model.md`** (một file gộp; xem **Quy tắc Data model** bên dưới).
   - *Lưu ý:* Nếu thông tin trong PRD chưa đủ để xác định attributes/relations, skill `ba-erd-gen` sẽ tự động dừng và hỏi User làm rõ trước khi ghi file.

---

## 📁 Quy tắc Quản lý File Output

### Phân loại thay đổi (áp dụng khi đã có PRD / tài liệu liên quan)

Agent **ước lượng** theo ngữ cảnh User (không có ngưỡng số cố định trong workflow):

| Mức | Dấu hiệu gợi ý | Hành động |
|-----|----------------|-----------|
| **Nhỏ** | Sửa wording, thêm/bớt vài AC, điều chỉnh ưu tiên MoSCoW, bổ sung Open Q&A, thay đổi hẹp trong cùng Epic | **Cập nhật** file PRD hiện tại + nguồn tương ứng: `docs-BA/epics-US/ba-epics-and-user-stories.md`, `ba-product-overview.md`, hoặc **chỉ** cặp `Processes/<slug>/as-is.md` & `to-be.md` nếu đổi đúng một quy trình. Bump **Minor**, ghi **Change log** trong PRD và trong file nguồn đã sửa. |
| **Lớn** *(cùng nhóm nghiệp vụ)* | Đổi lớn luồng TO-BE / nhiều Epic, thêm module trọng yếu, đổi scope MVP, breaking change nghiệp vụ | **Không** tự quyết tách hay gộp. **Hỏi User** một lần: muốn **(A)** gộp trong file PRD hiện tại *(bump **Major** v1.x → **v2.0** hoặc quy ước tương đương + Change log rõ ràng)* hay **(B)** **tạo file PRD mới** (tên có hậu tố phân biệt, ví dụ `ba-prd-[feature]-phase2.md`), giữ bản cũ làm tham chiếu. Sau đó cập nhật **`docs-BA/PRD/prd-index.md`** (và cột *PRD liên quan* nếu dùng). |
| **Nhóm nghiệp vụ mới** | Domain/tên feature PRD khác hẳn, không chỉ “bản nâng cấp” của PRD đang có | **Tạo file PRD mới** `docs-BA/PRD/ba-prd-[feature-name].md`, cập nhật **`docs-BA/PRD/prd-index.md`**. |

**Câu hỏi mẫu cho User khi phát hiện thay đổi lớn (cùng nghiệp vụ):**

> *"Thay đổi này ảnh hưởng lớn tới scope/luồng so với PRD hiện tại. Bạn muốn **(A)** cập nhật gộp trong file `…` và nâng phiên bản MAJOR + Change log, hay **(B)** tạo **file PRD mới** (giữ bản cũ) để dễ truy vết?"*

### Nguyên tắc Update vs Tạo Mới (tóm tắt)

| Tình huống | Hành động | Kết quả |
|------------|-----------|---------|
| Thay đổi **nhỏ**, cùng nghiệp vụ | **Update** PRD + file liên quan | Minor version, Change log |
| Thay đổi **lớn**, cùng nghiệp vụ | **Hỏi User** (A) gộp + Major / (B) file mới | Cập nhật `prd-index.md` tương ứng |
| Nhóm nghiệp vụ **mới hoàn toàn** | **Tạo file PRD mới** | Cập nhật `docs-BA/PRD/prd-index.md` |

### Quy tắc Cập nhật Master PRD Index

Đường dẫn chuẩn trong repo này: **`docs-BA/PRD/prd-index.md`** (PRD nằm **trong** `docs-BA/` cùng Elicitation, Processes, v.v.). Sau mỗi lần **tạo PRD mới** hoặc **thêm dòng cho bản PRD tách** (lựa chọn B khi thay đổi lớn), Agent **BẮT BUỘC** kiểm tra và cập nhật file đó. Nếu chưa tồn tại → tạo mới.

Định dạng gợi ý (có thể thêm cột khi cần liên kết giữa các PRD):

```markdown
# PRD Master Index

| Tên file | Nhóm nghiệp vụ | Version | Mô tả ngắn | PRD liên quan / Ghi chú | Ngày cập nhật |
|----------|----------------|---------|------------|-------------------------|---------------|
| [ba-prd-xxx.md](ba-prd-xxx.md) | [Nhóm] | v1.0 | [Tóm tắt] | — hoặc link PRD thế hệ trước | DD/MM/YYYY |
```

*Ghi chú (legacy):* Repo cũ có thể từng đặt PRD tại `PRD/` (root). Nếu còn thư mục đó, dùng file redirect `PRD/README.md` hoặc gộp vào `docs-BA/PRD/` — **một** nơi làm source of truth.

### Quy tắc Data model (một file `ba-data-model.md`)

- Toàn bộ ERD (theo miền), Data Dictionary, state diagram (nếu có) nằm trong **`docs-BA/Data Model/ba-data-model.md`** — bổ sung section `## [Tên miền / nhóm]` và **Change log** đầu file.
- **Không** tạo thêm `ba-erd-[chủ-đề].md` rời hoặc hỏi merge vào master trừ khi User chỉ định tách file.
- *(Legacy)*: Thư mục cũ `Data model/` (root) nếu còn — chuyển hoặc redirect sang `docs-BA/Data Model/`.
