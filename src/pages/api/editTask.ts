import pool from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
        id,
        title,
        description,
        dueDate,
        status,
        priority,
        tags,
        assigneeId, // include from frontend payload
    } = req.body;

    // Treat as UTC midnight (remove 8hrs delay)
    const utcDate = new Date(dueDate);

    await pool.query(
        `UPDATE "Task" 
            SET 
            title = $2,
            description = $3,
            "dueDate" = $4,
            status = $5,
            priority = $6,
            tags = $7,
            "assigneeId" = $8,
            "updatedAt" = NOW()
            WHERE id = $1`,
        [id, title, description, utcDate, status, priority, tags, assigneeId]
    );

    return res.status(200).json({ message: "Successfully updated task" });
  } catch (err) {
    console.error(`Error updating task: ${err}`);
    return res.status(500).json({ error: "Internal server error" });
  }
}
