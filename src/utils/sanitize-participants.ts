import { Participant, SanitizedParticipant } from '../models/participant.model';

export function sanitizeParticipants(participants: Participant[]): SanitizedParticipant[] {
	return participants.map(p => {
		return {
			...p,
			givingTo: p.givingTo?.id ?? null,
			recipientOf: p.recipientOf?.id ?? null,
		};
	});
}
