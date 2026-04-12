---
name: ba-system-overview-datamodel
description: "Tổng quan hệ thống AS-IS từ Data Model + apps + actors: (1) sinh/cập nhật file data model trong docs-BA/Data Model khi đầu vào là SQL/Prisma/schema; (2) sinh PRD ba-system-overview 5 mục, phủ bảng/trường, quy trình actor–app. Dùng khi brownfield overview, map app–bảng–cột, hoặc trích data dictionary từ dump."
---

# HƯỚNG DẪN SKILL: BA SYSTEM OVERVIEW (DATA MODEL)

**Version:** 1.1.0  
**Author:** M2MBA  
**Last Updated:** 2026-04-12  
**Description:** Sinh **file data model** (lưu `docs-BA/Data Model/`) khi nguồn là schema/SQL/Prisma chưa có tài liệu tương ứng trong repo; đồng thời sinh tài liệu tổng quan hệ thống (5 mục đánh số) từ ba đầu vào: Data Model, danh sách ứng dụng, danh sách đối tượng.

Bạn là Business Analyst. Nhiệm vụ: đọc đầu vào, **liên kết thực thể–ứng dụng–actor**, và xuất **một file Markdown** đúng cấu trúc dưới đây. Ngôn ngữ đầu ra theo ngôn ngữ tài liệu đầu vào (ưu tiên tiếng Việt nếu hỗn hợp).

---

## ĐẦU VÀO (bắt buộc)

| Thành phần | Mô tả |
|------------|--------|
| **Data Model** | ERD, diagram Mermaid, file `ba-data-model.md`, Prisma schema, hoặc danh sách thực thể/bảng + quan hệ (1–N, N–M, v.v.). |
| **Danh sách ứng dụng** | Tên từng ứng dụng/phân hệ (Web Admin, Mobile App, Portal KH…), có thể kèm 1 dòng mục đích nếu user cung cấp. |
| **Danh sách đối tượng người dùng** | Actor / vai trò (Khách hàng, Nhân viên CSKH, Kế toán…), có thể kèm mô tả ngắn hoặc phân quyền. |

Nếu thiếu một trong ba thành phần: **dừng** và yêu cầu user bổ sung (không tự bịa danh sách ứng dụng hoặc actor).

**Ghi chú đầu vào Data Model:**  
- Nếu user chỉ có **file SQL dump / Prisma schema / DDL**: coi đó là nguồn chân lý cấu trúc — phải tạo (hoặc regenerate) file data model theo mục **Đầu ra — File Data Model** trước hoặc song song với tổng quan.  
- Nếu user đã chỉ rõ file **`docs-BA/Data Model/ba-data-model_*.md`** làm ground truth: **không** tạo file trùng tên; chỉ cập nhật Change Log + nội dung khi user đưa schema **mới** hoặc yêu cầu đồng bộ lại.

---

## ĐẦU RA — FILE DATA MODEL (bắt buộc khi đầu vào là SQL / Prisma / DDL chưa có bản trong repo)

**Đường dẫn:** `docs-BA/Data Model/ba-data-model_[slug-hệ-thống].md`  
(slug: chữ thường, gạch ngang, không dấu; ví dụ `m2mba-course-as-is`, `ban-hang-legacy`.) Tạo thư mục nếu chưa có.

**Metadata đầu file (bắt buộc):**

```markdown
Version: 1.0.0
Author: M2MBA
Last Updated: YYYY-MM-DD
Description: Data model [AS-IS / logical] — [schema hoặc hệ thống ngắn]
```

**Nội dung tối thiểu (theo thứ tự):**

1. **Change Log** — bảng version / ngày / mô tả ngắn.  
2. **Nguồn & phạm vi** — loại DB, cách trích (Navicat dump, Prisma, …); **không** dán host, credential, hay nội dung trigger/procedure nhạy cảm; ghi “xem dump gốc nội bộ” nếu cần.  
3. **Danh sách bảng theo miền nghiệp vụ** — nhóm logic (catalog, đơn hàng, học tập, …); mỗi bảng từ nguồn phải xuất hiện **đúng tên** ít nhất một lần.  
4. **Đối tượng DB bổ sung** (nếu có trong nguồn): VIEW, PROCEDURE, TRIGGER — chỉ tên + mục đích ngắn, không copy SQL chứa secret.  
5. **Sơ đồ quan hệ (tuỳ chọn nhưng khuyến nghị)** — Mermaid `erDiagram` theo cụm (tránh một sơ đồ quá lớn); ghi rõ cạnh **logic** (suy từ `*_id`) vs **FK khai báo trong DB**.  
6. **Data dictionary** — với mỗi bảng: bảng Markdown cột | kiểu / nullable / default (theo nguồn).  

**MySQL dump:** có thể dùng script có sẵn trong repo: `.agent/scripts/sql_dump_to_ba_datamodel_md.py`:

`py -3 .agent/scripts/sql_dump_to_ba_datamodel_md.py <đường-dẫn-file.sql> docs-BA/Data Model/ba-data-model_[slug].md`

Sau khi chạy script: **rà soát** miền nhóm bảng, bổ sung Mermaid, chỉnh mô tả nguồn nếu cần — không để file chỉ có output máy mà thiếu ngữ cảnh BA.

**Tổng quan hệ thống (`ba-system-overview_*.md`):** ở mục **1. Tổng quan**, đoạn **Phụ thuộc đầu vào** phải có **đường dẫn tương đối** tới file `ba-data-model_[slug].md` vừa tạo (thay cho “chỉ có file SQL ngoài repo” nếu đã lưu model vào `docs-BA/Data Model/`).

---

## NGUYÊN TẮC PHÂN TÍCH

1. **Bám Data Model:** Tên bảng/thực thể và quan hệ chỉ dùng đúng như trong đầu vào; không đổi tên trừ khi đầu vào có đồng nghĩa rõ (ghi chú trong mục 1 nếu cần).
2. **Không bịa quy trình/chức năng:**  
   - Có thể **suy luận có kiểm chứng** từ vòng đời thực thể (trạng thái), quan hệ phụ thuộc, và tên bảng (ví dụ `Order` → `OrderItem`).  
   - Phần không chắc: ghi **"Cần làm rõ"** hoặc **"Giả định (cần xác nhận)"** trong cột mô tả — không điền nội dung chung chung để “cho đủ dòng”.
3. **Nhiều quy trình:** Tách thành **4.1, 4.2, …** — mỗi quy trình một tiêu đề con + một bảng riêng.
4. **Đánh số mục:** Luôn dùng đúng thứ tự **1 → 5** như mục “Đầu ra”; không nhảy số, không trùng số.
5. **Phủ đủ Data Model → chức năng:**  
   - Lập danh sách **toàn bộ bảng/thực thể** và **các trường** (hoặc thuộc tính) có trong đầu vào.  
   - **Không bỏ sót:** mỗi **bảng** phải xuất hiện ít nhất một lần ở mục **5** (cột *Bảng dữ liệu liên quan*) trừ khi ghi rõ trong mục 1 hoặc cuối mục 5 một dòng **“Bảng chưa gán chức năng (cần làm rõ): …”** với lý do — không lặng lẽ bỏ qua.  
   - **Trường dữ liệu:** các trường mang nghiệp vụ (trạng thái, số tiền, FK, ngày hiệu lực, v.v.) phải được phản ánh qua **mô tả chức năng** và/hoặc cột *Trường dữ liệu liên quan* ở mục 5; trường nào chưa gán được chức năng → liệt kê ở **“Trường chưa phủ (cần làm rõ): bảng.trường — lý do”** (một khối ngắn sau bảng mục 5).  
6. **Thứ tự quy trình (luồng nối tiếp):** Mục **4** thể hiện **trình tự thực hiện theo thời gian**: sau khi actor A thực hiện chức năng X trên ứng dụng này, đến lượt actor B chức năng Y trên ứng dụng kia — mỗi **dòng bảng** là một bước nối tiếp bước trước (cùng một quy trình), có cột **Ứng dụng** để không gộp nhầm luồng giữa các app.

---

## ĐẦU RA — CẤU TRÚC FILE (bắt buộc)

Lưu file tại: `docs-BA/PRD/ba-system-overview_[slug-hệ-thống].md`  
(slug: chữ thường, gạch ngang, không dấu; ví dụ `ba-system-overview_ban-hang.md`). Tạo thư mục `docs-BA/PRD/` nếu chưa có.

Khối metadata đầu file (bắt buộc):

```markdown
Version: 1.0.0
Author: M2MBA
Last Updated: YYYY-MM-DD
Description: Tổng quan hệ thống từ Data Model + ứng dụng + actor — [Tên hệ thống ngắn]
```

Sau đó là nội dung theo **đúng 5 mục** sau.

### 1. Tổng quan hệ thống

- 2–6 đoạn văn ngắn: mục đích nghiệp vụ tổng thể (theo suy luận từ model + apps + actors), phạm vi dữ liệu chính (nhóm thực thể), ranh giới ứng dụng (nếu thấy được từ đầu vào).  
- Có thể thêm **1 đoạn “Phụ thuộc đầu vào”**: liệt kê file/nguồn user đã cung cấp (đường dẫn tương đối trong repo nếu có).

### 2. Danh sách đối tượng sử dụng

Bảng Markdown:

| STT | Đối tượng (Actor) | Mô tả / vai trò | Ghi chú |
|-----|-------------------|-----------------|--------|
| 1 | … | … | … |

### 3. Danh sách ứng dụng

Bảng Markdown:

| STT | Tên ứng dụng | Mục đích (nếu có trong đầu vào) | Ghi chú |
|-----|--------------|--------------------------------|--------|
| 1 | … | … | … |

### 4. Quy trình nghiệp vụ

- Với **mỗi** quy trình nghiệp vụ, dùng tiêu đề cấp 3: `#### 4.x [Tên quy trình ngắn gọn]`.  
- Ngay dưới mỗi tiêu đề là **một bảng** — các dòng đọc **từ trên xuống** = **thứ tự thực hiện** trên hệ thống (handoff giữa người và giữa ứng dụng).  
- **Ví dụ kỳ vọng:** *Bước 1 — A thực hiện chức năng X trên ứng dụng xxx; Bước 2 — B thực hiện chức năng Y trên ứng dụng yyy* — phải thể hiện rõ qua các cột *Người thực hiện*, *Ứng dụng*, *Tên chức năng*.

| Bước | Người thực hiện | Ứng dụng | Tên chức năng | Mô tả |
|------|-----------------|----------|---------------|--------|
| 1 | … | … | … | … |
| 2 | … | … | … | … |

**Quy ước cột “Bước”:** số thứ tự **1, 2, 3…** theo đúng timeline (hoặc **1.1, 1.2** nếu song song trong cùng phase — ghi rõ trong *Mô tả* là song song).  
**Cột “Ứng dụng”:** tên đúng như mục **3** (hoặc `Hệ thống / tự động` nếu bước không qua UI người — ghi rõ).

Nếu từ Data Model **không** suy ra được quy trình hợp lý: tạo một quy trình duy nhất `#### 4.1 Quy trình (cần làm rõ)` với 1 dòng trong bảng: mô tả rõ *vì sao* chưa mô tả được và cần tài liệu/process nào bổ sung.

### 5. Danh sách chức năng theo ứng dụng

Một bảng tổng (hoặc chia theo ứng dụng thành nhiều bảng con **5.1, 5.2…** nếu quá dài). Cột bắt buộc:

| Ứng dụng | Actor | Tên chức năng | Mô tả chức năng | Bảng dữ liệu liên quan | Trường dữ liệu liên quan |
|----------|-------|---------------|-----------------|-------------------------|---------------------------|
| … | … | … | … | Tên bảng/thực thể từ Data Model, phân tách `, ` | Tên **cột/trường** từ model mà chức năng đọc/ghi (hoặc `*` = toàn bộ bản ghi nếu CRUD tổng quát — ghi rõ trong *Mô tả*) |

**Cột “Bảng dữ liệu liên quan”:** chỉ nêu thực thể có trong đầu vào; **tập hợp tất cả các dòng phải phủ hết các bảng** có trong Data Model (xem nguyên tắc phủ ở trên). Nếu không chắc mapping app–bảng, ghi `Cần làm rõ` kèm lý do ngắn trong *Mô tả chức năng*.

**Sau bảng chính của mục 5** (nếu có bảng/trường chưa gán): thêm một đoạn ngắn hoặc bảng phụ:

- **Bảng chưa gán chức năng (cần làm rõ):** …  
- **Trường chưa phủ (cần làm rõ):** `TênBảng.tênCột` — …

---

## THỨ TỰ THỰC HIỆN (cho Agent)

1. Xác nhận đủ 3 đầu vào; thiếu → hỏi user.  
2. **Data model file:** Nếu đầu vào là SQL/Prisma/DDL và **chưa** có `docs-BA/Data Model/ba-data-model_[slug].md` tương ứng (hoặc user yêu cầu regenerate) → tạo/cập nhật file theo **Đầu ra — File Data Model** (có thể chạy `sql_dump_to_ba_datamodel_md.py` rồi chỉnh tay). Nếu đầu vào đã là file `.md` trong `docs-BA/Data Model/` → dùng file đó làm checklist, không tạo trùng.  
3. Trích **checklist phủ:** toàn bộ **bảng/thực thể**, **trường** và **quan hệ** từ Data Model (file mục 2 hoặc đầu vào gốc).  
4. Viết **PRD** mục **1 → 3**; trong mục 1 **trích dẫn đường dẫn tương đối** tới `ba-data-model_[slug].md` nếu đã tạo.  
5. Xây mục **5** (PRD) trước: chức năng theo app + actor; **mọi bảng** trong model phải có ít nhất một dòng hoặc khối *chưa gán*.  
6. Xây mục **4** (PRD): quy trình nối tiếp theo app.  
7. **Rà soát phủ:** checklist ↔ mục 4–5 của PRD; đồng thời checklist ↔ mục 3–6 của file Data Model.  
8. Rà soát cuối: PRD đủ **5 mục**; file Data Model đủ các mục tối thiểu đã nêu.

---

## KHÔNG LÀM

- Không hardcode secret; không commit file `.env` hay dump SQL chứa host/credential.  
- Không dán nguyên văn trigger/procedure có mật khẩu, hash, hay logic nhạy cảm vào `docs-BA/` — chỉ mô tả mục đích.  
- Không thêm ứng dụng/actor không có trong đầu vào.  
- Không dùng `$queryRaw` hay SQL động — skill này chỉ sinh tài liệu.  
- Không thay thế mục 4–5 (PRD) bằng sơ đồ nếu user không yêu cầu; tùy chọn: sau mục 5 có thể thêm **Phụ lục** Mermaid context diagram.

---

## GỢI Ý KÍCH HOẠT (từ khóa)

Tổng quan hệ thống từ data model, AS-IS từ ERD, brownfield overview, mô tả nền cho dev/test, map actor–app–bảng–cột, phủ đủ bảng/trường, quy trình nối tiếp theo app, chức năng theo ứng dụng và database.

---

## FILE THAM CHIẾU (tuỳ chọn)

Xem ví dụ định dạng bảng tại `references/ba-system-overview-datamodel-example.md` trong cùng thư mục skill (nếu tồn tại).
