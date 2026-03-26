export const siteConfig = {
  name: "Pormenor",
  description: "Especialistas em Legalização Automóvel e Importação de Veículos em Portugal. Simulador ISV 2025/2026 Gratuito, Pedido de COC e Serviços IMT.",
  url: "https://pormenor.etos.pt", // User provided this domain in previous messages
  ogImage: "https://pormenor.etos.pt/og-image.jpg",
  links: {
    twitter: "https://twitter.com/pormenor",
    github: "https://github.com/pormenor",
  },
  keywords: [
    "legalização automóvel",
    "importar carro",
    "simulador isv",
    "imposto sobre veículos",
    "coc automóvel",
    "certificado de conformidade",
    "serviços imt",
    "legalizar carro importado",
    "custo legalização",
    "documentos automóvel",
    "homologação",
    "matrícula portuguesa",
  ],
};

export type SiteConfig = typeof siteConfig;

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}) {
  return {
    title: {
      default: title,
      template: `%s | ${siteConfig.name} - Legalização Automóvel`,
    },
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@pormenor",
    },
    icons,
    metadataBase: new URL(siteConfig.url),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
