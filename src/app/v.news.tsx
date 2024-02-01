'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
//mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// others
import Title from '@/app/c.title';
import DotImage from '@/assets/images/dot.png';
import { apiGetNews } from '@/assets/api';
import { NewsResponseData, NewsSchema, ApiResponse, INews } from '@/types';

export default function News() {
  // 因為免費方案 API 會睡著，避免等太久先塞一樣的資料
  const [data, setData] = useState<NewsSchema[]>([]);

  const getNews = async () => {
    await apiGetNews().then((res: ApiResponse<INews[] | INews | null>) => {
      if (res.status === true && Array.isArray(res.status)) setData(res.result as NewsSchema[]);
    });
  };

  useEffect(() => {
    getNews();
    // eslint-disable-next-line
  }, []);

  return (
    <Box component="section" className="news-section" sx={{ backgroundColor: '#F7F2EE', position: 'relative' }}>
      <Box
        sx={{
          position: 'absolute',
          top: { sm: '40px', md: '100px' },
          right: { sm: '24px', md: '180px' },
          width: { sm: '100px', md: '200px' },
          height: { sm: '100px', md: '200px' },
          backgroundImage: `url(${DotImage.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
        }}></Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: { sm: '-60px', md: '-80px' },
          left: { sm: '24px', md: '200px' },
          width: { sm: '100px', md: '200px' },
          height: { sm: '100px', md: '200px' },
          backgroundImage: `url(${DotImage.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
        }}></Box>

      <Stack
        spacing={0}
        direction={{ sm: 'column', md: 'row' }}
        justifyContent={{ md: 'center' }}
        sx={{ position: 'relative', padding: { sm: '80px 12px', md: '120px 0' }, margin: '0 auto', zIndex: '1' }}>
        {/* 最新消息 */}
        <Box sx={{ marginRight: { md: '65px' } }}>
          <Title txt1={'最新'} txt2={'消息'} color={'primary'} />
          <Box
            sx={{
              width: { sm: '140px', md: 'auto' },
              height: '2px',
              background: 'linear-gradient(90deg, #BE9C7C 0%, #FFF 100%)',
            }}></Box>
        </Box>
        {/* 消息列表 */}
        <Box>
          {data.map((news) => {
            return (
              <Stack
                spacing={1}
                direction={{ sm: 'column', md: 'row' }}
                key={news._id}
                sx={{ marginBottom: '40px', padding: { sm: '40px 0px 0px 0px', md: '0px' } }}>
                <Image className="news-image" src={news.image} alt={news.title} width={474} height={294} />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    maxWidth: '578px',
                  }}>
                  <Typography
                    variant="h3"
                    sx={{
                      color: '#000',
                      marginBottom: { sm: '8px', md: '24px' },
                      marginTop: { sm: '24px', md: '0px' },
                    }}>
                    {news.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#4B4B4B' }}>
                    {news.description}
                  </Typography>
                </Box>
              </Stack>
            );
          })}
        </Box>
      </Stack>
    </Box>
  );
}
