# RankComp — Project State & Architectural Summary
**Last Updated**: August 18, 2026  
**Status**: Production-Ready / Fully Tested & Verified  
**Dev Server**: `npm run dev` (`http://localhost:3000`)

---

## 1. Overview & Core Proposition
**RankComp** is an automated digital competitor intelligence & lead-generation platform. It allows businesses and agencies to input any competitor's website domain or Facebook page handle to instantly receive a diagnostic audit covering:
1. **Meta Ads & Pixel Intelligence**: Live ad creatives count, format distribution, estimated monthly budget, active copy hooks, and 1-click deep links into the official Meta Ad Library archive.
2. **Google Ads Visibility**: Search network bidding presence, keyword targeting signals, and conversion tag detection (GTM, Google Ads Tag).
3. **PageSpeed & Web Vitals Telemetry**: Lighthouse Core Web Vitals (`FCP`, `LCP`, `CLS`) for both Mobile and Desktop devices.
4. **AI Executive Strategy Synthesis**: Competitive SWOT summary, revenue opportunity estimation, and actionable counter-play generated via Google Gemini Flash AI.
5. **High-Converting Lead Magnet Engine**: Free 18-page PDF dossier unlock form that captures qualified business leads directly into `/api/lead` and logs to `data/leads.json`.
6. **Exclusive VIP Facebook Page Auto-Detector**: Intercepts direct social page links (e.g. `facebook.com/brandname`) with a VIP modal capturing leads for tailored social dossier delivery.

---

## 2. Technology Stack & Design System
- **Framework**: Next.js 16.3.1 (App Router + Turbopack)
- **Language**: TypeScript 5+
- **Styling**: Vanilla CSS Variables + Tailwind CSS utility classes
- **Animations**: Framer Motion & canvas-confetti
- **Icons**: Lucide React
- **Theme**: **Default Dark Mode (`#0C0A09` Deep Obsidian)** with **Tactile Sun/Moon Theme Toggle** (`ThemeProvider` with `localStorage` persistence and anti-FOUC inline script in `app/layout.tsx`).

### Design Tokens (`app/globals.css`):
- **Dark Mode (Default)**:
  - Base Background: `--bg-base: #0C0A09` (OLED Obsidian)
  - Card Surface: `--surface-card: #161210` / `--surface: #14110F`
  - Subtle Surface: `--surface-subtle: #1C1715`
  - Primary Text: `--text-primary: #FBF9F8` (Crisp White)
  - Secondary Text: `--text-secondary: #C4B5B0` (Warm Silver)
  - Accent Coral: `#F0511F` / `#F58458` / `#781E16`
  - Glass Borders: `--border-theme: rgba(255, 255, 255, 0.09)` & `--border-accent: rgba(240, 81, 31, 0.35)`
- **Light Mode**:
  - Base Background: `--bg-base: #FAF8F6`
  - Card Surface: `--surface-card: #FFFFFF`
  - Primary Text: `--text-primary: #1E1715`

---

## 3. Environment Variables (`.env.local`)
- `PAGESPEED_API_KEY`: Google Cloud PageSpeed Insights v5 Key (`AIzaSyDuO7mZtfLaRndHsSjADVBZYxdrC9t5tmk`)
- `GEMINI_API_KEY`: Google AI Studio Key for AI Summary synthesis (`AQ.Ab8RN6KW-82iur9LKCWdNbx0U4U2WVr6BYOPaGmbNpPpESLJOg`)

---

## 4. Complete Route Map (14 Routes Verified)
1. `/` (`app/page.tsx`) — Homepage with Hero Search, 4 Feature Cards, 3-Step How It Works, Social Proof, and Compact Final CTA.
2. `/analyze` (`app/analyze/page.tsx`) — Real-time animated scanning telemetry page with Facebook Page handler.
3. `/report` (`app/report/page.tsx`) — Dynamic live competitor scorecard with 4 intelligence modules and PDF unlock form.
4. `/demo` (`app/demo/page.tsx`) — Pre-cached sample report library (Stride Apparel, Gymshark, Glossier).
5. `/privacy` (`app/privacy/page.tsx`) — Comprehensive Privacy Policy & data protection terms.
6. `/terms` (`app/terms/page.tsx`) — Terms of Service & acceptable use policies.
7. `/api/analyze` (`app/api/analyze/route.ts`) — Real-time multi-threaded audit aggregation engine.
8. `/api/lead` (`app/api/lead/route.ts`) — Lead capture handler saving leads to `data/leads.json`.
9. `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` — SEO & PWA assets.

---

## 5. Key Services & Logic
- `lib/services/reportAggregator.ts`: Coordinates Site Scanner, Google PageSpeed, Meta Ads, and Gemini AI.
- `lib/services/metaAds.ts`: 3-tier multi-query waterfall (Brand Name $\rightarrow$ Domain Name $\rightarrow$ Social Handle) with strict e-commerce validation to eliminate false positives.
- `lib/services/geminiService.ts`: Uses `@google/genai` with `gemini-flash-latest` model to generate structured SWOT and executive summaries.
- `lib/services/siteScanner.ts`: Inspects client DOM for Facebook Pixel, Google Tag Manager, Google Ads conversion tags, schema markup, and technology stacks.
- `lib/services/pageSpeed.ts`: Calls official Google Lighthouse API with fallback realistic heuristics.
- `lib/services/urlValidator.ts`: Detects domains, clean URLs, and Facebook page URL patterns.

---

## 6. How to Resume Work
1. Run `npm run dev` to start the local development server on `http://localhost:3000`.
2. Run `npm run build` anytime to test full production TypeScript & static site build across all 14 routes.
