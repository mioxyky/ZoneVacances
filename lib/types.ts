export type AppLocale = "fr" | "en" | "pl";
export type CountrySlug = "france" | "belgium";
export type CountryIsoCode = "FR" | "BE";
export type ZoneId = "A" | "B" | "C";
export type RegionTone = ZoneId | "SPECIAL";
export type CountdownMode = "untilStart" | "untilEnd";
export type CountdownStatusTone = "current" | "past" | "upcoming";
export type CountryZoneMatchType = "group" | "national" | "subdivision";

export interface LocalizedText {
  language: string;
  text: string;
}

export interface HolidayApiEntry {
  id: string;
  startDate: string;
  endDate: string;
  type: string;
  name: LocalizedText[];
  regionalScope: string;
  temporalScope: string;
  nationwide?: boolean;
  subdivisions?: Array<{
    code: string;
    shortName: string;
  }>;
  groups?: Array<{
    code: string;
    shortName: string;
  }>;
}

export interface ZoneDefinition {
  zone: ZoneId;
  code: string;
  label: string;
  color: string;
  glow: string;
  academies: string[];
  regions: string[];
}

export interface BelgiumCommunityDefinition {
  code: string;
  label: string;
  shortLabel: string;
  color: string;
  glow: string;
}

export interface FranceRegionDefinition {
  code: string;
  name: string;
  shortLabel: string;
  zone: RegionTone;
  academies: string[];
  polygon: string;
  labelX: number;
  labelY: number;
  note?: string;
}

export interface CountdownItem {
  id: string;
  name: string;
  dateLabel: string;
  startDate: string;
  endDate: string;
  targetDateTime: string;
  countdownMode: CountdownMode;
  countdownLabel: string;
  statusLabel: string;
  statusTone: CountdownStatusTone;
}

export interface CalendarVacationData {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  zoneId: string;
  zoneLabel: string;
  zoneShortLabel: string;
  color: string;
}

export interface CalendarPublicHolidayData {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  countryCode: CountryIsoCode;
  countryLabel: string;
}

export interface PublicHolidayData extends CountdownItem {
  description?: string;
  nationwide: boolean;
  regionalScope: string;
}

export interface LocaleLabelMap {
  [locale: string]: string;
}

export interface CountryDefinition {
  slug: CountrySlug;
  isoCode: CountryIsoCode;
  mapId: string;
  defaultName: string;
  timeZone: string;
}

export interface CountryZoneConfig {
  code: string;
  color: string;
  glow: string;
  label: string;
  matchType: CountryZoneMatchType;
  shortLabel: string;
}

export interface CountryZoneCountdownData {
  id: string;
  label: string;
  shortLabel: string;
  code: string;
  color: string;
  glow: string;
  matchType: CountryZoneMatchType;
  nextHoliday: CountdownItem | null;
}

export interface RemainingVacationData extends CountdownItem {
  zoneId: string;
  zoneLabel: string;
  zoneShortLabel: string;
  color: string;
}

export interface CountryPageData {
  country: CountryDefinition;
  generatedAt: string;
  nextVacations: CountryZoneCountdownData[];
  calendarVacations: CalendarVacationData[];
  calendarPublicHolidays: CalendarPublicHolidayData[];
  remainingVacations: RemainingVacationData[];
  publicHolidays: PublicHolidayData[];
  warnings: string[];
}
