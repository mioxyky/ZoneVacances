import type { AppLocale } from "@/lib/types";

type Dictionary = {
  nav: {
    allLanguages: string;
    availableCountries: string;
    closeMenu: string;
    countries: string;
    language: string;
    openMenu: string;
    primaryNavigation: string;
    selectLanguage: string;
    switchToDarkTheme: string;
    switchToLightTheme: string;
  };
  calendar: {
    filter: string;
    title: string;
    year: string;
    maps: string;
    communityFrance: string;
    communityFlemish: string;
    communityGerman: string;
    locate: string;
    locating: string;
    locationUnavailable: string;
    locationDetected: string;
    openMaps: string;
    closeMaps: string;
    previousYear: string;
    nextYear: string;
    empty: string;
    noneSelected: string;
    publicHolidayFrance: string;
    publicHolidayBelgium: string;
    france: string;
    belgium: string;
  };
  home: {
    helper: string;
    mapAriaLabel: string;
    subtitle: string;
    title: string;
  };
  countriesPage: {
    openCountry: string;
    subtitle: string;
    title: string;
  };
  languagePage: {
    auto: string;
    current: string;
    subtitle: string;
    title: string;
  };
  countryPage: {
    belgiumMapLabel: string;
    details: string;
    franceMapLabel: string;
    nextVacations: string;
    noPublicHolidays: string;
    noRemainingVacations: string;
    noVacationData: string;
    otherVacations: string;
    publicHolidays: string;
    remainingVacations: string;
    updatedAt: string;
  };
  legalPage: {
    intro: string;
    placeholderText: string;
    placeholderTitle: string;
    subtitle: string;
    title: string;
  };
  policyPage: {
    analyticsText: string;
    analyticsLinkLabel: string;
    analyticsTitle: string;
    noCollectionText: string;
    noCollectionTitle: string;
    policyLead: string;
    subtitle: string;
    title: string;
  };
  countdown: {
    current: string;
    days: string;
    ended: string;
    hours: string;
    minutes: string;
    past: string;
    remaining: string;
    seconds: string;
    startsIn: string;
    upcoming: string;
  };
  footer: {
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
  common: {
    holiday: string;
    noData: string;
    unavailable: string;
  };
};

const DICTIONARIES: Record<AppLocale, Dictionary> = {
  en: {
    nav: {
      allLanguages: "Languages",
      availableCountries: "Available countries",
      closeMenu: "Close menu",
      countries: "Countries",
      language: "Language",
      openMenu: "Open menu",
      primaryNavigation: "Primary navigation",
      selectLanguage: "Choose language",
      switchToDarkTheme: "Switch to dark theme",
      switchToLightTheme: "Switch to light theme",
    },
    calendar: {
      filter: "Filters",
      title: "School holidays",
      year: "Year",
      maps: "Maps",
      communityFrance: "French Community",
      communityFlemish: "Flemish Community",
      communityGerman: "German-speaking Community",
      locate: "Use my location",
      locating: "Locating…",
      locationUnavailable: "Your area could not be identified from this location.",
      locationDetected: "Detected {zone}; its calendar is selected.",
      openMaps: "Open map menu",
      closeMaps: "Close map menu",
      previousYear: "Previous year",
      nextYear: "Next year",
      empty: "No school holiday dates are available for this year.",
      noneSelected: "Select a calendar to show its holidays.",
      publicHolidayFrance: "FR public holidays",
      publicHolidayBelgium: "BE public holidays",
      france: "France",
      belgium: "Belgium",
    },
    home: {
      helper: "Choose France or Belgium on the map to open the school holiday dashboard.",
      mapAriaLabel: "Interactive map of Europe",
      subtitle: "School holiday map",
      title: "Find your holidays",
    },
    countriesPage: {
      openCountry: "Open country page",
      subtitle: "Browse the France and Belgium dashboards.",
      title: "Countries",
    },
    languagePage: {
      auto: "Browser language detection is enabled.",
      current: "Current language",
      subtitle: "Choose between French, English and Polish.",
      title: "Languages",
    },
    countryPage: {
      belgiumMapLabel: "Detailed map of Belgium by school districts and provinces",
      details: "More details",
      franceMapLabel: "Detailed map of France by school regions",
      nextVacations: "Next school breaks",
      noPublicHolidays: "No upcoming public holidays right now.",
      noRemainingVacations: "No more school breaks remain this year.",
      noVacationData: "School holiday data is temporarily unavailable.",
      otherVacations: "Other breaks",
      publicHolidays: "Public holidays",
      remainingVacations: "Remaining breaks this year",
      updatedAt: "Last sync",
    },
    legalPage: {
      intro:
        "This page will host the detailed terms of use for ZoneVacances. It is kept separate from the use policy so each topic stays clear.",
      placeholderText:
        "The full rules of use, responsibilities and practical details will be added later. In the meantime, the site remains available for informational purposes, and official public sources should remain the reference for sensitive dates.",
      placeholderTitle: "Page in preparation",
      subtitle: "Detailed rules of use will be added here later",
      title: "Terms of use",
    },
    policyPage: {
      analyticsText:
        "The site may use Vercel analytics to view anonymized and aggregated audience information, such as the country of visit, device, browser or operating system. No advertising profile is created by ZoneVacances.",
      analyticsLinkLabel: "Learn more about Vercel Analytics",
      analyticsTitle: "Audience measurement",
      noCollectionText:
        "ZoneVacances does not ask for an account, does not collect personal data directly through forms, and does not sell user data. The site is made available openly so anyone can consult the calendars freely.",
      noCollectionTitle: "We do not collect your personal data directly",
      policyLead:
        "No account, no direct personal data collection, and a site available to everyone.",
      subtitle: "Use policy, transparency and essential information about the site",
      title: "Use policy",
    },
    countdown: {
      current: "Current",
      days: "Days",
      ended: "Ended",
      hours: "Hours",
      minutes: "Minutes",
      past: "Past",
      remaining: "Time left",
      seconds: "Seconds",
      startsIn: "Starts in",
      upcoming: "Upcoming",
    },
    footer: {
      api: "API",
      code: "Code on GitHub",
      copyright: "© 2026 Rinth, Inc.",
      legal: "Legal",
      madeWithPassion: "Made with passion for the community.",
      policy: "Use policy",
      reportIssues: "Report issues",
      resources: "Resources",
      rightsReserved: "All rights reserved.",
      terms: "Terms of use",
    },
    common: {
      holiday: "Public holiday",
      noData: "No data",
      unavailable: "Temporarily unavailable",
    },
  },
  fr: {
    nav: {
      allLanguages: "Langues",
      availableCountries: "Pays disponibles",
      closeMenu: "Fermer le menu",
      countries: "Pays",
      language: "Langue",
      openMenu: "Ouvrir le menu",
      primaryNavigation: "Navigation principale",
      selectLanguage: "Choisir la langue",
      switchToDarkTheme: "Passer au thème sombre",
      switchToLightTheme: "Passer au thème clair",
    },
    calendar: {
      filter: "Filtre",
      title: "Vacances scolaires",
      year: "Année",
      maps: "Cartes",
      communityFrance: "Fédération Wallonie-Bruxelles",
      communityFlemish: "Communauté flamande",
      communityGerman: "Communauté germanophone",
      locate: "Me géolocaliser",
      locating: "Localisation…",
      locationUnavailable: "Impossible de déterminer ta zone avec cette position.",
      locationDetected: "Zone détectée : {zone}. Son calendrier est sélectionné.",
      openMaps: "Ouvrir le menu des cartes",
      closeMaps: "Fermer le menu des cartes",
      previousYear: "Année précédente",
      nextYear: "Année suivante",
      empty: "Aucune date de vacances scolaires n’est disponible pour cette année.",
      noneSelected: "Sélectionne un agenda pour afficher ses vacances.",
      publicHolidayFrance: "Jours fériés FR",
      publicHolidayBelgium: "Jours fériés BE",
      france: "France",
      belgium: "Belgique",
    },
    home: {
      helper: "Choisis la France ou la Belgique sur la carte pour ouvrir le tableau de bord des vacances.",
      mapAriaLabel: "Carte interactive de l'Europe",
      subtitle: "Carte des vacances scolaires",
      title: "Trouve tes vacances",
    },
    countriesPage: {
      openCountry: "Ouvrir la page du pays",
      subtitle: "Parcours les tableaux de bord France et Belgique.",
      title: "Pays",
    },
    languagePage: {
      auto: "La langue du navigateur est detectee automatiquement.",
      current: "Langue actuelle",
      subtitle: "Choisis entre le francais, l'anglais et le polonais.",
      title: "Langues",
    },
    countryPage: {
      belgiumMapLabel: "Carte detaillee de la Belgique par arrondissements scolaires et provinces",
      details: "Plus d'informations",
      franceMapLabel: "Carte detaillee de la France par regions scolaires",
      nextVacations: "Prochaines vacances",
      noPublicHolidays: "Aucun jour ferie a venir pour le moment.",
      noRemainingVacations: "Il ne reste plus de vacances scolaires cette annee.",
      noVacationData: "Les donnees de vacances scolaires sont temporairement indisponibles.",
      otherVacations: "Autres vacances",
      publicHolidays: "Jours feries",
      remainingVacations: "Vacances restantes cette annee",
      updatedAt: "Derniere synchro",
    },
    legalPage: {
      intro:
        "Cette page accueillera les conditions d'utilisation detaillees de ZoneVacances. Elle reste separee de la politique d'utilisation pour garder chaque sujet bien distinct.",
      placeholderText:
        "Les regles completes d'utilisation, les responsabilites et les details pratiques seront ajoutes plus tard. En attendant, le site reste disponible a titre informatif, et les sources publiques officielles restent la reference pour les dates sensibles.",
      placeholderTitle: "Page en preparation",
      subtitle: "Les regles d'utilisation detaillees seront ajoutees ici plus tard",
      title: "Conditions d'utilisation",
    },
    policyPage: {
      analyticsText:
        "Le site peut utiliser les statistiques Vercel pour consulter des informations d'audience anonymisees et agregees, comme le pays de visite, l'appareil, le navigateur ou le systeme d'exploitation. ZoneVacances ne cree aucun profil publicitaire.",
      analyticsLinkLabel: "En savoir plus sur Vercel Analytics",
      analyticsTitle: "Mesure d'audience",
      noCollectionText:
        "ZoneVacances ne demande pas de compte, ne collecte pas directement de donnees personnelles via des formulaires, et ne revend pas de donnees utilisateurs. Le site est mis a disposition librement pour permettre a tout le monde de consulter les calendriers.",
      noCollectionTitle: "Nous ne collectons pas directement vos donnees personnelles",
      policyLead:
        "Pas de compte, pas de collecte directe de donnees personnelles, et un site ouvert a tout le monde.",
      subtitle: "Politique d'utilisation, transparence et informations essentielles sur le site",
      title: "Politique d'utilisation",
    },
    countdown: {
      current: "Actuellement",
      days: "Jours",
      ended: "Termine",
      hours: "Heures",
      minutes: "Minutes",
      past: "Passe",
      remaining: "Temps restant",
      seconds: "Secondes",
      startsIn: "Debut dans",
      upcoming: "A venir",
    },
    footer: {
      api: "API",
      code: "Code sur GitHub",
      copyright: "© 2026 Rinth, Inc.",
      legal: "Legal",
      madeWithPassion: "Fait avec passion pour la communaute.",
      policy: "Politique d'utilisation",
      reportIssues: "Signaler un probleme",
      resources: "Ressources",
      rightsReserved: "Tous droits reserves.",
      terms: "Conditions d'utilisation",
    },
    common: {
      holiday: "Jour ferie",
      noData: "Aucune donnee",
      unavailable: "Temporairement indisponible",
    },
  },
  pl: {
    nav: {
      allLanguages: "Jezyki",
      availableCountries: "Dostepne kraje",
      closeMenu: "Zamknij menu",
      countries: "Kraje",
      language: "Jezyk",
      openMenu: "Otworz menu",
      primaryNavigation: "Nawigacja glowna",
      selectLanguage: "Wybierz jezyk",
      switchToDarkTheme: "Wlacz ciemny motyw",
      switchToLightTheme: "Wlacz jasny motyw",
    },
    calendar: {
      filter: "Filtry",
      title: "Ferie szkolne",
      year: "Rok",
      maps: "Mapy",
      communityFrance: "Wspólnota Francuska Belgii",
      communityFlemish: "Wspólnota Flamandzka",
      communityGerman: "Wspólnota Niemieckojęzyczna",
      locate: "Użyj mojej lokalizacji",
      locating: "Lokalizowanie…",
      locationUnavailable: "Nie udało się ustalić regionu na podstawie tej lokalizacji.",
      locationDetected: "Wykryto {zone}. Ten kalendarz został wybrany.",
      openMaps: "Otworz menu map",
      closeMaps: "Zamknij menu map",
      previousYear: "Poprzedni rok",
      nextYear: "Następny rok",
      empty: "Brak dostepnych terminow ferii szkolnych w tym roku.",
      noneSelected: "Wybierz kalendarz, aby wyświetlić ferie.",
      publicHolidayFrance: "Święta FR",
      publicHolidayBelgium: "Święta BE",
      france: "Francja",
      belgium: "Belgia",
    },
    home: {
      helper: "Wybierz Francje albo Belgie na mapie, aby otworzyc pulpit wakacji szkolnych.",
      mapAriaLabel: "Interaktywna mapa Europy",
      subtitle: "Mapa ferii szkolnych",
      title: "Znajdz swoje wakacje",
    },
    countriesPage: {
      openCountry: "Otworz strone kraju",
      subtitle: "Przegladaj pulpity Francji i Belgii.",
      title: "Kraje",
    },
    languagePage: {
      auto: "Jezyk przegladarki jest wykrywany automatycznie.",
      current: "Aktualny jezyk",
      subtitle: "Wybierz francuski, angielski albo polski.",
      title: "Jezyki",
    },
    countryPage: {
      belgiumMapLabel: "Szczegolowa mapa Belgii wedlug okregow szkolnych i prowincji",
      details: "Wiecej informacji",
      franceMapLabel: "Szczegolowa mapa Francji wedlug regionow szkolnych",
      nextVacations: "Najblizsze ferie",
      noPublicHolidays: "Brak nadchodzacych swiat panstwowych.",
      noRemainingVacations: "W tym roku nie ma juz kolejnych przerw szkolnych.",
      noVacationData: "Dane o feriach szkolnych sa chwilowo niedostepne.",
      otherVacations: "Pozostale wakacje",
      publicHolidays: "Swieta panstwowe",
      remainingVacations: "Pozostale przerwy w tym roku",
      updatedAt: "Ostatnia synchronizacja",
    },
    legalPage: {
      intro:
        "Na tej stronie zostana pozniej opublikowane szczegolowe warunki korzystania z ZoneVacances. Pozostaje ona oddzielona od polityki korzystania, aby kazdy temat byl jasny.",
      placeholderText:
        "Pelne zasady korzystania, odpowiedzialnosci i informacje praktyczne zostana dodane pozniej. Do tego czasu serwis ma charakter informacyjny, a w przypadku waznych dat nalezy opierac sie na oficjalnych zrodlach publicznych.",
      placeholderTitle: "Strona w przygotowaniu",
      subtitle: "Szczegolowe zasady korzystania zostana dodane tutaj pozniej",
      title: "Warunki korzystania",
    },
    policyPage: {
      analyticsText:
        "Strona moze korzystac z analityki Vercel, aby przegladac zanonimizowane i zbiorcze informacje o ruchu, takie jak kraj odwiedzin, urzadzenie, przegladarka czy system operacyjny. ZoneVacances nie tworzy profilu reklamowego.",
      analyticsLinkLabel: "Dowiedz sie wiecej o Vercel Analytics",
      analyticsTitle: "Pomiar ruchu",
      noCollectionText:
        "ZoneVacances nie wymaga konta, nie zbiera bezposrednio danych osobowych przez formularze i nie sprzedaje danych uzytkownikow. Serwis jest dostepny otwarcie, aby kazdy mogl swobodnie sprawdzac kalendarze.",
      noCollectionTitle: "Nie zbieramy bezposrednio Twoich danych osobowych",
      policyLead:
        "Bez konta, bez bezposredniego zbierania danych osobowych i z otwartym dostepem dla wszystkich.",
      subtitle: "Polityka korzystania, przejrzystosc i najwazniejsze informacje o serwisie",
      title: "Polityka korzystania",
    },
    countdown: {
      current: "Aktualnie",
      days: "Dni",
      ended: "Zakonczone",
      hours: "Godziny",
      minutes: "Minuty",
      past: "Minelo",
      remaining: "Pozostalo",
      seconds: "Sekundy",
      startsIn: "Start za",
      upcoming: "Wkrotce",
    },
    footer: {
      api: "API",
      code: "Kod na GitHub",
      copyright: "© 2026 Rinth, Inc.",
      legal: "Legal",
      madeWithPassion: "Stworzone z pasja dla spolecznosci.",
      policy: "Polityka korzystania",
      reportIssues: "Zglos problem",
      resources: "Zasoby",
      rightsReserved: "Wszelkie prawa zastrzezone.",
      terms: "Warunki korzystania",
    },
    common: {
      holiday: "Swieto",
      noData: "Brak danych",
      unavailable: "Tymczasowo niedostepne",
    },
  },
};

const LANGUAGE_NATIVE_LABELS: Record<AppLocale, string> = {
  en: "English",
  fr: "Francais",
  pl: "Polski",
};

export function getDictionary(locale: AppLocale) {
  return DICTIONARIES[locale] ?? DICTIONARIES.fr;
}

export function getLocalizedCountryName(
  isoCode: string,
  locale: AppLocale,
  fallback: string,
) {
  try {
    const displayNames = new Intl.DisplayNames([locale], {
      type: "region",
    });

    return displayNames.of(isoCode.toUpperCase()) ?? fallback;
  } catch {
    return fallback;
  }
}

export function getLanguageNativeLabel(locale: AppLocale) {
  return LANGUAGE_NATIVE_LABELS[locale] ?? locale.toUpperCase();
}
