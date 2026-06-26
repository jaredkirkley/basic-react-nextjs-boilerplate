'use client';

import { useQuery } from '@apollo/client';
import { gql } from '@/lib/graphql/__generated__';

// Types for this query are auto-generated from schema.graphql by `npm run codegen`.
// data.hello is typed as `string` without any manual interface.
const HELLO_QUERY = gql(`
  query Hello {
    hello
  }
`);

export default function GraphQLGreeting() {
  const { data, loading, error } = useQuery(HELLO_QUERY);

  if (loading) return <p aria-live="polite">Loading…</p>;
  if (error) return <p role="alert">{`GraphQL error: ${error.message}`}</p>;

  return <p>{data?.hello}</p>;
}
