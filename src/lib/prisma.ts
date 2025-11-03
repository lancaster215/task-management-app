import { PrismaClient } from "@/generated/prisma"; // adjust path if needed

// Prevent multiple instances of Prisma Client in dev mode (Next.js hot reload issue)
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "error", "warn"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
