// ISV Types — aligned with ISV 2026 rules
export type FuelType = "gasolina" | "gasoleo" | "hibrido" | "hibrido_plugin" | "gn" | "gpl";
export type Origin = "ue" | "terceiro";
export type Cycle = "NEDC" | "WLTP";
export type VehicleCondition = "novo" | "usado";
export type ParticleFilter = "euro6d" | "euro6dtemp" | "euro6c" | "euro6b" | "euro6a" | "euro5" | "sem_norma" | "desconhecido";
export type VehicleType =
  | "passageiros"
  | "comercial"
  | "autocaravana"
  | "moto"
  | "eletrico"
  | "anterior1970";

export interface IsvInput {
  vehicleType: VehicleType;
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
  transferResidence?: boolean;
  disability?: boolean;
}

export interface IsvBreakdown {
  /** Raw: componente cilindrada (antes de qualquer desconto) */
  ccComponent: number;
  /** Raw: componente ambiental (antes de qualquer desconto) */
  co2Component: number;
  /** ISV bruto = ccComponent + co2Component (antes de redução idade) */
  isvGross: number;
  /** Percentagem de redução por idade (0–80%) */
  ageReductionPercent: number;
  /** Valor descontado pela idade */
  ageDiscount: number;
  /** ISV final após todas as reduções */
  finalTotal: number;
  /** Se o veículo está isento */
  isExempt: boolean;
  /** Razão da isenção */
  exemptReason?: string;
  /** Versão das tabelas usadas */
  version: string;
}
