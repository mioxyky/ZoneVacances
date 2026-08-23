# Graph Report - ZoneVacances  (2026-08-23)

## Corpus Check
- Corpus is ~14,452 words - fits in a single context window. You may not need a graph.

## Summary
- 351 nodes · 632 edges · 18 communities (14 shown, 4 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Navigation & Locale
- Dashboard & Holiday Data
- Search API & Geo Constants
- Country Pages & Routing
- Legal & Country Components
- Search Page & Type Definitions
- TypeScript Config
- Package Dependencies
- Dev Dependencies
- README Documentation
- France School Map
- Time Formatting
- App Icon SVG
- Root Layout & Env
- ESLint Config
- Next Config
- Next Env

## God Nodes (most connected - your core abstractions)
1. `isLocale()` - 21 edges
2. `getDictionary()` - 18 edges
3. `AppLocale` - 16 edges
4. `compilerOptions` - 16 edges
5. `GET()` - 12 edges
6. `getCountryPageData()` - 12 edges
7. `buildCountdownItem()` - 10 edges
8. `buildFranceZoneCampaigns()` - 10 edges
9. `getLocalizedText()` - 9 edges
10. `getCountryName()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `CountryPage()` --calls--> `getCountryPageData()`  [EXTRACTED]
  app/[locale]/[country]/page.tsx → lib/dashboard-data.ts
- `LocalizedHomePage()` --calls--> `getDictionary()`  [EXTRACTED]
  app/[locale]/home/page.tsx → lib/i18n.ts
- `LocaleLayout()` --calls--> `getDictionary()`  [EXTRACTED]
  app/[locale]/layout.tsx → lib/i18n.ts
- `LegalPage()` --calls--> `isLocale()`  [EXTRACTED]
  app/[locale]/legal/page.tsx → lib/locale.ts
- `LocaleIndexPage()` --calls--> `isLocale()`  [EXTRACTED]
  app/[locale]/page.tsx → lib/locale.ts

## Import Cycles
- None detected.

## Communities (18 total, 4 thin omitted)

### Community 0 - "Navigation & Locale"
Cohesion: 0.08
Nodes (28): AutoRefresh(), REFRESHABLE_PATHS, BrandLogo(), LocaleHtmlUpdater(), RESOURCE_LINKS, SiteFooter(), SiteFooterProps, getLinkIcon() (+20 more)

### Community 1 - "Dashboard & Holiday Data"
Cohesion: 0.12
Nodes (42): API_LANGUAGE_ALLOWLIST, buildApiWindow(), buildCountdownItem(), buildCountryZones(), buildFranceBridgePublicHolidays(), buildFranceCampaignGroupKey(), buildFranceZoneCampaigns(), buildPublicHolidayCards() (+34 more)

### Community 2 - "Search API & Geo Constants"
Cohesion: 0.07
Nodes (39): BELGIUM_COMMUNITY_COLORS, belgiumCommunityByNisCode, BelgiumMapPayload, BestAddressEntry, BestAddressResponse, buildBelgiumApiUrl(), buildBelgiumMunicipalitySuggestions(), buildFrenchCommuneSuggestion() (+31 more)

### Community 3 - "Country Pages & Routing"
Cohesion: 0.08
Nodes (32): CountryPage(), dynamic, CountryPage(), dynamic, LocalizedHomePage(), LocaleLayout(), LocaleIndexPage(), EuropeMap() (+24 more)

### Community 4 - "Legal & Country Components"
Cohesion: 0.10
Nodes (24): getTermsContent(), LegalPage(), TermsContent, TermsSection, PolicyPage(), BELGIUM_COMMUNITY_FILL_BY_CODE, BELGIUM_COMMUNITY_PATHS, BelgiumCommunityCode (+16 more)

### Community 5 - "Search Page & Type Definitions"
Cohesion: 0.10
Nodes (24): getSearchIntro(), getSearchLabels(), getSearchTypeLabels(), SearchPage(), DEFAULT_LABELS, DEFAULT_TYPE_LABELS, SearchPageClient(), CountdownItem (+16 more)

### Community 6 - "TypeScript Config"
Cohesion: 0.07
Nodes (27): dom, dom.iterable, esnext, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts (+19 more)

### Community 7 - "Package Dependencies"
Cohesion: 0.08
Nodes (25): luxon, next, dependencies, luxon, next, react, react-dom, @svg-maps/france.departments (+17 more)

### Community 8 - "Dev Dependencies"
Cohesion: 0.12
Nodes (17): eslint, eslint-config-next, @eslint/eslintrc, devDependencies, eslint, eslint-config-next, @eslint/eslintrc, @types/luxon (+9 more)

### Community 9 - "README Documentation"
Cohesion: 0.16
Nodes (14): API Geo, Belgium, calendrier.api.gouv.fr, Education France, France, Geocoding Search, Luxon, Next.js 16 (+6 more)

### Community 10 - "France School Map"
Cohesion: 0.20
Nodes (9): FranceMapDefinition, FranceMapLocation, FranceSchoolMap(), MAP_FILL_BY_TONE, metropolitanDepartments, REGION_TONE_BY_MAP_ID, typedFranceDepartmentsMap, typedFranceRegionsMap (+1 more)

### Community 11 - "Time Formatting"
Cohesion: 0.47
Nodes (8): buildTargetDateTime(), formatDateLabel(), formatFullRange(), formatSameMonthRange(), formatSameYearRange(), formatSingleDay(), getLocaleText(), getLuxonLocale()

### Community 12 - "App Icon SVG"
Cohesion: 0.29
Nodes (7): Blue Indicator, Calendar Grid Layout, Color Coded Indicators, Grey Indicator, Orange Indicator, Red Indicator, App Icon SVG

## Knowledge Gaps
- **138 isolated node(s):** `dynamic`, `dynamic`, `TermsSection`, `TermsContent`, `dynamic` (+133 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `AppLocale` connect `Navigation & Locale` to `Dashboard & Holiday Data`, `Search API & Geo Constants`, `Country Pages & Routing`, `Legal & Country Components`, `Search Page & Type Definitions`, `Time Formatting`?**
  _High betweenness centrality (0.055) - this node is a cross-community bridge._
- **Why does `isLocale()` connect `Country Pages & Routing` to `Navigation & Locale`, `Search API & Geo Constants`, `Legal & Country Components`, `Search Page & Type Definitions`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Why does `getDictionary()` connect `Legal & Country Components` to `Navigation & Locale`, `Dashboard & Holiday Data`, `Country Pages & Routing`, `Search Page & Type Definitions`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **What connects `dynamic`, `dynamic`, `TermsSection` to the rest of the system?**
  _138 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Navigation & Locale` be split into smaller, more focused modules?**
  _Cohesion score 0.08084163898117387 - nodes in this community are weakly interconnected._
- **Should `Dashboard & Holiday Data` be split into smaller, more focused modules?**
  _Cohesion score 0.11627906976744186 - nodes in this community are weakly interconnected._
- **Should `Search API & Geo Constants` be split into smaller, more focused modules?**
  _Cohesion score 0.07439024390243902 - nodes in this community are weakly interconnected._