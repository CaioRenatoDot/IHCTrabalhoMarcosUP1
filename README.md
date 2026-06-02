# IHCTrabalhoMarcosUP1

Projeto da disciplina de IHC desenvolvido com React + Vite.

## Atividade

A proposta da atividade é:

Escolher uma tela (página) do projeto em equipe e implementar os componentes presentes nessa página.

## Divisão de Responsabilidades

O desenvolvimento desta página foi realizado de forma colaborativa, com divisão de tarefas entre os integrantes da equipe:

Caio Gabriel – Implementação dos cards informativos 

Renato – Desenvolvimento da Navbar e da seção "Saiba Mais", incluindo ajustes visuais para maior fidelidade ao protótipo no Figma 

Thalita – Criação dos cards de estatística e dos botões interativos da interface 

Francisco – Implementação da funcionalidade de Avaliação Gratuita 

Todos os botões e styles foram implementados com sucesso.

## Tela escolhida

A tela implementada neste projeto é a `HomePage`, com foco na experiência da página inicial da aplicação **RiskCare**.

## Componentes implementados na página

- `Navbar`: cabeçalho com marca, links e CTA
- `ConscientizacaoPrevencaoSection`: seção principal com título, descrição, ações e card de risco
- `AvaliacaoGratuitaButton`: CTA principal
- `SaibaMaisButton`: CTA secundária
- `Indicadores`: bloco de métricas em destaque
- `FeatureCard`: cartões de benefícios/funcionalidades
- `ObservationBanner`: aviso informativo ao final da página

## Tecnologias

- React 18
- Vite 5
- Node.js + Express (API REST)
- SQLite nativo do Node (`node:sqlite`, requer Node 22.5+)
- JWT + bcrypt (autenticação)
- JavaScript (JSX)
- CSS global

## Como executar

Em dois terminais:

```bash
npm install
npm run dev:server
```

```bash
npm run dev
```

Copie `.env.example` para `.env` e ajuste `JWT_SECRET` em produção.

Verificação de qualidade:

```bash
npm run lint
```

Para gerar build de produção:

```bash
npm run build
npm run preview
```

## Estrutura do projeto

```text
.
- index.html
- package.json
- vite.config.js
- src
  - main.jsx
  - App.jsx
  - pages
    - HomePage.jsx
  - components
    - Navbar.jsx
    - ConscientizacaoPrevencaoSection.jsx
    - AvaliacaoGratuitaButton.jsx
    - SaibaMaisButton.jsx
    - Indicadores.jsx
    - FeatureCard.jsx
    - ObservationBanner.jsx
    - Hero.jsx
    - Section.jsx
  - styles
    - base.css
    - layout.css
    - navbar.css
    - hero-actions.css
    - awareness.css
    - indicators.css
    - banner.css
    - responsive.css
    - global.css
```

## Arquivos principais

- `src/main.jsx`: ponto de entrada da aplicação e montagem do React
- `src/App.jsx`: componente raiz da interface
- `src/pages/HomePage.jsx`: composição da página com os componentes principais
- `src/styles/global.css`: agregador dos módulos de estilo
- `src/styles/*.css`: estilos divididos por responsabilidade (base, layout, seções e responsividade)
- `src/components/*.jsx`: componentes reutilizáveis da interface

## Observação

Os componentes `Hero.jsx` e `Section.jsx` permanecem no projeto como apoio/estrutura reutilizável, enquanto a composição atual da tela principal acontece via `HomePage.jsx`.

O `index.html` continua necessário no Vite/React como template base de montagem (container `#root` e carregamento do bundle).

## API REST (`/api`)

Todas as rotas autenticadas exigem header `Authorization: Bearer <token>`.

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/health` | Status da API |
| POST | `/api/auth/register` | Cadastro (`name`, `email`, `password`) |
| POST | `/api/auth/login` | Login (`email`, `password`) |
| GET | `/api/auth/profile` | Perfil do usuário logado |
| PUT | `/api/auth/profile` | Atualizar `name` e/ou `email` |
| POST | `/api/questionnaire/responses` | Salvar respostas (`answers[]`) |
| GET | `/api/questionnaire/responses` | Listar respostas do usuário |
| POST | `/api/evaluations` | Gerar e salvar avaliação (`questionnaireResponseId` ou `answers[]`) |
| GET | `/api/evaluations` | Listar avaliações do usuário |

Exemplo de respostas do questionário:

```json
{
  "answers": [
    { "questionId": "idade", "value": "50_59" },
    { "questionId": "historico_familiar", "value": true },
    { "questionId": "nodulo_mama", "value": false }
  ]
}
```

IDs de pergunta suportados pelo motor de risco: `idade` (`under_40`, `40_49`, `50_59`, `60_plus`) e fatores booleanos como `historico_familiar`, `nodulo_mama`, `alteracao_pele`, entre outros definidos em `server/services/evaluationEngine.js`.
