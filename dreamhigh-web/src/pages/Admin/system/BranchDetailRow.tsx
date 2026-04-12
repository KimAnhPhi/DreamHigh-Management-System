import React from 'react';
import type { AdminSystemIconName } from './adminSystemIcons';
import { getIcon } from './adminSystemIcons';

interface BranchDetailRowProps {
  icon: AdminSystemIconName;
  label: string;
  value: string;
}

const BranchDetailRow: React.FC<BranchDetailRowProps> = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="text-midnight/40">{getIcon(icon, 14)}</div>
    <div className="min-w-0">
      <p className="mb-1 font-label text-[10px] font-semibold uppercase leading-none text-midnight/40">
        {label}
      </p>
      <p className="truncate font-body text-xs font-semibold text-midnight/80">{value}</p>
    </div>
  </div>
);

export default BranchDetailRow;
