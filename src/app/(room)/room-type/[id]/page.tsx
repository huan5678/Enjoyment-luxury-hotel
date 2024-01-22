'use client';

import { useRouter } from 'next/navigation';
import { Box, Card, Grid, Paper, Stack, Typography } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Headline from '@/components/common/Headline';
import RoomFacilityBlock from '@/components/room/RoomFacilityBlock';

import roomTypeFakeData from '../fakeData';

export default function Page() {
  const router = useRouter();
  const t = roomTypeFakeData[1];

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
    <Box width="100%" px={matches ? '12px' : '60px'} sx={{ backgroundColor: '#f7f2ee' }}>
      <Stack py={matches ? 5 : '120px'} spacing={matches ? 3 : 10}>
        <Box>
          <Typography component="div" variant="h2">
            {t.name}
          </Typography>
          <Typography component="div" color="#4b4b4b" mt={1}>
            {t.description}
          </Typography>
        </Box>
        <Box>
          <Headline title="房內設備"></Headline>
          <Box
            sx={{
              width: '100%',
              borderRadius: '8px',
              backgroundColor: '#fff',
              py: 3,
              pl: 3,
              pr: { sm: 3, lg: '173px' },
              mt: { sm: 2, md: 3 },
            }}>
            <RoomFacilityBlock facilities={t.facilityInfo}></RoomFacilityBlock>
          </Box>
        </Box>
        <Box>
          <Headline title="備品提供"></Headline>
          <Box
            sx={{
              width: '100%',
              borderRadius: '8px',
              backgroundColor: '#fff',
              py: 3,
              pl: 3,
              pr: { sm: 3, lg: '173px' },
              mt: { sm: 2, md: 3 },
            }}>
            <RoomFacilityBlock facilities={t.amenityInfo}></RoomFacilityBlock>
          </Box>
        </Box>
        <Box>
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
    </Box>
  );
}
