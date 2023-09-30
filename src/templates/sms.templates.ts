import { Gender } from '../models/participant.model';
import { SmsTemplateGenerator } from '../models/sms-template.model';

export const generateSmsNotifyTemplate: SmsTemplateGenerator = (
	participantName: string,
	givingToName: string,
	gender: Gender,
): string => {
	return `🎅 Hello ${participantName}!

It's me, Santa Claus. 🎄

My elves have run their algorithm (and checked it twice), and this year you'll be giving a gift to:

🎁 ${givingToName} 🎁

${gender === Gender.Male ? 'He' : 'She'}'s been a very good ${
		gender === Gender.Male ? 'boy' : 'girl'
	}, so please be generous!

Love,
S
`;
};

export const generateSmsTestTemplate: SmsTemplateGenerator = (participantName: string) =>
	`🎅 Ho, ho, ho. Hello ${participantName}!`;
