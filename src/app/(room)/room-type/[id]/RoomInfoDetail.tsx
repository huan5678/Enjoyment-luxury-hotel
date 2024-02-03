'use client';

import Image from 'next/image';
import Link from 'next/link';
import moment, { Moment } from 'moment';
import { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Card,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Paper,
  Stack,
  SwipeableDrawer,
  Typography,
} from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Close from '@mui/icons-material/Close';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutline';
//
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
//
import Headline from '@/components/common/Headline';
import RoomFacilityBlock from '@/components/room/RoomFacilityBlock';
import RoomBaseInfoBlock from '@/components/room/RoomBaseInfoBlock';
import { roomRules } from '@/assets/roomRules';
//
import { RoomInfo } from '../_domain/index';

/**
 * To do
 * props: RoomInfo
 */
export default function Page({ data }: any) {
  const { result } = data;
  // console.log('result', result);

  const theme = useTheme();
  const matches = useMediaQuery(() => theme.breakpoints.down('md'));

  /**
   * 入住人數計算與邏輯
   */
  const [peopleNum, setPeopleNum] = useState(1);
  const [isAllowAdd, setIsAllowAdd] = useState(true);
  const [isAllowSub, setIsAllowSub] = useState(false);
  const handleCounts = (act: string) => {
    let touristNum = peopleNum;
    act === 'sub' ? touristNum-- : touristNum++;
    setPeopleNum(touristNum);
    touristNum === 1 ? setIsAllowSub(false) : setIsAllowSub(true);
    touristNum === result.maxPeople ? setIsAllowAdd(false) : setIsAllowAdd(true);
  };

  /**
   * 日期選擇
   */
  const [checkInDate, setCheckInDate] = useState<Moment | null>(moment());
  const [checkOutDate, setCheckOutDate] = useState<Moment | null>(moment().add(1, 'd'));
  const stayNum = checkOutDate?.diff(checkInDate, 'days');

  /**
   * 整理要給預定頁面的資料
   */
  const adjustData = {
    roomId: result._id,
    checkInDate: moment(checkInDate).format('YYYY/MM/DD'),
    checkOutDate: moment(checkOutDate).format('YYYY/MM/DD'),
    peopleNum: peopleNum,
  };
  // console.log('adjustData', adjustData);

  // mobile
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpen(newOpen);
  };
  const handleConfirmDate = () => {
    setOpen(false);
    setDrawerOpen(true);
  };

  return (
    <>
      {/* Main View */}
      <Box
        component="section"
        py="5rem"
        px="3.75rem"
        sx={{
          display: { sm: 'none', md: 'block' },
          backgroundColor: '#f7f2ee',
        }}>
        <Grid container direction="row" overflow="hidden" height="600px">
          <Grid item sm={6}>
            <Grid container direction="row" spacing={1} sx={{ width: '100%', height: '100%' }}>
              <Grid item sm={12}>
                <Box
                  position={'relative'}
                  sx={{
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    img: { width: '100%', height: '100%', objectFit: 'cover' },
                  }}>
                  <Image width={500} height={500} src={result.imageUrl} alt={`${result.name}環境`} priority={true} />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={6}>
            <Grid container direction="row" spacing={1} sx={{ width: '100%', height: '100%' }}>
              {result.imageUrlList.map((item: string, idx: number) => (
                <Grid item sm={6} height="50%" key={idx + 1}>
                  <Box
                    position={'relative'}
                    sx={{
                      width: '100%',
                      height: '100%',
                      overflow: 'hidden',
                      img: { width: '100%', height: '100%', objectFit: 'cover' },
                    }}>
                    <Image width={500} height={500} src={item} alt={`${result.name}環境-${idx + 1}`} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box component="section" sx={{ display: { sm: 'block', md: 'none' } }}>
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
          <SwiperSlide>
            <Box
              position={'relative'}
              sx={{
                width: '100%',
                height: '250px',
                overflow: 'hidden',
                img: { width: '100%', height: '100%', objectFit: 'cover' },
              }}>
              <Image src={result.imageUrl} alt={`${result.name}環境`} layout="fill" objectFit="cover" />
            </Box>
          </SwiperSlide>
          {result.imageUrlList.map((item: string, idx: number) => (
            <SwiperSlide key={idx + 1}>
              <Box
                position={'relative'}
                sx={{
                  width: '100%',
                  height: '250px',
                  overflow: 'hidden',
                  img: { width: '100%', height: '100%', objectFit: 'cover' },
                }}>
                <Image src={item} alt={`${result.name}環境-${idx + 1}`} layout="fill" objectFit="cover" />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      {/* Detail Info */}
      <Box width="100%" sx={{ backgroundColor: '#f7f2ee' }}>
        <Container>
          <Paper elevation={0} sx={{ py: matches ? 5 : '120px', backgroundColor: 'transparent' }}>
            <Grid container direction="row" spacing={6}>
              <Grid item sm={12} md={8}>
                <Stack spacing={matches ? 3 : 10}>
                  <Box component="section">
                    <Typography component="div" variant="h2">
                      {result.name}
                    </Typography>
                    <Typography component="div" color="#4b4b4b" mt={1}>
                      {result.description}
                    </Typography>
                  </Box>
                  <Box component="section">
                    <Headline title="房型基本資訊"></Headline>
                    <Box sx={{ mt: { sm: 2, md: 3 } }}>
                      <RoomBaseInfoBlock
                        {...{
                          areaInfo: result.areaInfo,
                          bedInfo: result.bedInfo,
                          maxPeople: result.maxPeople,
                          isBorder: false,
                        }}
                      />
                    </Box>
                  </Box>
                  <Box component="section">
                    <Headline title="房間格局"></Headline>
                    <Box
                      sx={{
                        width: '100%',
                        borderRadius: '0.5rem',
                        backgroundColor: '#fff',
                        py: 3,
                        pl: 3,
                        pr: { sm: 3, xl: '140px' },
                        mt: { sm: 2, md: 3 },
                      }}>
                      <RoomFacilityBlock facilities={result.layoutInfo}></RoomFacilityBlock>
                    </Box>
                  </Box>
                  <Box component="section">
                    <Headline title="房內設備"></Headline>
                    <Box
                      sx={{
                        width: '100%',
                        borderRadius: '0.5rem',
                        backgroundColor: '#fff',
                        py: 3,
                        pl: 3,
                        pr: { sm: 3, xl: '140px' },
                        mt: { sm: 2, md: 3 },
                      }}>
                      <RoomFacilityBlock facilities={result.facilityInfo}></RoomFacilityBlock>
                    </Box>
                  </Box>
                  <Box component="section">
                    <Headline title="備品提供"></Headline>
                    <Box
                      sx={{
                        width: '100%',
                        borderRadius: '0.5rem',
                        backgroundColor: '#fff',
                        py: 3,
                        pl: 3,
                        pr: { sm: 3, xl: '140px' },
                        mt: { sm: 2, md: 3 },
                      }}>
                      <RoomFacilityBlock facilities={result.amenityInfo}></RoomFacilityBlock>
                    </Box>
                  </Box>
                  <Box component="section">
                    <Headline title="訂房須知"></Headline>
                    <Box sx={{ width: '100%', mt: { sm: 2, md: 3 } }}>
                      {roomRules.map((line: string, idx: number) => (
                        <Stack direction="row" key={idx + 1}>
                          <Box minWidth="1.5rem">
                            <Typography variant={matches ? 'body2' : 'body1'} color="#4B4B4">
                              {idx + 1}.
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant={matches ? 'body2' : 'body1'} color="#4B4B4">
                              {line}
                            </Typography>
                          </Box>
                        </Stack>
                      ))}
                    </Box>
                  </Box>
                </Stack>
              </Grid>
              <Grid item md={4} sx={{ display: { sm: 'none', md: 'block' } }}>
                <Card elevation={0} sx={{ p: 5, borderRadius: '1.25rem' }}>
                  <Stack spacing={5}>
                    <Typography component="div" variant="h5" pb={2} sx={{ borderBottom: '1px solid #ECECEC' }}>
                      預定房型
                    </Typography>
                    <Box>
                      <Typography component="div" variant="h2" color="#4b4b4b">
                        {result.name}
                      </Typography>
                      <Typography component="div" color="#4b4b4b" mt={1}>
                        {result.description}
                      </Typography>
                    </Box>
                    {/* 日期 */}
                    <Stack spacing={1} direction={matches ? 'column' : 'row'}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <MobileDatePicker
                          label="入住"
                          format="YYYY/MM/DD"
                          disablePast={true}
                          minDate={checkInDate}
                          views={['year', 'month', 'day']}
                          defaultValue={checkInDate}
                          onChange={(newValue) => setCheckInDate(newValue)}
                        />
                      </LocalizationProvider>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <MobileDatePicker
                          label="退房"
                          format="YYYY/MM/DD"
                          disablePast={true}
                          minDate={checkOutDate}
                          views={['year', 'month', 'day']}
                          defaultValue={checkOutDate}
                          onChange={(newValue) => setCheckOutDate(newValue)}
                        />
                      </LocalizationProvider>
                    </Stack>
                    {/* 人數 */}
                    <Box
                      width="100%"
                      display="flex"
                      flexDirection={matches ? 'column' : 'row'}
                      justifyContent={matches ? 'center' : 'space-between'}
                      alignItems={matches ? 'flex-start' : 'center'}>
                      <Typography component="div">人數</Typography>
                      <Stack spacing={1} direction="row" justifyContent="center" alignItems="center">
                        <IconButton aria-label="減少人數" disabled={!isAllowSub} onClick={() => handleCounts('sub')}>
                          <RemoveCircleOutline
                            sx={{
                              fontSize: '40px',
                            }}
                          />
                        </IconButton>
                        <Typography variant="h6">{peopleNum}</Typography>
                        <IconButton aria-label="增加人數" disabled={!isAllowAdd} onClick={() => handleCounts('add')}>
                          <AddCircleOutline
                            sx={{
                              fontSize: '40px',
                            }}
                          />
                        </IconButton>
                      </Stack>
                    </Box>
                    {/* 價格 */}
                    <Typography
                      component="div"
                      color="primary"
                      sx={{
                        fontSize: { sm: '1rem', md: '1.5rem' },
                        fontWeight: 700,
                      }}>
                      {`NT$ ${result.price.toLocaleString()}`}
                    </Typography>
                    <Box>
                      <Link
                        href={{
                          pathname: '/roomBooking',
                          query: adjustData,
                        }}>
                        <Button
                          variant="contained"
                          disableElevation
                          sx={{ width: '100%', px: 4, py: 2, borderRadius: '0.5rem' }}>
                          立即預訂
                        </Button>
                      </Link>
                    </Box>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
      {/* Mobile */}
      <Paper elevation={0} sx={{ display: { sm: 'block', md: 'none' } }}>
        <AppBar
          position="fixed"
          sx={{
            top: 'auto',
            bottom: 0,
            p: '12px',
            backgroundColor: '#fff',
            borderTop: '1px solid #ECECEC',
            display: { sm: 'block', md: 'none' },
          }}>
          <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
            <Typography
              component="div"
              color="primary"
              sx={{
                fontSize: '0.875rem',
                fontWeight: 500,
              }}>
              {`NT$ ${result.price.toLocaleString()}`}
            </Typography>
            <Button
              variant="contained"
              disableElevation
              sx={{ width: '100%', maxWidth: '194px', px: 4, py: 2, borderRadius: '0.5rem' }}
              onClick={() => setOpen(true)}>
              查看可訂日期
            </Button>
          </Box>
        </AppBar>
        <Dialog fullScreen open={open} onClose={() => setOpen(false)} sx={{ display: { sm: 'block', md: 'none' } }}>
          <AppBar elevation={0} sx={{ height: '36px', position: 'relative' }}></AppBar>
          <Stack direction="column" alignItems="flex-start" sx={{ p: 3, backgroundColor: '#ECECEC' }}>
            <IconButton edge="start" onClick={() => setOpen(false)} aria-label="關閉">
              <Close />
            </IconButton>
            <Typography variant="h6">選擇住宿日期</Typography>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
              <Typography component="div" variant="h6">
                {stayNum}晚
              </Typography>
              <Typography
                component="div"
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}>
                {`${moment(checkInDate).format('YYYY/MM/DD')}-${moment(checkOutDate).format('YYYY/MM/DD')}`}
              </Typography>
            </Stack>
          </Stack>
          <DialogContent sx={{ pb: '80px' }}>
            <Typography variant="h6" color="primary">
              入住日期
            </Typography>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DateCalendar
                showDaysOutsideCurrentMonth
                fixedWeekNumber={6}
                defaultValue={checkInDate}
                onChange={(newValue) => setCheckInDate(newValue)}
              />
            </LocalizationProvider>
            <Typography variant="h6" color="primary">
              退房日期
            </Typography>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DateCalendar
                showDaysOutsideCurrentMonth
                fixedWeekNumber={6}
                defaultValue={checkOutDate}
                onChange={(newValue) => setCheckOutDate(newValue)}
              />
            </LocalizationProvider>
          </DialogContent>
          <AppBar
            position="fixed"
            sx={{ top: 'auto', bottom: 0, p: '12px', backgroundColor: '#fff', borderTop: '1px solid #ECECEC' }}>
            <Box display="flex" flexDirection="row" justifyContent="flex-end">
              <Button
                variant="contained"
                disableElevation
                disabled={stayNum && stayNum > 0 ? false : true}
                sx={{ width: '100%', maxWidth: '194px', px: 4, py: 2, borderRadius: '0.5rem' }}
                onClick={handleConfirmDate}>
                確定日期
              </Button>
            </Box>
          </AppBar>
        </Dialog>
        <SwipeableDrawer
          anchor="bottom"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{ display: { sm: 'block', md: 'none' } }}>
          <Stack direction="column" alignItems="flex-start" sx={{ p: 3, bgColor: '#ECECEC' }}>
            <IconButton edge="start" onClick={() => setDrawerOpen(false)} aria-label="關閉">
              <Close />
            </IconButton>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
              <Typography component="div" variant="h6">
                {stayNum}晚
              </Typography>
              <Typography
                component="div"
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}>
                {`${moment(checkInDate).format('YYYY/MM/DD')}-${moment(checkOutDate).format('YYYY/MM/DD')}`}
              </Typography>
            </Stack>
          </Stack>
          <Paper elevation={0} sx={{ px: 3, pb: 3 }}>
            <Typography>選擇人數</Typography>
            <Typography>此房型最多供{result.maxPeople}人居住，不接受寵物入住。</Typography>
            <Stack spacing={1} direction="row" alignItems="center">
              <IconButton aria-label="減少人數" disabled={!isAllowSub} onClick={() => handleCounts('sub')}>
                <RemoveCircleOutline
                  sx={{
                    fontSize: '40px',
                  }}
                />
              </IconButton>
              <Typography variant="h6">{peopleNum}</Typography>
              <IconButton aria-label="增加人數" disabled={!isAllowAdd} onClick={() => handleCounts('add')}>
                <AddCircleOutline
                  sx={{
                    fontSize: '40px',
                  }}
                />
              </IconButton>
            </Stack>
          </Paper>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
            sx={{ p: '12px', bgColor: '#fff', borderTop: '1px solid #ECECEC' }}>
            <Link
              href={{
                pathname: '/roomBooking',
                query: adjustData,
              }}>
              <Button
                variant="contained"
                disableElevation
                sx={{ width: '194px', px: 4, py: 2, borderRadius: '0.5rem' }}>
                儲存
              </Button>
            </Link>
          </Box>
        </SwipeableDrawer>
      </Paper>
    </>
  );
}
