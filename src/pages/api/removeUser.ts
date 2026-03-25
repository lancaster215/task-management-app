import pool from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
            const { selected } = req.body;
            console.log(selected, 'selected')
            if (!selected) {
                return res.status(400).json({ error: "ID is required." });
            }

            // const taskExists = await prisma.task.findFirst({
            //     where: { assigneeId: selected }
            // });

            await prisma.$transaction([
                prisma.task.deleteMany({
                    where: { assigneeId: selected }
                }),
                prisma.user.delete({
                    where: { id: selected }
                })
            ]);
            // const query = `DELETE FROM "User" WHERE id IN (SELECT assigneeId FROM "Task" WHERE assigneeId = $1)`;
            // await pool.query(query, [selected])

            return res.status(200).json({ message: 'Successfully removed user' })
        }
    } catch (err) {
        console.error(`Error in deleteing user: ${err}`)
        return res.status(500).json({ error: 'Internal server error' })
    }
}