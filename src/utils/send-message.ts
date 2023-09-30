import { TwilioClient } from '../clients/twilio.client';
import { Participant } from '../models/participant.model';
import { GeneratorBySmsTemplate, SmsTemplate } from '../models/sms-template.model';
import { generateSmsNotifyTemplate } from '../templates/sms.templates';

export function sendMessageToParticipants(
	twilioClient: TwilioClient,
	participants: Participant[],
	messageType: SmsTemplate,
): void {
	for (const p of participants) {
		if (!p.givingTo) continue;
		const generator = GeneratorBySmsTemplate[messageType];
		const message = generator(p.displayName, p.givingTo.name, p.givingTo.gender);
		twilioClient.send(p.phone, message);
	}
}
