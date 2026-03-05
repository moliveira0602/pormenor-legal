"use client";

import { useState } from "react";

type FuelType = "diesel" | "gasolina" | "hibrido" | "eletrico";
type Origin = "eu" | "noneu";

interface FormState {
  fuel: FuelType;
  year: string;
  cc: string;
  co2: string;
  origin: Origin;
}

interface ISVResult {
  value: number | null;
  isExempt: boolean;
}

function calcISVValue(form: FormState): ISVResult {
  const year = parseInt(form.year);
  const cc = parseInt(form.cc);
  const co2 = parseInt(form.co2);

  if (!cc || !co2 || !year) return { value: null, isExempt: false };
  if (form.fuel === "eletrico") return { value: null, isExempt: true };

  const age = Math.max(0, 2024 - year);
  const depreciation = Math.max(0.1, 1 - age * 0.1);

  // CC component
  const ccBase =
    cc <= 1000 ? 750 :
    cc <= 1300 ? 1900 :
    cc <= 1600 ? 3100 :
    cc <= 2000 ? 5200 :
    cc <= 2500 ? 9500 : 14000;

  // CO2 component
  const co2Tax =
    co2 <= 95  ? 0 :
    co2 <= 115 ? co2 * 8 :
    co2 <= 145 ? co2 * 22 :
    co2 <= 175 ? co2 * 45 :
    co2 * 85;

  const fuelMult = form.fuel === "hibrido" ? 0.4 : form.fuel === "gasolina" ? 1.05 : 1;
  const originMult = form.origin === "noneu" ? 1.23 : 1;

  const total = Math.round(((ccBase + co2Tax) * depreciation * fuelMult * originMult) / 50) * 50;
  return { value: total, isExempt: false };
}

export default function IsvSimulator() {
  const [form, setForm] = useState<FormState>({
    fuel: "diesel",
    year: "",
    cc: "",
    co2: "",
    origin: "eu",
  });
  const [result, setResult] = useState<ISVResult | null>(null);
  const [error, setError] = useState("");

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
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

  return (
    <section className="py-24 px-6 bg-[var(--bg)]" id="isv">
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
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

        {/* Card */}
        <div className="bg-white rounded-3xl p-10 border border-[var(--border)] shadow-[0_4px_32px_rgba(7,17,43,0.07)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Combustível */}
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

            {/* Ano */}
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

            {/* Cilindrada */}
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

            {/* CO2 */}
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

            {/* Origem */}
            <div className="flex flex-col gap-2">
              <label className="text-[0.78rem] font-bold text-navy uppercase tracking-wider">
                País de Origem
              </label>
              <select className={inputClass} value={form.origin} onChange={handleChange("origin")}>
                <option value="eu">União Europeia</option>
                <option value="noneu">Fora da UE</option>
              </select>
            </div>

            {/* Button */}
            <div className="flex items-end">
              <button
                onClick={handleCalculate}
                className="w-full h-[50px] bg-navy hover:bg-primary text-white rounded-xl font-display font-bold text-[0.95rem] flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25"
              >
                <span className="material-symbols-outlined text-xl">calculate</span>
                Calcular ISV
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="mt-4 text-red-500 text-sm font-medium">{error}</p>
          )}

          {/* Result */}
          {result && (
            <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-navy to-[#1a2f5e] animate-fade-slide">
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest">
                ISV Estimado
              </p>
              <p className="font-display font-extrabold text-white text-[2.2rem] mt-1">
                {result.isExempt
                  ? "Isento (Veículo Elétrico)"
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
          )}
        </div>
      </div>
    </section>
  );
}
