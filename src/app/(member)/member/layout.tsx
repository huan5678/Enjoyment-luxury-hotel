import { UserBanner } from './UserBanner';
import { SwiperTabs } from './Tabs';
import HorizontalWave from '@/components/common/HorizontalWave';
import { getUser } from '@/assets/api';
import { AuthResponse } from '@/types';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const data = (await getUser()) as unknown as AuthResponse;
  return (
    <>
      <UserBanner data={data} />
      <SwiperTabs />
      {children}
      <HorizontalWave />
    </>
  );
}

