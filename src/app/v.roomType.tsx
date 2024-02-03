'use client';
import React, { useState, useEffect } from 'react';
// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
//mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
//component
import LinkButton from '@/app/c.linkButton';
// image
import LineImage from '@/assets/images/line3.png';
import Line2Image from '@/assets/images/line2.png';
import WaveImage from '@/assets/images/bg.png';
import RoomImage from '@/assets/images/room1.png';
// others
import { apiGetRoomType } from '@/assets/api';
import { RoomTypeSchema, RoomTypeResponseData, ApiResponse, IRoom } from '@/types';

const roomBase: RoomTypeSchema = {
  _id: '',
  name: 'None',
  description: 'None',
  price: 0,
  imageUrl: '',
  imageUrlList: [],
  areaInfo: '',
  bedInfo: '',
  maxPeople: 2,
  status: 0,
  layoutInfo: [],
  facilityInfo: [],
  amenityInfo: [],
};

export default function RoomType() {
  const [data, setData] = useState<IRoom[]>([]);
  const [roomIndex, setRoomIndex] = useState(0);
  const [room, setRoom] = useState<IRoom>(roomBase);

  const handleRoom = (next: number) => {
    let newIndex = roomIndex + next;

    if (newIndex < 0) setRoomIndex(data.length - 1);
    else if (newIndex >= data.length) setRoomIndex(0);
    else setRoomIndex(newIndex);
  };

  const getRoomTypeList = async () => {
    await apiGetRoomType().then((res: ApiResponse<IRoom[] | IRoom | null>) => {
      if (res.status === true && Array.isArray(res.result)) {
        const { result } = res;
        setData(result as IRoom[]);
        const hasData = result.length > 0;
        setRoom(hasData ? result[0] : roomBase);
      }
    });
  };

  useEffect(() => {
    getRoomTypeList();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setRoom(data[roomIndex]);
    }
  }, [data, roomIndex]);

  return (
    <Stack
      component="section"
      direction={{ sm: 'column', md: 'row' }}
      alignItems={{ md: 'flex-end' }}
      sx={{
        position: 'relative',
        padding: { sm: '80px 12px', md: '120px 0' },
        overflow: 'hidden',
        backgroundImage: {
          sm: `url(${LineImage.src}), url(${WaveImage.src})`,
          md: `url(${Line2Image.src}), url(${WaveImage.src})`,
        },
        backgroundRepeat: 'no-repeat',
        backgroundSize: { sm: '375px 83px, 150% 50%', md: '1060px 187px, 100% 60%' },
        backgroundPosition: { sm: 'top right -80px, right bottom', md: 'top 120px right 0px, right bottom' },
      }}>
      <Box sx={{ width: { sm: '100%', md: '50%' }, minWidth: { md: '400px' }, marginRight: '80px' }}>
        <Swiper
          className="room-type-section"
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
                    height: { sm: '300px', md: '900px' },
                    borderRadius: { sm: '0px 8px 8px 0px' },
                    backgroundImage: `url(${RoomImage.src})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}></Box>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>

      <Box sx={{ width: { sm: '100%', md: '30%' }, marginTop: { sm: '24px' } }}>
        <Box sx={{ minHeight: { sm: '250px' } }}>
          <Typography
            color="white"
            sx={{ fontSize: { sm: '28px', md: '40px' }, marginBottom: { sm: '8px', md: '16px' } }}>
            {room.name}
          </Typography>
          <Typography
            color="white"
            sx={{ fontSize: { sm: '14px', md: '16px' }, marginBottom: { sm: '24px', md: '40px' } }}>
            {room.description}
          </Typography>
          <Typography
            color="white"
            sx={{ fontSize: { sm: '24px', md: '32 px' }, marginBottom: { sm: '24px', md: '40px' } }}>
            NT$ {room.price}
          </Typography>
          <LinkButton href="/room-type">查看更多</LinkButton>
        </Box>
        <Stack spacing={0} direction="row" justifyContent="flex-end" sx={{ marginTop: { sm: '24px', md: '40px' } }}>
          <Button
            component="button"
            color="primary"
            sx={{ padding: '16px' }}
            onClick={() => {
              handleRoom(-1);
            }}>
            <ArrowBackIcon />
          </Button>
          <Button
            component="button"
            color="primary"
            sx={{ padding: '16px' }}
            onClick={() => {
              handleRoom(1);
            }}>
            <ArrowForwardIcon />
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
}
