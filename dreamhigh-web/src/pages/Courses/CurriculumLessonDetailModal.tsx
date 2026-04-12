import React, { useId, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../design-system/components/ui/Button';
import { Card } from '../../design-system/components/ui/Card';
import { Input, Select, TextArea } from '../../design-system/components/ui/Input';
import type { CurriculumLesson, CurriculumLessonStatus } from '../../types/curriculum';

export interface CurriculumLessonDetailModalProps {
  lesson: Partial<CurriculumLesson> | null;
  isOpen: boolean;
  isAdding: boolean;
  onClose: () => void;
  onSave: (lesson: CurriculumLesson) => void;
}

const EXEC_OPTIONS: CurriculumLessonStatus[] = ['Chưa bắt đầu', 'Đã hoàn thành', 'Huỷ'];

function docsToText(docs: string[] | undefined): string {
  return (docs ?? []).filter(Boolean).join('\n');
}

function textToDocs(text: string): string[] {
  return text
    .split(/\n|,/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function normalizeLesson(lesson: Partial<CurriculumLesson> | null, isAdding: boolean): CurriculumLesson {
  const base: CurriculumLesson = {
    id: lesson?.id ?? '',
    stt: lesson?.stt ?? 0,
    executionStatus: lesson?.executionStatus ?? 'Chưa bắt đầu',
    teachingDate: lesson?.teachingDate ?? new Date().toISOString().split('T')[0],
    teacherName: lesson?.teacherName ?? '',
    assistantName: lesson?.assistantName ?? '',
    documents: lesson?.documents ?? [],
    content: lesson?.content ?? '',
    homework: lesson?.homework ?? '',
    teacherGuideline: lesson?.teacherGuideline ?? '',
    offReason: lesson?.offReason,
  };
  if (isAdding) {
    base.content = base.content || '';
  }
  return { ...base, ...lesson, documents: lesson?.documents ?? base.documents };
}

const CurriculumLessonDetailModal: React.FC<CurriculumLessonDetailModalProps> = ({
  lesson,
  isOpen,
  isAdding,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;
  return (
    <CurriculumLessonDetailModalOpen
      key={isAdding ? 'add' : lesson?.id || 'edit'}
      initial={lesson ?? {}}
      isAdding={isAdding}
      onClose={onClose}
      onSave={onSave}
    />
  );
};

const CurriculumLessonDetailModalOpen: React.FC<{
  initial: Partial<CurriculumLesson>;
  isAdding: boolean;
  onClose: () => void;
  onSave: (lesson: CurriculumLesson) => void;
}> = ({ initial, isAdding, onClose, onSave }) => {
  const titleId = useId();
  const [form, setForm] = useState<CurriculumLesson>(() => normalizeLesson(initial, isAdding));
  const [docsText, setDocsText] = useState(() => docsToText(initial.documents));
  const merge = (p: Partial<CurriculumLesson>) => setForm((prev) => ({ ...prev, ...p }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...form, documents: textToDocs(docsText) });
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-midnight/40 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <Card className="max-h-[92vh] w-full max-w-xl overflow-y-auto p-0 shadow-xl animate-fade-in">
        <div className="flex items-center justify-between bg-midnight px-6 py-4">
          <h2 id={titleId} className="font-headline text-lg italic text-gold">
            {isAdding ? 'Thêm buổi học (Syllabus)' : 'Cập nhật buổi học'}
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
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <Select
            label="Trạng thái buổi"
            value={form.executionStatus}
            onChange={(e) => merge({ executionStatus: e.target.value as CurriculumLessonStatus })}
          >
            {EXEC_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </Select>
          <Input
            type="date"
            label="Ngày giảng dạy"
            value={form.teachingDate}
            onChange={(e) => merge({ teachingDate: e.target.value })}
          />
          <Input
            label="Tên giáo viên"
            value={form.teacherName}
            onChange={(e) => merge({ teacherName: e.target.value })}
          />
          <Input
            label="Trợ giảng"
            value={form.assistantName}
            onChange={(e) => merge({ assistantName: e.target.value })}
          />
          <TextArea
            label="Nội dung buổi"
            rows={3}
            value={form.content}
            onChange={(e) => merge({ content: e.target.value })}
          />
          <TextArea
            label="Tài liệu (mỗi dòng hoặc cách nhau dấu phẩy)"
            rows={3}
            value={docsText}
            onChange={(e) => setDocsText(e.target.value)}
          />
          <Input label="BTVN" value={form.homework} onChange={(e) => merge({ homework: e.target.value })} />
          <TextArea
            label="Lưu ý / hướng dẫn GV"
            rows={2}
            value={form.teacherGuideline}
            onChange={(e) => merge({ teacherGuideline: e.target.value })}
          />
          {form.executionStatus === 'Huỷ' && (
            <TextArea
              label="Lý do huỷ buổi"
              rows={2}
              value={form.offReason ?? ''}
              onChange={(e) => merge({ offReason: e.target.value })}
            />
          )}
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

export default CurriculumLessonDetailModal;
