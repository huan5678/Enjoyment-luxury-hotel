import { useRouter } from 'next/navigation';
import { Box, Card, CardContent, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import ArrowForward from '@mui/icons-material/ArrowForward';
import AspectRatio from '@mui/icons-material/AspectRatio';
import Bed from '@mui/icons-material/Bed';
import Person from '@mui/icons-material/Person';
import SquareCard from './SquareCard';

import { RoomTypeCardProps, SquareCardProps } from '@/app/(room)/room-type/_aggregation';

export default function RoomTypeCard(props: RoomTypeCardProps) {
  const router = useRouter();

  const graphicalData: SquareCardProps[] = [
    {
      title: props.areaInfo,
      children: <AspectRatio />,
    },
    {
      title: props.bedInfo,
      children: <Bed />,
    },
    {
      title: `${props.maxPeople}人`,
      children: <Person />,
    },
  ];

  /**
   * TO DO
   * 挖洞、輪播
   */
  return (
    <Card
      elevation={0}
      sx={{
        width: '100%',
        borderRadius: '20px',
      }}>
      <Grid container width="100%">
        <Grid item md={12} lg={7}>
          {/** TO DO 輪播 */}
        </Grid>
        <Grid item md={12} lg={5}>
          <CardContent sx={{ p: { sm: 2, md: 5 } }}>
            <Stack spacing={{ sm: 3, md: 5 }}>
              <Box>
                <Typography component="div" variant="h2">
                  {props.name}
                </Typography>
                <Typography component="div" color="#4b4b4b" mt={1}>
                  {props.description}
                </Typography>
              </Box>
              <Box>
                <Grid container spacing={2}>
                  {graphicalData.map((item) => (
                    <Grid item key={item.title}>
                      <SquareCard title={item.title}>{item.children}</SquareCard>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Box>
                <Divider
                  sx={{
                    height: '2px',
                    backgroundImage: 'linear-gradient(90deg, #BE9C7C, transparent)',
                  }}></Divider>
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center" py={2}>
                <Typography
                  component="div"
                  color="primary.main"
                  sx={{
                    fontSize: { sm: '16px', md: '24px' },
                    fontWeight: 700,
                  }}>
                  {`NT$ ${props.price.toLocaleString()}`}
                </Typography>
                <IconButton color="primary" size="large" onClick={() => router.push(`/room-type/${props._id}`)}>
                  <ArrowForward />
                </IconButton>
              </Box>
            </Stack>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}
