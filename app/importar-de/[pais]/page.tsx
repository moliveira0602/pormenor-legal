import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import IsvSimulator from "@/components/IsvSimulator";

const COUNTRIES = [
  { slug: "alemanha", name: "Alemanha", docName: "Zulassungsbescheinigung Teil I & II" },
  { slug: "franca", name: "França", docName: "Certificat d'Immatriculation (Carte Grise)" },
  { slug: "espanha", name: "Espanha", docName: "Permiso de Circulación & Ficha Técnica" },
  { slug: "italia", name: "Itália", docName: "Carta di Circolazione & Certificato di Proprietà" },
  { slug: "belgica", name: "Bélgica", docName: "Certificat d'Immatriculation (Part I & II)" },
  { slug: "holanda", name: "Holanda", docName: "Kentekenbewijs (Card + Codes)" },
];

export async function generateStaticParams() {
  return COUNTRIES.map((c) => ({
    pais: c.slug,
  }));
}

export async function generateMetadata({ params }: { params: { pais: string } }): Promise<Metadata> {
  const country = COUNTRIES.find((c) => c.slug === params.pais) || { name: params.pais, docName: "Livrete Original" };
  const name = country.name;
  
  return {
    title: `Importar Carro da ${name} para Portugal - Guia e Custos 2025`,
    description: `Saiba como legalizar um carro importado da ${name}. Documentos necessários (${country.docName}), custos de transporte e cálculo do ISV.`,
    keywords: [`importar carro ${name}`, `legalizar carro ${name}`, `custo importação ${name}`, `documentos carro ${name}`, `isv carro importado`],
  };
}

export default function CountryPage({ params }: { params: { pais: string } }) {
  const country = COUNTRIES.find((c) => c.slug === params.pais) || { name: params.pais, docName: "Livrete Original" };
  const name = country.name;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Como Importar e Legalizar Carro da ${name}`,
    description: `Guia completo sobre a importação de veículos da ${name} para Portugal.`,
    author: {
      "@type": "Organization",
      name: "Pormenor",
    },
    publisher: {
      "@type": "Organization",
      name: "Pormenor",
      logo: {
        "@type": "ImageObject",
        url: "https://pormenor.etos.pt/logo.png",
      },
    },
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <JsonLd data={articleSchema} />

      {/* Hero */}
      <section className="bg-navy text-white py-20 px-6">
        <div className="max-w-[1100px] mx-auto text-center">
          <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-white/20">
            Importação de Veículos
          </span>
          <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight mb-6">
            Importar Carro da <span className="text-primary">{name}</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Guia passo a passo para trazer e legalizar o seu veículo da {name} em Portugal com segurança.
          </p>
        </div>
      </section>

      {/* Intro Content */}
      <section className="py-16 px-6">
        <div className="max-w-[900px] mx-auto">
          <div className="prose prose-lg text-muted max-w-none">
            <h2 className="text-navy font-display font-bold text-3xl">Vale a pena importar da {name}?</h2>
            <p>
              A importação de automóveis da <strong>{name}</strong> continua a ser uma das opções mais populares para os portugueses. 
              O mercado de usados na {name} é conhecido pela qualidade dos veículos, manutenção rigorosa e uma vasta oferta de equipamento opcional.
            </p>
            <p>
              No entanto, é crucial calcular bem os custos de legalização (ISV) para garantir que o negócio compensa face ao mercado nacional.
            </p>
          </div>
        </div>
      </section>

      {/* Simulator Component Integration */}
      <section className="bg-gray-50 py-12 border-y border-gray-200">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-8">
            <h3 className="font-display font-bold text-2xl text-navy">Simulador ISV (Importação {name})</h3>
            <p className="text-muted">Calcule o imposto para veículos vindos da {name}.</p>
          </div>
          <IsvSimulator />
        </div>
      </section>

      {/* Process Content */}
      <section className="py-16 px-6">
        <div className="max-w-[900px] mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-navy font-display font-bold text-2xl mb-4">Documentos da {name}</h3>
              <p className="text-muted mb-4">Para legalizar um carro vindo da {name}, necessita obrigatoriamente dos documentos originais:</p>
              <ul className="space-y-3 text-muted bg-white border border-gray-200 p-6 rounded-xl">
                <li className="flex gap-3 items-center font-bold text-navy">
                  <span className="material-symbols-outlined text-primary">description</span>
                  <span>{country.docName}</span>
                </li>
                <li className="flex gap-3 items-center">
                  <span className="material-symbols-outlined text-primary">receipt_long</span>
                  <span>Fatura de Compra (com IVA discriminado ou margem)</span>
                </li>
                <li className="flex gap-3 items-center">
                  <span className="material-symbols-outlined text-primary">verified</span>
                  <span>COC (Certificado de Conformidade)</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-navy font-display font-bold text-2xl mb-4">Transporte e Chegada</h3>
              <p className="text-muted mb-4">
                O transporte pode ser feito por camião ou a conduzir (com matrículas de trânsito válidas). 
                Ao chegar a Portugal, deve iniciar o processo de legalização imediatamente para evitar multas.
              </p>
              <div className="bg-navy/5 p-6 rounded-xl border border-navy/10">
                <h4 className="font-bold text-navy mb-2">Dica Importante</h4>
                <p className="text-sm text-muted">
                  Verifique sempre se o número de chassis (VIN) nos documentos coincide com o carro antes de fechar negócio na {name}.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-navy rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="font-display font-bold text-3xl mb-4">Nós tratamos da burocracia</h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Tratamos de todo o processo de legalização do seu carro vindo da {name}, incluindo inspeção, IMT e Alfândega.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/legalizacao-automovel#contact" className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-display font-bold no-underline transition-all shadow-lg shadow-primary/20">
                Pedir Orçamento
              </a>
              <a href="tel:+351912345678" className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-display font-bold no-underline transition-all border border-white/20">
                Ligar Agora
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
