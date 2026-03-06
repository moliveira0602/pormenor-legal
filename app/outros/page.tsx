import Header from "@/components/Header";
import Footer from "@/components/Footer";

const assuntos = [
  "Guia de Circulação para veículos de matrícula estrangeira",
  "Abate de veículos de matrícula Estrangeira",
  "Outros",
];

export const metadata = {
  title: "Outros | Pormenor",
  description: "Guia de circulação, abate de veículos de matrícula estrangeira e outros serviços.",
};

export default function Outros() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="bg-[var(--navy)] text-white py-16 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-widest mb-3">
            <span className="w-5 h-0.5 bg-primary inline-block" />
            Outros
          </div>
          <h1 className="font-display font-extrabold text-4xl tracking-tight">Outros Serviços</h1>
          <p className="text-white/70 mt-3 max-w-3xl">
            Complementamos os serviços principais com apoio em guia de circulação para matrículas estrangeiras,
            processos de abate e outras situações específicas. Tratamos da documentação e prazos.
          </p>
        </div>
      </section>

      <section className="py-14 px-6">
        <div className="max-w-[1100px] mx-auto space-y-8">
          <div>
            <h2 className="font-display font-extrabold text-navy text-2xl mb-2">Serviços Prestados</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-muted">
              <li className="bg-[var(--navy-mid)]/5 border border-[var(--border)] rounded-xl p-4">
                Guia de Circulação para veículos de matrícula estrangeira
              </li>
              <li className="bg-[var(--navy-mid)]/5 border border-[var(--border)] rounded-xl p-4">
                Abate de veículos de matrícula Estrangeira
              </li>
              <li className="bg-[var(--navy-mid)]/5 border border-[var(--border)] rounded-xl p-4">
                Outros
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-navy text-xl mb-3">Escolha o assunto</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <p className="text-muted text-sm mt-2">Abre o formulário com o assunto pré‑selecionado.</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
