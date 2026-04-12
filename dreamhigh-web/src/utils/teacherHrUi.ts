import type { PayrollSettlementStatus, TeacherStatus, TeacherType } from '../types/teacherHr';

export function getTeacherStatusClass(status: TeacherStatus): string {
  switch (status) {
    case 'Đang làm việc':
      return 'border-success/25 bg-success-bg text-success';
    case 'Tạm nghỉ':
      return 'border-warning/25 bg-warning-bg text-warning';
    case 'Đã nghỉ việc':
    default:
      return 'border-error/25 bg-error-bg text-error';
  }
}

export function getTeacherTypeChipClass(type: TeacherType): string {
  switch (type) {
    case 'Foreign':
      return 'border-warning/25 bg-warning-bg text-warning';
    case 'Vietnamese':
      return 'border-info/25 bg-info-bg text-info';
    case 'Assistant':
    default:
      return 'border-midnight/15 bg-midnight/5 text-midnight/55';
  }
}

export function getPayrollSettlementClass(status: PayrollSettlementStatus): string {
  switch (status) {
    case 'Đã thanh toán':
      return 'border-success/25 bg-success-bg text-success';
    case 'Chờ thanh toán':
    default:
      return 'border-warning/25 bg-warning-bg text-warning';
  }
}

export function formatTeacherTypeLabel(type: TeacherType): string {
  switch (type) {
    case 'Foreign':
      return 'Nước ngoài';
    case 'Vietnamese':
      return 'Việt Nam';
    case 'Assistant':
      return 'Trợ giảng';
    default:
      return type;
  }
}
