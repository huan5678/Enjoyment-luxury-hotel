'use client';
import React from 'react';
//mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
//component
import LinkButton from '@/app/c.linkButton';
// image
import BannerImg from '@/assets/images/banner.png';

export default function HeroSecition() {
  return (
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
      {[1, 2].map((item) => {
        return (
          <SwiperSlide key={item}>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${BannerImg.src})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}>
              <Box
                sx={{
                  height: '100%',
                  paddingBottom: { sm: '70px', md: '165px' },
                  backgroundColor: '#00000099',
                  paddingTop: '150px',
                }}>
                <Stack
                  spacing={0}
                  direction={{ sm: 'column', md: 'row' }}
                  justifyContent="space-between"
                  sx={{ width: { sm: 'auto', md: '90%' }, margin: '0 auto' }}>
                  {/* 享樂酒店 */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { sm: 'column', md: 'row' },
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '45%',
                      margin: { sm: '0 auto 40px auto' },
                    }}>
                    <Box
                      sx={{
                        width: '100%',
                        display: { sm: 'flex', md: 'block' },
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}>
                      <Typography
                        component="h1"
                        color="primary"
                        sx={{ fontSize: '40px', whiteSpace: { sm: 'nowrap' } }}>
                        享樂酒店
                      </Typography>
                      <Typography
                        component="h6"
                        color="primary"
                        sx={{ fontSize: '29px', whiteSpace: { sm: 'nowrap' } }}>
                        Enjoyment Luxury Hotel
                      </Typography>
                      <Box
                        sx={{
                          width: { sm: '2px', md: 'auto' },
                          height: { sm: '83px', md: '2px' },
                          marginTop: { sm: '20px', md: '40px' },
                          background: {
                            sm: 'linear-gradient(90deg, #BE9C7C 0%, #FFF 100%);',
                            md: 'linear-gradient(90deg, #BE9C7C 0%, #FFFFFF 100%)',
                          },
                        }}></Box>
                    </Box>
                  </Box>

                  {/* 高雄住宿 */}
                  <Box sx={{ position: 'relative', width: { sm: 'auto', md: '50%' } }}>
                    {/* 背板 */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '0px',
                        left: '70px',
                        right: '20px',
                        bottom: '0px',
                        borderRadius: '80px',
                        borderTop: ' 1px solid #F5F7F9',
                        borderRight: '1px solid #F5F7F9',
                        background:
                          'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.30) 100%)',
                        backdropFilter: 'blur(10px)',
                      }}></Box>

                    {/* 文案 */}
                    <Box sx={{ position: 'relative', padding: { sm: '60px 40px 60px 20px' } }}>
                      <Typography
                        component="h2"
                        color="white"
                        sx={{ fontSize: { sm: '48px', md: '100px' }, marginBottom: { sm: '8px' } }}>
                        高雄
                      </Typography>
                      <Typography component="h2" color="white" sx={{ fontSize: { sm: '48px', md: '100px' } }}>
                        豪華住宿之選
                      </Typography>
                      <Typography
                        component="h3"
                        color="white"
                        sx={{ paddingTop: '24px', paddingBottom: '40px', fontSize: { sm: '16px', md: '48px' } }}>
                        我們致力於為您提供無與倫比的奢華體驗與優質服務
                      </Typography>
                      <LinkButton href="/room-type">立即訂房</LinkButton>
                    </Box>
                  </Box>
                </Stack>
              </Box>
            </Box>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
