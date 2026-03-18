"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import localLogo from "@/logo/logo-final.png";

interface Props {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  variant?: "default" | "white";
}

export default function Logo({ className, width = 164, height = 31, priority = true, variant = "default" }: Props) {
  const sources: (string | StaticImageData)[] = [
    localLogo as any,
    "/logo-pormenor.png",
    "https://pormenor.pt/platform-images/cms/header/logotipo-1/0af1c8a8-cd26-4429-bb58-5b07dc970df0.png?p=medium&w=328&h=62&fm=png&fill=transparent&s=f04b1a425107f1b48b4ea809fbae6a58",
  ];
  const [idx, setIdx] = useState(0);
  const src = sources[Math.min(idx, sources.length - 1)];

  return (
    <Image
      src={src}
      alt="Pormenor"
      width={width}
      height={height}
      className={`${className ?? "h-6 w-auto"} ${variant === "white" ? "filter brightness-0 invert" : ""}`}
      onError={() => {
        setIdx((i) => Math.min(i + 1, sources.length - 1));
      }}
      priority={priority}
    />
  );
}
