'use client';

import { Button, styled } from '@mui/material';

import { apiPostGenerateEmailCode } from '@/assets/api';
import Input from '@/components/common/Input';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const forgotDataSchema = z.object({
  email: z.string().email('請輸入有效的電子郵件地址'),
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
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<ForgotDataSchema>({
    resolver: zodResolver(forgotDataSchema),
  });

  const email = watch('email');
  const wait = async (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

  const onSubmit = async (data: ForgotDataSchema) => {
    setIsLoading(true);
    const { email } = data;
    const res = await apiPostGenerateEmailCode({ email });
    if (res.status) {
      wait(2000);
      router.push(`/forgot/checkverify?email=${email}`);
    } else {
      setError('email', {
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
      <Button
        fullWidth
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        disabled={!isDirty || !isValid || isLoading}
        sx={{ padding: '1rem', marginTop: '2.5rem' }}>
        取得驗證碼
      </Button>
    </Form>
  );
};

export default LoginForm;
