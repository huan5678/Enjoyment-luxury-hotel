'use client';

import { SwiperTabs } from './Tabs';
import { Avatar, Box, Container, Stack, Typography } from '@mui/material';
import memberBannerBG from '@/assets/images/memberBannerBG.jpg';
import HorizontalWave from '@/components/common/HorizontalWave';
import { getUser } from '@/assets/api';
import { MemberResponseData } from '@/types';
import { ReactNode, Suspense, useEffect, useState } from 'react';
import { useWidth } from '@/hooks';

export default function Layout({ children }: { children: ReactNode }) {
  const [data, setData] = useState<MemberResponseData | null>(null);

  const widthSize = useWidth();
  const isSmallDevice = widthSize === 'sm';

  useEffect(() => {
    async function fetchData() {
      const res = await getUser();
      setData(res as unknown as MemberResponseData);
    }
    fetchData();
  }, []);
  return (
    <Suspense>
      <Box
        sx={{
          background: `linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${memberBannerBG.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: isSmallDevice ? '12.875rem' : '24rem',
        }}>
        <Container sx={{ height: '100%' }}>
          <Stack direction={'column'} justifyContent={'center'} height="100%">
            <Stack
              direction={{ sm: 'column', md: 'row' }}
              alignItems={{ sm: 'flex-start', md: 'center' }}
              spacing={{ sm: 2, md: 3 }}>
              <Avatar sx={{ height: isSmallDevice ? '4.5rem' : '9rem', width: isSmallDevice ? '4.5rem' : '9rem' }} />
              <Typography
                variant={isSmallDevice ? 'h4' : 'h3'}
                color="white"
                component="h2">{`Hello，${data?.result?.name}`}</Typography>
            </Stack>
          </Stack>
        </Container>
      </Box>
      <SwiperTabs />
      {children}
      <HorizontalWave />
    </Suspense>
  );
}
