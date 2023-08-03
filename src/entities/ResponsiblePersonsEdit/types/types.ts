export interface ResponsiblePerson {
  cityName: string;
  notifyEmail: string;
  accountEmail: string;
}

export interface ResponsiblePersonWithPassword extends ResponsiblePerson {
  password?: string;
}

export type ResponsiblePersonArray = Array<ResponsiblePerson>;
