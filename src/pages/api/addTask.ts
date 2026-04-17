import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@/lib/prisma';
import { parse } from "cookie";
import jwt from 'jsonwebtoken';
import { REFRESH_SECRET } from "./login";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { title, description, status, priority, dueDate, tags, assigneeId } = req.body;
    const cookies = parse(req.headers.cookie || '');
    const refreshToken = cookies.refreshToken || 'undefined';

    interface TokenPayloadType {
      userId?: number,
      iat?: number,
      exp?: number
    }

    const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as TokenPayloadType;

    if (decoded.userId !== assigneeId) {
      return res.status(403).json({ message: 'Forbidden: You cannot access other users tasks' });
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
        createdAt: new Date(),
        updatedAt: new Date(),
        tags,
        assigneeId,
      },
      include: {
        assignee: true,
      },
    });

    return res.status(200).json(newTask);
  } catch (error) {
    console.error("Database error:", (error as Error).message);
    return res.status(500).json({ error: (error as Error).message });
  }
}
