"use client";

import { useMemo, useState } from "react";

type FuelType = "diesel" | "gasolina" | "hibrido" | "eletrico";
type Origin = "eu" | "noneu";
type VehicleCategory = "M1" | "N1";
type Cycle = "NEDC" | "WLTP";
type HybridKind = "mhev" | "hev" | "phev";
type EuroNorm = "Euro 4" | "Euro 5" | "Euro 6" | "Euro 6d";

interface FormState {
  fuel: FuelType;
  year: string;
  cc: string;
  co2: string;
  origin: Origin;
  category: VehicleCategory;
  cycle: Cycle;
  hybridKind?: HybridKind;
  euro?: EuroNorm;
  transferResidence: boolean;
  disability: boolean;
  taxi: boolean;
  largeFamily: boolean;
}

interface ISVResult {
  value: number | null;
  isExempt: boolean;
  breakdown?: {
    ccComponent: number;
    co2Component: number;
    depreciationFactor: number;
    fuelFactor: number;
    cycleFactor: number;
    categoryFactor: number;
    originFactor: number;
    reductionsFactor: number;
  };
}

function depreciationFactor(year: number) {
  const age = Math.max(0, 2026 - year);
  if (age <= 1) return 0.9;
  if (age <= 2) return 0.8;
  if (age <= 3) return 0.72;
  if (age <= 4) return 0.65;
  if (age <= 5) return 0.57;
  if (age <= 6) return 0.48;
  if (age <= 7) return 0.4;
  if (age <= 8) return 0.35;
  if (age <= 9) return 0.3;
  if (age <= 10) return 0.25;
  return 0.2;
}

function calcISVValue(form: FormState): ISVResult {
  const year = parseInt(form.year);
  const cc = parseInt(form.cc);
  const co2 = parseInt(form.co2);

  if (!cc || !co2 || !year) return { value: null, isExempt: false };
  if (form.fuel === "eletrico" || form.transferResidence) return { value: null, isExempt: true };

  const depreciation = depreciationFactor(year);

  const ccBase =
    cc <= 1000 ? 750 :
    cc <= 1300 ? 1900 :
    cc <= 1600 ? 3100 :
    cc <= 2000 ? 5200 :
    cc <= 2500 ? 9500 : 14000;

  const co2Tax =
    co2 <= 95  ? 0 :
    co2 <= 115 ? co2 * 8 :
    co2 <= 145 ? co2 * 22 :
    co2 <= 175 ? co2 * 45 :
    co2 * 85;

  const fuelMult = form.fuel === "hibrido"
    ? (form.hybridKind === "phev" ? 0.25 : form.hybridKind === "mhev" ? 0.6 : 0.4)
    : form.fuel === "gasolina" ? 1.05 : 1;
  const cycleMult = form.cycle === "WLTP" ? 1.06 : 1;
  const categoryMult = form.category === "N1" ? 0.7 : 1;
  const originMult = form.origin === "noneu" ? 1.23 : 1;
  const reductionsMult =
    (form.disability ? 0.5 : 1) *
    (form.taxi ? 0.3 : 1) *
    (form.largeFamily ? 0.8 : 1);

  const base = ccBase + co2Tax;
  const totalRaw = base * depreciation * fuelMult * cycleMult * categoryMult * originMult * reductionsMult;
  const total = Math.max(0, Math.round(totalRaw / 10) * 10);
  return {
    value: total,
    isExempt: false,
    breakdown: {
      ccComponent: Math.round(ccBase),
      co2Component: Math.round(co2Tax),
      depreciationFactor: depreciation,
      fuelFactor: fuelMult,
      cycleFactor: cycleMult,
      categoryFactor: categoryMult,
      originFactor: originMult,
      reductionsFactor: reductionsMult,
    },
  };
}

export default function IsvSimulator() {
  const [form, setForm] = useState<FormState>({
    fuel: "diesel",
    year: "",
    cc: "",
    co2: "",
    origin: "eu",
    category: "M1",
    cycle: "WLTP",
    hybridKind: "hev",
    euro: "Euro 6",
    transferResidence: false,
    disability: false,
    taxi: false,
    largeFamily: false,
  });
  const [result, setResult] = useState<ISVResult | null>(null);
  const [error, setError] = useState("");

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value =
        e.target instanceof HTMLInputElement && e.target.type === "checkbox"
          ? e.target.checked
          : e.target.value;
      setForm((prev) => ({ ...prev, [field]: value as any }));
      setResult(null);
      setError("");
    };

  const handleCalculate = () => {
    if (!form.cc || !form.co2 || !form.year) {
      setError("Por favor preencha todos os campos.");
      return;
    }
    setError("");
    setResult(calcISVValue(form));
  };

  const inputClass =
    "w-full h-[50px] rounded-xl border-[1.5px] border-[var(--border)] px-3.5 text-navy font-body text-[0.95rem] bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/12 transition-all";

  const showHybridKind = form.fuel === "hibrido";
  const isExemptAll = form.fuel === "eletrico" || form.transferResidence;

  return (
    <section className="py-24 px-6 bg-[var(--bg)]" id="isv">
      <div className="max-w-[900px] mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-widest mb-3">
            <span className="w-5 h-0.5 bg-primary inline-block" />
            Ferramenta Gratuita
          </div>
          <h2 className="font-display font-extrabold text-navy text-[2.2rem] tracking-tight">
            Simulador de ISV
          </h2>
          <p className="text-muted mt-2">
            Calcule o imposto estimado para a sua importação
          </p>
        </div>

        <div className="bg-white rounded-3xl p-10 border border-[var(--border)] shadow-[0_4px_32px_rgba(7,17,43,0.07)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[0.78rem] font-bold text-navy uppercase tracking-wider">
                Tipo de Combustível
              </label>
              <select className={inputClass} value={form.fuel} onChange={handleChange("fuel")}>
                <option value="diesel">Diesel</option>
                <option value="gasolina">Gasolina</option>
                <option value="hibrido">Híbrido</option>
                <option value="eletrico">Elétrico</option>
              </select>
            </div>

            {showHybridKind && (
              <div className="flex flex-col gap-2">
                <label className="text-[0.78rem] font-bold text-navy uppercase tracking-wider">
                  Tipo de Híbrido
                </label>
                <select className={inputClass} value={form.hybridKind} onChange={handleChange("hybridKind")}>
                  <option value="mhev">MHEV</option>
                  <option value="hev">HEV</option>
                  <option value="phev">PHEV</option>
                </select>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-[0.78rem] font-bold text-navy uppercase tracking-wider">
                Ano da Matrícula
              </label>
              <input
                className={inputClass}
                type="number"
                placeholder="Ex: 2021"
                min={1990}
                max={2025}
                value={form.year}
                onChange={handleChange("year")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[0.78rem] font-bold text-navy uppercase tracking-wider">
                Cilindrada (cm³)
              </label>
              <input
                className={inputClass}
                type="number"
                placeholder="Ex: 1995"
                value={form.cc}
                onChange={handleChange("cc")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[0.78rem] font-bold text-navy uppercase tracking-wider">
                Emissões CO₂ (g/km)
              </label>
              <input
                className={inputClass}
                type="number"
                placeholder="Ex: 120"
                value={form.co2}
                onChange={handleChange("co2")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[0.78rem] font-bold text-navy uppercase tracking-wider">
                País de Origem
              </label>
              <select className={inputClass} value={form.origin} onChange={handleChange("origin")}>
                <option value="eu">União Europeia</option>
                <option value="noneu">Fora da UE</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[0.78rem] font-bold text-navy uppercase tracking-wider">
                Categoria
              </label>
              <select className={inputClass} value={form.category} onChange={handleChange("category")}>
                <option value="M1">M1 (ligeiro passageiros)</option>
                <option value="N1">N1 (ligeiro mercadorias)</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[0.78rem] font-bold text-navy uppercase tracking-wider">
                Ciclo de Medição CO₂
              </label>
              <select className={inputClass} value={form.cycle} onChange={handleChange("cycle")}>
                <option value="WLTP">WLTP</option>
                <option value="NEDC">NEDC</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[0.78rem] font-bold text-navy uppercase tracking-wider">
                Norma Euro
              </label>
              <select className={inputClass} value={form.euro} onChange={handleChange("euro")}>
                <option>Euro 4</option>
                <option>Euro 5</option>
                <option>Euro 6</option>
                <option>Euro 6d</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <input id="transferResidence" type="checkbox" checked={form.transferResidence} onChange={handleChange("transferResidence")} className="h-5 w-5 rounded border-[var(--border)]" />
              <label htmlFor="transferResidence" className="text-sm text-navy">Mudança de residência (isento)</label>
            </div>
            <div className="flex items-center gap-3">
              <input id="disability" type="checkbox" checked={form.disability} onChange={handleChange("disability")} className="h-5 w-5 rounded border-[var(--border)]" />
              <label htmlFor="disability" className="text-sm text-navy">Deficiência motora</label>
            </div>
            <div className="flex items-center gap-3">
              <input id="taxi" type="checkbox" checked={form.taxi} onChange={handleChange("taxi")} className="h-5 w-5 rounded border-[var(--border)]" />
              <label htmlFor="taxi" className="text-sm text-navy">Táxi</label>
            </div>
            <div className="flex items-center gap-3">
              <input id="largeFamily" type="checkbox" checked={form.largeFamily} onChange={handleChange("largeFamily")} className="h-5 w-5 rounded border-[var(--border)]" />
              <label htmlFor="largeFamily" className="text-sm text-navy">Família numerosa</label>
            </div>

            <div className="flex items-end justify-center md:col-span-2 lg:col-span-3">
              <button
                onClick={handleCalculate}
                className="w-full md:w-auto px-8 h-[50px] bg-navy hover:bg-primary text-white rounded-xl font-display font-bold text-[0.95rem] flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25"
              >
                <span className="material-symbols-outlined text-xl">calculate</span>
                Calcular ISV
              </button>
            </div>
          </div>

          {error && (
            <p className="mt-4 text-red-500 text-sm font-medium">{error}</p>
          )}

          {result && (
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-navy to-[#1a2f5e]">
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest">
                  ISV Estimado
                </p>
                <p className="font-display font-extrabold text-white text-[2.2rem] mt-1">
                  {result.isExempt
                    ? "Isento"
                    : result.value !== null
                    ? new Intl.NumberFormat("pt-PT", {
                        style: "currency",
                        currency: "EUR",
                        maximumFractionDigits: 0,
                      }).format(result.value)
                    : "—"}
                </p>
                <p className="text-white/40 text-xs mt-2">
                  * Estimativa indicativa. Valor final sujeito a avaliação oficial pela AT.
                </p>
              </div>
              {!result.isExempt && result.breakdown && (
                <div className="p-6 rounded-2xl bg-white border border-[var(--border)]">
                  <p className="text-muted text-xs font-bold uppercase tracking-widest">
                    Detalhe de Cálculo
                  </p>
                  <ul className="mt-3 text-sm text-navy space-y-1.5">
                    <li>Componente cilindrada: {new Intl.NumberFormat("pt-PT").format(result.breakdown.ccComponent)} €</li>
                    <li>Componente CO₂: {new Intl.NumberFormat("pt-PT").format(result.breakdown.co2Component)} €</li>
                    <li>Fator depreciação: ×{result.breakdown.depreciationFactor.toFixed(2)}</li>
                    <li>Fator combustível: ×{result.breakdown.fuelFactor.toFixed(2)}</li>
                    <li>Fator ciclo CO₂: ×{result.breakdown.cycleFactor.toFixed(2)}</li>
                    <li>Fator categoria: ×{result.breakdown.categoryFactor.toFixed(2)}</li>
                    <li>Fator origem: ×{result.breakdown.originFactor.toFixed(2)}</li>
                    <li>Reduções: ×{result.breakdown.reductionsFactor.toFixed(2)}</li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
