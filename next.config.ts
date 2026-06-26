import type { NextConfig } from 'next';

// Validate env at build time — import triggers zod parsing.
// eslint-disable-next-line import/no-unresolved
import './src/env';

const isDev = process.env.NODE_ENV === 'development';

/**
 * Security headers applied to every route.
 * Tighten the CSP `script-src` directive once you know your exact origins
 * (remove 'unsafe-inline' and use a nonce-based policy in production).
 */
const securityHeaders = [
  // Prevent the page from being embedded in an iframe on a different origin.
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Stop browsers from MIME-sniffing the content type.
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Control how much referrer info is sent with requests.
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Restrict browser feature access.
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // DNS prefetch for performance while keeping it explicit.
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // 'unsafe-eval' is required by Next.js hot-reload in development.
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'none'",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  // Produces a self-contained build in .next/standalone — required for Docker/Kubernetes.
  output: 'standalone',

  async headers() {
    return [
      {
        // Apply security headers to all routes.
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
