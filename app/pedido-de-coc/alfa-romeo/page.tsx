import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

export const metadata = {
  title: "Pedido de COC Alfa Romeo | Pormenor",
};

export default function MarcaAlfaRomeo() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="bg-[var(--navy)] text-white py-16 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center gap-4">
            <BrandLogo alt="Alfa Romeo" height={48} src="https://upload.wikimedia.org/wikipedia/pt/5/5a/Logotipo_da_Alfa_Romeo.png" />
            <h1 className="font-display font-extrabold text-4xl tracking-tight">COC — Alfa Romeo</h1>
          </div>
          <p className="text-white/70 mt-3 max-w-2xl">
            Pedido de Certificado de Conformidade Alfa Romeo com tratamento de toda a documentação.
          </p>
          <a href="/pedido-de-coc#form" className="inline-flex mt-6 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-display font-bold no-underline">
            Solicitar COC
          </a>
        </div>
      </section>
      <section className="py-14 px-6">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
              <div className="flex items-baseline justify-between">
                <h2 className="font-display font-extrabold text-navy text-2xl">Alfa Romeo</h2>
                <div className="font-display font-extrabold text-navy text-2xl">240,00€</div>
              </div>
              <p className="text-muted mt-2">
                Encomende aqui o seu COC com a maior segurança e rapidez. Acompanhamos cada etapa até à emissão.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
              <h3 className="font-display font-bold text-navy text-lg mb-2">Documentos necessários</h3>
              <ul className="list-disc pl-5 text-muted space-y-2">
                <li>Cópia do Livrete/Documento de registo do veículo.</li>
                <li>VIN legível e correto.</li>
              </ul>
              <p className="text-muted mt-3">Prazo de entrega estimado: 15 a 30 dias úteis após confirmação.</p>
            </div>
            <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
              <h3 className="font-display font-bold text-navy text-lg mb-2">Notas importantes</h3>
              <ul className="list-disc pl-5 text-muted space-y-2">
                <li>Valores e prazos sujeitos a validação com o representante.</li>
                <li>Entrega digital; envio físico disponível quando aplicável.</li>
              </ul>
            </div>
          </div>
          <aside className="space-y-4">
            <div className="bg-[var(--navy)] text-white rounded-2xl p-6">
              <p className="font-display font-bold">Informação adicional</p>
              <p className="text-white/70 mt-1">Para orçamento, indique matrícula (se existir), VIN, ano e combustível.</p>
              <a href="/#contacts" className="inline-block mt-4 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg font-display font-bold no-underline">
                Contactos
              </a>
            </div>
          </aside>
        </div>
      </section>
      <Footer showContacts={false} />
    </main>
  );
}
