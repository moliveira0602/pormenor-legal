"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PedidoDeCOC() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      plate: formData.get("plate"),
      vin: formData.get("vin"),
      message: formData.get("message"),
      subject: "Pedido de COC",
    };

    try {
      const response = await fetch("/send-mail.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError("Ocorreu um erro ao enviar o pedido. Por favor tente novamente.");
      }
    } catch (err) {
      setError("Ocorreu um erro ao enviar o pedido. Por favor tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="bg-[var(--navy)] text-white py-16 px-6">
        <div className="max-w-[1100px] mx-auto">
          <span className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-widest mb-3">
            <span className="w-5 h-0.5 bg-primary inline-block" />
            Rápido e seguro
          </span>
          <h1 className="font-display font-extrabold text-4xl tracking-tight">Faça aqui o seu pedido de COC</h1>
          <p className="text-white/70 mt-3 max-w-2xl">
            Tratamos de toda a documentação. O COC é um documento para veículos que certifica que a viatura cumpre a legislação e requisitos em vigor na União Europeia, como segurança e emissões de CO₂.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#form" className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-display font-bold no-underline">
              Solicitar COC
            </a>
          </div>
        </div>
      </section>

      <section className="py-14 px-6">
        <div className="max-w-[1100px] mx-auto">
            <div className="space-y-10">
              <div>
                <h2 className="font-display font-extrabold text-navy text-2xl mb-2">O que é o COC?</h2>
                <p className="text-muted leading-relaxed">
                  O Certificado de Conformidade é um documento emitido pelo fabricante que comprova que o veículo cumpre os requisitos de homologação na UE. É frequentemente exigido em processos de legalização e atribuição de matrícula.
                </p>
              </div>
              <div>
                <h3 className="font-display font-bold text-navy text-xl mb-2">Quando é necessário</h3>
                <ul className="list-disc pl-5 text-muted space-y-2">
                  <li>Importação de veículo da UE ou fora da UE.</li>
                  <li>Regularização de dados técnicos para inspeção e matrícula.</li>
                  <li>Confirmação de variantes e versões para o IMT.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-display font-bold text-navy text-xl mb-3">Selecione a marca</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { href: "/pedido-de-coc/citroen", name: "Citroën", desc: "Pedido de COC Citroën" },
                    { href: "/pedido-de-coc/mercedes", name: "Mercedes‑Benz", desc: "Pedido de COC Mercedes" },
                    { href: "/pedido-de-coc/alfa-romeo", name: "Alfa Romeo", desc: "Pedido de COC Alfa Romeo" },
                  ].map((b) => (
                    <div key={b.name} className="bg-[var(--navy-mid)]/5 border border-[var(--border)] rounded-xl p-5 flex flex-col gap-3">
                      <div className="font-display font-bold text-navy text-lg">{b.name}</div>
                      <p className="text-muted text-sm">{b.desc}</p>
                      <Link href={b.href} className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-display font-bold no-underline">
                        Página da marca
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </Link>
                    </div>
                  ))}
                </div>
                <p className="text-muted mt-3">
                  Não encontrou a marca pretendida? Entre em contacto connosco e encomende o COC.
                </p>
              </div>
              <div>
                <h3 className="font-display font-bold text-navy text-xl mb-2">Documentos necessários</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-muted">
                  <li className="bg-[var(--navy-mid)]/5 border border-[var(--border)] rounded-xl p-4">Cópia do Documento Único do veículo/Certificado de Registo</li>
                  <li className="bg-[var(--navy-mid)]/5 border border-[var(--border)] rounded-xl p-4">Número de chassis (VIN)</li>
                  <li className="bg-[var(--navy-mid)]/5 border border-[var(--border)] rounded-xl p-4">Identificação do proprietário</li>
                  <li className="bg-[var(--navy-mid)]/5 border border-[var(--border)] rounded-xl p-4">Comprovativo de compra (se aplicável)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-display font-bold text-navy text-xl mb-2">Prazos e custos</h3>
                <p className="text-muted leading-relaxed">
                  O prazo médio de emissão varia entre 5 e 15 dias úteis após confirmação do pedido. O custo depende da marca e do representante. Envie-nos os dados do veículo para obter um orçamento imediato.
                </p>
              </div>
              <div>
                <h3 className="font-display font-bold text-navy text-xl mb-2">Como trabalhamos</h3>
                <ol className="list-decimal pl-5 text-muted space-y-2">
                  <li>Envio dos dados através do formulário ou contacto direto.</li>
                  <li>Validação de elegibilidade e orçamento.</li>
                  <li>Submissão do pedido ao fabricante/representante.</li>
                  <li>Receção do COC e entrega digital/física ao cliente.</li>
                </ol>
              </div>
              <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
                <h4 className="font-display font-bold text-navy mb-2">Apoio direto</h4>
                <ul className="space-y-2 text-muted">
                  <li>WhatsApp: +351 912 345 678</li>
                  <li>Email: info@pormenor.pt</li>
                  <li>Atendimento: Fafe, Portugal</li>
                </ul>
              </div>
              <div className="bg-[var(--navy)] text-white rounded-2xl p-6">
                <p className="font-display font-bold">Precisa de ajuda no processo?</p>
                <p className="text-white/70 mt-1">Tratamos da legalização completa.</p>
                <a href="/#services" className="inline-block mt-4 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg font-display font-bold no-underline">
                  Ver serviços
                </a>
              </div>
            </div>
        </div>
      </section>

      <section id="form" className="py-12 px-6 bg-[var(--navy)]">
        <div className="max-w-[900px] mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10">
            {submitted ? (
              <div className="bg-green-500/15 border border-green-500/30 rounded-2xl p-8 text-center">
                <span className="material-symbols-outlined text-green-400 text-4xl block mb-3">
                  check_circle
                </span>
                <p className="font-bold text-lg text-white">Pedido enviado com sucesso!</p>
                <p className="text-white/50 text-sm mt-1">
                  Entraremos em contacto brevemente para confirmar os dados e apresentar o orçamento.
                </p>
                <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-primary hover:text-white text-sm font-semibold"
                >
                    Enviar novo pedido
                </button>
              </div>
            ) : (
                <>
                <h3 className="text-white font-display font-extrabold text-2xl mb-2">Solicitar COC</h3>
                <p className="text-white/70 mb-6">Preencha os dados do veículo para avançarmos com o pedido.</p>
                <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input name="name" required className="h-[50px] bg-white/10 border-white/10 rounded-lg px-4 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 text-sm" placeholder="Nome" />
                    <input name="email" required className="h-[50px] bg-white/10 border-white/10 rounded-lg px-4 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 text-sm" placeholder="Email" type="email" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input name="phone" className="h-[50px] bg-white/10 border-white/10 rounded-lg px-4 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 text-sm" placeholder="Telemóvel" type="tel" />
                    <input name="plate" className="h-[50px] bg-white/10 border-white/10 rounded-lg px-4 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 text-sm" placeholder="Matrícula (opcional)" />
                </div>
                 <div className="grid grid-cols-1 gap-4">
                    <input name="vin" className="h-[50px] bg-white/10 border-white/10 rounded-lg px-4 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 text-sm" placeholder="Número de Chassis (VIN)" />
                </div>
                <textarea name="message" className="w-full h-[120px] bg-white/10 border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 text-sm resize-none" placeholder="Mensagem adicional (opcional)" />
                <button type="submit" disabled={isSubmitting} className="w-full h-[50px] bg-primary hover:bg-primary-dark rounded-lg font-display font-semibold text-white disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    {isSubmitting ? "A enviar..." : "Enviar Pedido"}
                </button>
                {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                </form>
                </>
            )}
          </div>
        </div>
      </section>

      <Footer showContacts={false} />
    </main>
  );
}
