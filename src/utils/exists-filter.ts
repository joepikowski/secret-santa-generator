export function existsFilter<T>(value: T): value is NonNullable<T> {
	return value !== null && value !== undefined;
}
