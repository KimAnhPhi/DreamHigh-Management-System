import React, { useId } from 'react';
import { Share2, X } from 'lucide-react';
import { Button } from '../../design-system/components/ui/Button';
import { Card } from '../../design-system/components/ui/Card';
import { TextArea } from '../../design-system/components/ui/Input';
import type { CompensationAdjustmentData } from '../../types/teacherCompensation';
import type { Teacher } from '../../types/teacherHr';

export interface PayrollSlipLine {
  courseName: string;
  hours: number;
  rate: number;
  amount: number;
}

export interface PayrollSlipModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: Teacher;
  period: string;
  items: PayrollSlipLine[];
  adjustments: CompensationAdjustmentData;
  totalBase: number;
  finalAmount: number;
  onSendConfirmation: () => void;
}

const formatVnd = (n: number) => n.toLocaleString('vi-VN') + 'đ';

const PayrollSlipModal: React.FC<PayrollSlipModalProps> = (props) => {
  if (!props.isOpen) return null;
  return <PayrollSlipModalInner {...props} />;
};

const PayrollSlipModalInner: React.FC<PayrollSlipModalProps> = ({
  onClose,
  teacher,
  period,
  items,
  adjustments,
  totalBase,
  finalAmount,
  onSendConfirmation,
}) => {
  const titleId = useId();

  const body = `PHIẾU THÙ LAO KỲ ${period}
Giáo viên: ${teacher.name} (${teacher.code})

Chi tiết theo lớp:
${items.map((i) => `- ${i.courseName}: ${i.hours}h × ${formatVnd(i.rate)} → ${formatVnd(i.amount)}`).join('\n')}

Thù lao giảng dạy: ${formatVnd(totalBase)}
Thưởng (+): ${formatVnd(adjustments.bonus)} — ${adjustments.bonusReason}
Khấu trừ (−): ${formatVnd(adjustments.penalty)} — ${adjustments.penaltyReason}

THỰC NHẬN: ${formatVnd(finalAmount)}

(Mock — xác nhận qua app nội bộ / email.)`;

  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center bg-midnight/55 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <Card className="max-h-[90vh] w-full max-w-xl overflow-hidden p-0 shadow-xl animate-fade-in">
        <div className="flex items-center justify-between border-b border-midnight/10 bg-midnight px-6 py-5">
          <h2 id={titleId} className="font-label text-base font-semibold uppercase tracking-tight text-white">
            Phiếu lương &amp; xác nhận
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-white/60 hover:bg-white/10 hover:text-white"
            aria-label="Đóng"
          >
            <X size={24} strokeWidth={2} aria-hidden />
          </button>
        </div>
        <div className="space-y-6 p-8">
          <TextArea readOnly rows={14} className="font-mono text-xs text-midnight/80" value={body} />
          <div className="grid grid-cols-2 gap-4 border-t border-midnight/10 pt-6">
            <Button type="button" variant="ghost" className="py-4" onClick={onClose}>
              Đóng
            </Button>
            <Button
              type="button"
              className="gap-2 py-4"
              onClick={() => {
                onSendConfirmation();
                onClose();
              }}
            >
              <Share2 size={18} strokeWidth={2} aria-hidden />
              Gửi xác nhận
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PayrollSlipModal;
