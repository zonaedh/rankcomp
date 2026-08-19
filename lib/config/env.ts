/**
 * Production Environment Configuration & Diagnostics
 */

export interface AppConfig {
  isProduction: boolean;
  appUrl: string;
  hasPageSpeedKey: boolean;
  hasGeminiKey: boolean;
  hasGroqKey: boolean;
  hasOpenAiKey: boolean;
  hasMetaToken: boolean;
}

export function getAppConfig(): AppConfig {
  const isProduction = process.env.NODE_ENV === "production";
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  return {
    isProduction,
    appUrl,
    hasPageSpeedKey: Boolean(process.env.PAGESPEED_API_KEY),
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY),
    hasGroqKey: Boolean(process.env.GROQ_API_KEY),
    hasOpenAiKey: Boolean(process.env.OPENAI_API_KEY),
    hasMetaToken: Boolean(process.env.META_ACCESS_TOKEN),
  };
}
