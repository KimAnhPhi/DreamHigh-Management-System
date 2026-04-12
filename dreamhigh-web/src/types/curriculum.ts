/** Unit tạm trên hub Khóa học (AddUnitModal). */
export interface CurriculumUnit {
  id: string;
  name: string;
  description: string;
}

export type SyllabusStatus = 'Khởi tạo' | 'Hiệu lực' | 'Ngừng sử dụng';

export type CurriculumLessonStatus = 'Đã hoàn thành' | 'Huỷ' | 'Chưa bắt đầu';

export interface CurriculumLesson {
  id: string;
  stt: number;
  executionStatus: CurriculumLessonStatus;
  teachingDate: string;
  teacherName: string;
  assistantName: string;
  documents: string[];
  content: string;
  homework: string;
  teacherGuideline: string;
  offReason?: string;
}

export interface CurriculumProgram {
  id: string;
  code: string;
  name: string;
  description: string;
  totalLevels: number;
  targetAudience: string;
  textbook: string;
  studentBook: string;
  globalMaterials: string;
  brochure: string;
  status: SyllabusStatus;
  hoursPerSession: number;
  totalSessions: number;
  entryRequirements: string;
  exitRequirements: string;
  units: string[];
  lessons: CurriculumLesson[];
  lastUpdated: string;
}

export type CurriculumProgramDraft = Omit<CurriculumProgram, 'id' | 'lessons' | 'lastUpdated'>;

export type CurriculumProgramMeta = Omit<CurriculumProgram, 'id' | 'lessons'>;
