import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    // Server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Mock Email Processing Logic
    console.log("---- SECURE EMAIL ENGINE TRIGGERED ----");
    console.log(`Sending payload to: info@ellolcreatives.com, contact@ellolcreatives.com`);
    console.log(`From: ${name} <${email}>`);
    console.log(`Phone: ${phone || "Not provided"}`);
    console.log(`Message payload length: ${message.length} chars`);
    console.log("-----------------------------------------");
    
    // Simulate robust delivery delay (500ms)
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({ success: true, message: "Engine delivery completed." }, { status: 200 });

  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error updating standard engine channels." },
      { status: 500 }
    );
  }
}
