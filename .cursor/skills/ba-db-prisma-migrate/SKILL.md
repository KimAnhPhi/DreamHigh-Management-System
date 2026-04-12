---
name: "ba-db-prisma-migrate"
description: "Cập nhật Prisma schema + migration versioned từ User Story/ERD; hướng dẫn hoặc chạy migrate dev/deploy, generate, seed. Nhắc postinstall generate, tsconfig include prisma, IDE monorepo để tránh lỗi PrismaClient."
---

# BA DB PRISMA MIGRATE

**Version:** 1.3.3 · **M2MBA** · **2026-03-28**

Skill: đọc `schema.prisma` → gap analysis → sửa schema → tạo `prisma/migrations/TIMESTAMP_tên/migration.sql` → tóm tắt + (tuỳ chọn) apply DB. Không bịa field ngoài yêu cầu; cảnh báo DROP/rename/đổi kiểu trên bảng có data.

---

## Input

| # | Nội dung | Bắt buộc |
|---|----------|----------|
| 1 | User Story / yêu cầu | ✅ |
| 2 | Đường dẫn `schema.prisma` | ✅ |
| 3 | ERD / Data Model | ❌ |
| 4 | Tên migration (snake_case) | ❌ — tự suy nếu thiếu |
| 5 | Path bổ sung tới convention DB (nếu không nằm ở project-context / architecture) | ❌ |

---

## Nguồn quy ước dự án (Agent đọc trước khi áp mặc định skill)

**Thứ tự ưu tiên** (file/thư mục nào **có trong repo** thì đọc):

1. **`project-context.md`** (hoặc `project-context*.md`, `docs/project-context.md`, nội dung tương đương trong `.cursor/rules`) — rule stack, naming, DB nếu có.
2. **Tài liệu architecture** — vd. `_bmad-output/planning-artifacts/architecture/`, `docs/architecture/`, `architecture/*.md`, solution design có mục data/DB.
3. Sau đó: ADR, `CONTRIBUTING`, ERD/Data model đã thống nhất team.

Không tìm thấy mục DB/naming trong (1)(2) → vẫn dùng **`schema.prisma` hiện có** + ERD + hỏi User; mặc định skill chỉ là fallback.

---

## Nguyên tắc

- **Quy ước naming / migration / kiểu ID:** Bám **project-context + architecture** (mục trên), rồi doc phụ; không có thì bám `schema.prisma` + ERD. Các bullet dưới là **gợi ý** khi không trái các nguồn đó.
- Migration mới = **thư mục mới** `YYYYMMDDHHMMSS_tên_snake`, **không** ghi đè migration cũ *(trừ khi architecture/project-context quy định khác, vẫn tương thích Prisma)*.
- **Tên field Prisma vs cột/bảng SQL:** `@map` / `@@map` khi khác tên; chiều camelCase ↔ snake_case **theo project-context / architecture / schema hiện có + ERD**, không áp cứng. *Gợi ý JS thường thấy:* camelCase model, cột SQL snake_case — chỉ khi không trái repo.*
- Thay đổi **nguy hiểm** (xóa cột/bảng, đổi kiểu không tương thích): **hỏi / cảnh báo** User trước khi sinh SQL.
- Sau đổi schema: **`npx prisma generate`** (hoặc đi kèm `migrate dev`). Thiếu generate → TS báo *Property does not exist* trên `PrismaClient`.
- **Client / seed / IDE:** `postinstall: prisma generate`; seed script `prisma generate && …`; `tsconfig` `include` thêm `prisma/**/*.ts`; monorepo: mở folder backend hoặc `.vscode` `typescript.tsdk` → `…/backend/node_modules/typescript/lib`. Tuỳ chọn reset seed: `$executeRawUnsafe` + `TRUNCATE … CASCADE` (PG), đúng tên bảng `@@map`; chuẩn lâu dài vẫn `deleteMany` + client đã generate.

---

## Quy trình (Agent)

1. **Đọc** `schema.prisma`. Chưa có → hỏi provider (pg/mysql/sqlite/…), tạo `generator` + `datasource`.
2. **Gap analysis** (ADD/MODIFY model-field-enum-relation-index; DROP = ⚠️). In tóm tắt ra chat; nguy hiểm → chờ xác nhận.
3. **Sửa** `schema.prisma` (đã đọc **project-context + architecture** nếu có; không có rule DB thì bám schema hiện có + mặc định mục Nguyên tắc).
4. **Migration:** `prisma/migrations/{TIMESTAMP}_{name}/migration.sql` — SQL đúng **provider** trong `datasource` (MySQL ≠ PostgreSQL enum/syntax). Patterns: `CREATE TABLE`, `ALTER … ADD COLUMN`, index, `FOREIGN KEY` với `ON DELETE/UPDATE` phù hợp.
5. **Output chat:** đường dẫn file đã sửa + lệnh dưới đây (và **chạy terminal** nếu User đồng ý + có `DATABASE_URL` dev).

### Lệnh sau khi có schema + migration

```text
cd "<backend>"    # folder có package.json + prisma/

npx prisma validate
npx prisma migrate status

# Dev: apply pending + generate
npx prisma migrate dev
# hoặc chỉ tạo file chưa apply:
# npx prisma migrate dev --name ten --create-only

# Prod/CI: chỉ apply migration đã commit (không dùng migrate dev)
npx prisma migrate deploy

npx prisma generate   # nếu chưa chạy qua migrate dev
npx prisma db seed    # tuỳ project
```

**Ai chạy:** Agent **được** chạy `migrate dev` / `validate` / `status` trên **dev local** khi User đồng ý. **Production / DB shared:** không tự apply — chỉ khi User xác nhận rõ; ưu tiên User/CI + `migrate deploy`. Không có DB / URL → chỉ in lệnh.

---

## Output

| Thành phần | Ghi chú |
|------------|---------|
| `prisma/schema.prisma` | Đã cập nhật |
| `prisma/migrations/…/migration.sql` | Mới |
| Apply DB | Tuỳ chọn — theo bảng “Ai chạy” |

---

## Trường hợp đặc biệt (tóm tắt)

| Tình huống | Xử lý |
|------------|--------|
| Cột NOT NULL thêm vào bảng có data | DEFAULT hoặc backfill trước |
| M2M | Bảng junction explicit |
| Fresh repo chưa có Prisma | `npm i prisma @prisma/client` → `npx prisma init` → cấu hình `.env` `DATABASE_URL` → `migrate dev --name init_…` |
| DB đã có bảng, chưa có lịch sử migrate | `db pull` → baseline folder `0_init` + `migrate diff --from-empty --to-schema-datamodel …` → `migrate resolve --applied 0_init` |
| Reset dev | `migrate reset` — **xóa hết data** |
| TS không thấy `prisma.*` | `prisma generate`, `tsconfig` include `prisma/**`, IDE đúng package backend |

---

## Fresh setup / seed (lệnh gọn)

```powershell
cd "<backend>"
npm install prisma @prisma/client
npx prisma init
# Sửa .env: DATABASE_URL

npx prisma migrate dev --name init_ten_goi_y
# package.json: "prisma": { "seed": "tsx prisma/seed.ts" } hoặc ts-node
npx prisma db seed
```

*(Chi tiết từng bước cài đặt OS/DB: hướng dẫn User theo doc Prisma + connection string thực tế.)*
