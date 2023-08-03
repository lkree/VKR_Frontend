export interface ReceivedMailSettings {
  user: string;
  port: number;
  host: string;
  secure: boolean;
}

export interface MailSettings extends ReceivedMailSettings {
  password: string;
}
