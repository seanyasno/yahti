const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    images: {
        domains: ['firebasestorage.googleapis.com'],
    },
};

module.exports = () => {
    const plugins = [withPWA];
    return plugins.reduce((acc, next) => next(acc), {
        ...nextConfig,
    });
};
