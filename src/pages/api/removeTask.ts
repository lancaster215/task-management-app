import pool from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try {
        if(req.method === 'POST') {
            const { selected } = req.body;
            console.log(selected, 'delete id')
            if (!Array.isArray(selected) || selected.length === 0) {
                return res.status(400).json({ error: "Request body must contain a non-empty array of IDs." });
            }

            const placeholders = selected.map((_, index) => `$${index + 1}`).join(", ");
            const query = `DELETE FROM "Task" WHERE id IN (${placeholders})`;
            await pool.query(query, selected)

            return res.status(200).json({ message: 'Successfully removed selected task/s'})    
        }
    } catch (err) {
        console.error(`Error in deleteing task: ${err}`)
    }
}