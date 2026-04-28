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
// ============================================================

export const CO2_GASOLINA_NEDC: { limit: number; rate: number; deductible: number }[] = [
  { limit: 99, rate: 0.44, deductible: 43.02 },
  { limit: 115, rate: 1.10, deductible: 115.80 },
  { limit: 145, rate: 5.27, deductible: 619.17 },
  { limit: 175, rate: 53.54, deductible: 7625.60 },
  { limit: 195, rate: 64.88, deductible: 9605.37 },
  { limit: 235, rate: 202.15, deductible: 36467.73 },
  { limit: Infinity, rate: 233.81, deductible: 43910.96 },
];

// ============================================================
// COMPONENTE AMBIENTAL NEDC — Diesel / Gasóleo
// ============================================================

export const CO2_GASOLEO_NEDC: { limit: number; rate: number; deductible: number }[] = [
  { limit: 79, rate: 5.34, deductible: 400.23 },
  { limit: 95, rate: 22.86, deductible: 1782.69 },
  { limit: 120, rate: 79.22, deductible: 7195.63 },
  { limit: 140, rate: 172.39, deductible: 18366.13 },
  { limit: 160, rate: 197.35, deductible: 21848.84 },
  { limit: Infinity, rate: 271.76, deductible: 33743.84 },
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
