import pool from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import jwt from 'jsonwebtoken';
import { REFRESH_SECRET } from "./login";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
            const { selected, assigneeId } = req.body;

            if (!Array.isArray(selected) || selected.length === 0) {
                return res.status(400).json({ error: "Request body must contain a non-empty array of IDs." });
            }

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

            const placeholders = selected.map((_, index) => `$${index + 1}`).join(", ");
            const query = `DELETE FROM "Task" WHERE id IN (${placeholders})`;
            await pool.query(query, selected)

            return res.status(200).json({ message: 'Successfully removed selected task/s' })
        }
    } catch (err) {
        console.error(`Error in deleteing task: ${err}`)
    }
}