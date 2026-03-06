"use client";

import Link from "next/link";
import Logo from "./Logo";

const navLinks = [
  { href: "#about", label: "Sobre Nós" },
  { href: "#services", label: "Serviços" },
  { href: "#coc", label: "Pedido de COC" },
  { href: "#contacts", label: "Contacto" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/92 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-[72px]">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <Logo className="h-13 w-auto" width={164} height={31} />
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

        <a
          href="#isv"
          className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-[10px] font-display font-bold text-sm transition-all shadow-lg shadow-primary/25 hover:-translate-y-px no-underline"
        >
          Simule o ISV
        </a>
      </div>
    </header>
  );
}
