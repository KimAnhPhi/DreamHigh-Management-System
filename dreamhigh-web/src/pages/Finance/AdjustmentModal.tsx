import React, { useId, useState } from 'react';
import { CircleAlert, TrendingDown, TrendingUp, X } from 'lucide-react';
import { Button } from '../../design-system/components/ui/Button';
import { Card } from '../../design-system/components/ui/Card';
import { Input, TextArea } from '../../design-system/components/ui/Input';
import type { CompensationAdjustmentData } from '../../types/teacherCompensation';

export interface AdjustmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CompensationAdjustmentData) => void;
  initialData: CompensationAdjustmentData;
  teacherName: string;
}

/** Mount lại khi mở modal để đồng bộ `initialData` không cần useEffect. */
const AdjustmentModal: React.FC<AdjustmentModalProps> = (props) => {
  if (!props.isOpen) return null;
  return <AdjustmentModalOpen {...props} />;
};

const AdjustmentModalOpen: React.FC<AdjustmentModalProps> = ({
  onClose,
  onSave,
  initialData,
  teacherName,
}) => {
  const titleId = useId();
  const [formData, setFormData] = useState<CompensationAdjustmentData>(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const mergeData = (partial: Partial<CompensationAdjustmentData>) => {
    setFormData((prev) => ({ ...prev, ...partial }));
  };

  return (
    <div
      className="custom-scrollbar fixed inset-0 z-[100] flex items-center justify-center bg-midnight/55 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <Card className="flex w-full max-w-xl flex-col overflow-hidden p-0 shadow-xl animate-fade-in">
        <div className="relative overflow-hidden bg-midnight px-6 py-6 md:px-8 md:py-8">
          <div className="pointer-events-none absolute -right-4 -top-4 h-32 w-32 rounded-full bg-gold/10 blur-2xl" />
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div>
              <h2
                id={titleId}
                className="font-label text-xl font-semibold uppercase tracking-tight text-white"
              >
                Điều chỉnh thù lao
              </h2>
              <p className="mt-1 font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                Giáo viên: {teacherName}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="relative z-10 rounded-full bg-white/10 p-2 text-white/60 transition-colors hover:bg-white/15 hover:text-white"
              aria-label="Đóng"
            >
              <X size={22} strokeWidth={2} aria-hidden />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex max-h-[min(70vh,520px)] flex-col">
          <div className="space-y-8 overflow-y-auto p-6 md:p-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-success p-1.5 text-white">
                  <TrendingUp size={14} strokeWidth={2} aria-hidden />
                </span>
                <h3 className="font-label text-[11px] font-semibold uppercase tracking-widest text-success">
                  Khen thưởng &amp; phụ cấp (+)
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <Input
                  type="number"
                  min={0}
                  label="Số tiền thưởng (VNĐ)"
                  value={formData.bonus === 0 ? '' : String(formData.bonus)}
                  onChange={(e) => mergeData({ bonus: parseInt(e.target.value, 10) || 0 })}
                  className="border-success/25 bg-success-bg font-body text-lg font-semibold text-success"
                />
                <TextArea
                  label="Lý do khen thưởng"
                  rows={2}
                  placeholder="VD: Thưởng KPI, chuyên cần…"
                  value={formData.bonusReason}
                  onChange={(e) => mergeData({ bonusReason: e.target.value })}
                  className="border-midnight/10 bg-bg font-body text-sm italic"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-error p-1.5 text-white">
                  <TrendingDown size={14} strokeWidth={2} aria-hidden />
                </span>
                <h3 className="font-label text-[11px] font-semibold uppercase tracking-widest text-error">
                  Khấu trừ &amp; phạt (−)
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <Input
                  type="number"
                  min={0}
                  label="Số tiền phạt (VNĐ)"
                  value={formData.penalty === 0 ? '' : String(formData.penalty)}
                  onChange={(e) => mergeData({ penalty: parseInt(e.target.value, 10) || 0 })}
                  className="border-error/25 bg-error-bg font-body text-lg font-semibold text-error"
                />
                <TextArea
                  label="Lý do khấu trừ"
                  rows={2}
                  placeholder="VD: Đi muộn, nộp log trễ…"
                  value={formData.penaltyReason}
                  onChange={(e) => mergeData({ penaltyReason: e.target.value })}
                  className="border-midnight/10 bg-bg font-body text-sm italic"
                />
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-info/25 bg-info-bg p-4">
              <CircleAlert className="mt-0.5 shrink-0 text-info" size={18} strokeWidth={2} aria-hidden />
              <p className="font-label text-[10px] font-semibold uppercase leading-relaxed text-info">
                Các thay đổi thù lao sẽ hiển thị trên bảng kê lương và phiếu thanh toán của giáo viên. (BR-FIN-04)
              </p>
            </div>
          </div>

          <div className="flex gap-3 border-t border-midnight/10 bg-bg p-6 md:p-8 md:pt-6">
            <Button type="button" variant="ghost" className="flex-1 py-4" onClick={onClose}>
              Huỷ
            </Button>
            <Button type="submit" variant="dark" className="flex-1 py-4 shadow-md">
              Cập nhật điều chỉnh
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AdjustmentModal;
