# IHCTrabalhoMarcosUP1

Projeto da disciplina de IHC desenvolvido com React + Vite.

## Atividade

A proposta da atividade é:

Escolher uma tela (página) do projeto em equipe e implementar os componentes presentes nessa página.

Entrega esperada:

- print do PR realizado
- print do merge no GitHub (ou outro sistema de controle de versão)

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
- JavaScript (JSX)
- CSS global

## Como executar

```bash
npm install
npm run dev
```

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
