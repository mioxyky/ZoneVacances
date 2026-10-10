"use client";

import { startTransition, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CLIENT_REFRESH_INTERVAL_MS } from "@/lib/constants";
import { SUPPORTED_LOCALES } from "@/lib/locale";

const localePattern = `(?:${SUPPORTED_LOCALES.join("|")})`;

const REFRESHABLE_PATHS = [new RegExp(`^/${localePattern}$`)];

export function AutoRefresh() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!REFRESHABLE_PATHS.some((pattern) => pattern.test(pathname))) {
      return;
    }

    const refresh = () => {
      startTransition(() => {
        router.refresh();
      });
    };

    const intervalId = window.setInterval(refresh, CLIENT_REFRESH_INTERVAL_MS);

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        refresh();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [pathname, router]);

  return null;
}
