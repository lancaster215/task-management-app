import { NextApiRequest, NextApiResponse } from "next";

export function applyCors(res: NextApiResponse, req: NextApiRequest) {
    const origin = req.headers.origin || "";
    if (
        origin.includes("vercel.app") ||
        origin.includes("localhost")
    ) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }

    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", "true");
}