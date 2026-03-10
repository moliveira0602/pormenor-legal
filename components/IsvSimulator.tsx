"use client";

import { useState } from "react";
import { calculateIsv, IsvInput, IsvBreakdown, FuelType, Origin, VehicleCategory, Cycle, HybridKind, VehicleCondition } from "../lib/isv";

// Initial form state
const INITIAL_FORM: IsvInput = {
  fuel: "diesel",
  condition: "usado",
  year: new Date().getFullYear(),
  month: 1,
  cc: 0,
  co2: 0,
  particles: 0,
  origin: "eu",
  category: "M1",
  cycle: "WLTP",
  hybridKind: "hev",
  electricRange: 0,
  transferResidence: false,
  disability: false,
  taxi: false,
  largeFamily: false,
};

export default function IsvSimulator() {
  const [form, setForm] = useState<IsvInput>(INITIAL_FORM);
  const [result, setResult] = useState<IsvBreakdown | null>(null);
  const [error, setError] = useState("");

  const handleChange =
    (field: keyof IsvInput) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value =
        e.target instanceof HTMLInputElement && e.target.type === "checkbox"
          ? e.target.checked
          : e.target.type === "number" || field === "year" || field === "month" || field === "cc" || field === "co2" || field === "particles" || field === "electricRange"
          ? Number(e.target.value)
          : e.target.value;
      
      setForm((prev) => ({ ...prev, [field]: value }));
      setResult(null);
      setError("");
    };

  const handleCalculate = () => {
    // Basic validation
    if (!form.cc || !form.co2 || !form.year) {
      setError("Por favor preencha os campos obrigatórios (Ano, Cilindrada, CO2).");
      return;
    }
    if (form.year < 1900 || form.year > new Date().getFullYear() + 1) {
        setError("Ano inválido.");
        return;
    }

    try {
      const res = calculateIsv(form);
      setResult(res);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Ocorreu um erro ao calcular o ISV. Verifique os dados inseridos.");
    }
  };

  const inputClass =
    "w-full h-[50px] rounded-xl border-[1.5px] border-[var(--border)] px-3.5 text-navy font-body text-[0.95rem] bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/12 transition-all";

  const showHybridKind = form.fuel === "hibrido";
  const showParticles = form.fuel === "diesel";
  const showElectricRange = form.fuel === "hibrido" && form.hybridKind === "phev";

  // Helper to format currency
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("pt-PT", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(val);

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
            Calcule o imposto estimado para a sua importação (Regras 2025/2026)
          </p>
        </div>

        <div className="bg-white rounded-3xl p-10 border border-[var(--border)] shadow-[0_4px_32px_rgba(7,17,43,0.07)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Condition */}
            <div className="flex flex-col gap-2">
              <label className="text-[0.78rem] font-bold text-navy uppercase tracking-wider">
                Estado do Veículo
              </label>
              <select className={inputClass} value={form.condition} onChange={handleChange("condition")}>
                <option value="usado">Usado (Importado)</option>
                <option value="novo">Novo (0 km)</option>
              </select>
            </div>

            {/* Fuel */}
            <div className="flex flex-col gap-2">
              <label className="text-[0.78rem] font-bold text-navy uppercase tracking-wider">
                Tipo de Combustível
              </label>
              <select className={inputClass} value={form.fuel} onChange={handleChange("fuel")}>
                <option value="diesel">Diesel</option>
                <option value="gasolina">Gasolina</option>
                <option value="hibrido">Híbrido</option>
                <option value="eletrico">Elétrico</option>
                <option value="gpl">GPL/Gás Natural</option>
              </select>
            </div>

            {/* Hybrid Kind */}
            {showHybridKind && (
              <div className="flex flex-col gap-2">
                <label className="text-[0.78rem] font-bold text-navy uppercase tracking-wider">
                  Tipo de Híbrido
                </label>
                <select className={inputClass} value={form.hybridKind} onChange={handleChange("hybridKind")}>
                  <option value="hev">HEV (Híbrido Convencional)</option>
                  <option value="mhev">MHEV (Mild Hybrid)</option>
                  <option value="phev">PHEV (Plug-in)</option>
                </select>
              </div>
            )}

             {/* Electric Range (for PHEV) */}
             {showElectricRange && (
              <div className="flex flex-col gap-2">
                <label className="text-[0.78rem] font-bold text-navy uppercase tracking-wider">
                  Autonomia Elétrica (km)
                </label>
                <input
                  className={inputClass}
                  type="number"
                  placeholder="Ex: 55"
                  value={form.electricRange || ""}
                  onChange={handleChange("electricRange")}
                />
              </div>
            )}

            {/* Year & Month */}
            <div className="flex flex-col gap-2">
              <label className="text-[0.78rem] font-bold text-navy uppercase tracking-wider">
                Ano da Matrícula
              </label>
              <input
                className={inputClass}
                type="number"
                placeholder="Ex: 2021"
                min={1980}
                max={new Date().getFullYear()}
                value={form.year || ""}
                onChange={handleChange("year")}
              />
            </div>
             <div className="flex flex-col gap-2">
              <label className="text-[0.78rem] font-bold text-navy uppercase tracking-wider">
                Mês da Matrícula
              </label>
              <select className={inputClass} value={form.month} onChange={handleChange("month")}>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* CC */}
            <div className="flex flex-col gap-2">
              <label className="text-[0.78rem] font-bold text-navy uppercase tracking-wider">
                Cilindrada (cm³)
              </label>
              <input
                className={inputClass}
                type="number"
                placeholder="Ex: 1995"
                value={form.cc || ""}
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
                value={form.co2 || ""}
                onChange={handleChange("co2")}
              />
            </div>

             {/* Particles (Diesel) */}
             {showParticles && (
              <div className="flex flex-col gap-2">
                <label className="text-[0.78rem] font-bold text-navy uppercase tracking-wider">
                  Partículas (g/km)
                </label>
                <input
                  className={inputClass}
                  type="number"
                  step="0.0001"
                  placeholder="Ex: 0.0005"
                  value={form.particles !== undefined ? form.particles : ""}
                  onChange={handleChange("particles")}
                />
                 <p className="text-[10px] text-gray-400 mt-1">Se desconhecido, deixe em branco (será assumido &gt; 0.001 se carro antigo)</p>
              </div>
            )}

            {/* Origin */}
            <div className="flex flex-col gap-2">
              <label className="text-[0.78rem] font-bold text-navy uppercase tracking-wider">
                País de Origem
              </label>
              <select className={inputClass} value={form.origin} onChange={handleChange("origin")}>
                <option value="eu">União Europeia (Com Desconto Idade)</option>
                <option value="noneu">Fora da UE (Sem Desconto Idade)</option>
              </select>
            </div>

            {/* Cycle */}
            <div className="flex flex-col gap-2">
              <label className="text-[0.78rem] font-bold text-navy uppercase tracking-wider">
                Ciclo de Medição CO₂
              </label>
              <select className={inputClass} value={form.cycle} onChange={handleChange("cycle")}>
                <option value="WLTP">WLTP (Normalmente após 2018)</option>
                <option value="NEDC">NEDC (Antigo)</option>
              </select>
            </div>

            {/* Checkboxes */}
            <div className="flex items-center gap-3 lg:col-span-3 mt-4">
                <div className="flex items-center gap-2">
                    <input id="transferResidence" type="checkbox" checked={form.transferResidence} onChange={handleChange("transferResidence")} className="h-5 w-5 rounded border-[var(--border)]" />
                    <label htmlFor="transferResidence" className="text-sm text-navy">Mudança de residência (Isento)</label>
                </div>
            </div>
             {/* 
                Disabling special reductions for now as they require complex validation logic not fully implemented.
                User can see "Isento" if Transfer Residence is checked.
             */}
          </div>

          <div className="mt-8 flex items-center justify-center">
            <button
              onClick={handleCalculate}
              className="w-full md:w-auto px-8 h-[50px] bg-navy hover:bg-primary text-white rounded-xl font-display font-bold text-[0.95rem] flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25"
            >
              <span className="material-symbols-outlined text-xl">calculate</span>
              Calcular ISV
            </button>
          </div>

          {error && (
            <p className="mt-4 text-red-500 text-sm font-medium text-center">{error}</p>
          )}

          {result && (
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Total Card */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-navy to-[#1a2f5e] text-white flex flex-col justify-center">
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">
                  Total a Pagar
                </p>
                <p className="font-display font-extrabold text-[2.5rem] leading-none">
                  {result.isExempt
                    ? "Isento"
                    : formatCurrency(result.finalTotal)}
                </p>
                {result.isExempt && result.exemptReason && (
                    <p className="text-white/80 text-sm mt-2">{result.exemptReason}</p>
                )}
                 {!result.isExempt && (
                     <div className="mt-4 space-y-1">
                        <p className="text-white/40 text-xs">
                        Versão: {result.version}
                        </p>
                        <p className="text-white/40 text-xs">
                        * Valor indicativo. Confirmar sempre junto da AT.
                        </p>
                     </div>
                 )}
              </div>

              {/* Breakdown Card */}
              {!result.isExempt && (
                <div className="p-6 rounded-2xl bg-white border border-[var(--border)]">
                  <p className="text-muted text-xs font-bold uppercase tracking-widest mb-4">
                    Detalhe do Cálculo
                  </p>
                  <ul className="space-y-3 text-sm text-navy">
                    <li className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <span>Componente Cilindrada</span>
                        <span className="font-semibold">{formatCurrency(result.cc.subtotal)}</span>
                    </li>
                    <li className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <span>Componente Ambiental (CO₂)</span>
                        <span className="font-semibold">{formatCurrency(result.co2.subtotal)}</span>
                    </li>
                    {result.dieselSurcharge > 0 && (
                        <li className="flex justify-between items-center border-b border-gray-100 pb-2 text-red-600">
                            <span>Agravamento Diesel</span>
                            <span className="font-semibold">+{formatCurrency(result.dieselSurcharge)}</span>
                        </li>
                    )}
                     <li className="flex justify-between items-center border-b border-gray-100 pb-2 bg-gray-50 p-2 rounded">
                        <span className="font-bold">Total Bruto</span>
                        <span className="font-bold">{formatCurrency(result.totalBeforeReductions + result.dieselSurcharge)}</span>
                    </li>
                    {result.ageReduction.amount > 0 && (
                         <li className="flex justify-between items-center text-green-600">
                            <span>Redução Idade ({result.ageReduction.percent}%)</span>
                            <span className="font-semibold">-{formatCurrency(result.ageReduction.amount)}</span>
                        </li>
                    )}
                    {result.hybridReduction.amount > 0 && (
                         <li className="flex justify-between items-center text-green-600">
                            <span>Benefício Híbrido ({result.hybridReduction.percent}%)</span>
                            <span className="font-semibold">-{formatCurrency(result.hybridReduction.amount)}</span>
                        </li>
                    )}
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
