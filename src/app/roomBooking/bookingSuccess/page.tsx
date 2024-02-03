'use client';

import * as React from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import Check from '@mui/icons-material/Check';
import type { NextPage } from 'next';
import { Suspense } from 'react';
import Card from '@/components/common/Card';
import { useWidth } from '@/hooks';
import HorizontalWave from '@/components/common/HorizontalWave';
import Headline from '@/app/roomBooking/Headline';
import Link from 'next/link';
import { useSearchParams, useParams } from 'next/navigation';
import { getOrders } from '@/assets/api';
import { useState, useEffect } from 'react';
import { calcDays } from '../tool';
import { IOrder, ApiResponse } from '@/types';

const initOrderInfo: IOrder = {
  userInfo: {
    address: {
      zipcode: 802,
      detail: '文山路23號',
      county: '文山區',
      city: '高雄市',
    },
    name: 'Joanne Chen',
    phone: '0912345678',
    email: 'example@gmail.com',
    password: '',
    birthday: new Date(),
    verificationToken: '',
  },
  _id: '653e335a13831c2ac8c389bb',
  roomId: {
    name: '尊爵雙人房',
    description: '享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。',
    imageUrl: 'https://fakeimg.pl/300/',
    imageUrlList: ['https://fakeimg.pl/300/', 'https://fakeimg.pl/300/', 'https://fakeimg.pl/300/'],
    areaInfo: '24坪',
    bedInfo: '一張大床',
    maxPeople: 4,
    price: 10000,
    status: 1,
    layoutInfo: [
      {
        title: '市景',
        isProvide: true,
      },
    ],
    facilityInfo: [
      {
        title: '平面電視',
        isProvide: true,
      },
    ],
    amenityInfo: [
      {
        title: '衛生紙',
        isProvide: true,
      },
    ],
    _id: '653e4661336cdccc752127a0',
    createdAt: '2023-10-29T11:47:45.641Z',
    updatedAt: '2023-10-29T11:47:45.641Z',
  },
  checkInDate: '2023-06-17T16:00:00.000Z',
  checkOutDate: '2023-06-18T16:00:00.000Z',
  peopleNum: 2,
  orderUserId: '6533f0ef4cdf5b7f762747b0',
  status: 1,
  createdAt: '2023-10-29T10:26:34.498Z',
  updatedAt: '2023-10-29T10:26:34.498Z',
};

function getDay(date: string): string {
  const days = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const num = new Date(date).getDay();
  return days[num];
}

function timeFormat(checkDate: string): string {
  const month = checkDate.split('-')[1];
  const day = checkDate.split('-')[2].split('T')[0];
  const date = checkDate.split('T')[0];
  return `${month} 月 ${day} 號${getDay(date)}`;
}

const BookingSuccess: NextPage = () => {
  const [orderInfo, setOrderInfo] = useState<IOrder>(initOrderInfo);
  const widthSize = useWidth();
  const isSmallDevice = widthSize;
  const searchParams = useParams();
  const orderId = searchParams.id;

  const getAllOrders = async () => {
    await getOrders(orderId as string).then((res: ApiResponse<IOrder[] | IOrder | null>) => {
      if (res.status) {
        setOrderInfo(res.result as IOrder);
      }
    });
  };

  useEffect(() => {
    async function fetchData() {
      await getAllOrders();
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <Suspense>
      <Box sx={{ color: '#ffffff' }}>
        <Container>
          <Stack direction={{ md: 'column', lg: 'row' }} justifyContent={{ md: 'center', lg: 'space-between' }}>
            <Box width={{ md: '100%', lg: '55%' }} sx={{ maxWidth: '746px' }}>
              <Box
                component="section"
                mb={{ sm: '40px', md: '80px' }}
                pb={{ sm: '40px', md: '80px' }}
                borderBottom={'1px solid #ececec'}>
                <Stack
                  direction={{ sm: 'column', md: 'row' }}
                  alignItems={{ sm: 'left', md: 'center' }}
                  mb={{ sm: 4, md: 5 }}>
                  <Stack
                    width={'56px'}
                    height={'56px'}
                    borderRadius={'50%'}
                    bgcolor={'#52DD7E'}
                    direction="row"
                    justifyContent={'center'}
                    alignItems={'center'}
                    marginRight={'34px'}
                    mb={{ sm: 2, md: 0 }}>
                    <Check sx={{ fontSize: 40, color: '#ffffff' }} />
                  </Stack>
                  <Typography component="h2" fontSize={{ sm: '32px', md: '40px' }} fontWeight={700}>
                    恭喜，{orderInfo.userInfo.name}！
                    <br />
                    您已預訂成功
                  </Typography>
                </Stack>
                <Typography width={'88%'}>
                  我們已發送訂房資訊及詳細內容至你的電子信箱，入住時需向櫃檯人員出示訂房人證件。
                </Typography>
              </Box>
              <Box component="section" mb={{ sm: 5, md: 10 }} pb={{ sm: 5, md: 10 }} borderBottom={'1px solid #ececec'}>
                <Typography component="h3" fontSize={{ sm: '16px', md: '24px' }} fontWeight={700} mb={{ sm: 3, md: 5 }}>
                  立即查看您的訂單紀錄
                </Typography>
                <Button variant="contained">
                  <Link className="link" href="/member/order">
                    <Typography component="span" color="white">
                      前往我的訂單
                    </Typography>
                  </Link>
                </Button>
              </Box>
              <Box component="section">
                <Typography variant={'h5'} component="h5" mb={{ sm: 4, md: 5 }}>
                  訂房人資訊
                </Typography>
                <Typography mb={1}>姓名</Typography>
                <Typography mb={3}>{orderInfo.userInfo.name}</Typography>
                <Typography mb={1}>手機號碼</Typography>
                <Typography mb={3}>{orderInfo.userInfo.phone}</Typography>
                <Typography mb={1}>電子信箱</Typography>
                <Typography mb={7}>{orderInfo.userInfo.email}</Typography>
              </Box>
            </Box>
            <Box
              width={{ md: '100%', lg: '38%' }}
              sx={{
                maxWidth: '478px',
              }}>
              <Card
                padding={isSmallDevice ? 'sm' : 'md'}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginBottom: '60px',
                }}>
                <Typography mb={1}>預訂參考編號： {orderId}</Typography>
                <Typography
                  component="h4"
                  mb={{ sm: 3, md: 5 }}
                  fontSize={{ sm: '1rem', md: '1.5rem' }}
                  fontWeight={700}>
                  即將來的行程
                </Typography>
                <img
                  src={orderInfo.roomId.imageUrl}
                  alt="room image"
                  style={{ borderRadius: '8px', marginBottom: '28px' }}
                />
                <Box mb={{ sm: 3, md: 5 }} pb={{ sm: 3, md: 5 }} borderBottom={'1px solid #ECECEC'}>
                  <Stack direction={'row'} mb={3}>
                    <Typography fontSize={{ sm: '16px', md: '20px' }} fontWeight={700}>
                      {orderInfo.roomId.name}，
                      {(() => {
                        const checkInDate = orderInfo.checkInDate.split('T')[0];
                        const checkOutDate = orderInfo.checkOutDate.split('T')[0];
                        const nightCount = calcDays(checkInDate, checkOutDate);
                        return nightCount;
                      })()}
                      晚&nbsp;&nbsp;
                    </Typography>
                    <Typography color={'#909090'} fontSize={{ sm: '16px', md: '20px' }} fontWeight={700}>
                      |
                    </Typography>
                    <Typography fontSize={{ sm: '16px', md: '20px' }} fontWeight={700}>
                      &nbsp;&nbsp;住宿人數：{orderInfo.peopleNum} 位
                    </Typography>
                  </Stack>
                  <Box mb={3}>
                    <Headline
                      title={`入住：${timeFormat(orderInfo.checkInDate)}，15:00 可入住`}
                      fontSizeStyle="normal"
                    />
                    <Headline
                      title={`退房：${timeFormat(orderInfo.checkOutDate)}，12:00 前退房`}
                      fontSizeStyle="normal"
                      isGray={true}
                    />
                  </Box>
                  <Typography fontWeight={700}>
                    NT${' '}
                    {(() => {
                      const checkInDate = orderInfo.checkInDate.split('T')[0];
                      const checkOutDate = orderInfo.checkOutDate.split('T')[0];
                      const nightCount = calcDays(checkInDate, checkOutDate);
                      return orderInfo.roomId.price * nightCount;
                    })()}
                  </Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Headline title="房內設備" />
                  <Stack
                    direction={'row'}
                    mt={3}
                    p={3}
                    border={'1px solid #ececec'}
                    borderRadius={1}
                    useFlexGap
                    flexWrap="wrap">
                    {orderInfo.roomId.facilityInfo.map((item, i) => {
                      return (
                        <Box key={i} sx={{ display: 'flex' }} mb={'10px'} width={'50%'}>
                          <Check color="primary" sx={{ fontSize: 24 }} />
                          <Typography>{item.title}</Typography>
                        </Box>
                      );
                    })}
                  </Stack>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Headline title="備品提供" />
                  <Stack
                    direction={'row'}
                    mt={3}
                    p={3}
                    border={'1px solid #ececec'}
                    borderRadius={1}
                    useFlexGap
                    flexWrap="wrap">
                    {orderInfo.roomId.amenityInfo.map((item, i) => {
                      return (
                        <Box key={i} sx={{ display: 'flex' }} mb={'10px'} width={'50%'}>
                          <Check color="primary" sx={{ fontSize: 24 }} />
                          <Typography>{item.title}</Typography>
                        </Box>
                      );
                    })}
                  </Stack>
                </Box>
              </Card>
            </Box>
          </Stack>
        </Container>
        <HorizontalWave />
      </Box>
    </Suspense>
  );
};

export default BookingSuccess;
