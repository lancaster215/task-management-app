import { PrismaClient } from "@/generated/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, avatar } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        avatar: avatar || null,
      },
    });

    return res.status(200).json({ message: "User created", user: newUser });
  } catch (error) {
    console.error("Database error:", (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  } finally {
    await prisma.$disconnect();
  }
}
