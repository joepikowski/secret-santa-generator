import { Pod } from '../pod/pod';

export function alignPods(pods: Pod[]): Pod[] {
	const reversed = [...pods].reverse();

	for (const [i, pod] of reversed.entries()) {
		let nextPod = reversed[i + 1];

		if (!nextPod) {
			const startOfReversed = reversed.at(0);
			if (startOfReversed) nextPod = startOfReversed;
		}

		if (!nextPod) throw new Error('Could not find the next pod.');

		const lastFamilyId = pod.allFamilies.at(-1) ?? null;

		pod.lastFamilyId = lastFamilyId;

		const options = nextPod.availableFamiliesNotFrom(lastFamilyId);

		if (options.length === 0)
			throw new Error('Could not create pod connection with remaining options.');

		nextPod.firstFamilyId = options.at(0) ?? null;
	}

	return reversed;
}
