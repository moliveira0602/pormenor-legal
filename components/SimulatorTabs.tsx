"use client";

import { useState } from "react";
import IsvSimulator from "./IsvSimulator";
import IucSimulator from "./IucSimulator";
import Tabs from "./Tabs";

export default function SimulatorTabs() {
  const [activeSimulator, setActiveSimulator] = useState("isv");

  const tabs = [
    { id: "isv", label: "Simulador ISV" },
    { id: "iuc", label: "Simulador IUC" },
  ];

  const currentTitle = activeSimulator === "isv" ? "Simulador de ISV" : "Simulador de IUC";
  const currentDescription = activeSimulator === "isv" 
    ? "Calcule o imposto estimado para a sua importação (Regras 2025/2026)."
    : "Calcule o imposto anual estimado para o seu veículo (Regras 2025/2026).";

  return (
    <section className="py-24 px-6 bg-[var(--bg)]" id="simulador">
      <div className="max-w-[900px] mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-widest mb-3">
            <span className="w-5 h-0.5 bg-primary inline-block" />
            Ferramenta Gratuita
          </div>
          <h2 className="font-display font-extrabold text-navy text-[2.2rem] tracking-tight">
            {currentTitle}
          </h2>
          <p className="text-muted mt-2">
            {currentDescription} <br/>
            <span className="text-xs text-gray-400">Nota: O simulador assume a aplicação das tabelas mais recentes (OE2025).</span>
          </p>
        </div>
        
        <Tabs tabs={tabs} activeTab={activeSimulator} onTabChange={setActiveSimulator} />
        
        <div className="mt-2">
          {activeSimulator === "isv" && <IsvSimulator />}
          {activeSimulator === "iuc" && <IucSimulator />}
        </div>
      </div>
    </section>
  );
}
