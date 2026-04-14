"use client";

import { useState } from "react";
import { calculateIsv } from "@/lib/isv/calculation";
import { IsvInput, VehicleType, FuelType, ParticleFilter, CommercialSubtype } from "@/lib/isv/types";

const currentYear = new Date().getFullYear();

const INITIAL_FORM: IsvInput = {
  vehicleType: "passageiros",
  origin: "ue",
  condition: "usado",
  year: currentYear, month: 1, day: 1,
  cc: 0, co2: 0,
  fuel: "gasolina", cycle: "WLTP",
  particles: "desconhecido",
};

const DIAS = Array.from({ length: 31 }, (_, i) => i + 1);
const MESES = [
  { value: 1, label: "Janeiro" }, { value: 2, label: "Fevereiro" },
  { value: 3, label: "Março" }, { value: 4, label: "Abril" },
  { value: 5, label: "Maio" }, { value: 6, label: "Junho" },
  { value: 7, label: "Julho" }, { value: 8, label: "Agosto" },
  { value: 9, label: "Setembro" }, { value: 10, label: "Outubro" },
  { value: 11, label: "Novembro" }, { value: 12, label: "Dezembro" },
];
const ANOS = Array.from({ length: currentYear - 1969 }, (_, i) => currentYear + 1 - i);

const VEHICLE_TYPE_LABELS: Record<VehicleType, string> = {
  passageiros: "Ligeiro de Passageiros / Misto",
  comercial: "Comercial / Ligeiro de Mercadorias",
  autocaravana: "Autocaravana",
  moto: "Motociclo / Triciclo / Quadriciclo",
  eletrico: "Elétrico Puro",
  anterior1970: "Veículo Anterior a 1970",
};
const FUEL_LABELS: Record<FuelType, string> = {
  gasolina: "Gasolina", gasoleo: "Gasóleo", hibrido: "Híbrido (auto-recarregável)",
  hibrido_plugin: "Híbrido Plug-in", gn: "Gás Natural", gpl: "GPL",
};
const COMMERCIAL_SUBTYPES: { value: CommercialSubtype; label: string; pct: string }[] = [
  { value: "furgao_2lug", label: "Furgão 2 lugares / caixa fechada", pct: "100%" },
  { value: "furgao_mercadorias", label: "Furgão mercadorias (altura carga ≥121cm)", pct: "10%" },
  { value: "furgao_misto", label: "Furgão misto (≥2300kg, caixa ≥145×130cm)", pct: "15%" },
  { value: "caixa_aberta", label: "Carrinha caixa aberta", pct: "10%" },
  { value: "cabine_dupla", label: "Carrinha cabine dupla/tripla", pct: "15%" },
  { value: "cabine_dupla_4x4", label: "Carrinha cabine dupla/tripla 4×4", pct: "50%" },
];

export default function IsvSimulatorNew() {
  const [form, setForm] = useState<IsvInput>(INITIAL_FORM);
  const [result, setResult] = useState<ReturnType<typeof calculateIsv> | null>(null);
  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);

  const update = (field: keyof IsvInput, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setShowResults(false); setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.vehicleType === "eletrico") {
      setResult(calculateIsv(form)); setShowResults(true); return;
    }
    if (!form.cc || form.cc <= 0) { setError("Preencha a cilindrada"); return; }
    if (!form.day || !form.month || !form.year) { setError("Selecione a data de matrícula"); return; }
    if (form.vehicleType === "passageiros" && (form.co2 === undefined || form.co2 < 0)) {
      setError("Preencha as emissões de CO₂"); return;
    }
    try { setResult(calculateIsv(form)); setShowResults(true); setError(""); }
    catch (err) { setError("Erro ao calcular."); console.error(err); }
  };

  const showCommercialSub = form.vehicleType === "comercial";
  const showParticles = form.fuel === "gasoleo";
  const showElecRange = form.fuel === "hibrido" || form.fuel === "hibrido_plugin";
  const showCo2 = form.vehicleType !== "moto" && form.vehicleType !== "comercial";
  const showCycle = showCo2;
  const showCond = form.origin === "ue";

  const fmt = (v: number) =>
    new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR" }).format(v);

  const sel = "w-full h-12 px-4 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all";
  const inp = "w-full h-12 px-4 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all";
  const lbl = "block text-sm font-semibold text-gray-700 mb-1";
  const card = "bg-white rounded-xl border border-gray-200 p-6 shadow-sm";

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Linha 1: Origem - Estado - Data (33% cada) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. Origem */}
          <div className={card}>
            <label className={lbl}>1. Origem</label>
            <select className={sel} value={form.origin} onChange={e => update("origin", e.target.value)} required>
              <option value="ue">União Europeia (UE/EEE)</option>
              <option value="terceiro">País Terceiro (fora da UE)</option>
            </select>
          </div>

          {/* 2. Estado do Veículo (só UE) */}
          {showCond && (
            <div className={card}>
              <label className={lbl}>2. Estado do Veículo</label>
              <select className={sel} value={form.condition} onChange={e => update("condition", e.target.value)}>
                <option value="usado">Usado</option>
                <option value="novo">Novo</option>
              </select>
            </div>
          )}

          {/* 3. Data de Matrícula */}
          <div className={card}>
            <label className={lbl}>3. Data de Registo</label>
            <div className="flex gap-1">
              <select className={`${sel} text-xs`} value={form.day || ""}
                onChange={e => update("day", Number(e.target.value))} required>
                <option value="">Dia</option>
                {DIAS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <select className={`${sel} text-xs`} value={form.month || ""}
                onChange={e => update("month", Number(e.target.value))} required>
                <option value="">Mês</option>
                {MESES.map(m => <option key={m.value} value={m.value}>{m.label.slice(0,3)}</option>)}
              </select>
              <select className={`${sel} text-xs`} value={form.year || ""}
                onChange={e => update("year", Number(e.target.value))} required>
                <option value="">Ano</option>
                {ANOS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Linha 2: Tipo de Veículo (largura full) */}
        <div className="grid grid-cols-1 gap-4">
          <div className={card}>
            <label className={lbl}>4. Tipo de Veículo</label>
            <select className={sel} value={form.vehicleType} onChange={e => update("vehicleType", e.target.value)} required>
              <option value="passageiros">Ligeiro de Passageiros / Misto</option>
              <option value="comercial">Comercial / Ligeiro de Mercadorias</option>
              <option value="autocaravana">Autocaravana</option>
              <option value="moto">Motociclo / Triciclo / Quadriciclo</option>
              <option value="eletrico">Elétrico Puro (Isento)</option>
              <option value="anterior1970">Veículo Anterior a 1970</option>
            </select>
          </div>

          {/* Sub-tipo Comercial */}
          {showCommercialSub && (
            <div className={card}>
              <label className={lbl}>Sub-tipo Comercial</label>
              <select className={sel} value={form.commercialSubtype || "furgao_2lug"}
                onChange={e => update("commercialSubtype", e.target.value)}>
                {COMMERCIAL_SUBTYPES.map(s => (
                  <option key={s.value} value={s.value}>{s.label} ({s.pct})</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Linha 3: Cilindrada - Combustível - Partículas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 5. Cilindrada */}
          <div className={card}>
            <label className={lbl}>5. Cilindrada (cm³)</label>
            <input type="number" className={inp} value={form.cc || ""}
              onChange={e => update("cc", Number(e.target.value))}
              min="0" step="1" required placeholder="Ex: 2995" />
          </div>

          {/* 6. Combustível */}
          <div className={card}>
            <label className={lbl}>6. Combustível</label>
            <select className={sel} value={form.fuel} onChange={e => update("fuel", e.target.value)} required>
              {Object.entries(FUEL_LABELS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>

          {/* 7. Partículas (só gasóleo) */}
          {showParticles ? (
            <div className={card}>
              <label className={lbl}>7. Partículas Diesel</label>
              <select className={sel} value={form.particles || "desconhecido"}
                onChange={e => update("particles", e.target.value)}>
                <option value="euro6d">Euro 6d (0€)</option>
                <option value="euro6dtemp">Euro 6d-temp (0€)</option>
                <option value="euro6c">Euro 6c (500€)</option>
                <option value="euro6b">Euro 6b ou inferior (1000€)</option>
                <option value="sem_norma">Sem norma (2500€)</option>
                <option value="desconhecido">Desconhecido (2500€)</option>
              </select>
            </div>
          ) : (
            <div className={card}>
              <label className={lbl}>7. Autonomia Elétrica</label>
              <input type="number" className={inp} value={form.electricRange || ""}
                onChange={e => update("electricRange", Number(e.target.value) || undefined)}
                min="0" max="200" step="1" placeholder="Ex: 50 km" />
            </div>
          )}
        </div>

        {/* Linha 4: Tipo de Teste CO2 - Emissão de Gases */}
        {showCo2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 8. Tipo de Teste CO₂ */}
            <div className={card}>
              <label className={lbl}>8. Tipo de Teste CO₂</label>
              <select className={sel} value={form.cycle} onChange={e => update("cycle", e.target.value)}>
                <option value="WLTP">WLTP (veículos a partir de 2019)</option>
                <option value="NEDC">NEDC (veículos até 2018)</option>
              </select>
            </div>

            {/* 9. Emissão de CO₂ */}
            <div className={card}>
              <label className={lbl}>9. Emissão de CO₂ (g/km)</label>
              <input type="number" className={inp} value={form.co2 || ""}
                onChange={e => update("co2", Number(e.target.value))}
                min="0" step="0.1" required placeholder="Ex: 34" />
            </div>
          </div>
        )}

        {/* Botões */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button type="submit"
            className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-all">
            Calcular ISV
          </button>
          <button type="button" onClick={() => { setForm(INITIAL_FORM); setResult(null); setShowResults(false); setError(""); }}
            className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-lg">
            Limpar
          </button>
        </div>

        {error && <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 font-medium">{error}</div>}
      </form>

      {/* ===== RESULTADOS ===== */}
      {showResults && result && (
        <div className="mt-12 space-y-6">
          <div className="bg-gradient-to-r from-blue-900 to-navy rounded-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold mb-2">Resultado da Simulação</h2>
                <p className="text-blue-100">{VEHICLE_TYPE_LABELS[form.vehicleType]}</p>
              </div>
              <div className="mt-4 md:mt-0 text-center md:text-right">
                <div className="text-4xl md:text-5xl font-bold">
                  {result.isExempt ? "ISENTO" : fmt(result.finalTotal)}
                </div>
                {result.isExempt && <p className="text-blue-200 text-sm">{result.exemptReason}</p>}
              </div>
            </div>
          </div>

          {!result.isExempt && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className={card}>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Detalhamento</h3>
                <div className="space-y-3">
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-600">Componente Cilindrada</span>
                    <span className="font-semibold">{fmt(result.ccComponent)}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-600">Componente Ambiental (CO₂)</span>
                    <span className={`font-semibold ${result.co2Component < 0 ? 'text-red-600' : ''}`}>
                      {fmt(result.co2Component)}
                    </span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-600 font-medium">Base Tributável</span>
                    <span className="font-bold">{fmt(result.taxableBase)}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-600 font-medium">
                      Taxa aplicável ({result.ccApplyPercent}%)
                    </span>
                    <span className="font-bold">{fmt(result.totalAfterPercent)}</span>
                  </div>
                  {result.ageDiscountTotal > 0 && (
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-gray-600">Redução por Idade</span>
                      <span className="font-semibold text-green-600">−{fmt(result.ageDiscountTotal)}</span>
                    </div>
                  )}
                  {result.dieselSurcharge > 0 && (
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-gray-600">Agravamento Partículas</span>
                      <span className="font-semibold text-red-600">+{fmt(result.dieselSurcharge)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-3 border-t border-gray-300">
                    <span className="text-lg font-bold">ISV TOTAL</span>
                    <span className="text-2xl font-bold text-primary">{fmt(result.finalTotal)}</span>
                  </div>
                </div>
              </div>

              <div className={card}>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Dados do Veículo</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-600">Tipo</span><span className="font-medium">{VEHICLE_TYPE_LABELS[form.vehicleType]}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Data Matrícula</span><span className="font-medium">{form.day}/{form.month}/{form.year}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Origem</span><span className="font-medium">{form.origin === "ue" ? "União Europeia" : "País Terceiro"}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Combustível</span><span className="font-medium">{FUEL_LABELS[form.fuel]}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Cilindrada</span><span className="font-medium">{form.cc} cm³</span></div>
                  {showCo2 && <div className="flex justify-between"><span className="text-gray-600">CO₂</span><span className="font-medium">{form.co2} g/km ({form.cycle})</span></div>}
                  <div className="mt-4 p-3 bg-blue-50 rounded text-xs text-gray-600">
                    <strong>Nota:</strong> Valor estimado com base nas tabelas ISV 2026. Confirme com a Autoridade Tributária.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
