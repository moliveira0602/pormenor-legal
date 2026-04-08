"use client";

import { useEffect } from "react";
import Link from "next/link";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export default function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] md:hidden">
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute top-0 right-0 w-72 h-full bg-white shadow-2xl animate-slide-in p-6">
        <div className="flex justify-end mb-6">
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[var(--bg)]"
          >
            <span className="material-symbols-outlined text-navy text-[28px]">close</span>
          </button>
        </div>
        <nav className="flex flex-col gap-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={onClose}
              className="text-lg font-semibold text-navy hover:text-primary py-3 border-b border-[var(--border)] no-underline"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/simulador-iuc"
            onClick={onClose}
            className="mt-4 bg-primary hover:bg-primary-dark text-white px-5 py-3 rounded-[10px] font-display font-bold text-base text-center no-underline"
          >
            Simular IUC
          </a>
        </nav>
      </div>
      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease forwards;
        }
      `}</style>
    </div>
  );
}
