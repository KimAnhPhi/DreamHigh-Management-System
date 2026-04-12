export type TeacherType = 'Vietnamese' | 'Foreign' | 'Assistant';

export type TeacherStatus = 'Đang làm việc' | 'Tạm nghỉ' | 'Đã nghỉ việc';

export type TeacherDocumentType = 'CV/Profile' | 'Bằng cấp' | 'Chứng chỉ' | 'Hợp đồng' | 'Khác';

export type TeachingSessionType = 'Offline' | 'Online';

export interface TeacherDocument {
  id: string;
  name: string;
  type: TeacherDocumentType;
  fileName?: string;
  fileUrl?: string;
  uploadDate?: string;
}

export interface TeacherRates {
  offlineRate: number;
  onlineRate: number;
}

export interface Teacher {
  id: string;
  code: string;
  name: string;
  type: TeacherType;
  email: string;
  phone: string;
  address?: string;
  specialization: string[];
  rates: TeacherRates;
  status: TeacherStatus;
  performanceScore: number;
  joinDate: string;
  documents: TeacherDocument[];
}

export interface TeachingLog {
  id: string;
  teacherId: string;
  courseId: string;
  courseName: string;
  date: string;
  type: TeachingSessionType;
  hours: number;
  rateUsed: number;
  totalAmount: number;
  rating: number;
}

export type PayrollSettlementStatus = 'Đã thanh toán' | 'Chờ thanh toán';

export interface TeacherPayrollRecord {
  id: string;
  teacherId: string;
  period: string;
  totalHours: number;
  totalAmount: number;
  bonus?: number;
  finalAmount: number;
  status: PayrollSettlementStatus;
}
