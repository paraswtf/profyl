import type { NextApiRequest } from "next";
import { Center, Card, Text, Space, Chip, InputProps } from "@mantine/core";
import Image from "next/image";
import Head from "next/head";
import { IconCircleCheck, IconCircleX, IconMail } from "@tabler/icons";
import jwt from "jsonwebtoken";
import request from "../lib/api";
import { PinInput } from "../components/PinInput";
import { Dispatch, SetStateAction, useState } from "react";

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

async function handleVerify(code: string) {
	try {
		const res = await request("/sessions/verify", { code });
		if (res.status === 200) return null;
		else if (res.status === 400) return res.message;
	} catch (e) {}
	return "An error occurred while verifying your session.";
}

export const useVerificationInput = (props: { email: string; error: string | null; setError: Dispatch<SetStateAction<string | null>>; loading: boolean; setLoading: Dispatch<SetStateAction<boolean>> }) => {
	return props.error ? (
		verificationStatus(props.error)
	) : (
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
					{props.email}
				</Center>
			</Chip>
			<Space h="xl" />
			<PinInput
				length={6}
				disabled={props.loading}
				onComplete={async (value: string) => {
					props.setLoading(true);
					const error = await handleVerify(value);
					if (!error) window.location.assign(`/`);
					else props.setError(error);
				}}
			/>
			<Space h="md" />
		</Center>
	);
};

export default function verify({ error }: ServerSideProps) {
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
					{verificationStatus(error)}
				</Card>
			</Center>
		</div>
	);
}

export async function getServerSideProps(context: { query: { token: string }; req: NextApiRequest }): Promise<{ props: ServerSideProps } | { redirect?: { destination: string } }> {
	const { token } = context.query;
	if (!token) return { props: { error: "No token provided." } };

	try {
		const res = await request("/sessions/verify", { verificationToken: token });

		if (res.status === 200) {
			const isCurrentSession = !!context.req.cookies.session && (jwt.decode(context.req.cookies.session) as any)?.userID === res.userID;
			if (isCurrentSession) return { redirect: { destination: "/" } };
			else return { props: { error: null } };
		}

		if (res.status === 400) return { props: { error: "Invalid or expired code." } };
	} catch (err) {
		console.error(err);
	}
	return { props: { error: "An error occurred while verifying the session." } };
}

type ServerSideProps = { error: string | null };
