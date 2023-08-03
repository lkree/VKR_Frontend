export interface Product {
  nomenclature: string;
  orderingCount: number;
  minimalLeftover: number;
}

export interface MinimalLeftovers {
  cityName: string;
  products: Array<Product>;
}

export type MinimalLeftoversList = Array<MinimalLeftovers>;
