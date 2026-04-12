---
name: ba-elicitation-qna-gen
description: "Chuyên trách việc tạo bộ câu hỏi khơi gợi yêu cầu dựa trên thông tin còn thiếu."
---

# HƯỚNG DẪN SKILL: TẠO CÂU HỎI KHƠI GỢI YÊU CẦU

**Version:** 2.4.1
**Author:** M2MBA
**Last Updated:** 2026-03-17
**Description:** Chuyên trách việc tạo bộ câu hỏi khơi gợi yêu cầu dựa trên thông tin còn thiếu.

## 🎯 Mục đích
Tạo danh sách câu hỏi elicitation theo đúng bối cảnh: **5W1H Open Questions** là mặc định khi gặp stakeholder lần đầu, **Confirming Questions** chỉ dùng trong hai trường hợp rất cụ thể (xem Nguyên tắc 1). Tránh tuyệt đối dạng "Theo tôi tìm hiểu, công ty anh/chị đang làm X..." khi chưa có bằng chứng — nếu giả định sai sẽ mất trust ngay buổi đầu.

---

## 📋 Nguyên tắc cốt lõi

1. **BẮT BUỘC có ngành nghề**: Phải biết Ngành nghề/Lĩnh vực trước khi gen câu hỏi.
   - **Mặc định dùng 5W1H Open Questions** khi gặp stakeholder lần đầu hoặc chưa có thông tin từ phía họ.
   - **Chỉ dùng Confirming Questions ("Theo tôi tìm hiểu...")** trong đúng 2 trường hợp:
     - ✅ **(A) Quy chuẩn/Quy định phổ quát đã công bố**: Ví dụ chuẩn ICAO, emission factor Jet-A = 3.16 kg CO₂/kg, CORSIA Phase timeline... — đây là fact khách quan, đúng với mọi airline.
     - ✅ **(B) Thông tin stakeholder đã cung cấp trước**: Stakeholder đã nói/ghi rõ điều gì đó → BA hỏi xác nhận lại để chắc chắn hiểu đúng.
   - ❌ **KHÔNG dùng Confirming** cho thực trạng nội bộ công ty (quy trình, công cụ, pain point, cơ cấu...) khi chưa được xác nhận — dù BA có research, thực trạng mỗi công ty khác nhau. Giả định sai = mất trust ngay buổi đầu.
   - Tránh câu hỏi Yes/No thuần túy; mở rộng bằng cách hỏi thêm context hoặc example.
2. **Atomic Focus**: Chỉ tập trung sinh câu hỏi, không cập nhật kết quả.
3. **Phân biệt Nguồn dữ liệu**:
   - **File tìm hiểu Domain (BA research)**: Dùng để hiểu bối cảnh ngành, KHÔNG dùng để giả định thực trạng công ty cụ thể.
     - → Thông tin quy chuẩn ngành (standard/regulation): chuyển thành **câu hỏi XÁC NHẬN**. Cấu trúc: *"Theo chuẩn ICAO/quy định [X]... Vietjet có áp dụng đúng theo chuẩn này không?"*
     - → Thông tin thực trạng công ty (công cụ đang dùng, quy trình, pain point): **BẮT BUỘC dùng 5W1H**. Ví dụ: *"Hiện tại anh/chị đang quản lý dữ liệu fuel bằng công cụ gì?"* thay vì *"Theo tôi tìm hiểu, Vietjet đang dùng Excel..."*
   - **Kết quả khơi gợi (Ground Truth)**: Dữ liệu thật từ Stakeholder. Dùng làm căn cứ cập nhật tracking và xây dựng câu hỏi XÁC NHẬN ở các vòng tiếp theo.
4. **Checklist là kim chỉ nam**: Đọc toàn bộ `.agent/skills/ba-elicitation-qna-gen/resources/ba-elicitation-checklist.md` và bao phủ 100% đầu mục. **Không được bỏ sót**.
5. **Sharding Policy — TUYỆT ĐỐI 1 FILE DUY NHẤT**: Mặc định tạo 1 file tổng duy nhất, **toàn bộ các phần đều nối vào file đó**. Agent **KHÔNG ĐƯỢC TỰ Ý tách thành nhiều file con**. Chỉ tách file khi người dùng hỏi và yêu cầu rõ ràng (ví dụ: "tách riêng phần X ra file khác").
6. **Thu thập Artifacts — Khi phát hiện thiếu trong kết quả elicitation**: PHẦN 1.5 chỉ được tạo ra khi user cung cấp kết quả khơi gợi (meeting notes, transcript...) VÀ trong đó stakeholder đề cập đến một tài liệu/biểu mẫu/file nhất định nhưng chưa cung cấp mẫu thực tế. Xem trigger chi tiết tại PHẦN 1.5 bên dưới. **KHÔNG tạo PHẦN 1.5 mặc định** khi chưa có kết quả elicitation nào từ stakeholder.
7. **Checklist chuyên sâu Hệ thống cũ**: Khi có tín hiệu tổ chức *đang dùng phần mềm chưa đáp ứng và muốn xây lại*, PHẢI đọc và áp dụng `.agent/skills/ba-elicitation-qna-gen/resources/ba-existing-system-deepdive.md`. Checklist này **bổ sung** cho Phần 1.2 tổng quát, không thay thế. Xem Phần 1.2 bên dưới để biết cách nhận nhận diện tín hiệu.


---

## 🚀 Quy trình sinh câu hỏi (BẮT BUỘC TUÂN THỦ)

### BƯỚC 1: PHÂN TÍCH BỐI CẢNH
- Đọc file Domain/Research của BA (nếu có).
- Xác định các **thực thể cốt lõi** (Core Entities): Tài xế, Đơn hàng, Khách hàng, Phương tiện...
- Phác thảo **Vòng đời (Life Cycle)** của từng thực thể dựa trên research/industry knowledge.
- Xác định **Ambiguity Zones** — vùng chưa rõ cần khám phá:
  - Vấn đề cốt lõi là gì? (Symptom vs. Root Cause)
  - Ai thực sự bị ảnh hưởng?
  - Thông tin nào BA chưa biết và có rủi ro bỏ sót?
- Tóm tắt Ambiguity Zones thành **2–3 dòng** để đưa vào section "🔎 Phân tích sơ bộ" ở đầu file output.

### BƯỚC 1B: NHẬN DIỆN LOẠI DỰ ÁN — GREENFIELD HAY REBUILD?

Xác định loại dự án trước khi sinh câu hỏi:
- **Greenfield**: Xây hệ thống mới hoàn toàn, chưa có hệ thống cũ.
- **Rebuild/Migration**: Đang có hệ thống cũ, cần xây lại hoặc thay thế.

**Dấu hiệu nhận biết Rebuild** (bất kỳ tín hiệu nào dưới đây):
- Stakeholder đề cập: *"hệ thống cũ"*, *"phần mềm đang dùng"*, *"muốn chuyển sang cái mới"*.
- *"Hệ thống không đáp ứng được nữa"*, *"nâng cấp"*, *"làm lại từ đầu"*.
- Có nhắc đến **data migration**, **chạy song song**, hoặc **cutover**.

→ Nếu là **Rebuild**: ghi nhận vào "🔎 Phân tích sơ bộ" và bổ sung **PHẦN 1.2B** với 4 sub-group (8a–8d) theo mô tả ở TRIGGER bên dưới.

### BƯỚC 2: GEN CÂU HỎI THEO THỨ TỰ CHECKLIST ĐỂ LÀM RÕ CÁC THÔNG TIN SAU, CÓ THỂ DỰA VÀO FILE RESEARCH HOẶC THÔNG TIN BẠN TỰ RESEARCH THÔNG TIN LIÊN QUAN TỚI CHECKLIST ĐỂ RA CÂU HỎI DẠNG XÁC NHẬN - NẾU THÔNG TIN RESEARCH ĐÓ CÓ NGUỒN RÕ RÀNG + CÁC BÊN CÙNG LĨNH VỰC THƯỜNG LÀM NHƯ VẬY THÌ MỚI ĐƯỢC DÙNG DẠNG XÁC NHẬN, THEO TÔI TÌM HIỂU THÌ ....(TOP-DOWN)

#### ① Phần 1.1 – Vấn đề & Mục đích (ĐẦU TIÊN)
Dùng thông tin trong file research để xác nhận:
- Vấn đề/Cơ hội mà tổ chức đang gặp để muốn xây dựng giải pháp tương ứng.
- Cơ cấu tổ chức và người ra quyết định.
- Mô hình kinh doanh (BMC: Revenue, Cost, Partners...). Nếu sản phẩm phần mềm làm chỉ đơn giản quản lý luồng công việc - ko liên quan bán hàng, doanh thu thì sẽ ko cần tìm hiểu mô hình kinh doanh. Mà tập trung vào : Key activity,  Key partner, Cost structure (nếu hoạt động cần trả chi phí cho đối tác)
- Thách thức cấp cao từ lãnh đạo (KPI không đạt...).

#### ② Phần 1.2 – Hệ thống hiện tại
- Hệ thống đang dùng (phần mềm/thủ công).
- Tính năng đang dùng nhiều nhất.
- Người dùng thực tế.
- Bất cập lớn nhất.

> **🔍 TRIGGER — Rebuild/Migration Detected:**
> Khi phát hiện tín hiệu Rebuild (xem Bước 1B), BẮT BUỘC đọc `resources/ba-existing-system-deepdive.md` VÀ thêm **PHẦN 1.2B** vào file output với **4 sub-group** sau:
>
> **8a. Hiểu hệ thống cũ** — Những tính năng nào đang dùng tốt cần giữ? Tính năng nào không ai dùng? Có tính năng "ngầm" chỉ người cũ biết không?
>
> **8b. Dữ liệu & Migration** — Dữ liệu lịch sử có cần chuyển không? Bao nhiêu năm? Dữ liệu có sạch không? Cần chạy song song bao lâu? Nếu không migrate được thì xử lý thế nào?
>
> **8c. Lý do thay thế & Kỳ vọng cải tiến** — Lý do chính (kỹ thuật/nghiệp vụ/chi phí)? Có sự cố từ hệ thống cũ đang ảnh hưởng hàng ngày? Hệ thống mới cần cải thiện điều gì cụ thể?
>
> **8d. Quản lý thay đổi & Người dùng** — Người dùng có được hỏi ý kiến chưa? Nhóm nào kháng cự? Kế hoạch đào tạo? Ai là "champion" nội bộ thúc đẩy adoption?
>
> ⚠️ **Lưu ý BA**: Rủi ro lớn nhất của Rebuild là **bỏ sót tính năng cũ đang dùng ngầm** và **kháng cự từ người dùng**. Ưu tiên hỏi kỹ 8a và 8d.
> Dùng ID: `ES-A1`, `ES-B1`, `ES-C1`, `ES-D1`... theo từng sub-group.

#### ③ Phần 1.3 – Quy trình & Công việc (QUAN TRỌNG NHẤT)
*Đi theo 3 lớp:*

**Lớp A – Xác nhận Stakeholder:**
Hỏi để confirm danh sách đầy đủ các bên liên quan. Ví dụ: *"Dự kiến gồm A, B, C, D... Danh sách này đã đủ chưa?"*

**Lớp B – Xác nhận Vòng đời thực thể:**
Với mỗi thực thể chính, lập bảng vòng đời và hỏi xác nhận:
*"Vòng đời cuốc xe: Đặt → Gán → Đón → Đang đi → Hoàn thành/Hủy. Đúng không? Có trạng thái nào thiếu?"*

**Lớp C – Chi tiết công việc từng Stakeholder:**
*Mỗi Stakeholder phải được hỏi về nhiều công việc khác nhau.* Với mỗi công việc, hỏi đủ các mục:
- Công việc stakeholder thực hiện hàng ngày liên quan tới bài toán đang giải quyết là gì?
- Cách thực hiện từng bước của công việc đó như thế nào?
- Thông tin đầu vào cần có là gì(thông tin từ hệ thống cũ, file, thông tin KH cung cấp, thông tin từ bộ phận khác...)?
- Thông tin đầu ra là gì - lưu trữ ở đâu - xin thông tin cụ thể của đầu ra. Đầu ra này cung cấp cho ai?
- Có công thức/logic tính toán nào không?
- **Template/biểu mẫu đang dùng? (BẮT BUỘC XIN MẪU)**
- Quy định stakeholder cần tuân thủ khi thực hiện công việc đó, quyền hạn của stakeholder như thế nào, tình huống lỗi có thể xảy ra khi thực hiện công việc đó?
- **Báo cáo đang xem là gì? (BẮT BUỘC XIN MẪU)**
- **Dữ liệu trao đổi với bộ phận khác qua kênh nào? (email, file, phiếu in, chat nội bộ?)**
- **Ngoại lệ & Edge Cases:** Có tình huống nào không theo quy trình chuẩn? Điều gì xảy ra khi có sự cố/lỗi? Mùa cao điểm hoặc hoàn cảnh đặc biệt có thay đổi cách xử lý không?

#### ④ Phần 1.4 – Phân tích Tác động
Bao phủ 5 chiều: Quy trình, Tích hợp hệ thống, Dữ liệu/Migration, Con người, Pháp lý.

#### ⑤ Phần 1.5 – Thu thập Artifacts ⭐

> 🔍 **TRIGGER — Chỉ tạo phần này khi có đủ 2 điều kiện:**
> 1. User đã cung cấp **kết quả khơi gợi** (meeting notes, transcript, file trả lời từ stakeholder)
> 2. Trong kết quả đó, stakeholder đề cập đến một trong các tình huống sau **nhưng chưa làm rõ**:
>    - Tài liệu/báo cáo/file được nhắc đến **nhưng chưa có mẫu thực tế**
>    - Luồng trao đổi thông tin giữa các bên (VD: *"KH cung cấp thông tin cho GDV"*) **nhưng chưa nói rõ cụ thể là thông tin gì, gồm những trường nào, qua kênh nào**
>
> Ví dụ trigger: stakeholder nói *"chúng tôi có báo cáo tồn kho ngày"* nhưng file mẫu chưa được gửi → tạo câu hỏi xin mẫu báo cáo đó.
> **KHÔNG tạo phần này** khi chưa có bất kỳ kết quả elicitation nào từ stakeholder.

> **Artifact là gì?** Bất kỳ "mẫu thông tin" nào stakeholder đang tạo ra, trao đổi, hoặc xử lý trong công việc thực tế — kể cả file, phiếu in, tin nhắn chat, bài đăng mẫu, hay trường dữ liệu trên màn hình. Mục tiêu: BA hiểu đủ để thiết kế giao diện, form nhập liệu, và luồng dữ liệu chính xác.

Với mỗi artifact bị thiếu đã phát hiện, hỏi theo **5 nhóm**:

| Nhóm | Mô tả | Ví dụ cần hỏi |
|:--|:--|:--|
| **① File quản lý** | File số stakeholder đang dùng hàng ngày | Excel/Sheet công nợ, tồn kho, lịch ca, báo cáo... |
| **② Biểu mẫu & phiếu** | Phiếu in, form giấy đi kèm quy trình | Phiếu nhập kho, phiếu chốt ca, PO đặt hàng NCC... |
| **③ Báo cáo & dashboard** | Output thông tin stakeholder cần xem | Báo cáo ngày, dashboard Excel, màn hình phần mềm cũ... |
| **④ Dữ liệu trao đổi** | Thông tin gửi qua chat/email/giấy giữa các bên | Tin nhắn Zalo đặt hàng, email thông báo KM, phiếu ghi tay... |
| **⑤ Nội dung & trường thông tin** | Bất kỳ "loại nội dung" nào stakeholder đang tạo ra, hiển thị với người khác, hoặc cần nhập vào hệ thống | Bài đăng tuyển dụng gồm những trường gì? Thông báo KM gửi KH chứa thông tin gì? Phiếu giao hàng in ra có những mục nào? |

> **Nhóm ⑤ đặc biệt quan trọng:** Giúp BA xác định **data model** và **thiết kế giao diện** — không phải chỉ thu thập file mà là hiểu *"đơn vị thông tin"* mà hệ thống cần xử lý. Ví dụ:
> - Khi đăng bài tuyển dụng → BA cần biết: tiêu đề, mô tả công việc, yêu cầu, mức lương, hạn nộp, cách ứng tuyển... → mỗi trường đó là 1 field trong hệ thống và 1 vùng hiển thị trên giao diện ứng viên.
> - Khi gửi thông báo KM cho KH → BA cần biết: tên chương trình, % giảm, điều kiện áp dụng, thời hạn, hàng áp dụng... → thiết kế form tạo KM và hiển thị trên POS/app.

**Cách đặt câu hỏi Artifact:**
- *"Việc [X] hiện tại anh/chị đang ghi chép/theo dõi ở đâu — Excel, sổ tay, hay phần mềm cũ? Mình có thể xin file/ảnh chụp mẫu không?"*
- *"Khi gửi [thông tin Y] cho [người nhận Z], anh/chị gửi qua kênh nào và nội dung thường có những gì? Mình xin 1 tin nhắn/email mẫu thực tế (đã ẩn thông tin nhạy cảm)."*
- *"Khi [tạo/đăng/in] [loại nội dung X], anh/chị điền/nhập những thông tin gì? Mình cần biết đủ các trường để thiết kế màn hình nhập và hiển thị."*
- Câu hỏi phải **cụ thể theo ngữ cảnh** — không hỏi chung *"Bộ phận có dùng Excel không?"*


#### ⑥ Phần 2 → 8 (Theo đúng thứ tự checklist)
- Phần 2: Đối thủ & Thị trường (research trước, hỏi xác nhận).
- Phần 3: Nhu cầu tương lai & MVP Priority.
- Phần 4: User Story Harvest (Happy Path, Negative Path, Validation, Permissions, UI Preference).
- Phần 5: Tích hợp & Data Import (xin schema/file mẫu).
- Phần 6: Kỹ thuật (Hạ tầng, Bảo mật, Mobile).
- Phần 7: Báo cáo (**BẮT BUỘC xin file mẫu TẤT CẢ báo cáo**). Dashboard.
- Phần 8: Ngân sách, Timeline & Quy trình làm việc.

### BƯỚC 3: LƯU FILE *(Incremental Update – BẮT BUỘC)*
- **Đường dẫn:** `docs-BA/Elicitation/listQA/questions_tracking_YYYYMMDD_[tênDựÁn].md`
- **Quy tắc 1 file duy nhất:** Chỉ tạo **1 file output tổng**. Tất cả các phần đều được **nối thêm (append) vào file đó**. Tuyệt đối không tự tách thành nhiều file con trừ khi user yêu cầu rõ ràng.
- **Cơ chế Incremental — thực hiện theo đúng thứ tự sau:**
  1. **Phần 1.1 xong → TẠO FILE MỚI** với header + nội dung Phần 1.1 (dùng `write_to_file`).
  2. **Từ Phần 1.2 trở đi → APPEND vào file đã tạo** (dùng `edit_file` hoặc `str_replace_editor` để nối thêm nội dung, không ghi đè).
  3. Thứ tự các phần: 1.1 → 1.2 (→ 1.2B nếu trigger) → 1.3A → 1.3B → 1.3C → 1.4 → 2 → 3 → ... → 8.
     *(Phần 1.5 chỉ thêm vào khi có trigger artifact — xem Nguyên tắc 6)*
  4. Sau mỗi phần, **commit ngay vào file** rồi mới tiếp tục phần tiếp theo.
- **TUYỆT ĐỐI KHÔNG** sinh toàn bộ nội dung trong 1 lần duy nhất rồi mới ghi → dễ bị lỗi ngắt quãng mất toàn bộ dữ liệu.

---

## 📄 Format file output (Template bắt buộc)

```markdown
# Theo dõi câu hỏi: [Tên dự án]
**Ngày tạo:** YYYY-MM-DD | **Nguồn:** BA Research + AI Domain Knowledge

## 🔎 Phân tích sơ bộ
> **Vấn đề cốt lõi:** [Symptom vs. Root Cause trong 1 câu]
> **Ambiguity Zones:** [2–3 vùng chưa rõ BA cần khám phá]
> **Rủi ro bỏ sót:** [Điều gì dễ bị bỏ qua nếu không hỏi kỹ]

---

## PHẦN 1.1: VẤN ĐỀ & MỤC ĐÍCH
| ID | Mục | Câu hỏi | Loại | Status |
|:--|:--|:--|:--|:--:|

> *Loại: `XÁC NHẬN` = Confirming Question | `KHÁM PHÁ` = 5W1H Open Question*

## PHẦN 1.2: HỆ THỐNG HIỆN TẠI
| ID | Mục | Câu hỏi | Loại | Status |
...

## PHẦN 1.3: QUY TRÌNH & CÔNG VIỆC
### A. Xác nhận Stakeholder
### B. Vòng đời thực thể
### C. Công việc chi tiết từng Stakeholder (Mỗi người nhiều công việc)
...

## PHẦN 1.4: TÁC ĐỘNG
...

## PHẦN 1.5: THU THẬP ARTIFACTS ⭐
| ID | Bộ phận | Loại Artifact | Câu hỏi XIN MẪU | Status |
|:--|:--|:--|:--|:--:|
| 1.5.1 | [Bộ phận] | File quản lý (Excel/Sheet) | ... | ⬜ |
| 1.5.2 | [Bộ phận] | Biểu mẫu/Phiếu | ... | ⬜ |
| 1.5.3 | [Bộ phận] | Báo cáo | ... | ⬜ |
| 1.5.4 | [Bộ phận] | Dữ liệu trao đổi nội bộ | ... | ⬜ |

## PHẦN 2-8: (tiếp tục theo thứ tự)

---
*Ghi chú: ⬜ = Chờ xác nhận. ✅ = Stakeholder đã xác nhận.*

## 💡 Lưu ý khi phỏng vấn
> [2–3 tip ngắn phù hợp với domain/context cụ thể — do AI sinh ra sau khi phân tích pain point]
```

---

> **Version:** 2.5.0
> **Author:** M2MBA
> **Last Updated:** 2026-03-01
> **Description:** Skill tạo câu hỏi elicitation cho dự án nghiệp vụ (Greenfield/Rebuild). Dự án Data-Centric (BI, Analytics, Dashboard, Pipeline) đã được tách thành skill riêng `ba-data-system-questioning` — không thuộc phạm vi skill này.
