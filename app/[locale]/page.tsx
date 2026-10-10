import { notFound } from "next/navigation";
import { HomeDashboard } from "@/components/home/home-dashboard";
import { getCountryPageData } from "@/lib/dashboard-data";
import { isLocale } from "@/lib/locale";

export default async function LocaleIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const [france, belgium] = await Promise.all([
    getCountryPageData("france", locale),
    getCountryPageData("belgium", locale),
  ]);

  return <HomeDashboard belgium={belgium} france={france} locale={locale} />;
}
