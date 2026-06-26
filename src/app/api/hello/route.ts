import { NextResponse } from 'next/server';

export interface HelloResponse {
  message: string;
}

// GET /api/hello — BFF example endpoint
// eslint-disable-next-line import/prefer-default-export
export function GET(): NextResponse<HelloResponse> {
  return NextResponse.json({ message: 'Hello, World!' });
}
