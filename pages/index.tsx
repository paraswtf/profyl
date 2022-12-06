import type { NextPage } from "next";
import env from "../lib/env";
import { Center, Card, Text, Space, TextInput, Button, Loader, ButtonProps, Chip } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconLink, IconLock, IconPencil } from "@tabler/icons";
import { useState, useEffect } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import axios from "axios";
import { slugRegex } from "../lib/utils/common";
import validUrl from "valid-url";
import PasswordInput from "../components/PasswordInput";
import { GeneratedUrlData } from "./api/urls/generate";
import Clipboard from "react-clipboard.js";

const isValidSlug = async (slug: string) => {
	return (
		await axios
			.post(env.BASE_URL + "/api/urls/geturl", {
				slug
			})
			.catch((err) => {
				if (err?.response?.status === 404) return null;
				return { data: { valid: false } };
			})
	)?.data
		? false
		: true;
};

const CopyButton = (props: ButtonProps & { value: string }) => {
	const [copied, setCopied] = useState(false);
	return (
		<Clipboard
			data-clipboard-text={props.value}
			onSuccess={() => {
				setCopied(true);
				setTimeout(() => setCopied(false), 1000);
			}}
			isVisibleWhenUnsupported
			style={{ padding: 0, margin: 0, width: "100%", background: "none", border: "none" }}
		>
			<Button
				{...props}
				color={copied ? "teal" : "green"}
			>
				{copied ? "Copied!" : "Copy generated URL"}
			</Button>
		</Clipboard>
	);
};

const Home: NextPage = () => {
	const [url, setUrl] = useState<GeneratedUrlData | null>(null);
	const [slugLoading, setSlugLoading] = useState(false);
	const form = useForm({
		initialValues: {
			url: "",
			password: "",
			slug: ""
		},
		validate: {
			slug: (value) => (slugRegex.test(value) ? null : "Invalid slug"),
			url: (value) => {
				if (!value?.length) return "URL is required";
				if (!value.startsWith("http")) return "URL must start with http:// or https://";
				if (!validUrl.isUri(value)) return "Invalid URL";
			}
		},
		validateInputOnChange: true
	});
	const [slug] = useDebouncedValue(form.values.slug, 500);

	//To set the loading state for slug
	useEffect(() => {
		if (!form.values.slug) return;
		if (form.values.slug !== slug && slugRegex.test(form.values.slug)) setSlugLoading(true);
	}, [form, slug]);

	const sfe = form.setFieldError;

	//To finish the loading state for slug
	useEffect(() => {
		if (!slug || !slugRegex.test(slug)) return setSlugLoading(false);
		isValidSlug(slug).then((isValid) => {
			setSlugLoading(false);
			sfe("slug", isValid ? null : "Slug already exists");
		});
	}, [slug, sfe]);

	const handleSubmit = async (values: typeof form["values"]) => {
		//remove all falsy values
		const req = Object.fromEntries(Object.entries(values).filter(([, v]) => v)) as typeof values;
		const res = (await axios.post<{ slug: string }, { data: GeneratedUrlData }>(env.BASE_URL + "/api/urls/generate", req).catch(console.error))?.data;

		if (res) setUrl(res);
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
				w="min(350px, calc(100vw - 30px))"
				sx={{ overflow: "visible" }}
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
						placeholder="Set Password (optional)"
						id="your-password"
						icon={<IconLock />}
						{...form.getInputProps("password")}
						disabled={url !== null}
						{...(url != null ? { visible: false } : {})}
					/>
					<Space h="md" />
					<TextInput
						placeholder="Set Custom URL (BETA)"
						icon={<IconPencil />}
						rightSection={
							slugLoading ? (
								<Loader
									size="xs"
									variant="dots"
								/>
							) : null
						}
						{...form.getInputProps("slug")}
						disabled={url !== null /*true*/}
					/>
					<Space h="md" />
					<Center>
						{url ? (
							<CopyButton
								value={"prf.ink/" + url.slug}
								radius="xl"
								w="100%"
							/>
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
				{url ? (
					<div>
						<Space h="md" />

						<Center>
							<Clipboard
								data-clipboard-text={"prf.ink/" + url.slug}
								button-title="Click to copy"
								style={{ cursor: "pointer", overflow: "hidden", background: "none", border: "none", padding: 0, margin: 0 }}
							>
								<Center>
									<Chip
										variant="filled"
										checked={false}
									>
										<Center>
											<IconLink size={"15px"} /> <Space w={5} />
											{"prf.ink/" + url.slug}
										</Center>
									</Chip>
								</Center>
							</Clipboard>
						</Center>
					</div>
				) : null}
			</Card>
		</Center>
	);
};

export default Home;
