---
name: ba-elicitation-qna-gen
description: "Chuyên trách việc tạo bộ câu hỏi khơi gợi yêu cầu dựa trên thông tin còn thiếu (bao gồm NFR)."
---

# HƯỚNG DẪN SKILL: TẠO CÂU HỎI KHƠI GỢI YÊU CẦU

**Version:** 2.7.0 | **Author:** M2MBA | **Last Updated:** 2026-04-10  
**Description:** Sinh danh sách câu hỏi elicitation; **nội dung câu hỏi theo từng mục** nằm trong `resources/ba-elicitation-checklist.md` — skill này chỉ định **cách áp dụng**, **ngoại lệ**, **output** và **lưu file**.

**Bắt buộc:** Đọc **toàn bộ** `resources/ba-elicitation-checklist.md` (gồm **Phần 6.4 NFR**). Không bỏ sót đầu mục.

**Phạm vi:** Dự án nghiệp vụ Greenfield/Rebuild. Dự án Data-centric (BI/ETL/dashboard pipeline) → skill `ba-data-system-questioning`.

**Đường dẫn `resources/`:** Tương đối từ thư mục chứa `SKILL.md`; không hardcode `.cursor` / `.agent`.

---

## Nguyên tắc đặt câu (tóm tắt — chi tiết checklist)

| Khi nào | Làm gì |
|:--|:--|
| **KHÁM PHÁ (5W1H)** | Mặc định: stakeholder lần đầu; thực trạng nội bộ (quy trình, công cụ, pain) — **không** giả định dù đã research. |
| **XÁC NHẬN** | Chỉ (A) quy chuẩn/ quy định **đã công bố** (fact khách quan), hoặc (B) điều stakeholder **đã nói/ghi** — hỏi lại cho chắc. |
| **Đối thủ / thị trường (Phần 2)** | Research trước (web) → hỏi **cụ thể** theo kết quả research; xem checklist Phần 2. |
| **NFR (6.4)** | Câu hỏi **mở**; chỉ số định lượng chỉ khi stakeholder đã nêu — **không** tự gán mặc định. |

Tránh: câu Yes/No thuần; câu dạng *"Theo tôi tìm hiểu, công ty anh/chị đang…"* cho thực trạng nội bộ chưa được xác nhận.

**Atomic focus:** Chỉ sinh câu hỏi, không cập nhật kết quả elicitation.

**Nguồn & Ground Truth:** Research domain ≠ thực trạng công ty. Chỉ sau khi có kết quả từ stakeholder mới dùng câu xác nhận cho chi tiết nội bộ.

**1 file output:** Mặc định **một** file tổng; không tách nhiều file trừ khi user yêu cầu rõ.

---

## Quy trình (bám checklist; bổ sung chỗ dưới đây)

### Bước 1 — Phân tích bối cảnh
- Đọc Domain/Research BA (nếu có). Xác định **thực thể cốt lõi**, **vòng đời**, **Ambiguity Zones** (symptom vs root cause, ai chịu ảnh hưởng, rủi ro bỏ sót).
- Tóm tắt **2–3 dòng** vào mục `🔎 Phân tích sơ bộ` trong file output.

### Bước 1B — Greenfield vs Rebuild
- **Rebuild** nếu có tín hiệu: hệ thống cũ, migration, chạy song song, cutover, nâng cấp thay thế…  
- **→** Ghi nhận trong phân tích sơ bộ; thêm **PHẦN 1.2B** và đọc `resources/ba-existing-system-deepdive.md` để lấy câu hỏi (nhóm A–D tương ứng chủ đề: tính năng đang dùng/giữ, nguồn gốc vấn đề & dữ liệu, áp lực tăng trưởng/tích hợp, bài học triển khai & adoption). Ưu tiên hết **tính năng ngầm** và **kháng cự người dùng**. ID câu hỏi: `ES-A1`… theo file deepdive.

### Bước 2 — Sinh câu hỏi theo thứ tự checklist
Tuần tự **Phần 1.1 → 1.2 → (1.2B nếu Rebuild) → 1.3 → 1.4 → 2 → 3 → 4 → 5 → 6 (gồm **6.4 NFR**) → 7 → 8 → 9** trong `ba-elicitation-checklist.md`.

**Cấu trúc 1.3 trong output (khớp checklist):**
- **A** — Danh sách stakeholder đủ chưa.  
- **B** — Vòng đời từng thực thể chính (trạng thái thiếu/thừa?).  
- **C** — Với mỗi stakeholder & công việc: đầu vào/ra, công thức, **template & báo cáo (bắt buộc xin mẫu)**, kênh trao đổi, quy định, lỗi/ngoại lệ — theo mục 1.3 checklist.

**Phần 1.4** — Năm chiều: Quy trình, Tích hợp, Dữ liệu/Migration, Con người, Pháp lý (bảng trong checklist).

### Phần 1.5 — Thu thập Artifacts (chỉ khi đủ trigger)
**Trigger:** User đã cung cấp **kết quả khơi gợi** (notes/transcript/file trả lời) **và** trong đó có tài liệu/báo cáo được nhắc nhưng **chưa có mẫu**, hoặc luồng trao đổi **chưa rõ trường dữ liệu / kênh**.  
**Không** tạo Phần 1.5 khi chưa có kết quả từ stakeholder.

**Artifact:** Mọi “đơn vị thông tin” (file, phiếu, chat, trường form…). Với từng gap, hỏi theo **5 nhóm**: ① File quản lý ② Biểu mẫu/phiếu ③ Báo cáo/dashboard ④ Trao đổi giữa bộ phận ⑤ **Nội dung & trường thông tin** (quan trọng cho data model/UI). Câu hỏi **cụ thể theo ngữ cảnh** (xin mẫu đã ẩn PII nếu cần).

---

## Bước 3 — Lưu file (incremental — bắt buộc)

- **Đường dẫn:** `docs-BA/Elicitation/listQA/questions_tracking_YYYYMMDD_[tênDựÁn].md`
- **Một file:** Toàn bộ phần nối vào cùng file; append từng phần; **không** sinh hết một lần rồi mới ghi (tránh mất dữ liệu khi ngắt).
- **Thứ tự append:** 1.1 → tạo file → 1.2 → 1.2B (nếu có) → 1.3A–C → 1.4 → 2… → 6 (có **6.4**) → 7 → 8 → (9 nếu checklist có). Phần **1.5** chỉ khi trigger.

---

## Template output (tối thiểu — mở rộng bảng theo từng phần checklist)

```markdown
# Theo dõi câu hỏi: [Tên dự án]
**Ngày tạo:** YYYY-MM-DD | **Nguồn:** BA Research + AI Domain Knowledge

## 🔎 Phân tích sơ bộ
> **Vấn đề cốt lõi:** …
> **Ambiguity Zones:** …
> **Rủi ro bỏ sót:** …
> *(Nếu Rebuild: ghi nhận + tham chiếu 1.2B / deepdive)*

---

## PHẦN 1.1 … | PHẦN 1.2 … | PHẦN 1.2B … (nếu Rebuild)
| ID | Mục | Câu hỏi | Loại (XÁC NHẬN / KHÁM PHÁ) | Status |

## PHẦN 1.3 — A / B / C
…

## PHẦN 1.4 — Tác động
…

## PHẦN 1.5 — Thu thập Artifacts *(chỉ khi trigger)*
| ID | Bộ phận | Loại Artifact | Câu hỏi XIN MẪU | Status |

## PHẦN 2 … đến PHẦN 8 (và 9 nếu áp dụng)
**Phần 6:** có tiểu mục **6.4 NFR** — câu hỏi theo checklist 6.4.

---
⬜ Chờ xác nhận | ✅ Đã xác nhận

## 💡 Lưu ý khi phỏng vấn
> 2–3 tip ngắn theo domain / pain point vừa phân tích.
```

---

*Skill này cố ý **không** lặp lại nội dung từng ô checklist; agent đọc `resources/ba-elicitation-checklist.md` khi thực thi.*
