import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import Navbar from "../components/Navbar";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
	const [open, setOpen] = useState(false);
	return (
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{
				/** Put your mantine theme override here */
				colorScheme: "dark"
			}}
		>
			<Navbar
				open={open}
				setOpen={setOpen}
			/>
			<Component {...pageProps} />
		</MantineProvider>
	);
}

export default MyApp;
