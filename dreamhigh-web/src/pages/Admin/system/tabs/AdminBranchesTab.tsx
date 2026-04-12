import React from 'react';
import { Button } from '../../../../design-system/components/ui/Button';
import { Card } from '../../../../design-system/components/ui/Card';
import type { Branch } from '../../../../types/adminSystem';
import { getIcon } from '../adminSystemIcons';
import BranchDetailRow from '../BranchDetailRow';

interface AdminBranchesTabProps {
  branches: Branch[];
}

const AdminBranchesTab: React.FC<AdminBranchesTabProps> = ({ branches }) => (
  <div className="grid grid-cols-1 gap-6 animate-fade-in md:grid-cols-2 lg:grid-cols-3">
    {branches.map((branch) => (
      <Card
        key={branch.id}
        className="group relative overflow-hidden p-8 shadow-md transition-colors hover:border-gold/40"
      >
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold/5 blur-3xl" />
        <div className="mb-6 flex justify-between">
          <div className="rounded-xl bg-midnight/5 p-4 text-gold shadow-inner transition-colors group-hover:bg-gold group-hover:text-white">
            {getIcon('MapPin', 24)}
          </div>
          <span className="rounded-full border border-success/20 bg-success-bg px-3 py-1 font-label text-[9px] font-semibold uppercase text-success">
            {branch.status}
          </span>
        </div>
        <h3 className="mb-2 font-headline text-xl font-semibold text-midnight">{branch.name}</h3>
        <p className="mb-6 font-mono text-[10px] font-semibold uppercase tracking-widest text-gold">
          Mã chi nhánh: {branch.code}
        </p>
        <div className="space-y-3 border-t border-midnight/10 pt-6">
          <BranchDetailRow icon="Phone" label="Hotline" value={branch.hotline} />
          <BranchDetailRow icon="Mail" label="Email" value={branch.email} />
          <BranchDetailRow icon="Globe" label="Địa chỉ" value={branch.address} />
        </div>
        <Button type="button" variant="ghost" className="mt-8 w-full">
          Quản lý nhân sự chi nhánh
        </Button>
      </Card>
    ))}

    <button
      type="button"
      className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border-4 border-dashed border-midnight/10 bg-bg/80 p-8 text-midnight/30 transition-all hover:border-gold/50 hover:bg-surface hover:text-gold"
    >
      <div className="mb-4 rounded-full bg-surface p-6 shadow-sm">{getIcon('Plus', 32)}</div>
      <span className="font-label text-sm font-semibold uppercase tracking-[0.2em]">Thêm chi nhánh mới</span>
    </button>
  </div>
);

export default AdminBranchesTab;
