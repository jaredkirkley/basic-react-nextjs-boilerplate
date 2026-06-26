import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('GraphQL resolvers', () => {
  it('Query.hello returns the expected greeting', async () => {
    const { resolvers } = await import('../lib/graphql/resolvers.ts');
    const result = resolvers.Query.hello();
    assert.equal(result, 'Hello from GraphQL!');
  });
});
