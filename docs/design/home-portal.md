# Home como portal (próxima versão da home)

> Decidido em 28/10/2026. Status: **planejado, ainda não implementado**.
> Itens no [CHECKLIST.md](../../CHECKLIST.md): FR-17 e CT-15 a CT-18.
> Visual: [design-system.md](design-system.md).

## 1. Problema

A home atual segue a estrutura de **landing page**:

> hero com chamada grande → faixa de números → 3 benefícios → passo a passo → FAQ → faixa final "comece agora"

É uma página longa feita para **convencer** a clicar num botão. Para um site profissional de saúde isso pesa
negativamente: parece produto à venda, não serviço de referência. Além disso, todo o conteúdo do site está dentro
da home, porque ainda não existem outras páginas.

## 2. Decisão

Sites de referência em saúde (INCA, NHS, Mayo Clinic, gov.br) tratam a home como **portal**: ela ajuda a pessoa a
**chegar** onde precisa. A home do RiskCare passa a seguir esse modelo:

1. O conteúdo informativo sai da home e ganha **páginas próprias**.
2. A home fica curta (uma a duas telas) e funciona como **ponto de partida**: atalhos, notícias e apoio.

## 3. Páginas novas

Todas com o conteúdo já verificado, fonte visível e o mesmo design system.

| Rota | Conteúdo | Fonte | Item |
|------|----------|-------|------|
| `/sinais-de-alerta` | Os 5 sinais, o que fazer ao notar alguma alteração | INCA, cartilha 2026 | CT-15 |
| `/mamografia` | Quando fazer: 50–74 anos a cada 2 anos; 40–49 e acima de 74 por demanda, após orientação; Lei nº 15.284/2025 (a partir dos 40 no SUS) | Nota técnica do MS (notícia do INCA, 29/09/2025) e Lei nº 15.284/2025 | CT-16 |
| `/onde-buscar-ajuda` | Unidade básica de saúde, Disque Saúde 136, CVV 188 | — | CT-17 |
| `/perguntas-frequentes` | As perguntas que hoje estão na home | — | CT-18 |

## 4. Estrutura da nova home

```text
┌──────────────────────────────────────────────────────────────┐
│ [logo] RiskCare   Avaliação  Sinais  Mamografia  Ajuda  Sobre │
├──────────────────────────────────────────────────────────────┤
│ Câncer de mama: informação confiável e                        │
│ avaliação educativa de risco          (título menor, 2 linhas)│
├──────────────────────────────────────────────────────────────┤
│ ┌───────────────────────────┐ ┌──────────┐ ┌──────────┐       │
│ │ Avaliação de risco         │ │ Sinais   │ │Mamografia│       │
│ │ Responda em ~5 min e veja  │ │ de alerta│ │quando    │       │
│ │ seus fatores. [Começar →]  │ │      →   │ │fazer  →  │       │
│ └───────────────────────────┘ ├──────────┤ ├──────────┤       │
│  (destaque, ou "Seu último    │ Onde     │ │ Perguntas│       │
│   resultado" se logada)       │ buscar   │ │frequentes│       │
│                               │ ajuda →  │ │      →   │       │
│                               └──────────┘ └──────────┘       │
├───────────────────────────────────────┬──────────────────────┤
│ Notícias e atualizações               │ Em números (INCA)     │
│ 21 out 2026 · INCA                    │ 78.610 casos/ano      │
│ Disparidades raciais no câncer…       │ 1º entre as mulheres  │
│ 19 out 2026 · Min. das Mulheres       │ ─────────────────     │
│ Desinformação ainda dificulta…        │ Precisa de ajuda?     │
│ 04 fev 2026 · INCA                    │ Disque Saúde 136      │
│ Estimativa 2026–2028…                 │ CVV 188               │
├───────────────────────────────────────┴──────────────────────┤
│ rodapé                                                        │
└──────────────────────────────────────────────────────────────┘
```

### 4.1 Blocos

1. **Abertura curta:** título em duas linhas, sem frase de efeito, sem selos de venda e sem ilustração.
2. **Grade de atalhos** (peça central):
   - **Destaque da avaliação**, que muda conforme o estado da pessoa:
     - visitante ou sem avaliação: "Avaliação de risco" + "Começar";
     - avaliação em andamento: "Continuar avaliação";
     - com resultado salvo: "Seu último resultado" + data + "Ver resultado".
   - **Atalhos** para Sinais de alerta, Mamografia, Onde buscar ajuda e Perguntas frequentes.
3. **Notícias em lista:** data, fonte e título, como nos portais oficiais (sem cards de marketing). Usa
   [src/content/news.js](../../src/content/news.js) e, no futuro, a busca automática do back (BK-13).
4. **Coluna lateral:** os números do INCA em formato compacto, com fonte, e os contatos de apoio (136 e 188).

### 4.2 O que sai da home

- Hero grande, selos ("Cerca de 5 minutos", "Gratuito"…) e a prévia ilustrativa do formulário.
- Faixa escura de números (vira a coluna lateral).
- Os 3 cartões de benefícios.
- O passo a passo "Como funciona" (vai para a página da avaliação, quando ela for refeita).
- As perguntas frequentes (vão para `/perguntas-frequentes`).
- A faixa rosa "Comece sua avaliação agora".

### 4.3 Menu

Avaliação · Sinais de alerta · Mamografia · Onde buscar ajuda · Sobre. Entrar/Sair e o botão principal continuam à
direita.

## 5. Critérios para considerar pronta

- A home cabe em uma a duas telas no desktop.
- Nenhum conteúdo informativo extenso fica só na home; tudo tem página própria.
- Todo número continua com fonte visível.
- Zoom de texto, alto contraste e VLibras funcionam em todas as páginas novas.
- Funciona no celular (atalhos em uma coluna, coluna lateral abaixo das notícias).
