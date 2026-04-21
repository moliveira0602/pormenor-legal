import { calculateIsv as calcNew } from "./isv/calculation";
import { IsvInput as NewIsvInput, VehicleType, FuelType as NewFuel } from "./isv/types";

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
  particles?: boolean;
}

export interface IsvBreakdown {
  totalISV: number;
  breakdown: { ccComponent: number; co2Component: number; dieselSurcharge: number; ageReduction?: number };
  details: { ccRate: number; co2Rate: number; isNewVehicleTable: boolean; ageReductionPercent?: number };
}

const FUEL_MAP: Record<FuelType, NewIsvInput["fuel"]> = {
  "gasolina": "gasolina", "gasóleo": "gasoleo", "híbrido": "hibrido", "elétrico": "gasolina", "gpl": "gpl",
};
const CAT_MAP: Record<VehicleCategory, VehicleType> = {
  "ligeiro_passageiros": "passageiros", "comercial": "comercial", "motociclo": "moto", "outro": "passageiros",
};
const ORIGIN_MAP: Record<OriginCountry, NewIsvInput["origin"]> = { "ue": "ue", "pais_terceiro": "terceiro" };
const COND_MAP: Record<VehicleCondition, NewIsvInput["condition"]> = { "novo": "novo", "usado": "usado" };

export function calculateISV(input: IsvInput): IsvBreakdown {
  const r = calcNew({
    vehicleType: CAT_MAP[input.vehicleCategory],
    origin: ORIGIN_MAP[input.originCountry],
    condition: COND_MAP[input.vehicleCondition],
    year: input.registrationYear, month: 6, day: 1,
    cc: input.engineCC, co2: input.co2Emissions,
    fuel: FUEL_MAP[input.fuelType], cycle: "WLTP",
    particles: input.particles ? "euro6d" : "sem_norma",
  });
  return {
    totalISV: r.finalTotal,
    breakdown: {
      ccComponent: r.ccComponent, co2Component: r.co2Component,
      dieselSurcharge: 0, ageReduction: r.ageDiscount,
    },
    details: {
      ccRate: input.engineCC > 0 ? r.ccComponent / input.engineCC : 0,
      co2Rate: input.co2Emissions > 0 ? r.co2Component / input.co2Emissions : 0,
      isNewVehicleTable: input.originCountry === "pais_terceiro" || input.vehicleCondition === "novo",
      ageReductionPercent: r.ageReductionPercent,
    },
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR" }).format(value);
}