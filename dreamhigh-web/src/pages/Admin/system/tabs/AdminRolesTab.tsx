import React from 'react';
import { Button } from '../../../../design-system/components/ui/Button';
import { Card } from '../../../../design-system/components/ui/Card';
import { MODULES } from '../../../Dashboard/dashboardConstants';
import type { Permission, SystemRole } from '../../../../types/adminSystem';
import { getIcon } from '../adminSystemIcons';
import PermissionCheckbox, { type PermissionField } from '../PermissionCheckbox';

interface AdminRolesTabProps {
  roles: SystemRole[];
  selectedRoleId: string;
  onSelectRole: (id: string) => void;
  onTogglePermission: (moduleId: string, field: PermissionField) => void;
  onSave: () => void;
}

const emptyPerm = (moduleId: string): Permission => ({
  moduleId,
  canView: false,
  canCreate: false,
  canUpdate: false,
  canDelete: false,
  canApprove: false,
});

const AdminRolesTab: React.FC<AdminRolesTabProps> = ({
  roles,
  selectedRoleId,
  onSelectRole,
  onTogglePermission,
  onSave,
}) => {
  const selectedRole = roles.find((r) => r.id === selectedRoleId) ?? roles[0];
  const isSuperAdmin = selectedRole?.code === 'ADMIN';

  return (
    <div className="grid grid-cols-1 gap-8 animate-fade-in lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-1">
        <Card className="h-full p-6 shadow-md">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-label font-semibold uppercase tracking-tight text-midnight">Cấu trúc vai trò</h3>
            <button
              type="button"
              className="rounded-lg p-2 text-gold transition-colors hover:bg-gold/10"
              title="Thêm vai trò (mock)"
            >
              {getIcon('Plus', 20)}
            </button>
          </div>
          <div className="space-y-3">
            {roles.map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => onSelectRole(role.id)}
                className={`group relative w-full overflow-hidden rounded-xl border p-5 text-left transition-all ${
                  selectedRoleId === role.id
                    ? 'translate-x-1 border-midnight bg-midnight shadow-lg'
                    : 'border-midnight/10 bg-bg/80 hover:border-gold/40 hover:bg-surface'
                }`}
              >
                {selectedRoleId === role.id && (
                  <div className="absolute right-0 top-0 p-4 opacity-10">{getIcon('ShieldCheck', 48)}</div>
                )}
                <p
                  className={`text-sm font-semibold ${
                    selectedRoleId === role.id ? 'text-gold' : 'text-midnight group-hover:text-gold'
                  }`}
                >
                  {role.name}
                </p>
                <p className="mt-1 font-label text-[10px] font-semibold uppercase text-midnight/40">
                  {role.description}
                </p>
              </button>
            ))}
          </div>
          <div className="mt-8 rounded-xl border border-warning/25 bg-warning-bg p-5">
            <p className="mb-2 flex items-center gap-2 font-label text-[10px] font-semibold uppercase tracking-widest text-warning">
              {getIcon('AlertTriangle', 14)} Lưu ý bảo mật
            </p>
            <p className="font-body text-[10px] font-medium leading-relaxed text-midnight/70">
              Thay đổi phân quyền áp dụng ngay cho mọi người dùng thuộc vai trò này. Cẩn trọng khi thu hẹp quyền
              &quot;Xem&quot; ở phân hệ cốt lõi.
            </p>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <Card className="flex h-full flex-col overflow-hidden p-0 shadow-md">
          <div className="flex flex-col justify-between gap-4 border-b border-midnight/10 bg-bg/50 px-6 py-6 sm:flex-row sm:items-center lg:px-8">
            <div>
              <h3 className="font-label text-lg font-semibold uppercase tracking-tight text-midnight">
                Ma trận phân quyền (RBAC)
              </h3>
              <p className="mt-1 font-body text-xs text-midnight/50">
                Đang thiết lập cho:{' '}
                <span className="font-label font-semibold uppercase text-gold">{selectedRole.name}</span>
              </p>
            </div>
            <Button type="button" onClick={onSave} className="shrink-0 px-8">
              Lưu cấu hình quyền
            </Button>
          </div>

          <div className="flex-1 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-midnight/10 bg-midnight/5">
                  <th className="px-6 py-4 text-left font-label text-[10px] font-semibold uppercase tracking-widest text-gold lg:px-8">
                    Phân hệ (Module)
                  </th>
                  {(['canView', 'canCreate', 'canUpdate', 'canDelete', 'canApprove'] as const).map((h) => (
                    <th key={h} className="px-3 py-4 text-center font-label text-[10px] font-semibold uppercase tracking-widest text-gold">
                      {h === 'canView'
                        ? 'Xem'
                        : h === 'canCreate'
                          ? 'Thêm'
                          : h === 'canUpdate'
                            ? 'Sửa'
                            : h === 'canDelete'
                              ? 'Xóa'
                              : 'Duyệt'}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-midnight/5">
                {MODULES.map((mod) => {
                  const p =
                    selectedRole.permissions.find((perm) => perm.moduleId === mod.id) ?? emptyPerm(mod.id);
                  return (
                    <tr key={mod.id} className="transition-colors hover:bg-midnight/[0.02]">
                      <td className="px-6 py-4 lg:px-8">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-midnight/5 p-2 text-midnight/40">
                            {getIcon(mod.iconName, 18)}
                          </div>
                          <div>
                            <p className="font-body text-sm font-semibold text-midnight">{mod.title}</p>
                            <p className="font-label text-[9px] font-semibold uppercase tracking-tighter text-midnight/40">
                              ID: {mod.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      {(['canView', 'canCreate', 'canUpdate', 'canDelete', 'canApprove'] as const).map((field) => (
                        <td key={field} className="px-3 py-4 text-center">
                          <PermissionCheckbox
                            checked={p[field]}
                            disabled={isSuperAdmin}
                            onChange={() => onTogglePermission(mod.id, field)}
                          />
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-midnight/10 bg-bg/50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1 font-label text-[9px] font-semibold uppercase text-midnight/40">
                <span className="flex h-3 w-3 items-center justify-center rounded bg-gold text-white">
                  {getIcon('Check', 8, 'text-white')}
                </span>
                Đã bật
              </span>
              <span className="flex items-center gap-1 font-label text-[9px] font-semibold uppercase text-midnight/40">
                <span className="h-3 w-3 rounded border border-midnight/20 bg-surface" />
                Chưa cấp
              </span>
            </div>
            <p className="font-body text-[10px] italic text-midnight/40">
              Nhấn ô vuông để bật/tắt quyền (Super Admin: chỉ xem).
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminRolesTab;
