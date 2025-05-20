# scandes-frontend

This template should help get you started developing with Vue 3 in Vite.

## Docker Setup

### Prerequisites

- Docker
- Docker Compose

### Running with Docker Compose

The application can be run in two modes: development and production.

#### Development Mode

Development mode includes hot-reload and other development features:

```sh
# Build and start the development container
docker compose up frontend-dev

# Run in background
docker compose up -d frontend-dev

# View logs
docker compose logs -f frontend-dev
```

The development server will be available at `http://localhost:5173`

#### Production Mode

Production mode uses Nginx to serve the optimized build:

```sh
# Build and start the production container
docker compose up frontend-prod

# Run in background
docker compose up -d frontend-prod

# View logs
docker compose logs -f frontend-prod
```

The production server will be available at `http://localhost:80`

#### Additional Docker Commands

```sh
# Stop containers
docker compose down

# Rebuild containers (needed after dependency changes)
docker compose build

# Remove all containers and volumes
docker compose down -v

# View container status
docker compose ps
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
