import { Twilio } from 'twilio';
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message';

export class TwilioClient {
	private client: Twilio;

	constructor(
		sid: string,
		token: string,
		private fromNumber: string,
	) {
		this.client = new Twilio(sid, token);
	}

	async send(to: string, body: string): Promise<MessageInstance> {
		return this.client.messages.create({
			from: this.fromNumber,
			to,
			body,
		});
	}
}
