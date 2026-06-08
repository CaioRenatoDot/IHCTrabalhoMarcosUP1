<div align="center">
  <img src="./public/riskcare_logo.png" alt="RiskCare Logo" width="160" height="160" />

  # RiskCare | Estimativa educativa de risco de câncer de mama

  <p>
    Plataforma web educativa para conscientização, triagem orientativa e visualização de fatores
    associados ao risco de câncer de mama, com foco em clareza, acessibilidade e rastreabilidade.
  </p>

  <a href="https://riskcare-psi.vercel.app/"><strong>Acessar projeto</strong></a>
</div>

<br />

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000000" alt="JavaScript">
  <img src="https://img.shields.io/badge/Express-111111?style=for-the-badge&logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma">
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase">
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
</div>

---

## Visão Geral

O RiskCare foi desenvolvido como um projeto acadêmico de IHC para oferecer uma experiência educativa de avaliação orientativa de risco de câncer de mama. A proposta não é substituir diagnóstico médico, mas organizar fatores de contexto, histórico e estilo de vida em um fluxo claro, seguro e visualmente consistente.

A aplicação foi pensada para manter a pessoa usuária dentro de uma jornada contínua: entrar, preencher o formulário, ver o resultado, retornar ao histórico e navegar entre as telas com fluidez. A interface combina feedbacks visuais, comparativos e explicações em linguagem direta para reforçar o caráter educativo da ferramenta.

## Funcionalidades Principais

- Cadastro e login de usuários com sessão protegida
- Questionário orientativo com múltiplas etapas
- Calculadora de IMC integrada ao formulário
- Resultado com score, classificação e comparativos
- Matrizes de referência e detalhamento por fator
- Modal de confirmação para ações sensíveis
- Navegação SPA com transições suaves entre rotas
- Persistência com Prisma, Supabase e PostgreSQL
- Registro de consentimento e eventos de autenticação
- Regras de RLS e políticas de segurança no banco
- Recursos de acessibilidade e contraste
- Animações pontuais para reforçar a leitura da interface

## Tecnologias Utilizadas

### Frontend

- React
- Vite
- JavaScript
- Recharts
- GSAP
- Lenis

### Backend

- Node.js
- Express
- Prisma
- Supabase Auth
- CSRF
- Rate limiting
- Cookies seguros

### Banco e Persistência

- PostgreSQL
- Supabase Postgres
- Prisma migrations
- Row Level Security
- JSONB para snapshots e detalhamentos

## Estrutura do Projeto

```text
.
├── api/                Adaptadores para deploy na Vercel
├── data/               Bases de apoio e referências dos datasets
├── docs/               Materiais complementares do projeto
├── prisma/             Schema, migrations e seed
├── server/             Backend em Node.js e Express
├── src/                Frontend da aplicação
└── README.md           Documentação principal
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

### Build de produção

```bash
npm run build
```

## Variáveis de Ambiente

### Frontend

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_API_BASE_URL=
```

### Backend

```env
SUPABASE_URL=
SUPABASE_PUBLISHABLE_KEY=
DATABASE_URL=
DIRECT_URL=
FRONTEND_ORIGIN=
SESSION_COOKIE_NAME=
CSRF_COOKIE_NAME=
RATE_LIMIT_WINDOW_MS=
RATE_LIMIT_MAX=
```

## Dados e Persistência

O projeto foi estruturado para registrar e recuperar a avaliação de forma rastreável. Isso inclui:

- Mapeamento dos campos do questionário
- Versionamento do modelo de risco
- Armazenamento de respostas e snapshots normalizados
- Detalhamento fator a fator do score
- Registro de consentimento
- Auditoria de eventos de autenticação
- Catálogo de bases e referências do MVP

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

- Os dados sensíveis são processados com foco em minimização
- A autenticação é mediada por backend e sessão segura
- As tabelas expostas possuem RLS aplicado
- As tabelas de catálogo têm leitura controlada
- O sistema reforça continuamente que a ferramenta não realiza diagnóstico médico

## Participantes

### Caio Gabriel Pereira de Menezes Correia

Principais entregas:

- Criação e evolução da tela de login
- Criação e evolução do formulário de avaliação
- Ajustes gerais no frontend, principalmente nas telas de formulário e resultado
- Aplicação do Lenis
- Aplicação do GSAP em componente da landing
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
- A persistência foi pensada para permitir rastreabilidade e evolução do sistema

## Licença

Este projeto utiliza a licença **MIT**.

Ela foi escolhida por ser simples, permissiva e adequada para um projeto acadêmico que pode ser
apresentado, estudado e reutilizado com pouca fricção, desde que o aviso de copyright e a
permissão original sejam mantidos.

---

Desenvolvido para fins acadêmicos em saúde digital.
