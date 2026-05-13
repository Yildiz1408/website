/**
 * Zentrale Site- und SEO-Konfiguration.
 * TODO: NEXT_PUBLIC_SITE_URL in Vercel auf die endgültige Produktionsdomain setzen (inkl. https, ohne Slash am Ende).
 * TODO: hreflang und sprachspezifische Meta-Titel sind erst sinnvoll, sobald es getrennte URLs pro Sprache gibt (aktuell DE/TR per Client-State auf derselben URL).
 */

const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const SITE_URL = rawSiteUrl;

export const METADATA_BASE = new URL(SITE_URL.endsWith("/") ? SITE_URL.slice(0, -1) : SITE_URL);

export function absoluteUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return new URL(p, `${SITE_URL}/`).toString();
}

export const SITE_NAME = "Selahattin Yıldız";

export const SEO = {
  home: {
    title: "Vereidigter Dolmetscher Hannover | Selahattin Yıldız",
    description:
      "Dolmetschen und beglaubigte Übersetzungen Deutsch und Türkisch in Hannover. Für Gerichte, Behörden und Notare, deutschlandweit nach Vereinbarung.",
  },
  impressum: {
    title: "Impressum",
    description:
      "Verantwortliche Angaben, Kontakt und rechtliche Hinweise zur Website von Selahattin Yıldız, vereidigter Dolmetscher und Übersetzer in Hannover.",
  },
  datenschutz: {
    title: "Datenschutz",
    description:
      "Sachliche Erklärung zur Verarbeitung personenbezogener Daten auf dieser Website und über das Kontaktformular, inklusive Speicher und Ihrer Rechte.",
  },
} as const;

export const OG_IMAGE_ALT =
  "Selahattin Yıldız, vereidigter Dolmetscher und Übersetzer für Deutsch und Türkisch in Hannover";
