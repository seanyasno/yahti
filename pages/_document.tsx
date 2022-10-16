
import React from 'react';

import { Head, Html, Main, NextScript } from 'next/document';

const MyDocument = () => {
    return (
        <Html dir={'rtl'}>
            <Head>
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
