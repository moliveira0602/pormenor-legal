# Pormenor Legal — Plataforma de Legalização Automóvel

![Pormenor Legal](https://pormenor.etos.pt/og-image.jpg)

Bem-vindo ao repositório oficial da **Pormenor Legal**, uma plataforma web moderna desenvolvida para simplificar o processo de legalização e importação de veículos em Portugal. Este projeto inclui um simulador de ISV (Imposto Sobre Veículos) de última geração, guias de importação e um sistema de SEO programático.

## 🚀 Funcionalidades Principais

### 1. Simulador ISV 2025/2026
Um motor de cálculo fiscal preciso e atualizado com as regras do Orçamento do Estado 2025.
- **Cálculo em Tempo Real**: Cilindrada, CO₂, Partículas, Idade e Tipo de Combustível.
- **Suporte Completo**: Veículos Novos vs Usados, Gasolina, Diesel, Híbridos (HEV/PHEV) e Elétricos.
- **Regras Avançadas**:
  - Desconto de idade unificado para importados da UE.
  - Agravamento para Diesel com partículas > 0.001g/km.
  - Benefícios fiscais para Híbridos Plug-in com autonomia ≥ 50km.

### 2. Arquitetura SEO Programática
O site gera automaticamente centenas de páginas otimizadas para motores de busca (Google).
- **Páginas por Marca**: `/legalizacao/bmw`, `/legalizacao/mercedes`, `/legalizacao/tesla`, etc.
- **Páginas por País**: `/importar-de/alemanha`, `/importar-de/franca`, `/importar-de/espanha`, etc.
- **Infraestrutura Técnica**:
  - `sitemap.xml` e `robots.txt` gerados automaticamente.
  - Metadata dinâmica e JSON-LD Schema (FAQ, Organization, Service).

### 3. Pedidos de COC e Contactos
- Formulários integrados para pedido de Certificado de Conformidade.
- Sistema de envio de emails via PHP (`send-mail.php`) sem custos externos.
- Validação de formulários e feedback ao utilizador.

## 🛠️ Stack Tecnológico

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Fontes**: Google Fonts (Syne + DM Sans)
- **Ícones**: Material Symbols
- **Deploy**: Exportação Estática (`output: export`) compatível com cPanel/Apache.

## 📂 Estrutura do Projeto

```bash
legalizept/
├── app/
│   ├── layout.tsx           # Layout base com Metadata e Fontes
│   ├── page.tsx             # Homepage
│   ├── simulador-isv/       # Pillar Page: Simulador + FAQs
│   ├── importar-carro/      # Pillar Page: Guia de Importação
│   ├── legalizacao/         # [SEO] Páginas dinâmicas por Marca
│   └── importar-de/         # [SEO] Páginas dinâmicas por País
├── components/
│   ├── IsvSimulator.tsx     # Componente React do Simulador
│   ├── JsonLd.tsx           # Injector de Schema.org
│   └── ...
├── lib/
│   ├── isv/                 # Motor de Cálculo (Domain Logic)
│   │   ├── calculation.ts   # Algoritmo fiscal
│   │   └── tables.ts        # Tabelas oficiais OE2025
│   └── seo.ts               # Configurações globais de SEO
└── public/
    ├── .htaccess            # Configuração Apache para rotas limpas
    └── send-mail.php        # Backend simples para envio de emails
```

## ⚡ Como Começar

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/pormenor/legalizept.git

# Entrar na pasta
cd legalizept

# Instalar dependências
npm install
```

### Desenvolvimento Local

```bash
npm run dev
# Aceda a http://localhost:3000
```

### Build para Produção (cPanel)

```bash
npm run build
```
Isto irá gerar uma pasta `out` com o site estático pronto a ser enviado para a pasta `public_html` do seu servidor.

## 🧪 Testes

O projeto inclui scripts para validar o motor de cálculo do ISV:

```bash
npx tsx lib/isv/test-script.ts
```

## 🌍 SEO e Sitemaps

O ficheiro `sitemap.xml` é gerado automaticamente durante o build. Para adicionar novas marcas ou países às páginas programáticas, edite as constantes em:
- `app/legalizacao/[marca]/page.tsx`
- `app/importar-de/[pais]/page.tsx`

---

Desenvolvido com ❤️ pela **Pormenor Legal**.
