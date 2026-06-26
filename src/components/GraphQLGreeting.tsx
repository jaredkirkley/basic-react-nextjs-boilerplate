'use client';

import { gql, useQuery } from '@apollo/client';

const HELLO_QUERY = gql`
  query Hello {
    hello
  }
`;

interface HelloData {
  hello: string;
}

export default function GraphQLGreeting() {
  const { data, loading, error } = useQuery<HelloData>(HELLO_QUERY);

  if (loading) return <p aria-live="polite">Loading…</p>;
  if (error) return <p role="alert">{`GraphQL error: ${error.message}`}</p>;

  return <p>{data?.hello}</p>;
}
