<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
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

# DIN-DIN.v2 - A RESTful API for Managing Bank Accounts and Payments

[Read this page in Portuguese](README-pt.md) | [Read this page in English](README.md)
<br>
[API Documentation](https://dindin-v2.onrender.com/docs) | [Code Documentation](https://dindin-v2.onrender.com/documentation)

This RESTful API, developed with NestJS, aims to provide an efficient system for managing bank accounts and payments. It utilizes Prisma ORM for seamless database interactions, Docker for hassle-free development and deployment, and GitHub Actions for continuous integration and delivery. The project follows best practices such as Domain-Driven Design (DDD) and Test-Driven Development (TDD) to ensure a robust and scalable application.

## Table of Contents

- [Installation](#installation)
- [Running with Docker](#running-with-docker)
- [Database Migrations and Seeding](#database-migrations-and-seeding)
- [API Endpoints](#api-endpoints)
- [Contribution](#contribution)
- [License](#license)

## Installation

To run the project locally, follow these steps:

1. Clone the repository from the master branch. `git clone https://github.com/Walttinho/din-din-v2.git`
2. Navigate to the project directory. `cd din-din-v2`
3. Install dependencies using npm or yarn: `npm install` or `yarn install`.
4. Set up your environment variables as needed. `touch .env && echo -e "DATABASE_URL=\nJWT_SECRET=" >> .env`
5. Run the application: `npm run start:dev` or `yarn start:dev`.

## Running with Docker

To run the project using Docker, follow these steps:

1. Install Docker on your machine if you haven't already.
2. Build the Docker image: `docker build -t din-din-v2 .`
3. Run the Docker container: `docker run -p 3000:3000 din-din-v2`

## Database Migrations and Seeding

To apply database migrations and seeding, follow these steps:

1. Run database migrations: `npx prisma migrate dev`
2. Seed the database with initial data: `npx prisma db seed`

## API Endpoints

For detailed information on each endpoint, click on the endpoint name. Additionally, you can visit the interactive documentation at [Swagger](https://dindin-v2.onrender.com/docs) to explore and test the API endpoints directly in your browser.

- [POST /user](#1-create-a-new-user): Create a new user with name, email, and password.
- [GET /user](#2-find-a-user-by-email): Find a user by email.
- [POST /login](#3-authenticate-a-user): Authenticate a user and return an access token.
- [POST /account](#4-create-a-new-bank-account): Create a new bank account for a user.
- [GET /account](#5-find-a-bank-account-by-id): Find a bank account by ID.
- [POST /payment](#6-create-a-new-payment): Create a new payment transaction from a bank account to another.
- [GET /account/payment](#7-filter-transactions): Find transactions by date.

## Contribution

We appreciate all contributors who have helped make this project what it is today. If you are interested in contributing, please follow the instructions below:

1. Fork the project.
2. Create a branch with the name of your feature or fix (`git checkout -b feature/my-new-feature`).
3. Make your changes and commit them (`git commit -am 'Add some feature'`).
4. Push to your branch (`git push origin feature/my-new-feature`).
5. Open a Pull Request.

Please ensure your code is in line with the project's style guidelines and that all test checks are passing.

## License

Nest is [MIT licensed](LICENSE).

## API Endpoints

### 1. [Create a new user](#api-endpoints)

**Route:** `POST /user`

**Description:** Create a new user

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "SecurePassword123!"
}
```

**Response:**

```json
{
  "id": "df618536-a348-47c3-8438-fb40e7a1c51b",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "createdAt": "2024-06-30T22:00:32.828Z",
  "updatedAt": "2024-06-30T22:00:32.828Z"
}
```

### 2. [Find a user by email.](#api-endpoints)

**Route:** `GET /user?john.doe@example.com`

**Description:** Find a user by email

**Response:**

```json
{
  "id": "df618536-a348-47c3-8438-fb40e7a1c51b",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "createdAt": "2024-06-30T22:00:32.828Z",
  "updatedAt": "2024-06-30T22:00:32.976Z"
}
```

### 3. [Authenticate a user.](#api-endpoints)

**Route:** `POST /auth`

**Description:** Authenticate a user

**Request Body:**

```json
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123!"
}
```

**Response:**

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

### 4. [Create a new bank account.](#api-endpoints)

**Route:** `POST /account`

**Description:** Create a new bank account

**Request Body:**

```json
{
  "name": "Account 01",
  "type": "CURRENT",
  "balance": 1000
}
```

**Response:**

```json
{
  "id": "11cd6603-01d8-4d90-a800-3cc0a7df0851",
  "name": "Account 01",
  "type": "CURRENT",
  "balance": 1000,
  "createdAt": "2024-06-30T22:59:46.606Z"
}
```

### 5. [Find a bank account by ID.](#api-endpoints)

**Route:** `GET /account?id=11cd6603-01d8-4d90-a800-3cc0a7df0851`

**Description:** Find a bank account by ID

**Response:**

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

### 6. [Create a new payment.](#api-endpoints)

**Route:** `POST /payment`

**Description:** Create a new payment

**Request Body:**

```json
{
  "accountId": "12018f9b-4859-4e21-a0f1-45f990fa99c7",
  "amount": 214,
  "description": "some description"
}
```

**Response:**

```json
{
  "id": "48800cf4-1ce6-4324-8318-1f436dd23c41",
  "accountId": "11cd6603-01d8-4d90-a800-3cc0a7df0851",
  "amount": 214,
  "description": "some description",
  "createdAt": "2024-06-30T23:02:28.428Z"
}
```

### 7. [Filter transactions](#api-endpoints)

**Route:** `GET /account?id=11cd6603-01d8-4d90-a800-3cc0a7df0851&startDate=2024-06-30T00:00:00.000Z&endDate=2024-06-30T23:59:59.999Z`

**Description:** Filter transactions for a bank account

**Response:**

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
