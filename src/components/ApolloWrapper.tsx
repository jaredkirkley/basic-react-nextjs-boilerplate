'use client';

import { ApolloProvider } from '@apollo/client';
import { getApolloClient } from '@/lib/apollo/client';

export default function ApolloWrapper({ children }: { children: React.ReactNode }) {
  // getApolloClient() returns a singleton in the browser and a fresh instance on the server.
  return <ApolloProvider client={getApolloClient()}>{children}</ApolloProvider>;
}
