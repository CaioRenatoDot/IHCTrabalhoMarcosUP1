# Funcionalidades propostas — RiskCare

## Propósito

O RiskCare é uma plataforma educativa sobre câncer de mama. Seu fluxo principal deve ajudar a pessoa a:

1. entender informações confiáveis;
2. reconhecer possíveis sinais de alerta;
3. receber uma orientação clara sobre o próximo passo;
4. encontrar caminhos de atendimento na sua região.

O site não realiza diagnóstico e não substitui atendimento profissional.

## Funcionalidades do produto

| Área | Funcionalidade | Objetivo |
| --- | --- | --- |
| Início | Portal com atalhos para avaliação, sinais, mamografia e ajuda | Direcionar rapidamente a pessoa para a informação necessária |
| Conteúdo educativo | Explicação do que é o câncer de mama, sinais, fatores de risco, rastreamento e prevenção | Oferecer informação em linguagem simples e com fontes oficiais |
| Formulário de sinais | Perguntas sobre alterações percebidas nas mamas e axilas | Apoiar a identificação educativa de sinais que merecem atenção |
| Orientação após o formulário | Mensagens por prioridade, sem diagnóstico ou probabilidade | Indicar quando procurar UBS, serviço de saúde ou atendimento prioritário |
| Rastreamento | Orientações sobre mamografia e acompanhamento | Explicar a diferença entre rastreamento e investigação de sintomas |
| Localizador de atendimento | Busca por UF e município de UBS, hospitais ou serviços de referência | Facilitar o caminho até o atendimento |
| Onde buscar ajuda | Disque Saúde 136, orientação para usar o SUS e contatos de apoio | Dar uma alternativa prática mesmo sem usar o localizador |
| Notícias | Lista de atualizações curadas de fontes oficiais | Manter o portal útil e atualizado |
| Acessibilidade | Zoom de texto, alto contraste, teclado e VLibras | Garantir acesso a diferentes perfis de pessoas usuárias |
| Conta opcional | Histórico e salvamento de avaliações, mediante consentimento | Dar continuidade ao acompanhamento sem bloquear o uso público |
| Privacidade | Explicação de dados coletados, finalidade e exclusão | Respeitar a minimização de dados e a LGPD |

## Direção para o formulário

O formulário deve ser apresentado como uma **verificação educativa de sinais e orientações**, e não como diagnóstico ou cálculo de chance de ter câncer.

- Respostas sobre nódulo, secreção mamilar espontânea, retração do mamilo ou da pele, pele com aspecto de casca de laranja, alteração persistente ou aumento de volume devem gerar uma orientação de procurar avaliação profissional.
- A ausência de sinais não deve ser apresentada como confirmação de saúde.
- Sinais e sintomas não devem somar pontos a uma classificação de risco biológico.
- O resultado deve usar linguagem direta, acolhedora e sem alarmismo.

Referências iniciais:

- [INCA — Sinais e sintomas](https://www.gov.br/inca/pt-br/assuntos/cancer/tipos/mama/versao-para-profissionais-de-saude/sinais-e-sintomas)
- [INCA — Detecção precoce](https://www.gov.br/inca/pt-br/assuntos/cancer/tipos/mama/versao-para-profissionais-de-saude/deteccao-precoce)

## Localizador de atendimento

O localizador deve começar de forma segura e verificável:

1. Seleção de estado e município, sem exigir localização exata.
2. Lista de serviços confirmados, com nome, endereço, telefone, link da fonte e data da última verificação.
3. Filtros simples, como UBS, hospital de referência e serviço de exames.
4. Ação para informar um dado desatualizado.
5. Aviso para confirmar agenda, disponibilidade e serviços diretamente com a unidade.

Enquanto não existir uma base verificada e mantida, a página deve orientar a buscar a UBS mais próxima e usar o Disque Saúde 136, em vez de listar clínicas de forma automática.

## Prioridades para uma primeira versão

1. Página educativa: “O que é câncer de mama?”.
2. Formulário educativo de sinais de alerta.
3. Resultado orientativo por prioridade, sem score numérico.
4. Página “O que fazer agora?” com próximos passos e acesso ao SUS.
5. Página de ajuda com Disque Saúde 136.
6. Localizador por UF e cidade, inicialmente com dados revisados manualmente.
7. Fontes centralizadas, com link e data de revisão em cada conteúdo de saúde.

## Melhorias para versões futuras

- Relatório para impressão ou PDF sem exigir conta.
- Salvamento local temporário do formulário.
- Conta opcional com histórico e exclusão de dados.
- Filtro do localizador por tipo de serviço e acessibilidade.
- Painel com dados oficiais por estado, sempre com fonte, ano e data de atualização.
- Área de perguntas frequentes e glossário.
- Processo editorial para revisão periódica do conteúdo médico.

## Itens a remover ou evitar

- Pontuações, porcentagens ou gráficos que pareçam diagnosticar câncer.
- Sintomas e data da mamografia usados para aumentar um score de risco.
- Textos como “resultado positivo”, “resultado negativo” ou “você tem câncer”.
- Dados fictícios, comparativos sem fonte ou gráficos apenas decorativos.
- Login obrigatório antes do uso do formulário educativo.
- Coleta de nome completo, localização precisa ou outros dados que não sejam necessários.
- Listagem de clínicas sem fonte, revisão e data de atualização.

## Critérios de qualidade

- Todo dado de saúde tem fonte, link e data de revisão.
- Toda orientação reforça que não substitui consulta profissional.
- O fluxo principal funciona sem conta.
- O resultado aponta uma ação concreta e compreensível.
- O conteúdo e o localizador respeitam acessibilidade e privacidade.
