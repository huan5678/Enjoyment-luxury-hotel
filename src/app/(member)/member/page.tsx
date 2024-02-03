import { Grid, Link } from '@mui/material';

import ChangePasswordPanel from './ChangePasswordPanel';
import MemberDataPanel from './MemberDataPanel';
import { Container } from './style';
import { getUser } from '@/assets/api';
import { AuthResponse } from '@/types';

export default async function Page() {
  const data = (await getUser()) as unknown as AuthResponse;
  if (!data) return <></>;
  return (
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
  );
}
