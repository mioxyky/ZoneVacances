import type { Route } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/navigation/brand-logo";
import { env } from "@/lib/env";
import type { AppLocale } from "@/lib/types";

type SiteFooterProps = {
  labels: {
    api: string;
    code: string;
    copyright: string;
    legal: string;
    madeWithPassion: string;
    policy: string;
    reportIssues: string;
    resources: string;
    rightsReserved: string;
    terms: string;
  };
  locale: AppLocale;
};

const RESOURCE_LINKS = [
  {
    id: "code",
    href: "https://github.com/Noxysoff/ZoneVacances",
  },
  {
    id: "issues",
    href: "https://github.com/Noxysoff/ZoneVacances/issues",
  },
 ] as const;

export function SiteFooter({ labels, locale }: SiteFooterProps) {
  const homeHref = `/${locale}` as Route;
  const legalHref = `/${locale}/legal` as Route;
  const policyHref = `/${locale}/policy` as Route;
  const apiLinks = [
    {
      href: env.belgiumAddressApiSourceUrl,
      label: "BeST Address API",
    },
    {
      href: env.franceSchoolCalendarSourceUrl,
      label: "Education France",
    },
    {
      href: env.francePublicHolidaysSourceUrl,
      label: "Calendrier API Gouv",
    },
    {
      href: env.openHolidaysSourceUrl,
      label: "OpenHolidays API",
    },
    {
      href: env.geoApiSourceUrl,
      label: "API Geo",
    },
  ];

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__columns">
          <div className="site-footer__group">
            <p className="page-footer__label">{labels.api}</p>
            <div className="site-footer__links">
              {apiLinks.filter((link) => link.href.length > 0).map((link) => (
                <a
                  className="footer-link"
                  href={link.href}
                  key={link.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="site-footer__group">
            <p className="page-footer__label">{labels.resources}</p>
            <div className="site-footer__links">
              {RESOURCE_LINKS.map((link) => (
                <a
                  className="footer-link"
                  href={link.href}
                  key={link.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  {link.id === "code" ? labels.code : labels.reportIssues}
                </a>
              ))}
            </div>
          </div>

          <div className="site-footer__group">
            <p className="page-footer__label">{labels.legal}</p>
            <div className="site-footer__links">
              <Link className="footer-link" href={policyHref}>
                {labels.policy}
              </Link>
              <Link className="footer-link" href={legalHref}>
                {labels.terms}
              </Link>
            </div>
          </div>
        </div>

        <div className="site-footer__brand">
          <Link className="site-brand site-brand--footer" href={homeHref}>
            <span className="site-brand__logo">
              <BrandLogo className="site-brand__logo-svg" />
            </span>
            <span className="site-brand__copy">
              <span className="site-brand__text">ZoneVacances</span>
              <span className="site-brand__beta">Beta</span>
            </span>
          </Link>
          <p className="site-footer__brand-line">{labels.copyright}</p>
          <p className="site-footer__brand-line">{labels.rightsReserved}</p>
          <p className="site-footer__brand-line">{labels.madeWithPassion}</p>
        </div>
      </div>
    </footer>
  );
}
