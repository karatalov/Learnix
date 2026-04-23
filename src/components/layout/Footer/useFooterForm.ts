import { useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import {
	COOLDOWN_MS,
	DRAFT_KEY,
	MAX_MESSAGE,
	MIN_MESSAGE,
	type Status,
} from '@/shared/config/footer'
import { FormErrors } from '@/types/footer.types'

export function useFooterForm() {
	const [status, setStatus] = useState<Status>('idle')
	const [company, setCompany] = useState('')
	const [errors, setErrors] = useState<FormErrors>({})
	const lastSentAtRef = useRef<number>(0)

	const [contact, setContact] = useState(() => {
		if (typeof window === 'undefined') return ''
		try {
			const raw = localStorage.getItem(DRAFT_KEY)
			return raw ? (JSON.parse(raw).contact ?? '') : ''
		} catch {
			return ''
		}
	})

	const [message, setMessage] = useState(() => {
		if (typeof window === 'undefined') return ''
		try {
			const raw = localStorage.getItem(DRAFT_KEY)
			return raw ? (JSON.parse(raw).message ?? '') : ''
		} catch {
			return ''
		}
	})

	useEffect(() => {
		const tmr = window.setTimeout(() => {
			try {
				localStorage.setItem(DRAFT_KEY, JSON.stringify({ contact, message }))
			} catch {}
		}, 250)
		return () => window.clearTimeout(tmr)
	}, [contact, message])

	const remaining = useMemo(
		() => MAX_MESSAGE - message.length,
		[message.length],
	)

	const validate = (): boolean => {
		const next: FormErrors = {}
		const c = contact.trim()
		const m = message.trim()

		if (!c) next.contact = 'Укажите контакт'
		else if (c.length > 80) next.contact = 'Слишком длинный контакт'

		if (!m) next.message = 'Введите сообщение'
		else if (m.length < MIN_MESSAGE)
			next.message = `Минимум ${MIN_MESSAGE} символов`
		else if (m.length > MAX_MESSAGE)
			next.message = `Максимум ${MAX_MESSAGE} символов`

		setErrors(next)
		return Object.keys(next).length === 0
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		if (company.trim().length > 0) return

		if (!validate()) return

		const now = Date.now()
		if (now - lastSentAtRef.current < COOLDOWN_MS) {
			setErrors((p) => ({
				...p,
				message: 'Подождите перед повторной отправкой',
			}))
			return
		}

		setStatus('loading')

		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					contact,
					message,
				}),
			})

			if (!res.ok) throw new Error('Ошибка отправки')

			lastSentAtRef.current = Date.now()
			setStatus('success')
			setContact('')
			setMessage('')
			setErrors({})
			localStorage.removeItem(DRAFT_KEY)

			window.setTimeout(() => setStatus('idle'), 4000)
		} catch (err) {
			console.error('[Footer form]', err)
			setStatus('error')
		}
	}

	return {
		status,
		contact,
		message,
		company,
		errors,
		remaining,
		isBusy: status === 'loading' || status === 'success',
		setContact,
		setMessage,
		setCompany,
		validate,
		handleSubmit,
	}
}
