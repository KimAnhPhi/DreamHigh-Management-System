import React, { useId, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../design-system/components/ui/Button';
import { Card } from '../../design-system/components/ui/Card';
import { Input, TextArea } from '../../design-system/components/ui/Input';
import type { CurriculumUnit } from '../../types/curriculum';
import type { CourseRosterStudent } from '../../types/course';
import type { StudentUnitProgress } from '../../types/unitProgress';

export interface ProgressDetailModalProps {
  student: CourseRosterStudent | null;
  unit: CurriculumUnit;
  existingProgress?: StudentUnitProgress;
  isOpen: boolean;
  onClose: () => void;
  onSave: (update: StudentUnitProgress) => void;
}

const ProgressDetailModal: React.FC<ProgressDetailModalProps> = ({
  student,
  unit,
  existingProgress,
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen || !student) return null;
  return (
    <ProgressDetailModalInner
      key={`${student.id}-${unit.id}`}
      student={student}
      unit={unit}
      existingProgress={existingProgress}
      onClose={onClose}
      onSave={onSave}
    />
  );
};

const ProgressDetailModalInner: React.FC<{
  student: CourseRosterStudent;
  unit: CurriculumUnit;
  existingProgress?: StudentUnitProgress;
  onClose: () => void;
  onSave: (update: StudentUnitProgress) => void;
}> = ({ student, unit, existingProgress, onClose, onSave }) => {
  const titleId = useId();
  const [readingScore, setReadingScore] = useState(existingProgress?.readingScore ?? 0);
  const [listeningScore, setListeningScore] = useState(existingProgress?.listeningScore ?? 0);
  const [writingScore, setWritingScore] = useState(existingProgress?.writingScore ?? 0);
  const [speakingScore, setSpeakingScore] = useState(existingProgress?.speakingScore ?? 0);
  const [remark, setRemark] = useState(existingProgress?.remark ?? '');
  const [videoUrl, setVideoUrl] = useState(existingProgress?.videoUrl ?? '');
  const [isSentToParent, setIsSentToParent] = useState(existingProgress?.isSentToParent ?? false);

  const avg =
    readingScore + listeningScore + writingScore + speakingScore > 0
      ? Math.round((readingScore + listeningScore + writingScore + speakingScore) / 4)
      : undefined;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      studentId: student.id,
      unitId: unit.id,
      readingScore,
      listeningScore,
      writingScore,
      speakingScore,
      score: avg,
      remark: remark.trim() || undefined,
      videoUrl: videoUrl.trim() || undefined,
      isSentToParent,
    });
  };

  return (
    <div
      className="fixed inset-0 z-[75] flex items-center justify-center bg-midnight/40 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <Card className="max-h-[90vh] w-full max-w-lg overflow-y-auto p-0 shadow-xl animate-fade-in">
        <div className="flex items-center justify-between border-b border-midnight/10 bg-midnight px-6 py-4">
          <div>
            <h2 id={titleId} className="font-label text-sm font-semibold text-white md:text-base">
              Đánh giá unit: {unit.name}
            </h2>
            <p className="mt-1 font-body text-[10px] text-gold">{student.studentName}</p>
          </div>
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
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              min={0}
              max={10}
              label="Reading (R)"
              value={readingScore}
              onChange={(e) => setReadingScore(parseInt(e.target.value, 10) || 0)}
            />
            <Input
              type="number"
              min={0}
              max={10}
              label="Listening (L)"
              value={listeningScore}
              onChange={(e) => setListeningScore(parseInt(e.target.value, 10) || 0)}
            />
            <Input
              type="number"
              min={0}
              max={10}
              label="Writing (W)"
              value={writingScore}
              onChange={(e) => setWritingScore(parseInt(e.target.value, 10) || 0)}
            />
            <Input
              type="number"
              min={0}
              max={10}
              label="Speaking (S)"
              value={speakingScore}
              onChange={(e) => setSpeakingScore(parseInt(e.target.value, 10) || 0)}
            />
          </div>
          {avg !== undefined && avg > 0 ? (
            <p className="font-body text-xs text-midnight/60">
              Điểm TB (mock): <span className="font-semibold text-gold">{avg}</span>
            </p>
          ) : null}
          <TextArea label="Ghi chú" rows={3} value={remark} onChange={(e) => setRemark(e.target.value)} />
          <Input
            label="Link video speaking (tùy chọn)"
            placeholder="https://…"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
          <label className="flex cursor-pointer items-center gap-2 font-body text-xs text-midnight/70">
            <input
              type="checkbox"
              checked={isSentToParent}
              onChange={(e) => setIsSentToParent(e.target.checked)}
              className="rounded border-midnight/20 text-gold focus:ring-gold"
            />
            Đã gửi feedback cho phụ huynh
          </label>
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

export default ProgressDetailModal;
