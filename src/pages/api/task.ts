import type { NextApiRequest, NextApiResponse } from "next";
import isAllowed from "./custom/limiter";
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

    if (!isAllowed(String(ip), 5, 10000)) {
        return res.status(429).json({ message: 'Too many requests. Try again later.' });
    }

    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'assigneeId is required' });
    }

    try {
        const tasks = await prisma.task.findMany({
            where: {
                assigneeId: userId,
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
        console.log(err)
    }
}