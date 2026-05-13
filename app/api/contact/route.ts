import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_MESSAGE = 8000;
const WEB3FORMS_URL = "https://api.web3forms.com/submit";

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

type Web3FormsResponse = { success?: boolean; message?: string };

export async function POST(req: NextRequest) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY?.trim();

  if (!accessKey) {
    return NextResponse.json(
      {
        error:
          "Kontaktformular ist nicht konfiguriert. Bitte WEB3FORMS_ACCESS_KEY in Vercel setzen (kostenlos auf web3forms.com — dort die Ziel-E-Mail, z. B. t-online, eintragen).",
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

  const payload: Record<string, string> = {
    access_key: accessKey,
    subject: subject ? `Kontakt: ${subject}` : `Kontakt: ${name}`,
    from_name: name,
    email,
    replyto: email,
    message: textLines.join("\n"),
  };
  if (phone) payload.phone = phone;

  let upstream: Response;
  try {
    upstream = await fetch(WEB3FORMS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    return NextResponse.json({ error: "Versanddienst nicht erreichbar. Bitte später erneut versuchen." }, { status: 502 });
  }

  let data: Web3FormsResponse = {};
  try {
    data = (await upstream.json()) as Web3FormsResponse;
  } catch {
    /* ignore */
  }

  if (!upstream.ok || data.success === false) {
    const hint = typeof data.message === "string" ? data.message : "";
    return NextResponse.json(
      { error: hint || "E-Mail konnte nicht gesendet werden." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
