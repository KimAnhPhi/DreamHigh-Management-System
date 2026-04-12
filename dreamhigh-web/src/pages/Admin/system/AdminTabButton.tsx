import React from 'react';
import type { AdminSystemIconName } from './adminSystemIcons';
import { getIcon } from './adminSystemIcons';

interface AdminTabButtonProps {
  active: boolean;
  label: string;
  icon: AdminSystemIconName;
  onClick: () => void;
}

const AdminTabButton: React.FC<AdminTabButtonProps> = ({ active, label, icon, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 font-label text-[10px] font-semibold uppercase tracking-widest transition-all ${
      active ? 'bg-surface text-gold shadow-sm' : 'text-midnight/40 hover:text-midnight/70'
    }`}
  >
    {getIcon(icon, 14)} {label}
  </button>
);

export default AdminTabButton;
