import React, { useEffect, useId, useState } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { Button } from '../../design-system/components/ui/Button';
import { Card } from '../../design-system/components/ui/Card';
import { Input, Select } from '../../design-system/components/ui/Input';
import { MOCK_COURSES, MOCK_CURRICULUM } from '../../mock/courseManagement';
import type { Class, ClassStatus } from '../../types/classSchedule';
export interface ClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Class) => void;
  initialData: Class | null;
}

function buildInitial(initialData: Class | null): Class {
  if (initialData) return { ...initialData };
  const first = MOCK_COURSES[0];
  return {
    id: `cls-${Date.now()}`,
    code: `L-${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0')}`,
    name: '',
    courseId: first.id,
    syllabusId: first.syllabusId,
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    maxStudents: 15,
    currentStudents: 0,
    status: 'Dự kiến',
    branchId: 'b1',
  };
}

const ClassModal: React.FC<ClassModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const titleId = useId();
  const [formData, setFormData] = useState<Class>(() => buildInitial(initialData));

  useEffect(() => {
    if (isOpen) {
      setFormData(buildInitial(initialData));
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const syllabus = MOCK_CURRICULUM.find((s) => s.id === formData.syllabusId);
  const sessionCount = syllabus?.lessons.length ?? 0;

  const merge = (p: Partial<Class>) => setFormData((prev) => ({ ...prev, ...p }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div
      className="custom-scrollbar fixed inset-0 z-[100] flex items-center justify-center bg-midnight/55 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <Card className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden p-0 shadow-xl animate-fade-in">
        <div className="flex items-center justify-between border-b border-midnight/10 bg-midnight px-8 py-6">
          <div>
            <h2 id={titleId} className="font-label text-lg font-semibold uppercase tracking-tight text-white">
              {initialData ? 'Cập nhật lớp học' : 'Mở lớp học mới'}
            </h2>
            <p className="mt-1 font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Class operation</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white/10 p-2 text-white/70 transition-colors hover:bg-white/15 hover:text-white"
            aria-label="Đóng"
          >
            <X size={24} strokeWidth={2} aria-hidden />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="custom-scrollbar max-h-[min(65vh,520px)] space-y-6 overflow-y-auto p-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <Select
                  label="Khóa học nguồn (bắt buộc)"
                  required
                  value={formData.courseId}
                  onChange={(e) => {
                    const course = MOCK_COURSES.find((c) => c.id === e.target.value);
                    merge({
                      courseId: e.target.value,
                      syllabusId: course?.syllabusId ?? '',
                    });
                  }}
                >
                  {MOCK_COURSES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Input
                  label="Mã lớp"
                  className="font-mono text-gold"
                  value={formData.code}
                  onChange={(e) => merge({ code: e.target.value.toUpperCase() })}
                />
              </div>
              <div>
                <Input
                  type="date"
                  label="Ngày dự kiến bắt đầu"
                  value={formData.startDate}
                  onChange={(e) => merge({ startDate: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <Input
                  label="Tên lớp hiển thị (bắt buộc)"
                  required
                  placeholder="VD: Starter 1 — Sáng Thứ 2/4…"
                  value={formData.name}
                  onChange={(e) => merge({ name: e.target.value })}
                />
              </div>
              <div>
                <Select
                  label="Trạng thái vận hành"
                  value={formData.status}
                  onChange={(e) => merge({ status: e.target.value as ClassStatus })}
                >
                  <option value="Dự kiến">Dự kiến (chưa có học viên)</option>
                  <option value="Đang học">Đang học</option>
                  <option value="Tạm dừng">Tạm dừng</option>
                  <option value="Kết thúc">Kết thúc</option>
                </Select>
              </div>
              <div>
                <Input
                  type="number"
                  label="Sĩ số tối đa"
                  value={formData.maxStudents}
                  onChange={(e) => merge({ maxStudents: parseInt(e.target.value, 10) || 15 })}
                />
              </div>
            </div>

            <div className="rounded-3xl border border-gold/20 bg-gold/[0.06] p-6">
              <p className="mb-2 flex items-center gap-2 font-label text-[10px] font-semibold uppercase tracking-widest text-gold">
                <ShieldCheck size={14} strokeWidth={2} className="shrink-0" aria-hidden /> Kế thừa khung đào tạo
              </p>
              <p className="font-body text-xs font-semibold text-midnight/75">
                Syllabus áp dụng:{' '}
                <span className="text-midnight">{syllabus?.name || 'Chưa chọn'}</span>
              </p>
              <p className="mt-2 font-body text-[10px] italic text-midnight/45">
                Sau khi kích hoạt lớp, có thể gắn {sessionCount} buổi theo khung syllabus (mock).
              </p>
            </div>
          </div>

          <div className="flex gap-4 border-t border-midnight/10 bg-bg p-8">
            <Button type="button" variant="ghost" className="flex-1 py-4" onClick={onClose}>
              Huỷ
            </Button>
            <Button type="submit" className="flex-1 py-4 shadow-md">
              {initialData ? 'Lưu cập nhật' : 'Mở lớp'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ClassModal;
