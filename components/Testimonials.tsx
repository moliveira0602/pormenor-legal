interface Testimonial {
  initials: string;
  name: string;
  role: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    initials: "RS",
    name: "Ricardo Santos",
    role: "Importação BMW 320d",
    text: "Serviço impecável. Importei um BMW da Alemanha e não tive de me preocupar com nada. Recomendo vivamente!",
  },
  {
    initials: "SA",
    name: "Sofia Almeida",
    role: "Legalização Mercedes GLA",
    text: "Muito rápidos no pedido do COC e na marcação da inspeção. Tudo resolvido em menos de 15 dias. Excelente!",
  },
  {
    initials: "JP",
    name: "João Pereira",
    role: "Residente no Estrangeiro",
    text: "Excelente apoio no processo de isenção de ISV por mudança de residência. Poupei imenso dinheiro com a ajuda deles.",
  },
  {
    initials: "MC",
    name: "Manuel Costa",
    role: "Stand Automóvel Lisboa",
    text: "Uso os serviços da LegalizePT no meu stand há 3 anos. Profissionalismo e preços justos. Uma parceria que recomendo.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-widest mb-3">
            <span className="w-5 h-0.5 bg-primary inline-block" />
            Clientes Satisfeitos
          </div>
          <h2 className="font-display font-extrabold text-navy text-[2.2rem] tracking-tight">
            O que dizem os nossos clientes
          </h2>
        </div>

        {/* Scrollable track */}
        <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar snap-x">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="min-w-[340px] flex-shrink-0 bg-[var(--bg)] rounded-2xl p-8 border-[1.5px] border-[var(--border)] snap-start hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(7,17,43,0.09)] transition-all duration-200"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-amber-400 text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>

              <p className="text-muted text-[0.92rem] leading-relaxed italic mb-6">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-[#00D4FF] flex items-center justify-center font-display font-extrabold text-white text-sm flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-navy text-[0.92rem]">{t.name}</p>
                  <p className="text-muted text-xs mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
