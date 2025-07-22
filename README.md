# Desafio técnico: NUVEN

1. [Objetivo](#objetivo-central)
2. [Tecnologias](#tecnologias-usadas)
3. [Documentação da API](#documentação-da-api)
4. [Instruções de instalação](#instruções-de-instalação)

## Objetivo central

Desenvolver uma API RESTful que simule parte do backend de uma plataforma
centralizada, focando em:
- Ingestão e gerenciamento de documentos
- Autenticação de usuários
- Registro de buscas simuladas via IA
- Persistência em banco de dados relacional

### Tecnologias usadas
- Node.js com Express
- PostgreSQL com Prisma ORM
- Autenticação via JWT
- Upload de arquivos com Multer ou similiar
- Docker (Dockerfile + docker-compose.yml)
- Documentação com Swagger UI


## Documentação da API

Você pode conferir a documentação Swagger por [aqui](https://app.swaggerhub.com/apis/myself-0ac/Nuven-API-Ingryd/1.0.0).

## Instruções de instalação

1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd nuven-api
```

2. Instale as dependências da API no server

```bash
cd .\server\ 
npm install
```

3. Instale as dependências do cliente (front)

```bash
cd .\client\
npm install
```

### 4. Configure as variáveis de ambiente (backend)

Crie um arquivo `.env` na pasta de server alterando as informações faltantes no `.env.example`

### 5. Configure o banco de dados

```bash
# Gerar o cliente Prisma
npx prisma generate

# Executar migrações (se existirem)
npx prisma migrate dev

# Ou criar o banco de dados baseado no schema
npx prisma db push

# (Opcional) Visualizar o banco de dados
npx prisma studio
```

### Modo de desenvolvimento

Após instalar as dependências do projeto, você pode rodar como desenvolvedor. 

#### Inicia o servidor em modo de desenvolvimento com nodemon
npm run dev

#### Ou use o comando start (que também gera o cliente Prisma)
npm start

A API estará disponível em `http://localhost:3000`

### Frontend

```bash
# Em outro terminal, navegue para a pasta client
cd client

npm start
# ou
npm run dev
```

## 📁 Estrutura do Projeto

```
nuven-api/
├── client/                 # Cliente (Frontend)
│   ├── src/
│   ├── package.json
│   └── ...
├── src/                    # Server (backend / API)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── pris