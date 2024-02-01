'use client';
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useStore from '@/store';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import DehazeIcon from '@mui/icons-material/Dehaze';
import CloseIcon from '@mui/icons-material/Close';
import useScrollTrigger from '@mui/material/useScrollTrigger';
//images
import LogoWhite from '@/assets/images/logoWhite.png';
// componets
import Loader from '@/components/common/Loader';
import Menu from '@/app/c.menu';
// others
import { apiCheckUserIsLogin, getUser } from '@/assets/api';

function HideOnScroll({ children, window }: { children: React.ReactElement; window?: () => Window }) {
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Header(props: any) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = useStore((state) => state.isLogin);
  const setIsLogin = useStore((state) => state.setIsLogin);
  const [istransparent, setIsTransparent] = useState(true);
  const [isFixed, setIsFixed] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState('');

  const transparentPathList = ['/', '/room-type'];
  const fixedPathList = ['/', '/room-type'];

  const handleHome = () => {
    router.push('/');
  };

  const handlePath = () => {
    try {
      const transState = transparentPathList.some((item) => item === pathname);
      const fixedState = fixedPathList.some((item) => item === pathname);
      setIsTransparent(transState);
      setIsFixed(fixedState);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleDrawer = () => {
    setOpenDrawer((prev) => !prev);
  };

  const getUserInfo = async () => {
    await getUser().then((res: MemberResponseData) => {
      if (res.status === true) setUserName(res.result.name);
    });
  };

  const getUserIsLogin = async () => {
    setIsLoading(true);
    await apiCheckUserIsLogin()
      .then((res: CheckLoginSchema) => {
        setIsLogin(res.status);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    handlePath();
    // eslint-disable-next-line
  }, [pathname]);

  useEffect(() => {
    if (isLogin) getUserInfo();
  }, [isLogin]);

  useEffect(() => {
    getUserIsLogin();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <HideOnScroll {...props}>
        <AppBar
          position={isFixed ? 'fixed' : 'sticky'}
          sx={{ padding: { sm: '16px 12px', md: '24px 80px' } }}
          color={istransparent ? 'transparent' : 'primary'}>
          <Toolbar
            sx={{
              minHeight: { sm: 'unset', md: 'unset' },
              padding: { sm: '0px', md: '0px' },
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Box
              component="div"
              sx={{
                width: { sm: '110px', md: '196px' },
                height: { sm: '40px', md: '72px' },
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
              <Typography component="h2">享樂酒店 Enjoyment luxury hotel</Typography>
            </Box>
            <Box sx={{ display: { sm: 'none', md: 'block' } }}>
              <Menu userName={userName} />
            </Box>
            <IconButton
              sx={{ display: { sm: 'block', md: 'none' } }}
              onClick={toggleDrawer}
              aria-label="drawer"
              size="large">
              <Typography component="i" color="white">
                <DehazeIcon />
              </Typography>
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={toggleDrawer}
        sx={{ display: { sm: 'block', md: 'none' } }}
        PaperProps={{
          sx: {
            backgroundColor: '#140F0A',
            width: '100vw',
            position: 'relative',
          },
        }}>
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <IconButton onClick={toggleDrawer} aria-label="close" size="large" sx={{ padding: '15px 18px' }}>
            <Typography component="i" color="white">
              <CloseIcon />
            </Typography>
          </IconButton>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: 'calc(50% - 60px)',
            transform: ' translateY(-50%)',
            width: '100%',
            padding: '0 20px',
          }}>
          <Menu userName={userName} isDarwerOpen={openDrawer} toggleDrawer={toggleDrawer} />
        </Box>
      </Drawer>
    </>
  );
}
