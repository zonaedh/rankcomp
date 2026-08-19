import { ScannedSiteData } from "./siteScanner";
import { PageSpeedMetrics } from "./pagespeed";
import { MetaAdsIntelligence } from "./metaAds";
import { GoogleAdsIntelligence } from "./googleAds";

export interface AISummaryData {
  headline: string;
  executiveSummary: string;
  opportunityValue: string;
  quickWin: string;
  strengths: string[];
  vulnerabilities: string[];
  recommendedCounterStrategy: string;
  adHookIdea: string;
  actionPlan: {
    step1_immediate: string;
    step2_shortTerm: string;
    step3_scale: string;
  };
  threatLevel: "High Threat" | "Moderate Threat" | "Low Threat";
  engineUsed: "groq" | "gemini" | "openai" | "heuristic";
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
  const groqKey = process.env.GROQ_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  const openAiKey = process.env.OPENAI_API_KEY;

  // 1. Primary Engine: Ultra-Fast Groq AI Cloud
  if (groqKey) {
    try {
      const groqResult = await callGroqAPI(groqKey, input);
      if (groqResult) return { ...groqResult, engineUsed: "groq" };
    } catch (err) {
      console.warn("[AI Service] Groq API call failed, falling back to secondary engine:", err);
    }
  }

  // 2. Secondary Fallback Engine: Google Gemini Flash
  if (geminiKey) {
    try {
      const geminiResult = await callGeminiAPI(geminiKey, input);
      if (geminiResult) return { ...geminiResult, engineUsed: "gemini" };
    } catch (err) {
      console.warn("[AI Service] Gemini API call failed, falling back to heuristic engine:", err);
    }
  }

  // 3. Tertiary Fallback Engine: OpenAI
  if (openAiKey) {
    try {
      const openAiResult = await callOpenAI(openAiKey, input);
      if (openAiResult) return { ...openAiResult, engineUsed: "openai" };
    } catch (err) {
      console.warn("[AI Service] OpenAI API call failed, falling back to heuristic engine:", err);
    }
  }

  // 4. Deterministic Expert Heuristic Synthesizer (Guaranteed Fallback)
  return {
    ...generateHeuristicSummary(input),
    engineUsed: "heuristic",
  };
}

function buildPrompt(input: AIInputData): string {
  return `
You are a practical, high-impact business growth advisor and competitor intelligence strategist.
Your task is to analyze this competitor audit for "${input.brandName}" (${input.domain}) and write a clear, actionable summary.

AUDIT DATA:
- Website Platform: ${input.scan.techStack.cmsOrPlatform} (E-Commerce: ${input.scan.techStack.hasEcommerce ? "Yes" : "No"})
- Website Load Speed on Phones: ${input.pageSpeed.mobileScore}/100 (Time to load: ${input.pageSpeed.fcp || "Standard"})
- Website Load Speed on Computers: ${input.pageSpeed.desktopScore}/100
- Facebook & Instagram Ads: ${input.metaAds.isRunning ? `Running ${input.metaAds.activeCount} active ads (Est. spend: ${input.metaAds.estimatedMonthlySpend})` : "Zero active social ads detected"}
- Google Search Ads: ${input.googleAds.isRunning ? `Active (${input.googleAds.detectedKeywordsCount} bidding keywords, ${input.googleAds.searchImpressionShare})` : "Zero Google Search ads detected"}
- Top Product Keywords: ${input.scan.keywords.slice(0, 5).join(", ") || "General products"}
- Business Description: "${input.scan.metaDescription}"

CRITICAL RULES FOR WRITING:
1. USE SIMPLE, PLAIN ENGLISH (Grade 7-8 reading level). Avoid complex technical jargon and robotic acronyms (NEVER use words like "LCP", "FCP", "CLS", "DOM tags", or "conquest bidding").
2. EXPLAIN EVERYTHING IN TERMS OF MONEY, SALES, AND CUSTOMERS:
   - If phone speed is low, explain that visitors get impatient and leave before buying.
   - If Google Search ads are missing, explain that people searching to buy on Google can easily be captured by competitors.
   - If Facebook/Instagram ads are active, explain how they are actively bringing in new customers every day.
3. PROVIDE A COPY-PASTE READY AD HOOK: A catchy, ready-to-use 1-sentence headline or hook that a competitor could run to win their customers.
4. PROVIDE A 3-STEP ACTION ROADMAP (Day 1-7, Day 14-30, Day 60+).

Respond strictly with valid JSON with this exact schema:
{
  "headline": "A punchy, clear 6-10 word summary headline highlighting the biggest business opening",
  "opportunityValue": "Estimated monthly revenue or customer traffic opportunity (e.g. '$15,000 – $35,000 / mo')",
  "quickWin": "An immediate 7-day tactical move in simple words to start winning customers from them",
  "threatLevel": "High Threat" | "Moderate Threat" | "Low Threat",
  "strengths": [
    "Simple sentence explaining what they do well (e.g. active social ads, fast loading, recognizable brand)",
    "Another clear strength in plain English"
  ],
  "vulnerabilities": [
    "Simple sentence explaining where they are losing money/customers (e.g. slow phone speed, zero Google ads)",
    "Another clear vulnerability in plain English"
  ],
  "executiveSummary": "2 clear, easy-to-read sentences giving an executive briefing in plain everyday English.",
  "recommendedCounterStrategy": "1-2 simple sentences explaining the best strategy to outsmart them and win market share.",
  "adHookIdea": "A ready-to-use ad headline or hook that highlights what you do better (e.g. 'Tired of slow shipping and heavy fabrics? Try our breathable organic linen — delivered in 48 hours.')",
  "actionPlan": {
    "step1_immediate": "Day 1-7: Simple, high-impact fast action",
    "step2_shortTerm": "Day 14-30: Practical move to build an edge",
    "step3_scale": "Day 60+: Strategy to scale and dominate"
  }
}
Do not include backticks, markdown markers, or preamble. Return only raw JSON.`;
}

async function callGroqAPI(apiKey: string, input: AIInputData): Promise<Omit<AISummaryData, "engineUsed"> | null> {
  const prompt = buildPrompt(input);

  const candidateModels = [
    "openai/gpt-oss-120b",
    "openai/gpt-oss-20b",
    "groq/compound-mini",
    "llama-3.3-70b-versatile",
    "llama-3.1-8b-instant",
  ];

  for (const model of candidateModels) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: "system",
              content:
                "You are an elite business growth coach and competitive strategist. Always respond in clear, simple, plain English in valid JSON format.",
            },
            { role: "user", content: prompt },
          ],
          response_format: { type: "json_object" },
          temperature: 0.2,
        }),
        signal: AbortSignal.timeout(8000),
      });

      if (!res.ok) continue;

      const data = await res.json();
      const content = data?.choices?.[0]?.message?.content;
      if (!content) continue;

      const parsed = JSON.parse(content.trim().replace(/^```json/, "").replace(/```$/, ""));
      return sanitizeAIResponse(parsed, input);
    } catch {
      // Continue to next model or fallback
    }
  }

  return null;
}

async function callGeminiAPI(apiKey: string, input: AIInputData): Promise<Omit<AISummaryData, "engineUsed"> | null> {
  const prompt = buildPrompt(input);
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
        signal: AbortSignal.timeout(9000),
      });

      if (!res.ok) continue;

      const data = await res.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) continue;

      const parsed = JSON.parse(rawText.trim().replace(/^```json/, "").replace(/```$/, ""));
      return sanitizeAIResponse(parsed, input);
    } catch {
      // try next model fallback
    }
  }

  return null;
}

async function callOpenAI(apiKey: string, input: AIInputData): Promise<Omit<AISummaryData, "engineUsed"> | null> {
  const prompt = buildPrompt(input);

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
  return sanitizeAIResponse(parsed, input);
}

function sanitizeAIResponse(parsed: any, input: AIInputData): Omit<AISummaryData, "engineUsed"> {
  const fallback = generateHeuristicSummary(input);

  const threatLevel: "High Threat" | "Moderate Threat" | "Low Threat" =
    parsed.threatLevel === "High Threat" || parsed.threatLevel === "Moderate Threat" || parsed.threatLevel === "Low Threat"
      ? parsed.threatLevel
      : input.metaAds.isRunning && input.pageSpeed.mobileScore > 80
      ? "High Threat"
      : input.metaAds.isRunning || input.googleAds.isRunning
      ? "Moderate Threat"
      : "Low Threat";

  return {
    headline: parsed.headline || fallback.headline,
    opportunityValue: parsed.opportunityValue || fallback.opportunityValue,
    quickWin: parsed.quickWin || fallback.quickWin,
    threatLevel,
    strengths: Array.isArray(parsed.strengths) && parsed.strengths.length > 0 ? parsed.strengths.slice(0, 2) : fallback.strengths,
    vulnerabilities: Array.isArray(parsed.vulnerabilities) && parsed.vulnerabilities.length > 0 ? parsed.vulnerabilities.slice(0, 2) : fallback.vulnerabilities,
    executiveSummary: parsed.executiveSummary || fallback.executiveSummary,
    recommendedCounterStrategy: parsed.recommendedCounterStrategy || fallback.recommendedCounterStrategy,
    adHookIdea: parsed.adHookIdea || fallback.adHookIdea,
    actionPlan: {
      step1_immediate: parsed.actionPlan?.step1_immediate || fallback.actionPlan.step1_immediate,
      step2_shortTerm: parsed.actionPlan?.step2_shortTerm || fallback.actionPlan.step2_shortTerm,
      step3_scale: parsed.actionPlan?.step3_scale || fallback.actionPlan.step3_scale,
    },
  };
}

function generateHeuristicSummary(input: AIInputData): Omit<AISummaryData, "engineUsed"> {
  const { brandName, pageSpeed, metaAds, googleAds, scan } = input;
  const strengths: string[] = [];
  const vulnerabilities: string[] = [];

  // Evaluate Meta Ads
  if (metaAds.isRunning) {
    strengths.push(
      `Running ${metaAds.activeCount}+ active ads on ${metaAds.primaryPlatform} to bring in fresh customers every week.`
    );
  } else {
    vulnerabilities.push(
      `No active Facebook or Instagram ads detected, missing out on social discovery and retargeting.`
    );
  }

  // Evaluate Google Ads
  if (googleAds.isRunning) {
    strengths.push(
      `Defending Google Search traffic with ${googleAds.detectedKeywordsCount} active bidding keywords.`
    );
  } else {
    vulnerabilities.push(
      `Zero Google Search ads active, allowing competitors to show up above them when shoppers search for their products.`
    );
  }

  // Evaluate PageSpeed
  if (pageSpeed.mobileScore >= 80) {
    strengths.push(
      `Fast phone loading speed (${pageSpeed.mobileScore}/100) that gives shoppers a quick, smooth checkout experience.`
    );
  } else {
    vulnerabilities.push(
      `Slow loading speed on phones (${pageSpeed.mobileScore}/100), causing an estimated 15-25% of mobile visitors to leave before buying.`
    );
  }

  // Opportunity value & headline generation
  let opportunityValue = "$12,000 – $28,000 / mo";
  let quickWin = `Launch a fast mobile comparison landing page targeting their top product searches.`;
  let threatLevel: "High Threat" | "Moderate Threat" | "Low Threat" = "Moderate Threat";

  let headline = "";
  if (metaAds.isRunning && pageSpeed.mobileScore < 75) {
    headline = `Active Social Ads Hampered by Slow Phone Checkout Speed`;
    opportunityValue = "$22,000 – $45,000 / mo";
    quickWin = `Capture their bouncing mobile shoppers with faster lightweight landing pages.`;
    threatLevel = "Moderate Threat";
  } else if (!metaAds.isRunning && !googleAds.isRunning) {
    headline = `Minimal Paid Advertising Creates an Easy Market Takeover Window`;
    opportunityValue = "$28,000 – $60,000 / mo";
    quickWin = `Launch exact Google Search ads on their popular product names for instant market share.`;
    threatLevel = "Low Threat";
  } else if (pageSpeed.mobileScore >= 80 && (metaAds.isRunning || googleAds.isRunning)) {
    headline = `Strong Digital Brand with Room to Win in Specialized Sub-Categories`;
    opportunityValue = "$18,000 – $38,000 / mo";
    quickWin = `Highlight unique benefits and faster shipping on Instagram and TikTok video ads.`;
    threatLevel = "High Threat";
  } else {
    headline = `Solid Brand Foundation with Clear Gaps in Mobile and Search Ads`;
  }

  // Plain-English Executive Summary
  const executiveSummary = `${brandName} is built on ${scan.techStack.cmsOrPlatform} with ${
    metaAds.isRunning ? `active social advertising scale (${metaAds.estimatedMonthlySpend})` : "minimal social ad activity"
  }. Their phone loading score of ${pageSpeed.mobileScore}/100 ${
    pageSpeed.mobileScore < 75 ? "causes shoppers to drop off during checkout" : "provides a smooth, responsive shopping experience"
  }.`;

  // Recommended Counter Strategy
  let recommendedCounterStrategy = "";
  if (!googleAds.isRunning) {
    recommendedCounterStrategy = `Run Google Search ads targeting "${scan.keywords.slice(0, 3).join(", ") || brandName}" to capture high-intent buyers who can't find them in search results.`;
  } else if (pageSpeed.mobileScore < 75) {
    recommendedCounterStrategy = `Outsmart ${brandName} by pairing targeted product comparison ads with a sub-second phone checkout experience.`;
  } else {
    recommendedCounterStrategy = `Differentiate your brand by focusing on specialized product niches and showcasing video reviews that highlight better quality or faster delivery.`;
  }

  const primaryKeyword = scan.keywords[0] || brandName;
  const adHookIdea = `Looking for a faster, higher-quality alternative for ${primaryKeyword}? See why hundreds of customers switched this month.`;

  const actionPlan = {
    step1_immediate: `Day 1-7: Launch 3 targeted Google Search ads on "${primaryKeyword}" to capture high-intent buyers immediately.`,
    step2_shortTerm: `Day 14-30: Build a sub-second mobile landing page highlighting your unique advantages, pricing, and fast shipping.`,
    step3_scale: `Day 60+: Deploy short-form video ads on Instagram & TikTok to build direct brand loyalty and lower customer acquisition costs.`,
  };

  return {
    headline,
    opportunityValue,
    quickWin,
    threatLevel,
    strengths: strengths.slice(0, 2),
    vulnerabilities: vulnerabilities.slice(0, 2),
    executiveSummary,
    recommendedCounterStrategy,
    adHookIdea,
    actionPlan,
  };
}
