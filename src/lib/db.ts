import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { createClient, type Client } from '@libsql/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  const dbUrl = process.env.DATABASE_URL || ''

  // If using libsql:// URL (Turso cloud), use the libSQL adapter
  if (dbUrl.startsWith('libsql://')) {
    const authToken = process.env.DATABASE_AUTH_TOKEN
    const libsql: Client = authToken
      ? createClient({ url: dbUrl, authToken })
      : createClient({ url: dbUrl })
    const adapter = new PrismaLibSql(libsql)
    return new PrismaClient({ adapter } as any)
  }

  // Local SQLite (file:) - standard Prisma client
  return new PrismaClient()
}

export const db =
  globalForPrisma.prisma ??
  createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
