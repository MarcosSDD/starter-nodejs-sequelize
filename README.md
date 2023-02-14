# Initial Project Node.js - Sequelize ORM

This is a starter project for quickly building REST APIs in Node.js using Express and Sequelize ORM 

## Features

- SQL database: Mysql using Sequelize ORM

- Validation: request data validation using express-validator

- Logging: using winston

- Testing: unit and integration tests using Jest

- API documentation: with swagger-jsdoc, swagger-ui-express and swagger-autogen

- Environment variables: using dotenv

- CORS: Cross-Origin Resource-Sharing enabled using cors

- Linting: with ESLint and Prettier

- Instant feedback and reload with Nodemon


## TODO:

* Process management: advanced production process management using PM2
* Docker support
* Compression: gzip compression with compression
* Authentication and Authorization

## Environment

* Sequelize CLI: 6.5.2
* Sequelize version: 6.3.3
* Node.js version: 16.19.0
* Express version: 4.18.2
* Operating System: Debian Linux 11

## Getting Started

### Clone the repository

```console
git clone https://github.com/
```
### Enter into the directory

```console
cd starter-nodejs-sequelize
```

### Install the dependencies

```console
npm install
``` 

### Set the environment variables

```console
cp default.env .env
```

### Configuration

Variables for the environment

```console
DB_HOST=localhost                   # database connection host
DB_USER=root                        # database username
DB_PASS=secret@123                  # database password
DB_NAME=db_api                      # database name
DB_NAME_TEST=db_api_staging         # database name testing
DB_DIALECT=mysql                    # database dialect
DB_PORT=3306                        # database port
APP_HOST=localhost                  # application host name
APP_PORT=3000                       # application port
FRONTEND_URL=https://localhost:3001 # allowed domains by CORS (Postman host)
SECRET=secret                       # secret key for encrypt/decrypt JWT token
```

### Migration and Seeders run

```console
npm run db:create

npm run db:migrate

npm run db:seed:all
```
### Run Server Locally

```console
npm run start
```
### Run Develop Enviroment

```console
npm run dev
```
### Testing

Create and migrate data base for testing

```console
npm run db:create:test

npm run db:migrate:test
```
Run tests

```console
npm run test
```
### Lint

```console
npm run lint

npm run format
```
### API documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost:3000/docs` in your browser.