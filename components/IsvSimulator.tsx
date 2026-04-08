"use client";

import { useState } from "react";

export interface IsvSimulatorProps {
  title?: string;
}

export default function IsvSimulator({ title = "Simulador de ISV" }: IsvSimulatorProps) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">
          Para calcular o ISV, visite a nossa página dedicada ao simulador completo.
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-blue-800 text-sm font-medium mb-2">
            ⚠️ Simulador Atualizado
          </p>
          <p className="text-gray-600 text-sm">
            O simulador ISV foi completamente reformulado com novos campos e cálculos atualizados.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Novas Funcionalidades</h4>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>• Tipo de veículo e categoria</li>
              <li>• País de origem (UE ou Terceiro)</li>
              <li>• Cálculo com tabelas oficiais 2026</li>
              <li>• Redução por idade para UE</li>
            </ul>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Como Acessar</h4>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>• Use o simulador completo em <strong>Simulador ISV</strong></li>
              <li>• Ou clique no botão abaixo</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <a
            href="/simulador-isv"
            className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-all text-center"
          >
            Acessar Simulador Completo
          </a>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-all"
          >
            {showInfo ? "Ocultar" : "Ver"} Informações
          </button>
        </div>

        {showInfo && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-2">Informações sobre o ISV</h4>
            <p className="text-gray-600 text-sm mb-2">
              O Imposto Sobre Veículos é composto por duas componentes principais:
            </p>
            <ul className="text-gray-600 text-sm space-y-1">
              <li><strong>Cilindrada:</strong> Taxada por cm³ conforme tabela oficial</li>
              <li><strong>Emissões CO₂:</strong> Taxadas por g/km conforme combustível</li>
              <li><strong>Agravamento:</strong> 500€ para veículos a gasóleo</li>
              <li><strong>Redução:</strong> Até 80% para veículos usados da UE com mais de 10 anos</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}