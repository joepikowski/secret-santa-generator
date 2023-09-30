import { Participant } from '../models/participant.model';

export function isParticipantChainValid(participants: Participant[]): boolean {
	for (const [i, participant] of participants.entries()) {
		let next = participants[i + 1];
		const startOfParticipants = participants.at(0);

		if (!startOfParticipants) return false;

		if (!next) next = startOfParticipants;

		if (participant.familyId === next.familyId) return false;
	}

	return true;
}
