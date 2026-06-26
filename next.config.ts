import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Produces a self-contained build in .next/standalone — required for Docker/Kubernetes.
  // See: https://nextjs.org/docs/app/api-reference/config/next-config-js/output
  output: 'standalone',
};

export default nextConfig;
