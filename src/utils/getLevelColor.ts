export const getLevelColor = (level: number) => {
	if (level >= 85) return '#10b981'
	if (level >= 75) return '#3b82f6'
	if (level >= 60) return '#f59e0b'
	return '#ef4444'
}
