'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Button, styled } from '@mui/material';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Input from '@/components/common/Input';

import { apiPostGenerateEmailCode } from '@/assets/api';

export const getCodeDataSchema = z.object({
  email: z.string().email('請輸入有效的電子郵件地址'),
});

type GetCodeDataSchema = z.infer<typeof getCodeDataSchema>;

const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  paddingTop: '2.5rem',
  paddingBottom: '2.5rem',
}));

const GetCodeForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<GetCodeDataSchema>({
    resolver: zodResolver(getCodeDataSchema),
  });

  const email = watch('email');
  const wait = async (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

  const onSubmit = async (data: GetCodeDataSchema) => {
    setIsLoading(true);
    const { email } = data;
    const res = await apiPostGenerateEmailCode({ email });
    if (res.status) {
      wait(2000);
      router.push(`/user/forgot?email=${email}`);
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

export default GetCodeForm;
