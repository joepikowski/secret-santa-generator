import { FamilyMap } from '../models/family.model';
import { Participant, ParticipantConfiguration } from '../models/participant.model';
import { Pod } from '../pod/pod';
import { fisherYates } from './fisher-yates';

export function generateFamilyMapFromConfig(config: ParticipantConfiguration): FamilyMap {
	return config.reduce((acc, familyGroup, i) => {
		const familyId = `family-${i}`;
		acc[familyId] = familyGroup.map(
			c =>
				new Participant(
					c.id,
					familyId,
					c.name,
					c.displayName,
					c.gender,
					c.phone,
				),
		);
		return acc;
	}, {} as FamilyMap);
}

export function generatePodsFromFamilyMap(familyMap: FamilyMap): Pod[] {
	const shuffledFamilyMap: FamilyMap = {};

	let largestFamilySize = 0;

	for (const [familyId, participants] of Object.entries(familyMap)) {
		if (participants.length > largestFamilySize)
			largestFamilySize = participants.length;
		shuffledFamilyMap[familyId] = fisherYates(participants);
	}

	const pods: Pod[] = [];

	let totalRemainingParticipants = getTotalRemainingParticipants(shuffledFamilyMap);

	if (largestFamilySize > Math.floor(totalRemainingParticipants / 2)) {
		throw new Error(
			`Cannot generate a valid configuration with a single family size of ${largestFamilySize} and a total pool of ${totalRemainingParticipants} participants!`,
		);
	}

	while (totalRemainingParticipants > 0) {
		const forPod = Object.values(shuffledFamilyMap).reduce((acc, participants) => {
			const participant = participants.pop();
			if (participant) acc.push(participant);
			return acc;
		}, [] as Participant[]);

		pods.push(new Pod(forPod));

		totalRemainingParticipants = getTotalRemainingParticipants(shuffledFamilyMap);
	}

	return pods;
}

function getTotalRemainingParticipants(map: FamilyMap) {
	return Object.keys(map).reduce((acc, familyId) => {
		return (acc += map[familyId]?.length ?? 0);
	}, 0);
}

export function getAlignedParticipantsFromPods(pods: Pod[]): Participant[] {
	const alignedParticipants = pods.reduce((acc, m) => {
		acc.push(...m.orderedParticipants);
		return acc;
	}, [] as Participant[]);

	const participantCount = alignedParticipants.length;

	for (const [i, participant] of alignedParticipants.entries()) {
		const giveToId = (i + 1) % participantCount;
		const giveToParticipant = alignedParticipants[giveToId];

		if (giveToParticipant) {
			participant.givingTo = giveToParticipant;
			giveToParticipant.recipientOf = participant;
		}
	}

	return alignedParticipants;
}
