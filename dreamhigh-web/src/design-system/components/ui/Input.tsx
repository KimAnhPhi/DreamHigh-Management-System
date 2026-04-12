import React, { useId, useState, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className, id, ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn("input-field", error && "border-b-error", className)}
        {...props}
      />
      {error && <p className="mt-1 text-[10px] text-error uppercase tracking-wider">{error}</p>}
    </div>
  );
};

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, error, className, id, ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={cn("input-field h-auto py-3 min-h-[100px]", error && "border-b-error", className)}
        {...props}
      />
      {error && <p className="mt-1 text-[10px] text-error uppercase tracking-wider">{error}</p>}
    </div>
  );
};

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

/** Ô mật khẩu có nút mắt hiện/ẩn (Material Symbols). */
export const PasswordInput: React.FC<Omit<InputProps, 'type'>> = ({
  label,
  error,
  className,
  id: idProp,
  ...props
}) => {
  const uid = useId();
  const id = idProp ?? `pwd-${uid}`;
  const [visible, setVisible] = useState(false);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          className={cn('input-field pr-12', error && 'border-b-error', className)}
          autoComplete="current-password"
          {...props}
        />
        <button
          type="button"
          tabIndex={-1}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-midnight/50 hover:text-gold hover:bg-midnight/5 transition-colors"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
        >
          <span className="material-symbols-outlined text-[20px] leading-none">
            {visible ? 'visibility_off' : 'visibility'}
          </span>
        </button>
      </div>
      {error && <p className="mt-1 text-[10px] text-error uppercase tracking-wider">{error}</p>}
    </div>
  );
};

export const Select: React.FC<SelectProps> = ({ label, error, className, id, children, ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
        </label>
      )}
      <select
        id={id}
        className={cn("input-field appearance-none bg-no-repeat bg-[right_1rem_center]", error && "border-b-error", className)}
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724%27 height=%2724%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23C89B3C%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpolyline points=%276 9 12 15 18 9%27%3E%3C/polyline%3E%3C/svg%3E")', backgroundSize: '16px' }}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-[10px] text-error uppercase tracking-wider">{error}</p>}
    </div>
  );
};
