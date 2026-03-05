interface Step {
  num: number;
  title: string;
  description: string;
  active: boolean;
}

const steps: Step[] = [
  { num: 1, title: "Homologação", description: "Obter número de homologação nacional no IMT (com/sem COC).", active: true },
  { num: 2, title: "Inspeção", description: "Inspeção para atribuição de matrícula e obtenção do modelo 112.", active: false },
  { num: 3, title: "DAV", description: "Preenchimento da Declaração Aduaneira de Veículos no Portal AT.", active: false },
  { num: 4, title: "Impostos", description: "Pagamento de impostos via MB, Finanças ou banco.", active: false },
  { num: 5, title: "Matrículas", description: "Solicitar a confeção das chapas de matrícula.", active: false },
  { num: 6, title: "Seguro", description: "Contratação do seguro automóvel da sua preferência.", active: false },
  { num: 7, title: "Modelo 9", description: "Entrega do Modelo 9 no IMT.", active: false },
  { num: 8, title: "Conservatória", description: "Registo do veículo na Conservatória do Registo Automóvel.", active: false },
  { num: 9, title: "IUC", description: "Pagamento do IUC para finalizar o processo.", active: false },
];

export default function Process() {
  return (
    <section
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: "var(--navy)" }}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(0,102,255,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
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

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          {steps.map((step) => (
            <div key={step.num} className="group text-center relative z-10">
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center font-display font-extrabold text-[1.6rem] mx-auto mb-5 transition-all duration-300 ${
                  step.active
                    ? "bg-primary text-white shadow-xl shadow-primary/30"
                    : "bg-white/5 text-white/50 border border-white/12 group-hover:border-primary/50 group-hover:text-white/80"
                }`}
              >
                {step.num}
              </div>
              <h4 className="font-display font-bold text-white text-[0.95rem] mb-2">
                {step.title}
              </h4>
              <p className="text-white/45 text-xs leading-relaxed px-2">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
