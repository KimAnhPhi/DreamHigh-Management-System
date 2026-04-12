import React from 'react';
import { cn } from '../../design-system/utils/cn';
import type { ModuleItem } from './types';
import { getIcon, moduleIconAccentClass } from './dashboardConstants';

export interface ModuleCardProps {
  module: ModuleItem;
  onClick: () => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group flex cursor-pointer flex-col items-start rounded-xl border border-midnight/10 bg-surface p-6 text-left shadow-sm transition-all duration-300',
        'hover:border-gold hover:shadow-lg',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50',
      )}
    >
      <div
        className={cn(
          'mb-5 flex h-14 w-14 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110',
          moduleIconAccentClass(module.accent),
        )}
      >
        {getIcon(module.iconName, 28)}
      </div>
      <h3 className="mb-2 font-headline text-lg font-bold text-midnight transition-colors group-hover:text-gold">
        {module.title}
      </h3>
      <p className="line-clamp-2 font-body text-sm leading-relaxed text-midnight/50">{module.description}</p>
      <div className="mt-auto flex w-full justify-end pt-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="inline-flex items-center gap-1 font-body text-sm font-semibold text-gold">
          Truy cập
          {getIcon('ChevronRight', 16)}
        </span>
      </div>
    </button>
  );
};

export default ModuleCard;
