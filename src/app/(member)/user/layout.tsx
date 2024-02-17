'use client';
import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import { Box, Grid, Stack, Typography } from '@mui/material';

import { useWidth } from '@/hooks';
import HorizontalWave from '@/components/common/HorizontalWave';
import cover from '@/assets/images/login.jpg';

const template = {
  subTitle: '享樂酒店，誠摯歡迎',
  title: '立即開始旅程',
};

export default function Layout({ children }: { children: React.ReactElement }) {
  const pathname = usePathname();
  const widthSize = useWidth();
  const isSmallDevice = widthSize === 'sm';

  const title = () => {
    const pathList = ['/user/login', '/user/signup', '/user/getcode', '/user/forgot'];
    const pathIndex = pathList.indexOf(pathname);

    switch (pathIndex) {
      case 0:
        return '立即開始旅程';
      case 1:
        return '立即註冊';
      case 2:
        return '忘記密碼';
      case 3:
        return '設置新密碼';
      default:
        return '立即開始旅程';
    }
  };

  return (
    <Grid container direction={isSmallDevice ? 'column' : 'row'}>
      <Grid item md={6} sx={{ display: isSmallDevice ? 'none' : '' }}>
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
          container
          display={'flex'}
          direction={'column'}
          justifyContent={'center'}
          gap={'0.5rem'}
          sx={{
            margin: '0 auto',
            maxWidth: isSmallDevice ? undefined : '26rem',
            height: '100%',
            zIndex: 10,
            padding: { sm: '0px 1rem', md: '0px' },
          }}>
          <Stack direction={'column'} gap={'0.5rem'}>
            <Typography variant="title" component="span" sx={{ fontWeight: 400 }} color="primary">
              {template.subTitle}
            </Typography>
            <Typography variant={isSmallDevice ? 'h3' : 'h1'} component="h1" sx={{ fontWeight: 700 }} color="white">
              {title()}
            </Typography>
          </Stack>
          <Suspense>{children}</Suspense>
        </Grid>
      </Grid>
    </Grid>
  );
}
