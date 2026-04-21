// Quick PHEV verification
import { calculateIsv } from "./lib/isv/index.js";

console.log("=== PHEV CHECK ===\n");

const r = calculateIsv({
  vehicleType: "passageiros",
  origin: "ue",
  condition: "usado",
  year: 2024,
  month: 5,
  day: 10,
  cc: 2995,
  co2: 34,
  fuel: "hibrido_plugin",
  cycle: "WLTP",
  particles: "desconhecido",
});

console.log("CC:", r.ccComponent.toFixed(2), "€");
console.log("CO2:", r.co2Component.toFixed(2), "€");
console.log("ISV Bruto:", r.isvGross.toFixed(2), "€");
console.log("Redução idade:", r.ageReductionPercent, "%");
console.log("Desconto idade:", r.ageDiscount.toFixed(2), "€");
console.log("Final:", r.finalTotal, "€ (esperado: 2114.40€)");
