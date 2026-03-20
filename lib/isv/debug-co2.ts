import { IUC_TABLES_2026_CARS } from "./tables";

// Debug CO2 rate matching
export function debugCo2Rates() {
  const tables = IUC_TABLES_2026_CARS;
  const categoryB = tables.categories.B;
  
  console.log("NEDC CO2 Rates:");
  categoryB.co2RatesNEDC?.forEach(rate => {
    console.log(`CO2 ${rate.minCo2}-${rate.maxCo2}: ${rate.rate}€`);
  });
  
  console.log("\nWLTP CO2 Rates:");
  categoryB.co2RatesWLTP?.forEach(rate => {
    console.log(`CO2 ${rate.minCo2}-${rate.maxCo2}: ${rate.rate}€`);
  });
  
  // Test specific values
  const testValues = [150, 160, 130, 140];
  
  testValues.forEach(co2 => {
    console.log(`\nTesting CO2: ${co2}`);
    
    // NEDC
    const nedcRate = categoryB.co2RatesNEDC?.find(r => co2 >= r.minCo2 && co2 <= r.maxCo2);
    console.log(`NEDC: ${nedcRate ? nedcRate.rate : 'Not found'}`);
    
    // WLTP
    const wltpRate = categoryB.co2RatesWLTP?.find(r => co2 >= r.minCo2 && co2 <= r.maxCo2);
    console.log(`WLTP: ${wltpRate ? wltpRate.rate : 'Not found'}`);
  });
}

if (require.main === module) {
  debugCo2Rates();
}