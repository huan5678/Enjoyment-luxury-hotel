import { Box, Card, CardContent, CardMedia, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import ArrowForward from '@mui/icons-material/ArrowForward';
import AspectRatio from '@mui/icons-material/AspectRatio';
import Bed from '@mui/icons-material/Bed';
import Person from '@mui/icons-material/Person';
import SquareCard from './SquareCard';

export default function RoomTypeCard() {
  const templateData = [
    {
      title: '24坪',
      icon: <AspectRatio />,
    },
    {
      title: '1張大床',
      icon: <Bed />,
    },
    {
      title: '2-4人',
      icon: <Person />,
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
        height: '457px',
        borderRadius: '20px',
      }}>
      <Grid container width="100%">
        <Grid item sm={12} md={7}>
          { /** TO DO 輪播 */}
        </Grid>
        <Grid item sm={12} md={5}>
          <CardContent sx={{ p: { sm: 2, md: 5 } }}>
            <Stack spacing={{ sm: 3, md: 5 }}>
              <Box>
                <Typography
                  component="div"
                  sx={{
                    fontSize: '40px',
                    fontWeight: 700,
                  }}>
                  景觀雙人房
                </Typography>
                <Typography component="div" color="#4b4b4b">
                  景觀雙人房擁有絕美的高雄市景觀，讓您在舒適的環境中欣賞城市之美。
                </Typography>
              </Box>
              <Box>
                <Grid container spacing={2}>
                  {templateData.map((item) => (
                    <Grid item key={item.title}>
                      <SquareCard title={item.title}>{item.icon}</SquareCard>
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
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography
                  component="div"
                  color="primary.main"
                  sx={{
                    fontSize: { sm: '16px', md: '24px' },
                    fontWeight: 700,
                  }}>
                  NT$ 10,000
                </Typography>
                <IconButton color="primary" size="large">
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