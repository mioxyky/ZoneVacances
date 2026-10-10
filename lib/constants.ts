import type {
  BelgiumCommunityDefinition,
  FranceRegionDefinition,
  ZoneDefinition,
} from "@/lib/types";

export const SCHOOL_API_REVALIDATE_SECONDS = 60 * 60 * 6;
export const CLIENT_REFRESH_INTERVAL_MS = 1000 * 60 * 15;

export const FRANCE_TIME_ZONE = "Europe/Paris";
export const BELGIUM_TIME_ZONE = "Europe/Brussels";

export const FRANCE_ZONE_DEFINITIONS: ZoneDefinition[] = [
  {
    zone: "A",
    code: "FR-ZA",
    label: "Zone A",
    color: "var(--zone-fr-a)",
    glow: "var(--zone-fr-a-glow)",
    academies: [
      "Besancon",
      "Bordeaux",
      "Clermont-Ferrand",
      "Dijon",
      "Grenoble",
      "Limoges",
      "Lyon",
      "Poitiers",
    ],
    regions: [
      "Auvergne-Rhone-Alpes",
      "Bourgogne-Franche-Comte",
      "Nouvelle-Aquitaine",
    ],
  },
  {
    zone: "B",
    code: "FR-ZB",
    label: "Zone B",
    color: "var(--zone-fr-b)",
    glow: "var(--zone-fr-b-glow)",
    academies: [
      "Aix-Marseille",
      "Amiens",
      "Lille",
      "Nancy-Metz",
      "Nantes",
      "Nice",
      "Normandie",
      "Orleans-Tours",
      "Reims",
      "Rennes",
      "Strasbourg",
    ],
    regions: [
      "Bretagne",
      "Centre-Val de Loire",
      "Grand Est",
      "Hauts-de-France",
      "Normandie",
      "Pays de la Loire",
      "Provence-Alpes-Cote d'Azur",
    ],
  },
  {
    zone: "C",
    code: "FR-ZC",
    label: "Zone C",
    color: "var(--zone-fr-c)",
    glow: "var(--zone-fr-c-glow)",
    academies: ["Creteil", "Montpellier", "Paris", "Toulouse", "Versailles"],
    regions: ["Ile-de-France", "Occitanie"],
  },
];

export const BELGIUM_COMMUNITIES: BelgiumCommunityDefinition[] = [
  {
    code: "BE-FR",
    label: "Communaute francaise",
    shortLabel: "Belgique FR",
    color: "var(--community-be-fr)",
    glow: "var(--community-be-fr-glow)",
  },
  {
    code: "BE-NL",
    label: "Communaute flamande",
    shortLabel: "Belgique NL",
    color: "var(--community-be-nl)",
    glow: "var(--community-be-nl-glow)",
  },
  {
    code: "BE-DE",
    label: "Communaute germanophone",
    shortLabel: "Belgique DE",
    color: "var(--community-be-de)",
    glow: "var(--community-be-de-glow)",
  },
];

export const REGION_ZONE_COLORS: Record<string, string> = {
  A: "var(--zone-fr-a)",
  B: "var(--zone-fr-b)",
  C: "var(--zone-fr-c)",
  SPECIAL: "var(--zone-fr-special)",
};

export const REGION_ZONE_LABELS: Record<string, string> = {
  A: "Zone A",
  B: "Zone B",
  C: "Zone C",
  SPECIAL: "Calendrier specifique",
};

export const FRANCE_REGION_MAP: FranceRegionDefinition[] = [];

export const FRANCE_REGION_ZONE_BY_CODE: Record<string, "A" | "B" | "C" | "SPECIAL"> = {
  "11": "C",
  "24": "B",
  "27": "A",
  "28": "B",
  "32": "B",
  "44": "B",
  "52": "B",
  "53": "B",
  "75": "A",
  "76": "C",
  "84": "A",
  "93": "B",
  "94": "SPECIAL",
};

export const FRANCE_REGION_NAME_BY_CODE: Record<string, string> = {
  "11": "Ile-de-France",
  "24": "Centre-Val de Loire",
  "27": "Bourgogne-Franche-Comte",
  "28": "Normandie",
  "32": "Hauts-de-France",
  "44": "Grand Est",
  "52": "Pays de la Loire",
  "53": "Bretagne",
  "75": "Nouvelle-Aquitaine",
  "76": "Occitanie",
  "84": "Auvergne-Rhone-Alpes",
  "93": "Provence-Alpes-Cote d'Azur",
  "94": "Corse",
};
