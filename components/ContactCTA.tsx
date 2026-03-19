export default function ContactCTA() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-[1100px] mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-[var(--navy)] text-white p-10 md:p-12">
          <div className="absolute -right-10 -top-10 w-56 h-56 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -left-10 -bottom-14 w-56 h-56 rounded-full bg-[#00D4FF]/10 blur-3xl" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-widest mb-3">
                <span className="w-5 h-0.5 bg-primary inline-block" />
                Precisa de ajuda?
              </div>
              <h3 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight">
                Fale com a Pormenor e receba orientação em minutos
              </h3>
              <p className="text-white/70 mt-2 max-w-2xl">
                Envie o caso e indicamos o caminho certo: impostos, DAV, inspeção, matrícula e benefícios.
              </p>
              <div className="mt-5 flex flex-wrap gap-3 text-sm text-white/80">
                <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                  <span className="material-symbols-outlined text-[18px] text-primary">schedule</span>
                  Resposta em 24h úteis
                </div>
                <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                  <span className="material-symbols-outlined text-[18px] text-primary">shield_person</span>
                  Avaliação sem compromisso
                </div>
                <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                  <span className="material-symbols-outlined text-[18px] text-primary">task_alt</span>
                  +500 processos concluídos
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="/?assunto=Legaliza%C3%A7%C3%A3o%20de%20Viaturas%20Importadas#contacts"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-display font-bold no-underline"
              >
                Solicitar Legalização Automóvel
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
