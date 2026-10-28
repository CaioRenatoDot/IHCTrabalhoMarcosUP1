# CHECKLIST — RiskCare

Acompanhamento da execução do [PLANEJAMENTO.md](PLANEJAMENTO.md). O planejamento guarda a visão, o
diagnóstico e o roadmap; este arquivo guarda **o que já foi feito e o que falta**.

## Como usar

- Cada item tem um **ID** (`FR-01`) e uma **fase** (`F0` a `F7`, do roadmap do planejamento).
- Fluxo: uma branch a partir da `develop` por item ou grupo de itens → commits → PR → CI verde → squash merge na `develop`.
- **Marque a caixa no mesmo PR que entrega o item**, para o checklist nunca ficar atrás do código.
- Itens novos entram na frente certa, com o próximo ID livre. Não renumere os existentes.
- Dúvidas de produto ou de design ficam na seção **Decisões** no fim, não perdidas dentro de um item.

Frentes: **FR** Front · **BK** Back · **FM** Formulário e resultado · **CT** Conteúdo e fontes · **IN** Infra e qualidade.

---

## Agora

**Branch:** `fase-0/front-credibilidade` — tirar do ar tudo o que é falso ou sem fonte e o tom acadêmico (FR-01 a FR-04, FM-01 a FM-04).
O redesenho das telas (FR-10 em diante) só começa depois de a direção visual ser definida (ver Decisões).

---

## Concluído

- [x] Planejamento e guia do projeto ([PLANEJAMENTO.md](PLANEJAMENTO.md), [CLAUDE.md](CLAUDE.md))
- [x] Docs da fase acadêmica arquivados em `docs/historico/`
- [x] Branches antigas removidas; fluxo `develop` → `main` definido
- [x] CI de lint e build no GitHub Actions (PR #16)

---

## FR — Front

**Fase 0: remover o que é falso ou sem fonte**
- [x] **FR-01** `F0` Hero sem o card "Sua estimativa de risco: 32%" que aparece antes de qualquer resposta ([ConscientizacaoPrevencaoSection.jsx](src/components/ConscientizacaoPrevencaoSection.jsx))
- [x] **FR-02** `F0` Indicadores da home: os 4 números não têm fonte ("+50k casos/ano", "12 fatores", "5 min", "100%"). Trocar por dados oficiais com fonte ou remover ([Indicadores.jsx](src/components/Indicadores.jsx))
- [x] **FR-03** `F0` Tirar o tom acadêmico: rodapé ([Footer.jsx](src/components/Footer.jsx)) e página "Sobre o projeto" ([Cover.jsx](src/components/Cover.jsx))
- [x] **FR-04** `F0` `index.html`: título, meta description e Open Graph ([index.html](index.html))

**Redesenho das telas** (sair do formato "landing page")
- [ ] **FR-10** `F2` **Definir a direção visual** antes de codar: referências, wireframes das telas-chave (início, avaliação, resultado, conteúdo) e decisão sobre o formato do site (ver Decisões)
- [ ] **FR-11** `F2` Design system: tokens de cor (com uma cor de apoio além do rosa), tipografia e espaçamento; modo escuro ([base.css](src/styles/base.css))
- [ ] **FR-12** `F2` Componentes base: `Button`, `Card`, `Callout`, `Badge`, `Accordion`, `Tabs`, `StatCard`, `SourceCitation`
- [ ] **FR-13** `F2` Ícones padronizados (`react-icons`) e ilustrações num estilo único
- [ ] **FR-14** `F2` Estrutura de navegação nova: navbar com Avaliação · Aprenda · Números · Onde buscar ajuda · Metodologia ([Navbar.jsx](src/components/Navbar.jsx))
- [ ] **FR-15** `F2` Início redesenhado (atalhos para as áreas do site, números com fonte, sinais de alerta)
- [ ] **FR-16** `F2` Rodapé completo: mapa do site, fontes, aviso médico, contato ([Footer.jsx](src/components/Footer.jsx))

**Base técnica**
- [ ] **FR-20** `F1` React Router com lazy loading no lugar do roteador manual ([App.jsx](src/App.jsx))
- [ ] **FR-21** `F1` Trocar escapes `á` por UTF-8 nos arquivos que forem tocados
- [ ] **FR-22** `F1` Quebrar os arquivos grandes: `ResultsPage.jsx`, `AssessmentFormPage.jsx`, `results.css`
- [ ] **FR-23** `F2` SEO completo: `sitemap.xml`, `robots.txt`, dados estruturados
- [ ] **FR-24** `F2` Carregar o VLibras só quando ativado

---

## BK — Back

- [ ] **BK-01** `F0` Remover `sourcesUsed: ['INCA','SEER']` fixo; as fontes passam a vir do modelo ativo ([score.js](server/lib/riskAssessment/score.js))
- [ ] **BK-02** `F3` Parar de pontuar sintomas e mamografia como risco ([normalize.js](server/lib/riskAssessment/normalize.js), [weights.js](server/lib/riskAssessment/weights.js))
- [ ] **BK-03** `F3` Implementar o **modelo de Gail** (risco em 5 anos e ao longo da vida), testado contra valores de referência do NCI
- [ ] **BK-04** `F3` Score atual renomeado para "índice de hábitos de proteção"
- [ ] **BK-05** `F3` Subir `RISK_MODEL_VERSION` a cada mudança de modelo ([version.js](server/lib/riskAssessment/version.js))
- [ ] **BK-06** `F3` Endpoint de avaliação **sem login**, com rate limit ([riskAssessment.js](server/routes/riskAssessment.js))
- [ ] **BK-07** `F6` Histórico: listar todas as avaliações, não só a última
- [ ] **BK-08** `F6` Exportar e excluir os dados da pessoa (LGPD)
- [ ] **BK-09** `F1` Validação do payload com `zod`
- [ ] **BK-10** `F3` `fullName` deixa de ser obrigatório no [schema.prisma](prisma/schema.prisma) + migration
- [ ] **BK-11** `F3` Migrations para os campos do Gail
- [ ] **BK-12** `F1` Decidir o destino de `data/datasets/` (não servem para pontuar o questionário)

---

## FM — Formulário e resultado

**Fase 0: segurança do resultado** ([ResultsPage.jsx](src/pages/ResultsPage.jsx))
- [ ] **FM-01** `F0` Remover os dados fixos e os gráficos que dependem deles (`populationLegendBase`, `fallbackFactorDetailData`, `fallbackProjectionData`)
- [ ] **FM-02** `F0` Remover a "Matriz de comparativos", que mostra notas internas de desenvolvimento ao usuário
- [ ] **FM-03** `F0` Remover o modo "Visualização demonstrativa" e textos como "referências do MVP"
- [ ] **FM-04** `F0` Aviso mínimo de "procure atendimento" quando houver nódulo ou secreção, independente do score
- [ ] **FM-05** `F0` Remover "Nome completo" do questionário (decidir se fica só no cadastro) ([AssessmentFormPage.jsx](src/pages/AssessmentFormPage.jsx))

**Questionário v2**
- [ ] **FM-10** `F3` Perguntas do Gail: idade no primeiro parto, biópsias, hiperplasia atípica, raça/etnia
- [ ] **FM-11** `F3` Separar sintomas (alerta) de fatores de risco
- [ ] **FM-12** `F1` Valores estáveis (`"first_degree"`) no lugar de rótulos em texto
- [ ] **FM-13** `F3` "Por que perguntamos isso?" em cada pergunta; salvar progresso; tempo restante

**Resultado v2**
- [ ] **FM-20** `F3` Novo layout: sinais de alerta → plano de ação → o que mais influenciou → rastreamento → fontes
- [ ] **FM-21** `F3` Gráfico do risco da pessoa contra a média da idade (dados do próprio modelo)
- [ ] **FM-22** `F3` **Plano de ação** personalizado, cada recomendação com fonte
- [ ] **FM-23** `F3` "Perguntas para levar à consulta"

**PDF**
- [ ] **FM-30** `F3` Relatório em PDF (resumo, respostas, resultado, plano, perguntas, fontes e aviso), gerado no navegador
- [ ] **FM-31** `F3` Impressão com `@media print`

---

## CT — Conteúdo e fontes

**Infraestrutura de fontes**
- [ ] **CT-01** `F1` Registro central `src/content/sources.js` (nome, link, ano, data de acesso)
- [ ] **CT-02** `F1` Componente `SourceCitation`: nota numerada e lista de referências
- [ ] **CT-03** `F4` "Última revisão em …" em cada artigo

**Páginas**
- [ ] **CT-10** `F4` `/aprenda`: fatores de risco, sinais de alerta, autoexame, rastreamento, diagnóstico e tratamento, mitos e verdades, câncer de mama masculino
- [ ] **CT-11** `F4` `/metodologia` e `/fontes`
- [ ] **CT-12** `F4` `/onde-buscar-ajuda`: SUS, Disque Saúde 136, como pedir mamografia, ONGs
- [ ] **CT-13** `F4` Seus direitos (Leis 12.732/2012 e 13.896/2019)
- [ ] **CT-14** `F4` FAQ e glossário
- [ ] **CT-20** `F5` `/numeros`: casos novos e mortalidade por UF e por idade

**Fontes a levantar** (a tabela completa está na seção 6 do planejamento; confirmar a edição vigente antes de citar)
- [ ] **CT-30** `F1` Levantar e registrar: INCA (estimativa, fatores de risco, sinais), Ministério da Saúde (rastreamento), NCI (Gail), SEER, OMS/OPAS

---

## IN — Infra e qualidade

- [ ] **IN-01** `F0` Termos de uso e política de privacidade sem "fins acadêmicos", com controlador e contato ([TermsPage.jsx](src/pages/TermsPage.jsx), [PrivacyPage.jsx](src/pages/PrivacyPage.jsx))
- [ ] **IN-02** `F0` README: créditos do grupo, remover "projeto acadêmico"; renomear o pacote para `riskcare` ([package.json](package.json))
- [ ] **IN-03** `F1` Vitest: motor de risco, normalização e validação; `npm test` no CI
- [ ] **IN-04** `F1` Testes de API (supertest)
- [ ] **IN-05** `F1` Supabase de desenvolvimento para rodar o login localmente
- [ ] **IN-06** `F7` README como estudo de caso (prints, decisões); Lighthouse acima de 90
- [ ] **IN-07** `F1` Pedir ao dono a proteção de branch exigindo o check `check` verde
- [ ] **IN-08** `F1` Docker para desenvolvimento: `Dockerfile` + `docker-compose.yml` (Node 22, `node_modules` em volume, polling para o hot-reload no Windows) e Supabase local via CLI (`supabase start`). Fazer junto com o IN-05

---

## Decisões em aberto

- [ ] **Formato do site:** o redesenho segue como site de conteúdo com páginas e navegação própria, ou um "painel" mais próximo de um aplicativo? (define FR-10 a FR-16)
- [ ] Gail no cliente (privacidade total) ou no servidor (versão central)?
- [ ] Quem revisa o conteúdo médico? Ter um profissional de saúde como revisor dá muita credibilidade.
- [ ] O site atende também homens na avaliação ou só no conteúdo?
- [ ] Manter o Supabase Auth, já que o login passa a ser opcional?
