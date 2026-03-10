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
