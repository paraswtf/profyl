import { Request, Response } from '../../lib/api/typings';

export default async function handler<T extends '/ping'>(
    req: Request<T>,
    res: Response<T>
) {
    res.status(200).json({ success: true, status: 200, message: 'Pong!' });
}
