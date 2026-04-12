/** Resolved API base URL (no trailing slash). Empty in production when VITE_API_URL was not set at build time. */
export function getApiBaseURL(): string {
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
    'Chưa cấu hình VITE_API_URL khi build FE. Trên Render: Environment → thêm VITE_API_URL = URL public của backend kèm /api (ví dụ https://your-api.onrender.com/api), sau đó deploy lại.'
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
