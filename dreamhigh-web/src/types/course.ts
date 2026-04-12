import type { AttendanceLesson } from './attendance';
import type { CurriculumUnit } from './curriculum';

export type CourseStatus = 'Khởi tạo' | 'Đang mở' | 'Đang học' | 'Hoàn thành' | 'Ngừng';

export type CourseLessonExecutionStatus = 'Đã hoàn thành' | 'Huỷ' | 'Chưa diễn ra' | 'Đang dạy';

/** Buổi học trên lộ trình khóa — dùng điểm danh & nhật ký. */
export interface CourseLesson extends AttendanceLesson {
  id: string;
  executionStatus: CourseLessonExecutionStatus;
  teacherName?: string;
  content: string;
  homework?: string;
  /** Nhận xét chỉnh sửa cho feedback phụ huynh (builder). */
  lessonFeedback?: string;
}

export interface SyllabusCurriculum {
  id: string;
  code: string;
  name: string;
  lessons: CourseLesson[];
  /** Unit đánh giá RLWS — mock / tùy syllabus. */
  units?: CurriculumUnit[];
}

export interface Course {
  id: string;
  code: string;
  name: string;
  level: string;
  academicYear: number;
  duration: number;
  hoursPerSession: number;
  totalHours: number;
  openingDate: string;
  estimatedEndDate?: string;
  sessionsPerWeek: number;
  sessionTime?: string;
  schedule?: string;
  teacherVN?: string;
  teacherForeign?: string;
  teachingAssistant?: string;
  status: CourseStatus;
  syllabusId: string;
}

export type CourseDraft = Omit<Course, 'id'>;

export interface CourseRosterStudent {
  id: string;
  courseId: string;
  studentCode: string;
  studentName: string;
  status: string;
}

export interface ScheduleSlot {
  day: string;
  startTime: string;
  endTime: string;
}
