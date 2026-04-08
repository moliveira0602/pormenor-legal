"use client";

import { useState, useMemo } from "react";
import BrandCard from "./BrandCard";
import { brands, getAvailableLetters } from "@/lib/coc/brands";

export default function BrandGrid() {
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const availableLetters = useMemo(() => getAvailableLetters(brands), []);

  const filtered = useMemo(() => {
    if (!activeLetter) return brands;
    return brands.filter(
      (b) =>
        b.name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .charAt(0)
          .toUpperCase() === activeLetter
    );
  }, [activeLetter]);

  return (
    <div>
      {/* Letter filter */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {availableLetters.map((letter) => (
          <button
            key={letter}
            onClick={() =>
              setActiveLetter(activeLetter === letter ? null : letter)
            }
            className={`w-9 h-9 rounded-lg text-sm font-bold transition-colors ${
              activeLetter === letter
                ? "bg-primary text-white"
                : "bg-[var(--navy-mid)]/5 text-navy hover:bg-primary/10 hover:text-primary border border-[var(--border)]"
            }`}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Brand grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map((brand) => (
          <BrandCard key={brand.slug} brand={brand} />
        ))}
      </div>

      {/* Fallback message */}
      {filtered.length === 0 && (
        <p className="text-muted text-sm mt-4">
          Nenhuma marca encontrada com a letra seleccionada.
        </p>
      )}

      <p className="text-muted text-sm mt-6">
        Não encontrou a marca pretendida?{" "}
        <a href="/#contacts" className="text-primary font-semibold no-underline hover:underline">
          Entre em contacto connosco
        </a>{" "}
        e encomende o COC.
      </p>
    </div>
  );
}
