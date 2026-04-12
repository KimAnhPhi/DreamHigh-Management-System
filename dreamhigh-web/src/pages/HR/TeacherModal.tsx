import React, { useId, useRef, useState } from 'react';
import { Banknote, FileBadge, FileText, Trash2, Upload, UserCog, X } from 'lucide-react';
import { Button } from '../../design-system/components/ui/Button';
import { Card } from '../../design-system/components/ui/Card';
import { Input, Select } from '../../design-system/components/ui/Input';
import type { Teacher, TeacherDocument, TeacherDocumentType, TeacherStatus, TeacherType } from '../../types/teacherHr';

const SPECIALIZATION_LEVELS = ['Starters', 'Movers', 'Flyers', 'Elementary', 'IELTS', 'Communication'] as const;

export interface TeacherModalProps {
  teacher: Teacher | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Teacher) => void;
}

function defaultTeacher(): Teacher {
  return {
    id: `t-${Date.now()}`,
    code: `GV-${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0')}`,
    name: '',
    type: 'Vietnamese',
    email: '',
    phone: '',
    address: '',
    specialization: [],
    rates: { offlineRate: 200_000, onlineRate: 150_000 },
    status: 'Đang làm việc',
    performanceScore: 5,
    joinDate: new Date().toISOString().split('T')[0],
    documents: [],
  };
}

const TeacherModal: React.FC<TeacherModalProps> = (props) => {
  if (!props.isOpen) return null;
  return <TeacherModalInner key={props.teacher?.id ?? 'new'} {...props} />;
};

const TeacherModalInner: React.FC<TeacherModalProps> = ({ teacher, onClose, onSave }) => {
  const titleId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<Teacher>(() =>
    teacher
      ? {
          ...teacher,
          specialization: [...teacher.specialization],
          documents: teacher.documents.map((d) => ({ ...d })),
        }
      : defaultTeacher(),
  );
  const [newDocType, setNewDocType] = useState<TeacherDocumentType>('CV/Profile');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const newDoc: TeacherDocument = {
      id: `doc-${Date.now()}`,
      name: file.name.replace(/\.[^/.]+$/, ''),
      type: newDocType,
      fileName: file.name,
      fileUrl: '#',
      uploadDate: new Date().toISOString().split('T')[0],
    };
    setFormData((prev) => ({ ...prev, documents: [...prev.documents, newDoc] }));
    e.target.value = '';
  };

  const removeDocument = (id: string) => {
    setFormData((prev) => ({ ...prev, documents: prev.documents.filter((d) => d.id !== id) }));
  };

  const docIcon = (type: TeacherDocumentType) => {
    const cls =
      type === 'CV/Profile'
        ? 'bg-info-bg text-info'
        : type === 'Bằng cấp'
          ? 'border border-midnight/10 bg-midnight/5 text-midnight'
          : 'bg-gold/10 text-gold';
    const Icon = type === 'CV/Profile' ? FileText : FileBadge;
    return (
      <div className={`rounded-lg p-2 ${cls}`}>
        <Icon size={16} strokeWidth={2} aria-hidden />
      </div>
    );
  };

  return (
    <div
      className="custom-scrollbar fixed inset-0 z-[70] flex items-center justify-center bg-midnight/55 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <Card className="flex max-h-[95vh] w-full max-w-3xl flex-col overflow-hidden p-0 shadow-2xl animate-fade-in">
        <div className="flex items-center justify-between border-b border-midnight/10 bg-midnight px-8 py-6">
          <div>
            <h2 id={titleId} className="font-label text-xl font-semibold uppercase tracking-tight text-white">
              {teacher ? 'Hiệu chỉnh hồ sơ' : 'Thêm giáo viên'}
            </h2>
            <p className="mt-1 font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">Teacher HR (mock)</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white/5 p-2 text-white/50 hover:text-white"
            aria-label="Đóng"
          >
            <X size={24} strokeWidth={2} aria-hidden />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-hidden">
          <div className="custom-scrollbar space-y-10 overflow-y-auto px-10 py-10">
            <section className="space-y-6">
              <h3 className="flex items-center gap-2 border-b border-midnight/10 pb-2 font-label text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                <UserCog size={14} strokeWidth={2} aria-hidden />
                01. Định danh
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="lg:col-span-1">
                  <label className="mb-2 block font-label text-[10px] font-semibold uppercase tracking-widest text-midnight/45">
                    Mã giáo viên
                  </label>
                  <Input
                    required
                    className="font-mono font-semibold text-gold"
                    value={formData.code}
                    onChange={(e) => setFormData((p) => ({ ...p, code: e.target.value.toUpperCase() }))}
                  />
                </div>
                <div className="md:col-span-2 lg:col-span-2">
                  <label className="mb-2 block font-label text-[10px] font-semibold uppercase tracking-widest text-midnight/45">
                    Họ và tên
                  </label>
                  <Input
                    required
                    placeholder="Nhập họ tên…"
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="mb-2 block font-label text-[10px] font-semibold uppercase tracking-widest text-midnight/45">
                    Email
                  </label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="mb-2 block font-label text-[10px] font-semibold uppercase tracking-widest text-midnight/45">
                    Số điện thoại
                  </label>
                  <Input value={formData.phone} onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))} />
                </div>
                <div>
                  <label className="mb-2 block font-label text-[10px] font-semibold uppercase tracking-widest text-midnight/45">
                    Phân loại
                  </label>
                  <Select
                    value={formData.type}
                    onChange={(e) => setFormData((p) => ({ ...p, type: e.target.value as TeacherType }))}
                  >
                    <option value="Vietnamese">Giáo viên Việt Nam</option>
                    <option value="Foreign">Giáo viên nước ngoài</option>
                    <option value="Assistant">Trợ giảng</option>
                  </Select>
                </div>
                <div>
                  <label className="mb-2 block font-label text-[10px] font-semibold uppercase tracking-widest text-midnight/45">
                    Trạng thái
                  </label>
                  <Select
                    value={formData.status}
                    onChange={(e) => setFormData((p) => ({ ...p, status: e.target.value as TeacherStatus }))}
                  >
                    <option value="Đang làm việc">Đang làm việc</option>
                    <option value="Tạm nghỉ">Tạm nghỉ</option>
                    <option value="Đã nghỉ việc">Đã nghỉ việc</option>
                  </Select>
                </div>
                <div>
                  <label className="mb-2 block font-label text-[10px] font-semibold uppercase tracking-widest text-midnight/45">
                    Ngày bắt đầu
                  </label>
                  <Input
                    type="date"
                    value={formData.joinDate}
                    onChange={(e) => setFormData((p) => ({ ...p, joinDate: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="mb-2 block font-label text-[10px] font-semibold uppercase tracking-widest text-midnight/45">
                    Điểm hiệu suất (0–5)
                  </label>
                  <Input
                    type="number"
                    min={0}
                    max={5}
                    step={0.1}
                    value={formData.performanceScore}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, performanceScore: Math.min(5, Math.max(0, Number(e.target.value) || 0)) }))
                    }
                  />
                </div>
                <div className="lg:col-span-3">
                  <label className="mb-2 block font-label text-[10px] font-semibold uppercase tracking-widest text-midnight/45">
                    Địa chỉ
                  </label>
                  <Input
                    value={formData.address ?? ''}
                    onChange={(e) => setFormData((p) => ({ ...p, address: e.target.value }))}
                    placeholder="Tuỳ chọn"
                  />
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="flex items-center gap-2 border-b border-midnight/10 pb-2 font-label text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                <Banknote size={14} strokeWidth={2} aria-hidden />
                02. Đơn giá &amp; chuyên môn
              </h3>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="flex flex-col gap-4 rounded-3xl border border-gold/25 bg-gold/5 p-6">
                  <p className="text-center font-label text-[10px] font-semibold uppercase tracking-widest text-gold">Đơn giá / giờ</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-center font-label text-[9px] font-semibold uppercase text-midnight/50">
                        Offline
                      </label>
                      <Input
                        type="number"
                        className="text-center font-semibold text-gold"
                        value={formData.rates.offlineRate}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            rates: { ...p.rates, offlineRate: Number.parseInt(e.target.value, 10) || 0 },
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-center font-label text-[9px] font-semibold uppercase text-midnight/50">
                        Online
                      </label>
                      <Input
                        type="number"
                        className="text-center font-semibold text-gold"
                        value={formData.rates.onlineRate}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            rates: { ...p.rates, onlineRate: Number.parseInt(e.target.value, 10) || 0 },
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="block font-label text-[10px] font-semibold uppercase tracking-widest text-midnight/45">
                    Chuyên môn
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SPECIALIZATION_LEVELS.map((lvl) => {
                      const on = formData.specialization.includes(lvl);
                      return (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => {
                            const current = formData.specialization;
                            const next = on ? current.filter((x) => x !== lvl) : [...current, lvl];
                            setFormData((p) => ({ ...p, specialization: next }));
                          }}
                          className={`rounded-full border px-3 py-1.5 font-label text-[10px] font-semibold transition-all ${
                            on ? 'border-midnight bg-midnight text-gold' : 'border-midnight/15 bg-surface text-midnight/45'
                          }`}
                        >
                          {lvl}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="flex items-center gap-2 border-b border-midnight/10 pb-2 font-label text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                <FileBadge size={14} strokeWidth={2} aria-hidden />
                03. Hồ sơ đính kèm
              </h3>
              <div className="rounded-3xl border border-dashed border-midnight/15 bg-midnight/[0.03] p-6">
                <div className="mb-6 flex flex-col items-end gap-4 md:flex-row md:items-end">
                  <div className="w-full flex-1">
                    <label className="mb-2 block font-label text-[10px] font-semibold uppercase tracking-widest text-midnight/45">
                      Loại hồ sơ
                    </label>
                    <Select value={newDocType} onChange={(e) => setNewDocType(e.target.value as TeacherDocumentType)}>
                      <option value="CV/Profile">CV / Profile</option>
                      <option value="Bằng cấp">Bằng cấp</option>
                      <option value="Chứng chỉ">Chứng chỉ</option>
                      <option value="Hợp đồng">Hợp đồng</option>
                      <option value="Khác">Khác</option>
                    </Select>
                  </div>
                  <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileSelect} />
                  <Button type="button" className="gap-2 text-[10px] uppercase" onClick={() => fileInputRef.current?.click()}>
                    <Upload size={14} strokeWidth={2} aria-hidden />
                    Chọn tệp
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {formData.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="group flex items-center justify-between rounded-2xl border border-midnight/8 bg-surface p-3 shadow-sm"
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        {docIcon(doc.type)}
                        <div className="min-w-0 truncate">
                          <p className="truncate font-body text-xs font-semibold text-midnight">{doc.name}</p>
                          <p className="font-label text-[9px] font-semibold uppercase text-midnight/40">{doc.type}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDocument(doc.id)}
                        className="rounded-lg p-2 text-midnight/30 opacity-0 transition-all hover:bg-error-bg hover:text-error group-hover:opacity-100"
                        aria-label="Xóa tệp"
                      >
                        <Trash2 size={16} strokeWidth={2} aria-hidden />
                      </button>
                    </div>
                  ))}
                  {formData.documents.length === 0 ? (
                    <div className="col-span-full py-8 text-center italic opacity-40">
                      <p className="font-label text-[10px] font-semibold uppercase tracking-widest">Chưa có hồ sơ</p>
                    </div>
                  ) : null}
                </div>
              </div>
            </section>
          </div>

          <div className="flex gap-4 border-t border-midnight/10 bg-midnight/5 p-8">
            <Button type="button" variant="ghost" className="flex-1 py-4" onClick={onClose}>
              Huỷ
            </Button>
            <Button type="submit" className="flex-1 py-4 shadow-lg">
              {teacher ? 'Cập nhật' : 'Lưu hồ sơ'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default TeacherModal;
