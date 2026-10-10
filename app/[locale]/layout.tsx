import { notFound } from "next/navigation";
import { AutoRefresh } from "@/components/navigation/auto-refresh";
import { CalendarYearProvider } from "@/components/calendar/calendar-year-context";
import { LocaleHtmlUpdater } from "@/components/navigation/locale-html-updater";
import { SiteFooter } from "@/components/navigation/site-footer";
import { SiteHeader } from "@/components/navigation/site-header";
import { getDictionary } from "@/lib/i18n";
import { isLocale } from "@/lib/locale";
import type { AppLocale } from "@/lib/types";

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  return (
    <CalendarYearProvider currentYear={new Date().getFullYear()}>
      <LocaleHtmlUpdater locale={locale as AppLocale} />
      <AutoRefresh />
      <SiteHeader labels={dictionary.nav} locale={locale as AppLocale} />
      {children}
      <SiteFooter
        labels={dictionary.footer}
        locale={locale as AppLocale}
      />
    </CalendarYearProvider>
  );
}
