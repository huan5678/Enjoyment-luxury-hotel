import type { Metadata } from 'next';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { getRouteConfig, PATH_ID_HOME } from '@/router';
import Header from '@/app/v.header';
import Footer from '@/app/v.footer';
import ScrollTop from '@/app/c.scrollTop';
import theme from '@/theme';
import '@/assets/scss/index.scss';

const routeConfig = getRouteConfig(PATH_ID_HOME);

export const metadata: Metadata = {
  title: routeConfig.title,
  description: routeConfig.description,
};

export default function RootLayout(props: any) {
  const { children } = props;
  return (
    <html lang="zh-Hant-TW">
      <body>
        <AppRouterCacheProvider>
          <CssBaseline />
          <GlobalStyles
            styles={{
              body: { backgroundColor: '#140F0A' },
            }}
          />
          <ThemeProvider theme={theme}>
            <div id="back-to-top-anchor"></div>
            <Header {...props} />
            {children}
            <Footer />
            <ScrollTop {...props} />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
