# RankComp — Project State & Architectural Summary
**Last Updated**: August 18, 2026  
**Status**: Production-Ready / Fully Tested & Verified  
**Dev Server**: `npm run dev` (`http://localhost:3000`)

---

## 1. Overview & Core Proposition
1. **Meta Ads & Pixel Intelligence**: 3-Tier Multi-Query Waterfall engine featuring live Meta Ad Library regex parsing (`~XX results` text & JSON extraction), active ad creatives count, format distribution, estimated monthly budget, active copy hooks, and 1-click deep links into the official Meta Ad Library archive.
2. **Google Ads Visibility**: Search network bidding presence, keyword targeting signals, and conversion tag detection (GTM, Google Ads Tag).
3. **PageSpeed & Web Vitals Telemetry**: Lighthouse Core Web Vitals (`FCP`, `LCP`, `CLS`) for both Mobile and Desktop devices.
4. **Plain-English AI Strategic Playbook**: Practical, jargon-free competitor analysis featuring Est. Monthly Opportunity ($), 2-Column Reality Check (What They Do Well vs. Where They Lose Money), 7-Day Quick Attack, Copy-Paste Ready Ad Hook, and 3-Step Action Roadmap generated via Groq AI Cloud (Primary) with Google Gemini Flash fallback.
5. **High-Converting Lead Magnet Engine**: Free 18-page PDF dossier unlock form & 30-min 1:1 strategy consultation booking capturing qualified business leads directly into `/api/lead`.
6. **Exclusive VIP Multi-Social Profile Auto-Detector**: Intercepts direct social links across **Facebook & fb.com**, **TikTok (`tiktok.com`)**, **X / Twitter (`x.com`, `twitter.com`)**, **Pinterest (`pinterest.com`)**, and **LinkedIn (`linkedin.com`)** with a tailored VIP modal capturing leads for platform-specific intelligence dossiers.

---

## 2. Technology Stack & Design System
- **Framework**: Next.js 16.3.1 (App Router + Turbopack)
- **Language**: TypeScript 5+
- **Styling**: Vanilla CSS Variables + Tailwind CSS utility classes
- **Animations**: Framer Motion & canvas-confetti
- **Icons**: Lucide React
- **Theme**: **Default Dark Mode (`#000000` Pure Pitch Black Base + Luxury Porsche Amber Accents)** with **Tactile Sun/Moon Theme Toggle** (`ThemeProvider` with `localStorage` persistence and anti-FOUC inline script in `app/layout.tsx`).

### Design Tokens (`app/globals.css`):
- **Dark Mode (Default)**:
  - Base Background: `--bg-base: #000000` (Pure Pitch Black OLED Canvas)
  - Card Surface: `--surface-card: #0C0C0F` / `--surface: #0A0A0D`
  - Subtle Surface: `--surface-subtle: #0E0E12`
  - Primary Text: `--text-primary: #FDF7EF` (Porsche 50 - Alabaster Cream White for supreme readability & zero glare)
  - Secondary Text: `--text-secondary: #C8BEB5` (Muted Warm Taupe-Zinc)
  - Accent Porsche Amber:
    - `50`: `#FDF7EF` (Cream White)
    - `100`: `#F9ECDB` (Champagne)
    - `200`: `#F3D6B5` (Warm Blush)
    - `300`: `#E7AD72` (Golden Sand)
    - `400`: `#E19456` (Copper Amber)
    - `500`: `#DA7735` (Porsche Primary Brand CTA)
    - `600`: `#CC602A` (Hover Terracotta)
    - `700`: `#A94B25` (Burnished Copper)
    - `950`: `#3B180F` (Deep Espresso)
  - Glass Borders: `--border-theme: rgba(243, 214, 181, 0.08)` & `--border-accent: rgba(225, 148, 86, 0.25)`
  - Smooth Multi-Layered Shadows: `--card-shadow: 0 6px 24px -2px rgba(0,0,0,0.95)`
- **Light Mode**:
  - Base Background: `--bg-base: #FDF7EF` (Porsche 50)
  - Card Surface: `--surface-card: #FFFFFF`
  - Primary Text: `--text-primary: #2C130B` (Porsche 950)

---

## 3. Environment Variables (`.env.local`)
- `PAGESPEED_API_KEY`: Google Cloud PageSpeed Insights v5 Key (`AIzaSyDuO7mZtfLaRndHsSjADVBZYxdrC9t5tmk`)
- `GROQ_API_KEY`: Groq AI Cloud Key for ultra-fast Primary AI Intelligence (`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`)
- `GEMINI_API_KEY`: Google AI Studio Key for Secondary AI Intelligence (`AQ.Ab8RN6KW-82iur9LKCWdNbx0U4U2WVr6BYOPaGmbNpPpESLJOg`)

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
- `lib/services/reportAggregator.ts`: Coordinates Site Scanner, Google PageSpeed, Meta Ads, and AI Strategy engines.
- `lib/services/aiSummary.ts`: 4-tier resilient AI synthesis cascade (Groq LPU $\rightarrow$ Google Gemini Flash $\rightarrow$ OpenAI $\rightarrow$ Deterministic Heuristic).
- `lib/services/metaAds.ts`: 3-tier multi-query waterfall (Brand Name $\rightarrow$ Domain Name $\rightarrow$ Social Handle) with strict e-commerce validation to eliminate false positives.
- `lib/services/siteScanner.ts`: Inspects client DOM for Facebook Pixel, Google Tag Manager, Google Ads conversion tags, schema markup, and technology stacks.
- `lib/services/pageSpeed.ts`: Calls official Google Lighthouse API with fallback realistic heuristics.
- `lib/services/urlValidator.ts`: Detects domains, clean URLs, and Facebook page URL patterns.

---

## 6. How to Resume Work
1. Run `npm run dev` to start the local development server on `http://localhost:3000`.
2. Run `npm run build` anytime to test full production TypeScript & static site build across all 14 routes.
