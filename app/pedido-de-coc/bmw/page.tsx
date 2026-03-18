import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

export const metadata = {
  title: "Pedido de COC BMW | Pormenor",
};

export default function MarcaBMW() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="bg-[var(--navy)] text-white py-16 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center gap-4">
            <BrandLogo slug="bmw" alt="BMW" height={48} />
            <h1 className="font-display font-extrabold text-4xl tracking-tight">COC — BMW</h1>
          </div>
          <p className="text-white/70 mt-3 max-w-2xl">
            Tratamos do seu Certificado de Conformidade BMW junto do representante oficial.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="/#contacts" className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-display font-bold no-underline">
              Solicitar COC
            </a>
            <Link href="/pedido-de-coc" className="bg-white/10 hover:bg-white/15 border border-white/20 text-white px-6 py-3 rounded-xl font-display font-bold no-underline">
              Pedido de COC
            </Link>
          </div>
        </div>
      </section>
      <section className="py-14 px-6">
        <div className="max-w-[1100px] mx-auto">
          <p className="text-muted leading-relaxed">
            Prazo médio de emissão: 5–15 dias úteis após confirmação. Envie-nos o VIN e dados do veículo para orçamento.
          </p>
        </div>
      </section>
      <Footer showContacts={false} />
    </main>
  );
}
