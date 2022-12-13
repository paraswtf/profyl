import type { NextApiRequest, NextPage, NextPageContext } from "next";
import { Center, Card, Text, Space, Chip } from "@mantine/core";
import Image from "next/image";
import Head from "next/head";
import { IconCircleCheck, IconCircleX, IconMail } from "@tabler/icons";
import jwt from "jsonwebtoken";
import request from "../lib/api";
import { PinInput } from "../components/PinInput";

function verificationStatus(error: string | null) {
	return (
		<Center
			style={{
				flexDirection: "column"
			}}
		>
			<Space h="md" />
			{error === null ? (
				<IconCircleCheck
					size={50}
					color="#47D6AB"
				/>
			) : (
				<IconCircleX
					size={50}
					color="red"
				/>
			)}
			<Space h="xs" />
			<Text
				size={24}
				weight="bold"
				align="center"
			>
				{error === null ? "Session verified" : "Verification failed!"}
			</Text>
			<Space h="xs" />
			<Chip
				variant="filled"
				checked={false}
			>
				{error === null ? "Go back to the site to continue." : error}
			</Chip>
			<Space h="md" />
		</Center>
	);
}

export function verificationInput(email: string) {
	return (
		<Center
			style={{
				flexDirection: "column"
			}}
		>
			<Space h="md" />
			<Text
				size={24}
				weight="bold"
				align="center"
			>
				{"Enter the code sent to"}
			</Text>
			<Chip
				variant="filled"
				checked={false}
			>
				<Center>
					<IconMail size={"15px"} /> <Space w={5} />
					{email}
				</Center>
			</Chip>
			<Space h="xl" />
			<PinInput
				length={6}
				onComplete={(value: string, index: number) => {
					window.location.assign(`/verify?code=${value}`);
				}}
			/>
			<Space h="md" />
		</Center>
	);
}

export default function verify({ success, error }: ServerSideProps) {
	return (
		<div>
			<Head>
				<title>Profyl - Verify Email</title>
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
					{!success && !error ? verificationInput("your email") : verificationStatus(error)}
				</Card>
			</Center>
		</div>
	);
}

export async function getServerSideProps(context: { query: { code: string }; req: NextApiRequest }): Promise<{ props: ServerSideProps } | { redirect?: { destination: string } }> {
	const { code } = context.query;
	if (!code) {
		return {
			props: {
				success: false,
				error: null
			}
		};
	}

	try {
		const res = await request("/sessions/verify", {
			code
		});
		console.log(res);

		if (res.status === 200) {
			const isCurrentSession = !!context.req.cookies.session && (jwt.decode(context.req.cookies.session) as any)?.userID === res.userID;
			if (isCurrentSession) return { redirect: { destination: "/" } };
			else
				return {
					props: {
						success: true,
						error: null
					}
				};
		}

		if (res.status === 400) {
			return {
				props: {
					success: false,
					error: "Invalid or expired code."
				}
			};
		}
	} catch (err) {
		console.error(err);
	}
	return {
		props: {
			success: false,
			error: "An error occurred while verifying the session."
		}
	};
}

type ServerSideProps = {
	success: boolean;
	error: string | null;
};
