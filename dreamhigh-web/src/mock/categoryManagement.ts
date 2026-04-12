import type { Category } from '../types/category';

export const CATEGORY_TYPES: string[] = [
  'Chương trình học',
  'Cấp độ',
  'Phòng học',
  'Ca học',
  'Loại phí',
];

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'c1',
    code: 'PRG-IELTS',
    name: 'IELTS Academic',
    type: 'Chương trình học',
    description: 'Lộ trình luyện thi IELTS 4 kỹ năng, mock test định kỳ.',
    status: 'Hiệu lực',
  },
  {
    id: 'c2',
    code: 'LV-B1',
    name: 'B1 Foundation',
    type: 'Cấp độ',
    description: 'Khối nền tảng phản xạ giao tiếp.',
    status: 'Hiệu lực',
  },
  {
    id: 'c3',
    code: 'ROOM-A1',
    name: 'Phòng đa năng A1',
    type: 'Phòng học',
    description: 'Tầng 2, tối đa 12 học viên.',
    status: 'Ngừng hiệu lực',
  },
];
