import React, { useCallback, useEffect } from 'react';

import type { AppProps } from 'next/app';

import { app, auth } from '@config/index';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { getMessaging, getToken, isSupported } from '@firebase/messaging';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TimeAgo from 'javascript-time-ago';
import he from 'javascript-time-ago/locale/he';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

import { saveDeviceToken } from '@requests/firestore-requests/firestore-requests';
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
    useMessagingSetup();

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

function useMessagingSetup() {
    const setUpMessaging = useCallback(async () => {
        try {
            const isMessagingSupported = await isSupported();
            if (!isMessagingSupported) {
                return;
            }

            const messaging = getMessaging(app);
            if (!messaging) {
                return;
            }

            const permission = await Notification.requestPermission();
            if (permission !== 'granted') {
                return;
            }

            const token = await getToken(messaging, {
                vapidKey:
                    'BBb2YcgCC2p0WSIjdfw4av-YDo3yGwOvvDZgpPSJPIh5GTKOmzC4hxbTmxQX51G4LiBWQcCV5iATiAzLYcX0VMM',
            });

            await saveDeviceToken(auth?.currentUser?.email, token);
        } catch (error) {
            console.error(error);
        }
    }, [auth?.currentUser, app]);

    useEffect(() => {
        setUpMessaging();
    }, []);
}
