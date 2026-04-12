import type { LucideIcon } from 'lucide-react';
import { createElement, type ReactNode } from 'react';
import {
  AlertTriangle,
  Check,
  Download,
  Eye,
  Filter,
  Globe,
  Lock,
  Mail,
  Phone,
  Plus,
  Power,
  Search,
  Server,
  Pencil,
} from 'lucide-react';
import { getIcon as getDashboardIcon, type DashboardIconKey } from '../../Dashboard/dashboardConstants';

export type AdminSystemIconName =
  | DashboardIconKey
  | 'Lock'
  | 'Server'
  | 'Globe'
  | 'Search'
  | 'Plus'
  | 'Eye'
  | 'Edit'
  | 'Power'
  | 'AlertTriangle'
  | 'Check'
  | 'Filter'
  | 'Download'
  | 'Mail'
  | 'Phone';

const extraIcons: Partial<Record<Exclude<AdminSystemIconName, DashboardIconKey>, LucideIcon>> = {
  Lock,
  Server,
  Globe,
  Search,
  Plus,
  Eye,
  Edit: Pencil,
  Power,
  AlertTriangle,
  Check,
  Filter,
  Download,
  Mail,
  Phone,
};

export function getIcon(name: AdminSystemIconName, size: number, className?: string): ReactNode {
  const Extra = extraIcons[name as Exclude<AdminSystemIconName, DashboardIconKey>];
  if (Extra) {
    return createElement(Extra, {
      size,
      className,
      strokeWidth: 2,
      'aria-hidden': true as const,
    });
  }
  return getDashboardIcon(name as DashboardIconKey, size, className);
}
