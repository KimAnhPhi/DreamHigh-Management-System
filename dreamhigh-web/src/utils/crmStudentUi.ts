import type { CoursePaymentStatus, CrmStudentStatus, PaymentPeriodStatus } from '../types/crmStudent';

export function getCrmStudentStatusClass(status: CrmStudentStatus): string {
  switch (status) {
    case 'Đang học':
      return 'border-success/25 bg-success-bg text-success';
    case 'Bảo lưu':
      return 'border-warning/25 bg-warning-bg text-warning';
    case 'Nghỉ học':
    default:
      return 'border-error/25 bg-error-bg text-error';
  }
}

export function getCoursePaymentStatusClass(status: CoursePaymentStatus): string {
  switch (status) {
    case 'Đã thanh toán':
      return 'border-success/25 bg-success-bg text-success';
    case 'Kỳ cần thanh toán':
      return 'border-warning/25 bg-warning-bg text-warning';
    case 'Quá hạn':
    default:
      return 'border-error/25 bg-error-bg text-error';
  }
}

export function getPaymentPeriodStatusClass(status: PaymentPeriodStatus): string {
  switch (status) {
    case 'Đã đóng':
      return 'border-success/25 bg-success-bg text-success';
    case 'Quá hạn':
      return 'border-error/30 bg-error-bg text-error animate-pulse';
    case 'Chờ đóng':
    default:
      return 'border-midnight/15 bg-midnight/5 text-midnight/50';
  }
}
