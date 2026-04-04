import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { verifyPassword } from './custom/verifyPassword';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export const ACCESS_SECRET = process.env.ACCESS_SECRET || 'tma-access-secret';
export const REFRESH_SECRET = process.env.REFRESH_SECRET || 'tma-refresh-secret';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).end();
    try {
        const { username, password } = req.body;
        const user = await prisma.user.findUnique({ where: { username } });

        if (!user || !verifyPassword(password, user.password)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const accessToken = jwt.sign({ userId: user.id, username: user.username }, ACCESS_SECRET, {
            expiresIn: '15m'
        });

        const refreshToken = jwt.sign({ userId: user.id }, REFRESH_SECRET, {
            expiresIn: '7d'
        });

        res.setHeader('Set-Cookie', serialize('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 7 days
        }));

        res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            accessToken,
            user: {
                username: user.username,
                userId: user.id
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Login failed' });
    }

}