import type { Class, ClassSession, Room, ScheduleTeacher } from '../types/classSchedule';

export const MOCK_TEACHERS: ScheduleTeacher[] = [
  { id: 't1', name: 'Nguyễn Vân Anh' },
  { id: 't2', name: 'Lê Thu Hà' },
  { id: 't3', name: 'John Smith' },
];

export const MOCK_ROOMS: Room[] = [
  { id: 'none', name: 'Chưa gán phòng', capacity: 0, status: 'Available', equipment: [] },
  { id: 'room-a', name: 'Phòng A1', capacity: 20, status: 'Available', equipment: ['TV', 'Máy chiếu', 'Loa'] },
  { id: 'room-b', name: 'Phòng B2', capacity: 12, status: 'Available', equipment: ['Bảng từ'] },
  { id: 'room-c', name: 'Phòng Lab', capacity: 16, status: 'Maintenance', equipment: ['PC'] },
];

export const MOCK_CLASSES: Class[] = [
  {
    id: 'cls-1',
    code: 'L-001',
    name: 'IELTS Foundation — Ca tối (T2-4-6)',
    courseId: 'crs-1',
    syllabusId: 'syl-ielts-f',
    startDate: '2026-02-10',
    endDate: '2026-08-10',
    maxStudents: 15,
    currentStudents: 8,
    status: 'Đang học',
    branchId: 'b1',
  },
  {
    id: 'cls-2',
    code: 'L-002',
    name: 'Starters Morning A',
    courseId: 'crs-2',
    syllabusId: 'syl-starter',
    startDate: '2026-03-01',
    endDate: '2026-06-01',
    maxStudents: 12,
    currentStudents: 6,
    status: 'Dự kiến',
    branchId: 'b1',
  },
];

export const MOCK_SESSIONS: ClassSession[] = [
  {
    id: 'sess-1',
    classId: 'cls-1',
    date: '2026-03-31',
    startTime: '18:00',
    endTime: '19:30',
    roomId: 'room-a',
    teacherId: 't1',
  },
  {
    id: 'sess-2',
    classId: 'cls-1',
    date: '2026-04-02',
    startTime: '18:00',
    endTime: '19:30',
    roomId: 'none',
    teacherId: 't1',
  },
  {
    id: 'sess-3',
    classId: 'cls-2',
    date: '2026-04-05',
    startTime: '09:00',
    endTime: '10:30',
    roomId: 'room-b',
    teacherId: 't2',
  },
  {
    id: 'sess-4',
    classId: 'cls-2',
    date: '2026-04-06',
    startTime: '09:00',
    endTime: '10:30',
    roomId: 'room-b',
    teacherId: 't2',
  },
];
