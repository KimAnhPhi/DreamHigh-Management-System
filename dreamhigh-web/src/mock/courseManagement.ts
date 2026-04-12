import type { Course, CourseLesson, CourseRosterStudent, SyllabusCurriculum } from '../types/course';

const templateLessons = (prefix: string): CourseLesson[] => [
  {
    id: `${prefix}-1`,
    stt: 1,
    executionStatus: 'Đã hoàn thành',
    teachingDate: '2026-03-01',
    teacherName: 'Nguyễn Vân Anh',
    content: 'Tự giới thiệu, alphabet và âm cơ bản.',
    homework: 'Listening Unit 1',
    attendance: [],
  },
  {
    id: `${prefix}-2`,
    stt: 2,
    executionStatus: 'Đang dạy',
    teachingDate: '2026-03-15',
    teacherName: 'Nguyễn Vân Anh',
    content: 'Present simple, daily routines.',
    homework: 'Grammar worksheet 2',
  },
  {
    id: `${prefix}-3`,
    stt: 3,
    executionStatus: 'Chưa diễn ra',
    teachingDate: '',
    teacherName: '',
    content: 'Past simple introduction.',
    homework: '—',
  },
];

const ieltsUnits = [
  { id: 'u-ief-1', name: 'Unit 1 — People & family', description: 'Từ vựng chủ đề gia đình, present simple.' },
  { id: 'u-ief-2', name: 'Unit 2 — Daily life', description: 'Routine, time expressions, listening gist.' },
  { id: 'u-ief-3', name: 'Unit 3 — Study & work', description: 'Future plans, writing short email.' },
];

const starterUnits = [
  { id: 'u-st-1', name: 'Unit A — Hello!', description: 'Alphabet, colors, basic greetings.' },
  { id: 'u-st-2', name: 'Unit B — My school', description: 'Classroom objects, numbers 1–20.' },
];

export const MOCK_CURRICULUM: SyllabusCurriculum[] = [
  {
    id: 'syl-ielts-f',
    code: 'IELTS-F',
    name: 'IELTS Foundation Syllabus',
    lessons: templateLessons('l-ielts'),
    units: ieltsUnits,
  },
  {
    id: 'syl-starter',
    code: 'STD-01',
    name: 'Starter Combined',
    lessons: templateLessons('l-starter'),
    units: starterUnits,
  },
];

export const MOCK_COURSES: Course[] = [
  {
    id: 'crs-1',
    code: 'CRS-2026-0001',
    name: 'IELTS Foundation — Ca tối T2-4-6',
    level: 'Elementary',
    academicYear: 2026,
    duration: 36,
    hoursPerSession: 1.5,
    totalHours: 54,
    openingDate: '2026-02-10',
    estimatedEndDate: '2026-08-10',
    sessionsPerWeek: 3,
    sessionTime: '18:00 - 19:30',
    schedule: 'Thứ 2: 18:00 - 19:30; Thứ 4: 18:00 - 19:30',
    teacherVN: 'Nguyễn Vân Anh',
    teacherForeign: 'John Smith',
    teachingAssistant: 'Trần Minh',
    status: 'Đang học',
    syllabusId: 'syl-ielts-f',
  },
  {
    id: 'crs-2',
    code: 'CRS-2026-0002',
    name: 'Starters Morning A',
    level: 'Starters',
    academicYear: 2026,
    duration: 24,
    hoursPerSession: 1.5,
    totalHours: 36,
    openingDate: '2026-03-01',
    estimatedEndDate: '2026-06-01',
    sessionsPerWeek: 2,
    schedule: 'Thứ 7: 09:00 - 10:30; Chủ Nhật: 09:00 - 10:30',
    teacherVN: 'Lê Thu Hà',
    teacherForeign: '',
    teachingAssistant: '',
    status: 'Đang mở',
    syllabusId: 'syl-starter',
  },
];

export const MOCK_COURSE_STUDENTS: CourseRosterStudent[] = [
  {
    id: 'stu-1',
    courseId: 'crs-1',
    studentCode: 'HV-10291',
    studentName: 'Phạm Gia Bảo',
    status: 'Đang học',
  },
  {
    id: 'stu-2',
    courseId: 'crs-1',
    studentCode: 'HV-10292',
    studentName: 'Hoàng An Khánh',
    status: 'Đang học',
  },
  {
    id: 'stu-3',
    courseId: 'crs-2',
    studentCode: 'HV-10301',
    studentName: 'Võ Minh Tâm',
    status: 'Chờ nhập học',
  },
];
