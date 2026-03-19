interface Service {
  icon: string;
  title: string;
  items: string[];
}

const services: Service[] = [
  {
    icon: "assignment",
    title: "Legalização Automóvel",
    items: [
      "Acompanhamento completo até à matrícula nacional",
      "Registo final no novo proprietário",
      "Gestão de todo o processo burocrático"
    ],
  },
  {
    icon: "home_repair_service",
    title: "Serviços IMT",
    items: [
      "Renovação da carta de condução",
      "Averbamentos e alterações",
      "Modelo 9 e procedimentos oficiais"
    ],
  },
  {
    icon: "apps",
    title: "Outros Serviços",
    items: [
      "Burocracias complementares",
      "Documentação adicional",
      "Suporte administrativo"
    ],
  },
  {
    icon: "description",
    title: "Declarações Técnicas",
    items: [
      "Certificado CE de Conformidade (COC)",
      "Certificação Documental (Modelo 9 - ACAP)",
      "Certificado de Características Técnicas",
      "Declaração de Pneumáticos",
      "Declaração de Peso Bruto Rebocável",
      "Declaração de Nº de motor",
      "Chapas de construtor",
      "Homologação IMT"
    ],
  },
  {
    icon: "savings",
    title: "Isenções e Impostos",
    items: [
      "Análise de isenção por mudança de residência",
      "Gestão de ISV/DAV",
      "Orientação fiscal especializada"
    ],
  },
  {
    icon: "inventory",
    title: "Pedido de Cancelamento de Matrícula",
    items: [
      "Reconstrução de documentação",
      "Cancelamento de matrículas",
      "Regularização de processos"
    ],
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
          <h2 className="font-display font-extrabold text-navy text-[2.5rem] tracking-tight">
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
              <h3 className="font-display font-bold text-navy text-lg mb-4">
                {s.title}
              </h3>
              <ul className="space-y-2 text-muted text-sm leading-relaxed">
                {s.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-sm mt-0.5 flex-shrink-0">check_circle</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
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
              ) : s.title === "Declarações Técnicas" ? (
                <a
                  href="/declaracoes-tecnicas"
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
