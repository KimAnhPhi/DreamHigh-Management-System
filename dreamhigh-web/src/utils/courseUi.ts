/** Class token cho badge trạng thái khóa học / học viên (DS). */
export function getCourseStatusStyles(status: string): string {
  switch (status) {
    case 'Đang học':
      return 'border-success/25 bg-success-bg text-success';
    case 'Đang mở':
      return 'border-warning/25 bg-warning-bg text-warning';
    case 'Hoàn thành':
      return 'border-info/25 bg-info-bg text-info';
    case 'Khởi tạo':
      return 'border-midnight/15 bg-midnight/5 text-midnight/65';
    case 'Ngừng':
      return 'border-error/25 bg-error-bg text-error';
    default:
      return 'border-midnight/10 bg-midnight/5 text-midnight/50';
  }
}

/** Badge buổi học (nhật ký). */
export function getLessonExecutionStyles(status: string): string {
  switch (status) {
    case 'Đã hoàn thành':
      return 'border-success/25 bg-success-bg text-success';
    case 'Đang dạy':
      return 'border-info/25 bg-info-bg text-info';
    case 'Huỷ':
      return 'border-error/25 bg-error-bg text-error';
    case 'Chưa diễn ra':
    default:
      return 'border-midnight/15 bg-midnight/5 text-midnight/55';
  }
}
