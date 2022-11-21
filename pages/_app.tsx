import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{
				/** Put your mantine theme override here */
				colorScheme: "dark"
			}}
		>
			<Component {...pageProps} />
		</MantineProvider>
	);
}

export default MyApp;
