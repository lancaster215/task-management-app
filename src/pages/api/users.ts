import type { NextApiRequest, NextApiResponse } from "next";
import pool from "@/lib/db";

// GET /api/getAssignee?id=<user-id>
// or GET /api/getAssignee?name=<user-name>
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   try {
      const result = await pool.query('SELECT * FROM "User" ORDER BY id DESC');

      res.status(200).json(result.rows)
    } catch(err) {
      console.log(err)
    }
}

// import type { NextApiRequest, NextApiResponse } from "next";
// import { prisma } from "@/lib/prisma";

// // GET /api/getAssignee?id=<user-id>
// // or GET /api/getAssignee?name=<user-name>
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     if (req.method === "GET") {
//       // const { id, name } = req.query;

//       // if (!id && !name) {
//       //   return res.status(400).json({ error: "Please provide either id or name" });
//       // }

//       const assignee = await prisma.user.findFirst({
//         // where: {
//         //   OR: [
//         //     id ? { id: String(id) } : undefined,
//         //     name ? { name: String(name) } : undefined,
//         //   ].filter(Boolean) as any,
//         // },
//         include: {
//           tasks: {
//             include: {
//               assignee: true,
//             },
//           },
//         },
//       });

//       if (!assignee) {
//         return res.status(404).json({ error: "Assignee not found" });
//       }

//       return res.status(200).json(assignee);
//     }

//     res.status(405).json({ error: "Method not allowed" });
//   } catch (err: any) {
//     console.error("Error fetching assignee:", err.message);
//     res.status(500).json({ error: err.message });
//   }
// }

