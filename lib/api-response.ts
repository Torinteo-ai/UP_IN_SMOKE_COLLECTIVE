import { NextResponse } from 'next/server';

export type ApiErrorCode =
  | 'BAD_REQUEST'
  | 'NOT_FOUND'
  | 'RATE_LIMITED'
  | 'INTERNAL_ERROR';

export const apiSuccess = <T>(data: T, status = 200) =>
  NextResponse.json({ ok: true, data }, { status });

export const apiError = (code: ApiErrorCode, message: string, status: number, details?: unknown) =>
  NextResponse.json(
    {
      ok: false,
      error: {
        code,
        message,
        details,
      },
    },
    { status }
  );
