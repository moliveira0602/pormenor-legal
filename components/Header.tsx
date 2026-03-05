"use client";

import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "#services", label: "Serviços" },
  { href: "#isv", label: "Simulador ISV" },
  { href: "#about", label: "Sobre Nós" },
  { href: "#contacts", label: "Contactos" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/92 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 no-underline">
          <Image
            src="https://pormenor.pt/platform-images/cms/header/logotipo-1/0af1c8a8-cd26-4429-bb58-5b07dc970df0.png?p=medium&w=164&h=31&fm=png&fill=transparent&s=f04b1a425107f1b48b4ea809fbae6a58"
            alt="Pormenor"
            width={164}
            height={31}
            className="h-6 w-auto"
            priority
          />
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-muted hover:text-primary transition-colors no-underline"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contacts"
          className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-[10px] font-display font-bold text-sm transition-all shadow-lg shadow-primary/25 hover:-translate-y-px no-underline"
        >
          Contactar
        </a>
      </div>
    </header>
  );
}
