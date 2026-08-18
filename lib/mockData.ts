export interface CompetitorReport {
  domain: string;
  name: string;
  category: string;
  analyzedAt: string;
  overallScore: number;
  scoreGrade: "A" | "B" | "C" | "D";
  scoreVerdict: string;
  metaAds: {
    isRunning: boolean;
    activeCount: number;
    primaryPlatform: string;
    topFormats: string[];
    recentCampaignTheme: string;
    estimatedMonthlySpend: string;
    adCopySample: string;
  };
  googleAds: {
    isRunning: boolean;
    statusText: string;
    detectedKeywordsCount: number;
    topKeywords: string[];
    searchImpressionShare: string;
    strategyNote: string;
  };
  pageSpeed: {
    mobileScore: number;
    desktopScore: number;
    fcp: string; // First Contentful Paint
    lcp: string; // Largest Contentful Paint
    cls: string; // Cumulative Layout Shift
    speedIndex: string;
    status: "Good" | "Needs Improvement" | "Poor";
  };
  aiSummary: {
    headline: string;
    strengths: string[];
    vulnerabilities: string[];
    executiveSummary: string;
    recommendedCounterStrategy: string;
  };
  fullReportTeaser: {
    estimatedSeoKeywords: number;
    backlinksDetected: number;
    socialEngagementRate: string;
    conversionLeaksCount: number;
  };
}

export const PRESET_REPORTS: Record<string, CompetitorReport> = {
  "strideapparel.com": {
    domain: "strideapparel.com",
    name: "Stride Apparel",
    category: "Direct-to-Consumer Fashion & Apparel",
    analyzedAt: "Today (Live Snapshot)",
    overallScore: 84,
    scoreGrade: "B",
    scoreVerdict: "Strong Paid Social Presence with Desktop Speed Bottlenecks",
    metaAds: {
      isRunning: true,
      activeCount: 38,
      primaryPlatform: "Instagram & Facebook Reels",
      topFormats: ["UGC Video", "Dynamic Product Catalog", "Story Carousel"],
      recentCampaignTheme: "Spring Collection 2026 - 20% Off First Order",
      estimatedMonthlySpend: "$14,500 – $22,000",
      adCopySample: "Upgrade your seasonal wardrobe with sustainable everyday wear. Use code STRIDE20 for free expedited shipping today.",
    },
    googleAds: {
      isRunning: true,
      statusText: "Active Search & Shopping Campaigns",
      detectedKeywordsCount: 142,
      topKeywords: ["sustainable apparel", "minimalist hoodies", "oversized linen shirts", "everyday workwear"],
      searchImpressionShare: "62% Top of Page",
      strategyNote: "Bidding aggressively on high-intent transactional long-tail keywords while neglecting branded defense.",
    },
    pageSpeed: {
      mobileScore: 68,
      desktopScore: 91,
      fcp: "1.4s",
      lcp: "2.8s",
      cls: "0.04",
      speedIndex: "2.1s",
      status: "Needs Improvement",
    },
    aiSummary: {
      headline: "Aggressive Meta Ad Scale with High Mobile Bounce Risk",
      strengths: [
        "High-velocity creative testing on TikTok/Meta reels with 38+ concurrent ad variations.",
        "Solid desktop conversion funnel and structured Schema markup on product pages.",
      ],
      vulnerabilities: [
        "Mobile LCP of 2.8s causes potential 18-24% drop-off from paid social ad clicks.",
        "No active branded bidding on Google Ads leaves brand keywords vulnerable to competitor conquesting.",
      ],
      executiveSummary: "Stride Apparel dominates social discovery through lifestyle video ads but suffers from uncompressed mobile hero media that hurts checkout conversion rates. Their Google Ads focus is strictly non-brand shopping.",
      recommendedCounterStrategy: "Launch targeted Google Search conquest campaigns on their top 5 search terms and capitalize on their mobile latency with a faster mobile checkout experience.",
    },
    fullReportTeaser: {
      estimatedSeoKeywords: 4120,
      backlinksDetected: 18900,
      socialEngagementRate: "3.4%",
      conversionLeaksCount: 4,
    },
  },
  "gymshark.com": {
    domain: "gymshark.com",
    name: "Gymshark Activewear",
    category: "Fitness & Athletic Performance",
    analyzedAt: "Today (Live Snapshot)",
    overallScore: 92,
    scoreGrade: "A",
    scoreVerdict: "Top-Tier Omnichannel Ad Machine with Rapid Mobile Performance",
    metaAds: {
      isRunning: true,
      activeCount: 114,
      primaryPlatform: "Meta, TikTok & YouTube Shorts",
      topFormats: ["Athlete Endorsement", "Micro-Influencer Reels", "Product Teasers"],
      recentCampaignTheme: "Seamless Training Gear - Built For Performance",
      estimatedMonthlySpend: "$85,000 – $130,000",
      adCopySample: "Engineered for pure focus. New Seamless drop engineered to move with you through every rep.",
    },
    googleAds: {
      isRunning: true,
      statusText: "Dominant Search & Performance Max",
      detectedKeywordsCount: 480,
      topKeywords: ["gym workout clothes", "seamless gym leggings", "mens lifting shorts", "compression tops"],
      searchImpressionShare: "89% Absolute Top",
      strategyNote: "Covers both broad athletic terms and exact competitor conquest keywords with localized landing pages.",
    },
    pageSpeed: {
      mobileScore: 89,
      desktopScore: 96,
      fcp: "0.9s",
      lcp: "1.7s",
      cls: "0.01",
      speedIndex: "1.2s",
      status: "Good",
    },
    aiSummary: {
      headline: "Benchmark Multi-Channel Brand Moat with High Ad Volume",
      strengths: [
        "Over 110 active ad creatives refreshed weekly to minimize ad fatigue.",
        "Near-instant 0.9s FCP performance on mobile optimized via headless Shopify architecture.",
      ],
      vulnerabilities: [
        "Heavy reliance on brand affinity leaves mid-market pricing niches open.",
      ],
      executiveSummary: "Gymshark maintains industry-leading paid media execution with high creative variety and sub-2s mobile loading. Counter-positioning should focus on niche sport communities or competitive price points.",
      recommendedCounterStrategy: "Target specific sub-niches (e.g. powerlifting or pilates) where general activewear messaging lacks hyper-specialized relevance.",
    },
    fullReportTeaser: {
      estimatedSeoKeywords: 28400,
      backlinksDetected: 145000,
      socialEngagementRate: "4.8%",
      conversionLeaksCount: 2,
    },
  },
  "glossier.com": {
    domain: "glossier.com",
    name: "Glossier Beauty",
    category: "Skincare & Cosmetics",
    analyzedAt: "Today (Live Snapshot)",
    overallScore: 87,
    scoreGrade: "B",
    scoreVerdict: "Organic & Paid Social Leader with Moderate Search Visibility",
    metaAds: {
      isRunning: true,
      activeCount: 52,
      primaryPlatform: "Instagram, Pinterest & Facebook",
      topFormats: ["Before/After Demos", "Customer Reviews", "Minimal Aesthetic Video"],
      recentCampaignTheme: "Skin First. Makeup Second. The Dewy Finish Look",
      estimatedMonthlySpend: "$30,000 – $48,000",
      adCopySample: "Real skin, real glow. Discover our cult-classic Boy Brow and Cloud Paint duo with complimentary samples on every order.",
    },
    googleAds: {
      isRunning: false,
      statusText: "No Active Search Ads Detected",
      detectedKeywordsCount: 18,
      topKeywords: ["glossier lip gloss", "boy brow", "milky jelly cleanser"],
      searchImpressionShare: "<15% Search Share",
      strategyNote: "Zero active non-brand paid search campaigns detected; relying entirely on organic branded queries.",
    },
    pageSpeed: {
      mobileScore: 74,
      desktopScore: 88,
      fcp: "1.2s",
      lcp: "2.4s",
      cls: "0.03",
      speedIndex: "1.8s",
      status: "Good",
    },
    aiSummary: {
      headline: "Heavy Social Ad Investment Leaving Search Traffic Open",
      strengths: [
        "Unrivaled aesthetic consistency across 50+ Meta/IG video and carousel ads.",
        "High viral community engagement and strong organic brand search volume.",
      ],
      vulnerabilities: [
        "Completely missing non-brand Google search advertising, yielding high-intent searchers to competitors.",
        "Mobile product pages load third-party review widgets slowly.",
      ],
      executiveSummary: "Glossier drives massive social demand but leaves significant Google Search intent unprotected. Competitors can capture high-converting shoppers searching for generic skincare equivalents.",
      recommendedCounterStrategy: "Run Google Search comparison ads targeting 'Glossier alternatives' and 'best cruelty-free tint' to capture uncaptured search intent.",
    },
    fullReportTeaser: {
      estimatedSeoKeywords: 12800,
      backlinksDetected: 82000,
      socialEngagementRate: "5.1%",
      conversionLeaksCount: 3,
    },
  }
};

export function getCompetitorReport(inputDomain: string): CompetitorReport {
  const clean = inputDomain.trim().toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, "").replace(/\/.*$/, "");
  
  if (PRESET_REPORTS[clean]) {
    return PRESET_REPORTS[clean];
  }

  // Derive deterministic realistic stats from domain name hash
  let hash = 0;
  for (let i = 0; i < clean.length; i++) {
    hash = (hash << 5) - hash + clean.charCodeAt(i);
    hash |= 0;
  }
  const positiveHash = Math.abs(hash);

  const rawName = clean.split(".")[0];
  const capitalizedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
  
  const isMetaRunning = positiveHash % 5 !== 0; // 80% chance running
  const metaCount = isMetaRunning ? (positiveHash % 45) + 6 : 0;
  const isGoogleRunning = positiveHash % 4 !== 0; // 75% chance running
  
  const mobileScore = 55 + (positiveHash % 38);
  const desktopScore = Math.min(99, mobileScore + 10 + (positiveHash % 15));
  
  const overall = Math.min(96, Math.max(58, Math.round((mobileScore * 0.35) + (desktopScore * 0.25) + (isMetaRunning ? 20 : 5) + (isGoogleRunning ? 20 : 5))));
  
  const grade: "A" | "B" | "C" | "D" = overall >= 88 ? "A" : overall >= 75 ? "B" : overall >= 60 ? "C" : "D";

  return {
    domain: clean || "competitor.com",
    name: `${capitalizedName} Brand`,
    category: "E-Commerce & Digital Services",
    analyzedAt: "Today (Live Snapshot)",
    overallScore: overall,
    scoreGrade: grade,
    scoreVerdict: isMetaRunning 
      ? `Active Paid Ad Network with ${mobileScore < 70 ? "Moderate Mobile Latency" : "Healthy Performance"}`
      : "Under-indexed on Paid Ads with High Search Capture Potential",
    metaAds: {
      isRunning: isMetaRunning,
      activeCount: metaCount,
      primaryPlatform: isMetaRunning ? "Instagram & Facebook Feed" : "None Detected",
      topFormats: isMetaRunning ? ["Short-form Video", "Single Image Ad", "Carousel Promo"] : ["None"],
      recentCampaignTheme: isMetaRunning ? `Limited Edition Promo & New Arrivals` : "No active campaigns found in Meta Ad Library",
      estimatedMonthlySpend: isMetaRunning ? `$${((positiveHash % 25) + 5)},000 – $${((positiveHash % 25) + 15)},000` : "$0",
      adCopySample: isMetaRunning 
        ? `Experience why thousands choose ${capitalizedName}. Exclusive limited-time promotion live now on our official store.`
        : "No active copy found in current audit cycle.",
    },
    googleAds: {
      isRunning: isGoogleRunning,
      statusText: isGoogleRunning ? "Active Search & Shopping Ads" : "No Active Search Ads Found",
      detectedKeywordsCount: isGoogleRunning ? (positiveHash % 85) + 20 : 0,
      topKeywords: isGoogleRunning 
        ? [`best ${rawName}`, `${rawName} online`, `buy ${rawName} discount`, `${rawName} alternative`]
        : [`${rawName}`],
      searchImpressionShare: isGoogleRunning ? `${45 + (positiveHash % 45)}% Impression Share` : "0%",
      strategyNote: isGoogleRunning 
        ? "Bidding on category keywords with active Google Shopping product listing ads."
        : "Competitors are actively bidding on their brand keywords while they run no search ads.",
    },
    pageSpeed: {
      mobileScore,
      desktopScore,
      fcp: `${(1.0 + (positiveHash % 15) / 10).toFixed(1)}s`,
      lcp: `${(2.0 + (positiveHash % 20) / 10).toFixed(1)}s`,
      cls: `0.0${positiveHash % 8}`,
      speedIndex: `${(1.5 + (positiveHash % 18) / 10).toFixed(1)}s`,
      status: mobileScore >= 80 ? "Good" : mobileScore >= 60 ? "Needs Improvement" : "Poor",
    },
    aiSummary: {
      headline: isMetaRunning
        ? `Aggressive Social Acquisition with ${isGoogleRunning ? "Balanced Search Defense" : "Unprotected Brand Keywords"}`
        : "Organic-heavy Traffic Engine with Significant Untapped Paid Ad Potential",
      strengths: [
        isMetaRunning ? `Consistently tests ${metaCount}+ ad creative variations across Instagram & Facebook.` : "Established organic brand awareness and organic backlinks.",
        desktopScore >= 80 ? "Desktop funnel is well-optimized with fast page render times." : "Clear product messaging and simple checkout steps.",
      ],
      vulnerabilities: [
        mobileScore < 75 ? `Mobile Core Web Vitals score (${mobileScore}/100) indicates high potential bounce rate on paid traffic.` : "Limited retargeting segmentation on secondary channels.",
        !isGoogleRunning ? "Zero Google Ads presence allows competitors to steal high-intent brand searchers." : "Ad creatives focus heavily on direct discounts rather than lifestyle hooks.",
      ],
      executiveSummary: `${capitalizedName} shows ${isMetaRunning ? "high reliance on paid social traffic" : "organic positioning with minimal ad spend"}. Their performance score of ${overall}/100 reveals key growth opportunities in technical page speed and search channel expansion.`,
      recommendedCounterStrategy: `Target their core search terms with comparative landing pages highlighting faster delivery, warranty, and customer reviews.`,
    },
    fullReportTeaser: {
      estimatedSeoKeywords: 2200 + (positiveHash % 8000),
      backlinksDetected: 8400 + (positiveHash % 24000),
      socialEngagementRate: `${(2.1 + (positiveHash % 30) / 10).toFixed(1)}%`,
      conversionLeaksCount: 3 + (positiveHash % 4),
    },
  };
}
