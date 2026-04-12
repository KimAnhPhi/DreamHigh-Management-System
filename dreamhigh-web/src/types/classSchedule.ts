export type ClassStatus = 'Dự kiến' | 'Đang học' | 'Tạm dừng' | 'Kết thúc';

/** Lớp học (vận hành) — tách với entity API backend sau này. */
export interface Class {
  id: string;
  code: string;
  name: string;
  courseId: string;
  syllabusId: string;
  startDate: string;
  endDate: string;
  maxStudents: number;
  currentStudents: number;
  status: ClassStatus;
  branchId: string;
}

export interface ClassSession {
  id: string;
  classId: string;
  date: string;
  startTime: string;
  endTime: string;
  roomId: string;
  teacherId: string;
}

export type RoomStatus = 'Available' | 'Maintenance';

export interface Room {
  id: string;
  name: string;
  capacity: number;
  status: RoomStatus;
  equipment: string[];
}

export interface ScheduleTeacher {
  id: string;
  name: string;
}
