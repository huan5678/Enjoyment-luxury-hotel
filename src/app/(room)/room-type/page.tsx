'use client';

import { Box, Container, Grid, Typography } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import RoomTypeCard from '@/components/room/RoomTypeCard';

export default function Page() {
  const theme = useTheme();
  const matches = useMediaQuery(() => theme.breakpoints.down('md'));
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: '#f7f2ee' }}>
      <Typography variant={matches ? 'body2' : 'h6'}>房型選擇</Typography>
      <Typography variant={matches ? 'h3' : 'h1'} color="primary.main" mt={matches ? 1 : 2}>
        各種房型，任您挑選
      </Typography>
      <Box component="section">
        <Grid container spacing={matches ? 3 : 6} width="100%">
          <Grid item sm={12}>
            <RoomTypeCard></RoomTypeCard>
          </Grid>
          <Grid item sm={12}>
            <RoomTypeCard></RoomTypeCard>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
