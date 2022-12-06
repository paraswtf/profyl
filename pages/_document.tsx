import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
	static getInitialProps = getInitialProps;

	render() {
		return (
			<Html>
				<Head>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/icons/apple-touch-icon.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/icons/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/icons/favicon-16x16.png"
					/>
					<link
						rel="manifest"
						href="/icons/site.webmanifest"
					/>
					<link
						rel="mask-icon"
						href="/icons/safari-pinned-tab.svg"
						color="#228ae6"
					/>
					<link
						rel="shortcut icon"
						href="/icons/favicon.ico"
					/>
					<meta
						name="msapplication-TileColor"
						content="#228ae6"
					/>
					<meta
						name="msapplication-config"
						content="/icons/browserconfig.xml"
					/>
					<meta
						name="theme-color"
						content="#1a1b1e"
					/>
					<meta
						title="description"
						content="URL Shortener"
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
