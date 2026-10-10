"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FocusEvent as ReactFocusEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";
import type { CalendarPublicHolidayData, CalendarVacationData, CountryIsoCode } from "@/lib/types";
import type { AppLocale } from "@/lib/types";

type CalendarLabels = {
  title: string;
  year: string;
  maps: string;
  openMaps: string;
  empty: string;
  noneSelected: string;
  previousYear: string;
  nextYear: string;
};

type Weekday = {
  label: string;
  date: Date;
};

type TooltipEntry = {
  id: string;
  title: string;
  detail: string;
};

type TooltipState = {
  targetId: string;
  entries: TooltipEntry[];
  left: number;
  top: number;
  placement: "above" | "below";
};

function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function dateFromIsoDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function getDateRangeLabel(startDate: string, endDate: string, formatter: Intl.DateTimeFormat) {
  const start = dateFromIsoDate(startDate);
  const end = dateFromIsoDate(endDate);

  return startDate === endDate
    ? formatter.format(start)
    : `${formatter.format(start)} – ${formatter.format(end)}`;
}

function getWeeks(
  year: number,
  month: number,
  holidays: CalendarVacationData[],
  publicHolidays: CalendarPublicHolidayData[],
) {
  const firstDayOffset = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weekCount = Math.ceil((firstDayOffset + daysInMonth) / 7);

  return Array.from({ length: weekCount }, (_, weekIndex) => {
    const days = Array.from({ length: 7 }, (_, column) => {
      const dayNumber = weekIndex * 7 + column - firstDayOffset + 1;
      return new Date(year, month, dayNumber);
    });
    const segments = holidays
      .flatMap((holiday) => {
        const visibleDays = days
          .map((date, column) => ({ date, column, dateKey: toIsoDate(date) }))
          .filter(
            ({ date, dateKey }) =>
              date.getMonth() === month &&
              dateKey >= holiday.startDate &&
              dateKey <= holiday.endDate,
          );

        if (visibleDays.length === 0) {
          return [];
        }

        return [{
          holiday,
          startColumn: visibleDays[0].column,
          endColumn: visibleDays[visibleDays.length - 1].column,
          startsHere: visibleDays[0].dateKey === holiday.startDate,
          endsHere: visibleDays[visibleDays.length - 1].dateKey === holiday.endDate,
          lane: 0,
        }];
      })
      .sort(
        (first, second) =>
          first.startColumn - second.startColumn || second.endColumn - first.endColumn,
      );
    const lastSchoolColumnByLane: number[] = [];

    for (const segment of segments) {
      let lane = lastSchoolColumnByLane.findIndex((lastColumn) => lastColumn < segment.startColumn);

      if (lane === -1) {
        lane = lastSchoolColumnByLane.length;
        lastSchoolColumnByLane.push(segment.endColumn);
      } else {
        lastSchoolColumnByLane[lane] = segment.endColumn;
      }

      segment.lane = lane;
    }

    const publicHolidaySegments = publicHolidays
      .flatMap((holiday) => {
        const visibleDays = days
          .map((date, column) => ({ date, column, dateKey: toIsoDate(date) }))
          .filter(
            ({ date, dateKey }) =>
              date.getMonth() === month &&
              dateKey >= holiday.startDate &&
              dateKey <= holiday.endDate,
          );

        if (visibleDays.length === 0) {
          return [];
        }

        return [{
          holiday,
          startColumn: visibleDays[0].column,
          endColumn: visibleDays[visibleDays.length - 1].column,
          startsHere: visibleDays[0].dateKey === holiday.startDate,
          endsHere: visibleDays[visibleDays.length - 1].dateKey === holiday.endDate,
          lane: 0,
        }];
      })
      .sort((first, second) => first.startColumn - second.startColumn || first.endColumn - second.endColumn);
    const lastPublicHolidayColumnByLane: number[] = [];

    for (const segment of publicHolidaySegments) {
      let lane = lastPublicHolidayColumnByLane.findIndex((lastColumn) => lastColumn < segment.startColumn);

      if (lane === -1) {
        lane = lastPublicHolidayColumnByLane.length;
        lastPublicHolidayColumnByLane.push(segment.endColumn);
      } else {
        lastPublicHolidayColumnByLane[lane] = segment.endColumn;
      }

      segment.lane = lane;
    }

    return {
      days,
      segments,
      laneCount: lastSchoolColumnByLane.length,
      publicHolidaySegments,
      publicHolidayLaneCount: lastPublicHolidayColumnByLane.length,
    };
  });
}

function getWeekdays(locale: AppLocale): Weekday[] {
  const formatter = new Intl.DateTimeFormat(locale, { weekday: "narrow" });

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(2024, 0, 1 + index);
    return { date, label: formatter.format(date) };
  });
}

export function HolidayCalendar({
  calendarVacations,
  calendarPublicHolidays,
  labels,
  locale,
  selectedYear,
  selectedZoneIds,
  selectedPublicHolidayCountries,
  onOpenMaps,
  mapsTriggerRef,
}: {
  calendarVacations: CalendarVacationData[];
  calendarPublicHolidays: CalendarPublicHolidayData[];
  labels: CalendarLabels;
  locale: AppLocale;
  selectedYear: number;
  selectedZoneIds: string[];
  selectedPublicHolidayCountries: CountryIsoCode[];
  onOpenMaps: () => void;
  mapsTriggerRef: RefObject<HTMLButtonElement | null>;
}) {
  const weekdays = useMemo(() => getWeekdays(locale), [locale]);
  const dateFormatter = useMemo(
    () => new Intl.DateTimeFormat(locale, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    [locale],
  );
  const rangeFormatter = useMemo(
    () => new Intl.DateTimeFormat(locale, { year: "numeric", month: "short", day: "numeric" }),
    [locale],
  );
  const selectedYearHolidays = useMemo(() => {
    const yearStart = `${selectedYear}-01-01`;
    const yearEnd = `${selectedYear}-12-31`;

    return calendarVacations.filter(
      (holiday) =>
        selectedZoneIds.includes(holiday.zoneId) &&
        holiday.startDate <= yearEnd &&
        holiday.endDate >= yearStart,
    );
  }, [calendarVacations, selectedYear, selectedZoneIds]);
  const selectedYearPublicHolidays = useMemo(() => {
    const yearStart = `${selectedYear}-01-01`;
    const yearEnd = `${selectedYear}-12-31`;

    return calendarPublicHolidays.filter(
      (holiday) =>
        selectedPublicHolidayCountries.includes(holiday.countryCode) &&
        holiday.startDate <= yearEnd &&
        holiday.endDate >= yearStart,
    );
  }, [calendarPublicHolidays, selectedPublicHolidayCountries, selectedYear]);
  const dateInfoByKey = useMemo(() => {
    const dateInfo = new Map<string, TooltipEntry[]>();
    const yearStart = dateFromIsoDate(`${selectedYear}-01-01`);
    const yearEnd = dateFromIsoDate(`${selectedYear}-12-31`);

    const addRange = (startDate: string, endDate: string, entry: TooltipEntry) => {
      const current = dateFromIsoDate(startDate < `${selectedYear}-01-01` ? `${selectedYear}-01-01` : startDate);
      const end = dateFromIsoDate(endDate > `${selectedYear}-12-31` ? `${selectedYear}-12-31` : endDate);

      while (current <= end && current <= yearEnd) {
        if (current >= yearStart) {
          const dateKey = toIsoDate(current);
          const entries = dateInfo.get(dateKey) ?? [];
          entries.push(entry);
          dateInfo.set(dateKey, entries);
        }
        current.setDate(current.getDate() + 1);
      }
    };

    selectedYearHolidays.forEach((holiday) => {
      addRange(holiday.startDate, holiday.endDate, {
        id: holiday.id,
        title: `${holiday.zoneShortLabel} · ${holiday.name}`,
        detail: getDateRangeLabel(holiday.startDate, holiday.endDate, rangeFormatter),
      });
    });
    selectedYearPublicHolidays.forEach((holiday) => {
      addRange(holiday.startDate, holiday.endDate, {
        id: holiday.id,
        title: `${holiday.countryLabel} · ${holiday.name}`,
        detail: getDateRangeLabel(holiday.startDate, holiday.endDate, rangeFormatter),
      });
    });

    return dateInfo;
  }, [rangeFormatter, selectedYear, selectedYearHolidays, selectedYearPublicHolidays]);
  const [activeTooltip, setActiveTooltip] = useState<TooltipState | null>(null);
  const tooltipTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(max-width: 760px)").matches) {
      return;
    }

    const monthIndex = new Date().getMonth();
    const frame = window.requestAnimationFrame(() => {
      document
        .getElementById(`calendar-month-${selectedYear}-${monthIndex}`)
        ?.scrollIntoView({ block: "start" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [selectedYear]);

  useEffect(() => {
    if (!activeTooltip) return;

    const dismissOutsideTooltip = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest("[data-calendar-tooltip-target]")) return;
      setActiveTooltip(null);
    };
    const dismissWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveTooltip(null);
    };

    document.addEventListener("pointerdown", dismissOutsideTooltip);
    document.addEventListener("keydown", dismissWithEscape);
    return () => {
      document.removeEventListener("pointerdown", dismissOutsideTooltip);
      document.removeEventListener("keydown", dismissWithEscape);
    };
  }, [activeTooltip]);

  useEffect(() => () => {
    if (tooltipTimerRef.current !== null) window.clearTimeout(tooltipTimerRef.current);
  }, []);

  const clearTooltipTimer = () => {
    if (tooltipTimerRef.current !== null) {
      window.clearTimeout(tooltipTimerRef.current);
      tooltipTimerRef.current = null;
    }
  };

  const setTooltipForTarget = (
    target: HTMLElement,
    targetId: string,
    entries: TooltipEntry[],
  ) => {
    const rect = target.getBoundingClientRect();
    const tooltipWidth = Math.min(320, window.innerWidth - 24);
    const left = Math.max(12, Math.min(
      rect.left + rect.width / 2 - tooltipWidth / 2,
      window.innerWidth - tooltipWidth - 12,
    ));
    const showAbove = rect.bottom + 108 > window.innerHeight && rect.top > 118;

    setActiveTooltip({
      targetId,
      entries,
      left,
      top: showAbove ? rect.top - 8 : rect.bottom + 8,
      placement: showAbove ? "above" : "below",
    });
  };

  const scheduleTooltip = (target: HTMLElement, targetId: string, entries: TooltipEntry[]) => {
    clearTooltipTimer();
    tooltipTimerRef.current = window.setTimeout(() => {
      setTooltipForTarget(target, targetId, entries);
      tooltipTimerRef.current = null;
    }, 450);
  };

  const hideTooltip = () => {
    clearTooltipTimer();
    setActiveTooltip(null);
  };

  const toggleTooltip = (target: HTMLElement, targetId: string, entries: TooltipEntry[]) => {
    clearTooltipTimer();
    if (activeTooltip?.targetId === targetId) {
      setActiveTooltip(null);
      return;
    }
    setTooltipForTarget(target, targetId, entries);
  };

  const tooltipTargetProps = (targetId: string, entries: TooltipEntry[], labelPrefix?: string) => ({
    "aria-describedby": activeTooltip?.targetId === targetId ? "calendar-holiday-tooltip" : undefined,
    "aria-label": [labelPrefix, ...entries.map((entry) => `${entry.title}, ${entry.detail}`)]
      .filter(Boolean)
      .join(". "),
    "data-calendar-tooltip-target": "true",
    onBlur: hideTooltip,
    onClick: (event: ReactMouseEvent<HTMLElement>) => toggleTooltip(event.currentTarget, targetId, entries),
    onFocus: (event: ReactFocusEvent<HTMLElement>) => scheduleTooltip(event.currentTarget, targetId, entries),
    onPointerEnter: (event: ReactPointerEvent<HTMLElement>) => {
      if (event.pointerType !== "touch") scheduleTooltip(event.currentTarget, targetId, entries);
    },
    onPointerLeave: (event: ReactPointerEvent<HTMLElement>) => {
      if (event.pointerType !== "touch" && document.activeElement !== event.currentTarget) hideTooltip();
    },
  });

  return (
    <section aria-label={labels.title} className="calendar-panel">
      <div className="calendar-panel__toolbar">
        <button aria-label={labels.openMaps} className="calendar-maps-button" onClick={onOpenMaps} ref={mapsTriggerRef} type="button">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M3.5 6.2 9 3.5l6 2.7 5.5-2.7v14.3L15 20.5l-6-2.7-5.5 2.7V6.2Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.6" />
            <path d="M9 3.5v14.3m6-11.6v14.3" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          {labels.maps}
        </button>
      </div>

      {selectedZoneIds.length === 0 && selectedPublicHolidayCountries.length === 0 ? (
        <p className="calendar-empty">{labels.noneSelected}</p>
      ) : selectedYearHolidays.length === 0 && selectedYearPublicHolidays.length === 0 ? (
        <p className="calendar-empty">{labels.empty}</p>
      ) : null}

      <div className="calendar-month-grid">
        {Array.from({ length: 12 }, (_, month) => {
          const monthDate = new Date(selectedYear, month, 1);
          const monthName = new Intl.DateTimeFormat(locale, { month: "long" }).format(monthDate);
          const weeks = getWeeks(selectedYear, month, selectedYearHolidays, selectedYearPublicHolidays);
          const paddedWeeks = [...weeks, ...Array.from({ length: 6 - weeks.length }, () => null)];
          const monthId = `calendar-month-${selectedYear}-${month}`;

          return (
            <section aria-labelledby={`${monthId}-title`} className="calendar-month" id={monthId} key={monthId}>
              <h2 className="calendar-month__title" id={`${monthId}-title`}>{monthName}</h2>
              <div aria-hidden="true" className="calendar-weekdays">
                {weekdays.map((weekday, index) => (
                  <span key={`${weekday.label}-${index}`}>{weekday.label}</span>
                ))}
              </div>
              <div
                className="calendar-month__weeks"
                data-week-count={weeks.length}
                style={{ ["--month-week-count" as string]: weeks.length }}
              >
                {paddedWeeks.map((week, weekIndex) => {
                  if (!week) {
                    return <div aria-hidden="true" className="calendar-week calendar-week--empty" key={`${monthId}-week-${weekIndex}`} />;
                  }

                  const { days, segments, laneCount, publicHolidaySegments, publicHolidayLaneCount } = week;

                  return (
                    <div className="calendar-week" key={`${monthId}-week-${weekIndex}`}>
                      <div className="calendar-week__days">
                        {days.map((date) => {
                          const dateKey = toIsoDate(date);
                          const isInMonth = date.getMonth() === month;
                          const dateLabel = dateFormatter.format(date);
                          const isToday = dateKey === toIsoDate(new Date());
                          const dateInfo = dateInfoByKey.get(dateKey) ?? [];
                          const dateId = `calendar-date-${dateKey}`;

                          return (
                            <time
                              aria-current={isToday ? "date" : undefined}
                              className={`calendar-day${isInMonth ? "" : " calendar-day--outside"}${isToday ? " is-today" : ""}${dateInfo.length > 0 ? " has-tooltip" : ""}`}
                              dateTime={dateKey}
                              key={dateKey}
                              tabIndex={dateInfo.length > 0 ? 0 : undefined}
                              {...(dateInfo.length > 0
                                ? tooltipTargetProps(dateId, dateInfo, dateLabel)
                                : { "aria-label": dateLabel })}
                            >
                              {date.getDate()}
                            </time>
                          );
                        })}
                      </div>
                      <div
                        className={`calendar-week__bands calendar-week__bands--school${segments.length === 0 ? " is-empty" : ""}`}
                        style={{ gridRow: 2, gridTemplateRows: `repeat(${Math.max(1, laneCount)}, 3px)` }}
                      >
                        {segments.map((segment, segmentIndex) => {
                          const targetId = `calendar-school-${selectedYear}-${month}-${weekIndex}-${segmentIndex}`;
                          const entry = {
                            id: segment.holiday.id,
                            title: `${segment.holiday.zoneShortLabel} · ${segment.holiday.name}`,
                            detail: getDateRangeLabel(segment.holiday.startDate, segment.holiday.endDate, rangeFormatter),
                          };

                          return (
                            <button
                              className={`calendar-band calendar-band--school${segment.startsHere ? " is-start" : ""}${segment.endsHere ? " is-end" : ""}`}
                              key={`${segment.holiday.id}-${weekIndex}`}
                              style={{
                                backgroundColor: segment.holiday.color,
                                gridColumn: `${segment.startColumn + 1} / ${segment.endColumn + 2}`,
                                gridRow: segment.lane + 1,
                              }}
                              type="button"
                              {...tooltipTargetProps(targetId, [entry])}
                            />
                          );
                        })}
                      </div>
                      <div
                        className={`calendar-week__bands calendar-week__bands--public${publicHolidaySegments.length === 0 ? " is-empty" : ""}`}
                        style={{ gridRow: 3, gridTemplateRows: `repeat(${Math.max(1, publicHolidayLaneCount)}, 2px)` }}
                      >
                        {publicHolidaySegments.map((segment, segmentIndex) => {
                          const targetId = `calendar-public-${selectedYear}-${month}-${weekIndex}-${segmentIndex}`;
                          const entry = {
                            id: segment.holiday.id,
                            title: `${segment.holiday.countryLabel} · ${segment.holiday.name}`,
                            detail: getDateRangeLabel(segment.holiday.startDate, segment.holiday.endDate, rangeFormatter),
                          };

                          return (
                            <button
                              className={`calendar-band calendar-band--public${segment.startsHere ? " is-start" : ""}${segment.endsHere ? " is-end" : ""}`}
                              key={`${segment.holiday.id}-${weekIndex}`}
                              style={{
                                backgroundColor: "var(--public-holiday-line)",
                                gridColumn: `${segment.startColumn + 1} / ${segment.endColumn + 2}`,
                                gridRow: segment.lane + 1,
                              }}
                              type="button"
                              {...tooltipTargetProps(targetId, [entry])}
                            />
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {activeTooltip ? (
        <div
          className={`calendar-tooltip calendar-tooltip--${activeTooltip.placement}`}
          id="calendar-holiday-tooltip"
          role="tooltip"
          style={{ left: activeTooltip.left, top: activeTooltip.top }}
        >
          {activeTooltip.entries.map((entry, index) => (
            <div className="calendar-tooltip__entry" key={`${entry.id}-${index}`}>
              <strong>{entry.title}</strong>
              <span className="calendar-tooltip__detail">{entry.detail}</span>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
