"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useCalendarYear } from "@/components/calendar/calendar-year-context";
import { BelgiumSchoolMap } from "@/components/country/belgium-school-map";
import { CountdownGrid } from "@/components/country/countdown-grid";
import { FranceSchoolMap } from "@/components/country/france-school-map";
import { HolidayCalendar } from "@/components/country/holiday-calendar";
import {
  BELGIUM_COMMUNITIES,
  FRANCE_REGION_ZONE_BY_CODE,
  FRANCE_ZONE_DEFINITIONS,
} from "@/lib/constants";
import { getDictionary } from "@/lib/i18n";
import type { AppLocale, CountryIsoCode, CountryPageData, CountryZoneCountdownData } from "@/lib/types";

function getDisplayZoneName(zone: CountryZoneCountdownData, labels: ReturnType<typeof getDictionary>["calendar"]) {
  if (zone.code === "BE-FR") return labels.communityFrance;
  if (zone.code === "BE-NL") return labels.communityFlemish;
  if (zone.code === "BE-DE") return labels.communityGerman;
  return zone.label;
}

function getShortUnitLabels(locale: AppLocale) {
  if (locale === "pl") return { days: "d", hours: "g", minutes: "m", seconds: "s" };
  if (locale === "en") return { days: "d", hours: "h", minutes: "m", seconds: "s" };
  return { days: "j", hours: "h", minutes: "m", seconds: "s" };
}

const FILTER_PREFERENCE_COOKIE = "zonevacances-filters";
const ALL_ZONE_IDS = [
  ...FRANCE_ZONE_DEFINITIONS.map((zone) => zone.code),
  ...BELGIUM_COMMUNITIES.map((community) => community.code),
];

function LocationIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M19 10.1c0 5-7 11-7 11s-7-6-7-11a7 7 0 1 1 14 0Z" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="10" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function HomeDashboard({
  france,
  belgium,
  locale,
}: {
  france: CountryPageData;
  belgium: CountryPageData;
  locale: AppLocale;
}) {
  const dictionary = getDictionary(locale);
  const labels = dictionary.calendar;
  const {
    selectedYear,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    mobileDrawerContentTarget,
  } = useCalendarYear();
  const [selectedZoneIds, setSelectedZoneIds] = useState(ALL_ZONE_IDS);
  const [selectedPublicHolidayCountries, setSelectedPublicHolidayCountries] = useState<CountryIsoCode[]>([]);
  const [filterPreferencesLoaded, setFilterPreferencesLoaded] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationMessage, setLocationMessage] = useState("");
  const mapsTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileMapsRef = useRef<HTMLDivElement>(null);
  const zones = useMemo(
    () => {
      const apiZones = new Map(
        [...france.nextVacations, ...belgium.nextVacations].map((zone) => [zone.code, zone]),
      );
      const franceZones = FRANCE_ZONE_DEFINITIONS.map((definition) => {
        const apiZone = apiZones.get(definition.code);
        return {
          id: definition.code,
          code: definition.code,
          label: definition.label,
          shortLabel: definition.label,
          color: definition.color,
          glow: definition.glow,
          matchType: "subdivision" as const,
          nextHoliday: apiZone?.nextHoliday ?? null,
        };
      });
      const belgiumCommunities = BELGIUM_COMMUNITIES.map((definition) => {
        const apiZone = apiZones.get(definition.code);
        return {
          id: definition.code,
          code: definition.code,
          label: definition.label,
          shortLabel: definition.shortLabel,
          color: definition.color,
          glow: definition.glow,
          matchType: "group" as const,
          nextHoliday: apiZone?.nextHoliday ?? null,
        };
      });

      return [...franceZones, ...belgiumCommunities];
    },
    [france.nextVacations, belgium.nextVacations],
  );
  const selectedZoneSet = useMemo(() => new Set(selectedZoneIds), [selectedZoneIds]);
  const allHolidays = useMemo(
    () => [...france.calendarVacations, ...belgium.calendarVacations],
    [france.calendarVacations, belgium.calendarVacations],
  );
  const allPublicHolidays = useMemo(
    () => [...france.calendarPublicHolidays, ...belgium.calendarPublicHolidays],
    [france.calendarPublicHolidays, belgium.calendarPublicHolidays],
  );

  useEffect(() => {
    const cookiePrefix = `${FILTER_PREFERENCE_COOKIE}=`;
    const preferenceCookie = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith(cookiePrefix));

    if (preferenceCookie) {
      try {
        const storedPreferences: unknown = JSON.parse(decodeURIComponent(preferenceCookie.slice(cookiePrefix.length)));
        if (Array.isArray(storedPreferences)) {
          const allowedZoneIds = new Set(ALL_ZONE_IDS);
          setSelectedZoneIds(storedPreferences.filter(
            (zoneId): zoneId is string => typeof zoneId === "string" && allowedZoneIds.has(zoneId),
          ));
        } else if (storedPreferences && typeof storedPreferences === "object") {
          const preferences = storedPreferences as {
            zoneIds?: unknown;
            publicHolidayCountries?: unknown;
          };
          const allowedZoneIds = new Set(ALL_ZONE_IDS);
          if (Array.isArray(preferences.zoneIds)) {
            setSelectedZoneIds(preferences.zoneIds.filter(
              (zoneId): zoneId is string => typeof zoneId === "string" && allowedZoneIds.has(zoneId),
            ));
          }
          if (Array.isArray(preferences.publicHolidayCountries)) {
            setSelectedPublicHolidayCountries(preferences.publicHolidayCountries.filter(
              (country): country is CountryIsoCode => country === "FR" || country === "BE",
            ));
          }
        }
      } catch {
        // Ignore malformed cookies and keep the default selection.
      }
    }

    setFilterPreferencesLoaded(true);
  }, []);

  useEffect(() => {
    if (!filterPreferencesLoaded) return;

    const secureAttribute = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${FILTER_PREFERENCE_COOKIE}=${encodeURIComponent(JSON.stringify({
      zoneIds: selectedZoneIds,
      publicHolidayCountries: selectedPublicHolidayCountries,
    }))}; Path=/; Max-Age=31536000; SameSite=Lax${secureAttribute}`;
  }, [filterPreferencesLoaded, selectedPublicHolidayCountries, selectedZoneIds]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  const toggleZone = (zoneId: string) => {
    setSelectedZoneIds((current) =>
      current.includes(zoneId)
        ? current.filter((selected) => selected !== zoneId)
        : [...current, zoneId],
    );
  };

  const togglePublicHolidayCountry = (countryCode: CountryIsoCode) => {
    setSelectedPublicHolidayCountries((current) =>
      current.includes(countryCode)
        ? current.filter((selected) => selected !== countryCode)
        : [...current, countryCode],
    );
  };

  const handleLocate = () => {
    if (isLocating) return;
    if (!navigator.geolocation) {
      setLocationMessage(labels.locationUnavailable);
      return;
    }
    setLocationMessage("");
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      try {
        const response = await fetch("/api/geolocation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ latitude: coords.latitude, longitude: coords.longitude }),
        });

        if (!response.ok) {
          setLocationMessage(labels.locationUnavailable);
          return;
        }

        const result = await response.json() as { regionCode?: string };
        const zone = result.regionCode
          ? FRANCE_REGION_ZONE_BY_CODE[result.regionCode]
          : undefined;

        if (!zone || zone === "SPECIAL") {
          setLocationMessage(labels.locationUnavailable);
          return;
        }

        const zoneId = `FR-Z${zone}`;
        const selectedZone = zones.find((candidate) => candidate.id === zoneId);

        if (!selectedZone) {
          setLocationMessage(labels.locationUnavailable);
          return;
        }

        setSelectedZoneIds([zoneId]);
        setLocationMessage(
          labels.locationDetected.replace("{zone}", getDisplayZoneName(selectedZone, labels)),
        );
      } catch {
        setLocationMessage(labels.locationUnavailable);
      } finally {
        setIsLocating(false);
      }
    }, () => {
      setIsLocating(false);
      setLocationMessage(labels.locationUnavailable);
    }, { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 });
  };

  const warnings = [...new Set([...france.warnings, ...belgium.warnings])];
  const publicHolidays = [...france.publicHolidays, ...belgium.publicHolidays];
  const remainingVacations = [...france.remainingVacations, ...belgium.remainingVacations];

  const renderSidebar = (mobileDrawer = false) => {
    const suffix = mobileDrawer ? "-mobile" : "";

    return (
      <aside aria-label={labels.title} className={`home-sidebar${mobileDrawer ? " home-sidebar--mobile-drawer" : ""}`}>
        <section aria-labelledby={`countdown-list-title${suffix}`} className="home-sidebar__countdowns">
          <h2 className="home-sidebar__section-title" id={`countdown-list-title${suffix}`}>
            {dictionary.countryPage.nextVacations}
          </h2>
          <div className="zone-countdown-list">
            {zones.map((zone) => {
              const nextHoliday = zone.nextHoliday;
              return (
                <article className="zone-countdown" key={zone.id}>
                  <div className="zone-countdown__heading">
                    <span aria-hidden="true" className="zone-countdown__swatch" style={{ backgroundColor: zone.color }} />
                    <h3>{getDisplayZoneName(zone, labels)}</h3>
                  </div>
                  {nextHoliday ? (
                    <div aria-label={`${getDisplayZoneName(zone, labels)} — ${nextHoliday.countdownLabel}`} className="zone-countdown__clock">
                      <CountdownGrid
                        accentColor={zone.color}
                        compact
                        label={nextHoliday.countdownLabel}
                        refreshOnExpire={nextHoliday.statusTone !== "past"}
                        targetDateTime={nextHoliday.targetDateTime}
                        unitLabels={getShortUnitLabels(locale)}
                      />
                      <p className="zone-countdown__holiday">{nextHoliday.name}</p>
                    </div>
                  ) : (
                    <p className="zone-countdown__empty">{dictionary.countryPage.noVacationData}</p>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <section aria-labelledby={`calendar-filters-title${suffix}`} className="home-sidebar__filters">
          <h2 className="home-sidebar__section-title" id={`calendar-filters-title${suffix}`}>{labels.filter}</h2>
          {zones.map((zone, index) => {
            const zoneLabel = getDisplayZoneName(zone, labels);
            const groupLabel = zone.code.startsWith("FR-") ? labels.france : labels.belgium;
            const startsNewGroup = index === 0 || (index === 3 && zones.length > 3);
            return (
              <div className={`zone-filter${startsNewGroup && index > 0 ? " zone-filter--group-start" : ""}`} key={zone.id}>
                {startsNewGroup && <h3 className="zone-filter__group-label">{groupLabel}</h3>}
                <label className="zone-filter__label" style={{ ["--filter-color" as string]: zone.color }}>
                  <input
                    checked={selectedZoneSet.has(zone.id)}
                    className="zone-filter__input"
                    onChange={() => toggleZone(zone.id)}
                    type="checkbox"
                  />
                  <span aria-hidden="true" className="zone-filter__check" />
                  <span>{zoneLabel}</span>
                </label>
              </div>
            );
          })}
          <div className="public-holiday-filters">
            {renderPublicHolidayFilter("FR", labels.publicHolidayFrance)}
            {renderPublicHolidayFilter("BE", labels.publicHolidayBelgium)}
          </div>
          <button className="location-button" disabled={isLocating} onClick={handleLocate} type="button">
            <LocationIcon />
            <span>{isLocating ? labels.locating : labels.locate}</span>
          </button>
          {locationMessage ? <p className="location-message" role="status">{locationMessage}</p> : null}
        </section>

        <details className="home-details">
          <summary>{dictionary.countryPage.details}</summary>
          <div className="home-details__content">
            <h3>{dictionary.countryPage.publicHolidays}</h3>
            {publicHolidays.length ? (
              <ul>
                {publicHolidays.slice(0, 10).map((holiday) => (
                  <li key={`${holiday.id}-${holiday.startDate}`}><strong>{holiday.dateLabel}</strong> — {holiday.name}</li>
                ))}
              </ul>
            ) : <p>{dictionary.countryPage.noPublicHolidays}</p>}
            <h3>{dictionary.countryPage.remainingVacations}</h3>
            {remainingVacations.length ? (
              <ul>
                {remainingVacations.slice(0, 10).map((vacation) => (
                  <li key={`${vacation.id}-${vacation.startDate}`}><strong>{vacation.dateLabel}</strong> — {vacation.zoneShortLabel}: {vacation.name}</li>
                ))}
              </ul>
            ) : <p>{dictionary.countryPage.noRemainingVacations}</p>}
          </div>
        </details>
      </aside>
    );
  };

  const renderPublicHolidayFilter = (countryCode: CountryIsoCode, label: string) => (
    <label
      className={`zone-filter__label public-holiday-filter public-holiday-filter--${countryCode.toLowerCase()}`}
      style={{ ["--filter-color" as string]: `var(--public-holiday-filter-${countryCode.toLowerCase()})` }}
    >
      <input
        checked={selectedPublicHolidayCountries.includes(countryCode)}
        className="zone-filter__input"
        onChange={() => togglePublicHolidayCountry(countryCode)}
        type="checkbox"
      />
      <span aria-hidden="true" className="zone-filter__check" />
      <span>{label}</span>
    </label>
  );

  const renderMaps = (mobileDrawer = false) => (
    <aside
      aria-label={labels.maps}
      className={`dashboard-maps${mobileDrawer ? " dashboard-maps--mobile-drawer" : " dashboard-maps--desktop"}`}
      ref={mobileDrawer ? mobileMapsRef : undefined}
    >
      <div className="dashboard-maps__header">
        <h2>{labels.maps}</h2>
      </div>
      <div className="dashboard-maps__cards">
        <section aria-label={labels.france} className="dashboard-map-card" id={`map-france${mobileDrawer ? "-mobile" : ""}`}>
          <FranceSchoolMap
            ariaLabel={dictionary.countryPage.franceMapLabel}
            selectedZoneIds={selectedZoneIds}
            sticky={false}
          />
        </section>
        <section aria-label={labels.belgium} className="dashboard-map-card" id={`map-belgium${mobileDrawer ? "-mobile" : ""}`}>
          <BelgiumSchoolMap
            ariaLabel={dictionary.countryPage.belgiumMapLabel}
            selectedZoneIds={selectedZoneIds}
            sticky={false}
          />
        </section>
      </div>
    </aside>
  );

  return (
    <main className="home-dashboard">
      {renderSidebar()}

      <div className="home-dashboard__main">
        {warnings.length > 0 ? (
          <div className="dashboard-warning" role="status">
            {[...new Set(warnings)].join(" ")}
          </div>
        ) : null}

        <div className="dashboard-panel">
          <HolidayCalendar
            calendarVacations={allHolidays}
            calendarPublicHolidays={allPublicHolidays}
            labels={labels}
            locale={locale}
            selectedYear={selectedYear}
            selectedZoneIds={selectedZoneIds}
            selectedPublicHolidayCountries={selectedPublicHolidayCountries}
            mapsTriggerRef={mapsTriggerRef}
            onOpenMaps={() => {
              setIsMobileMenuOpen(true);
              window.setTimeout(() => mobileMapsRef.current?.scrollIntoView({ block: "start" }), 0);
            }}
          />
          {renderMaps()}
        </div>
      </div>
      {mobileDrawerContentTarget
        ? createPortal(<>{renderSidebar(true)}{renderMaps(true)}</>, mobileDrawerContentTarget)
        : null}
    </main>
  );
}
