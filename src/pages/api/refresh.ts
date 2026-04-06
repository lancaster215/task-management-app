import { parse } from 'cookie';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { ACCESS_SECRET, REFRESH_SECRET } from './login';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).end();

    // 1. Get the refresh token from cookies
    const cookies = parse(req.headers.cookie || '');
    const refreshToken = cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ error: 'No refresh token found' });
    }

    try {
        interface TokenPayloadType {
            userId: number,
            iat?: number,
            exp?: number
        }
        // 2. Verify the refresh token
        const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as TokenPayloadType;

        // 3. Issue a NEW short-lived access token
        const newAccessToken = jwt.sign(
            { userId: decoded.userId },
            ACCESS_SECRET,
            { expiresIn: '15m' }
        );

        res.status(200).json({ accessToken: newAccessToken });
    } catch (err) {
        // Token is expired or tampered with
        res.status(401).json({ error: 'Invalid refresh token' });
    }
}