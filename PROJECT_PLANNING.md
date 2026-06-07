# Planejamento do Projeto - RiskCare

## 1. Contexto e Objetivo

[X] - Desenvolver uma solução de conscientização e prevenção do câncer de mama.
[X] - Permitir que o usuário informe dados pessoais e de saúde para receber uma estimativa orientativa de risco.
[X] - Basear a avaliação em referências de bases de dados específicas de câncer de mama.

## 2. Escopo Final Esperado

[ ] - Entregar um sistema web completo com frontend e backend.
[X] - Implementar autenticação de usuário com cadastro, login e sessão integrada ao Supabase.
[X] - Criar uma tela de questionário para coleta de dados.
[ ] - Implementar um motor de avaliação de risco baseado em mais de uma base de dados.
[X] - Criar uma tela de resultados com indicadores, tabelas, comparativos e gráficos.
[X] - Publicar termos de uso e política de privacidade.
[ ] - Garantir uma estrutura mínima de segurança e privacidade para dados sensíveis.
[X] - Implementar uma feature obrigatória com biblioteca externa de interação/visual.

## 3. Feature Obrigatória Escolhida

[X] - Selecionar a biblioteca Lenis como feature obrigatória.
[X] - Escolher Lenis por combinar melhor com a proposta do RiskCare.
[X] - Priorizar rolagem suave e transições discretas em vez de uma solução 3D.
[X] - Evitar o uso de GSAP e Three.js como solução principal para esta obrigatoriedade.
[X] - Garantir rolagem suave consistente entre seções e páginas principais, preservando acessibilidade e responsividade.

## 4. Etapas de Implementação

### Etapa 1 - Arquitetura e Preparação

[X] - Definir a stack do backend como Supabase.
[X] - Definir o banco de dados da aplicação no Supabase.
[X] - Definir a estrutura de pastas e o contrato da API.
[X] - Listar os dados que serão coletados no questionário.
[X] - Definir a estratégia de cálculo de risco.
[X] - Documentar a arquitetura inicial.
[X] - Documentar os endpoints principais.
[X] - Documentar o modelo inicial de dados.

### Etapa 2 - Bases de Dados e Lógica de Avaliação

[ ] - Selecionar pelo menos duas bases de referência de câncer de mama.
[ ] - Mapear campos relevantes para fatores de risco.
[ ] - Definir normalização dos dados e pesos de cada fator.
[ ] - Implementar a primeira versão do cálculo de risco.
[ ] - Criar a tabela de mapeamento de variáveis.
[X] - Criar um documento de fontes de dados.
[ ] - Disponibilizar um serviço inicial de avaliação local.

### Etapa 3 - Backend Core + Autenticação Segura

[X] - Configurar autenticação de cadastro, login e sessão via Supabase Auth no frontend como base inicial.
[X] - Implementar hash e sessão inicial de autenticação pelo próprio Supabase.
[X] - Criar estados de loading, erro e sucesso para o fluxo de autenticação.
[X] - Proteger o acesso ao questionário e à área de resultados por sessão.
[X] - Criar a estrutura inicial do backend em Node.js e Express.
[X] - Adicionar cookies seguros, CSRF, rate limit e endpoints base de auth.
[X] - Criar um backend próprio para endurecer a camada de autenticação e segurança.
[X] - Migrar a sessão para cookie HttpOnly, Secure e SameSite controlado pelo backend.
[X] - Proteger login, logout e rotas sensíveis com CSRF.
[X] - Aplicar rate limit por IP e por credencial nas rotas de autenticação.
[X] - Implementar revogação de sessão no servidor.
[X] - Registrar eventos de autenticação e expor endpoint de diagnóstico de auth.
[ ] - Configurar SMTP customizado/Brevo para e-mails transacionais.
[ ] - Definir a estratégia de acesso: signup público com confirmação de e-mail ou allowlist restrita.
[ ] - Criar a camada de persistência via Prisma para respostas do questionário e resultados.
[ ] - Criar a camada de persistência via Prisma para usuários e histórico de avaliações.
[ ] - Adicionar validações básicas e tratamento de erros na integração com banco.
[ ] - Persistir usuários e avaliações no banco.

### Etapa 4 - Frontend do Fluxo Principal

[X] - Integrar o frontend atual com o fluxo de login e cadastro.
[X] - Criar as telas de login, cadastro e sucesso de cadastro.
[X] - Criar a tela de preenchimento de dados/questionário.
[X] - Criar estados de loading, erro e sucesso.
[X] - Garantir navegação clara entre Home, Login, Cadastro, Questionário e Resultado.
[X] - Integrar Lenis no fluxo principal para suavidade de navegação e transições de rolagem.
[X] - Manter a navegação suave sem quebrar a acessibilidade.

### Etapa 5 - Tela de Resultado

[X] - Criar o resumo de risco com classificação baixa, moderada ou alta.
[X] - Exibir comparativos e fatores com maior impacto.
[X] - Adicionar tabelas e gráficos, como radar, barras e rosca.
[ ] - Mostrar recomendações educativas e próximos passos.
[X] - Garantir visualização clara para usuário leigo.

### Etapa 6 - Legal, Privacidade e Acessibilidade

[X] - Criar a página de Termos de Uso.
[X] - Criar a página de Política de Privacidade.
[X] - Explicar claramente que o sistema não fornece diagnóstico médico.
[X] - Revisar acessibilidade com VLibras, contraste e navegação por teclado.
[X] - Manter os controles de acessibilidade funcionais nas páginas principais.
[X] - Garantir compatibilidade com desktop e mobile.

### Etapa 7 - Testes, Ajustes Finais e Entrega

[ ] - Executar testes funcionais do fluxo completo.
[ ] - Revisar visual e responsividade em desktop e mobile.
[ ] - Corrigir erros de console e problemas de performance.
[ ] - Preparar o roteiro de demonstração para a apresentação.
[ ] - Validar o comportamento do Lenis com navegação por teclado, contraste e VLibras.
[ ] - Consolidar a versão final estável.
[ ] - Atualizar o README com instruções de execução.

## 5. Requisitos Mínimos de Backend

[X] - Cadastro e login de usuários via Supabase Auth como ponto de partida.
[X] - Sessão segura no backend com cookie HttpOnly.
[X] - Proteção CSRF, rate limit e revogação de sessão.
[X] - Auditoria de eventos de autenticação.
[X] - Endpoint de diagnóstico/saúde da autenticação.
[ ] - Persistência de respostas de questionário.
[ ] - Geração de avaliação por usuário.
[ ] - Histórico simples de avaliações.
[ ] - Estrutura para expansão futura de modelos de risco.

## 6. Estrutura Recomendada de Entidades

[ ] - Profile: id, user_id, full_name, created_at, updated_at.
[ ] - QuestionnaireResponse: id, user_id, form_version, payload_json, normalized_snapshot_json, submitted_at.
[ ] - RiskAssessment: id, user_id, response_id, model_version_id, score, raw_score, classification, group_scores_json, factor_breakdown_json, warnings_json, sources_json, created_at.
[ ] - ConsentRecord: id, user_id, consent_type, consent_version, accepted_at, ip, user_agent.
[ ] - DatasetReference: id, slug, name, source_type, source_url, description, use_case, version, active.
[ ] - DatasetFeatureMapping: id, dataset_reference_id, project_field_key, dataset_field_name, mapping_type, evidence_strength, notes.
[ ] - RiskModelVersion: id, version, name, description, thresholds_json, weights_json, active, created_at.
[ ] - AuthEvent: id, user_id, event_type, ip, user_agent, details_json, created_at.
[ ] - AssessmentFactorDetail: id, assessment_id, factor_key, label, group_key, original_value, normalized_value, contribution, impact.
[ ] - Definir quais tabelas armazenam JSONB, quais ficam normalizadas e quais serão apenas catálogos de leitura.

## 7. Fase Inicial de Dados, Prisma e RLS

### 7.1 Frente do Francisco - Dados do Usuário, Questionário e Avaliação

[X] - Fechar o mapeamento dos campos do formulário para as entidades do banco.
[X] - Separar os dados em quatro grupos: identidade do usuário, submissão do questionário, resultado da avaliação e consentimentos.
[X] - Definir quais campos entram como colunas para filtro e quais entram como snapshot JSONB.
[X] - Definir o contrato mínimo do perfil do usuário com `user_id`, `full_name`, `state` e timestamps.
[X] - Definir o contrato da resposta do questionário com `form_version`, `payload_json` e `normalized_snapshot_json`.
[X] - Definir o contrato do resultado com `score`, `raw_score`, `classification`, `group_scores_json`, `warnings_json` e `sources_json`.
[X] - Definir o contrato de consentimento com `consent_type`, `consent_version`, `accepted_at`, `ip` e `user_agent`.
[X] - Criar os modelos Prisma para `Profile`, `QuestionnaireResponse`, `RiskAssessment` e `ConsentRecord`.
[X] - Preparar a camada de persistência via Prisma para a sua frente no backend.
[X] - Criar a migration inicial da sua frente com tabelas e policies RLS.
[X] - Definir a política de RLS dessas tabelas usando `auth.uid()` como isolador principal.
[X] - Garantir que as tabelas do usuário aceitem apenas linhas pertencentes ao dono autenticado.
[X] - Validar que nenhum usuário consiga ler, atualizar ou excluir dados de outro usuário.
[X] - Validar que a persistência da avaliação fique vinculada ao usuário autenticado e ao versionamento do modelo.
[X] - Garantir que os dados do questionário sejam gravados como payload bruto e também como snapshot normalizado para análise posterior.
[X] - Garantir que a leitura da avaliação sempre respeite o dono do registro.
[ ] - Aplicar e testar as policies RLS no Supabase quando a migration for enviada.

### 7.2 Frente do Gabriel - Catálogo de Bases, Versionamento e Auditoria

[ ] - Mapear cada campo do questionário para pelo menos uma base de referência.
[ ] - Classificar cada base por papel: clínica, imagem, genômica, epidemiológica ou contextual.
[ ] - Priorizar as bases com melhor encaixe inicial para o comparativo do projeto.
[ ] - Criar os modelos Prisma para `DatasetReference`, `DatasetFeatureMapping`, `RiskModelVersion`, `AuthEvent` e `AssessmentFactorDetail`.
[ ] - Definir a política de RLS dessas tabelas conforme o nível de acesso de cada uma.
[ ] - Garantir que as tabelas de catálogo tenham leitura aberta ou autenticada e escrita apenas do backend.
[ ] - Garantir que as tabelas de auditoria e segurança sejam acessíveis somente pelo backend/service role.
[ ] - Considerar que o role do Prisma pode ser privilegiado; manter filtro explícito por `user_id` no backend como defesa em profundidade.
[ ] - Políticas com `USING` e `WITH CHECK` em todas as tabelas expostas.
[ ] - Consolidar a modelagem de dados para permitir comparativos mais precisos entre bases.

### 7.3 Integração Entre as Duas Frentes

[ ] - Validar a separação entre dados de usuário, catálogo e auditoria.
[ ] - Definir quais tabelas serão normalizadas e quais usarão snapshot JSONB.
[ ] - Fechar o esquema Prisma completo sem conflitos entre tabelas de usuário e tabelas de catálogo.
[ ] - Validar o relacionamento entre `QuestionnaireResponse`, `RiskAssessment` e `RiskModelVersion`.
[ ] - Validar o relacionamento entre `DatasetReference` e `DatasetFeatureMapping`.
[ ] - Garantir que o backend respeite a separação entre dados do usuário e dados de referência.
[ ] - Garantir que as migrations reflitam a divisão de responsabilidade do time.
[ ] - Aplicar tabelas e policies RLS a partir do repositório, versionando tudo no projeto antes de enviar ao Supabase.
[ ] - Evitar configuração manual das tabelas e policies no painel, mantendo o fluxo oficial via migrations e SQL do projeto.

## 8. Riscos do Projeto e Mitigação

[ ] - Prazo curto: focar em MVP funcional e reduzir escopo secundário.
[ ] - Complexidade da avaliação: começar com regra de score transparente antes de um modelo mais complexo.
[ ] - Segurança da autenticação: backend, cookie seguro, CSRF e rate limit precisam ser implementados sem quebrar a jornada do usuário.
[ ] - Dados sensíveis: coletar o mínimo necessário e anonimizar quando possível.
[ ] - Confiança do usuário: reforçar textos educativos e o aviso de não diagnóstico.

## 9. MVP Obrigatório Para Conclusão

[X] - Login e cadastro funcionando.
[X] - Autenticação endurecida com backend e sessão segura.
[X] - Questionário funcionando.
[X] - Resultado com score, classificação e ao menos um gráfico.
[ ] - Uso de ao menos duas referências de base de dados.
[X] - Termos de uso e política de privacidade publicados.
[X] - Aviso médico e acessibilidade básica ativos.

## 10. Pós-MVP

[ ] - Histórico detalhado de avaliações por usuário.
[ ] - Exportação de relatório em PDF.
[ ] - Comparativos mais avançados entre perfis.
[ ] - Melhorias de UX e microinterações.

## 11. Bases de Dados Recomendadas

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

### Bases de Imagem

[ ] - BreaKHis  
  https://web.inf.ufpr.br/vri/databases/breast-cancer-histopathological-database-breakhis/
[ ] - CBIS-DDSM - TCIA  
  https://www.cancerimagingarchive.net/collection/cbis-ddsm/
[ ] - TCGA-BRCA Imaging Collection - IDC  
  https://portal.imaging.datacommons.cancer.gov/collections/tcga_brca/

### Bases Genômicas e Ômicas

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

### Bases Epidemiológicas e Contexto Populacional

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

## 12. Planejamento Detalhado da Próxima Fase de Dados

### 12.1 Leitura do questionário atual

[ ] - Perfil: nome, idade, estado e diagnóstico prévio.
[ ] - Histórico familiar e genético: câncer de mama, BRCA1/BRCA2 e câncer de ovário/endométrio.
[ ] - Sintomas e exames: sintomas observados, última mamografia e dor mamária.
[ ] - Fatores hormonais e reprodutivos: anticoncepcional, terapia hormonal, menarca, menopausa e amamentação.
[ ] - Estilo de vida: atividade física, álcool, tabagismo, dieta e IMC.

### 12.2 Bases com melhor encaixe inicial

[ ] - Breast Cancer Coimbra: melhor encaixe para idade, IMC e marcadores metabólicos.
[ ] - Mammographic Mass: melhor encaixe para idade, BI-RADS e contexto mamográfico.
[ ] - Breast Cancer (recurrence/non-recurrence): melhor encaixe para idade, menopausa e desfecho prognóstico.
[ ] - Breast Cancer Wisconsin Diagnostic/Original/Prognostic: referência clínica e de validação, sem correspondência direta ao questionário.
[ ] - GDC/TCGA-BRCA, METABRIC e GSE96058: biomarcadores, prognóstico e contexto clínico/genômico.
[ ] - BreaKHis e CBIS-DDSM: referência de imagem e lesão, útil caso a evolução inclua análise visual.
[ ] - SEER, INCA e OMS: contexto epidemiológico, incidência, faixa etária e comparativos populacionais.

### 12.3 Regras de RLS por categoria

[ ] - Tabelas do usuário: `Profile`, `QuestionnaireResponse`, `RiskAssessment` e `ConsentRecord`.
[ ] - Leitura e escrita apenas do dono da linha com `auth.uid() = user_id`.
[ ] - Tabelas de catálogo: `DatasetReference`, `DatasetFeatureMapping` e `RiskModelVersion`.
[ ] - Leitura pública ou autenticada e escrita apenas do backend/service role.
[ ] - Tabelas de auditoria: `AuthEvent` e registros de segurança.
[ ] - Acesso exclusivo do backend/service role.
[ ] - Considerar que o role do Prisma pode ser privilegiado; manter filtro explícito por `user_id` no backend como defesa em profundidade.
[ ] - Políticas com `USING` e `WITH CHECK` em todas as tabelas expostas.

### 12.4 Ordem recomendada de implementação

[ ] - Fechar o mapeamento dos campos do formulário.
[ ] - Definir o modelo Prisma.
[ ] - Criar tabelas e migrations.
[ ] - Aplicar RLS por tabela.
[ ] - Popular o catálogo de datasets.
[ ] - Validar o isolamento entre usuários.
[ ] - Validar o fluxo de gravação e leitura das avaliações.

## 13. Observação Geral

[X] - Manter o planejamento em formato de checklist para facilitar o acompanhamento.
[X] - Atualizar os itens concluídos com `[X]` conforme as entregas forem finalizadas.
[X] - Considerar a autenticação de frontend como implementada, mas manter validação end-to-end, Prisma e SMTP como etapas pendentes.
[X] - Centralizar neste documento o planejamento principal do projeto.
[ ] - Revisar o planejamento sempre que novas etapas forem adicionadas.
