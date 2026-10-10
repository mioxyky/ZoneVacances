import { getLocalizedCountryName } from "@/lib/i18n";
import type { AppLocale, CountryDefinition, CountrySlug } from "@/lib/types";

const FRANCE: CountryDefinition = {
  slug: "france",
  isoCode: "FR",
  mapId: "fr",
  defaultName: "France",
  timeZone: "Europe/Paris",
};

const BELGIUM: CountryDefinition = {
  slug: "belgium",
  isoCode: "BE",
  mapId: "be",
  defaultName: "Belgium",
  timeZone: "Europe/Brussels",
};

export const COUNTRIES: Record<CountrySlug, CountryDefinition> = {
  belgium: BELGIUM,
  france: FRANCE,
};

export function getCountryDefinition(country: string) {
  return COUNTRIES[country as CountrySlug];
}

export function getCountryName(country: CountrySlug, locale: AppLocale) {
  const definition = COUNTRIES[country];

  return getLocalizedCountryName(definition.isoCode, locale, definition.defaultName);
}
