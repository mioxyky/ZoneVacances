import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  LOCALE_COOKIE_NAME,
  SUPPORTED_LOCALES,
  resolvePreferredLocale,
} from "@/lib/locale";

const LEGACY_ROUTE_MAP: Record<string, string> = {
  "/belgique": "/",
  "/belgium": "/",
  "/countries/belgium": "/",
  "/countries/france": "/",
  "/france": "/",
  "/recherche": "/",
  "/search": "/",
};

const LOCALIZED_LEGACY_ROUTE_PATTERN = new RegExp(
  `^\\/(${SUPPORTED_LOCALES.join("|")})\\/(?:(?:countries\\/)?(?:france|belgium)|search|recherche)$`,
);
const LOCALIZED_HOME_ROUTE_PATTERN = new RegExp(
  `^\\/(${SUPPORTED_LOCALES.join("|")})\\/home\\/?$`,
  "i",
);

function shouldBypass(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  );
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (shouldBypass(pathname)) {
    return NextResponse.next();
  }

  const preferredLocale = resolvePreferredLocale(
    request.cookies.get(LOCALE_COOKIE_NAME)?.value,
    request.headers.get("accept-language"),
  );

  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(`/${preferredLocale}${search}`, request.url),
    );
  }

  const matchedLegacyPath = LEGACY_ROUTE_MAP[pathname];

  if (matchedLegacyPath) {
    return NextResponse.redirect(
      new URL(`/${preferredLocale}${search}`, request.url),
    );
  }

  const localizedLegacyRouteMatch = pathname.match(LOCALIZED_LEGACY_ROUTE_PATTERN);

  if (localizedLegacyRouteMatch) {
    const [, locale] = localizedLegacyRouteMatch;
    return NextResponse.redirect(new URL(`/${locale}${search}`, request.url));
  }

  const localizedHomeRouteMatch = pathname.match(LOCALIZED_HOME_ROUTE_PATTERN);

  if (localizedHomeRouteMatch) {
    const [, locale] = localizedHomeRouteMatch;
    return NextResponse.redirect(new URL(`/${locale}${search}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
