import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../design-system/components/ui/Button';
import { useAuthStore } from '../../stores/useAuthStore';
import {
  buildDashboardStatItems,
  mockClassStatusSnapshot,
  mockFinancialHealth,
  mockTodayClasses,
  mockUrgentTasks,
} from '../../mock/dashboardHome';
import { MODULES, filterModulesForUserRoles, getIcon } from './dashboardConstants';
import { DashboardSummary } from './DashboardSummary';
import { ModuleCard } from './ModuleCard';

const DashboardHome: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const today = new Date().toLocaleDateString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const displayName = user?.fullName ?? 'Quản trị viên';
  const modules = filterModulesForUserRoles(MODULES, user?.roles);

  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex flex-col justify-between gap-4 rounded-xl border border-midnight/10 bg-surface p-8 shadow-sm md:flex-row md:items-center">
        <div>
          <h1 className="font-dashboard-greeting text-3xl font-black tracking-tight text-midnight">
            Xin chào, {displayName}
          </h1>
          <p className="mt-1 font-body font-medium italic text-midnight/50">
            {today} — Chúc bạn một ngày điều phối hiệu quả!
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-midnight/10 bg-bg px-5 py-2.5 font-label text-sm font-semibold text-midnight/60 transition-colors hover:bg-midnight/5"
          >
            {getIcon('Calendar', 18)} Lịch tuần
          </button>
          <Button
            variant="dark"
            className="px-6 py-2.5 text-sm shadow-lg shadow-midnight/20"
            type="button"
            onClick={() => navigate('/admin/audit-logs')}
          >
            Báo cáo P&amp;L
          </Button>
        </div>
      </div>

      <DashboardSummary
        stats={buildDashboardStatItems(mockClassStatusSnapshot, mockFinancialHealth)}
        financialHealth={mockFinancialHealth}
        classStatus={mockClassStatusSnapshot}
        onManageSchedule={() => navigate('/classes')}
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="flex items-center justify-between px-2">
            <h2 className="font-headline text-xl font-semibold uppercase tracking-tight text-midnight">
              Nghiệp vụ vận hành
            </h2>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 animate-pulse rounded-full bg-success" />
              <span className="font-label text-[10px] font-semibold uppercase tracking-widest text-midnight/40">
                Hệ thống trực tuyến
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {modules.map((module) => (
              <ModuleCard key={module.id} module={module} onClick={() => navigate(module.route)} />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-xl border border-midnight/10 bg-surface p-8 shadow-sm">
            <h3 className="mb-6 flex items-center justify-between font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-midnight">
              Lịch dạy hôm nay
              <span className="text-gold">{getIcon('Calendar', 16)}</span>
            </h3>
            <div className="space-y-6">
              {mockTodayClasses.map((cls) => (
                <div key={cls.id} className="group/item flex cursor-pointer gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-gold transition-transform group-hover/item:scale-150" />
                    <div className="my-1 h-full w-px flex-1 bg-midnight/10" />
                  </div>
                  <div className="w-full border-b border-midnight/5 pb-4 transition-colors group-hover/item:border-gold/30">
                    <p className="mb-1 font-label text-[10px] font-semibold uppercase tracking-tighter text-gold">
                      {cls.time}
                    </p>
                    <p className="line-clamp-1 font-body text-sm font-semibold text-midnight transition-colors group-hover/item:text-gold">
                      {cls.name}
                    </p>
                    <div className="mt-2 flex items-center gap-3 font-label text-[9px] font-semibold uppercase tracking-tighter text-midnight/40">
                      <span className="inline-flex items-center gap-1">
                        {getIcon('MapPin', 10)} {cls.room}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        {getIcon('UserCheck', 10)} {cls.teacher}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mt-8 w-full rounded-xl border border-midnight/10 py-3 font-label text-[10px] font-semibold uppercase text-midnight/40 transition-all hover:border-gold hover:text-gold"
              onClick={() => navigate('/classes')}
            >
              Xem toàn bộ lịch học
            </button>
          </div>

          <div className="rounded-xl border border-gold/20 bg-gold/5 p-8">
            <h4 className="mb-4 font-label text-[10px] font-semibold uppercase tracking-widest text-gold">
              Nhắc việc quan trọng
            </h4>
            <div className="space-y-3">
              {mockUrgentTasks.map((task) => (
                <TaskItem key={task.id} title={task.title} time={task.subtitle} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TaskItemProps {
  title: string;
  time: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ title, time }) => (
  <div className="flex items-start gap-3 rounded-xl border border-gold/10 bg-surface p-3 shadow-sm">
    <div className="mt-1 text-gold">{getIcon('CheckSquare', 16)}</div>
    <div>
      <p className="text-xs font-semibold text-midnight">{title}</p>
      <p className="mt-0.5 font-label text-[9px] font-semibold uppercase text-midnight/40">{time}</p>
    </div>
  </div>
);

export default DashboardHome;
