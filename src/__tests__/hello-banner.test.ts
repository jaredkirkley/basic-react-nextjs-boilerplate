import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('HelloBanner', () => {
  it('exports the correct greeting text', async () => {
    const { HELLO_TEXT } = await import('../components/HelloBanner.tsx');
    assert.equal(HELLO_TEXT, 'Hello, World!');
  });

  it('renders Hello, World! in its output', async () => {
    const { createElement } = await import('react');
    const { renderToStaticMarkup } = await import('react-dom/server');
    const { default: HelloBanner } = await import('../components/HelloBanner.tsx');

    const html = renderToStaticMarkup(createElement(HelloBanner));
    assert.ok(html.includes('Hello, World!'), `Expected "Hello, World!" in: ${html}`);
  });
});
