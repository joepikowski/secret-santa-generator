import { Participant, SingleParticipantByFamilyMap } from '../models/participant.model';
import { existsFilter } from '../utils/exists-filter';
import { fisherYates } from '../utils/fisher-yates';

export class Pod {
	private map: SingleParticipantByFamilyMap;
	public allFamilies: string[] = [];
	public firstFamilyId: string | null = null;
	public lastFamilyId: string | null = null;

	constructor(public participants: Participant[]) {
		this.map = participants.reduce((acc, p) => {
			if (acc[p.familyId] !== undefined)
				throw new Error('Participants must have unique families.');
			acc[p.familyId] = p;
			return acc;
		}, {} as SingleParticipantByFamilyMap);

		this.allFamilies = fisherYates(Object.keys(this.map));
	}

	get availableFamilies(): string[] {
		return this.allFamilies.filter(
			f => f !== this.firstFamilyId && f !== this.lastFamilyId,
		);
	}

	availableFamiliesNotFrom(familyIdToFilter: string | null): string[] {
		if (!familyIdToFilter) return [];

		return this.availableFamilies.filter(f => f !== familyIdToFilter);
	}

	get orderedParticipants(): Participant[] {
		const ordered: Participant[] = [];

		if (this.firstFamilyId) {
			const firstFamily = this.map[this.firstFamilyId];
			if (firstFamily) ordered.push(firstFamily);
		}

		ordered.push(
			...this.availableFamilies.map(id => this.map[id]).filter(existsFilter),
		);

		if (this.lastFamilyId) {
			const lastFamily = this.map[this.lastFamilyId];
			if (lastFamily) ordered.push(lastFamily);
		}

		return ordered;
	}
}
