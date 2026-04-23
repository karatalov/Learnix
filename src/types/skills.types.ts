export type Category = 'Frontend' | 'Styling' | 'State' | 'Tools'

export interface Skill {
	name: string
	level: number
	icon: string
	category: Category
	desc: string
}
