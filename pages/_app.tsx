import React from 'react';

import type { AppProps } from 'next/app';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TimeAgo from 'javascript-time-ago';
import he from 'javascript-time-ago/locale/he';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

import { theme } from '@styles/index';

import '../styles/globals.css';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

TimeAgo.addDefaultLocale(he);

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
            </CacheProvider>
        </QueryClientProvider>
    );
};

export default MyApp;
