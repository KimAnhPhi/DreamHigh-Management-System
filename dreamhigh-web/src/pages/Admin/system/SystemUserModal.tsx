import React, { useId, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../../design-system/components/ui/Button';
import { Card } from '../../../design-system/components/ui/Card';
import { Input, Select } from '../../../design-system/components/ui/Input';
import type { Branch, SystemRole, SystemUser, UserStatus } from '../../../types/adminSystem';
import { getIcon } from './adminSystemIcons';

export interface SystemUserModalProps {
  isOpen: boolean;
  user: SystemUser | null;
  isReadOnly?: boolean;
  onClose: () => void;
  onSave: (data: SystemUser, password?: string) => void;
  roles: SystemRole[];
  branches: Branch[];
}

function defaultSystemUser(): SystemUser {
  return {
    id: `u-${Date.now()}`,
    username: '',
    fullName: '',
    email: '',
    phone: '',
    roles: [],
    branchIds: [],
    status: 'Active',
  };
}

const SystemUserModal: React.FC<SystemUserModalProps> = (props) => {
  if (!props.isOpen) return null;
  return <SystemUserModalOpen key={props.user?.id ?? `new-${props.isReadOnly}`} {...props} />;
};

const SystemUserModalOpen: React.FC<SystemUserModalProps> = ({
  user,
  isReadOnly = false,
  onClose,
  onSave,
  roles,
  branches,
}) => {
  const titleId = useId();
  const [formData, setFormData] = useState<SystemUser>(() =>
    user
      ? {
          ...user,
          phone: user.phone ?? '',
          roles: [...user.roles],
          branchIds: [...user.branchIds],
        }
      : defaultSystemUser(),
  );
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const toggleId = (list: string[], id: string): string[] =>
    list.includes(id) ? list.filter((x) => x !== id) : [...list, id];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isReadOnly) return;
    setFormError(null);
    if (!formData.username.trim() || !formData.fullName.trim()) return;
    const emailTrim = formData.email.trim();
    if (!user) {
      if (!emailTrim) {
        setFormError('Email là bắt buộc khi tạo tài khoản.');
        return;
      }
      if (password.length < 6) {
        setFormError('Mật khẩu phải từ 6 ký tự trở lên.');
        return;
      }
      if (password !== passwordConfirm) {
        setFormError('Mật khẩu xác nhận không khớp.');
        return;
      }
    }
    onSave(
      {
        ...formData,
        username: formData.username.trim(),
        fullName: formData.fullName.trim(),
        email: emailTrim,
        phone: formData.phone?.trim() || undefined,
        id: user?.id ?? formData.id,
        lastLogin: user?.lastLogin,
      },
      user ? undefined : password,
    );
  };

  const ro = (cls: string) => (isReadOnly ? `${cls} bg-midnight/[0.04] text-midnight/55` : cls);

  return (
    <div
      className="custom-scrollbar fixed inset-0 z-[100] flex items-center justify-center bg-midnight/55 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <Card className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden p-0 shadow-xl animate-fade-in">
        <div className="flex items-center justify-between border-b border-midnight/10 bg-midnight px-8 py-6">
          <div>
            <h2 id={titleId} className="font-label text-xl font-semibold uppercase tracking-tight text-white">
              {isReadOnly ? 'Chi tiết tài khoản' : user ? 'Cập nhật tài khoản' : 'Tạo tài khoản nhân viên'}
            </h2>
            <p className="mt-1 font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
              Identity &amp; Access Management
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white/5 p-2 text-white/50 transition-colors hover:text-white"
            aria-label="Đóng"
          >
            <X size={24} strokeWidth={2} aria-hidden />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="custom-scrollbar flex flex-1 flex-col overflow-hidden">
          <div className="space-y-8 overflow-y-auto p-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-label text-[10px] font-semibold uppercase tracking-widest text-midnight/45">
                  Username (định danh)
                </label>
                <Input
                  required
                  disabled={!!user || isReadOnly}
                  className={ro(!!user || isReadOnly ? 'font-mono font-semibold' : '')}
                  placeholder="VD: hung.ql"
                  value={formData.username}
                  onChange={(e) => setFormData((p) => ({ ...p, username: e.target.value }))}
                />
              </div>
              <div>
                <label className="mb-2 block font-label text-[10px] font-semibold uppercase tracking-widest text-midnight/45">
                  Trạng thái tài khoản
                </label>
                <Select
                  disabled={isReadOnly}
                  className={ro('')}
                  value={formData.status}
                  onChange={(e) => setFormData((p) => ({ ...p, status: e.target.value as UserStatus }))}
                >
                  <option value="Active">Đang hoạt động (Active)</option>
                  <option value="Suspended">Ngừng hoạt động (Inactive)</option>
                  <option value="Locked">Đã khoá (Locked)</option>
                </Select>
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block font-label text-[10px] font-semibold uppercase tracking-widest text-midnight/45">
                  Họ và tên nhân viên <span className="text-error">*</span>
                </label>
                <Input
                  required
                  disabled={isReadOnly}
                  placeholder="Nhập đầy đủ họ tên…"
                  value={formData.fullName}
                  onChange={(e) => setFormData((p) => ({ ...p, fullName: e.target.value }))}
                />
              </div>
              <div>
                <label className="mb-2 block font-label text-[10px] font-semibold uppercase tracking-widest text-midnight/45">
                  Email công việc {!user ? <span className="text-error">*</span> : null}
                </label>
                <Input
                  type="email"
                  required={!user}
                  disabled={isReadOnly}
                  placeholder="email@dreamhigh.edu.vn"
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                />
              </div>
              <div>
                <label className="mb-2 block font-label text-[10px] font-semibold uppercase tracking-widest text-midnight/45">
                  Số điện thoại
                </label>
                <Input
                  type="tel"
                  disabled={isReadOnly}
                  className="font-mono text-sm"
                  placeholder="09xx xxx xxx"
                  value={formData.phone ?? ''}
                  onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                />
              </div>
            </div>

            {!user && !isReadOnly ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block font-label text-[10px] font-semibold uppercase tracking-widest text-midnight/45">
                    Mật khẩu <span className="text-error">*</span>
                  </label>
                  <Input
                    type="password"
                    autoComplete="new-password"
                    placeholder="Tối thiểu 6 ký tự"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-2 block font-label text-[10px] font-semibold uppercase tracking-widest text-midnight/45">
                    Xác nhận mật khẩu <span className="text-error">*</span>
                  </label>
                  <Input
                    type="password"
                    autoComplete="new-password"
                    placeholder="Nhập lại mật khẩu"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                </div>
              </div>
            ) : null}

            {formError ? (
              <p className="rounded-lg border border-error/25 bg-error-bg px-4 py-2 font-body text-xs text-error">{formError}</p>
            ) : null}

            <div>
              <span className="mb-4 flex items-center gap-2 font-label text-[10px] font-semibold uppercase tracking-widest text-midnight/45">
                {getIcon('Lock', 14)}
                Gán vai trò hệ thống
              </span>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {roles.map((role) => {
                  const on = formData.roles.includes(role.code);
                  return (
                    <button
                      key={role.code}
                      type="button"
                      disabled={isReadOnly}
                      onClick={() =>
                        !isReadOnly &&
                        setFormData((p) => ({ ...p, roles: toggleId(p.roles, role.code) }))
                      }
                      className={`flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all ${
                        on ? 'border-gold bg-gold/10' : 'border-midnight/10 bg-midnight/[0.02]'
                      } ${isReadOnly ? 'cursor-default' : 'cursor-pointer hover:border-gold/40'}`}
                    >
                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-all ${
                          on ? 'border-gold bg-gold text-midnight' : 'border-midnight/20 bg-surface'
                        }`}
                      >
                        {on ? getIcon('Check', 12) : null}
                      </div>
                      <div className="min-w-0">
                        <p className={`font-body text-xs font-semibold ${on ? 'text-gold' : 'text-midnight'}`}>{role.name}</p>
                        <p className="font-label text-[9px] font-semibold uppercase text-midnight/45">{role.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <span className="mb-4 flex items-center gap-2 font-label text-[10px] font-semibold uppercase tracking-widest text-midnight/45">
                {getIcon('Globe', 14)}
                Phạm vi chi nhánh
              </span>
              <div className="flex flex-wrap gap-3">
                {branches.map((branch) => {
                  const bid = String(branch.id);
                  const on = formData.branchIds.includes(bid);
                  return (
                    <button
                      key={bid}
                      type="button"
                      disabled={isReadOnly}
                      onClick={() =>
                        !isReadOnly &&
                        setFormData((p) => ({ ...p, branchIds: toggleId(p.branchIds, bid) }))
                      }
                      className={`rounded-xl border px-4 py-2.5 font-label text-[10px] font-semibold uppercase tracking-wider transition-all ${
                        on ? 'border-midnight bg-midnight text-gold shadow-lg' : 'border-midnight/15 bg-surface text-midnight/45 hover:border-gold/35'
                      } ${isReadOnly ? 'cursor-default' : ''}`}
                    >
                      {branch.code}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex gap-4 border-t border-midnight/10 bg-midnight/5 p-8">
            <Button
              type="button"
              variant={isReadOnly ? 'dark' : 'ghost'}
              className="flex-1 py-4"
              onClick={onClose}
            >
              {isReadOnly ? 'Đóng chi tiết' : 'Huỷ'}
            </Button>
            {!isReadOnly ? (
              <Button type="submit" className="flex-1 py-4 shadow-lg">
                {user ? 'Lưu cập nhật' : 'Tạo tài khoản'}
              </Button>
            ) : null}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SystemUserModal;
