"use client";

import { useState } from "react";
import { calculateIuc, IucInput, IucBreakdown, IucCategory, FuelType, VehicleType } from "../lib/isv";

// Initial form state for IUC
const INITIAL_FORM: IucInput = {
  category: "A",
  vehicleType: "carro",
  fuel: "diesel",
  year: new Date().getFullYear(),
  month: 1,
  day: 1,
  cc: 0,
  co2: 0,
  origin: "national",
  country: "portugal",
  yearRange: "pre_2007",
  registrationDate: new Date(),
  isImported: false,
};

export default function IucSimulator() {
  const [form, setForm] = useState<IucInput>(INITIAL_FORM);
  const [result, setResult] = useState<IucBreakdown | null>(null);
  const [error, setError] = useState("");
  const [dateStr, setDateStr] = useState(`${new Date().getFullYear()}-01-01`); // Initial date
  const [consent, setConsent] = useState(false);

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

    // Validate CO2 for categories that require it
    if (form.category === "B" || form.category === "C" || form.category === "D") {
      if (!form.co2 || form.co2 <= 0) {
        setError("CO2 obrigatório para esta categoria de veículo.");
        return;
      }
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
    "w-full h-[46px] rounded-lg border border-[var(--border)] px-4 text-navy font-body text-sm bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/12 transition-all";

  // Helper to format currency
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("pt-PT", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 2,
    }).format(val);

  return (
    <section className="py-24 px-6 bg-[var(--bg)]" id="iuc">
      <div className="max-w-[800px] mx-auto">
        <div className="bg-white rounded-2xl p-8 border border-[var(--border)] shadow-sm">
          
          {/* Título e subtítulo */}
          <div className="text-center mb-8">
            <h2 className="font-display font-extrabold text-navy text-2xl md:text-3xl mb-2">
              Simulador de IUC
            </h2>
            <p className="text-muted text-sm md:text-base">
              Calcule o imposto anual estimado para o seu veículo
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={(e) => { e.preventDefault(); handleCalculate(); }} className="space-y-6">
            
            {/* Ano vigente */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-navy uppercase tracking-wider">
                Ano vigente
              </label>
              <select className={inputClass} value={form.year} onChange={handleChange("year")}>
                <option value="">Selecione o ano</option>
                {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() + i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* País da matrícula */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-navy uppercase tracking-wider">
                  País da matrícula
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center gap-3 p-3 border border-[var(--border)] rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="origin"
                      value="national"
                      checked={form.origin === "national"}
                      onChange={handleChange("origin")}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-sm">Nacional</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-[var(--border)] rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="origin"
                      value="foreign"
                      checked={form.origin === "foreign"}
                      onChange={handleChange("origin")}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-sm">Estrangeira</span>
                  </label>
                </div>
              </div>

              {/* Data da primeira matrícula */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-navy uppercase tracking-wider">
                  Data da primeira matrícula
                </label>
                <input
                  className={inputClass}
                  type="date"
                  value={dateStr}
                  onChange={handleDateChange}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            {/* Categoria e Tipo de combustível */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-navy uppercase tracking-wider">
                  Categoria do Veículo
                </label>
                <select className={inputClass} value={form.category} onChange={handleChange("category")}>
                  <option value="A">Categoria A - Veículos anteriores a Junho/2007</option>
                  <option value="B">Categoria B - Veículos a partir de Junho/2007</option>
                  <option value="C">Categoria C - Veículos ligeiros de mercadorias</option>
                  <option value="D">Categoria D - Veículos pesados de mercadorias</option>
                  <option value="E">Categoria E - Motociclos e ciclomotores</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-navy uppercase tracking-wider">
                  Tipo de combustível
                </label>
                <select className={inputClass} value={form.fuel} onChange={handleChange("fuel")}>
                  <option value="gasolina">Gasolina</option>
                  <option value="diesel">Diesel</option>
                  <option value="eletrico">Elétrico</option>
                  <option value="hibrido">Híbrido</option>
                  <option value="gpl">GPL/Gás Natural</option>
                </select>
              </div>
            </div>

            {/* Cilindrada e Emissões */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-navy uppercase tracking-wider">
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

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-navy uppercase tracking-wider">
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
            </div>

            {/* Consentimento */}
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                id="consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 text-primary focus:ring-primary"
              />
              <label htmlFor="consent" className="text-sm text-navy">
                Declaro que os dados inseridos são verdadeiros e aceito que este cálculo seja apenas indicativo.
              </label>
            </div>

            {/* Botão de simulação */}
            <div className="mt-6 flex items-center justify-center">
              <button
                type="submit"
                disabled={!consent}
                className={`w-full md:w-auto px-6 h-[46px] rounded-lg font-display font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  consent 
                    ? "bg-navy hover:bg-primary text-white" 
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                <span className="material-symbols-outlined text-base">calculate</span>
                Calcular IUC
              </button>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-400">
                * Valores indicativos baseados nas regras em vigor (OE2025)
              </p>
            </div>

            {error && (
              <p className="mt-4 text-red-500 text-sm font-medium text-center">{error}</p>
            )}

            {/* Área de resultado */}
            {result && (
              <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Total Card */}
                <div className="p-6 rounded-xl bg-gradient-to-r from-navy to-[#1a2f5e] text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">
                        Total Anual a Pagar
                      </p>
                      <p className="font-display font-extrabold text-2xl">
                        {result.isExempt
                          ? "Isento"
                          : formatCurrency(result.total)}
                      </p>
                      {result.isExempt && result.exemptReason && (
                          <p className="text-white/80 text-sm mt-1">{result.exemptReason}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-white/40 text-xs">Versão: {result.version}</p>
                    </div>
                  </div>
                </div>

                {/* Breakdown Card */}
                {!result.isExempt && (
                  <div className="p-6 rounded-xl bg-gray-50">
                    <p className="text-muted text-xs font-bold uppercase tracking-widest mb-4">
                      Detalhe do Cálculo
                    </p>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span>Componente Motor</span>
                        <span className="font-semibold">{formatCurrency(result.engineComponent)}</span>
                      </div>
                      {result.co2Component > 0 && (
                        <div className="flex justify-between items-center text-sm">
                          <span>Componente CO2</span>
                          <span className="font-semibold">{formatCurrency(result.co2Component)}</span>
                        </div>
                      )}
                      {result.additionalCo2 > 0 && (
                        <div className="flex justify-between items-center text-sm">
                          <span>CO2 Adicional</span>
                          <span className="font-semibold">{formatCurrency(result.additionalCo2)}</span>
                        </div>
                      )}
                      {result.registrationYearCoefficient !== 1.0 && (
                        <div className="flex justify-between items-center text-sm">
                          <span>Coeficiente Ano</span>
                          <span className="font-semibold">x{result.registrationYearCoefficient}</span>
                        </div>
                      )}
                      {result.fuelSurcharge > 0 && (
                        <div className="flex justify-between items-center text-sm text-red-600">
                          <span>Agravamento Combustível</span>
                          <span className="font-semibold">+{formatCurrency(result.fuelSurcharge)}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center text-sm border-t border-gray-200 pt-3">
                        <span>Subtotal</span>
                        <span className="font-semibold">{formatCurrency(result.subtotal)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm font-bold border-t border-gray-200 pt-3">
                        <span>Total</span>
                        <span className="font-bold">{formatCurrency(result.total)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Nova simulação */}
            {result && (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setResult(null);
                    setForm(INITIAL_FORM);
                    setDateStr(`${new Date().getFullYear()}-01-01`);
                    setConsent(false);
                  }}
                  className="px-6 h-[40px] bg-gray-200 hover:bg-gray-300 text-navy rounded-lg font-display font-bold text-sm transition-all"
                >
                  Nova Simulação
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
