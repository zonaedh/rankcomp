import { ScannedSiteData } from "./siteScanner";
import { PageSpeedMetrics } from "./pagespeed";
import { MetaAdsIntelligence } from "./metaAds";
import { GoogleAdsIntelligence } from "./googleAds";

export interface AISummaryData {
  headline: string;
  strengths: string[];
  vulnerabilities: string[];
  executiveSummary: string;
  recommendedCounterStrategy: string;
  opportunityValue?: string;
  quickWin?: string;
  engineUsed: "gemini" | "openai" | "heuristic";
}

interface AIInputData {
  domain: string;
  brandName: string;
  scan: ScannedSiteData;
  pageSpeed: PageSpeedMetrics;
  metaAds: MetaAdsIntelligence;
  googleAds: GoogleAdsIntelligence;
}

export async function generateAISummary(input: AIInputData): Promise<AISummaryData> {
  const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  const openAiKey = process.env.OPENAI_API_KEY;

  if (geminiKey) {
    try {
      const geminiResult = await callGeminiAPI(geminiKey, input);
      if (geminiResult) return { ...geminiResult, engineUsed: "gemini" };
    } catch (err) {
      console.warn("[AI Service] Gemini API call failed, falling back to heuristic engine:", err);
    }
  }

  if (openAiKey) {
    try {
      const openAiResult = await callOpenAI(openAiKey, input);
      if (openAiResult) return { ...openAiResult, engineUsed: "openai" };
    } catch (err) {
      console.warn("[AI Service] OpenAI API call failed, falling back to heuristic engine:", err);
    }
  }

  // Deterministic Expert Heuristic Synthesizer
  return {
    ...generateHeuristicSummary(input),
    engineUsed: "heuristic",
  };
}

async function callGeminiAPI(apiKey: string, input: AIInputData): Promise<Omit<AISummaryData, "engineUsed"> | null> {
  const prompt = `
You are an elite competitive intelligence strategist and digital growth analyst.
Analyze the following live audit data for the competitor "${input.brandName}" (${input.domain}):

- Platform/CMS: ${input.scan.techStack.cmsOrPlatform}
- PageSpeed Score: Mobile ${input.pageSpeed.mobileScore}/100, Desktop ${input.pageSpeed.desktopScore}/100 (FCP: ${input.pageSpeed.fcp}, LCP: ${input.pageSpeed.lcp})
- Meta Ads: ${input.metaAds.isRunning ? `Active (${input.metaAds.activeCount} ads on ${input.metaAds.primaryPlatform})` : "No Meta Pixels or Active Ads Detected"}
- Google Ads: ${input.googleAds.isRunning ? `Active (${input.googleAds.detectedKeywordsCount} keywords, ${input.googleAds.searchImpressionShare})` : "Zero Google Ads detected"}
- Detected Trackers: ${Object.entries(input.scan.trackers).filter(([_, v]) => Boolean(v)).map(([k]) => k).join(", ") || "Standard"}
- Target Keywords: ${input.scan.keywords.join(", ") || "General"}
- Meta Description: "${input.scan.metaDescription}"

Respond strictly with valid JSON with this exact schema:
{
  "headline": "A sharp, 6-10 word strategic summary headline emphasizing high-stakes market opportunity",
  "opportunityValue": "Estimated monthly revenue or market traffic opportunity (e.g. '$12,000 – $28,000 / mo')",
  "quickWin": "An immediate 7-day tactical move to gain an unfair edge over this competitor",
  "strengths": [
    "Specific technical or marketing strength based on the data",
    "Another notable strength"
  ],
  "vulnerabilities": [
    "Specific exploitable bottleneck or conversion friction point (e.g. mobile LCP latency, zero paid search defense)",
    "Another actionable marketing vulnerability"
  ],
  "executiveSummary": "2-3 concise, high-value sentences giving an executive briefing of their digital posture and conversion leaks.",
  "recommendedCounterStrategy": "A direct 1-2 sentence counter-move to capture market share and outconvert them."
}
Do not include backticks, markdown markers, or preamble. Return only raw JSON.`;

  // Support models with high availability
  const modelsToTry = ["gemini-flash-latest", "gemini-2.5-flash-lite", "gemini-3.6-flash"];

  for (const model of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      };

      const res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.25,
            responseMimeType: "application/json",
          },
        }),
        signal: AbortSignal.timeout(10000),
      });

      if (!res.ok) {
        continue;
      }

      const data = await res.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) continue;

      const parsed = JSON.parse(rawText.trim().replace(/^```json/, "").replace(/```$/, ""));
      return {
        headline: parsed.headline || `${input.brandName} Competitive Posture Overview`,
        opportunityValue: parsed.opportunityValue || "$14,000 – $32,000 / mo",
        quickWin: parsed.quickWin || "Capture unbidded high-intent search keywords with sub-second landing pages",
        strengths: Array.isArray(parsed.strengths) ? parsed.strengths : ["Established online presence"],
        vulnerabilities: Array.isArray(parsed.vulnerabilities) ? parsed.vulnerabilities : ["Room for performance optimization"],
        executiveSummary: parsed.executiveSummary || `${input.brandName} is active in digital channels with opportunities in funnel acceleration.`,
        recommendedCounterStrategy: parsed.recommendedCounterStrategy || "Target their high-intent search gaps with high-speed landing pages.",
      };
    } catch {
      // try next model fallback
    }
  }

  return null;
}

async function callOpenAI(apiKey: string, input: AIInputData): Promise<Omit<AISummaryData, "engineUsed"> | null> {
  const prompt = `Analyze this competitor audit for ${input.brandName} (${input.domain}):
PageSpeed: Mobile ${input.pageSpeed.mobileScore}/100, Desktop ${input.pageSpeed.desktopScore}/100, LCP: ${input.pageSpeed.lcp}.
Meta Ads: ${input.metaAds.isRunning ? `Active (${input.metaAds.activeCount} ads)` : "Inactive"}.
Google Ads: ${input.googleAds.isRunning ? `Active (${input.googleAds.searchImpressionShare})` : "Inactive"}.
Platform: ${input.scan.techStack.cmsOrPlatform}.
Keywords: ${input.scan.keywords.join(", ")}.

Return JSON with keys: headline, opportunityValue, quickWin, strengths (array), vulnerabilities (array), executiveSummary, recommendedCounterStrategy.`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.3,
    }),
    signal: AbortSignal.timeout(9000),
  });

  if (!res.ok) return null;
  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) return null;

  const parsed = JSON.parse(content);
  return {
    headline: parsed.headline,
    opportunityValue: parsed.opportunityValue || "$12,000 – $28,000 / mo",
    quickWin: parsed.quickWin || "Bid on brand keywords and deploy fast mobile checkout",
    strengths: parsed.strengths || [],
    vulnerabilities: parsed.vulnerabilities || [],
    executiveSummary: parsed.executiveSummary || "",
    recommendedCounterStrategy: parsed.recommendedCounterStrategy || "",
  };
}

function generateHeuristicSummary(input: AIInputData): Omit<AISummaryData, "engineUsed"> {
  const { brandName, pageSpeed, metaAds, googleAds, scan } = input;
  const strengths: string[] = [];
  const vulnerabilities: string[] = [];

  // Evaluate Meta Ads
  if (metaAds.isRunning) {
    strengths.push(
      `Active Meta ad testing engine with ${metaAds.activeCount}+ concurrent creatives deployed across ${metaAds.primaryPlatform}.`
    );
  } else {
    vulnerabilities.push(
      `Zero active Meta advertising detected, missing out on high-converting social discovery and retargeting.`
    );
  }

  // Evaluate Google Ads
  if (googleAds.isRunning) {
    strengths.push(
      `Defensive search posture with ${googleAds.detectedKeywordsCount} identified bidding terms and conversion tracking.`
    );
  } else {
    vulnerabilities.push(
      `No active Google Ads conversion tags detected, allowing competitors to easily bid on their brand terms with zero defense.`
    );
  }

  // Evaluate PageSpeed
  if (pageSpeed.mobileScore >= 80) {
    strengths.push(
      `Fast mobile experience (Score: ${pageSpeed.mobileScore}/100, LCP: ${pageSpeed.fcp}) that minimizes ad click bounce rates.`
    );
  } else {
    vulnerabilities.push(
      `Mobile performance bottleneck (Score: ${pageSpeed.mobileScore}/100, LCP: ${pageSpeed.lcp}), risking an estimated 15-25% bounce rate on paid traffic.`
    );
  }

  // Opportunity value & headline generation
  let opportunityValue = "$9,500 – $22,000 / mo";
  let quickWin = `Deploy high-converting comparison landing pages with sub-second mobile speed.`;

  let headline = "";
  if (metaAds.isRunning && pageSpeed.mobileScore < 75) {
    headline = `Aggressive Paid Acquisition Hampered by Mobile Speed Latency`;
    opportunityValue = "$18,000 – $38,000 / mo";
    quickWin = `Capture their bouncing mobile ad traffic with faster lightweight landing pages.`;
  } else if (!metaAds.isRunning && !googleAds.isRunning) {
    headline = `Low Paid Presence Creates Immediate Organic & Search Conquest Opportunity`;
    opportunityValue = "$24,000 – $55,000 / mo";
    quickWin = `Launch exact-match Google Search Ads on their top organic terms for instant market share.`;
  } else if (pageSpeed.mobileScore >= 80 && (metaAds.isRunning || googleAds.isRunning)) {
    headline = `High-Efficiency Conversion Engine with Streamlined Acquisition Channels`;
    opportunityValue = "$12,000 – $28,000 / mo";
    quickWin = `Differentiate creative angles on TikTok and Reels while bidding on long-tail alternatives.`;
  } else {
    headline = `Solid Brand Foundation with Critical Funnel Optimization Gaps`;
  }

  // Executive Summary
  const executiveSummary = `${brandName} operates on ${scan.techStack.cmsOrPlatform} with ${
    metaAds.isRunning ? `active paid social scale (${metaAds.estimatedMonthlySpend})` : "minimal social ad activity"
  }. Their mobile Lighthouse score of ${pageSpeed.mobileScore}/100 ${
    pageSpeed.mobileScore < 75 ? "exposes a vulnerable checkout drop-off point" : "delivers solid user responsiveness"
  }.`;

  // Recommended Counter Strategy
  let recommendedCounterStrategy = "";
  if (!googleAds.isRunning) {
    recommendedCounterStrategy = `Deploy conquest Google Search campaigns targeting "${scan.keywords.slice(0, 3).join(", ") || brandName}" to capture high-intent buyers with zero bidding competition.`;
  } else if (pageSpeed.mobileScore < 75) {
    recommendedCounterStrategy = `Outconvert ${brandName} by pairing targeted comparison landing pages with sub-second mobile load times and streamlined checkout flows.`;
  } else {
    recommendedCounterStrategy = `Differentiate creative angles on TikTok and Reels while bidding on their long-tail product alternatives.`;
  }

  return {
    headline,
    opportunityValue,
    quickWin,
    strengths: strengths.slice(0, 2),
    vulnerabilities: vulnerabilities.slice(0, 2),
    executiveSummary,
    recommendedCounterStrategy,
  };
}
