import { TABLES_2025, DIESEL_SURCHARGE } from "./tables";
import { IsvBreakdown, IsvInput, IsvTableEntry } from "./types";
import { COMMERCIAL_PERCENTAGES, AUTOCARAVANA_PERCENT, ANTERIOR_1970_PERCENT, AGE_REDUCTION_CC, AGE_REDUCTION_CO2 } from "./tables";

function getTableEntry(table: IsvTableEntry[], value: number): IsvTableEntry {
  for (const entry of table) {
    if (value <= entry.limit) return entry;
  }
  return table[table.length - 1];
}

function calcComponent(value: number, table: IsvTableEntry[]): { amount: number; applyPercent: number } {
  const entry = getTableEntry(table, value);
  return {
    amount: value * entry.rate - entry.deductible,
    applyPercent: entry.applyPercent
  };
}

function calcAge(year: number, month: number, day: number): number {
  const now = new Date();
  const reg = new Date(year, month - 1, day);
  return Math.abs(now.getTime() - reg.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
}

function getAgeReductionCc(age: number): number {
  for (const b of AGE_REDUCTION_CC) {
    if (age > b.minYears && age <= b.maxYears) return b.percent;
  }
  return 0;
}

function getAgeReductionCo2(age: number): number {
  for (const b of AGE_REDUCTION_CO2) {
    if (age > b.minYears && age <= b.maxYears) return b.percent;
  }
  return 0;
}

export function calculateIsv(input: IsvInput): IsvBreakdown {
  const t = TABLES_2025;
  const version = "Tabelas ISV 2026 (OE2026)";

  // --- ISENÇÕES ---
  if (input.vehicleType === "eletrico")
    return createExempt("Veículo 100% Elétrico — Isento de ISV", version);
  if (input.transferResidence)
    return createExempt("Transferência de Residência — Isento de ISV", version);
  if (input.vehicleType === "moto" && input.cc <= 125)
    return createExempt("Motociclo até 125cc — Isento de ISV", version);

  // PASSO 1 — Cilindrada
  let ccComponent = 0;
  let ccApplyPercent = 100;
  switch (input.vehicleType) {
    case "passageiros": {
      const result = calcComponent(input.cc, t.ccPassageiros);
      ccComponent = result.amount;
      ccApplyPercent = result.applyPercent;
      break;
    }
    case "comercial": {
      const sub = input.commercialSubtype || "furgao_2lug";
      const pct = COMMERCIAL_PERCENTAGES[sub] ?? 1.0;
      const result = calcComponent(input.cc, t.ccMercadorias);
      ccComponent = result.amount * pct;
      ccApplyPercent = result.applyPercent;
      break;
    }
    case "autocaravana": {
      const result = calcComponent(input.cc, t.ccMercadorias);
      ccComponent = result.amount * AUTOCARAVANA_PERCENT;
      ccApplyPercent = result.applyPercent;
      break;
    }
    case "moto": {
      const result = calcComponent(input.cc, t.ccMotos);
      ccComponent = result.amount;
      ccApplyPercent = result.applyPercent;
      break;
    }
    case "anterior1970": {
      const result = calcComponent(input.cc, t.ccMercadorias);
      ccComponent = result.amount * ANTERIOR_1970_PERCENT;
      ccApplyPercent = result.applyPercent;
      break;
    }
  }

  // PASSO 2 — CO₂ (só passageiros)
  let co2Component = 0;
  let co2ApplyPercent = 100;
  if (input.vehicleType === "passageiros") {
    const isDiesel = input.fuel === "gasoleo";
    const tbl = isDiesel
      ? (input.cycle === "WLTP" ? t.co2.gasoleo.wltp : t.co2.gasoleo.nedc)
      : (input.cycle === "WLTP" ? t.co2.gasolina.wltp : t.co2.gasolina.nedc);
    const result = calcComponent(input.co2, tbl);
    co2Component = result.amount;
    co2ApplyPercent = result.applyPercent;
  }

  // PASSO 3 — Base tributável = CC + ambiental (ambiental pode ser negativo)
  const taxableBase = ccComponent + co2Component;

  // PASSO 4 — Aplicar % da tabela
  // Para passageiros: usar a % da cilindrada sobre a soma (CC + CO2)
  // Para outros: cada componente com sua %
  let totalAfterPercent: number;
  if (input.vehicleType === "passageiros") {
    // Base × % da tabela de cilindrada
    totalAfterPercent = taxableBase * (ccApplyPercent / 100);
  } else {
    const ccAfterPercent = (ccComponent * ccApplyPercent) / 100;
    const co2AfterPercent = (co2Component * co2ApplyPercent) / 100;
    totalAfterPercent = ccAfterPercent + co2AfterPercent;
  }

  // PASSO 5 — Redução por idade
  // Para passageiros: redução apenas sobre CC
  // Para outros: redução sobre ambos
  let ageDiscCc = 0, ageDiscCo2 = 0, age = 0;
  if (input.origin === "ue" && input.condition === "usado") {
    age = calcAge(input.year, input.month, input.day);
    const agePctCc = getAgeReductionCc(age);
    const agePctCo2 = getAgeReductionCo2(age);
    
    if (input.vehicleType === "passageiros") {
      // Redução = (CC × % tabela) × % idade
      const ccWithPercent = ccComponent * (ccApplyPercent / 100);
      ageDiscCc = ccWithPercent * (agePctCc / 100);
    } else {
      ageDiscCc = (ccComponent * ccApplyPercent / 100) * (agePctCc / 100);
      ageDiscCo2 = (co2Component * co2ApplyPercent / 100) * (agePctCo2 / 100);
    }
  }
  const ageDiscountTotal = ageDiscCc + ageDiscCo2;

  // PASSO 6 — Agravamento partículas (só Diesel)
  let dieselSurcharge = 0;
  if (input.fuel === "gasoleo") {
    const norm = input.particles || "desconhecido";
    dieselSurcharge = DIESEL_SURCHARGE[norm] || 0;
  }

  // PASSO 7 — Total
  const finalTotal = Math.round(Math.max(0, totalAfterPercent - ageDiscountTotal + dieselSurcharge) * 100) / 100;

  return {
    ccComponent,
    ccApplyPercent,
    co2Component,
    co2ApplyPercent,
    taxableBase,
    totalAfterPercent,
    ageDiscountCc: ageDiscCc,
    ageDiscountCo2: ageDiscCo2,
    ageDiscountTotal,
    dieselSurcharge,
    finalTotal,
    isExempt: false,
    version,
  };
}

function createExempt(reason: string, version: string): IsvBreakdown {
  return {
    ccComponent: 0, ccApplyPercent: 0,
    co2Component: 0, co2ApplyPercent: 0,
    taxableBase: 0,
    totalAfterPercent: 0,
    ageDiscountCc: 0, ageDiscountCo2: 0, ageDiscountTotal: 0,
    dieselSurcharge: 0, finalTotal: 0,
    isExempt: true, exemptReason: reason, version,
  };
}