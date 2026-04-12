import React, { useId, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../design-system/components/ui/Button';
import { Card } from '../../design-system/components/ui/Card';
import type {
  AttendanceLesson,
  AttendanceRecord,
  AttendanceStatus,
  CourseStudentRef,
  HomeworkStatus,
} from '../../types/attendance';

export interface AttendanceModalProps {
  lesson: AttendanceLesson | null;
  students: CourseStudentRef[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (attendance: AttendanceRecord[]) => void;
}

function buildInitialRecords(
  lesson: AttendanceLesson,
  students: CourseStudentRef[],
): AttendanceRecord[] {
  if (lesson.attendance && lesson.attendance.length > 0) {
    return lesson.attendance.map((r) => ({ ...r }));
  }
  return students.map((s) => ({
    studentId: s.id,
    studentName: s.studentName,
    status: 'Attended' as const,
    homeworkStatus: 'Completed' as const,
    note: '',
  }));
}

const AttendanceModal: React.FC<AttendanceModalProps> = (props) => {
  if (!props.isOpen || !props.lesson) return null;
  return (
    <AttendanceModalOpen
      key={`${props.lesson.stt}-${props.lesson.teachingDate}`}
      {...props}
      lesson={props.lesson}
    />
  );
};

const AttendanceModalOpen: React.FC<AttendanceModalProps & { lesson: AttendanceLesson }> = ({
  lesson,
  students,
  onClose,
  onSave,
}) => {
  const titleId = useId();
  const [records, setRecords] = useState<AttendanceRecord[]>(() => buildInitialRecords(lesson, students));

  const updateStatus = (studentId: string, status: AttendanceStatus) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.studentId === studentId
          ? {
              ...r,
              status,
              homeworkStatus:
                status === 'Attended' ? (r.homeworkStatus ?? 'Completed') : undefined,
            }
          : r,
      ),
    );
  };

  const updateHomework = (studentId: string, homeworkStatus: HomeworkStatus) => {
    setRecords((prev) => prev.map((r) => (r.studentId === studentId ? { ...r, homeworkStatus } : r)));
  };

  const updateNote = (studentId: string, note: string) => {
    setRecords((prev) => prev.map((r) => (r.studentId === studentId ? { ...r, note } : r)));
  };

  const stats = {
    attended: records.filter((r) => r.status === 'Attended').length,
    absent: records.filter((r) => r.status === 'Absent').length,
    homeworkDone: records.filter((r) => r.status === 'Attended' && r.homeworkStatus === 'Completed').length,
    homeworkMissed: records.filter((r) => r.status === 'Attended' && r.homeworkStatus === 'NotCompleted').length,
  };

  const handleSave = () => onSave(records);

  return (
    <div
      className="custom-scrollbar fixed inset-0 z-[100] flex items-center justify-center bg-midnight/55 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <Card className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden p-0 shadow-xl animate-fade-in">
        <div className="flex items-center justify-between bg-midnight px-6 py-6">
          <div>
            <h2 id={titleId} className="font-label text-xl font-semibold uppercase tracking-tight text-white">
              Điểm danh &amp; BTVN
            </h2>
            <p className="mt-1 font-body text-xs font-semibold text-gold">
              Buổi #{lesson.stt} · {lesson.teachingDate}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Đóng"
          >
            <X size={24} strokeWidth={2} aria-hidden />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 border-b border-midnight/10 bg-bg p-4 sm:grid-cols-4 sm:gap-4 sm:p-6">
          <StatBox label="Có đi học" value={stats.attended} variant="success" />
          <StatBox label="Không đi học" value={stats.absent} variant="error" />
          <StatBox label="Đã làm BTVN" value={stats.homeworkDone} variant="info" />
          <StatBox label="Chưa làm BTVN" value={stats.homeworkMissed} variant="warning" />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-midnight/10">
                <th className="w-12 px-3 py-3 text-center font-label text-[10px] font-semibold uppercase tracking-widest text-gold sm:px-4">
                  STT
                </th>
                <th className="px-3 py-3 font-label text-[10px] font-semibold uppercase tracking-widest text-gold sm:px-4">
                  Học viên
                </th>
                <th className="w-56 px-3 py-3 text-center font-label text-[10px] font-semibold uppercase tracking-widest text-gold sm:px-4">
                  Đi học
                </th>
                <th className="w-64 px-3 py-3 text-center font-label text-[10px] font-semibold uppercase tracking-widest text-gold sm:px-4">
                  BTVN
                </th>
                <th className="px-3 py-3 font-label text-[10px] font-semibold uppercase tracking-widest text-gold sm:px-4">
                  Ghi chú
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-midnight/5">
              {records.map((record, index) => (
                <tr
                  key={record.studentId}
                  className={`transition-colors hover:bg-midnight/[0.02] ${record.status === 'Absent' ? 'bg-error-bg/30' : ''}`}
                >
                  <td className="px-3 py-4 text-center font-body text-xs font-semibold text-midnight/40 sm:px-4">
                    {index + 1}
                  </td>
                  <td className="px-3 py-4 sm:px-4">
                    <p className="font-body text-sm font-semibold text-midnight">{record.studentName}</p>
                    <p className="font-mono text-[10px] text-midnight/40">ID: {record.studentId.slice(0, 8)}</p>
                  </td>
                  <td className="px-3 py-4 sm:px-4">
                    <div className="flex justify-center gap-1 rounded-xl bg-midnight/5 p-1">
                      <button
                        type="button"
                        onClick={() => updateStatus(record.studentId, 'Attended')}
                        className={`flex-1 rounded-lg px-2 py-1.5 font-label text-[10px] font-semibold uppercase transition-all sm:px-3 ${
                          record.status === 'Attended'
                            ? 'bg-success text-white shadow-sm'
                            : 'text-midnight/45 hover:text-midnight/70'
                        }`}
                      >
                        Có đi học
                      </button>
                      <button
                        type="button"
                        onClick={() => updateStatus(record.studentId, 'Absent')}
                        className={`flex-1 rounded-lg px-2 py-1.5 font-label text-[10px] font-semibold uppercase transition-all sm:px-3 ${
                          record.status === 'Absent'
                            ? 'bg-error text-white shadow-sm'
                            : 'text-midnight/45 hover:text-midnight/70'
                        }`}
                      >
                        Không đi học
                      </button>
                    </div>
                  </td>
                  <td className="px-3 py-4 sm:px-4">
                    {record.status === 'Attended' ? (
                      <div className="flex animate-fade-in justify-center gap-1 rounded-xl bg-midnight/5 p-1">
                        <button
                          type="button"
                          onClick={() => updateHomework(record.studentId, 'Completed')}
                          className={`flex-1 rounded-lg px-2 py-1.5 font-label text-[10px] font-semibold uppercase transition-all sm:px-3 ${
                            record.homeworkStatus === 'Completed'
                              ? 'bg-info text-white shadow-sm'
                              : 'text-midnight/45 hover:text-midnight/70'
                          }`}
                        >
                          Có làm BTVN
                        </button>
                        <button
                          type="button"
                          onClick={() => updateHomework(record.studentId, 'NotCompleted')}
                          className={`flex-1 rounded-lg px-2 py-1.5 font-label text-[10px] font-semibold uppercase transition-all sm:px-3 ${
                            record.homeworkStatus === 'NotCompleted'
                              ? 'bg-warning text-midnight shadow-sm'
                              : 'text-midnight/45 hover:text-midnight/70'
                          }`}
                        >
                          Không làm BTVN
                        </button>
                      </div>
                    ) : (
                      <div className="py-2 text-center font-label text-[10px] font-semibold uppercase italic tracking-widest text-midnight/25">
                        — Không áp dụng —
                      </div>
                    )}
                  </td>
                  <td className="px-3 py-4 sm:px-4">
                    <input
                      type="text"
                      className="input-field h-9 text-xs"
                      placeholder="Ghi chú…"
                      value={record.note ?? ''}
                      onChange={(e) => updateNote(record.studentId, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex gap-3 border-t border-midnight/10 bg-bg p-6">
          <Button type="button" variant="ghost" className="flex-1" onClick={onClose}>
            Huỷ
          </Button>
          <Button type="button" className="flex-1 shadow-md" onClick={handleSave}>
            Lưu điểm danh
          </Button>
        </div>
      </Card>
    </div>
  );
};

type StatVariant = 'success' | 'error' | 'info' | 'warning';

const statStyles: Record<
  StatVariant,
  { box: string; value: string; label: string }
> = {
  success: {
    box: 'border-success/20 bg-success-bg',
    value: 'text-success',
    label: 'text-midnight/50',
  },
  error: {
    box: 'border-error/20 bg-error-bg',
    value: 'text-error',
    label: 'text-midnight/50',
  },
  info: {
    box: 'border-info/20 bg-info-bg',
    value: 'text-info',
    label: 'text-midnight/50',
  },
  warning: {
    box: 'border-warning/20 bg-warning-bg',
    value: 'text-warning',
    label: 'text-midnight/50',
  },
};

const StatBox: React.FC<{ label: string; value: number; variant: StatVariant }> = ({
  label,
  value,
  variant,
}) => {
  const s = statStyles[variant];
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl border p-3 shadow-sm ${s.box}`}
    >
      <span className={`font-body text-xl font-semibold ${s.value}`}>{value}</span>
      <span className={`mt-1 text-center font-label text-[9px] font-semibold uppercase tracking-tighter ${s.label}`}>
        {label}
      </span>
    </div>
  );
};

export default AttendanceModal;
