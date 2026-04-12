import React, { useMemo, useState } from 'react';
import { FileSpreadsheet } from 'lucide-react';
import { AppLayout } from '../../design-system/components/layout/AppLayout';
import { PageHeader } from '../../design-system/components/layout/PageHeader';
import { Button } from '../../design-system/components/ui/Button';
import { Card } from '../../design-system/components/ui/Card';
import { Input, Select } from '../../design-system/components/ui/Input';
import { MOCK_CURRICULUM_PROGRAMS } from '../../mock/curriculumManagement';
import type { AdminMessage } from '../../types/adminSystem';
import type { CurriculumProgram, CurriculumProgramDraft } from '../../types/curriculum';
import { getSyllabusStatusBadgeClass, getSyllabusStatusCardClass } from '../../utils/curriculumUi';
import NotificationPortal from '../Admin/system/NotificationPortal';
import { getIcon } from '../Admin/system/adminSystemIcons';
import CurriculumDetail from './CurriculumDetail';
import CurriculumModal from './CurriculumModal';

const ALL = 'Tất cả';

const CurriculumManagement: React.FC = () => {
  const [programs, setPrograms] = useState<CurriculumProgram[]>(MOCK_CURRICULUM_PROGRAMS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState(ALL);
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<CurriculumProgram | null>(null);
  const [message, setMessage] = useState<AdminMessage | null>(null);

  const viewingProgram = useMemo(
    () => (viewingId ? programs.find((p) => p.id === viewingId) ?? null : null),
    [programs, viewingId],
  );

  const filteredData = useMemo(() => {
    return programs.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = filterStatus === ALL || p.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [programs, searchTerm, filterStatus]);

  const showNotification = (code: string, text: string, type: AdminMessage['type']) => {
    setMessage({ code, text, type });
  };

  const handleAddNew = () => {
    setEditingProgram(null);
    setIsModalOpen(true);
  };

  const handleEdit = (e: React.MouseEvent, prog: CurriculumProgram) => {
    e.stopPropagation();
    setEditingProgram(prog);
    setIsModalOpen(true);
  };

  const handleSaveProgram = (data: CurriculumProgramDraft) => {
    if (editingProgram) {
      setPrograms((prev) =>
        prev.map((p) =>
          p.id === editingProgram.id
            ? {
                ...p,
                ...data,
                lastUpdated: new Date().toISOString().split('T')[0],
              }
            : p,
        ),
      );
      showNotification('NOTI-302', 'Cập nhật thông tin Syllabus thành công.', 'success');
    } else {
      const newProgram: CurriculumProgram = {
        ...data,
        id: Math.random().toString(36).slice(2, 11),
        lessons: [],
        lastUpdated: new Date().toISOString().split('T')[0],
      };
      setPrograms((prev) => [newProgram, ...prev]);
      showNotification('NOTI-301', 'Thêm mới Syllabus thành công.', 'success');
    }
    setIsModalOpen(false);
    setEditingProgram(null);
  };

  if (viewingProgram) {
    return (
      <AppLayout>
        <NotificationPortal message={message} onClose={() => setMessage(null)} />
        <PageHeader
          title="Chi tiết Syllabus"
          breadcrumb={[
            { label: 'Điều hành', href: '#' },
            { label: 'Chương trình học', href: '/courses/curriculum' },
            { label: viewingProgram.code },
          ]}
        />
        <div className="-mt-8">
          <CurriculumDetail
            program={viewingProgram}
            onBack={() => setViewingId(null)}
            onUpdate={(updated) => {
              setPrograms((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
            }}
          />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <NotificationPortal message={message} onClose={() => setMessage(null)} />
      <PageHeader
        title="Quản lý chương trình học (Syllabus)"
        breadcrumb={[
          { label: 'Điều hành', href: '#' },
          { label: 'Chương trình học' },
        ]}
      />

      <div className="flex animate-fade-in flex-col gap-6">
        <Card className="p-6 shadow-md">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                {getIcon('GraduationCap', 24)}
              </span>
              <div>
                <p className="font-body text-sm text-midnight/50">
                  Thiết kế khung chương trình chuẩn và nội dung chi tiết từng buổi học (mock).
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="secondary" className="gap-2" onClick={() => showNotification('INFO-001', 'Import danh sách Syllabus — sẽ nối API.', 'warning')}>
                <FileSpreadsheet size={18} strokeWidth={2} aria-hidden />
                Import Excel
              </Button>
              <Button type="button" onClick={handleAddNew} className="gap-2">
                {getIcon('Plus', 18)} Thêm mới Syllabus
              </Button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 border-t border-midnight/10 pt-6 md:grid-cols-3">
            <div className="relative md:col-span-2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-midnight/40">{getIcon('Search', 18)}</span>
              <Input
                className="!pl-10"
                placeholder="Tìm theo tên hoặc mã Syllabus…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              aria-label="Trạng thái Syllabus"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value={ALL}>Tất cả trạng thái</option>
              <option value="Khởi tạo">Khởi tạo</option>
              <option value="Hiệu lực">Hiệu lực</option>
              <option value="Ngừng sử dụng">Ngừng sử dụng</option>
            </Select>
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filteredData.length > 0 ? (
            filteredData.map((prog) => (
              <Card
                key={prog.id}
                role="button"
                tabIndex={0}
                onClick={() => setViewingId(prog.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setViewingId(prog.id);
                  }
                }}
                className="group flex cursor-pointer flex-col overflow-hidden p-0 shadow-sm transition-all hover:border-gold/30 hover:shadow-lg"
              >
                <div className="flex-1 border-b border-midnight/5 p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div className={`rounded-lg p-2 text-white ${getSyllabusStatusCardClass(prog.status)}`}>
                      {getIcon('BookOpen', 20)}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => handleEdit(e, prog)}
                        className="rounded-md bg-midnight/5 p-1.5 text-midnight/50 opacity-0 transition-all group-hover:opacity-100 hover:bg-gold/15 hover:text-gold"
                        title="Chỉnh sửa Syllabus"
                      >
                        {getIcon('Edit', 14)}
                      </button>
                      <span
                        className={`rounded-full border px-2 py-0.5 font-label text-[10px] font-semibold uppercase tracking-widest ${getSyllabusStatusBadgeClass(prog.status)}`}
                      >
                        {prog.status}
                      </span>
                    </div>
                  </div>
                  <h3 className="line-clamp-1 font-headline text-lg italic text-midnight transition-colors group-hover:text-gold">{prog.name}</h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-midnight/40">{prog.code}</p>
                </div>

                <div className="bg-midnight/[0.02] p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between font-body text-xs">
                      <span className="font-label font-semibold uppercase tracking-tight text-midnight/45">Tổng số buổi</span>
                      <span className="font-semibold text-midnight">{prog.totalSessions} buổi</span>
                    </div>
                    <div className="flex items-center justify-between font-body text-xs">
                      <span className="font-label font-semibold uppercase tracking-tight text-midnight/45">Thời gian</span>
                      <span className="font-semibold text-midnight">{prog.hoursPerSession}h / buổi</span>
                    </div>
                    <div className="flex items-center justify-between font-body text-xs">
                      <span className="font-label font-semibold uppercase tracking-tight text-midnight/45">Giáo trình</span>
                      <span className="max-w-[150px] truncate font-semibold text-midnight" title={prog.textbook}>
                        {prog.textbook || 'Chưa cập nhật'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-midnight/5 bg-surface px-6 py-4">
                  <span className="font-label text-[10px] font-semibold uppercase text-midnight/40">
                    Cập nhật: {prog.lastUpdated}
                  </span>
                  <span className="flex items-center gap-1 font-body text-xs font-semibold text-gold opacity-0 transition-opacity group-hover:opacity-100">
                    Thiết kế lộ trình {getIcon('ChevronRight', 14)}
                  </span>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center rounded-3xl border-2 border-dashed border-midnight/10 bg-surface py-20 opacity-40">
              {getIcon('AlertTriangle', 48)}
              <p className="mt-4 font-label text-lg font-semibold uppercase tracking-widest">NOTI-004: Không có dữ liệu</p>
            </div>
          )}
        </div>
      </div>

      <CurriculumModal
        isOpen={isModalOpen}
        program={editingProgram}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProgram(null);
        }}
        onSave={handleSaveProgram}
      />
    </AppLayout>
  );
};

export default CurriculumManagement;
