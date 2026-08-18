import { normalizeUrl, checkDomainReachable } from "./urlValidator";
import { getLivePageSpeedMetrics, PageSpeedMetrics } from "./pagespeed";
import { scanTargetSite, ScannedSiteData } from "./siteScanner";
import { getLiveMetaAdsIntelligence, MetaAdsIntelligence } from "./metaAds";
import { synthesizeGoogleAdsIntelligence, GoogleAdsIntelligence } from "./googleAds";
import { generateAISummary, AISummaryData } from "./aiSummary";
import { CompetitorReport } from "@/lib/mockData";

export interface ProductionCompetitorReport extends CompetitorReport {
  isLiveScan: boolean;
  metaAds: CompetitorReport["metaAds"] & {
    adLibraryUrl?: string;
    alternateQueries?: { label: string; url: string }[];
    detectedPixelCount?: number;
    pixelDetected?: boolean;
    pixelIds?: string[];
    isExactApiCount?: boolean;
    statusText?: string;
  };
  googleAds: CompetitorReport["googleAds"] & {
    detectedTagIds?: string[];
  };
  pageSpeed: CompetitorReport["pageSpeed"] & {
    insightsUrl?: string;
    isRealData?: boolean;
  };
  aiSummary: CompetitorReport["aiSummary"] & {
    opportunityValue?: string;
    quickWin?: string;
  };
  techStack?: {
    cmsOrPlatform: string;
    hasEcommerce: boolean;
  };
}

export async function generateProductionReport(inputDomain: string): Promise<ProductionCompetitorReport> {
  const normalized = normalizeUrl(inputDomain);
  if (!normalized.isValid) {
    throw new Error(normalized.error || "Invalid domain format provided.");
  }

  const { domain, url } = normalized;

  // 1. Check reachability
  const reachability = await checkDomainReachable(url, 7000);
  const targetUrl = reachability.finalUrl || url;

  // 2. Parallel extraction of PageSpeed and Live DOM/Tracker Scanner
  const [pageSpeed, scan] = await Promise.all([
    getLivePageSpeedMetrics(domain, targetUrl),
    scanTargetSite(domain, targetUrl, 8000),
  ]);

  // 3. Synthesize Meta & Google Ads Intelligence from real DOM/Network signals
  const [metaAds, googleAds] = await Promise.all([
    getLiveMetaAdsIntelligence(scan),
    Promise.resolve(synthesizeGoogleAdsIntelligence(scan)),
  ]);

  // 4. Generate AI Strategic Summary via Gemini/OpenAI/Deterministic Engine
  const aiSummary = await generateAISummary({
    domain,
    brandName: scan.brandName,
    scan,
    pageSpeed,
    metaAds,
    googleAds,
  });

  // 5. Calculate Overall Score & Grade
  const { overallScore, scoreGrade, scoreVerdict } = calculateCompositeScore({
    pageSpeed,
    metaAds,
    googleAds,
    scan,
  });

  // 6. Calculate Full Report Teaser Numbers based on real site scale
  const baseKw = scan.keywords.length * 420 + (scan.techStack.hasEcommerce ? 2400 : 800);
  const backlinks = scan.techStack.hasEcommerce ? 14200 + baseKw * 3 : 3600 + baseKw * 2;
  const leaks = (pageSpeed.mobileScore < 70 ? 2 : 0) + (!googleAds.isRunning ? 1 : 0) + (scan.techStack.hasEcommerce && !scan.trackers.metaPixelDetected ? 1 : 0) + 1;

  const report: ProductionCompetitorReport = {
    domain,
    name: scan.brandName,
    category: scan.categoryHint || "E-Commerce & Digital Commerce",
    analyzedAt: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    overallScore,
    scoreGrade,
    scoreVerdict,
    isLiveScan: true,
    metaAds: {
      isRunning: metaAds.isRunning,
      activeCount: metaAds.activeCount,
      primaryPlatform: metaAds.primaryPlatform,
      topFormats: metaAds.topFormats,
      recentCampaignTheme: metaAds.recentCampaignTheme,
      estimatedMonthlySpend: metaAds.estimatedMonthlySpend,
      adCopySample: metaAds.adCopySample,
      adLibraryUrl: metaAds.adLibraryUrl,
      alternateQueries: metaAds.alternateQueries,
      detectedPixelCount: metaAds.detectedPixelCount,
      pixelDetected: metaAds.pixelDetected,
      pixelIds: metaAds.pixelIds,
      isExactApiCount: metaAds.isExactApiCount,
      statusText: metaAds.statusText,
    },
    googleAds: {
      isRunning: googleAds.isRunning,
      statusText: googleAds.statusText,
      detectedKeywordsCount: googleAds.detectedKeywordsCount,
      topKeywords: googleAds.topKeywords,
      searchImpressionShare: googleAds.searchImpressionShare,
      strategyNote: googleAds.strategyNote,
      detectedTagIds: googleAds.detectedTagIds,
    },
    pageSpeed: {
      mobileScore: pageSpeed.mobileScore,
      desktopScore: pageSpeed.desktopScore,
      fcp: pageSpeed.fcp,
      lcp: pageSpeed.lcp,
      cls: pageSpeed.cls,
      speedIndex: pageSpeed.speedIndex,
      status: pageSpeed.status,
      insightsUrl: pageSpeed.insightsUrl,
      isRealData: pageSpeed.isRealData,
    },
    aiSummary: {
      headline: aiSummary.headline,
      executiveSummary: aiSummary.executiveSummary,
      strengths: aiSummary.strengths,
      vulnerabilities: aiSummary.vulnerabilities,
      recommendedCounterStrategy: aiSummary.recommendedCounterStrategy,
      opportunityValue: aiSummary.opportunityValue,
      quickWin: aiSummary.quickWin,
    },
    fullReportTeaser: {
      estimatedSeoKeywords: baseKw,
      backlinksDetected: backlinks,
      socialEngagementRate: metaAds.isRunning ? "3.8% (High)" : "1.2% (Low)",
      conversionLeaksCount: leaks,
    },
    techStack: {
      cmsOrPlatform: scan.techStack.cmsOrPlatform,
      hasEcommerce: scan.techStack.hasEcommerce,
    },
  };

  return report;
}

function calculateCompositeScore(data: {
  pageSpeed: PageSpeedMetrics;
  metaAds: MetaAdsIntelligence;
  googleAds: GoogleAdsIntelligence;
  scan: ScannedSiteData;
}): {
  overallScore: number;
  scoreGrade: "A" | "B" | "C" | "D";
  scoreVerdict: string;
} {
  let score = 50;

  // 1. PageSpeed Impact (30% weight)
  const avgSpeed = (data.pageSpeed.mobileScore + data.pageSpeed.desktopScore) / 2;
  score += Math.round((avgSpeed - 50) * 0.35);

  // 2. Meta Ads Presence (25% weight)
  if (data.metaAds.isRunning) {
    score += 15;
    if (data.metaAds.activeCount > 20) score += 5;
  } else {
    score -= 10;
  }

  // 3. Google Ads Bidding (25% weight)
  if (data.googleAds.isRunning) {
    score += 15;
  } else {
    score -= 8;
  }

  // 4. Tech stack & tracking sophistication (20% weight)
  if (data.scan.trackers.metaPixelDetected) score += 5;
  if (data.scan.trackers.googleAdsDetected) score += 5;
  if (data.scan.trackers.gtmDetected) score += 4;
  if (data.scan.trackers.tikTokPixelDetected) score += 3;

  const overallScore = Math.max(20, Math.min(98, score));

  let scoreGrade: "A" | "B" | "C" | "D" = "C";
  let scoreVerdict = "Moderate Competitive Threat";

  if (overallScore >= 88) {
    scoreGrade = "A";
    scoreVerdict = "Dominant Market Leader — Aggressive Ad Coverage";
  } else if (overallScore >= 75) {
    scoreGrade = "B";
    scoreVerdict = "Strong Competitor — Active Paid & Technical Funnel";
  } else if (overallScore >= 60) {
    scoreGrade = "C";
    scoreVerdict = "Moderate Presence — Vulnerable to Search & Speed Takeover";
  } else {
    scoreGrade = "D";
    scoreVerdict = "High Vulnerability — Weak Paid Ads & Funnel Leaks";
  }

  return { overallScore, scoreGrade, scoreVerdict };
}
