import prisma from "@/lib/prisma/client";

export async function userHasAccessToDomain(domainId: string, userId: string) {
	const domain = await prisma.domain.findUnique({
		where: {
			id: domainId
		},
		include: {
			organisation: true
		}
	});

	if (!domain) return null;

	if (!domain.organisation) return null;

	if (domain.organisation.ownerId !== userId) return null;

	return domain;
}

export async function userHasAccessToOrganisation(
	organisationId: string,
	userId: string
) {
	const organisation = await prisma.organisation.findFirst({
		where: {
			id: organisationId
		}
	});

	if (!organisation) return null;

	if (organisation.ownerId !== userId) return null;

	return organisation;
}
