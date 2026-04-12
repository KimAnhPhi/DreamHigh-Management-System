import { useId, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../design-system/components/ui/Button';
import { Card } from '../../design-system/components/ui/Card';
import { Input, Select } from '../../design-system/components/ui/Input';

export type CourseCatalogRow = {
  id: number;
  code: string;
  name: string;
  levelId: number;
  totalSessions: number;
  durationWeeks: number | null;
  tuitionFee: unknown;
  status: string;
  level?: { name: string; program?: { name: string; code: string } };
};

export type CourseCatalogForm = {
  code: string;
  name: string;
  levelId: number;
  totalSessions: number;
  durationWeeks: string;
  tuitionFee: string;
  status: string;
};

type LevelOption = { id: number; code: string; name: string; program?: { code: string } };

export interface CourseCatalogModalProps {
  course: CourseCatalogRow | null;
  levels: LevelOption[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CourseCatalogForm) => void;
  isSubmitting?: boolean;
}

function buildForm(course: CourseCatalogRow | null, levels: LevelOption[]): CourseCatalogForm {
  if (course) {
    const fee =
      course.tuitionFee != null && course.tuitionFee !== ''
        ? String(course.tuitionFee)
        : '';
    return {
      code: course.code,
      name: course.name,
      levelId: course.levelId,
      totalSessions: course.totalSessions,
      durationWeeks: course.durationWeeks != null ? String(course.durationWeeks) : '',
      tuitionFee: fee,
      status: course.status,
    };
  }
  const first = levels[0];
  return {
    code: '',
    name: '',
    levelId: first?.id ?? 0,
    totalSessions: 24,
    durationWeeks: '',
    tuitionFee: '',
    status: 'ACTIVE',
  };
}

export default function CourseCatalogModal({
  isOpen,
  course,
  levels,
  onClose,
  onSave,
  isSubmitting,
}: CourseCatalogModalProps) {
  const titleId = useId();
  const [form, setForm] = useState<CourseCatalogForm>(() => buildForm(course, levels));

  if (!isOpen) return null;

  const merge = (p: Partial<CourseCatalogForm>) => setForm((prev) => ({ ...prev, ...p }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-midnight/45 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <Card className="max-h-[90vh] w-full max-w-lg overflow-y-auto p-0 shadow-xl">
        <div className="flex items-center justify-between border-b border-midnight/10 bg-midnight px-6 py-4">
          <h2 id={titleId} className="font-label text-lg font-semibold text-white">
            {course ? 'Cập nhật khóa học' : 'Thêm khóa học'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-white/60 hover:bg-white/10 hover:text-white"
            aria-label="Đóng"
          >
            <X size={22} aria-hidden />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <Input
            label="Mã khóa học"
            required
            disabled={!!course}
            value={form.code}
            onChange={(e) => merge({ code: e.target.value })}
            placeholder="VD: CRS-IELTS-L3"
          />
          <Input
            label="Tên khóa học"
            required
            value={form.name}
            onChange={(e) => merge({ name: e.target.value })}
          />
          <Select
            label="Cấp độ (Level)"
            required
            value={form.levelId ? String(form.levelId) : ''}
            onChange={(e) => merge({ levelId: Number(e.target.value) })}
          >
            <option value="">— Chọn cấp độ —</option>
            {levels.map((l) => (
              <option key={l.id} value={l.id}>
                {l.program?.code ? `${l.program.code} / ` : ''}
                {l.code} — {l.name}
              </option>
            ))}
          </Select>
          <Input
            label="Tổng số buổi"
            type="number"
            min={1}
            required
            value={form.totalSessions}
            onChange={(e) => merge({ totalSessions: Number(e.target.value) || 0 })}
          />
          <Input
            label="Thời lượng (tuần, tuỳ chọn)"
            type="number"
            min={0}
            value={form.durationWeeks}
            onChange={(e) => merge({ durationWeeks: e.target.value })}
          />
          <Input
            label="Học phí gợi ý (tuỳ chọn)"
            type="number"
            step="0.01"
            min={0}
            value={form.tuitionFee}
            onChange={(e) => merge({ tuitionFee: e.target.value })}
          />
          <Select label="Trạng thái" value={form.status} onChange={(e) => merge({ status: e.target.value })}>
            <option value="ACTIVE">Hoạt động</option>
            <option value="INACTIVE">Ngừng áp dụng</option>
          </Select>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Huỷ
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Đang lưu...' : 'Lưu'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
