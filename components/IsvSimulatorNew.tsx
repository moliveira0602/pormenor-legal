"use client";

import { useState, useEffect } from "react";
import { calculateISV, IsvInput, formatCurrency, FuelType, VehicleCategory, OriginCountry, VehicleCondition } from "@/lib/isv";

const currentYear = new Date().getFullYear();

const INITIAL_FORM: IsvInput = {
  vehicleCategory: "ligeiro_passageiros",
  originCountry: "ue",
  registrationYear: currentYear,
  engineCC: 0,
  co2Emissions: 0,
  fuelType: "gasolina",
  vehicleCondition: "usado",
};

export default function IsvSimulatorNew() {
  const [form, setForm] = useState<IsvInput>(INITIAL_FORM);
  const [result, setResult] = useState<ReturnType<typeof calculateISV> | null>(null);
  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);

  // isUsed é derivado de vehicleCondition

  const handleChange = (field: keyof IsvInput) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = e.target.type === "number" ? Number(e.target.value) : e.target.value;
    setForm(prev => ({ ...prev, [field]: value }));
    setShowResults(false);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação
    if (!form.engineCC || form.engineCC <= 0) {
      setError("Por favor insira a cilindrada do veículo");
      return;
    }

    if (!form.co2Emissions || form.co2Emissions <= 0) {
      setError("Por favor insira as emissões de CO₂");
      return;
    }

    if (!form.registrationYear || form.registrationYear < 1900 || form.registrationYear > currentYear + 1) {
      setError("Ano de matrícula inválido");
      return;
    }

    try {
      const calculationResult = calculateISV(form);
      setResult(calculationResult);
      setShowResults(true);
      setError("");
    } catch (err) {
      setError("Erro ao calcular o ISV. Verifique os dados inseridos.");
      console.error(err);
    }
  };

  const handleContactClick = () => {
    const message = `Solicito orçamento para legalização de veículo.\n\n` +
                    `Dados da simulação:\n` +
                    `- Categoria: ${form.vehicleCategory}\n` +
                    `- Marca/Modelo: [Informar]\n` +
                    `- Ano: ${form.registrationYear}\n` +
                    `- Cilindrada: ${form.engineCC} cc\n` +
                    `- CO₂: ${form.co2Emissions} g/km\n` +
                    `- Combustível: ${form.fuelType}\n` +
                    `- Origem: ${form.originCountry === "ue" ? "União Europeia" : "País Terceiro"}\n` +
                    `- Estado: ${form.vehicleCondition}\n` +
                    `- ISV Estimado: ${result ? formatCurrency(result.totalISV) : "N/A"}\n\n` +
                    `Por favor contacte-me para mais informações.`;

    // Redirecionar para página de contacto com a mensagem
    window.location.href = `/?assunto=Orçamento+Legalização&mensagem=${encodeURIComponent(message)}#contacts`;
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setResult(null);
    setShowResults(false);
    setError("");
  };

  // Estilos
  const inputClass = "w-full h-12 px-4 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1";
  const cardClass = "bg-white rounded-xl border border-gray-200 p-6 shadow-sm";

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Tipo de Veículo */}
          <div className={cardClass}>
            <label className={labelClass}>
              1. Tipo de Veículo
            </label>
            <select
              className={inputClass}
              value={form.vehicleCategory}
              onChange={handleChange("vehicleCategory")}
              required
            >
              <option value="ligeiro_passageiros">Ligeiro de Passageiros</option>
              <option value="comercial">Comercial/Ligeiro de Mercadorias</option>
              <option value="motociclo">Motociclo/Ciclomotor</option>
              <option value="outro">Outro</option>
            </select>
            <p className="text-xs text-gray-500 mt-2">
              Veículos ligeiros até 9 lugares ou carga útil até 3.500kg
            </p>
          </div>

          {/* País de Origem */}
          <div className={cardClass}>
            <label className={labelClass}>
              2. País de Origem
            </label>
            <select
              className={inputClass}
              value={form.originCountry}
              onChange={handleChange("originCountry")}
              required
            >
              <option value="ue">Estado-Membro da União Europeia</option>
              <option value="pais_terceiro">País Terceiro (fora da UE)</option>
            </select>
            <p className="text-xs text-gray-500 mt-2">
              País Terceiro usa tabela de novos, mesmo para usados
            </p>
          </div>

          {/* Ano de Matrícula */}
          <div className={cardClass}>
            <label className={labelClass}>
              3. Ano de Matrícula
            </label>
            <input
              type="number"
              className={inputClass}
              value={form.registrationYear || ""}
              onChange={handleChange("registrationYear")}
              min="1900"
              max={currentYear + 1}
              required
              placeholder={`Ex: ${currentYear}`}
            />
            <p className="text-xs text-gray-500 mt-2">
              Ano da primeira matrícula do veículo
            </p>
          </div>

          {/* Cilindrada */}
          <div className={cardClass}>
            <label className={labelClass}>
              4. Cilindrada (cm³)
            </label>
            <input
              type="number"
              className={inputClass}
              value={form.engineCC || ""}
              onChange={handleChange("engineCC")}
              min="0"
              step="1"
              required
              placeholder="Ex: 1995"
            />
            <p className="text-xs text-gray-500 mt-2">
              Volume do motor em centímetros cúbicos
            </p>
          </div>

          {/* Emissões CO₂ */}
          <div className={cardClass}>
            <label className={labelClass}>
              5. Emissões de CO₂ (g/km)
            </label>
            <input
              type="number"
              className={inputClass}
              value={form.co2Emissions || ""}
              onChange={handleChange("co2Emissions")}
              min="0"
              step="0.1"
              required
              placeholder="Ex: 120"
            />
            <p className="text-xs text-gray-500 mt-2">
              Valores WLTP ou NEDC do COC ou livrete
            </p>
          </div>

          {/* Combustível */}
          <div className={cardClass}>
            <label className={labelClass}>
              6. Tipo de Combustível
            </label>
            <select
              className={inputClass}
              value={form.fuelType}
              onChange={handleChange("fuelType")}
              required
            >
              <option value="gasolina">Gasolina</option>
              <option value="gasóleo">Gasóleo</option>
              <option value="híbrido">Híbrido</option>
              <option value="elétrico">Elétrico</option>
              <option value="gpl">GPL/Gás Natural</option>
            </select>
            <p className="text-xs text-gray-500 mt-2">
              Veículos a gasóleo têm agravamento de 500€
            </p>
          </div>

          {/* Estado do Veículo (apenas para UE) */}
          {form.originCountry === "ue" && (
            <div className={cardClass}>
              <label className={labelClass}>
                7. Estado do Veículo
              </label>
              <select
                className={inputClass}
                value={form.vehicleCondition}
                onChange={handleChange("vehicleCondition")}
                required
              >
                <option value="usado">Usado</option>
                <option value="novo">Novo (0 km)</option>
              </select>
              <p className="text-xs text-gray-500 mt-2">
                Apenas para veículos da UE. Países terceiros usam tabela de novos.
              </p>
            </div>
          )}
        </div>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            type="submit"
            className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-all hover:shadow-lg flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Calcular ISV
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-lg transition-all"
          >
            Limpar
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}
      </form>

      {/* Resultados */}
      {showResults && result && (
        <div className="mt-12 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-gradient-to-r from-blue-900 to-navy rounded-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold mb-2">Resultado da Simulação</h2>
                <p className="text-blue-100">
                  Valor estimado do Imposto Sobre Veículos
                </p>
              </div>
              <div className="mt-4 md:mt-0 text-center md:text-right">
                <div className="text-4xl md:text-5xl font-bold mb-1">
                  {formatCurrency(result.totalISV)}
                </div>
                <p className="text-blue-200 text-sm">
                  ISV estimado para legalização
                </p>
              </div>
            </div>
          </div>

          {/* Detalhamento */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div className={cardClass}>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Detalhamento do Cálculo</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-gray-600">Componente Cilindrada</span>
                  <span className="font-semibold">{formatCurrency(result.breakdown.ccComponent)}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-gray-600">Componente Ambiental (CO₂)</span>
                  <span className="font-semibold">{formatCurrency(result.breakdown.co2Component)}</span>
                </div>
                {result.breakdown.dieselSurcharge > 0 && (
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-gray-600">Agravamento Gasóleo</span>
                    <span className="font-semibold text-red-600">+{formatCurrency(result.breakdown.dieselSurcharge)}</span>
                  </div>
                )}
                {result.breakdown.ageReduction && result.breakdown.ageReduction > 0 && (
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-gray-600">Redução por Idade ({result.details.ageReductionPercent && (result.details.ageReductionPercent * 100).toFixed(0)}%)</span>
                    <span className="font-semibold text-green-600">-{formatCurrency(result.breakdown.ageReduction)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-3 border-t border-gray-300">
                  <span className="text-lg font-bold text-gray-900">Total ISV</span>
                  <span className="text-2xl font-bold text-primary">{formatCurrency(result.totalISV)}</span>
                </div>
              </div>
            </div>

            <div className={cardClass}>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Informações Adicionais</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tabela Utilizada</span>
                  <span className="font-medium">
                    {result.details.isNewVehicleTable ? "Novos Veículos" : "Veículos Usados"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxa Cilindrada</span>
                  <span className="font-medium">{result.details.ccRate.toFixed(2)} €/cm³</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxa CO₂</span>
                  <span className="font-medium">{result.details.co2Rate.toFixed(2)} €/g/km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Origem</span>
                  <span className="font-medium">
                    {form.originCountry === "ue" ? "União Europeia" : "País Terceiro"}
                  </span>
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Nota:</strong> Este cálculo é estimado com base nas tabelas ISV 2026.
                    Para valores exatos, consulte sempre o Portal das Finanças ou contacte-nos
                    para uma análise personalizada.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <button
              onClick={handleContactClick}
              className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg text-lg transition-all hover:shadow-xl flex items-center justify-center gap-3 mx-auto"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Solicitar Orçamento de Legalização
            </button>
            <p className="text-gray-500 text-sm mt-3">
              Enviaremos os dados da simulação para análise personalizada
            </p>
          </div>
        </div>
      )}

      {/* Informações sobre o cálculo */}
      <div className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Como funciona o cálculo do ISV?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Componentes do ISV</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong>Cilindrada:</strong> Taxada por cm³ conforme tabela oficial</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong>Emissões CO₂:</strong> Taxadas por g/km conforme combustível</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong>Agravamento:</strong> 500€ para veículos a gasóleo</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Reduções Aplicáveis</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong>Idade do veículo:</strong> Redução progressiva até 80% para +10 anos (apenas UE)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong>Países terceiros:</strong> Usam sempre tabela de novos veículos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong>Veículos novos UE:</strong> Sem redução por idade</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}