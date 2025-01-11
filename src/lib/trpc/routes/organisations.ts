import { publicProcedure } from "@/lib/trpc";
import { TRPCError } from "@trpc/server";
import prisma from "@/lib/prisma/client";
import { object, string } from "yup";
import { onlySpecifiedKeys } from "@/lib/utils/apiDataUtils";

const organisations = {
	list: publicProcedure.query(async ({ ctx }) => {
		if (!ctx.session?.user?.id)
			throw new TRPCError({
				code: "UNAUTHORIZED",
				message: "You must be logged in to access this resource."
			});

		const orgs = prisma.organisation.findMany({
			where: {
				ownerId: ctx.session.user.id
			}
		});

		console.log(ctx.session.user.id);
		return orgs;
	}),
	create: publicProcedure
		.input(
			object({
				name: string().required()
			})
				.strict()
				.required()
				.noUnknown()
		)
		.mutation(async ({ ctx, input }) => {
			if (!ctx.session?.user?.id)
				throw new TRPCError({
					message:
						"You must be authenticated to create organisations",
					code: "UNAUTHORIZED"
				});

			// Create organisation
			const org = await prisma.organisation.create({
				data: {
					name: input.name,
					ownerId: ctx.session.user.id
				}
			});

			return onlySpecifiedKeys(org, ["id", "name"]);
		})
};

export default organisations;
