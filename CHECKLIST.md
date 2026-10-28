# CHECKLIST — RiskCare

Acompanhamento da execução do [PLANEJAMENTO.md](PLANEJAMENTO.md). O planejamento guarda a visão, o
diagnóstico e o roadmap; este arquivo guarda **o que já foi feito e o que falta**.

## Como usar

- Os itens estão organizados por **área** (Front, Back, Formulário e resultado, Conteúdo, Infra).
- Cada item tem um **ID** (`FR-01`) e uma **prioridade**: `Alta` (fazer agora ou em seguida), `Média` (depois das altas)
  e `Baixa` (quando houver tempo).
- Fluxo: uma branch a partir da `develop` por item ou grupo de itens → commits → PR → CI verde → squash merge na `develop`.
- **Nome das branches:** `tipo/area-descricao`, em minúsculas e com hífens. Tipos: `feat` (funcionalidade), `fix`
  (correção), `docs` (documentação), `refactor` (reorganização sem mudar comportamento), `chore` (manutenção),
  `ci` (integração contínua), `test` (testes). Áreas: `front`, `back`, `form`, `content`, `infra`.
  Exemplos: `feat/front-home-portal`, `fix/back-risk-sources`, `feat/form-assessment-v2`, `docs/content-sources`.
- **Marque a caixa no mesmo PR que entrega o item**, para o checklist nunca ficar atrás do código.
- Itens novos entram na frente certa, com o próximo ID livre. Não renumere os existentes.
- Dúvidas de produto ou de design ficam na seção **Decisões** no fim, não perdidas dentro de um item.

Frentes: **FR** Front · **BK** Back · **FM** Formulário e resultado · **CT** Conteúdo e fontes · **IN** Infra e qualidade.

---

## Agora

_Atualizado em 28/10/2026._

**Em andamento — Front** (branch `feat/front-home-redesign`, ainda sem PR):
- Feito na branch: tokens novos (FR-11), cabeçalho e rodapé com a logo (FR-14, FR-16), home (FR-15) e notícias (CT-21).
- **Próximo:** home como portal (FR-17) e páginas de conteúdo (CT-15 a CT-18), conforme
  [docs/design/home-portal.md](docs/design/home-portal.md). O PR para a `develop` sai com o portal pronto.

**Na fila — Formulário e resultado / Back:** FM-01 a FM-05 e BK-01 (sugestão de branch: `fix/form-result-credibility`).

Observações:
- A tela de resultado e o formulário exigem login, que não funciona localmente sem Supabase de desenvolvimento (IN-05).
  Até lá, essa parte é validada por lint, build e leitura do código.
- Ainda sem a logo: tela de resultado (entra quando ela for refeita). Termos e privacidade têm cabeçalho próprio.
- Os previews da Vercel pedem login (projeto na conta do Caio Renato). Conferir localmente com `npm run dev:full`.

---

## Concluído

- [x] Planejamento e guia do projeto ([PLANEJAMENTO.md](PLANEJAMENTO.md), [CLAUDE.md](CLAUDE.md))
- [x] Docs da fase acadêmica arquivados em `docs/historico/`
- [x] Branches antigas removidas; fluxo `develop` → `main` definido
- [x] CI de lint e build no GitHub Actions (PR #16)
- [x] Front: conteúdo fictício e tom acadêmico removidos, FR-01 a FR-04 (PR #18)
- [x] Regra registrada: VLibras não é alterado; acessibilidade só muda se necessário (FR-24 suspenso)

---

## FR — Front

**Credibilidade: remover o que é falso ou sem fonte**
- [x] **FR-01** `Alta` Hero sem o card "Sua estimativa de risco: 32%" que aparece antes de qualquer resposta ([ConscientizacaoPrevencaoSection.jsx](src/components/ConscientizacaoPrevencaoSection.jsx))
- [x] **FR-02** `Alta` Indicadores da home: os 4 números não têm fonte ("+50k casos/ano", "12 fatores", "5 min", "100%"). Trocar por dados oficiais com fonte ou remover ([Indicadores.jsx](src/components/Indicadores.jsx))
- [x] **FR-03** `Alta` Tirar o tom acadêmico: rodapé ([Footer.jsx](src/components/Footer.jsx)) e página "Sobre o projeto" ([Cover.jsx](src/components/Cover.jsx))
- [x] **FR-04** `Alta` `index.html`: título, meta description e Open Graph ([index.html](index.html))

**Redesenho das telas** (sair do formato "landing page")
- [x] **FR-10** `Média` **Definir a direção visual** — decidido: neutro com rosa de acento, ver [docs/design/design-system.md](docs/design/design-system.md) antes de codar: referências, wireframes das telas-chave (início, avaliação, resultado, conteúdo) e decisão sobre o formato do site (ver Decisões)
- [x] **FR-11** `Média` Design system: tokens de cor (com uma cor de apoio além do rosa), tipografia e espaçamento; modo escuro ([base.css](src/styles/base.css))
- [ ] **FR-12** `Média` Componentes base: `Button`, `Card`, `Callout`, `Badge`, `Accordion`, `Tabs`, `StatCard`, `SourceCitation`
- [ ] **FR-13** `Média` Ícones padronizados (`react-icons`) e ilustrações num estilo único
- [x] **FR-14** `Média` Estrutura de navegação nova: navbar com Avaliação · Aprenda · Números · Onde buscar ajuda · Metodologia ([Navbar.jsx](src/components/Navbar.jsx))
- [x] **FR-15** `Média` Início redesenhado (atalhos para as áreas do site, números com fonte, sinais de alerta)
- [x] **FR-16** `Média` Rodapé completo: mapa do site, fontes, aviso médico, contato ([Footer.jsx](src/components/Footer.jsx))
- [ ] **FR-17** `Alta` **Home como portal**: abertura curta, grade de atalhos com destaque da avaliação (muda se logada), notícias em lista e coluna lateral com números e apoio; menu com as páginas novas ([docs/design/home-portal.md](docs/design/home-portal.md))

**Base técnica**
- [ ] **FR-20** `Média` React Router com lazy loading no lugar do roteador manual ([App.jsx](src/App.jsx))
- [ ] **FR-21** `Média` Trocar escapes `á` por UTF-8 nos arquivos que forem tocados
- [ ] **FR-22** `Média` Quebrar os arquivos grandes: `ResultsPage.jsx`, `AssessmentFormPage.jsx`, `results.css`
- [ ] **FR-23** `Média` SEO completo: `sitemap.xml`, `robots.txt`, dados estruturados
- [ ] **FR-24** `Média` ~~Carregar o VLibras só quando ativado~~ **Suspenso:** o VLibras não deve ser alterado (decisão do Caio)

---

## BK — Back

- [ ] **BK-01** `Alta` Remover `sourcesUsed: ['INCA','SEER']` fixo; as fontes passam a vir do modelo ativo ([score.js](server/lib/riskAssessment/score.js))
- [ ] **BK-02** `Média` Parar de pontuar sintomas e mamografia como risco ([normalize.js](server/lib/riskAssessment/normalize.js), [weights.js](server/lib/riskAssessment/weights.js))
- [ ] **BK-03** `Média` Implementar o **modelo de Gail** (risco em 5 anos e ao longo da vida), testado contra valores de referência do NCI
- [ ] **BK-04** `Média` Score atual renomeado para "índice de hábitos de proteção"
- [ ] **BK-05** `Média` Subir `RISK_MODEL_VERSION` a cada mudança de modelo ([version.js](server/lib/riskAssessment/version.js))
- [ ] **BK-06** `Média` Endpoint de avaliação **sem login**, com rate limit ([riskAssessment.js](server/routes/riskAssessment.js))
- [ ] **BK-07** `Baixa` Histórico: listar todas as avaliações, não só a última
- [ ] **BK-08** `Baixa` Exportar e excluir os dados da pessoa (LGPD)
- [ ] **BK-09** `Média` Validação do payload com `zod`
- [ ] **BK-10** `Média` `fullName` deixa de ser obrigatório no [schema.prisma](prisma/schema.prisma) + migration
- [ ] **BK-11** `Média` Migrations para os campos do Gail
- [ ] **BK-13** `Baixa` Busca automática de notícias no back: coleta em fontes oficiais, tabela `NewsItem` com aprovação, Vercel Cron e fallback para a lista manual (ver PLANEJAMENTO 3.6)
- [ ] **BK-12** `Média` Decidir o destino de `data/datasets/` (não servem para pontuar o questionário)

---

## FM — Formulário e resultado

**Credibilidade e segurança do resultado** ([ResultsPage.jsx](src/pages/ResultsPage.jsx))
- [ ] **FM-01** `Alta` Remover os dados fixos e os gráficos que dependem deles (`populationLegendBase`, `fallbackFactorDetailData`, `fallbackProjectionData`)
- [ ] **FM-02** `Alta` Remover a "Matriz de comparativos", que mostra notas internas de desenvolvimento ao usuário
- [ ] **FM-03** `Alta` Remover o modo "Visualização demonstrativa" e textos como "referências do MVP"
- [ ] **FM-04** `Alta` Aviso mínimo de "procure atendimento" quando houver nódulo ou secreção, independente do score
- [ ] **FM-05** `Alta` Remover "Nome completo" do questionário (decidir se fica só no cadastro) ([AssessmentFormPage.jsx](src/pages/AssessmentFormPage.jsx))

**Questionário v2** — especificação completa em [docs/formulario.md](docs/formulario.md)
- [x] **FM-14** `Média` Planejar o formulário: fontes, etapas, perguntas e versões ([docs/formulario.md](docs/formulario.md))
- [ ] **FM-15** `Média` Resolver as pendências da seção 9 do docs/formulario.md (fontes a confirmar, pesos do índice de hábitos)
- [ ] **FM-10** `Média` Perguntas do Gail: idade no primeiro parto, biópsias, hiperplasia atípica, raça/etnia
- [ ] **FM-11** `Média` Separar sintomas (alerta) de fatores de risco
- [ ] **FM-12** `Média` Valores estáveis (`"first_degree"`) no lugar de rótulos em texto
- [ ] **FM-13** `Média` "Por que perguntamos isso?" em cada pergunta; salvar progresso; tempo restante

**Resultado v2**
- [ ] **FM-20** `Média` Novo layout: sinais de alerta → plano de ação → o que mais influenciou → rastreamento → fontes
- [ ] **FM-21** `Média` Gráfico do risco da pessoa contra a média da idade (dados do próprio modelo)
- [ ] **FM-22** `Média` **Plano de ação** personalizado, cada recomendação com fonte
- [ ] **FM-23** `Média` "Perguntas para levar à consulta"

**PDF**
- [ ] **FM-30** `Média` Relatório em PDF (resumo, respostas, resultado, plano, perguntas, fontes e aviso), gerado no navegador
- [ ] **FM-31** `Média` Impressão com `@media print`

---

## CT — Conteúdo e fontes

**Infraestrutura de fontes**
- [ ] **CT-01** `Média` Registro central `src/content/sources.js` (nome, link, ano, data de acesso)
- [ ] **CT-02** `Média` Componente `SourceCitation`: nota numerada e lista de referências
- [ ] **CT-03** `Baixa` "Última revisão em …" em cada artigo

**Páginas**
- [ ] **CT-10** `Baixa` `/aprenda`: fatores de risco, sinais de alerta, autoexame, rastreamento, diagnóstico e tratamento, mitos e verdades, câncer de mama masculino
- [ ] **CT-11** `Baixa` `/metodologia` e `/fontes`
- [ ] **CT-12** `Baixa` `/onde-buscar-ajuda`: SUS, Disque Saúde 136, como pedir mamografia, ONGs
- [ ] **CT-13** `Baixa` Seus direitos (Leis 12.732/2012 e 13.896/2019)
- [ ] **CT-14** `Baixa` FAQ e glossário
- [ ] **CT-15** `Alta` Página `/sinais-de-alerta` (conteúdo e fonte que hoje estão na home)
- [ ] **CT-16** `Alta` Página `/mamografia`: quando fazer, conforme a nota técnica de 2025 e a Lei nº 15.284/2025
- [ ] **CT-17** `Alta` Página `/onde-buscar-ajuda`: UBS, Disque Saúde 136, CVV 188
- [ ] **CT-18** `Alta` Página `/perguntas-frequentes` (perguntas que hoje estão na home)
- [x] **CT-21** `Média` Seção de notícias na home com curadoria manual de fontes oficiais ([src/content/news.js](src/content/news.js))
- [ ] **CT-22** `Baixa` Página `/noticias` com todas as notícias (ver PLANEJAMENTO 3.6)
- [ ] **CT-20** `Baixa` `/numeros`: casos novos e mortalidade por UF e por idade

**Fontes a levantar** (a tabela completa está na seção 6 do planejamento; confirmar a edição vigente antes de citar)
- [ ] **CT-30** `Média` Levantar e registrar: INCA (estimativa, fatores de risco, sinais), Ministério da Saúde (rastreamento), NCI (Gail), SEER, OMS/OPAS

---

## IN — Infra e qualidade

- [ ] **IN-01** `Alta` Termos de uso e política de privacidade sem "fins acadêmicos", com controlador e contato ([TermsPage.jsx](src/pages/TermsPage.jsx), [PrivacyPage.jsx](src/pages/PrivacyPage.jsx))
- [ ] **IN-02** `Alta` README: créditos do grupo, remover "projeto acadêmico"; renomear o pacote para `riskcare` ([package.json](package.json))
- [ ] **IN-03** `Média` Vitest: motor de risco, normalização e validação; `npm test` no CI
- [ ] **IN-04** `Média` Testes de API (supertest)
- [ ] **IN-05** `Média` Supabase de desenvolvimento para rodar o login localmente
- [ ] **IN-06** `Baixa` README como estudo de caso (prints, decisões); Lighthouse acima de 90
- [ ] **IN-07** `Média` Pedir ao dono a proteção de branch exigindo o check `check` verde
- [ ] **IN-08** `Média` Docker para desenvolvimento: `Dockerfile` + `docker-compose.yml` (Node 22, `node_modules` em volume, polling para o hot-reload no Windows) e Supabase local via CLI (`supabase start`). Fazer junto com o IN-05

---

## Observações para o redesenho

Pontos encontrados durante a limpeza de credibilidade do front que não eram escopo dela:
- O botão **"Saiba mais"** do hero leva para `/login`, e não para uma explicação.
- O **GSAP** deixou de ser usado (só o card removido usava), mas segue no `package.json`. Decidir no redesenho se volta a ser usado ou sai.
- A imagem do **Open Graph** é o logo, no domínio atual da Vercel. Trocar por uma imagem de compartilhamento própria quando houver domínio novo.
- A home ficou com hero, cards, "Como funciona" e aviso: espaço reservado para os números oficiais com fonte (FR-02 voltará no FR-15).

---

## Decisões em aberto

- [x] **Formato do site:** painel com conteúdo integrado (referência: [docs/design/home/](docs/design/home/)); tom neutro com rosa de acento (28/10/2026). Home como portal: [docs/design/home-portal.md](docs/design/home-portal.md).
- [ ] Gail no cliente (privacidade total) ou no servidor (versão central)?
- [ ] Quem revisa o conteúdo médico? Ter um profissional de saúde como revisor dá muita credibilidade.
- [ ] O site atende também homens na avaliação ou só no conteúdo?
- [ ] Manter o Supabase Auth, já que o login passa a ser opcional?
