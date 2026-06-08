// ISV Types — aligned with ISV 2026 rules
export type FuelType = "gasolina" | "gasoleo" | "hibrido" | "hibrido_plugin" | "gn" | "gpl";
export type Origin = "ue" | "terceiro";
export type Cycle = "NEDC" | "WLTP";
export type VehicleCondition = "novo" | "usado";
export type ParticleFilter = "euro6d" | "euro6dtemp" | "euro6c" | "euro6b" | "euro6a" | "euro5" | "sem_norma" | "desconhecido" | "less_than_0001" | "equal_or_greater_than_0001";
export type VehicleType =
  | "passageiros"
  | "comercial"
  | "comercial_cx_fechada"
  | "comercial_3_lug"
  | "comercial_4x4"
  | "comercial_cx_aberta"
  | "comercial_cx_aberta_4x4"
  | "comercial_misto"
  | "comercial_mono"
  | "comercial_nao_tributado_tabela_b"
  | "ligeiro_2500kg"
  | "passageiros_gpl"
  | "passageiros_gn"
  | "hibrido_veiculo"
  | "hibrido_plugin_veiculo"
  | "hibrido_plugin_euro6e"
  | "autocaravana"
  | "moto"
  | "eletrico"
  | "anterior1970";

export type MercadoriaPercentType =
  | "comercial_100"
  | "comercial_10"
  | "comercial_50"
  | "comercial_15"
  | "comercial_40"
  | "autocaravana_80"
  | "passageiros_100";

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
  mercadoriaPercent?: MercadoriaPercentType;
  electricRange?: number;
  isEuro6eBis?: boolean;
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
