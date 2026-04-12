import React, { useMemo, useState } from 'react';
import { Banknote, ClipboardList, Receipt, Star, UserSquare2 } from 'lucide-react';
import { AppLayout } from '../../design-system/components/layout/AppLayout';
import { PageHeader } from '../../design-system/components/layout/PageHeader';
import { Button } from '../../design-system/components/ui/Button';
import { Card } from '../../design-system/components/ui/Card';
import { Input, Select } from '../../design-system/components/ui/Input';
import { MOCK_TEACHERS, MOCK_TEACHING_LOGS } from '../../mock/teacherManagement';
import type { AdminMessage } from '../../types/adminSystem';
import type { Teacher } from '../../types/teacherHr';
import { formatTeacherTypeLabel, getTeacherStatusClass, getTeacherTypeChipClass } from '../../utils/teacherHrUi';
import NotificationPortal from '../Admin/system/NotificationPortal';
import { getIcon } from '../Admin/system/adminSystemIcons';
import TeacherDetail from './TeacherDetail';
import TeacherModal from './TeacherModal';

type SubView = 'list' | 'payroll_summary';

const TeacherManagement: React.FC = () => {
  const [activeSubView, setActiveSubView] = useState<SubView>('list');
  const [teachers, setTeachers] = useState<Teacher[]>(MOCK_TEACHERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('Tất cả');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [message, setMessage] = useState<AdminMessage | null>(null);

  const currentPeriod = '03/2026';
  const periodPrefix = '2026-03';

  const viewingTeacher = useMemo(
    () => (viewingId ? teachers.find((t) => t.id === viewingId) ?? null : null),
    [teachers, viewingId],
  );

  const filteredData = useMemo(() => {
    return teachers.filter((t) => {
      const matchesSearch =
        t.code.toLowerCase().includes(searchTerm.toLowerCase()) || t.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType =
        filterType === 'Tất cả' ||
        (filterType === 'VN' && t.type === 'Vietnamese') ||
        (filterType === 'NN' && t.type === 'Foreign') ||
        (filterType === 'TA' && t.type === 'Assistant');
      return matchesSearch && matchesType;
    });
  }, [teachers, searchTerm, filterType]);

  const teachersPayrollSummary = useMemo(() => {
    return teachers
      .map((teacher) => {
        const teacherLogs = MOCK_TEACHING_LOGS.filter(
          (log) => log.teacherId === teacher.id && log.date.startsWith(periodPrefix),
        );
        const totalHours = teacherLogs.reduce((sum, log) => sum + log.hours, 0);
        const totalBaseAmount = teacherLogs.reduce((sum, log) => sum + log.totalAmount, 0);
        const bonus = teacher.performanceScore >= 4.5 ? 500_000 : 0;
        return {
          ...teacher,
          totalHours,
          totalBaseAmount,
          bonus,
          finalEstimated: totalBaseAmount + bonus,
          logCount: teacherLogs.length,
        };
      })
      .filter((item) => item.totalHours > 0);
  }, [teachers, periodPrefix]);

  const globalStats = useMemo(
    () => ({
      total: teachers.length,
      vn: teachers.filter((t) => t.type === 'Vietnamese').length,
      foreign: teachers.filter((t) => t.type === 'Foreign').length,
      active: teachers.filter((t) => t.status === 'Đang làm việc').length,
      totalPayroll: teachersPayrollSummary.reduce((sum, item) => sum + item.finalEstimated, 0),
      totalHours: teachersPayrollSummary.reduce((sum, item) => sum + item.totalHours, 0),
    }),
    [teachers, teachersPayrollSummary],
  );

  const showNotification = (code: string, text: string, type: AdminMessage['type']) => setMessage({ code, text, type });

  const handleAddNew = () => {
    setEditingTeacher(null);
    setIsModalOpen(true);
  };

  const handleSave = (data: Teacher) => {
    if (editingTeacher) {
      setTeachers((prev) => prev.map((t) => (t.id === editingTeacher.id ? data : t)));
      showNotification('HR-200', 'Cập nhật hồ sơ giáo viên thành công.', 'success');
    } else {
      setTeachers((prev) => [data, ...prev]);
      showNotification('HR-201', 'Thêm giáo viên thành công.', 'success');
    }
    setIsModalOpen(false);
    setEditingTeacher(null);
  };

  if (viewingTeacher) {
    return (
      <AppLayout>
        <NotificationPortal message={message} onClose={() => setMessage(null)} />
        <PageHeader
          title="Hồ sơ giáo viên"
          breadcrumb={[
            { label: 'Nhân sự', href: '#' },
            { label: 'Giáo viên', href: '/hr/teachers' },
            { label: viewingTeacher.code },
          ]}
        />
        <div className="-mt-8">
          <TeacherDetail teacher={viewingTeacher} onBack={() => setViewingId(null)} />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <NotificationPortal message={message} onClose={() => setMessage(null)} />
      <PageHeader
        title="Quản lý giáo viên &amp; thù lao"
        breadcrumb={[
          { label: 'Nhân sự', href: '#' },
          { label: 'Giáo viên' },
        ]}
      />

      <div className="flex animate-fade-in flex-col gap-6 pb-10">
        <Card className="p-6 shadow-md">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <h1 className="flex items-center gap-3 font-headline text-2xl italic text-midnight">
                <span className="rounded-lg bg-gold/10 p-2 text-gold">
                  <UserSquare2 size={24} strokeWidth={2} aria-hidden />
                </span>
                Đội ngũ giảng dạy
              </h1>
              <p className="mt-1 font-body text-sm text-midnight/50">Hồ sơ, hiệu suất và bảng kê lương (mock)</p>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-midnight/5 p-1.5">
              <button
                type="button"
                onClick={() => setActiveSubView('list')}
                className={`flex items-center gap-2 rounded-xl px-5 py-2.5 font-label text-xs font-semibold uppercase tracking-widest transition-all ${
                  activeSubView === 'list' ? 'bg-surface text-gold shadow-sm' : 'text-midnight/45 hover:text-midnight/70'
                }`}
              >
                {getIcon('Users', 16)} Hồ sơ
              </button>
              <button
                type="button"
                onClick={() => setActiveSubView('payroll_summary')}
                className={`flex items-center gap-2 rounded-xl px-5 py-2.5 font-label text-xs font-semibold uppercase tracking-widest transition-all ${
                  activeSubView === 'payroll_summary' ? 'bg-surface text-gold shadow-sm' : 'text-midnight/45 hover:text-midnight/70'
                }`}
              >
                <Banknote size={16} strokeWidth={2} aria-hidden /> Bảng kê kỳ này
              </button>
            </div>
          </div>
        </Card>

        {activeSubView === 'list' ? (
          <>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
              <StatCard label="Tổng nhân sự" value={globalStats.total} icon="Users" tone="info" />
              <StatCard label="GV Việt Nam" value={globalStats.vn} icon="UserCheck" tone="midnight" />
              <StatCard label="GV nước ngoài" value={globalStats.foreign} icon="GraduationCap" tone="gold" />
              <StatCard label="Đang làm việc" value={globalStats.active} icon="CheckCircle2" tone="success" />
            </div>

            <Card className="flex flex-col overflow-hidden p-0 shadow-md">
              <div className="flex flex-col items-center justify-between gap-4 border-b border-midnight/10 p-6 md:flex-row">
                <div className="relative w-full md:max-w-md">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-midnight/40">{getIcon('Search', 18)}</span>
                  <Input
                    className="!pl-10"
                    placeholder="Mã GV, tên…"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex w-full flex-wrap gap-3 md:w-auto">
                  <Select className="min-w-[140px]" aria-label="Phân loại" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                    <option value="Tất cả">Tất cả loại</option>
                    <option value="VN">Giáo viên VN</option>
                    <option value="NN">Giáo viên NN</option>
                    <option value="TA">Trợ giảng</option>
                  </Select>
                  <Button type="button" className="gap-2 text-xs" onClick={handleAddNew}>
                    {getIcon('Plus', 16)} Thêm giáo viên
                  </Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-midnight/10 bg-midnight/5">
                      <th className="px-6 py-4 font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Mã</th>
                      <th className="px-6 py-4 font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Họ tên</th>
                      <th className="px-6 py-4 font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Loại</th>
                      <th className="px-6 py-4 text-center font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Score</th>
                      <th className="px-6 py-4 text-right font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Off / On</th>
                      <th className="px-6 py-4 font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Trạng thái</th>
                      <th className="px-6 py-4 pr-8 text-right font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-midnight/5">
                    {filteredData.map((t) => (
                      <tr key={t.id} className="group transition-colors hover:bg-midnight/[0.02]">
                        <td className="px-6 py-4">
                          <span className="rounded border border-gold/25 bg-gold/10 px-2 py-1 font-mono text-xs font-semibold text-gold">{t.code}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-midnight font-label text-[10px] font-semibold text-gold shadow-inner">
                              {(t.name.split(' ').pop() ?? t.name).charAt(0)}
                            </div>
                            <div>
                              <p className="font-body text-sm font-semibold text-midnight transition-colors group-hover:text-gold">{t.name}</p>
                              <p className="font-label text-[10px] font-semibold uppercase text-midnight/40">{t.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`rounded border px-2 py-1 font-label text-[9px] font-semibold uppercase ${getTeacherTypeChipClass(t.type)}`}>
                            {formatTeacherTypeLabel(t.type)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Star size={14} strokeWidth={2} className="text-gold" aria-hidden />
                            <span className="font-body text-xs font-semibold text-midnight">{t.performanceScore}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <p className="font-body text-xs font-semibold text-midnight">{t.rates.offlineRate.toLocaleString('vi-VN')}đ</p>
                          <p className="font-body text-[10px] text-midnight/45">{t.rates.onlineRate.toLocaleString('vi-VN')}đ</p>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-label text-[9px] font-semibold uppercase tracking-widest ${getTeacherStatusClass(t.status)}`}
                          >
                            <span className={`h-1.5 w-1.5 rounded-full ${t.status === 'Đang làm việc' ? 'bg-success' : 'bg-error'}`} />
                            {t.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 pr-8 text-right">
                          <div className="flex justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                            <button
                              type="button"
                              onClick={() => setViewingId(t.id)}
                              className="rounded-lg p-2 text-gold hover:bg-gold/10"
                              title="Chi tiết"
                            >
                              {getIcon('Eye', 18)}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingTeacher(t);
                                setIsModalOpen(true);
                              }}
                              className="rounded-lg p-2 text-midnight/40 hover:bg-gold/10 hover:text-gold"
                              title="Sửa"
                            >
                              {getIcon('Edit', 18)}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        ) : (
          <div className="animate-fade-in space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card className="relative overflow-hidden bg-midnight p-8 text-white shadow-xl">
                <div className="pointer-events-none absolute -right-4 -top-4 h-32 w-32 rounded-full bg-gold/15 blur-2xl" />
                <p className="mb-2 font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">Quỹ lương dự tính ({currentPeriod})</p>
                <h2 className="font-headline text-3xl font-semibold italic text-white">{globalStats.totalPayroll.toLocaleString('vi-VN')}đ</h2>
                <p className="mt-6 flex items-center gap-2 border-t border-white/10 pt-4 font-body text-xs text-white/50">
                  {getIcon('History', 14)} So với kỳ trước (mock)
                </p>
              </Card>
              <StatCard label="Tổng giờ dạy trong kỳ" value={`${globalStats.totalHours}h`} icon="Calendar" tone="midnight" />
              <StatCard label="GV có phát sinh thù lao" value={teachersPayrollSummary.length} icon="UserCheck" tone="gold" />
            </div>

            <Card className="overflow-hidden p-0 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-midnight/10 bg-midnight/[0.02] p-8">
                <div>
                  <h3 className="font-label text-lg font-semibold uppercase tracking-tight text-midnight">Thù lao dự tính theo nhật ký</h3>
                  <p className="font-body text-xs text-midnight/50">Kỳ {currentPeriod}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button type="button" variant="secondary" className="gap-2 text-xs uppercase" onClick={() => showNotification('HR-EXP', 'Export bảng kê — mock.', 'warning')}>
                    {getIcon('Download', 16)} Export
                  </Button>
                  <Button type="button" variant="dark" className="gap-2 text-xs uppercase shadow-lg" onClick={() => showNotification('HR-LOCK', 'Chốt sổ thanh toán — mock.', 'warning')}>
                    <ClipboardList size={16} strokeWidth={2} aria-hidden />
                    Chốt sổ
                  </Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-midnight/10 bg-midnight/5">
                      <th className="px-8 py-5 font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Giáo viên</th>
                      <th className="px-6 py-5 text-center font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Buổi</th>
                      <th className="px-6 py-5 text-center font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Giờ</th>
                      <th className="px-6 py-5 text-right font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Gốc</th>
                      <th className="px-6 py-5 text-right font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Thưởng KPI</th>
                      <th className="px-6 py-5 text-right font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Dự nhận</th>
                      <th className="px-8 py-5 text-right font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Chi tiết</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-midnight/5">
                    {teachersPayrollSummary.map((item) => (
                      <tr key={item.id} className="transition-colors hover:bg-midnight/[0.02]">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 font-label text-sm font-semibold text-gold shadow-sm">
                              {item.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-body text-sm font-semibold text-midnight">{item.name}</p>
                              <p className="font-label text-[10px] font-semibold uppercase tracking-widest text-midnight/40">{item.code}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6 text-center">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-midnight/5 font-body text-xs font-semibold text-midnight">
                            {item.logCount}
                          </span>
                        </td>
                        <td className="px-6 py-6 text-center font-body text-sm font-semibold text-midnight">{item.totalHours}h</td>
                        <td className="px-6 py-6 text-right font-body text-sm font-semibold text-midnight/65">{item.totalBaseAmount.toLocaleString('vi-VN')}đ</td>
                        <td className="px-6 py-6 text-right font-body text-xs font-semibold text-success">+{item.bonus.toLocaleString('vi-VN')}đ</td>
                        <td className="px-6 py-6 text-right font-body text-base font-semibold text-gold">{item.finalEstimated.toLocaleString('vi-VN')}đ</td>
                        <td className="px-8 py-6 text-right">
                          <Button type="button" variant="secondary" className="text-[10px] uppercase" onClick={() => setViewingId(item.id)}>
                            Log &amp; lương
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {teachersPayrollSummary.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-20 text-center opacity-40">
                          <div className="flex flex-col items-center gap-3">
                            <Receipt size={48} strokeWidth={1.25} aria-hidden />
                            <p className="font-label text-sm font-semibold uppercase text-midnight">Không có dữ liệu kỳ này</p>
                          </div>
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        <TeacherModal
          isOpen={isModalOpen}
          teacher={editingTeacher}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTeacher(null);
          }}
          onSave={handleSave}
        />
      </div>
    </AppLayout>
  );
};

const StatCard: React.FC<{
  label: string;
  value: number | string;
  icon: import('../Admin/system/adminSystemIcons').AdminSystemIconName;
  tone: 'info' | 'midnight' | 'gold' | 'success';
}> = ({ label, value, icon, tone }) => {
  const ring = {
    info: 'text-info bg-info-bg border-info/20',
    midnight: 'text-midnight bg-midnight/5 border-midnight/10',
    gold: 'text-gold bg-gold/10 border-gold/25',
    success: 'text-success bg-success-bg border-success/25',
  }[tone];
  return (
    <Card className="flex flex-col justify-between border border-midnight/5 p-6 shadow-sm transition-transform hover:scale-[1.01]">
      <div className={`w-fit rounded-xl border p-2.5 shadow-sm ${ring}`}>{getIcon(icon, 20)}</div>
      <div className="mt-4">
        <p className="mb-1 font-label text-[10px] font-semibold uppercase tracking-widest text-midnight/45">{label}</p>
        <p className="font-headline text-2xl italic text-midnight">{value}</p>
      </div>
    </Card>
  );
};

export default TeacherManagement;
