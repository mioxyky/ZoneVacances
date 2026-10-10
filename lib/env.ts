function readOptionalEnvValue(key: string, fallback: string) {
  const value = process.env[key]?.trim();
  return value && value.length > 0 ? value : fallback;
}

function readRequiredEnvValue(key: string) {
  const value = process.env[key]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

export const env = {
  get belgiumAddressApiBaseUrl() {
    return readRequiredEnvValue("BELGIUM_ADDRESS_API_BASE_URL");
  },
  get belgiumAddressApiSourceUrl() {
    return readOptionalEnvValue("BELGIUM_ADDRESS_API_SOURCE_URL", "");
  },
  get francePublicHolidaysBaseUrl() {
    return readOptionalEnvValue(
      "FRANCE_PUBLIC_HOLIDAYS_BASE_URL",
      "https://calendrier.api.gouv.fr/jours-feries",
    );
  },
  get franceSchoolCalendarIcsBaseUrl() {
    return readOptionalEnvValue(
      "FRANCE_SCHOOL_CALENDAR_ICS_BASE_URL",
      "https://fr.ftp.opendatasoft.com/openscol/fr-en-calendrier-scolaire",
    );
  },
  get franceSchoolCalendarSourceUrl() {
    return readOptionalEnvValue(
      "FRANCE_SCHOOL_CALENDAR_SOURCE_URL",
      "https://data.education.gouv.fr/explore/dataset/fr-en-calendrier-scolaire/",
    );
  },
  get francePublicHolidaysSourceUrl() {
    return readOptionalEnvValue(
      "FRANCE_PUBLIC_HOLIDAYS_SOURCE_URL",
      "https://calendrier.api.gouv.fr/",
    );
  },
  get geoApiBaseUrl() {
    return readOptionalEnvValue("GEO_API_BASE_URL", "https://geo.api.gouv.fr");
  },
  get geoApiSourceUrl() {
    return readOptionalEnvValue("GEO_API_SOURCE_URL", "https://geo.api.gouv.fr/");
  },
  get openHolidaysBaseUrl() {
    return readOptionalEnvValue("OPEN_HOLIDAYS_BASE_URL", "https://openholidaysapi.org");
  },
  get openHolidaysSourceUrl() {
    return readOptionalEnvValue("OPEN_HOLIDAYS_SOURCE_URL", "https://www.openholidaysapi.org/en/");
  },
  get siteName() {
    return readOptionalEnvValue("NEXT_PUBLIC_SITE_NAME", "ZoneVacances");
  },
} as const;
