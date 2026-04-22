import { CircleQuestionMark, BookOpenCheck, Trophy } from 'lucide-react'
import { INavigation } from '../types/navigation.types'

export const NAV_LINKS: INavigation[] = [
	{ href: '/a', label: 'Вопросы', icon: CircleQuestionMark },
	{ href: '/b', label: 'Учеба', icon: BookOpenCheck },
	{ href: '/c', label: 'Лучшие', icon: Trophy },
]
