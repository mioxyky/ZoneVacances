import belgiumMap from "@/data/belgium-map.json";

type BelgiumCommunityCode = "BE-DE" | "BE-FR" | "BE-NL";

type BelgiumMapPayload = {
  background: {
    height: number;
    width: number;
    x: number;
    y: number;
  };
  districts: Array<{
    id: string;
    label: string;
    path: string;
  }>;
  municipalities: Array<{
    community: BelgiumCommunityCode;
    districtId: string | null;
    id: string;
    label: string;
    path: string;
  }>;
  provinces: Array<{
    id: string;
    label: string;
    path: string;
  }>;
  viewBox: string;
};

const typedBelgiumMap = belgiumMap as BelgiumMapPayload;

const BELGIUM_COMMUNITY_FILL_BY_CODE: Record<BelgiumCommunityCode, string> = {
  "BE-DE": "var(--community-be-de)",
  "BE-FR": "var(--community-be-fr)",
  "BE-NL": "var(--community-be-nl)",
};

const BELGIUM_COMMUNITY_PATHS = typedBelgiumMap.municipalities.reduce<
  Record<BelgiumCommunityCode, string>
>(
  (pathsByCommunity, municipality) => {
    pathsByCommunity[municipality.community] += ` ${municipality.path}`;
    return pathsByCommunity;
  },
  {
    "BE-DE": "",
    "BE-FR": "",
    "BE-NL": "",
  },
);

export function BelgiumSchoolMap({
  ariaLabel,
  selectedZoneIds,
  sticky = true,
}: {
  ariaLabel: string;
  selectedZoneIds?: string[];
  sticky?: boolean;
}) {
  return (
    <div className={`country-map-panel${sticky ? "" : " country-map-panel--static"}`}>
      <svg
        aria-label={ariaLabel}
        className="belgium-school-map"
        role="img"
        viewBox={typedBelgiumMap.viewBox}
      >
        <rect
          className="belgium-school-map__background"
          height={typedBelgiumMap.background.height}
          width={typedBelgiumMap.background.width}
          x={typedBelgiumMap.background.x}
          y={typedBelgiumMap.background.y}
        />

        {(Object.entries(BELGIUM_COMMUNITY_PATHS) as Array<[BelgiumCommunityCode, string]>).map(
          ([communityCode, path]) => (
          <path
            className={`belgium-school-map__province-fill${selectedZoneIds !== undefined && !selectedZoneIds.includes(communityCode) ? " is-muted" : ""}`}
            d={path.trim()}
            fill={BELGIUM_COMMUNITY_FILL_BY_CODE[communityCode]}
            key={communityCode}
            fillOpacity={0.78}
            vectorEffect="non-scaling-stroke"
          />
          ),
        )}

        {typedBelgiumMap.districts.map((district) => (
          <path
            className="belgium-school-map__district-outline"
            d={district.path}
            fill="none"
            key={`${district.id}-district`}
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {typedBelgiumMap.provinces.map((province) => (
          <path
            className="belgium-school-map__region-outline"
            d={province.path}
            fill="none"
            key={`${province.id}-province`}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    </div>
  );
}
