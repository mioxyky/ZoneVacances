"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCalendarYear } from "@/components/calendar/calendar-year-context";
import { BrandLogo } from "@/components/navigation/brand-logo";
import { getDictionary, getLanguageNativeLabel } from "@/lib/i18n";
import { LOCALE_COOKIE_NAME, SUPPORTED_LOCALES, replaceLocaleInPath } from "@/lib/locale";
import type { AppLocale } from "@/lib/types";

type SiteHeaderProps = {
  labels: {
    closeMenu: string;
    language: string;
    openMenu: string;
    primaryNavigation: string;
    selectLanguage: string;
    switchToDarkTheme: string;
    switchToLightTheme: string;
  };
  locale: AppLocale;
};

function GlobeIcon() {
  return (
    <svg
      aria-hidden="true"
      className="site-nav__icon"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" fill="none" r="8.5" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M3.8 12h16.4M12 3.5c2 2.1 3.2 5.1 3.2 8.5S14 18.4 12 20.5M12 3.5c-2 2.1-3.2 5.1-3.2 8.5s1.2 6.4 3.2 8.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      aria-hidden="true"
      className="site-nav__chevron"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.25 7.5L10 12.25L14.75 7.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="site-burger__icon"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={open ? "M6 6L18 18M18 6L6 18" : "M4 7H20M4 12H20M4 17H20"}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function setPreferredLocale(locale: AppLocale) {
  document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

function CalendarYearControl({
  currentYear,
  selectedYear,
  labels,
  onChange,
}: {
  currentYear: number;
  selectedYear: number;
  labels: { year: string; previousYear: string; nextYear: string };
  onChange: (year: number) => void;
}) {
  const availableYears = Array.from({ length: 5 }, (_, offset) => currentYear - 2 + offset);
  const yearIndex = availableYears.indexOf(selectedYear);

  return (
    <div className="calendar-year-control">
      <button
        aria-label={`${labels.previousYear} ${selectedYear - 1}`}
        className="calendar-year-control__arrow"
        disabled={yearIndex <= 0}
        onClick={() => onChange(selectedYear - 1)}
        type="button"
      >
        ‹
      </button>
      <label className="calendar-year-control__select" htmlFor="calendar-year">
        <span className="visually-hidden">{labels.year}</span>
        <select id="calendar-year" onChange={(event) => onChange(Number(event.currentTarget.value))} value={selectedYear}>
          {availableYears.map((year) => <option key={year} value={year}>{year}</option>)}
        </select>
      </label>
      <button
        aria-label={`${labels.nextYear} ${selectedYear + 1}`}
        className="calendar-year-control__arrow"
        disabled={yearIndex === availableYears.length - 1}
        onClick={() => onChange(selectedYear + 1)}
        type="button"
      >
        ›
      </button>
    </div>
  );
}

export function SiteHeader({ labels, locale }: SiteHeaderProps) {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const {
    currentYear,
    selectedYear,
    setSelectedYear,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    setMobileDrawerContentTarget,
  } = useCalendarYear();
  const calendarLabels = getDictionary(locale).calendar;
  const homeHref = `/${locale}` as Route;
  const isHomeActive = pathname === `/${locale}` || pathname === `/${locale}/home`;

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncTheme = () => {
      const savedTheme = document.documentElement.dataset.theme;
      setIsDarkTheme(savedTheme ? savedTheme === "dark" : media.matches);
    };
    const syncSystemTheme = (event: MediaQueryListEvent) => {
      const hasManualPreference = document.cookie
        .split(";")
        .some((part) => part.trim().startsWith("zonevacances-theme="));

      if (!hasManualPreference) {
        setIsDarkTheme(event.matches);
      }
    };

    syncTheme();
    media.addEventListener("change", syncSystemTheme);
    return () => media.removeEventListener("change", syncSystemTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = isDarkTheme ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    document.cookie = `zonevacances-theme=${nextTheme}; path=/; max-age=31536000; samesite=lax`;
    setIsDarkTheme(nextTheme === "dark");
  };

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current !== null) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const openLanguageMenu = () => {
    clearCloseTimeout();
    setIsLanguageMenuOpen(true);
  };

  const closeLanguageMenu = () => {
    clearCloseTimeout();
    setIsLanguageMenuOpen(false);
  };

  const scheduleLanguageMenuClose = () => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      setIsLanguageMenuOpen(false);
      closeTimeoutRef.current = null;
    }, 120);
  };

  useEffect(() => {
    return () => {
      clearCloseTimeout();
    };
  }, []);

  useEffect(() => {
    if (!isLanguageMenuOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isLanguageMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__mobile">
          <button
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? labels.closeMenu : labels.openMenu}
            className="site-burger"
            onClick={() => {
              setIsMobileMenuOpen((current) => !current);
            }}
            type="button"
          >
            <BurgerIcon open={isMobileMenuOpen} />
          </button>

          <Link className="site-brand site-brand--mobile" href={homeHref}>
            <span className="site-brand__copy">
              <span className="site-brand__text">ZoneVacances</span>
              <span className="site-brand__beta">Beta</span>
            </span>
          </Link>
        </div>

        <Link className="site-brand site-brand--desktop" href={homeHref}>
          <span className="site-brand__logo">
            <BrandLogo className="site-brand__logo-svg" />
          </span>
          <span className="site-brand__copy">
            <span className="site-brand__text">ZoneVacances</span>
            <span className="site-brand__beta">Beta</span>
          </span>
        </Link>

        {isHomeActive ? (
          <CalendarYearControl
            currentYear={currentYear}
            labels={calendarLabels}
            onChange={setSelectedYear}
            selectedYear={selectedYear}
          />
        ) : null}

        <nav aria-label={labels.primaryNavigation} className="site-nav" ref={navRef}>
          <div
            className={`site-menu${isLanguageMenuOpen ? " is-open" : ""}`}
            onBlur={(event) => {
              const nextTarget = event.relatedTarget as Node | null;

              if (!event.currentTarget.contains(nextTarget)) {
                closeLanguageMenu();
              }
            }}
            onMouseEnter={openLanguageMenu}
            onMouseLeave={scheduleLanguageMenuClose}
          >
            <button
              aria-expanded={isLanguageMenuOpen}
              aria-haspopup="true"
              className="site-menu__trigger"
              type="button"
              onClick={() => {
                if (isLanguageMenuOpen) {
                  closeLanguageMenu();
                  return;
                }

                openLanguageMenu();
              }}
              onFocus={openLanguageMenu}
            >
              <span className="site-menu__trigger-label">
                <GlobeIcon />
                {labels.language}
              </span>
              <ChevronIcon />
            </button>

            <div
              aria-hidden={!isLanguageMenuOpen}
              className="site-menu__panel"
              onMouseEnter={openLanguageMenu}
              onMouseLeave={scheduleLanguageMenuClose}
            >
              <p className="site-menu__label">{labels.selectLanguage}</p>
              <div className="site-menu__list">
                {SUPPORTED_LOCALES.map((nextLocale) => (
                  <Link
                    className="site-menu__item"
                    href={replaceLocaleInPath(pathname, nextLocale) as Route}
                    key={nextLocale}
                    onClick={() => {
                      setPreferredLocale(nextLocale);
                      closeLanguageMenu();
                    }}
                    tabIndex={isLanguageMenuOpen ? 0 : -1}
                  >
                    {getLanguageNativeLabel(nextLocale)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <button
          aria-label={isDarkTheme ? labels.switchToLightTheme : labels.switchToDarkTheme}
          className="theme-toggle"
          onClick={toggleTheme}
          title={isDarkTheme ? labels.switchToLightTheme : labels.switchToDarkTheme}
          type="button"
        >
          <svg
            aria-hidden="true"
            className="theme-toggle__icon theme-toggle__icon--sun"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.7" />
            <path
              d="M12 2.5v2.1M12 19.4v2.1M4.5 4.5L6 6m12 12 1.5 1.5M2.5 12h2.1m14.8 0h2.1M4.5 19.5 6 18m12-12 1.5-1.5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.7"
            />
          </svg>
          <svg
            aria-hidden="true"
            className="theme-toggle__icon theme-toggle__icon--moon"
            viewBox="0 0 24 24"
          >
            <path
              d="M20.1 15.1A8.2 8.2 0 0 1 8.9 3.9 8.4 8.4 0 1 0 20.1 15.1Z"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.7"
            />
          </svg>
        </button>
      </div>

      <div
        aria-hidden={!isMobileMenuOpen}
        className={`mobile-drawer-backdrop${isMobileMenuOpen ? " is-open" : ""}`}
        onClick={() => {
          setIsMobileMenuOpen(false);
        }}
      />

      <aside className={`mobile-drawer${isMobileMenuOpen ? " is-open" : ""}`}>
        <div className="mobile-drawer__header">
          <p className="mobile-drawer__title">ZoneVacances</p>
          <button
            aria-label={labels.closeMenu}
            className="mobile-drawer__close"
            onClick={() => {
              setIsMobileMenuOpen(false);
            }}
            type="button"
          >
            <BurgerIcon open />
          </button>
        </div>

        <div className="mobile-drawer__dashboard-content" ref={setMobileDrawerContentTarget} />

        <div className="mobile-drawer__section">
          <p className="mobile-drawer__label">{labels.selectLanguage}</p>
          <div className="mobile-drawer__languages">
            {SUPPORTED_LOCALES.map((nextLocale) => (
              <Link
                className={`mobile-drawer__language${locale === nextLocale ? " is-active" : ""}`}
                href={replaceLocaleInPath(pathname, nextLocale) as Route}
                key={`mobile-lang-${nextLocale}`}
                onClick={() => {
                  setPreferredLocale(nextLocale);
                  setIsMobileMenuOpen(false);
                }}
              >
                {getLanguageNativeLabel(nextLocale)}
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </header>
  );
}
