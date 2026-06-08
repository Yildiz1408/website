import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const MAX_MESSAGE = 8000;

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: NextRequest) {
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.trim();

  if (!smtpUser || !smtpPass) {
    return NextResponse.json(
      {
        error:
          "Kontaktformular ist nicht konfiguriert. Bitte SMTP_USER und SMTP_PASS in Vercel hinterlegen.",
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

  const name = String(body.name ?? "").trim().slice(0, 200);
  const email = String(body.email ?? "").trim().slice(0, 320);
  const phone = String(body.phone ?? "").trim().slice(0, 80);
  const subject = String(body.subject ?? "").trim().slice(0, 200);
  const message = String(body.message ?? "").trim();
  const attachmentName = String(body.attachmentName ?? "").trim().slice(0, 500);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, E-Mail und Nachricht sind erforderlich." },
      { status: 400 }
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Ungültige E-Mail-Adresse." },
      { status: 400 }
    );
  }
  if (message.length > MAX_MESSAGE) {
    return NextResponse.json({ error: "Nachricht ist zu lang." }, { status: 400 });
  }

  const textLines = [
    `Name: ${name}`,
    `E-Mail: ${email}`,
    phone ? `Telefon: ${phone}` : null,
    subject ? `Betreff: ${subject}` : null,
    "",
    "Nachricht:",
    message,
    attachmentName ? `\n\nAnhang (nur Dateiname): ${attachmentName}` : null,
  ].filter(Boolean) as string[];

  const transporter = nodemailer.createTransport({
    host: "securesmtp.t-online.de",
    port: 465,
    secure: true,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Website Kontakt" <${smtpUser}>`,
      to: "sel.yil@t-online.de",
      replyTo: email,
      subject: subject ? `Kontakt: ${subject}` : `Kontakt: ${name}`,
      text: textLines.join("\n"),
    });
  } catch (err) {
    console.error("SMTP error:", err);
    return NextResponse.json(
      { error: "E-Mail konnte nicht gesendet werden. Bitte später erneut versuchen." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
