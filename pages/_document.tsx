import React from 'react';

import { Head, Html, Main, NextScript } from 'next/document';

const MyDocument = () => {
    return (
        <Html dir={'rtl'}>
            <Head>
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/icon.png" />
                <meta name="theme-color" content="#F1F1F1" />

                <title>יאחתי</title>

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin={''}
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Assistant:wght@200;300;400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

export default MyDocument;
