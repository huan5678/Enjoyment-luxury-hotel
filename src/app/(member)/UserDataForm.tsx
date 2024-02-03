'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  Button,
  Checkbox as BaseCheckbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
  styled,
} from '@mui/material';
import Image from 'next/image';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import { citys, zipcodes } from '@/assets/cityData';
import countryPhoneCodes from '@/assets/countryPhoneCodes.json';
import countryFlagEmoji from '@/assets/countryFlagEmoji.json';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatPhoneNumber, schemaValidate } from '@/utils';
import { MemberData, MemberEditData } from '@/types';

const Checkbox = styled(BaseCheckbox)(({ theme }) => ({
  color: theme.palette.primary.main,
  '&.MuiCheckbox-colorPrimary': {
    color: theme.palette.primary.main,
  },
}));

const Label = styled(Typography)(({ theme }) => ({
  color: 'white',
  [theme.breakpoints.down('md')]: { fontSize: '0.875rem' },
  [theme.breakpoints.up('md')]: { fontSize: '1rem' },
}));

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 88 }, (_, i) => currentYear - i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);
const days = Array.from({ length: 31 }, (_, i) => i + 1);

const UserDataForm = ({
  memberData,
  setOpenForm,
  onSubmit,
  isRegister = false,
  setData,
}: {
  memberData?: MemberData;
  setOpenForm?: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: SubmitHandler<MemberEditData>;
  isRegister?: boolean;
  setData?: Dispatch<SetStateAction<MemberEditData>>;
}) => {
  const defaultValueCity =
    memberData &&
    zipcodes.find((city) => city.zone.find((counties) => counties.zipcode === memberData.address.zipcode))?.city;

  const memberDataSchema = z.object({
    name: schemaValidate('name'),
    countryPhoneCode: schemaValidate('countryPhoneCode'),
    phone: schemaValidate('phone'),
    birthdayYear: schemaValidate('birthdayYear'),
    birthdayMonth: schemaValidate('birthdayMonth'),
    birthdayDay: schemaValidate('birthdayDay'),
    city: schemaValidate('city'),
    address: z.object({
      zipcode: schemaValidate('zipcode'),
      detail: schemaValidate('detail'),
    }),
    check: isRegister ? z.boolean({ description: '請勾選同意本網站個資使用規範' }) : z.undefined(),
  });

  const birthday = memberData && new Date(memberData.birthday);

  const [counties, setCounties] = useState<
    | {
        detail: string;
        zipcode: number;
        city: string;
        county: string;
      }[]
    | []
  >([]);

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<MemberEditData>({
    defaultValues: {
      ...memberData,
      city: defaultValueCity,
      address: {
        zipcode: memberData && memberData.address.zipcode,
        detail: memberData && memberData.address.detail,
      },
      birthdayYear: birthday && birthday.getFullYear(),
      birthdayMonth: birthday && birthday.getMonth() + 1,
      birthdayDay: birthday && birthday.getDate(),
    },
    resolver: zodResolver(memberDataSchema),
  });

  const city = watch('city');
  useEffect(() => {
    if (city) {
      const findCity = zipcodes.find((item) => item.city === city);
      const resultCounties = findCity?.zone as {
        detail: string;
        zipcode: number;
        city: string;
        county: string;
      }[];
      setCounties(resultCounties);
    }
  }, [city]);

  const handleOnsSubmit = () => {
    if (isRegister && setData) {
      const data = watch();
      const resultPhone = data.phone[0] === '0' ? data.phone.slice(1) : data.phone || 0;
      const phone = `(${data.countryPhoneCode}) ${formatPhoneNumber(resultPhone)}`;
      setData((prev) => {
        return {
          ...prev,
          ...data,
          birthday: `${data.birthdayYear}-${data.birthdayMonth}-${data.birthdayDay}`,
          phone,
        };
      });
      onSubmit(data);
    } else {
      onSubmit(watch());
    }
  };

  return (
    <form onSubmit={handleSubmit(handleOnsSubmit)}>
      <Stack direction={'column'} spacing={isRegister ? '1rem' : '1.5rem'}>
        <Controller
          name="name"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <Input
              type="text"
              {...field}
              helperText={errors.name?.message}
              label="姓名"
              labelColor={isRegister ? 'white' : 'black'}
              error={Boolean(errors.name)}
              placeholder="請輸入您的姓名"
            />
          )}
        />
        <Stack direction={'row'} spacing={'1rem'}>
          <Controller
            name="countryPhoneCode"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="區域號碼"
                labelColor={isRegister ? 'white' : 'black'}
                options={countryPhoneCodes.map((item) => ({
                  key: item.iso,
                  value: item.code,
                  content: (
                    <Stack direction={'row'} alignItems={'center'} spacing={2}>
                      {countryFlagEmoji.find((flag) => flag.code === item.iso)?.image && (
                        <Image
                          src={countryFlagEmoji.find((flag) => flag.code === item.iso)?.image as unknown as string}
                          width={24}
                          height={24}
                          alt={item.iso}
                        />
                      )}
                      <Typography variant={'body2'} component={'span'}>
                        (+{item.code})
                      </Typography>
                    </Stack>
                  ),
                }))}
                error={Boolean(errors.countryPhoneCode)}
                placeholder="區碼"
                sx={{ width: '100%' }}
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
                labelColor={isRegister ? 'white' : 'black'}
                error={Boolean(errors.phone)}
                placeholder="請輸入您的手機號碼"
                maxLength={10}
              />
            )}
          />
        </Stack>
        <Stack direction={'row'} alignItems={'flex-end'} spacing={'1rem'}>
          <Controller
            name="birthdayYear"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="生日"
                labelColor={isRegister ? 'white' : 'black'}
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
                labelColor={isRegister ? 'white' : 'black'}
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
                options={counties.map((county) => ({
                  key: county.county,
                  value: county.zipcode,
                  label: county.county,
                }))}
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
              labelColor={isRegister ? 'white' : 'black'}
              error={Boolean(errors.address?.detail)}
              placeholder="請輸入詳細地址"
            />
          )}
        />
        {isRegister && (
          <Controller
            name="check"
            control={control}
            render={({ field }) => (
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox {...field} sx={{ '& .MuiSvgIcon-root': { fontSize: '1.5rem' } }} />}
                  label={<Label color="white">我已閱讀並同意本網站個資使用規範</Label>}
                  color="white"
                />
              </FormGroup>
            )}
          />
        )}
      </Stack>
      {setOpenForm && (
        <Stack direction={'row'} justifyContent={'space-between'} gap={{ sm: 3, md: 0 }}>
          <Button
            sx={{
              width: { sm: '100%', md: 'auto' },
              padding: { sm: '1rem' },
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
              padding: { sm: '1rem' },
            }}
            type="button"
            variant={'outlined'}
            size={'large'}
            disableRipple
            onClick={() => setOpenForm(false)}>
            {'取消'}
          </Button>
        </Stack>
      )}
      {isRegister && (
        <Button
          sx={{
            padding: { sm: '1rem' },
          }}
          fullWidth
          type="submit"
          variant={'contained'}
          size={'large'}
          disabled={!isDirty || !isValid}
          disableRipple>
          {'完成註冊'}
        </Button>
      )}
    </form>
  );
};

export default UserDataForm;
