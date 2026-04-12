export type AttendanceStatus = 'Attended' | 'Absent';

export type HomeworkStatus = 'Completed' | 'NotCompleted';

export interface AttendanceRecord {
  studentId: string;
  studentName: string;
  status: AttendanceStatus;
  homeworkStatus?: HomeworkStatus;
  note?: string;
}

export interface AttendanceLesson {
  stt: number;
  teachingDate: string;
  attendance?: AttendanceRecord[];
}

export interface CourseStudentRef {
  id: string;
  studentName: string;
}

/** Alias tương thích prototype (`CourseStudent`). */
export type CourseStudent = CourseStudentRef;
