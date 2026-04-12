import React, { useMemo, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  AlertCircle,
  AlertTriangle,
  BookOpen,
  Calendar,
  CalendarDays,
  Edit2,
  MapPin,
  Plus,
  Search,
  UserCheck,
} from 'lucide-react';
import { AppLayout } from '../../design-system/components/layout/AppLayout';
import { PageHeader } from '../../design-system/components/layout/PageHeader';
import { Button } from '../../design-system/components/ui/Button';
import { Card } from '../../design-system/components/ui/Card';
import { Input } from '../../design-system/components/ui/Input';
import { MOCK_CLASSES, MOCK_ROOMS, MOCK_SESSIONS, MOCK_TEACHERS } from '../../mock/classSchedule';
import type { AdminMessage } from '../../types/adminSystem';
import type { Class, ClassSession, Room, ScheduleTeacher } from '../../types/classSchedule';
import NotificationPortal from '../Admin/system/NotificationPortal';
import ClassModal from './ClassModal';
import SessionActionModal from './SessionActionModal';

type ClassScheduleTab = 'classes' | 'calendar' | 'rooms';

function parseYmd(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map((n) => parseInt(n, 10));
  return new Date(y, m - 1, d);
}

/** Cột 0 = Thứ 2 … 6 = Chủ nhật */
function weekdayColumnVi(dateStr: string): number {
  const d = parseYmd(dateStr);
  const dow = d.getDay();
  if (dow === 0) return 6;
  return dow - 1;
}

const WEEK_HEADERS = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'];

const ClassScheduleManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ClassScheduleTab>('classes');
  const [classes, setClasses] = useState<Class[]>(MOCK_CLASSES);
  const [sessions, setSessions] = useState<ClassSession[]>(MOCK_SESSIONS);
  const [rooms] = useState<Room[]>(MOCK_ROOMS);
  const [message, setMessage] = useState<AdminMessage | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [activeSession, setActiveSession] = useState<ClassSession | null>(null);

  const filteredClasses = useMemo(
    () =>
      classes.filter(
        (c) =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.code.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [classes, searchTerm],
  );

  const sessionsByClass = useMemo(() => {
    const map: Record<string, ClassSession[]> = {};
    sessions.forEach((s) => {
      if (!map[s.classId]) map[s.classId] = [];
      map[s.classId].push(s);
    });
    return map;
  }, [sessions]);

  const showToast = (code: string, text: string, type: AdminMessage['type']) => setMessage({ code, text, type });

  const handleSaveSession = (sessionData: ClassSession) => {
    const conflict = sessions.find(
      (s) =>
        s.id !== sessionData.id &&
        s.date === sessionData.date &&
        s.startTime === sessionData.startTime &&
        (s.roomId === sessionData.roomId || s.teacherId === sessionData.teacherId) &&
        sessionData.roomId !== 'none',
    );

    if (conflict) {
      const target = conflict.roomId === sessionData.roomId ? 'Phòng học' : 'Giáo viên';
      showToast('SCH-ERR', `${target} này đã có lịch dạy tại thời điểm đã chọn.`, 'error');
      return;
    }

    setSessions((prev) => prev.map((s) => (s.id === sessionData.id ? sessionData : s)));
    showToast('SCH-200', 'Cập nhật điều phối thành công.', 'success');
    setActiveSession(null);
  };

  const handleSaveClass = (data: Class) => {
    if (editingClass) {
      setClasses((prev) => prev.map((c) => (c.id === data.id ? data : c)));
      showToast('CLS-200', 'Cập nhật lớp học thành công.', 'success');
    } else {
      setClasses((prev) => [data, ...prev]);
      showToast('CLS-201', 'Mở lớp học mới thành công.', 'success');
    }
    setIsClassModalOpen(false);
    setEditingClass(null);
  };

  return (
    <AppLayout>
      <NotificationPortal message={message} onClose={() => setMessage(null)} />
      <PageHeader
        title="Vận hành lịch & lớp học"
        breadcrumb={[
          { label: 'Điều hành', href: '#' },
          { label: 'Lớp học', href: '/classes' },
          { label: 'Lịch & phòng' },
        ]}
      />

      <div className="flex animate-fade-in flex-col gap-6 pb-10">
        <Card className="flex flex-col gap-6 p-6 shadow-md lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-gold p-3 text-midnight shadow-md shadow-gold/25">
              <Calendar size={28} strokeWidth={2} aria-hidden />
            </div>
            <div>
              <h2 className="font-headline text-2xl italic text-midnight">Lịch &amp; lớp</h2>
              <p className="font-body text-sm text-midnight/50">Điều phối tài nguyên và biến động giảng dạy (mock)</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-midnight/5 p-1.5">
            <TabButton
              active={activeTab === 'classes'}
              label="Danh sách lớp"
              Icon={BookOpen}
              onClick={() => setActiveTab('classes')}
            />
            <TabButton
              active={activeTab === 'calendar'}
              label="Lịch tổng hợp"
              Icon={CalendarDays}
              onClick={() => setActiveTab('calendar')}
            />
            <TabButton active={activeTab === 'rooms'} label="Phòng học" Icon={MapPin} onClick={() => setActiveTab('rooms')} />
          </div>
        </Card>

        <main className="flex-1">
          {activeTab === 'classes' && (
            <ClassListView
              classes={filteredClasses}
              sessionsMap={sessionsByClass}
              rooms={rooms}
              onEditClass={(c) => {
                setEditingClass(c);
                setIsClassModalOpen(true);
              }}
              onOpenSession={setActiveSession}
              onAddClass={() => {
                setEditingClass(null);
                setIsClassModalOpen(true);
              }}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onPlaceholderSchedule={() => showToast('SCH-HINT', 'Tạo lịch chi tiết — sẽ mở wizard sau.', 'warning')}
            />
          )}
          {activeTab === 'calendar' && (
            <CalendarView sessions={sessions} classes={classes} teachers={MOCK_TEACHERS} rooms={rooms} onOpenSession={setActiveSession} />
          )}
          {activeTab === 'rooms' && <RoomListView rooms={rooms} />}
        </main>

        <ClassModal
          isOpen={isClassModalOpen}
          onClose={() => {
            setIsClassModalOpen(false);
            setEditingClass(null);
          }}
          onSave={handleSaveClass}
          initialData={editingClass}
        />

        {activeSession && (
          <SessionActionModal
            isOpen
            onClose={() => setActiveSession(null)}
            session={activeSession}
            onSave={handleSaveSession}
            rooms={rooms}
            teachers={MOCK_TEACHERS}
            className={classes.find((c) => c.id === activeSession.classId)?.name || ''}
          />
        )}
      </div>
    </AppLayout>
  );
};

const TabButton: React.FC<{
  active: boolean;
  label: string;
  Icon: LucideIcon;
  onClick: () => void;
}> = ({ active, label, Icon, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-5 py-2.5 font-label text-[10px] font-semibold uppercase tracking-widest transition-all ${
      active ? 'bg-surface text-gold shadow-sm' : 'text-midnight/45 hover:text-midnight/70'
    }`}
  >
    <Icon size={14} strokeWidth={2} aria-hidden />
    {label}
  </button>
);

const ClassListView: React.FC<{
  classes: Class[];
  sessionsMap: Record<string, ClassSession[]>;
  rooms: Room[];
  onEditClass: (c: Class) => void;
  onOpenSession: (s: ClassSession) => void;
  onAddClass: () => void;
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  onPlaceholderSchedule: () => void;
}> = ({
  classes,
  sessionsMap,
  rooms,
  onEditClass,
  onOpenSession,
  onAddClass,
  searchTerm,
  setSearchTerm,
  onPlaceholderSchedule,
}) => (
  <Card className="flex flex-col overflow-hidden p-0 shadow-md">
    <div className="flex flex-col items-center justify-between gap-4 border-b border-midnight/10 p-8 md:flex-row">
      <div className="relative w-full md:max-w-md">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-midnight/40">
          <Search size={16} strokeWidth={2} aria-hidden />
        </span>
        <Input
          className="!pl-10"
          placeholder="Tìm lớp học…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Button type="button" className="gap-2 text-xs" onClick={onAddClass}>
        <Plus size={16} strokeWidth={2} aria-hidden /> Mở lớp mới
      </Button>
    </div>

    <div className="overflow-x-auto">
      <table className="min-w-[1100px] w-full table-fixed text-left">
        <thead>
          <tr className="border-b border-midnight/10 bg-midnight/5">
            <th className="w-40 px-8 py-5 font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Mã lớp</th>
            <th className="w-60 px-6 py-5 font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Lớp học</th>
            <th className="w-24 px-6 py-5 text-center font-label text-[10px] font-semibold uppercase tracking-widest text-gold">
              Sĩ số
            </th>
            <th className="px-6 py-5 font-label text-[10px] font-semibold uppercase tracking-widest text-gold">
              Lịch &amp; phòng (bấm để gán)
            </th>
            <th className="w-32 px-6 py-5 pr-8 text-right font-label text-[10px] font-semibold uppercase tracking-widest text-gold">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-midnight/5">
          {classes.map((cls) => (
            <tr key={cls.id} className="group align-top transition-colors hover:bg-midnight/[0.02]">
              <td className="px-8 py-7 font-mono text-xs font-semibold text-gold">{cls.code}</td>
              <td className="px-6 py-7">
                <p className="line-clamp-1 font-body text-sm font-semibold text-midnight">{cls.name}</p>
                <span
                  className={`mt-2 inline-block rounded border px-2 py-0.5 font-label text-[8px] font-semibold uppercase ${
                    cls.status === 'Đang học'
                      ? 'border-success/25 bg-success-bg text-success'
                      : 'border-warning/25 bg-warning-bg text-warning'
                  }`}
                >
                  {cls.status}
                </span>
              </td>
              <td className="px-6 py-7 text-center">
                <p className="font-body text-sm font-semibold text-midnight">{cls.maxStudents}</p>
                <p className="font-label text-[9px] font-semibold uppercase tracking-tighter text-midnight/40">Học viên</p>
              </td>
              <td className="px-6 py-7">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {(sessionsMap[cls.id] || []).map((sess) => (
                    <SessionTag
                      key={sess.id}
                      session={sess}
                      room={rooms.find((r) => r.id === sess.roomId)}
                      classCapacity={cls.maxStudents}
                      onClick={() => onOpenSession(sess)}
                    />
                  ))}
                  {(!sessionsMap[cls.id] || sessionsMap[cls.id].length === 0) && (
                    <button
                      type="button"
                      onClick={onPlaceholderSchedule}
                      className="flex w-fit items-center gap-2 rounded-2xl border border-dashed border-gold/35 p-3 font-label text-[10px] font-semibold uppercase text-gold transition-colors hover:bg-gold/10"
                    >
                      <Plus size={14} strokeWidth={2} aria-hidden /> Tạo lịch chi tiết
                    </button>
                  )}
                </div>
              </td>
              <td className="px-6 py-7 pr-8 text-right">
                <button
                  type="button"
                  onClick={() => onEditClass(cls)}
                  className="rounded-xl p-2.5 text-midnight/40 opacity-0 transition-all hover:bg-gold/10 hover:text-gold group-hover:opacity-100"
                  title="Sửa lớp"
                >
                  <Edit2 size={20} strokeWidth={2} aria-hidden />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>
);

const SessionTag: React.FC<{
  session: ClassSession;
  room: Room | undefined;
  classCapacity: number;
  onClick: () => void;
}> = ({ session, room, classCapacity, onClick }) => {
  const isMissingRoom = !room || room.id === 'none';
  const isOverCapacity = Boolean(room && room.id !== 'none' && room.capacity > 0 && room.capacity < classCapacity);

  let box =
    'border-midnight/15 bg-surface hover:border-gold/40';
  let roomLabel = room?.name || 'Chưa gán phòng';
  let alertEl: React.ReactNode = null;

  if (isMissingRoom) {
    box = 'animate-pulse border-error/40 bg-error-bg text-error';
    alertEl = <AlertCircle size={12} strokeWidth={2} className="shrink-0" aria-hidden />;
    roomLabel = 'Chưa gán phòng';
  } else if (isOverCapacity) {
    box = 'border-warning/40 bg-warning-bg text-warning';
    alertEl = <AlertTriangle size={12} strokeWidth={2} className="shrink-0" aria-hidden />;
    roomLabel = `${room!.name} (quá tải)`;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-2xl border p-3 text-left shadow-sm transition-all ${box}`}
    >
      <div className="flex flex-col">
        <span className="font-label text-[10px] font-semibold uppercase tracking-tight text-midnight">{session.date}</span>
        <span className="text-[9px] font-semibold uppercase text-midnight/45">
          {session.startTime} – {session.endTime}
        </span>
      </div>
      <div className="flex flex-col items-end">
        <span className="flex items-center gap-1 font-label text-[10px] font-semibold text-midnight">
          {alertEl} {roomLabel}
        </span>
        {room && room.id !== 'none' ? (
          <span className="text-[8px] font-semibold uppercase tracking-tighter text-midnight/40">
            Sức chứa: {room.capacity}
          </span>
        ) : null}
      </div>
    </button>
  );
};

const CalendarView: React.FC<{
  sessions: ClassSession[];
  classes: Class[];
  teachers: ScheduleTeacher[];
  rooms: Room[];
  onOpenSession: (s: ClassSession) => void;
}> = ({ sessions, classes, teachers, rooms, onOpenSession }) => {
  const byCol = useMemo(() => {
    const cols: ClassSession[][] = [[], [], [], [], [], [], []];
    sessions.forEach((s) => {
      const col = weekdayColumnVi(s.date);
      if (col >= 0 && col < 7) cols[col].push(s);
    });
    cols.forEach((list) => list.sort((a, b) => a.startTime.localeCompare(b.startTime)));
    return cols;
  }, [sessions]);

  return (
    <Card className="overflow-hidden p-0 shadow-md animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-midnight px-8 py-6 text-white">
        <h3 className="font-label text-lg font-semibold uppercase tracking-tight">Lịch điều phối tổng hợp</h3>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="secondary" className="bg-white/10 px-4 py-2 text-[10px] text-white hover:bg-white hover:text-midnight">
            Tuần này
          </Button>
          <Button type="button" className="px-4 py-2 text-[10px] shadow-md">
            Lọc lịch trống
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 p-4 md:gap-4">
        {WEEK_HEADERS.map((d) => (
          <div key={d} className="mb-2 text-center font-label text-[10px] font-semibold uppercase tracking-widest text-midnight/40">
            {d}
          </div>
        ))}
        {byCol.map((colSessions, i) => (
          <div key={i} className="min-h-[320px] space-y-3 rounded-2xl border border-midnight/10 bg-midnight/[0.03] p-2 md:min-h-[480px]">
            {colSessions.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onOpenSession(s)}
                className="w-full rounded-2xl border border-midnight/15 bg-surface p-4 text-left shadow-sm transition-all hover:border-gold hover:shadow-md"
              >
                <p className="mb-1 font-label text-[9px] font-semibold uppercase text-gold">
                  {s.startTime} – {s.endTime}
                </p>
                <p className="mb-3 line-clamp-2 font-body text-xs font-semibold leading-tight text-midnight">
                  {classes.find((c) => c.id === s.classId)?.name}
                </p>
                <div className="flex flex-col gap-1.5 border-t border-midnight/10 pt-3">
                  <span className="flex items-center gap-2 text-[8px] font-semibold uppercase tracking-tighter text-midnight/45">
                    <UserCheck size={10} strokeWidth={2} className="shrink-0" aria-hidden />{' '}
                    {teachers.find((t) => t.id === s.teacherId)?.name}
                  </span>
                  <span className="flex items-center gap-2 text-[8px] font-semibold uppercase tracking-tighter text-midnight/45">
                    <MapPin size={10} strokeWidth={2} aria-hidden /> {rooms.find((r) => r.id === s.roomId)?.name || 'N/A'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
};

const RoomListView: React.FC<{ rooms: Room[] }> = ({ rooms }) => (
  <div className="grid animate-fade-in grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
    {rooms
      .filter((r) => r.id !== 'none')
      .map((room) => (
        <Card key={room.id} className="group relative overflow-hidden p-8 shadow-sm transition-all hover:border-gold/35">
          <div className="pointer-events-none absolute right-0 top-0 p-4 opacity-5 transition-transform duration-700 group-hover:scale-125">
            <MapPin size={64} strokeWidth={1.25} aria-hidden />
          </div>
          <div className="relative mb-6 flex items-start justify-between">
            <div className="rounded-2xl bg-midnight/5 p-4 text-gold shadow-inner transition-colors group-hover:bg-gold group-hover:text-midnight">
              <MapPin size={24} strokeWidth={2} aria-hidden />
            </div>
            <span
              className={`rounded-full border px-3 py-1 font-label text-[9px] font-semibold uppercase ${
                room.status === 'Available'
                  ? 'border-success/25 bg-success-bg text-success'
                  : 'border-error/25 bg-error-bg text-error'
              }`}
            >
              {room.status === 'Available' ? 'Hoạt động' : 'Bảo trì'}
            </span>
          </div>
          <h3 className="font-headline text-xl italic text-midnight">{room.name}</h3>
          <p className="mt-1 font-body text-xs font-semibold uppercase tracking-widest text-midnight/45">
            Sức chứa: {room.capacity} học sinh
          </p>
          <div className="mt-8 flex flex-wrap gap-2 border-t border-midnight/10 pt-6">
            {room.equipment.map((e) => (
              <span key={e} className="rounded bg-midnight/5 px-2 py-1 font-label text-[8px] font-semibold uppercase text-midnight/55">
                {e}
              </span>
            ))}
          </div>
          <Button type="button" variant="secondary" className="mt-8 w-full py-3 text-[10px]">
            Lịch phòng chi tiết
          </Button>
        </Card>
      ))}
    <button
      type="button"
      className="flex min-h-[280px] flex-col items-center justify-center rounded-[2rem] border-4 border-dashed border-midnight/15 bg-midnight/[0.02] text-midnight/30 transition-colors hover:border-gold hover:bg-surface hover:text-gold"
    >
      <Plus size={32} strokeWidth={1.5} aria-hidden />
      <span className="mt-4 font-label text-[10px] font-semibold uppercase tracking-widest">Thêm phòng học</span>
    </button>
  </div>
);

export default ClassScheduleManagement;
