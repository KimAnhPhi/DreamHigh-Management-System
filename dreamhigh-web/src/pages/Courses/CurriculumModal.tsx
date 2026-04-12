import React, { useId, useRef, useState } from 'react';
import { Bookmark, Calendar, ClipboardList, Library, Upload, X } from 'lucide-react';
import { Button } from '../../design-system/components/ui/Button';
import { Card } from '../../design-system/components/ui/Card';
import { Input, Select, TextArea } from '../../design-system/components/ui/Input';
import type { CurriculumProgram, CurriculumProgramDraft, SyllabusStatus } from '../../types/curriculum';

export interface CurriculumModalProps {
  program: CurriculumProgram | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CurriculumProgramDraft) => void;
}

type MaterialField = 'textbook' | 'studentBook' | 'brochure' | 'globalMaterials';

function buildForm(program: CurriculumProgram | null): CurriculumProgramDraft {
  if (program) {
    return {
      code: program.code,
      name: program.name,
      description: program.description,
      totalLevels: program.totalLevels,
      targetAudience: program.targetAudience,
      textbook: program.textbook,
      studentBook: program.studentBook || '',
      globalMaterials: program.globalMaterials || '',
      brochure: program.brochure || '',
      status: program.status,
      hoursPerSession: program.hoursPerSession,
      totalSessions: program.totalSessions || 24,
      entryRequirements: program.entryRequirements || '',
      exitRequirements: program.exitRequirements || '',
      units: program.units || [],
    };
  }
  const autoCode = `SYL-${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0')}`;
  return {
    code: autoCode,
    name: '',
    description: '',
    totalLevels: 1,
    targetAudience: '',
    textbook: '',
    studentBook: '',
    globalMaterials: '',
    brochure: '',
    status: 'Khởi tạo',
    hoursPerSession: 1.5,
    totalSessions: 24,
    entryRequirements: '',
    exitRequirements: '',
    units: [],
  };
}

const CurriculumModal: React.FC<CurriculumModalProps> = ({ isOpen, program, onClose, onSave }) => {
  if (!isOpen) return null;
  return <CurriculumModalInner key={program?.id ?? 'new'} program={program} onClose={onClose} onSave={onSave} />;
};

const CurriculumModalInner: React.FC<Omit<CurriculumModalProps, 'isOpen'>> = ({ program, onClose, onSave }) => {
  const titleId = useId();
  const [formData, setFormData] = useState<CurriculumProgramDraft>(() => buildForm(program));
  const merge = (p: Partial<CurriculumProgramDraft>) => setFormData((prev) => ({ ...prev, ...p }));

  const fileRefs = useRef<Record<MaterialField, HTMLInputElement | null>>({
    textbook: null,
    studentBook: null,
    brochure: null,
    globalMaterials: null,
  });

  const handleFile = (field: MaterialField, e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) merge({ [field]: f.name } as Partial<CurriculumProgramDraft>);
  };

  const uploadRow = (label: string, field: MaterialField) => (
    <div className="flex flex-col gap-2">
      <span className="input-label">{label}</span>
      <div className="flex gap-2">
        <Input
          className="flex-1"
          placeholder="Tên file hoặc link…"
          value={String(formData[field] ?? '')}
          onChange={(e) => merge({ [field]: e.target.value } as Partial<CurriculumProgramDraft>)}
        />
        <input
          type="file"
          className="hidden"
          ref={(el) => {
            fileRefs.current[field] = el;
          }}
          onChange={(e) => handleFile(field, e)}
        />
        <Button
          type="button"
          variant="secondary"
          className="shrink-0 px-3"
          title="Tải lên"
          onClick={() => fileRefs.current[field]?.click()}
        >
          <Upload size={18} strokeWidth={2} aria-hidden />
        </Button>
      </div>
    </div>
  );

  const totalDuration = (formData.hoursPerSession * formData.totalSessions).toFixed(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-midnight/40 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <Card className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden p-0 shadow-xl animate-fade-in">
        <div className="relative overflow-hidden bg-midnight px-6 py-6 md:px-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div>
              <h2 id={titleId} className="font-label text-xl font-semibold uppercase tracking-tight text-white md:text-2xl">
                {program ? 'Hiệu chỉnh Syllabus' : 'Kiến tạo chương trình mới'}
              </h2>
              <p className="mt-1 font-body text-xs font-semibold uppercase tracking-widest text-gold">
                Học liệu &amp; lộ trình đào tạo
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
          <div className="max-h-[min(72vh,620px)] space-y-8 overflow-y-auto p-6 md:p-10">
            <section className="space-y-6">
              <div className="flex items-center gap-3 border-b border-midnight/10 pb-3">
                <span className="rounded-lg bg-gold p-1.5 text-midnight">
                  <Bookmark size={18} strokeWidth={2} aria-hidden />
                </span>
                <h3 className="font-label text-sm font-semibold uppercase tracking-widest text-midnight">
                  01. Thông tin cơ bản
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                <div className="md:col-span-1">
                  <Input
                    label="Mã Syllabus"
                    className="font-mono text-gold"
                    value={formData.code}
                    onChange={(e) => merge({ code: e.target.value.toUpperCase() })}
                    placeholder="VD: SYL-KIDS-01"
                  />
                </div>
                <div className="md:col-span-3">
                  <Input
                    label="Tên chương trình đào tạo (bắt buộc)"
                    required
                    value={formData.name}
                    onChange={(e) => merge({ name: e.target.value })}
                    placeholder="VD: Tiếng Anh Giao tiếp Level 1…"
                  />
                </div>
                <div className="md:col-span-1">
                  <Select label="Trạng thái" value={formData.status} onChange={(e) => merge({ status: e.target.value as SyllabusStatus })}>
                    <option value="Khởi tạo">Khởi tạo</option>
                    <option value="Hiệu lực">Hiệu lực</option>
                    <option value="Ngừng sử dụng">Ngừng sử dụng</option>
                  </Select>
                </div>
                <div className="md:col-span-1">
                  <Input
                    label="Đối tượng học viên"
                    value={formData.targetAudience}
                    onChange={(e) => merge({ targetAudience: e.target.value })}
                    placeholder="VD: Trẻ 6–10 tuổi"
                  />
                </div>
                <div className="md:col-span-4">
                  <TextArea
                    label="Mô tả chi tiết"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => merge({ description: e.target.value })}
                    placeholder="Mục tiêu, lộ trình tóm tắt…"
                  />
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-3 border-b border-midnight/10 pb-3">
                <span className="rounded-lg bg-midnight p-1.5 text-gold">
                  <Calendar size={18} strokeWidth={2} aria-hidden />
                </span>
                <h3 className="font-label text-sm font-semibold uppercase tracking-widest text-midnight">
                  02. Thời lượng &amp; lộ trình
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-6 rounded-3xl border border-gold/15 bg-gold/[0.06] p-6 md:grid-cols-4">
                <div>
                  <Input
                    type="number"
                    label="Số buổi học"
                    value={formData.totalSessions}
                    onChange={(e) => merge({ totalSessions: parseInt(e.target.value, 10) || 0 })}
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    step={0.5}
                    label="Giờ / buổi"
                    value={formData.hoursPerSession}
                    onChange={(e) => merge({ hoursPerSession: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div className="md:col-span-2 flex flex-col justify-end">
                  <div className="rounded-2xl border border-gold/25 bg-bg/90 p-4 backdrop-blur">
                    <p className="input-label mb-1">Tổng thời lượng</p>
                    <p className="font-headline text-2xl italic text-gold">
                      {totalDuration}{' '}
                      <span className="font-body text-sm font-semibold not-italic text-midnight/60">giờ</span>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-3 border-b border-midnight/10 pb-3">
                <span className="rounded-lg bg-info p-1.5 text-white">
                  <Library size={18} strokeWidth={2} aria-hidden />
                </span>
                <h3 className="font-label text-sm font-semibold uppercase tracking-widest text-midnight">
                  03. Học liệu &amp; tài liệu
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {uploadRow('01. Coursebook', 'textbook')}
                {uploadRow('02. Student Book', 'studentBook')}
                {uploadRow('03. Brochure', 'brochure')}
                {uploadRow('04. Học liệu khác (global)', 'globalMaterials')}
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-3 border-b border-midnight/10 pb-3">
                <span className="rounded-lg bg-success p-1.5 text-white">
                  <ClipboardList size={18} strokeWidth={2} aria-hidden />
                </span>
                <h3 className="font-label text-sm font-semibold uppercase tracking-widest text-midnight">
                  04. Tiêu chuẩn đào tạo
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <TextArea
                  label="Điều kiện đầu vào"
                  rows={4}
                  value={formData.entryRequirements}
                  onChange={(e) => merge({ entryRequirements: e.target.value })}
                  placeholder="Entry requirements…"
                />
                <TextArea
                  label="Cam kết đầu ra"
                  rows={4}
                  value={formData.exitRequirements}
                  onChange={(e) => merge({ exitRequirements: e.target.value })}
                  placeholder="Exit outcomes…"
                />
              </div>
            </section>
          </div>

          <div className="flex gap-3 border-t border-midnight/10 bg-bg p-6 md:px-10">
            <Button type="button" variant="ghost" className="flex-1 py-4" onClick={onClose}>
              Huỷ
            </Button>
            <Button type="submit" className="flex-1 py-4 shadow-md">
              {program ? 'Cập nhật Syllabus' : 'Khởi tạo Syllabus'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CurriculumModal;
