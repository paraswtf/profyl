import { publicProcedure } from "@/lib/trpc";
import hash, { compare } from "@/lib/utils/hash";
import { TRPCError } from "@trpc/server";
import { array, boolean, object, string } from "yup";
import prisma from "@/lib/prisma/client";
import { generateSlug, generateKey } from "@/lib/utils/redirectUtils";
import { onlySpecifiedKeys } from "@/lib/utils/apiDataUtils";
import { userHasAccessToDomain } from "@/lib/utils/accessUtils";

//Function to check if a slug already exists
async function slugExists(slug: string, domain?: string) {
	const redirect = await prisma.redirect.findFirst({
		where: {
			slug,
			domainId: domain
		}
	});

	return redirect !== null;
}

const redirects = {
	checkSlugAvailablity: publicProcedure
		.input(
			object({
				domain: string().optional(),
				slug: string().required()
			})
				.strict()
				.required(
					"the 'input' parameter is missing in the checkExists query"
				)
				.noUnknown()
		)
		.output(
			object({ isAvailable: boolean().required() })
				.required()
				.strict()
				.noUnknown()
		)
		.query(async ({ input }) => ({
			isAvailable: !(await slugExists(input.slug, input.domain))
		})),
	create: publicProcedure
		.input(
			object({
				domain: string().optional(),
				target: string().url().required(),
				slug: string().optional(),
				password: string().optional()
			})
				.strict()
				.required("the request body is empty")
				.noUnknown()
		)
		.output(
			object({
				id: string().required(),
				type: string().required(),
				slug: string().required(),
				updateKey: string().nullable(),
				target: string().required(),
				domainId: string().nullable(),
				creatorId: string().nullable()
			})
				.required()
				.strict()
				.noUnknown()
		)
		.mutation(async ({ input, ctx }) => {
			//Custom slugs and domains only allowed for authenticated users
			if (!ctx.session?.user?.id && (input.slug || input.domain))
				throw new TRPCError({
					message:
						"You must be authenticated to use custom slugs or domains",
					code: "UNAUTHORIZED"
				});

			//If domain is provided, we need to check if the user has access to the domain
			if (
				input.domain &&
				!(await userHasAccessToDomain(
					input.domain,
					ctx.session!.user!.id!
				))
			)
				throw new TRPCError({
					message: "You do not have access to the domain",
					code: "FORBIDDEN"
				});

			if (input.slug && (await slugExists(input.slug, input.domain))) {
				//Check if the slug is already taken
				throw new TRPCError({
					message: "The slug is already taken",
					code: "BAD_REQUEST"
				});
			}

			//Hash the passowrd if it is provided
			if (input.password) input.password = hash(input.password);

			const generatedUrl = await prisma.redirect.create({
				data: {
					type: "REDIRECT",
					slug: input.slug ?? generateSlug(),
					target: input.target,
					password: input.password,
					updateKey: ctx.session ? undefined : generateKey(),
					creator: ctx.session?.user?.id
						? { connect: { id: ctx.session.user.id } }
						: undefined,
					domain: { connect: { id: input.domain ?? "profyl.in" } }
				}
			});

			return onlySpecifiedKeys(generatedUrl, [
				"id",
				"type",
				"slug",
				"updateKey",
				"target",
				"domainId",
				"creatorId"
			]);
		}),
	get: publicProcedure
		.input(
			object({
				domain: string().optional(),
				slug: string().required(),
				password: string().optional()
			})
				.strict()
				.required("the 'input' parameter is missing in the get query")
				.noUnknown()
		)
		.output(
			object({
				id: string().required(),
				target: string().required(),
				slug: string().required(),
				type: string().required(),
				domainId: string().nullable()
			})
				.required()
				.strict()
				.noUnknown()
		)
		.query(async ({ input, ctx }) => {
			//We can get the target URL by the slug
			//To get the target URL we the password
			//With the password, we will redirect the user to the target URL
			//If user is authenticated, we directly redirect the user to the target URL in case he is the owner

			const redirect = await prisma.redirect.findUnique({
				where: {
					uniqueId: {
						slug: input.slug,
						domainId: input.domain ?? "profyl.in"
					}
				}
			});

			//If the redirect does not exist, we return a 404
			if (!redirect) {
				throw new TRPCError({
					message: "The redirect does not exist",
					code: "NOT_FOUND"
				});
			}

			//If it is password protected
			if (redirect.password) {
				//If no password is provided, we return a 401 with a password required message
				if (!input.password)
					throw new TRPCError({
						message:
							"The password is required to access the redirect",
						code: "FORBIDDEN"
					});

				//If the password is incorrect, we return a 401 with a password incorrect message
				if (!compare(input.password, redirect.password))
					throw new TRPCError({
						message: "The password is incorrect",
						code: "FORBIDDEN"
					});
			}

			return onlySpecifiedKeys(redirect, [
				"id",
				"target",
				"slug",
				"type",
				"domainId"
			]);
		}),
	list: publicProcedure
		.input(
			object({
				domain: string().optional()
			})
				.strict()
				.noUnknown()
		)
		.output(
			array(
				object({
					id: string().required(),
					target: string().required(),
					slug: string().required(),
					type: string().required()
				}).noUnknown()
			)
				.required()
				.strict()
		)
		.query(async ({ input, ctx }) => {
			if (!ctx.session?.user?.id)
				throw new TRPCError({
					message: "The user is not logged in",
					code: "UNAUTHORIZED"
				});
			//We list all the urls generated by the user or under a domain

			const redirect = await prisma.redirect.findMany({
				where: input.domain
					? { domainId: input.domain }
					: {
							creatorId: ctx.session?.user?.id
						}
			});

			return redirect.map((r) =>
				onlySpecifiedKeys(r, [
					"id",
					"target",
					"slug",
					"type",
					"domainId"
				])
			);
		})
};

export default redirects;
