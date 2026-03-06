export default function CocTeaser() {
  return (
    <section id="coc" className="py-20 px-6 bg-[var(--bg)]">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-widest mb-3">
            <span className="w-5 h-0.5 bg-primary inline-block" />
            Pedido de COC
          </div>
          <h2 className="font-display font-extrabold text-navy text-[2rem] tracking-tight">
            Certificado de Conformidade para o seu veículo
          </h2>
          <p className="text-muted mt-2">
            Obtenha o COC de forma rápida. Documento essencial para legalização e matrícula.
          </p>
        </div>
        <div className="bg-white rounded-3xl p-8 border border-[var(--border)] shadow-[0_4px_32px_rgba(7,17,43,0.07)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-[var(--navy-mid)]/5 border border-[var(--border)]">
              <div className="flex items-center gap-2 font-display font-bold text-navy mb-1">
                <span className="material-symbols-outlined">verified</span> Oficial
              </div>
              <p className="text-muted text-sm">Pedido junto do fabricante ou representante autorizado.</p>
            </div>
            <div className="p-5 rounded-2xl bg-[var(--navy-mid)]/5 border border-[var(--border)]">
              <div className="flex items-center gap-2 font-display font-bold text-navy mb-1">
                <span className="material-symbols-outlined">schedule</span> Rápido
              </div>
              <p className="text-muted text-sm">Prazos médios entre 5 e 15 dias úteis.</p>
            </div>
            <div className="p-5 rounded-2xl bg-[var(--navy-mid)]/5 border border-[var(--border)]">
              <div className="flex items-center gap-2 font-display font-bold text-navy mb-1">
                <span className="material-symbols-outlined">badge</span> Essential
              </div>
              <p className="text-muted text-sm">Válido para inspeção e atribuição de matrícula.</p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <a
              href="/pedido-de-coc"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-7 py-4 rounded-xl font-display font-bold text-base transition-all no-underline"
            >
              Fazer Pedido de COC
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
