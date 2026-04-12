import React, { useMemo, useState, type ReactNode } from 'react';
import {
  Activity,
  Banknote,
  Clock,
  Download,
  FileText,
  List,
  Receipt,
  Star,
  TrendingUp,
} from 'lucide-react';
import { Button } from '../../design-system/components/ui/Button';
import { Card } from '../../design-system/components/ui/Card';
import { Select } from '../../design-system/components/ui/Input';
import type { AdminMessage } from '../../types/adminSystem';
import type { CompensationAdjustmentData } from '../../types/teacherCompensation';
import type { Teacher } from '../../types/teacherHr';
import { formatTeacherTypeLabel, getPayrollSettlementClass } from '../../utils/teacherHrUi';
import AdjustmentModal from '../Finance/AdjustmentModal';
import PayrollSlipModal from '../Finance/PayrollSlipModal';
import NotificationPortal from '../Admin/system/NotificationPortal';
import { getIcon } from '../Admin/system/adminSystemIcons';
import { MOCK_PAYROLLS, MOCK_TEACHING_LOGS } from '../../mock/teacherManagement';

function monthPrefixFromPeriod(period: string): string {
  const [mm, yy] = period.split('/');
  if (!mm || !yy) return '2026-03';
  return `${yy}-${mm.padStart(2, '0')}`;
}

export interface PayrollItemGroup {
  courseName: string;
  totalHours: number;
  offlineHours: number;
  onlineHours: number;
  offlineRate: number;
  onlineRate: number;
  amount: number;
}

export interface TeacherDetailProps {
  teacher: Teacher;
  onBack: () => void;
}

const TeacherDetail: React.FC<TeacherDetailProps> = ({ teacher, onBack }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'classes' | 'payroll'>('info');
  const [selectedMonth, setSelectedMonth] = useState('03/2026');
  const [message, setMessage] = useState<AdminMessage | null>(null);
  const [adjustments, setAdjustments] = useState<CompensationAdjustmentData>({
    bonus: 500_000,
    bonusReason: 'Thưởng KPI chuyên cần & feedback học viên xuất sắc',
    penalty: 50_000,
    penaltyReason: 'Vi phạm quy định nộp log muộn (1 buổi)',
  });
  const [isAdjustmentModalOpen, setIsAdjustmentModalOpen] = useState(false);
  const [isPayrollSlipOpen, setIsPayrollSlipOpen] = useState(false);

  const logs = useMemo(() => MOCK_TEACHING_LOGS.filter((l) => l.teacherId === teacher.id), [teacher.id]);
  const payrolls = useMemo(() => MOCK_PAYROLLS.filter((p) => p.teacherId === teacher.id), [teacher.id]);

  const allTimeTotalHours = useMemo(() => logs.reduce((sum, log) => sum + log.hours, 0), [logs]);

  const payrollBreakdown = useMemo(() => {
    const prefix = monthPrefixFromPeriod(selectedMonth);
    const monthLogs = logs.filter((l) => l.date.startsWith(prefix));

    const groups = monthLogs.reduce<Record<string, PayrollItemGroup>>((acc, log) => {
      if (!acc[log.courseId]) {
        acc[log.courseId] = {
          courseName: log.courseName,
          totalHours: 0,
          offlineHours: 0,
          onlineHours: 0,
          offlineRate: teacher.rates.offlineRate,
          onlineRate: teacher.rates.onlineRate,
          amount: 0,
        };
      }
      acc[log.courseId].totalHours += log.hours;
      if (log.type === 'Offline') acc[log.courseId].offlineHours += log.hours;
      else acc[log.courseId].onlineHours += log.hours;
      acc[log.courseId].amount += log.totalAmount;
      return acc;
    }, {});

    const items = Object.values(groups);
    const totalBaseAmount = items.reduce((sum, item) => sum + item.amount, 0);
    const totalHours = items.reduce((sum, item) => sum + item.totalHours, 0);

    return {
      items,
      totalBaseAmount,
      totalHours,
      finalAmount: totalBaseAmount + adjustments.bonus - adjustments.penalty,
    };
  }, [logs, teacher.rates, adjustments, selectedMonth]);

  const handleSaveAdjustments = (data: CompensationAdjustmentData) => {
    setAdjustments(data);
    setIsAdjustmentModalOpen(false);
    setMessage({
      code: 'FIN-ADJ-200',
      text: 'Đã cập nhật các khoản thưởng/phạt thù lao.',
      type: 'success',
    });
  };

  const handleSendPayrollSlip = () => {
    setMessage({
      code: 'FIN-SLIP-SENT',
      text: `Đã gửi phiếu lương kỳ ${selectedMonth} cho ${teacher.name} (mock).`,
      type: 'success',
    });
  };

  return (
    <div className="animate-fade-in space-y-6">
      <NotificationPortal message={message} onClose={() => setMessage(null)} />

      <Card className="flex flex-wrap items-center justify-between gap-4 p-6 shadow-sm">
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={onBack}
            className="rounded-full p-2 text-midnight/45 transition-colors hover:bg-midnight/5"
            aria-label="Quay lại"
          >
            <span className="inline-block rotate-180">{getIcon('ChevronRight', 24)}</span>
          </button>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-midnight font-headline text-2xl italic text-gold shadow-lg">
              {teacher.name.charAt(0)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-headline text-2xl italic text-midnight">{teacher.name}</h2>
                <span className="rounded bg-gold/15 px-2 py-0.5 font-label text-[10px] font-semibold uppercase tracking-widest text-gold">
                  {teacher.code}
                </span>
              </div>
              <p className="font-body text-sm text-midnight/50">
                {formatTeacherTypeLabel(teacher.type)} · Hiệu suất: {teacher.performanceScore}/5
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="secondary" className="text-xs">
            Xuất profile
          </Button>
          <Button type="button" className="text-xs">
            Liên hệ nội bộ
          </Button>
        </div>
      </Card>

      <nav className="flex flex-wrap gap-6 border-b border-midnight/15 px-2">
        {(
          [
            ['info', 'Hồ sơ & Chuyên môn'],
            ['classes', 'Nhật ký giảng dạy'],
            ['payroll', 'Bảng lương & Tài chính'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            className={`relative pb-4 font-label text-xs font-semibold uppercase tracking-widest transition-colors ${
              activeTab === id ? 'text-gold' : 'text-midnight/40 hover:text-midnight/65'
            }`}
          >
            {label}
            {activeTab === id ? <span className="absolute bottom-0 left-0 h-1 w-full rounded-t-full bg-gold" /> : null}
          </button>
        ))}
      </nav>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {activeTab === 'info' && (
          <>
            <div className="space-y-6 lg:col-span-2">
              <Card className="space-y-8 p-8 shadow-sm animate-fade-in">
                <h3 className="border-b border-midnight/10 pb-4 font-label text-[10px] font-semibold uppercase tracking-widest text-midnight/45">
                  Thông tin liên hệ &amp; công tác
                </h3>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <DetailItem icon={getIcon('Mail', 20)} label="Email" value={teacher.email} />
                  <DetailItem icon={getIcon('Phone', 20)} label="Số điện thoại" value={teacher.phone} />
                  <DetailItem icon={getIcon('History', 20)} label="Ngày bắt đầu" value={teacher.joinDate} />
                  <DetailItem icon={<Activity size={20} strokeWidth={2} className="text-gold" aria-hidden />} label="Trạng thái" value={teacher.status} />
                  <DetailItem icon={<Clock size={20} strokeWidth={2} className="text-gold" aria-hidden />} label="Tổng giờ giảng (lũy kế)" value={`${allTimeTotalHours} giờ`} />
                  <div className="sm:col-span-2">
                    <DetailItem icon={getIcon('MapPin', 20)} label="Địa chỉ" value={teacher.address || 'Chưa cập nhật'} />
                  </div>
                </div>
              </Card>

              <Card className="space-y-6 p-8 shadow-sm animate-fade-in">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-midnight/10 pb-4">
                  <h3 className="font-label text-[10px] font-semibold uppercase tracking-widest text-midnight/45">
                    Hồ sơ năng lực &amp; chứng chỉ
                  </h3>
                  <span className="font-label text-[10px] font-semibold uppercase text-gold">{teacher.documents.length} tệp</span>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {teacher.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="group flex items-center gap-4 rounded-2xl border border-midnight/10 bg-midnight/[0.02] p-4 transition-colors hover:border-gold/35"
                    >
                      <div
                        className={`rounded-xl p-3 ${
                          doc.type === 'CV/Profile'
                            ? 'bg-info-bg text-info'
                            : doc.type === 'Bằng cấp'
                              ? 'bg-midnight/5 text-midnight'
                              : 'bg-warning-bg text-warning'
                        }`}
                      >
                        <FileText size={24} strokeWidth={2} aria-hidden />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-body text-sm font-semibold text-midnight">{doc.name}</p>
                        <p className="mt-0.5 font-label text-[10px] font-semibold uppercase text-midnight/45">{doc.type}</p>
                      </div>
                      <button type="button" className="text-midnight/30 transition-colors hover:text-gold" title="Tải">
                        <Download size={18} strokeWidth={2} aria-hidden />
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Card className="bg-midnight p-8 text-white shadow-xl animate-fade-in">
              <h4 className="mb-4 font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">Chuyên môn</h4>
              <div className="flex flex-wrap gap-2">
                {teacher.specialization.map((s) => (
                  <span key={s} className="rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 font-body text-xs font-semibold">
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-8 border-t border-white/10 pt-8">
                <p className="mb-3 font-label text-[10px] font-semibold uppercase tracking-widest text-white/45">Đánh giá hiệu suất</p>
                <div className="flex items-center gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full bg-gold" style={{ width: `${(teacher.performanceScore / 5) * 100}%` }} />
                  </div>
                  <span className="font-headline text-xl italic text-gold">{teacher.performanceScore}</span>
                </div>
              </div>
            </Card>
          </>
        )}

        {activeTab === 'classes' && (
          <Card className="overflow-hidden p-0 shadow-sm animate-fade-in lg:col-span-3">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-midnight/10 bg-midnight/[0.02] p-6">
              <h3 className="font-label font-semibold uppercase tracking-tight text-midnight">Nhật ký giảng dạy</h3>
              <div className="flex flex-wrap gap-2">
                <Button type="button" variant="secondary" className="text-[10px]">
                  Lọc theo khóa
                </Button>
                <Button type="button" variant="secondary" className="text-[10px]">
                  Export log
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-midnight/10 bg-midnight/5">
                    <th className="px-6 py-4 font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Ngày</th>
                    <th className="px-6 py-4 font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Khóa học</th>
                    <th className="px-6 py-4 text-center font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Hình thức</th>
                    <th className="px-6 py-4 text-center font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Giờ</th>
                    <th className="px-6 py-4 text-right font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Đơn giá</th>
                    <th className="px-6 py-4 text-right font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Thành tiền</th>
                    <th className="px-6 py-4 text-center font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-midnight/5">
                  {logs.map((log) => (
                    <tr key={log.id} className="transition-colors hover:bg-midnight/[0.02]">
                      <td className="px-6 py-4 font-body text-xs font-semibold text-midnight/65">{log.date}</td>
                      <td className="px-6 py-4">
                        <p className="font-body text-sm font-semibold text-midnight">{log.courseName}</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`rounded px-2 py-0.5 font-label text-[9px] font-semibold uppercase ${
                            log.type === 'Online' ? 'bg-info-bg text-info' : 'bg-midnight/5 text-midnight/65'
                          }`}
                        >
                          {log.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center font-body text-sm font-semibold text-midnight">{log.hours}h</td>
                      <td className="px-6 py-4 text-right font-body text-xs font-semibold text-midnight/55">{log.rateUsed.toLocaleString('vi-VN')}đ</td>
                      <td className="px-6 py-4 text-right font-body text-sm font-semibold text-gold">{log.totalAmount.toLocaleString('vi-VN')}đ</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Star size={12} strokeWidth={2} className="text-gold" aria-hidden />
                          <span className="font-body text-xs font-semibold text-midnight">{log.rating}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === 'payroll' && (
          <div className="space-y-8 lg:col-span-3 animate-fade-in">
            <Card className="relative flex flex-wrap items-center justify-between gap-8 overflow-hidden p-8 shadow-sm">
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
              <div className="relative z-10 flex flex-wrap items-center gap-6">
                <div className="rounded-3xl bg-gold p-5 text-midnight shadow-lg shadow-gold/25">
                  <Banknote size={32} strokeWidth={2} aria-hidden />
                </div>
                <div>
                  <p className="mb-1 font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-midnight/45">Kỳ thanh toán</p>
                  <Select
                    className="!border-0 !bg-transparent font-headline text-2xl italic text-midnight !p-0 !shadow-none focus:!ring-0"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    <option value="03/2026">03/2026</option>
                    <option value="02/2026">02/2026</option>
                    <option value="01/2026">01/2026</option>
                  </Select>
                </div>
              </div>
              <div className="relative z-10 flex flex-wrap gap-12">
                <div>
                  <p className="mb-1 font-label text-[10px] font-semibold uppercase tracking-widest text-midnight/45">Tổng giờ kỳ</p>
                  <p className="font-headline text-3xl italic text-midnight">
                    {payrollBreakdown.totalHours}
                    <span className="ml-1 font-body text-sm not-italic text-midnight/45">h</span>
                  </p>
                </div>
                <div>
                  <p className="mb-1 font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Thực nhận (dự tính)</p>
                  <p className="font-headline text-3xl italic text-gold">{payrollBreakdown.finalAmount.toLocaleString('vi-VN')}đ</p>
                </div>
              </div>
              <div className="relative z-10 flex flex-wrap gap-3">
                <Button type="button" variant="secondary" className="uppercase" onClick={() => setIsPayrollSlipOpen(true)}>
                  Xem &amp; gửi phiếu lương
                </Button>
                <Button type="button" variant="dark" className="uppercase shadow-lg">
                  Chốt phiếu chi (mock)
                </Button>
              </div>
            </Card>

            <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
              <Card className="flex flex-col overflow-hidden p-0 shadow-sm xl:col-span-2">
                <div className="flex items-center gap-2 border-b border-midnight/10 bg-midnight/[0.02] p-6">
                  <List size={18} strokeWidth={2} className="text-gold" aria-hidden />
                  <h3 className="font-label font-semibold uppercase tracking-tight text-midnight">Phân rã thù lao theo lớp</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-midnight/10 bg-midnight/[0.03]">
                        <th className="px-6 py-4 font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Khóa / lớp</th>
                        <th className="px-6 py-4 text-center font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Tổng giờ</th>
                        <th className="px-6 py-4 text-right font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Đơn giá</th>
                        <th className="px-6 py-4 text-right font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-midnight/5">
                      {payrollBreakdown.items.map((item, idx) => (
                        <tr key={idx} className="hover:bg-midnight/[0.02]">
                          <td className="px-6 py-5">
                            <p className="font-body text-sm font-semibold text-midnight">{item.courseName}</p>
                            <div className="mt-1 flex flex-wrap gap-2">
                              {item.offlineHours > 0 ? (
                                <span className="font-label text-[9px] font-semibold uppercase text-midnight/45">Off: {item.offlineHours}h</span>
                              ) : null}
                              {item.onlineHours > 0 ? (
                                <span className="font-label text-[9px] font-semibold uppercase text-info">On: {item.onlineHours}h</span>
                              ) : null}
                            </div>
                          </td>
                          <td className="px-6 py-5 text-center font-body text-sm font-semibold text-midnight">{item.totalHours}h</td>
                          <td className="px-6 py-5 text-right font-body text-[10px] font-semibold text-midnight/55">
                            {item.offlineHours > 0 ? (
                              <span className="block">{item.offlineRate.toLocaleString('vi-VN')}đ (off)</span>
                            ) : null}
                            {item.onlineHours > 0 ? (
                              <span className="block text-info">{item.onlineRate.toLocaleString('vi-VN')}đ (on)</span>
                            ) : null}
                          </td>
                          <td className="px-6 py-5 text-right font-body text-sm font-semibold text-gold">{item.amount.toLocaleString('vi-VN')}đ</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-midnight/[0.03]">
                      <tr>
                        <td colSpan={3} className="px-6 py-4 text-right font-label text-[10px] font-semibold uppercase tracking-widest text-midnight/45">
                          Tổng thù lao giảng dạy
                        </td>
                        <td className="px-6 py-4 text-right font-headline text-lg italic text-midnight">
                          {payrollBreakdown.totalBaseAmount.toLocaleString('vi-VN')}đ
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </Card>

              <div className="space-y-6">
                <Card className="relative overflow-hidden p-8 shadow-sm">
                  <div className="pointer-events-none absolute right-0 top-0 p-4 opacity-5">
                    <TrendingUp size={64} strokeWidth={1.25} aria-hidden />
                  </div>
                  <div className="mb-6 flex items-center justify-between border-b border-midnight/10 pb-4">
                    <h3 className="font-label text-[10px] font-semibold uppercase tracking-widest text-midnight/45">Điều chỉnh thù lao</h3>
                    <button
                      type="button"
                      onClick={() => setIsAdjustmentModalOpen(true)}
                      className="rounded-lg p-1.5 text-gold transition-colors hover:bg-gold/15"
                      aria-label="Sửa thưởng phạt"
                    >
                      {getIcon('Plus', 18)}
                    </button>
                  </div>
                  <div className="space-y-6">
                    <div className="rounded-2xl border border-success/25 bg-success-bg p-4">
                      <div className="mb-1 flex justify-between">
                        <span className="font-label text-[9px] font-semibold uppercase text-success">Thưởng (+)</span>
                        <span className="font-body text-sm font-semibold text-success">+{adjustments.bonus.toLocaleString('vi-VN')}đ</span>
                      </div>
                      <p className="font-body text-[11px] font-medium italic leading-relaxed text-midnight/75">&ldquo;{adjustments.bonusReason}&rdquo;</p>
                    </div>
                    <div className="rounded-2xl border border-error/25 bg-error-bg p-4">
                      <div className="mb-1 flex justify-between">
                        <span className="font-label text-[9px] font-semibold uppercase text-error">Phạt (−)</span>
                        <span className="font-body text-sm font-semibold text-error">−{adjustments.penalty.toLocaleString('vi-VN')}đ</span>
                      </div>
                      <p className="font-body text-[11px] font-medium italic leading-relaxed text-midnight/75">&ldquo;{adjustments.penaltyReason}&rdquo;</p>
                    </div>
                  </div>
                  <div className="mt-8 flex flex-col gap-3 border-t border-dashed border-midnight/15 pt-6">
                    <div className="flex justify-between font-body text-sm font-semibold">
                      <span className="font-label text-[10px] uppercase tracking-widest text-midnight/45">Biến động thuần</span>
                      <span className={adjustments.bonus - adjustments.penalty >= 0 ? 'text-success' : 'text-error'}>
                        {(adjustments.bonus - adjustments.penalty >= 0 ? '+' : '') +
                          (adjustments.bonus - adjustments.penalty).toLocaleString('vi-VN')}
                        đ
                      </span>
                    </div>
                    <Button type="button" variant="ghost" className="text-[9px] uppercase" onClick={() => setIsAdjustmentModalOpen(true)}>
                      {getIcon('Edit', 12)} Chỉnh sửa
                    </Button>
                  </div>
                </Card>

                <Card className="relative overflow-hidden bg-midnight p-8 text-white shadow-xl">
                  <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/5 transition-transform duration-700 group-hover:scale-150" />
                  <h4 className="mb-6 font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">Thực lãnh kỳ {selectedMonth}</h4>
                  <div className="space-y-4 font-body text-xs">
                    <div className="flex justify-between text-white/55">
                      <span>Thù lao gốc</span>
                      <span>{payrollBreakdown.totalBaseAmount.toLocaleString('vi-VN')}đ</span>
                    </div>
                    <div className="flex justify-between text-white/55">
                      <span>Điều chỉnh</span>
                      <span>{(adjustments.bonus - adjustments.penalty).toLocaleString('vi-VN')}đ</span>
                    </div>
                    <div className="flex items-end justify-between border-t border-white/10 pt-4">
                      <span className="font-label text-xs font-semibold uppercase tracking-widest">Tổng cộng</span>
                      <span className="font-headline text-3xl italic text-gold">{payrollBreakdown.finalAmount.toLocaleString('vi-VN')}đ</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <Card className="overflow-hidden shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-midnight/10 bg-midnight/[0.02] p-6">
                <h3 className="font-label font-semibold uppercase tracking-tight text-midnight">Lịch sử thanh toán</h3>
                <button type="button" className="font-label text-xs font-semibold uppercase tracking-widest text-gold hover:underline">
                  Tải phiếu (mock)
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-midnight/10 bg-midnight/5">
                      <th className="px-6 py-4 font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Kỳ</th>
                      <th className="px-6 py-4 text-center font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Giờ</th>
                      <th className="px-6 py-4 text-right font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Gốc</th>
                      <th className="px-6 py-4 text-right font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Thưởng</th>
                      <th className="px-6 py-4 text-right font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Thực nhận</th>
                      <th className="px-6 py-4 text-center font-label text-[10px] font-semibold uppercase tracking-widest text-gold">TT</th>
                      <th className="px-6 py-4 pr-8 text-right font-label text-[10px] font-semibold uppercase tracking-widest text-gold">CT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-midnight/5">
                    {payrolls.map((p) => (
                      <tr key={p.id} className="transition-colors hover:bg-midnight/[0.02]">
                        <td className="px-6 py-4 font-body text-sm font-semibold text-midnight">{p.period}</td>
                        <td className="px-6 py-4 text-center font-body text-sm font-semibold text-midnight/65">{p.totalHours}h</td>
                        <td className="px-6 py-4 text-right font-body text-sm font-semibold text-midnight/65">{p.totalAmount.toLocaleString('vi-VN')}đ</td>
                        <td className="px-6 py-4 text-right font-body text-sm font-semibold text-success">+{(p.bonus ?? 0).toLocaleString('vi-VN')}đ</td>
                        <td className="px-6 py-4 text-right font-body text-sm font-semibold text-gold">{p.finalAmount.toLocaleString('vi-VN')}đ</td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`rounded-full border px-3 py-1 font-label text-[9px] font-semibold uppercase tracking-widest ${getPayrollSettlementClass(p.status)}`}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 pr-8 text-right">
                          <button type="button" className="text-midnight/30 transition-colors hover:text-gold" title="Chứng từ">
                            <Receipt size={18} strokeWidth={2} aria-hidden />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}
      </div>

      <AdjustmentModal
        isOpen={isAdjustmentModalOpen}
        onClose={() => setIsAdjustmentModalOpen(false)}
        onSave={handleSaveAdjustments}
        initialData={adjustments}
        teacherName={teacher.name}
      />

      <PayrollSlipModal
        isOpen={isPayrollSlipOpen}
        onClose={() => setIsPayrollSlipOpen(false)}
        teacher={teacher}
        period={selectedMonth}
        items={payrollBreakdown.items.map((i) => ({
          courseName: i.courseName,
          hours: i.totalHours,
          rate: teacher.rates.offlineRate,
          amount: i.amount,
        }))}
        adjustments={adjustments}
        totalBase={payrollBreakdown.totalBaseAmount}
        finalAmount={payrollBreakdown.finalAmount}
        onSendConfirmation={handleSendPayrollSlip}
      />
    </div>
  );
};

const DetailItem: React.FC<{ icon: ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <div className="shrink-0 rounded-2xl border border-white bg-midnight/5 p-3 text-gold shadow-sm">{icon}</div>
    <div>
      <p className="mb-1 font-label text-[10px] font-semibold uppercase tracking-wider text-midnight/45">{label}</p>
      <p className="font-body text-sm font-semibold leading-tight text-midnight">{value}</p>
    </div>
  </div>
);

export default TeacherDetail;
