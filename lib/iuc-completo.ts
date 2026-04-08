// Tipos para cálculo IUC completo
export type RegistrationCountry = "pt_ue" | "outro";
export type RegistrationPeriod = "ate_1980" | "1981_2007" | "2007_2026";
export type VehicleCategoryIUC = "A" | "B" | "C" | "D" | "E" | "F" | "G";

export interface IucInput {
  country: RegistrationCountry;
  period: RegistrationPeriod;
  specificYear?: number;
  engineCC: number;
  co2Emissions?: number;
}

export interface IucResult {
  annualIUC: number;
  breakdown: {
    baseValue: number;
    co2Component?: number;
    ageSurcharge?: number;
    reductions?: number;
  };
  details: {
    category: VehicleCategoryIUC;
    description: string;
    vehicleAge: number;
    isHistoric: boolean;
  };
}

// Tabela IUC 2026 para veículos até 1980 (taxa fixa reduzida)
const IUC_TABLE_ATE_1980 = {
  CARROS: 15.00,
  MOTOS: 8.00,
  OUTROS: 20.00
};

// Tabela IUC 2026 para veículos 1981-2007 (baseada apenas em cilindrada)
const IUC_TABLE_1981_2007 = [
  { maxCC: 125, value: 11.25 },
  { maxCC: 250, value: 22.50 },
  { maxCC: 350, value: 67.50 },
  { maxCC: 500, value: 112.50 },
  { maxCC: 750, value: 225.00 },
  { maxCC: 1000, value: 337.50 },
  { maxCC: 1250, value: 450.00 },
  { maxCC: 1500, value: 562.50 },
  { maxCC: 1750, value: 675.00 },
  { maxCC: 2000, value: 787.50 },
  { maxCC: 2500, value: 1012.50 },
  { maxCC: 3000, value: 1237.50 },
  { maxCC: Infinity, value: 1462.50 }
];

// Tabela IUC 2026 para veículos 2007-2026 (baseada em CO2)
// Categorias A-G conforme emissões
const IUC_TABLE_2007_2026 = {
  'A': 0,      // ≤ 120 g/km (gasolina) ou ≤ 100 g/km (diesel)
  'B': 15.36,  // 121-140 g/km (gasolina) ou 101-120 g/km (diesel)
  'C': 30.73,  // 141-160 g/km (gasolina) ou 121-140 g/km (diesel)
  'D': 46.09,  // 161-180 g/km (gasolina) ou 141-160 g/km (diesel)
  'E': 61.46,  // 181-200 g/km (gasolina) ou 161-180 g/km (diesel)
  'F': 76.82,  // 201-250 g/km (gasolina) ou 181-230 g/km (diesel)
  'G': 138.40  // > 250 g/km (gasolina) ou > 230 g/km (diesel)
};

// Agravamento por idade (após 5 anos) - €/ano
const AGE_SURCHARGE = 0.65;

// Reduções para veículos elétricos e híbridos
const ELECTRIC_DISCOUNT = 0.75; // 75% de desconto
const HYBRID_DISCOUNT = 0.50;   // 50% de desconto

// Função para determinar categoria baseada em CO2
function getCategoryFromCO2(co2: number): VehicleCategoryIUC {
  if (co2 <= 120) return 'A';
  if (co2 <= 140) return 'B';
  if (co2 <= 160) return 'C';
  if (co2 <= 180) return 'D';
  if (co2 <= 200) return 'E';
  if (co2 <= 250) return 'F';
  return 'G';
}

// Descrição das categorias
export function getCategoryDescription(category: VehicleCategoryIUC): string {
  const descriptions: Record<VehicleCategoryIUC, string> = {
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

// Função para calcular IUC para veículos até 1980
function calculateIucAte1980(engineCC: number): IucResult {
  const isMoto = engineCC <= 1250; // Simplificação
  const category: VehicleCategoryIUC = 'A'; // Categoria fixa para veículos históricos

  return {
    annualIUC: IUC_TABLE_ATE_1980.CARROS, // Taxa fixa reduzida
    breakdown: {
      baseValue: IUC_TABLE_ATE_1980.CARROS
    },
    details: {
      category,
      description: 'Veículo histórico (taxa fixa reduzida)',
      vehicleAge: 46, // Mínimo para 2026-1980
      isHistoric: true
    }
  };
}

// Função para calcular IUC para veículos 1981-2007
function calculateIuc1981_2007(engineCC: number, registrationYear: number): IucResult {
  // Encontrar valor na tabela por cilindrada
  const baseValue = IUC_TABLE_1981_2007.find(row => engineCC <= row.maxCC)?.value || 1462.50;

  // Agravamento por idade (veículos com mais de 5 anos)
  const vehicleAge = 2026 - registrationYear;
  let ageSurcharge = 0;
  if (vehicleAge > 5) {
    ageSurcharge = (vehicleAge - 5) * AGE_SURCHARGE;
  }

  // Determinar categoria simplificada (apenas para display)
  let category: VehicleCategoryIUC = 'D'; // Categoria média por padrão
  if (engineCC <= 1000) category = 'B';
  else if (engineCC <= 1500) category = 'C';
  else if (engineCC <= 2000) category = 'D';
  else if (engineCC <= 2500) category = 'E';
  else if (engineCC <= 3000) category = 'F';
  else category = 'G';

  const totalIUC = baseValue + ageSurcharge;

  return {
    annualIUC: totalIUC,
    breakdown: {
      baseValue,
      ageSurcharge: ageSurcharge > 0 ? ageSurcharge : undefined
    },
    details: {
      category,
      description: 'Cálculo baseado em cilindrada + agravamento idade',
      vehicleAge,
      isHistoric: vehicleAge >= 30
    }
  };
}

// Função para calcular IUC para veículos 2007-2026
function calculateIuc2007_2026(co2: number, engineCC: number, registrationYear: number): IucResult {
  // Determinar categoria por CO2
  const category = getCategoryFromCO2(co2);
  const baseValue = IUC_TABLE_2007_2026[category];

  // Agravamento por idade (após 5 anos)
  const vehicleAge = 2026 - registrationYear;
  let ageSurcharge = 0;
  if (vehicleAge > 5) {
    ageSurcharge = (vehicleAge - 5) * AGE_SURCHARGE;
  }

  // Sobretaxa para veículos mais poluentes (categorias F e G)
  let co2Surcharge = 0;
  if (category === 'F' || category === 'G') {
    co2Surcharge = baseValue * 0.10; // 10% adicional
  }

  const totalIUC = baseValue + ageSurcharge + co2Surcharge;

  return {
    annualIUC: totalIUC,
    breakdown: {
      baseValue,
      co2Component: co2Surcharge > 0 ? co2Surcharge : undefined,
      ageSurcharge: ageSurcharge > 0 ? ageSurcharge : undefined
    },
    details: {
      category,
      description: getCategoryDescription(category),
      vehicleAge,
      isHistoric: false // Veículos desta época não são históricos
    }
  };
}

// Função principal de cálculo
export function calculateCompleteIUC(input: IucInput): IucResult {
  // Validação básica
  if (!input.engineCC || input.engineCC <= 0) {
    throw new Error("Cilindrada obrigatória");
  }

  // Calcular baseado no período
  let result: IucResult;

  switch (input.period) {
    case "ate_1980":
      result = calculateIucAte1980(input.engineCC);
      break;

    case "1981_2007":
      // Usar ano específico se fornecido, senão usar 2000 como padrão
      const year1981_2007 = input.specificYear || 2000;
      result = calculateIuc1981_2007(input.engineCC, year1981_2007);
      break;

    case "2007_2026":
      if (!input.co2Emissions || input.co2Emissions <= 0) {
        throw new Error("Emissões de CO2 obrigatórias para veículos 2007-2026");
      }
      // Usar ano específico se fornecido, senão usar 2015 como padrão
      const year2007_2026 = input.specificYear || 2015;
      result = calculateIuc2007_2026(input.co2Emissions, input.engineCC, year2007_2026);
      break;

    default:
      throw new Error("Período de matrícula inválido");
  }

  return result;
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

// Opções de anos para dropdown
export function getYearOptions(period: RegistrationPeriod): number[] {
  switch (period) {
    case "ate_1980":
      return Array.from({ length: 1981 - 1900 }, (_, i) => 1980 - i);
    case "1981_2007":
      return Array.from({ length: 2007 - 1981 + 1 }, (_, i) => 2007 - i);
    case "2007_2026":
      return Array.from({ length: 2026 - 2007 + 1 }, (_, i) => 2026 - i);
    default:
      return [];
  }
}

// Opções de cilindradas comuns (em cc)
export const COMMON_ENGINE_CC = [
  50, 125, 250, 300, 400, 500, 600, 750, 900,
  1000, 1200, 1400, 1600, 1800, 2000,
  2200, 2400, 2600, 2800, 3000, 3500, 4000, 4500, 5000
];

// Opções de emissões CO2 comuns (em g/km)
export const COMMON_CO2_EMISSIONS = [
  80, 90, 100, 110, 120, 130, 140, 150, 160,
  170, 180, 190, 200, 210, 220, 230, 240, 250,
  260, 280, 300, 350, 400
];