"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { href: "#about", label: "Sobre Nós" },
  { href: "#services", label: "Serviços" },
  { href: "#coc", label: "Pedido de COC" },
  { href: "/declaracoes-tecnicas", label: "Declarações Técnicas" },
  { href: "/simulador-iuc", label: "Simulador IUC" },
  { href: "#contacts", label: "Contacto" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/92 backdrop-blur-md border-b border-[var(--border)]">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-[72px]" suppressHydrationWarning>
          <Link href="/" className="flex items-center gap-3 no-underline">
            <Logo className="h-13 w-auto" width={164} height={31} />
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-base font-semibold text-navy hover:text-primary transition-colors no-underline"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href="#contacts"
            className="hidden md:inline-flex bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-[10px] font-display font-bold text-sm transition-all shadow-lg shadow-primary/25 hover:-translate-y-px no-underline"
          >
            Simule agora
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[var(--bg)] transition-colors"
            aria-label="Abrir menu"
          >
            <span className="material-symbols-outlined text-navy text-[28px]">menu</span>
          </button>
        </div>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
      />
    </>
  );
}
