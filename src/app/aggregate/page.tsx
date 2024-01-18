'use client';
import * as React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import BedIcon from '@mui/icons-material/Bed';
import SquareCard from '@/components/room/SquareCard';
import Headline from '@/components/common/Headline';
import RoomFacilityBlock from '@/components/room/RoomFacilityBlock';
import RoomTypeCard from '@/components/room/RoomTypeCard';

export default function Index() {
  return (
    <Container maxWidth="xl" sx={{ minHeight: '100vh', backgroundColor: '#f7f2ee' }}>
      <Grid container spacing={3} columnSpacing={2}>
        <Grid item md={12}>
          <Grid container spacing={4}>
            <Grid item md={4}>
              <Typography variant="h5">SquareCard</Typography>
            </Grid>
            <Grid item md={8}>
              <SquareCard title="lorem">
                <BedIcon />
              </SquareCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12}>
          <Grid container spacing={4}>
            <Grid item md={4}>
              <Typography variant="h5">Headline</Typography>
            </Grid>
            <Grid item md={8}>
              <Headline title="loremlorem" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12}>
          <Grid container spacing={4}>
            <Grid item>
              <Typography variant="h5">RoomFacilityBlock</Typography>
            </Grid>
            <Grid item>
              <Box
                sx={{
                  width: '100%',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                  py: 3,
                  pl: 3,
                  pr: { sm: 3, md: '173px' },
                }}>
                <RoomFacilityBlock
                  facilities={['Facility1', 'Facility2', 'Facility3', 'Facility4', 'Facility5', 'Facility6']}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12}>
          <Grid container spacing={4}>
            <Grid item>
              <Typography variant="h5">RoomTypeCard</Typography>
            </Grid>
            <Grid item width="100%">
              <RoomTypeCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}