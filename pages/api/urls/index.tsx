import { object, string } from 'yup';
import hash from '../../../lib/hash';
import validate from '../../../lib/requestValidation/validate';
import { generateSlug, generateKey } from '../../../lib/uniqueID';
import { internalError, notAllowed } from '../../../lib/api';
import { Request, Response } from '../../../lib/api/typings';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma/client';
import { compare } from '../../../lib/hash';

const getSchema = object({
    slug: string().required(),
    password: string().min(1).default(undefined),
});

const postSchema = object({
    target: string().url('invalid url').required(),
    password: string().min(1).default(undefined),
    slug: string()
        .matches(
            /(?!^[\.\_])(?![\.\_]$)(?!.*[\.\_]{2,})^[a-zA-Z0-9\.\_]+$/,
            'invalid slug'
        )
        .default(undefined),
});

export default async function handler<T extends 'GET:/urls' | 'POST:/urls'>(
    req: Request<T>,
    res: Response<T>
) {
    try {
        if (req.method === 'POST') {
            //Handle validation
            const d = validate(req.body, postSchema);
            if (d.error)
                return res.status(400).json({
                    success: false,
                    status: 400,
                    name: 'INVALID_DATA',
                    message: 'Invalid json in request.',
                    fields: d,
                });

            //Hash the password if it exists
            if (d.password) d.password = hash(d.password);

            //Check if user is logged in if they want to use a custom slug
            const session = await getSession({ req });
            if (d.slug && !session?.user)
                return res.status(400).json({
                    success: false,
                    status: 400,
                    name: 'INVALID_DATA',
                    message: 'You must be logged in to use custom slugs.',
                    fields: {
                        slug: 'You must be logged in to use custom slugs.',
                    },
                });

            const slug = d.slug ?? generateSlug();
            const updateKey = generateKey();

            //Check if already exists
            if (await checkIfExisting(slug))
                return res.status(400).json({
                    success: false,
                    status: 400,
                    name: 'INVALID_DATA',
                    message: 'Slug already exists',
                    fields: {
                        slug: 'Slug already exists',
                    },
                });

            //Make sure the database is connected
            return prisma.url
                .create({
                    data: {
                        userId: session?.user?.id,
                        type: 'REDIRECT',
                        slug,
                        password: d.password,
                        target: d.target,
                        updateKey,
                    },
                })
                .then(() =>
                    res.status(200).json({
                        status: 200,
                        success: true,
                        slug,
                        updateKey,
                        target: d.target,
                    })
                );
        } else if (req.method === 'GET') {
            //Handle validation
            const d = validate(req.body, getSchema);
            if (d.error)
                return res.status(400).json({
                    success: false,
                    status: 400,
                    name: 'INVALID_DATA',
                    message: 'Invalid json in request.',
                    fields: d,
                });

            return prisma.url
                .findUnique({
                    where: {
                        slug: d.slug,
                    },
                })
                .then((url) => {
                    if (!url)
                        return res.status(404).json({
                            success: false,
                            status: 404,
                            name: 'NOT_FOUND',
                            message: 'This URL does not exist.',
                        });
                    if (url.password) {
                        if (!d.password)
                            return res.status(401).json({
                                success: false,
                                status: 400,
                                name: 'INVALID_DATA',
                                message: 'No password was provided.',
                                fields: {
                                    password: 'No password was provided.',
                                },
                            });
                        if (!compare(d.password, url.password))
                            return res.status(401).json({
                                success: false,
                                status: 400,
                                name: 'INVALID_DATA',
                                message: 'Incorrect password.',
                                fields: {
                                    password: 'Incorrect password.',
                                },
                            });
                    }
                    return res.status(200).json({
                        status: 200,
                        success: true,
                        target: url.target,
                    });
                });
        } else return notAllowed(req, res);
    } catch (err) {
        internalError(err, res);
    }
}

async function checkIfExisting(slug: string) {
    return !!(await prisma.url.count({
        where: {
            slug,
        },
    }));
}
