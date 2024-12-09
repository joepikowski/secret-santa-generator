import { SanitizedParticipant } from '../models/participant.model';

export function generatePins(participants: SanitizedParticipant[]): Record<string, string> {
	const pins = generateNumberOfPins(participants.length);

	return participants.reduce(
		(acc, participant) => {
			acc[pins.pop()!] = participant.id;
			return acc;
		},
		{} as Record<string, string>,
	);
}

function generateNumberOfPins(n: number): string[] {
	const pinsSet = new Set<number>();

	while (pinsSet.size < n) {
		const randomPin = Math.floor(1000 + Math.random() * 9000);
		pinsSet.add(randomPin);
	}

	return [...pinsSet].map(n => n.toString());
}
