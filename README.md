# basic-react-nextjs-boilerplate

A production-ready Next.js 15 boilerplate with TypeScript, Apollo GraphQL, and Kubernetes deployment infrastructure.

## Stack

| Concern          | Choice                                      |
| ---------------- | ------------------------------------------- |
| Framework        | Next.js 15 (App Router)                     |
| Language         | TypeScript (strict)                         |
| Runtime          | Node.js 24.18 LTS                           |
| GraphQL server   | Apollo Server 4 via `@as-integrations/next` |
| GraphQL client   | Apollo Client 3                             |
| GraphQL types    | `@graphql-codegen/client-preset`            |
| Linting          | ESLint 8 (Airbnb + Next.js + Prettier)      |
| Formatting       | Prettier                                    |
| Testing          | Vitest + React Testing Library              |
| Coverage         | V8 (built into Vitest)                      |
| Env validation   | `@t3-oss/env-nextjs` + Zod                  |
| Containerisation | Docker (multi-stage, `node:24-alpine`)      |
| Deployment       | Helm 3                                      |
| CI               | GitHub Actions                              |

## Prerequisites

- [Node.js 24.18](https://nodejs.org) — use `nvm use` to switch automatically via `.nvmrc`
- [npm](https://npmjs.com) (bundled with Node)

## Quick start

```bash
nvm use                   # switch to Node 24.18
npm install               # install dependencies
npm run codegen           # generate GraphQL types from schema
cp .env.example .env.local  # create local env file (edit as needed)
npm run dev               # start dev server at http://localhost:3000 (Turbopack)
```

## Scripts

| Script                  | Description                                    |
| ----------------------- | ---------------------------------------------- |
| `npm run dev`           | Start dev server with Turbopack                |
| `npm run build`         | Production build                               |
| `npm start`             | Start production server                        |
| `npm test`              | Run tests (Vitest)                             |
| `npm run test:watch`    | Run tests in watch mode                        |
| `npm run test:coverage` | Run tests with V8 coverage report              |
| `npm run lint`          | ESLint                                         |
| `npm run format`        | Prettier (write)                               |
| `npm run format:check`  | Prettier (check only — used in CI)             |
| `npm run typecheck`     | TypeScript type check without emit             |
| `npm run codegen`       | Regenerate GraphQL types from `schema.graphql` |

## Environment variables

All variables are validated at build time via `src/env.ts`. Copy `.env.example` to `.env.local` and fill in values as needed.

| Variable                  | Required | Description                                                                                                                               |
| ------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_GRAPHQL_URL` | No       | Absolute URL for the GraphQL endpoint. Defaults to `/api/graphql` (relative, browser-only). Set this for SSR or cross-origin deployments. |

## API endpoints

| Endpoint       | Method    | Description                                                        |
| -------------- | --------- | ------------------------------------------------------------------ |
| `/api/hello`   | GET       | REST hello-world example                                           |
| `/api/graphql` | GET, POST | Apollo GraphQL endpoint (includes Sandbox in dev)                  |
| `/api/health`  | GET       | Liveness / readiness probe — returns `{ status: "ok", timestamp }` |

## GraphQL workflow

The schema is defined in `src/lib/graphql/schema.graphql`. After any schema change:

```bash
npm run codegen
```

This regenerates `src/lib/graphql/__generated__/`, providing fully typed `gql` tags and `TypedDocumentNode` objects. Import `gql` from `@/lib/graphql/__generated__` — not from `@apollo/client` — to get automatic type inference on `useQuery` / `useMutation`.

## Project structure

```
src/
├── app/
│   ├── api/
│   │   ├── graphql/route.ts   # Apollo Server route handler
│   │   ├── health/route.ts    # Kubernetes health probe
│   │   └── hello/route.ts     # REST example endpoint
│   ├── error.tsx              # App Router error boundary
│   ├── globals.css
│   ├── layout.tsx             # Root layout (wraps with ApolloWrapper)
│   ├── loading.tsx            # App Router loading fallback
│   ├── page.module.css
│   └── page.tsx
├── components/
│   ├── ApolloWrapper.tsx      # 'use client' Apollo Provider
│   ├── GraphQLGreeting.tsx    # Example useQuery component
│   └── HelloBanner.tsx
├── lib/
│   ├── apollo/client.ts       # Apollo Client factory (browser singleton)
│   └── graphql/
│       ├── __generated__/     # Auto-generated — do not edit directly
│       ├── resolvers.ts
│       ├── schema.graphql     # Source of truth for the GraphQL schema
│       └── schema.ts          # Loads schema.graphql for Apollo Server
├── __tests__/
│   ├── setup.ts               # jest-dom matchers
│   ├── api-hello.test.ts
│   ├── graphql-resolvers.test.ts
│   └── hello-banner.test.tsx
└── env.ts                     # Validated env vars (import this, not process.env)
```

## Docker

```bash
docker build -t basic-react-nextjs-boilerplate .
docker run -p 3000:3000 basic-react-nextjs-boilerplate
```

The image uses a multi-stage build (`deps → builder → runner`) on `node:24-alpine` and runs as a non-root user. Requires `output: 'standalone'` in `next.config.ts` (already set).

## Kubernetes / Helm

Fill in the required values in `helm/values.yaml` (marked `# REQUIRED`) and deploy:

```bash
helm install my-release ./helm \
  --set image.repository=my-registry/basic-react-nextjs-boilerplate \
  --set image.tag=latest \
  --set env.NEXT_PUBLIC_GRAPHQL_URL=https://myapp.example.com/api/graphql
```

The chart includes Deployment, Service, Ingress, HPA, HorizontalPodAutoscaler, PodDisruptionBudget, ConfigMap, and ServiceAccount. Health probes point to `/api/health`.

## CI

GitHub Actions runs on every push to `main` and on all pull requests:

1. `npm audit --audit-level=high --omit=dev` — production dependency vulnerability check
2. `prettier --check` — formatting
3. `eslint` — linting
4. `tsc --noEmit` — type checking
5. `npm run codegen` — ensure generated types are up to date
6. `vitest run` — tests
7. `next build` — production build
8. `helm lint` — Helm chart validation (separate job)
