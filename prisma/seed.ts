import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({
	adapter,
})

async function main() {
	const hash = await bcrypt.hash('123456', 10)

	await prisma.user.create({
		data: {
			email: 'admin@mail.com',
			passwordHash: hash,
			nickname: 'admin',
			role: 'ADMIN',
		},
	})

	console.log('✅ user created')
}

main()
