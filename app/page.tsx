import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import IsvSimulator from "@/components/IsvSimulator";
import Services from "@/components/Services";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <StatsBar />
      <IsvSimulator />
      <Services />
      <Process />
      <WhyUs />
      <Testimonials />
      <Footer />
    </main>
  );
}
