import type { NextConfig } from "next";
import pwa from "@ducanh2912/next-pwa";

const nextConfig: NextConfig = {
	/* config options here */
	reactStrictMode: true
	// swcMinify: true
};

const withPWA = pwa({
	dest: "public"
	// disable: process.env.NODE_ENV === "development",
	// register: true,
	// scope: "/app",
	// sw: "service-worker.js",
	//...
});

export default withPWA(nextConfig);
