import { IsvTables, IsvTableEntry, AgeReductionEntry } from "./types";

// ============================================================
// TABELA A — Ligeiros de Passageiros e Mistos (Cilindrada)
// ============================================================
export const CC_PASSAGEIROS: IsvTableEntry[] = [
  { limit: 1000, rate: 0.00, deductible: 0, applyPercent: 0 },
  { limit: 1250, rate: 1.07, deductible: 1070.00, applyPercent: 7 },
  { limit: 1750, rate: 2.37, deductible: 2642.50, applyPercent: 15 },
  { limit: 2500, rate: 3.91, deductible: 5390.00, applyPercent: 23 },
  { limit: 3000, rate: 5.61, deductible: 6194.88, applyPercent: 25 },
  { limit: Infinity, rate: 7.37, deductible: 11474.88, applyPercent: 28 },
];

// ============================================================
// TABELA B — Ligeiros de Mercadorias, Autocaravanas, Pré-1970
// ============================================================
export const CC_MERCADORIAS: IsvTableEntry[] = [
  { limit: 1250, rate: 5.30, deductible: 3331.68, applyPercent: 100 },
  { limit: Infinity, rate: 12.58, deductible: 12138.47, applyPercent: 100 },
];

// ============================================================
// TABELA C — Motociclos, Triciclos, Quadriciclos
// ============================================================
export const CC_MOTOS: IsvTableEntry[] = [
  { limit: 125, rate: 0, deductible: 0, applyPercent: 0 },
  { limit: 250, rate: 0.54, deductible: 53.94, applyPercent: 100 },
  { limit: 500, rate: 1.44, deductible: 280.18, applyPercent: 100 },
  { limit: 750, rate: 2.85, deductible: 987.17, applyPercent: 100 },
  { limit: Infinity, rate: 5.58, deductible: 3034.19, applyPercent: 100 },
];

// ============================================================
// COMPONENTE AMBIENTAL — Gasolina / GPL / GN — NEDC
// ============================================================
const CO2_GAS_NEDC: IsvTableEntry[] = [
  { limit: 99, rate: 4.62, deductible: 427.00, applyPercent: 20 },
  { limit: 115, rate: 8.09, deductible: 750.99, applyPercent: 23 },
  { limit: 145, rate: 52.56, deductible: 5903.94, applyPercent: 25 },
  { limit: 175, rate: 61.24, deductible: 7140.17, applyPercent: 23 },
  { limit: 195, rate: 155.97, deductible: 23627.27, applyPercent: 25 },
  { limit: Infinity, rate: 205.65, deductible: 33390.12, applyPercent: 28 },
];

// ============================================================
// COMPONENTE AMBIENTAL — Gasolina / GPL / GN — WLTP
// ============================================================
const CO2_GAS_WLTP: IsvTableEntry[] = [
  { limit: 99, rate: 0.44, deductible: 43.02, applyPercent: 20 },
  { limit: 115, rate: 1.36, deductible: 135.52, applyPercent: 23 },
  { limit: 145, rate: 2.59, deductible: 277.40, applyPercent: 25 },
  { limit: 175, rate: 5.24, deductible: 662.15, applyPercent: 23 },
  { limit: 195, rate: 11.16, deductible: 1695.35, applyPercent: 25 },
  { limit: Infinity, rate: 27.74, deductible: 4934.05, applyPercent: 28 },
];

// ============================================================
// COMPONENTE AMBIENTAL — Gasóleo — NEDC
// ============================================================
const CO2_DIESEL_NEDC: IsvTableEntry[] = [
  { limit: 79, rate: 0.44, deductible: 34.10, applyPercent: 20 },
  { limit: 95, rate: 1.36, deductible: 107.30, applyPercent: 23 },
  { limit: 120, rate: 2.59, deductible: 224.80, applyPercent: 25 },
  { limit: 140, rate: 5.24, deductible: 542.80, applyPercent: 23 },
  { limit: 160, rate: 11.16, deductible: 1371.60, applyPercent: 25 },
  { limit: Infinity, rate: 27.74, deductible: 3988.00, applyPercent: 28 },
];

// ============================================================
// COMPONENTE AMBIENTAL — Gasóleo — WLTP
// ============================================================
const CO2_DIESEL_WLTP: IsvTableEntry[] = [
  { limit: 79, rate: 0.44, deductible: 34.10, applyPercent: 20 },
  { limit: 95, rate: 1.36, deductible: 107.30, applyPercent: 23 },
  { limit: 120, rate: 2.59, deductible: 224.80, applyPercent: 25 },
  { limit: 140, rate: 5.24, deductible: 542.80, applyPercent: 23 },
  { limit: 160, rate: 11.16, deductible: 1371.60, applyPercent: 25 },
  { limit: Infinity, rate: 27.74, deductible: 3988.00, applyPercent: 28 },
];

// ============================================================
// REDUÇÃO POR IDADE — Separate para Cilindrada e Ambiental
// ============================================================
export const AGE_REDUCTION_CC: AgeReductionEntry[] = [
  { minYears: 0, maxYears: 1, percent: 0 },
  { minYears: 1, maxYears: 2, percent: 20 },
  { minYears: 2, maxYears: 3, percent: 28 },
  { minYears: 3, maxYears: 4, percent: 35 },
  { minYears: 4, maxYears: 5, percent: 43 },
  { minYears: 5, maxYears: 6, percent: 52 },
  { minYears: 6, maxYears: 7, percent: 60 },
  { minYears: 7, maxYears: 8, percent: 65 },
  { minYears: 8, maxYears: 9, percent: 70 },
  { minYears: 9, maxYears: 10, percent: 75 },
  { minYears: 10, maxYears: Infinity, percent: 80 },
];

export const AGE_REDUCTION_CO2: AgeReductionEntry[] = [
  { minYears: 0, maxYears: Infinity, percent: 0 },
];

// ============================================================
// AGRAVAMENTO PARTÍCULAS (Diesel)
// ============================================================
export const DIESEL_SURCHARGE: Record<string, number> = {
  euro6d: 0,
  euro6dtemp: 0,
  euro6c: 500,
  euro6b: 1000,
  euro6a: 1000,
  euro5: 1000,
  sem_norma: 2500,
  desconhecido: 2500,
};

// ============================================================
// TABELAS ISV 2026 (OE2026)
// ============================================================
export const TABLES_2025: IsvTables = {
  ccPassageiros: CC_PASSAGEIROS,
  ccMercadorias: CC_MERCADORIAS,
  ccMotos: CC_MOTOS,
  co2: {
    gasolina: {
      nedc: CO2_GAS_NEDC,
      wltp: CO2_GAS_WLTP,
    },
    gasoleo: {
      nedc: CO2_DIESEL_NEDC,
      wltp: CO2_DIESEL_WLTP,
    },
  },
  ageReduction: AGE_REDUCTION_CC,
  ageReductionCo2: AGE_REDUCTION_CO2,
};

// ============================================================
// Percentagens por sub-tipo comercial (Tabela B)
// ============================================================
export const COMMERCIAL_PERCENTAGES: Record<string, number> = {
  furgao_2lug: 1.0,
  furgao_mercadorias: 0.10,
  furgao_misto: 0.15,
  caixa_aberta: 0.10,
  cabine_dupla: 0.15,
  cabine_dupla_4x4: 0.50,
};

export const AUTOCARAVANA_PERCENT = 1.0;
export const ANTERIOR_1970_PERCENT = 0.20;