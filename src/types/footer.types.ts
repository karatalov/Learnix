import { Status } from '@/shared/config/footer'
import { FormEvent, ReactNode } from 'react'

export interface ISocialLink {
	name: string
	url: string
	icon: ReactNode
	color: string
}

export interface INavLinks {
	href: string
	label: string
}

export interface FormColProps {
	status: Status
	contact: string
	message: string
	company: string
	errors: { contact?: string; message?: string }
	remaining: number
	isBusy: boolean
	onContactChange: (v: string) => void
	onMessageChange: (v: string) => void
	onCompanyChange: (v: string) => void
	onBlur: () => void
	onSubmit: (e: FormEvent) => void
}

export interface FormErrors {
	contact?: string
	message?: string
}
