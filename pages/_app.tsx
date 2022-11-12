import React, { useEffect } from 'react';

import type { AppProps } from 'next/app';

import { app } from '@config/index';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { getMessaging, getToken } from '@firebase/messaging';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import firebase from 'firebase/compat';
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

const MyApp = ({ Component, pageProps }: AppProps) => {
    // getToken(messaging, {
    //     vapidKey:
    //         'BBb2YcgCC2p0WSIjdfw4av-YDo3yGwOvvDZgpPSJPIh5GTKOmzC4hxbTmxQX51G4LiBWQcCV5iATiAzLYcX0VMM',
    // });
    //
    // Notification.requestPermission().then((permission) => {
    //     console.log(permission);
    // });

    // const setUpMessaging = async () => {
    //     try {
    //         const messaging = getMessaging(app);
    //         const token = await getToken(messaging, {
    //             vapidKey:
    //                 'BBb2YcgCC2p0WSIjdfw4av-YDo3yGwOvvDZgpPSJPIh5GTKOmzC4hxbTmxQX51G4LiBWQcCV5iATiAzLYcX0VMM',
    //         });
    //         console.log(token);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    //
    // useEffect(() => {
    //     setUpMessaging();
    // }, []);

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
