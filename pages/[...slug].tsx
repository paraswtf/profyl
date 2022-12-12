import axios from "axios";
import env from "../lib/env";
import { IconLock } from "@tabler/icons";
import { Center, Card, Text, Space, PasswordInput, Chip, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import Head from "next/head";
import { useState } from "react";
import Logo from "../components/Logo";
import request from "../lib/api";

export default function Redirect({ slug }: { slug: string }) {
	const [submitting, setSubmitting] = useState(false);
	const form = useForm({
		initialValues: {
			password: ""
		}
	});

	const handleSubmit = async (values: typeof form["values"]) => {
		//Set submitting to true to show the loader
		setSubmitting(true);

		const res =
			(
				await axios
					.post(env.BASE_URL + "/api/urls/geturl", {
						slug,
						password: values.password
					})
					.catch((err) => {
						if (err?.response?.status === 401) return { data: { locked: true } };
						return null;
					})
					.finally(() => setSubmitting(false))
			)?.data ?? null;

		if (!res || res.locked) return form.setFieldError("password", "Incorrect password");
		else window.location.assign(res.url);
	};

	return (
		<div>
			<Head>
				<title>Profyl - Password Protected URL</title>
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
					w={350}
				>
					<Text
						size={24}
						weight="bold"
						align="center"
					>
						Password Protected URL
					</Text>
					<Space h="sm" />
					<Center>
						<Chip
							variant="filled"
							checked={false}
						>
							<Center>
								<IconLock size={"15px"} /> <Space w={5} />
								{env.DISPLAY_URL + "/" + slug}
							</Center>
						</Chip>
					</Center>

					<Space h="xl" />
					<form onSubmit={form.onSubmit(handleSubmit)}>
						<PasswordInput
							placeholder="Enter Password"
							id="your-password"
							{...form.getInputProps("password")}
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
								Visit URL
							</Button>
						</Center>
					</form>
				</Card>
			</Center>
		</div>
	);
}

export const getServerSideProps = async (context: { params: { slug: string[] } }) => {
	console.log(context.params);
	try {
		const slug = context.params.slug.join("/");

		const res = await request("/urls/geturl", { slug });
		console.log(res);

		if (res.status === 404) return { redirect: { destination: "/404" } };

		if (res.success) return { redirect: { destination: res.url } };

		if (res.status === 400) return { props: { slug } };
	} catch (err) {}

	return { redirect: { destination: "/500" } };
};
