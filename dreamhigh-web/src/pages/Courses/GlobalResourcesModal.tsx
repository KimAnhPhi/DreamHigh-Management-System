import React, { useId, useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '../../design-system/components/ui/Button';
import { Card } from '../../design-system/components/ui/Card';
import { Input } from '../../design-system/components/ui/Input';
import type { CurriculumProgram } from '../../types/curriculum';

export interface GlobalResourcesModalProps {
  program: CurriculumProgram;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Pick<CurriculumProgram, 'textbook' | 'studentBook' | 'brochure' | 'globalMaterials'>) => void;
}

type ResourceKey = 'textbook' | 'studentBook' | 'brochure' | 'globalMaterials';

const GlobalResourcesModal: React.FC<GlobalResourcesModalProps> = ({ program, isOpen, onClose, onSave }) => {
  if (!isOpen) return null;
  return <GlobalResourcesModalInner key={program.id} program={program} onClose={onClose} onSave={onSave} />;
};

const GlobalResourcesModalInner: React.FC<Omit<GlobalResourcesModalProps, 'isOpen'>> = ({
  program,
  onClose,
  onSave,
}) => {
  const titleId = useId();
  const [textbook, setTextbook] = useState(program.textbook);
  const [studentBook, setStudentBook] = useState(program.studentBook || '');
  const [brochure, setBrochure] = useState(program.brochure || '');
  const [globalMaterials, setGlobalMaterials] = useState(program.globalMaterials || '');

  const refs = useRef<Record<ResourceKey, HTMLInputElement | null>>({
    textbook: null,
    studentBook: null,
    brochure: null,
    globalMaterials: null,
  });

  const attachFile = (field: ResourceKey, e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const name = f.name;
    switch (field) {
      case 'textbook':
        setTextbook(name);
        break;
      case 'studentBook':
        setStudentBook(name);
        break;
      case 'brochure':
        setBrochure(name);
        break;
      case 'globalMaterials':
        setGlobalMaterials(name);
        break;
    }
  };

  const row = (label: string, value: string, onChange: (v: string) => void, field: ResourceKey) => (
    <div className="flex flex-col gap-2">
      <span className="input-label">{label}</span>
      <div className="flex gap-2">
        <Input
          className="flex-1"
          placeholder="Tên file hoặc link…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <input
          type="file"
          className="hidden"
          ref={(el) => {
            refs.current[field] = el;
          }}
          onChange={(e) => attachFile(field, e)}
        />
        <Button
          type="button"
          variant="secondary"
          className="shrink-0 px-3"
          title="Tải lên"
          onClick={() => refs.current[field]?.click()}
        >
          <Upload size={18} strokeWidth={2} aria-hidden />
        </Button>
      </div>
    </div>
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ textbook, studentBook, brochure, globalMaterials });
  };

  return (
    <div
      className="fixed inset-0 z-[65] flex items-center justify-center bg-midnight/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <Card className="w-full max-w-lg overflow-hidden p-0 shadow-xl animate-fade-in">
        <div className="flex items-center justify-between bg-midnight px-6 py-4">
          <h2 id={titleId} className="font-headline text-lg italic text-gold">
            Học liệu toàn khóa
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
          {row('Coursebook (giáo trình)', textbook, setTextbook, 'textbook')}
          {row('Student Book', studentBook, setStudentBook, 'studentBook')}
          {row('Brochure', brochure, setBrochure, 'brochure')}
          {row('Học liệu khác (global)', globalMaterials, setGlobalMaterials, 'globalMaterials')}
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="ghost" className="flex-1" onClick={onClose}>
              Đóng
            </Button>
            <Button type="submit" className="flex-1">
              Lưu học liệu
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default GlobalResourcesModal;
