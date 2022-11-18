import axios from "axios";
import { Card, Container, Text, Input, Spacer, Button } from "@nextui-org/react";
import env from "../lib/env";
import { useState } from "react";

export default function Redirect({ slug }: any) {
	let password = "";
	const [error, setError] = useState(false);

	async function handleClick(event?: any) {
		event?.preventDefault();

		const res =
			(
				await axios.post(env.BASE_URL + "/api/urls/geturl", { slug, password }).catch((err) => {
					if (err?.response?.status === 401) return { data: { locked: true } };
					return null;
				})
			)?.data ?? null;

		if (!res || res.locked) return setError(true);
		else window.location.replace(res.url);
	}

	return (
		<div>
			<Container
				display="flex"
				alignItems="center"
				justify="center"
				css={{ minHeight: "100vh" }}
			>
				<Card css={{ mw: "420px", p: "20px" }}>
					<Text
						size={24}
						weight="bold"
						css={{
							as: "center",
							mb: "20px"
						}}
					>
						Protected URL
					</Text>
					<Input
						labelLeft="https://s.styxo.codes/"
						value={slug}
						readOnly
					/>
					<Spacer y={1} />
					<Input.Password
						placeholder="Password"
						onChange={(e) => {
							setError(false);
							password = e.currentTarget.value;
						}}
						helperColor="error"
						helperText={error ? "Incorrect password" : ""}
						status={error ? "error" : "default"}
					/>
					<Spacer y={1.6} />
					<Button onClickCapture={handleClick}>Visit Link</Button>
				</Card>
			</Container>
		</div>
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
