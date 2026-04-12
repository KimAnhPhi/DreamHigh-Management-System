import React, { type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'financial';
}

export const Card: React.FC<CardProps> = ({ className, variant = 'default', children, ...props }) => {
  return (
    <div className={cn(
      "ghost-border p-6 rounded-xl",
      variant === 'financial' ? "bg-financial-gradient text-white" : "bg-surface",
      className
    )} {...props}>
      {children}
    </div>
  );
};

export const CardTitle: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({ className, children, ...props }) => {
  return (
    <span className={cn("font-label uppercase tracking-[0.2em] text-[10px] text-midnight/40 block mb-4", className)} {...props}>
      {children}
    </span>
  );
};
