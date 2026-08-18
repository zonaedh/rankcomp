/**
 * Live Target Site Scanner & Tracker Inspector
 * Inspects HTML, script tags, schema markup, social links, and tracking pixels
 */

export interface ScannedSiteData {
  domain: string;
  url: string;
  reachable: boolean;
  statusCode?: number;
  title: string;
  metaDescription: string;
  brandName: string;
  categoryHint: string;
  ogImage?: string;
  headings: string[];
  keywords: string[];
  trackers: {
    metaPixelDetected: boolean;
    metaPixelIds: string[];
    facebookPageUrls: string[];
    googleAdsDetected: boolean;
    googleAdsIds: string[];
    gtmDetected: boolean;
    gtmIds: string[];
    tikTokPixelDetected: boolean;
    bingAdsDetected: boolean;
    pinterestTagDetected: boolean;
    criteoDetected: boolean;
  };
  techStack: {
    cmsOrPlatform: string;
    hasEcommerce: boolean;
    hasStripeOrKlarna: boolean;
    hasMobileApp: boolean;
    isEnterpriseScale: boolean;
  };
  schemaTypes: string[];
}

export async function scanTargetSite(domain: string, targetUrl: string, timeoutMs: number = 10000): Promise<ScannedSiteData> {
  const defaultBrand = capitalizeDomain(domain);

  const result: ScannedSiteData = {
    domain,
    url: targetUrl,
    reachable: false,
    title: domain,
    metaDescription: "",
    brandName: defaultBrand,
    categoryHint: "Digital Services & Content",
    headings: [],
    keywords: [],
    trackers: {
      metaPixelDetected: false,
      metaPixelIds: [],
      facebookPageUrls: [],
      googleAdsDetected: false,
      googleAdsIds: [],
      gtmDetected: false,
      gtmIds: [],
      tikTokPixelDetected: false,
      bingAdsDetected: false,
      pinterestTagDetected: false,
      criteoDetected: false,
    },
    techStack: {
      cmsOrPlatform: "Custom Web Application",
      hasEcommerce: false,
      hasStripeOrKlarna: false,
      hasMobileApp: false,
      isEnterpriseScale: false,
    },
    schemaTypes: [],
  };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    const res = await fetch(targetUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
      },
    });

    clearTimeout(timeout);

    result.reachable = res.ok || res.status < 500;
    result.statusCode = res.status;

    const html = await res.text();
    if (!html || html.length < 50) return result;

    // 1. Extract Title
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (titleMatch && titleMatch[1]) {
      result.title = cleanText(titleMatch[1]);
    }

    // 2. Extract OpenGraph & Meta Description
    const metaDesc = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i) ||
      html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i);
    if (metaDesc && metaDesc[1]) {
      result.metaDescription = cleanText(metaDesc[1]);
    }

    const ogSiteName = html.match(/<meta[^>]*property=["']og:site_name["'][^>]*content=["']([^"']+)["']/i);
    const ogSiteNameVal = ogSiteName && ogSiteName[1] ? ogSiteName[1].trim() : undefined;

    const ogImgMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
    if (ogImgMatch && ogImgMatch[1]) {
      result.ogImage = ogImgMatch[1].trim();
    }

    // 3. Extract Facebook Social Links (e.g. facebook.com/DarazBangladesh)
    const fbLinkMatches = Array.from(
      html.matchAll(/href=["'](https?:\/\/(?:www\.)?facebook\.com\/([A-Za-z0-9_.-]+))["']/gi)
    ).map((m) => m[1]);
    result.trackers.facebookPageUrls = Array.from(new Set(fbLinkMatches));

    // 4. Resolve Clean Accurate Brand Name
    result.brandName = resolveAccurateBrandName(result.title, domain, ogSiteNameVal, result.trackers.facebookPageUrls);

    // 5. Extract Headings
    const h1Matches = Array.from(html.matchAll(/<h1[^>]*>([^<]+)<\/h1>/gi)).map((m) => m[1].trim()).filter(Boolean);
    const h2Matches = Array.from(html.matchAll(/<h2[^>]*>([^<]+)<\/h2>/gi)).map((m) => m[1].trim()).filter(Boolean);
    result.headings = [...h1Matches.slice(0, 3), ...h2Matches.slice(0, 5)];

    // 6. Comprehensive Meta / Facebook Pixel & Asset Detection
    const pixelIdList: string[] = [];

    const fbqMatches = Array.from(html.matchAll(/fbq\(['"]init['"],\s*['"](\d{10,18})['"]\)/g)).map((m) => m[1]);
    fbqMatches.forEach((id) => pixelIdList.push(id));

    const trMatches = Array.from(html.matchAll(/facebook\.com\/tr\/?\?(?:amp;)?id=(\d{10,18})/gi)).map((m) => m[1]);
    trMatches.forEach((id) => pixelIdList.push(id));

    const hasMetaScript =
      pixelIdList.length > 0 ||
      html.includes("connect.facebook.net") ||
      html.includes("fbevents.js") ||
      html.includes("facebook.com/tr") ||
      html.includes("fb-root") ||
      html.includes("fb:app_id") ||
      html.includes("facebook-domain-verification");

    result.trackers.metaPixelDetected = hasMetaScript;
    result.trackers.metaPixelIds = Array.from(new Set(pixelIdList));

    // 7. Google Ads Tags
    const googleAdsRegex = /AW-([0-9A-Za-z_-]+)/g;
    const gAdsMatches = Array.from(html.matchAll(googleAdsRegex)).map((m) => `AW-${m[1]}`);
    const hasGoogleAds =
      gAdsMatches.length > 0 ||
      html.includes("googleadservices.com/pagead/conversion") ||
      html.includes("google_conversion_id") ||
      html.includes("gtag('config', 'AW-");

    result.trackers.googleAdsDetected = hasGoogleAds;
    result.trackers.googleAdsIds = Array.from(new Set(gAdsMatches));

    // 8. Google Tag Manager
    const gtmRegex = /GTM-([A-Z0-9]+)/g;
    const gtmMatches = Array.from(html.matchAll(gtmRegex)).map((m) => `GTM-${m[1]}`);
    result.trackers.gtmDetected = gtmMatches.length > 0 || html.includes("googletagmanager.com/gtm.js");
    result.trackers.gtmIds = Array.from(new Set(gtmMatches));

    // 9. Other Trackers
    result.trackers.tikTokPixelDetected = html.includes("analytics.tiktok.com") || html.includes("ttq.load");
    result.trackers.bingAdsDetected = html.includes("bat.bing.com") || html.includes("uetq");
    result.trackers.pinterestTagDetected = html.includes("pintrk(") || html.includes("ct.pinterest.com");
    result.trackers.criteoDetected = html.includes("static.criteo.net");

    // 10. Detect Mobile App & Enterprise Scale Signals
    result.techStack.hasMobileApp =
      html.includes("play.google.com/store/apps") ||
      html.includes("apps.apple.com") ||
      html.includes("market://details") ||
      html.includes("app-store");

    result.techStack.isEnterpriseScale =
      html.includes("lazcdn.com") ||
      html.includes("alicdn.com") ||
      html.includes("amazon.") ||
      html.includes("walmart.");

    // 11. Detect CMS / Platform with Strict E-Commerce Filter
    if (html.includes("cdn.shopify.com") || html.includes("Shopify.theme")) {
      result.techStack.cmsOrPlatform = "Shopify Plus";
      result.techStack.hasEcommerce = true;
      result.categoryHint = "E-Commerce / Direct-to-Consumer";
    } else if (html.includes("wp-content") || html.includes("woocommerce")) {
      const isWcShop =
        html.includes("woocommerce-price-amount") ||
        html.includes("add_to_cart_button") ||
        html.includes("woocommerce-cart") ||
        html.includes("wc-block-grid");
      result.techStack.cmsOrPlatform = isWcShop ? "WooCommerce / WordPress" : "WordPress";
      result.techStack.hasEcommerce = isWcShop;
      result.categoryHint = isWcShop ? "E-Commerce / Direct-to-Consumer" : "Digital Agency & Content";
    } else if (html.includes("lazcdn.com") || html.includes("alicdn.com")) {
      result.techStack.cmsOrPlatform = "Alibaba / Lazada Enterprise Architecture";
      result.techStack.hasEcommerce = true;
      result.techStack.isEnterpriseScale = true;
      result.categoryHint = "Mega Marketplace & Retail Enterprise";
    } else if (html.includes("__NEXT_DATA__") || html.includes("_next/static")) {
      result.techStack.cmsOrPlatform = "Next.js / React Modern Stack";
      result.techStack.hasEcommerce = isEcommerceHtml(html);
      result.categoryHint = result.techStack.hasEcommerce ? "E-Commerce Platform" : "Tech SaaS / Digital Platform";
    } else if (html.includes("magento") || html.includes("Mage.Cookies")) {
      result.techStack.cmsOrPlatform = "Adobe Magento Commerce";
      result.techStack.hasEcommerce = true;
      result.categoryHint = "Enterprise E-Commerce";
    } else {
      result.techStack.hasEcommerce = isEcommerceHtml(html) || result.techStack.isEnterpriseScale;
      result.categoryHint = result.techStack.hasEcommerce ? "E-Commerce Retail" : "Digital Services & Technology";
    }

    result.techStack.hasStripeOrKlarna = html.includes("stripe.com") || html.includes("klarna.com") || html.includes("paypal.com");

    // 12. Extract Schema Markup
    const schemaMatches = Array.from(html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi));
    for (const match of schemaMatches) {
      try {
        const schema = JSON.parse(match[1]);
        if (schema["@type"]) {
          result.schemaTypes.push(String(schema["@type"]));
        }
      } catch {
        // ignore
      }
    }

    // 13. Extract Meaningful Keywords
    result.keywords = extractKeywords(result.title, result.metaDescription, result.headings);
  } catch (err) {
    console.warn(`[Site Scanner] Failed scanning ${targetUrl}:`, err);
  }

  return result;
}

function resolveAccurateBrandName(
  title: string,
  domain: string,
  ogSiteName?: string,
  fbLinks?: string[]
): string {
  const domainBrand = capitalizeDomain(domain); // e.g. "Daraz", "Pickaboo", "Gymshark"

  if (ogSiteName && ogSiteName.length >= 2 && ogSiteName.length <= 30) {
    return ogSiteName;
  }

  // If title contains domain brand, return domainBrand
  if (title.toLowerCase().includes(domainBrand.toLowerCase())) {
    return domainBrand;
  }

  // Check Facebook link
  if (fbLinks && fbLinks.length > 0) {
    const match = fbLinks[0].match(/facebook\.com\/([A-Za-z0-9_.-]+)/i);
    if (match && match[1]) {
      const pageName = match[1];
      if (pageName.toLowerCase().includes(domainBrand.toLowerCase())) {
        return domainBrand;
      }
    }
  }

  return domainBrand;
}

function isEcommerceHtml(html: string): boolean {
  const lower = html.toLowerCase();
  return (
    lower.includes("add to cart") ||
    lower.includes("shopping cart") ||
    lower.includes("cart-drawer") ||
    lower.includes("add-to-cart") ||
    lower.includes("product-price") ||
    lower.includes("woocommerce-price") ||
    lower.includes("cash on delivery")
  );
}

function cleanText(text: string): string {
  return text
    .replace(/[\n\r\t]+/g, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function capitalizeDomain(domain: string): string {
  const clean = domain.replace(/^www\./, "").split(".")[0];
  return clean.charAt(0).toUpperCase() + clean.slice(1);
}

function extractKeywords(title: string, desc: string, headings: string[]): string[] {
  const combined = `${title} ${desc} ${headings.join(" ")}`.toLowerCase();
  const stopWords = new Set([
    "the", "and", "for", "with", "from", "your", "this", "that", "are", "you",
    "online", "best", "shop", "buy", "official", "store", "website", "platform",
    "hassle", "free", "all", "get", "now", "more", "about",
  ]);

  const words = combined
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 3 && !stopWords.has(w));

  const freq: Record<string, number> = {};
  for (const w of words) {
    freq[w] = (freq[w] || 0) + 1;
  }

  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([w]) => w);
}
