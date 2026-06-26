import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * Validated, type-safe environment variables.
 * Import `env` from here instead of reading `process.env` directly.
 * Missing or malformed values throw at build time — not at runtime.
 *
 * Add new variables here as the project grows.
 */
const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  },
  client: {
    // Optional: when unset, the Apollo client falls back to the relative /api/graphql path,
    // which works in the browser. Set this for SSR or cross-origin deployments.
    NEXT_PUBLIC_GRAPHQL_URL: z.string().url().optional(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_GRAPHQL_URL: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  },
});

export default env;
