import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import env from '@/env';

let browserClient: ApolloClient<object> | undefined;

function makeClient(): ApolloClient<object> {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: env.NEXT_PUBLIC_GRAPHQL_URL ?? '/api/graphql',
    }),
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
