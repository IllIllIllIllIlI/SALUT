import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export type ApiHandler = (
  req: NextRequest,
  params?: { [key: string]: string | string[] }
) => Promise<NextResponse>;

export const withErrorHandler = (handler: ApiHandler): ApiHandler => {
  return async (req: NextRequest, params?: { [key: string]: string | string[] }) => {
    try {
      return await handler(req, params);
    } catch (error) {
      console.error('API Error:', error);
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      );
    }
  };
};

export const withValidation = (schema: any, handler: ApiHandler): ApiHandler => {
  return async (req: NextRequest, params?: { [key: string]: string | string[] }) => {
    try {
      const body = await req.json();
      await schema.validate(body);
      return handler(req, params);
    } catch (error) {
      return NextResponse.json(
        { error: 'Validation Error', details: error.message },
        { status: 400 }
      );
    }
  };
};