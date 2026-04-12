import React from 'react';
import { Bell, LayoutDashboard, Search } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { useAuthStore } from '../../../stores/useAuthStore';

function initialsFromFullName(fullName: string | undefined): string {
  if (!fullName?.trim()) return 'U';
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ''}${parts[parts.length - 1][0] ?? ''}`.toUpperCase();
}

function roleLabel(code: string | undefined): string {
  const map: Record<string, string> = {
    ADMIN: 'Quản trị viên',
    MANAGER: 'Quản lý',
    STAFF: 'Nhân viên',
    TEACHER: 'Giáo viên',
    STUDENT: 'Học viên',
  };
  if (!code) return 'Thành viên';
  return map[code] ?? code;
}

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const location = useLocation();
  const onProfile = location.pathname.startsWith('/profile');

  const displayName = user?.fullName?.trim() || 'Người dùng';
  const primaryRole = user?.roles?.[0];
  const subtitle = roleLabel(primaryRole);

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-30 flex h-16 items-center justify-between border-b border-midnight/10 bg-surface px-6 backdrop-blur-sm sm:px-8 md:left-64',
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gold text-white transition-colors hover:brightness-110 md:hidden"
          aria-label="Về Dashboard"
        >
          <LayoutDashboard size={18} strokeWidth={2} aria-hidden />
        </button>

        <div className="relative w-full max-w-md">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-midnight/40">
            <Search size={18} strokeWidth={2} aria-hidden />
          </span>
          <input
            type="search"
            placeholder="Tìm kiếm học viên, lớp học..."
            className={cn(
              'block w-full rounded-lg border border-midnight/10 bg-bg py-2 pl-10 pr-3 font-body text-sm leading-5 text-midnight',
              'placeholder:text-midnight/40',
              'focus:border-gold focus:bg-surface focus:outline-none focus:ring-1 focus:ring-gold',
            )}
            autoComplete="off"
          />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <button
          type="button"
          className="relative rounded-md p-2 text-midnight/40 transition-colors hover:text-gold"
          aria-label="Thông báo"
        >
          <Bell size={22} strokeWidth={2} aria-hidden />
          <span className="absolute right-2 top-2 block h-2 w-2 rounded-full bg-error ring-2 ring-surface" />
        </button>

        <div className="hidden h-8 w-px bg-midnight/10 sm:block" aria-hidden />

        <Link
          to="/profile"
          title="Hồ sơ cá nhân"
          className={cn(
            'group flex items-center gap-3 rounded-lg border border-transparent px-1 py-1 transition-all hover:border-midnight/10 hover:bg-midnight/5',
            onProfile && 'border-midnight/10 bg-midnight/5',
          )}
        >
          <div className="hidden text-right sm:block">
            <p className="font-body text-sm font-semibold text-midnight transition-colors group-hover:text-gold">
              {displayName}
            </p>
            <p className="font-label text-xs text-midnight/50">{subtitle}</p>
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-surface bg-gold text-sm font-bold text-white shadow-sm">
            {initialsFromFullName(user?.fullName)}
          </div>
        </Link>
      </div>
    </header>
  );
};
