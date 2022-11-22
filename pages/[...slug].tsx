import axios from "axios";
import env from "../lib/env";
import { IconLock } from "@tabler/icons";
import { Center, Card, Text, Space, PasswordInput, Chip, Button } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function Redirect({ slug }: any) {
	const form = useForm({
		initialValues: {
			password: ""
		}
	});

	const handleSubmit = async (values: typeof form["values"]) => {
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
			)?.data ?? null;

		if (!res || res.locked) return form.setFieldError("password", "Incorrect password");
		else window.location.assign(res.url);
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
						>
							Visit URL
						</Button>
					</Center>
				</form>
			</Card>
		</Center>
	);
}

export const getServerSideProps = async (context: { params: { slug: string[] } }) => {
	const slug = context.params.slug;

	let redirect = null;

	if (slug && Array.isArray(slug) && slug.length !== 0 && slug.length < 2) {
		redirect =
			(
				await axios
					.post(env.BASE_URL + "/api/urls/geturl", {
						slug: slug.join("/")
					})
					.catch((err) => {
						if (err?.response?.status === 401) return { data: { locked: true } };
						return null;
					})
			)?.data ?? null;
	}

	if (!redirect) {
		return {
			redirect: {
				destination: "/404"
			}
		};
	}

	if (redirect.locked) {
		return {
			props: {
				slug: slug.join("/")
			}
		};
	}

	return {
		redirect: {
			destination: redirect.url
		}
	};
};
