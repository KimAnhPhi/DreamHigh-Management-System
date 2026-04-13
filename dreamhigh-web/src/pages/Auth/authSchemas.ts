import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Địa chỉ email không hợp lệ').min(1, 'Email không được để trống'),
  password: z.string().min(1, 'Mật khẩu không được để trống'),
});

export const registerSchema = z.object({
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

export const forgotSchema = z.object({
  email: z.string().email('Địa chỉ email không hợp lệ').min(1, 'Email không được để trống'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotFormData = z.infer<typeof forgotSchema>;
