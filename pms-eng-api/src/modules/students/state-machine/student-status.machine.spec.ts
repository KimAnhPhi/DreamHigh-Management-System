import { StudentStatus } from '@prisma/client';
import { canTransition, getAllowedTargets } from './student-status.machine';

describe('student-status.machine', () => {
  it('allows ACTIVE -> GRADUATED', () => {
    expect(canTransition(StudentStatus.ACTIVE, StudentStatus.GRADUATED)).toBe(true);
  });

  it('forbids RESERVED -> GRADUATED', () => {
    expect(canTransition(StudentStatus.RESERVED, StudentStatus.GRADUATED)).toBe(false);
  });

  it('lists no targets from GRADUATED', () => {
    expect(getAllowedTargets(StudentStatus.GRADUATED)).toEqual([]);
  });

  it('allows RESERVED -> ACTIVE (re-enrollment path)', () => {
    expect(canTransition(StudentStatus.RESERVED, StudentStatus.ACTIVE)).toBe(true);
  });
});
