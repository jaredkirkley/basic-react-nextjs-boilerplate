# CLAUDE.md

This file provides guidance to Claude when working with code in this repository.

## What This Repo Is

A production-ready Next.js 15 boilerplate with Apollo GraphQL, TypeScript, and Kubernetes deployment infrastructure. It is intentionally kept minimal — the goal is a clean starting point, not a feature-complete app. Every file here should be kept or adapted when forking, not deleted.

## Key Commands

```bash
nvm use                  # Node 24.18 LTS (see .nvmrc)
npm install
npm run codegen          # REQUIRED after any schema.graphql change
npm run dev              # Turbopack dev server
npm test                 # Vitest
npm run lint             # ESLint
npm run typecheck        # tsc --noEmit
npm run format:check     # Prettier (read-only)
npm run format           # Prettier (write)
npm run build            # Next.js production build (also runs codegen via prebuild)
```

Run `npm run lint`, `npm run typecheck`, and `npm test` before opening any PR.

## Architecture Decisions

### GraphQL — schema as source of truth

The schema lives in `src/lib/graphql/schema.graphql`. Both the Apollo Server runtime (`schema.ts` reads it via `readFileSync`) and the codegen tool (`codegen.ts`) consume it from there. Do not duplicate type definitions in TypeScript — let codegen generate them.

After any schema change, run `npm run codegen` to regenerate `src/lib/graphql/__generated__/`. The generated directory is committed to the repo so CI doesn't need a separate codegen step to typecheck.

When writing components that query GraphQL, import `gql` from `@/lib/graphql/__generated__` (not from `@apollo/client`). This gives fully typed `TypedDocumentNode` objects so `useQuery` return types are inferred automatically.

### Apollo Client — browser singleton, server per-request

`src/lib/apollo/client.ts` exports `getApolloClient()`. On the server it returns a fresh client per call (avoids cross-request cache sharing). In the browser it returns a module-level singleton so the in-memory cache persists across navigations. Do not wrap this in `useMemo` inside a component — it will create a new client on every render.

`ApolloWrapper.tsx` is a `'use client'` component that provides the singleton to the React tree. It lives in the root layout.

### Environment variables — validate at build time

All env vars are declared and validated in `src/env.ts` using `@t3-oss/env-nextjs` + Zod. Import `env` from there instead of reading `process.env` directly anywhere else in the codebase. Adding a new variable requires registering it in `src/env.ts` first — the build will throw if an undeclared variable is accessed.

`next.config.ts` imports `./src/env` as a side effect so validation runs at build time, not just at runtime.

### ESLint configuration

Extends `airbnb` + `airbnb-typescript` + `next/core-web-vitals` + `prettier` (in that order — prettier must be last to override formatting rules). Notable overrides:

- `src/lib/**/*.ts` and `src/app/api/**/*.ts` have `import/prefer-default-export` disabled — utility modules and route handlers naturally export multiple named exports.
- Config files (`*.config.ts`, `codegen.ts`) have `import/no-extraneous-dependencies` relaxed to allow devDependency imports.
- `airbnb/hooks` is intentionally excluded from extends — `next/core-web-vitals` already covers React hooks rules and including both causes a duplicate plugin registration error.

### Next.js App Router conventions

- `src/app/error.tsx` — the App Router error boundary. Add Sentry/Datadog integration inside the `useEffect` here.
- `src/app/loading.tsx` — the streaming loading fallback. Swap the placeholder for a real skeleton when building out pages.
- Route handlers (`/api/**/route.ts`) use explicit `GET`/`POST` wrapper functions rather than re-exporting a handler directly. This is required for Next.js 15 strict TypeScript typing.

### Helm chart

`helm/values.yaml` is a fill-in-the-blanks file — every value marked `# REQUIRED` must be set before deploying. The chart is intentionally generic; copy it into a real project and replace the placeholder values. Health probes point to `/api/health`.

The `podDisruptionBudget` is enabled by default with `minAvailable: 1`. With the default `replicaCount: 2` this ensures at least one pod is always running during node drains.

### TypeScript

`tsconfig.json` uses `"moduleResolution": "bundler"` and `"jsx": "preserve"`. Next.js resets `jsx` to `preserve` on every build — this is expected and correct. Do not change it to `react-jsx`; Vitest handles JSX transformation independently via `@vitejs/plugin-react`.

The `@/*` path alias maps to `src/*`. Use it everywhere instead of relative imports.

## What Not to Do

- Do not read `process.env` directly — use `env` from `src/env.ts`.
- Do not import `gql` from `@apollo/client` in components — use the generated version from `@/lib/graphql/__generated__`.
- Do not add `useMemo` around `getApolloClient()` in React components.
- Do not edit files under `src/lib/graphql/__generated__/` — they are overwritten by codegen.
- Do not add Prettier formatting to `helm/templates/` — Go template syntax is not valid YAML and Prettier will corrupt it (it is listed in `.prettierignore`).
- Do not change `"jsx"` in `tsconfig.json` — Next.js owns that field.
