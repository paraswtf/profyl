"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";

import { trpcCSR } from "@/lib/trpc/trpcCSR";

export default function Provider({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => new QueryClient({}));
	const [trpcClient] = useState(() =>
		trpcCSR.createClient({
			links: [
				httpBatchLink({
					url: "http://localhost:3000/api"
				})
			]
		})
	);
	return (
		<trpcCSR.Provider
			client={trpcClient}
			queryClient={queryClient}
		>
			<QueryClientProvider client={queryClient}>
				{children}
			</QueryClientProvider>
		</trpcCSR.Provider>
	);
}
