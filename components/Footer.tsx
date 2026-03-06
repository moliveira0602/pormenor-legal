"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

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

export default function Footer({ showContacts = true }: { showContacts?: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  const [assuntoParam, setAssuntoParam] = useState("");
  useEffect(() => {
    try {
      const sp = new URLSearchParams(window.location.search);
      const a = sp.get("assunto") ?? "";
      setAssuntoParam(a);
    } catch {
      setAssuntoParam("");
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <footer className="bg-navy text-white pt-20 pb-12 px-6" id="contacts">
      <div className="max-w-[1100px] mx-auto">
        {showContacts && (
        <div className="grid grid-cols-1 gap-12 pb-16 border-b border-white/10">
          <div className="flex flex-col h-full">
            <h2 className="text-4xl font-bold mb-2 text-white/95">Entre em contacto</h2>
            <p className="text-white/55 text-sm max-w-2xl">
              Estamos aqui para ajudar. Preencha o formulário abaixo ou utilize os nossos contactos diretos.
            </p>

            <h3 className="text-xs font-bold tracking-widest uppercase text-white/60 mt-6 mb-3">Contactos Diretos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <a
                href="https://wa.me/351912345678"
                target="_blank"
                className="group bg-white/5 p-6 rounded-xl border border-white/10 hover:border-[var(--primary,#D37442)] transition-all duration-300 cursor-pointer flex items-center gap-5 no-underline"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-[var(--primary,#D37442)] group-hover:bg-[var(--primary,#D37442)] group-hover:text-white transition-colors duration-300">
                  <span className="material-symbols-outlined">chat</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white/60">WhatsApp</h4>
                  <p className="text-lg font-semibold text-white">+351 912 345 678</p>
                </div>
              </a>
              <a
                href="mailto:info@pormenor.pt"
                className="group bg-white/5 p-6 rounded-xl border border-white/10 hover:border-[var(--primary,#D37442)] transition-all duration-300 cursor-pointer flex items-center gap-5 no-underline"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-[var(--primary,#D37442)] group-hover:bg-[var(--primary,#D37442)] group-hover:text-white transition-colors duration-300">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white/60">Email</h4>
                  <p className="text-lg font-semibold text-white">info@pormenor.pt</p>
                </div>
              </a>
              <div className="group bg-white/5 p-6 rounded-xl border border-white/10 hover:border-[var(--primary,#D37442)] transition-all duration-300 cursor-pointer flex items-center gap-5">
                <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-[var(--primary,#D37442)] group-hover:bg-[var(--primary,#D37442)] group-hover:text-white transition-colors duration-300">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white/60">Atendimento</h4>
                  <p className="text-lg font-semibold text-white">Fafe, Portugal</p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-white/5 md:bg-white/5 rounded-2xl p-8 md:p-12 shadow-xl border border-white/10">
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="nome" className="block text-sm font-medium mb-2 text-white/75">Nome</label>
                      <input
                        id="nome"
                        className="w-full bg-white/10 border-white/10 rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-[var(--primary,rgba(211,116,66,0.2))] focus:border-[var(--primary,#D37442)] transition-all duration-200 text-white placeholder:text-white/40"
                        placeholder="O seu nome completo"
                        type="text"
                        name="nome"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2 text-white/75">Email</label>
                      <input
                        id="email"
                        className="w-full bg-white/10 border-white/10 rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-[var(--primary,rgba(211,116,66,0.2))] focus:border-[var(--primary,#D37442)] transition-all duration-200 text-white placeholder:text-white/40"
                        placeholder="exemplo@email.com"
                        type="email"
                        name="email"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="telemovel" className="block text-sm font-medium mb-2 text-white/75">Telemóvel</label>
                    <input
                      id="telemovel"
                      className="w-full bg-white/10 border-white/10 rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-[var(--primary,rgba(211,116,66,0.2))] focus:border-[var(--primary,#D37442)] transition-all duration-200 text-white placeholder:text-white/40"
                      placeholder="+351 000 000 000"
                      type="tel"
                      name="telemovel"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="assunto" className="block text-sm font-medium mb-2 text-white/75">Assunto</label>
                      <select
                        id="assunto"
                        name="assunto"
                        value={assuntoParam || ""}
                        onChange={(e) => setAssuntoParam(e.target.value)}
                        className="w-full bg-white/10 border-white/10 rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-[var(--primary,rgba(211,116,66,0.2))] focus:border-[var(--primary,#D37442)] transition-all duration-200 text-white placeholder:text-white/40"
                        required
                      >
                        <option value="" disabled>Selecione um assunto</option>
                        <option>Legalização de Viaturas Importadas</option>
                        <option>Benefícios Fiscais: Transferência de Residência, Deficientes ou Táxis</option>
                        <option>Processo de Alteração de Categoria Fiscal</option>
                        <option>Reconstrução de Processos Inacabados</option>
                        <option>Alterações e Transformações de Viaturas</option>
                        <option>Legalização de Atrelados, Tratores e Máquinas Industriais</option>
                        <option>Pedido de Matrículas Iniciais para Reboques e Atrelados</option>
                        <option>Pedido de Finalização de Processos de Matrícula Inicial</option>
                        <option>Alteração de Cor, Pneus ou Outro Tipo</option>
                        <option>Averbamento de Películas, GPL e Peso Bruto Rebocável</option>
                        <option>Alteração de Matrícula "K"</option>
                        <option>Reposição de Matrículas Canceladas</option>
                        <option>Atribuição de Matrículas da Época</option>
                        <option>Levantamento de Documentos Apreendidos</option>
                        <option>Alterações e Renovações de Cartas de Condução</option>
                        <option>Reconstrução de Documentação</option>
                        <option>Guia de Circulação para veículos de matrícula estrangeira</option>
                        <option>Abate de veículos de matrícula Estrangeira</option>
                        <option>Outros</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="vin" className="block text-sm font-medium mb-2 text-white/75">
                        Matrícula ou VIN <span className="text-white/45 font-normal">(opcional)</span>
                      </label>
                      <input
                        id="vin"
                        className="w-full bg-white/10 border-white/10 rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-[var(--primary,rgba(211,116,66,0.2))] focus:border-[var(--primary,#D37442)] transition-all duration-200 text-white placeholder:text-white/40"
                        placeholder="Ex: 00-AA-00"
                        type="text"
                        name="vin"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="mensagem" className="block text-sm font-medium mb-2 text-white/75">Mensagem</label>
                    <textarea
                      id="mensagem"
                      className="w-full bg-white/10 border-white/10 rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-[var(--primary,rgba(211,116,66,0.2))] focus:border-[var(--primary,#D37442)] transition-all duration-200 text-white placeholder:text-white/40 resize-none"
                      placeholder="Escreva aqui a sua mensagem..."
                      name="mensagem"
                      rows={6}
                    />
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="consent"
                        name="consent"
                        type="checkbox"
                        className="focus:ring-[var(--primary,#D37442)] h-4 w-4 text-[var(--primary,#D37442)] border-white/10 rounded bg-white/5"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="consent" className="text-white/70">Aceito ser contactado para este pedido.</label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-opacity-90 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                  >
                    <span>Enviar Mensagem</span>
                    <span className="material-symbols-outlined text-sm">send</span>
                  </button>
                </form>
              )}
            </div>
          </div>
          {/* aside removido para evitar duplicação */}
        </div>
        )}

        <div className="pt-10 grid grid-cols-1 md:grid-cols-3 items-center gap-4">
          <div className="flex md:justify-start justify-center">
            <Link href="/" className="flex items-center gap-3 no-underline">
              <Logo className="h-13 w-auto" width={164} height={31} priority={false} variant="white" />
            </Link>
          </div>
          <div className="flex md:justify-center justify-center">
            <p className="text-white/30 text-sm text-center">
              © 2026 Pormenor. Todos os direitos reservados.
            </p>
          </div>
          <div className="flex md:justify-end justify-center gap-6">
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
