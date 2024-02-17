'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Box, Grid, Link, Typography, Step, StepConnector, StepLabel, Stepper } from '@mui/material';
import { useWidth } from '@/hooks';
import UserDataForm from '@/app/(member)/UserDataForm';
import PasswordForm from './PasswordForm';
import { userRegister } from '@/assets/api';
import { MemberEditData } from '@/types';

const steps = ['輸入信箱及密碼', '填寫基本資料'];

const SignupForm = () => {
  const widthSize = useWidth();
  const isSmallDevice = widthSize === 'sm';
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const [userData, setUserData] = useState({} as MemberEditData);

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
    const res = await userRegister({
      name: userData.name,
      email: userData.email,
      password: userData?.password as string,
      phone: userData.phone,
      birthday: new Date(userData.birthday || '').toDateString(),
      address: {
        zipcode: userData.address.zipcode,
        detail: userData.address.detail,
      },
    });
    if (res.status === true) {
      alert('註冊成功');
      router.push('/user/login');
    }
  };

  return (
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
          <Link href={'/user/login'} sx={{ marginLeft: '0.5rem' }}>
            立即登入
          </Link>
        </Typography>
      </Box>
    </Grid>
  );
};

export default SignupForm;
