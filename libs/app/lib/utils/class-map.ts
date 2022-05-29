export const classMap = (classObject: Record<string, boolean>): string =>
	Object.entries(classObject)
		.reduce((list, [key, value]) => (value ? [...list, key] : list), [])
		.join(' ');
