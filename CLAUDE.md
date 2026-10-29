# CLAUDE.md

Guia para o Claude (e para quem mais trabalhar no código) sobre o RiskCare.

## O que é

Site em português (pt-BR) sobre câncer de mama: uma avaliação **educativa** de risco,
o resultado da avaliação e conteúdo informativo. Começou como trabalho de IHC na
faculdade e hoje é um projeto de portfólio que deve funcionar como produto real.
O roadmap está em [PLANEJAMENTO.md](PLANEJAMENTO.md).

Produção: https://riskcare-psi.vercel.app/

## Stack

- **Front:** React 18 + Vite 5, JavaScript (sem TypeScript), CSS puro com tokens `--rc-*`
  ([src/styles/base.css](src/styles/base.css)), Recharts, Lenis, ícones Lucide (`react-icons/lu`). O GSAP segue instalado,
  mas sem uso desde a remoção do card antigo da home.
- **Back:** Express 5 em [server/](server/). Na Vercel, roda como função única em
  [api/index.js](api/index.js); `vercel.json` reescreve `/api/*` para ela.
- **Dados:** Supabase (Auth + Postgres), Prisma 7 (`prisma.config.ts`, adapter `pg`),
  com RLS nas migrations.

## Comandos

```bash
npm run dev:full     # front (5173) + back (3001); o Vite faz proxy de /api para 3001
npm run lint         # ESLint em src/ e server/
npm run build        # prisma generate + vite build
npm run db:migrate   # nova migration (precisa de DATABASE_URL/DIRECT_URL)
npm run db:seed      # popula o catálogo de datasets e a versão do modelo
```

Ainda não existe suíte de testes. Ao mexer no motor de risco, adicione testes (Vitest).

## Fluxo de trabalho

O andamento do projeto está em [CHECKLIST.md](CHECKLIST.md) (itens por área, com ID como `FR-01` e prioridade `Alta`/`Média`/`Baixa`).
A visão e o roadmap estão em [PLANEJAMENTO.md](PLANEJAMENTO.md).

1. Toda mudança de código sai de uma branch criada a partir da `develop`, no formato `tipo/area-descricao`
   (ex.: `feat/front-home-portal`, `fix/back-risk-sources`; tipos e áreas no CHECKLIST.md).
   Nunca commitar código direto na `develop` ou na `main`.
2. Commits pequenos, em português, no formato `tipo: descrição` (`feat`, `fix`, `docs`, `refactor`, `ci`).
3. Abrir PR para a `develop`. O CI ([.github/workflows/ci.yml](.github/workflows/ci.yml)) roda `npm ci`, `lint` e `build`
   e precisa passar. Merge por **squash**.
4. Marcar a caixa do item no CHECKLIST.md **no mesmo PR** que o entrega.
5. A `main` só recebe a `develop` quando estiver estável, e só quando o dono do projeto pedir.

Antes de abrir o PR, rode localmente o que o CI roda. O build precisa de variáveis falsas para o `prisma generate`:

```bash
npm run lint
DATABASE_URL=postgresql://u:p@localhost:5432/db DIRECT_URL=postgresql://u:p@localhost:5432/db npm run build
```

## Mapa do código

- [src/App.jsx](src/App.jsx): roteador **escrito à mão** (pathname + `if/else`), com guarda
  de rotas protegidas e controle de scroll e foco. Para criar uma rota, adicione o `else if`
  e, se for o caso, inclua o caminho em `PROTECTED_ROUTES`/`AUTH_ROUTES`.
- [src/contexts/AuthContext.jsx](src/contexts/AuthContext.jsx): sessão e última avaliação.
- [src/lib/authApi.js](src/lib/authApi.js) e [src/lib/riskAssessmentApi.js](src/lib/riskAssessmentApi.js):
  chamadas ao back. Toda chamada mutável manda o token CSRF.
- [src/pages/AssessmentFormPage.jsx](src/pages/AssessmentFormPage.jsx): questionário em etapas.
- [src/pages/ResultsPage.jsx](src/pages/ResultsPage.jsx): resultado (arquivo grande; separe em componentes ao mexer).
- [src/pages/HomePage.jsx](src/pages/HomePage.jsx) + [src/components/home/HomeBlocks.jsx](src/components/home/HomeBlocks.jsx):
  home em duas versões, portal público (visitante) e painel (logada). Ver [docs/design/home-portal.md](docs/design/home-portal.md).
- Páginas de conteúdo: `/sinais-de-alerta`, `/mamografia`, `/onde-buscar-ajuda`, `/perguntas-frequentes`
  ([src/pages/](src/pages/)), todas sobre o layout comum [src/components/ContentPage.jsx](src/components/ContentPage.jsx).
- [src/content/health.js](src/content/health.js): **textos de saúde e fontes verificadas** (sinais, regras de mamografia,
  contatos, perguntas frequentes, "Você sabia?", números do INCA). Todo dado novo entra aqui com fonte.
- [src/content/news.js](src/content/news.js): notícias oficiais com curadoria manual (somem se a mais recente tiver mais
  de 12 meses).
- [src/components/RiskCareLogo.jsx](src/components/RiskCareLogo.jsx): logo em SVG com o laço animado; tela de carregamento em
  [src/components/RouteLoadingPage.jsx](src/components/RouteLoadingPage.jsx). Ver [docs/design/logo.md](docs/design/logo.md).

Documentação de apoio:

- [docs/design/design-system.md](docs/design/design-system.md): cores, tipografia, o que evitar, imagens e créditos.
- [docs/design/home-portal.md](docs/design/home-portal.md) e [docs/design/logo.md](docs/design/logo.md): decisões da home e da logo.
- [docs/design/home/](docs/design/home/): referência da home exportada do Stitch (só estrutura; não copiar conteúdo fictício).
- [docs/formulario.md](docs/formulario.md): fontes, etapas e perguntas do formulário (v1, v2 e v3).
- [server/lib/riskAssessment/](server/lib/riskAssessment/): motor de risco.
  `fieldMapping` → `normalize` → `weights` → `score` → `classification`; versão em `version.js`.
- [server/middleware/](server/middleware/): CSRF, rate limit, exigência de sessão.
- [prisma/schema.prisma](prisma/schema.prisma): Profile, QuestionnaireResponse, RiskAssessment,
  AssessmentFactorDetail, ConsentRecord, AuthEvent, DatasetReference, RiskModelVersion.

## Regras de conteúdo (saúde)

Este é um site de saúde, então estas regras valem mais do que qualquer preferência visual:

1. **Nunca invente números.** Toda estatística exibida precisa de fonte (nome, link e ano)
   registrada no código e visível para o usuário. Se não houver fonte, não exiba o número.
2. **Não use linguagem de diagnóstico.** O resultado é uma estimativa educativa e não
   substitui consulta médica.
3. **Sinais de alerta** (nódulo, secreção, retração, alteração na pele) não são fatores de
   risco. Eles geram orientação de procurar atendimento e não somam pontos no score.
4. Use as fontes oficiais: INCA, Ministério da Saúde, OMS/OPAS e NCI/SEER. Ao citar
   uma diretriz, informe a data e prefira a versão vigente.
5. Siga a minimização de dados (LGPD): não colete o que o cálculo não usa.

## Convenções

- Todo texto da interface fica em pt-BR. Escreva acentos direto em UTF-8, sem escapes `á`
  (o código antigo tem esses escapes; troque quando passar por eles).
- Módulos ESM (`import`/`export`) em todo o projeto.
- Um arquivo CSS por área em `src/styles/`, importado em `global.css`. Use os tokens `--rc-*`
  e evite cores soltas.
- **Visual:** siga [docs/design/design-system.md](docs/design/design-system.md) (neutro com rosa de acento,
  poucos cards, ícones Lucide só onde ajudam, sem efeitos decorativos). A logo do RiskCare aparece em todas as telas.
- Acessibilidade é requisito: foco visível, `aria-*` corretos, `prefers-reduced-motion`
  respeitado, VLibras e os controles de zoom continuam funcionando.
- **Não mexer no VLibras** (widget, CSS e preload no `index.html`). Nos recursos de acessibilidade
  (zoom, alto contraste, teclado) só alterar o estritamente necessário, como limpar CSS de componente removido.
- Qualquer mudança nos pesos ou na lógica do motor exige aumentar `RISK_MODEL_VERSION`.
- Os payloads usam os rótulos das opções como valor, e `normalize.js` compara texto
  (`includes`, `startsWith`). Mudar um rótulo no front pode mudar o score sem nenhum aviso.
  Confira os dois lados (ou migre para códigos estáveis, conforme o planejamento).

## Ambiente

Copie `.env.example` (front) e `server/.env.example` (back). Sem `SUPABASE_URL` e
`SUPABASE_PUBLISHABLE_KEY`, o back sobe, mas login e cadastro não funcionam.

**Temporário:** em desenvolvimento, a tela de carregamento fica 6 s ao abrir o site (`DEV_SPLASH_MS` em
[src/App.jsx](src/App.jsx)) para visualizar a logo. Não afeta produção; remover quando não for mais útil (FR-28).
