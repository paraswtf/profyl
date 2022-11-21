import type { NextPage } from "next";
import env from "../lib/env";
import { Center, Card, Text, Space, PasswordInput, TextInput, Button, CopyButton, Loader } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconLink, IconLock, IconPencilOff, IconCircleCheck } from "@tabler/icons";
import { useState, useEffect } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import axios from "axios";

const isValidSlug = async (slug: string) => {
	const res = (
		await axios
			.post(env.BASE_URL + "/api/urls/geturl", {
				slug
			})
			.catch((err) => {
				if (err?.response?.status === 404) return null;
				return { data: { valid: false } };
			})
	)?.data
		? { valid: false }
		: { valid: true };

	if (!res) return false;
	else return !!res.valid;
};

const Home: NextPage = () => {
	const [url, setUrl] = useState<string | null>(null);
	const [slugLoading, setSlugLoading] = useState(false);
	const form = useForm({
		initialValues: {
			url: "",
			password: "",
			slug: ""
		},
		validate: {
			slug: (value) => (/(?!^[\.\_])(?![\.\_]$)(?!.*[\.\_]{2,})^[a-zA-Z0-9\.\_]+$/.test(value) ? null : "Invalid slug")
		},
		validateInputOnChange: true
	});
	const [slug] = useDebouncedValue(form.values.slug, 500);

	useEffect(() => {
		if (!form.values.slug) return;
		if (form.values.slug !== slug) setSlugLoading(true);
	}, [form, slug]);

	const sfe = form.setFieldError;

	useEffect(() => {
		if (!slug) return;
		isValidSlug(slug).then((isValid) => {
			sfe("slug", isValid ? null : "Slug already exists");
			setSlugLoading(false);
		});
	}, [slug, sfe]);

	const handleSubmit = async (values: typeof form["values"]) => {
		setUrl("test");
		console.log(values);
	};

	return (
		<Center
			h="100vh"
			w="100vw"
		>
			<Card
				shadow="md"
				p="md"
				radius="md"
				bg="secondary"
				w={400}
			>
				<Text
					size={24}
					weight="bold"
					align="center"
				>
					Shorten URL
				</Text>
				<Space h="sm" />

				<form onSubmit={form.onSubmit(handleSubmit)}>
					<TextInput
						placeholder="Enter a URL to shorten"
						icon={<IconLink />}
						withAsterisk={true}
						{...form.getInputProps("url")}
						disabled={url !== null}
					/>
					<Space h="md" />
					<PasswordInput
						placeholder="Set Password"
						id="your-password"
						icon={<IconLock />}
						{...form.getInputProps("password")}
						disabled={url !== null}
						{...(url != null ? { visible: false } : {})}
					/>
					<Space h="md" />

					<TextInput
						placeholder="Set Custom URL"
						defaultValue={slug}
						icon={<IconPencilOff />}
						rightSection={
							slugLoading ? (
								<Loader
									size="xs"
									variant="dots"
								/>
							) : null
						}
						{...form.getInputProps("slug")}
					/>
					<Space h="md" />
					<Center>
						{url ? (
							<CopyButton value={url}>
								{({ copied, copy }) => (
									<Button
										radius="xl"
										w="100%"
										color={copied ? "teal" : "green"}
										onClick={copy}
									>
										{copied ? "Copied url" : "Copy url"}
									</Button>
								)}
							</CopyButton>
						) : (
							<Button
								radius="xl"
								w="100%"
								type="submit"
							>
								Generate URL
							</Button>
						)}
					</Center>
				</form>
			</Card>
		</Center>
	);
};

export default Home;
