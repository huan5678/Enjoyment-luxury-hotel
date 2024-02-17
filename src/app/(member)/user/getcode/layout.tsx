import type { Metadata } from 'next';
import { getRouteConfig, PATH_ID_GETCODE } from '@/router';

const config = getRouteConfig(PATH_ID_GETCODE);

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
};

export default function Layout({ children }: { children: React.ReactElement }) {
  return <>{children}</>;
}
