import React, { useState } from 'react';
import { Card } from '../../../../design-system/components/ui/Card';
import { Input } from '../../../../design-system/components/ui/Input';
import { getIcon } from '../adminSystemIcons';

const AdminSettingsTab: React.FC = () => {
  const [sessionHours, setSessionHours] = useState('1.5');
  const [maxSessions, setMaxSessions] = useState('48');
  const [qrAttendance, setQrAttendance] = useState(true);
  const [currency, setCurrency] = useState('VND');
  const [vat, setVat] = useState('8');
  const [lateFee, setLateFee] = useState(false);
  const [smsFee, setSmsFee] = useState(true);

  return (
    <div className="grid grid-cols-1 gap-8 animate-fade-in md:grid-cols-2">
      <Card className="space-y-8 p-8 shadow-md">
        <h3 className="flex items-center gap-2 border-b border-midnight/10 pb-4 font-label font-semibold uppercase tracking-tight text-midnight">
          {getIcon('GraduationCap', 20)} Cấu hình học vụ
        </h3>
        <div className="space-y-6">
          <Input
            label="Thời lượng buổi học mặc định (giờ)"
            value={sessionHours}
            onChange={(e) => setSessionHours(e.target.value)}
          />
          <Input label="Số buổi tối đa / khóa học" value={maxSessions} onChange={(e) => setMaxSessions(e.target.value)} />
          <div className="flex items-center justify-between gap-4">
            <span className="font-body text-sm font-semibold text-midnight">Tự động điểm danh qua QR Code</span>
            <button
              type="button"
              role="switch"
              aria-checked={qrAttendance}
              onClick={() => setQrAttendance((v) => !v)}
              className={`relative h-6 w-12 shrink-0 rounded-full transition-colors ${qrAttendance ? 'bg-gold' : 'bg-midnight/30'}`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${qrAttendance ? 'right-1' : 'left-1'}`}
              />
            </button>
          </div>
        </div>
      </Card>

      <Card className="space-y-8 bg-midnight p-8 text-white shadow-xl">
        <h3 className="flex items-center gap-2 border-b border-white/10 pb-4 font-label font-semibold uppercase tracking-widest text-gold">
          {getIcon('Wallet', 20)} Cấu hình tài chính
        </h3>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block font-label text-[10px] font-semibold uppercase tracking-widest text-white/50">
                Đơn vị tiền tệ
              </label>
              <input
                type="text"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="input-field border-white/10 bg-white/5 text-white placeholder:text-white/30"
              />
            </div>
            <div>
              <label className="mb-2 block font-label text-[10px] font-semibold uppercase tracking-widest text-white/50">
                Thuế VAT (%)
              </label>
              <input
                type="text"
                value={vat}
                onChange={(e) => setVat(e.target.value)}
                className="input-field border-white/10 bg-white/5 text-white placeholder:text-white/30"
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="font-body text-sm font-semibold">Tự động tính phí đóng muộn</span>
            <button
              type="button"
              role="switch"
              aria-checked={lateFee}
              onClick={() => setLateFee((v) => !v)}
              className={`relative h-6 w-12 shrink-0 rounded-full transition-colors ${lateFee ? 'bg-gold' : 'bg-white/20'}`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${lateFee ? 'right-1' : 'left-1'}`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="font-body text-sm font-semibold">SMS khi thu học phí</span>
            <button
              type="button"
              role="switch"
              aria-checked={smsFee}
              onClick={() => setSmsFee((v) => !v)}
              className={`relative h-6 w-12 shrink-0 rounded-full transition-colors ${smsFee ? 'bg-gold' : 'bg-white/20'}`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${smsFee ? 'right-1' : 'left-1'}`}
              />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminSettingsTab;
