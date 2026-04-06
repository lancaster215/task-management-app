import { serialize, parse } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { REFRESH_SECRET } from './login';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    // 1. Get the current refresh token from the cookie
    const cookies = parse(req.headers.cookie || '');
    const refreshToken = cookies.refreshToken;

    // 2. Instantly kill the cookie in the browser by setting maxAge to 0
    res.setHeader('Set-Cookie', serialize('refreshToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 0,
    }));

    // 3. Prisma Integration: Revoke the token in the database
    if (refreshToken) {
        try {
            // Decode the token to find out WHICH user is logging out
            const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as { userId: string };

            // Remove the token from the database so it can't be used again
            await prisma.user.update({
                where: { id: decoded.userId },
                data: { refreshToken: null },
            });
        } catch (err) {
            // If the token is already expired or invalid, we don't care. 
            // The cookie is already destroyed.
            console.log(`Token already invalid or expired: ${err}`);
        }
    }

    return res.status(200).json({ message: 'Successfully logged out' });
}