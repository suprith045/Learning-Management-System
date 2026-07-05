import { PrismaPg } from "@prisma/adapter-pg"
// Added "Prisma" to the import below
import { PrismaClient, Prisma } from '../generated/prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

export const db = globalThis.prisma || prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db

// Re-export Prisma so other files can use it safely!
export { Prisma }