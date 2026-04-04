/**
 * @deprecated
 */

import type { NextApiRequest, NextApiResponse } from "next";
import pool from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await pool.query('SELECT * FROM "User" ORDER BY id DESC');

    res.status(200).json(result.rows)
  } catch (err) {
    console.log(err)
  }
}

