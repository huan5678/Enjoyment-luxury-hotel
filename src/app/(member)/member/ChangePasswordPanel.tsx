'use client';

import { useState } from 'react';
import { Box, Link, Stack, Typography, Button } from '@mui/material';

import Card from '@/components/common/Card';
import { useWidth } from '@/hooks';
import { ChangePasswordForm } from '@/app/(member)/PasswordForm';
import { AuthResponse } from '@/types';

const Page = ({ data }: { data: AuthResponse }) => {
  const [openForm, setOpenForm] = useState(false);

  const memberData = data.result;

  const widthSize = useWidth();
  const isSmallDevice = widthSize === 'sm';

  return (
    <Card
      padding={isSmallDevice ? 'md' : 'lg'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: isSmallDevice ? '1.5rem' : '2.5rem',
      }}>
      <Typography variant={'h5'} component="h3">
        {'修改密碼'}
      </Typography>
      <Stack direction={'column'} spacing={{ sm: 2, md: 3 }}>
        <Box>
          <Typography variant={'body1'} component={'h3'}>
            {'電子信箱'}
          </Typography>
          <Typography variant={'title'} component={'p'}>
            {memberData.email}
          </Typography>
        </Box>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Box>
            <Typography variant={'body1'} component={'h3'}>
              {'密碼'}
            </Typography>
            <Typography variant={'title'} component={'p'} sx={{ WebkitTextSecurity: 'disc' }}>
              {'********'}
            </Typography>
          </Box>
          <Link component={'button'} underline={'always'} fontWeight={700} onClick={() => setOpenForm(true)}>
            {'重設'}
          </Link>
        </Stack>
      </Stack>
      {openForm && <ChangePasswordForm memberData={memberData} setOpenForm={setOpenForm} />}
    </Card>
  );
};

export default Page;
