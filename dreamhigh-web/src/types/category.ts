/** Trạng thái vận hành danh mục — dùng chung list / modal / chi tiết. */
export type CategoryStatus = 'Hiệu lực' | 'Ngừng hiệu lực';

/** @deprecated Dùng `CategoryStatus` (đồng bộ UI mới). */
export type CategoryOperationalStatus = CategoryStatus;

export interface Category {
  id: string;
  code: string;
  name: string;
  type: string;
  description?: string;
  status: CategoryStatus;
}

export type CategoryDraft = Omit<Category, 'id'>;
