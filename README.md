# TP-BD-Parte3

Sistema de Alocação de Horários - Trabalho Prático de Banco de Dados (Parte 3)

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [PostgreSQL](https://www.postgresql.org/) (versão 12 ou superior)
- npm (gerenciador de pacotes do Node.js)

## Configuração do Banco de Dados

### 1. Criar o Banco de Dados

O banco de dados deve ser criado conforme as etapas anteriores do trabalho (Parte 1 e Parte 2), com algumas modificações devido ao tamanho das tabelas.

Certifique-se de que o banco de dados **ProjetoBD** existe no PostgreSQL com todas as tabelas necessárias:

- `USUARIO_PROFESSOR`
- `DISCIPLINA`
- `CURSO`
- `PERIODO`
- `HORARIO`
- `SEMESTRE_LETIVO`
- `PREDIO`
- `SALA`
- `PODE_MINISTRAR`
- `OFERECE_EM`
- `ALOCACAO`

> **Nota:** Caso as tabelas já existam das etapas anteriores, verifique se as estruturas estão compatíveis com esta aplicação.

### 2. Popular o Banco de Dados

Após criar as tabelas, execute o arquivo `seed.sql` para inserir os dados iniciais:

```bash
psql -U postgres -d ProjetoBD -f seed.sql
```

Ou através de uma ferramenta como pgAdmin, abra e execute o conteúdo do arquivo `seed.sql`.

## Configuração do Ambiente

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha_aqui
DB_NAME=ProjetoBD
```

### 2. Instalar Dependências

Na raiz do projeto, instale as dependências do servidor:

```bash
npm install
```

Em seguida, instale as dependências do cliente:

```bash
cd client
npm install
```

## Executando a Aplicação

### Servidor (Backend)

Na raiz do projeto:

```bash
npm run dev
```

O servidor será iniciado na porta 3000 (ou outra configurada).

### Cliente (Frontend)

Em outro terminal, navegue até a pasta `client`:

```bash
cd client
npm run dev
```

O cliente Vite será iniciado e você poderá acessar a aplicação no navegador (geralmente em `http://localhost:5173`).

## Usuários de Teste

Após executar o `seed.sql`, você pode fazer login com os seguintes usuários:

| Email              | Senha  | Tipo        |
| ------------------ | ------ | ----------- |
| joao@pucminas.br   | 123456 | Professor   |
| maria@pucminas.br  | 123456 | Professor   |
| carlos@pucminas.br | 123456 | Coordenador |
| ana@pucminas.br    | 123456 | Professor   |
| pedro@pucminas.br  | 123456 | Professor   |

## Estrutura do Projeto

```
TP-BD-Parte3/
├── server.js        # Servidor Express (API)
├── db.js            # Configuração de conexão com PostgreSQL
├── seed.sql         # Dados iniciais para o banco
├── package.json     # Dependências do servidor
├── .env             # Variáveis de ambiente (criar manualmente)
└── client/          # Aplicação React (Frontend)
    ├── src/
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Alocacoes.jsx
    │   │   └── Aptidoes.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## Tecnologias Utilizadas

- **Backend:** Node.js, Express, PostgreSQL (pg)
- **Frontend:** React, React Router, Vite
- **Banco de Dados:** PostgreSQL
