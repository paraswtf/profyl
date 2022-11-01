import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { URL } from "../lib/models/URL";
import connect from "../lib/mongoose";

const Redirect: NextPage = () => {
	const router = useRouter();
	const { slug } = router.query;

	if (!slug || !Array.isArray(slug) || slug.length === 0 || slug.length > 2)
		return (
			<div>
				<h1>Invalid URL</h1>
			</div>
		);
	else
		return (
			<div>
				<h1>Redirecting...</h1>
				<p>Redirecting to {slug.join("/")}...</p>
			</div>
		);
};

export const getServerSideProps = async (context: { params: { slug: string[] } }) => {
	const slug = context.params.slug;

	let redirect = null;

	if (slug && Array.isArray(slug) && slug.length !== 0 && slug.length < 2) {
		await connect();
		const res = await URL.findOne({ slug: slug.join("/") }).catch(() => null);
		if (res) redirect = res.url;
	}

	if (!redirect) {
		return {
			redirect: {
				destination: "/404"
			}
		};
	}

	// if (redirectTo.locked) {
	// 	return {
	// 		props: {
	// 			password: redirectTo.password,
	// 			url: redirectTo.redirectTo
	// 		}
	// 	};
	// }

	return {
		redirect: {
			destination: redirect
		}
	};
};

export default Redirect;
