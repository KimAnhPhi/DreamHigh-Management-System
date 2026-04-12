# Deferred work (từ code review)

## Deferred from: code review — 1-2-danh-muc-dao-tao.md (2026-03-29)

- Controller categories dùng `body: any` — cần DTO/class-validator khi team chốt chuẩn validate toàn module.

## Deferred from: code review — 2-1-ho-so-hoc-vien.md (2026-03-29)

- `StudentsService.create` — mass assignment risk với `data: any`; nên DTO + whitelist.
- StudentManagement mock — theo story, nối API sau.

## Deferred from: code review — 2-2-thay-doi-trang-thai-lo-trinh.md (2026-03-29)

- `needsSensitiveReason` có `RESERVED` — đối chiếu quy tắc nghiệp vụ BA.
