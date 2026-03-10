# LegalizePT — Next.js + TypeScript

Website de legalização automóvel construído com **Next.js 14**, **TypeScript** e **Tailwind CSS**.

## Stack

- **Next.js 14** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS v3**
- **Google Fonts** — Syne (display) + DM Sans (body)
- **Material Symbols** (ícones)

## Estrutura

```
legalizept/
├── app/
│   ├── globals.css        # CSS global + variáveis CSS
│   ├── layout.tsx         # Root layout + fonts
│   └── page.tsx           # Página principal
├── components/
│   ├── Header.tsx         # Navegação sticky
│   ├── Hero.tsx           # Secção hero com imagem
│   ├── StatsBar.tsx       # Barra de estatísticas
│   ├── IsvSimulator.tsx   # Simulador ISV interativo (Frontend)
│   ├── Services.tsx       # Grid de serviços
│   ├── Process.tsx        # Processo passo-a-passo
│   ├── WhyUs.tsx          # Porquê escolher-nos
│   ├── Testimonials.tsx   # Depoimentos de clientes
│   └── Footer.tsx         # Rodapé + formulário de contacto
├── lib/
│   └── isv/               # Motor de Cálculo de ISV (Domain Layer)
│       ├── index.ts       # Entry point
│       ├── types.ts       # Definições de tipos
│       ├── tables.ts      # Tabelas oficiais (2025/2026)
│       ├── calculation.ts # Lógica de cálculo
│       └── test-script.ts # Script de verificação
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Motor de Cálculo de ISV (Atualização 2026)

O simulador de ISV foi refatorado para utilizar uma arquitetura robusta e baseada em dados oficiais.

### Características
- **Base Legal**: Orçamento do Estado 2025 e alterações previstas para 2026.
- **Tabelas**: Configuradas em `lib/isv/tables.ts`.
- **Lógica**: Centralizada em `lib/isv/calculation.ts`.
- **Suporte**:
  - Veículos Novos vs Usados (Importados da UE com desconto de idade).
  - Gasolina, Diesel, Híbridos (HEV/MHEV/PHEV), Elétricos, GPL.
  - Agravamento Diesel (Partículas).
  - Benefício Fiscal para Híbridos Plug-in (Autonomia >= 50km, CO2 < 50g/km).
  - Redução por idade unificada (Componente Cilindrada + Ambiental).

### Como Atualizar as Tabelas (Anualmente)
1. Abra o ficheiro `lib/isv/tables.ts`.
2. Atualize os valores nos arrays `cc`, `co2`, e `ageReduction` conforme o Orçamento do Estado do novo ano.
3. Se houver alterações estruturais na lei (ex: nova fórmula), edite `lib/isv/calculation.ts`.

### Como Correr os Testes do Simulador
Para validar o cálculo com cenários reais:

```bash
npx tsx lib/isv/test-script.ts
```

## Arquitetura SEO (Novo)

O projeto implementa uma estratégia de SEO programático para maximizar a visibilidade orgânica.

### 1. Páginas Programáticas
Foram criadas rotas dinâmicas geradas estaticamente (`generateStaticParams`) para cobrir centenas de combinações de pesquisa:

- **Por Marca**: `/legalizacao/[marca]` (ex: `/legalizacao/bmw`, `/legalizacao/mercedes`)
- **Por País**: `/importar-de/[pais]` (ex: `/importar-de/alemanha`, `/importar-de/franca`)

### 2. Infraestrutura Técnica
- **Metadata Dinâmica**: Títulos e descrições otimizados automaticamente para cada página.
- **JSON-LD Schema**: Dados estruturados para Organização, WebSite, FAQPage, Service e Article.
- **Sitemap.xml**: Gerado automaticamente em `app/sitemap.ts`.
- **Robots.txt**: Configurado em `app/robots.ts`.

### 3. Como Adicionar Novas Páginas SEO
Para adicionar novas marcas ou países, edite as constantes nos respetivos ficheiros:
- **Marcas**: Adicione ao array `BRANDS` em `app/legalizacao/[marca]/page.tsx`.
- **Países**: Adicione ao array `COUNTRIES` em `app/importar-de/[pais]/page.tsx`.

Ao reconstruir o site (`npm run build`), o Next.js irá gerar automaticamente as novas páginas estáticas HTML.

## Início Rápido

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento
npm run dev

# Build de produção
npm run build
npm start
```

Abra [http://localhost:3000](http://localhost:3000) no browser.

## Funcionalidades

- ✅ Simulador de ISV com cálculo real (cilindrada, CO₂, combustível, ano, origem)
- ✅ Formulário de contacto com feedback de sucesso
- ✅ Navegação smooth-scroll
- ✅ Design totalmente responsivo (mobile-first)
- ✅ Tipagem TypeScript estrita em todos os componentes
- ✅ Optimização de imagens com `next/image`
- ✅ Fontes optimizadas com `next/font/google`
- ✅ **SEO Avançado e Programático**
