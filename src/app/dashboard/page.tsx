"use client";
import { trpcCSR } from "@/lib/trpc/trpcCSR";
import React from "react";

function OrganisationsPage() {
	const { data } = trpcCSR.organisations.list.useQuery();
	console.log(data);
	return (
		<div>
			<h1>Organisations</h1>
			{data?.map((org, index) => (
				<div key={org.id}>
					<h2>
						{index} -&gt; {org.name}
					</h2>
				</div>
			))}
		</div>
	);
}

export default OrganisationsPage;
