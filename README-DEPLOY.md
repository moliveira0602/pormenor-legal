# Deploy para cPanel - Pormenor Legal

## 📦 Arquivos para Upload

### **Arquivo Principal para Deploy Estático**
- **`pormenor-legal-static.zip`** (110MB)
  - Contém todos os arquivos estáticos para upload no cPanel
  - Build otimizado para produção
  - Inclui ambos os simuladores (ISV e IUC)

### **Arquivo Anterior (Node.js)**
- **`pormenor-legal-build.zip`** (110MB)
  - Versão para servidores Node.js
  - Não recomendado para cPanel padrão

## 🚀 Instruções de Deploy

### 1. Upload dos Arquivos
1. Acesse o cPanel do seu domínio
2. Vá até **File Manager** (Gerenciador de Arquivos)
3. Navegue até o diretório raiz do seu site (normalmente `public_html`)
4. Clique em **Upload** e envie o arquivo `pormenor-legal-static.zip`
5. Aguarde o upload ser concluído

### 2. Extração dos Arquivos
1. No File Manager, localize o arquivo `pormenor-legal-static.zip`
2. Clique com o botão direito e selecione **Extract** (Extrair)
3. Escolha o diretório de destino (normalmente `public_html`)
4. Clique em **Extract File(s)**

### 3. Configuração do Servidor (Deploy Estático)
**Para deploy estático, não é necessário Node.js!**
- O site funciona apenas com arquivos HTML, CSS e JavaScript
- Não é necessário configurar servidores Node.js
- Não é necessário PM2 ou variáveis de ambiente

### 4. Permissões
1. Certifique-se de que as permissões estejam corretas:
   - Pasta `_next`: 755
   - Arquivos HTML: 644
   - Arquivos CSS/JS: 644
   - Arquivos de mídia: 644

### 5. Configuração de Domínio
1. **Diretório Principal**: `public_html`
2. **Arquivo Principal**: `index.html`
3. **URL Base**: `https://seudominio.com/`

## 📁 Estrutura do Build Estático

```
pormenor-legal-static.zip
├── index.html               # Página principal
├── _next/                   # Arquivos estáticos do Next.js
│   ├── static/              # CSS, JS e imagens
│   └── 9VjqDnGBe5pB1eSMohIOP/  # Recursos compilados
├── simulador-isv/           # Página do simulador ISV
├── simulador-iuc/           # Página do simulador IUC
├── legalizacao/             # Páginas de legalização por marca
├── importar-de/             # Páginas de importação por país
├── sitemap.xml             # Mapa do site
├── robots.txt              # Configuração de crawlers
└── .htaccess               # Configuração do servidor
```

## 🔧 Comandos Úteis

### Verificar Status
```bash
# Verificar se o Node.js está rodando
ps aux | grep node

# Verificar logs
tail -f /path/to/your/logs
```

### Reiniciar Aplicação
```bash
# Se estiver usando PM2
pm2 restart all

# Ou reinicie manualmente
pkill -f node
node .next/server.js
```

## 🌐 URLs de Teste

Após o deploy, teste as URLs:
- **Página Principal**: `https://seudominio.com/`
- **Simulador ISV**: `https://seudominio.com/simulador-isv`
- **Simulador IUC**: `https://seudominio.com/simulador-iuc`

## 🐛 Troubleshooting (Deploy Estático)

### Erro 403 (Redireciona para 403.shtml/)
**Solução rápida:**
1. **Verifique permissões**: Arquivos 644, Pastas 755
2. **Crie o arquivo `.htaccess`** (se não existir) com:
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.html [QSA,L]
```
3. **Limpe cache do navegador** (Ctrl+F5)
4. **Reextraia o ZIP** se necessário

### Erro 500
- Verifique as permissões dos arquivos (HTML: 644, CSS/JS: 644, _next: 755)
- Confira se o arquivo `.htaccess` foi extraído corretamente
- Verifique se há arquivos corrompidos no upload

### Erro 404
- Verifique se o arquivo `index.html` existe no diretório `public_html`
- Confira se as pastas `_next` e `simulador-iuc` foram extraídas corretamente
- Verifique se o domínio está apontando para o diretório correto

### Página Não Carrega
- Verifique se o arquivo `.htaccess` está presente
- Confira se o navegador não está usando cache (Ctrl+F5)
- Verifique se há erros no console do navegador (F12)

### Simuladores Não Funcionam
- Verifique se a pasta `_next/static` foi extraída corretamente
- Confira se os arquivos JavaScript foram carregados (verifique o console)
- Verifique se há erros de CORS no console do navegador

### **Arquivo de Solução Detalhada**
Consulte `FIX-403.md` para solução completa do erro 403.

## 📞 Suporte

Para suporte técnico:
1. Verifique os logs no cPanel
2. Teste localmente antes de fazer upload
3. Consulte a documentação do Next.js: https://nextjs.org/docs

## ✅ Verificação Final

Após o deploy:
- [ ] Página carrega corretamente
- [ ] Simulador ISV funciona
- [ ] Simulador IUC funciona
- [ ] Todas as rotas estão acessíveis
- [ ] Não há erros no console
- [ ] Performance está adequada