"use client";

import { useState, useMemo } from "react";
import {
  calculateCompleteIUC,
  formatCurrency,
  getYearOptions,
  COMMON_ENGINE_CC,
  COMMON_CO2_EMISSIONS,
  type RegistrationCountry,
  type RegistrationPeriod,
  type IucInput
} from "@/lib/iuc-completo";

export default function IucCompleteSimulator() {
  // Estado do formulário
  const [country, setCountry] = useState<RegistrationCountry>("pt_ue");
  const [period, setPeriod] = useState<RegistrationPeriod>("1981_2007");
  const [specificYear, setSpecificYear] = useState<number>(2000);
  const [engineCC, setEngineCC] = useState<number>(1600);
  const [co2Emissions, setCo2Emissions] = useState<number>(120);

  // Estado do resultado
  const [result, setResult] = useState<ReturnType<typeof calculateCompleteIUC> | null>(null);
  const [error, setError] = useState("");

  // Opções de ano baseadas no período selecionado
  const yearOptions = useMemo(() => getYearOptions(period), [period]);

  // Atualizar ano padrão quando mudar o período
  const handlePeriodChange = (newPeriod: RegistrationPeriod) => {
    setPeriod(newPeriod);
    const years = getYearOptions(newPeriod);
    setSpecificYear(years[Math.floor(years.length / 2)]); // Ano do meio
  };

  // Função para calcular
  const handleCalculate = () => {
    try {
      const input: IucInput = {
        country,
        period,
        engineCC,
        co2Emissions: period === "2007_2026" ? co2Emissions : undefined,
        specificYear: period !== "ate_1980" ? specificYear : undefined
      };

      const calculationResult = calculateCompleteIUC(input);
      setResult(calculationResult);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao calcular IUC");
      setResult(null);
    }
  };

  // Resetar formulário
  const handleReset = () => {
    setCountry("pt_ue");
    setPeriod("1981_2007");
    setSpecificYear(2000);
    setEngineCC(1600);
    setCo2Emissions(120);
    setResult(null);
    setError("");
  };

  // Estilos
  const inputClass = "w-full h-12 px-4 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1";
  const cardClass = "bg-white rounded-xl border border-gray-200 p-6 shadow-sm";

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Simulador de IUC 2026
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Calcule o Imposto Único de Circulação anual para o seu veículo
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Formulário */}
        <div className="xl:col-span-8">
          <div className={cardClass}>
            <div className="space-y-7">
              {/* 1. País da matrícula */}
              <div>
                <label className={labelClass}>1. País da matrícula do veículo</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCountry("pt_ue")}
                    className={`px-4 py-4 rounded-lg border ${country === "pt_ue" ? "border-primary bg-blue-50" : "border-gray-300 hover:border-gray-400"} transition-all text-left`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${country === "pt_ue" ? "border-primary bg-primary" : "border-gray-400"}`}>
                        {country === "pt_ue" && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Portugal ou UE/EEE</p>
                        <p className="text-gray-500 text-sm">Veículos matriculados na União Europeia</p>
                      </div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCountry("outro")}
                    className={`px-4 py-4 rounded-lg border ${country === "outro" ? "border-primary bg-blue-50" : "border-gray-300 hover:border-gray-400"} transition-all text-left`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${country === "outro" ? "border-primary bg-primary" : "border-gray-400"}`}>
                        {country === "outro" && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Outro país</p>
                        <p className="text-gray-500 text-sm">Veículos importados de fora da UE</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* 2. Data da primeira matrícula */}
              <div>
                <label className={labelClass}>2. Data da primeira matrícula</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <button
                    type="button"
                    onClick={() => handlePeriodChange("ate_1980")}
                    className={`px-4 py-3 rounded-lg border ${period === "ate_1980" ? "border-primary bg-blue-50" : "border-gray-300 hover:border-gray-400"} transition-all`}
                  >
                    <div className="text-center">
                      <p className="font-semibold text-gray-900">Até 1980</p>
                      <p className="text-gray-500 text-xs">Veículos históricos</p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePeriodChange("1981_2007")}
                    className={`px-4 py-3 rounded-lg border ${period === "1981_2007" ? "border-primary bg-blue-50" : "border-gray-300 hover:border-gray-400"} transition-all`}
                  >
                    <div className="text-center">
                      <p className="font-semibold text-gray-900">1981 a 2007</p>
                      <p className="text-gray-500 text-xs">Tabela por cilindrada</p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePeriodChange("2007_2026")}
                    className={`px-4 py-3 rounded-lg border ${period === "2007_2026" ? "border-primary bg-blue-50" : "border-gray-300 hover:border-gray-400"} transition-all`}
                  >
                    <div className="text-center">
                      <p className="font-semibold text-gray-900">2007 a 2026</p>
                      <p className="text-gray-500 text-xs">Inclui componente CO₂</p>
                    </div>
                  </button>
                </div>

                {/* Ano específico (se aplicável) */}
                {period !== "ate_1980" && (
                  <div>
                    <label className={labelClass}>Ano de matrícula específico</label>
                    <select
                      className={inputClass}
                      value={specificYear}
                      onChange={(e) => setSpecificYear(Number(e.target.value))}
                    >
                      {yearOptions.map(year => (
                        <option key={year} value={year}>
                          {String(year)}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* 3. Cilindrada */}
              <div>
                <label className={labelClass}>3. Cilindrada (cc)</label>
                <select
                  className={inputClass}
                  value={engineCC}
                  onChange={(e) => setEngineCC(Number(e.target.value))}
                >
                  {COMMON_ENGINE_CC.map((cc) => (
                    <option key={String(cc)} value={String(cc)}>
                      {String(cc)} cm³
                    </option>
                  ))}
                </select>
              </div>

              {/* 4. Emissões CO₂ (apenas para 2007-2026) */}
              {period === "2007_2026" && (
                <div>
                  <label className={labelClass}>4. Emissões de CO₂ (g/km)</label>
                  <select
                    className={inputClass}
                    value={co2Emissions}
                    onChange={(e) => setCo2Emissions(Number(e.target.value))}
                  >
                    {COMMON_CO2_EMISSIONS.map((co2) => (
                      <option key={String(co2)} value={String(co2)}>
                        {String(co2)} g/km
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Botões */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleCalculate}
                  className="flex-1 h-12 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Calcular IUC
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 h-12 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-lg transition-all"
                >
                  Limpar
                </button>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 font-medium">{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Resultado */}
        {result && (
          <div className={`xl:col-span-4 ${cardClass} sticky top-24`}>
            <div className="mb-6">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Resultado da Simulação</h4>
              <p className="text-gray-600 text-sm">Valor anual estimado do IUC</p>
            </div>

            <div className="bg-gradient-to-r from-blue-900 to-navy rounded-xl p-6 text-white text-center mb-6">
              <div className="text-4xl md:text-5xl font-bold mb-1">
                {formatCurrency(result.annualIUC)}
              </div>
              <p className="text-blue-200">IUC anual estimado</p>
            </div>

            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">Detalhamento</h5>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Categoria</span>
                    <span className="font-medium">{result.details.category} - {result.details.description}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Idade do veículo</span>
                    <span className="font-medium">{result.details.vehicleAge} anos</span>
                  </div>
                  {result.details.isHistoric && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-yellow-800 text-sm font-medium">
                        ⚠️ Veículo histórico (taxa reduzida)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-gray-600 text-sm mb-3">
                  Valor calculado com base nas tabelas IUC 2026 vigentes em Portugal.
                </p>
                <button
                  type="button"
                  onClick={() => window.location.href = `/?assunto=Consulta+IUC&mensagem=${encodeURIComponent(
                    `Solicito informação sobre cálculo de IUC:\n` +
                    `- País: ${country === "pt_ue" ? "Portugal/UE" : "Outro país"}\n` +
                    `- Período: ${period}\n` +
                    `- Cilindrada: ${engineCC}cc\n` +
                    `- IUC estimado: ${formatCurrency(result.annualIUC)}\n` +
                    `Por favor, contacte-me para confirmar o cálculo.`
                  )}#contacts`}
                  className="w-full h-12 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Fale connosco
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Informações sobre as tabelas */}
        {!result && (
          <div className={`xl:col-span-4 ${cardClass} sticky top-24`}>
            <h4 className="text-lg font-bold text-gray-900 mb-4">Informação sobre as Tabelas</h4>
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-gray-800 text-sm mb-2">Até 1980</h5>
                <p className="text-gray-600 text-sm">
                  Veículos históricos com mais de 30 anos têm taxa fixa reduzida de €15,00.
                </p>
              </div>
              <div>
                <h5 className="font-semibold text-gray-800 text-sm mb-2">1981-2007</h5>
                <p className="text-gray-600 text-sm">
                  Cálculo baseado apenas na cilindrada do motor. Agravamento de €0,65 por ano após 5 anos.
                </p>
              </div>
              <div>
                <h5 className="font-semibold text-gray-800 text-sm mb-2">2007-2026</h5>
                <p className="text-gray-600 text-sm">
                  Cálculo baseado nas emissões de CO₂ (categorias A-G). Inclui agravamentos por idade e emissões.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}