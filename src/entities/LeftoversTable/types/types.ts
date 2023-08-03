export interface LeftoverFilling {
  unit: string;
  incoming?: number;
  vendorCode?: string;
  haveToOrder: number;
  consumption?: number;
  orderedCount: number;
  nomenclature: string;
  leftoverAtEnd: number;
  leftoverAtStart?: number;
}

export interface Leftover {
  cityName: string;
  leftovers: Array<LeftoverFilling>;
}

export type LeftoversList = Array<Leftover>;
