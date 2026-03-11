export type FuelType = "diesel" | "gasolina" | "hibrido" | "eletrico" | "gpl";
export type Origin = "eu" | "noneu";
export type VehicleCategory = "M1" | "N1";
export type Cycle = "NEDC" | "WLTP";
export type HybridKind = "mhev" | "hev" | "phev"; // Mild, Full, Plug-in
export type VehicleCondition = "novo" | "usado";

export interface IsvInput {
  fuel: FuelType;
  condition: VehicleCondition;
  year: number;
  month: number;
  day: number;
  cc: number;
  co2: number;
  particles?: number; // In g/km (for diesel surcharge)
  origin: Origin;
  category: VehicleCategory;
  cycle: Cycle;
  hybridKind?: HybridKind;
  electricRange?: number; // In km (for PHEV eligibility)
  transferResidence?: boolean;
  disability?: boolean;
  taxi?: boolean;
  largeFamily?: boolean;
}

export interface IsvBreakdown {
  cc: {
    base: number;
    deduction: number;
    subtotal: number;
  };
  co2: {
    base: number;
    deduction: number;
    subtotal: number;
  };
  dieselSurcharge: number;
  ageReduction: {
    years: number;
    percent: number;
    amount: number;
  };
  hybridReduction: {
    percent: number;
    amount: number;
  };
  specialReductions: {
    percent: number; // For disability, taxi, etc.
    amount: number;
  };
  totalBeforeReductions: number;
  finalTotal: number;
  isExempt: boolean;
  exemptReason?: string;
  version: string;
}

export interface IsvTableEntry {
  limit: number; // Upper limit of the bracket (Infinity for last)
  rate: number;
  deductible: number;
}

export interface AgeReductionEntry {
  minYears: number;
  maxYears: number;
  percent: number;
}

export interface IsvTables {
  cc: IsvTableEntry[];
  co2: {
    gasolina: {
      nedc: IsvTableEntry[];
      wltp: IsvTableEntry[];
    };
    diesel: {
      nedc: IsvTableEntry[];
      wltp: IsvTableEntry[];
    };
  };
  ageReduction: AgeReductionEntry[];
  dieselSurcharge: {
    threshold: number;
    amount: number;
  };
}

export interface IucInput {
  category: VehicleCategory;
  fuel: FuelType;
  year: number;
  month: number;
  day: number;
  cc: number;
  co2: number;
  co2Standard: "NEDC" | "WLTP";
  origin: "national" | "foreign";
}

export interface IucBreakdown {
  category: VehicleCategory;
  engineComponent: number;
  co2Component: number;
  dieselExtra: number;
  subtotal: number;
  total: number;
  isExempt: boolean;
  exemptReason?: string;
  version: string;
}
