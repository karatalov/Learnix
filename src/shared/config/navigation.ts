import { CircleQuestionMark, BookOpenCheck, Trophy } from 'lucide-react'
import { INavigation } from '../types/navigation.types'

export const NAV_LINKS: INavigation[] = [
	{ href: '/a', label: 'Вопросы  FS', icon: CircleQuestionMark },
	{ href: '/b', label: 'Учеба  FS', icon: BookOpenCheck },
	{ href: '/c', label: 'Рейтинг  Лучших', icon: Trophy },
]
