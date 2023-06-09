import type { MailSettings } from '../types';

type ResponseSuccessMailSettings = Omit<MailSettings, 'password'>;

export type GetMailSettingsSuccessResponse = ResponseSuccessMailSettings;

export type WriteMailSettingsRequest = Partial<MailSettings>;
export type SetMailSettingsSuccessResponse = ResponseSuccessMailSettings;
