import Link from "next/link";
import type { Brand } from "@/lib/coc/brands";

export default function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Link
      href={`/pedido-de-coc/${brand.slug}`}
      className="group bg-white rounded-xl border border-[var(--border)] hover:border-primary hover:shadow-[0_6px_24px_rgba(199,106,58,0.12)] transition-all no-underline p-4 flex flex-col items-center text-center gap-2"
    >
      <div className="w-16 h-16 rounded-full bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center overflow-hidden">
        <img
          src={brand.logo}
          alt={brand.name}
          className="w-12 h-12 object-contain"
        />
      </div>
      <span className="font-display font-bold text-navy text-sm group-hover:text-primary transition-colors">
        {brand.name}
      </span>
      <span className="text-primary font-bold text-sm">
        {brand.price}€
      </span>
      <span className="text-muted text-xs">
        {brand.daysMin}–{brand.daysMax} dias úteis
      </span>
    </Link>
  );
}
