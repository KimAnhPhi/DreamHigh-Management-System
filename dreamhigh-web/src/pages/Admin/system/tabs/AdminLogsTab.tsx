import React from 'react';
import { Card } from '../../../../design-system/components/ui/Card';
import type { ActivityLog, AuditAction } from '../../../../types/adminSystem';
import { getIcon } from '../adminSystemIcons';

interface AdminLogsTabProps {
  logs: ActivityLog[];
}

function actionBadgeClass(action: AuditAction): string {
  if (action === 'Create') return 'border-success/20 bg-success-bg text-success';
  if (action === 'Approve') return 'border-info/20 bg-info-bg text-info';
  return 'border-midnight/10 bg-midnight/5 text-midnight/50';
}

const AdminLogsTab: React.FC<AdminLogsTabProps> = ({ logs }) => (
  <Card className="flex flex-col overflow-hidden p-0 shadow-md animate-fade-in">
    <div className="flex flex-col justify-between gap-4 border-b border-white/10 bg-midnight px-6 py-6 text-white md:flex-row md:items-center lg:px-8">
      <div>
        <h3 className="font-label text-lg font-semibold uppercase tracking-tight">Hoạt động hệ thống</h3>
        <p className="mt-1 font-body text-xs text-white/50">Truy vết thao tác người dùng (mock)</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/10 px-4 py-2 font-label text-[10px] font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white/20"
        >
          {getIcon('Filter', 14)} Lọc log
        </button>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/10 px-4 py-2 font-label text-[10px] font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white/20"
        >
          {getIcon('Download', 14)} Export
        </button>
      </div>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-midnight/10 bg-midnight/5">
            <th className="w-48 px-6 py-4 text-left font-label text-[10px] font-semibold uppercase tracking-widest text-gold lg:px-8">
              Thời gian
            </th>
            <th className="w-48 px-4 py-4 font-label text-[10px] font-semibold uppercase tracking-widest text-gold">
              Người thực hiện
            </th>
            <th className="w-32 px-4 py-4 text-center font-label text-[10px] font-semibold uppercase tracking-widest text-gold">
              Hành động
            </th>
            <th className="px-4 py-4 font-label text-[10px] font-semibold uppercase tracking-widest text-gold">
              Nội dung
            </th>
            <th className="w-48 px-6 py-4 text-right font-label text-[10px] font-semibold uppercase tracking-widest text-gold lg:px-8">
              IP / Thiết bị
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-midnight/5 font-body text-xs">
          {logs.map((log) => (
            <tr key={log.id} className="transition-colors hover:bg-midnight/[0.02]">
              <td className="px-6 py-4 font-mono text-midnight/50 lg:px-8">
                {new Date(log.timestamp).toLocaleString('vi-VN')}
              </td>
              <td className="px-4 py-4">
                <span className="font-semibold text-midnight">{log.username}</span>
                <span className="block font-label text-[10px] font-semibold uppercase text-midnight/40">
                  UID: {log.userId}
                </span>
              </td>
              <td className="px-4 py-4 text-center">
                <span
                  className={`inline-flex rounded border px-2 py-0.5 font-label text-[9px] font-semibold uppercase ${actionBadgeClass(log.action)}`}
                >
                  {log.action}
                </span>
              </td>
              <td className="px-4 py-4">
                <p className="font-semibold text-midnight/80">{log.description}</p>
                <p className="mt-0.5 font-label text-[10px] font-semibold uppercase text-gold">
                  Module: {log.moduleId}
                </p>
              </td>
              <td className="px-6 py-4 text-right lg:px-8">
                <p className="font-mono text-midnight/40">{log.ipAddress}</p>
                <p className="line-clamp-1 text-[10px] text-midnight/40">{log.device}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>
);

export default AdminLogsTab;
