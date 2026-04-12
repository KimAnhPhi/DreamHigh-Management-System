import React, { type ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark';
}

export const Button: React.FC<ButtonProps> = ({ className, variant = 'primary', ...props }) => {
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    ghost: "btn-ghost",
    dark: "btn-dark"
  };

  return (
    <button className={cn(variants[variant], className)} {...props} />
  );
};
