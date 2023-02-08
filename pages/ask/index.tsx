import type { NextPage } from "next";
import { Center, Card, Text, Space, TextInput, Button, Loader, ButtonProps, Chip } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconLink, IconQuestionMark, IconHeart } from "@tabler/icons";
import { useState, useEffect } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { slugRegex } from "../../lib/utils/common";
import Clipboard from "react-clipboard.js";
import Head from "next/head";
import Heart from "../../components/Heart";
import request, { ApiUrlsGenerateResponse } from "../../lib/api";
import { generateSlug } from "../../lib/uniqueID";

const getSlugError = async (slug: string) => {
	try {
		const res = await request("/urls/validate", { slug });
		if (res.success) return null;
		if (res.status === 400) return res.fields.slug!;
	} catch (e) {}
	return "An error occurred.";
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
	const [url, setUrl] = useState<ApiUrlsGenerateResponse | null>(null);
	const [slugLoading, setSlugLoading] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const form = useForm({
		initialValues: {
			name: "",
			question: "",
			slug: generateSlug()
		},
		validate: {
			slug: (value) => (slugRegex.test(value) ? null : "Invalid slug"),
			question: (value) => (value.length > 0 ? null : "Question is required")
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
		getSlugError(slug).then((error) => {
			setSlugLoading(false);
			sfe("slug", error);
		});
	}, [slug, sfe]);

	const handleSubmit = async (values: typeof form["values"]) => {
		//Set loading state
		setSubmitting(true);

		//remove all falsy values
		const req = Object.fromEntries(Object.entries(values).filter(([, v]) => v)) as typeof values;

		const url = Buffer.from(JSON.stringify({ name: req.name, question: req.question, slug: req.slug })).toString("base64");

		try {
			const res = await request("/urls/generate", {
				url: "https://c.paras.codes/profyl?data=" + url,
				slug: req.slug
			});
			if (res.status === 200) setUrl(res);
			if (res.status === 400) {
				const errors = res.fields;
				for (const [key, value] of Object.entries(errors)) {
					sfe(key, value);
				}
			}
		} catch (e) {
			console.error(e);
		}

		//End loading state
		setSubmitting(false);
	};

	return (
		<div>
			<Head>
				<title>Profyl - Ask 💕</title>
			</Head>
			<Center
				h="100vh"
				w="100vw"
				style={{
					flexDirection: "column"
				}}
			>
				<Heart />
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
						Ask someone a question
					</Text>
					<Space h="sm" />

					<form onSubmit={form.onSubmit(handleSubmit)}>
						<TextInput
							placeholder="Enter name"
							icon={<IconHeart />}
							withAsterisk={true}
							{...form.getInputProps("name")}
							disabled={url !== null}
							autoComplete="off"
						/>
						<Space h="md" />
						<TextInput
							placeholder="Enter a yes/no question"
							icon={<IconQuestionMark />}
							withAsterisk={true}
							{...form.getInputProps("question")}
							disabled={url !== null}
							autoComplete="off"
						/>
						<Space h="md" />
						<TextInput
							placeholder="Set Custom URL (BETA)"
							icon={<IconLink />}
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
							autoComplete="off"
						/>
						<Space h="md" />
						<Center>
							{url ? (
								<CopyButton
									value={"https://c.paras.codes/profyl/" + url.slug}
									radius="xl"
									w="100%"
								/>
							) : (
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
									color="pink"
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
									data-clipboard-text={"https://c.paras.codes/profyl/" + url.slug}
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
												{"https://c.paras.codes/profyl/" + url.slug}
											</Center>
										</Chip>
									</Center>
								</Clipboard>
							</Center>
						</div>
					) : null}
				</Card>
			</Center>
		</div>
	);
};

export default Home;
