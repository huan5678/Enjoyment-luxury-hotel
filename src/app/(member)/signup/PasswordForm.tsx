'use client';

import Input from '@/components/common/Input';
import { Button, Stack } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Dispatch, SetStateAction, useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { schemaValidate } from '@/utils';
import { verifyEmail } from '@/assets/api';
import { MemberEditData } from '@/types';

const passwordFormSchema = z
  .object({
    email: schemaValidate('email'),
    password: schemaValidate('password'),
    confirmPassword: schemaValidate('confirmPassword'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '兩次輸入密碼不一致',
  });

type MemberRegisterType = z.infer<typeof passwordFormSchema>;

const PasswordForm = ({
  handleNext,
  setData,
}: {
  handleNext: () => void;
  setData: Dispatch<SetStateAction<MemberEditData>>;
}) => {
  const {
    control,
    formState: { errors, isDirty, isValid },
    setError,
    watch,
  } = useForm<MemberRegisterType>({
    resolver: zodResolver(passwordFormSchema),
  });

  const templateForm = useMemo(
    () => [
      {
        name: 'email',
        label: '電子郵件',
        type: 'email',
        placeholder: 'hello@exsample.com',
      },
      {
        name: 'password',
        label: '密碼',
        type: 'password',
        placeholder: '請輸入密碼',
      },
      {
        name: 'confirmPassword',
        label: '確認密碼',
        type: 'password',
        placeholder: '請再輸入一次密碼',
      },
    ],
    [],
  );

  const handleSetNext = () => {
    const data = watch();
    setData(
      (prev) =>
        ({
          ...prev,
          email: data.email,
          password: data.password,
        }) as MemberEditData,
    );
    handleNext();
  };

  const handleEmailBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const email = e.target.value.toLowerCase();
    if (email === '') {
      setError('email', {
        type: 'manual',
        message: '',
      });
      return;
    }
    const res = await verifyEmail(email);
    if (res.result !== null && res.result.isEmailExists) {
      setError('email', {
        type: 'manual',
        message: '此信箱已被註冊',
      });
    } else {
      setError('email', {
        type: 'manual',
        message: '',
      });
    }
  };

  return (
    <form>
      <Stack direction={'column'} spacing={'1rem'}>
        {templateForm.map((item) => (
          <Controller
            key={item.name}
            name={item.name as keyof MemberRegisterType}
            control={control}
            render={({ field }) => {
              const value = typeof field.value === 'object' ? JSON.stringify(field.value) : field.value;
              return (
                <Input
                  type={item.type}
                  labelColor="white"
                  {...field}
                  value={value}
                  label={item.label}
                  helperText={errors[item.name as keyof MemberRegisterType]?.message}
                  error={Boolean(errors[item.name as keyof MemberRegisterType])}
                  placeholder={item.placeholder}
                  onBlur={handleEmailBlur}
                />
              );
            }}
          />
        ))}
      </Stack>
      <Button
        fullWidth
        type="button"
        variant="contained"
        color="primary"
        size="large"
        disabled={!isDirty || !isValid}
        onClick={handleSetNext}
        sx={{ padding: '1rem', marginTop: '2.5rem' }}>
        下一步
      </Button>
    </form>
  );
};

export default PasswordForm;
