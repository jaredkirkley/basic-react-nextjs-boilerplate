// Apollo Server accepts a plain SDL string for typeDefs — no gql import needed.
// eslint-disable-next-line import/prefer-default-export
export const typeDefs = `#graphql
  type Query {
    """
    Returns a greeting string. The canonical GraphQL "Hello, World!".
    """
    hello: String!
  }
`;
