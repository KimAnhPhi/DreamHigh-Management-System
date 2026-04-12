import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { apiClient } from '../../services/apiClient';
import { Button } from '../../design-system/components/ui/Button';
import { Card } from '../../design-system/components/ui/Card';
import { Input, PasswordInput } from '../../design-system/components/ui/Input';
import { DreamHighLogo } from '../../design-system/components/brand/DreamHighLogo';

const registerSchema = z.object({
  fullName: z.string().min(1, 'Họ và tên không được để trống'),
  email: z.string().email('Địa chỉ email không hợp lệ').min(1, 'Email không được để trống'),
  password: z
    .string()
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, 'Mật khẩu phải chứa chữ hoa, chữ thường và số'),
  confirmPassword: z.string().min(1, 'Vui lòng điền xác nhận mật khẩu'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setErrorMsg('');
    setSuccessMsg('');
    try {
      await apiClient.post('/auth/register', {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        // Role STUDENT is handled by Backend natively
      });
      setSuccessMsg('Đăng ký tài khoản thành công! Phân quyền: Học viên. Hãy đăng nhập.');
      setTimeout(() => navigate('/login'), 2500);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (Array.isArray(error.response?.data?.message)) {
          setErrorMsg(error.response.data.message[0]);
          return;
        }
        const msg = error.response?.data?.message;
        if (typeof msg === 'string' && msg.length > 0) {
          setErrorMsg(msg);
          return;
        }
        if (
          error.code === 'ERR_NETWORK' ||
          error.message === 'Network Error'
        ) {
          setErrorMsg(
            'Không kết nối được API. Hãy chạy backend tại pms-eng-api: npm run start:dev.'
          );
          return;
        }
      }
      setErrorMsg('Đăng ký thất bại. Bạn vui lòng thử lại.');
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-bg px-4 py-10">
      <div className="pointer-events-none absolute left-6 top-6 z-10 flex max-w-[min(90vw,28rem)] flex-col items-start md:left-10 md:top-10">
        <DreamHighLogo variant="onLight" heightClass="h-28 md:h-32" className="max-w-[280px] md:max-w-[320px]" />
        <p className="mt-3 max-w-xs font-label text-[10px] font-bold uppercase leading-snug tracking-ultra text-gold md:text-xs">
          DreamHigh English Management System
        </p>
      </div>

      <Card className="relative z-0 w-full max-w-md p-10 shadow-xl overflow-hidden bg-surface">
        <div className="absolute top-0 left-0 w-full h-1 bg-gold" />

        <div className="mb-10 text-center">
          <h1 className="font-headline italic text-3xl tracking-tight text-midnight md:text-4xl">Đăng ký</h1>
          <p className="mt-3 font-label uppercase tracking-widest text-midnight/30 text-[9px] tracking-[0.3em] font-medium">
            - TRỞ THÀNH HỌC VIÊN DREAMHIGH -
          </p>
        </div>
        
        {errorMsg && (
          <div className="mb-8 p-4 bg-error-bg text-error rounded-xl text-xs text-center border border-error/10 font-medium uppercase tracking-wider">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="mb-8 p-4 bg-success-bg text-success rounded-xl text-xs text-center border border-success/10 font-medium uppercase tracking-wider">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <Input 
            label="Họ và Tên"
            placeholder="Nguyễn Văn A"
            error={errors.fullName?.message as string}
            {...register('fullName')}
          />

          <Input 
            label="Email (Định danh đăng nhập)"
            type="email"
            placeholder="nhapemail@example.com"
            error={errors.email?.message as string}
            {...register('email')}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <PasswordInput
              label="Mật khẩu"
              placeholder="••••••••"
              autoComplete="new-password"
              error={errors.password?.message as string}
              {...register('password')}
            />

            <PasswordInput
              label="Xác nhận MK"
              placeholder="••••••••"
              autoComplete="new-password"
              error={errors.confirmPassword?.message as string}
              {...register('confirmPassword')}
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Đang tạo dữ liệu...' : 'Đăng ký học viên'}
            </Button>
          </div>
        </form>

        <p className="mt-10 text-xs text-center text-midnight/40 font-label uppercase tracking-widest">
          Đã có tài khoản?{' '}
          <Link to="/login" className="text-gold font-bold hover:text-midnight transition-colors ml-1">
            Quay lại Đăng nhập
          </Link>
        </p>
      </Card>
    </div>
  );
}
