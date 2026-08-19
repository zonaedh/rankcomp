import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, domain, name, phone, source } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid work email address is required." },
        { status: 400 }
      );
    }

    // In a full production deployment with Resend/SendGrid/Supabase:
    // we write to database or dispatch an automated email with the PDF attachment + consultation booking link.
    const leadRecord = {
      id: "lead_" + Date.now(),
      email: email.trim().toLowerCase(),
      name: name ? String(name).trim() : undefined,
      phone: phone ? String(phone).trim() : undefined,
      domain: domain ? String(domain).toLowerCase() : "unknown",
      source: source || "unlock_report_consultation",
      consultationOffered: true,
      capturedAt: new Date().toISOString(),
      status: "queued_for_delivery",
    };

    console.log("[Lead & 1:1 Consultation Requested]:", leadRecord);

    return NextResponse.json(
      {
        success: true,
        message: `Comprehensive PDF audit report and 1:1 consultation invitation for ${leadRecord.domain} has been scheduled for delivery to ${leadRecord.email}.`,
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
