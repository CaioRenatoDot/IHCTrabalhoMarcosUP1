# Planejamento do formulário de avaliação

> Documento vivo. Última revisão: 28/10/2026 (nomes das etapas).
> Relacionado: [PLANEJAMENTO.md](../PLANEJAMENTO.md) (seção 3.1) e [CHECKLIST.md](../CHECKLIST.md) (itens FM-10 a FM-14).

> **Decisão de 29/10/2026:** o fluxo inicial do site será o **formulário simplificado** de
> [formulario-simplificado-v2.md](formulario-simplificado-v2.md) (5 perguntas: sinais, idade, UF/município e
> mamografia, sem login e sem classificação). **Este documento passa a especificar a "avaliação ampliada"**:
> opcional, oferecida depois do formulário curto, para quem quiser entender seus fatores de risco. As perguntas
> em comum (P0, P1, P2, P3 e P25 daqui) usam os mesmos códigos nos dois fluxos.

Este documento define **de onde vêm as fontes, quais são as etapas, quais perguntas são feitas e como o
resultado usa cada resposta**, em três versões do formulário. Ele é a referência para implementar a avaliação v2 (área Formulário e resultado + Back).

---

## 1. Princípios

1. **Educativo, sem diagnóstico.** O resultado orienta; não afirma que a pessoa tem ou não tem câncer.
2. **Sinais de alerta não pontuam.** Nódulo, secreção e alterações de pele geram a orientação de procurar
   atendimento, independentemente de qualquer classificação.
3. **Rastreamento não é risco.** Estar com a mamografia atrasada não aumenta o risco biológico; é uma
   orientação separada.
4. **Minimização de dados (LGPD).** Só entra pergunta que alimenta alguma saída do resultado.
5. **"Não sei" é desconhecido, não risco.** A resposta não soma pontos; quando for relevante, o resultado
   sugere conversar com um profissional para esclarecer.
6. **Toda pergunta tem fonte e finalidade.** Se não houver fonte, a pergunta não entra.
7. **Público:** mulheres a partir de 18 anos. Homens são direcionados ao conteúdo sobre câncer de mama
   masculino (decisão de 28/10/2026).

---

## 2. Fontes

Status: ✅ conferida (trecho localizado) · ⚠️ a confirmar no texto oficial antes de publicar.

| ID | Fonte | O que embasa | Status |
|----|-------|--------------|--------|
| S1 | INCA — cartilha *Câncer de mama: vamos falar sobre isso?* (11ª ed., 2026). [PDF](https://ninho.inca.gov.br/jspui/bitstream/123456789/18158/1/cartilha-mama-2026%20-%20DefesoEleitoral.pdf) | Sinais e sintomas (nódulo, pele em "casca de laranja", alterações e secreção no mamilo, nódulos na axila/pescoço); fatores de risco; 5–10% dos casos hereditários; mama densa | ✅ trechos · ⚠️ redação final |
| S2 | INCA — *Controle do Câncer de Mama: Documento de Consenso* (2004). [PDF (cópia SES-SP)](https://www.saude.sp.gov.br/resources/ses/perfil/profissional-da-saude/homepage//consenso_para_controle_do_cancer_de_mama.pdf) | Critérios de **risco elevado** e conduta (exame clínico e mamografia anual a partir dos 35 anos) | ✅ critérios · ⚠️ documento de 2004, verificar se há versão mais nova |
| S3 | INCA — *Parâmetros técnicos para programação de ações de detecção precoce do câncer de mama*. [PDF](https://ninho.inca.gov.br/jspui/bitstream/123456789/12746/1/Par%c3%a2metros%20t%c3%a9cnicos%20para%20programa%c3%a7%c3%a3o%20de%20a%c3%a7%c3%b5es%20de%20detec%c3%a7%c3%a3o%20precoce%20do%20c%c3%a2ncer%20de%20mama..pdf) | Reproduz os critérios ampliados de risco elevado | ✅ |
| S4 | Ministério da Saúde — Nota Técnica de rastreamento mamográfico ([notícia do INCA, 29/09/2025](https://www.gov.br/inca/pt-br/assuntos/noticias/2025/ministerio-da-saude-padroniza-informacoes-para-acesso-ao-exame-de-mamografia-no-sus)) e Lei nº 15.284/2025 ([Ministério das Mulheres, 19/12/2025](https://www.gov.br/mulheres/pt-br/central-de-conteudos/noticias/2025/dezembro/sancionada-lei-que-amplia-acesso-das-mulheres-ao-exame-de-mamografia-fornecido-pelo-sus)) | 50–74 anos: rastreamento a cada 2 anos; 40–49 e acima de 74: exame por demanda, após orientação sobre riscos e benefícios; a lei assegura a mamografia pelo SUS a partir dos 40 anos, mesmo sem sintomas | ✅ (texto integral da nota técnica ainda não lido) |
| S5 | INCA — página de fatores de risco do câncer de mama (gov.br/inca) | Fatores reprodutivos/hormonais (menarca precoce, menopausa tardia, primeira gestação após 30, não ter tido filhos, contraceptivo hormonal, reposição hormonal pós-menopausa) e comportamentais (excesso de peso após a menopausa, sedentarismo, álcool, radiação ionizante) | ⚠️ localizar URL e redação vigentes |
| S6 | Diretrizes internacionais de alto risco (ex.: NCCN, ACR) | Mutação BRCA1/2 e radioterapia no tórax antes dos 30 como risco elevado (não constam no consenso do INCA) | ⚠️ escolher a diretriz e citar a edição |
| S7 | OMS — recomendações de atividade física e classificação de IMC | Faixas de IMC; 150 min/semana de atividade moderada | ⚠️ |
| S8 | NCI — Breast Cancer Risk Assessment Tool (modelo de Gail), [bcrisktool.cancer.gov](https://bcrisktool.cancer.gov/) | Cálculo de risco em 5 anos e ao longo da vida (v3) | ⚠️ |

Regra: cada pergunta abaixo aponta para uma ou mais fontes. Antes de publicar a v2, todas as ⚠️ precisam
virar ✅ com URL, edição e data de acesso registradas no registro central de fontes (CT-01).

---

## 3. Versões do formulário

| Versão | Quando | Resumo |
|--------|--------|--------|
| **v1** | Hoje + ajustes de credibilidade | Formulário atual (5 etapas, 20 campos, score por pesos). Os ajustes só acrescentam o aviso de alerta (FM-04) e remove o nome completo (FM-05). |
| **v2** | Próxima versão | Tela de boas-vindas + 7 etapas (ver 4.0). Quatro saídas independentes: **alerta**, **classificação por critérios** (risco habitual / elevado), **rastreamento** e **hábitos de proteção**. Códigos estáveis nas opções. |
| **v3** | Futuro | v2 + número do **modelo de Gail** quando aplicável, "por que perguntamos isso?", salvar progresso, densidade mamária opcional. |

### 3.1 v1 — formulário atual (referência)

| Etapa | Campos |
|-------|--------|
| Perfil | nome completo, idade, UF, diagnóstico de câncer |
| Histórico | câncer de mama na família, BRCA na família, câncer de ovário/endométrio na família |
| Sintomas | alterações observadas, última mamografia, dor (0–10) |
| Hormonal | anticoncepcional, reposição hormonal, menarca, menopausa, amamentação |
| Estilo de vida | atividade física, álcool, tabagismo, dieta (0–10), IMC |

Problemas da v1 que a v2 resolve: sintomas e mamografia somam pontos; pesos sem fonte; "não sei" pontua;
coleta nome sem uso; payload com rótulos de texto comparados por `includes`/`startsWith`.

---

## 4. v2 — etapas e perguntas

### 4.0 Nomes e organização das etapas

Cada etapa tem um **rótulo curto** (barra de progresso), um **título** (topo da tela) e uma **frase de apoio**
(logo abaixo do título, explicando por que aquelas perguntas importam). A tela de boas-vindas não conta como etapa
na barra de progresso: a pessoa vê **"Etapa 1 de 7"** a partir de "Sobre você".

| # | Rótulo (progresso) | Título da tela | Frase de apoio | Perguntas | Tempo estimado |
|---|--------------------|----------------|----------------|-----------|----------------|
| 0 | — | Antes de começar | Esta avaliação é educativa e leva cerca de 5 minutos. Ela não substitui uma consulta. | P0 | — |
| 1 | Sobre você | Sobre você | Sua idade ajuda a indicar quais exames são recomendados para você. | P1–P2 | 15 s |
| 2 | Sinais | Sinais nas mamas | Algumas alterações merecem avaliação, independentemente do resultado. | P3 | 30 s |
| 3 | Seu histórico | Seu histórico de saúde | Alguns diagnósticos e tratamentos anteriores mudam o tipo de acompanhamento indicado. | P4–P7 | 45 s |
| 4 | Família | Histórico familiar | O histórico das suas parentes mais próximas é um dos fatores mais importantes. | P8–P13 | 1 min |
| 5 | Ciclo e hormônios | Ciclo, gestação e hormônios | Fatores da sua vida reprodutiva também se relacionam ao risco. | P14–P19 | 1 min |
| 6 | Hábitos | Hábitos do dia a dia | Estes são fatores que você pode mudar, e o resultado mostra como. | P20–P24 | 45 s |
| 7 | Exames | Seus exames | Vamos ver se sua mamografia está em dia para a sua idade. | P25 | 15 s |
| — | — | Seu resultado | — | — | — |

Regras de fluxo entre etapas:
- **Etapa 2 (Sinais):** se algum sinal for marcado, o aviso aparece na própria etapa e a pessoa segue normalmente.
- **Etapa 3 (Seu histórico):** se P4 = `yes` (câncer de mama prévio), o formulário vai direto para o resultado,
  com orientação de acompanhamento. As etapas 4 a 7 não são exibidas.
- **Etapa 4 (Família):** P9 e P10 só aparecem se P8 indicar ao menos uma parente com câncer de mama.
- **Etapa 5 (Ciclo e hormônios):** P18 só aparece se P15 indicar menopausa.
- Os tempos são estimativas para orientar o texto "faltam cerca de X minutos"; total aproximado de 5 minutos.
  Medir com pessoas reais quando a v2 estiver pronta.

Legenda da coluna **Uso**: **A** alerta · **C** critério de risco elevado · **R** rastreamento ·
**H** hábito de proteção · **F** fator de risco informativo (aparece no resultado, não classifica) · **—** controle do fluxo.

### Etapa 0 — Antes de começar (boas-vindas)

| # | Pergunta | Tipo | Opções (código) | Obrig. | Uso | Fonte |
|---|----------|------|-----------------|--------|-----|-------|
| P0 | "Entendo que esta avaliação é educativa e não substitui consulta médica." | caixa | `accepted` | sim | — | — |

Texto da etapa: para quem é a avaliação (mulheres a partir de 18 anos) e link para o conteúdo sobre câncer de mama masculino.

### Etapa 1 — Sobre você

| # | Pergunta | Tipo | Opções (código) | Obrig. | Uso | Fonte |
|---|----------|------|-----------------|--------|-----|-------|
| P1 | Qual a sua idade? | número 18–100 | — | sim | R, F | S1, S4 |
| P2 | Em qual estado você mora? | UF | sigla | não | contexto regional | — |

### Etapa 2 — Sinais nas mamas

| # | Pergunta | Tipo | Opções (código) | Obrig. | Uso | Fonte |
|---|----------|------|-----------------|--------|-----|-------|
| P3 | Nos últimos meses, você notou alguma destas alterações? | múltipla | `breast_lump` nódulo na mama · `axillary_lump` nódulo na axila ou no pescoço · `nipple_discharge` saída espontânea de líquido pelo mamilo · `nipple_change` mamilo retraído ou alterado recentemente · `skin_change` pele avermelhada ou com aspecto de "casca de laranja" · `shape_change` mudança de tamanho ou formato · `none` nenhuma | sim | A | S1 |

- Qualquer opção diferente de `none` mostra **imediatamente** o aviso "procure uma unidade de saúde para avaliação", e a avaliação continua.
- A dor não é perguntada: vira um texto educativo (dor isolada raramente é sinal de câncer). ⚠️ confirmar redação em S1.

### Etapa 3 — Seu histórico de saúde

| # | Pergunta | Tipo | Opções (código) | Obrig. | Uso | Fonte |
|---|----------|------|-----------------|--------|-----|-------|
| P4 | Você já teve câncer de mama? | única | `yes` · `no` | sim | — | S2 |
| P5 | Já fez biópsia de mama? | única | `no` · `benign` sim, resultado benigno · `atypia_or_lcis` sim, com hiperplasia atípica ou neoplasia lobular in situ · `unknown_result` sim, não sei o resultado | sim | C | S2, S3 |
| P6 | Fez radioterapia no tórax antes dos 30 anos (por exemplo, para tratar linfoma)? | única | `yes` · `no` · `unknown` | sim | C | S6 |
| P7 | Já fez teste genético para câncer? | única | `no` · `negative` sim, sem mutação · `brca_positive` sim, mutação BRCA1/2 · `other_or_unknown` outro resultado ou não sei | sim | C | S6 |

Se **P4 = `yes`**: o formulário encerra aqui. O resultado não classifica risco e orienta seguir o
acompanhamento com a equipe de saúde.

### Etapa 4 — Histórico familiar

| # | Pergunta | Tipo | Opções (código) | Obrig. | Uso | Fonte |
|---|----------|------|-----------------|--------|-----|-------|
| P8 | Quantas parentes de 1º grau (mãe, irmã ou filha) tiveram câncer de mama? | única | `none` · `one` · `two_or_more` · `unknown` | sim | C, F | S2 |
| P9 | *(se P8 = one/two_or_more)* Alguma delas teve antes dos 50 anos? | única | `yes` · `no` · `unknown` | sim | C | S2 |
| P10 | *(se P8 = one/two_or_more)* Alguma delas teve nas duas mamas? | única | `yes` · `no` · `unknown` | sim | C | S2, S3 |
| P11 | Sua mãe, irmã ou filha teve câncer de ovário? | única | `yes` · `no` · `unknown` | sim | C | S2, S3 |
| P12 | Algum homem da sua família teve câncer de mama? | única | `yes` · `no` · `unknown` | sim | C | S2, S3 |
| P13 | Alguém da sua família tem mutação BRCA1/2 confirmada por teste? | única | `yes` · `no` · `unknown` | sim | C | S6 |

### Etapa 5 — Ciclo, gestação e hormônios

| # | Pergunta | Tipo | Opções (código) | Obrig. | Uso | Fonte |
|---|----------|------|-----------------|--------|-----|-------|
| P14 | Com que idade foi sua primeira menstruação? | única | `before_12` · `12_to_14` · `after_14` · `unknown` | sim | F | S5 |
| P15 | Você já entrou na menopausa? | única | `no` · `before_55` · `55_or_later` · `unknown` | sim | F | S5 |
| P16 | Com que idade teve sua primeira gestação? | única | `before_30` · `30_or_later` · `never` | sim | F | S5 |
| P17 | Você amamentou? | única | `yes` · `no` · `not_applicable` | não | F (protetor) | S5 |
| P18 | *(se P15 = before_55/55_or_later)* Fez reposição hormonal depois da menopausa? | única | `never` · `under_5y` · `5y_or_more` | sim | F | S5 |
| P19 | Usa ou usou anticoncepcional hormonal? | única | `never` · `past` · `current` | sim | F | S5 |

### Etapa 6 — Hábitos do dia a dia

| # | Pergunta | Tipo | Opções (código) | Obrig. | Uso | Fonte |
|---|----------|------|-----------------|--------|-----|-------|
| P20 | Qual o seu peso (kg)? | número | — | sim | H (IMC) | S5, S7 |
| P21 | Qual a sua altura (cm)? | número | — | sim | H (IMC) | S7 |
| P22 | Quanto tempo de atividade física você faz por semana? | única | `under_150` menos de 150 min · `150_or_more` 150 min ou mais | sim | H | S5, S7 |
| P23 | Com que frequência você consome bebida alcoólica? | única | `never` · `occasionally` · `weekly` algumas vezes por semana · `daily` | sim | H | S5 |
| P24 | Você fuma? | única | `never` · `former` · `current` | não | informativo | — |

O IMC é calculado a partir de P20 e P21 (não é perguntado como faixa). P24 não entra no índice de hábitos:
a relação com câncer de mama é mais fraca; o resultado só oferece orientação geral de saúde.

### Etapa 7 — Seus exames

| # | Pergunta | Tipo | Opções (código) | Obrig. | Uso | Fonte |
|---|----------|------|-----------------|--------|-----|-------|
| P25 | Quando você fez sua última mamografia? | única | `never` · `under_1y` · `1_to_2y` · `over_2y` | sim | R | S4 |

---

## 5. Como o resultado usa as respostas (v2)

As quatro saídas são independentes e aparecem nesta ordem:

### 5.1 Alerta (P3)
Qualquer sinal marcado → aviso em destaque no topo: procurar uma unidade de saúde. Não altera as demais saídas.

### 5.2 Classificação por critérios (P5–P13)

**Risco elevado** se pelo menos um critério for verdadeiro; caso contrário, **risco habitual**.

| Critério | Respostas | Fonte |
|----------|-----------|-------|
| Parente de 1º grau com câncer de mama antes dos 50 anos | P9 = `yes` | S2 |
| Parente de 1º grau com câncer de mama bilateral | P10 = `yes` | S2, S3 |
| Parente de 1º grau com câncer de ovário | P11 = `yes` | S2, S3 |
| Homem na família com câncer de mama | P12 = `yes` | S2, S3 |
| Biópsia com hiperplasia atípica ou neoplasia lobular in situ | P5 = `atypia_or_lcis` | S2, S3 |
| Mutação BRCA1/2 própria ou em familiar | P7 = `brca_positive` ou P13 = `yes` | S6 ⚠️ |
| Radioterapia no tórax antes dos 30 anos | P6 = `yes` | S6 ⚠️ |

- O resultado mostra **quais critérios** foram atendidos, com a fonte de cada um.
- Respostas `unknown` em perguntas de critério geram a sugestão de esclarecer o histórico com um profissional.
- Risco elevado orienta procurar avaliação para acompanhamento específico (S2 prevê exame clínico e
  mamografia anual a partir dos 35 anos; ⚠️ conferir se a recomendação continua vigente).

### 5.3 Rastreamento (P1, P25 e a classificação)

| Situação | Orientação |
|----------|------------|
| Risco elevado | Acompanhamento específico com profissional (ver 5.2) |
| 50 a 74 anos | Mamografia a cada 2 anos; "em dia" se P25 = `under_1y` ou `1_to_2y` (S4) |
| 40 a 49 anos | Pode fazer pelo SUS por demanda, após orientação do profissional sobre riscos e benefícios; garantido pela Lei nº 15.284/2025 (S4) |
| Abaixo de 40 | Rastreamento não indicado para risco habitual; atenção aos sinais de alerta |
| Acima de 74 | Exame por demanda, após orientação do profissional (S4) |

### 5.4 Hábitos de proteção (P20–P23)
Índice de 0 a 100 apenas com fatores modificáveis: IMC (com mais peso após a menopausa, conforme S5),
atividade física e álcool. Cada fator vem com uma recomendação e a fonte. **Não é chamado de risco.**
Os pesos do índice precisam ser definidos e documentados com fonte antes da implementação.

### 5.5 Fatores informativos (P1, P8, P14–P19)
Listados no resultado como "fatores associados ao risco presentes nas suas respostas", com explicação
curta e fonte, sem compor pontuação.

---

## 6. Mudanças da v1 para a v2

| Campo v1 | Na v2 | Motivo |
|----------|-------|--------|
| Nome completo | **Removido** | Não é usado no cálculo (LGPD) |
| Idade | Mantido (P1) | Rastreamento |
| UF | Mantido, opcional (P2) | Contexto regional |
| Diagnóstico de câncer | Alterado (P4): só câncer de mama, encerra o fluxo | Outro câncer não classifica risco de mama |
| Câncer de mama na família | Dividido (P8–P10) | Critérios usam grau, idade e bilateralidade |
| BRCA na família | Mantido (P13) + BRCA próprio (P7) | Critério |
| Ovário/endométrio na família | Alterado (P11): só ovário, 1º grau | Critério do consenso |
| Alterações observadas | Mantido (P3), **sem pontuar** | Sinal de alerta não é fator de risco |
| Última mamografia | Mantido (P25), **sem pontuar** | Rastreamento não é risco |
| Dor 0–10 | **Removido** (vira texto educativo) | Dor isolada raramente é sinal |
| Anticoncepcional | Mantido (P19) | Fator informativo |
| Reposição hormonal | Mantido (P18), condicional à menopausa | Fator informativo |
| Menarca | Mantido (P14) | Fator informativo |
| Menopausa | Alterado (P15): corte em 55 anos | Alinhar à fonte |
| Amamentação | Mantido (P17) | Fator protetor |
| Atividade física | Alterado (P22): minutos por semana | Alinhar à recomendação da OMS |
| Álcool | Mantido (P23) | Hábito |
| Tabagismo | Mantido, só informativo (P24) | Evidência mais fraca para mama |
| Dieta 0–10 | **Removido** | Autoavaliação sem base para pontuar |
| IMC por faixa | Alterado (P20–P21): peso e altura | Cálculo direto |
| — | **Novos:** P0, P5, P6, P7, P9, P10, P12, P16 | Critérios e fatores com fonte |

---

## 7. v3 — melhorias futuras

- **Modelo de Gail (S8):** número de risco em 5 anos e ao longo da vida, comparado à média da idade,
  apenas para quem tem 35 anos ou mais e não tem câncer de mama prévio, mutação BRCA conhecida nem
  radioterapia no tórax. Perguntas extras: número de biópsias, idade exata da primeira gestação e raça/cor.
  Limitação a explicar na página de metodologia: o modelo foi calibrado na população dos EUA.
- **"Por que perguntamos isso?"** em cada pergunta, com link para o artigo correspondente.
- **Salvar progresso** e tempo restante estimado.
- **Densidade mamária** (do laudo BI-RADS), opcional (S1 cita mama densa como fator).

---

## 8. Implementação da v2

1. **Definição única do formulário** compartilhada entre front e back (ex.: `shared/assessment/formV2.js`):
   etapas, perguntas, opções com códigos, condições (P9/P10, P18), finalidade e fonte de cada pergunta.
2. **Front:** o formulário é montado a partir dessa definição; o aviso de alerta aparece assim que P3 é marcado.
3. **Back:** validação com `zod` gerada da definição; um módulo por saída (`criteria.js`, `screening.js`,
   `habits.js`) em `server/lib/riskAssessment/`.
4. **Banco:** gravar `formVersion = 'form-v2'` em `QuestionnaireResponse` (campo já existe); respostas seguem
   em JSON. Migration apenas para tornar o nome opcional (BK-10). Avaliações v1 continuam exibidas como v1.
5. **Versão do modelo:** subir `RISK_MODEL_VERSION`.
6. **Testes (Vitest):** um caso por critério (ex.: "P9 = yes → risco elevado"; "P3 marcado → alerta sem
   mudar a classificação"; "P4 = yes → sem classificação").

---

## 9. Pendências antes de implementar

- [x] Confirmar em fonte oficial a orientação de rastreamento de 2025 (S4): notícia do INCA de 29/09/2025 e Lei nº 15.284/2025.
- [ ] Verificar se existe versão mais recente que o consenso de 2004 (S2), inclusive a conduta para risco elevado.
- [ ] Escolher e citar a diretriz internacional para BRCA e radioterapia (S6).
- [ ] Localizar a página vigente de fatores de risco do INCA (S5) e conferir as faixas (menarca, menopausa).
- [ ] Definir os pesos do índice de hábitos com fonte (5.4).
- [ ] Revisão do conteúdo por profissional de saúde (decisão em aberto no CHECKLIST).
