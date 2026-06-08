<div align="center">
  <img src="./riskcare_logo.png" alt="RiskCare Logo" width="200" height="200" />
  
  # RiskCare
  
  <p>Plataforma web educativa para conscientização e estimativa orientativa de risco de câncer de mama.</p>
  
  ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
  ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
  ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
  ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
  
  > O sistema **não fornece diagnóstico médico**. A proposta é educativa, informativa e de apoio à reflexão sobre fatores de risco.
</div>

## 📋 Visão Geral

O **RiskCare** é uma aplicação web que permite ao usuário:

- Criar conta e fazer login
- Preencher um questionário com dados pessoais, históricos e fatores de risco
- Receber uma estimativa orientativa de risco
- Visualizar o resultado com classificação, comparativos e fatores de maior impacto
- Utilizar recursos de acessibilidade e navegação suave
- Ter os dados persistidos com segurança no backend e no banco

## ✨ Funcionalidades

- ✅ Cadastro e login de usuários
- ✅ Sessão protegida por backend
- ✅ Questionário em múltiplas etapas
- ✅ Cálculo heurístico do risco
- ✅ Tela de resultados com score e classificação
- ✅ Comparativos e fatores de maior impacto
- ✅ Persistência com Prisma + Supabase
- ✅ Catálogo de bases de referência
- ✅ Versionamento do motor de risco
- ✅ Auditoria de eventos
- ✅ RLS para proteção de dados
- ✅ Recursos de acessibilidade
- ✅ Rolagem suave com Lenis
- ✅ Animações pontuais com GSAP

## 🛠️ Tecnologias

### Frontend
- **React** - UI component library
- **Vite** - Build tool
- **JavaScript** - Language
- **React Router** - Client-side routing
- **Lenis** - Smooth scrolling
- **GSAP** - Animation library
- **Supabase Auth** - Authentication

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **Prisma** - ORM
- **PostgreSQL** - Database
- **Supabase** - Backend as a service
- **CSRF** - Request forgery protection
- **Rate limiting** - API protection
- **Cookies seguros** - HttpOnly, Secure, SameSite

### Banco e Persistência
- **Supabase Postgres** - Managed database
- **Prisma migrations** - Schema management
- **RLS (Row Level Security)** - Data isolation
- **JSONB** - Snapshots e detalhamentos

## 📁 Estrutura do Projeto

```
.
├── src/                    # Frontend da aplicação
├── server/                 # Backend em Node.js e Express
├── prisma/                 # Schema, migrations e seed
└── README.md               # Este arquivo
```

## 🚀 Como Executar

### Instalar dependências
```bash
npm install
```

### Frontend
```bash
npm run dev
```

### Backend
```bash
npm run server
```

### Prisma
```bash
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
```

## 💾 Bases e Persistência

O projeto possui uma camada de persistência e rastreabilidade para:

- Mapear campos do questionário para bases de referência
- Versionar a lógica de avaliação
- Registrar eventos de autenticação
- Salvar o resultado da avaliação
- Manter detalhes fator-a-fator
- Aplicar políticas de segurança com RLS

### Entidades principais

- **Profile** - Dados do usuário
- **QuestionnaireResponse** - Respostas do questionário
- **RiskAssessment** - Avaliação de risco
- **ConsentRecord** - Registro de consentimento
- **DatasetReference** - Bases de referência
- **DatasetFeatureMapping** - Mapeamento de campos
- **RiskModelVersion** - Versões do motor de risco
- **AuthEvent** - Eventos de autenticação
- **AssessmentFactorDetail** - Detalhes fator-a-fator

## 👥 Integrantes e Contribuições

### Caio Gabriel Pereira de Menezes Correia

**Principais entregas:**

- Criação da tela de login
- Criação do formulário
- Aplicação do Lenis
- Aplicação do GSAP em componente da dashboard inicial com animação de aumento de valor
- Acessibilidade de zoom
- Acessibilidade de lupa de texto
- Implementação inicial do backend
- Ligação com o Supabase
- Implementação da primeira versão da lógica dos pesos de pontuação do formulário
- `feat(accessibility): adicionar controles globais de acessibilidade (#7)` - implementação de acessibilidade de alteração de fonte

### Caio Renato dos Santos Claudino

**Principais entregas:**

- Issue #1 relacionada à PR e à evolução da entrega da frente correspondente

### Thalita Pereira de Andrade

**Principais entregas:**

- Issue #4

### José Francisco de Araújo Neto

**Principais entregas:**

- Implementação do VLibras
- `docs(vlibras): add issue #3 delivery record (#9)`

## 🔒 Segurança e Privacidade

- Dados sensíveis ficam protegidos por sessão e backend
- RLS é aplicado nas tabelas expostas
- Tabelas de catálogo possuem leitura controlada
- Tabelas de auditoria são restritas ao backend/service role
- O sistema reforça que não se trata de diagnóstico médico

## 📝 Observações

- O motor atual é heurístico e explicável
- O resultado é orientativo
- O projeto foi desenvolvido com foco em **acessibilidade**, **segurança** e **clareza de interface**
- O banco e a lógica de avaliação foram integrados para permitir rastreabilidade e evolução do sistema

---

**Desenvolvido com ❤️ para educação em saúde**
