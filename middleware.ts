import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const middleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'it'],
 
  // Used when no locale matches
  defaultLocale: 'en'
});

export default function (request: NextRequest) {
  return middleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|it)/:path*']
};
