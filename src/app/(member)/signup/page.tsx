'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Box, Grid, Link, Stack, Typography, Step, StepConnector, StepLabel, Stepper } from '@mui/material';
import { useWidth } from '@/hooks';
import Cookies from 'js-cookie';
import { AuthResponse, MemberRegisterData } from '@/types';
import UserDataForm from '@/app/(member)/UserDataForm';
import HorizontalWave from '@/components/common/HorizontalWave';
import PasswordForm from './PasswordForm';
import { userRegister } from '@/assets/api';
import cover from '@/assets/images/login.jpg';

const template = {
  subTitle: '享樂酒店，誠摯歡迎',
  title: '立即註冊',
};

const steps = ['輸入信箱及密碼', '填寫基本資料'];

const Page = () => {
  const widthSize = useWidth();
  const isSmallDevice = widthSize === 'sm';
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const [userData, setUserData] = useState({} as MemberRegisterData);

  useEffect(() => {
    console.log('userData ->', userData);
  }, [userData]);

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const onSubmit = async () => {
    const res = (await userRegister({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
      birthday: new Date(userData.birthday || ''),
      address: {
        zipcode: userData.address.zipcode,
        detail: userData.address.detail,
      },
    })) as AuthResponse;
    if (res.status === true) {
      Cookies.set('token', res.token);
      router.push('/login');
    }
  };

  return (
    <Grid container direction={isSmallDevice ? 'column' : 'row'}>
      <Grid
        item
        md={6}
        sx={{
          display: isSmallDevice ? 'hidden' : '',
        }}>
        <Box position={'relative'} sx={{ maxHeight: '100%', minHeight: '100dvh' }}>
          <Image src={cover.src} alt="cover" layout="fill" objectFit="cover" />
        </Box>
      </Grid>
      <Grid item sm={12} md={6}>
        <Box position={'relative'}>
          <Box
            position={'absolute'}
            sx={{
              top: isSmallDevice ? '2rem' : '4.5rem',
              width: '100%',
              zIndex: -1,
            }}>
            <HorizontalWave />
          </Box>
        </Box>
        <Grid
          display={'flex'}
          direction={'column'}
          justifyContent={'center'}
          gap={'0.5rem'}
          sx={{ margin: '0 auto', maxWidth: isSmallDevice ? undefined : '26rem', height: '100%', zIndex: 10 }}>
          <Stack direction={'column'} gap={'0.5rem'}>
            <Typography variant="title" component="span" sx={{ fontWeight: 400 }} color="primary">
              {template.subTitle}
            </Typography>
            <Typography variant={isSmallDevice ? 'h3' : 'h1'} component="h1" sx={{ fontWeight: 700 }} color="white">
              {template.title}
            </Typography>
          </Stack>
          <Grid container direction="column" gap="2.5rem">
            <Grid item>
              <Box sx={{ width: '100%', paddingTop: '1rem', paddingBottom: '1rem', marginTop: '1rem' }}>
                <Stepper activeStep={activeStep} connector={<StepConnector />} alternativeLabel>
                  {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                      optional?: React.ReactNode;
                    } = {};
                    if (isStepSkipped(index)) {
                      stepProps.completed = false;
                    }
                    return (
                      <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
              </Box>
            </Grid>
            <Box>
              <Grid item>
                {activeStep === 0 ? (
                  <>
                    <PasswordForm handleNext={handleNext} setData={setUserData} />
                  </>
                ) : (
                  <>
                    <UserDataForm setData={setUserData} onSubmit={onSubmit} isRegister={true} />
                  </>
                )}
              </Grid>
              <Typography
                variant={isSmallDevice ? 'body2' : 'body1'}
                component="p"
                sx={{ fontWeight: 400, marginTop: '1rem' }}
                color="white">
                {`已經有會員了嗎?`}
                <Link href={'/login'} sx={{ marginLeft: '0.5rem' }}>
                  立即登入
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Page;
