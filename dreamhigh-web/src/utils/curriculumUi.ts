import type { CurriculumLessonStatus } from '../types/curriculum';

export function getSyllabusStatusCardClass(status: string): string {
  switch (status) {
    case 'Hiệu lực':
      return 'bg-gold text-midnight';
    case 'Khởi tạo':
      return 'bg-warning text-midnight';
    case 'Ngừng sử dụng':
    default:
      return 'bg-midnight/35 text-white';
  }
}

export function getSyllabusStatusBadgeClass(status: string): string {
  switch (status) {
    case 'Hiệu lực':
      return 'border-success/25 bg-success-bg text-success';
    case 'Khởi tạo':
      return 'border-warning/25 bg-warning-bg text-warning';
    case 'Ngừng sử dụng':
      return 'border-error/25 bg-error-bg text-error';
    default:
      return 'border-midnight/10 bg-midnight/5 text-midnight/50';
  }
}

export function getCurriculumLessonBadgeClass(status: CurriculumLessonStatus | string): string {
  switch (status) {
    case 'Đã hoàn thành':
      return 'border-success/25 bg-success-bg text-success';
    case 'Huỷ':
      return 'border-error/25 bg-error-bg text-error';
    case 'Chưa bắt đầu':
    default:
      return 'border-midnight/15 bg-midnight/5 text-midnight/55';
  }
}
