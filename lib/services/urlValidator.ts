/**
 * Domain and URL validation and normalization utilities
 */

export interface ValidatedDomain {
  domain: string;
  url: string;
  isValid: boolean;
  isFacebookPage?: boolean;
  facebookPageHandle?: string;
  error?: string;
}

export function isFacebookPageUrl(input: string): boolean {
  if (!input) return false;
  const lower = input.trim().toLowerCase();
  return (
    lower.includes("facebook.com/") ||
    lower.includes("fb.com/") ||
    lower.includes("fb.me/") ||
    lower.startsWith("facebook.com")
  );
}

export function extractFacebookPageHandle(input: string): string {
  if (!input) return "Facebook Page";
  let clean = input.trim();
  clean = clean.replace(/^(https?:\/\/)?(www\.)?/, "");
  clean = clean.replace(/^(facebook\.com|fb\.com|fb\.me)\//i, "");
  clean = clean.replace(/\?.*$/, "");
  clean = clean.replace(/\/.*$/, "");
  return clean || "Facebook Page";
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
  if (isFacebookPageUrl(domainOrUrl)) {
    const handle = extractFacebookPageHandle(domainOrUrl);
    return {
      domain: `facebook.com/${handle}`,
      url: `https://facebook.com/${handle}`,
      isValid: true,
      isFacebookPage: true,
      facebookPageHandle: handle,
    };
  }

  const clean = cleanDomainInput(domainOrUrl);
  if (!isValidDomainFormat(clean)) {
    return {
      domain: clean || domainOrUrl,
      url: "",
      isValid: false,
      error: "Please provide a valid domain name (e.g. nike.com, stripe.com) or Facebook Page URL",
    };
  }

  return {
    domain: clean,
    url: `https://${clean}`,
    isValid: true,
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
    // If HEAD fails (some servers block HEAD), attempt lightweight GET
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
