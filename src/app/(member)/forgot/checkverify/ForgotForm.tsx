'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button, styled } from '@mui/material';

import Input from '@/components/common/Input';
import { apiPostForgot } from '@/assets/api';

export const forgotDataSchema = z.object({
  email: z.string().email('請輸入有效的電子郵件地址'),
  code: z.string().min(1),
  password: z.string().min(1),
});

type ForgotDataSchema = z.infer<typeof forgotDataSchema>;

const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  paddingTop: '2.5rem',
  paddingBottom: '2.5rem',
}));

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const account = searchParams.get('email')!;
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<ForgotDataSchema>({
    defaultValues: {
      email: account || undefined,
    },
    resolver: zodResolver(forgotDataSchema),
  });

  const email = watch('email');
  const wait = async (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

  const onSubmit = async (data: ForgotDataSchema) => {
    setIsLoading(true);
    const { email, code, password } = data;
    const res = await apiPostForgot({ email, code, newPassword: password });
    if (res.status) {
      wait(2000);
      alert('新密碼設置成功');
      router.push(`/login`);
    } else {
      setError('password', {
        type: 'manual',
        message: res.message,
      });
    }
    setIsLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="電子信箱"
        labelColor={'white'}
        fullWidth
        type="email"
        {...register('email')}
        placeholder="請輸入您的Email"
        error={errors.email ? true : false}
        helperText={errors.email ? errors.email.message : ''}
      />
      <Input
        label="驗證碼"
        labelColor={'white'}
        fullWidth
        type="text"
        {...register('code')}
        placeholder="請輸入驗證碼"
        error={errors.code ? true : false}
        helperText={errors.code ? errors.code.message : ''}
      />
      <Input
        label="新密碼"
        labelColor={'white'}
        fullWidth
        type="password"
        {...register('password')}
        placeholder="請輸入您的新密碼"
        error={errors.password ? true : false}
        helperText={errors.password ? errors.password.message : ''}
      />

      <Button
        fullWidth
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        disabled={!isDirty || !isValid || isLoading}
        sx={{ padding: '1rem', marginTop: '2.5rem' }}>
        送出
      </Button>
    </Form>
  );
};

export default LoginForm;
