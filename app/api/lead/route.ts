import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, domain } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid work email address is required." },
        { status: 400 }
      );
    }

    // In a full production deployment with Resend/SendGrid/Supabase:
    // we would write to database or dispatch an automated email with the PDF attachment.
    const leadRecord = {
      id: "lead_" + Date.now(),
      email: email.trim().toLowerCase(),
      domain: domain ? String(domain).toLowerCase() : "unknown",
      capturedAt: new Date().toISOString(),
      status: "queued_for_delivery",
    };

    console.log("[Lead Captured]:", leadRecord);

    return NextResponse.json(
      {
        success: true,
        message: `Comprehensive PDF audit report for ${leadRecord.domain} has been scheduled for delivery to ${leadRecord.email}.`,
        leadId: leadRecord.id,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[API /api/lead] Error processing lead:", err);
    return NextResponse.json(
      { error: "Failed to process audit unlock request." },
      { status: 500 }
    );
  }
}
