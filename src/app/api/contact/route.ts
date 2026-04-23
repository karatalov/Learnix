import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		const { contact, message } = await req.json()

		if (!contact || !message) {
			return NextResponse.json({ error: 'Нет данных' }, { status: 400 })
		}

		const text = `
📩 Новое сообщение с сайта:

👤 Контакт: ${contact}
💬 Сообщение: ${message}
		`

		const res = await fetch(
			`https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}/sendMessage`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					chat_id: process.env.TG_CHAT_ID,
					text,
				}),
			},
		)

		if (!res.ok) throw new Error('Telegram error')

		return NextResponse.json({ success: true })
	} catch (e) {
		console.error(e)
		return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
	}
}
