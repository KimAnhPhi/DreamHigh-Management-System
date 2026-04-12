# BA Domain Analysis Skill

**Version:** 1.0.0
**Ngày tạo:** 2025-12-31
**Mục đích:** Hỗ trợ Business Analyst phân tích domain mới một cách có hệ thống và toàn diện

---

## 📖 Tổng quan

Skill này là công cụ hỗ trợ Business Analyst trong quá trình tìm hiểu, phân tích và khám phá toàn diện bất kỳ domain hoặc subdomain nào.

**Đặc điểm nổi bật:**
- ✅ Quy trình có cấu trúc 8 bước rõ ràng
- ✅ Tạo file .md chi tiết làm tài liệu output
- ✅ Làm việc tuần tự từng bước, cập nhật dần
- ✅ Hỏi user xác nhận trước khi chuyển bước
- ✅ Linh hoạt thích ứng theo domain đang phân tích

---

## 🚀 Cách sử dụng

### Bước 1: Gọi skill

Có nhiều cách để gọi skill:

```bash
# Cách 1: Gọi trực tiếp
/ba-domain-analysis

# Cách 2: Nói với Claude
"Tôi muốn phân tích domain Banking"
"Giúp tôi tìm hiểu về domain E-commerce"
"Phân tích nghiệp vụ của domain Healthcare"
```

### Bước 2: Cung cấp thông tin

Claude sẽ hỏi bạn:
- Tên domain/subdomain muốn phân tích
- Tên file .md output (ví dụ: `banking-analysis.md`)
- Vị trí lưu file (mặc định: thư mục hiện tại)

### Bước 3: Làm việc tuần tự

Claude sẽ hướng dẫn bạn đi qua 8 bước:

**Bước 0:** Tổng quan domain
- Giới thiệu domain
- Bảng thuật ngữ (10-20 thuật ngữ)
- Danh sách phần mềm quản lý

**Bước 1:** Business Model Canvas
- 9 yếu tố BMC
- Chi tiết Key Activities, Key Partners, Cost, Revenue

**Bước 2:** Lean Canvas
- 9 mục Lean Canvas
- Mapping phần mềm cần có

**Bước 3:** Quy trình End-to-End
- Sơ đồ quy trình tổng quan
- Thực thể & thuộc tính
- Chức năng phần mềm

**Bước 4:** Stakeholder & Vai trò
- Mindmap stakeholder
- Công việc & mapping phần mềm

**Bước 5:** Deep Dive quy trình cụ thể
- Chọn 1 quy trình để phân tích sâu
- Input/Output, Rules, Exceptions
- Mapping phần mềm chi tiết

**Bước 6:** Ứng dụng & Chức năng
- Kiến trúc hệ thống
- Danh sách ứng dụng/module
- Bảng tổng hợp chức năng

**Bước 7:** ERD
- Danh sách thực thể
- Sơ đồ ERD (mermaid)

**Bước 8:** Phân tích đối thủ & thị trường
- Danh sách đối thủ (VN + quốc tế)
- So sánh tính năng
- Xu hướng công nghệ

### Bước 4: Xác nhận sau mỗi bước

Sau khi hoàn thành mỗi bước, Claude sẽ:
1. Hiển thị kết quả
2. Cập nhật vào file .md
3. **Hỏi bạn có muốn tiếp tục không**

Bạn có thể:
- ✅ **"Có, tiếp tục"** → Chuyển sang bước tiếp theo
- ⏸️ **"Dừng lại, tôi muốn review"** → Tạm dừng để xem lại
- 🔄 **"Làm lại bước này sâu hơn"** → Làm lại bước hiện tại với chi tiết hơn
- ⏭️ **"Bỏ qua bước X"** → Bỏ qua bước không cần thiết (tùy chọn)

---

## 📂 Cấu trúc file output

File `.md` được tạo sẽ có cấu trúc:

```markdown
# Phân Tích Domain: [Tên Domain]

## 0. Tổng quan Domain
[Nội dung bước 0]

## 1. Business Model Canvas
[Nội dung bước 1]

## 2. Lean Canvas
[Nội dung bước 2]

## 3. Quy trình End-to-End
[Nội dung bước 3]

## 4. Stakeholder & Vai trò
[Nội dung bước 4]

## 5. Phân tích sâu quy trình
[Nội dung bước 5]

## 6. Ứng dụng & Chức năng
[Nội dung bước 6]

## 7. ERD
[Nội dung bước 7]

## 8. Phân tích đối thủ & thị trường
[Nội dung bước 8]
```

---

## 💡 Tips & Best Practices

### Trước khi bắt đầu:
1. **Tìm hiểu sơ bộ** về domain (đọc 1-2 bài viết)
2. **Chuẩn bị câu hỏi** cụ thể muốn tìm hiểu
3. **Xác định phạm vi** phân tích (domain rộng hay hẹp)

### Trong quá trình:
1. **Đọc kỹ output** mỗi bước trước khi tiếp tục
2. **Đặt câu hỏi** nếu chưa rõ hoặc cần làm sâu hơn
3. **Yêu cầu ví dụ** cụ thể nếu khó hiểu
4. **Điều chỉnh phạm vi** nếu quá rộng/hẹp

### Sau khi hoàn thành:
1. **Review toàn bộ** file .md
2. **Bổ sung thông tin** từ domain experts
3. **Chia sẻ với team** để feedback
4. **Cập nhật định kỳ** khi có thông tin mới

---

## 🎯 Ví dụ sử dụng thực tế

### Ví dụ 1: Phân tích domain Banking

```
User: "Tôi muốn phân tích domain Banking - Ngân hàng số"

Claude: "Tuyệt vời! Tôi sẽ giúp bạn phân tích domain Banking theo quy trình 8 bước.

Trước tiên, cho tôi biết:
1. Tên file .md bạn muốn tạo? (ví dụ: banking-analysis.md)
2. Lưu ở đâu? (mặc định: thư mục hiện tại)

User: "banking-analysis.md, lưu ở thư mục hiện tại"

Claude: "Đã tạo file banking-analysis.md

**Bước 0: Tổng quan Domain Banking**

Banking (Ngân hàng) là domain thuộc lĩnh vực tài chính, quản lý các hoạt động
liên quan đến tiền tệ, tín dụng, thanh toán và dịch vụ tài chính...

[Claude tiếp tục phân tích chi tiết]

✅ Đã hoàn thành Bước 0 và cập nhật vào file.

Bạn có muốn tiếp tục sang Bước 1: Business Model Canvas không?"

User: "Có, tiếp tục"

[Claude tiếp tục với Bước 1...]
```

### Ví dụ 2: Phân tích domain E-commerce (có điều chỉnh)

```
User: "/ba-domain-analysis"

Claude: "Bạn muốn phân tích domain/subdomain nào?"

User: "E-commerce - Thương mại điện tử ở Việt Nam"

Claude: "Tên file output và vị trí lưu?"

User: "ecommerce-vn-analysis.md"

[Claude làm Bước 0]

Claude: "✅ Hoàn thành Bước 0. Tiếp tục Bước 1?"

User: "Tiếp tục, nhưng tôi muốn làm sâu phần Key Activities hơn"

Claude: "Được! Tôi sẽ làm chi tiết hơn phần Key Activities trong Bước 1."

[Claude làm Bước 1 với Key Activities chi tiết hơn]
```

---

## 🛠️ Cấu trúc skill

```
.claude/skills/ba-domain-analysis/
├── SKILL.md                          # File chính, metadata & hướng dẫn tổng quan
├── README.md                         # Hướng dẫn sử dụng (file này)
├── templates/
│   └── domain-analysis-template.md   # Template file .md output
└── stages/
    ├── stage-0-overview.md          # Hướng dẫn chi tiết Bước 0
    ├── stage-1-business-canvas.md   # Hướng dẫn chi tiết Bước 1
    ├── stage-2-lean-canvas.md       # Hướng dẫn chi tiết Bước 2
    ├── stage-3-end-to-end.md        # Hướng dẫn chi tiết Bước 3
    ├── stage-4-stakeholders.md      # Hướng dẫn chi tiết Bước 4
    ├── stage-5-deep-dive.md         # Hướng dẫn chi tiết Bước 5
    ├── stage-6-applications.md      # Hướng dẫn chi tiết Bước 6
    ├── stage-7-erd.md               # Hướng dẫn chi tiết Bước 7
    └── stage-8-competitors.md       # Hướng dẫn chi tiết Bước 8
```

---

## ❓ FAQ

### 1. Skill này phù hợp với domain nào?

**Trả lời:** Skill này linh hoạt, phù hợp với **BẤT KỲ domain nào**:
- Tài chính: Banking, Insurance, Investment
- Y tế: Healthcare, Telemedicine, Hospital Management
- Thương mại: E-commerce, Retail, Supply Chain
- Giáo dục: EdTech, Learning Management
- Logistics: Transportation, Warehouse Management
- Bất động sản: Real Estate, Property Management
- ...và nhiều domain khác!

### 2. Mất bao lâu để hoàn thành phân tích?

**Trả lời:** Tùy độ phức tạp domain và mức độ chi tiết:
- **Domain đơn giản:** 1-2 giờ (8 bước cơ bản)
- **Domain trung bình:** 3-4 giờ (có deep dive)
- **Domain phức tạp:** 1-2 ngày (rất chi tiết, nhiều quy trình)

### 3. Có thể bỏ qua bước nào không?

**Trả lời:** Có, bạn có thể bỏ qua bước không cần thiết. Ví dụ:
- Nếu chỉ cần hiểu quy trình → Bỏ qua Bước 2 (Lean Canvas)
- Nếu không cần ERD → Bỏ qua Bước 7
- Nếu không quan tâm đối thủ → Bỏ qua Bước 8

**Lưu ý:** Bước 0, 1, 3 là **quan trọng nhất**, không nên bỏ qua.

### 4. Có thể làm lại một bước không?

**Trả lời:** Có! Bạn có thể yêu cầu:
- "Làm lại Bước 5 với quy trình khác"
- "Làm sâu hơn phần Key Activities ở Bước 1"
- "Bổ sung thêm đối thủ ở Bước 8"

### 5. Output có thể xuất sang format khác không?

**Trả lời:** File .md có thể dễ dàng convert sang:
- **PDF:** Sử dụng Pandoc hoặc Markdown to PDF tools
- **Word:** Import vào Word, giữ nguyên format
- **Confluence:** Copy-paste trực tiếp (mermaid diagram cần export thành hình)
- **Notion:** Import .md file
- **Google Docs:** Convert bằng Docs add-on

### 6. Skill có hỗ trợ tiếng Anh không?

**Trả lời:** Hiện tại skill mặc định tiếng Việt. Nếu muốn output tiếng Anh, yêu cầu Claude:
- "Làm bằng tiếng Anh"
- "Output in English"

### 7. Có thể chia sẻ skill cho team không?

**Trả lời:** Có! Vì skill được đặt ở `.claude/skills/` (project level):
- **Commit lên Git:** Team members clone về đều có skill
- **Ai cũng sử dụng được:** Không cần setup thêm
- **Cập nhật dễ dàng:** Update skill → commit → team sync

---

## 🔄 Version History

### Version 1.0.0 (2025-12-31)
- ✨ Release đầu tiên
- ✅ 8 bước phân tích hoàn chỉnh
- ✅ Template file .md
- ✅ Hướng dẫn chi tiết từng bước

---

## 📞 Hỗ trợ & Feedback

Nếu gặp vấn đề hoặc có đề xuất cải tiến:
1. Tạo issue trong repo của team
2. Liên hệ BA Team lead
3. Đề xuất cải tiến trực tiếp với Claude khi sử dụng

---

## 📄 License

Internal tool cho BA Team. Không public ra ngoài.