# Invoice API

## Description

Invoice API to create, update and get invoices.
Database uses posgresql inside a docker image. Steps to run the image, migrations and app are listed below.

## Requirements
- Docker
- NodeJS

## Installation

### Running the docker image
```bash
$ docker-compose up -d database
```

### Installing server app
```bash
$ npm install
```

### Running database migrations
```bash
$ npm run migration:up
```

### Running the server

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Optional steps
To generate migrations
```bash
$ npm run migration:generate
```
To check if the image is running
```bash
$ docker-compose ps
```
To connect to the docker image
```bash
$ docker-compose exec database bash
$ psql -h localhost -d invoices_db -U jano
```

```bash
$ \d+  // shows relations
$ \q // exits db
```