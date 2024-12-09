import { participantConfiguration } from './config/participant.config';
import { sanitizeParticipants } from './utils/sanitize-participants';
import { isParticipantChainValid } from './utils/validate-participant-chain';
import {
	generateFamilyMapFromConfig,
	generatePodsFromFamilyMap,
	getAlignedParticipantsFromPods,
} from './utils/transformers';
import { alignPods } from './utils/align-pods';
import * as fs from 'fs';
import { generatePins } from './utils/generate-pins';

(async function () {
	const familyMap = generateFamilyMapFromConfig(participantConfiguration);

	const pods = generatePodsFromFamilyMap(familyMap);

	const alignedPods = alignPods(pods);

	const alignedParticipants = getAlignedParticipantsFromPods(alignedPods);

	const isValid = isParticipantChainValid(alignedParticipants);

	if (!isValid) throw new Error('Generated configuration was invalid.');

	const result = sanitizeParticipants(alignedParticipants);

	fs.writeFile('output/results.json', JSON.stringify(result), () => {});

	const pins = generatePins(result);

	fs.writeFile('output/pins.json', JSON.stringify(pins), () => {});
})();
