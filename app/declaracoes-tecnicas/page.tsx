import Header from "@/components/Header";
import Footer from "@/components/Footer";

const assuntos = [
  "Certificado CE de Conformidade (COC)",
  "Certificação Documental (Modelo 9 - ACAP)",
  "Certificado de Características Técnicas",
  "Declaração de Pneumáticos",
  "Declaração de Peso Bruto Rebocável",
  "Declaração de Nº de motor",
  "Chapas de construtor",
  "Homologação IMT",
];

export const metadata = {
  title: "Declarações Técnicas | Pormenor",
  description: "Certificados CE, certificação documental, declarações técnicas e homologação IMT.",
};

export default function DeclaracoesTecnicas() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="bg-[var(--navy)] text-white py-16 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-widest mb-3">
            <span className="w-5 h-0.5 bg-primary inline-block" />
            Declarações Técnicas
          </div>
          <h1 className="font-display font-extrabold text-4xl tracking-tight">
            Declarações Técnicas
          </h1>
          <p className="text-white/70 mt-3 max-w-3xl">
            Certificados CE, certificação documental, declarações técnicas e homologação IMT para veículos importados e nacionais.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/#contacts" className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-display font-bold no-underline">
              Solicitar Declarações Técnicas
            </a>
          </div>
        </div>
      </section>

      <section className="py-14 px-6">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="font-display font-extrabold text-navy text-2xl mb-2">
                Serviços Prestados
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-muted">
                <li className="card-elevated">
                  Certificado CE de Conformidade (COC)
                </li>
                <li className="card-elevated">
                  Certificação Documental (Modelo 9 - ACAP)
                </li>
                <li className="card-elevated">
                  Certificado de Características Técnicas
                </li>
                <li className="card-elevated">
                  Declaração de Pneumáticos
                </li>
                <li className="card-elevated">
                  Declaração de Peso Bruto Rebocável
                </li>
                <li className="card-elevated">
                  Declaração de Nº de motor
                </li>
                <li className="card-elevated">
                  Chapas de construtor
                </li>
                <li className="card-elevated">
                  Homologação IMT
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