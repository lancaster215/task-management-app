import type { NextApiRequest, NextApiResponse } from "next";
import isAllowed from "./custom/limiter";
import { prisma } from '@/lib/prisma';
import { parse } from "cookie";
import jwt from 'jsonwebtoken';
import { REFRESH_SECRET } from "./login";
import { applyCors } from "./lib/cors";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    applyCors(res, req);

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

    if (!isAllowed(String(ip), 5, 10000)) {
        return res.status(429).json({ message: 'Too many requests. Try again later.' });
    }

    const { userId } = req.body;

    const cookies = parse(req.headers.cookie || '');
    const refreshToken = cookies.refreshToken || 'undefined';

    if (!userId) {
        return res.status(400).json({ message: 'assigneeId is required' });
    }

    try {
        interface TokenPayloadType {
            userId?: number,
            iat?: number,
            exp?: number
        }
        // 2. Verify the refresh token
        const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as TokenPayloadType;

        if (decoded.userId !== userId) {
            return res.status(403).json({ message: 'Forbidden: You cannot access other users tasks' });
        }

        const tasks = await prisma.task.findMany({
            where: {
                assigneeId: String(decoded.userId),
            },
            orderBy: {
                id: 'desc',
            },
            include: {
                assignee: true
            }
        });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(401).json({ error: 'Invalid refresh token' });
    }
}