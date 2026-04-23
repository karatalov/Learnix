import pkg from '@prisma/client'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { PrismaClient } = pkg as any

const globalForPrisma = globalThis as unknown as {
	prisma: InstanceType<typeof PrismaClient> | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
	globalForPrisma.prisma = prisma
}
