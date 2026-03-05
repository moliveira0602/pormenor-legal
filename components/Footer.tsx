"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface ContactInfo {
  icon: string;
  title: string;
  lines: string[];
  badge?: string;
}

const contacts: ContactInfo[] = [
  {
    icon: "chat",
    title: "WhatsApp",
    lines: ["+351 912 345 678"],
    badge: "Resposta em 30 min",
  },
  {
    icon: "mail",
    title: "Email",
    lines: ["info@pormenor.pt"],
  },
  {
    icon: "location_on",
    title: "Atendimento",
    lines: ["Fafe, Portugal"],
  },
];

export default function Footer() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <footer className="bg-navy text-white pt-20 pb-12 px-6" id="contacts">
      <div className="max-w-[1200px] mx-auto">
        {/* Top grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 pb-16 border-b border-white/10">
          {/* Form */}
          <div>
            <h2 className="font-display font-extrabold text-[2.2rem] tracking-tight mb-8">
              Fale Connosco
            </h2>

            {submitted ? (
              <div className="bg-green-500/15 border border-green-500/30 rounded-2xl p-8 text-center">
                <span className="material-symbols-outlined text-green-400 text-4xl block mb-3">
                  check_circle
                </span>
                <p className="font-bold text-lg">Mensagem enviada!</p>
                <p className="text-white/50 text-sm mt-1">
                  Entraremos em contacto em breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    className="h-[50px] bg-white/7 border border-white/12 rounded-xl px-4 text-white placeholder:text-white/35 focus:outline-none focus:border-primary text-sm transition-colors"
                    placeholder="Nome"
                    type="text"
                    required
                  />
                  <input
                    className="h-[50px] bg-white/7 border border-white/12 rounded-xl px-4 text-white placeholder:text-white/35 focus:outline-none focus:border-primary text-sm transition-colors"
                    placeholder="Email"
                    type="email"
                    required
                  />
                </div>
                <input
                  className="w-full h-[50px] bg-white/7 border border-white/12 rounded-xl px-4 text-white placeholder:text-white/35 focus:outline-none focus:border-primary text-sm transition-colors"
                  placeholder="Telemóvel"
                  type="tel"
                />
                <textarea
                  className="w-full h-[110px] bg-white/7 border border-white/12 rounded-xl px-4 py-3.5 text-white placeholder:text-white/35 focus:outline-none focus:border-primary text-sm resize-none transition-colors"
                  placeholder="Mensagem / Detalhes do Veículo"
                />
                <button
                  type="submit"
                  className="w-full h-[52px] bg-primary hover:bg-primary-dark rounded-xl font-display font-bold text-[0.95rem] transition-all shadow-lg shadow-primary/25 hover:-translate-y-0.5"
                >
                  Enviar Mensagem
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="flex flex-col justify-center gap-10">
            {contacts.map((c) => (
              <div key={c.title} className="flex items-start gap-5">
                <div className="w-[50px] h-[50px] rounded-[14px] bg-white/6 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary text-2xl">
                    {c.icon}
                  </span>
                </div>
                <div>
                  <h5 className="font-display font-bold text-base mb-1">{c.title}</h5>
                  {c.lines.map((line, i) => (
                    <p key={i} className="text-white/50 text-sm leading-relaxed">
                      {line}
                    </p>
                  ))}
                  {c.badge && (
                    <span className="text-primary text-xs font-bold mt-1 block">
                      {c.badge}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3 no-underline">
            <Image
              src="https://pormenor.pt/platform-images/cms/header/logotipo-1/0af1c8a8-cd26-4429-bb58-5b07dc970df0.png?p=medium&w=164&h=31&fm=png&fill=transparent&s=f04b1a425107f1b48b4ea809fbae6a58"
              alt="Pormenor"
              width={164}
              height={31}
              className="h-6 w-auto"
            />
          </Link>

          <p className="text-white/30 text-sm">
            © 2026 Pormenor. Todos os direitos reservados.
          </p>

          <div className="flex gap-6">
            <a href="#" className="text-white/35 hover:text-white text-sm transition-colors no-underline">
              Política de Privacidade
            </a>
            <a href="#" className="text-white/35 hover:text-white text-sm transition-colors no-underline">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
