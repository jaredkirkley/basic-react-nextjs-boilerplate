import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export function makeApolloClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      // Use an absolute URL for SSR; relative path works in the browser.
      uri: process.env.NEXT_PUBLIC_GRAPHQL_URL ?? '/api/graphql',
    }),
  });
}
