// @ts-nocheck

export function fisherYates<T>(arr: T[]): T[] {
	let a = [...arr],
		m = a.length,
		i;
	while (m) {
		i = ~~(Math.random() * m--);
		[a[m], a[i]] = [a[i], a[m]];
	}
	return a;
}
