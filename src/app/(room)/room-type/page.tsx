'use client';

import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import RoomTypeCard from '@/app/(room)/room-type/RoomTypeCard';
import roomTypeFakeData from './fakeData';

export default function Page() {
  const theme = useTheme();
  const matches = useMediaQuery(() => theme.breakpoints.down('md'));
  return (
    <Box width="100%" sx={{ backgroundColor: '#f7f2ee' }}>
      <Container>
        <Stack py={matches ? 5 : '120px'}>
          <Typography variant={matches ? 'body2' : 'h6'}>房型選擇</Typography>
          <Typography variant={matches ? 'h3' : 'h1'} color="primary.main" mt={matches ? 1 : 2}>
            各種房型，任您挑選
          </Typography>
          <Box component="section" mt={matches ? 5 : 10}>
            <Grid container spacing={matches ? 3 : 6}>
              {roomTypeFakeData.map((room) => (
                <Grid item sm={12} key={room._id} width="100%">
                  <RoomTypeCard {...room}></RoomTypeCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
