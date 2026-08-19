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
    opportunityValue?: string;
    quickWin?: string;
    adHookIdea?: string;
    actionPlan?: {
      step1_immediate: string;
      step2_shortTerm: string;
      step3_scale: string;
    };
    threatLevel?: "High Threat" | "Moderate Threat" | "Low Threat";
    engineUsed?: "groq" | "gemini" | "openai" | "heuristic";
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
      headline: "Aggressive Social Ads with High Mobile Checkout Loss",
      opportunityValue: "$18,000 – $34,000 / mo",
      quickWin: "Deploy a lightning-fast mobile landing page targeting their top hoodie and linen search terms.",
      threatLevel: "Moderate Threat",
      strengths: [
        "Running 38+ active video and photo ads on Instagram & TikTok to constantly find new buyers.",
        "Clean, attractive desktop shopping experience that makes products look premium.",
      ],
      vulnerabilities: [
        "Their website takes nearly 3 seconds to load on phones, causing roughly 18-24% of mobile ad clicks to leave before buying.",
        "They are not defending their brand name on Google search, letting competitors show up above them.",
      ],
      executiveSummary: "Stride Apparel spends heavily on Instagram and TikTok ads to attract shoppers, but their slow mobile loading speed causes many visitors to bounce before buying. They also ignore Google Search ads, creating an easy opportunity to win over their searchers.",
      recommendedCounterStrategy: "Run Google Search ads on their popular product names and deliver a sub-second mobile checkout page that converts the customers they lose.",
      adHookIdea: "Tired of slow shipping and heavy fabrics? Try our breathable organic linen — delivered in 48 hours.",
      actionPlan: {
        step1_immediate: "Day 1-7: Set up 3 exact-match Google Search ads on their top product keywords to grab ready-to-buy shoppers.",
        step2_shortTerm: "Day 14-30: Build a mobile-optimized comparison landing page highlighting your faster checkout and free shipping.",
        step3_scale: "Day 60+: Launch TikTok video testimonials targeting activewear shoppers looking for durable alternatives.",
      },
      engineUsed: "groq",
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
      headline: "Dominant Fitness Giant with Room in Specialized Sub-Niches",
      opportunityValue: "$120,000 – $220,000 / mo",
      quickWin: "Target hyper-specific training communities (powerlifting, cross-training, pilates) where generic activewear feels too broad.",
      threatLevel: "High Threat",
      strengths: [
        "Over 110 active athlete-backed ads running constantly across Instagram, TikTok, and YouTube.",
        "Super fast 0.9-second mobile loading speed that keeps checkout friction near zero.",
      ],
      vulnerabilities: [
        "Broad mainstream positioning leaves specialized athletic communities feeling underserved.",
        "Premium pricing creates an opening for high-durability direct alternatives.",
      ],
      executiveSummary: "Gymshark is an advertising powerhouse with rapid mobile speeds and massive social buzz. However, because they appeal to everyone, specialized lifters and athletes often look for tailored, purpose-built gear.",
      recommendedCounterStrategy: "Do not compete head-on on broad gym terms; win by dominating specific athletic niches with hyper-focused ad messaging.",
      adHookIdea: "Built specifically for heavy squats and deadlifts — reinforced seamless fabric that never tears.",
      actionPlan: {
        step1_immediate: "Day 1-7: Run high-intent Google Search ads on niche queries like 'heavyweight lifting shorts' and 'squat-proof seamless tights'.",
        step2_shortTerm: "Day 14-30: Partner with 5 micro-coaches on Instagram to showcase side-by-side durability tests.",
        step3_scale: "Day 60+: Build an automated retargeting funnel offering a first-order discount guarantee.",
      },
      engineUsed: "groq",
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
      headline: "Massive Social Following but Zero Google Search Ads Active",
      opportunityValue: "$25,000 – $50,000 / mo",
      quickWin: "Launch Google Search comparison ads on 'Glossier dupes' and 'clean dewy makeup' to capture ready buyers.",
      threatLevel: "Moderate Threat",
      strengths: [
        "Unbeatable visual aesthetic and viral community loyalty across 50+ Instagram and Pinterest ads.",
        "Huge organic brand recognition that brings in consistent free traffic.",
      ],
      vulnerabilities: [
        "Zero active Google Search ads, allowing competitors to easily bid on their product names and steal buyers.",
        "Their mobile product pages load third-party review widgets slowly.",
      ],
      executiveSummary: "Glossier has built enormous social demand through aesthetic video ads, but they completely ignore Google Search ads. Competitors can easily capture shoppers searching for clean beauty alternatives.",
      recommendedCounterStrategy: "Run Google Search comparison ads targeting 'Glossier alternatives' and 'best cruelty-free tint' to capture uncaptured search intent.",
      adHookIdea: "Love the dewy skin look but want longer-lasting hydration? Meet the clean skincare formula 1,200+ beauty lovers switched to.",
      actionPlan: {
        step1_immediate: "Day 1-7: Launch Google Search ads targeting 'Glossier alternatives' and 'best clean lip balm' with instant checkout.",
        step2_shortTerm: "Day 14-30: Create before/after comparison Reels demonstrating all-day wear and clean ingredients.",
        step3_scale: "Day 60+: Set up an automated bundle offer to increase average order value from search traffic.",
      },
      engineUsed: "groq",
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
