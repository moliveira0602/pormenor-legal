"use client";

import { useState } from "react";

export default function IucSimulator() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Simulador de IUC</h3>
        <p className="text-gray-600">
          O simulador IUC foi atualizado. Use a versão completa com todas as tabelas e filtros.
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-blue-800 text-sm font-medium mb-2">Atualização disponível</p>
          <p className="text-gray-600 text-sm">
            Novo simulador com regras por período de matrícula (até 1980, 1981–2007 e 2007–2026),
            cilindrada e CO₂.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/simulador-iuc"
            className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-all text-center"
          >
            Abrir Simulador IUC Completo
          </a>
          <button
            onClick={() => setShowInfo((v) => !v)}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-all"
          >
            {showInfo ? "Ocultar" : "Ver"} detalhes
          </button>
        </div>

        {showInfo && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <ul className="text-gray-600 text-sm space-y-1">
              <li>• País da matrícula (Portugal/UE/EEE ou outro país)</li>
              <li>• Períodos: até 1980, 1981–2007, 2007–2026</li>
              <li>• Ano específico, cilindrada e CO₂ (quando aplicável)</li>
              <li>• Resultado anual estimado + botão “Fale connosco”</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
