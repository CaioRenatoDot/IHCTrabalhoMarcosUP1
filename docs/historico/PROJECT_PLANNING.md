# Planejamento do Projeto - RiskCare

## 1. Contexto e Objetivo

[X] - Desenvolver uma solução de conscientização e prevenção do câncer de mama.
[X] - Permitir que o usuário informe dados pessoais e de saúde para receber uma estimativa orientativa de risco.
[X] - Basear a avaliação em referências de bases de dados específicas de câncer de mama.

## 2. Escopo Final Esperado

[X] - Entregar um sistema web completo com frontend e backend.
[X] - Implementar autenticação de usuário com cadastro, login e sessão integrada ao Supabase.
[X] - Criar uma tela de questionário para coleta de dados.
[X] - Implementar um motor de avaliação de risco baseado em mais de uma base de dados.
[X] - Criar uma tela de resultados com indicadores, tabelas, comparativos e gráficos.
[X] - Publicar termos de uso e política de privacidade.
[X] - Garantir uma estrutura mínima de segurança e privacidade para dados sensíveis.
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

[X] - Selecionar pelo menos duas bases de referência de câncer de mama.
[X] - Mapear campos relevantes para fatores de risco.
[X] - Definir normalização dos dados e pesos de cada fator.
[X] - Implementar a primeira versão do cálculo de risco.
[X] - Criar a tabela de mapeamento de variáveis.
[X] - Criar um documento de fontes de dados.
[X] - Disponibilizar um serviço inicial de avaliação local.

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
[X] - Mostrar recomendações educativas e próximos passos.
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
[X] - Persistência de respostas de questionário.
[X] - Geração de avaliação por usuário.
[X] - Histórico simples de avaliações.
[X] - Estrutura para expansão futura de modelos de risco.

## 6. Estrutura Recomendada de Entidades

[X] - Profile: id, user_id, full_name, created_at, updated_at.
[X] - QuestionnaireResponse: id, user_id, form_version, payload_json, normalized_snapshot_json, submitted_at.
[X] - RiskAssessment: id, user_id, response_id, model_version_id, score, raw_score, classification, group_scores_json, factor_breakdown_json, warnings_json, sources_json, created_at.
[X] - ConsentRecord: id, user_id, consent_type, consent_version, accepted_at, ip, user_agent.
[X] - DatasetReference: id, slug, name, source_type, source_url, description, use_case, version, active.
[X] - DatasetFeatureMapping: id, dataset_reference_id, project_field_key, dataset_field_name, mapping_type, evidence_strength, notes.
[X] - RiskModelVersion: id, version, name, description, thresholds_json, weights_json, active, created_at.
[X] - AuthEvent: id, user_id, event_type, ip, user_agent, details_json, created_at.
[X] - AssessmentFactorDetail: id, assessment_id, factor_key, label, group_key, original_value, normalized_value, contribution, impact.
[X] - Definir quais tabelas armazenam JSONB, quais ficam normalizadas e quais serão apenas catálogos de leitura.

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
[X] - Aplicar e testar as policies RLS no Supabase quando a migration for enviada.

### 7.2 Frente do Gabriel - Catálogo de Bases, Versionamento e Auditoria

[X] - Mapear cada campo do questionário para pelo menos uma base de referência.
[X] - Classificar cada base por papel: clínica, imagem, genômica, epidemiológica ou contextual.
[X] - Priorizar as bases com melhor encaixe inicial para o comparativo do projeto.
[X] - Criar os modelos Prisma para `DatasetReference`, `DatasetFeatureMapping`, `RiskModelVersion`, `AuthEvent` e `AssessmentFactorDetail`.
[X] - Definir a política de RLS dessas tabelas conforme o nível de acesso de cada uma.
[X] - Garantir que as tabelas de catálogo tenham leitura aberta ou autenticada e escrita apenas do backend.
[X] - Garantir que as tabelas de auditoria e segurança sejam acessíveis somente pelo backend/service role.
[X] - Considerar que o role do Prisma pode ser privilegiado; manter filtro explícito por `user_id` no backend como defesa em profundidade.
[X] - Políticas com `USING` e `WITH CHECK` em todas as tabelas expostas.
[X] - Consolidar a modelagem de dados para permitir comparativos mais precisos entre bases.

### 7.3 Integração Entre as Duas Frentes

Nota: a estrutura Prisma/RLS das duas frentes já está implementada no repositório; os itens abaixo representam a validação final no Supabase e o alinhamento fino entre o que ficou no código e o que foi aplicado no banco.

[X] - Validar a separação entre dados de usuário, catálogo e auditoria.
[X] - Definir quais tabelas serão normalizadas e quais usarão snapshot JSONB.
[X] - Fechar o esquema Prisma completo sem conflitos entre tabelas de usuário e tabelas de catálogo.
[X] - Validar o relacionamento entre `QuestionnaireResponse`, `RiskAssessment` e `RiskModelVersion`.
[X] - Validar o relacionamento entre `DatasetReference` e `DatasetFeatureMapping`.
[X] - Garantir que o backend respeite a separação entre dados do usuário e dados de referência.
[X] - Garantir que as migrations reflitam a divisão de responsabilidade do time.
[X] - Aplicar tabelas e policies RLS a partir do repositório, versionando tudo no projeto antes de enviar ao Supabase.
[X] - Evitar configuração manual das tabelas e policies no painel, mantendo o fluxo oficial via migrations e SQL do projeto.
[ ] - Validar o isolamento final com dois usuários reais no Supabase antes da entrega.

## 8. Riscos do Projeto e Mitigação

[X] - Prazo curto: focar em MVP funcional e reduzir escopo secundário.
[X] - Complexidade da avaliação: começar com regra de score transparente antes de um modelo mais complexo.
[X] - Segurança da autenticação: backend, cookie seguro, CSRF e rate limit precisam ser implementados sem quebrar a jornada do usuário.
[ ] - Dados sensíveis: coletar o mínimo necessário e anonimizar quando possível.
[X] - Confiança do usuário: reforçar textos educativos e o aviso de não diagnóstico.

## 9. MVP Obrigatório Para Conclusão

[X] - Login e cadastro funcionando.
[X] - Autenticação endurecida com backend e sessão segura.
[X] - Questionário funcionando.
[X] - Resultado com score, classificação e ao menos um gráfico.
[X] - Uso de ao menos duas referências de base de dados.
[X] - Termos de uso e política de privacidade publicados.
[X] - Aviso médico e acessibilidade básica ativos.

## 10. Pós-MVP

[ ] - Histórico detalhado de avaliações por usuário.
[ ] - Exportação de relatório em PDF.
[ ] - Comparativos mais avançados entre perfis.
[ ] - Melhorias de UX e microinterações.

## 11. Bases de Dados Utilizadas no MVP

[X] - Breast Cancer Coimbra - UCI  
  https://archive.ics.uci.edu/ml/datasets/Breast%20Cancer%20Coimbra
[X] - Mammographic Mass - UCI  
  https://archive.ics.uci.edu/ml/datasets/mammographic%2Bmass
[X] - Breast Cancer (recurrence/non-recurrence) - UCI  
  https://archive.ics.uci.edu/ml/datasets/breast%20cancer
[X] - Breast Cancer Wisconsin (Diagnostic) - UCI  
  https://archive.ics.uci.edu/ml/datasets/breast%2Bcancer%2Bwisconsin%2B%28diagnostic%29
[X] - INCA - Dados e Números  
  https://www.gov.br/inca/pt-br/assuntos/gestor-e-profissional-de-saude/controle-do-cancer-de-mama/dados-e-numeros
[X] - Female Breast Cancer Stat Facts (SEER/NCI)  
  https://seer.cancer.gov/statfacts/html/breast.html?statfacts_page=breast.html
[X] - OMS - Ficha Técnica de Câncer de Mama  
  https://www.who.int/news-room/fact-sheets/detail/breast-cancer
[X] - Essas são as bases de comparação usadas no MVP; as demais fontes ficaram fora do planejamento principal e podem ser retomadas apenas como expansão futura.

## 12. Planejamento Detalhado da Próxima Fase de Dados

### 12.1 Leitura do questionário atual

[X] - Perfil: nome, idade, estado e diagnóstico prévio.
[X] - Histórico familiar e genético: câncer de mama, BRCA1/BRCA2 e câncer de ovário/endométrio.
[X] - Sintomas e exames: sintomas observados, última mamografia e dor mamária.
[X] - Fatores hormonais e reprodutivos: anticoncepcional, terapia hormonal, menarca, menopausa e amamentação.
[X] - Estilo de vida: atividade física, álcool, tabagismo, dieta e IMC.

### 12.2 Bases com melhor encaixe inicial

[X] - Breast Cancer Coimbra: melhor encaixe para idade, IMC e marcadores metabólicos.
[X] - Mammographic Mass: melhor encaixe para idade, BI-RADS e contexto mamográfico.
[X] - Breast Cancer (recurrence/non-recurrence): melhor encaixe para idade, menopausa e desfecho prognóstico.
[X] - Breast Cancer Wisconsin (Diagnostic): referência clínica e de validação para benigno versus maligno.
[X] - INCA, SEER e OMS: contexto epidemiológico, incidência, mortalidade, faixa etária e comparativos populacionais.

### 12.3 Regras de RLS por categoria

[X] - Tabelas do usuário: `Profile`, `QuestionnaireResponse`, `RiskAssessment` e `ConsentRecord`.
[X] - Leitura e escrita apenas do dono da linha com `auth.uid() = user_id`.
[X] - Tabelas de catálogo: `DatasetReference`, `DatasetFeatureMapping` e `RiskModelVersion`.
[X] - Leitura pública ou autenticada e escrita apenas do backend/service role.
[X] - Tabelas de auditoria: `AuthEvent` e registros de segurança.
[X] - Acesso exclusivo do backend/service role.
[X] - Considerar que o role do Prisma pode ser privilegiado; manter filtro explícito por `user_id` no backend como defesa em profundidade.
[X] - Políticas com `USING` e `WITH CHECK` em todas as tabelas expostas.

### 12.4 Ordem recomendada de implementação

[X] - Fechar o mapeamento dos campos do formulário.
[X] - Definir o modelo Prisma.
[X] - Criar tabelas e migrations.
[X] - Aplicar RLS por tabela.
[X] - Popular o catálogo de datasets.
[X] - Validar o fluxo de gravação e leitura das avaliações.

### 12.5 Critério de comparação do resultado

[X] - Comparativo populacional: usar INCA, SEER e OMS para contexto de incidência, mortalidade, faixa etária e estágio.
[X] - Comparativo clínico: usar Breast Cancer Coimbra, Mammographic Mass, Breast Cancer (recurrence/non-recurrence) e Breast Cancer Wisconsin (Diagnostic) como coortes de referência.
[X] - Comparativo metabólico: usar Breast Cancer Coimbra para IMC e marcadores metabólicos como glicose, insulina, HOMA, leptina, adiponectina, resistina e MCP-1.
[X] - Comparativo por imagem/exame: usar Mammographic Mass e Wisconsin Diagnostic para contexto de BI-RADS, densidade, margem, forma e benigno/maligno.
[X] - Comparativo prognóstico: usar Breast Cancer (recurrence/non-recurrence) para seguimento e recorrência; referências prognósticas adicionais ficam para expansão futura.
[X] - Comparativos sem base direta: histórico familiar, BRCA1/BRCA2, menarca, menopausa, anticoncepcional, reposição hormonal, amamentação, atividade física, álcool, tabagismo e dieta devem ser tratados como fatores clínicos e educacionais, não como espelho estatístico direto.
[ ] - Substituir os comparativos sintéticos da UI por agregações reais das bases priorizadas quando a camada de dados estiver finalizada.
[X] - Regra de apresentação: nunca transformar os datasets em diagnóstico; exibir apenas contexto, faixas, distribuições, referências e mensagens educativas.
[X] - Regra de UI: quando não houver base direta, mostrar “contexto de risco” ou “referência educativa”, e não “média do paciente” ou “comparação clínica” sem fonte.

### 12.6 Matriz de comparativos do resultado

[X] - Idade e faixa etária: usar INCA, SEER e OMS para contexto populacional por idade e incidência.
[X] - Estado/UF: usar INCA para contextualização regional brasileira quando o comparativo estiver disponível.
[X] - IMC e marcadores metabólicos: usar Breast Cancer Coimbra como base principal de comparação.
[X] - Mamografia, BI-RADS e severidade: usar Mammographic Mass e Breast Cancer Wisconsin (Diagnostic).
[X] - Menopausa e recorrência: usar Breast Cancer (recurrence/non-recurrence) como referência de seguimento.
[X] - Histórico familiar, BRCA e fatores hormonais: tratar como fatores clínicos e educativos, sem comparação estatística direta.
[X] - Estilo de vida: tratar como fator preventivo/educativo, com comparativo contextual e sem promessa diagnóstica.
[X] - Definir quais comparativos serão cards, gráficos e faixas de referência na tela de resultados.
[X] - Definir quais comparativos entram no modo “contexto de risco” quando não houver base direta.

### 12.7 Matriz completa do resultado por campo do formulário

| Campo | Base principal | Tipo de comparativo | Como aparece no resultado | Observação |
| --- | --- | --- | --- | --- |
| Nome completo | Nenhuma | Metadata / identificação | Não entra em comparativo | Uso apenas interno, auditável e de contexto. |
| Idade | INCA, SEER, OMS | Populacional | Card de faixa etária, barra comparativa e legenda contextual | É um dos comparativos mais fortes do MVP. |
| Estado (UF) | INCA | Regional / populacional | Card de contexto regional | Mostrar apenas como referência epidemiológica, sem inferência clínica direta. |
| Diagnóstico prévio | Breast Cancer (recurrence/non-recurrence), Wisconsin Prognostic | Prognóstico / seguimento | Banner de contexto e mudança de leitura do relatório | Se houver diagnóstico prévio, o texto do resultado deve virar acompanhamento, não triagem. |
| Histórico familiar de câncer de mama | Contexto educativo / WHO / OMS | Clínico contextual | Card de alerta educativo | Não existe espelho estatístico direto nas bases priorizadas. |
| BRCA1/BRCA2 | Contexto educativo / WHO / OMS | Clínico contextual | Card de atenção genética | Tratar como fator clínico relevante, sem benchmark populacional direto. |
| Histórico familiar de câncer de ovário/endométrio | Contexto educativo / WHO / OMS | Clínico contextual | Card de alerta educativo | Serve para reforçar atenção, não para comparação numérica. |
| Sintomas observados | Mammographic Mass, Wisconsin Diagnostic | Exame / clínico | Gráfico de barras e card de fator de risco | Usar principalmente para contexto de massa, severidade e suspeita clínica. |
| Última mamografia | Mammographic Mass, Wisconsin Diagnostic | Exame / mamografia | Card de status e barra de aderência ao rastreio | Melhor comparativo para rastreio e BI-RADS. |
| Dor mamária | Contexto clínico geral | Sintoma contextual | Aviso educativo | Não deve ser tratada como comparativo estatístico direto. |
| Anticoncepcional hormonal | WHO / OMS / contexto educativo | Fator hormonal contextual | Card de fator de risco | Deve aparecer como orientação educativa, não benchmark clínico direto. |
| Terapia de reposição hormonal | WHO / OMS / contexto educativo | Fator hormonal contextual | Card de fator de risco | Mesmo comportamento do anticoncepcional hormonal. |
| Menarca | WHO / OMS / contexto educativo | Fator hormonal contextual | Card de fator reprodutivo | Comparativo apenas educativo e contextual. |
| Menopausa | Breast Cancer (recurrence/non-recurrence), SEER | Fator hormonal / prognóstico | Card de contexto e faixa comparativa | Tem boa relação com risco e recorrência. |
| Amamentação | WHO / OMS / contexto educativo | Fator protetor | Card educativo de proteção | Mostrar como fator protetor, não como comparativo clínico rígido. |
| Atividade física | WHO / OMS / INCA | Estilo de vida / prevenção | Card de recomendação e barra de comportamento | É melhor usado como mensagem preventiva. |
| Álcool | WHO / OMS / INCA | Estilo de vida / prevenção | Card de orientação e indicador de impacto | Deve ser mostrado como fator modificável. |
| Tabagismo | WHO / OMS / INCA | Estilo de vida / prevenção | Card de orientação e indicador de impacto | Mesmo uso do álcool. |
| Dieta | WHO / OMS / INCA | Estilo de vida / prevenção | Card educativo e indicador de hábito | Comparativo contextual, não diagnóstico. |
| IMC | Breast Cancer Coimbra | Metabólico | Card comparativo e gráfico de faixa | Um dos melhores encaixes de base para o MVP. |
| Câncer prévio marcado no formulário | Breast Cancer (recurrence/non-recurrence), Wisconsin Prognostic | Prognóstico / acompanhamento | Banner de contexto e alteração do texto de resultado | Se marcado, o resultado deve priorizar seguimento. |

[X] - Garantir que a matriz acima seja refletida em cards, gráficos e textos da tela de resultados.
[X] - Garantir que os campos sem base direta permaneçam como fatores educativos e não como comparativo numérico.
[X] - Garantir que os comparativos usados no front estejam documentados como contexto e não como diagnóstico.

## 13. Observação Geral

[X] - Manter o planejamento em formato de checklist para facilitar o acompanhamento.
[X] - Atualizar os itens concluídos com `[X]` conforme as entregas forem finalizadas.
[X] - Considerar a autenticação de frontend como implementada, mas manter validação end-to-end, Prisma e SMTP como etapas pendentes.
[X] - Centralizar neste documento o planejamento principal do projeto.
[ ] - Revisar o planejamento sempre que novas etapas forem adicionadas.

## 14. Experiência de Autenticação e Continuidade da Avaliação

[X] - Exibir claramente qual conta está ativa nas telas autenticadas.
[X] - Substituir a navbar genérica por um cabeçalho/shell de conta nas telas de autenticação, formulário e resultados.
[X] - Mostrar nome, e-mail ou identificador curto do usuário logado em destaque.
[X] - Reposicionar a ação de sair para um menu/área de conta menos ambígua.
[X] - Permitir que o usuário autenticado veja a última avaliação já realizada sem precisar refazer o questionário.
[X] - Carregar a avaliação mais recente do usuário autenticado ao entrar em resultados.
[X] - Diferenciar o estado “novo usuário sem avaliação” do estado “usuário com histórico salvo”.
[X] - Criar um acesso rápido para “continuar avaliação” ou “ver último resultado” após o login.
[X] - Garantir que o fluxo de login, retorno à avaliação e retorno ao resultado seja previsível e sem quebra de contexto.
[X] - Definir a persistência mínima necessária para retomar a última avaliação por usuário.
[ ] - Validar a experiência de sessão ativa em desktop e mobile.
