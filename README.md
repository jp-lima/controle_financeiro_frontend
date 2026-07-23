# Controle Financeiro — Front-end

Front-end do sistema de controle de gastos residenciais, desenvolvido como parte de um desafio técnico. Permite cadastro de pessoas, cadastro de transações (receitas/despesas) e consulta de totais, individuais e geral.

## Tecnologias

- React 18 + TypeScript
- Vite
- Oxlint (linting)
- Fetch API nativo (sem lib de HTTP externa)

## Pré-requisitos

- Node.js 18+
- Back-end rodando (local ou via deploy já publicado)

## Como rodar localmente

```bash
git clone https://github.com/jp-lima/controle_financeiro_frontend.git
cd <pasta>
npm install
cp .env.example .env   # ajuste a URL da API se necessário
npm run dev
```

Acesse em `http://localhost:5173`.

## Variáveis de ambiente

| Variável       | Descrição                    | Exemplo                 |
|----------------|-------------------------------|--------------------------|
| `VITE_API_URL` | URL base da API do back-end  | `http://localhost:5000` |

Veja `.env.example` como referência.

## Estrutura de pastas

src/
├── assets/CSS/ # estilos globais e de componentes (Modal.css, Table.css)
├── components/ # componentes reutilizáveis (Table, modais de form/confirmação)
├── pages/ # telas da aplicação (UsuarioPage, TransacaoPage)
├── App.tsx # componente raiz, alterna entre as duas páginas
└── main.tsx # entry point


## Funcionalidades implementadas

- **Cadastro de pessoas**: listagem, criação (via modal) e deleção (com confirmação). Ao deletar, o back-end remove em cascata as transações vinculadas.
- **Cadastro de transações**: listagem e criação (via modal), vinculada a uma pessoa; tipo Receita ou Despesa. Sem edição/deleção, conforme especificação do desafio.
- **Consulta de totais**: total de receitas, despesas e saldo exibido por pessoa na tabela de usuários, além do total geral (soma de todas as pessoas) exibido ao final da listagem.

## Back-end

- Repositório: https://github.com/jp-lima/controle_financeiro_backend
- Swagger: https://controle-financeiro-backend-kyde.onrender.com/swagger/index.html

## Deploy

- Front-end: `<preencher após publicar>`
