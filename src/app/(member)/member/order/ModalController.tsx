'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Typography, Stack, Box, Button, Backdrop, Fade, Modal } from '@mui/material';
import { Close } from '@mui/icons-material';

import Drawer from './Drawer';
import { deleteOrder } from '@/assets/api';
import { IOrder } from '@/types';

export default function Layout({
  isSmallDevice,
  id,
  targetOrder,
}: {
  isSmallDevice: boolean;
  id: string;
  targetOrder?: IOrder | undefined;
}) {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  function handleCloseModal() {
    setOpenModal(false);
  }

  function handleOpenModal() {
    setOpenModal(true);
  }

  const handleDeleteOrder = async (id: string) => {
    console.log('handleDeleteOrder', id);
    const res = await deleteOrder(id);
    setOpenModal(false);
  };

  const handelRouteRoom = () => {
    if (targetOrder?.roomId._id) {
      const route = `/room-type/${targetOrder?.roomId._id}`;
      router.push(route);
    }
  };

  return (
    <>
      <Stack direction={'row'} spacing={'1rem'} justifyContent={'space-between'}>
        <Button variant={'outlined'} size={'large'} fullWidth onClick={handleOpenModal}>
          {'取消訂單'}
        </Button>
        <Button variant={'contained'} size={'large'} fullWidth onClick={handelRouteRoom}>
          {'查看詳情'}
        </Button>
      </Stack>
      {isSmallDevice ? (
        <Drawer open={openModal} setOpen={handleCloseModal}>
          <Stack
            justifyContent={'space-between'}
            alignItems={'center'}
            direction={'column'}
            sx={{
              bgcolor: 'background.paper',
              padding: 0,
            }}>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
              padding={'1rem'}
              width={'100%'}>
              <Typography variant={'h6'}>{'取消預訂'}</Typography>
              <Close
                sx={{
                  maxWidth: '2.5rem',
                  maxHeight: '2.5rem',
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer',
                  padding: '0.5rem',
                }}
                onClick={handleCloseModal}
              />
            </Stack>
            <Box
              display={'grid'}
              width={'100%'}
              minHeight={'6rem'}
              pt={'2.5rem'}
              pb={'2.5rem'}
              sx={{ placeContent: 'center' }}>
              <Typography variant={'h6'}>{'確定要取消此房型的預訂嗎？'}</Typography>
            </Box>
            <Stack direction={'row'} spacing={'1rem'} width={'100%'} padding={'0.75rem'}>
              <Button variant={'outlined'} size={'large'} fullWidth onClick={handleCloseModal}>
                {'關閉視窗'}
              </Button>
              <Button
                variant={'contained'}
                size={'large'}
                fullWidth
                onClick={() => {
                  handleDeleteOrder(id);
                }}>
                {'確定取消'}
              </Button>
            </Stack>
          </Stack>
        </Drawer>
      ) : (
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}>
          <Fade in={openModal}>
            <Stack
              borderRadius={'0.5rem'}
              justifyContent={'space-between'}
              alignItems={'center'}
              direction={'column'}
              sx={{
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '37.5rem',
                minHeight: '19rem',
                bgcolor: 'background.paper',
                padding: 0,
              }}>
              <Box
                display={'grid'}
                width={'100%'}
                minHeight={'14rem'}
                sx={{ placeContent: 'center' }}
                position={'relative'}>
                <Close
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    maxWidth: '2.5rem',
                    maxHeight: '2.5rem',
                    width: '100%',
                    height: '100%',
                    cursor: 'pointer',
                    padding: '0.5rem',
                  }}
                  onClick={handleCloseModal}
                />
                <Typography variant={'h6'}>{'確定要取消此房型的預訂嗎？'}</Typography>
              </Box>
              <Stack direction={'row'} spacing={'1rem'} width={'100%'} padding={'0.75rem'}>
                <Button variant={'outlined'} size={'large'} fullWidth onClick={handleCloseModal}>
                  {'關閉視窗'}
                </Button>
                <Button
                  variant={'contained'}
                  size={'large'}
                  fullWidth
                  onClick={() => {
                    handleDeleteOrder(id);
                  }}>
                  {'確定取消'}
                </Button>
              </Stack>
            </Stack>
          </Fade>
        </Modal>
      )}
    </>
  );
}
