import { StudentStatus } from '@prisma/client';

/**
 * Allowed transitions for student lifecycle (FR6).
 * RESERVED → GRADUATED is forbidden (must return to ACTIVE first).
 */
const ALLOWED: Record<StudentStatus, StudentStatus[]> = {
  [StudentStatus.ACTIVE]: [StudentStatus.RESERVED, StudentStatus.DROPPED, StudentStatus.GRADUATED],
  [StudentStatus.RESERVED]: [StudentStatus.ACTIVE, StudentStatus.DROPPED],
  [StudentStatus.DROPPED]: [StudentStatus.ACTIVE, StudentStatus.RESERVED],
  [StudentStatus.GRADUATED]: [],
};

export function getAllowedTargets(from: StudentStatus): StudentStatus[] {
  return ALLOWED[from] ?? [];
}

export function canTransition(from: StudentStatus, to: StudentStatus): boolean {
  return getAllowedTargets(from).includes(to);
}
