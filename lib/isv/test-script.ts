import { calculateIsv, IsvInput } from "./index";

console.log("Running ISV Calculation Tests...\n");

const tests: { name: string; input: IsvInput; expectedTotal?: number; tolerance?: number }[] = [
  {
    name: "Example 1: Small Car Petrol (1000cc, 95g CO2 NEDC, New)",
    input: {
      fuel: "gasolina",
      condition: "novo",
      year: 2026, // Current year
      month: 1,
      day: 1,
      cc: 1000,
      co2: 95,
      origin: "eu",
      category: "M1",
      cycle: "NEDC",
    },
    // CC: 1000 * 1.09 - 849.03 = 1090 - 849.03 = 240.97
    // CO2: 95 * 4.62 - 427.00 = 438.9 - 427 = 11.9
    // Total: 252.87
  },
  {
    name: "Example 2: Used Import (5 years old, EU) - 43% reduction",
    input: {
      fuel: "gasolina",
      condition: "usado",
      year: 2021, // 5 years old approx
      month: 1,
      day: 1,
      cc: 1000,
      co2: 95,
      origin: "eu",
      category: "M1",
      cycle: "NEDC",
    },
    // Base Total: 252.87
    // Reduction: 43% -> 108.73
    // Final: 144.14
  },
  {
    name: "Example 3: Diesel Surcharge (Particles > 0.001)",
    input: {
      fuel: "diesel",
      condition: "novo",
      year: 2026,
      month: 1,
      day: 1,
      cc: 1500,
      co2: 120,
      particles: 0.002,
      origin: "eu",
      category: "M1",
      cycle: "WLTP",
    },
    // CC: 1500 * 5.61 - 6194.88 = 8415 - 6194.88 = 2220.12
    // CO2 (Diesel WLTP): 120 * 18.96 - 1906.19 = 2275.2 - 1906.19 = 369.01
    // Total Base: 2589.13
    // Surcharge: 500
    // Final: 3089.13
  },
   {
    name: "Example 4: PHEV Exempt (Range 60km, CO2 40g) - 75% reduction",
    input: {
      fuel: "hibrido",
      condition: "novo",
      hybridKind: "phev",
      electricRange: 60,
      year: 2026,
      month: 1,
      day: 1,
      cc: 1500,
      co2: 40,
      origin: "eu",
      category: "M1",
      cycle: "WLTP",
    },
    // CC: 2220.12
    // CO2 (Petrol WLTP): 40 * 0.44 - 43.02 = 17.6 - 43.02 = 0 (min 0)
    // Total Base: 2220.12
    // Reduction 75%: 1665.09
    // Final: 555.03
  },
  {
    name: "Example 5: Used PHEV (5 years old) - Age Reduction + Hybrid Reduction",
    input: {
      fuel: "hibrido",
      condition: "usado",
      hybridKind: "phev",
      electricRange: 60,
      year: 2021,
      month: 1,
      day: 1,
      cc: 1500,
      co2: 40,
      origin: "eu",
      category: "M1",
      cycle: "WLTP",
    },
    // Base Total: 2220.12
    // Age Reduction (43%): 954.65
    // Subtotal: 1265.47
    // Hybrid Reduction (75% of 1265.47): 949.10
    // Final: 316.37
  },
];

for (const test of tests) {
  try {
    const result = calculateIsv(test.input);
    console.log(`Test: ${test.name}`);
    console.log(`  Input: ${JSON.stringify(test.input)}`);
    console.log(`  Result: ${result.finalTotal.toFixed(2)} €`);
    console.log(`  Breakdown: CC=${result.cc.subtotal.toFixed(2)}, CO2=${result.co2.subtotal.toFixed(2)}, AgeRed=${result.ageReduction.amount.toFixed(2)}, HybridRed=${result.hybridReduction.amount.toFixed(2)}, DieselSur=${result.dieselSurcharge}`);
    console.log("---------------------------------------------------");
  } catch (e) {
    console.error(`Test ${test.name} Failed:`, e);
  }
}
