import { generateSmsNotifyTemplate, generateSmsTestTemplate } from '../templates/sms.templates';

export enum SmsTemplate {
	Notification = 'Notification',
	Test = 'Test',
}

export type SmsTemplateGenerator = (...args: any[]) => string;

export const GeneratorBySmsTemplate: Record<SmsTemplate, SmsTemplateGenerator> = {
	[SmsTemplate.Notification]: generateSmsNotifyTemplate,
	[SmsTemplate.Test]: generateSmsTestTemplate,
};
