export interface CompensationAdjustmentData {
  bonus: number;
  bonusReason: string;
  penalty: number;
  penaltyReason: string;
}

/** Alias tương thích tên gọi cũ (prototype). */
export type AdjustmentData = CompensationAdjustmentData;
