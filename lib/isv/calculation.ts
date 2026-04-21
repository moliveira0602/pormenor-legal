import { createIsvBreakdown } from "./index";
import type { IsvBreakdown, IsvInput } from "./types";
import {
  CC_PASSAGEIROS,
  CO2_GASOLINA_WLTP,
  CO2_GASOLEO_WLTP,
  AGE_REDUCTION,
  FUEL_TO_CO2_TABLE,
  HYBRID_DISCOUNT,
  PHEV_DISCOUNT,
} from "./tables";

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
function getCo2BracGasolina(co2: number): { rate: number; deductible: number } {
  for (const b of CO2_GASOLINA_WLTP) {
    if (co2 <= b.limit) return { rate: b.rate, deductible: b.deductible };
  }
  const last = CO2_GASOLINA_WLTP[CO2_GASOLINA_WLTP.length - 1];
  return { rate: last.rate, deductible: last.deductible };
}

/**
 * Obtém o escalão de CO2 para diesel/gasóleo (WLTP).
 */
function getCo2BracGasoleo(co2: number): { rate: number; deductible: number } {
  for (const b of CO2_GASOLEO_WLTP) {
    if (co2 <= b.limit) return { rate: b.rate, deductible: b.deductible };
  }
  const last = CO2_GASOLEO_WLTP[CO2_GASOLEO_WLTP.length - 1];
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
  // Euro 6d / 6d-temp → sem agravação (estão abaixo do limiar de 0.001 g/km)
  const norm = particles ?? "desconhecido";
  if (norm === "euro6d" || norm === "euro6dtemp") return 0;
  // Todas as outras normas + desconhecido → +500€
  return 500;
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
  // gasolina, gpl, gn → gasolina | gasoleo → gasoleo
  const tableKey = FUEL_TO_CO2_TABLE[input.fuel];
  if (tableKey === undefined) {
    return createIsvBreakdown(0, 0, 0, 0, 0, 0, true, `Combustível "${input.fuel}" não suportado`, version);
  }

  // 1) Componente Cilindrada
  //    fórmula: cc * taxa - abatimento (escalão único)
  const ccBrac = getCcBrac(input.cc);
  const ccComponent = input.cc * ccBrac.rate - ccBrac.deductible;

  // 2) Componente Ambiental
  //    fórmula: co2 * taxa - abatimento (escalão único)
  let co2Component: number;
  if (tableKey === "gasolina") {
    const b = getCo2BracGasolina(input.co2);
    co2Component = input.co2 * b.rate - b.deductible;
  } else {
    const b = getCo2BracGasoleo(input.co2);
    co2Component = input.co2 * b.rate - b.deductible;
  }

  // 3) Agravamento partículas (apenas gasóleo)
  const dieselSurcharge = calcDieselSurcharge(input.fuel, input.particles);

  // 4) ISV bruto = componente_cilindrada + componente_ambiental + agravamento
  //    (arredondar apenas no final, manter precisão intermédia)
  let isvGross = ccComponent + co2Component + dieselSurcharge;

  // 5) Redução para usados importados da UE — aplica-se ao TOTAL BRUTO
  let ageReductionPercent = 0;
  let ageDiscount = 0;
  if (input.origin === "ue" && input.condition === "usado") {
    const age = calcAge(input.year, input.month, input.day);
    ageReductionPercent = getAgeReduction(age);
    ageDiscount = isvGross * (ageReductionPercent / 100);
  }

  let isvAfterAge = isvGross - ageDiscount;

  // 6) Descontos híbrido (aplicados APÓS redução de idade)
  if (input.fuel === "hibrido") {
    // Híbrido clássico: 40% desconto
    isvAfterAge *= (1 - HYBRID_DISCOUNT);
  }
  if (input.fuel === "hibrido_plugin") {
    // Plug-in híbrido: 75% desconto
    isvAfterAge *= (1 - PHEV_DISCOUNT);
  }

  // 7) ISV final — nunca negativo, arredondado a 2 casas decimais
  const finalTotal = Math.max(0, Math.round(isvAfterAge * 100) / 100);

  // Mensagem de desconto híbrido (para debug/UI)
  const extraMsg = input.fuel === "hibrido"
    ? "Híbrido clássico (40% desconto)"
    : input.fuel === "hibrido_plugin"
      ? "Híbrido plug-in (75% desconto)"
      : undefined;

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
