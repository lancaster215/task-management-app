// /pages/api/addTask.ts
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma"; // adjust path if needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { title, description, status, priority, dueDate, tags, assigneeId } = req.body;

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
