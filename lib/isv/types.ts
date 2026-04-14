// ISV Types — aligned with ISV 2026 tables
export type FuelType = "gasolina" | "gasoleo" | "hibrido" | "hibrido_plugin" | "gn" | "gpl";
export type Origin = "ue" | "terceiro";
export type Cycle = "NEDC" | "WLTP";
export type VehicleCondition = "novo" | "usado";
export type ParticleFilter = "euro6d" | "euro6dtemp" | "euro6c" | "euro6b" | "euro6a" | "euro5" | "sem_norma" | "desconhecido";
export type CommercialSubtype = "furgao_2lug" | "furgao_mercadorias" | "furgao_misto" | "caixa_aberta" | "cabine_dupla" | "cabine_dupla_4x4";

export type VehicleType =
  | "passageiros"
  | "comercial"
  | "autocaravana"
  | "moto"
  | "eletrico"
  | "anterior1970";

export interface IsvInput {
  vehicleType: VehicleType;
  commercialSubtype?: CommercialSubtype;
  origin: Origin;
  condition: VehicleCondition;
  year: number;
  month: number;
  day: number;
  cc: number;
  co2: number;
  fuel: FuelType;
  cycle: Cycle;
  particles?: ParticleFilter;
  electricRange?: number;
  transferResidence?: boolean;
  disability?: boolean;
}

export interface IsvBreakdown {
  // Raw components
  ccComponent: number;
  ccApplyPercent: number;
  co2Component: number;
  co2ApplyPercent: number;
  
  // Taxable base
  taxableBase: number;
  
  // After applying % from table
  totalAfterPercent: number;
  
  // After age reduction
  ageDiscountCc: number;
  ageDiscountCo2: number;
  ageDiscountTotal: number;
  
  // Final
  dieselSurcharge: number;
  finalTotal: number;
  
  // Metadata
  isExempt: boolean;
  exemptReason?: string;
  version: string;
}

export interface IsvTableEntry {
  limit: number;
  rate: number;
  deductible: number;
  applyPercent: number;
}

export interface AgeReductionEntry {
  minYears: number;
  maxYears: number;
  percent: number;
}

export interface IsvTables {
  ccPassageiros: IsvTableEntry[];
  ccMercadorias: IsvTableEntry[];
  ccMotos: IsvTableEntry[];
  co2: {
    gasolina: {
      nedc: IsvTableEntry[];
      wltp: IsvTableEntry[];
    };
    gasoleo: {
      nedc: IsvTableEntry[];
      wltp: IsvTableEntry[];
    };
  };
  ageReduction: AgeReductionEntry[];
  ageReductionCo2: AgeReductionEntry[];
}