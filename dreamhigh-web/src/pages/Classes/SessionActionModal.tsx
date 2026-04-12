import React, { useId, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../design-system/components/ui/Button';
import { Card } from '../../design-system/components/ui/Card';
import { Input, Select } from '../../design-system/components/ui/Input';
import type { ClassSession, Room, ScheduleTeacher } from '../../types/classSchedule';

export interface SessionActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: ClassSession;
  onSave: (data: ClassSession) => void;
  rooms: Room[];
  teachers: ScheduleTeacher[];
  className: string;
}

const SessionActionModal: React.FC<SessionActionModalProps> = ({
  isOpen,
  onClose,
  session,
  onSave,
  rooms,
  teachers,
  className,
}) => {
  if (!isOpen) return null;
  return (
    <SessionActionModalInner
      key={session.id}
      session={session}
      onClose={onClose}
      onSave={onSave}
      rooms={rooms}
      teachers={teachers}
      className={className}
    />
  );
};

const SessionActionModalInner: React.FC<Omit<SessionActionModalProps, 'isOpen'>> = ({
  session,
  onClose,
  onSave,
  rooms,
  teachers,
  className,
}) => {
  const titleId = useId();
  const [form, setForm] = useState<ClassSession>(session);
  const merge = (p: Partial<ClassSession>) => setForm((prev) => ({ ...prev, ...p }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-midnight/45 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <Card className="max-h-[90vh] w-full max-w-lg overflow-y-auto p-0 shadow-xl animate-fade-in">
        <div className="flex items-center justify-between border-b border-midnight/10 bg-midnight px-6 py-4">
          <div>
            <h2 id={titleId} className="font-label text-sm font-semibold uppercase tracking-tight text-white md:text-base">
              Điều phối buổi học
            </h2>
            <p className="mt-1 font-body text-[10px] text-gold">{className}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white/10 p-2 text-white/70 hover:bg-white/15 hover:text-white"
            aria-label="Đóng"
          >
            <X size={22} strokeWidth={2} aria-hidden />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <Input type="date" label="Ngày" value={form.date} onChange={(e) => merge({ date: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <Input type="time" label="Bắt đầu" value={form.startTime} onChange={(e) => merge({ startTime: e.target.value })} />
            <Input type="time" label="Kết thúc" value={form.endTime} onChange={(e) => merge({ endTime: e.target.value })} />
          </div>
          <Select label="Phòng" value={form.roomId} onChange={(e) => merge({ roomId: e.target.value })}>
            {rooms.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
                {r.id !== 'none' ? ` (${r.capacity} chỗ)` : ''}
              </option>
            ))}
          </Select>
          <Select label="Giáo viên" value={form.teacherId} onChange={(e) => merge({ teacherId: e.target.value })}>
            {teachers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </Select>
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="ghost" className="flex-1" onClick={onClose}>
              Huỷ
            </Button>
            <Button type="submit" className="flex-1">
              Lưu điều phối
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SessionActionModal;
