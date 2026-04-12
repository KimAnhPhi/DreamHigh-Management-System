function getRuntimeInjectedBase(): string {
  if (typeof window === 'undefined') return '';
  const v = (window as unknown as { __DH_API_BASE__?: unknown }).__DH_API_BASE__;
  if (typeof v === 'string' && v.trim() !== '') {
    return v.trim().replace(/\/$/, '');
  }
  return '';
}

/**
 * API base (no trailing slash).
 * Order: runtime inject (Render start script) → Vite build env → dev proxy.
 */
export function getApiBaseURL(): string {
  const injected = getRuntimeInjectedBase();
  if (injected) return injected;
  const raw = import.meta.env.VITE_API_URL;
  if (typeof raw === 'string' && raw.trim() !== '') {
    return raw.trim().replace(/\/$/, '');
  }
  if (import.meta.env.DEV) {
    return '/api';
  }
  return '';
}

export function isApiBaseConfigured(): boolean {
  return getApiBaseURL().length > 0;
}

export function missingProductionApiUrlMessage(): string {
  return (
    'Chưa có URL API cho FE. Trên Render (service frontend): Environment → thêm VITE_API_URL hoặc PUBLIC_API_URL = URL public của backend kèm /api (ví dụ https://your-api.onrender.com/api), sau đó Save và Manual Deploy (hoặc restart) để áp dụng.'
  );
}

export function apiNetworkErrorMessage(): string {
  if (import.meta.env.DEV) {
    return 'Không kết nối được API. Hãy chạy backend tại pms-eng-api: npm run start:dev.';
  }
  return (
    'Không kết nối được API. Kiểm tra: (1) VITE_API_URL trên Render đúng URL backend + /api, (2) service API đang chạy, (3) CORS trên API cho phép domain frontend.'
  );
}
