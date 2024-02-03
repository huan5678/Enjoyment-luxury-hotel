'use client';

import { useEffect, useState } from 'react';
import { Suspense } from 'react';
import { Grid } from '@mui/material';

import ChangePasswordPanel from './ChangePasswordPanel';
import MemberDataPanel from './MemberDataPanel';
import { Container } from './style';
import { getUser } from '@/assets/api';
import { AuthResponse } from '@/types';

export default function Page() {
  const [data, setData] = useState<AuthResponse | null>(null);
  useEffect(() => {
    async function fetchData() {
      const res = await getUser();
      setData(res as unknown as AuthResponse);
      console.log(res);
    }
    fetchData();
  }, []);
  return (
    <Suspense>
      <Container>
        <Grid
          container
          direction={{ sm: 'column', md: 'row' }}
          justifyContent={'space-between'}
          gap={{ sm: '1.5rem', md: '2.5rem' }}
          wrap={'nowrap'}>
          <Grid item md={5}>
            <ChangePasswordPanel data={data as unknown as AuthResponse} />
          </Grid>
          <Grid item md={7}>
            <MemberDataPanel data={data as unknown as AuthResponse} />
          </Grid>
        </Grid>
      </Container>
    </Suspense>
  );
}
