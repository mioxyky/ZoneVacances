import type { Metadata } from "next";
import { cookies } from "next/headers";
import { env } from "@/lib/env";
import "./globals.css";

export const metadata: Metadata = {
  title: env.siteName,
  description:
    "France and Belgium school holiday dashboard with localized routes, detailed country maps and real-time countdowns.",
  applicationName: env.siteName,
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeCookie = (await cookies()).get("zonevacances-theme")?.value;
  const theme = themeCookie === "light" || themeCookie === "dark" ? themeCookie : undefined;

  return (
    <html data-theme={theme} lang="fr" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
