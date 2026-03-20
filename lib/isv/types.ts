export type FuelType = "diesel" | "gasolina" | "hibrido" | "eletrico" | "gpl";
export type Origin = "eu" | "noneu";
export type VehicleCategory = "M1" | "N1";
export type Cycle = "NEDC" | "WLTP";
export type HybridKind = "mhev" | "hev" | "phev"; // Mild, Full, Plug-in
export type VehicleCondition = "novo" | "usado";

// Tipos específicos para IUC 2026
export type IucCategory = "A" | "B";
export type VehicleType = "carro" | "moto" | "ciclomotor" | "triciclo" | "quadriciclo" | "mercadorias_ligeiro" | "mercadorias_pesado";

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

// Tipos para IUC (Autodoc-style)
export type OriginRegion = "eu_eea" | "third_country";
export type MeasurementCycle = "NEDC" | "WLTP";
export type FuelType2026 = "gasolina" | "gasoleo";

export interface IucInput {
  originRegion: OriginRegion; // Região de origem
  firstRegistrationDate: Date; // Data da primeira matrícula
  portugueseRegistrationDate?: Date; // Data da matrícula em Portugal (para veículos importados)
  measurementCycle: MeasurementCycle; // Ciclo de medição
  fuelType: FuelType2026; // Tipo de combustível
  engineCc: number; // Cilindrada em cm³
  co2: number; // Emissões CO2 em g/km
  year: number;
  month: number;
  day: number;
  category: "A" | "B"; // Apenas categorias A e B para carros de passageiros
  vehicleType: "carro"; // Apenas carros de passageiros
}

export interface IucBreakdown {
  category: IucCategory;
  vehicleType: VehicleType;
  engineComponent: number;
  co2Component: number;
  additionalCo2: number; // Componente adicional de CO2
  registrationYearCoefficient: number; // Coeficiente do ano de matrícula
  fuelSurcharge: number; // Agravamento por combustível
  subtotal: number;
  total: number;
  isExempt: boolean;
  exemptReason?: string;
  version: string;
  dieselExtra?: number; // Backward compatibility
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

// Estrutura para tabelas IUC por categoria (Autodoc-style)
export interface IucCategoryTable {
  baseRates: Array<{
    minCc: number;
    maxCc: number;
    rate: number;
  }>;
  co2Rates?: Array<{
    minCo2: number;
    maxCo2: number;
    rate: number;
  }>;
  additionalCo2Rates?: Array<{
    minCo2: number;
    maxCo2: number;
    rate: number;
  }>;
  dieselSurcharge?: Array<{
    minCc: number;
    maxCc: number;
    surcharge: number;
  }>;
  registrationYearCoefficients?: Array<{
    minYear: number;
    maxYear: number;
    coefficient: number;
  }>;
}

export interface IucTables2026 {
  categories: {
    A: IucCategoryTable;
    B: IucCategoryTable;
    C: IucCategoryTable;
    D: IucCategoryTable;
    E: IucCategoryTable;
  };
  ageReduction: Array<{
    minYears: number;
    maxYears: number;
    percent: number;
  }>;
  electricDiscount: {
    percent: number;
  };
}
