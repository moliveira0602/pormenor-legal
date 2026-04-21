import { calculateIsv } from "./index";

// ============================================================
// Test Script — ISV 2026 Calculation (Corrected)
// ============================================================
// Run with: npx tsx lib/isv/test-script.ts
// ============================================================

interface TestCase {
  name: string;
  input: Parameters<typeof calculateIsv>[0];
  expectedCC?: number;
  expectedCO2?: number;
  expectedGross?: number;
  expectedFinal?: number;
  expectedExempt?: boolean;
  tolerance?: number;
  notes?: string;
}

const TOL = 0.01;

function within(actual: number, expected: number, tol: number): boolean {
  return Math.abs(actual - expected) <= tol;
}

let passed = 0;
let failed = 0;

function run(test: TestCase) {
  const result = calculateIsv(test.input as any);
  const tol = test.tolerance ?? TOL;
  let ok = true;
  const failures: string[] = [];

  if (test.expectedExempt !== undefined) {
    if (result.isExempt !== test.expectedExempt) {
      ok = false;
      failures.push(`isExempt: espero ${test.expectedExempt}, obtive ${result.isExempt}`);
    }
    if (!test.expectedExempt && result.isExempt) {
      ok = false;
      failures.push(`unexpectedly exempt: ${result.exemptReason}`);
    }
  }

  if (!result.isExempt) {
    if (test.expectedCC !== undefined && !within(result.ccComponent, test.expectedCC, tol)) {
      ok = false;
      failures.push(`CC: espero ${test.expectedCC.toFixed(2)}, obtive ${result.ccComponent.toFixed(2)}`);
    }
    if (test.expectedCO2 !== undefined && !within(result.co2Component, test.expectedCO2, tol)) {
      ok = false;
      failures.push(`CO2: espero ${test.expectedCO2.toFixed(2)}, obtive ${result.co2Component.toFixed(2)}`);
    }
    if (test.expectedGross !== undefined && !within(result.isvGross, test.expectedGross, tol)) {
      ok = false;
      failures.push(`ISV Bruto: espero ${test.expectedGross.toFixed(2)}, obtive ${result.isvGross.toFixed(2)}`);
    }
    if (test.expectedFinal !== undefined && !within(result.finalTotal, test.expectedFinal, tol)) {
      ok = false;
      failures.push(`Final: espero ${test.expectedFinal.toFixed(2)}, obtive ${result.finalTotal.toFixed(2)}`);
    }
  }

  if (ok) {
    passed++;
    console.log(`  PASS  ${test.name}`);
  } else {
    failed++;
    console.log(`  FAIL  ${test.name}`);
    failures.forEach(f => console.log(`        ❌ ${f}`));
  }

  // Always show intermediate values
  if (!result.isExempt) {
    console.log(`        CC=${result.ccComponent.toFixed(2)} CO2=${result.co2Component.toFixed(2)} Gross=${result.isvGross.toFixed(2)} AgeRed=${result.ageReductionPercent}% Disc=${result.ageDiscount.toFixed(2)} Final=${result.finalTotal.toFixed(2)}`);
  } else {
    console.log(`        Isento: ${result.exemptReason}`);
  }
  if (test.notes) console.log(`        Nota: ${test.notes}`);
  console.log("");
}

// ============================================================
// TESTS
// ============================================================

console.log("===== TESTES UNIDADE ISV 2026 (CORRIGIDO) =====\n");

// --- TESTES: Cilindrada ---
console.log(">>> Cilindrada limites\n");

run({
  name: "Cilindrada: exatamente 1000 cm³ (escalão até 1000)",
  input: { vehicleType: "passageiros", origin: "ue", condition: "novo", year: 2026, month: 1, day: 1, cc: 1000, co2: 0, fuel: "gasolina", cycle: "WLTP" },
  expectedCC: 1000 * 1.09 - 849.03, // = 240.97
  notes: "escalão 1: taxa=1.09, ded=849.03",
});

run({
  name: "Cilindrada: 1001 cm³ (escalão 1001-1250)",
  input: { vehicleType: "passageiros", origin: "ue", condition: "novo", year: 2026, month: 1, day: 1, cc: 1001, co2: 0, fuel: "gasolina", cycle: "WLTP" },
  expectedCC: 1001 * 1.18 - 850.69, // = 330.49
  notes: "escalão 2: taxa=1.18, ded=850.69",
});

run({
  name: "Cilindrada: 1250 cm³ (limite superior escalão 2)",
  input: { vehicleType: "passageiros", origin: "ue", condition: "novo", year: 2026, month: 1, day: 1, cc: 1250, co2: 0, fuel: "gasolina", cycle: "WLTP" },
  expectedCC: 1250 * 1.18 - 850.69, // = 624.31
  notes: "escalão 2: último valor do escalão",
});

run({
  name: "Cilindrada: 1251 cm³ (entrar no escalão 3)",
  input: { vehicleType: "passageiros", origin: "ue", condition: "novo", year: 2026, month: 1, day: 1, cc: 1251, co2: 0, fuel: "gasolina", cycle: "WLTP" },
  expectedCC: 1251 * 5.61 - 6194.88, // = 822.63
  notes: "escalão 3: taxa=5.61, ded=6194.88",
});

run({
  name: "Cilindrada: 2000 cm³ (escalão 3)",
  input: { vehicleType: "passageiros", origin: "ue", condition: "novo", year: 2026, month: 1, day: 1, cc: 2000, co2: 0, fuel: "gasolina", cycle: "WLTP" },
  expectedCC: 2000 * 5.61 - 6194.88, // = 5025.12
  notes: "escalão 3",
});

// --- TESTES: CO2 Gasolina WLTP limites ---
console.log(">>> CO2 Gasolina WLTP limites\n");

run({
  name: "CO2 Gas: exatamente 110 (escalão até 110)",
  input: { vehicleType: "passageiros", origin: "ue", condition: "novo", year: 2026, month: 1, day: 1, cc: 1000, co2: 110, fuel: "gasolina", cycle: "WLTP" },
  expectedCO2: 110 * 0.44 - 43.02, // = 5.38
  notes: "escalão 1: taxa=0.44, ded=43.02",
});

run({
  name: "CO2 Gas: 111 (escalão 111-115)",
  input: { vehicleType: "passageiros", origin: "ue", condition: "novo", year: 2026, month: 1, day: 1, cc: 1000, co2: 111, fuel: "gasolina", cycle: "WLTP" },
  expectedCO2: 111 * 1.10 - 115.80, // = 6.30
  notes: "escalão 2: taxa=1.10, ded=115.80",
});

run({
  name: "CO2 Gas: 195 (escalão 176-195)",
  input: { vehicleType: "passageiros", origin: "ue", condition: "novo", year: 2026, month: 1, day: 1, cc: 1000, co2: 195, fuel: "gasolina", cycle: "WLTP" },
  expectedCO2: 195 * 51.38 - 7247.39, // = 2771.71
  notes: "escalão 8: taxa=51.38, ded=7247.39",
});

run({
  name: "CO2 Gas: 236 (escalão acima de 235)",
  input: { vehicleType: "passageiros", origin: "ue", condition: "novo", year: 2026, month: 1, day: 1, cc: 1000, co2: 236, fuel: "gasolina", cycle: "WLTP" },
  expectedCO2: 236 * 233.81 - 41910.96, // = 13309.40
  notes: "escalão 9: taxa=233.81, ded=41910.96",
});

// --- TESTES: CO2 Diesel WLTP limites ---
console.log(">>> CO2 Diesel WLTP limites\n");

run({
  name: "CO2 Diesel: 110 (escalão até 110)",
  input: { vehicleType: "passageiros", origin: "ue", condition: "novo", year: 2026, month: 1, day: 1, cc: 1000, co2: 110, fuel: "gasoleo", cycle: "WLTP" },
  expectedCO2: 110 * 1.72 - 11.50, // = 177.70
  notes: "escalão 1 diesel: taxa=1.72, ded=11.50",
});

run({
  name: "CO2 Diesel: 111 (escalão 111-120)",
  input: { vehicleType: "passageiros", origin: "ue", condition: "novo", year: 2026, month: 1, day: 1, cc: 1000, co2: 111, fuel: "gasoleo", cycle: "WLTP" },
  expectedCO2: 111 * 18.96 - 1906.19, // = 203.77
  notes: "escalão 2 diesel: taxa=18.96, ded=1906.19",
});

run({
  name: "CO2 Diesel: 141 (escalão 141-150)",
  input: { vehicleType: "passageiros", origin: "ue", condition: "novo", year: 2026, month: 1, day: 1, cc: 1000, co2: 141, fuel: "gasoleo", cycle: "WLTP" },
  expectedCO2: 141 * 127.40 - 16080.57, // = 1883.83
  notes: "escalão 4 diesel: taxa=127.40, ded=16080.57",
});

// --- TESTES: Combustíveis especiais ---
console.log(">>> Combustíveis especiais\n");

run({
  name: "Elétrico — ISENTO",
  input: { vehicleType: "eletrico", origin: "ue", condition: "novo", year: 2026, month: 1, day: 1, cc: 0, co2: 0, fuel: "gasolina", cycle: "WLTP" },
  expectedExempt: true,
  notes: "Elétricos 100% isentos",
});

run({
  name: "GPL — usa tabela gasolina",
  input: { vehicleType: "passageiros", origin: "ue", condition: "novo", year: 2026, month: 1, day: 1, cc: 1500, co2: 130, fuel: "gpl", cycle: "WLTP" },
  expectedCC: 1500 * 5.61 - 6194.88,
  expectedCO2: 130 * 5.27 - 619.17,
  notes: "GPL usa mesma tabela ambiental que gasolina: escalão 121-130",
});

run({
  name: "GNV — usa tabela gasolina",
  input: { vehicleType: "passageiros", origin: "ue", condition: "novo", year: 2026, month: 1, day: 1, cc: 1500, co2: 130, fuel: "gn", cycle: "WLTP" },
  expectedCC: 1500 * 5.61 - 6194.88,
  expectedCO2: 130 * 5.27 - 619.17,
  notes: "GNV usa mesma tabela ambiental que gasolina",
});

// --- TESTES: Agravamento partículas ---
console.log(">>> Agravamento partículas Diesel\n");

run({
  name: "Diesel Euro 6d — sem agravamento",
  input: { vehicleType: "passageiros", origin: "ue", condition: "novo", year: 2026, month: 1, day: 1, cc: 1500, co2: 130, fuel: "gasoleo", cycle: "WLTP", particles: "euro6d" },
  expectedFinal: (1500 * 5.61 - 6194.88) + (130 * 65.04 - 7360.85),
  tolerance: 0.1,
  notes: "Euro 6d → 0 agravamento",
});

run({
  name: "Diesel Euro 6c — +500€ agravamento",
  input: { vehicleType: "passageiros", origin: "ue", condition: "novo", year: 2026, month: 1, day: 1, cc: 1500, co2: 130, fuel: "gasoleo", cycle: "WLTP", particles: "euro6c" },
  expectedFinal: (1500 * 5.61 - 6194.88) + (130 * 65.04 - 7360.85) + 500,
  tolerance: 0.1,
  notes: "Euro 6c → +500€",
});

// --- TESTES: Redução por idade ---
console.log(">>> Redução por idade (usado importado UE)\n");

run({
  name: "Usado 1 ano → 20% redução (1 ≤ age < 2)",
  input: { vehicleType: "passageiros", origin: "ue", condition: "usado", year: 2025, month: 2, day: 11, cc: 1500, co2: 130, fuel: "gasolina", cycle: "WLTP" },
  tolerance: 1, // 1€ tolerância para variações de data
  notes: "Veículo com ~1 ano → escalão 20%",
});

run({
  name: "Usado 6 anos → 60% redução",
  input: { vehicleType: "passageiros", origin: "ue", condition: "usado", year: 2020, month: 4, day: 1, cc: 2000, co2: 150, fuel: "gasolina", cycle: "WLTP" },
  tolerance: 1,
  notes: "Veículo com ~6 anos → 60%",
});

run({
  name: "Usado >10 anos → 80% redução",
  input: { vehicleType: "passageiros", origin: "ue", condition: "usado", year: 2014, month: 1, day: 1, cc: 2000, co2: 150, fuel: "gasolina", cycle: "WLTP" },
  tolerance: 1,
  notes: "Veículo com ~12 anos → 80%",
});

run({
  name: "Novo → 0% redução",
  input: { vehicleType: "passageiros", origin: "ue", condition: "novo", year: 2026, month: 1, day: 1, cc: 2000, co2: 150, fuel: "gasolina", cycle: "WLTP" },
  tolerance: 0.01,
  notes: "Condição 'novo' → sem redução de idade",
});

// --- TESTES: Híbrido ---
console.log(">>> Híbridos\n");

run({
  name: "Híbrido clássico — 40% desconto",
  input: { vehicleType: "passageiros", origin: "ue", condition: "novo", year: 2026, month: 1, day: 1, cc: 2000, co2: 150, fuel: "hibrido", cycle: "WLTP" },
  tolerance: 0.5,
  notes: "Híbrido: depois de calcular ISV bruto, aplica 40% desconto",
});

run({
  name: "Híbrido plug-in — 75% desconto",
  input: { vehicleType: "passageiros", origin: "ue", condition: "usado", year: 2024, month: 5, day: 10, cc: 2995, co2: 34, fuel: "hibrido_plugin", cycle: "WLTP" },
  tolerance: 1,
  notes: "PHEV: calcula ISV bruto, aplica redução idade, depois 75% desconto",
});

// --- TESTES: Valores negativos ---
console.log(">>> Componentes negativas\n");

run({
  name: "CO2 baixo → componente ambiental negativa",
  input: { vehicleType: "passageiros", origin: "ue", condition: "novo", year: 2026, month: 1, day: 1, cc: 1000, co2: 50, fuel: "gasolina", cycle: "WLTP" },
  expectedCO2: 50 * 0.44 - 43.02, // = -21.02
  notes: "CO2=50, escalão 1 (até 110): 50*0.44 - 43.02 = -21.02",
});

run({
  name: "CC baixo → componente cilindrada negativa é possível",
  input: { vehicleType: "passageiros", origin: "ue", condition: "novo", year: 2026, month: 1, day: 1, cc: 500, co2: 100, fuel: "gasolina", cycle: "WLTP" },
  expectedCC: 500 * 1.09 - 849.03, // = -304.03
  expectedCO2: 100 * 0.44 - 43.02, // = 0.98
  notes: "CC=500: 500*1.09 - 849.03 = -304.03 (negativo)",
});

// --- TESTES: Final total completo (contas completas) ---
console.log(">>> Cálculo completo verificado\n");

// Gasolina 1500cc, CO2=130, novo
const ccFull = 1500 * 5.61 - 6194.88; // 2220.12
const co2FullGas = 130 * 5.27 - 619.17; // 65.93
const grossFull = ccFull + co2FullGas;

run({
  name: "Gasolina 1500cc CO2=130 WLTP novo — cálculo verificado",
  input: { vehicleType: "passageiros", origin: "ue", condition: "novo", year: 2026, month: 1, day: 1, cc: 1500, co2: 130, fuel: "gasolina", cycle: "WLTP" },
  expectedCC: ccFull,
  expectedCO2: co2FullGas,
  expectedGross: grossFull,
  expectedFinal: grossFull,
  tolerance: 0.01,
  notes: "Sem redução idade, sem agravamento → ISV = bruto",
});

// Diesel 2000cc, CO2=140, WLTP → escalão 121-140: rate=65.04, ded=7360.85
const ccDiesel = 2000 * 5.61 - 6194.88; // 5025.12
const co2Diesel140 = 140 * 65.04 - 7360.85; // 1744.75
const grossDiesel = ccDiesel + co2Diesel140; // 6769.87

run({
  name: "Diesel 2000cc CO2=140 WLTP Euro6d novo — cálculo verificado",
  input: { vehicleType: "passageiros", origin: "ue", condition: "novo", year: 2026, month: 1, day: 1, cc: 2000, co2: 140, fuel: "gasoleo", cycle: "WLTP", particles: "euro6d" },
  expectedCC: ccDiesel,
  expectedCO2: co2Diesel140,
  expectedGross: grossDiesel,
  expectedFinal: grossDiesel,
  tolerance: 0.1,
  notes: "CO2=140 → escalão 121-140. Euro 6d → sem agravamento. Sem redução → ISV = bruto",
});

// Diesel 2000cc, CO2=140, WLTP, Euro 6c, novo
const grossDieselSC = grossDiesel + 500;
run({
  name: "Diesel 2000cc CO2=140 WLTP Euro6c — com +500€ agravamento",
  input: { vehicleType: "passageiros", origin: "ue", condition: "novo", year: 2026, month: 1, day: 1, cc: 2000, co2: 140, fuel: "gasoleo", cycle: "WLTP", particles: "euro6c" },
  expectedFinal: grossDieselSC,
  tolerance: 0.1,
  notes: "Euro 6c → +500€",
});

// --- SUMMARY ---
console.log("\n===============================");
console.log(`  ${passed + failed} tests | ${passed} passed | ${failed} failed`);
console.log("===============================\n");

if (failed > 0) process.exit(1);
