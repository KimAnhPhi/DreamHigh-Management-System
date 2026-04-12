---
name: ba-mockup-prompt-gen-detail
description: "Sinh **một file .md** (`prompt-mh-detail_*.md`): user **copy toàn bộ** dán vào AI gen UI. Nội dung prompt **chỉ nhu cầu nghiệp vụ + dữ liệu (ERD)** — **không** màu, font, spacing, layout style ép buộc, tên component UI, states visual, WCAG, Brand Guideline trong file. **Đầu ra mong muốn của tool: chỉ vùng nội dung MH chi tiết** — không menu điều hướng, sidebar/top bar app, chrome điều hướng ngoài MH (mô tả bắt buộc trong prompt). **Công cụ AI tự quyết** bố cục trong vùng MH. Đầu vào: ERD/data, danh sách MH, `[AI_TOOL]`."
---

# SKILL: BA MOCKUP PROMPT — MH CHI TIẾT

**Version:** 1.6.0 | **Author:** M2MBA | **Updated:** 2026-03-22

**Một dòng cho agent:** File `.md` = prompt **chỉ nhu cầu + data**; **cấm** mọi **design style ép buộc** trong prompt; **bắt buộc** yêu cầu tool chỉ sinh **nội dung MH chi tiết** (không app shell / menu / sidebar / top bar toàn app / chrome điều hướng ngoài MH); **không** đọc/nhúng Brand Guideline vào file đầu ra.

**Phân biệt:** **`ba-feature-detail-prompt-gen`** — một chức năng / một MH focus, cùng tinh thần “chỉ chức năng + data”. Skill **này** — **nhiều MH** trong **cùng một file** `.md`, vẫn **không** ép design style trong prompt; **bắt buộc** phạm vi đầu ra chỉ nội dung MH (không app shell).

---

## INPUT BẮT BUỘC

Trước khi làm, xác nhận đủ **3** mục sau. Thiếu → DỪNG, hỏi bổ sung:

1. ERD hoặc mô tả data của các màn hình cần gen
2. Danh sách màn hình cần gen (tên từng MH)
3. AI design tool → lưu vào `[AI_TOOL]`

**Tuỳ chọn:** Mục đích / pain từng MH (nếu user chưa gộp vào ERD).

**Không tự bịa field từ ERD.**

**Cấm:** Đưa **Brand Guideline**, **design system**, **màu/HEX/font/spacing**, **chỉ định pattern bố cục/visual** để ép style (vd. “card grid 3 cột”, “bento layout”), **chỉ định component** (Button Primary, DataGrid…) vào prompt — kể cả khi user có file guideline (agent **không** copy guideline vào file `.md`).

**Bắt buộc (phạm vi đầu ra cho tool):** Trong **mỗi** MH, prompt phải nêu rõ công cụ **chỉ** tạo **nội dung màn hình chi tiết** (vùng chức năng của MH); **không** tạo menu điều hướng, sidebar app, top bar toàn ứng dụng, header shell hay bất kỳ chrome điều hướng nào **ngoài phạm vi MH**. Đặt ở mục *Mục đích & nhu cầu* (bullet **Phạm vi đầu ra**) và nhắc lại ngắn ở *Giao cho công cụ [AI_TOOL]*.

---

## OUTPUT

**Định dạng:** **một file Markdown** (`.md`) duy nhất.

**Đường dẫn:** `docs-BA/Prototype/Prompt/prompt-mh-detail_[tên-app]_[YYYYMMDD].md`. Tạo thư mục `docs-BA/Prototype/Prompt/` nếu chưa có.

**Cách dùng:** User **copy toàn bộ nội dung** file → dán vào `[AI_TOOL]`. Không tách prompt sang báo cáo khác; không thêm meta BA ngoài nhu cầu + data.

**Nội dung:** Append từng MH theo template; auto-continue giữa các MH. Log nội bộ `✅ Đã gen MH` **không** ghi vào file `.md` nếu làm lẫn prompt.

---

## TEMPLATE MỖI MÀN HÌNH

Chỉ dùng các mục dưới đây — **không** thêm section Colors, Spacing, Contrast, Components kiểu design.

```markdown
### MH [N]: [Tên Màn Hình]

#### Mục đích & nhu cầu (nghiệp vụ)
- Người dùng cần hoàn thành việc gì trên màn này?
- Ràng buộc / quy tắc nghiệp vụ (nếu có): [vd. bắt buộc trước khi gửi, điều kiện hiển thị theo trạng thái dữ liệu — mô tả bằng lời, không chỉ widget]
- **Phạm vi đầu ra (bắt buộc):** Chỉ thiết kế **nội dung MH chi tiết** (vùng chức năng của màn này). **Không** bao gồm menu điều hướng, sidebar app, top bar toàn app, header shell ứng dụng hay khung layout bao ngoài chỉ để điều hướng giữa các module.

#### Phạm vi dữ liệu (từ ERD)
| Field | Kiểu / mô tả | PK/FK | Ràng buộc (nullable, enum, format nghiệp vụ) |
|---|---|---|---|
| … | … | … | … |

#### Quan hệ dữ liệu (nếu có)
- [Entity A] ↔ [Entity B]: [1-N / N-N / FK …] — **chỉ sự kiện dữ liệu**, không gợi ý control UI

#### Luồng hành vi mong muốn (nghiệp vụ, không mô tả UI)
| Bước / sự kiện | Kết quả nghiệp vụ mong đợi |
|---|---|
| … | … |

#### Giao cho công cụ [AI_TOOL]
Thiết kế giao diện màn hình **[Tên MH]** cho ứng dụng **[Tên app]** đáp ứng **mục đích & nhu cầu** và **dữ liệu** trên. **Chỉ xuất ra nội dung màn hình chi tiết** (khu vực chức năng của MH này); **không** tạo menu điều hướng, sidebar, top bar toàn app hay bất kỳ chrome điều hướng nào ngoài phạm vi MH. **Không có ràng buộc design style khác trong prompt này** — bạn tự chọn bố cục nội dung trong vùng MH, thành phần giao diện, màu sắc và trạng thái tương tác phù hợp.
```

---

## KIỂU DỮ LIỆU ERD (tham chiếu nội bộ cho agent — **không** chép bảng “Component UI” vào prompt)

Agent map type → **chỉ ghi kiểu trong cột Field** (string, number, datetime, FK→X, 1-N…). **Không** ghi “dùng Date picker”, “dùng Table” trong file đầu ra.

---

## CHECKLIST (sau khi gen xong)

- [ ] **Một file `.md`**; copy full → AI gen UI
- [ ] **Không** có mục: màu, HEX, font, px spacing, WCAG, layout style ép buộc, tên component Material/Ant, states hover/active, Brand Guideline
- [ ] **Có** đủ: nhu cần nghiệp vụ, **phạm vi đầu ra** (chỉ nội dung MH — không app shell/menu/sidebar/top bar toàn app), bảng field từ ERD, luồng hành vi nghiệp vụ (nếu cần)
- [ ] Field lấy đúng ERD — không bịa
- [ ] `[AI_TOOL]` điền tên thật
- [ ] Không placeholder `[…]` sót (trừ user chấp nhận)

---

## QUY TẮC THỰC THI

1. **Bắt buộc:** ERD/data, danh sách MH, `[AI_TOOL]`. Prompt **chỉ nhu cầu + data** — **công cụ AI tự xử lý** design **trong vùng nội dung MH**.
2. **Bắt buộc (phạm vi mockup):** Mỗi MH phải yêu cầu tool **chỉ** gen **nội dung MH chi tiết**; **không** tạo menu điều hướng, sidebar app, top bar toàn app, header shell hay chrome điều hướng ngoài MH (ghi ở *Mục đích & nhu cầu* + *Giao cho công cụ*).
3. **Cấm** cung cấp **design style ép buộc** trong prompt: màu, typography, spacing số, contrast, mô tả pattern layout/visual để ép style, bảng component + states, map ERD→tên component UI. *(Không nhầm với mục “không app shell” — đó là **phạm vi đầu ra**, không phải chỉ định visual.)*
4. **Không** đọc/nhúng **Brand Guideline** / **DS** vào file `.md` (có thể dùng nội bộ để hiểu domain — **không** đưa vào prompt).
5. Reference ERD thực tế — không tự bịa field.
6. Sinh từng MH, append, auto-continue.
7. File đầu ra là **nội dung prompt duy nhất** cho tool; không thêm file “hướng dẫn copy” song song trừ khi user yêu cầu.
