export * from "./types";
export { calculateIsv } from "./calculation";

import type { IsvBreakdown } from "./types";

export function createIsvBreakdown(
  ccComponent: number,
  co2Component: number,
  isvGross: number,
  ageReductionPercent: number,
  ageDiscount: number,
  finalTotal: number,
  isExempt: boolean,
  exemptReason?: string,
  version = "Tabelas ISV 2026 (OE2026)",
): IsvBreakdown {
  return {
    ccComponent,
    co2Component,
    isvGross,
    ageReductionPercent,
    ageDiscount,
    finalTotal,
    isExempt,
    exemptReason,
    version,
  };
}
