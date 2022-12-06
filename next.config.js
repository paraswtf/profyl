/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
	dest: "public/pwa"
});

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true
};

module.exports = withPWA({ ...nextConfig });
