# Planejamento Do Projeto - RiskCare

## 1. Contexto E Objetivo

[X] - Desenvolver uma solução de conscientização e prevenção do câncer de mama.
[X] - Permitir que o usuário informe dados pessoais e de saúde para receber uma estimativa orientativa de risco.
[X] - Basear a avaliação em referências de bases de dados específicas de câncer de mama.

## 2. Escopo Final Esperado

[ ] - Entregar um sistema web completo com frontend e backend.
[ ] - Implementar autenticação de usuário com cadastro, login e sessão.
[ ] - Criar uma tela de questionário para coleta de dados.
[ ] - Implementar um motor de avaliação de risco baseado em mais de uma base de dados.
[ ] - Criar uma tela de resultados com indicadores, tabelas, comparativos e gráficos.
[ ] - Publicar termos de uso e política de privacidade.
[ ] - Garantir uma estrutura mínima de segurança e privacidade para dados sensíveis.
[X] - Implementar uma feature obrigatória com biblioteca externa de interação/visual.

## 3. Feature Obrigatória Escolhida

[X] - Selecionar a biblioteca Lenis como feature obrigatória.
[X] - Escolher Lenis por combinar melhor com a proposta do RiskCare.
[X] - Priorizar rolagem suave e transições discretas em vez de uma solução 3D.
[X] - Evitar o uso de GSAP e Three.js como solução principal para esta obrigatoriedade.
[X] - Garantir rolagem suave consistente entre seções e páginas principais, preservando acessibilidade e responsividade.

## 4. Etapas De Implementação

### Etapa 1 - Arquitetura E Preparação

[ ] - Definir a stack do backend.
[ ] - Definir o banco de dados da aplicação.
[ ] - Definir a estrutura de pastas e o contrato da API.
[ ] - Listar os dados que serão coletados no questionário.
[ ] - Definir a estratégia de cálculo de risco.
[ ] - Documentar a arquitetura inicial.
[ ] - Documentar os endpoints principais.
[ ] - Documentar o modelo inicial de dados.

### Etapa 2 - Bases De Dados E Lógica De Avaliação

[ ] - Selecionar pelo menos duas bases de referência de câncer de mama.
[ ] - Mapear campos relevantes para fatores de risco.
[ ] - Definir normalização dos dados e pesos de cada fator.
[ ] - Implementar a primeira versão do cálculo de risco.
[ ] - Criar a tabela de mapeamento de variáveis.
[ ] - Criar um documento de fontes de dados.
[ ] - Disponibilizar um serviço inicial de avaliação local.

### Etapa 3 - Backend Core + Autenticação

[ ] - Criar endpoints de cadastro, login e perfil.
[ ] - Implementar hash de senha.
[ ] - Implementar autenticação por token ou sessão.
[ ] - Criar endpoints para salvar respostas do questionário.
[ ] - Criar endpoint para gerar e salvar o resultado da avaliação.
[ ] - Adicionar validações básicas e tratamento de erros.
[ ] - Persistir usuários e avaliações no banco.

### Etapa 4 - Frontend Do Fluxo Principal

[X] - Integrar o frontend atual com o fluxo de login e cadastro.
[X] - Criar as telas de login, cadastro e sucesso de cadastro.
[X] - Criar a tela de preenchimento de dados/questionário.
[ ] - Criar estados de loading, erro e sucesso.
[X] - Garantir navegação clara entre Home, Login, Cadastro, Questionário e Resultado.
[X] - Integrar Lenis no fluxo principal para suavidade de navegação e transições de rolagem.
[X] - Manter a navegação suave sem quebrar a acessibilidade.

### Etapa 5 - Tela De Resultado

[ ] - Criar o resumo de risco com classificação baixa, moderada ou alta.
[ ] - Exibir comparativos e fatores com maior impacto.
[ ] - Adicionar tabelas e gráficos, como radar, barras e rosca.
[ ] - Mostrar recomendações educativas e próximos passos.
[ ] - Garantir visualização clara para usuário leigo.

### Etapa 6 - Legal, Privacidade E Acessibilidade

[ ] - Criar a página de Termos de Uso.
[ ] - Criar a página de Política de Privacidade.
[ ] - Explicar claramente que o sistema não fornece diagnóstico médico.
[X] - Revisar acessibilidade com VLibras, contraste e navegação por teclado.
[X] - Manter os controles de acessibilidade funcionais nas páginas principais.
[X] - Garantir compatibilidade com desktop e mobile.

### Etapa 7 - Testes, Ajustes Finais E Entrega

[ ] - Executar testes funcionais do fluxo completo.
[ ] - Revisar visual e responsividade em desktop e mobile.
[ ] - Corrigir erros de console e problemas de performance.
[ ] - Preparar o roteiro de demonstração para a apresentação.
[ ] - Validar o comportamento do Lenis com navegação por teclado, contraste e VLibras.
[ ] - Consolidar a versão final estável.
[ ] - Atualizar o README com instruções de execução.

## 5. Requisitos Mínimos De Backend

[ ] - Cadastro e login de usuários.
[ ] - Persistência de respostas de questionário.
[ ] - Geração de avaliação por usuário.
[ ] - Histórico simples de avaliações.
[ ] - Estrutura para expansão futura de modelos de risco.

## 6. Estrutura Recomendada De Entidades

[ ] - User: id, nome, email, senha_hash, criado_em.
[ ] - QuestionnaireResponse: id, user_id, respostas_json, criado_em.
[ ] - RiskAssessment: id, user_id, response_id, score, classificação, detalhes_json, criado_em.
[ ] - DatasetReference: id, nome, fonte, versão, descrição.

## 7. Riscos Do Projeto E Mitigação

[ ] - Prazo curto: focar em MVP funcional e reduzir escopo secundário.
[ ] - Complexidade da avaliação: começar com regra de score transparente antes de um modelo mais complexo.
[ ] - Dados sensíveis: coletar o mínimo necessário e anonimizar quando possível.
[ ] - Confiança do usuário: reforçar textos educativos e o aviso de não diagnóstico.

## 8. MVP Obrigatório Para Conclusão

[ ] - Login e cadastro funcionando.
[ ] - Questionário funcionando.
[ ] - Resultado com score, classificação e ao menos um gráfico.
[ ] - Uso de ao menos duas referências de base de dados.
[ ] - Termos de uso e política de privacidade publicados.
[ ] - Aviso médico e acessibilidade básica ativos.

## 9. Pós-MVP

[ ] - Histórico detalhado de avaliações por usuário.
[ ] - Exportação de relatório em PDF.
[ ] - Comparativos mais avançados entre perfis.
[ ] - Melhorias de UX e microinterações.

## 10. Bases De Dados Recomendadas

### Bases Clínicas

[ ] - Breast Cancer Wisconsin (Diagnostic) - UCI  
  https://archive.ics.uci.edu/ml/datasets/breast%2Bcancer%2Bwisconsin%2B%28diagnostic%29
[ ] - Breast Cancer Wisconsin (Original) - UCI  
  https://archive.ics.uci.edu/dataset/15/breast%2Bcancer%2Bwisconsin%2Boriginal
[ ] - Breast Cancer Wisconsin (Prognostic) - UCI  
  https://archive.ics.uci.edu/dataset/16/breast%2Bcancer
[ ] - Breast Cancer Coimbra - UCI  
  https://archive.ics.uci.edu/ml/datasets/Breast%20Cancer%20Coimbra
[ ] - Mammographic Mass - UCI  
  https://archive.ics.uci.edu/ml/datasets/mammographic%2Bmass
[ ] - Breast Tissue - UCI  
  https://archive.ics.uci.edu/ml/datasets/Breast%2BTissue
[ ] - Breast Cancer (recurrence/non-recurrence) - UCI  
  https://archive.ics.uci.edu/ml/datasets/breast%20cancer
[ ] - Scikit-learn `load_breast_cancer`  
  https://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_breast_cancer.html

### Bases De Imagem

[ ] - BreaKHis  
  https://web.inf.ufpr.br/vri/databases/breast-cancer-histopathological-database-breakhis/
[ ] - CBIS-DDSM - TCIA  
  https://www.cancerimagingarchive.net/collection/cbis-ddsm/
[ ] - TCGA-BRCA Imaging Collection - IDC  
  https://portal.imaging.datacommons.cancer.gov/collections/tcga_brca/

### Bases Genômicas E Ômicas

[ ] - NCI Genomic Data Commons (GDC Data Portal)  
  https://gdc.cancer.gov/access-data/gdc-data-portal
[ ] - Projeto TCGA-BRCA no GDC  
  https://portal.gdc.cancer.gov/projects/TCGA-BRCA
[ ] - cBioPortal - METABRIC  
  https://www.cbioportal.org/study/summary?id=brca_metabric
[ ] - cBioPortal - TCGA Breast Invasive Carcinoma (PanCancer Atlas)  
  https://www.cbioportal.org/study/summary?id=brca_tcga_pan_can_atlas_2018
[ ] - GEO (NCBI) - GSE96058  
  https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE96058

### Bases Epidemiológicas E Contexto Populacional

[ ] - SEER Data & Software (NCI)  
  https://seer.cancer.gov/resources/
[ ] - SEER*Explorer (NCI)  
  https://seer.cancer.gov/statistics-network/explorer/overview.html
[ ] - Female Breast Cancer Stat Facts (SEER/NCI)  
  https://seer.cancer.gov/statfacts/html/breast.html?statfacts_page=breast.html
[ ] - INCA - Dados e Números  
  https://www.gov.br/inca/pt-br/assuntos/gestor-e-profissional-de-saude/controle-do-cancer-de-mama/dados-e-numeros
[ ] - INCA - Fontes de Informação  
  https://www.gov.br/inca/pt-br/assuntos/gestor-e-profissional-de-saude/controle-do-cancer-de-mama/fontes-de-informacao
[ ] - IARC/WHO - Ficha Global de Câncer de Mama (GLOBOCAN)  
  https://gco.iarc.who.int/media/globocan/factsheets/cancers/20-breast-fact-sheet.pdf
[ ] - OMS - Ficha Técnica de Câncer de Mama  
  https://www.who.int/news-room/fact-sheets/detail/breast-cancer

## 11. Observação Geral

[X] - Manter o planejamento em formato de checklist para facilitar o acompanhamento.
[X] - Atualizar os itens concluídos com `[X]` conforme as entregas forem finalizadas.
[ ] - Revisar o planejamento sempre que novas etapas forem adicionadas.
