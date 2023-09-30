export class Participant {
	givingTo: Participant | null = null;
	recipientOf: Participant | null = null;

	constructor(
		public id: string,
		public familyId: string,
		public name: string,
		public displayName: string,
		public gender: Gender,
		public phone: string,
	) {}
}

export enum Gender {
	Male = 'male',
	Female = 'female',
}

type ParticipantConfigurationNode = {
	id: string;
	name: string;
	displayName: string;
	phone: string;
	gender: Gender;
};

export type SanitizedParticipant = Omit<Participant, 'givingTo' | 'recipientOf'> & {
	givingTo: string | null;
	recipientOf: string | null;
};

export type ParticipantConfiguration = ParticipantConfigurationNode[][];

export type SingleParticipantByFamilyMap = { [familyId: string]: Participant };
