import type { NextPage } from "next";
import { Center, Card, Text, Space, TextInput, Button, PasswordInput, Switch, Checkbox, Divider } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconLock, IconLockAccess, IconMail, IconUser } from "@tabler/icons";
import { useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { verificationInput } from "./verify";
import Link from "next/link";
import request, { ApiUsersRegisterRequest } from "../lib/api";
import Logo from "../components/Logo";

const Register: NextPage = () => {
	const [submitting, setSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [mfaEmail, setMfaEmail] = useState<string | null>(null);
	//States for verification input
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const form = useForm({
		initialValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
			mfaEnabled: true,
			emailSubscription: true,
			tos: false
		},
		validate: {
			username: (value) => {
				if (!value) return "Username is required";
			},
			email: (value) => {
				if (!value) return "Email is required";
			},
			password: (value) => {
				if (!value) return "Password is required";
			},
			confirmPassword: (value, values) => {
				if (!value) return "Please confirm your password";
				else if (value !== values.password) return "Passwords do not match";
			},
			tos: (value: boolean) => {
				if (!value) return "You must agree to the terms of service";
			}
		},
		validateInputOnChange: false
	});

	const handleSubmit = async (values: typeof form["values"]) => {
		//Set loading state
		setSubmitting(true);
		const req: ApiUsersRegisterRequest = {
			username: values.username,
			email: values.email,
			password: values.password,
			mfaEnabled: values.mfaEnabled,
			emailSubscription: values.emailSubscription
		};
		try {
			const res = await request("/users/register", req);
			if (res.status === 200) {
				setMfaEmail(res.email);
			}
			if (res.status === 400) {
				form.setFieldError("username", res.fields.username);
				form.setFieldError("password", res.fields.password);
				form.setFieldError("email", res.fields.email);
			}
		} catch (e) {
			console.error(e);
		}

		setSubmitting(false);
	};

	return (
		<div>
			<Head>
				<title>Profyl - Sign up</title>
			</Head>
			<Center
				h="100vh"
				w="100vw"
				style={{
					flexDirection: "column"
				}}
			>
				<Logo />
				<Space h="xl" />
				<Card
					shadow="md"
					p="md"
					radius="lg"
					bg="secondary"
					w="min(350px, calc(100vw - 30px))"
					sx={{ overflow: "visible" }}
				>
					{mfaEmail ? (
						// eslint-disable-next-line react-hooks/rules-of-hooks
						verificationInput({ email: mfaEmail, error, setError, loading, setLoading })
					) : (
						<>
							<Text
								size={24}
								weight="bold"
								align="center"
							>
								Sign up
							</Text>
							<Space h="sm" />
							<form onSubmit={form.onSubmit(handleSubmit)}>
								<TextInput
									placeholder="Enter your username"
									autoComplete="username"
									icon={<IconUser />}
									withAsterisk={true}
									{...form.getInputProps("username")}
									disabled={submitting || submitted}
									//Lowercase conversion
									onChangeCapture={(e) => (e.currentTarget.value = e.currentTarget.value.toLowerCase())}
								/>
								<Space h="md" />
								<TextInput
									placeholder="Enter your email"
									autoComplete="email"
									icon={<IconMail />}
									withAsterisk={true}
									{...form.getInputProps("email")}
									disabled={submitting || submitted}
									//Lowercase conversion
									onChangeCapture={(e) => (e.currentTarget.value = e.currentTarget.value.toLowerCase())}
								/>
								<Space h="md" />
								<PasswordInput
									placeholder="Create a password"
									autoComplete="password"
									id="your-password"
									icon={<IconLock />}
									{...form.getInputProps("password")}
									disabled={submitting || submitted}
									visible={submitting || submitted ? false : undefined}
								/>
								<Space h="md" />
								<PasswordInput
									placeholder="Confirm your password"
									autoComplete="password"
									id="your-password"
									icon={<IconLockAccess />}
									{...form.getInputProps("confirmPassword")}
									disabled={submitting || submitted}
									visible={submitting || submitted ? false : undefined}
								/>
								<Switch
									{...form.getInputProps("mfaEnabled", { type: "checkbox" })}
									disabled={submitting || submitted}
									size="sm"
									label="Enable 2FA (recommended)"
									styles={{ trackLabel: { cursor: "pointer" }, thumb: { cursor: "pointer" } }}
									labelPosition="left"
								/>
								<Divider my="sm" />
								<Checkbox
									{...form.getInputProps("emailSubscription", { type: "checkbox" })}
									disabled={submitting || submitted}
									size="sm"
									label="Get notified about new features"
									styles={{ input: { cursor: "pointer" } }}
								/>
								<Checkbox
									{...form.getInputProps("tos", { type: "checkbox", withError: true, withFocus: true })}
									//disabled={submitting || submitted}
									size="sm"
									label={
										<>
											{"I agree to to the "}
											<Link href="/tos">
												<Text
													span
													c="blue"
													inherit
												>
													{"Terms of Service"}
													<br />
													<Text
														span
														c="blue"
														size="xs"
													>
														{"(which don't exist yet)"}
													</Text>
												</Text>
											</Link>
										</>
									}
									styles={{ input: { cursor: "pointer" } }}
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
										disabled={submitted}
									>
										Sign up
									</Button>
								</Center>
							</form>
							<Space h="md" />
							<Text
								c="primary"
								size="sm"
								align="center"
								w="100%"
							>
								{"Already have an account? "}
								<Link href="/login">
									<Text
										span
										c="blue.5"
										inherit
										underline
									>
										Sign in
									</Text>
								</Link>
							</Text>
						</>
					)}
				</Card>
			</Center>
		</div>
	);
};

export default Register;
