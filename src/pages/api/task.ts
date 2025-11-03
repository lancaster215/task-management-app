import pool from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import isAllowed from "./custom/limiter";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

    if(!isAllowed(String(ip), 5, 10000)) {
        return res.status(429).json({ message: 'Too many requests. Try again later.' });
    }

    try {
        const result = await pool.query('SELECT * FROM "Task" ORDER BY id DESC');

        res.status(200).json(result.rows)
    } catch(err) {
        console.log(err)
    }
}