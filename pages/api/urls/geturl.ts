import { object, string } from 'yup';
import { compare } from '../../../lib/hash';
import validate from '../../../lib/requestValidation/validate';
import { Request, Response, notAllowed, internalError } from '../../../lib/api';
import prisma from '../../../lib/prisma/client';

const schema = object({
    slug: string().required(),
    password: string().min(1).default(undefined),
});

export default async function geturl(
    req: Request<'/urls/geturl'>,
    res: Response<'/urls/geturl'>
) {
    try {
        switch (req.method) {
            case 'POST':
                //Handle validation
                const d = validate(req.body, schema);
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
                            url: url.redirect,
                        });
                    });
            default:
                return notAllowed(req, res);
        }
    } catch (err) {
        return internalError(err, res);
    }
}
