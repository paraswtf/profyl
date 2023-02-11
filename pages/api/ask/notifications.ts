import { object, string } from 'yup';
import validate from '../../../lib/requestValidation/validate';
import { generateKey } from '../../../lib/uniqueID';
import { internalError, notAllowed, Request, Response } from '../../../lib/api';
import NextCors from 'nextjs-cors';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma/client';

const postschema = object({
    slug: string().required(),
    message: string().required(),
});

const patchschema = object({
    updateKey: string().required(),
    message: string().required(),
});

const deleteschema = object({
    updateKey: string().required(),
});

export default async function generate(
    req: Request<'/ask/notifications'>,
    res: Response<'/ask/notifications'>
) {
    // Run the cors middleware
    // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    try {
        switch (req.method) {
            case 'GET':
                const session = await getSession({ req });

                //Check if user is logged in if they want to view notifications
                if (!session?.user)
                    return res.status(400).json({
                        success: false,
                        status: 401,
                        name: 'LOGIN_REQUIRED',
                        message: 'You must be logged in to view notifications.',
                    });

                //Query the database for the user's notifications and return them
                return prisma.notification
                    .findMany({
                        where: {
                            user: {
                                email: session.user.email,
                            },
                        },
                    })
                    .then((d) => {
                        if (!d)
                            return res.status(200).json({
                                status: 200,
                                success: true,
                                notifications: [],
                            });
                        else
                            res.status(200).json({
                                status: 200,
                                success: true,
                                notifications: d.map((d) => ({
                                    message: d.message,
                                })),
                            });
                    });
            case 'POST':
                //Handle validation
                const d = validate(
                    req.body as { slug: string; message: string },
                    postschema
                );
                if (d.error)
                    return res.status(400).json({
                        success: false,
                        status: 400,
                        name: 'INVALID_DATA',
                        message: 'Invalid json in request.',
                        fields: d,
                    });

                //Check if the slug exists and get the user's ID
                const userId = await prisma.url
                    .findUnique({
                        where: {
                            slug: d.slug,
                        },
                    })
                    .then((d) => d?.userId);

                //If the slug doesn't exist, return an error
                if (!userId)
                    return res.status(400).json({
                        success: false,
                        status: 400,
                        name: 'INVALID_DATA',
                        message: 'Invalid slug.',
                        fields: {
                            slug: d.slug,
                        },
                    });

                //Post the notification to the database
                const key = generateKey();
                return prisma.notification
                    .create({
                        data: {
                            message: d.message,
                            key,
                            type: 'NOTIFICATION',
                            userId,
                        },
                    })
                    .then(() =>
                        res.status(200).json({
                            status: 200,
                            success: true,
                            updateKey: key,
                        })
                    );
            case 'PATCH':
                //Handle validation
                const data = validate(
                    req.body as {
                        key: string;
                        updateKey: string;
                        message: string;
                    },
                    patchschema
                );
                if (data.error)
                    return res.status(400).json({
                        success: false,
                        status: 400,
                        name: 'INVALID_DATA',
                        message: 'Invalid json in request.',
                        fields: data,
                    });

                return prisma.notification
                    .update({
                        where: {
                            key: data.updateKey,
                        },
                        data: {
                            message: data.message,
                        },
                    })
                    .then((d) => {
                        if (!d)
                            return res.status(400).json({
                                success: false,
                                status: 400,
                                name: 'INVALID_DATA',
                                message: 'The updateKey is invalid.',
                                fields: {
                                    updateKey: data.updateKey,
                                },
                            });
                        res.status(200).json({ status: 200, success: true });
                    });
            case 'DELETE':
                //Handle validation
                const dd = validate(
                    req.body as {
                        updateKey: string;
                    },
                    deleteschema
                );
                if (dd.error)
                    return res.status(400).json({
                        success: false,
                        status: 400,
                        name: 'INVALID_DATA',
                        message: 'Invalid json in request.',
                        fields: dd,
                    });

                return prisma.notification
                    .delete({
                        where: {
                            key: dd.updateKey,
                        },
                    })
                    .then((d) => {
                        if (!d)
                            return res.status(400).json({
                                success: false,
                                status: 400,
                                name: 'INVALID_DATA',
                                message: 'The updateKey is invalid.',
                                fields: {
                                    updateKey: data.updateKey,
                                },
                            });
                        res.status(200).json({ status: 200, success: true });
                    });
            default:
                return notAllowed(req, res);
        }
    } catch (err) {
        internalError(err, res);
    }
}
