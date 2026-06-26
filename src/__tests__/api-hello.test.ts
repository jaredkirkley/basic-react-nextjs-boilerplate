import { describe, expect, it } from 'vitest';
import { GET } from '../app/api/hello/route';

describe('GET /api/hello', () => {
  it('returns 200 with a greeting', async () => {
    const response = GET();
    const data = (await response.json()) as { message: string };

    expect(response.status).toBe(200);
    expect(data.message).toBe('Hello, World!');
  });
});
