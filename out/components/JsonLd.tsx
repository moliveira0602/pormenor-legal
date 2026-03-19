import React from "react";

type JsonLdProps = {
  data: Record<string, any>;
};

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Pormenor - Legalização Automóvel",
  url: "https://pormenor.etos.pt",
  logo: "https://pormenor.etos.pt/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+351 912 345 678",
    contactType: "customer service",
    areaServed: "PT",
    availableLanguage: ["Portuguese", "English", "French"],
  },
  sameAs: [
    "https://www.facebook.com/pormenor2006/",
    "https://www.instagram.com/pormenor_legavalia/",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Pormenor",
  url: "https://pormenor.etos.pt",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://pormenor.etos.pt/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};
