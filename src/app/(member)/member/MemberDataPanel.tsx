'use client';

import { useEffect, useState, Suspense } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Button, Stack, Typography } from '@mui/material';
import { useWidth } from '@/hooks';
import Card from '@/components/common/Card';
import UserDataForm from '@/app/(member)/UserDataForm';
import { TitleText } from './style';
import { getAddressDetailByCode } from '@/utils';
import { updateUserDetail } from '@/assets/api';
import { MemberResponseData, MemberEditData, MemberUpdateDetailData, MemberData } from '@/types';

const Page = ({ data, getUserInfo }: { data: MemberResponseData; getUserInfo: () => void }) => {
  const [openForm, setOpenForm] = useState(false);

  const [memberData, setMemberData] = useState<MemberData | null>(null);

  useEffect(() => {
    if (!data?.result) return;
    if (data.result) {
      const member = data.result;
      setMemberData(member as unknown as MemberData);
    }
  }, [data]);

  const zipData = getAddressDetailByCode(memberData?.address?.zipcode as number);

  const birthday = new Date(memberData?.birthday || 0);
  const formatDate = `${birthday.getFullYear()}年 ${birthday.getMonth() + 1}月 ${birthday.getDate()}日`;

  const widthSize = useWidth();
  const isSmallDevice = widthSize === 'sm';

  const handleMemberInfoEdit = function () {
    setOpenForm(true);
  };

  const onSubmit: SubmitHandler<MemberEditData> = async (data) => {
    console.log('data', data);
    const birthday = ` ${data.birthdayYear}-${data.birthdayMonth}-${data.birthdayDay}`;
    const newMemberData: MemberUpdateDetailData = {
      userId: memberData?._id as string,
      name: data.name,
      phone: data.phone,
      address: {
        zipcode: data.address.zipcode,
        detail: data.address.detail,
      },
      birthday: birthday,
    };
    const result = await updateUserDetail(newMemberData);
    if (result.status) {
      setOpenForm(false);
      getUserInfo();
    }
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
            <TitleText
              title={'地址'}
              content={`${memberData?.address?.zipcode} ${zipData?.city}${zipData?.county}${memberData?.address?.detail}`}
            />
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
