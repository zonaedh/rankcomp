import { NextRequest, NextResponse } from "next/server";
import { generateProductionReport } from "@/lib/services/reportAggregator";
import { cleanDomainInput, isValidDomainFormat } from "@/lib/services/urlValidator";

export const maxDuration = 30; // Max 30 seconds for live PageSpeed & scraping

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawDomain = searchParams.get("domain");

  if (!rawDomain) {
    return NextResponse.json(
      { error: "Query parameter 'domain' is required." },
      { status: 400 }
    );
  }

  const domain = cleanDomainInput(rawDomain);
  if (!isValidDomainFormat(domain)) {
    return NextResponse.json(
      { error: `"${rawDomain}" is not a valid domain name. Example: nike.com or shopify.com` },
      { status: 400 }
    );
  }

  try {
    const report = await generateProductionReport(domain);

    return NextResponse.json(report, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error: any) {
    console.error(`[API /api/analyze] Error analyzing ${domain}:`, error);
    return NextResponse.json(
      {
        error: error?.message || "Failed to analyze the specified domain. Please verify the URL and try again.",
      },
      { status: 500 }
    );
  }
}
