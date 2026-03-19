"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";

interface Props {
  slug?: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  src?: string;
}

export default function BrandLogo({ slug, alt, className, width = 120, height = 60, src: preferred }: Props) {
  const sources: (string | StaticImageData)[] = preferred
    ? [preferred]
    : slug
    ? [
        `/brands/${slug}.png`,
        `/brands/${slug}.svg`,
        `https://logo.clearbit.com/${slug}.com`,
      ]
    : [];
  const [idx, setIdx] = useState(0);
  const src = sources[Math.min(idx, Math.max(sources.length - 1, 0))] || "";

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className ?? "h-10 w-auto object-contain"}
      onError={() => setIdx((i) => Math.min(i + 1, sources.length - 1))}
    />
  );
}
