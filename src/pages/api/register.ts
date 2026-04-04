import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@/lib/prisma';
import { hashPassword } from "./custom/hashPassword";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }
    const { username, password, firstName, lastName } = req.body;

    // const userNameExists = await prisma.user.findUnique({
    //     where: {
    //         username: username,
    //     },
    // });

    const existingUserByName = await prisma.user.findUnique({
        where: {
            firstName_lastName: {
                firstName: firstName,
                lastName: lastName,
            },
        },
    });

    if (existingUserByName) {
        res.status(400).json({ error: "First name and Last name already exists" })
    }


    const hashedPassword = hashPassword(password);
    try {
        const user = await prisma.user.create({
            data: { username, password: hashedPassword, firstName, lastName },
        });
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            userId: user.id
        });
    } catch (err) {
        res.status(400).json({ error: "Username already exists" });
    }
}