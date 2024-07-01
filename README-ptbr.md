<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Um framework progressivo <a href="http://nodejs.org" target="_blank">Node.js</a> para construir aplicativos servidor-side eficientes e escaláveis.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# DIN-DIN.v2 - Uma API RESTful para Gerenciar Contas Bancárias e Pagamentos

[Read this page in English](README.md) | [Leia esta página em português](README-pt.md)<br>
[Documentação da API](https://dindin-v2.onrender.com/docs) | [Documentação do Código](https://dindin-v2.onrender.com/documentation)

Esta API RESTful, desenvolvida com NestJS, tem como objetivo fornecer um sistema eficiente para o gerenciamento de contas bancárias e pagamentos. Utiliza o Prisma ORM para interações com banco de dados mais suaves, Docker para facilitar desenvolvimento e implantação, e GitHub Actions para integração contínua e entrega contínua. O projeto segue práticas recomendadas, como Domain-Driven Design (DDD) e Test-Driven Development (TDD), garantindo uma aplicação robusta e escalável.

## Tabela de Conteúdo

- [Instalação](#instalação)
- [Executando com Docker](#executando-com-docker)
- [Migrações e Preenchimento do Banco de Dados](#migrações-e-preenchimento-do-banco-de-dados)
- [Endpoints da API](#endpoints-da-api)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Instalação

Para executar o projeto localmente, siga estes passos:

1. Clone o repositório na branch master. `git clone https://github.com/Walttinho/din-din-v2.git`
2. Navegue até a pasta do projeto. `cd din-din-v2`
3. Instale as dependências usando npm ou yarn: `npm install` ou `yarn install`.
4. Defina as variáveis de ambiente, conforme necessário. `touch .env && echo -e "DATABASE_URL=\nJWT_SECRET=" >> .env`
5. Execute o aplicativo: `npm run start:dev` ou `yarn start:dev`.

## Executando com Docker

Para executar o projeto usando Docker, siga estes passos:

1. Instale o Docker em sua máquina, caso ainda não tenha.
2. Construa a imagem Docker: `docker build -t din-din-v2 .`
3. Execute o contêiner Docker: `docker run -p 3000:3000 din-din-v2`

## Migrações e Preenchimento do Banco de Dados

Para aplicar migrações no banco de dados e preencher com dados iniciais, siga estes passos:

1. Aplique as migrações no banco de dados: `npx prisma migrate dev`
2. Preencha o banco de dados com dados iniciais: `npx prisma db seed`

## Endpoints da API

Para obter informações detalhadas sobre cada endpoint, clique no nome do endpoint. Além disso, você pode visitar a documentação interativa do Swagger em [Swagger](https://dindin-v2.onrender.com/docs) para explorar e testar os endpoints diretamente no navegador.

- [POST /user](#1-criar-um-novo-usuário): Cria um novo usuário com nome, email e senha.
- [GET /user](#2-encontrar-um-usuário-por-email): Encontra um usuário por email.
- [POST /login](#3-autenticar-um-usuário): Autentica um usuário e retorna um token de acesso.
- [POST /account](#4-criar-uma-nova-conta-bancária): Cria uma nova conta bancária para um usuário.
- [GET /account](#5-encontrar-uma-conta-bancária-por-id): Encontra uma conta bancária por ID.
- [POST /payment](#6-criar-um-novo-pagamento): Cria uma nova transação de pagamento de uma conta bancária para outra.
- [GET /account/payment](#7-filtrar-transações): Encontra transações por data.

## Contribuição

Agradecemos todos os contribuidores que contribuíram para que o projeto se tornasse o que é hoje. Se você estiver interessado em contribuir, siga as instruções abaixo:

1. Faça o fork do projeto.
2. Crie um branch com o nome do seu recurso ou correção (`git checkout -b feature/minha-nova-funcionalidade`).
3. Faça suas alterações e faça o commit (`git commit -am 'Adicionar alguma funcionalidade'`).
4. Empurre o branch (`git push origin feature/minha-nova-funcionalidade`).
5. Abra um Pull Request.

Certifique-se de que seu código esteja em linha com as diretrizes de estilo do projeto e que todos os testes estejam passando.

## Licença

Nest é [MIT licenciado](LICENSE).

## Endpoints da API

### 1. [Criar um novo usuário](#endpoints-da-api)

**Rota:** `POST /user`

**Descrição:** Cria um novo usuário

**Corpo da Solicitação:**

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "SecurePassword123!"
}
```

**Resposta:**

```json
{
  "id": "df618536-a348-47c3-8438-fb40e7a1c51b",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "createdAt": "2024-06-30T22:00:32.828Z",
  "updatedAt": "2024-06-30T22:00:32.828Z"
}
```

### 2. [Encontrar um usuário por email.](#endpoints-da-api)

**Rota:** `GET /user?john.doe@example.com`

**Descrição:** Encontra um usuário por email

**Resposta:**

```json
{
  "id": "df618536-a348-47c3-8438-fb40e7a1c51b",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "createdAt": "2024-06-30T22:00:32.828Z",
  "updatedAt": "2024-06-30T22:00:32.976Z"
}
```

### 3. [Autenticar um usuário.](#endpoints-da-api)

**Rota:** `POST /auth`

**Descrição:** Autentica um usuário

**Corpo da Solicitação:**

```json
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123!"
}
```

**Resposta:**

```json
{
  "user": {
    "id": "df618536-a348-47c3-8438-fb40e7a1c51b",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "createdAt": "2024-06-30T22:00:32.828Z",
    "updatedAt": "2024-06-30T22:00:32.976Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZjYxODUzNi1hMzQ4LTQ3YzMtODQzOC1mYjQwZTdhMWM1MWIiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNzE5Nzg4MTU2LCJleHAiOjE3MTk3OTE3NTZ9.lLtLNTb7x3IiK6fIgLWJtE1zccYklbUrApv8U0mxnGw"
}
```

### 4. [Criar uma nova conta bancária.](#endpoints-da-api)

**Rota:** `POST /account`

**Descrição:** Cria uma nova conta bancária

**Corpo da Solicitação:**

```json
{
  "name": "Account 01",
  "type": "CURRENT",
  "balance": 1000
}
```

**Resposta:**

```json
{
  "id": "11cd6603-01d8-4d90-a800-3cc0a7df0851",
  "name": "Account 01",
  "type": "CURRENT",
  "balance": 1000,
  "createdAt": "2024-06-30T22:59:46.606Z"
}
```

### 5. [Encontrar uma conta bancária por ID.](#endpoints-da-api)

**Rota:** `GET /account?id=11cd6603-01d8-4d90-a800-3cc0a7df0851`

**Descrição:** Encontra uma conta bancária por ID

**Resposta:**

```json
{
  "id": "11cd6603-01d8-4d90-a800-3cc0a7df0851",
  "name": "Account 01",
  "type": "CURRENT",
  "balance": 1000,
  "createdAt": "2024-06-30T22:59:46.606Z",
  "payments": []
}
```

### 6. [Criar um novo pagamento.](#endpoints-da-api)

**Rota:** `POST /payment`

**Descrição:** Cria um novo pagamento

**Corpo da Solicitação:**

```json
{
  "accountId": "12018f9b-4859-4e21-a0f1-45f990fa99c7",
  "amount": 214,
  "description": "some description"
}
```

**Resposta:**

```json
{
  "id": "48800cf4-1ce6-4324-8318-1f436dd23c41",
  "accountId": "11cd6603-01d8-4d90-a800-3cc0a7df0851",
  "amount": 214,
  "description": "some description",
  "createdAt": "2024-06-30T23:02:28.428Z"
}
```

### 7. [Filtrar transações](#endpoints-da-api)

**Rota:** `GET /account?id=11cd6603-01d8-4d90-a800-3cc0a7df0851&startDate=2024-06-30T00:00:00.000Z&endDate=2024-06-30T23:59:59.999Z`

**Descrição:** Filtra transações de uma conta bancária

**Resposta:**

```json
[
  {
    "id": "11cd6603-01d8-4d90-a800-3cc0a7df0851",
    "name": "Account 01",
    "type": "CURRENT",
    "balance": 474,
    "createdAt": "2024-06-30T22:59:46.606Z",
    "payments": [
      {
        "id": "48800cf4-1ce6-4324-8318-1f436dd23c41",
        "accountId": "11cd6603-01d8-4d90-a800-3cc0a7df0851",
        "amount": 214,
        "description": "some description",
        "createdAt": "2024-06-30T23:02:28.428Z"
      },
      {
        "id": "ac86414f-f3a9-44ab-8e1e-518430f391af",
        "accountId": "11cd6603-01d8-4d90-a800-3cc0a7df0851",
        "amount": 312,
        "description": "some description",
        "createdAt": "2024-06-30T23:09:47.149Z"
      }
    ]
  }
]
```
