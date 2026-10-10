import franceDepartmentsMap from "@svg-maps/france.departments";
import franceRegionsMap from "@svg-maps/france.regions";
import type { RegionTone } from "@/lib/types";

type FranceMapLocation = {
  id: string;
  name: string;
  path: string;
};

type FranceMapDefinition = {
  viewBox: string;
  locations: FranceMapLocation[];
};

const typedFranceRegionsMap = franceRegionsMap as FranceMapDefinition;
const typedFranceDepartmentsMap = franceDepartmentsMap as FranceMapDefinition;
const METROPOLITAN_DEPARTMENT_PATTERN = /^(?:0[1-9]|[1-8][0-9]|9[0-5]|2A|2B)$/;

const REGION_TONE_BY_MAP_ID: Record<string, RegionTone> = {
  ara: "A",
  bfc: "A",
  bre: "B",
  cor: "SPECIAL",
  cvl: "B",
  ges: "B",
  hdf: "B",
  idf: "C",
  naq: "A",
  nor: "B",
  occ: "C",
  pac: "B",
  pdl: "B",
};

const MAP_FILL_BY_TONE: Record<RegionTone, string> = {
  A: "var(--zone-fr-a)",
  B: "var(--zone-fr-b)",
  C: "var(--zone-fr-c)",
  SPECIAL: "var(--zone-fr-special)",
};

const metropolitanDepartments = typedFranceDepartmentsMap.locations.filter((department) =>
  METROPOLITAN_DEPARTMENT_PATTERN.test(department.id),
);

export function FranceSchoolMap({
  ariaLabel,
  selectedZoneIds,
  sticky = true,
}: {
  ariaLabel: string;
  selectedZoneIds?: string[];
  sticky?: boolean;
}) {
  return (
    <div className={`france-map-panel${sticky ? "" : " france-map-panel--static"}`}>
      <svg
        aria-label={ariaLabel}
        className="france-map"
        role="img"
        viewBox={typedFranceDepartmentsMap.viewBox}
      >
        <rect className="france-map__background" height="585" width="613" x="0" y="0" />

        {typedFranceRegionsMap.locations.map((region) => {
          const tone = REGION_TONE_BY_MAP_ID[region.id] ?? "SPECIAL";
          const isSelected = tone !== "SPECIAL" && selectedZoneIds?.includes(`FR-Z${tone}`);
          const isMuted = selectedZoneIds !== undefined && !isSelected && tone !== "SPECIAL";

          return (
            <path
              className={`france-map__region-fill${isMuted ? " is-muted" : ""}`}
              d={region.path}
              fill={MAP_FILL_BY_TONE[tone]}
              key={region.id}
              fillOpacity={tone === "SPECIAL" ? 0.22 : undefined}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}

        {metropolitanDepartments.map((department) => (
          <path
            className="france-map__department"
            d={department.path}
            fill="none"
            key={department.id}
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {typedFranceRegionsMap.locations.map((region) => (
          <path
            className="france-map__region-outline"
            d={region.path}
            fill="none"
            key={`${region.id}-outline`}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    </div>
  );
}
