import React, { useId, useMemo, useState } from 'react';
import { Bookmark, Clock, Trash2, X } from 'lucide-react';
import { Button } from '../../design-system/components/ui/Button';
import { Card } from '../../design-system/components/ui/Card';
import { Input, Select } from '../../design-system/components/ui/Input';
import { MOCK_CURRICULUM } from '../../mock/courseManagement';
import type { Course, CourseDraft, CourseStatus, ScheduleSlot } from '../../types/course';
import { getIcon } from '../Admin/system/adminSystemIcons';

export interface CourseModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CourseDraft) => void;
}

const DAYS = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'];

const LEVELS = ['Starters', 'Movers', 'Flyers', 'Elementary', 'Pre-Intermediate', 'Intermediate'];

function parseSchedule(scheduleStr?: string): ScheduleSlot[] {
  if (!scheduleStr?.trim()) return [];
  try {
    return scheduleStr.split('; ').map((part) => {
      const idx = part.indexOf(': ');
      if (idx === -1) return { day: 'Thứ 2', startTime: '18:00', endTime: '19:30' };
      const day = part.slice(0, idx);
      const timePart = part.slice(idx + 2);
      const [start, end] = timePart.split(' - ');
      return { day, startTime: start?.trim() ?? '18:00', endTime: end?.trim() ?? '19:30' };
    });
  } catch {
    return [];
  }
}

function stringifySchedule(slots: ScheduleSlot[]): string {
  return slots.map((s) => `${s.day}: ${s.startTime} - ${s.endTime}`).join('; ');
}

const DEFAULT_SCHEDULE_SLOTS: ScheduleSlot[] = parseSchedule(
  'Thứ 2: 18:00 - 19:30; Thứ 4: 18:00 - 19:30',
);

function buildForm(course: Course | null): CourseDraft {
  if (course) {
    return {
      code: course.code,
      name: course.name,
      level: course.level,
      academicYear: course.academicYear,
      duration: course.duration,
      hoursPerSession: course.hoursPerSession,
      totalHours: course.totalHours,
      openingDate: course.openingDate,
      estimatedEndDate: course.estimatedEndDate ?? '',
      sessionsPerWeek: course.sessionsPerWeek,
      sessionTime: course.sessionTime ?? '',
      schedule: course.schedule ?? '',
      teacherVN: course.teacherVN ?? '',
      teacherForeign: course.teacherForeign ?? '',
      teachingAssistant: course.teachingAssistant ?? '',
      status: course.status,
      syllabusId: course.syllabusId,
    };
  }
  const y = new Date().getFullYear();
  const autoCode = `CRS-${y}-${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0')}`;
  return {
    code: autoCode,
    name: '',
    level: 'Starters',
    academicYear: y,
    duration: 24,
    hoursPerSession: 1.5,
    totalHours: 36,
    openingDate: new Date().toISOString().split('T')[0],
    estimatedEndDate: '',
    sessionsPerWeek: 2,
    sessionTime: '18:00 - 19:30',
    schedule: 'Thứ 2: 18:00 - 19:30; Thứ 4: 18:00 - 19:30',
    teacherVN: '',
    teacherForeign: '',
    teachingAssistant: '',
    status: 'Khởi tạo',
    syllabusId: '',
  };
}

const CourseModal: React.FC<CourseModalProps> = ({ isOpen, course, onClose, onSave }) => {
  if (!isOpen) return null;
  return <CourseModalInner key={course?.id ?? 'new'} course={course} onClose={onClose} onSave={onSave} />;
};

const CourseModalInner: React.FC<Omit<CourseModalProps, 'isOpen'>> = ({ course, onClose, onSave }) => {
  const titleId = useId();
  const [formData, setFormData] = useState<CourseDraft>(() => buildForm(course));
  const [scheduleSlots, setScheduleSlots] = useState<ScheduleSlot[]>(() =>
    course ? parseSchedule(course.schedule) : [...DEFAULT_SCHEDULE_SLOTS],
  );

  const totalHours = formData.duration * formData.hoursPerSession;
  const scheduleString = useMemo(() => stringifySchedule(scheduleSlots), [scheduleSlots]);

  const estimatedEndDate = useMemo(() => {
    if (!formData.openingDate || formData.duration <= 0 || scheduleSlots.length <= 0) return '';
    const startDate = new Date(formData.openingDate);
    const weeks = Math.ceil(formData.duration / scheduleSlots.length);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + weeks * 7);
    return endDate.toISOString().split('T')[0];
  }, [formData.openingDate, formData.duration, scheduleSlots.length]);

  const merge = (p: Partial<CourseDraft>) => setFormData((prev) => ({ ...prev, ...p }));

  const addScheduleSlot = () => {
    setScheduleSlots((prev) => [...prev, { day: 'Thứ 2', startTime: '18:00', endTime: '19:30' }]);
  };

  const removeScheduleSlot = (index: number) => {
    setScheduleSlots((prev) => prev.filter((_, i) => i !== index));
  };

  const updateScheduleSlot = (index: number, field: keyof ScheduleSlot, value: string) => {
    setScheduleSlots((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      totalHours,
      schedule: scheduleString,
      sessionsPerWeek: scheduleSlots.length,
      estimatedEndDate,
    });
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-midnight/40 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <Card className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden p-0 shadow-xl animate-fade-in">
        <div className="relative overflow-hidden bg-midnight px-6 py-6 md:px-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div>
              <h2 id={titleId} className="font-label text-xl font-semibold uppercase tracking-tight text-white md:text-2xl">
                {course ? 'Hiệu chỉnh khóa học' : 'Tạo khóa học mới'}
              </h2>
              <p className="mt-1 font-body text-xs font-semibold uppercase tracking-widest text-gold">
                Lịch trình &amp; nhân sự (mock)
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="relative z-10 rounded-full bg-white/10 p-2 text-white/70 transition-colors hover:bg-white/15 hover:text-white"
              aria-label="Đóng"
            >
              <X size={24} strokeWidth={2} aria-hidden />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="max-h-[min(72vh,640px)] space-y-8 overflow-y-auto p-6 md:p-10">
            <section className="space-y-6">
              <div className="flex items-center gap-3 border-b border-midnight/10 pb-3">
                <span className="rounded-lg bg-gold p-1.5 text-midnight">
                  <Bookmark size={18} strokeWidth={2} aria-hidden />
                </span>
                <h3 className="font-label text-sm font-semibold uppercase tracking-widest text-midnight">
                  01. Thông tin &amp; syllabus
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="md:col-span-2">
                  <Select
                    label="Chương trình nguồn (bắt buộc)"
                    required
                    value={formData.syllabusId}
                    onChange={(e) => merge({ syllabusId: e.target.value })}
                  >
                    <option value="">— Chọn syllabus —</option>
                    {MOCK_CURRICULUM.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.code} — {p.name}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Input label="Mã khóa học" value={formData.code} onChange={(e) => merge({ code: e.target.value.toUpperCase() })} />
                </div>
                <div className="md:col-span-2">
                  <Input
                    label="Tên khóa học (bắt buộc)"
                    required
                    placeholder="VD: Starter 1 — Ca sáng…"
                    value={formData.name}
                    onChange={(e) => merge({ name: e.target.value })}
                  />
                </div>
                <div>
                  <Select label="Trạng thái" value={formData.status} onChange={(e) => merge({ status: e.target.value as CourseStatus })}>
                    <option value="Khởi tạo">Khởi tạo</option>
                    <option value="Đang mở">Đang mở</option>
                    <option value="Đang học">Đang học</option>
                    <option value="Hoàn thành">Hoàn thành</option>
                    <option value="Ngừng">Ngừng</option>
                  </Select>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-3 border-b border-midnight/10 pb-3">
                <span className="rounded-lg bg-midnight p-1.5 text-gold">{getIcon('UserCheck', 18)}</span>
                <h3 className="font-label text-sm font-semibold uppercase tracking-widest text-midnight">
                  02. Nhân sự
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Input
                  label="Giảng viên VN"
                  value={formData.teacherVN}
                  onChange={(e) => merge({ teacherVN: e.target.value })}
                />
                <Input
                  label="Giảng viên nước ngoài"
                  value={formData.teacherForeign}
                  onChange={(e) => merge({ teacherForeign: e.target.value })}
                />
                <Input
                  label="Trợ giảng"
                  value={formData.teachingAssistant}
                  onChange={(e) => merge({ teachingAssistant: e.target.value })}
                />
                <div>
                  <Select label="Cấp độ" value={formData.level} onChange={(e) => merge({ level: e.target.value })}>
                    {LEVELS.map((lv) => (
                      <option key={lv} value={lv}>
                        {lv}
                      </option>
                    ))}
                  </Select>
                </div>
                <Input
                  type="number"
                  label="Năm học"
                  value={String(formData.academicYear)}
                  onChange={(e) => merge({ academicYear: parseInt(e.target.value, 10) || new Date().getFullYear() })}
                />
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-3 border-b border-midnight/10 pb-3">
                <span className="rounded-lg bg-warning p-1.5 text-midnight">{getIcon('Calendar', 18)}</span>
                <h3 className="font-label text-sm font-semibold uppercase tracking-widest text-midnight">
                  03. Thời lượng &amp; lịch
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-6 rounded-xl border border-midnight/10 bg-bg p-6 md:grid-cols-4">
                <div className="rounded-xl border border-midnight/10 bg-surface p-4 shadow-sm md:col-span-1">
                  <label className="mb-2 block text-center font-label text-[10px] font-semibold uppercase text-midnight/45">
                    Số buổi
                  </label>
                  <input
                    type="number"
                    className="w-full border-none bg-transparent text-center font-body text-xl font-semibold text-midnight outline-none"
                    value={formData.duration}
                    min={0}
                    onChange={(e) => merge({ duration: parseInt(e.target.value, 10) || 0 })}
                  />
                </div>
                <div className="rounded-xl border border-midnight/10 bg-surface p-4 shadow-sm md:col-span-1">
                  <label className="mb-2 block text-center font-label text-[10px] font-semibold uppercase text-midnight/45">
                    Giờ / buổi
                  </label>
                  <input
                    type="number"
                    step={0.5}
                    className="w-full border-none bg-transparent text-center font-body text-xl font-semibold text-midnight outline-none"
                    value={formData.hoursPerSession}
                    onChange={(e) => merge({ hoursPerSession: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div className="flex items-center justify-between rounded-xl border border-gold/25 bg-gold/10 p-4 md:col-span-2">
                  <div>
                    <p className="font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Tổng giờ</p>
                    <p className="font-headline text-3xl text-gold">
                      {totalHours} <span className="text-sm font-semibold">giờ</span>
                    </p>
                  </div>
                  <div className="rounded-xl bg-surface p-3 text-gold shadow-sm">
                    <Clock size={28} strokeWidth={2} aria-hidden />
                  </div>
                </div>
                <div>
                  <Input
                    type="date"
                    label="Ngày khai giảng"
                    required
                    value={formData.openingDate}
                    onChange={(e) => merge({ openingDate: e.target.value })}
                  />
                </div>
                <div className="flex flex-col items-center justify-center rounded-xl border border-midnight/10 bg-surface p-4">
                  <span className="font-label text-[10px] font-semibold uppercase text-midnight/45">Buổi / tuần</span>
                  <span className="font-body text-2xl font-semibold text-gold">{scheduleSlots.length}</span>
                </div>
                <div className="md:col-span-2 flex items-center justify-between rounded-xl border border-dashed border-midnight/15 bg-surface/80 p-4">
                  <div>
                    <p className="font-label text-[10px] font-semibold uppercase text-midnight/45">Dự kiến kết thúc</p>
                    <p className="font-body text-lg font-semibold text-midnight">{estimatedEndDate || '—'}</p>
                  </div>
                  <div className="rounded-xl bg-midnight/5 p-3 text-midnight/40">{getIcon('History', 24)}</div>
                </div>

                <div className="md:col-span-4 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-label text-xs font-semibold uppercase text-midnight">Lịch trong tuần</span>
                    <Button type="button" className="gap-1 text-[10px]" onClick={addScheduleSlot}>
                      {getIcon('Plus', 12)} Thêm buổi
                    </Button>
                  </div>
                  {scheduleSlots.map((slot, idx) => (
                    <div
                      key={idx}
                      className="flex flex-wrap items-end gap-4 rounded-xl border border-midnight/10 bg-surface p-4 animate-fade-in"
                    >
                      <div className="min-w-[140px] flex-1">
                        <Select
                          label="Thứ"
                          value={slot.day}
                          onChange={(e) => updateScheduleSlot(idx, 'day', e.target.value)}
                        >
                          {DAYS.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </Select>
                      </div>
                      <div className="min-w-[120px] flex-1">
                        <Input
                          type="time"
                          label="Bắt đầu"
                          value={slot.startTime}
                          onChange={(e) => updateScheduleSlot(idx, 'startTime', e.target.value)}
                        />
                      </div>
                      <div className="min-w-[120px] flex-1">
                        <Input
                          type="time"
                          label="Kết thúc"
                          value={slot.endTime}
                          onChange={(e) => updateScheduleSlot(idx, 'endTime', e.target.value)}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeScheduleSlot(idx)}
                        className="rounded-lg p-2 text-error/70 transition-colors hover:bg-error-bg hover:text-error"
                        aria-label="Xóa buổi"
                      >
                        <Trash2 size={18} strokeWidth={2} />
                      </button>
                    </div>
                  ))}
                  {scheduleSlots.length === 0 && (
                    <p className="rounded-xl border border-dashed border-midnight/15 bg-bg py-6 text-center font-body text-xs text-midnight/45">
                      Chưa có ca học — bấm &quot;Thêm buổi&quot;.
                    </p>
                  )}
                </div>
              </div>
            </section>
          </div>

          <div className="flex gap-3 border-t border-midnight/10 bg-bg p-6 md:px-10">
            <Button type="button" variant="ghost" className="flex-1 py-4" onClick={onClose}>
              Huỷ
            </Button>
            <Button type="submit" className="flex-1 py-4 shadow-md">
              {course ? 'Cập nhật' : 'Lưu khóa học'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CourseModal;
