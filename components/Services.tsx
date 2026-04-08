interface Service {
  icon: string;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: "assignment",
    title: "Legalização Automóvel",
    description:
      "Acompanhamento completo até à matrícula nacional e registo final.",
  },
  {
    icon: "home_repair_service",
    title: "Serviços IMT",
    description:
      "Renovação da carta, averbamentos, modelo 9 e outros procedimentos oficiais.",
  },
  {
    icon: "apps",
    title: "Outros Serviços",
    description:
      "Tratamos de burocracias complementares para ter o veículo em total conformidade.",
  },
  {
    icon: "description",
    title: "Declarações Técnicas",
    description:
      "Obtenção de declarações técnicas para o seu veículo.",
  },
  {
    icon: "savings",
    title: "Isenções e Impostos",
    description:
      "Análise de isenção por mudança de residência e gestão de ISV/DAV.",
  },
  {
    icon: "inventory",
    title: "Documentação e Registos",
    description:
      "Conservatória, registos e demais documentação necessária ao processo.",
  },
];

export default function Services() {
  return (
    <section className="py-24 px-6 bg-white" id="services">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-widest mb-3">
            <span className="w-5 h-0.5 bg-primary inline-block" />
            O que oferecemos
          </div>
          <h2 className="font-display font-extrabold text-navy text-[2.2rem] tracking-tight">
            Os Nossos Serviços
          </h2>
          <p className="text-muted mt-2 text-base">
            Legalização Automóvel, Serviços IMT e soluções complementares em Fafe.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="group bg-[var(--bg)] rounded-2xl p-8 border-[1.5px] border-transparent hover:border-primary hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,102,255,0.12)] transition-all duration-200 cursor-default"
            >
              <div className="w-[52px] h-[52px] rounded-[14px] bg-primary/10 group-hover:bg-primary flex items-center justify-center mb-5 transition-colors duration-200">
                <span className="material-symbols-outlined text-primary group-hover:text-white text-[26px] transition-colors duration-200">
                  {s.icon}
                </span>
              </div>
              <h3 className="font-display font-bold text-navy text-lg mb-2">
                {s.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {s.description}
              </p>
              {s.title === "Legalização Automóvel" ? (
                <a
                  href="/legalizacao-automovel"
                  className="inline-flex items-center gap-1 mt-4 text-primary font-semibold no-underline"
                >
                  Saiba mais
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              ) : s.title === "Serviços IMT" ? (
                <a
                  href="/servicos-imt"
                  className="inline-flex items-center gap-1 mt-4 text-primary font-semibold no-underline"
                >
                  Saiba mais
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              ) : s.title === "Outros Serviços" ? (
                <a
                  href="/outros"
                  className="inline-flex items-center gap-1 mt-4 text-primary font-semibold no-underline"
                >
                  Saiba mais
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
