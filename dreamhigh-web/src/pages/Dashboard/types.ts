export type { DashboardModuleDef as ModuleItem } from './dashboardConstants';

/** KPI dòng tóm tắt Dashboard (số hiển thị dạng string đã format). */
export interface StatItem {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}
