import IsvSimulatorNew from "@/components/IsvSimulatorNew";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Simulador ISV 2025/2026 - Cálculo Gratuito Imposto Sobre Veículos",
  description: "Calcule o ISV para carros importados com o nosso simulador atualizado (OE2025). Saiba quanto vai pagar de imposto para legalizar o seu carro em Portugal.",
  keywords: ["simulador isv", "calcular isv", "imposto sobre veículos", "isv 2025", "importar carro simulador", "custo legalização"],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Como é calculado o ISV em 2025?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O ISV é calculado com base em duas componentes principais: a cilindrada e as emissões de CO2 (WLTP ou NEDC). Para veículos usados importados da UE, aplica-se um desconto por idade em ambas as componentes.",
      },
    },
    {
      "@type": "Question",
      name: "Os carros híbridos pagam ISV?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Os híbridos plug-in com autonomia elétrica superior a 50km e emissões reduzidas têm um desconto significativo (75% de redução). Os híbridos convencionais (HEV) pagam a taxa normal na componente de CO2 se não cumprirem os requisitos de autonomia.",
      },
    },
    {
      "@type": "Question",
      name: "Qual o agravamento para carros a gasóleo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Os veículos a gasóleo com emissões de partículas superiores a 0.001g/km (ou desconhecidas) sofrem um agravamento fixo de 500€ no total do imposto.",
      },
    },
  ],
};

export default function SimuladorISVPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <JsonLd data={faqSchema} />
      
      {/* Hero Section */}
      <section className="bg-navy text-white pt-24 pb-12 px-6">
        <div className="max-w-[1100px] mx-auto text-center">
          <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight mb-4">
            Simulador ISV 2025
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Calcule o valor exato do Imposto Sobre Veículos para legalizar o seu carro importado em Portugal.
          </p>
        </div>
      </section>

      {/* Simulator Component */}
      <div className="mt-12">
        <IsvSimulatorNew />
      </div>

      {/* Content Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-[900px] mx-auto space-y-12">
          
          <article className="prose prose-lg text-muted max-w-none">
            <h2 className="text-navy font-display font-bold text-3xl mb-6">Como funciona o cálculo do ISV?</h2>
            <p>
              O <strong>Imposto Sobre Veículos (ISV)</strong> é uma taxa de matrícula paga uma única vez quando um veículo é registado em Portugal. 
              O valor depende de vários fatores, sendo os mais importantes a <strong>cilindrada</strong> do motor e as <strong>emissões de CO2</strong>.
            </p>
            <p>
              Para veículos importados usados provenientes da União Europeia, o Estado Português aplica uma percentagem de redução baseada na idade do veículo (data da primeira matrícula), 
              para garantir que o imposto não excede o valor residual do imposto contido num veículo similar já matriculado em Portugal.
            </p>

            <h3 className="text-navy font-display font-bold text-2xl mt-8 mb-4">Componentes do Cálculo</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Componente Cilindrada:</strong> Taxada com base no volume do motor (cm³).</li>
              <li><strong>Componente Ambiental:</strong> Taxada com base nas emissões de CO2 (g/km).</li>
              <li><strong>Agravamento Diesel:</strong> Veículos a gasóleo pagam uma taxa adicional se emitirem partículas acima do limite.</li>
            </ul>

            <h3 className="text-navy font-display font-bold text-2xl mt-8 mb-4">Tabelas ISV 2025 (Resumo)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border border-gray-200 rounded-lg">
                <thead className="bg-gray-50 text-navy font-bold uppercase">
                  <tr>
                    <th className="px-4 py-3">Idade do Veículo</th>
                    <th className="px-4 py-3">Redução (UE)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><td className="px-4 py-3">Até 1 ano</td><td className="px-4 py-3">10%</td></tr>
                  <tr><td className="px-4 py-3">1 a 2 anos</td><td className="px-4 py-3">20%</td></tr>
                  <tr><td className="px-4 py-3">2 a 3 anos</td><td className="px-4 py-3">28%</td></tr>
                  <tr><td className="px-4 py-3">3 a 4 anos</td><td className="px-4 py-3">35%</td></tr>
                  <tr><td className="px-4 py-3">4 a 5 anos</td><td className="px-4 py-3">43%</td></tr>
                  <tr><td className="px-4 py-3">Mais de 10 anos</td><td className="px-4 py-3">80%</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-navy font-display font-bold text-2xl mt-8 mb-4">Simular por Marca</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "BMW", slug: "bmw" },
                { name: "Mercedes", slug: "mercedes" },
                { name: "Audi", slug: "audi" },
                { name: "VW", slug: "volkswagen" },
                { name: "Porsche", slug: "porsche" },
                { name: "Peugeot", slug: "peugeot" },
                { name: "Renault", slug: "renault" },
                { name: "Tesla", slug: "tesla" },
              ].map((brand) => (
                <Link 
                  key={brand.slug}
                  href={`/legalizacao/${brand.slug}`}
                  className="block p-3 bg-gray-50 hover:bg-primary/10 border border-gray-200 hover:border-primary rounded-lg text-center text-sm font-semibold text-navy hover:text-primary transition-all no-underline"
                >
                  ISV {brand.name}
                </Link>
              ))}
            </div>

            <h3 className="text-navy font-display font-bold text-2xl mt-8 mb-4">Perguntas Frequentes</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-navy text-lg">Preciso do COC para calcular o ISV?</h4>
                <p>Sim, o Certificado de Conformidade (COC) contém os valores oficiais de CO2 e cilindrada necessários para o cálculo exato. Se não tiver o COC, pode usar os valores do livrete estrangeiro.</p>
              </div>
              <div>
                <h4 className="font-bold text-navy text-lg">O simulador inclui o IUC?</h4>
                <p>Não, este simulador calcula apenas o ISV (Imposto Sobre Veículos). O IUC (Imposto Único de Circulação) é pago anualmente após a legalização.</p>
              </div>
            </div>

            <div className="mt-12 p-8 bg-gray-50 rounded-2xl border border-gray-200 text-center">
              <h3 className="text-navy font-display font-bold text-2xl mb-2">Precisa de ajuda com a legalização?</h3>
              <p className="mb-6">Tratamos de todo o processo burocrático por si, desde o transporte até à matrícula.</p>
              <a href="/legalizacao-automovel" className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-display font-bold no-underline transition-all shadow-lg shadow-primary/20">
                Pedir Orçamento Gratuito
              </a>
            </div>

          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}
