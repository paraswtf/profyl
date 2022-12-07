import type { NextPage } from "next";
import env from "../lib/env";
import { Center, Card, Text, Space, TextInput, Button, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconLock, IconUser } from "@tabler/icons";
import { useState } from "react";
import axios from "axios";
import { GeneratedUrlData } from "./api/urls/generate";
import Image from "next/image";
import Head from "next/head";
import { LoginRequest } from "./api/users/login";

const Login: NextPage = () => {
	const [url, setUrl] = useState<GeneratedUrlData | null>(null);
	const [submitting, setSubmitting] = useState(false);
	const form = useForm({
		initialValues: {
			username: "",
			password: ""
		},
		validate: {
			username: (value) => {
				if (!value) return "Username is required";
			},
			password: (value) => {
				if (!value) return "Password is required";
			}
		},
		validateInputOnChange: true
	});

	const handleSubmit = async (values: typeof form["values"]) => {
		//Set loading state
		setSubmitting(true);
		const req = {
			password: values.password,
			[values.username.includes("@") ? "email" : "username"]: values.username
		} as any as LoginRequest;
		const res = (
			await axios
				.post<{ username: string; password: string }, { data: GeneratedUrlData }>(env.BASE_URL + "/api/users/login", req)
				.catch(console.error)
				.finally(() => {
					setSubmitting(false);
				})
		)?.data;
		console.log(res);

		if (res) setUrl(res);
	};

	return (
		<div>
			<Head>
				<title>Profyl - Login</title>
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
					sx={{ overflow: "visible" }}
				>
					<Text
						size={24}
						weight="bold"
						align="center"
					>
						Login
					</Text>
					<Space h="sm" />

					<form onSubmit={form.onSubmit(handleSubmit)}>
						<TextInput
							placeholder="Enter your username or email"
							icon={<IconUser />}
							withAsterisk={true}
							{...form.getInputProps("username")}
							disabled={url !== null}
						/>
						<Space h="md" />
						<PasswordInput
							placeholder="Enter your password"
							id="your-password"
							icon={<IconLock />}
							{...form.getInputProps("password")}
							disabled={url !== null}
							{...(url != null ? { visible: false } : {})}
						/>
						<Space h="md" />
						<Center>
							<Button
								radius="xl"
								w="100%"
								type="submit"
								loading={submitting}
								loaderProps={{
									size: "xs",
									variant: "dots"
								}}
								loaderPosition="right"
							>
								Login
							</Button>
						</Center>
					</form>
				</Card>
			</Center>
		</div>
	);
};

export default Login;
