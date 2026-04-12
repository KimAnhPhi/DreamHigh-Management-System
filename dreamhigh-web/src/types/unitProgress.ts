/** Đánh giá R-L-W-S theo unit (bảng tiến độ khóa). */
export interface StudentUnitProgress {
  studentId: string;
  unitId: string;
  readingScore?: number;
  listeningScore?: number;
  writingScore?: number;
  speakingScore?: number;
  score?: number;
  remark?: string;
  videoUrl?: string;
  isSentToParent?: boolean;
}
