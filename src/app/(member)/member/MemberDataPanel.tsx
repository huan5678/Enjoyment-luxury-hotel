'use client';

import { useEffect, useState } from 'react';
import { Suspense } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { TitleText } from './style';
import Card from '@/components/common/Card';
import { useWidth } from '@/hooks';
import UserDataForm from '@/app/(member)/UserDataForm';
import { SubmitHandler } from 'react-hook-form';
import { updateUser } from '@/assets/api';
import { formatPhoneNumber } from '@/utils';
import { MemberResponseData, MemberEditData, MemberUpdateData, MemberData } from '@/types';

const Page = ({ data }: { data: MemberResponseData }) => {
  const [openForm, setOpenForm] = useState(false);

  const [memberData, setMemberData] = useState<MemberData | null>(null);

  useEffect(() => {
    if (!data?.result) return;
    if (data.result) setMemberData(data.result as unknown as MemberData);
  }, [data]);

  const birthday = new Date(memberData?.birthday || 0);
  const formatDate = `${birthday.getFullYear()}年 ${birthday.getMonth() + 1}月 ${birthday.getDate()}日`;

  const widthSize = useWidth();
  const isSmallDevice = widthSize === 'sm';

  const handleMemberInfoEdit = function () {
    setOpenForm(true);
  };

  const onSubmit: SubmitHandler<MemberEditData> = async (data) => {
    const birthday = ` ${data.birthdayYear}-${data.birthdayMonth}-${data.birthdayDay}`;
    const resultPhone = data.phone[0] === '0' ? data.phone.slice(1) : data.phone;
    const phone = `(${data.countryPhoneCode}) ${formatPhoneNumber(resultPhone)}`;
    const newMemberData: MemberUpdateData = {
      name: data.name,
      email: data.email,
      phone,
      address: {
        zipcode: data.address.zipcode,
        detail: data.address.detail,
        county: data.address.county,
        city: data.address.city,
      },
      birthday: birthday,
    };
    console.log(newMemberData);
    const result = await updateUser(newMemberData);
    console.log(result);
  };

  return (
    <Suspense>
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
        {openForm ? (
          <UserDataForm
            memberData={memberData as unknown as MemberData}
            setOpenForm={setOpenForm}
            onSubmit={onSubmit}
          />
        ) : (
          <Stack direction={'column'} spacing={{ sm: 2, md: 3 }}>
            <TitleText title={'姓名'} content={memberData?.name as string} />
            <TitleText title={'手機號碼'} content={memberData?.phone as string} />
            <TitleText title={'生日'} content={formatDate} />
            <TitleText title={'地址'} content={`${memberData?.address?.zipcode} ${memberData?.address?.detail}`} />
          </Stack>
        )}
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
    </Suspense>
  );
};

export default Page;
