import React from 'react';
import { Button } from '../../design-system/components/ui/Button';
import { cn } from '../../design-system/utils/cn';
import { formatVND } from '../../utils/formatVND';
import type { ClassStatusSnapshotMock, FinancialHealthMock } from '../../mock/dashboardHome';
import type { StatItem } from './types';
import { getIcon } from './dashboardConstants';

export interface DashboardSummaryProps {
  stats: StatItem[];
  financialHealth: FinancialHealthMock;
  classStatus: ClassStatusSnapshotMock;
  onManageSchedule: () => void;
}

export const DashboardSummary: React.FC<DashboardSummaryProps> = ({
  stats,
  financialHealth,
  classStatus,
  onManageSchedule,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-midnight/10 bg-surface p-5 shadow-sm"
          >
            <p className="mb-1 font-body text-sm font-medium text-midnight/50">{stat.label}</p>
            <div className="flex items-end justify-between gap-3">
              <h4 className="font-headline text-2xl font-semibold text-midnight">{stat.value}</h4>
              <span
                className={cn(
                  'shrink-0 rounded-full px-2 py-1 font-label text-xs font-semibold',
                  stat.isPositive ? 'bg-success-bg text-success' : 'bg-error-bg text-error',
                )}
              >
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="group relative overflow-hidden rounded-xl bg-midnight p-8 text-white shadow-lg lg:col-span-2">
          <div className="absolute right-0 top-0 p-8 opacity-10 transition-transform duration-700 group-hover:scale-110">
            {getIcon('TrendingUp', 120)}
          </div>
          <div className="relative z-10">
            <h3 className="mb-6 font-label text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
              Chỉ số tài chính thực tế (Tháng 03)
            </h3>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase text-white/40">Doanh thu ghi nhận (Earned)</p>
                <h2 className="font-headline text-4xl font-semibold text-white">
                  {formatVND(financialHealth.earnedRevenueMonth)}
                </h2>
                <p className="flex items-center gap-1 text-[10px] font-semibold text-success">
                  {getIcon('CheckCircle2', 12)} Giá trị giảng dạy đã hoàn thành
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase text-white/40">Dòng tiền thu (Cash In)</p>
                <h2 className="font-headline text-4xl font-semibold text-gold">
                  {formatVND(financialHealth.cashInMonth)}
                </h2>
                <p className="text-[10px] font-semibold text-gold/60">
                  Bao gồm học phí đóng trước cho các kỳ sau
                </p>
              </div>
            </div>
            <div className="mt-10 flex flex-wrap gap-8 border-t border-white/10 pt-8">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-white/5 p-2 text-gold">{getIcon('History', 20)}</div>
                <div>
                  <p className="text-[9px] font-semibold uppercase text-white/40">Quỹ học phí chưa dạy</p>
                  <p className="text-sm font-semibold">{formatVND(financialHealth.deferredTuition)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-white/5 p-2 text-success">{getIcon('PieChart', 20)}</div>
                <div>
                  <p className="text-[9px] font-semibold uppercase text-white/40">Biên lợi nhuận thực</p>
                  <p className="text-sm font-semibold">{financialHealth.profitMargin}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-xl border border-midnight/10 bg-surface p-8 shadow-sm">
          <div>
            <h3 className="mb-6 font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-midnight">
              Trạng thái lớp học
            </h3>
            <div className="space-y-4">
              <div className="flex items-end justify-between border-b border-midnight/10 pb-3">
                <span className="text-sm font-semibold text-midnight/50">Đang hoạt động</span>
                <span className="text-xl font-semibold text-midnight">{classStatus.activeCount}</span>
              </div>
              <div className="flex items-end justify-between border-b border-midnight/10 pb-3">
                <span className="text-sm font-semibold text-midnight/50">Dự kiến mở</span>
                <span className="text-xl font-semibold text-gold">{classStatus.plannedCount}</span>
              </div>
              <div className="flex items-end justify-between border-b border-midnight/10 pb-3">
                <span className="text-sm font-semibold text-midnight/50">Tỷ lệ chuyên cần</span>
                <span className="text-xl font-semibold text-info">
                  {classStatus.attendanceRatePercent}%
                </span>
              </div>
            </div>
          </div>
          <Button variant="secondary" className="mt-6 w-full text-[10px]" onClick={onManageSchedule} type="button">
            Quản lý lịch học
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
