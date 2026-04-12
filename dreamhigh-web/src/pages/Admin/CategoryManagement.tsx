import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { AppLayout } from '../../design-system/components/layout/AppLayout';
import { PageHeader } from '../../design-system/components/layout/PageHeader';
import { Button } from '../../design-system/components/ui/Button';
import { Card } from '../../design-system/components/ui/Card';
import { Input, Select, TextArea } from '../../design-system/components/ui/Input';
import { Tabs } from '../../design-system/components/ui/Tabs';
import { apiClient } from '../../services/apiClient';
import NotificationPortal from './system/NotificationPortal';
import { getIcon } from './system/adminSystemIcons';
import type { AdminMessage } from '../../types/adminSystem';

type TabKey = 'programs' | 'levels' | 'classTypes' | 'rooms';

const catalogLabel = (s: string) => (s === 'ACTIVE' ? 'Hoạt động' : s === 'INACTIVE' ? 'Ngừng' : s);

const roomStatusLabel = (s: string) => {
  if (s === 'AVAILABLE') return 'Sẵn sàng';
  if (s === 'MAINTENANCE') return 'Bảo trì';
  if (s === 'INACTIVE') return 'Ngừng';
  return s;
};

export default function CategoryManagement() {
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<TabKey>('programs');
  const [message, setMessage] = useState<AdminMessage | null>(null);

  const { data: branches = [] } = useQuery({
    queryKey: ['catalog-branches'],
    queryFn: async () => {
      const r = await apiClient.get('/categories/branches');
      return r.data as Array<{ id: number; code: string; name: string }>;
    },
  });

  const { data: programs = [], isLoading: loadP } = useQuery({
    queryKey: ['catalog-programs'],
    queryFn: async () => {
      const r = await apiClient.get('/categories/programs?includeInactive=true');
      return r.data as Array<{ id: number; code: string; name: string; description?: string | null; status: string; _count?: { levels: number } }>;
    },
  });

  const { data: levels = [], isLoading: loadL } = useQuery({
    queryKey: ['catalog-levels'],
    queryFn: async () => {
      const r = await apiClient.get('/categories/levels?includeInactive=true');
      return r.data as Array<{ id: number; programId: number; code: string; name: string; sortOrder: number; status: string; program?: { code: string; name: string } }>;
    },
  });

  const { data: classTypes = [], isLoading: loadCt } = useQuery({
    queryKey: ['catalog-class-types'],
    queryFn: async () => {
      const r = await apiClient.get('/categories/class-types?includeInactive=true');
      return r.data as Array<{ id: number; code: string; name: string; description?: string | null; status: string }>;
    },
  });

  const { data: rooms = [], isLoading: loadR } = useQuery({
    queryKey: ['catalog-rooms'],
    queryFn: async () => {
      const r = await apiClient.get('/categories/rooms?includeInactive=true');
      return r.data as Array<{
        id: number;
        branchId: number;
        roomCode: string;
        name: string | null;
        capacity: number;
        status: string;
        branch?: { code: string; name: string };
      }>;
    },
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['catalog-programs'] });
    queryClient.invalidateQueries({ queryKey: ['catalog-levels'] });
    queryClient.invalidateQueries({ queryKey: ['catalog-class-types'] });
    queryClient.invalidateQueries({ queryKey: ['catalog-rooms'] });
    queryClient.invalidateQueries({ queryKey: ['catalog-levels-all'] });
    queryClient.invalidateQueries({ queryKey: ['catalog-courses'] });
  };

  const notify = (text: string, type: AdminMessage['type'] = 'success') => {
    setMessage({ code: 'CAT', text, type });
  };

  const tabs = [
    { key: 'programs' as const, label: 'Chương trình' },
    { key: 'levels' as const, label: 'Cấp độ' },
    { key: 'classTypes' as const, label: 'Loại lớp' },
    { key: 'rooms' as const, label: 'Phòng học' },
  ];

  return (
    <AppLayout>
      <NotificationPortal message={message} onClose={() => setMessage(null)} />
      <PageHeader
        title="Danh mục đào tạo"
        breadcrumb={[{ label: 'Quản trị', href: '#' }, { label: 'Danh mục' }]}
      />

      <Card className="mt-6 p-4 shadow-md">
        <Tabs items={tabs} activeKey={tab} onChange={(k) => setTab(k as TabKey)} />
      </Card>

      <div className="mt-6">
        {tab === 'programs' && (
          <ProgramsSection
            programs={programs}
            loading={loadP}
            onInvalidate={invalidate}
            notify={notify}
          />
        )}
        {tab === 'levels' && (
          <LevelsSection
            levels={levels}
            programs={programs}
            loading={loadL}
            onInvalidate={invalidate}
            notify={notify}
          />
        )}
        {tab === 'classTypes' && (
          <ClassTypesSection
            items={classTypes}
            loading={loadCt}
            onInvalidate={invalidate}
            notify={notify}
          />
        )}
        {tab === 'rooms' && (
          <RoomsSection
            rooms={rooms}
            branches={branches}
            loading={loadR}
            onInvalidate={invalidate}
            notify={notify}
          />
        )}
      </div>
    </AppLayout>
  );
}

function ProgramsSection({
  programs,
  loading,
  onInvalidate,
  notify,
}: {
  programs: Array<{ id: number; code: string; name: string; description?: string | null; status: string; _count?: { levels: number } }>;
  loading: boolean;
  onInvalidate: () => void;
  notify: (t: string, ty?: AdminMessage['type']) => void;
}) {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<(typeof programs)[0] | null>(null);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const m = useMutation({
    mutationFn: async () => {
      if (edit) {
        await apiClient.patch(`/categories/programs/${edit.id}`, { name, description: description || null });
      } else {
        await apiClient.post('/categories/programs', { code, name, description: description || null });
      }
    },
    onSuccess: () => {
      onInvalidate();
      setOpen(false);
      notify('Đã lưu chương trình.');
    },
    onError: (e: unknown) => {
      const msg = (e as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Lỗi lưu.';
      notify(msg, 'error');
    },
  });

  const del = useMutation({
    mutationFn: async (id: number) => apiClient.delete(`/categories/programs/${id}`),
    onSuccess: () => {
      onInvalidate();
      notify('Đã ngừng chương trình (và cấp độ liên quan).');
    },
    onError: (e: unknown) => {
      const msg = (e as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Lỗi.';
      notify(msg, 'error');
    },
  });

  return (
    <Card className="p-0 shadow-md">
      <div className="flex items-center justify-between border-b border-midnight/10 px-4 py-3">
        <h2 className="font-label text-xs font-semibold uppercase tracking-wider text-gold">Chương trình (Program)</h2>
        <Button
          type="button"
          className="gap-2"
          onClick={() => {
            setEdit(null);
            setCode('');
            setName('');
            setDescription('');
            setOpen(true);
          }}
        >
          {getIcon('Plus', 16)} Thêm
        </Button>
      </div>
      {loading ? (
        <p className="p-6 text-midnight/40">Đang tải...</p>
      ) : (
        <table className="w-full text-left text-sm">
          <thead className="bg-midnight/[0.03] font-label text-[10px] uppercase text-gold">
            <tr>
              <th className="px-4 py-2">Mã</th>
              <th className="px-4 py-2">Tên</th>
              <th className="px-4 py-2 text-center">Cấp độ</th>
              <th className="px-4 py-2">Trạng thái</th>
              <th className="px-4 py-2 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-midnight/5">
            {programs.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-2 font-mono text-xs text-gold">{p.code}</td>
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2 text-center">{p._count?.levels ?? '—'}</td>
                <td className="px-4 py-2 text-xs">{catalogLabel(p.status)}</td>
                <td className="px-4 py-2 text-right">
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-xs"
                    onClick={() => {
                      setEdit(p);
                      setCode(p.code);
                      setName(p.name);
                      setDescription(p.description ?? '');
                      setOpen(true);
                    }}
                  >
                    Sửa
                  </Button>
                  {p.status === 'ACTIVE' && (
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-xs text-midnight/50"
                      onClick={() => {
                        if (window.confirm('Ngừng chương trình này?')) del.mutate(p.id);
                      }}
                    >
                      Ngừng
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {open && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-midnight/45 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-md p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-label font-semibold text-midnight">{edit ? 'Sửa chương trình' : 'Thêm chương trình'}</h3>
              <button type="button" onClick={() => setOpen(false)} className="text-midnight/50" aria-label="Đóng">
                <X size={20} />
              </button>
            </div>
            {!edit && (
              <Input label="Mã" required value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} className="mb-3" />
            )}
            <Input label="Tên" required value={name} onChange={(e) => setName(e.target.value)} className="mb-3" />
            <TextArea label="Mô tả" rows={2} value={description} onChange={(e) => setDescription(e.target.value)} className="mb-4" />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                Huỷ
              </Button>
              <Button type="button" disabled={m.isPending} onClick={() => m.mutate()}>
                {m.isPending ? '...' : 'Lưu'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </Card>
  );
}

function LevelsSection({
  levels,
  programs,
  loading,
  onInvalidate,
  notify,
}: {
  levels: Array<{ id: number; programId: number; code: string; name: string; sortOrder: number; status: string; program?: { code: string } }>;
  programs: Array<{ id: number; code: string }>;
  loading: boolean;
  onInvalidate: () => void;
  notify: (t: string, ty?: AdminMessage['type']) => void;
}) {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<(typeof levels)[0] | null>(null);
  const [programId, setProgramId] = useState<number>(0);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [sortOrder, setSortOrder] = useState(0);

  const m = useMutation({
    mutationFn: async () => {
      if (edit) {
        await apiClient.patch(`/categories/levels/${edit.id}`, { name, sortOrder });
      } else {
        await apiClient.post('/categories/levels', { programId, code, name, sortOrder });
      }
    },
    onSuccess: () => {
      onInvalidate();
      setOpen(false);
      notify('Đã lưu cấp độ.');
    },
    onError: (e: unknown) => {
      const msg = (e as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Lỗi lưu.';
      notify(msg, 'error');
    },
  });

  const del = useMutation({
    mutationFn: async (id: number) => apiClient.delete(`/categories/levels/${id}`),
    onSuccess: () => {
      onInvalidate();
      notify('Đã ngừng cấp độ.');
    },
    onError: (e: unknown) => {
      const msg = (e as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Lỗi.';
      notify(msg, 'error');
    },
  });

  return (
    <Card className="p-0 shadow-md">
      <div className="flex items-center justify-between border-b border-midnight/10 px-4 py-3">
        <h2 className="font-label text-xs font-semibold uppercase tracking-wider text-gold">Cấp độ (Level)</h2>
        <Button
          type="button"
          className="gap-2"
          onClick={() => {
            setEdit(null);
            setProgramId(programs[0]?.id ?? 0);
            setCode('');
            setName('');
            setSortOrder(0);
            setOpen(true);
          }}
        >
          {getIcon('Plus', 16)} Thêm
        </Button>
      </div>
      {loading ? (
        <p className="p-6 text-midnight/40">Đang tải...</p>
      ) : (
        <table className="w-full text-left text-sm">
          <thead className="bg-midnight/[0.03] font-label text-[10px] uppercase text-gold">
            <tr>
              <th className="px-4 py-2">Chương trình</th>
              <th className="px-4 py-2">Mã</th>
              <th className="px-4 py-2">Tên</th>
              <th className="px-4 py-2 text-center">Thứ tự</th>
              <th className="px-4 py-2">TT</th>
              <th className="px-4 py-2 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-midnight/5">
            {levels.map((l) => (
              <tr key={l.id}>
                <td className="px-4 py-2 text-xs">{l.program?.code ?? l.programId}</td>
                <td className="px-4 py-2 font-mono text-xs">{l.code}</td>
                <td className="px-4 py-2">{l.name}</td>
                <td className="px-4 py-2 text-center">{l.sortOrder}</td>
                <td className="px-4 py-2 text-xs">{catalogLabel(l.status)}</td>
                <td className="px-4 py-2 text-right">
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-xs"
                    onClick={() => {
                      setEdit(l);
                      setProgramId(l.programId);
                      setCode(l.code);
                      setName(l.name);
                      setSortOrder(l.sortOrder);
                      setOpen(true);
                    }}
                  >
                    Sửa
                  </Button>
                  {l.status === 'ACTIVE' && (
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-xs text-midnight/50"
                      onClick={() => {
                        if (window.confirm('Ngừng cấp độ này?')) del.mutate(l.id);
                      }}
                    >
                      Ngừng
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {open && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-midnight/45 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-md p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-label font-semibold text-midnight">{edit ? 'Sửa cấp độ' : 'Thêm cấp độ'}</h3>
              <button type="button" onClick={() => setOpen(false)} className="text-midnight/50" aria-label="Đóng">
                <X size={20} />
              </button>
            </div>
            {!edit && (
              <>
                <Select label="Chương trình" value={String(programId)} onChange={(e) => setProgramId(Number(e.target.value))} className="mb-3">
                  {programs.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.code}
                    </option>
                  ))}
                </Select>
                <Input label="Mã cấp độ" required value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} className="mb-3" />
              </>
            )}
            <Input label="Tên" required value={name} onChange={(e) => setName(e.target.value)} className="mb-3" />
            <Input
              label="Thứ tự sắp xếp"
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value) || 0)}
              className="mb-4"
            />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                Huỷ
              </Button>
              <Button type="button" disabled={m.isPending} onClick={() => m.mutate()}>
                {m.isPending ? '...' : 'Lưu'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </Card>
  );
}

function ClassTypesSection({
  items,
  loading,
  onInvalidate,
  notify,
}: {
  items: Array<{ id: number; code: string; name: string; description?: string | null; status: string }>;
  loading: boolean;
  onInvalidate: () => void;
  notify: (t: string, ty?: AdminMessage['type']) => void;
}) {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<(typeof items)[0] | null>(null);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const m = useMutation({
    mutationFn: async () => {
      if (edit) {
        await apiClient.patch(`/categories/class-types/${edit.id}`, { name, description: description || null });
      } else {
        await apiClient.post('/categories/class-types', { code, name, description: description || null });
      }
    },
    onSuccess: () => {
      onInvalidate();
      setOpen(false);
      notify('Đã lưu loại lớp.');
    },
    onError: (e: unknown) => {
      const msg = (e as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Lỗi lưu.';
      notify(msg, 'error');
    },
  });

  const del = useMutation({
    mutationFn: async (id: number) => apiClient.delete(`/categories/class-types/${id}`),
    onSuccess: () => {
      onInvalidate();
      notify('Đã ngừng loại lớp.');
    },
    onError: (e: unknown) => {
      const msg = (e as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Lỗi.';
      notify(msg, 'error');
    },
  });

  return (
    <Card className="p-0 shadow-md">
      <div className="flex items-center justify-between border-b border-midnight/10 px-4 py-3">
        <h2 className="font-label text-xs font-semibold uppercase tracking-wider text-gold">Loại lớp</h2>
        <Button
          type="button"
          className="gap-2"
          onClick={() => {
            setEdit(null);
            setCode('');
            setName('');
            setDescription('');
            setOpen(true);
          }}
        >
          {getIcon('Plus', 16)} Thêm
        </Button>
      </div>
      {loading ? (
        <p className="p-6 text-midnight/40">Đang tải...</p>
      ) : (
        <table className="w-full text-left text-sm">
          <thead className="bg-midnight/[0.03] font-label text-[10px] uppercase text-gold">
            <tr>
              <th className="px-4 py-2">Mã</th>
              <th className="px-4 py-2">Tên</th>
              <th className="px-4 py-2">TT</th>
              <th className="px-4 py-2 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-midnight/5">
            {items.map((it) => (
              <tr key={it.id}>
                <td className="px-4 py-2 font-mono text-xs text-gold">{it.code}</td>
                <td className="px-4 py-2">{it.name}</td>
                <td className="px-4 py-2 text-xs">{catalogLabel(it.status)}</td>
                <td className="px-4 py-2 text-right">
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-xs"
                    onClick={() => {
                      setEdit(it);
                      setCode(it.code);
                      setName(it.name);
                      setDescription(it.description ?? '');
                      setOpen(true);
                    }}
                  >
                    Sửa
                  </Button>
                  {it.status === 'ACTIVE' && (
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-xs text-midnight/50"
                      onClick={() => {
                        if (window.confirm('Ngừng loại lớp này?')) del.mutate(it.id);
                      }}
                    >
                      Ngừng
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {open && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-midnight/45 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-md p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-label font-semibold text-midnight">{edit ? 'Sửa loại lớp' : 'Thêm loại lớp'}</h3>
              <button type="button" onClick={() => setOpen(false)} className="text-midnight/50" aria-label="Đóng">
                <X size={20} />
              </button>
            </div>
            {!edit && <Input label="Mã" required value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} className="mb-3" />}
            <Input label="Tên" required value={name} onChange={(e) => setName(e.target.value)} className="mb-3" />
            <TextArea label="Mô tả" rows={2} value={description} onChange={(e) => setDescription(e.target.value)} className="mb-4" />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                Huỷ
              </Button>
              <Button type="button" disabled={m.isPending} onClick={() => m.mutate()}>
                {m.isPending ? '...' : 'Lưu'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </Card>
  );
}

function RoomsSection({
  rooms,
  branches,
  loading,
  onInvalidate,
  notify,
}: {
  rooms: Array<{
    id: number;
    branchId: number;
    roomCode: string;
    name: string | null;
    capacity: number;
    status: string;
    branch?: { code: string; name: string };
  }>;
  branches: Array<{ id: number; code: string; name: string }>;
  loading: boolean;
  onInvalidate: () => void;
  notify: (t: string, ty?: AdminMessage['type']) => void;
}) {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<(typeof rooms)[0] | null>(null);
  const [branchId, setBranchId] = useState(0);
  const [roomCode, setRoomCode] = useState('');
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState(12);

  const m = useMutation({
    mutationFn: async () => {
      if (edit) {
        await apiClient.patch(`/categories/rooms/${edit.id}`, {
          name: name || null,
          capacity,
        });
      } else {
        await apiClient.post('/categories/rooms', { branchId, roomCode, name: name || null, capacity });
      }
    },
    onSuccess: () => {
      onInvalidate();
      setOpen(false);
      notify('Đã lưu phòng.');
    },
    onError: (e: unknown) => {
      const msg = (e as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Lỗi lưu.';
      notify(msg, 'error');
    },
  });

  const del = useMutation({
    mutationFn: async (id: number) => apiClient.delete(`/categories/rooms/${id}`),
    onSuccess: () => {
      onInvalidate();
      notify('Đã ngừng sử dụng phòng.');
    },
    onError: (e: unknown) => {
      const msg = (e as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Lỗi.';
      notify(msg, 'error');
    },
  });

  return (
    <Card className="p-0 shadow-md">
      <div className="flex items-center justify-between border-b border-midnight/10 px-4 py-3">
        <h2 className="font-label text-xs font-semibold uppercase tracking-wider text-gold">Phòng học</h2>
        <Button
          type="button"
          className="gap-2"
          onClick={() => {
            setEdit(null);
            setBranchId(branches[0]?.id ?? 0);
            setRoomCode('');
            setName('');
            setCapacity(12);
            setOpen(true);
          }}
        >
          {getIcon('Plus', 16)} Thêm
        </Button>
      </div>
      {loading ? (
        <p className="p-6 text-midnight/40">Đang tải...</p>
      ) : (
        <table className="w-full text-left text-sm">
          <thead className="bg-midnight/[0.03] font-label text-[10px] uppercase text-gold">
            <tr>
              <th className="px-4 py-2">Cơ sở</th>
              <th className="px-4 py-2">Mã phòng</th>
              <th className="px-4 py-2">Tên</th>
              <th className="px-4 py-2 text-center">Sức chứa</th>
              <th className="px-4 py-2">TT</th>
              <th className="px-4 py-2 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-midnight/5">
            {rooms.map((r) => (
              <tr key={r.id}>
                <td className="px-4 py-2 text-xs">{r.branch?.code ?? r.branchId}</td>
                <td className="px-4 py-2 font-mono text-xs">{r.roomCode}</td>
                <td className="px-4 py-2">{r.name ?? '—'}</td>
                <td className="px-4 py-2 text-center">{r.capacity}</td>
                <td className="px-4 py-2 text-xs">{roomStatusLabel(r.status)}</td>
                <td className="px-4 py-2 text-right">
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-xs"
                    onClick={() => {
                      setEdit(r);
                      setBranchId(r.branchId);
                      setRoomCode(r.roomCode);
                      setName(r.name ?? '');
                      setCapacity(r.capacity);
                      setOpen(true);
                    }}
                  >
                    Sửa
                  </Button>
                  {r.status !== 'INACTIVE' && (
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-xs text-midnight/50"
                      onClick={() => {
                        if (window.confirm('Ngừng sử dụng phòng này?')) del.mutate(r.id);
                      }}
                    >
                      Ngừng
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {open && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-midnight/45 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-md p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-label font-semibold text-midnight">{edit ? 'Sửa phòng' : 'Thêm phòng'}</h3>
              <button type="button" onClick={() => setOpen(false)} className="text-midnight/50" aria-label="Đóng">
                <X size={20} />
              </button>
            </div>
            {!edit && (
              <>
                <Select label="Cơ sở" value={String(branchId)} onChange={(e) => setBranchId(Number(e.target.value))} className="mb-3">
                  {branches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.code} — {b.name}
                    </option>
                  ))}
                </Select>
                <Input label="Mã phòng" required value={roomCode} onChange={(e) => setRoomCode(e.target.value.toUpperCase())} className="mb-3" />
              </>
            )}
            <Input label="Tên hiển thị" value={name} onChange={(e) => setName(e.target.value)} className="mb-3" />
            <Input
              label="Sức chứa"
              type="number"
              min={1}
              required
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value) || 0)}
              className="mb-4"
            />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                Huỷ
              </Button>
              <Button type="button" disabled={m.isPending} onClick={() => m.mutate()}>
                {m.isPending ? '...' : 'Lưu'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </Card>
  );
}
