import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { useAuthStore } from '../../../stores/useAuthStore';
import {
  MODULES,
  filterModulesForUserRoles,
  getIcon,
  type DashboardIconKey,
} from '../../../pages/Dashboard/dashboardConstants';

interface SidebarProps {
  className?: string;
}

function isRouteActive(pathname: string, route: string): boolean {
  if (route === '/dashboard') {
    return pathname === '/dashboard';
  }
  return pathname === route || pathname.startsWith(`${route}/`);
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const modules = filterModulesForUserRoles(MODULES, user?.roles);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-white/10 bg-midnight shadow-xl md:flex',
        className,
      )}
    >
      <button
        type="button"
        onClick={() => navigate('/dashboard')}
        className="flex cursor-pointer flex-col items-center justify-center border-b border-white/10 p-6 transition-opacity hover:opacity-90"
      >
        <div className="mb-1 flex items-center gap-3">
          <div className="flex h-10 w-10 -rotate-12 items-center justify-center rounded-lg bg-gold shadow-lg transition-transform duration-300 hover:rotate-0">
            <span className="font-headline text-xl font-semibold text-white">D</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-label text-lg font-bold tracking-wider text-white">DREAM HIGH</span>
            <span className="font-label text-[10px] font-medium uppercase leading-none tracking-[0.2em] text-gold">
              English Center
            </span>
          </div>
        </div>
      </button>

      <nav className="mt-6 flex flex-1 flex-col space-y-1.5 overflow-y-auto px-4">
        <SidebarNavItem
          icon="LayoutDashboard"
          label="Tổng quan"
          active={pathname === '/dashboard'}
          onClick={() => navigate('/dashboard')}
        />

        <div className="px-4 py-4">
          <p className="font-label text-[10px] font-semibold uppercase tracking-widest text-white/45">
            Nghiệp vụ đào tạo
          </p>
        </div>

        {modules.map((module) => (
          <SidebarNavItem
            key={module.id}
            icon={module.iconName}
            label={module.title}
            active={isRouteActive(pathname, module.route)}
            onClick={() => navigate(module.route)}
          />
        ))}
      </nav>

      <div className="space-y-1 border-t border-white/10 p-4">
        <SidebarNavItem
          icon="Settings"
          label="Cấu hình hệ thống"
          active={false}
          disabled
        />
        <button
          type="button"
          onClick={handleLogout}
          className="group flex w-full cursor-pointer items-center gap-3 rounded-full px-4 py-3 text-left font-body text-sm font-medium text-white/70 transition-all duration-200 ease-out hover:bg-error/10 hover:text-error"
        >
          <span className="text-white/65 transition-colors duration-200 group-hover:text-error">
            {getIcon('LogOut', 20)}
          </span>
          Đăng xuất
        </button>
      </div>
    </aside>
  );
};

interface SidebarNavItemProps {
  icon: DashboardIconKey;
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  icon,
  label,
  active = false,
  disabled = false,
  onClick,
}) => (
  <button
    type="button"
    onClick={disabled ? undefined : onClick}
    disabled={disabled}
    className={cn(
      'group relative flex w-full cursor-pointer items-center gap-3 rounded-full px-4 py-3 text-left font-body text-sm font-medium transition-all duration-200 ease-out',
      active &&
        'bg-gold text-white shadow-md shadow-gold/30 ring-1 ring-white/10',
      !active &&
        !disabled &&
        'text-white/70 hover:bg-white/10 hover:text-white hover:shadow-sm',
      disabled && 'cursor-not-allowed text-white/35 opacity-90 hover:bg-transparent hover:shadow-none',
    )}
  >
    <span
      className={cn(
        'shrink-0 transition-colors duration-200',
        active && 'text-white',
        !active && !disabled && 'text-white/70 group-hover:text-white',
        disabled && 'text-white/30',
      )}
    >
      {getIcon(icon, 20)}
    </span>
    <span className="min-w-0 flex-1 truncate">{label}</span>
    {active && (
      <span
        className="absolute right-0 top-1/2 h-6 w-1.5 -translate-y-1/2 rounded-l-full bg-white/90"
        aria-hidden
      />
    )}
  </button>
);
