import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0C0A09",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://rankcomp.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "RankComp — Instant Competitor Intelligence & Ad Spying",
    template: "%s | RankComp",
  },
  description:
    "Spy on your competitors' active Meta ads, Google search campaigns, PageSpeed benchmarks, and AI-synthesized strategies in seconds.",
  keywords: [
    "competitor research",
    "meta ads library spy",
    "google ads spy",
    "pagespeed competitor audit",
    "saas competitor intelligence",
    "marketing audit tool",
    "ad creative spy",
  ],
  authors: [{ name: "Zonaed Hossain", url: "https://zonaedhossain.com" }],
  creator: "Zonaed Hossain",
  publisher: "RankComp",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "RankComp",
    title: "RankComp — Instant Competitor Intelligence & Digital Audit",
    description:
      "Uncover active Meta ads, Google Search impression signals, Core Web Vitals speed benchmarks, and tactical counter-strategies.",
  },
  twitter: {
    card: "summary_large_image",
    title: "RankComp — Instant Competitor Intelligence & Ad Spying",
    description:
      "Spy on your competitors' active Meta ads, Google ads, PageSpeed scores, and digital strategies in minutes.",
    creator: "@rankcomp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${montserrat.variable} dark scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('rankcomp_theme');
                  var theme = saved || 'dark';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--bg-base)] text-[var(--text-primary)] antialiased selection:bg-[#F0511F]/30 selection:text-white transition-colors duration-300">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
