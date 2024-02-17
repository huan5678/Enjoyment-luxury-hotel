'use client';
import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import { Box, Grid, Stack, Typography } from '@mui/material';

import { useWidth } from '@/hooks';
import { getRouteConfig } from '@/router';
import HorizontalWave from '@/components/common/HorizontalWave';
import cover from '@/assets/images/login.jpg';

export default function Layout({ children }: { children: React.ReactElement }) {
  const pathname = usePathname();
  const widthSize = useWidth();
  const isSmallDevice = widthSize === 'sm';

  const titleTem = getRouteConfig(pathname);

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
              {titleTem.pageSubtitle}
            </Typography>
            <Typography variant={isSmallDevice ? 'h3' : 'h1'} component="h1" sx={{ fontWeight: 700 }} color="white">
              {titleTem.pageTitle}
            </Typography>
          </Stack>
          <Suspense>{children}</Suspense>
        </Grid>
      </Grid>
    </Grid>
  );
}
