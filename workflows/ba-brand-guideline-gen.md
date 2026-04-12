---
description: "Workflow to generate a comprehensive Brand Guideline in 4 sequential steps."
---

# Workflow: BA Brand Guideline Generation

Quy trình này chia nhỏ việc tạo Brand Design Guideline thành 4 bước (4 skills) nhằm tránh lỗi vượt context window (do output quá dài).

1. [ ] Kích hoạt skill `/ba-brand-info-extract` để hỏi và thu thập thông tin về Brand Assets từ user (Logo, Tên, Personality, Target Audience, v.v.).
2. [ ] Kích hoạt skill `/ba-brand-base-gen` để sinh ra file `[brand-name]-guideline.md` chứa phần cơ sở: Overview, Color System, Typography, Spacing System và Core Design Tokens.
3. [ ] Kích hoạt skill `/ba-brand-components-gen` để tiếp tục append (cập nhật) vào file `[brand-name]-guideline.md` cấu hình chi tiết Specs cho 35 Components.
4. [ ] Kích hoạt skill `/ba-brand-demo-gen` để đọc file Markdown Guideline vừa hoàn thiện và render ra file `[brand-name]-demo.html` trực quan.

**Lưu ý cho Agent**: 
- Các bước này phải được thực hiện theo đúng trình tự.
- Giao tiếp với người dùng qua mỗi bước nếu cần xác nhận.
