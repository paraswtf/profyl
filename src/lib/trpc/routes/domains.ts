import { publicProcedure } from "@/lib/trpc";
import { TRPCError } from "@trpc/server";
import prisma from "@/lib/prisma/client";
import { object, string } from "yup";
import { onlySpecifiedKeys } from "@/lib/utils/apiDataUtils";
import { objectId } from "@/lib/yup";

async function isDomainTaken(domain: string) {
	return !!(await prisma.domain.count({
		where: {
			id: domain
		}
	}));
}

const domains = {
	list: publicProcedure
		.input(
			object({
				organisationId: objectId().required()
			})
				.strict()
				.required()
				.noUnknown()
		)
		.query(async ({ ctx, input }) => {
			//console.log("input", input);
			if (!ctx.session?.user?.id)
				throw new TRPCError({
					code: "UNAUTHORIZED",
					message: "You must be logged in to access this resource."
				});

			const organisation = await prisma.organisation.findUnique({
				where: {
					id: input.organisationId
				},
				include: {
					domains: true
				}
			});

			// Fetch requested organisation
			if (!organisation)
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Organisation not found"
				});

			// Check if user has permission to access organisation
			if (organisation.ownerId !== ctx.session.user.id)
				throw new TRPCError({
					code: "FORBIDDEN",
					message:
						"You do not have permission to access this resource"
				});

			// Return domains
			return organisation.domains;
		}),
	create: publicProcedure
		.input(
			object({
				organisationId: string().required(),
				name: string().required()
			})
				.strict()
				.required()
				.noUnknown()
		)
		.mutation(async ({ ctx, input }) => {
			// Check if user is authenticated
			if (!ctx.session?.user?.id)
				throw new TRPCError({
					message:
						"You must be authenticated to create organisations",
					code: "UNAUTHORIZED"
				});

			// Fetch organisation
			const organisation = await prisma.organisation.findFirst({
				where: {
					id: input.organisationId
				}
			});

			// Check if organisation exists
			if (!organisation)
				throw new TRPCError({
					message: "Organisation not found",
					code: "NOT_FOUND"
				});

			// Check if user has permission to access organisation
			if (organisation.ownerId !== ctx.session.user.id)
				throw new TRPCError({
					message:
						"You do not have permission to modify this organisation",
					code: "FORBIDDEN"
				});

			// Check if domain is free
			if (await isDomainTaken(input.name))
				throw new TRPCError({
					message: "The domain is being used by another organisation",
					code: "CONFLICT"
				});

			// Create domain
			const domain = await prisma.domain.create({
				data: {
					id: input.name,
					organisation: {
						connect: {
							id: input.organisationId
						}
					}
				}
			});

			return onlySpecifiedKeys(domain, ["id", "organisationId"]);
		})
};

export default domains;
