# Página de Login com Recuperação de senha por email

Esta é uma API desenvolvida em Node.js usando Express e MongoDB para gerenciar usuários e suas senhas. A API inclui funcionalidades de registro, login, recuperação(validação de token por email) e redefinição de senha. O frontend foi desenvolvido em Vue.js.

## Link do Deploy

[Link do Deploy](https://login-project-pbqr.vercel.app/)

## Tecnologias Utilizadas

- Node.js
- Express
- MongoDB (Mongoose)
- Nodemailer
- JSON Web Token (JWT)
- bcryptjs
- Vue.js

## Pré-requisitos

- Node.js instalado
- MongoDB em execução
- Variáveis de ambiente configuradas (`EMAIL_USER`, `EMAIL_PASS`, `JWT_SECRET`)

## Instalação

### Backend

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu_usuario/seu_repositorio.git
   cd seu_repositorio/backend
   ```

2. Instale as dependências:

    ```bash
   npm install
    ```

3. Configure as variáveis de ambiente. Crie um arquivo .env na raiz do projeto e adicione:

    ```bash
    EMAIL_USER=seu_email@gmail.com
    EMAIL_PASS=sua_senha
    JWT_SECRET=sua_chave_secreta
    ```

4. Para rodar o backend com Docker, crie uma imagem e inicie o container:

    ```bash
    docker build -t nome_da_imagem .
    ocker run -d -p 3000:3000 --env-file .env nome_da_imagem
    ```

### Frontend

1. Clone o repositório ou entre na pasta do frontend:

    ```bash
    cd seu_repositorio/frontend
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Para iniciar o servidor do frontend, use:

    ```bash
    npm run dev
    ```

