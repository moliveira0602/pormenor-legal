"use client";

import { useState } from "react";
import { calculateIuc, IucInput, IucBreakdown, VehicleCategory, FuelType } from "../lib/isv";

// Initial form state for IUC
const INITIAL_FORM: IucInput = {
  category: "M1",
  fuel: "diesel",
  year: new Date().getFullYear(),
  month: 1,
  day: 1,
  cc: 0,
  co2: 0,
  co2Standard: "NEDC",
  origin: "national",
};

export default function IucSimulator() {
  const [form, setForm] = useState<IucInput>(INITIAL_FORM);
  const [result, setResult] = useState<IucBreakdown | null>(null);
  const [error, setError] = useState("");
  const [dateStr, setDateStr] = useState(`${new Date().getFullYear()}-01-01`); // Initial date

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDateStr(val);
    if (val) {
        const [y, m, d] = val.split('-').map(Number);
        setForm(prev => ({ ...prev, year: y, month: m, day: d }));
        setResult(null);
        setError("");
    }
  };

  const handleChange =
    (field: keyof IucInput) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value =
        e.target instanceof HTMLInputElement && e.target.type === "checkbox"
          ? e.target.checked
          : e.target.type === "number" || field === "year" || field === "month" || field === "cc" || field === "co2"
          ? Number(e.target.value)
          : e.target.value;
      
      setForm((prev) => ({ ...prev, [field]: value }));
      setResult(null);
      setError("");
    };

  const handleCalculate = () => {
    // Basic validation
    if (!form.cc || !form.year) {
      setError("Por favor preencha os campos obrigatórios (Ano, Cilindrada).");
      return;
    }
    if (form.year < 1900 || form.year > new Date().getFullYear() + 1) {
        setError("Ano inválido.");
        return;
    }

    // Validate CO2 for Category B (matriculated after 2007-07-01)
    const registrationDate = new Date(form.year, form.month - 1, form.day);
    const thresholdDate = new Date(2007, 6, 1);
    const isCategoryB = registrationDate >= thresholdDate;
    
    if (isCategoryB && (!form.co2 || form.co2 <= 0)) {
      setError("CO2 obrigatório para veículos matriculados após 01/07/2007.");
      return;
    }

    // Validate category (only M1 supported)
    if (form.category !== "M1") {
      setError("Este simulador é apenas para veículos M1 (ligeiros de passageiros).");
      return;
    }

    try {
      const res = calculateIuc(form);
      setResult(res);
      setError("");
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Ocorreu um erro ao calcular o IUC. Verifique os dados inseridos.");
    }
  };

  const inputClass =
    "w-full h-[50px] rounded-xl border-[1.5px] border-[var(--border)] px-3.5 text-navy font-body text-[0.95rem] bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/12 transition-all";

  // Helper to format currency
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("pt-PT", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 2,
    }).format(val);

  return (
    <section className="py-24 px-6 bg-[var(--bg)]" id="iuc">
      <div className="max-w-[900px] mx-auto">

        <div className="bg-white rounded-3xl p-10 border border-[var(--border)] shadow-[0_4px_32px_rgba(7,17,43,0.07)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Category */}
            <div className="flex flex-col gap-2">
              <label className="text-[0.78rem] font-bold text-navy uppercase tracking-wider">
                Categoria do Veículo
              </label>
              <select className={inputClass} value={form.category} onChange={handleChange("category")}>
                <option value="M1">M1 - Automóvel ligeiro</option>
                <option value="N1">N1 - Veículo comercial ligeiro</option>
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

            {/* Date */}
            <div className="flex flex-col gap-2">
              <label className="text-[0.78rem] font-bold text-navy uppercase tracking-wider">
                Data da Primeira Matrícula
              </label>
              <input
                className={inputClass}
                type="date"
                value={dateStr}
                onChange={handleDateChange}
                max={new Date().toISOString().split('T')[0]}
              />
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
                Emissões CO2 (g/km)
              </label>
              <input
                className={inputClass}
                type="number"
                placeholder="Ex: 120"
                value={form.co2 || ""}
                onChange={handleChange("co2")}
              />
            </div>

            {/* Origin */}
            <div className="flex flex-col gap-2">
              <label className="text-[0.78rem] font-bold text-navy uppercase tracking-wider">
                Origem da Matrícula
              </label>
              <select className={inputClass} value={form.origin} onChange={handleChange("origin")}>
                <option value="national">Nacional</option>
                <option value="foreign">Estrangeira</option>
              </select>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center">
            <button
              onClick={handleCalculate}
              className="w-full md:w-auto px-8 h-[50px] bg-navy hover:bg-primary text-white rounded-xl font-display font-bold text-[0.95rem] flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25"
            >
              <span className="material-symbols-outlined text-xl">calculate</span>
              Calcular IUC
            </button>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-[10px] text-gray-400">
               * O cálculo não dispensa a consulta das tabelas oficiais da AT. Valores indicativos baseados nas regras em vigor (OE2025). <br/>
               Para veículos com mais de 25 anos, o IUC pode ser isento.
            </p>
          </div>

          {error && (
            <p className="mt-4 text-red-500 text-sm font-medium text-center">{error}</p>
          )}

          {result && (
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Total Card */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-navy to-[#1a2f5e] text-white flex flex-col justify-center">
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">
                  Total Anual a Pagar
                </p>
                <p className="font-display font-extrabold text-[2.5rem] leading-none">
                  {result.isExempt
                    ? "Isento"
                    : formatCurrency(result.total)}
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
                        <span>Componente Motor</span>
                        <span className="font-semibold">{formatCurrency(result.engineComponent)}</span>
                    </li>
                    {result.co2Component > 0 && (
                         <li className="flex justify-between items-center border-b border-gray-100 pb-2">
                            <span>Componente CO2</span>
                            <span className="font-semibold">{formatCurrency(result.co2Component)}</span>
                        </li>
                    )}
                    {result.dieselExtra > 0 && (
                         <li className="flex justify-between items-center border-b border-gray-100 pb-2 text-red-600">
                            <span>Agravamento Diesel</span>
                            <span className="font-semibold">+{formatCurrency(result.dieselExtra)}</span>
                        </li>
                    )}
                    <li className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <span>Subtotal</span>
                        <span className="font-semibold">{formatCurrency(result.subtotal)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                        <span>Total</span>
                        <span className="font-semibold">{formatCurrency(result.total)}</span>
                    </li>
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