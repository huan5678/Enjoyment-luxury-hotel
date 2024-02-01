'use client';
import React, { useState, useEffect } from 'react';
// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
//mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// others
import TitleBox from '@/app/c.titleBox';
import LineImage from '@/assets/images/line.png';
import DotImage from '@/assets/images/dot.png';
import { apiGetCulinary } from '@/assets/api';
import { FoodTypeResponseData, FoodTypeSchema, ICulinary, ApiResponse } from '@/types';

export default function FoodType() {
  const [data, setData] = useState<FoodTypeSchema[]>([]);

  const getFoodType = async () => {
    await apiGetCulinary().then((res: ApiResponse<ICulinary[] | ICulinary | null>) => {
      if (res.status === true && Array.isArray(res.status)) setData(res.result as FoodTypeSchema[]);
    });
  };

  useEffect(() => {
    getFoodType();
    // eslint-disable-next-line
  }, []);

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        padding: { sm: '80px 0px 80px 12px', md: '120px 0px 120px 16%' },
        backgroundColor: '#F7F2EE',
      }}>
      <Box
        sx={{
          display: { sm: 'none', md: 'block' },
          position: 'absolute',
          top: '55px',
          left: '40px',
          width: '187px',
          height: '1068px',
          backgroundImage: `url(${LineImage.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}></Box>
      <Box
        sx={{
          display: { sm: 'none', md: 'block' },
          position: 'absolute',
          top: '-40px',
          right: '80px',
          width: '200px',
          height: '200px',
          backgroundImage: `url(${DotImage.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}></Box>

      <TitleBox txt1="佳餚" txt2="美饌" color="primary" />

      <Swiper className="food-type-section" spaceBetween="24" slidesPerView="auto">
        {data.map((item) => (
          <SwiperSlide key={item._id}>
            <Box
              sx={{
                position: 'relative',
                height: { sm: '600px' },
                borderRadius: '8px',
                backgroundImage: `url(${item.image})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: { sm: '16px', md: '24px' },
                  background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #140F0A 77.6%)',
                  backdropFilter: 'blur(10px)',
                }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: { sm: '16px', md: '24px' },
                  }}>
                  <Typography color="white" sx={{ fontSize: '24px' }}>
                    {item.title}
                  </Typography>
                  <Typography color="white" sx={{ fontSize: { sm: '14px', md: '16px' } }}>
                    {item.diningTime}
                  </Typography>
                </Box>
                <Typography color="white" sx={{ fontSize: { sm: '14px', md: '16px' } }}>
                  {item.description}
                </Typography>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
