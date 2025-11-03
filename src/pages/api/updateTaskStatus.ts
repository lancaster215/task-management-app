import pool from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
        const { id, status } = req.body;

        if (!Array.isArray(id) || id.length === 0) {
            return res.status(400).json({ error: "id must be a non-empty array" });
        }

        const placeholders = id.map((_, i) => `$${i + 2}`).join(", ");

        const query = `
            UPDATE "Task"
            SET status = ($1::text)::"TaskStatus", "updatedAt" = NOW()
            WHERE id IN (${placeholders})
        `;

        await pool.query(query, [status, ...id]);

        return res.status(200).json({ message: "Successfully updated tasks" });
    }
  } catch (err) {
    console.error(`Error in updating task: ${err}`);
    res.status(500).json({ error: "Failed to update tasks" });
  }
}
