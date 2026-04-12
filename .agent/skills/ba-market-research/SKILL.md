---
name: ba-market-research
description: "Skill hỗ trợ Product Owner/Business Analyst thực hiện Market Research (nghiên cứu thị trường) trước khi ra quyết định build sản phẩm. Trả lời 3 câu hỏi cốt lõi: Thị trường có đủ lớn không? Ai là khách hàng thực sự? Thời điểm này có phù hợp không?"
---

# HƯỚNG DẪN SKILL: BA MARKET RESEARCH

**Version:** 1.0.1
**Author:** M2MBA
**Last Updated:** 2026-03-17
**Description:** Skill hỗ trợ PO/BA thực hiện nghiên cứu thị trường, phân tích TAM/SAM/SOM, xu hướng và rào cản gia nhập thị trường.

## Mục tiêu

Trả lời **3 câu hỏi cốt lõi** trước khi build bất kỳ thứ gì:

| # | Câu hỏi | Bước tương ứng |
|---|---------|----------------|
| 1 | Thị trường có đủ lớn không? | Bước 2 – Market Size |
| 2 | Ai là khách hàng thực sự? | Bước 4 – Phân khúc khách hàng |
| 3 | Thời điểm này có phù hợp không? | Bước 3 – Xu hướng thị trường |

---

## INPUT — Thu thập thông tin từ PO

Trước khi bắt đầu research, hỏi PO 4 câu sau (nếu chưa có đủ thông tin):

1. **Ý tưởng sản phẩm / vấn đề muốn giải quyết là gì?**
2. **Khách hàng mục tiêu:** B2B hay B2C? Ngành nào?
3. **Địa lý:** Việt Nam, Đông Nam Á (SEA), hay Global?
4. **Assumption ban đầu về thị trường** là gì (ước tính sơ bộ của PO)?

> Nếu PO đã cung cấp đủ thông tin trong prompt ban đầu, bỏ qua bước hỏi và tiến hành thực hiện luôn.

---

## PROCESS — 5 Bước Thực Hiện

### Bước 1 — Clarify Scope (Xác định phạm vi)

- Tóm tắt những gì PO **đã biết** và **chưa biết** về thị trường
- Xác định rõ: ngành, địa lý, đối tượng khách hàng, thời gian nhắm tới
- Thời gian ước tính: 30–60 phút để viết ra sơ bộ
- **Output:** Một đoạn tóm tắt phạm vi research (≤ 200 chữ)

---

### Bước 2 — Phân tích Market Size (TAM / SAM / SOM)

Ước tính theo **2 hướng**:

**Top-Down:**
- Tìm dữ liệu từ báo cáo ngành: Statista, McKinsey, Google-Temasek-Bain, KPMG, Deloitte
- Lấy số liệu thị trường tổng → ước tính phần áp dụng cho sản phẩm

**Bottom-Up:**
- Số lượng khách hàng tiềm năng × Giá trị trung bình mỗi khách (ACV/ARPU)
- Tính dựa trên giả định rõ ràng, có thể kiểm chứng

**Định nghĩa:**
| Chỉ số | Ý nghĩa |
|--------|---------|
| **TAM** | Total Addressable Market – Tổng thị trường có thể phục vụ |
| **SAM** | Serviceable Addressable Market – Thị trường thực tế có thể tiếp cận |
| **SOM** | Serviceable Obtainable Market – Thị phần thực tế có thể chiếm được |

**Output:** Bảng TAM/SAM/SOM với nguồn dẫn chiếu rõ ràng

---

### Bước 3 — Phân tích Xu hướng thị trường

- Tìm **CAGR** của ngành trong 3–5 năm tới
- Xác định **drivers** (yếu tố thúc đẩy): công nghệ, quy định, hành vi người dùng...
- Xác định **risks** (rủi ro): bão hòa thị trường, thay đổi pháp lý, cạnh tranh mới nổi
- Đánh giá: đây có phải **thời điểm chín muồi** để entry không?

**Nguồn tốt:**
- Google Trends (xu hướng tìm kiếm)
- CB Insights (funding trends, market maps)
- Báo cáo Google-Temasek-Bain cho SEA
- Statista, Bloomberg, Reuters

**Output:** Bảng CAGR + danh sách drivers/risks + nhận định thời điểm

---

### Bước 4 — Phân khúc Khách hàng (Customer Segmentation)

Phân tích **2–3 segment chính**, mỗi segment bao gồm:

| Trường | Nội dung |
|--------|---------|
| **Họ là ai** | Mô tả profile (B2B: ngành, quy mô; B2C: độ tuổi, thu nhập, hành vi) |
| **Pain point hiện tại** | Vấn đề họ đang gặp phải |
| **Giải pháp hiện tại** | Họ đang dùng gì để giải quyết (thủ công, đối thủ, tự xây) |
| **Willingness to pay** | Sẵn sàng trả bao nhiêu? (ước tính theo tier) |
| **Kênh tiếp cận** | Cách reach được họ hiệu quả nhất |

**Output:** Bảng phân khúc 2–3 segment

---

### Bước 5 — Rào cản Gia nhập (Porter's Five Forces Rút gọn)

Đánh giá **5 lực lượng** theo thang Thấp / Trung / Cao:

| Lực lượng | Câu hỏi chính |
|-----------|--------------|
| **Cạnh tranh hiện tại** | Đối thủ mạnh đến đâu? Thị trường phân mảnh hay tập trung? |
| **Rào cản gia nhập** | Kỹ thuật, vốn, pháp lý, network effects có cao không? |
| **Quyền thương lượng khách hàng** | Khách dễ chuyển sang giải pháp khác không? |
| **Quyền thương lượng nhà cung cấp** | Phụ thuộc vào đối tác/vendor nào không? |
| **Sản phẩm thay thế** | Có giải pháp thay thế hoàn toàn khác không? |

**Output:** Bảng đánh giá 5 lực lượng + tóm tắt nhận định

---

## OUTPUT — Market Research Report (7 Phần)

**Lưu file tại:** `docs-BA/Research/market-research-[tên sản phẩm/ngành]-[YYYYMMDD].md`

**Template:** Dùng file `templates/market-research-output.md` làm khung — copy nội dung, thay thế các placeholder `[...]` bằng kết quả research thực tế.

### Phần 1: Executive Summary
- **3–5 câu kết luận chính**
- Kết luận về Market Size, Timing, Customer Fit
- Khuyến nghị sơ bộ: Go / No-Go / Cần validate thêm

### Phần 2: Market Size
- Bảng TAM / SAM / SOM
- Nguồn dẫn chiếu rõ ràng
- Phương pháp tính (Top-Down hay Bottom-Up)

### Phần 3: Xu hướng thị trường
- CAGR ngành (3–5 năm)
- Bảng Drivers & Risks
- Nhận định: Thị trường đang ở phase nào (emerging / growth / mature)?

### Phần 4: Phân khúc khách hàng
- Bảng 2–3 segment
- Segment nào là **primary target** và lý do

### Phần 5: Rào cản gia nhập
- Bảng Porter's Five Forces rút gọn
- Đánh giá tổng: Rào cản Thấp / Trung / Cao

### Phần 6: Recommendation
- **Go / No-Go / Validate thêm** + lý do cụ thể
- Điều kiện để chuyển từ "Validate thêm" sang "Go"
- Risked assumptions cần kiểm tra trước

### Phần 7: Câu hỏi cần Validate tiếp
- Liệt kê **3–5 assumption quan trọng nhất** còn chưa được kiểm chứng
- Với mỗi assumption: đề xuất cách validate (phỏng vấn, landing page test, pilot...)

---

## QUY TẮC THỰC HIỆN

1. **Dùng Perplexity** để research dữ liệu thị trường thực tế — không được bịa số liệu
2. **Ghi rõ nguồn** cho mọi số liệu (URL, tên báo cáo, năm xuất bản)
3. **Nếu không tìm được số liệu chính xác**, ghi rõ "Estimated" và nêu giả định tính toán
4. Tạo file output **incremental** (từng phần), không tạo toàn bộ một lần
5. **Tiếng Việt** là ngôn ngữ mặc định cho output trừ khi PO yêu cầu tiếng Anh
6. Giới hạn file output: **≤ 500 dòng**. Nếu vượt, tách thành phần phụ lục riêng

---

## CHECKPOINTS (Xác nhận trước khi tiếp tục)

Skill tự động chạy toàn bộ 5 bước **không cần hỏi xác nhận** từng bước, trừ:
- Sau **Bước 1**: Nếu phạm vi quá rộng hoặc thông tin input mơ hồ → hỏi PO làm rõ
- Trước khi tạo file output: Tóm tắt nhanh findings để PO review trước khi viết báo cáo

---

## VÍ DỤ KÍCH HOẠT

- "Tôi muốn research thị trường edtech ở Việt Nam cho sản phẩm học lập trình online"
- "Phân tích TAM/SAM/SOM cho ứng dụng quản lý nhà hàng B2B tại SEA"
- "Go/No-Go cho ý tưởng fintech lending dành cho SME"
- "Thị trường logistics last-mile ở Việt Nam đang như thế nào?"
- "Ai là khách hàng thực sự của sản phẩm HR SaaS này?"
