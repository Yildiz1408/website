import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const MAX_MESSAGE = 8000;

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  const to = process.env.CONTACT_TO;

  if (!apiKey || !from || !to) {
    return NextResponse.json(
      {
        error:
          "Kontaktformular ist noch nicht konfiguriert. Bitte RESEND_API_KEY, CONTACT_FROM und CONTACT_TO in Vercel hinterlegen.",
      },
      { status: 503 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const name = String(body.name ?? "")
    .trim()
    .slice(0, 200);
  const email = String(body.email ?? "")
    .trim()
    .slice(0, 320);
  const phone = String(body.phone ?? "")
    .trim()
    .slice(0, 80);
  const subject = String(body.subject ?? "")
    .trim()
    .slice(0, 200);
  const message = String(body.message ?? "").trim();
  const attachmentName = String(body.attachmentName ?? "")
    .trim()
    .slice(0, 500);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, E-Mail und Nachricht sind erforderlich." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Ungültige E-Mail-Adresse." }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE) {
    return NextResponse.json({ error: "Nachricht ist zu lang." }, { status: 400 });
  }

  const lines = [
    `Name: ${name}`,
    `E-Mail: ${email}`,
    phone ? `Telefon: ${phone}` : null,
    subject ? `Betreff: ${subject}` : null,
    "",
    "Nachricht:",
    message,
    attachmentName ? `\n\nAnhang (nur Dateiname): ${attachmentName}` : null,
  ].filter(Boolean) as string[];

  const text = lines.join("\n");
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: subject ? `Kontakt: ${subject}` : `Kontakt: ${name}`,
    text,
  });

  if (error) {
    return NextResponse.json({ error: "E-Mail konnte nicht gesendet werden." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
