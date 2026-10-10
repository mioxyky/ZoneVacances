import { notFound, redirect } from "next/navigation";
import { isLocale } from "@/lib/locale";

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  redirect(`/${locale}`);
}
