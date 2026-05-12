import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString || connectionString.includes("placeholder")) {
    // Return a dummy client that will fail on queries
    // The page.tsx fallback will catch this
    const adapter = new PrismaPg({ connectionString: "postgresql://x:x@localhost:5432/x" });
    return new PrismaClient({ adapter }) as PrismaClient;
  }
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter }) as PrismaClient;
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
