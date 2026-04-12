import React from 'react';
import { cn } from '../../utils/cn';

interface TabItem {
  key: string;
  label: string;
}

interface TabsProps {
  items: TabItem[];
  activeKey: string;
  onChange?: (key: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ items, activeKey, onChange, className }) => {
  return (
    <div className={cn("flex gap-12 border-b border-midnight/5", className)}>
      {items.map(item => {
        const isActive = activeKey === item.key;
        return (
          <button
            key={item.key}
            onClick={() => onChange?.(item.key)}
            className={cn(
              "pb-4 font-label uppercase tracking-[0.15em] text-[11px] transition-colors",
              isActive 
                ? "font-semibold text-gold border-b-2 border-gold" 
                : "font-medium text-midnight/40 hover:text-midnight"
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};
