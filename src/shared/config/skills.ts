import { Category, Skill } from '../../types/skills.types'

export const SKILLS: Skill[] = [
	{
		name: 'HTML',
		level: 100,
		icon: '/html.svg',
		category: 'Frontend',
		desc: 'Семантика, формалар, жеткиликтүүлүк',
	},
	{
		name: 'CSS',
		level: 100,
		icon: '/css.svg',
		category: 'Styling',
		desc: 'Стильдер',
	},
	{
		name: 'JavaScript',
		level: 90,
		icon: '/js.svg',
		category: 'Frontend',
		desc: 'ES6+, DOM, Fetch API',
	},
	{
		name: 'SASS',
		level: 90,
		icon: '/sass.svg',
		category: 'Styling',
		desc: 'Преобразование SASS в CSS',
	},
	{
		name: 'Redux',
		level: 80,
		icon: '/redux.svg',
		category: 'State',
		desc: 'Управление состоянием приложения',
	},
	{
		name: 'Insomnia',
		level: 75,
		icon: '/insomnia.svg',
		category: 'Tools',
		desc: 'Тестирование API запросов',
	},
]

export const CATEGORIES: (Category | 'All')[] = [
	'All',
	'Frontend',
	'Styling',
	'State',
	'Tools',
]
