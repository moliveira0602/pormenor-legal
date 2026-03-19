import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Importar Carro para Portugal - Guia Completo e Custos 2025",
  description: "Guia passo a passo para importar carros para Portugal. Custos de legalização, transporte, documentos necessários e simulador ISV.",
  keywords: ["importar carro", "legalizar carro importado", "custos importação", "documentos importação", "transportar carro"],
};

const guideSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Como Importar um Carro para Portugal",
  step: [
    {
      "@type": "HowToStep",
      name: "Escolher o Veículo",
      text: "Procure o carro em sites internacionais e verifique o histórico.",
    },
    {
      "@type": "HowToStep",
      name: "Comprar e Transportar",
      text: "Obtenha a fatura de compra e transporte o veículo para Portugal.",
    },
    {
      "@type": "HowToStep",
      name: "Legalização e ISV",
      text: "Inicie o processo de legalização e pague o Imposto Sobre Veículos (ISV).",
    },
    {
      "@type": "HowToStep",
      name: "Inspeção e Matrícula",
      text: "Faça a inspeção para atribuição de matrícula e registe o veículo.",
    },
  ],
};

export default function ImportarCarroPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <JsonLd data={guideSchema} />

      <section className="bg-navy text-white py-20 px-6 hero-grid relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto text-center relative z-10">
          <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight mb-6">
            Guia de Importação Automóvel
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Tudo o que precisa de saber para importar o seu próximo carro com segurança e sem surpresas.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 section-padding">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-navy font-display font-bold text-3xl mb-8 text-center">De onde quer importar?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { name: "Alemanha", slug: "alemanha", flag: "🇩🇪" },
              { name: "França", slug: "franca", flag: "🇫🇷" },
              { name: "Espanha", slug: "espanha", flag: "🇪🇸" },
              { name: "Itália", slug: "italia", flag: "🇮🇹" },
              { name: "Bélgica", slug: "belgica", flag: "🇧🇪" },
              { name: "Holanda", slug: "holanda", flag: "🇳🇱" },
            ].map((country) => (
              <Link 
                key={country.slug}
                href={`/importar-de/${country.slug}`}
                className="group card-elevated hover:border-primary transition-all no-underline"
              >
                <div className="text-4xl mb-4">{country.flag}</div>
                <h3 className="text-xl font-bold text-navy group-hover:text-primary transition-colors">Importar da {country.name}</h3>
                <p className="text-muted mt-2 text-sm">Ver guia e documentos específicos &rarr;</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="text-navy font-display font-bold text-3xl mb-6">Custos de Importação</h2>
          <p className="text-muted text-lg mb-8">
            Para além do valor do carro, deve considerar o transporte, a legalização (ISV), a inspeção e as taxas administrativas.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="card-elevated">
              <h4 className="font-bold text-navy mb-2">1. Transporte</h4>
              <p className="text-sm text-muted">Varia entre 500€ e 1500€ dependendo do país de origem e método (camião vs conduzir).</p>
            </div>
            <div className="card-elevated">
              <h4 className="font-bold text-navy mb-2">2. ISV (Imposto)</h4>
              <p className="text-sm text-muted">O maior custo. Depende da cilindrada, CO2 e idade do carro. Use o nosso simulador.</p>
            </div>
            <div className="card-elevated">
              <h4 className="font-bold text-navy mb-2">3. Processo</h4>
              <p className="text-sm text-muted">Inspeção, IMT, Conservatória e matrículas rondam os 250€-400€ em taxas estatais.</p>
            </div>
          </div>
          <div className="mt-12">
            <Link href="/simulador-isv" className="btn-primary">
              Solicitar Legalização Automóvel
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
