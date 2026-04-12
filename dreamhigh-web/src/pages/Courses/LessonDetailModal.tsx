import React, { useId, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../design-system/components/ui/Button';
import { Card } from '../../design-system/components/ui/Card';
import { Input, Select, TextArea } from '../../design-system/components/ui/Input';
import type { CourseLesson, CourseLessonExecutionStatus } from '../../types/course';

export interface LessonDetailModalProps {
  lesson: Partial<CourseLesson> | null;
  isOpen: boolean;
  isAdding: boolean;
  onClose: () => void;
  onSave: (lesson: CourseLesson) => void;
}

const EXEC_OPTIONS: CourseLessonExecutionStatus[] = [
  'Chưa diễn ra',
  'Đang dạy',
  'Đã hoàn thành',
  'Huỷ',
];

function normalizeLesson(lesson: Partial<CourseLesson> | null, isAdding: boolean): CourseLesson {
  const base: CourseLesson = {
    id: lesson?.id ?? '',
    stt: lesson?.stt ?? 0,
    executionStatus: lesson?.executionStatus ?? 'Chưa diễn ra',
    teachingDate: lesson?.teachingDate ?? new Date().toISOString().split('T')[0],
    teacherName: lesson?.teacherName ?? '',
    content: lesson?.content ?? '',
    homework: lesson?.homework ?? '',
    attendance: lesson?.attendance,
  };
  if (isAdding && !lesson?.content) {
    base.content = '';
  }
  return { ...base, ...lesson };
}

const LessonDetailModal: React.FC<LessonDetailModalProps> = ({
  lesson,
  isOpen,
  isAdding,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;
  return (
    <LessonDetailModalOpen
      key={isAdding ? 'add' : lesson?.id || 'edit'}
      initial={lesson ?? {}}
      isAdding={isAdding}
      onClose={onClose}
      onSave={onSave}
    />
  );
};

const LessonDetailModalOpen: React.FC<{
  initial: Partial<CourseLesson>;
  isAdding: boolean;
  onClose: () => void;
  onSave: (lesson: CourseLesson) => void;
}> = ({ initial, isAdding, onClose, onSave }) => {
  const titleId = useId();
  const [form, setForm] = useState<CourseLesson>(() => normalizeLesson(initial, isAdding));
  const merge = (p: Partial<CourseLesson>) => setForm((prev) => ({ ...prev, ...p }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-midnight/40 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <Card className="max-h-[90vh] w-full max-w-lg overflow-y-auto p-0 shadow-xl animate-fade-in">
        <div className="flex items-center justify-between bg-midnight px-6 py-4">
          <h2 id={titleId} className="font-headline text-lg italic text-gold">
            {isAdding ? 'Thêm buổi học' : 'Cập nhật buổi học'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-white/60 hover:bg-white/10 hover:text-white"
            aria-label="Đóng"
          >
            <X size={22} strokeWidth={2} aria-hidden />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <Select
            label="Trạng thái buổi"
            value={form.executionStatus}
            onChange={(e) => merge({ executionStatus: e.target.value as CourseLessonExecutionStatus })}
          >
            {EXEC_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </Select>
          <Input
            type="date"
            label="Ngày dạy"
            value={form.teachingDate}
            onChange={(e) => merge({ teachingDate: e.target.value })}
          />
          <Input label="Giáo viên phụ trách" value={form.teacherName} onChange={(e) => merge({ teacherName: e.target.value })} />
          <TextArea label="Nội dung" rows={3} value={form.content} onChange={(e) => merge({ content: e.target.value })} />
          <Input label="BTVN" value={form.homework} onChange={(e) => merge({ homework: e.target.value })} />
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="ghost" className="flex-1" onClick={onClose}>
              Huỷ
            </Button>
            <Button type="submit" className="flex-1">
              Lưu
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LessonDetailModal;
