/** Labels aligned with Prisma `StudentStatus` (backend). */
export const STUDENT_STATUS_LABEL_VI: Record<string, string> = {
  ACTIVE: 'Đang học',
  RESERVED: 'Bảo lưu',
  DROPPED: 'Nghỉ học',
  GRADUATED: 'Tốt nghiệp',
};

export function studentStatusLabelVi(code: string | undefined | null): string {
  if (!code) return '—';
  return STUDENT_STATUS_LABEL_VI[code] ?? code;
}
