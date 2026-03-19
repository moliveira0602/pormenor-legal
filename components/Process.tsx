"use client";

import { useState } from "react";

interface Step {
  num: number;
  title: string;
  description: string;
}

const steps: Step[] = [
  { num: 1, title: "Homologação", description: "Obter número de homologação nacional no IMT (com/sem COC)." },
  { num: 2, title: "Inspeção", description: "Inspeção para atribuição de matrícula e obtenção do modelo 112." },
  { num: 3, title: "DAV", description: "Preenchimento da Declaração Aduaneira de Veículos no Portal AT." },
  { num: 4, title: "Pagamento de Impostos", description: "Pagamento de impostos via MB, Finanças ou banco." },
  { num: 5, title: "Emissão de Matrícula Nacional", description: "Solicitar a confeção das chapas de matrícula." },
  { num: 6, title: "Registo do veículo no novo proprietário", description: "Registo do veículo na Conservatória do Registo Automóvel." },
];

export default function Process() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextStep = () => {
    setCurrentIndex((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentIndex((prev) => (prev - 1 + steps.length) % steps.length);
  };

  return (
    <section className="relative py-14 lg:py-16 px-6 bg-[var(--navy)]">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(0,102,255,0.12)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-[rgba(100,175,255,0.9)] text-xs font-bold uppercase tracking-widest mb-3">
            <span className="w-5 h-0.5 bg-[rgba(100,175,255,0.9)] inline-block" />
            Como Funciona
          </div>
          <h2 className="font-display font-extrabold text-white text-[2.5rem] tracking-tight">
            O Processo Passo-a-Passo
          </h2>
          <p className="text-white/45 mt-2">
            Transparência total em cada etapa do seu processo.
          </p>
        </div>

        {/* Manual Navigation Controls */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <button
            onClick={prevStep}
            className="p-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
            aria-label="Etapa anterior"
          >
            <span className="material-symbols-outlined text-white text-lg">arrow_back</span>
          </button>
          
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-primary shadow-lg shadow-primary/30' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Ir para etapa ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextStep}
            className="p-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
            aria-label="Próxima etapa"
          >
            <span className="material-symbols-outlined text-white text-lg">arrow_forward</span>
          </button>
        </div>

        {/* Current Step Display */}
        <div className="max-w-[800px] mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-display font-extrabold text-xl shadow-lg shadow-primary/30 mb-4">
              {steps[currentIndex].num}
            </div>
            <h3 className="font-display font-bold text-white text-xl mb-3">
              {steps[currentIndex].title}
            </h3>
            <p className="text-white/70 text-base leading-relaxed">
              {steps[currentIndex].description}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-[600px] mx-auto mt-8">
          <div className="flex items-center justify-between text-white/60 text-sm mb-2">
            <span>Etapa {currentIndex + 1} de {steps.length}</span>
            <span>{Math.round(((currentIndex + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="text-center mt-8">
          <a
            href="/#contacts"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-display font-bold no-underline"
          >
            Solicitar Legalização Automóvel
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}
