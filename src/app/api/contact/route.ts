import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { sendContactAutoReply, sendContactNotification } from "@/lib/email";

const schema = z.object({
  name: z.string().min(1).max(100).trim(),
  email: z.string().email().trim().toLowerCase(),
  message: z.string().min(10).max(5000).trim(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = schema.parse(body);

    // Persist to Supabase
    const supabase = await createClient();
    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert({ name, email, message });

    if (dbError) {
      console.error("[contact] DB insert error:", dbError);
      // Don't block the user — still send emails
    }

    // Send emails in parallel (fire-and-forget — don't block response)
    Promise.all([
      sendContactAutoReply({ to: email, name }),
      sendContactNotification({ submitterName: name, submitterEmail: email, message }),
    ]).catch((err) => console.error("[contact] Email error:", err));

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid submission", issues: err.issues },
        { status: 400 }
      );
    }
    console.error("[contact]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
