// Tipos para cálculo IUC (Imposto Único de Circulação)
export type IucCategory = "A" | "B" | "C" | "D" | "E" | "F" | "G";
export type VehicleType = "carro" | "moto" | "outro";
export type FuelType = "diesel" | "gasolina" | "gpl" | "elétrico" | "híbrido";
export type CO2Standard = "NEDC" | "WLTP";
export type Origin = "national" | "import";

export interface IucInput {
  category: IucCategory;
  vehicleType: VehicleType;
  fuel: FuelType;
  year: number;
  month: number;
  day: number;
  cc: number;
  co2: number;
  co2Standard: CO2Standard;
  origin: Origin;
}

export interface IucBreakdown {
  totalIUC: number;
  breakdown: {
    baseAmount: number;
    co2Surcharge: number;
    ageSurcharge: number;
    reductions: number;
  };
  details: {
    category: string;
    vehicleAge: number;
    isHistoric: boolean;
    isElectric: boolean;
  };
}

// Tabela de IUC 2025/2026 (valores aproximados em €)
// Categorias baseadas em emissões de CO2
const IUC_TABLE: Record<IucCategory, number> = {
  'A': 0,      // ≤ 120 g/km (gasolina) ou ≤ 100 g/km (diesel)
  'B': 15.36,  // 121-140 g/km (gasolina) ou 101-120 g/km (diesel)
  'C': 30.73,  // 141-160 g/km (gasolina) ou 121-140 g/km (diesel)
  'D': 46.09,  // 161-180 g/km (gasolina) ou 141-160 g/km (diesel)
  'E': 61.46,  // 181-200 g/km (gasolina) ou 161-180 g/km (diesel)
  'F': 76.82,  // 201-250 g/km (gasolina) ou 181-230 g/km (diesel)
  'G': 138.40, // > 250 g/km (gasolina) ou > 230 g/km (diesel)
};

// Agravamento por idade do veículo (por ano após 5 anos)
const AGE_SURCHARGE_PER_YEAR = 0.65;

// Descontos para veículos elétricos
const ELECTRIC_DISCOUNT = 0.75; // 75% de desconto
const HYBRID_DISCOUNT = 0.50;   // 50% de desconto para híbridos plug-in

// Função para calcular idade do veículo
function calculateVehicleAge(year: number, month: number, day: number): number {
  const currentDate = new Date();
  const vehicleDate = new Date(year, month - 1, day);

  let age = currentDate.getFullYear() - vehicleDate.getFullYear();

  // Ajustar se ainda não fez aniversário este ano
  if (currentDate.getMonth() < vehicleDate.getMonth() ||
      (currentDate.getMonth() === vehicleDate.getMonth() && currentDate.getDate() < vehicleDate.getDate())) {
    age--;
  }

  return Math.max(0, age);
}

// Função para determinar categoria baseada em CO2
function getCategoryFromCO2(co2: number, fuel: FuelType, co2Standard: CO2Standard): IucCategory {
  // Ajustar CO2 se for WLTP para NEDC (aproximadamente +20%)
  const adjustedCO2 = co2Standard === "WLTP" ? co2 * 0.83 : co2;

  // Limites diferentes para gasolina e diesel
  if (fuel === "diesel" || fuel === "gpl") {
    if (adjustedCO2 <= 100) return 'A';
    if (adjustedCO2 <= 120) return 'B';
    if (adjustedCO2 <= 140) return 'C';
    if (adjustedCO2 <= 160) return 'D';
    if (adjustedCO2 <= 180) return 'E';
    if (adjustedCO2 <= 230) return 'F';
    return 'G';
  } else {
    // Gasolina, híbridos
    if (adjustedCO2 <= 120) return 'A';
    if (adjustedCO2 <= 140) return 'B';
    if (adjustedCO2 <= 160) return 'C';
    if (adjustedCO2 <= 180) return 'D';
    if (adjustedCO2 <= 200) return 'E';
    if (adjustedCO2 <= 250) return 'F';
    return 'G';
  }
}

// Função principal de cálculo IUC
export function calculateIuc(input: IucInput): IucBreakdown {
  // Validação básica
  if (!input.cc || !input.co2 || !input.year) {
    throw new Error("Campos obrigatórios não preenchidos");
  }

  // Calcular idade do veículo
  const vehicleAge = calculateVehicleAge(input.year, input.month, input.day);
  const isHistoric = vehicleAge >= 30;
  const isElectric = input.fuel === "elétrico";

  // Determinar categoria
  const category = getCategoryFromCO2(input.co2, input.fuel, input.co2Standard);

  // Valor base da categoria
  const baseAmount = IUC_TABLE[category];

  // Agravamento por idade (após 5 anos)
  let ageSurcharge = 0;
  if (vehicleAge > 5 && !isHistoric) {
    const yearsOver5 = vehicleAge - 5;
    ageSurcharge = yearsOver5 * AGE_SURCHARGE_PER_YEAR;
  }

  // Sobretaxa de CO2 (adicional para veículos mais poluentes)
  let co2Surcharge = 0;
  if (category === 'F' || category === 'G') {
    co2Surcharge = baseAmount * 0.10; // 10% adicional para categorias altas
  }

  // Reduções para veículos ecológicos
  let reductions = 0;
  if (isElectric) {
    reductions = baseAmount * ELECTRIC_DISCOUNT;
  } else if (input.fuel === "híbrido") {
    reductions = baseAmount * HYBRID_DISCOUNT;
  }

  // Veículos históricos (mais de 30 anos) pagam taxa fixa reduzida
  let totalIUC = 0;
  if (isHistoric) {
    totalIUC = 15.00; // Taxa fixa para veículos históricos
  } else {
    totalIUC = baseAmount + ageSurcharge + co2Surcharge - reductions;
  }

  // Garantir que não seja negativo
  totalIUC = Math.max(0, totalIUC);

  return {
    totalIUC,
    breakdown: {
      baseAmount,
      co2Surcharge,
      ageSurcharge,
      reductions
    },
    details: {
      category: category,
      vehicleAge,
      isHistoric,
      isElectric
    }
  };
}

// Função para formatar moeda
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

// Função para obter descrição da categoria
export function getCategoryDescription(category: IucCategory): string {
  const descriptions: Record<IucCategory, string> = {
    'A': 'Baixas emissões',
    'B': 'Emissões reduzidas',
    'C': 'Emissões moderadas',
    'D': 'Emissões médias',
    'E': 'Emissões elevadas',
    'F': 'Emissões muito elevadas',
    'G': 'Emissões extremas'
  };
  return descriptions[category];
}