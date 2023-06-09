export interface ReceivedMailSettings {
  host: string;
  port: number;
  secure: boolean;
  user: string;
}

export interface MailSettings extends ReceivedMailSettings {
  password: string;
}
