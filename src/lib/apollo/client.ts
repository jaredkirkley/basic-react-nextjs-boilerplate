import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

let browserClient: ApolloClient<object> | undefined;

function makeClient(): ApolloClient<object> {
  const uri = process.env.NEXT_PUBLIC_GRAPHQL_URL ?? '/api/graphql';
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({ uri }),
  });
}

/**
 * Returns an ApolloClient instance.
 * - Server: always creates a new instance (avoids sharing state across requests).
 * - Browser: returns a singleton so the in-memory cache persists across navigations.
 */
export function getApolloClient(): ApolloClient<object> {
  if (typeof window === 'undefined') {
    return makeClient();
  }
  if (!browserClient) {
    browserClient = makeClient();
  }
  return browserClient;
}
