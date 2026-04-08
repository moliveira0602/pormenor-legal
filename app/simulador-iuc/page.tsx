import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import IucCompleteSimulator from "@/components/IucCompleteSimulator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulador IUC 2026 - Cálculo Anual do Imposto Único de Circulação",
  description:
    "Calcule o IUC anual do seu veículo com base no país de matrícula, ano, cilindrada e emissões de CO₂. Simulador atualizado para 2026.",
  keywords: [
    "simulador iuc",
    "calcular iuc",
    "imposto único de circulação",
    "iuc 2026",
    "iuc portugal",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Como é calculado o IUC?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "O IUC é calculado com base no período de matrícula do veículo. Para veículos até 1980 aplica-se taxa histórica, de 1981 a 2007 usa-se tabela por cilindrada e de 2007 a 2026 inclui componente de emissões de CO2.",
      },
    },
    {
      "@type": "Question",
      name: "Veículos importados pagam IUC diferente?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Depende do país de origem e da data da primeira matrícula. O enquadramento fiscal considera o regime aplicável em Portugal conforme as regras em vigor.",
      },
    },
    {
      "@type": "Question",
      name: "O valor do simulador é definitivo?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "O valor apresentado é estimado com base nas tabelas disponíveis. Para confirmação oficial, consulte o Portal das Finanças ou peça validação especializada.",
      },
    },
  ],
};

export default function SimuladorIUCPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <JsonLd data={faqSchema} />

      <section className="bg-navy text-white pt-24 pb-12 px-6">
        <div className="max-w-[1100px] mx-auto text-center">
          <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight mb-4">
            Simulador IUC 2026
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Calcule o valor anual estimado do Imposto Único de Circulação para o seu veículo.
          </p>
        </div>
      </section>

      <div className="mt-12">
        <IucCompleteSimulator />
      </div>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-[900px] mx-auto space-y-12">
          <article className="prose prose-lg text-muted max-w-none">
            <h2 className="text-navy font-display font-bold text-3xl mb-6">
              Como funciona o cálculo do IUC?
            </h2>

            <p>
              O <strong>IUC (Imposto Único de Circulação)</strong> é um imposto anual devido pelos proprietários de veículos em Portugal. O valor depende do período de matrícula, cilindrada e, em veículos mais recentes, das emissões de CO₂.
            </p>

            <h3 className="text-navy font-display font-bold text-2xl mt-8 mb-4">
              Regras por período de matrícula
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Até 1980:</strong> regime de veículo histórico (taxa reduzida).</li>
              <li><strong>1981 a 2007:</strong> tabela baseada na cilindrada.</li>
              <li><strong>2007 a 2026:</strong> inclui componente ambiental (CO₂) e escalões por categoria.</li>
            </ul>

            <h3 className="text-navy font-display font-bold text-2xl mt-8 mb-4">
              Nota importante
            </h3>
            <p>
              Este simulador fornece um valor estimado. Para validação oficial, confirme os valores no Portal das Finanças ou contacte-nos para apoio no enquadramento fiscal do seu veículo.
            </p>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}
