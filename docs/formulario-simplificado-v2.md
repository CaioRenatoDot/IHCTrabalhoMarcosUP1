# Proposta — formulário simplificado v2

> Rascunho para avaliação de produto. Não substitui o planejamento detalhado em [formulario.md](formulario.md).
> 
> Objetivo: validar uma versão curta do fluxo principal do RiskCare antes de decidir pela implementação do formulário completo de 25 perguntas.

## 1. Objetivo

Este formulário é uma **triagem educativa de sinais e encaminhamento**. Ele ajuda a pessoa a reconhecer alterações que merecem avaliação e a encontrar o próximo passo de atendimento.

Ele não realiza diagnóstico, não calcula a chance de ter câncer e não atribui uma classificação de risco.

## 2. O que muda em relação ao formulário detalhado

| Formulário detalhado planejado | Formulário simplificado |
| --- | --- |
| 25 perguntas em 7 etapas | 5 perguntas em 3 etapas, além da tela inicial |
| Sinais, critérios de risco elevado, hábitos e rastreamento | Sinais, rastreamento e encaminhamento |
| Pode produzir quatro saídas independentes | Produz orientação prática e acesso ao localizador |
| Coleta histórico familiar, hormonal, reprodutivo e hábitos | Coleta somente dados necessários para orientar o próximo passo |

As perguntas removidas continuam documentadas em [formulario.md](formulario.md) e podem retornar em uma futura avaliação ampliada.

## 3. Fluxo da pessoa usuária

```text
Início
  → Antes de começar
  → Sobre você
  → Sinais nas mamas
  → Resultado e próximo passo
  → Localizador de atendimento por UF e município
```

Se um sinal de alerta for selecionado, a pessoa vê o aviso imediatamente e ainda pode concluir o fluxo para acessar as orientações e o localizador.

## 4. Etapas e perguntas

### Tela inicial — Antes de começar

Texto sugerido:

> Esta ferramenta oferece informações educativas e não substitui uma consulta. Se você percebeu uma alteração na mama, ela pode ajudar a identificar o próximo passo para buscar atendimento.

| ID | Pergunta | Tipo | Opções | Obrigatória | Uso |
| --- | --- | --- | --- | --- | --- |
| P0 | “Entendo que esta ferramenta é educativa e não substitui consulta médica.” | Caixa de confirmação | `accepted` | Sim | Controle do fluxo |

### Etapa 1 — Sobre você

| ID | Pergunta | Tipo | Opções | Obrigatória | Uso |
| --- | --- | --- | --- | --- | --- |
| P1 | Qual a sua idade? | Número | 18 a 100 | Sim | Orientação de rastreamento |
| P2 | Em qual estado você mora? | Lista de UFs | Sigla da UF | Não | Contexto regional e localizador |
| P3 | Em qual município você mora ou busca atendimento? | Busca/lista de municípios | Município | Não | Localizador |

O formulário deve explicar que UF e município são opcionais e usados apenas para mostrar caminhos de atendimento próximos. Não solicitar localização exata.

### Etapa 2 — Sinais nas mamas

| ID | Pergunta | Tipo | Opções (código) | Obrigatória | Uso |
| --- | --- | --- | --- | --- | --- |
| P4 | Nos últimos meses, você notou alguma destas alterações? | Múltipla escolha | `breast_lump` nódulo na mama · `axillary_lump` nódulo na axila ou no pescoço · `nipple_discharge` saída espontânea de líquido pelo mamilo · `nipple_change` mamilo retraído ou alterado recentemente · `skin_change` pele avermelhada ou com aspecto de “casca de laranja” · `shape_change` mudança de tamanho ou formato · `none` nenhuma dessas alterações | Sim | Alerta e encaminhamento |

Regras da interface:

- `none` é exclusivo: ao selecioná-lo, as demais opções são desmarcadas.
- Qualquer opção diferente de `none` exibe imediatamente um aviso acolhedor e visível.
- O aviso não deve usar termos como “resultado positivo”, “diagnóstico” ou “você tem câncer”.

Texto sugerido para o aviso:

> Algumas alterações nas mamas precisam ser avaliadas por um profissional de saúde. Procure uma UBS ou outro serviço de saúde para receber orientação e, se necessário, encaminhamento para exames.

### Etapa 3 — Mamografia e acompanhamento

| ID | Pergunta | Tipo | Opções (código) | Obrigatória | Uso |
| --- | --- | --- | --- | --- | --- |
| P5 | Quando você fez sua última mamografia? | Escolha única | `never` nunca fiz · `under_1y` há menos de 1 ano · `1_to_2y` entre 1 e 2 anos · `over_2y` há mais de 2 anos · `unknown` não sei | Sim | Orientação de rastreamento |

P5 não aumenta nem reduz risco. Ela apenas permite apresentar uma orientação de rastreamento adequada à idade e lembrar que sintomas devem ser avaliados mesmo que a mamografia esteja recente.

## 5. Resultado: saídas possíveis

O resultado deve mostrar blocos independentes, nesta ordem.

### 5.1 Sinal de alerta marcado

Condição: P4 contém uma opção diferente de `none`.

Mostrar:

1. aviso para procurar uma unidade de saúde;
2. botão principal para o localizador, se UF ou município foram informados;
3. alternativa para consultar a UBS mais próxima e o Disque Saúde 136;
4. lembrete de que apenas uma avaliação profissional pode investigar a causa da alteração.

### 5.2 Nenhum sinal marcado

Condição: P4 = `none`.

Mostrar:

1. mensagem de que não notar sinais não substitui consultas e acompanhamento;
2. orientação de rastreamento baseada na idade e P5;
3. links para conteúdos sobre sinais de alerta e mamografia;
4. botão para o localizador, caso queira conhecer os serviços da região.

### 5.3 Orientação de rastreamento

Usar P1 e P5, sem associar a resposta a risco de câncer:

| Situação | Mensagem orientativa resumida |
| --- | --- |
| 50 a 74 anos | Informar que a recomendação prioritária de rastreamento no SUS é mamografia a cada dois anos; se P5 indicar mais de dois anos, sugerir conversar com uma UBS. |
| 40 a 49 anos | Informar que o exame pode ser buscado por demanda, após orientação profissional sobre riscos e benefícios. |
| Menos de 40 anos ou mais de 74 anos | Orientar que a necessidade de rastreamento deve ser discutida com um profissional, considerando a situação individual. |
| Qualquer idade com sinal marcado | Priorizar a orientação de procurar atendimento para investigação; não usar o status da mamografia para reduzir o alerta. |

## 6. Conteúdo complementar no resultado

Depois da orientação principal, incluir links curtos para:

- O que é câncer de mama;
- Sinais de alerta;
- Quando fazer mamografia;
- Como buscar atendimento pelo SUS;
- Onde buscar ajuda;
- Fontes e limitações da ferramenta.

## 7. Dados e privacidade

- O fluxo funciona sem cadastro ou login.
- Não coletar nome completo, e-mail, CPF, endereço ou localização precisa.
- UF e município são opcionais e usados somente para contexto do localizador.
- Se houver salvamento futuro, pedir consentimento explícito e oferecer exclusão dos dados.

## 8. Fontes mínimas antes de publicar

As fontes abaixo já estão listadas no planejamento detalhado e devem ter URL, edição e data de acesso registradas no registro central de fontes:

- INCA — [Sinais e sintomas](https://www.gov.br/inca/pt-br/assuntos/cancer/tipos/mama/versao-para-profissionais-de-saude/sinais-e-sintomas).
- INCA — [Detecção precoce](https://www.gov.br/inca/pt-br/assuntos/cancer/tipos/mama/versao-para-profissionais-de-saude/deteccao-precoce).
- Ministério da Saúde / INCA — orientação vigente de rastreamento mamográfico.

## 9. O que fica para uma versão ampliada

As perguntas abaixo não entram neste fluxo inicial, mas podem voltar em uma avaliação futura e bem fundamentada:

- histórico pessoal de biópsia, radioterapia e teste genético;
- histórico familiar detalhado de câncer de mama, ovário e BRCA;
- menarca, menopausa, gestação, amamentação, anticoncepcional e reposição hormonal;
- peso, altura, atividade física, consumo de álcool e tabagismo;
- critérios de risco elevado, índice de hábitos de proteção e modelo de Gail.

## 10. Critérios para decidir pela implementação

- O formulário pode ser respondido em cerca de 1 a 2 minutos.
- A pessoa entende que recebe orientação, não diagnóstico.
- Um sinal de alerta leva a um próximo passo claro e imediato.
- O localizador só mostra serviços com fonte e data de verificação.
- Todo o fluxo funciona sem login e em celular.
- O conteúdo de saúde passa por revisão antes de publicação.
