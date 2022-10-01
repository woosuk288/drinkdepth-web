import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import GlobalStyle from '../src/styles/GlobalStyle';

import Script from 'next/script';

import { QueryClientProvider, QueryClient } from 'react-query';
import { RecoilRoot } from 'recoil';

import TagManager from 'react-gtm-module';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 5000,
      cacheTime: Infinity,
    },
  },
});

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  React.useEffect(() => {
    process.env.NEXT_PUBLIC_GTM_ID
      ? TagManager.initialize({ gtmId: process.env.NEXT_PUBLIC_GTM_ID })
      : console.warn(process.env.NEXT_PUBLIC_GTM_ID);
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />

        <QueryClientProvider client={queryClient}>
          <Script
            src="https://developers.kakao.com/sdk/js/kakao.js"
            strategy="beforeInteractive"
            onLoad={() => console.log('kakao script loaded')}
          />

          <RecoilRoot>
            <Component {...pageProps} />
          </RecoilRoot>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
