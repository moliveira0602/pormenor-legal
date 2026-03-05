import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy pt-24 pb-0 hero-grid">
      {/* Radial glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 80% 50%, rgba(199,106,58,0.22) 0%, transparent 70%),
            radial-gradient(ellipse 50% 80% at 10% 80%, rgba(255,176,123,0.12) 0%, transparent 60%)
          `,
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
        {/* Text */}
        <div className="pb-20 lg:pb-28">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-white/85 text-[0.72rem] font-bold uppercase tracking-widest mb-6">
            <span className="material-symbols-outlined text-sm">verified</span>
            Serviços IMT e Legalização
          </div>

          <h1 className="font-display font-extrabold text-white text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-6">
            Legalização e<br />
            Documentação Automóvel{" "}
            <em className="not-italic text-primary">sem complicações</em>
          </h1>

          <p className="text-white/65 text-lg leading-relaxed max-w-[520px] mb-10">
            A Pormenor – Legavalia disponibiliza uma variedade de serviços para
            legalização automóvel e serviços IMT. Encontre-nos em Fafe.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#contacts"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-7 py-4 rounded-xl font-display font-bold text-base transition-all shadow-xl shadow-primary/30 hover:-translate-y-0.5"
            >
              Contactar
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
            <a
              href="#isv"
              className="inline-flex items-center bg-white/10 hover:bg-white/15 border border-white/20 text-white px-7 py-4 rounded-xl font-display font-bold text-base transition-all"
            >
              Ver Serviços
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="relative hidden lg:block self-end">
          <div className="relative h-[420px] rounded-t-[20px] overflow-hidden">
            <Image
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1800"
              alt="Aperto de mão fechando um negócio"
              fill
              className="object-cover brightness-[0.82]"
              priority
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
          </div>

          {/* Floating badge */}
          <div className="absolute bottom-7 left-7 bg-white rounded-2xl px-5 py-4 flex items-center gap-3 shadow-2xl">
            <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-green-600 text-xl">
                task_alt
              </span>
            </div>
            <div>
              <strong className="font-display font-extrabold text-navy text-xl block">
                +500
              </strong>
              <span className="text-muted text-xs">Carros Legalizados</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
