import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('GET /api/hello', () => {
  it('returns a 200 response with a greeting', async () => {
    // Dynamic import so tsx resolves the .ts module at test time
    const { GET } = await import('../app/api/hello/route.ts');
    const response = GET();
    const data = await response.json() as { message: string };

    assert.equal(response.status, 200);
    assert.equal(data.message, 'Hello, World!');
  });
});
