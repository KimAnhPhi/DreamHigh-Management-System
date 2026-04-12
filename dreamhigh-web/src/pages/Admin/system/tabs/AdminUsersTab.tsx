import React from 'react';
import { Button } from '../../../../design-system/components/ui/Button';
import { Card } from '../../../../design-system/components/ui/Card';
import { Input } from '../../../../design-system/components/ui/Input';
import type { Branch, SystemRole, SystemUser } from '../../../../types/adminSystem';
import { getIcon } from '../adminSystemIcons';

interface AdminUsersTabProps {
  users: SystemUser[];
  roles: SystemRole[];
  branches: Branch[];
  searchTerm: string;
  onSearchChange: (v: string) => void;
  onCreate: () => void;
  onView: (user: SystemUser) => void;
  onEdit: (user: SystemUser) => void;
  onToggleStatus: (id: string) => void;
  isLoading?: boolean;
}

const AdminUsersTab: React.FC<AdminUsersTabProps> = ({
  users,
  roles,
  branches,
  searchTerm,
  onSearchChange,
  onCreate,
  onView,
  onEdit,
  onToggleStatus,
  isLoading = false,
}) => (
  <Card className="flex flex-col overflow-hidden p-0 shadow-md animate-fade-in">
    <div className="flex flex-col gap-4 border-b border-midnight/10 bg-bg/50 px-6 py-6 md:flex-row md:items-center md:justify-between lg:px-8">
      <div>
        <h3 className="font-label text-lg font-semibold uppercase tracking-tight text-midnight">
          Danh sách tài khoản
        </h3>
        <p className="mt-1 font-body text-xs text-midnight/50">
          Quản lý nhân sự và quyền truy cập theo vai trò
        </p>
      </div>
      <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
        <div className="relative flex-1 md:w-64">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-midnight/40">
            {getIcon('Search', 16)}
          </span>
          <Input
            className="!pl-10"
            placeholder="Username, Họ tên..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Button type="button" onClick={onCreate} className="flex items-center justify-center gap-2 md:px-6">
          {getIcon('Plus', 16)} Tạo tài khoản
        </Button>
      </div>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-midnight/10 bg-midnight/5">
            <th className="px-6 py-4 text-left font-label text-[10px] font-semibold uppercase tracking-widest text-gold lg:px-8">
              Tài khoản
            </th>
            <th className="px-4 py-4 font-label text-[10px] font-semibold uppercase tracking-widest text-gold">
              Họ và tên
            </th>
            <th className="px-4 py-4 font-label text-[10px] font-semibold uppercase tracking-widest text-gold">
              Vai trò
            </th>
            <th className="px-4 py-4 font-label text-[10px] font-semibold uppercase tracking-widest text-gold">
              Chi nhánh
            </th>
            <th className="px-4 py-4 font-label text-[10px] font-semibold uppercase tracking-widest text-gold">
              Truy cập cuối
            </th>
            <th className="px-4 py-4 text-center font-label text-[10px] font-semibold uppercase tracking-widest text-gold">
              Trạng thái
            </th>
            <th className="px-6 py-4 text-right font-label text-[10px] font-semibold uppercase tracking-widest text-gold lg:px-8">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-midnight/5">
          {isLoading ? (
            <tr>
              <td colSpan={7} className="px-6 py-12 text-center font-body text-sm text-midnight/45">
                Đang tải danh sách…
              </td>
            </tr>
          ) : null}
          {!isLoading && users.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-12 text-center font-body text-sm text-midnight/45">
                Không có tài khoản phù hợp.
              </td>
            </tr>
          ) : null}
          {!isLoading &&
            users.map((user) => (
            <tr key={user.id} className="group transition-colors hover:bg-midnight/[0.02]">
              <td className="px-6 py-5 font-mono text-xs font-semibold text-gold lg:px-8">{user.username}</td>
              <td className="px-4 py-5">
                <p className="font-body text-sm font-semibold text-midnight">{user.fullName}</p>
                <p className="font-label text-[10px] font-semibold text-midnight/40">{user.email}</p>
              </td>
              <td className="px-4 py-5">
                <div className="flex flex-wrap gap-1">
                  {user.roles.map((rId) => (
                    <span
                      key={rId}
                      className="rounded border border-info/20 bg-info-bg px-2 py-0.5 font-label text-[9px] font-semibold uppercase text-info"
                    >
                      {roles.find((r) => r.code === rId)?.name ?? rId}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-4 py-5">
                <div className="flex flex-wrap gap-1">
                  {user.branchIds.map((bId) => (
                    <span
                      key={bId}
                      className="rounded bg-midnight/5 px-2 py-0.5 font-label text-[9px] font-semibold uppercase text-midnight/60"
                    >
                      {branches.find((b) => b.id === bId)?.code ?? `#${bId}`}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-4 py-5 font-body text-xs text-midnight/50">
                {user.lastLogin ?? 'Chưa đăng nhập'}
              </td>
              <td className="px-4 py-5 text-center">
                <span
                  className={`inline-flex rounded-full border px-3 py-1 font-label text-[9px] font-semibold uppercase ${
                    user.status === 'Active'
                      ? 'border-success/20 bg-success-bg text-success'
                      : user.status === 'Locked'
                        ? 'border-error/20 bg-error-bg text-error'
                        : 'border-midnight/10 bg-midnight/5 text-midnight/50'
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-5 text-right lg:px-8">
                <div className="flex justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => onView(user)}
                    className="rounded-lg p-2 text-midnight/40 transition-colors hover:bg-info-bg hover:text-info"
                    title="Xem chi tiết"
                  >
                    {getIcon('Eye', 18)}
                  </button>
                  <button
                    type="button"
                    onClick={() => onEdit(user)}
                    className="rounded-lg p-2 text-midnight/40 transition-colors hover:bg-gold/10 hover:text-gold"
                    title="Cập nhật"
                  >
                    {getIcon('Edit', 18)}
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleStatus(user.id)}
                    className={`rounded-lg p-2 transition-colors ${
                      user.status === 'Active'
                        ? 'text-midnight/40 hover:bg-error-bg hover:text-error'
                        : 'text-success hover:bg-success-bg'
                    }`}
                    title={user.status === 'Active' ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
                  >
                    {getIcon('Power', 18)}
                  </button>
                </div>
              </td>
            </tr>
            ))}
        </tbody>
      </table>
    </div>
  </Card>
);

export default AdminUsersTab;
