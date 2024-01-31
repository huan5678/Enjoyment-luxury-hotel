'use client';

import Image from 'next/image';
import Link from 'next/link';
import moment, { Moment } from 'moment';
import { useState } from 'react';
import { Box, Button, Card, Container, Grid, IconButton, Paper, Stack, Typography } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutline';
//
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
//
import Headline from '@/components/common/Headline';
import RoomFacilityBlock from '@/components/room/RoomFacilityBlock';
import RoomBaseInfoBlock from '@/components/room/RoomBaseInfoBlock';
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

  const rules = [
    '入住時間為下午3點，退房時間為上午12點。',
    '如需延遲退房，請提前與櫃檯人員聯繫，視當日房況可能會產生額外費用。',
    '請勿在房間內抽煙，若有抽煙需求，可以使用設在酒店各樓層的專用吸煙區。',
    '若發現房間內的設施有損壞或遺失，將會按照價值收取賠償金。',
    '請愛惜我們的房間與公共空間，並保持整潔。',
    '如需額外的毛巾、盥洗用品或其他物品，請聯繫櫃檯。',
    '我們提供免費的Wi-Fi，密碼可以在櫃檯或是房間內的資訊卡上找到。',
    '請勿帶走酒店房內的物品，如有需要購買，請與我們的櫃檯人員聯繫。',
    '我們提供24小時櫃檯服務，若有任何需求或疑問，歡迎隨時詢問。',
    '為了確保所有客人的安全，請勿在走廊或公共區域大聲喧嘩，並遵守酒店的其他規定。',
  ];

  return (
    <>
      <Box component="section" py="5rem" px="3.75rem" sx={{ backgroundColor: '#f7f2ee' }}>
        <Grid container direction="row" overflow="hidden" sx={{ borderRadius: '20px' }} position="relative">
          <Grid item sm={6}>
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
          <Grid item sm={6}>
            <Grid container direction="row" sx={{ width: '100%', height: '100%' }}>
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
        {/* <Button
          disableElevation
          variant="outlined"
          sx={{ position: 'absolute', right: '80px', bottom: '0px', p: '1rem 2rem' }}>
          看更多
        </Button> */}
      </Box>
      <Box width="100%" sx={{ backgroundColor: '#f7f2ee' }}>
        <Container>
          <Paper elevation={0} sx={{ py: matches ? 5 : '120px', backgroundColor: 'transparent' }}>
            <Grid container direction="row" spacing={9}>
              <Grid item sm={8}>
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
                      {rules.map((line, idx) => (
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
              <Grid item sm={4}>
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
                      color="primary.main"
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
    </>
  );
}
