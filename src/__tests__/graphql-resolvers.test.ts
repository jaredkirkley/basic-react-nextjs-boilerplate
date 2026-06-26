import { describe, expect, it } from 'vitest';
import { resolvers } from '../lib/graphql/resolvers';

describe('GraphQL resolvers', () => {
  it('Query.hello returns the expected greeting', () => {
    const result = resolvers.Query.hello();
    expect(result).toBe('Hello from GraphQL!');
  });
});
