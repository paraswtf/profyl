/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
    dest: 'public',
});

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        appDir: true,
    },
};

module.exports = withPWA({ ...nextConfig });
