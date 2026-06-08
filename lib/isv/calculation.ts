import { createIsvBreakdown } from "./index";
import type { IsvBreakdown, IsvInput, MercadoriaPercentType } from "./types";
import {
  CC_PASSAGEIROS,
  CC_MERCADORIAS,
  MERCADORIA_PERCENTAGES,
  CO2_GASOLINA_WLTP,
  CO2_GASOLEO_WLTP,
  CO2_GASOLINA_NEDC,
  CO2_GASOLEO_NEDC,
  AGE_REDUCTION,
  FUEL_TO_CO2_TABLE,
  HYBRID_DISCOUNT,
  PHEV_DISCOUNT,
} from "./tables";
import { Cycle } from "./types";

// ============================================================
// Helper functions — uma responsabilidade cada
// ============================================================

/**
 * Obtém o escalão da cilindrada.
 * Um único escalão (NÃO progressivo) — primeiro escalão onde value <= limit.
 */
function getCcBrac(value: number): { rate: number; deductible: number } {
  for (const b of CC_PASSAGEIROS) {
    if (value <= b.limit) return { rate: b.rate, deductible: b.deductible };
  }
  const last = CC_PASSAGEIROS[CC_PASSAGEIROS.length - 1];
  return { rate: last.rate, deductible: last.deductible };
}

/**
 * Obtém o escalão de CO2 para gasoline/GPL/GNV (WLTP).
 */
function getCo2BracGasolina(co2: number, cycle: Cycle): { rate: number; deductible: number } {
  const table = cycle === "WLTP" ? CO2_GASOLINA_WLTP : CO2_GASOLINA_NEDC;
  for (const b of table) {
    if (co2 <= b.limit) return { rate: b.rate, deductible: b.deductible };
  }
  const last = table[table.length - 1];
  return { rate: last.rate, deductible: last.deductible };
}

/**
 * Obtém o escalão de CO2 para diesel/gasóleo (WLTP).
 */
function getCo2BracGasoleo(co2: number, cycle: Cycle): { rate: number; deductible: number } {
  const table = cycle === "WLTP" ? CO2_GASOLEO_WLTP : CO2_GASOLEO_NEDC;
  for (const b of table) {
    if (co2 <= b.limit) return { rate: b.rate, deductible: b.deductible };
  }
  const last = table[table.length - 1];
  return { rate: last.rate, deductible: last.deductible };
}

/**
 * Redução por idade para importados da UE.
 * age >= minYears && age < maxYears (semelhante à tabela oficial).
 */
function getAgeReduction(age: number): number {
  for (const r of AGE_REDUCTION) {
    if (age >= r.minYears && age < r.maxYears) return r.percent;
  }
  return 0;
}

/**
 * Calcula a idade do veículo em anos decimais.
 */
function calcAge(year: number, month: number, day: number): number {
  const now = new Date();
  const reg = new Date(year, month - 1, day);
  const diffMs = now.getTime() - reg.getTime();
  return diffMs / (1000 * 60 * 60 * 24 * 365.25);
}

// ============================================================
// Main calculation
// ============================================================

function calcDieselSurcharge(fuel: string, particles: string | undefined): number {
  if (fuel !== "gasoleo") return 0;
  // O agravamento de 500€ aplica-se a veículos a gasóleo que não cumpram o limite de partículas de 0,001 g/km.
  const norm = (particles || "desconhecido").toLowerCase();
  
  // Se for uma norma conhecida por estar abaixo do limite, ou se for a nova escolha <0.001g-km
  if (
    norm === "euro6d" || 
    norm === "euro6dtemp" || 
    norm === "less_than_0001" || 
    norm.includes("less_than") || 
    norm.includes("<")
  ) {
    return 0;
  }
  
  // Se o utilizador inseriu um valor numérico (ex: "0.0005" ou "< 0.001")
  if (parseFloat(norm) > 0 && parseFloat(norm) < 0.001) {
    return 0;
  }

  // Todas as outras normas ou desconhecido -> +500€
  return 500;
}

/**
 * Determina a percentagem de ISV a pagar com base no tipo de veículo.
 */
function getVehiclePayPercent(input: IsvInput): { useTabelaB: boolean; percent: number } {
  switch (input.vehicleType) {
    case "passageiros":
      return { useTabelaB: false, percent: 1.0 };
    case "comercial_cx_fechada":
      return { useTabelaB: true, percent: 1.0 };
    case "comercial_3_lug":
      return { useTabelaB: true, percent: 0.10 };
    case "comercial_4x4":
      return { useTabelaB: true, percent: 0.50 };
    case "comercial_cx_aberta":
      return { useTabelaB: true, percent: 0.15 };
    case "comercial_cx_aberta_4x4":
      return { useTabelaB: true, percent: 0.50 };
    case "comercial_misto":
      return { useTabelaB: true, percent: 0.15 };
    case "comercial_mono":
      return { useTabelaB: true, percent: 0.10 };
    case "comercial_nao_tributado_tabela_b":
      return { useTabelaB: true, percent: 1.0 };
    case "comercial":
      return { useTabelaB: true, percent: 1.0 };
    case "ligeiro_2500kg":
      return { useTabelaB: false, percent: 0.40 };
    case "passageiros_gpl":
      return { useTabelaB: false, percent: 1.0 };
    case "passageiros_gn":
      return { useTabelaB: false, percent: 0.40 };
    case "hibrido_veiculo":
      return { useTabelaB: false, percent: 1.0 };
    case "hibrido_plugin_veiculo":
      return { useTabelaB: false, percent: 1.0 };
    case "hibrido_plugin_euro6e":
      return { useTabelaB: false, percent: 1.0 };
    case "autocaravana":
      return { useTabelaB: true, percent: 0.80 };
    case "moto":
      return { useTabelaB: false, percent: 1.0 };
    case "eletrico":
      return { useTabelaB: false, percent: 1.0 };
    case "anterior1970":
      return { useTabelaB: true, percent: 0.20 };
    default:
      return { useTabelaB: false, percent: 1.0 };
  }
}

/**
 * Verifica se o veículo é híbrido plug-in elegível para desconto.
 * Regras:
 * - 2021-2025: ≥50km autonomia E <50g/km CO2 → 25% (paga 25%)
 * - 2015-2020: ≥25km autonomia (sem limite CO2) → 25% (paga 25%)
 * - 2026+ Euro 6e-bis: ≥50km E ≤80g/km CO2 → 25% (paga 25%)
 */
function getHybridDiscount(input: IsvInput): number {
  // Híbrido clássico (auto-recarregável): paga 60% → desconto 40%
  if (input.fuel === "hibrido") {
    return HYBRID_DISCOUNT; // 0.40
  }

  // Híbrido plug-in: paga 25% → desconto 75%
  if (input.fuel === "hibrido_plugin") {
    const year = input.year;
    const range = input.electricRange ?? 0;
    const co2 = input.co2;

    // 2026+ com norma Euro 6e-bis: ≥50km E ≤80g/km
    if (year >= 2026 && input.isEuro6eBis) {
      if (range >= 50 && co2 <= 80) return PHEV_DISCOUNT;
      return 0; // não cumpre → 100%
    }

    // 2021-2025: ≥50km E <50g/km
    if (year >= 2021 && year <= 2025) {
      if (range >= 50 && co2 < 50) return PHEV_DISCOUNT;
      return 0; // não cumpre → 100%
    }

    // 2015-2020: ≥25km (sem limite CO2)
    if (year >= 2015 && year <= 2020) {
      if (range >= 25) return PHEV_DISCOUNT;
      return 0; // não cumpre → 100%
    }

    return 0;
  }

  return 0;
}

export function calculateIsv(input: IsvInput): IsvBreakdown {
  const version = "Tabelas ISV 2026 (OE2026)";

  // --- ISENÇÕES ---
  if (input.vehicleType === "eletrico") {
    return createIsvBreakdown(0, 0, 0, 0, 0, 0, true, "Veículo 100% Elétrico — Isento de ISV", version);
  }
  if (input.transferResidence) {
    return createIsvBreakdown(0, 0, 0, 0, 0, 0, true, "Transferência de Residência — Isento de ISV", version);
  }

  // --- Mapa de combustível para tabela CO2 ---
  const tableKey = FUEL_TO_CO2_TABLE[input.fuel];
  if (tableKey === undefined) {
    return createIsvBreakdown(0, 0, 0, 0, 0, 0, true, `Combustível "${input.fuel}" não suportado`, version);
  }

  // Determina tabela CC e percentagem
  const { useTabelaB, percent: vehiclePercent } = getVehiclePayPercent(input);

  // 1) Componente Cilindrada
  const ccTable = useTabelaB ? CC_MERCADORIAS : CC_PASSAGEIROS;
  let ccComponent: number;
  if (useTabelaB) {
    const b = ccTable.find(b => input.cc <= b.limit) ?? ccTable[ccTable.length - 1];
    ccComponent = input.cc * b.rate - b.deductible;
  } else {
    const b = ccTable.find(b => input.cc <= b.limit) ?? ccTable[ccTable.length - 1];
    ccComponent = input.cc * b.rate - b.deductible;
  }

  // 2) Componente Ambiental
  let co2Component: number;
  if (tableKey === "gasolina") {
    const b = getCo2BracGasolina(input.co2, input.cycle);
    co2Component = input.co2 * b.rate - b.deductible;
  } else {
    const b = getCo2BracGasoleo(input.co2, input.cycle);
    co2Component = input.co2 * b.rate - b.deductible;
  }

  // 3) Agravamento partículas (apenas gasóleo)
  const dieselSurcharge = calcDieselSurcharge(input.fuel, input.particles);

  // 4) ISV bruto (antes de reduções/descontos)
  const isvGross = ccComponent + co2Component;

  // 5) Redução para usados importados da UE
  let ageReductionPercent = 0;
  let ageDiscount = 0;
  if (input.origin === "ue" && input.condition === "usado") {
    const age = calcAge(input.year, input.month, input.day);
    ageReductionPercent = getAgeReduction(age);
    ageDiscount = isvGross * (ageReductionPercent / 100);
  }

  // 6) Aplicar percentagem do tipo de veículo, redução idade e agravamento diesel
  let isvAfterAge = (isvGross - ageDiscount) * vehiclePercent + dieselSurcharge;

  // 7) Descontos híbrido (aplicados APÓS percentagem do veículo)
  const hybridDiscount = getHybridDiscount(input);
  if (hybridDiscount > 0) {
    isvAfterAge *= (1 - hybridDiscount);
  }

  // 8) ISV final — nunca negativo, arredondado a 2 casas decimais
  const finalTotal = Math.max(0, Math.round(isvAfterAge * 100) / 100);

  // Mensagem informativa
  let extraMsg: string | undefined;
  if (input.fuel === "hibrido") {
    extraMsg = "Híbrido clássico — paga 60% do ISV";
  } else if (input.fuel === "hibrido_plugin") {
    if (hybridDiscount > 0) {
      extraMsg = "Híbrido plug-in elegível — paga 25% do ISV";
    } else {
      extraMsg = "Híbrido plug-in não elegível — paga 100% do ISV";
    }
  } else if (vehiclePercent < 1.0) {
    extraMsg = `Taxa intermédia: ${(vehiclePercent * 100).toFixed(0)}% do imposto`;
  }

  return createIsvBreakdown(
    ccComponent,
    co2Component,
    isvGross,
    ageReductionPercent,
    ageDiscount,
    finalTotal,
    false,
    extraMsg,
    version,
  );
}
