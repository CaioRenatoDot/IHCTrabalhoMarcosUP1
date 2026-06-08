<div align="center">
  <img src="./riskcare_logo.png" alt="RiskCare Logo" width="180" height="180" />

  # RiskCare

  <p>Plataforma web educativa para conscientização e estimativa orientativa de risco de câncer de mama.</p>

  > Este sistema não fornece diagnóstico médico. O objetivo é educativo, informativo e de apoio à reflexão sobre fatores de risco.
</div>

## Visão Geral

O RiskCare é uma aplicação web desenvolvida para apoiar a conscientização e a prevenção do câncer de mama por meio de um fluxo orientativo de avaliação.

A plataforma permite que a usuária ou o usuário:

- Crie conta e autentique o acesso
- Preencha um questionário com dados pessoais, históricos e fatores de risco
- Receba uma estimativa orientativa de risco
- Visualize resultados com classificação, comparativos e fatores de maior impacto
- Utilize recursos de acessibilidade e navegação suave
- Tenha os dados tratados com foco em segurança e rastreabilidade

## Funcionalidades Principais

- Cadastro e login de usuários
- Sessão protegida por backend
- Questionário para coleta de dados
- Cálculo heurístico de risco
- Tela de resultados com score e classificação
- Comparativos e detalhamento de fatores
- Persistência com Prisma e Supabase
- Catálogo de bases de referência
- Versionamento do modelo de risco
- Auditoria de eventos de autenticação
- Regras de RLS para proteção de dados
- Recursos de acessibilidade
- Rolagem suave com Lenis
- Animações pontuais com GSAP

## Tecnologias Utilizadas

### Frontend

- React
- Vite
- JavaScript
- React Router
- Lenis
- GSAP
- Supabase Auth

### Backend

- Node.js
- Express
- Prisma
- PostgreSQL
- Supabase
- CSRF
- Rate limiting
- Cookies seguros com HttpOnly, Secure e SameSite

### Banco e Persistência

- Supabase Postgres
- Prisma migrations
- Row Level Security
- JSONB para snapshots e detalhamentos

## Estrutura do Projeto

```text
.
├── src/                    Frontend da aplicação
├── server/                 Backend em Node.js e Express
├── prisma/                 Schema, migrations e seed
└── README.md               Documentação principal
```

## Como Executar

### Instalação

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

### Ambiente completo

```bash
npm run dev:full
```

### Prisma

```bash
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
```

## Dados e Persistência

O projeto possui uma camada de persistência e rastreabilidade para:

- Mapear campos do questionário para bases de referência
- Versionar a lógica de avaliação
- Registrar eventos de autenticação
- Salvar o resultado da avaliação
- Manter detalhes fator a fator
- Aplicar políticas de segurança com RLS

### Entidades Principais

- Profile - dados do usuário
- QuestionnaireResponse - respostas do questionário
- RiskAssessment - avaliação de risco
- ConsentRecord - registro de consentimento
- DatasetReference - bases de referência
- DatasetFeatureMapping - mapeamento de campos
- RiskModelVersion - versões do modelo de risco
- AuthEvent - eventos de autenticação
- AssessmentFactorDetail - detalhes fator a fator

## Segurança e Privacidade

- Dados sensíveis ficam protegidos por sessão e backend
- RLS é aplicado nas tabelas expostas
- Tabelas de catálogo possuem leitura controlada
- Tabelas de auditoria são restritas ao backend/service role
- O sistema reforça que não se trata de diagnóstico médico

## Contribuições

### Caio Gabriel Pereira de Menezes Correia

Principais entregas:

- Criação e evolução da tela de login
- Criação e evolução do formulário de avaliação
- Ajustes gerais no frontend, principalmente nas telas de formulário e resultado
- Aplicação do Lenis
- Aplicação do GSAP em componente da dashboard inicial
- Implementação de acessibilidade de zoom e lupa de texto
- Implementação inicial do backend
- Integração com o Supabase
- Primeira versão da lógica de pesos da pontuação do formulário
- Ajustes de contraste e detalhes visuais de interface

### Caio Renato dos Santos Claudino

Principais entregas:

- Ajustes gerais no frontend
- Melhorias na experiência visual das telas de formulário e resultado
- Contribuições na aplicação de contraste
- Ajustes de detalhes visuais e refinamento de interface

### Thalita Pereira de Andrade

Principais entregas:

- Sugestões para a arquitetura do sistema de autenticação
- Criação e realização da issue relacionada à navegação por barra
- Ideias gerais para a estruturação do projeto
- Acompanhamento do progresso e testes para retorno ao time

### José Francisco de Araújo Neto

Principais entregas:

- Estruturação do projeto e organização da documentação
- Divisão e acompanhamento das etapas de planejamento
- Definição de escopo, roadmap e checklist do projeto
- Consolidação da lógica de dados, Prisma, RLS e separação de responsabilidades
- Implementação do VLibras

## Observações

- O motor atual é heurístico e explicável
- O resultado é orientativo
- O projeto foi desenvolvido com foco em acessibilidade, segurança e clareza de interface
- O banco e a lógica de avaliação foram integrados para permitir rastreabilidade e evolução do sistema

---

Desenvolvido para fins acadêmicos em saúde digital
