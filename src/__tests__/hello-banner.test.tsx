import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HelloBanner from '../components/HelloBanner';

describe('HelloBanner', () => {
  it('renders a heading with "Hello, World!"', () => {
    render(<HelloBanner />);
    expect(screen.getByRole('heading', { name: /hello, world!/i })).toBeInTheDocument();
  });
});
