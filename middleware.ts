import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('Missing Supabase environment variables');
    return NextResponse.next();
  }

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Detect language from Accept-Language header and set cookie
  const acceptLanguage = req.headers.get('accept-language') || 'en';
  const detectedLang = acceptLanguage.split(',')[0].split('-')[0];
  
  // Only set cookie if it's a supported language
  const supportedLanguages = ['en', 'es', 'fr', 'de', 'ja', 'pt', 'hi'];
  const language = supportedLanguages.includes(detectedLang) ? detectedLang : 'en';
  
  // Set language cookie
  res.cookies.set('NEXT_LOCALE', language, {
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  });

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Protected API routes
    if (req.nextUrl.pathname.startsWith('/api/protected')) {
      if (!session) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
    }

    // Protected pages
    if (
      req.nextUrl.pathname.startsWith('/dashboard') ||
      req.nextUrl.pathname.startsWith('/settings')
    ) {
      if (!session) {
        return NextResponse.redirect(new URL('/sign-in', req.url));
      }
    }

    // Auth pages when already logged in
    if (session && (
      req.nextUrl.pathname.startsWith('/sign-in') ||
      req.nextUrl.pathname.startsWith('/sign-up')
    )) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  } catch (error) {
    console.error('Middleware error:', error);
  }

  return res;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/api/protected/:path*',
    '/dashboard/:path*',
    '/settings/:path*',
    '/sign-in',
    '/sign-up',
  ],
};