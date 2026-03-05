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
│   ├── IsvSimulator.tsx   # Simulador ISV interativo
│   ├── Services.tsx       # Grid de serviços
│   ├── Process.tsx        # Processo passo-a-passo
│   ├── WhyUs.tsx          # Porquê escolher-nos
│   ├── Testimonials.tsx   # Depoimentos de clientes
│   └── Footer.tsx         # Rodapé + formulário de contacto
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

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
# pormenor-legal
