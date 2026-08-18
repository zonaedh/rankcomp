# 🚀 RankComp — Competitor Intelligence & Lead Magnet Tool

**RankComp** is an automated digital competitor intelligence and lead-generation platform. It allows digital agencies, founders, and e-commerce brands to enter any competitor's website domain or Facebook page handle to instantly generate an in-depth audit covering:

- 📣 **Meta Ads & Pixel Intelligence**: Live ad variations count, estimated monthly spend, creative format distribution, live copywriting angles, and 1-click deep links to the official Meta Ad Library archive.
- 🔍 **Google Ads Visibility**: Search network presence, high-intent keyword targeting signals, and conversion tracking detection (GTM, Google Ads Tag).
- ⚡ **PageSpeed & Web Vitals Telemetry**: Lighthouse Core Web Vitals (`FCP`, `LCP`, `CLS`) for both Mobile and Desktop.
- 🤖 **AI Strategy Synthesis**: SWOT analysis, market opportunity value estimation, and actionable 90-day counter-play generated via Google Gemini AI.
- 🎁 **High-Converting Lead Magnet**: Automated 18-page PDF dossier unlock form that captures qualified business leads directly into `/api/lead`.
- 👑 **Exclusive Facebook Page Detector**: Automatically detects direct social links (`facebook.com/page`) and presents a VIP modal to capture high-intent leads for social dossiers.

---

## 🎨 Design System
- **Default Theme**: Obsidian Dark Mode (`#0C0A09`) with luminous coral (`#F0511F` / `#781E16`) gradients and frosted glass borders.
- **Theme Switcher**: Tactile Sun/Moon (☀️ / 🌙) toggle button in the Navbar with smooth animations and `localStorage` persistence.
- **Responsive**: Fully responsive from mobile devices to ultrawide displays.

---

## 🛠️ Tech Stack
- **Framework**: Next.js 16 (App Router + Turbopack)
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS & CSS Variables
- **Animations**: Framer Motion & canvas-confetti
- **Icons**: Lucide React
- **AI Engine**: Google Gemini AI Studio (`@google/genai`)
- **Performance Engine**: Google Cloud PageSpeed Insights API v5

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/zonaedh/rankcomp.git
cd rankcomp
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your API keys in `.env.local`:
```env
PAGESPEED_API_KEY=your_google_pagespeed_api_key
GEMINI_API_KEY=your_google_gemini_api_key
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Build for Production
```bash
npm run build
npm run start
```

---

## 📄 License & Author
Created with ❤️ by **Zonaed Hossain** ([zonaedhossain.com](https://zonaedhossain.com)). All rights reserved.
