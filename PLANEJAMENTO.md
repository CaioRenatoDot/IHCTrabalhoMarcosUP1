# Planejamento — RiskCare 2.0

> Documento vivo. Última revisão: 27/10/2026.
> Substitui o [planejamento da fase acadêmica](docs/historico/PROJECT_PLANNING.md), mantido em `docs/historico/` como registro.
>
> **Repositório:** o trabalho continua neste repositório (do grupo), em branches com PR. A `main` só recebe mudanças
> depois de revisadas. Uma transferência de propriedade para o Caio Gabriel pode ser conversada mais adiante;
> a decisão do grupo é manter o crédito de todos no histórico e no README.

## Visão

Transformar o RiskCare num **site de referência sobre câncer de mama em português**, com:

1. **Avaliação educativa** rápida, sem login obrigatório, usando um modelo reconhecido.
2. **Resultado** claro, com plano de ação e **relatório em PDF** para levar à consulta.
3. **Conteúdo confiável**: fatores de risco, sinais de alerta, rastreamento, direitos e
   onde buscar ajuda, com todas as afirmações ligadas a fontes oficiais.
4. **Área da pessoa usuária** (opcional): histórico, comparação entre avaliações e lembretes.

Princípio-guia: **cada número na tela tem fonte, data e link.** É isso que tira o site do
"seco" e dá credibilidade.

---

## 1. Diagnóstico atual

### 1.1 O que já está bom

- Back-end bem protegido: sessão HttpOnly, CSRF, rate limit, Helmet e RLS no Postgres.
- Modelo versionado (`RiskModelVersion`), auditoria e consentimento já modelados.
- Base de acessibilidade: skip link, foco visível, zoom de texto, VLibras e reduced motion.
- O motor de risco é explicável: mostra a contribuição de cada fator.

### 1.2 Problemas de credibilidade (prioridade máxima)

| # | Problema | Onde |
|---|----------|------|
| C1 | Gráficos de "distribuição populacional", "média" por fator e "projeção com/sem prevenção" usam **números fixos inventados** | `ResultsPage.jsx` (dados `fallback*` e `populationLegendBase`) |
| C2 | `sourcesUsed: ['INCA', 'SEER']` vem fixo, mas os pesos foram definidos à mão | `server/lib/riskAssessment/score.js` |
| C3 | **Sintomas** entram no score. Uma pessoa jovem com nódulo pode receber "risco baixo" | `normalize.js` → `normalizeSymptoms` |
| C4 | **Mamografia atrasada** soma risco, mas não altera o risco biológico; é questão de rastreamento | `normalize.js` → `normalizeMammogram` |
| C5 | A "Matriz de comparativos" mostra notas internas de desenvolvimento para o usuário ("Card de faixa etária…", "MVP") | `ResultsPage.jsx` → `comparisonMatrixSections` |
| C6 | O hero da home mostra "SUA ESTIMATIVA DE RISCO: 32% — Risco moderado" antes de a pessoa responder qualquer coisa | `ConscientizacaoPrevencaoSection.jsx` |
| C7 | Indicadores sem fonte e desatualizados: "+50k casos/ano" (o INCA estima cerca de 73 mil), "12 fatores" (o form tem 18 campos), "100% gratuito" como métrica | `Indicadores.jsx` |
| C8 | Datasets da UCI em `data/` descrevem características de **tumores e exames**, não risco populacional, e não servem para pontuar um questionário | `data/datasets/raw/` |
| C9 | Textos acadêmicos: "Projeto acadêmico de IHC", "Desenvolvido por Estudantes", termos e privacidade falando em "fins acadêmicos" | `Footer.jsx`, `Cover.jsx`, `TermsPage.jsx`, `PrivacyPage.jsx` |

### 1.3 Avaliação do front-end

**Resumo:** visualmente o site é uma landing page de uma única tela, com tom rosa e sem
conteúdo por trás. Não há para onde navegar, não há o que ler e não há fontes. Por isso a
sensação de "cru".

**Arquitetura de informação**
- A navbar tem só dois links ("Como funciona", que volta para a própria home, e "Sobre o
  projeto", que é a capa do trabalho). Não existem páginas de conteúdo.
- O CTA "Começar avaliação" leva ao **login**, uma barreira enorme para quem só quer testar
  (inclusive recrutadores).
- Não há rodapé útil: faltam mapa do site, fontes, contato e "onde buscar ajuda".

**Home**
- O hero tem um card de resultado falso (C6). Ele é bonito, mas passa a impressão errada.
- Os 3 `FeatureCard`s são genéricos ("Análise rápida", "Questionário detalhado",
  "Estatísticas de risco") e repetem o "Como funciona".
- Não há imagens, ilustrações nem prova social. O texto é todo em blocos curtos e iguais.
- O banner "não realiza diagnóstico" está correto, mas fica isolado no fim da página.

**Identidade visual**
- A paleta é praticamente monocromática (rosa sobre branco). Falta uma cor de apoio para
  passar confiança (por exemplo, um azul-petróleo ou vinho escuro) e cores semânticas
  consistentes.
- A tipografia (Plus Jakarta Sans) é boa, mas não existe escala definida. Cada CSS define
  os próprios tamanhos.
- Não há modo escuro.
- Os ícones são SVGs inline copiados em vários arquivos, apesar de `react-icons` estar instalado.

**Resultado**
- `ResultsPage.jsx` (mais de 1.100 linhas) e `results.css` (980 linhas) concentram tudo.
  São muitos gráficos e nenhum plano de ação claro.
- Não há exportação em PDF nem opção de imprimir.

**Código do front**
- Roteador feito à mão em `App.jsx`, sem lazy loading. Todas as páginas entram no bundle inicial.
- São 22 arquivos CSS globais sem escopo. `assessment-form.css`, `accessibility.css` e
  `results.css` passam de 700 linhas cada.
- Strings com escapes (`'Análise rápida'`) atrapalham a leitura e a edição.
- `index.html` não tem `meta description`, Open Graph nem `theme-color`, e o script do
  VLibras é carregado por `preload` em todas as páginas.
- O SPA é renderizado só no cliente, o que é ruim para o SEO de páginas de conteúdo.

### 1.4 Outros problemas técnicos

- Não há testes.
- `normalize.js` compara rótulos de texto (`includes('sei')`, `startsWith('n')`), o que é frágil.
- O campo "Nome completo" no questionário não é usado no cálculo (vai contra a minimização da LGPD).
- A API só expõe `/latest`, embora o banco guarde o histórico completo.
- O `package.json` ainda se chama `ihc-trabalho-marcos-up1`.

---

## 2. Mapa do site proposto

```text
/                          Início
/avaliacao                 Avaliação (sem login)
/avaliacao/resultado       Resultado + plano de ação + PDF
/aprenda                   Hub de conteúdo
  /aprenda/fatores-de-risco
  /aprenda/sinais-de-alerta
  /aprenda/autoconhecimento-das-mamas
  /aprenda/rastreamento-e-mamografia
  /aprenda/diagnostico-e-tratamento
  /aprenda/seus-direitos         (Lei dos 30 dias, Lei dos 60 dias etc.)
  /aprenda/cancer-de-mama-masculino
  /aprenda/mitos-e-verdades
/numeros                   Painel "O câncer de mama no Brasil" (dados por UF)
/onde-buscar-ajuda         SUS, Disque Saúde 136, ONGs e apoio, por estado
/metodologia               Como o cálculo funciona, limitações e versões do modelo
/fontes                    Bibliografia completa
/perguntas-frequentes
/glossario
/conta                     Histórico, comparação, lembretes (login opcional)
/sobre                     Sobre o projeto e a equipe (vira estudo de caso no portfólio)
/termos-de-uso  /politica-de-privacidade
```

Navbar: **Avaliação · Aprenda · Números · Onde buscar ajuda · Metodologia**, com um botão
"Fazer avaliação" em destaque e "Entrar" discreto.

---

## 3. Funcionalidades

Legenda: **P0** = essencial · **P1** = alto impacto · **P2** = desejável

### 3.1 Avaliação

- [ ] **P0** Avaliação **sem login**: o cálculo pode rodar no cliente ou num endpoint público com rate limit. A conta passa a servir só para salvar.
- [ ] **P0** Separar o resultado em três blocos independentes:
  - **Sinais de alerta** → banner "procure atendimento", independente do score.
  - **Rastreamento** → "seus exames estão em dia?", seguindo a diretriz vigente do Ministério da Saúde.
  - **Risco estimado** → modelo de risco (abaixo).
- [ ] **P0** Remover "Nome completo" e outros campos que o cálculo não usa.
- [ ] **P1** Implementar o **modelo de Gail (NCI BCRAT)**: risco em 5 anos e ao longo da vida, comparado com a média da idade. Novas perguntas necessárias: idade no primeiro parto, número de biópsias, hiperplasia atípica e raça/etnia.
  - Documentar as limitações: vale para mulheres com 35 anos ou mais, não se aplica a quem já teve câncer de mama, carcinoma in situ ou mutação BRCA conhecida, e foi calibrado na população dos EUA.
  - Quando o Gail não se aplica, mostrar uma orientação no lugar do número (por exemplo: "com BRCA positivo, o acompanhamento é especializado").
- [ ] **P1** Manter o score atual renomeado para **"Índice de hábitos de proteção"**: só fatores modificáveis, de 0 a 100, sem chamá-lo de risco.
- [ ] **P1** Payload com **códigos estáveis** (`"first_degree"`, `"never"`) em vez de rótulos de texto.
- [ ] **P1** Salvar o progresso do formulário localmente e mostrar o tempo restante estimado.
- [ ] **P2** Explicação curta ("por que perguntamos isso?") em cada pergunta, com link para o artigo correspondente.

### 3.2 Resultado

- [ ] **P0** Remover os gráficos com dados inventados (C1) e as notas internas (C5).
- [ ] **P0** **Plano de ação personalizado**: de 3 a 5 recomendações concretas a partir das respostas (por exemplo, "converse com seu médico sobre aconselhamento genético", "agende sua mamografia", "reduza o álcool"), cada uma com fonte.
- [ ] **P0** **Relatório em PDF**: resumo, respostas, resultado, plano de ação, perguntas para levar ao médico, fontes e aviso. Sugestão: `@react-pdf/renderer` no cliente, para funcionar sem login e sem enviar dados ao servidor.
- [ ] **P1** Gráfico comparando o risco em 5 anos da pessoa com a média da idade (dados do próprio modelo).
- [ ] **P1** Botão "Imprimir" com CSS `@media print`.
- [ ] **P1** "Perguntas para levar à consulta", geradas a partir das respostas.
- [ ] **P2** Lembrete de mamografia exportável para o calendário (arquivo `.ics`).
- [ ] **P2** Compartilhar um card sem dados pessoais ("Fiz minha avaliação no RiskCare").

### 3.3 Conteúdo

- [ ] **P0** Componente de **citação de fonte**: nota numerada no texto e lista de referências no fim, com link e data de acesso.
- [ ] **P0** Registro central de fontes (`src/content/sources.js`), usado por todas as páginas, pelo resultado e pelo PDF.
- [ ] **P1** Artigos do hub `/aprenda` em **MDX**, com "Última revisão em …" e "Fontes".
- [ ] **P1** Página de **Metodologia**: fluxo do cálculo, fórmula, limitações e changelog das versões do modelo.
- [ ] **P1** **Onde buscar ajuda**: Disque Saúde 136, como pedir mamografia no SUS, ONGs de apoio (por exemplo, FEMAMA e Instituto Oncoguia) e filtro por UF.
- [ ] **P1** **Seus direitos**: Lei 12.732/2012 (início do tratamento em até 60 dias), Lei 13.896/2019 (diagnóstico em até 30 dias), reconstrução mamária pelo SUS e outros.
- [ ] **P2** Mitos e verdades em formato de quiz.
- [ ] **P2** Glossário com tooltips nos termos técnicos dos artigos.
- [ ] **P2** Busca no conteúdo.

### 3.4 Painel "Números do Brasil"

- [ ] **P1** Estimativa de casos novos por UF (INCA), num mapa ou ranking. A UF que a pessoa informou ganha destaque.
- [ ] **P1** Incidência por faixa etária (INCA/SEER), mostrando por que a idade importa.
- [ ] **P2** Mortalidade por UF ao longo do tempo (Atlas de Mortalidade do INCA).
- [ ] **P2** Cobertura de mamografia no SUS (SISCAN/DATASUS).
- Todos os gráficos com fonte, ano e link logo abaixo.

### 3.5 Conta (opcional)

- [ ] **P1** Histórico de avaliações (endpoint `GET /api/risk-assessment`) com uma linha do tempo.
- [ ] **P1** Comparar duas avaliações: o que mudou e por quê.
- [ ] **P2** Lembretes por e-mail (precisa do SMTP, pendente desde a fase acadêmica).
- [ ] **P2** Exportar e excluir os próprios dados (direitos do titular na LGPD).
- [ ] **P2** Login social (os botões já existem na interface).

---

## 4. Redesign do front-end

### 4.1 Design system

- [ ] **Paleta**: manter o rosa como cor da marca e adicionar uma cor de apoio escura para títulos e áreas de confiança. Definir as cores semânticas (alerta, atenção, ok, informação) e validar o contraste AA.
- [ ] **Escala tipográfica** em tokens (`--rc-text-xs` … `--rc-text-4xl`) e espaçamentos (`--rc-space-*`).
- [ ] **Modo escuro** via tokens.
- [ ] **Componentes base**: `Button`, `Card`, `Callout` (info, alerta, fonte), `Badge`, `SourceCitation`, `StatCard` (número com fonte), `Accordion`, `Tabs`, `Stepper`.
- [ ] **Ícones**: padronizar com uma biblioteca (`react-icons/lu` ou Lucide) e remover os SVGs duplicados.
- [ ] **Ilustrações** num estilo único (feitas sob medida ou de um banco livre com licença compatível), usadas no hero, nos estados vazios e nos artigos.

### 4.2 Home nova

1. **Hero**: título forte, subtítulo, CTA "Fazer avaliação (5 min, sem cadastro)" e uma ilustração no lugar do card falso.
2. **Faixa de números reais** com fonte (por exemplo, casos novos por ano segundo o INCA).
3. **"O que você encontra aqui"**: Avaliação, Aprenda, Números e Onde buscar ajuda, em cards que levam a páginas reais.
4. **Sinais de alerta**: um bloco visual curto ("procure atendimento se notar…").
5. **Como funciona** (3 passos, sem "crie seu perfil").
6. **Artigos em destaque** do hub.
7. **Metodologia e fontes**: "Como calculamos" e logos ou nomes das fontes.
8. **FAQ** curto.
9. **Rodapé completo**: mapa do site, fontes, aviso médico, privacidade e repositório.

### 4.3 Resultado novo

1. Topo: classificação e número principal com explicação de uma linha.
2. Sinais de alerta (se houver), em destaque e antes de tudo.
3. Plano de ação.
4. "O que mais influenciou", com até 5 fatores e barra horizontal simples.
5. Rastreamento: "seus exames estão em dia?".
6. Botões: **Baixar PDF**, Imprimir, Salvar na conta, Refazer.
7. Fontes e limitações.

### 4.4 Base técnica do front

- [ ] Migrar para **React Router** com lazy loading por rota.
- [ ] **Pré-renderização** (SSG) das páginas de conteúdo para SEO. Opções: `vite-react-ssg`, ou migrar o front para Astro/Next se o volume de conteúdo crescer.
- [ ] Quebrar `ResultsPage.jsx` e `AssessmentFormPage.jsx` em componentes.
- [ ] CSS por componente (CSS Modules), mantendo os tokens globais.
- [ ] Substituir os escapes `á` por texto UTF-8.
- [ ] SEO: `meta description`, Open Graph com imagem, `sitemap.xml`, `robots.txt` e dados estruturados (`MedicalWebPage`).
- [ ] Carregar o VLibras só quando ativado.
- [ ] Meta: Lighthouse acima de 90 em todas as categorias.

---

## 5. Correções técnicas

- [ ] Testes com **Vitest**: motor de risco (casos conhecidos e entradas extremas), normalização e validação do payload.
- [ ] Testes de API (supertest) para auth e avaliação.
- [ ] CI no GitHub Actions: lint, testes e build.
- [ ] Renomear o pacote para `riskcare`.
- [ ] Validação com **zod** (já instalado) compartilhada entre front e back.
- [ ] Remover `sourcesUsed` fixo. As fontes passam a vir do modelo ativo (`RiskModelVersion`).
- [ ] Revisar termos e política de privacidade para uso real (sem "fins acadêmicos"), com controlador e contato.
- [ ] Decidir o destino de `data/datasets/` (os datasets da UCI): remover ou mover para um notebook exploratório e deixar de citá-los como base do cálculo.

---

## 6. Fontes de referência

| Fonte | Uso no site |
|-------|-------------|
| INCA — Estimativa de incidência de câncer no Brasil | Casos novos por ano e por UF |
| INCA — Controle do câncer de mama (fatores de risco, sinais, detecção precoce) | Conteúdo do hub |
| INCA — Atlas On-line de Mortalidade | Mortalidade por UF |
| Ministério da Saúde — diretrizes de rastreamento mamográfico | Bloco de rastreamento |
| DATASUS / SISCAN | Cobertura de mamografia |
| NCI — Breast Cancer Risk Assessment Tool (Gail) e pacote R `BCRA` | Modelo de risco |
| NCI SEER — Female Breast Cancer Stat Facts | Incidência por idade |
| OMS / OPAS — Breast cancer fact sheet | Contexto global |
| Leis 12.732/2012 e 13.896/2019 | Página de direitos |

> **Verificar antes de publicar:** os números da estimativa do INCA (confirmar se já saiu
> a edição do triênio 2026–2028) e a diretriz vigente de rastreamento do Ministério da
> Saúde (a faixa etária foi revista em 2025). Registrar a data de acesso de cada fonte.

---

## 7. Roadmap em fases

| Fase | Foco | Itens principais |
|------|------|------------------|
| **0. Credibilidade** | Tirar do ar o que está errado | C1–C9, hero sem card falso, indicadores com fonte, textos acadêmicos |
| **1. Fundação** | Base para crescer | React Router, códigos estáveis no payload, Vitest + CI, registro de fontes, SEO básico |
| **2. Design system** | Deixar de ser "cru" | Tokens, componentes base, ícones, ilustrações, nova home e rodapé |
| **3. Avaliação v2** | O coração do produto | Sem login, sinais de alerta e rastreamento separados, Gail, novo resultado, plano de ação, **PDF** |
| **4. Conteúdo** | Virar site de consulta | Hub `/aprenda` em MDX, Metodologia, Fontes, Onde buscar ajuda, Direitos, FAQ |
| **5. Números do Brasil** | Diferencial visual | Painel com dados do INCA/DATASUS por UF |
| **6. Conta** | Retenção | Histórico, comparação, lembretes, exportar e excluir dados |
| **7. Portfólio** | Apresentação | README como estudo de caso, prints e GIF, página Sobre, Lighthouse |

Sugestão de ordem: **0 → 1 → 3 → 2 → 4**, depois 5, 6 e 7 conforme o tempo. A fase 3 vem
antes do redesign porque muda a estrutura do resultado, e não vale desenhar duas vezes.

---

## 8. Frentes de trabalho (checklist de execução)

Esta seção reorganiza os itens das seções 3 a 5 por área, para atacar uma frente de cada vez.
Ordem sugerida: **Front → Back → Formulário e resultado → Conteúdo e fontes → Infra e qualidade**.

Dependências entre as frentes:
- O **resultado novo** só deve ser desenhado depois do **motor** (Gail) no back; senão o trabalho é feito duas vezes.
- A página de **números** e os **artigos** dependem do **registro de fontes**, então ele sai primeiro.
- O que faz parte da Fase 0 no front (retirar dados falsos e textos acadêmicos) não depende de nada e pode começar já.

### 8.1 Front (visual e navegação)

**Identidade e design system**
- [ ] Paleta: manter o rosa e adicionar uma cor de apoio escura, mais cores semânticas (alerta, atenção, ok, info) com contraste AA ([base.css](src/styles/base.css))
- [ ] Escala tipográfica e de espaçamento em tokens; modo escuro
- [ ] Componentes base: `Button`, `Card`, `Callout`, `Badge`, `Accordion`, `Tabs`, `StatCard`, `SourceCitation`
- [ ] Ícones padronizados (`react-icons` já está instalado) no lugar dos SVGs copiados
- [ ] Ilustrações num estilo único

**Home**
- [ ] Hero sem o card de "32%" falso ([ConscientizacaoPrevencaoSection.jsx](src/components/ConscientizacaoPrevencaoSection.jsx))
- [ ] Faixa de números reais, cada um com fonte ([Indicadores.jsx](src/components/Indicadores.jsx))
- [ ] Cards levando a páginas reais (hoje os `FeatureCard` não levam a lugar nenhum)
- [ ] Bloco de sinais de alerta, "Como funciona" sem "crie seu perfil", FAQ curto

**Navegação e estrutura**
- [ ] Navbar nova: Avaliação · Aprenda · Números · Onde buscar ajuda · Metodologia ([Navbar.jsx](src/components/Navbar.jsx))
- [ ] Rodapé completo: mapa do site, fontes, aviso médico, contato ([Footer.jsx](src/components/Footer.jsx))
- [ ] React Router com lazy loading no lugar do roteador manual ([App.jsx](src/App.jsx))
- [ ] Tirar o tom acadêmico: rodapé e página "Sobre o projeto" ([Cover.jsx](src/components/Cover.jsx))

**Qualidade do front**
- [ ] SEO: `title`, description, Open Graph, `sitemap.xml`, `robots.txt` ([index.html](index.html))
- [ ] Carregar o VLibras só quando ativado
- [ ] Trocar escapes `á` por UTF-8
- [ ] Quebrar os arquivos grandes (`ResultsPage.jsx`, `AssessmentFormPage.jsx`, `results.css`)

**Fontes desta frente:** apenas os números reais da home, que vêm do INCA (ver 8.4).

### 8.2 Back (API, motor de risco e dados)

**Motor de risco**
- [ ] Parar de pontuar sintomas e mamografia como risco ([normalize.js](server/lib/riskAssessment/normalize.js), [weights.js](server/lib/riskAssessment/weights.js))
- [ ] Remover `sourcesUsed` fixo; as fontes passam a vir do modelo ativo ([score.js](server/lib/riskAssessment/score.js))
- [ ] Implementar o **modelo de Gail** (risco em 5 anos e ao longo da vida) e testar contra os valores de referência do NCI
- [ ] Manter o score atual renomeado como "índice de hábitos de proteção"
- [ ] Subir `RISK_MODEL_VERSION` a cada mudança ([version.js](server/lib/riskAssessment/version.js))

**API**
- [ ] Endpoint de avaliação **sem login**, com rate limit ([riskAssessment.js](server/routes/riskAssessment.js))
- [ ] Histórico: listar todas as avaliações, não só a última
- [ ] Endpoints para exportar e excluir os dados da pessoa (LGPD)
- [ ] Validação com `zod` (já instalado) no payload

**Banco**
- [ ] Revisar o [schema.prisma](prisma/schema.prisma): `fullName` deixa de ser obrigatório
- [ ] Decidir o destino dos datasets em `data/datasets/` (não servem para pontuar o questionário)
- [ ] Novas migrations para os campos do Gail

**Fontes desta frente:** NCI (BCRAT/Gail) e Ministério da Saúde (limiares de rastreamento).

### 8.3 Formulário e resultado

**Questionário** ([AssessmentFormPage.jsx](src/pages/AssessmentFormPage.jsx))
- [ ] Remover "Nome completo"
- [ ] Novas perguntas do Gail: idade no primeiro parto, biópsias, hiperplasia atípica, raça/etnia
- [ ] Separar o que é sintoma (alerta) do que é fator de risco
- [ ] Valores estáveis (`"first_degree"`) no lugar de rótulos em texto
- [ ] "Por que perguntamos isso?" em cada pergunta; salvar progresso; tempo restante

**Resultado** ([ResultsPage.jsx](src/pages/ResultsPage.jsx))
- [ ] Remover os gráficos com dados inventados e a matriz com notas internas
- [ ] Novo layout: sinais de alerta → plano de ação → o que mais influenciou → rastreamento → fontes
- [ ] Gráfico simples: risco da pessoa contra a média da idade (dados do próprio modelo)
- [ ] **Plano de ação** personalizado, cada recomendação com fonte
- [ ] "Perguntas para levar à consulta"
- [ ] Mitigação mínima já na Fase 0: aviso de "procure atendimento" quando houver nódulo ou secreção, independente do score

**PDF**
- [ ] Relatório com resumo, respostas, resultado, plano, perguntas, fontes e aviso (`@react-pdf/renderer`, gerado no navegador)
- [ ] Impressão com CSS `@media print`

**Fontes desta frente:** NCI (Gail), INCA e Ministério da Saúde (rastreamento e estilo de vida).

### 8.4 Conteúdo e fontes (site de consulta)

**Páginas**
- [ ] `/aprenda`: fatores de risco, sinais de alerta, autoexame, rastreamento, diagnóstico e tratamento, mitos e verdades, câncer de mama masculino
- [ ] `/numeros`: casos novos e mortalidade por UF e por idade
- [ ] `/onde-buscar-ajuda`: SUS, Disque Saúde 136, como pedir mamografia, ONGs
- [ ] Seus direitos, `/metodologia`, `/fontes`, FAQ, glossário

**Infraestrutura de fontes**
- [ ] Registro central `src/content/sources.js` (nome, link, ano, data de acesso)
- [ ] Componente `SourceCitation` com nota numerada e lista de referências
- [ ] "Última revisão em …" em cada artigo

**Fontes a levantar** (confirmar a edição vigente de cada uma antes de citar):

| Fonte | O que pegar |
|---|---|
| **INCA** (gov.br/inca) | Estimativa de casos novos por ano e por UF; fatores de risco; sinais e sintomas; detecção precoce |
| **INCA, Atlas de Mortalidade** | Mortalidade por UF e série histórica |
| **Ministério da Saúde** | Diretriz vigente de rastreamento mamográfico (faixa etária e periodicidade) |
| **DATASUS / SISCAN** | Cobertura de mamografia no SUS |
| **NCI, BCRAT** (bcrisktool.cancer.gov) | Modelo de Gail: fórmula, coeficientes e limitações |
| **SEER** (seer.cancer.gov) | Incidência por idade |
| **OMS / OPAS** | Ficha técnica de câncer de mama (contexto global) |
| **Leis 12.732/2012 e 13.896/2019** | Prazos para diagnóstico e tratamento no SUS |

### 8.5 Infra e qualidade

- [ ] CI no GitHub Actions (lint e build; testes depois). Em espera por decisão do time.
- [ ] Vitest: motor de risco, normalização e validação
- [ ] Testes de API (supertest)
- [ ] Supabase de desenvolvimento para rodar o login localmente
- [ ] Renomear o pacote para `riskcare` ([package.json](package.json))
- [ ] Revisar termos de uso e política de privacidade (sem "fins acadêmicos", com controlador e contato)
- [ ] README como estudo de caso (créditos do grupo, prints, decisões)

---

## 9. Decisões em aberto

- [ ] Gail no cliente (privacidade total, funciona offline) ou no servidor (código protegido, versão central)?
- [ ] Continuar com Vite + SSG ou migrar o front para Next/Astro por causa do conteúdo?
- [ ] Quem revisa o conteúdo médico? (Ter um profissional de saúde como revisor e citá-lo dá muita credibilidade.)
- [ ] O site atende também homens (câncer de mama masculino) na avaliação ou só no conteúdo?
- [ ] Manter o Supabase Auth ou simplificar, já que o login passa a ser opcional?
