import type { PrismaService } from '../../prisma/prisma.service';

/** Tạo username duy nhất từ email hoặc chuỗi gợi ý. */
export async function ensureUniqueUsername(prisma: PrismaService, hint: string): Promise<string> {
  const clean = hint
    .trim()
    .replace(/[^a-zA-Z0-9_]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .slice(0, 80);
  const base = clean || 'user';
  for (let n = 0; n < 10000; n++) {
    const username = n === 0 ? base : `${base}_${n}`;
    const exists = await prisma.systemUser.findUnique({ where: { username } });
    if (!exists) return username;
  }
  throw new Error('Không tạo được username duy nhất');
}
