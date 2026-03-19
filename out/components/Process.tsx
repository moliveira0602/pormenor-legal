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
  { num: 4, title: "Impostos", description: "Pagamento de impostos via MB, Finanças ou banco." },
  { num: 5, title: "Matrículas", description: "Solicitar a confeção das chapas de matrícula." },
  { num: 6, title: "Seguro", description: "Contratação do seguro automóvel da sua preferência." },
  { num: 7, title: "Modelo 9", description: "Entrega do Modelo 9 no IMT." },
  { num: 8, title: "Conservatória", description: "Registo do veículo na Conservatória do Registo Automóvel." },
  { num: 9, title: "IUC", description: "Pagamento do IUC para finalizar o processo." },
];

export default function Process() {
  const stream = [...steps, ...steps, ...steps];

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

        <div className="relative max-w-[1100px] mx-auto overflow-hidden">
          <div className="flex items-stretch gap-4 marquee-track">
            {stream.map((step, i) => (
              <div
                key={`${step.num}-${i}`}
                className="basis-full sm:basis-1/2 lg:basis-1/4 flex-shrink-0 px-2"
              >
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                  <div className="mx-auto w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-display font-extrabold text-base shadow-lg shadow-primary/30">
                    {step.num}
                  </div>
                  <h3 className="font-display font-bold text-white text-base mt-3">
                    {step.title}
                  </h3>
                  <p className="text-white/60 text-xs leading-relaxed mt-1.5">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[var(--navy)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[var(--navy)] to-transparent" />
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
      <style jsx>{`
        @keyframes scrollMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.3333%); }
        }
        .marquee-track {
          animation: scrollMarquee 48s linear infinite;
          will-change: transform;
        }
        @media (min-width: 1024px) {
          .marquee-track { animation-duration: 54s; }
        }
      `}</style>
    </section>
  );
}
