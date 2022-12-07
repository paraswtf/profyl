import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
	static getInitialProps = getInitialProps;

	render() {
		return (
			<Html lang="en">
				<Head>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/apple-touch-icon.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/favicon-16x16.png"
					/>
					<link
						rel="manifest"
						href="/site.webmanifest"
					/>
					<link
						rel="mask-icon"
						href="/safari-pinned-tab.svg"
						color="#4084c5"
					/>
					<meta
						name="msapplication-TileColor"
						content="#1a1b1e"
					/>
					<meta
						name="msapplication-TileImage"
						content="/mstile-144x144.png"
					/>
					<meta
						name="theme-color"
						content="#1a1b1e"
					/>
					<meta
						name="description"
						content="A simple and easy to use URL shortener"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
