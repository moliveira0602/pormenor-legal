import { calculateIsv } from "./index";

console.log("=== ISV 2026 Calculator Tests ===\n");

const tests = [
  {
    name: "VALIDAÇÃO: PHEV 2995cc, 34g/km WLTP, Gasolina, 10/05/2024, Usado UE",
    input: {
      vehicleType: "passageiros" as const, origin: "ue" as const, condition: "usado" as const,
      year: 2024, month: 5, day: 10, cc: 2995, co2: 34,
      fuel: "hibrido_plugin" as const, cycle: "WLTP" as const,
    },
    expected: 2114.40,
  },
  {
    name: "Diesel com partículas Euro 6c (500€)",
    input: {
      vehicleType: "passageiros" as const, origin: "ue" as const, condition: "novo" as const,
      year: 2026, month: 1, day: 1, cc: 2000, co2: 140,
      fuel: "gasoleo" as const, cycle: "WLTP" as const, particles: "euro6c" as const,
    },
  },
  {
    name: "Diesel novo sem partículas (0€)",
    input: {
      vehicleType: "passageiros" as const, origin: "ue" as const, condition: "novo" as const,
      year: 2026, month: 1, day: 1, cc: 2000, co2: 140,
      fuel: "gasoleo" as const, cycle: "WLTP" as const, particles: "euro6d" as const,
    },
  },
  {
    name: "Novo (sem redução idade)",
    input: {
      vehicleType: "passageiros" as const, origin: "ue" as const, condition: "novo" as const,
      year: 2026, month: 1, day: 1, cc: 1500, co2: 120,
      fuel: "gasolina" as const, cycle: "WLTP" as const,
    },
  },
  {
    name: "Comercial ligeiro",
    input: {
      vehicleType: "comercial" as const, origin: "ue" as const, condition: "novo" as const,
      year: 2026, month: 1, day: 1, cc: 2000, co2: 0,
      fuel: "gasoleo" as const, cycle: "WLTP" as const,
    },
  },
  {
    name: "Motociclo 500cc",
    input: {
      vehicleType: "moto" as const, origin: "ue" as const, condition: "novo" as const,
      year: 2026, month: 1, day: 1, cc: 500, co2: 0,
      fuel: "gasolina" as const, cycle: "WLTP" as const,
    },
  },
  {
    name: "Elétrico (isento)",
    input: {
      vehicleType: "eletrico" as const, origin: "ue" as const, condition: "novo" as const,
      year: 2026, month: 1, day: 1, cc: 0, co2: 0,
      fuel: "gasolina" as const, cycle: "WLTP" as const,
    },
  },
  {
    name: "Usado >10 anos (80% redução)",
    input: {
      vehicleType: "passageiros" as const, origin: "ue" as const, condition: "usado" as const,
      year: 2014, month: 1, day: 1, cc: 2000, co2: 150,
      fuel: "gasolina" as const, cycle: "WLTP" as const,
    },
  },
];

for (const test of tests) {
  console.log(`--- ${test.name} ---`);
  const result = calculateIsv(test.input);
  if (result.isExempt) {
    console.log(`  ⚡ ISENTO: ${result.exemptReason}`);
  } else {
    console.log(`  CC: ${result.ccComponent.toFixed(2)} € | CO₂: ${result.co2Component.toFixed(2)} €`);
    console.log(`  Base: ${result.taxableBase.toFixed(2)} € | Taxa (${result.ccApplyPercent}%): ${result.totalAfterPercent.toFixed(2)} €`);
    if (result.ageDiscountTotal > 0) console.log(`  Idade: -${result.ageDiscountTotal.toFixed(2)} €`);
    if (result.dieselSurcharge > 0) console.log(`  Partículas: +${result.dieselSurcharge.toFixed(2)} €`);
    console.log(`  >>> TOTAL: ${result.finalTotal.toFixed(2)} €`);
    if (test.expected) {
      const diff = Math.abs(result.finalTotal - test.expected);
      console.log(`  ESPERADO: ${test.expected} € | DIFERENÇA: ${diff.toFixed(2)} € ${diff < 0.01 ? '✅' : '❌'}`);
    }
  }
  console.log("");
}