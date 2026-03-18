import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo';

export const dynamic = 'force-static';

// Base URL from config
const BASE_URL = siteConfig.url;

export default function sitemap(): MetadataRoute.Sitemap {
  // Static routes
  const routes = [
    '',
    '/legalizacao-automovel',
    '/pedido-de-coc',
    '/servicos-imt',
    '/simulador-isv',
    '/importar-carro',
    '/politica-de-privacidade',
    '/termos-e-condicoes',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Brand pages (Programmatic SEO)
  const brands = [
    'bmw', 'mercedes', 'audi', 'volkswagen', 'toyota', 'tesla', 
    'peugeot', 'renault', 'citroen', 'seat', 'volvo', 'porsche'
  ];

  const brandRoutes = brands.map((brand) => ({
    url: `${BASE_URL}/legalizacao/${brand}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Country pages (Programmatic SEO)
  const countries = ['alemanha', 'franca', 'espanha', 'italia', 'belgica', 'holanda'];
  
  const countryRoutes = countries.map((country) => ({
    url: `${BASE_URL}/importar-de/${country}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...brandRoutes, ...countryRoutes];
}
