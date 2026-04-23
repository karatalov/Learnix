import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
	try {
		const { email, password, nickname } = await req.json()

		if (!email || !password || !nickname) {
			return NextResponse.json({ error: 'Заполните все поля' }, { status: 400 })
		}

		const existingEmail = await prisma.user.findUnique({
			where: { email },
		})

		if (existingEmail) {
			return NextResponse.json(
				{ error: 'Email уже используется' },
				{ status: 400 },
			)
		}

		const existingNick = await prisma.user.findUnique({
			where: { nickname },
		})

		if (existingNick) {
			return NextResponse.json({ error: 'Никнейм занят' }, { status: 400 })
		}

		const hash = await bcrypt.hash(password, 10)

		await prisma.user.create({
			data: {
				email,
				passwordHash: hash,
				nickname,
			},
		})

		return NextResponse.json({ success: true })
	} catch (error) {
		console.error('REGISTER ERROR:', error)
		return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
	}
}
