import { Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/common/Input';

export const changePasswordDataSchema = z
  .object({
    oldPassword: z.string().min(1),
    newPassword: z.string().min(1),
    confirmPassword: z.string().min(1),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '兩次輸入密碼不一致',
  });

type ChangePasswordDataSchema = z.infer<typeof changePasswordDataSchema>;

type ChangePasswordFormProps = {
  handleOpenForm: (string: 'ChangePassword' | 'Member') => void;
};

const ChangePasswordForm = ({ handleOpenForm }: ChangePasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<ChangePasswordDataSchema>({
    resolver: zodResolver(changePasswordDataSchema),
  });

  const onSubmit = (data: ChangePasswordDataSchema) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction={'column'} spacing={{ sm: 2, md: 3 }}>
        <Input
          label="舊密碼"
          fullWidth
          type="password"
          {...register('oldPassword')}
          placeholder="請輸入舊密碼"
          error={errors.oldPassword ? true : false}
          helperText={errors.oldPassword ? errors.oldPassword.message : ''}
        />
        <Input
          label="新密碼"
          fullWidth
          type="password"
          {...register('newPassword')}
          placeholder="請輸入新密碼"
          error={errors.newPassword ? true : false}
          helperText={errors.newPassword ? errors.newPassword.message : ''}
        />
        <Input
          label="確認新密碼"
          fullWidth
          type="password"
          {...register('confirmPassword')}
          placeholder="請再輸入一次新密碼"
          error={errors.confirmPassword ? true : false}
          helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
        />
      </Stack>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        gap={{ sm: 3, md: 0 }}
        mt={{ sm: '1.5rem', md: '2.5rem' }}>
        <Button
          sx={{
            width: { sm: '100%', md: 'auto' },
          }}
          type="submit"
          variant={'contained'}
          size={'large'}
          disabled={!isDirty || !isValid}
          disableRipple>
          {'儲存設定'}
        </Button>
        <Button
          sx={{
            width: { sm: '100%', md: 'auto' },
          }}
          type="button"
          variant={'outlined'}
          size={'large'}
          disableRipple
          onClick={handleOpenForm('ChangePassword')}>
          {'取消'}
        </Button>
      </Stack>
    </form>
  );
};

export default ChangePasswordForm;
