/**
 * Domain and URL validation and normalization utilities
 * Supports standard websites and direct social media profiles (Facebook, TikTok, X, Pinterest, LinkedIn)
 */

export type SocialPlatform = "facebook" | "tiktok" | "x" | "pinterest" | "linkedin" | "instagram";

export interface SocialPageInfo {
  isSocialPage: boolean;
  platform: SocialPlatform;
  platformName: string;
  handle: string;
  normalizedUrl: string;
  adLibraryName: string;
  externalArchiveUrl: string;
}

export interface ValidatedDomain {
  domain: string;
  url: string;
  isValid: boolean;
  isSocialPage?: boolean;
  socialInfo?: SocialPageInfo;
  isFacebookPage?: boolean;
  facebookPageHandle?: string;
  error?: string;
}

/**
 * Extracts clean username / company handle from a social media URL
 */
export function extractSocialHandle(input: string, domains: string[]): string {
  if (!input) return "";
  let clean = input.trim();
  clean = clean.replace(/^(https?:\/\/)?(www\.)?/, "");
  
  for (const d of domains) {
    const regex = new RegExp(`^${d.replace(/\./g, "\\.")}\\/`, "i");
    clean = clean.replace(regex, "");
  }
  
  // Clean off query parameters, hashtags, and trailing paths
  clean = clean.replace(/\?.*$/, "");
  clean = clean.replace(/#.*$/, "");
  clean = clean.replace(/\/.*$/, "");
  clean = clean.replace(/^@/, "");
  return clean.trim();
}

/**
 * Detects if the input is a supported social network profile/page URL
 * Supports: www.facebook.com, www.fb.com, www.tiktok.com, www.x.com, www.pinterest.com, www.linkedin.com, and instagram
 */
export function detectSocialPageUrl(input: string): SocialPageInfo | null {
  if (!input) return null;
  const raw = input.trim().toLowerCase();

  // 1. Facebook & FB.com
  if (
    raw.includes("facebook.com") ||
    raw.includes("fb.com") ||
    raw.includes("fb.me")
  ) {
    const handle = extractSocialHandle(input, ["facebook.com", "fb.com", "fb.me"]) || "Facebook Page";
    return {
      isSocialPage: true,
      platform: "facebook",
      platformName: "Facebook",
      handle,
      normalizedUrl: `https://facebook.com/${handle}`,
      adLibraryName: "Meta Ad Library",
      externalArchiveUrl: `https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=ALL&view_all_page_id=${encodeURIComponent(handle)}`,
    };
  }

  // 2. TikTok
  if (raw.includes("tiktok.com")) {
    const handle = extractSocialHandle(input, ["tiktok.com/@", "tiktok.com"]) || "TikTok Profile";
    return {
      isSocialPage: true,
      platform: "tiktok",
      platformName: "TikTok",
      handle: handle.replace(/^@/, ""),
      normalizedUrl: `https://tiktok.com/@${handle.replace(/^@/, "")}`,
      adLibraryName: "TikTok Commercial Content Library",
      externalArchiveUrl: `https://library.tiktok.com/ads?keyword=${encodeURIComponent(handle)}`,
    };
  }

  // 3. X (Twitter)
  if (raw.includes("x.com") || raw.includes("twitter.com")) {
    const handle = extractSocialHandle(input, ["x.com", "twitter.com"]) || "X Profile";
    return {
      isSocialPage: true,
      platform: "x",
      platformName: "X (Twitter)",
      handle: handle.replace(/^@/, ""),
      normalizedUrl: `https://x.com/${handle.replace(/^@/, "")}`,
      adLibraryName: "X Transparency Ad Repository",
      externalArchiveUrl: `https://x.com/${encodeURIComponent(handle)}`,
    };
  }

  // 4. Pinterest
  if (raw.includes("pinterest.com")) {
    const handle = extractSocialHandle(input, ["pinterest.com"]) || "Pinterest Profile";
    return {
      isSocialPage: true,
      platform: "pinterest",
      platformName: "Pinterest",
      handle,
      normalizedUrl: `https://pinterest.com/${handle}`,
      adLibraryName: "Pinterest Ads & Pins Repository",
      externalArchiveUrl: `https://www.pinterest.com/${encodeURIComponent(handle)}/`,
    };
  }

  // 5. LinkedIn
  if (raw.includes("linkedin.com")) {
    const handle = extractSocialHandle(input, ["linkedin.com/company", "linkedin.com/in", "linkedin.com/showcase", "linkedin.com"]) || "LinkedIn Page";
    return {
      isSocialPage: true,
      platform: "linkedin",
      platformName: "LinkedIn",
      handle,
      normalizedUrl: `https://linkedin.com/company/${handle}`,
      adLibraryName: "LinkedIn Ad Archive",
      externalArchiveUrl: `https://www.linkedin.com/company/${encodeURIComponent(handle)}/`,
    };
  }

  // 6. Instagram
  if (raw.includes("instagram.com")) {
    const handle = extractSocialHandle(input, ["instagram.com"]) || "Instagram Profile";
    return {
      isSocialPage: true,
      platform: "instagram",
      platformName: "Instagram",
      handle: handle.replace(/^@/, ""),
      normalizedUrl: `https://instagram.com/${handle.replace(/^@/, "")}`,
      adLibraryName: "Meta Ad Library (Instagram)",
      externalArchiveUrl: `https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=ALL&q=${encodeURIComponent(handle)}`,
    };
  }

  return null;
}

/**
 * Backwards compatible helper for Facebook detection
 */
export function isFacebookPageUrl(input: string): boolean {
  return detectSocialPageUrl(input) !== null;
}

/**
 * Backwards compatible extractor for Facebook page handle
 */
export function extractFacebookPageHandle(input: string): string {
  const social = detectSocialPageUrl(input);
  return social ? social.handle : extractSocialHandle(input, ["facebook.com", "fb.com", "fb.me"]) || "Social Page";
}

/**
 * Universal detector for any supported social media URL
 */
export function isSocialPageUrl(input: string): boolean {
  return detectSocialPageUrl(input) !== null;
}

export function cleanDomainInput(input: string): string {
  if (!input) return "";
  let clean = input.trim().toLowerCase();
  // Remove protocol
  clean = clean.replace(/^(https?:\/\/)/, "");
  // Remove www.
  clean = clean.replace(/^www\./, "");
  // Remove path and query string
  clean = clean.replace(/\/.*$/, "");
  // Remove trailing slashes, colons, or port
  clean = clean.replace(/:\d+$/, "");
  return clean;
}

export function isValidDomainFormat(domain: string): boolean {
  if (!domain || domain.length < 3 || domain.length > 253) return false;
  // Domain regex accepting standard domains and subdomains
  const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
  return domainRegex.test(domain);
}

export function normalizeUrl(domainOrUrl: string): ValidatedDomain {
  const social = detectSocialPageUrl(domainOrUrl);
  if (social) {
    return {
      domain: `${social.platformName.toLowerCase()}.com/${social.handle}`,
      url: social.normalizedUrl,
      isValid: true,
      isSocialPage: true,
      socialInfo: social,
      isFacebookPage: true,
      facebookPageHandle: social.handle,
    };
  }

  const clean = cleanDomainInput(domainOrUrl);
  if (!isValidDomainFormat(clean)) {
    return {
      domain: clean || domainOrUrl,
      url: "",
      isValid: false,
      error: "Please provide a valid domain name (e.g. nike.com, daraz.com.bd) or social profile link",
    };
  }

  return {
    domain: clean,
    url: `https://${clean}`,
    isValid: true,
    isSocialPage: false,
    isFacebookPage: false,
  };
}

export async function checkDomainReachable(url: string, timeoutMs: number = 6000): Promise<{ reachable: boolean; finalUrl: string; status?: number }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    const response = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 RankComp-Scanner/1.0",
      },
      redirect: "follow",
    });

    clearTimeout(timeout);
    return {
      reachable: response.ok || response.status < 500,
      finalUrl: response.url || url,
      status: response.status,
    };
  } catch {
    // If HEAD fails, attempt lightweight GET
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), timeoutMs);

      const response = await fetch(url, {
        method: "GET",
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 RankComp-Scanner/1.0",
        },
        redirect: "follow",
      });

      clearTimeout(timeout);
      return {
        reachable: response.ok || response.status < 500,
        finalUrl: response.url || url,
        status: response.status,
      };
    } catch {
      return {
        reachable: false,
        finalUrl: url,
      };
    }
  }
}
