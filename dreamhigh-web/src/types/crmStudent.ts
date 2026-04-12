export type CrmStudentStatus = 'Đang học' | 'Bảo lưu' | 'Nghỉ học';

export type PaymentPeriodStatus = 'Đã đóng' | 'Quá hạn' | 'Chờ đóng';

export type CoursePaymentStatus = 'Đã thanh toán' | 'Kỳ cần thanh toán' | 'Quá hạn';

export interface PaymentRecord {
  id: string;
  periodName: string;
  amount: number;
  deadline?: string;
  status: PaymentPeriodStatus;
}

export interface StudentCourseRecord {
  courseId: string;
  courseName: string;
  isCurrent: boolean;
  enrollmentDate: string;
  finalScore?: number;
  paymentStatus: CoursePaymentStatus;
  originalFee: number;
  discountAmount: number;
  scholarship: string;
  finalFee: number;
  totalPeriods: number;
  amountPerPeriod: number;
  paymentHistory?: PaymentRecord[];
}

export interface StudentCertificate {
  id: string;
  name: string;
  issueDate: string;
  fileName?: string;
  fileUrl?: string;
}

export interface CrmStudent {
  id: string;
  studentCode: string;
  studentName: string;
  parentName: string;
  phone: string;
  email?: string;
  address?: string;
  birthday?: string;
  entryDate: string;
  entryLevel: string;
  currentLevel: string;
  status: CrmStudentStatus;
  reservationFrom?: string;
  reservationTo?: string;
  certificates: StudentCertificate[];
  courses: StudentCourseRecord[];
  notes?: string;
  createdAt: string;
}

export type CrmStudentDraft = Omit<CrmStudent, 'id' | 'createdAt'>;
