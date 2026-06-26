import { readFileSync } from 'node:fs';
import path from 'node:path';

// Single source of truth: schema.graphql is also consumed by graphql-codegen.
export const typeDefs = readFileSync(
  path.join(process.cwd(), 'src/lib/graphql/schema.graphql'),
  'utf-8',
);
