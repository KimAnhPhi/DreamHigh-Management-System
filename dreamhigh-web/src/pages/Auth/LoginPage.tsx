import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { apiNetworkErrorMessage, isApiBaseConfigured, missingProductionApiUrlMessage } from '../../config/apiBase';
import { apiClient } from '../../services/apiClient';
import { useAuthStore } from '../../stores/useAuthStore';
import { Button } from '../../design-system/components/ui/Button';
import { Card } from '../../design-system/components/ui/Card';
import { Input, PasswordInput } from '../../design-system/components/ui/Input';
import { DreamHighLogo } from '../../design-system/components/brand/DreamHighLogo';

// Zod Schema
const loginSchema = z.object({
  email: z.string().email('Địa chỉ email không hợp lệ').min(1, 'Email không được để trống'),
  password: z.string().min(1, 'Mật khẩu không được để trống'),
});
type LoginFormData = z.infer<typeof loginSchema>;

type LoginSuccessBody = {
  statusCode: number;
  data: {
    accessToken: string;
    user: {
      id: number;
      email: string;
      fullName: string;
      roles?: string[];
      userRoles?: { role?: { code: string } }[];
      [key: string]: unknown;
    };
  };
};

const googleClientIdConfigured = Boolean(import.meta.env.VITE_GOOGLE_CLIENT_ID);

export default function LoginPage() {
  const navigate = useNavigate();
  const setAuthData = useAuthStore((state) => state.login);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [googleBusy, setGoogleBusy] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const applyLoginSuccess = useCallback(
    (resData: LoginSuccessBody) => {
      const u = resData.data.user;
      const rolesFromNested =
        u.userRoles
          ?.map((ur) => ur.role?.code)
          .filter((c): c is string => Boolean(c)) ?? [];
      const roles =
        u.roles && u.roles.length > 0 ? u.roles : rolesFromNested;
      const { userRoles: _nested, ...userRest } = u;
      setAuthData({ ...userRest, roles }, resData.data.accessToken);
      navigate('/dashboard');
    },
    [navigate, setAuthData],
  );

  const handleApiLoginError = useCallback((error: unknown, fallback: string) => {
    if (axios.isAxiosError(error)) {
      const msg = error.response?.data?.message;
      if (typeof msg === 'string' && msg.length > 0) {
        setErrorMsg(msg);
        return;
      }
      if (
        error.code === 'ERR_NETWORK' ||
        error.message === 'Network Error'
      ) {
        setErrorMsg(apiNetworkErrorMessage());
        return;
      }
    }
    setErrorMsg(fallback);
  }, []);

  const onSubmit = async (data: LoginFormData) => {
    setErrorMsg('');
    if (import.meta.env.PROD && !isApiBaseConfigured()) {
      setErrorMsg(missingProductionApiUrlMessage());
      return;
    }
    try {
      const response = await apiClient.post('/auth/login', {
        email: data.email,
        password: data.password,
      });
      const resData = response.data as LoginSuccessBody;
      if (resData.statusCode === 200) {
        applyLoginSuccess(resData);
      }
    } catch (error: unknown) {
      handleApiLoginError(error, 'Đăng nhập thất bại. Vui lòng thử lại.');
    }
  };

  const onGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    const idToken = credentialResponse.credential;
    if (!idToken) {
      setErrorMsg('Google không trả về mã xác thực. Vui lòng thử lại.');
      return;
    }
    setErrorMsg('');
    if (import.meta.env.PROD && !isApiBaseConfigured()) {
      setErrorMsg(missingProductionApiUrlMessage());
      return;
    }
    setGoogleBusy(true);
    try {
      const response = await apiClient.post('/auth/google', { idToken });
      const resData = response.data as LoginSuccessBody;
      if (resData.statusCode === 200) {
        applyLoginSuccess(resData);
      }
    } catch (error: unknown) {
      handleApiLoginError(
        error,
        'Đăng nhập Google thất bại. Vui lòng thử lại.',
      );
    } finally {
      setGoogleBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4 py-10">
      <Card className="relative w-full max-w-md overflow-hidden bg-surface p-10 shadow-xl">
        <div className="absolute top-0 left-0 h-1 w-full bg-gold" />

        <div className="mb-10 flex flex-col items-center text-center">
          <DreamHighLogo
            variant="onLight"
            heightClass="h-24 w-auto max-h-32 md:h-28"
            className="mx-auto mb-4 max-w-[min(100%,320px)]"
          />
          <p className="max-w-sm font-label text-[10px] font-bold uppercase leading-snug tracking-ultra text-gold md:text-xs">
            DreamHigh English Management System
          </p>
          <p className="mt-3 font-label text-[9px] font-medium uppercase tracking-[0.3em] text-midnight/35">
            - DREAM BIG. FLY HIGH -
          </p>
          <h2 className="font-headline mt-10 text-2xl italic tracking-tight text-midnight md:text-3xl">
            Đăng nhập
          </h2>
          <p className="mt-2 font-label text-[10px] uppercase tracking-widest text-midnight/35">
            Sử dụng tài khoản được cấp
          </p>
        </div>
        
        {errorMsg && (
          <div className="mb-8 p-4 bg-error-bg text-error rounded-xl text-xs text-center border border-error/10 font-medium uppercase tracking-wider">
            {errorMsg}
          </div>
        )}

        {googleClientIdConfigured && (
          <div className="mb-8 flex flex-col items-center gap-3">
            <p className="font-label text-[10px] uppercase tracking-widest text-midnight/40">
              Đăng nhập nhanh
            </p>
            <div
              className={`flex justify-center ${googleBusy ? 'pointer-events-none opacity-60' : ''}`}
            >
              <GoogleLogin
                onSuccess={(cr) => void onGoogleSuccess(cr)}
                onError={() =>
                  setErrorMsg('Đăng nhập Google không hoàn tất. Vui lòng thử lại.')
                }
                useOneTap={false}
                shape="rectangular"
                size="large"
                width="320"
                locale="vi"
                text="continue_with"
              />
            </div>
            <div className="relative flex w-full items-center gap-3 py-1">
              <span className="h-px flex-1 bg-midnight/10" />
              <span className="font-label text-[9px] uppercase tracking-widest text-midnight/30">
                hoặc email
              </span>
              <span className="h-px flex-1 bg-midnight/10" />
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <Input 
            label="Email đăng nhập"
            type="email"
            placeholder="nhapemail@example.com"
            error={errors.email?.message as string}
            {...register('email')}
          />

          <PasswordInput
            label="Mật khẩu"
            placeholder="••••••••"
            error={errors.password?.message as string}
            {...register('password')}
          />

          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Đang xác thực...' : 'Đăng nhập hệ thống'}
            </Button>
          </div>
        </form>

        <p className="mt-10 text-xs text-center text-midnight/40 font-label uppercase tracking-widest">
          Chưa có tài khoản?{' '}
          <Link to="/register" className="text-gold font-bold hover:text-midnight transition-colors ml-1">
            Đăng ký tham gia
          </Link>
        </p>
      </Card>
    </div>
  );
}
