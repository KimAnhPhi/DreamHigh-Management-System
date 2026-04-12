import React from 'react';
import type { AdminMessage } from '../../../types/adminSystem';

interface NotificationPortalProps {
  message: AdminMessage | null;
  onClose: () => void;
}

const typeStyles: Record<AdminMessage['type'], string> = {
  success: 'border-success/30 bg-success-bg text-success',
  error: 'border-error/30 bg-error-bg text-error',
  warning: 'border-warning/30 bg-warning-bg text-warning',
};

const NotificationPortal: React.FC<NotificationPortalProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[120] flex justify-center px-4">
      <div
        className={`pointer-events-auto flex max-w-lg items-start gap-3 rounded-xl border px-5 py-4 shadow-lg animate-fade-in ${typeStyles[message.type]}`}
        role="status"
      >
        <div className="min-w-0 flex-1">
          <p className="font-label text-[10px] font-semibold uppercase tracking-widest opacity-80">{message.code}</p>
          <p className="mt-1 font-body text-sm font-medium">{message.text}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-md px-2 py-1 font-label text-[10px] font-semibold uppercase tracking-wider opacity-70 hover:opacity-100"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default NotificationPortal;
