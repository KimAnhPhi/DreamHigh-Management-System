/** Mock Dashboard Home — giữ đúng nguyên tắc Accrual / số liệu mẫu từ prototype BA. */

import type { StatItem } from '../pages/Dashboard/types';

export interface FinancialHealthMock {
  cashInMonth: number;
  earnedRevenueMonth: number;
  deferredTuition: number;
  profitMargin: number;
}

export interface TodayClassSlot {
  id: number;
  name: string;
  time: string;
  room: string;
  teacher: string;
}

export interface ClassStatusSnapshotMock {
  activeCount: number;
  plannedCount: number;
  attendanceRatePercent: number;
}

export interface UrgentTaskMock {
  id: string;
  title: string;
  subtitle: string;
}

export const mockFinancialHealth: FinancialHealthMock = {
  cashInMonth: 540_000_000,
  earnedRevenueMonth: 385_000_000,
  deferredTuition: 1_250_000_000,
  profitMargin: 22.5,
};

export const mockTodayClasses: TodayClassSlot[] = [
  {
    id: 1,
    name: 'Starter 1 - Morning',
    time: '08:00 - 09:30',
    room: 'Phòng 101',
    teacher: 'Cô Lan Anh',
  },
  {
    id: 2,
    name: 'IELTS Intensive',
    time: '18:00 - 20:00',
    room: 'Phòng 202',
    teacher: 'Mr. John',
  },
  {
    id: 3,
    name: 'Communication A1',
    time: '19:30 - 21:00',
    room: 'Phòng 105',
    teacher: 'Thầy Nam',
  },
];

export const mockClassStatusSnapshot: ClassStatusSnapshotMock = {
  activeCount: 42,
  plannedCount: 8,
  attendanceRatePercent: 94.2,
};

export const mockUrgentTasks: UrgentTaskMock[] = [
  { id: 't1', title: 'Phê duyệt lương tháng 03', subtitle: 'Hết hạn trong 2 ngày' },
  { id: 't2', title: 'Gửi báo cáo Unit cho Phụ huynh', subtitle: '15 học viên lớp ST-01' },
];

/** KPI hàng trên DashboardSummary — đồng bộ một phần với snapshot lớp / tài chính mock. */
export function buildDashboardStatItems(
  classStatus: ClassStatusSnapshotMock,
  financial: FinancialHealthMock,
  options?: { totalStudentsFormatted?: string },
): StatItem[] {
  const totalStudents =
    options?.totalStudentsFormatted ??
    new Intl.NumberFormat('vi-VN').format(1284);
  const revenueM = Math.round(financial.cashInMonth / 1_000_000);
  return [
    { label: 'Tổng học viên', value: totalStudents, change: '+12%', isPositive: true },
    { label: 'Lớp đang học', value: String(classStatus.activeCount), change: '+3', isPositive: true },
    { label: 'Doanh thu tháng', value: `${revenueM}M`, change: '+8%', isPositive: true },
    {
      label: 'Tỉ lệ chuyên cần',
      value: `${classStatus.attendanceRatePercent}%`,
      change: '-0.5%',
      isPositive: false,
    },
  ];
}
