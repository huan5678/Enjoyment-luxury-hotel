'use client';

import { Avatar, Box, Container, Stack, Typography } from '@mui/material';

import memberBannerBG from '@/assets/images/memberBannerBG.jpg';
import { useWidth } from '@/hooks';
import { MemberResponseData } from '@/types';

export const UserBanner = ({data}: {data: MemberResponseData}) => {
  const memberData = data.result;
  const widthSize = useWidth();
  const isSmallDevice = widthSize === 'sm';
  return (
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
              component="h2">{`Hello，${memberData.name}`}</Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
