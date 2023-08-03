export type CitiesPrefixes = Array<[string, string]>;

export type SuccessResponse = CitiesPrefixes;

export interface AddCityRequest {
  name: string;
  prefix: string;
}

export interface RemoveCityRequest {
  prefix: string;
}
