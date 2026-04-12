/** Định dạng số tiền VND (không ký hiệu thay thế, dùng tiếng Việt). */
export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount);
}
