# Nuven API Frontend

Este projeto utiliza [Vue 3](https://vuejs.org/) com [Vite](https://vitejs.dev/) para o desenvolvimento do frontend.

Ingryd Duarte,
**Github:** @ingrydf12

## Como rodar o frontend da aplicação?

1. Clone este repositório:
    ```bash
    git clone https://github.com/ingrydf12/nuven-api.git
    ```
2. Acesse a pasta do frontend:
    ```bash
    cd nuven-api/client
    ```
3. Instale as dependências:
    ```bash
    npm install
    ```
4. Rode sua aplicação utilizando ```npm build```
5. Acesse `http://localhost:5173` no seu navegador.

## Scripts disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Gera a versão de produção.
- `npm run preview`: Visualiza a versão de produção localmente.

## Requisitos

- [Node.js](https://nodejs.org/) >= 16.x
- [npm](https://www.npmjs.com/) >= 8.x

## Estrutura do projeto

```
client/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── service/
│   └── main.js
├── package.json
└── vite.config.js
```