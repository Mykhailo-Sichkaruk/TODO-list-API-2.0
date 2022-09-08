# TODO List Api v2.0

![](https://img.shields.io/badge/Node-16-green?style=plastic) ![](https://img.shields.io/badge/Fastify-4.3-red?style=plastic) ![](https://img.shields.io/badge/TypeScript-4.7.4-blue?style=plastic) ![](https://img.shields.io/badge/Open--API-3.0-brightgreen?style=plastic)
![ ](https://img.shields.io/badge/Prisma-4.1-blue?style=plastic)  ![ ](https://img.shields.io/badge/PostgeSQL-4.1-blueviolet?style=plastic)

This is a simple TODO list API built with Fastify. It allows basic CRUD operations on a TODO List and Tasks + subscribe User to other's List.

---

Rewriten [TODO list Api v1.0](https://github.com/Mykhailo-Sichkaruk/TODO-list-api) with `new features`:

- Fastify instead of Express  
- Encapsulated functionality with fastify-plugins
- Less code
- More readable and modular code

And keeping the `old features`:

- TODO List API
- RESTfull API
- JWT authentication
- CRUD operations
- Prisma ORM
- PostgreSQL
- Swagger documentation
- TypeScript

---

Table of Contents

- [Project structure](#project-structure)
- [Prerequirements](#prerequirements)
- [Installation](#installation)
- [Authentication](#authentication)
- [API](#api)
- [Tech details](#tech-details)

## Project structure  

```js
/*
  [src]
  ├──[plugins] - incapsulated functionality of app and optinos
  ├──[routes]
  │  ├──[auth]
  │  │  │── │handler.ts│ - handlers for login and register
  │  │  │── │index.ts│   - register routes with options
  │  │  │── │options.ts│ - put together handlers and schema
  │  │  └── │chema.ts│   - validation and serialization 
  │  ├──[list]
  │  │  │── │handler.ts│ - CRUD + /subscribe handlers
  │  │  │── │index.ts│   - register routes with options
  │  │  │── │options.ts│ - put together handlers and schema
  │  │  └── │chema.ts│   - validation and serialization 
  │  └──[task]
  │     │── │handler.ts│ - CRUD handlers
  │     │── │index.ts│   - register routes with options
  │     │── │options.ts│ - put together handlers and schema
  │     └── │chema.ts│   - validation and serialization 
  │
  │──│server.ts│ - set options, register plugins, routes
  └──│app.ts│ - import and start server
  --------------------------------------------------------
  [test]
  └──│index.ts│ - start all tests
  
*/
```

## Prerequirements

- [Node.js + NPM - 18.6.0 (latest)](https://nodejs.org/en/download/current/)
- [Postgres - 14.4.1 (latest)](https://www.postgresql.org/)

## Installation

- Download repo

```bash
git clone https://github.com/Mykhailo-Sichkaruk/TODO-list-api
```

- Change directory to downloaded repo

```bash
cd TODO-list-api
```

- Install dependencies:

```bash
npm install
```

- Setup Postgres  
  - Open `.env` file in project root
  - Set your **password** and **login** for postgress in `DATABASE_URL` to `postgres://_YOUR_POSTRGES_LOGIN_:_YOUR_POSTGRES_PASSWORD_@localhost:5432/mydb?schema=public`     (Without '_' symbols)
  - It shold be like this: `DATABASE_URL="postgres://postgres:todo@localhost:5432/mydb?schema=public"`
- Run server:  

```bash
npm start 
```

- Follow instrunction in terminal

### Authentication

- Click **Register** ![register](./docs/register.png)
- Click **Try it out** ![registe-ty-it-out](./docs/register-try-it-out.png)
- Clisk **Execute** ![register-execute](./docs/register-execute.png)
- **Copy** token fron response`s header or body ![copy-token](./docs/register-copy-token.png)
- Scroll up and click **Autorize** ![click-autorize](./docs/register-autorize.png)
- **Paste token** ![paste-token](./docs/register-paste-token.png) and clisck **Autorize**  

> Great You added token to header!

## API

Read detailed about API in Swagger/Open API [docs](http://localhost:4000/docs/)

### Autentication

- Sign up with login and password (POST /auth/register)  
- Sign in with login and password (POST /auth/login)

### List managment

- List has
  - title (string)
  - subscribers (array Users)
  - author (string)
  - tasks (array of strings)
- Create list (POST /list)
- Get list (GET /list/)
- Get all lists (GET /list)
- Update list (PUT /list)
- Delete list (DELETE /list)

### Task managment

- Task has
  - id
  - title
  - body
  - status (`ACTIVE` or `IN_PROGRES` or `DONE` or `CLOSED`)
  - listId
  - deadline
  - authorId
- Create task (POST /task)
- Get task (GET /task/)
- Get all tasks (GET /task)
- Update task (PUT /task)
- Delete task (DELETE /task)

### Scbscribe user to list

- Subscribe user to list (POST /list/subscribe)

## Tech details

- Database: `Postgres`  
- ORM: `Prisma`  
- Language: `TypeScript`
- Execution environment: `Node.js`
- Framework: `Fastify`
- Documentation: `Swagger/Open API`  
