import type { Metadata, Viewport } from "next";
import TrpcProvider from "@/lib/trpc/Provider";
import "./globals.css";
import { Noto_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";

const noto = Noto_Sans({
	subsets: ["latin"],
	variable: "--noto-sans-font"
});

export const metadata: Metadata = {
	title: "Profyl",
	description: "A simple and easy to use URL shortener",
	icons: [
		{
			type: "image/png",
			rel: "apple-touch-icon",
			sizes: "180x180",
			url: "/apple-touch-icon.png"
		},
		{
			type: "image/png",
			rel: "icon",
			sizes: "32x32",
			url: "/favicon-32x32.png"
		},
		{
			type: "image/png",
			rel: "icon",
			sizes: "16x16",
			url: "/favicon-16x16.png"
		},
		{
			rel: "manifest",
			url: "/site.webmanifest"
		},
		{
			rel: "mask-icon",
			color: "#4084c5",
			url: "/safari-pinned-tab.svg"
		}
	]
};

export const viewport: Viewport = {
	userScalable: false,
	width: "device-width",
	initialScale: 1,
	themeColor: "#1a1b1e"
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={cn(noto.className, "mt-[100px]")}>
				<TrpcProvider>
					<Navbar />
					{children}
				</TrpcProvider>
			</body>
		</html>
	);
}
