import { Center, Card, Text, Space } from "@mantine/core";
import Image from "next/image";
import Head from "next/head";
import { IconCircleCheck } from "@tabler/icons";
import request from "../lib/api";

export default function verify() {
	return (
		<div>
			<Head>
				<title>Profyl - Log out</title>
			</Head>
			<Center
				h="100vh"
				w="100vw"
				style={{
					flexDirection: "column"
				}}
			>
				<Image
					src="/logo.svg"
					alt="Logo"
					width={100}
					height={100}
				/>
				<Space h="xl" />
				<Card
					shadow="md"
					p="md"
					radius="lg"
					bg="secondary"
					w="min(350px, calc(100vw - 30px))"
					sx={{ overflow: "visible", flexDirection: "row" }}
				>
					<Center
						style={{
							flexDirection: "column"
						}}
					>
						<Space h="md" />
						<IconCircleCheck
							size={50}
							color="#47D6AB"
						/>
						<Space h="xs" />
						<Text
							size={24}
							weight="bold"
							align="center"
						>
							{"Logged out successfully!"}
						</Text>
						<Space h="md" />
					</Center>
				</Card>
			</Center>
		</div>
	);
}

export async function getServerSideProps(): Promise<{ props: { success: true } }> {
	try {
		await request("/users/logout", {});
	} catch (err) {
		console.error(err);
	}
	return { props: { success: true } };
}
