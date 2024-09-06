# Gerenciamento de Tarefas - TAREAS(Backend)

Este projeto implementa um backend para gerenciamento de tarefas, desenvolvido em Node.js utilizando o framework Express.js. O backend oferece uma API RESTful para criação, edição, listagem e exclusão de tarefas, com autenticação baseada em JWT (JSON Web Token) e conectividade a um banco de dados MySQL usando Prisma como ORM.

## Índice

- [Requisitos](#requisitos)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [API Endpoints](#api-endpoints)
- [Autenticação](#autenticação)
- [Testes (Opcional)](#testes-opcional)
- [Deploy (Opcional)](#deploy-opcional)

## Requisitos

- **Node.js** (v20+)
- **MySQL**
- **Prisma**
- **JWT**

## Tecnologias Utilizadas

- **Node.js**
- **Express.js**
- **Prisma** (com MySQL)
- **JSON Web Token (JWT)**
- **TypeScript**

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/lucassf2k/back-tareas
cd back-tareas
```

2. Instalar pacotes

```bash
npm install
    or
pnpm install
    or
yarn install
```

3. Variáveis de ambiente

```env
DATABASE_URL=
APP_PORT=
JWT_SECRET_KEY=
```

4. Inicializando Banco de Dados

```bash
npx prisma migrate dev
```

5. Executando aplicação

```bash
npm run dev
    or
pnpm dev
    or
yarn dev
```

## Documentação da API

Este documento descreve a API RESTful para o sistema de gerenciamento de tarefas, implementado em Node.js utilizando Express.js. A API permite gerenciar usuários, realizar autenticação via JWT, e operações CRUD para tarefas.

### Base URL

- **URL Base:** `http://localhost:3001/api`
- **Host:** `localhost:3001`

---

## Endpoints

### Cadastrar um Usuário

- **Método:** `POST`
- **URL:** `/user/sign-up`
- **Descrição:** Cria um novo usuário no sistema.
- **Cabeçalhos:**
  - `Content-Type: application/json`
- **Corpo da Requisição:**
  ```json
  {
    "email": "example@mail.com",
    "password": "example_password"
  }
  ```
- **Respostas HTTP**
  - **201**
  - Cabeçalhos
    - Content-Type: application/json
    - Location: /user/{id}
  ```json
  {
    "id": "string"
  }
  ```
  - **409**
  ```json
  {
    "error": "email already in use"
  }
  ```
  - **500**
  ```json
  {
    "error": "Internal server error"
  }
  ```

### Autenticação de um Usuário

- **Método:** `POST`
- **URL:** `/user/sign-in`
- **Descrição:** Faz a autenticação de um usuário.
- **Cabeçalhos:**
  - `Content-Type: application/json`
- **Corpo da Requisição:**
  ```json
  {
    "email": "example@mail.com",
    "password": "example_password"
  }
  ```
- **Respostas HTTP**

  - **200**
  - Cabeçalhos
    - Content-Type: application/json

  ```json
  {
    "token": "jwt_token",
    "user": {
      "id": "uuid",
      "email": "user@example.com"
    }
  }
  ```

  - **401**

  ```json
  // Quando o e-mail não existe
  {
    "error": "user without permission"
  }

  // Quando a senha está errada
  {
  "error": "incorrect password"
  }
  ```

  - **500**

  ```json
  {
    "error": "Internal server error"
  }
  ```

### Criar uma Tarefa

- **Método:** `POST`
- **URL:** `/task`
- **Descrição:** Cria uma nova tarefa.
- **Cabeçalhos:**
  - `Content-Type: application/json`
  - `Authorization: Bearer Token`
- **Corpo da Requisição:**

  ```json
  {
    "title": "example task",
    "description": "example task description"
  }
  ```

  **_Por padrão a Tarefa começa como não concluída_**

- **Respostas HTTP**
  - **201**
  ```json
  {
    "task": {
      "id": "task-id",
      "description": "task description",
      "isCompleted": false,
      "createdAt": "2024-09-06T12:00:00.000Z"
    }
  }
  ```
  - **500**
  ```json
  {
    "error": "Internal server error"
  }
  ```

### Listar Tarefas

- **Método:** `GET`
- **URL:** `/tasks`
- **Descrição:** Lista as tarefas do usuário logado.
- **Cabeçalhos:**
  - `Content-Type: application/json`
  - `Authorization: Bearer Token`
- **Response (200)**
  ```TypeScript
  type Output = {
    id: string;
    title: string;
    description: string;
    isCompleted: boolean;
    createdAt: Date;
  }[]
  ```

### Buscar uma Tarefa

- **Método:** `GET`
- **URL:** `/task/:id`
- **Descrição:** Busca uma tarefa pelo id.
- **Cabeçalhos:**
  - `Content-Type: application/json`
  - `Authorization: Bearer Token`
- **Response (200)**

```TypeScript
type Output = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
}
```

- **Respostas HTTP**
  - **404**
  ```json
  {
    "error": "task not found"
  }
  ```

### Atualizar uma Tarefa

- **Método:** `PATCH`
- **URL:** `/task/:id`
- **Descrição:** Atualiza uma tarefa pelo id.
- **Cabeçalhos:**
  - `Content-Type: application/json`
  - `Authorization: Bearer Token`
- **Corpo da Requisição:**

  ```json
  {
    "title": "example task",
    "description": "example task description",
    "isCompleted": true
  }
  ```

  **_Todos os campos são opcionais_**

- **Respostas HTTP**
  - **404**
  ```json
  {
    "error": "task not found"
  }
  ```

### Remover uma Tarefa

- **Método:** `REMOVE`
- **URL:** `/task/:id`
- **Descrição:** Remove uma tarefa pelo id.
- **Cabeçalhos:**
  - `Content-Type: application/json`
  - `Authorization: Bearer Token`
- **Respostas HTTP**
  - **404**
  ```json
  {
    "error": "task not found"
  }
  ```

Licença MIT
