import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Box, Card, CardContent, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import ArrowForward from '@mui/icons-material/ArrowForward';
// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
//
import RoomBaseInfoBlock from '@/components/room/RoomBaseInfoBlock';

interface RoomTypeCardProps {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  imageUrlList: string[];
  areaInfo: string;
  bedInfo: string;
  maxPeople: number;
}

export default function RoomTypeCard(props: RoomTypeCardProps) {
  const router = useRouter();

  return (
    <Card
      elevation={0}
      sx={{
        width: '100%',
        borderRadius: '20px',
      }}>
      <Grid container width="100%">
        <Grid item sm={12} md={12} lg={7}>
          <Swiper
            className="room-type-swiper"
            modules={[Pagination, Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            spaceBetween={0}
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}>
            <SwiperSlide>
              <Box
                position={'relative'}
                sx={{
                  width: '100%',
                  height: { sm: '351px', md: '351px', lg: '100%' },
                  maxHeight: { sm: '351px', md: '351px', lg: '457px' },
                  overflow: 'hidden',
                  img: { width: '100%', height: '100%', objectFit: 'cover' },
                }}>
                <Image src={props.imageUrl} alt={`${props.name}環境`} layout="fill" objectFit="cover" />
              </Box>
            </SwiperSlide>
            {props.imageUrlList.map((item, idx) => (
              <SwiperSlide key={idx + 1}>
                <Box
                  position={'relative'}
                  sx={{
                    width: '100%',
                    height: { sm: '351px', md: '351px', lg: '100%' },
                    maxHeight: { sm: '351px', md: '351px', lg: '457px' },
                    overflow: 'hidden',
                    img: { width: '100%', height: '100%', objectFit: 'cover' },
                  }}>
                  <Image src={item} alt={`${props.name}環境-${idx + 1}`} layout="fill" objectFit="cover" />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>
        <Grid item sm={12} md={12} lg={5}>
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
                <RoomBaseInfoBlock
                  {...{
                    areaInfo: props.areaInfo,
                    bedInfo: props.bedInfo,
                    maxPeople: props.maxPeople,
                    isBorder: true,
                  }}
                />
              </Box>
              <Box>
                <Divider
                  sx={{
                    height: '2px',
                    backgroundImage: 'linear-gradient(90deg, #BE9C7C, transparent)',
                  }}></Divider>
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
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
