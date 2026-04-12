import React, { useMemo, useState } from 'react';
import { AppLayout } from '../../design-system/components/layout/AppLayout';
import { PageHeader } from '../../design-system/components/layout/PageHeader';
import { Button } from '../../design-system/components/ui/Button';
import { Card } from '../../design-system/components/ui/Card';
import { Input, Select } from '../../design-system/components/ui/Input';
import { MOCK_COURSES } from '../../mock/courseManagement';
import { MOCK_STUDENTS } from '../../mock/studentManagement';
import type { AdminMessage } from '../../types/adminSystem';
import type { CrmStudent, CrmStudentDraft } from '../../types/crmStudent';
import { getCoursePaymentStatusClass, getCrmStudentStatusClass } from '../../utils/crmStudentUi';
import NotificationPortal from '../Admin/system/NotificationPortal';
import { getIcon } from '../Admin/system/adminSystemIcons';
import StudentDetail from './StudentDetail';
import StudentModal from './StudentModal';

const ALL = 'Tất cả';

const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState<CrmStudent[]>(MOCK_STUDENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState(ALL);
  const [filterCourse, setFilterCourse] = useState(ALL);
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<CrmStudent | null>(null);
  const [message, setMessage] = useState<AdminMessage | null>(null);

  const viewingStudent = useMemo(
    () => (viewingId ? students.find((s) => s.id === viewingId) ?? null : null),
    [students, viewingId],
  );

  const filteredData = useMemo(() => {
    return students.filter((s) => {
      const matchesSearch =
        s.studentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.phone.includes(searchTerm);
      const matchesStatus = filterStatus === ALL || s.status === filterStatus;
      const currentCourse = s.courses.find((c) => c.isCurrent);
      const matchesCourse =
        filterCourse === ALL || (currentCourse && currentCourse.courseName === filterCourse);
      return matchesSearch && matchesStatus && matchesCourse;
    });
  }, [students, searchTerm, filterStatus, filterCourse]);

  const showNotification = (code: string, text: string, type: AdminMessage['type']) => {
    setMessage({ code, text, type });
  };

  const handleAddNew = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const handleSave = (data: CrmStudentDraft) => {
    if (editingStudent) {
      setStudents((prev) => prev.map((s) => (s.id === editingStudent.id ? { ...s, ...data } : s)));
      showNotification('NOTI-101', 'Cập nhật hồ sơ học viên thành công.', 'success');
    } else {
      const newStudent: CrmStudent = {
        ...data,
        id: `std-${Math.random().toString(36).slice(2, 11)}`,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setStudents((prev) => [newStudent, ...prev]);
      showNotification('NOTI-102', 'Đã thêm học viên mới vào hệ thống.', 'success');
    }
    setIsModalOpen(false);
    setEditingStudent(null);
  };

  if (viewingStudent) {
    return (
      <AppLayout>
        <NotificationPortal message={message} onClose={() => setMessage(null)} />
        <PageHeader
          title="Hồ sơ học viên"
          breadcrumb={[
            { label: 'CRM', href: '#' },
            { label: 'Học viên', href: '/crm/students/manage' },
            { label: viewingStudent.studentCode },
          ]}
        />
        <div className="-mt-8">
          <StudentDetail student={viewingStudent} onBack={() => setViewingId(null)} />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <NotificationPortal message={message} onClose={() => setMessage(null)} />
      <PageHeader
        title="Quản lý học viên"
        breadcrumb={[
          { label: 'CRM', href: '#' },
          { label: 'Học viên' },
        ]}
      />

      <div className="flex animate-fade-in flex-col gap-6 pb-10">
        <Card className="p-6 shadow-md">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                {getIcon('Users', 24)}
              </span>
              <div>
                <p className="font-body text-sm text-midnight/50">
                  Hồ sơ, học bổng và lộ trình tập trung (mock — chưa nối API).
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="secondary" className="gap-2" onClick={() => showNotification('NOTI-EXP', 'Xuất danh sách — mock.', 'warning')}>
                {getIcon('Download', 18)} Xuất danh sách
              </Button>
              <Button type="button" className="gap-2" onClick={handleAddNew}>
                {getIcon('Plus', 18)} Thêm học viên
              </Button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 border-t border-midnight/10 pt-6 md:grid-cols-4">
            <div className="relative md:col-span-2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-midnight/40">{getIcon('Search', 18)}</span>
              <Input
                className="!pl-10"
                placeholder="Mã, tên hoặc SĐT…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select aria-label="Trạng thái" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value={ALL}>Trạng thái: Tất cả</option>
              <option value="Đang học">Đang học</option>
              <option value="Bảo lưu">Bảo lưu</option>
              <option value="Nghỉ học">Đã nghỉ</option>
            </Select>
            <Select aria-label="Khóa học" value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)}>
              <option value={ALL}>Khóa học: Tất cả</option>
              {MOCK_COURSES.map((course) => (
                <option key={course.id} value={course.name}>
                  {course.name}
                </option>
              ))}
            </Select>
          </div>
        </Card>

        <Card className="flex flex-1 flex-col overflow-hidden p-0 shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-midnight/10 bg-midnight/5">
                  <th className="px-6 py-4 font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Mã HV</th>
                  <th className="px-6 py-4 font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Họ và tên</th>
                  <th className="px-6 py-4 font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Phụ huynh &amp; SĐT</th>
                  <th className="px-6 py-4 font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Khóa đang học</th>
                  <th className="px-6 py-4 font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Trạng thái</th>
                  <th className="px-6 py-4 text-right font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-midnight/5">
                {filteredData.length > 0 ? (
                  filteredData.map((std) => {
                    const currentCourse = std.courses.find((c) => c.isCurrent);
                    return (
                      <tr key={std.id} className="group transition-colors hover:bg-midnight/[0.02]">
                        <td className="px-6 py-4">
                          <button
                            type="button"
                            onClick={() => setViewingId(std.id)}
                            className="rounded border border-gold/25 bg-gold/10 px-2 py-1 font-mono text-xs font-semibold text-gold transition-colors hover:bg-gold hover:text-midnight"
                          >
                            {std.studentCode}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-body text-sm font-semibold text-midnight">{std.studentName}</p>
                          <p className="font-label text-[10px] font-semibold uppercase text-midnight/40">Gia nhập: {std.createdAt}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-body text-xs font-semibold text-midnight/80">{std.parentName}</p>
                          <div className="mt-0.5 flex items-center gap-1 font-body text-[10px] text-midnight/45">
                            {getIcon('Phone', 10)} {std.phone}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {currentCourse ? (
                            <div>
                              <p className="line-clamp-1 font-body text-xs font-semibold text-midnight">{currentCourse.courseName}</p>
                              <div className="mt-1 flex flex-wrap gap-2">
                                <span
                                  className={`rounded border px-1.5 py-0.5 font-label text-[9px] font-semibold uppercase ${getCoursePaymentStatusClass(currentCourse.paymentStatus)}`}
                                >
                                  {currentCourse.paymentStatus}
                                </span>
                                {currentCourse.scholarship !== 'None' ? (
                                  <span className="rounded border border-info/25 bg-info-bg px-1.5 py-0.5 font-label text-[9px] font-semibold uppercase text-info">
                                    HB: {currentCourse.scholarship}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          ) : (
                            <span className="font-body text-xs italic text-midnight/35">Chưa có khóa</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex rounded-full border px-3 py-1 font-label text-[10px] font-semibold uppercase tracking-wider ${getCrmStudentStatusClass(std.status)}`}
                          >
                            {std.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                            <button
                              type="button"
                              onClick={() => setViewingId(std.id)}
                              className="rounded-lg p-2 text-gold hover:bg-gold/10"
                              title="Chi tiết"
                            >
                              {getIcon('Eye', 18)}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingStudent(std);
                                setIsModalOpen(true);
                              }}
                              className="rounded-lg p-2 text-midnight/40 hover:bg-gold/10 hover:text-gold"
                              title="Sửa"
                            >
                              {getIcon('Edit', 18)}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center opacity-35">
                        {getIcon('Users', 48)}
                        <p className="mt-4 font-label text-lg font-semibold uppercase tracking-widest text-midnight">Không có dữ liệu</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <StudentModal
          isOpen={isModalOpen}
          student={editingStudent}
          onClose={() => {
            setIsModalOpen(false);
            setEditingStudent(null);
          }}
          onSave={handleSave}
        />
      </div>
    </AppLayout>
  );
};

export default StudentManagement;
