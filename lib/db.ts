import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from '../generated/prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

export const db = globalThis.prisma || prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db
