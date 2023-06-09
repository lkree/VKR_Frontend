export type CitiesPrefixes = Array<[string, string]>;

export type SuccessResponse = CitiesPrefixes;

export interface AddCityRequest {
  cityName: string;
  cityPrefix: string;
}

export interface RemoveCityRequest {
  cityPrefix: string;
}
