# RiskCare — IHCTrabalhoMarcosUP1

Plataforma web de conscientização e triagem educativa de risco de câncer de mama, desenvolvida na disciplina de IHC (React + Vite + API Node.js).

## Sobre o projeto

O **RiskCare** oferece uma página inicial informativa, fluxo de cadastro/login e uma API para persistir respostas de questionário e resultados de avaliação. A estimativa de risco é **informativa** e não substitui diagnóstico médico.

## Equipe e responsabilidades

| Integrante | Entrega |
|------------|---------|
| Caio Gabriel | Cards informativos |
| Renato | Navbar e seção "Saiba Mais" |
| Thalita | Indicadores, botões interativos e API/backend |
| Francisco | Avaliação gratuita (fluxo na interface) |

## Tecnologias

| Camada | Stack |
|--------|--------|
| Frontend | React 18, Vite 5, JavaScript (JSX), CSS |
| Animação / UX | GSAP, Lenis (scroll suave) |
| Acessibilidade | Controles de zoom, VLibras, navegação por teclado |
| Backend | Node.js, Express 5 |
| Banco | SQLite (`node:sqlite` — requer **Node.js 22.5+**) |
| Auth | JWT + bcrypt |

## Pré-requisitos

- [Node.js](https://nodejs.org/) 22.5 ou superior
- npm

## Como executar

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Ajuste `JWT_SECRET` antes de publicar em produção. O banco SQLite é criado automaticamente em `server/data/riskcare.db` na primeira execução da API.

### 3. Subir API e frontend (dois terminais)

**Terminal 1 — API (porta 3001):**

```bash
npm run dev:server
```

**Terminal 2 — site (porta 5173):**

```bash
npm run dev
```

O Vite encaminha `/api` para `http://localhost:3001` em desenvolvimento.

### 4. Acessar no navegador

| URL | Conteúdo |
|-----|----------|
| http://localhost:5173 | Página inicial |
| http://localhost:5173/login | Login |
| http://localhost:5173/cadastro | Cadastro |
| http://localhost:5173/sobre-projeto | Sobre o projeto |
| http://localhost:3001/api/health | Status da API |

### Outros comandos

```bash
npm run lint      # ESLint (src + server)
npm run build     # Build de produção do frontend
npm run preview   # Preview do build
```

## Estrutura do projeto

```text
.
├── server/                 # API REST
│   ├── index.js            # Entrada do servidor
│   ├── app.js              # Express + rotas
│   ├── db.js               # SQLite e schema
│   ├── routes/             # auth, questionnaire, evaluations
│   ├── services/           # Motor de cálculo de risco
│   ├── middleware/         # Auth JWT e erros
│   └── validators/         # Validação (Zod)
├── src/
│   ├── App.jsx             # Rotas da SPA
│   ├── pages/              # Home, Login, Cadastro, Cover…
│   ├── components/         # UI, login, acessibilidade
│   ├── services/           # Cliente HTTP (api.js)
│   ├── styles/             # CSS por seção
│   └── utils/              # Navegação SPA
├── docs/                   # Documentação auxiliar
├── .env.example
├── vite.config.js
└── package.json
```

## Frontend — páginas e componentes

**Páginas:** `HomePage`, `LoginPage`, `SignupPage`, `SignupSuccessPage`, `CoverPage`

**Destaques na home:** `Navbar`, `ConscientizacaoPrevencaoSection`, `HowItWorksSection`, `Indicadores`, `FeatureCard`, `ObservationBanner`, `AvaliacaoGratuitaButton`, `SaibaMaisButton`

**Acessibilidade:** `AccessibilityControls`, `TextZoomControls`, `VLibrasWidget`, `SkipLink`

## API REST

Base: `http://localhost:3001/api` (ou `/api` via proxy do Vite)

Rotas autenticadas exigem:

```http
Authorization: Bearer <token>
```

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/health` | Status da API |
| POST | `/auth/register` | Cadastro — body: `{ name, email, password }` |
| POST | `/auth/login` | Login — body: `{ email, password }` |
| GET | `/auth/profile` | Perfil do usuário logado |
| PUT | `/auth/profile` | Atualizar `name` e/ou `email` |
| POST | `/questionnaire/responses` | Salvar respostas do questionário |
| GET | `/questionnaire/responses` | Listar respostas do usuário |
| GET | `/questionnaire/responses/:id` | Uma resposta por ID |
| POST | `/evaluations` | Gerar e salvar avaliação |
| GET | `/evaluations` | Listar avaliações do usuário |
| GET | `/evaluations/:id` | Uma avaliação por ID |

### Exemplo — salvar questionário

```json
POST /api/questionnaire/responses
{
  "answers": [
    { "questionId": "idade", "value": "50_59" },
    { "questionId": "historico_familiar", "value": true },
    { "questionId": "nodulo_mama", "value": false }
  ]
}
```

### Exemplo — gerar avaliação

```json
POST /api/evaluations
{ "questionnaireResponseId": 1 }
```

Ou envie `answers` diretamente (a API salva o questionário e gera a avaliação em uma chamada).

### Fatores de risco (motor de avaliação)

- `idade`: `under_40`, `40_49`, `50_59`, `60_plus`
- Booleanos: `historico_familiar`, `nodulo_mama`, `alteracao_pele`, `secrecao_mamilar`, entre outros — ver `server/services/evaluationEngine.js`

Níveis retornados: `baixo`, `moderado`, `alto` (pontuação 0–100).

## Banco de dados

- **Desenvolvimento:** SQLite em arquivo (`DB_PATH` no `.env`)
- **Produção:** para deploy público, recomenda-se migrar para PostgreSQL ou similar; a API pode ser adaptada trocando a camada em `server/db.js`

O arquivo `server/data/` está no `.gitignore` (dados locais não vão para o repositório).

## Observações

- Senha mínima na API: **8 caracteres**
- O token JWT é armazenado no `localStorage` (`riskcare_token`) após login/cadastro
- Componentes `Hero.jsx` e `Section.jsx` permanecem como estrutura reutilizável; a home é montada em `HomePage.jsx`
