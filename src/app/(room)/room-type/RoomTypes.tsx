'use client';

import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
//
import RoomTypeCard from '@/app/(room)/room-type/_ui/RoomTypeCard';
//
import { RoomInfo, RoomTypeCardProps } from './_domain';
// image
import BannerImg from '@/assets/images/banner.png';

export default function Page({ data }: { data: RoomInfo[] }) {
  const theme = useTheme();
  const matches = useMediaQuery(() => theme.breakpoints.down('md'));
  return (
    <>
      <Swiper
        className="hero-section"
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        onSlideChange={() => {}}
        onSwiper={() => {}}>
        {[1, 2].map((item) => (
          <SwiperSlide key={item}>
            <Box
              sx={{
                width: '100%',
                backgroundImage: `url(${BannerImg.src})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}>
              <Box
                width="100%"
                display="flex"
                justifyContent="center"
                sx={{
                  height: 'calc(100vh - 120px)',
                  backgroundColor: '#00000099',
                }}>
                <Stack
                  spacing={0}
                  direction={{ sm: 'column', md: 'row' }}
                  justifyContent={{ sm: 'center', md: 'space-between' }}
                  alignItems="center"
                  sx={{ width: '100%', maxWidth: '780px' }}>
                  <Box display="flex" flexDirection="column" alignItems={matches ? 'center' : 'flex-start'}>
                    <Typography component="div" variant="h2" color="primary">
                      享樂酒店
                    </Typography>
                    <Typography
                      component="div"
                      color="primary"
                      sx={{
                        mt: { sm: '8px' },
                        fontSize: { sm: '16px', md: '24px' },
                        fontWeight: 700,
                      }}>
                      Enjoyment Luxury Hotel
                    </Typography>
                    <Box
                      sx={{
                        width: { sm: '2px', md: '100%' },
                        height: { sm: '83px', md: '2px' },
                        marginTop: { sm: '1.25rem', md: 5 },
                        background: {
                          sm: 'linear-gradient(90deg, #BE9C7C 0%, #FFF 100%);',
                          md: 'linear-gradient(90deg, #BE9C7C 0%, #FFFFFF 100%)',
                        },
                      }}
                    />
                  </Box>
                  <Typography variant={matches ? 'h3' : 'h1'} color="white" mt={matches ? 5 : 0}>
                    客房旅宿
                  </Typography>
                </Stack>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
      <Box width="100%" sx={{ backgroundColor: '#f7f2ee' }}>
        <Container>
          <Stack py={matches ? 5 : '120px'}>
            <Typography variant={matches ? 'body2' : 'h6'}>房型選擇</Typography>
            <Typography variant={matches ? 'h3' : 'h1'} color="primary" mt={matches ? 1 : 2}>
              各種房型，任您挑選
            </Typography>
            <Box component="section" mt={matches ? 5 : 10}>
              <Grid container spacing={matches ? 3 : 6}>
                {data.map((room: RoomTypeCardProps) => (
                  <Grid item sm={12} key={room._id} width="100%">
                    <RoomTypeCard {...room}></RoomTypeCard>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
