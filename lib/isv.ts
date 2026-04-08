export type FuelType = "gasolina" | "gasóleo" | "híbrido" | "elétrico" | "gpl";
export type VehicleCategory = "ligeiro_passageiros" | "comercial" | "motociclo" | "outro";
export type OriginCountry = "ue" | "pais_terceiro";
export type VehicleCondition = "novo" | "usado";

export interface IsvInput {
  vehicleCategory: VehicleCategory;
  originCountry: OriginCountry;
  registrationYear: number;
  engineCC: number;
  co2Emissions: number;
  fuelType: FuelType;
  vehicleCondition: VehicleCondition;
  isUsed?: boolean; // apenas para UE
}

export interface IsvBreakdown {
  totalISV: number;
  breakdown: {
    ccComponent: number;
    co2Component: number;
    dieselSurcharge: number;
    ageReduction?: number;
    reductions?: number;
  };
  details: {
    ccRate: number;
    co2Rate: number;
    isNewVehicleTable: boolean;
    ageReductionPercent?: number;
  };
}

// Tabelas ISV 2026 (valores aproximados - consultar Portal das Finanças para valores exatos)
// Componente Cilindrada para veículos ligeiros de passageiros
const CC_TABLE_NEW = [
  { min: 0, max: 1250, rate: 0 },
  { min: 1250, max: 1750, rate: 2.15 },
  { min: 1750, max: 2500, rate: 4.88 },
  { min: 2500, max: 3000, rate: 7.46 },
  { min: 3000, max: 3500, rate: 9.54 },
  { min: 3500, max: Infinity, rate: 11.63 }
];

const CC_TABLE_USED = [
  { min: 0, max: 1250, rate: 0 },
  { min: 1250, max: 1750, rate: 1.72 },
  { min: 1750, max: 2500, rate: 3.90 },
  { min: 2500, max: 3000, rate: 5.97 },
  { min: 3000, max: 3500, rate: 7.63 },
  { min: 3500, max: Infinity, rate: 9.30 }
];

// Componente Ambiental (CO2) para veículos ligeiros de passageiros
const CO2_TABLE_NEW_GASOLINA = [
  { min: 0, max: 95, rate: 0 },
  { min: 95, max: 115, rate: 1.15 },
  { min: 115, max: 135, rate: 2.30 },
  { min: 135, max: Infinity, rate: 3.45 }
];

const CO2_TABLE_NEW_GASÓLEO = [
  { min: 0, max: 85, rate: 0 },
  { min: 85, max: 105, rate: 1.15 },
  { min: 105, max: 125, rate: 2.30 },
  { min: 125, max: Infinity, rate: 3.45 }
];

const CO2_TABLE_USED_GASOLINA = [
  { min: 0, max: 95, rate: 0 },
  { min: 95, max: 115, rate: 0.92 },
  { min: 115, max: 135, rate: 1.84 },
  { min: 135, max: Infinity, rate: 2.76 }
];

const CO2_TABLE_USED_GASÓLEO = [
  { min: 0, max: 85, rate: 0 },
  { min: 85, max: 105, rate: 0.92 },
  { min: 105, max: 125, rate: 1.84 },
  { min: 125, max: Infinity, rate: 2.76 }
];

// Tabela de redução por idade para veículos usados da UE
const AGE_REDUCTION_TABLE = [
  { minAge: 0, maxAge: 1, reduction: 0.10 },
  { minAge: 1, maxAge: 2, reduction: 0.20 },
  { minAge: 2, maxAge: 3, reduction: 0.28 },
  { minAge: 3, maxAge: 4, reduction: 0.35 },
  { minAge: 4, maxAge: 5, reduction: 0.43 },
  { minAge: 5, maxAge: 6, reduction: 0.50 },
  { minAge: 6, maxAge: 7, reduction: 0.57 },
  { minAge: 7, maxAge: 8, reduction: 0.64 },
  { minAge: 8, maxAge: 9, reduction: 0.71 },
  { minAge: 9, maxAge: 10, reduction: 0.78 },
  { minAge: 10, maxAge: Infinity, reduction: 0.80 }
];

// Agravamento para veículos a gasóleo
const DIESEL_SURCHARGE = 500;

// Funções auxiliares
function getAgeReductionPercent(vehicleAge: number): number {
  for (const row of AGE_REDUCTION_TABLE) {
    if (vehicleAge >= row.minAge && vehicleAge < row.maxAge) {
      return row.reduction;
    }
  }
  return 0.80; // mais de 10 anos
}

function getCCRate(cc: number, isNewVehicleTable: boolean): number {
  const table = isNewVehicleTable ? CC_TABLE_NEW : CC_TABLE_USED;
  for (const row of table) {
    if (cc >= row.min && cc < row.max) {
      return row.rate;
    }
  }
  return table[table.length - 1].rate;
}

function getCO2Rate(co2: number, fuelType: FuelType, isNewVehicleTable: boolean): number {
  // Para veículos elétricos, não há componente CO2
  if (fuelType === "elétrico") {
    return 0;
  }

  // Para híbridos e GPL, usar tabela de gasolina (ou aplicar reduções específicas)
  let table;
  if (isNewVehicleTable) {
    table = fuelType === "gasóleo" ? CO2_TABLE_NEW_GASÓLEO : CO2_TABLE_NEW_GASOLINA;
  } else {
    table = fuelType === "gasóleo" ? CO2_TABLE_USED_GASÓLEO : CO2_TABLE_USED_GASOLINA;
  }

  for (const row of table) {
    if (co2 >= row.min && co2 < row.max) {
      return row.rate;
    }
  }
  return table[table.length - 1].rate;
}

function calculateVehicleAge(registrationYear: number): number {
  const currentYear = new Date().getFullYear();
  return currentYear - registrationYear;
}

// Função principal de cálculo
export function calculateISV(input: IsvInput): IsvBreakdown {
  // Validação básica
  if (!input.engineCC || !input.co2Emissions || !input.registrationYear) {
    throw new Error("Campos obrigatórios não preenchidos");
  }

  // Determinar qual tabela usar
  const isNewVehicleTable = input.originCountry === "pais_terceiro" ||
                            (input.originCountry === "ue" && input.vehicleCondition === "novo");

  // Calcular idade do veículo (para redução)
  const vehicleAge = calculateVehicleAge(input.registrationYear);

  // Calcular componentes
  const ccRate = getCCRate(input.engineCC, isNewVehicleTable);
  const ccComponent = input.engineCC * ccRate;

  const co2Rate = getCO2Rate(input.co2Emissions, input.fuelType, isNewVehicleTable);
  const co2Component = input.co2Emissions * co2Rate;

  // Agravamento diesel
  const dieselSurcharge = input.fuelType === "gasóleo" ? DIESEL_SURCHARGE : 0;

  // Redução por idade (apenas para veículos usados da UE)
  let ageReduction = 0;
  let ageReductionPercent = 0;

  if (input.originCountry === "ue" && input.vehicleCondition === "usado") {
    ageReductionPercent = getAgeReductionPercent(vehicleAge);
    const totalBeforeReduction = ccComponent + co2Component + dieselSurcharge;
    ageReduction = totalBeforeReduction * ageReductionPercent;
  }

  // Total final
  const totalISV = ccComponent + co2Component + dieselSurcharge - ageReduction;

  return {
    totalISV,
    breakdown: {
      ccComponent,
      co2Component,
      dieselSurcharge,
      ageReduction,
      reductions: ageReduction
    },
    details: {
      ccRate,
      co2Rate,
      isNewVehicleTable,
      ageReductionPercent
    }
  };
}

// Função para formatação de moeda
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}