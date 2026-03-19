import Header from "@/components/Header";
import Footer from "@/components/Footer";

const assuntos = [
  "Legalização de Viaturas Importadas",
  "Benefícios Fiscais: Transferência de Residência, Deficientes ou Táxis",
  "Processo de Alteração de Categoria Fiscal",
  "Reconstrução de Processos Inacabados",
];

export const metadata = {
  title: "Legalização Automóvel | Pormenor",
  description:
    "Legalização de veículos importados, benefícios fiscais, alteração de categoria fiscal e reconstrução de processos.",
};

export default function LegalizacaoAutomovel() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="bg-[var(--navy)] text-white py-16 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-widest mb-3">
            <span className="w-5 h-0.5 bg-primary inline-block" />
            Serviços de Legalização
          </div>
          <h1 className="font-display font-extrabold text-4xl tracking-tight">
            Legalização Automóvel
          </h1>
          <p className="text-white/70 mt-3 max-w-3xl">
            Cuidamos da legalização de veículos importados e processos conexos — dos ligeiros aos
            pesados, incluindo motociclos, reboques e semi‑reboques. Tratamos de benefícios fiscais,
            alterações de categoria fiscal e reconstruções documentais, garantindo rapidez, segurança e
            conformidade com a legislação.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/#contacts" className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-display font-bold no-underline">
              Falar com a Pormenor
            </a>
            <a href="/pedido-de-coc" className="bg-white/10 hover:bg-white/15 border border-white/20 text-white px-6 py-3 rounded-xl font-display font-bold no-underline">
              Pedido de COC
            </a>
          </div>
        </div>
      </section>

      <section className="py-14 px-6">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="font-display font-extrabold text-navy text-2xl mb-2">
                O que fazemos
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-muted">
                <li className="bg-[var(--navy-mid)]/5 border border-[var(--border)] rounded-xl p-4">
                  Legalização de veículos importados (ligeiros, pesados, motociclos, reboques, semi‑reboques)
                </li>
                <li className="bg-[var(--navy-mid)]/5 border border-[var(--border)] rounded-xl p-4">
                  Benefícios fiscais: transferência de residência, famílias numerosas, pessoas com deficiência, táxis
                </li>
                <li className="bg-[var(--navy-mid)]/5 border border-[var(--border)] rounded-xl p-4">
                  Processo de alteração de categoria fiscal
                </li>
                <li className="bg-[var(--navy-mid)]/5 border border-[var(--border)] rounded-xl p-4">
                  Reconstrução de documentação e reativação de processos inacabados
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-display font-bold text-navy text-xl mb-3">
                Serviços Prestados
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {assuntos.map((assunto) => (
                  <a
                    key={assunto}
                    href={`/?assunto=${encodeURIComponent(assunto)}#contacts`}
                    className="group bg-white rounded-2xl p-6 border border-[var(--border)] hover:border-primary hover:shadow-[0_8px_32px_rgba(0,102,255,0.12)] transition-all no-underline"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-bold text-navy text-lg">
                        {assunto}
                      </h4>
                      <span className="material-symbols-outlined text-primary">
                        arrow_forward
                      </span>
                    </div>
                    <p className="text-muted text-sm mt-2">
                      Clique para abrir o formulário com este assunto pré‑selecionado.
                    </p>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[var(--border)]">
              <h3 className="font-display font-bold text-navy text-xl mb-2">Como ajudamos</h3>
              <ol className="list-decimal pl-5 text-muted space-y-2">
                <li>Análise de enquadramento e verificação de elegibilidade fiscal/técnica.</li>
                <li>Orçamentação transparente e checklist de documentos.</li>
                <li>Submissão e acompanhamento do processo junto de entidades oficiais.</li>
                <li>Entrega do processo concluído com registos e documentação em ordem.</li>
              </ol>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="bg-[var(--navy)] text-white rounded-2xl p-6">
              <p className="font-display font-bold">Precisa de orientação?</p>
              <p className="text-white/70 mt-1">Explique-nos o caso; indicamos o melhor caminho.</p>
              <a
                href="/#contacts"
                className="inline-block mt-4 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg font-display font-bold no-underline"
              >
                Falar agora
              </a>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
