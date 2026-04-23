'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminPage() {
	const { data, status } = useSession()
	const router = useRouter()

	useEffect(() => {
		if (status === 'loading') return

		if (!data || data.user.role !== 'ADMIN') {
			router.push('/login')
		}
	}, [data, status, router])

	if (status === 'loading') {
		return <p>Загрузка...</p>
	}

	if (!data || data.user.role !== 'ADMIN') {
		return null
	}

	return (
		<div style={{ padding: 40 }}>
			<h1>Админ панель 🔐</h1>
			<p>Ты админ 😎</p>
		</div>
	)
}
