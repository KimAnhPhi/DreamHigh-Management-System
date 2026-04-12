import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AppLayout } from '../../design-system/components/layout/AppLayout';
import { PageHeader } from '../../design-system/components/layout/PageHeader';
import { Button } from '../../design-system/components/ui/Button';
import { Card } from '../../design-system/components/ui/Card';
import { Input, Select } from '../../design-system/components/ui/Input';
import { apiClient } from '../../services/apiClient';
import NotificationPortal from '../Admin/system/NotificationPortal';
import { getIcon } from '../Admin/system/adminSystemIcons';
import type { AdminMessage } from '../../types/adminSystem';
import CourseCatalogModal, {
  type CourseCatalogForm,
  type CourseCatalogRow,
} from './CourseCatalogModal';

const PAGE_SIZE = 15;

export default function CourseManagement() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [debounced, setDebounced] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseCatalogRow | null>(null);
  const [message, setMessage] = useState<AdminMessage | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(searchTerm), 300);
    return () => window.clearTimeout(t);
  }, [searchTerm]);

  const { data: levels = [] } = useQuery({
    queryKey: ['catalog-levels-all'],
    queryFn: async () => {
      const resp = await apiClient.get('/categories/levels?includeInactive=true');
      return resp.data as Array<{ id: number; code: string; name: string; program?: { code: string } }>;
    },
  });

  const {
    data: courseResponse,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['catalog-courses', debounced, levelFilter, page],
    queryFn: async () => {
      const params: Record<string, string | number> = { page, limit: PAGE_SIZE };
      if (debounced.trim()) params.search = debounced.trim();
      if (levelFilter) params.levelId = levelFilter;
      const resp = await apiClient.get('/categories/courses', { params });
      return resp.data as {
        data: CourseCatalogRow[];
        meta: { total: number; page: number; limit: number; totalPages: number };
      };
    },
  });

  const courses = courseResponse?.data ?? [];
  const meta = courseResponse?.meta;

  const saveMutation = useMutation({
    mutationFn: async ({ id, form }: { id?: number; form: CourseCatalogForm }) => {
      const payload: Record<string, unknown> = {
        name: form.name.trim(),
        levelId: form.levelId,
        totalSessions: form.totalSessions,
        durationWeeks: form.durationWeeks.trim() === '' ? null : Number(form.durationWeeks),
        tuitionFee: form.tuitionFee.trim() === '' ? null : Number(form.tuitionFee),
        status: form.status,
      };
      if (!id) {
        payload.code = form.code.trim();
        await apiClient.post('/categories/courses', payload);
      } else {
        await apiClient.patch(`/categories/courses/${id}`, payload);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['catalog-courses'] });
      setIsModalOpen(false);
      setEditingCourse(null);
      setMessage({ code: 'OK', text: 'Đã lưu khóa học.', type: 'success' });
    },
    onError: (err: unknown) => {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Không lưu được.';
      setMessage({ code: 'ERR', text: msg, type: 'error' });
    },
  });

  const deactivateMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/categories/courses/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['catalog-courses'] });
      setMessage({ code: 'OK', text: 'Đã ngừng áp dụng khóa học.', type: 'success' });
    },
    onError: (err: unknown) => {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Không thực hiện được.';
      setMessage({ code: 'ERR', text: msg, type: 'error' });
    },
  });

  const handleSave = (form: CourseCatalogForm) => {
    saveMutation.mutate({ id: editingCourse?.id, form });
  };

  const catalogStatusLabel = (s: string) =>
    s === 'ACTIVE' ? 'Hoạt động' : s === 'INACTIVE' ? 'Ngừng' : s;

  const feeLabel = (c: CourseCatalogRow) => {
    if (c.tuitionFee == null || c.tuitionFee === '') return '—';
    return String(c.tuitionFee);
  };

  const levelOptions = useMemo(() => levels, [levels]);

  return (
    <AppLayout>
      <NotificationPortal message={message} onClose={() => setMessage(null)} />
      <PageHeader
        title="Quản lý khóa học"
        breadcrumb={[{ label: 'Điều hành', href: '#' }, { label: 'Khóa học' }]}
      />

      <div className="flex animate-fade-in flex-col gap-6 pb-10">
        <Card className="p-6 shadow-md">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                {getIcon('Globe', 24)}
              </span>
              <div>
                <p className="font-body text-sm text-midnight/50">
                  Khóa học gắn cấp độ &amp; chương trình (API). Tìm kiếm có debounce 300ms.
                </p>
              </div>
            </div>
            <Button type="button" className="gap-2" onClick={() => {
              setEditingCourse(null);
              setIsModalOpen(true);
            }}>
              {getIcon('Plus', 18)} Thêm khóa học
            </Button>
          </div>
        </Card>

        <Card className="p-4 shadow-md">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1">
              <Input
                label="Tìm kiếm (mã / tên)"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                placeholder="Nhập từ khóa..."
              />
            </div>
            <div className="w-full md:w-64">
              <Select
                label="Lọc theo cấp độ"
                value={levelFilter}
                onChange={(e) => {
                  setLevelFilter(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">Tất cả cấp độ</option>
                {levelOptions.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.program?.code ? `${l.program.code} / ` : ''}
                    {l.code} — {l.name}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden p-0 shadow-md">
          {isLoading ? (
            <p className="p-8 text-center font-body text-midnight/40">Đang tải...</p>
          ) : isError ? (
            <p className="p-8 text-center font-body text-red-600">
              {(error as { message?: string })?.message ?? 'Lỗi tải danh sách.'}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-sm">
                <thead className="border-b border-midnight/10 bg-midnight/[0.03] font-label text-[10px] uppercase tracking-wider text-gold">
                  <tr>
                    <th className="px-4 py-3">Mã</th>
                    <th className="px-4 py-3">Tên</th>
                    <th className="px-4 py-3">Chương trình / Cấp</th>
                    <th className="px-4 py-3 text-center">Buổi</th>
                    <th className="px-4 py-3 text-center">Tuần</th>
                    <th className="px-4 py-3 text-right">Học phí</th>
                    <th className="px-4 py-3 text-center">Trạng thái</th>
                    <th className="px-4 py-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-midnight/5">
                  {courses.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-10 text-center text-midnight/40">
                        Không có khóa học phù hợp.
                      </td>
                    </tr>
                  ) : (
                    courses.map((c) => (
                      <tr key={c.id} className="hover:bg-midnight/[0.02]">
                        <td className="px-4 py-3 font-mono text-xs text-gold">{c.code}</td>
                        <td className="px-4 py-3 font-medium text-midnight/90">{c.name}</td>
                        <td className="px-4 py-3 text-midnight/70">
                          {c.level?.program?.code ?? '—'} / {c.level?.name ?? '—'}
                        </td>
                        <td className="px-4 py-3 text-center">{c.totalSessions}</td>
                        <td className="px-4 py-3 text-center">{c.durationWeeks ?? '—'}</td>
                        <td className="px-4 py-3 text-right">{feeLabel(c)}</td>
                        <td className="px-4 py-3 text-center text-xs">{catalogStatusLabel(c.status)}</td>
                        <td className="px-4 py-3 text-right">
                          <Button
                            type="button"
                            variant="ghost"
                            className="mr-2 text-xs"
                            onClick={() => {
                              setEditingCourse(c);
                              setIsModalOpen(true);
                            }}
                          >
                            Sửa
                          </Button>
                          {c.status === 'ACTIVE' && (
                            <Button
                              type="button"
                              variant="ghost"
                              className="text-xs text-midnight/50"
                              onClick={() => {
                                if (window.confirm('Ngừng áp dụng khóa học này?')) {
                                  deactivateMutation.mutate(c.id);
                                }
                              }}
                            >
                              Ngừng
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
          {meta && meta.totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-midnight/10 px-4 py-3">
              <span className="font-body text-xs text-midnight/45">
                Trang {meta.page} / {meta.totalPages} · {meta.total} khóa
              </span>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Trước
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  disabled={page >= meta.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Sau
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>

      {isModalOpen && (
        <CourseCatalogModal
          key={editingCourse?.id ?? 'new'}
          isOpen={isModalOpen}
          course={editingCourse}
          levels={levelOptions}
          onClose={() => {
            setIsModalOpen(false);
            setEditingCourse(null);
          }}
          onSave={handleSave}
          isSubmitting={saveMutation.isPending}
        />
      )}
    </AppLayout>
  );
}
