# Design system — RiskCare

> Decidido em 28/10/2026. Vale para **todas as telas**.
> Referência de estrutura da home: [home/](home/) (exportação do Stitch). A referência mostra a organização da
> página; as cores, os ícones e o excesso de cards dela **não** devem ser copiados (ver seção 4).

## 1. Direção

**Neutro com rosa de acento.** Fundo branco e cinza quente, texto grafite, e o rosa da logo apenas em ações,
destaques e elementos de marca. O objetivo é parecer um serviço de saúde sério e confiável, acolhedor sem ser
sentimental.

## 2. Cores

| Token | Valor | Uso | Contraste sobre branco |
|-------|-------|-----|------------------------|
| `--rc-bg` | `#FFFFFF` | Fundo principal | — |
| `--rc-surface` | `#F7F5F4` | Seções alternadas, áreas de apoio | — |
| `--rc-border` | `#E7E2E0` | Linhas e divisões | — |
| `--rc-ink` | `#1F2430` | Texto principal e títulos | ~15:1 ✅ |
| `--rc-ink-muted` | `#5B5F6B` | Texto secundário | ~6,4:1 ✅ |
| `--rc-brand` | `#C4517A` | Rosa da logo: detalhes de marca, ícones, sublinhados, texto **grande** | ~4,4:1 ⚠️ não usar em texto pequeno |
| `--rc-action` | `#A63D66` | Botões, links e foco de ação (texto branco sobre ele também passa) | ~6,0:1 ✅ |
| `--rc-action-hover` | `#8A2F53` | Hover/pressionado | ✅ |
| `--rc-brand-soft` | `#F6E4EB` | Fundo de destaque leve (uso pontual) | — |
| `--rc-surface-warm` | `#F5F2F0` | Off-white quente da faixa "O que fazer agora?" na home (cor escolhida pelo Caio) | texto secundário ~5,9:1 ✅ |
| `--rc-surface-strong` | `#ECE7E4` | Fundo do rodapé, um pouco mais escuro para se separar da faixa acima | texto secundário ~5,2:1 ✅ |
| `--rc-danger` | `#B42318` | Sinais de alerta, erros | ~6,3:1 ✅ |
| `--rc-info` | `#1D4E89` | Informação, notas de fonte | ~8,4:1 ✅ |

Regras:
- O rosa aparece pouco: ação principal, links, marca. Se tudo for rosa, nada se destaca.
- Alerta de saúde usa `--rc-danger`, nunca rosa (rosa é da marca, não indica perigo).
- O modo de **alto contraste** existente continua sobrepondo essas cores.

## 3. Tipografia

| Papel | Fonte | Tamanho/peso |
|-------|-------|--------------|
| Títulos e rótulos | Plus Jakarta Sans | 600–700 |
| Texto corrido, formulário | Inter | 400–500, altura de linha ≥ 1,5 |

Escala (desktop → mobile): título de página 40 → 30 px · título de seção 28 → 24 · subtítulo 20 · corpo 16 ·
apoio 14. O zoom de texto da acessibilidade continua multiplicando essa escala.

## 4. O que evitar (aparência de "feito por IA")

- **Tudo em card.** Card só para o que é ação ou resultado (fazer/continuar a avaliação, ver o resultado, um artigo).
  O resto é seção com título, texto e lista, separada por espaço ou linha fina.
- **Ícone em todo lugar.** Ícones só onde ajudam a ler: menu, alertas e botões. Um único conjunto, de traço fino:
  **Lucide** via `react-icons/lu` (já instalado). Nada de Material Symbols nem ícone dentro de círculo pastel em cada bloco.
- **Efeitos decorativos:** sem manchas desfocadas de fundo, sem `pulse`/`ping`, sem brilhos.
  Animações curtas e discretas, sempre respeitando `prefers-reduced-motion`.
- **Carrossel que passa sozinho.** Só carrossel manual (botões anterior/próxima, contador, anúncio para leitor de
  tela). Troca automática atrapalha a leitura e a acessibilidade, e quase ninguém vê além do primeiro item.
  **Exceção aprovada (29/10/2026):** fotos decorativas no fundo da abertura podem se alternar sozinhas, desde que
  o texto fique fixo, haja botão de pausar visível, a troca pare com mouse/foco na área e não haja movimento com
  `prefers-reduced-motion` (WCAG 2.2.2).
- **Etiquetas em todos os cantos** ("Biblioteca Médica", "Agendado"…). Só quando informam algo útil.
- **Texto emotivo demais.** Acolhedor, mas direto e objetivo.
- **Estrutura de landing page.** A home é um portal (atalhos, notícias, apoio), não uma sequência de seções de
  venda. Ver [home-portal.md](home-portal.md).
- **Conteúdo fictício.** Nada de nomes de médicos, clínicas, serviços ou números que não existem (ver regras de
  conteúdo no [CLAUDE.md](../../CLAUDE.md)).

## 5. Elementos presentes em todas as telas

- **Logo do RiskCare** ([public/riskcare_logo.png](../../public/riskcare_logo.png)) no cabeçalho de **todas** as
  páginas, inclusive login, formulário e resultado; também no rodapé, na tela de carregamento, no PDF do resultado
  e na imagem de compartilhamento. A logo é a única ilustração da marca.
- **VLibras** e **controles de acessibilidade** (zoom, alto contraste, teclado) globais, como hoje. O cabeçalho
  e qualquer barra fixa não podem cobri-los.
- **Aviso de que o conteúdo é educativo**, no rodapé.

## 6. Imagens e animação da logo

- **Fotos:** só de bancos com licença livre para uso comercial (Pexels, Unsplash sem "+"), mostrando pessoas de forma
  positiva e sem sugerir que estejam doentes ou que endossem o site. Crédito visível junto da foto, mesmo quando a
  licença não exige, e registro na tabela abaixo. Arquivos em `public/images/`, até ~1200 px de largura.
- **Logo:** redesenhada em SVG a partir do PNG original, com o laço sendo desenhado ao carregar e ao passar o
  mouse/focar a marca; parada para quem prefere menos movimento. Detalhes, comparação com o original e como editar:
  [logo.md](logo.md).

| Arquivo | Uso | Autor / fonte | Licença |
|---------|-----|---------------|---------|
| `public/images/home-consulta.jpg` | Abertura da home (foto 1) | [Thirdman / Pexels](https://www.pexels.com/photo/doctor-consulting-a-patient-7659873/) | [Licença Pexels](https://www.pexels.com/license/): uso comercial livre, crédito opcional |
| `public/images/home-acolhimento.jpg` | Abertura da home (foto 2) | [RDNE Stock project / Pexels](https://www.pexels.com/photo/smiling-patient-and-doctor-shaking-hands-8313224/) | Licença Pexels |
| `public/images/home-conversa.jpg` | Abertura da home (foto 3) | [Cedric Fauntleroy / Pexels](https://www.pexels.com/photo/a-woman-talking-to-a-doctor-4266944/) | Licença Pexels |

## 7. Formas e espaçamento

- Raio: 8 px em campos e botões pequenos, 12–16 px em cards. Pílula só em etiquetas e botões principais.
- Sombra: uma só, bem leve, neutra (não rosa), apenas em cards clicáveis.
- Espaçamento em múltiplos de 4 px; seções com bastante respiro (64–96 px no desktop).
- Largura máxima do conteúdo: 1200 px; texto corrido em colunas de até ~70 caracteres.
