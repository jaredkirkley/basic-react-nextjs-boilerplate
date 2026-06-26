import { NextResponse } from 'next/server';

export interface HealthResponse {
  status: 'ok';
  timestamp: string;
}

/**
 * GET /api/health
 * Liveness / readiness probe endpoint for Kubernetes.
 * Returns 200 { status: "ok" } when the application is running.
 */
export function GET(): NextResponse<HealthResponse> {
  return NextResponse.json({ status: 'ok', timestamp: new Date().toISOString() });
}
