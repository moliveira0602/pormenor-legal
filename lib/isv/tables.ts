import { IsvTables } from "./types";

// Official Tables for 2025 (and likely 2026 unless changed)
// Source: Autoridade Tributária e Aduaneira (via search results and consolidated legislation)

export const TABLES_2025: IsvTables = {
  cc: [
    { limit: 1000, rate: 1.09, deductible: 849.03 },
    { limit: 1250, rate: 1.18, deductible: 850.69 },
    { limit: Infinity, rate: 5.61, deductible: 6194.88 },
  ],
  co2: {
    gasolina: {
      nedc: [
        { limit: 99, rate: 4.62, deductible: 427.00 },
        { limit: 115, rate: 8.09, deductible: 750.99 },
        { limit: 145, rate: 52.56, deductible: 5903.94 },
        { limit: 175, rate: 61.24, deductible: 7140.17 },
        { limit: 195, rate: 155.97, deductible: 23627.27 },
        { limit: Infinity, rate: 205.65, deductible: 33390.12 },
      ],
      wltp: [
        { limit: 110, rate: 0.44, deductible: 43.02 },
        { limit: 115, rate: 1.10, deductible: 115.80 },
        { limit: 120, rate: 1.38, deductible: 147.79 },
        { limit: 130, rate: 5.27, deductible: 619.17 },
        { limit: 145, rate: 6.38, deductible: 762.73 },
        { limit: 175, rate: 41.54, deductible: 5819.56 },
        { limit: 195, rate: 51.38, deductible: 7247.39 },
        { limit: 235, rate: 193.01, deductible: 34190.52 },
        { limit: Infinity, rate: 233.81, deductible: 41910.96 },
      ],
    },
    diesel: {
      nedc: [
        { limit: 79, rate: 5.78, deductible: 439.04 },
        { limit: 95, rate: 23.45, deductible: 1848.58 },
        { limit: 120, rate: 79.22, deductible: 7195.63 },
        { limit: 140, rate: 175.73, deductible: 18924.92 },
        { limit: 160, rate: 195.43, deductible: 21720.92 },
        { limit: Infinity, rate: 268.42, deductible: 33447.90 },
      ],
      wltp: [
        { limit: 110, rate: 1.72, deductible: 11.50 },
        { limit: 120, rate: 18.96, deductible: 1906.19 },
        { limit: 140, rate: 65.04, deductible: 7360.85 },
        { limit: 150, rate: 127.40, deductible: 16080.57 },
        { limit: 160, rate: 160.81, deductible: 21176.06 },
        { limit: 170, rate: 221.69, deductible: 29227.38 },
        { limit: 190, rate: 274.08, deductible: 36987.98 },
        { limit: Infinity, rate: 282.35, deductible: 38271.32 },
      ],
    },
  },
  // Unified age reduction table for 2025
  // Applies to both CC and CO2 components for used vehicles imported from EU
  ageReduction: [
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
  ],
  dieselSurcharge: {
    threshold: 0.001, // g/km
    amount: 500, // EUR
  },
};

// IUC Tables for 2026
export const IUC_TABLES_2026 = {
  categories: {
    // Categoria A: Veículos anteriores a Junho de 2007
    A: {
      baseRates: [
        { minCc: 0, maxCc: 1000, rate: 19.90 },
        { minCc: 1001, maxCc: 1300, rate: 39.95 },
        { minCc: 1301, maxCc: 1750, rate: 62.40 },
        { minCc: 1751, maxCc: 2600, rate: 158.31 },
        { minCc: 2601, maxCc: 3500, rate: 287.49 },
        { minCc: 3501, maxCc: Infinity, rate: 512.23 },
      ],
      dieselSurcharge: [
        { minCc: 0, maxCc: 1500, surcharge: 3.14 },
        { minCc: 1501, maxCc: 2000, surcharge: 6.31 },
        { minCc: 2001, maxCc: 3000, surcharge: 9.86 },
        { minCc: 3001, maxCc: Infinity, surcharge: 25.01 },
      ],
    },
    // Categoria B: Veículos a partir de Junho de 2007
    B: {
      baseRates: [
        { minCc: 0, maxCc: 1000, rate: 19.90 },
        { minCc: 1001, maxCc: 1300, rate: 39.95 },
        { minCc: 1301, maxCc: 1750, rate: 62.40 },
        { minCc: 1751, maxCc: 2600, rate: 158.31 },
        { minCc: 2601, maxCc: 3500, rate: 287.49 },
        { minCc: 3501, maxCc: Infinity, rate: 512.23 },
      ],
      co2Rates: [
        { minCo2: 0, maxCo2: 100, rate: 10.00 },
        { minCo2: 101, maxCo2: 150, rate: 15.00 },
        { minCo2: 151, maxCo2: 200, rate: 25.00 },
        { minCo2: 201, maxCo2: 250, rate: 40.00 },
        { minCo2: 251, maxCo2: 300, rate: 60.00 },
        { minCo2: 301, maxCo2: Infinity, rate: 80.00 },
      ],
      dieselSurcharge: [
        { minCc: 0, maxCc: 1500, surcharge: 6.31 },
        { minCc: 1501, maxCc: 2000, surcharge: 12.62 },
        { minCc: 2001, maxCc: 3000, surcharge: 19.72 },
        { minCc: 3001, maxCc: Infinity, surcharge: 50.02 },
      ],
    },
    // Categoria C: Veículos ligeiros de mercadorias
    C: {
      baseRates: [
        { minCc: 0, maxCc: 1000, rate: 19.90 },
        { minCc: 1001, maxCc: 1300, rate: 39.95 },
        { minCc: 1301, maxCc: 1750, rate: 62.40 },
        { minCc: 1751, maxCc: 2600, rate: 158.31 },
        { minCc: 2601, maxCc: 3500, rate: 287.49 },
        { minCc: 3501, maxCc: Infinity, rate: 512.23 },
      ],
      co2Rates: [
        { minCo2: 0, maxCo2: 100, rate: 12.00 },
        { minCo2: 101, maxCo2: 150, rate: 18.00 },
        { minCo2: 151, maxCo2: 200, rate: 30.00 },
        { minCo2: 201, maxCo2: 250, rate: 48.00 },
        { minCo2: 251, maxCo2: 300, rate: 72.00 },
        { minCo2: 301, maxCo2: Infinity, rate: 96.00 },
      ],
      dieselSurcharge: [
        { minCc: 0, maxCc: 1500, surcharge: 7.57 },
        { minCc: 1501, maxCc: 2000, surcharge: 15.14 },
        { minCc: 2001, maxCc: 3000, surcharge: 23.64 },
        { minCc: 3001, maxCc: Infinity, surcharge: 60.04 },
      ],
    },
    // Categoria D: Veículos pesados de mercadorias
    D: {
      baseRates: [
        { minCc: 0, maxCc: 1000, rate: 25.00 },
        { minCc: 1001, maxCc: 1300, rate: 50.00 },
        { minCc: 1301, maxCc: 1750, rate: 78.00 },
        { minCc: 1751, maxCc: 2600, rate: 198.00 },
        { minCc: 2601, maxCc: 3500, rate: 360.00 },
        { minCc: 3501, maxCc: Infinity, rate: 640.00 },
      ],
      co2Rates: [
        { minCo2: 0, maxCo2: 100, rate: 15.00 },
        { minCo2: 101, maxCo2: 150, rate: 22.50 },
        { minCo2: 151, maxCo2: 200, rate: 37.50 },
        { minCo2: 201, maxCo2: 250, rate: 60.00 },
        { minCo2: 251, maxCo2: 300, rate: 90.00 },
        { minCo2: 301, maxCo2: Infinity, rate: 120.00 },
      ],
      dieselSurcharge: [
        { minCc: 0, maxCc: 1500, surcharge: 9.46 },
        { minCc: 1501, maxCc: 2000, surcharge: 18.92 },
        { minCc: 2001, maxCc: 3000, surcharge: 29.55 },
        { minCc: 3001, maxCc: Infinity, surcharge: 75.05 },
      ],
    },
    // Categoria E: Motociclos, ciclomotores, triciclos e quadriciclos
    E: {
      baseRates: [
        { minCc: 0, maxCc: 50, rate: 8.80 },
        { minCc: 51, maxCc: 125, rate: 12.55 },
        { minCc: 126, maxCc: 250, rate: 17.49 },
        { minCc: 251, maxCc: 400, rate: 36.09 },
        { minCc: 401, maxCc: 600, rate: 79.72 },
        { minCc: 601, maxCc: Infinity, rate: 120.90 },
      ],
      co2Rates: [
        { minCo2: 0, maxCo2: 100, rate: 5.00 },
        { minCo2: 101, maxCo2: 150, rate: 7.50 },
        { minCo2: 151, maxCo2: 200, rate: 12.50 },
        { minCo2: 201, maxCo2: 250, rate: 20.00 },
        { minCo2: 251, maxCo2: 300, rate: 30.00 },
        { minCo2: 301, maxCo2: Infinity, rate: 40.00 },
      ],
      dieselSurcharge: [
        { minCc: 0, maxCc: 1500, surcharge: 1.57 },
        { minCc: 1501, maxCc: 2000, surcharge: 3.14 },
        { minCc: 2001, maxCc: 3000, surcharge: 4.91 },
        { minCc: 3001, maxCc: Infinity, surcharge: 12.50 },
      ],
    },
  },
  // Age reduction table for IUC
  ageReduction: [
    { minYears: 0, maxYears: 1, percent: 0 },
    { minYears: 1, maxYears: 5, percent: 0 },
    { minYears: 5, maxYears: 10, percent: 0 },
    { minYears: 10, maxYears: 15, percent: 0 },
    { minYears: 15, maxYears: 20, percent: 0 },
    { minYears: 20, maxYears: 25, percent: 0 },
    { minYears: 25, maxYears: Infinity, percent: 100 }, // Isenção total > 25 anos
  ],
  // Electric vehicle discount
  electricDiscount: {
    percent: 100, // 100% discount for electric vehicles
  },
};

// IUC Tables for 2025 (mantido para compatibilidade)
export const IUC_TABLES_2025 = {
  categories: {
    A: {
      baseRates: [
        { minCc: 0, maxCc: 1000, rate: 19.90 },
        { minCc: 1001, maxCc: 1300, rate: 39.95 },
        { minCc: 1301, maxCc: 1750, rate: 62.40 },
        { minCc: 1751, maxCc: 2600, rate: 158.31 },
        { minCc: 2601, maxCc: 3500, rate: 287.49 },
        { minCc: 3501, maxCc: Infinity, rate: 512.23 },
      ],
      dieselSurcharge: [
        { minCc: 0, maxCc: 1500, surcharge: 3.14 },
        { minCc: 1501, maxCc: 2000, surcharge: 6.31 },
        { minCc: 2001, maxCc: 3000, surcharge: 9.86 },
        { minCc: 3001, maxCc: Infinity, surcharge: 25.01 },
      ],
    },
    B: {
      baseRates: [
        { minCc: 0, maxCc: 1000, rate: 19.90 },
        { minCc: 1001, maxCc: 1300, rate: 39.95 },
        { minCc: 1301, maxCc: 1750, rate: 62.40 },
        { minCc: 1751, maxCc: 2600, rate: 158.31 },
        { minCc: 2601, maxCc: 3500, rate: 287.49 },
        { minCc: 3501, maxCc: Infinity, rate: 512.23 },
      ],
      co2Rates: [
        { minCo2: 0, maxCo2: 100, rate: 10.00 },
        { minCo2: 101, maxCo2: 150, rate: 15.00 },
        { minCo2: 151, maxCo2: 200, rate: 25.00 },
        { minCo2: 201, maxCo2: 250, rate: 40.00 },
        { minCo2: 251, maxCo2: 300, rate: 60.00 },
        { minCo2: 301, maxCo2: Infinity, rate: 80.00 },
      ],
      dieselSurcharge: [
        { minCc: 0, maxCc: 1500, surcharge: 6.31 },
        { minCc: 1501, maxCc: 2000, surcharge: 12.62 },
        { minCc: 2001, maxCc: 3000, surcharge: 19.72 },
        { minCc: 3001, maxCc: Infinity, surcharge: 50.02 },
      ],
    },
    C: {
      baseRates: [
        { minCc: 0, maxCc: 1000, rate: 19.90 },
        { minCc: 1001, maxCc: 1300, rate: 39.95 },
        { minCc: 1301, maxCc: 1750, rate: 62.40 },
        { minCc: 1751, maxCc: 2600, rate: 158.31 },
        { minCc: 2601, maxCc: 3500, rate: 287.49 },
        { minCc: 3501, maxCc: Infinity, rate: 512.23 },
      ],
      co2Rates: [
        { minCo2: 0, maxCo2: 100, rate: 12.00 },
        { minCo2: 101, maxCo2: 150, rate: 18.00 },
        { minCo2: 151, maxCo2: 200, rate: 30.00 },
        { minCo2: 201, maxCo2: 250, rate: 48.00 },
        { minCo2: 251, maxCo2: 300, rate: 72.00 },
        { minCo2: 301, maxCo2: Infinity, rate: 96.00 },
      ],
      dieselSurcharge: [
        { minCc: 0, maxCc: 1500, surcharge: 7.57 },
        { minCc: 1501, maxCc: 2000, surcharge: 15.14 },
        { minCc: 2001, maxCc: 3000, surcharge: 23.64 },
        { minCc: 3001, maxCc: Infinity, surcharge: 60.04 },
      ],
    },
    D: {
      baseRates: [
        { minCc: 0, maxCc: 1000, rate: 25.00 },
        { minCc: 1001, maxCc: 1300, rate: 50.00 },
        { minCc: 1301, maxCc: 1750, rate: 78.00 },
        { minCc: 1751, maxCc: 2600, rate: 198.00 },
        { minCc: 2601, maxCc: 3500, rate: 360.00 },
        { minCc: 3501, maxCc: Infinity, rate: 640.00 },
      ],
      co2Rates: [
        { minCo2: 0, maxCo2: 100, rate: 15.00 },
        { minCo2: 101, maxCo2: 150, rate: 22.50 },
        { minCo2: 151, maxCo2: 200, rate: 37.50 },
        { minCo2: 201, maxCo2: 250, rate: 60.00 },
        { minCo2: 251, maxCo2: 300, rate: 90.00 },
        { minCo2: 301, maxCo2: Infinity, rate: 120.00 },
      ],
      dieselSurcharge: [
        { minCc: 0, maxCc: 1500, surcharge: 9.46 },
        { minCc: 1501, maxCc: 2000, surcharge: 18.92 },
        { minCc: 2001, maxCc: 3000, surcharge: 29.55 },
        { minCc: 3001, maxCc: Infinity, surcharge: 75.05 },
      ],
    },
    E: {
      baseRates: [
        { minCc: 0, maxCc: 50, rate: 8.80 },
        { minCc: 51, maxCc: 125, rate: 12.55 },
        { minCc: 126, maxCc: 250, rate: 17.49 },
        { minCc: 251, maxCc: 400, rate: 36.09 },
        { minCc: 401, maxCc: 600, rate: 79.72 },
        { minCc: 601, maxCc: Infinity, rate: 120.90 },
      ],
      co2Rates: [
        { minCo2: 0, maxCo2: 100, rate: 5.00 },
        { minCo2: 101, maxCo2: 150, rate: 7.50 },
        { minCo2: 151, maxCo2: 200, rate: 12.50 },
        { minCo2: 201, maxCo2: 250, rate: 20.00 },
        { minCo2: 251, maxCo2: 300, rate: 30.00 },
        { minCo2: 301, maxCo2: Infinity, rate: 40.00 },
      ],
      dieselSurcharge: [
        { minCc: 0, maxCc: 1500, surcharge: 1.57 },
        { minCc: 1501, maxCc: 2000, surcharge: 3.14 },
        { minCc: 2001, maxCc: 3000, surcharge: 4.91 },
        { minCc: 3001, maxCc: Infinity, surcharge: 12.50 },
      ],
    },
  },
  ageReduction: [
    { minYears: 0, maxYears: 1, percent: 0 },
    { minYears: 1, maxYears: 5, percent: 0 },
    { minYears: 5, maxYears: 10, percent: 0 },
    { minYears: 10, maxYears: 15, percent: 0 },
    { minYears: 15, maxYears: 20, percent: 0 },
    { minYears: 20, maxYears: 25, percent: 0 },
    { minYears: 25, maxYears: Infinity, percent: 100 },
  ],
  electricDiscount: {
    percent: 100,
  },
};
