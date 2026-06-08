// ISV 2026 — Tabelas Oficiais (OE2026) — Ligeiros de Passageiros

// ============================================================
// COMPONENTE CILINDRADA — 3 escalões (não progressivo)
// Fórmula: cc * taxa - abatimento
// ============================================================

export const CC_PASSAGEIROS: { limit: number; rate: number; deductible: number }[] = [
  { limit: 1000, rate: 1.09, deductible: 849.03 },
  { limit: 1250, rate: 1.18, deductible: 850.69 },
  { limit: Infinity, rate: 5.61, deductible: 6194.88 },
];

// ============================================================
// COMPONENTE AMBIENTAL WLTP — Gasolina / GPL / GNV
// ============================================================

export const CO2_GASOLINA_WLTP: { limit: number; rate: number; deductible: number }[] = [
  { limit: 110, rate: 0.44, deductible: 43.02 },
  { limit: 115, rate: 1.10, deductible: 115.80 },
  { limit: 120, rate: 1.38, deductible: 147.79 },
  { limit: 130, rate: 5.27, deductible: 619.17 },
  { limit: 145, rate: 6.38, deductible: 762.73 },
  { limit: 175, rate: 41.54, deductible: 5819.56 },
  { limit: 195, rate: 51.38, deductible: 7247.39 },
  { limit: 235, rate: 193.01, deductible: 34190.52 },
  { limit: Infinity, rate: 233.81, deductible: 41910.96 },
];

// ============================================================
// COMPONENTE AMBIENTAL WLTP — Diesel / Gasóleo
// ============================================================

export const CO2_GASOLEO_WLTP: { limit: number; rate: number; deductible: number }[] = [
  { limit: 110, rate: 1.72, deductible: 11.50 },
  { limit: 120, rate: 18.96, deductible: 1906.19 },
  { limit: 140, rate: 65.04, deductible: 7360.85 },
  { limit: 150, rate: 127.40, deductible: 16080.57 },
  { limit: 160, rate: 160.81, deductible: 21176.06 },
  { limit: 170, rate: 221.69, deductible: 29227.38 },
  { limit: 190, rate: 274.08, deductible: 36987.98 },
  { limit: Infinity, rate: 282.35, deductible: 38271.32 },
];

// ============================================================
// COMPONENTE AMBIENTAL NEDC — Gasolina / GPL / GNV
// Fonte: impostosobreveiculos.info / Diário da República
// ============================================================

export const CO2_GASOLINA_NEDC: { limit: number; rate: number; deductible: number }[] = [
  { limit: 99, rate: 4.62, deductible: 427.00 },
  { limit: 115, rate: 8.09, deductible: 750.99 },
  { limit: 145, rate: 52.56, deductible: 5903.94 },
  { limit: 175, rate: 61.24, deductible: 7140.17 },
  { limit: 195, rate: 155.97, deductible: 23627.27 },
  { limit: Infinity, rate: 205.65, deductible: 33390.12 },
];

// ============================================================
// COMPONENTE AMBIENTAL NEDC — Diesel / Gasóleo
// Fonte: impostosobreveiculos.info / Diário da República
// ============================================================

export const CO2_GASOLEO_NEDC: { limit: number; rate: number; deductible: number }[] = [
  { limit: 79, rate: 5.78, deductible: 439.04 },
  { limit: 95, rate: 23.45, deductible: 1848.58 },
  { limit: 120, rate: 79.22, deductible: 7195.63 },
  { limit: 140, rate: 175.73, deductible: 18924.92 },
  { limit: 160, rate: 195.43, deductible: 21720.92 },
  { limit: Infinity, rate: 268.42, deductible: 33447.90 },
];

// ============================================================
// REDUÇÃO POR IDADE — importados usados da UE (aplica-se ao total bruto)
// Intervalos: [min, max) — age >= minYears && age < maxYears
// ============================================================

export const AGE_REDUCTION = [
  { minYears: 0, maxYears: 1, percent: 10 },
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

// ============================================================
// COMPONENTE CILINDRADA — TABELA B (Mercadorias / Comerciais)
// Fórmula: cc * taxa - abatimento (escalão único)
// ============================================================

export const CC_MERCADORIAS: { limit: number; rate: number; deductible: number }[] = [
  { limit: 1250, rate: 5.30, deductible: 3331.68 },
  { limit: Infinity, rate: 12.58, deductible: 12138.47 },
];

// ============================================================
// PERCENTAGENS TABELA B — por tipo de veículo mercadorias
// ============================================================

export type MercadoriaPercentKey =
  | "comercial_100"        // Ligeiro mercadorias caixa fechada (100%)
  | "comercial_10"         // Ligeiro mercadorias 3 lugares (10%)
  | "comercial_50"         // Ligeiro mercadorias 4x4 (50%)
  | "comercial_15"         // Misto / cx aberta s/4x4 (15%)
  | "comercial_40"         // Monovolumes >2500kg 7lug (40%)
  | "autocaravana_80"      // Autocaravana (80%)
  | "passageiros_100";     // Ligeiro passageiros (100%)

export const MERCADORIA_PERCENTAGES: Record<MercadoriaPercentKey, number> = {
  comercial_100: 1.00,
  comercial_10: 0.10,
  comercial_50: 0.50,
  comercial_15: 0.15,
  comercial_40: 0.40,
  autocaravana_80: 0.80,
  passageiros_100: 1.00,
};

// ============================================================
// COMBUSTÍVEL → tipo de tabela ambiental
// ============================================================

export type Co2TableKey = "gasolina" | "gasoleo";

/** GPL e GNV usam a mesma tabela que gasolina */
export const FUEL_TO_CO2_TABLE: Record<string, Co2TableKey> = {
  gasolina: "gasolina",
  gpl: "gasolina",
  gn: "gasolina",
  hibrido: "gasolina",
  hibrido_plugin: "gasolina",
  gasoleo: "gasoleo",
};

// ============================================================
// Descontos híbridos
// ============================================================

export const HYBRID_DISCOUNT = 0.40; // 40% desconto — híbrido clássico
export const PHEV_DISCOUNT = 0.75;    // 75% desconto — plug-in híbrido
