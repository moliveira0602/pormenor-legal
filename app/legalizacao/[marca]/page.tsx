import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import IsvSimulator from "@/components/IsvSimulator";

// Brands list for static generation
const BRANDS = [
  { slug: "bmw", name: "BMW", country: "Alemanha" },
  { slug: "mercedes", name: "Mercedes-Benz", country: "Alemanha" },
  { slug: "audi", name: "Audi", country: "Alemanha" },
  { slug: "volkswagen", name: "Volkswagen", country: "Alemanha" },
  { slug: "porsche", name: "Porsche", country: "Alemanha" },
  { slug: "peugeot", name: "Peugeot", country: "França" },
  { slug: "renault", name: "Renault", country: "França" },
  { slug: "citroen", name: "Citroën", country: "França" },
  { slug: "toyota", name: "Toyota", country: "Japão" },
  { slug: "seat", name: "SEAT", country: "Espanha" },
  { slug: "volvo", name: "Volvo", country: "Suécia" },
  { slug: "tesla", name: "Tesla", country: "EUA" },
];

export async function generateStaticParams() {
  return BRANDS.map((brand) => ({
    marca: brand.slug,
  }));
}

export async function generateMetadata({ params }: { params: { marca: string } }): Promise<Metadata> {
  const brand = BRANDS.find((b) => b.slug === params.marca) || { name: params.marca, country: "Europa" };
  const name = brand.name;
  
  return {
    title: `Legalizar ${name} Importado em Portugal - Custo e Processo 2025`,
    description: `Saiba quanto custa legalizar um ${name} importado. Simulador ISV para ${name}, documentos necessários e processo passo a passo. Tratamos da legalização do seu ${name}.`,
    keywords: [`legalizar ${name}`, `importar ${name}`, `isv ${name}`, `custo legalização ${name}`, `homologação ${name}`],
  };
}

export default function BrandPage({ params }: { params: { marca: string } }) {
  const brand = BRANDS.find((b) => b.slug === params.marca) || { name: params.marca, country: "Europa" };
  const name = brand.name;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Legalização Automóvel",
    provider: {
      "@type": "Organization",
      name: "Pormenor",
      url: "https://pormenor.etos.pt",
    },
    areaServed: {
      "@type": "Country",
      name: "Portugal",
    },
    name: `Legalização de ${name}`,
    description: `Serviço completo de legalização para veículos da marca ${name}.`,
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <JsonLd data={serviceSchema} />

      {/* Hero */}
      <section className="bg-navy text-white py-20 px-6">
        <div className="max-w-[1100px] mx-auto text-center">
          <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-white/20">
            Legalização Automóvel
          </span>
          <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight mb-6">
            Legalizar <span className="text-primary">{name}</span> Importado
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Processo completo de legalização para veículos {name}. Tratamos de toda a burocracia, inspeção e matrícula.
          </p>
        </div>
      </section>

      {/* Intro Content */}
      <section className="py-16 px-6">
        <div className="max-w-[900px] mx-auto">
          <div className="prose prose-lg text-muted max-w-none">
            <h2 className="text-navy font-display font-bold text-3xl">Quanto custa legalizar um {name}?</h2>
            <p>
              O custo para legalizar um <strong>{name}</strong> em Portugal depende essencialmente do ano do veículo, da cilindrada e das emissões de CO2. 
              Como a {name} tem modelos com diversas motorizações, o valor do ISV pode variar significativamente.
            </p>
            <p>
              Para saber o valor exato, utilize o nosso simulador abaixo, que já inclui as tabelas de ISV 2025/2026 e os descontos por idade para veículos importados da União Europeia.
            </p>
          </div>
        </div>
      </section>

      {/* Simulator Component Integration */}
      <section className="bg-gray-50 py-12 border-y border-gray-200">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-8">
            <h3 className="font-display font-bold text-2xl text-navy">Simulador ISV para {name}</h3>
            <p className="text-muted">Calcule o imposto estimado para o seu modelo específico.</p>
          </div>
          <IsvSimulator />
        </div>
      </section>

      {/* Process Content */}
      <section className="py-16 px-6">
        <div className="max-w-[900px] mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-navy font-display font-bold text-2xl mb-4">Documentos Necessários</h3>
              <ul className="space-y-3 text-muted">
                <li className="flex gap-3">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <span>Livrete original do país de origem (Certificado de Matrícula Partes I e II)</span>
                </li>
                <li className="flex gap-3">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <span>Fatura de compra ou Declaração de Venda</span>
                </li>
                <li className="flex gap-3">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <span>COC (Certificado de Conformidade) da {name}</span>
                </li>
                <li className="flex gap-3">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <span>CMR (Guia de Transporte) se o carro veio de camião</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-navy font-display font-bold text-2xl mb-4">Porquê importar um {name}?</h3>
              <p className="text-muted mb-4">
                Muitos portugueses optam por importar veículos {name} (especialmente da {brand.country}) devido à maior oferta de equipamento, melhor estado de conservação e preços competitivos no mercado de usados.
              </p>
              <div className="bg-navy/5 p-6 rounded-xl border border-navy/10">
                <h4 className="font-bold text-navy mb-2">Sabia que?</h4>
                <p className="text-sm text-muted">
                  A Pormenor trata do pedido de COC diretamente com a marca {name} se o seu veículo não trouxer este documento, agilizando o processo de homologação no IMT.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-navy rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="font-display font-bold text-3xl mb-4">Precisa de ajuda com o seu {name}?</h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Não perca tempo em filas no IMT ou na Alfândega. Tratamos de todo o processo de legalização do início ao fim.
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
