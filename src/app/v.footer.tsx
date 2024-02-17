'use client';
import React, { useState, useLayoutEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
//images
import LogoWhite from '@/assets/images/logoWhite.png';

const SnsLine = () => {
  return (
    <SvgIcon sx={{ width: '40px', height: '40px' }}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="39" height="39" rx="19.5" stroke="white" />
        <path
          d="M20 8C26.6165 8 32 12.368 32 17.738C32 19.8875 31.1675 21.8225 29.4275 23.729C26.9105 26.627 21.281 30.1565 20 30.6965C18.755 31.2215 18.899 30.401 18.956 30.077L18.9605 30.05L19.1315 29.0225C19.172 28.7165 19.214 28.241 19.0925 27.938C18.9575 27.6035 18.4265 27.4295 18.0365 27.3455C12.269 26.585 8 22.5515 8 17.738C8 12.368 13.385 8 20 8ZM15.533 19.529H13.2455V15.377C13.2455 15.3152 13.2211 15.2559 13.1775 15.2121C13.1339 15.1682 13.0748 15.1434 13.013 15.143H12.17C12.1393 15.143 12.1088 15.1491 12.0805 15.1608C12.0521 15.1726 12.0263 15.1898 12.0045 15.2115C11.9828 15.2333 11.9656 15.2591 11.9538 15.2875C11.9421 15.3158 11.936 15.3463 11.936 15.377V20.606C11.936 20.6675 11.9615 20.726 12.002 20.7665V20.768L12.005 20.771L12.008 20.774C12.0515 20.8158 12.1096 20.839 12.17 20.8385H15.533C15.662 20.8385 15.7655 20.7335 15.7655 20.6045V19.7645C15.7657 19.7338 15.7598 19.7033 15.7483 19.6748C15.7367 19.6464 15.7196 19.6205 15.698 19.5986C15.6764 19.5767 15.6507 19.5593 15.6224 19.5474C15.5941 19.5354 15.5637 19.5292 15.533 19.529ZM16.7195 15.143C16.6574 15.143 16.5979 15.1677 16.554 15.2115C16.5102 15.2554 16.4855 15.3149 16.4855 15.377V20.606C16.4855 20.735 16.5905 20.8385 16.7195 20.8385H17.5625C17.6915 20.8385 17.795 20.7335 17.795 20.606V15.377C17.795 15.3152 17.7706 15.2559 17.727 15.2121C17.6834 15.1682 17.6243 15.1434 17.5625 15.143H16.7195ZM22.514 15.143C22.4519 15.143 22.3924 15.1677 22.3485 15.2115C22.3047 15.2554 22.28 15.3149 22.28 15.377V18.482L19.8845 15.248C19.8784 15.2401 19.8719 15.2326 19.865 15.2255C19.8603 15.2202 19.8553 15.2137 19.85 15.209L19.8455 15.2045C19.8404 15.1996 19.8348 15.1951 19.829 15.191L19.82 15.185L19.8155 15.182C19.8132 15.1803 19.8106 15.1787 19.808 15.1775L19.796 15.17H19.793L19.7885 15.167L19.7735 15.161L19.7675 15.158C19.7626 15.1562 19.7576 15.1547 19.7525 15.1535H19.7495L19.745 15.152L19.7315 15.149H19.7225L19.718 15.1475H19.712L19.709 15.146H18.848C18.7862 15.146 18.7269 15.1704 18.6831 15.214C18.6392 15.2576 18.6144 15.3167 18.614 15.3785V20.6075C18.614 20.7365 18.719 20.84 18.848 20.84H19.688C19.8185 20.84 19.9235 20.735 19.9235 20.6075V17.5025L22.3235 20.7425C22.3395 20.7648 22.3593 20.7841 22.382 20.7995L22.3835 20.801L22.3985 20.81L22.4045 20.813C22.4084 20.8153 22.4124 20.8173 22.4165 20.819L22.427 20.8235L22.4345 20.8265C22.4395 20.8282 22.4445 20.8297 22.4495 20.831H22.454C22.4735 20.8366 22.4937 20.8396 22.514 20.84H23.354C23.4845 20.84 23.5895 20.735 23.5895 20.6075V15.377C23.5895 15.3149 23.5648 15.2554 23.521 15.2115C23.4771 15.1677 23.4176 15.143 23.3555 15.143H22.514ZM28.2365 16.2185V15.3785C28.2367 15.3478 28.2308 15.3173 28.2193 15.2888C28.2077 15.2604 28.1906 15.2345 28.169 15.2126C28.1474 15.1907 28.1217 15.1733 28.0934 15.1614C28.0651 15.1494 28.0347 15.1432 28.004 15.143H24.641C24.5805 15.1431 24.5223 15.1668 24.479 15.209H24.4775L24.476 15.212L24.473 15.2165C24.4311 15.2595 24.4075 15.317 24.407 15.377V20.606C24.407 20.6675 24.4325 20.726 24.473 20.7665L24.476 20.771L24.479 20.774C24.5226 20.8157 24.5807 20.8388 24.641 20.8385H28.004C28.133 20.8385 28.2365 20.7335 28.2365 20.6045V19.7645C28.2367 19.7338 28.2308 19.7033 28.2193 19.6748C28.2077 19.6464 28.1906 19.6205 28.169 19.5986C28.1474 19.5767 28.1217 19.5593 28.0934 19.5474C28.0651 19.5354 28.0347 19.5292 28.004 19.529H25.715V18.6455H28.0025C28.1315 18.6455 28.235 18.5405 28.235 18.4115V17.5715C28.2352 17.5408 28.2293 17.5103 28.2178 17.4818C28.2062 17.4534 28.1891 17.4275 28.1675 17.4056C28.1459 17.3837 28.1202 17.3663 28.0919 17.3544C28.0636 17.3424 28.0332 17.3362 28.0025 17.336H25.715V16.4525H28.0025C28.1315 16.4525 28.235 16.3475 28.235 16.2185H28.2365Z"
          fill="white"
        />
      </svg>
    </SvgIcon>
  );
};
const SnsIg = () => {
  return (
    <SvgIcon sx={{ width: '40px', height: '40px' }}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="39" height="39" rx="19.5" stroke="white" />
        <g clipPath="url(#clip0_6297_277)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24 11C25.3261 11 26.5979 11.5268 27.5355 12.4645C28.4732 13.4021 29 14.6739 29 16V24C29 25.3261 28.4732 26.5979 27.5355 27.5355C26.5979 28.4732 25.3261 29 24 29H16C14.6739 29 13.4021 28.4732 12.4645 27.5355C11.5268 26.5979 11 25.3261 11 24V16C11 14.6739 11.5268 13.4021 12.4645 12.4645C13.4021 11.5268 14.6739 11 16 11H24ZM24 13H16C15.2044 13 14.4413 13.3161 13.8787 13.8787C13.3161 14.4413 13 15.2044 13 16V24C13 24.7956 13.3161 25.5587 13.8787 26.1213C14.4413 26.6839 15.2044 27 16 27H24C24.7956 27 25.5587 26.6839 26.1213 26.1213C26.6839 25.5587 27 24.7956 27 24V16C27 15.2044 26.6839 14.4413 26.1213 13.8787C25.5587 13.3161 24.7956 13 24 13ZM20 16C21.0609 16 22.0783 16.4214 22.8284 17.1716C23.5786 17.9217 24 18.9391 24 20C24 21.0609 23.5786 22.0783 22.8284 22.8284C22.0783 23.5786 21.0609 24 20 24C18.9391 24 17.9217 23.5786 17.1716 22.8284C16.4214 22.0783 16 21.0609 16 20C16 18.9391 16.4214 17.9217 17.1716 17.1716C17.9217 16.4214 18.9391 16 20 16ZM20 18C19.4696 18 18.9609 18.2107 18.5858 18.5858C18.2107 18.9609 18 19.4696 18 20C18 20.5304 18.2107 21.0391 18.5858 21.4142C18.9609 21.7893 19.4696 22 20 22C20.5304 22 21.0391 21.7893 21.4142 21.4142C21.7893 21.0391 22 20.5304 22 20C22 19.4696 21.7893 18.9609 21.4142 18.5858C21.0391 18.2107 20.5304 18 20 18ZM24.5 14.5C24.7652 14.5 25.0196 14.6054 25.2071 14.7929C25.3946 14.9804 25.5 15.2348 25.5 15.5C25.5 15.7652 25.3946 16.0196 25.2071 16.2071C25.0196 16.3946 24.7652 16.5 24.5 16.5C24.2348 16.5 23.9804 16.3946 23.7929 16.2071C23.6054 16.0196 23.5 15.7652 23.5 15.5C23.5 15.2348 23.6054 14.9804 23.7929 14.7929C23.9804 14.6054 24.2348 14.5 24.5 14.5Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_6297_277">
            <rect width="24" height="24" fill="white" transform="translate(8 8)" />
          </clipPath>
        </defs>
      </svg>
    </SvgIcon>
  );
};

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const [isShowFooter, setIsShowFooter] = useState(true);

  const handlePath = () => {
    try {
      const state = pathname.includes('/user');
      setIsShowFooter(!state);
    } catch (e) {
      console.error(e);
    }
  };

  const handleHome = () => {
    router.push('/');
  };

  useLayoutEffect(() => {
    handlePath();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      component="footer"
      sx={{
        display: `${isShowFooter ? 'block' : 'none'}`,
        padding: { sm: '80px 12px 80px 12px', md: '80px 100px 120px 100px' },
        margin: '0 auto',
      }}>
      <Stack
        spacing={0}
        direction={{ sm: 'column', md: 'row' }}
        justifyContent="space-between"
        sx={{ paddingBottom: '80px' }}>
        <Box>
          <Box
            component="div"
            sx={{
              width: '196px',
              height: '72px',
              backgroundImage: `url(${LogoWhite.src})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textIndent: '101%',
              cursor: 'pointer',
            }}
            onClick={handleHome}>
            <Typography component="h6">享樂酒店 Enjoyment luxury hotel</Typography>
          </Box>
          <Box sx={{ display: 'flex', paddingTop: '40px', paddingBottom: { sm: '40px', md: '0px' } }}>
            <Box sx={{ paddingRight: '16px' }}>
              <SnsLine />
            </Box>
            <Box>
              <SnsIg />
            </Box>
          </Box>
        </Box>

        <Stack spacing={0} direction={{ sm: 'column', md: 'row' }}>
          <Box sx={{ paddingRight: { md: '80px' } }}>
            <Box sx={{ paddingBottom: { sm: '16px', md: '40px' } }}>
              <Typography color="white" sx={{ paddingBottom: '8px' }}>
                TEL
              </Typography>
              <Typography color="white" variant={'body2'}>
                +886-7-1234567
              </Typography>
            </Box>
            <Box sx={{ paddingBottom: '16px' }}>
              <Typography color="white" sx={{ paddingBottom: '8px' }}>
                FAX
              </Typography>
              <Typography color="white" variant={'body2'}>
                +886-7-1234567
              </Typography>
            </Box>
          </Box>

          <Box>
            <Box sx={{ paddingBottom: { sm: '16px', md: '40px' } }}>
              <Typography color="white" sx={{ paddingBottom: '8px' }}>
                MAIL
              </Typography>
              <Typography color="white" variant={'body2'}>
                elh@hexschool.com
              </Typography>
            </Box>
            <Box>
              <Typography color="white" sx={{ paddingBottom: '8px' }}>
                WEB
              </Typography>
              <Typography color="white" variant={'body2'}>
                www.elhhexschool.com.tw
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Stack>

      <Stack spacing={0} direction={{ sm: 'column', md: 'row' }} justifyContent={{ md: 'space-between' }}>
        <Box sx={{ paddingBottom: { sm: '16px', md: '0px' } }}>
          <Typography color="white" variant={'body2'}>
            806023 台灣高雄市新興區六角路 123 號
          </Typography>
        </Box>
        <Box>
          <Typography color="white" variant={'body2'}>
            © 享樂酒店 2023 All Rights Reserved.
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
