"use client";

import { useEffect, useState } from "react";

interface Step {
  num: number;
  title: string;
  description: string;
}

const steps: Step[] = [
  { num: 1, title: "Homologação", description: "Obter número de homologação nacional no IMT (com/sem COC)." },
  { num: 2, title: "Inspeção", description: "Inspeção para atribuição de matrícula e obtenção do modelo 112." },
  { num: 3, title: "DAV", description: "Preenchimento da Declaração Aduaneira de Veículos no Portal AT." },
  { num: 4, title: "Impostos", description: "Pagamento de Impostos Sobre Veículos." },
  { num: 5, title: "Matrícula", description: "Emissão de matrícula nacional." },
  { num: 6, title: "Registo Nacional", description: "Registar o veículo em nome do novo proprietário." },
];

export default function Process() {
  return (
    <section className="relative py-14 lg:py-16 px-6 overflow-hidden bg-[var(--navy)]">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(0,102,255,0.12)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-[rgba(100,175,255,0.9)] text-xs font-bold uppercase tracking-widest mb-3">
            <span className="w-5 h-0.5 bg-[rgba(100,175,255,0.9)] inline-block" />
            Como Funciona
          </div>
          <h2 className="font-display font-extrabold text-white text-[2.2rem] tracking-tight">
            O Processo Passo-a-Passo
          </h2>
          <p className="text-white/45 mt-2">
            Transparência total em cada etapa do seu processo.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
            >
              <div className="mx-auto w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-display font-extrabold text-base shadow-lg shadow-primary/30 mb-4">
                {step.num}
              </div>
              <h3 className="font-display font-bold text-white text-lg mb-2">
                {step.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="/#contacts"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-display font-bold no-underline"
          >
            Falar com a Pormenor
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}
