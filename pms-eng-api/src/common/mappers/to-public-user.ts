type UserRoleRow = { role: { code: string } };
type UserBranchRow = { branchId: number; branch?: { code: string; id: number } };

type UserWithRoles = {
  passwordHash?: string | null;
  googleSub?: string | null;
  userRoles?: UserRoleRow[];
  userBranches?: UserBranchRow[];
  [key: string]: unknown;
};

/** Chuẩn hóa user trả về FE: bỏ passwordHash/googleSub, thêm roles[], branchIds[], bỏ quan hệ thô. */
export function toPublicUser<T extends UserWithRoles>(user: T) {
  const { passwordHash: _p, googleSub: _g, userRoles, userBranches, ...rest } = user;
  const roles = userRoles?.map((ur) => ur.role.code) ?? [];
  const branchIds =
    userBranches?.map((ub) => (ub.branch?.id != null ? ub.branch.id : ub.branchId)) ?? [];
  return { ...rest, roles, branchIds };
}
