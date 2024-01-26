'use client';

import { useRouter } from 'next/navigation';
import { Box, Button, Card, Grid, Paper, Stack, Typography } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Headline from '@/components/common/Headline';
import RoomFacilityBlock from '@/components/room/RoomFacilityBlock';
import RoomBaseInfoBlock from '@/components/room/RoomBaseInfoBlock';

import roomTypeFakeData from '../fakeData';

export default function Page() {
  const router = useRouter();
  const t = roomTypeFakeData[0];

  const theme = useTheme();
  const matches = useMediaQuery(() => theme.breakpoints.down('md'));

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
        <Grid container direction="row" overflow="hidden" sx={{ borderRadius: '20px' }}>
          <Grid item sm={6}>
            <Box component="div" sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
              <img src={t.imageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }}></img>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Grid container direction="row" sx={{ width: '100%', height: '100%' }}>
              {t.imageUrlList.map((item, idx) => (
                <Grid item sm={6} height="50%" key={idx + 1}>
                  <Box component="div" sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                    <img src={item} style={{ width: '100%', height: '100%', objectFit: 'cover' }}></img>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box width="100%" px={matches ? '0.75rem' : '3.75rem'} sx={{ backgroundColor: '#f7f2ee' }}>
        <Paper elevation={0} sx={{ py: matches ? 5 : '120px', backgroundColor: 'transparent' }}>
          <Grid container direction="row" spacing={9}>
            <Grid item sm={8}>
              <Stack spacing={matches ? 3 : 10}>
                <Box component="section">
                  <Typography component="div" variant="h2">
                    {t.name}
                  </Typography>
                  <Typography component="div" color="#4b4b4b" mt={1}>
                    {t.description}
                  </Typography>
                </Box>
                <Box component="section">
                  <Headline title="房型基本資訊"></Headline>
                  <Box sx={{ mt: { sm: 2, md: 3 } }}>
                    <RoomBaseInfoBlock
                      {...{
                        areaInfo: t.areaInfo,
                        bedInfo: t.bedInfo,
                        maxPeople: t.maxPeople,
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
                    <RoomFacilityBlock facilities={t.layoutInfo}></RoomFacilityBlock>
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
                    <RoomFacilityBlock facilities={t.facilityInfo}></RoomFacilityBlock>
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
                    <RoomFacilityBlock facilities={t.amenityInfo}></RoomFacilityBlock>
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
                      {t.name}
                    </Typography>
                    <Typography component="div" color="#4b4b4b" mt={1}>
                      {t.description}
                    </Typography>
                  </Box>
                  <Typography
                    component="div"
                    color="primary.main"
                    sx={{
                      fontSize: { sm: '1rem', md: '1.5rem' },
                      fontWeight: 700,
                    }}>
                    {`NT$ ${t.price.toLocaleString()}`}
                  </Typography>
                  <Box>{/** TO DO 日期與人數 */}</Box>
                  <Box>
                    <Button
                      variant="contained"
                      disableElevation
                      sx={{ width: '100%', px: 4, py: 2, borderRadius: '0.5rem' }}>
                      立即預訂
                    </Button>
                  </Box>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
}
