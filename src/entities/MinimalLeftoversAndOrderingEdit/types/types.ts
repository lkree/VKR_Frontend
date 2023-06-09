export interface Product {
  name: string;
  minimalLeftover: number;
}

export interface MinimalLeftovers {
  cityName: string;
  products: Array<Product>;
}

export type MinimalLeftoversArray = Array<MinimalLeftovers>;
