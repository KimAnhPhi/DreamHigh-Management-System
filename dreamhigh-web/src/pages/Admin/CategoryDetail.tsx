import React from 'react';
import { ChevronLeft, Power } from 'lucide-react';
import { Button } from '../../design-system/components/ui/Button';
import { Card } from '../../design-system/components/ui/Card';
import { getIcon } from '../Dashboard/dashboardConstants';
import type { Category } from '../../types/category';

export interface CategoryDetailProps {
  category: Category;
  onBack: () => void;
}

function isActiveStatus(status: Category['status']): boolean {
  return status === 'Hiệu lực';
}

const CategoryDetail: React.FC<CategoryDetailProps> = ({ category, onBack }) => {
  const active = isActiveStatus(category.status);

  return (
    <div className="flex animate-fade-in flex-col gap-6">
      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full p-2 text-midnight/50 transition-colors hover:bg-midnight/5 hover:text-midnight"
          title="Quay lại"
          aria-label="Quay lại"
        >
          <ChevronLeft size={24} strokeWidth={2} aria-hidden />
        </button>
        <div>
          <h1 className="flex flex-wrap items-center gap-2 font-headline text-2xl font-medium italic tracking-tight text-midnight md:text-3xl">
            Chi tiết danh mục: <span className="text-gold">{category.name}</span>
          </h1>
          <p className="mt-1 font-body text-sm text-midnight/50">
            Thông tin cấu hình danh mục trong hệ thống
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="p-6 shadow-md md:p-8">
            <h3 className="mb-6 border-b border-midnight/10 pb-4 font-headline text-lg italic text-gold">
              Thông tin cơ bản
            </h3>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <span className="mb-1 block font-label text-[10px] font-semibold uppercase tracking-widest text-midnight/40">
                  Mã danh mục
                </span>
                <p className="inline-block rounded-lg bg-gold/10 px-3 py-1 font-mono text-lg font-semibold text-gold">
                  {category.code}
                </p>
              </div>
              <div>
                <span className="mb-1 block font-label text-[10px] font-semibold uppercase tracking-widest text-midnight/40">
                  Loại danh mục
                </span>
                <p className="font-body text-lg font-semibold text-midnight">{category.type}</p>
              </div>
              <div className="md:col-span-2">
                <span className="mb-1 block font-label text-[10px] font-semibold uppercase tracking-widest text-midnight/40">
                  Tên hiển thị
                </span>
                <p className="font-body text-xl font-semibold text-midnight">{category.name}</p>
              </div>
              <div className="md:col-span-2">
                <span className="mb-1 block font-label text-[10px] font-semibold uppercase tracking-widest text-midnight/40">
                  Mô tả chi tiết
                </span>
                <p className="rounded-xl border border-midnight/10 bg-bg p-4 font-body leading-relaxed text-midnight/70 italic">
                  {category.description?.trim() || 'Không có mô tả cho danh mục này.'}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 shadow-md md:p-8">
            <h3 className="mb-6 border-b border-midnight/10 pb-4 font-headline text-lg italic text-gold">
              Trạng thái vận hành
            </h3>
            <div className="flex flex-col items-center py-4">
              <div
                className={`mb-4 flex h-20 w-20 items-center justify-center rounded-full ${
                  active ? 'bg-success-bg text-success' : 'bg-error-bg text-error'
                }`}
              >
                {active ? getIcon('CheckCircle2', 40) : <Power size={40} strokeWidth={2} aria-hidden />}
              </div>
              <span
                className={`rounded-full px-4 py-1.5 font-label text-sm font-semibold uppercase tracking-widest ${
                  active ? 'bg-success-bg text-success' : 'bg-error-bg text-error'
                }`}
              >
                {category.status}
              </span>
              <p className="mt-4 text-center font-body text-xs leading-relaxed text-midnight/45">
                {active
                  ? 'Danh mục đang được sử dụng trên các nghiệp vụ liên quan.'
                  : 'Danh mục tạm ngừng; không chọn được trong nghiệp vụ mới.'}
              </p>
            </div>
          </Card>

          <Card className="bg-midnight p-6 text-white shadow-xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-gold p-2 text-midnight">{getIcon('Settings', 20)}</div>
              <span className="font-body font-semibold">Hệ thống</span>
            </div>
            <p className="mb-4 font-body text-xs text-white/50">
              Lịch sử cập nhật gần nhất được ghi nhận lúc 10:30 hôm nay bởi quản trị viên (mock).
            </p>
            <button
              type="button"
              className="w-full rounded-lg border border-white/15 bg-white/10 py-2 font-body text-sm font-semibold text-white transition-colors hover:bg-white/15"
            >
              Xem lịch sử thay đổi
            </button>
          </Card>
        </div>
      </div>

      <div className="flex justify-start">
        <Button type="button" variant="ghost" onClick={onBack} className="flex items-center gap-2 px-6 py-3">
          <ChevronLeft size={18} strokeWidth={2} aria-hidden />
          Quay lại danh sách
        </Button>
      </div>
    </div>
  );
};

export default CategoryDetail;
