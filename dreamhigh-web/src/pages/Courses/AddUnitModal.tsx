import React, { useId, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../design-system/components/ui/Button';
import { Card } from '../../design-system/components/ui/Card';
import { Input, TextArea } from '../../design-system/components/ui/Input';
import type { CurriculumUnit } from '../../types/curriculum';

export interface AddUnitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (unit: CurriculumUnit) => void;
}

const defaultDescription = 'No description provided.';

const AddUnitModal: React.FC<AddUnitModalProps> = ({ isOpen, onClose, onSave }) => {
  const titleId = useId();
  const nameFieldId = useId();
  const descFieldId = useId();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      id: `u-${Date.now()}`,
      name: name.trim(),
      description: description.trim() || defaultDescription,
    });
    setName('');
    setDescription('');
  };

  const handleClose = () => {
    setName('');
    setDescription('');
    onClose();
  };

  return (
    <div
      className="custom-scrollbar fixed inset-0 z-[100] flex items-center justify-center bg-midnight/55 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <Card className="w-full max-w-md overflow-hidden p-0 shadow-xl animate-fade-in">
        <div className="flex items-center justify-between bg-midnight px-6 py-5">
          <div>
            <h2
              id={titleId}
              className="font-label text-lg font-semibold uppercase tracking-tight text-white"
            >
              Thêm Unit mới
            </h2>
            <p className="mt-0.5 font-label text-[10px] font-semibold uppercase tracking-widest text-gold">
              Assessment milestone
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-md p-1 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Đóng"
          >
            <X size={20} strokeWidth={2} aria-hidden />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-8">
          <Input
            id={nameFieldId}
            label="Tên Unit / Kỳ kiểm tra (bắt buộc)"
            type="text"
            required
            autoFocus
            placeholder="VD: Unit 5, Midterm 2, Final Test..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextArea
            id={descFieldId}
            label="Mô tả mục tiêu đánh giá"
            placeholder="Nội dung kiểm tra, tiêu chí đạt..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-20"
          />

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="ghost" className="flex-1" onClick={handleClose}>
              Hủy
            </Button>
            <Button type="submit" className="flex-1 shadow-md shadow-gold/20">
              Tạo Unit
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddUnitModal;
