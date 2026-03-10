import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import IsvSimulator from "@/components/IsvSimulator";
import Services from "@/components/Services";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import CocTeaser from "@/components/CocTeaser";
import ContactCTA from "@/components/ContactCTA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pormenor - Legalização Automóvel e Importação de Veículos",
  description: "Especialistas em Legalização Automóvel em Portugal. Tratamos de todo o processo de importação, ISV, IMT e matrículas. Simulador Gratuito.",
  keywords: ["legalização automóvel", "importar carros", "agência legalização", "matrículas portugal", "imt fafe", "pormenor legalização"],
};

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <StatsBar />
      <WhyUs />
      <Services />
      <CocTeaser />
      <IsvSimulator />
      <Process />
      <ContactCTA />
      <Testimonials />
      <Footer />
    </main>
  );
}
