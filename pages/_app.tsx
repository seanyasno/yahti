import React, { useCallback, useEffect } from 'react';

import type { AppProps } from 'next/app';

import { app, auth } from '@config/index';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { getMessaging, getToken, onMessage } from '@firebase/messaging';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { isSupported } from 'firebase/messaging/sw';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

import { saveDeviceToken } from '@requests/index';
import { theme } from '@styles/index';

import '../styles/globals.css';

// const onMessageListener = () =>
//     new Promise((resolve) => {
//         onMessage(getMessaging(app), (payload) => {
//             resolve(payload);
//         });
//     });

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
    const setUpMessaging = useCallback(async () => {
        try {
            if (!(await isSupported())) {
                return;
            }

            const messaging = getMessaging(app);
            if (!messaging) {
                return;
            }

            await Notification.requestPermission();
            const token = await getToken(messaging, {
                vapidKey:
                    'BBb2YcgCC2p0WSIjdfw4av-YDo3yGwOvvDZgpPSJPIh5GTKOmzC4hxbTmxQX51G4LiBWQcCV5iATiAzLYcX0VMM',
            });
            await saveDeviceToken(auth?.currentUser?.email, token);
        } catch (error) {
            console.error(error);
        }
    }, [auth?.currentUser, app]);

    // onMessageListener().then((payload) => {
    //     console.log('Message received. shrek', payload);
    // });

    useEffect(() => {
        setUpMessaging();
    }, [setUpMessaging]);

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
