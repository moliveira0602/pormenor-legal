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
            <div className="max-w-[900px] mx-auto w-full">
              <h2 className="text-3xl font-bold mb-2 text-white/95">Entre em contacto</h2>
              <p className="text-white/55 text-sm max-w-2xl">
                Estamos aqui para ajudar. Preencha o formulário abaixo ou utilize os nossos contactos diretos.
              </p>

              <h3 className="text-xs font-bold tracking-widest uppercase text-white/60 mt-6 mb-3">Contactos Diretos</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              <a
                href="https://wa.me/351912345678"
                target="_blank"
                className="group bg-white/5 p-5 rounded-xl border border-white/10 hover:border-[var(--primary,#D37442)] transition-all duration-300 cursor-pointer flex items-center gap-4 no-underline"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-[var(--primary,#D37442)] group-hover:bg-[var(--primary,#D37442)] group-hover:text-white transition-colors duration-300">
                  <span className="material-symbols-outlined">chat</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white/60">WhatsApp</h4>
                  <p className="text-base font-semibold text-white">+351 912 345 678</p>
                </div>
              </a>
              <a
                href="mailto:info@pormenor.pt"
                className="group bg-white/5 p-5 rounded-xl border border-white/10 hover:border-[var(--primary,#D37442)] transition-all duration-300 cursor-pointer flex items-center gap-4 no-underline"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-[var(--primary,#D37442)] group-hover:bg-[var(--primary,#D37442)] group-hover:text-white transition-colors duration-300">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white/60">Email</h4>
                  <p className="text-base font-semibold text-white">info@pormenor.pt</p>
                </div>
              </a>
              <div className="group bg-white/5 p-5 rounded-xl border border-white/10 hover:border-[var(--primary,#D37442)] transition-all duration-300 cursor-pointer flex items-center gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-[var(--primary,#D37442)] group-hover:bg-[var(--primary,#D37442)] group-hover:text-white transition-colors duration-300">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white/60">Atendimento</h4>
                  <p className="text-base font-semibold text-white">Rua José Ribeiro Vieira de Castro 95, Fafe 4820-3273</p>
                </div>
              </div>
            </div>
            </div>

            <div className="mt-6 max-w-[900px] mx-auto bg-white/5 md:bg-white/5 rounded-2xl p-8 md:p-12 shadow-xl border border-white/10">
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

        <div className="pt-10 grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <div className="flex md:justify-start justify-center flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-3 no-underline">
              <Logo className="h-13 w-auto" width={164} height={31} priority={false} variant="white" />
            </Link>
            <div className="flex items-center gap-3 mt-3">
              <a
                href="https://www.facebook.com/pormenor2006/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 text-white/80 hover:text-white transition-colors"
                title="Facebook"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M22.675 0h-21.35C.596 0 0 .596 0 1.325v21.351C0 23.404.596 24 1.325 24H12.82v-9.294H9.692V11.01h3.128V8.41c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.098 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.765v2.239h3.592l-.468 3.696h-3.124V24h6.116C23.404 24 24 23.404 24 22.676V1.325C24 .596 23.404 0 22.675 0z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/pormenor_legavalia/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 text-white/80 hover:text-white transition-colors"
                title="Instagram"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.35 3.608 1.325.975.975 1.263 2.242 1.325 3.608.058 1.266.07 1.646.07 4.834s-.012 3.568-.07 4.834c-.062 1.366-.35 2.633-1.325 3.608-.975.975-2.242 1.263-3.608 1.325-1.266.058-1.646.07-4.85.07s-3.584-.012-4.795-.069c-1.366-.062-2.633-.35-3.608-1.325-.975-.975-1.263-2.242-1.325-3.608C2.175 15.568 2.163 15.188 2.163 12s.012-3.568.07-4.834c.062-1.366.35-2.633 1.325-3.608C4.533 2.583 5.8 2.295 7.166 2.233 8.432 2.175 8.812 2.163 12 2.163zm0 1.684c-3.167 0-3.543.012-4.795.069-1.036.048-1.6.22-1.973.37-.497.193-.853.425-1.227.799-.374.374-.606.73-.799 1.227-.15.373-.322.937-.37 1.973-.057 1.252-.069 1.628-.069 4.795s.012 3.543.069 4.795c.048 1.036.22 1.6.37 1.973.193.497.425.853.799 1.227.374.374.73.606 1.227.799.373.15.937.322 1.973.37 1.252.057 1.628.069 4.795.069s3.543-.012 4.795-.069c1.036-.048 1.6-.22 1.973-.37.497-.193.853-.425 1.227-.799.374-.374.606-.73.799-1.227.15-.373.322-.937.37-1.973.057-1.252.069-1.628.069-4.795s-.012-3.543-.069-4.795c-.048-1.036-.22-1.6-.37-1.973-.193-.497-.425-.853-.799-1.227-.374-.374-.73-.606-1.227-.799-.373-.15-.937-.322-1.973-.37-1.252-.057-1.628-.069-4.795-.069zm0 3.905a5.248 5.248 0 1 1 0 10.496 5.248 5.248 0 0 1 0-10.496zm0 1.684a3.564 3.564 0 1 0 0 7.128 3.564 3.564 0 0 0 0-7.128zm5.406-.994a1.224 1.224 0 1 1 0 2.448 1.224 1.224 0 0 1 0-2.448z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="flex md:justify-end justify-center gap-6 items-center flex-wrap">
            <div className="hidden">
              <a
                href="https://www.facebook.com/pormenor2006/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 text-white/80 hover:text-white transition-colors"
                title="Facebook"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
                  <path d="M22.675 0h-21.35C.596 0 0 .596 0 1.325v21.351C0 23.404.596 24 1.325 24H12.82v-9.294H9.692V11.01h3.128V8.41c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.098 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.765v2.239h3.592l-.468 3.696h-3.124V24h6.116C23.404 24 24 23.404 24 22.676V1.325C24 .596 23.404 0 22.675 0z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/pormenor_legavalia/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 text-white/80 hover:text-white transition-colors"
                title="Instagram"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.35 3.608 1.325.975.975 1.263 2.242 1.325 3.608.058 1.266.07 1.646.07 4.834s-.012 3.568-.07 4.834c-.062 1.366-.35 2.633-1.325 3.608-.975.975-2.242 1.263-3.608 1.325-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.35-3.608-1.325-.975-.975-1.263-2.242-1.325-3.608C2.175 15.568 2.163 15.188 2.163 12s.012-3.568.07-4.834c.062-1.366.35-2.633 1.325-3.608C4.533 2.583 5.8 2.295 7.166 2.233 8.432 2.175 8.812 2.163 12 2.163zm0 1.684c-3.167 0-3.543.012-4.795.069-1.036.048-1.6.22-1.973.37-.497.193-.853.425-1.227.799-.374.374-.606.73-.799 1.227-.15.373-.322.937-.37 1.973-.057 1.252-.069 1.628-.069 4.795s.012 3.543.069 4.795c.048 1.036.22 1.6.37 1.973.193.497.425.853.799 1.227.374.374.73.606 1.227.799.373.15.937.322 1.973.37 1.252.057 1.628.069 4.795.069s3.543-.012 4.795-.069c1.036-.048 1.6-.22 1.973-.37.497-.193.853-.425 1.227-.799.374-.374.606-.73.799-1.227.15-.373.322-.937.37-1.973.057-1.252.069-1.628.069-4.795s-.012-3.543-.069-4.795c-.048-1.036-.22-1.6-.37-1.973-.193-.497-.425-.853-.799-1.227-.374-.374-.73-.606-1.227-.799-.373-.15-.937-.322-1.973-.37-1.252-.057-1.628-.069-4.795-.069zm0 3.905a5.248 5.248 0 1 1 0 10.496 5.248 5.248 0 0 1 0-10.496zm0 1.684a3.564 3.564 0 1 0 0 7.128 3.564 3.564 0 0 0 0-7.128zm5.406-.994a1.224 1.224 0 1 1 0 2.448 1.224 1.224 0 0 1 0-2.448z"/>
                </svg>
              </a>
            </div>
            <a href="/politica-de-privacidade" className="text-white/35 hover:text-white text-sm transition-colors no-underline">
              Política de Privacidade
            </a>
            <a href="/termos-e-condicoes" className="text-white/35 hover:text-white text-sm transition-colors no-underline">
              Termos e Condições
            </a>
            <a href="https://www.livroreclamacoes.pt/" className="text-white/35 hover:text-white text-sm transition-colors no-underline">
              Livro de Reclamações
            </a>
          </div>
        </div>
        <div className="pt-4">
          <p className="text-white/30 text-sm text-center">
            © 2026 Pormenor. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
