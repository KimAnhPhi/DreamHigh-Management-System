import React, { useId, useState } from 'react';
import { Award, Trash2, Upload, X } from 'lucide-react';
import { Button } from '../../design-system/components/ui/Button';
import { Card } from '../../design-system/components/ui/Card';
import { Input, Select, TextArea } from '../../design-system/components/ui/Input';
import type { CrmStudent, CrmStudentDraft, CrmStudentStatus } from '../../types/crmStudent';

export interface StudentModalProps {
  student: CrmStudent | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CrmStudentDraft) => void;
}

function buildDraft(student: CrmStudent | null): CrmStudentDraft {
  if (student) {
    return {
      studentCode: student.studentCode,
      studentName: student.studentName,
      parentName: student.parentName,
      phone: student.phone,
      email: student.email || '',
      address: student.address || '',
      birthday: student.birthday || '',
      entryDate: student.entryDate,
      entryLevel: student.entryLevel,
      currentLevel: student.currentLevel,
      status: student.status,
      reservationFrom: student.reservationFrom || '',
      reservationTo: student.reservationTo || '',
      certificates: student.certificates || [],
      courses: student.courses,
      notes: student.notes || '',
    };
  }
  const autoCode = `HV${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0')}`;
  return {
    studentCode: autoCode,
    studentName: '',
    parentName: '',
    phone: '',
    email: '',
    address: '',
    birthday: '',
    entryDate: new Date().toISOString().split('T')[0],
    entryLevel: 'Pre-Starter',
    currentLevel: 'Pre-Starter',
    status: 'Đang học',
    reservationFrom: '',
    reservationTo: '',
    certificates: [],
    courses: [],
    notes: '',
  };
}

const StudentModal: React.FC<StudentModalProps> = ({ isOpen, student, onClose, onSave }) => {
  if (!isOpen) return null;
  return <StudentModalInner key={student?.id ?? 'new'} student={student} onClose={onClose} onSave={onSave} />;
};

const StudentModalInner: React.FC<Omit<StudentModalProps, 'isOpen'>> = ({ student, onClose, onSave }) => {
  const titleId = useId();
  const [formData, setFormData] = useState<CrmStudentDraft>(() => buildDraft(student));
  const merge = (p: Partial<CrmStudentDraft>) => setFormData((prev) => ({ ...prev, ...p }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const newCert = {
      id: `cert-${Date.now()}`,
      name: file.name.replace(/\.[^/.]+$/, ''),
      fileName: file.name,
      issueDate: new Date().toISOString().split('T')[0],
      fileUrl: '#',
    };
    setFormData((prev) => ({ ...prev, certificates: [...prev.certificates, newCert] }));
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-midnight/45 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <Card className="flex max-h-[95vh] w-full max-w-3xl flex-col overflow-hidden p-0 shadow-xl animate-fade-in">
        <div className="flex items-center justify-between border-b border-midnight/10 bg-midnight px-8 py-6">
          <div>
            <h2 id={titleId} className="font-label text-xl font-semibold uppercase tracking-tight text-white">
              {student ? 'Cập nhật hồ sơ' : 'Tiếp nhận học viên mới'}
            </h2>
            <p className="mt-1 font-label text-xs font-semibold uppercase tracking-widest text-gold">Dream High — hồ sơ học viên</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white/10 p-2 text-white/70 hover:bg-white/15 hover:text-white"
            aria-label="Đóng"
          >
            <X size={24} strokeWidth={2} aria-hidden />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="custom-scrollbar max-h-[min(72vh,560px)] space-y-10 overflow-y-auto p-8">
            <section className="space-y-6">
              <h3 className="border-b border-midnight/10 pb-2 font-label text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                01. Thông tin định danh
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <Input
                    label="Mã học viên"
                    required
                    className="font-mono text-gold"
                    value={formData.studentCode}
                    onChange={(e) => merge({ studentCode: e.target.value.toUpperCase() })}
                  />
                </div>
                <div className="md:col-span-2">
                  <Input
                    label="Họ và tên học viên"
                    required
                    value={formData.studentName}
                    onChange={(e) => merge({ studentName: e.target.value })}
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div>
                  <Input type="date" label="Ngày nhập học" value={formData.entryDate} onChange={(e) => merge({ entryDate: e.target.value })} />
                </div>
                <div>
                  <Select
                    label="Trạng thái"
                    value={formData.status}
                    onChange={(e) => merge({ status: e.target.value as CrmStudentStatus })}
                  >
                    <option value="Đang học">Đang học</option>
                    <option value="Bảo lưu">Bảo lưu</option>
                    <option value="Nghỉ học">Nghỉ học</option>
                  </Select>
                </div>
                <div className="lg:col-span-2">
                  <Input label="SĐT liên hệ" value={formData.phone} onChange={(e) => merge({ phone: e.target.value })} />
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="border-b border-midnight/10 pb-2 font-label text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                02. Lộ trình &amp; bảo lưu
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="grid grid-cols-2 gap-4 rounded-2xl border border-midnight/10 bg-midnight/[0.02] p-4">
                  <Input label="Cấp độ nhập học" value={formData.entryLevel} onChange={(e) => merge({ entryLevel: e.target.value })} />
                  <Input
                    label="Cấp độ hiện tại"
                    className="text-gold"
                    value={formData.currentLevel}
                    onChange={(e) => merge({ currentLevel: e.target.value })}
                  />
                </div>
                {formData.status === 'Bảo lưu' && (
                  <div className="grid grid-cols-2 gap-4 rounded-2xl border border-warning/25 bg-warning-bg p-4 animate-fade-in">
                    <Input
                      type="date"
                      label="Bảo lưu từ"
                      value={formData.reservationFrom}
                      onChange={(e) => merge({ reservationFrom: e.target.value })}
                    />
                    <Input type="date" label="Đến ngày" value={formData.reservationTo} onChange={(e) => merge({ reservationTo: e.target.value })} />
                  </div>
                )}
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="border-b border-midnight/10 pb-2 font-label text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                03. Chứng chỉ
              </h3>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="input-label mb-0">Chứng chỉ đã đạt</span>
                <div>
                  <input type="file" id="cert-upload" className="hidden" onChange={handleFileUpload} />
                  <label
                    htmlFor="cert-upload"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gold/15 px-4 py-2 font-label text-[10px] font-semibold uppercase text-gold transition-colors hover:bg-gold hover:text-midnight"
                  >
                    <Upload size={14} strokeWidth={2} aria-hidden /> Upload
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {formData.certificates.map((cert) => (
                  <div key={cert.id} className="group flex items-center justify-between rounded-xl border border-midnight/10 bg-bg p-3">
                    <div className="flex items-center gap-3">
                      <Award size={18} strokeWidth={2} className="text-gold" aria-hidden />
                      <div>
                        <p className="line-clamp-1 font-body text-xs font-semibold text-midnight">{cert.name}</p>
                        <p className="font-body text-[10px] text-midnight/45">{cert.issueDate}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          certificates: prev.certificates.filter((c) => c.id !== cert.id),
                        }))
                      }
                      className="text-midnight/30 opacity-0 transition-colors hover:text-error group-hover:opacity-100"
                      aria-label="Xóa chứng chỉ"
                    >
                      <Trash2 size={16} strokeWidth={2} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <div>
              <TextArea
                label="Ghi chú nội bộ"
                rows={4}
                className="italic"
                placeholder="Năng lực, hoàn cảnh…"
                value={formData.notes}
                onChange={(e) => merge({ notes: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-4 border-t border-midnight/10 bg-bg p-8">
            <Button type="button" variant="ghost" className="flex-1 py-4" onClick={onClose}>
              Huỷ
            </Button>
            <Button type="submit" className="flex-1 py-4 shadow-md">
              {student ? 'Cập nhật hồ sơ' : 'Lưu học viên'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default StudentModal;
