import Header from "@/components/Header";
import Footer from "@/components/Footer";

const assuntos = [
  "Alterações e Transformações de Viaturas",
  "Legalização de Atrelados, Tratores e Máquinas Industriais",
  "Pedido de Matrículas Iniciais para Reboques e Atrelados",
  "Pedido de Finalização de Processos de Matrícula Inicial",
  "Alteração de Cor, Pneus ou Outro Tipo",
  "Averbamento de Películas, GPL e Peso Bruto Rebocável",
  "Alteração de Matrícula \"K\"",
  "Reposição de Matrículas Canceladas",
  "Atribuição de Matrículas da Época",
  "Levantamento de Documentos Apreendidos",
  "Alterações e Renovações de Cartas de Condução",
  "Reconstrução de Documentação",
  "Reconstrução de Processos Inacabados",
];

export const metadata = {
  title: "Serviços IMT | Pormenor",
  description: "Alterações e transformações, pedidos de matrícula, averbamentos, reposições e mais.",
};

export default function ServicosIMT() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="bg-[var(--navy)] text-white py-16 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-widest mb-3">
            <span className="w-5 h-0.5 bg-primary inline-block" />
            Serviços IMT
          </div>
          <h1 className="font-display font-extrabold text-4xl tracking-tight">
            Serviços IMT
          </h1>
          <p className="text-white/70 mt-3 max-w-3xl">
            Tratamos de alterações e transformações, pedidos e cancelamentos de matrículas, averbamentos,
            reposição de documentação e renovação de cartas. Cuidamos da parte burocrática e do contacto com as entidades,
            para que avance com segurança e sem perdas de tempo.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/#contacts" className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-display font-bold no-underline">
              Falar com a Pormenor
            </a>
          </div>
        </div>
      </section>

      <section className="py-14 px-6">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="font-display font-extrabold text-navy text-2xl mb-2">
                Intervenções mais comuns
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-muted">
                <li className="bg-[var(--navy-mid)]/5 border border-[var(--border)] rounded-xl p-4">
                  Alterações e transformações de viaturas com tratamento integral da burocracia
                </li>
                <li className="bg-[var(--navy-mid)]/5 border border-[var(--border)] rounded-xl p-4">
                  Reconstrução de processos inacabados e documentação em falta
                </li>
                <li className="bg-[var(--navy-mid)]/5 border border-[var(--border)] rounded-xl p-4">
                  Pedidos e cancelamento de matrículas, atribuição de matrículas da época
                </li>
                <li className="bg-[var(--navy-mid)]/5 border border-[var(--border)] rounded-xl p-4">
                  Averbamentos: películas, GPL, PBR; alteração de cor, pneus e outras características
                </li>
                <li className="bg-[var(--navy-mid)]/5 border border-[var(--border)] rounded-xl p-4">
                  Levantamento de documentos apreendidos e reposição de matrículas canceladas
                </li>
                <li className="bg-[var(--navy-mid)]/5 border border-[var(--border)] rounded-xl p-4">
                  Alterações e renovações de cartas de condução
                </li>
              </ul>
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
        <div className="max-w-[1100px] mx-auto mt-10 space-y-8">
          <div>
            <h3 className="font-display font-bold text-navy text-xl mb-3">Escolha o assunto</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {assuntos.map((assunto) => (
                <a
                  key={assunto}
                  href={`/?assunto=${encodeURIComponent(assunto)}#contacts`}
                  className="group bg-white rounded-2xl p-6 border border-[var(--border)] hover:border-primary hover:shadow-[0_8px_32px_rgba(0,102,255,0.12)] transition-all no-underline"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-display font-bold text-navy text-lg">{assunto}</h4>
                    <span className="material-symbols-outlined text-primary">arrow_forward</span>
                  </div>
                  <p className="text-muted text-sm mt-2">
                    Clique para abrir o formulário com este assunto pré‑selecionado.
                  </p>
                </a>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[var(--border)]">
            <h3 className="font-display font-bold text-navy text-xl mb-2">Como trabalhamos</h3>
            <ol className="list-decimal pl-5 text-muted space-y-2">
              <li>Análise do pedido e confirmação do enquadramento legal.</li>
              <li>Checklist de documentos e prazos estimados.</li>
              <li>Submissão e acompanhamento junto do IMT e restantes entidades.</li>
              <li>Entrega da decisão e atualização da documentação.</li>
            </ol>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
