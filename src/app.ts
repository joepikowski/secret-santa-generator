import { participantConfiguration } from './config/participant.config';
import { twilioConfig } from './config/twilio.config';
import { sanitizeParticipants } from './utils/sanitize-participants';
import { TwilioClient } from './clients/twilio.client';
import { isParticipantChainValid } from './utils/validate-participant-chain';
import {
	generateFamilyMapFromConfig,
	generatePodsFromFamilyMap,
	getAlignedParticipantsFromPods,
} from './utils/transformers';
import { sendMessageToParticipants } from './utils/send-message';
import { alignPods } from './utils/align-pods';
import { SmsTemplate } from './models/sms-template.model';

const twilioClient = new TwilioClient(
	twilioConfig.sid,
	twilioConfig.token,
	twilioConfig.fromNumber,
);

const familyMap = generateFamilyMapFromConfig(participantConfiguration);

const pods = generatePodsFromFamilyMap(familyMap);

const alignedPods = alignPods(pods);

const alignedParticipants = getAlignedParticipantsFromPods(alignedPods);

const isValid = isParticipantChainValid(alignedParticipants);

console.log(sanitizeParticipants(alignedParticipants));

console.log(isValid);

if (isValid) sendMessageToParticipants(twilioClient, alignedParticipants, SmsTemplate.Notification);
