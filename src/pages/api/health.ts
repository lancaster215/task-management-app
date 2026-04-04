/**
 * @description: To check if prisma is working and connected
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // This just pings the DB to see if the client is alive
        await prisma.$connect();
        const userCount = await prisma.user.count();
        return res.status(200).json({ status: 'connected', userCount });
    } catch (error: any) {
        return res.status(500).json({
            error: 'Prisma Connection Failed',
            message: error.message,
            code: error.code
        });
    }
}