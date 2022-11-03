import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material';
import { theme } from '@styles/index';
import CssBaseline from '@mui/material/CssBaseline';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import React, { useEffect } from 'react';
import { app } from '@config/index';
import { getMessaging, getToken } from '@firebase/messaging';
import firebase from 'firebase/compat';

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

    const setUpMessaging = async () => {
        const messaging = getMessaging(app);
    };

    useEffect(() => {
        // setUpMessaging();
    }, []);

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
