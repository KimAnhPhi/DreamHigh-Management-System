import React from 'react';
import type { Permission } from '../../../types/adminSystem';
import { getIcon } from './adminSystemIcons';

interface PermissionCheckboxProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}

const PermissionCheckbox: React.FC<PermissionCheckboxProps> = ({ checked, onChange, disabled }) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onChange}
    className={`mx-auto flex h-6 w-6 items-center justify-center rounded-lg border-2 transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
      checked
        ? 'border-gold bg-gold text-white'
        : 'border-midnight/15 bg-surface hover:border-gold/50'
    }`}
    aria-pressed={checked}
  >
    {checked ? getIcon('Check', 14, 'text-white') : null}
  </button>
);

export type PermissionField = keyof Omit<Permission, 'moduleId'>;

export default PermissionCheckbox;
