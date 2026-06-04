import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { routing } from "./src/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request) {
  const response = intlMiddleware(request);

  const { pathname } = request.nextUrl;

  const locale = routing.locales.find(
    (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`),
  );

  if (!locale) return response;

  const isLocaleRoot = pathname === `/${locale}`;
  if (!isLocaleRoot) return response;

  const token = request.cookies.get("token")?.value;

  const url = request.nextUrl.clone();

  if (token) {
    url.pathname = `/${locale}/profile`;
  } else {
    url.pathname = `/${locale}/home`;
  }

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
