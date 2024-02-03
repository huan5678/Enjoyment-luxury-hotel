'use client';
import * as React from 'react';
import { Box, Button, Container, Grid, Stack, Typography, Link } from '@mui/material';
import BedIcon from '@mui/icons-material/Bed';
import PersonIcon from '@mui/icons-material/Person';
import CheckIcon from '@mui/icons-material/Check';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SquareCard from '@/components/room/SquareCard';
import Headline from '@/app/roomBooking/Headline';
import type { NextPage } from 'next';
import Card from '@/components/common/Card';
import { useWidth } from '@/hooks';
import BookerForm from './BookerForm';
import { useSearchParams, useRouter } from 'next/navigation';
import { apiGetRoomType } from '@/assets/api';
import { useState, useEffect } from 'react';
import { timeFormat, calcDays } from './tool';
import { RoomTypeSchema } from '@/types';

let roomBookData = {
  roomId: '65a4e32683315f6587b0cb47',
  checkInDate: '2023/11/18',
  checkOutDate: '2023/11/19',
  peopleNum: '2',
};

interface MemberData {
  status: boolean;
  result: {
    address: {
      zipcode: number;
      detail: string;
    };
    _id: string;
    name: string;
    email: string;
    phone: string;
    birthday: string;
    createdAt: string;
    updatedAt: string;
  };
}

const initRoomData = {
  _id: '65a4e32683315f6587b0cb47',
  name: '玉璽雙床房',
  description: '',
  imageUrl:
    'https://images.unsplash.com/photo-1598928636135-d146006ff4be?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  imageUrlList: [''],
  areaInfo: '28 坪',
  bedInfo: '1 張大床',
  maxPeople: 2,
  price: 12000,
  status: 1,
  facilityInfo: [
    {
      title: '空調',
      isProvide: true,
    },
    {
      title: '電視',
      isProvide: true,
    },
    {
      title: '咖啡機',
      isProvide: true,
    },
  ],
  amenityInfo: [
    {
      title: '吹風機',
      isProvide: true,
    },
    {
      title: '香皂',
      isProvide: true,
    },
    {
      title: '拖鞋',
      isProvide: true,
    },
  ],
  layoutInfo: [
    {
      title: '市景',
      isProvide: false,
    },
    {
      title: '獨立衛浴',
      isProvide: true,
    },
  ],
  createdAt: '',
  updatedAt: '',
};

const RoomBooking: NextPage = () => {
  const widthSize = useWidth();
  const isSmallDevice = widthSize;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [roomDetail, setRoomDetail] = useState<RoomTypeSchema>(initRoomData);

  let roomId = 'no data';
  let peopleNum = 'no data';
  let checkInDate = 'no data';
  let checkOutDate: string | null = 'no data';
  if (searchParams.has('peopleNum')) {
    roomId = searchParams.get('roomId')!;
    peopleNum = searchParams.get('peopleNum')!;
    checkInDate = searchParams.get('checkInDate')!;
    checkOutDate = searchParams.get('checkOutDate')!;
    roomBookData = {
      roomId: roomId,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      peopleNum: peopleNum,
    };
  }

  const nightCount: number = calcDays(checkInDate, checkOutDate);

  useEffect(() => {
    (async () => {
      const res = await apiGetRoomType(roomId);
      console.log(res);
      setRoomDetail(res.result as unknown as RoomTypeSchema);
    })();
  }, []);

  function handleEdit() {
    router.back();
  }

  return (
    <>
      <Box
        className="container"
        bgcolor="
#F7F2EE">
        <Container>
          <Box sx={{ p: '120px 0 40px', display: 'flex' }}>
            <Stack direction={'row'} justifyContent={'center'} alignItems={'center'}>
              <ArrowBackIosNewIcon sx={{ fontSize: 24, marginRight: '8px' }} />
            </Stack>
            <Typography variant={'h3'} component="h2">
              確認訂房資訊
            </Typography>
          </Box>
          <Stack direction={{ md: 'column', lg: 'row' }} justifyContent={{ md: 'center', lg: 'space-between' }}>
            <Box width={{ md: '100%', lg: '55%' }} sx={{ maxWidth: '746px' }}>
              <Box component="section">
                <Typography variant={'h4'} component="h3" sx={{ marginBottom: '40px' }}>
                  訂房資訊
                </Typography>
                <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{ mb: '24px' }}>
                  <Box>
                    <Headline title="選擇房型" fontSizeStyle="normal" />
                    <Typography>{roomDetail.name}</Typography>
                  </Box>
                  <Link
                    component={'button'}
                    underline={'always'}
                    fontWeight={700}
                    color={'#000000'}
                    onClick={handleEdit}>
                    {'編輯'}
                  </Link>
                </Stack>
                <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{ mb: '24px' }}>
                  <Box>
                    <Headline title="訂房日期" fontSizeStyle="normal" />
                    <Typography>{`入住：${timeFormat(checkInDate)}`}</Typography>
                    <Typography>{`退房：${timeFormat(checkOutDate)}`}</Typography>
                  </Box>
                  <Link
                    component={'button'}
                    underline={'always'}
                    fontWeight={700}
                    color={'#000000'}
                    onClick={handleEdit}>
                    {'編輯'}
                  </Link>
                </Stack>
                <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{ mb: '24px' }}>
                  <Box>
                    <Headline title="房客人數" fontSizeStyle="normal" />
                    <Typography>{`${peopleNum} 人`}</Typography>
                  </Box>
                  <Link
                    component={'button'}
                    underline={'always'}
                    fontWeight={700}
                    color={'#000000'}
                    onClick={handleEdit}>
                    {'編輯'}
                  </Link>
                </Stack>
              </Box>
              <hr style={{ marginBottom: '24px' }} />
              <BookerForm roomBookInfo={roomBookData} />
              <hr style={{ marginBottom: '24px' }} />
              <Box component="section">
                <Typography variant={'h4'} component="h3" sx={{ marginBottom: '40px' }}>
                  房間資訊
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Headline title="房型基本資訊" />
                  <Grid container>
                    <Grid sx={{ mr: 2 }}>
                      <SquareCard title={roomDetail.areaInfo}>
                        <AspectRatioIcon color="primary" sx={{ fontSize: 24 }} />
                      </SquareCard>
                    </Grid>
                    <Grid sx={{ mr: 2 }}>
                      <SquareCard title={roomDetail.bedInfo}>
                        <BedIcon color="primary" sx={{ fontSize: 24 }} />
                      </SquareCard>
                    </Grid>
                    <Grid>
                      <SquareCard title={`${roomDetail.maxPeople} 人`}>
                        <PersonIcon color="primary" sx={{ fontSize: 24 }} />
                      </SquareCard>
                    </Grid>
                  </Grid>
                </Box>
                <Box sx={{ mb: 3, width: '100%' }}>
                  <Headline title="房間格局" />
                  <Stack
                    direction={'row'}
                    bgcolor={'#ffffff'}
                    mt={3}
                    p={3}
                    border={'1px solid #ececec'}
                    borderRadius={1}
                    useFlexGap
                    flexWrap="wrap">
                    {roomDetail.layoutInfo.map((item, i) => {
                      return (
                        <Box key={i} sx={{ display: 'flex' }} mb={'10px'} width={'33.3%'}>
                          <CheckIcon color="primary" sx={{ fontSize: 24 }} />
                          <Typography>{item.title}</Typography>
                        </Box>
                      );
                    })}
                  </Stack>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Headline title="房內設備" />
                  <Stack
                    direction={'row'}
                    bgcolor={'#ffffff'}
                    mt={3}
                    p={3}
                    border={'1px solid #ececec'}
                    borderRadius={1}
                    useFlexGap
                    flexWrap="wrap">
                    {roomDetail.facilityInfo.map((item, i) => {
                      return (
                        <Box key={i} sx={{ display: 'flex' }} mb={'10px'} width={'33.3%'}>
                          <CheckIcon color="primary" sx={{ fontSize: 24 }} />
                          <Typography>{item.title}</Typography>
                        </Box>
                      );
                    })}
                  </Stack>
                </Box>
                <Box mb={{ sm: 5, md: 15 }}>
                  <Headline title="備品提供" />
                  <Stack
                    direction={'row'}
                    bgcolor={'#ffffff'}
                    mt={3}
                    p={3}
                    border={'1px solid #ececec'}
                    borderRadius={1}
                    useFlexGap
                    flexWrap="wrap">
                    {roomDetail.amenityInfo.map((item, i) => {
                      return (
                        <Box key={i} sx={{ display: 'flex' }} mb={'10px'} width={'33.3%'}>
                          <CheckIcon color="primary" sx={{ fontSize: 24 }} />
                          <Typography>{item.title}</Typography>
                        </Box>
                      );
                    })}
                  </Stack>
                </Box>
              </Box>
            </Box>
            <Box
              width={{ md: '100%', lg: '37%' }}
              mb={5}
              sx={{
                maxWidth: '478px',
              }}>
              <Card
                padding={isSmallDevice ? 'md' : 'lg'}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}>
                <img src={roomDetail.imageUrl} alt="room image" style={{ borderRadius: '8px', marginBottom: '28px' }} />
                <Typography variant={'h4'} component="h3" mb={'12px'}>
                  價格詳情
                </Typography>
                <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                  <Typography>
                    NT$ {roomDetail.price} x {nightCount} 晚
                  </Typography>
                  <Typography>NT$ {roomDetail.price * nightCount}</Typography>
                </Stack>
                <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} mb={'12px'}>
                  <Typography>住宿折扣</Typography>
                  <Typography color={'primary'}>-NT$ 0</Typography>
                </Stack>
                <Box borderBottom={'1px solid #ececec'} mb={'12px'}></Box>
                <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} mb={'28px'}>
                  <Typography fontWeight={700}>總價</Typography>
                  <Typography fontWeight={700}>NT$ {roomDetail.price * nightCount}</Typography>
                </Stack>
                <Button variant="contained" type="submit" form="my-form">
                  確認訂房
                </Button>
              </Card>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default RoomBooking;
