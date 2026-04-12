import React, { useId, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../design-system/components/ui/Button';
import { Card } from '../../design-system/components/ui/Card';
import { Input, Select, TextArea } from '../../design-system/components/ui/Input';
import { CATEGORY_TYPES } from '../../mock/categoryManagement';
import type { Category, CategoryDraft, CategoryStatus } from '../../types/category';

export interface CategoryModalProps {
  category: Category | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CategoryDraft) => void;
}

function buildForm(category: Category | null): CategoryDraft {
  if (category) {
    return {
      code: category.code,
      name: category.name,
      description: category.description ?? '',
      type: category.type,
      status: category.status,
    };
  }
  return {
    code: '',
    name: '',
    description: '',
    type: CATEGORY_TYPES[0] ?? '',
    status: 'Hiệu lực',
  };
}

const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, ...props }) => {
  if (!isOpen) return null;
  return <CategoryModalInner {...props} />;
};

const CategoryModalInner: React.FC<Omit<CategoryModalProps, 'isOpen'>> = ({ category, onClose, onSave }) => {
  const titleId = useId();
  const [formData, setFormData] = useState<CategoryDraft>(() => buildForm(category));

  const merge = (partial: Partial<CategoryDraft>) => setFormData((p) => ({ ...p, ...partial }));

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
      <Card className="max-h-[90vh] w-full max-w-lg overflow-y-auto p-0 shadow-xl animate-fade-in">
        <div className="flex items-center justify-between bg-midnight px-6 py-5">
          <h2 id={titleId} className="font-headline text-xl italic text-gold">
            {category ? 'Cập nhật danh mục' : 'Thêm mới danh mục'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Đóng"
          >
            <X size={24} strokeWidth={2} aria-hidden />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-8">
          <Input
            label="Mã danh mục (bắt buộc)"
            disabled={!!category}
            required
            placeholder="VD: PH01, CA_SANG…"
            value={formData.code}
            onChange={(e) => merge({ code: e.target.value.toUpperCase() })}
          />
          {category && (
            <p className="font-body text-[10px] italic text-midnight/45">
              BR-03: Không đổi mã sau khi đã tạo (mock).
            </p>
          )}

          <Input
            label="Tên hiển thị (bắt buộc)"
            required
            placeholder="Tên danh mục…"
            value={formData.name}
            onChange={(e) => merge({ name: e.target.value })}
          />

          <TextArea
            label="Mô tả chi tiết"
            rows={3}
            placeholder="Mô tả thêm…"
            value={formData.description}
            onChange={(e) => merge({ description: e.target.value })}
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Select label="Loại danh mục" value={formData.type} onChange={(e) => merge({ type: e.target.value })}>
              {CATEGORY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>

            <Select
              label="Trạng thái"
              value={formData.status}
              onChange={(e) => merge({ status: e.target.value as CategoryStatus })}
            >
              <option value="Hiệu lực">Hiệu lực</option>
              <option value="Ngừng hiệu lực">Ngừng hiệu lực</option>
            </Select>
          </div>

          <div className="flex gap-3 border-t border-midnight/10 pt-6">
            <Button type="button" variant="ghost" className="flex-1" onClick={onClose}>
              Huỷ
            </Button>
            <Button type="submit" className="flex-1 shadow-md">
              Lưu thay đổi
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CategoryModal;
