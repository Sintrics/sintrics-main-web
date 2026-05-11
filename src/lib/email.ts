import { Resend } from "resend";

function getResend() { return new Resend(process.env.RESEND_API_KEY ?? "re_placeholder"); }
const FROM = process.env.RESEND_FROM_EMAIL ?? "hello@sintrics.ai";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://sintrics.ai";

// ── Shared email layout ──────────────────────────────────────────────

function emailLayout(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SINTRICS</title>
</head>
<body style="margin:0;padding:0;background:#f9f9f7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#000;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9f7;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border:0.5px solid #e5e5e5;">
          <!-- Header -->
          <tr>
            <td style="padding:32px 40px;border-bottom:0.5px solid #000;">
              <span style="font-size:20px;font-weight:900;letter-spacing:-0.04em;color:#000;">SINTRICS</span>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:40px 40px 32px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:0.5px solid #e5e5e5;">
              <p style="margin:0;font-size:11px;color:#717171;letter-spacing:0.05em;text-transform:uppercase;">
                © ${new Date().getFullYear()} SINTRICS — BRATISLAVA / GLOBAL
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ── Welcome email ────────────────────────────────────────────────────

export async function sendWelcomeEmail({
  to,
  name,
}: {
  to: string;
  name?: string;
}) {
  const greeting = name ? `Hello, ${name}.` : "Welcome.";

  return getResend().emails.send({
    from: `SINTRICS <${FROM}>`,
    to,
    subject: "Welcome to SINTRICS",
    html: emailLayout(`
      <h1 style="font-size:32px;font-weight:900;letter-spacing:-0.04em;margin:0 0 24px;line-height:1;">${greeting}</h1>
      <p style="font-size:15px;line-height:1.7;color:#333;margin:0 0 24px;">
        Your account is ready. We build high-performance digital ecosystems — and now you're part of the system.
      </p>
      <p style="font-size:15px;line-height:1.7;color:#333;margin:0 0 32px;">
        Head to your dashboard to explore what's available to you.
      </p>
      <a href="${APP_URL}/dashboard"
         style="display:inline-block;background:#000;color:#fff;font-size:11px;font-weight:700;
                letter-spacing:0.1em;text-transform:uppercase;padding:14px 28px;text-decoration:none;">
        Open Dashboard
      </a>
    `),
  });
}

// ── Subscription confirmation ────────────────────────────────────────

export async function sendSubscriptionConfirmation({
  to,
  name,
  tier,
  periodEnd,
}: {
  to: string;
  name?: string;
  tier: string;
  periodEnd: Date;
}) {
  const tierLabel = tier.charAt(0).toUpperCase() + tier.slice(1);
  const formattedDate = periodEnd.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return getResend().emails.send({
    from: `SINTRICS <${FROM}>`,
    to,
    subject: `Your ${tierLabel} subscription is active`,
    html: emailLayout(`
      <h1 style="font-size:28px;font-weight:900;letter-spacing:-0.04em;margin:0 0 24px;line-height:1;">
        ${tierLabel} plan activated.
      </h1>
      <p style="font-size:15px;line-height:1.7;color:#333;margin:0 0 16px;">
        ${name ? `${name}, your` : "Your"} <strong>${tierLabel}</strong> subscription is now active.
        Your next billing date is <strong>${formattedDate}</strong>.
      </p>
      <p style="font-size:15px;line-height:1.7;color:#333;margin:0 0 32px;">
        Manage or cancel your subscription at any time from the billing portal.
      </p>
      <a href="${APP_URL}/billing"
         style="display:inline-block;background:#000;color:#fff;font-size:11px;font-weight:700;
                letter-spacing:0.1em;text-transform:uppercase;padding:14px 28px;text-decoration:none;">
        Manage Billing
      </a>
    `),
  });
}

// ── Subscription cancelled ───────────────────────────────────────────

export async function sendSubscriptionCancelled({
  to,
  name,
  periodEnd,
}: {
  to: string;
  name?: string;
  periodEnd: Date;
}) {
  const formattedDate = periodEnd.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return getResend().emails.send({
    from: `SINTRICS <${FROM}>`,
    to,
    subject: "Your subscription has been cancelled",
    html: emailLayout(`
      <h1 style="font-size:28px;font-weight:900;letter-spacing:-0.04em;margin:0 0 24px;line-height:1;">
        Subscription cancelled.
      </h1>
      <p style="font-size:15px;line-height:1.7;color:#333;margin:0 0 16px;">
        ${name ? `${name}, your` : "Your"} subscription has been cancelled.
        You'll retain access until <strong>${formattedDate}</strong>.
      </p>
      <p style="font-size:15px;line-height:1.7;color:#333;margin:0 0 32px;">
        Changed your mind? You can resubscribe at any time.
      </p>
      <a href="${APP_URL}/pricing"
         style="display:inline-block;background:#000;color:#fff;font-size:11px;font-weight:700;
                letter-spacing:0.1em;text-transform:uppercase;padding:14px 28px;text-decoration:none;">
        Resubscribe
      </a>
    `),
  });
}

// ── Contact form auto-reply ──────────────────────────────────────────

export async function sendContactAutoReply({
  to,
  name,
}: {
  to: string;
  name: string;
}) {
  return getResend().emails.send({
    from: `SINTRICS <${FROM}>`,
    to,
    subject: "We received your message",
    html: emailLayout(`
      <h1 style="font-size:28px;font-weight:900;letter-spacing:-0.04em;margin:0 0 24px;line-height:1;">
        Message received, ${name}.
      </h1>
      <p style="font-size:15px;line-height:1.7;color:#333;margin:0 0 16px;">
        We've received your message and will respond within 1–2 business days.
      </p>
      <p style="font-size:15px;line-height:1.7;color:#333;margin:0;">
        — The Sintrics team
      </p>
    `),
  });
}

// ── Internal notification (new contact submission) ───────────────────

export async function sendContactNotification({
  submitterName,
  submitterEmail,
  message,
}: {
  submitterName: string;
  submitterEmail: string;
  message: string;
}) {
  return getResend().emails.send({
    from: `SINTRICS System <${FROM}>`,
    to: FROM,
    subject: `New enquiry from ${submitterName}`,
    html: emailLayout(`
      <h1 style="font-size:24px;font-weight:900;letter-spacing:-0.04em;margin:0 0 24px;line-height:1;">
        New contact submission
      </h1>
      <table cellpadding="0" cellspacing="0" style="width:100%;margin:0 0 24px;">
        <tr>
          <td style="padding:8px 0;border-bottom:0.5px solid #e5e5e5;font-size:11px;font-weight:700;
                     letter-spacing:0.05em;text-transform:uppercase;color:#717171;width:100px;">Name</td>
          <td style="padding:8px 0;border-bottom:0.5px solid #e5e5e5;font-size:14px;">${submitterName}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;border-bottom:0.5px solid #e5e5e5;font-size:11px;font-weight:700;
                     letter-spacing:0.05em;text-transform:uppercase;color:#717171;">Email</td>
          <td style="padding:8px 0;border-bottom:0.5px solid #e5e5e5;font-size:14px;">
            <a href="mailto:${submitterEmail}" style="color:#000;">${submitterEmail}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 0;font-size:11px;font-weight:700;letter-spacing:0.05em;
                     text-transform:uppercase;color:#717171;vertical-align:top;padding-top:16px;">Message</td>
          <td style="padding:16px 0;font-size:14px;line-height:1.6;white-space:pre-wrap;">${message}</td>
        </tr>
      </table>
    `),
  });
}
