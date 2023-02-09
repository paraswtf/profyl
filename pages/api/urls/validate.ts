import { object, string } from 'yup'
import validate from '../../../lib/requestValidation/validate'
import { Request, Response, notAllowed, internalError } from '../../../lib/api'
import prisma from '../../../lib/prisma/client'
import { getSession } from 'next-auth/react'

const schema = object({
    slug: string()
        .required()
        .matches(/(?!^[\.\_])(?![\.\_]$)(?!.*[\.\_]{2,})^[a-zA-Z0-9\.\_]+$/),
})

export default async function validateURL(
    req: Request<'/urls/validate'>,
    res: Response<'/urls/validate'>
) {
    try {
        switch (req.method) {
            case 'POST':
                //Handle validation
                const d = validate(req.body, schema)
                if (d.error)
                    return res.status(400).json({
                        success: false,
                        status: 400,
                        name: 'INVALID_DATA',
                        message: 'Invalid json in request.',
                        fields: d,
                    })

                //Check if user is logged in if they want to use a custom slug
                const session = await getSession({ req })
                if (d.slug && !session?.user)
                    return res.status(400).json({
                        success: false,
                        status: 400,
                        name: 'INVALID_DATA',
                        message: 'You must be logged in to use custom slugs.',
                        fields: {
                            slug: 'You must be logged in to use custom slugs.',
                        },
                    })

                //Check if already exists
                if (await checkIfExisting(d.slug))
                    return res.status(400).json({
                        success: false,
                        status: 400,
                        name: 'INVALID_DATA',
                        message: 'This slug is already in use.',
                        fields: {
                            slug: 'This slug is already in use.',
                        },
                    })

                //Return success (slug is valid)
                return res.status(200).json({ status: 200, success: true })
            default:
                return notAllowed(req, res)
        }
    } catch (err) {
        return internalError(err, res)
    }
}

export async function checkIfExisting(slug: string) {
    return !!(await prisma.url.count({
        where: {
            slug,
        },
    }))
}
