'use client';

import { useEffect, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';

import { Controller, Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import { TitleText } from './style';
import Card from '@/components/common/Card';
import { useWidth } from '@/hooks';
import { citys, zipcodes } from '@/assets/cityData';
import countryPhoneCodes from '@/assets/countryPhoneCodes.json';
import countryFlagEmoji from '@/assets/countryFlagEmoji.json';

export const memberDataSchema = z.object({
  name: z.string().min(1, '名字不能為空'),
  email: z.string().email('請輸入有效的電子郵件地址'),
  city: z.string().min(1, '城市不能為空'),
  phone: z.string().min(1, '電話號碼不能為空'),
  address: z.object({
    zipcode: z.number().min(100, '郵政編碼應為有效數值').max(999, '郵政編碼應為有效數值'),
    detail: z.string().min(1, '地址詳情不能為空'),
  }),
  countryCode: z.string(),
  birthdayYear: z.number().nonnegative(),
  birthdayMonth: z.number().min(1).max(12),
  birthdayDay: z.number().min(1).max(31),
});

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 88 }, (_, i) => currentYear - i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);
const days = Array.from({ length: 31 }, (_, i) => i + 1);

type MemberDataType = z.infer<typeof memberDataSchema>;

type MemberResponseData = {
  name: string;
  email: string;
  phone: string;
  address: {
    zipcode: number;
    detail: string;
  };
  birthday: string;
};

const Page = ({ data }: { data: Data }) => {
  const [openForm, setOpenForm] = useState(false);
  const [counties, setCounties] = useState<
    | {
        detail: string;
        zipcode: number;
        city: string;
        county: string;
      }[]
    | []
  >([]);
  const memberData = data.result;

  const birthday = new Date(memberData.birthday);
  const formatBirthday = `${birthday.getFullYear()}年 ${birthday.getMonth() + 1}月 ${birthday.getDate()}日`;

  const widthSize = useWidth();
  const isSmallDevice = widthSize === 'sm';

  // const {
  //   control,
  //   formState: { errors, isDirty, isValid },
  //   watch,
  //   register,
  //   handleSubmit,
  // } = useForm<MemberDataType>({
  //   resolver: zodResolver(memberDataSchema),
  //   defaultValues: {
  //     ...memberData,
  //   },
  // });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberDataType>({ resolver: zodResolver(memberDataSchema) });

  const onSubmit: SubmitHandler<MemberDataType> = (data) => {
    console.log(data);
    const birthday = ` ${data.birthdayYear}-${data.birthdayMonth}-${data.birthdayDay}`;
    return console.log(data);
  };
  // const city = watch('city');
  // useEffect(() => {
  //   if (city) {
  //     const findCity = zipcodes.find((item) => item.city === city);
  //     console.log(findCity);
  //     const resultCounties = findCity?.zone as {
  //       detail: string;
  //       zipcode: number;
  //       city: string;
  //       county: string;
  //     }[];
  //     setCounties(resultCounties);
  //   }
  // }, [city]);

  const handleMemberInfoEdit = function () {
    setOpenForm(true);
  };

  return (
    <Card
      padding={isSmallDevice ? 'md' : 'lg'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: isSmallDevice ? '1.5rem' : '2.5rem',
        alignItems: 'stretch',
      }}>
      <Typography variant={'h5'} component="h4">
        {'基本資料'}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('name')} placeholder="請輸入您的姓名" />
        {errors?.name && <p>{errors.name.message}</p>}

        <input {...register('phone')} placeholder="請輸入您的手機號碼" />

        <input type="submit" />
      </form>

      {/* {openForm ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction={'column'} spacing={'1.5rem'}>
            <Controller
              name="name"
              control={control}
              defaultValue={memberData.name}
              render={({ field: { ref, ...field } }) => (
                <Input
                  type="text"
                  {...field}
                  helperText={errors.name?.message}
                  label="姓名"
                  error={Boolean(errors.name)}
                  placeholder="請輸入您的姓名"
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  {...field}
                  helperText={errors.phone?.message}
                  label="手機號碼"
                  error={Boolean(errors.phone)}
                  placeholder="請輸入您的手機號碼"
                />
              )}
            />
            <Stack direction={'row'} alignItems={'flex-end'} spacing={'1rem'}>
              <Controller
                name="birthdayYear"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="生日"
                    options={years.map((year) => ({ value: year, label: String(year) }))}
                    error={Boolean(errors.birthdayYear)}
                    placeholder="您的出生年"
                  />
                )}
              />
              <Controller
                name="birthdayMonth"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label=""
                    options={months.map((month) => ({ value: month, label: String(month) }))}
                    error={Boolean(errors.birthdayYear)}
                    placeholder="您的出生月"
                  />
                )}
              />
              <Controller
                name="birthdayDay"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label=""
                    options={days.map((day) => ({ value: day, label: String(day) }))}
                    error={Boolean(errors.birthdayYear)}
                    placeholder="您的出生日"
                  />
                )}
              />
            </Stack>
            <Stack direction={'row'} alignItems={'flex-end'} spacing={'0.5rem'}>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="地址"
                    options={citys.map((city) => ({ value: city, label: city }))}
                    error={Boolean(errors.city)}
                    placeholder="您所在的城市"
                  />
                )}
              />
              <Controller
                name="address.zipcode"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label=""
                    options={counties.map((county) => ({ value: county.zipcode, label: county.county }))}
                    error={Boolean(errors.address?.message)}
                    disabled={counties.length <= 1}
                    placeholder="您所在的區域"
                  />
                )}
              />
            </Stack>
            <Controller
              name="address.detail"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  {...field}
                  helperText={errors.address?.detail?.message}
                  label="詳細地址"
                  error={Boolean(errors.address?.detail)}
                  placeholder="請輸入詳細地址"
                />
              )}
            />
            <Stack direction={'row'} justifyContent={'space-between'} gap={{ sm: 3, md: 0 }}>
              <Button
                sx={{
                  width: { sm: '100%', md: 'auto' },
                }}
                type="submit"
                variant={'contained'}
                size={'large'}
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
                onClick={() => setOpenForm(false)}>
                {'取消'}
              </Button>
            </Stack>
          </Stack>
        </form>
      ) : (
        <Stack direction={'column'} spacing={{ sm: 2, md: 3 }}>
          <TitleText title={'姓名'} content={memberData.name} />
          <TitleText title={'手機號碼'} content={memberData.phone} />
          <TitleText title={'生日'} content={formatBirthday} />
          <TitleText title={'地址'} content={`${memberData.address.zipcode} ${memberData.address.detail}`} />
        </Stack>
      )} */}
      <Stack
        direction={'column'}
        spacing={{ sm: '1.5rem', md: '2.5rem' }}
        alignItems={{ sm: 'stretch', md: 'flex-start' }}
        sx={{
          display: !openForm ? 'flex' : 'none',
        }}>
        <Button variant={'outlined'} size={'large'} onClick={() => handleMemberInfoEdit()}>
          {'編輯'}
        </Button>
      </Stack>
    </Card>
  );
};

export default Page;
