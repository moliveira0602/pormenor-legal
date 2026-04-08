interface Card {
  icon: string;
  title: string;
  desc: string;
  featured?: boolean;
}

const cards: Card[] = [
  { icon: "history_edu", title: "Experiência", desc: "Mais de 20 anos no mercado automóvel português." },
  { icon: "support_agent", title: "Apoio Total", desc: "Acompanhamento personalizado em cada fase do processo.", featured: true },
  { icon: "bolt", title: "Rapidez", desc: "Processos concluídos em tempo recorde no mercado." },
  { icon: "gavel", title: "Especialização", desc: "Conhecimento profundo das leis fiscais e aduaneiras." },
];

const checkList = [
  "Estimativas de custos 100% precisas",
  "Sem taxas ocultas ou surpresas de última hora",
  "Comunicação constante por WhatsApp e Email",
  "Equipa especializada disponível 6 dias por semana",
];

export default function WhyUs() {
  return (
    <section className="py-24 px-6 bg-[var(--bg)]" id="about">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Cards grid */}
        <div className="grid grid-cols-2 gap-5">
          {cards.map((c) => (
            <div
              key={c.title}
              className={`p-7 rounded-2xl border-[1.5px] transition-all duration-200 hover:-translate-y-0.5 ${
                c.featured
                  ? "bg-primary border-transparent shadow-xl shadow-primary/25"
                  : "bg-white border-[var(--border)] hover:shadow-[0_6px_24px_rgba(7,17,43,0.08)]"
              }`}
            >
              <span
                className={`material-symbols-outlined text-[32px] block mb-3 ${
                  c.featured ? "text-white/85" : "text-primary"
                }`}
              >
                {c.icon}
              </span>
              <h4
                className={`font-display font-bold text-base mb-1.5 ${
                  c.featured ? "text-white" : "text-navy"
                }`}
              >
                {c.title}
              </h4>
              <p className={`text-[0.82rem] leading-relaxed ${c.featured ? "text-white/70" : "text-muted"}`}>
                {c.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Text */}
        <div>
          <div className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-widest mb-3">
            <span className="w-5 h-0.5 bg-primary inline-block" />
            Porquê Nós
          </div>
          <h2 className="font-display font-extrabold text-navy text-[2.2rem] tracking-tight mb-4">
            Porquê escolher a Pormenor?
          </h2>
          <p className="text-muted leading-relaxed text-base mb-7">
            Não somos apenas um serviço de documentação. Somos o seu parceiro
            estratégico para garantir que a sua importação seja um investimento
            rentável e livre de surpresas fiscais desagradáveis.
          </p>
          <ul className="space-y-4">
            {checkList.map((item) => (
              <li key={item} className="flex items-start gap-3 font-semibold text-navy text-[0.92rem] leading-relaxed">
                <span className="material-symbols-outlined text-green-500 text-xl flex-shrink-0 mt-0.5">
                  check_circle
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
